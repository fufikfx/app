#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

#include <atomic>
#include <array>
#include <chrono>
#include <cstdint>
#include <cstring>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <random>
#include <sstream>
#include <string>
#include <thread>
#include <vector>

namespace {

static constexpr const char* kWsGuid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

std::string nowIso8601Utc() {
  using namespace std::chrono;
  const auto t = system_clock::to_time_t(system_clock::now());
  std::tm tm{};
  gmtime_r(&t, &tm);
  char buf[32];
  std::snprintf(buf, sizeof(buf), "%04d-%02d-%02dT%02d:%02d:%02dZ",
                tm.tm_year + 1900, tm.tm_mon + 1, tm.tm_mday,
                tm.tm_hour, tm.tm_min, tm.tm_sec);
  return std::string(buf);
}

// ---- Minimal SHA1 (sufficient for WebSocket handshake) ----
struct Sha1 {
  uint32_t h0 = 0x67452301u;
  uint32_t h1 = 0xEFCDAB89u;
  uint32_t h2 = 0x98BADCFEu;
  uint32_t h3 = 0x10325476u;
  uint32_t h4 = 0xC3D2E1F0u;
  uint64_t totalBits = 0;
  std::vector<uint8_t> buf;

  static uint32_t rol(uint32_t v, uint32_t n) { return (v << n) | (v >> (32 - n)); }

  void update(const uint8_t* data, size_t len) {
    totalBits += static_cast<uint64_t>(len) * 8u;
    buf.insert(buf.end(), data, data + len);
    while (buf.size() >= 64) {
      processBlock(buf.data());
      buf.erase(buf.begin(), buf.begin() + 64);
    }
  }

  void update(const std::string& s) { update(reinterpret_cast<const uint8_t*>(s.data()), s.size()); }

  void processBlock(const uint8_t* b) {
    uint32_t w[80];
    for (int i = 0; i < 16; i++) {
      w[i] = (static_cast<uint32_t>(b[i * 4 + 0]) << 24) |
             (static_cast<uint32_t>(b[i * 4 + 1]) << 16) |
             (static_cast<uint32_t>(b[i * 4 + 2]) << 8) |
             (static_cast<uint32_t>(b[i * 4 + 3]) << 0);
    }
    for (int i = 16; i < 80; i++) {
      w[i] = rol(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }

    uint32_t a = h0, b2 = h1, c = h2, d = h3, e = h4;
    for (int i = 0; i < 80; i++) {
      uint32_t f, k;
      if (i < 20) { f = (b2 & c) | ((~b2) & d); k = 0x5A827999u; }
      else if (i < 40) { f = b2 ^ c ^ d; k = 0x6ED9EBA1u; }
      else if (i < 60) { f = (b2 & c) | (b2 & d) | (c & d); k = 0x8F1BBCDCu; }
      else { f = b2 ^ c ^ d; k = 0xCA62C1D6u; }

      const uint32_t temp = rol(a, 5) + f + e + k + w[i];
      e = d;
      d = c;
      c = rol(b2, 30);
      b2 = a;
      a = temp;
    }

    h0 += a; h1 += b2; h2 += c; h3 += d; h4 += e;
  }

  std::array<uint8_t, 20> final() {
    // padding
    std::vector<uint8_t> tail = buf;
    tail.push_back(0x80);
    while ((tail.size() % 64) != 56) tail.push_back(0x00);

    const uint64_t bits = totalBits;
    for (int i = 7; i >= 0; i--) tail.push_back(static_cast<uint8_t>((bits >> (i * 8)) & 0xFFu));

    for (size_t off = 0; off < tail.size(); off += 64) processBlock(tail.data() + off);

    std::array<uint8_t, 20> out{};
    const uint32_t hs[5] = {h0, h1, h2, h3, h4};
    for (int i = 0; i < 5; i++) {
      out[i * 4 + 0] = static_cast<uint8_t>((hs[i] >> 24) & 0xFFu);
      out[i * 4 + 1] = static_cast<uint8_t>((hs[i] >> 16) & 0xFFu);
      out[i * 4 + 2] = static_cast<uint8_t>((hs[i] >> 8) & 0xFFu);
      out[i * 4 + 3] = static_cast<uint8_t>((hs[i] >> 0) & 0xFFu);
    }
    return out;
  }
};

std::string base64Encode(const uint8_t* data, size_t len) {
  static const char* k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  std::string out;
  out.reserve(((len + 2) / 3) * 4);

  for (size_t i = 0; i < len; i += 3) {
    const uint32_t v = (static_cast<uint32_t>(data[i]) << 16) |
                       (static_cast<uint32_t>(i + 1 < len ? data[i + 1] : 0) << 8) |
                       (static_cast<uint32_t>(i + 2 < len ? data[i + 2] : 0) << 0);
    out.push_back(k[(v >> 18) & 63]);
    out.push_back(k[(v >> 12) & 63]);
    out.push_back(i + 1 < len ? k[(v >> 6) & 63] : '=');
    out.push_back(i + 2 < len ? k[(v >> 0) & 63] : '=');
  }
  return out;
}

std::string wsAcceptKey(const std::string& clientKey) {
  Sha1 sha;
  sha.update(clientKey + kWsGuid);
  auto digest = sha.final();
  return base64Encode(digest.data(), digest.size());
}

bool sendAll(int fd, const uint8_t* data, size_t len) {
  size_t off = 0;
  while (off < len) {
    const ssize_t n = ::send(fd, data + off, len - off, 0);
    if (n <= 0) return false;
    off += static_cast<size_t>(n);
  }
  return true;
}

bool sendTextFrame(int fd, const std::string& payload) {
  std::vector<uint8_t> frame;
  frame.reserve(2 + payload.size() + 8);
  frame.push_back(0x81); // FIN + text

  const size_t n = payload.size();
  if (n <= 125) {
    frame.push_back(static_cast<uint8_t>(n));
  } else if (n <= 65535) {
    frame.push_back(126);
    frame.push_back(static_cast<uint8_t>((n >> 8) & 0xFF));
    frame.push_back(static_cast<uint8_t>((n >> 0) & 0xFF));
  } else {
    frame.push_back(127);
    for (int i = 7; i >= 0; i--) frame.push_back(static_cast<uint8_t>((n >> (i * 8)) & 0xFF));
  }

  frame.insert(frame.end(), payload.begin(), payload.end());
  return sendAll(fd, frame.data(), frame.size());
}

std::string trim(const std::string& s) {
  size_t a = 0, b = s.size();
  while (a < b && (s[a] == ' ' || s[a] == '\t' || s[a] == '\r' || s[a] == '\n')) a++;
  while (b > a && (s[b - 1] == ' ' || s[b - 1] == '\t' || s[b - 1] == '\r' || s[b - 1] == '\n')) b--;
  return s.substr(a, b - a);
}

bool parseHeader(const std::string& http, const std::string& key, std::string& out) {
  const std::string needle = key + ":";
  size_t pos = http.find(needle);
  if (pos == std::string::npos) return false;
  pos += needle.size();
  size_t end = http.find("\r\n", pos);
  if (end == std::string::npos) return false;
  out = trim(http.substr(pos, end - pos));
  return true;
}

int createListenSocket(uint16_t port) {
  const int fd = ::socket(AF_INET, SOCK_STREAM, 0);
  if (fd < 0) return -1;

  int yes = 1;
  ::setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(yes));

  sockaddr_in addr{};
  addr.sin_family = AF_INET;
  addr.sin_port = htons(port);
  addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);

  if (::bind(fd, reinterpret_cast<sockaddr*>(&addr), sizeof(addr)) < 0) {
    ::close(fd);
    return -1;
  }
  if (::listen(fd, 8) < 0) {
    ::close(fd);
    return -1;
  }
  return fd;
}

} // namespace

int main(int argc, char** argv) {
  uint16_t port = 8765;
  if (argc >= 2) {
    const int p = std::atoi(argv[1]);
    if (p > 0 && p < 65536) port = static_cast<uint16_t>(p);
  }

  const int listenFd = createListenSocket(port);
  if (listenFd < 0) {
    std::cerr << "Failed to bind ws://127.0.0.1:" << port << "\n";
    return 1;
  }
  std::cout << "Telemetry engine listening on ws://127.0.0.1:" << port << "\n";

  for (;;) {
    sockaddr_in client{};
    socklen_t clientLen = sizeof(client);
    const int fd = ::accept(listenFd, reinterpret_cast<sockaddr*>(&client), &clientLen);
    if (fd < 0) continue;

    // Read HTTP handshake (simple, blocking).
    std::string req;
    req.reserve(2048);
    for (;;) {
      char buf[1024];
      const ssize_t n = ::recv(fd, buf, sizeof(buf), 0);
      if (n <= 0) break;
      req.append(buf, buf + n);
      if (req.find("\r\n\r\n") != std::string::npos) break;
      if (req.size() > 32 * 1024) break;
    }

    std::string clientKey;
    if (!parseHeader(req, "Sec-WebSocket-Key", clientKey)) {
      ::close(fd);
      continue;
    }
    const std::string accept = wsAcceptKey(clientKey);

    std::ostringstream resp;
    resp
      << "HTTP/1.1 101 Switching Protocols\r\n"
      << "Upgrade: websocket\r\n"
      << "Connection: Upgrade\r\n"
      << "Sec-WebSocket-Accept: " << accept << "\r\n"
      << "\r\n";
    const std::string respStr = resp.str();
    if (!sendAll(fd, reinterpret_cast<const uint8_t*>(respStr.data()), respStr.size())) {
      ::close(fd);
      continue;
    }

    std::cout << "Client connected\n";

    std::atomic<bool> alive{true};
    std::thread tx([&]{
      std::mt19937 rng{std::random_device{}()};
      std::uniform_real_distribution<double> tempJitter(-0.8, 0.8);
      double cpu = 48.0, gpu = 52.0;

      while (alive.load()) {
        const std::string ts = nowIso8601Utc();

        {
          std::ostringstream js;
          js << "{\"type\":\"heartbeat\",\"ts\":\"" << ts << "\"}";
          if (!sendTextFrame(fd, js.str())) break;
        }
        {
          cpu += tempJitter(rng);
          gpu += tempJitter(rng);
          if (cpu < 30) cpu = 30;
          if (cpu > 95) cpu = 95;
          if (gpu < 30) gpu = 30;
          if (gpu > 95) gpu = 95;

          std::ostringstream js;
          js << std::fixed << std::setprecision(1);
          js << "{\"type\":\"thermal\",\"ts\":\"" << ts << "\",\"cpuC\":" << cpu << ",\"gpuC\":" << gpu << "}";
          if (!sendTextFrame(fd, js.str())) break;
        }

        std::this_thread::sleep_for(std::chrono::seconds(1));
      }
      alive.store(false);
    });

    // Simple RX loop: just drain until disconnect (so the socket errors quickly).
    while (alive.load()) {
      uint8_t b[2];
      const ssize_t n = ::recv(fd, b, sizeof(b), 0);
      if (n <= 0) break;
      // Ignore all client frames (browser will mask them). This skeleton is TX-focused.
    }

    alive.store(false);
    try { tx.join(); } catch (...) {}
    ::close(fd);
    std::cout << "Client disconnected\n";
  }
}

