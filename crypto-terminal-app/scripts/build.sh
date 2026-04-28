#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Swift build (release)"
cd "$ROOT_DIR"
swift build -c release --disable-sandbox

echo "==> C++ engine build (release)"
if command -v cmake >/dev/null 2>&1; then
  cmake -S "$ROOT_DIR/engine" -B "$ROOT_DIR/engine/build" -DCMAKE_BUILD_TYPE=Release
  cmake --build "$ROOT_DIR/engine/build" --config Release -j
else
  echo "WARN: cmake not found; using clang++ fallback (engine/build/telemetry_engine)"
  mkdir -p "$ROOT_DIR/engine/build"
  c++ -std=c++17 -O2 -o "$ROOT_DIR/engine/build/telemetry_engine" "$ROOT_DIR/engine/src/main.cpp"
fi

echo "OK"

