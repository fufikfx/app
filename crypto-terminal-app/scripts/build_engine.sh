#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/engine/build"
mkdir -p "$BUILD_DIR"

if command -v cmake >/dev/null 2>&1; then
  cmake -S "$ROOT_DIR/engine" -B "$BUILD_DIR" -DCMAKE_BUILD_TYPE=Release
  cmake --build "$BUILD_DIR" --config Release
  exit 0
fi

echo "cmake not found; building engine with clang++ fallback" >&2

OUT="$BUILD_DIR/crypto_engine"
xcrun clang++ -std=c++17 -O2 -Wall -Wextra -Wpedantic \
  "$ROOT_DIR/engine/src/main.cpp" -o "$OUT"

echo "Built $OUT"

