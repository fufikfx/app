# Crypto Terminal (macOS)

SwiftUI macOS wrapper around an existing HTML “terminal” UI rendered in `WKWebView`, plus a tiny C++ telemetry engine that (for now) serves a local WebSocket with placeholder JSON.

## Prerequisites

- macOS 13+
- Xcode Command Line Tools
- CMake (optional; scripts have a clang++ fallback)

Install CLT:

```bash
xcode-select --install
```

## Project layout

- `Sources/crypto-terminal-app/`: SwiftUI app (Swift Package executable)
- `Sources/crypto-terminal-app/Resources/terminal_work-3-crypto.html`: bundled HTML resource
- `engine/`: C++ engine built by CMake (`telemetry_engine`)
- `scripts/`: build/run/package helpers

## Build

From repo root:

```bash
./scripts/build.sh
```

This runs:

- `swift build -c release --disable-sandbox`
- `cmake -S engine -B engine/build -DCMAKE_BUILD_TYPE=Release && cmake --build engine/build` (or a clang++ fallback if CMake is missing)

## Run (app + local telemetry)

```bash
./scripts/run.sh 8765
```

- Starts the engine at `ws://127.0.0.1:8765`
- Launches the SwiftUI app with `TELEMETRY_WS_PORT=8765`
- The HTML will attempt a best-effort connection and only logs telemetry to the JS console (it still works standalone without the server).

## Package into a `.app`

```bash
./scripts/package_app.sh
open dist/CryptoTerminal.app
```

The packager creates a minimal `.app` bundle:

- `dist/CryptoTerminal.app/Contents/MacOS/CryptoTerminal` (Swift executable)
- `dist/CryptoTerminal.app/Contents/Resources/terminal_work-3-crypto.html`
- `dist/CryptoTerminal.app/Contents/Info.plist`

