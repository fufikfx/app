#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${1:-8765}"

echo "==> Building debug targets"
cd "$ROOT_DIR"
swift build --disable-sandbox
if command -v cmake >/dev/null 2>&1; then
  cmake -S "$ROOT_DIR/engine" -B "$ROOT_DIR/engine/build" -DCMAKE_BUILD_TYPE=Debug
  cmake --build "$ROOT_DIR/engine/build" --config Debug -j
else
  echo "WARN: cmake not found; using clang++ fallback (engine/build/telemetry_engine)"
  mkdir -p "$ROOT_DIR/engine/build"
  c++ -std=c++17 -O0 -g -o "$ROOT_DIR/engine/build/telemetry_engine" "$ROOT_DIR/engine/src/main.cpp"
fi

ENGINE="$ROOT_DIR/engine/build/telemetry_engine"
if [[ ! -x "$ENGINE" ]]; then
  echo "ERROR: engine binary not found at $ENGINE" >&2
  exit 1
fi

echo "==> Starting engine on ws://127.0.0.1:$PORT"
"$ENGINE" "$PORT" &
ENGINE_PID="$!"
cleanup() { kill "$ENGINE_PID" >/dev/null 2>&1 || true; }
trap cleanup EXIT INT TERM

echo "==> Launching macOS app"
TELEMETRY_WS_PORT="$PORT" swift run

