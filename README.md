# Professional System v14 — News Feed Setup

## Struktura repozitáře

```
your-repo/
├── index.html                    ← hlavní stránka (nahraň novou verzi)
├── scraper.py                    ← scraper zpráv (12 kategorií)
├── requirements.txt              ← Python závislosti
├── data/
│   └── news.json                 ← auto-generované, NEPŘIDÁVEJ ručně
└── .github/
    └── workflows/
        └── scrape.yml            ← GitHub Actions (každých 15 minut)
```

## Setup (5 kroků)

### 1. Nahraj soubory na GitHub
```
index.html       → kořen repozitáře
scraper.py       → kořen repozitáře
requirements.txt → kořen repozitáře
scrape.yml       → .github/workflows/scrape.yml
```

### 2. GitHub Pages
Settings → Pages → Source: **Deploy from branch: main / root**

### 3. Přidej NewsAPI klíč (volitelné, RSS feedů je dost i bez něj)
Settings → Secrets and variables → Actions → New repository secret
- Name: `NEWSAPI_KEY`
- Value: klíč z [newsapi.org](https://newsapi.org) (zdarma tier)

### 4. První spuštění scraperu
Actions → **News Scraper** → Run workflow

Počkej ~2 minuty → zkontroluj `data/news.json`

### 5. Ověř URL v index.html
Ujisti se, že `GITHUB_NEWS_URL` odpovídá tvému repozitáři:
```javascript
const GITHUB_NEWS_URL = 'https://raw.githubusercontent.com/TVOJE_USERNAME/TVUJ_REPO/main/data/news.json';
```

---

## Kategorie zpráv (12 složek)

| Kategorie | Obsah | Barva |
|-----------|-------|-------|
| ALL_NEWS | Vše dohromady — Live Breaking | 🟠 |
| TOP_NEWS | Top News Stories | ⚪ |
| MACRO | Macro — Central Banks & Data | 🟢 |
| MARKETS | Markets — Equities & FX | 🔵 |
| CRYPTO | Crypto — Digital Assets | 🟣 |
| EARNINGS | Earnings — Corp Results | 🟡 |
| ENERGY | Energy — Oil & Gas | 🟠 |
| CENTRAL_BANKS | FED ECB BOE BOJ — Officiální zprávy | 🟢 |
| COMPANY | Company News | ⚪ |
| RESEARCH | News & Research — Filtered | 🟣 |
| INTELLIGENCE | Global Intelligence Feed | 🟠 |
| WATCHLIST | Journalist & Trader Watchlist | 🔴 |

---

## Automatické mazání starých zpráv

- **TTL**: 7 dní — zprávy starší než 7 dní jsou automaticky odstraněny
- **Scraper**: každých 15 minut přidá nové, vymaže staré
- **Weekly purge**: každou neděli v 00:00 UTC se provede kompletní čistka

Výsledek: `data/news.json` nikdy neobsahuje zprávy starší než 1 týden.

---

## Jak zobrazit zprávy v aplikaci

V příkazovém řádku aplikace napiš: **GHNEWS**

Panel zobrazí zprávy rozdělené do záložek podle kategorií.
