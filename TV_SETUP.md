# TradingView MCP → Professional System v14
## Kompletní průvodce propojením

---

## Co dostaneš

Po nastavení budeš mít v terminálu:
- **Panel `TVLIVE`** — live cena, OHLCV, indikátory, support/resistance z tvého TV grafu
- **Cenové úrovně** — automaticky injektované do zpráv jako market alerty
- **Badge** vpravo dole — živý status TV připojení
- **Automatický refresh** každých 30 sekund

---

## Krok 1: Nainstaluj tradingview-mcp

```bash
git clone https://github.com/tradesdontlie/tradingview-mcp.git ~/tradingview-mcp
cd ~/tradingview-mcp
npm install
```

---

## Krok 2: Spusť TradingView s debug portem

**Mac:**
```bash
/Applications/TradingView.app/Contents/MacOS/TradingView --remote-debugging-port=9222
```
Nebo použij skript:
```bash
~/tradingview-mcp/scripts/launch_tv_debug_mac.sh
```

**Windows:**
```bash
%LOCALAPPDATA%\TradingView\TradingView.exe --remote-debugging-port=9222
```
Nebo: `scripts\launch_tv_debug.bat`

**Linux:**
```bash
/opt/TradingView/tradingview --remote-debugging-port=9222
```

---

## Krok 3: Nainstaluj bridge (`tv_bridge.js`)

```bash
# Zkopíruj tv_bridge.js do složky tradingview-mcp
cp tv_bridge.js ~/tradingview-mcp/

# Nainstaluj chrome-remote-interface
cd ~/tradingview-mcp
npm install chrome-remote-interface
```

Spusť bridge (nech běžet na pozadí):
```bash
node tv_bridge.js
```

Co uvidíš v konzoli:
```
[TV-BRIDGE] Starting TradingView → Professional System bridge
[TV-BRIDGE] 2026-04-02T10:30:00Z — BTCUSDT 83245 (+1.24%) | 12 levels
[TV-BRIDGE] 2026-04-02T10:30:30Z — BTCUSDT 83312 (+1.32%) | 12 levels
```

---

## Krok 4: Nahraj data na GitHub (automaticky)

Bridge ukládá do `data/tv_live.json`. Přidej do GitHub Actions:

```yaml
# .github/workflows/tv_push.yml
name: TV Live Push
on:
  schedule:
    - cron: '*/2 * * * *'   # každé 2 minuty
  workflow_dispatch:

jobs:
  push:
    runs-on: self-hosted    # musí běžet na tvém stroji kde běží TV
    steps:
      - uses: actions/checkout@v4
      - run: node tv_bridge.js --once
      - run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/tv_live.json
          git diff --staged --quiet || git commit -m "tv: live update" && git push
```

**NEBO** jednodušší — push ručně z bridge:

```bash
# tv_bridge.js s auto-push (přidej na konec snapshot funkce)
execSync('git add data/tv_live.json && git commit -m "tv: update" && git push', {cwd: '/path/to/repo'});
```

---

## Krok 5: Ověř v terminálu

1. Nahraj nový `index.html` na GitHub
2. Otevři stránku
3. V příkazovém řádku napiš: **`TVLIVE`**
4. Uvidíš live data z tvého grafu

---

## Volitelné: Claude Code přímé propojení

Přidej do `~/.claude/.mcp.json`:
```json
{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["/Users/TVOJE_JMENO/tradingview-mcp/src/server.js"]
    }
  }
}
```

Pak v Claude Code můžeš psát:
- *"Použij tv_health_check"* — ověř připojení
- *"Použij quote_get"* — aktuální cena
- *"Použij data_get_pine_lines"* — support/resistance úrovně
- *"Použij chart_set_symbol NVDA"* — přepni graf
- *"Analyzuj můj graf"* — kompletní analýza

---

## Architektura

```
TradingView Desktop ←─ --remote-debugging-port=9222
        │
        ▼  CDP (Chrome DevTools Protocol)
   tv_bridge.js  (běží lokálně na tvém PC)
        │
        ▼  každých 30s
   data/tv_live.json  (GitHub repo)
        │
        ▼  fetch každých 30s
   Professional System v14  (panel TVLIVE)
```

---

## Troubleshooting

| Problém | Řešení |
|---------|--------|
| `ECONNREFUSED` | TradingView neběží nebo bez `--remote-debugging-port=9222` |
| `No TradingView page found` | Zkontroluj že TV Desktop je otevřený a přihlášený |
| Badge je šedý | `data/tv_live.json` neexistuje — spusť `tv_bridge.js --once` |
| Badge říká STALE | bridge neběží nebo necommituje na GitHub |
| Žádné levels | Přidej Pine indikátory s `line.new()` na graf v TV |
