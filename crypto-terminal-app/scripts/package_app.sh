#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="CryptoTerminal"
TARGET="crypto-terminal-app"

cd "$ROOT_DIR"

echo "==> Swift build (release)"
swift build -c release --disable-sandbox

BIN="$ROOT_DIR/.build/release/$TARGET"
if [[ ! -x "$BIN" ]]; then
  echo "ERROR: Swift executable not found at $BIN" >&2
  exit 1
fi

OUT_DIR="$ROOT_DIR/dist"
APP_DIR="$OUT_DIR/$APP_NAME.app"
CONTENTS="$APP_DIR/Contents"
MACOS_DIR="$CONTENTS/MacOS"
RES_DIR="$CONTENTS/Resources"

echo "==> Assembling $APP_DIR"
rm -rf "$APP_DIR"
mkdir -p "$MACOS_DIR" "$RES_DIR"

cp "$BIN" "$MACOS_DIR/$APP_NAME"
cp "$ROOT_DIR/Sources/$TARGET/Resources/terminal_work-3-crypto.html" "$RES_DIR/terminal_work-3-crypto.html"

cat > "$CONTENTS/Info.plist" <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key>
  <string>CryptoTerminal</string>
  <key>CFBundleDisplayName</key>
  <string>CryptoTerminal</string>
  <key>CFBundleIdentifier</key>
  <string>com.example.crypto-terminal</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>CFBundleShortVersionString</key>
  <string>0.1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleExecutable</key>
  <string>CryptoTerminal</string>
  <key>LSMinimumSystemVersion</key>
  <string>13.0</string>
</dict>
</plist>
EOF

echo "==> Done: $APP_DIR"
echo "Run: open \"$APP_DIR\""

