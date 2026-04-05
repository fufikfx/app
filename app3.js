            ("https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml","NYT Politics",  2),
            ("https://feeds.reuters.com/reuters/politicsNews",           "Reuters Pol",   1),
            ("https://www.cnbc.com/id/100727362/device/rss/rss.html",    "CNBC World",    2),
            ("https://www.aljazeera.com/xml/rss/all.xml",                "Al Jazeera",    2),
            ("https://foreignpolicy.com/feed/",                          "Foreign Policy",2),
            ("https://www.defensenews.com/rss/",                         "Defense News",  2),
            ("https://www.sputniknews.com/export/rss2/archive/index.xml","Sputnik",       3),
        ],
    },
}

# ── NOISE FILTER ──────────────────────────────────────────────────────────────
NOISE_PATTERNS = [
    r'\btop \d+\b', r'\bbest crypto\b', r'how to buy', r'\btutorial\b',
    r'\bguide to\b', r'you need to know', r"here's why", r'this is why',
    r'\bmust read\b', r'watch out', r'everything you', r'\bbeginner\b',
    r'step by step', r'explained simply', r'weekly roundup', r'monthly recap',
    r'price prediction 20\d\d', r'will btc reach', r'is bitcoin dead',
    r'buy the dip', r'to the moon', r'\bwagmi\b', r'\bgm\b', r'\bgn\b',
    r'nft drop', r'nft mint', r'nft launch', r'airdrop alert', r'new listing',
    r'\bsign up\b', r'\bsubscribe\b', r'\bnewsletter\b', r'\bsponsored\b',
    r'\badvertisement\b', r'\blisticle\b', r'round-up', r'\broundup\b',
    r'what to watch', r'things to know',
]
NOISE_RE = re.compile('|'.join(NOISE_PATTERNS), re.IGNORECASE)


def _quality(title: str) -> bool:
    if len(title) < 20:
        return False
    if NOISE_RE.search(title):
        return False
    return True


def _dedup_key(title: str) -> str:
    t = re.sub(r'[^a-z0-9]', '', title.lower())
    return hashlib.md5(t[:80].encode()).hexdigest()


def _detect_sector(title: str, desc: str, default_sector: str) -> str:
    """Override sector if title clearly belongs to another sector."""
    text = (title + " " + desc).lower()
    scores = {}
    for sec, cfg in SECTORS.items():
        scores[sec] = sum(1 for kw in cfg["keywords"] if kw in text)
    best = max(scores, key=lambda s: scores[s])
    # Only override if clearly dominant (2+ keywords more than default)
    if best != default_sector and scores[best] >= scores[default_sector] + 2:
        return best
    return default_sector


def _parse_ts(pub_date_str: str) -> int:
    """Parse pubDate string → unix timestamp."""
    if not pub_date_str:
        return int(time.time())
    try:
        # feedparser already parses to struct_time
        return int(time.mktime(pub_date_str))
    except Exception:
        pass
    try:
        from email.utils import parsedate_to_datetime
        return int(parsedate_to_datetime(pub_date_str).timestamp())
    except Exception:
        return int(time.time())


def fetch_rss(url: str, src_name: str, sector: str, tier: int, limit: int = 25) -> list:
    """Fetch one RSS feed → list of article dicts."""
    items = []
    try:
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)"
        })
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)

        for entry in feed.entries[:limit]:
            title = re.sub(r'<[^>]+>', '', entry.get("title", "")).strip()
            if not title or not _quality(title):
                continue

            link  = entry.get("link", "")
            desc  = re.sub(r'<[^>]+>', '', entry.get("summary", "") or entry.get("description", "")).strip()[:500]
            ts    = _parse_ts(entry.get("published_parsed"))
            real_sector = _detect_sector(title, desc, sector)

            items.append({
                "id":     _dedup_key(title),
                "title":  title,
                "src":    src_name,
                "sector": real_sector,
                "tag":    real_sector,
                "ts":     ts,
                "link":   link,
                "body":   desc,
                "tier":   tier,
            })
    except Exception as e:
        print(f"  [WARN] {src_name}: {e}")
    return items


def fetch_newsapi(sector: str, query: str, limit: int = 30) -> list:
    """Fetch from NewsAPI.org with query → list of article dicts."""
    if not NEWSAPI_KEY:
        return []
    items = []
    try:
        url = "https://newsapi.org/v2/everything"
        params = {
            "q":          query,
            "language":   "en",
            "sortBy":     "publishedAt",
            "pageSize":   min(limit, 100),
            "apiKey":     NEWSAPI_KEY,
        }
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        for art in data.get("articles", []):
            title = (art.get("title") or "").strip()
            if not title or title == "[Removed]" or not _quality(title):
                continue
            src_name = (art.get("source") or {}).get("name", "NewsAPI")
            desc     = (art.get("description") or "").strip()[:500]
            pub      = art.get("publishedAt", "")
            try:
                ts = int(datetime.fromisoformat(pub.replace("Z", "+00:00")).timestamp())
            except Exception:
                ts = int(time.time())

            items.append({
                "id":     _dedup_key(title),
                "title":  title,
                "src":    src_name,
                "sector": sector,
                "tag":    sector,
                "ts":     ts,
                "link":   art.get("url", ""),
                "body":   desc,
                "tier":   2,
            })
    except Exception as e:
        print(f"  [WARN] NewsAPI/{sector}: {e}")
    return items


NEWSAPI_QUERIES = {
    "CRYPTO": "bitcoin OR ethereum OR crypto OR blockchain OR defi OR \"digital assets\"",
    "STOCKS": "earnings OR stocks OR equities OR \"wall street\" OR ipo OR nasdaq",
    "MACRO":  "\"federal reserve\" OR inflation OR \"interest rates\" OR gdp OR recession OR ecb",
    "GEO":    "geopolitics OR sanctions OR \"oil price\" OR opec OR commodities OR \"trade war\"",
}


def load_existing() -> dict:
    """Load existing news.json → dict keyed by sector."""
    if OUTPUT_FILE.exists():
        try:
            with open(OUTPUT_FILE) as f:
                return json.load(f)
        except Exception:
            pass
    return {"meta": {}, "sectors": {s: [] for s in SECTORS}}


def expire_old(articles: list, ttl_days: int = TTL_DAYS) -> list:
    """Remove articles older than ttl_days."""
    cutoff = int(time.time()) - ttl_days * 86400
    return [a for a in articles if (a.get("ts") or 0) >= cutoff]


def merge_articles(existing: list, fresh: list, max_items: int = MAX_ITEMS) -> list:
    """Merge fresh into existing, dedup, sort by recency."""
    seen  = {a["id"] for a in existing}
    added = 0
    for art in fresh:
        if art["id"] not in seen:
            seen.add(art["id"])
            existing.append(art)
            added += 1

    # Sort: tier asc, ts desc
    existing.sort(key=lambda a: (a.get("tier", 3), -(a.get("ts") or 0)))
    print(f"    + {added} new articles added")
    return existing[:max_items]


def main():
    print(f"\n{'='*60}")
    print(f"  NEWS SCRAPER  {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"{'='*60}")

    # Load existing data (persistent across runs)
    data = load_existing()
    if "sectors" not in data:
        data["sectors"] = {}

    total_new = 0

    for sector_id, cfg in SECTORS.items():
        print(f"\n▶ {sector_id} — {cfg['label']}")
        existing = data["sectors"].get(sector_id, [])
        existing = expire_old(existing)

        fresh_all = []

        # 1. RSS feeds
        for feed_url, src_name, tier in cfg["feeds"]:
            print(f"  RSS {src_name}...")
            items = fetch_rss(feed_url, src_name, sector_id, tier)
            fresh_all.extend(items)

        # 2. NewsAPI
        if NEWSAPI_KEY:
            print(f"  NewsAPI...")
            items = fetch_newsapi(sector_id, NEWSAPI_QUERIES[sector_id])
            fresh_all.extend(items)

        before = len(existing)
        merged = merge_articles(existing, fresh_all)
        total_new += len(merged) - before
        data["sectors"][sector_id] = merged
        print(f"  ✓ {len(merged)} total articles ({cfg['label']})")

    # Meta
    data["meta"] = {
        "updated":    int(time.time()),
        "updated_iso": datetime.now(timezone.utc).isoformat(),
        "ttl_days":   TTL_DAYS,
        "sectors":    {s: len(data["sectors"].get(s, [])) for s in SECTORS},
        "total":      sum(len(data["sectors"].get(s, [])) for s in SECTORS),
    }

    # Save
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    print(f"\n{'='*60}")
    print(f"  ✅ Saved {data['meta']['total']} articles → {OUTPUT_FILE}")
    print(f"  Sectors: { {s: data['meta']['sectors'][s] for s in SECTORS} }")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()


════════════════════════════════════════════════════════════════════════════════
FILE: .github/workflows/scrape.yml  (ulož do .github/workflows/scrape.yml)
════════════════════════════════════════════════════════════════════════════════
name: News Scraper

on:
  schedule:
    # Runs every 15 minutes (GitHub minimum is 5 min)
    - cron: '*/15 * * * *'
  workflow_dispatch:   # Manual trigger from GitHub UI
  push:
    branches: [main]
    paths:
      - 'scraper.py'
      - 'requirements.txt'
      - '.github/workflows/scrape.yml'

jobs:
  scrape:
    runs-on: ubuntu-latest
    permissions:
      contents: write   # Needed to commit data/news.json back to repo

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: pip

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run scraper
        env:
          NEWSAPI_KEY: ${{ secrets.NEWSAPI_KEY }}
        run: python scraper.py

      - name: Commit & push news.json
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

          # Only commit if data/news.json changed
          if git diff --quiet data/news.json; then
            echo "No changes in news.json — skipping commit"
          else
            git add data/news.json
            ARTICLE_COUNT=$(python -c "import json; d=json.load(open('data/news.json')); print(d['meta']['total'])")
            git commit -m "chore: news update — ${ARTICLE_COUNT} articles [$(date -u '+%H:%M UTC')]"
            git push
          fi


════════════════════════════════════════════════════════════════════════════════
FILE: requirements.txt  (ulož jako requirements.txt v kořeni repo)
════════════════════════════════════════════════════════════════════════════════
feedparser==6.0.11
requests==2.32.3
-->
<script>
(function(){
'use strict';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const GITHUB_NEWS_URL = 'https://raw.githubusercontent.com/fufikfx/app/main/data/news.json';

const POLL_INTERVAL_MS = 5 * 60 * 1000;   // re-fetch every 5 min
const TTL_DAYS         = 7;               // weekly purge — matches scraper.py
const MAX_DISPLAY      = 500;             // max articles shown per category tab

// Category display config (matches sidebar menu + scraper.py CATEGORIES)
const SECTOR_CFG = {
  ALL_NEWS:      { label:'All News — Live Breaking',        color:'#ff7700', icon:'◈' },
  TOP_NEWS:      { label:'Top News Stories',                color:'#ffffff', icon:'★' },
  MACRO:         { label:'Macro — Central Banks & Data',    color:'#34d399', icon:'🏦' },
  MARKETS:       { label:'Markets — Equities & FX',         color:'#60a5fa', icon:'📈' },
  CRYPTO:        { label:'Crypto — Digital Assets',         color:'#a78bce', icon:'₿' },
  EARNINGS:      { label:'Earnings — Corp Results',         color:'#fbbf24', icon:'📊' },
  ENERGY:        { label:'Energy — Oil & Gas',              color:'#f97316', icon:'⚡' },
  CENTRAL_BANKS: { label:'Central Banks — FED ECB BOE BOJ', color:'#a3e635', icon:'🏛' },
  COMPANY:       { label:'Company News',                    color:'#94a3b8', icon:'🏢' },
  RESEARCH:      { label:'News & Research — Filtered',      color:'#e879f9', icon:'🔬' },
  INTELLIGENCE:  { label:'Global Intelligence Feed',        color:'#fb923c', icon:'🌐' },
  WATCHLIST:     { label:'Journalist & Trader Watchlist',   color:'#ff4444', icon:'👁' },
};

// ─── STATE ───────────────────────────────────────────────────────────────────
let _ghNews = {
  ALL_NEWS:[], TOP_NEWS:[], MACRO:[], MARKETS:[], CRYPTO:[],
  EARNINGS:[], ENERGY:[], CENTRAL_BANKS:[], COMPANY:[],
  RESEARCH:[], INTELLIGENCE:[], WATCHLIST:[]
};
let _ghMeta = {};
let _ghLastFetch = 0;
let _ghFetching  = false;
let _ghActiveSector = 'ALL_NEWS';

window._ghNews = _ghNews;

// ─── FETCH ───────────────────────────────────────────────────────────────────
async function _fetchGHNews(force) {
  if (_ghFetching) return;
  const now = Date.now();
  if (!force && (now - _ghLastFetch) < POLL_INTERVAL_MS) return;
  _ghFetching = true;
  try {
    const url = GITHUB_NEWS_URL + '?t=' + now;
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    _ghMeta = data.meta || {};

    // Support both old format {sectors:{}} and new format {categories:{}}
    const src = data.categories || data.sectors || {};

    // Map old sector keys to new category keys if needed
    const ALIAS = { ALL:'ALL_NEWS', STOCKS:'MARKETS', GEO:'INTELLIGENCE' };
    Object.keys(_ghNews).forEach(k => { _ghNews[k] = []; });

    Object.entries(src).forEach(([key, articles]) => {
      const cat = ALIAS[key] || key;
      if (!Array.isArray(articles)) return;
      // TTL filter
      const cutoff = Math.floor(Date.now()/1000) - TTL_DAYS * 86400;
      const fresh = articles.filter(a => !a.ts || a.ts >= cutoff);
      _ghNews[cat] = (_ghNews[cat] || []).concat(fresh);
    });

    _ghLastFetch = now;
    _mergeIntoNewsCache();
    _refreshGHPanel();
    console.log('[GH-NEWS] Fetched OK —', _ghMeta.total || '?', 'articles,', Object.keys(_ghNews).length, 'categories');
  } catch(e) {
    console.warn('[GH-NEWS] Fetch error:', e.message);
  } finally {
    _ghFetching = false;
  }
}

function _mergeIntoNewsCache() {
  const cache = window._newsCache;
  if (!Array.isArray(cache)) return;
  const seen = new Set(cache.map(n => (n.title||'').slice(0,60).toLowerCase()));

  Object.values(_ghNews).forEach(articles => {
    articles.forEach(art => {
      const key = (art.title||'').slice(0,60).toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      cache.push({
        title:  art.title,
        src:    art.src,
        tag:    art.sector || art.tag || 'NEWS',
        ts:     art.ts,
        link:   art.link,
        body:   art.body || '',
        tier:   art.tier || 3,
        _fromGH: true,
      });
    });
  });

  // Re-sort: tier asc, ts desc
  cache.sort((a,b) => {
    const td = (a.tier||3) - (b.tier||3);
    return td !== 0 ? td : (b.ts||0) - (a.ts||0);
  });
}

// ─── FORMAT HELPERS ───────────────────────────────────────────────────────────
function _fmtAgo(ts) {
  if (!ts) return '—';
  const d = Math.floor(Date.now()/1000) - ts;
  if (d < 60)    return `${d}s ago`;
  if (d < 3600)  return `${Math.floor(d/60)}m ago`;
  if (d < 86400) return `${Math.floor(d/3600)}h ago`;
  return `${Math.floor(d/86400)}d ago`;
}

function _fmtTime(ts) {
  if (!ts) return '--:--';
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false });
}

function _tierColor(tier) {
  return tier === 1 ? '#ff7700' : tier === 2 ? '#cc8800' : '#664400';
}

function _tagColor(tag) {
  const m = {
    CRYPTO:'#a78bce', STOCKS:'#60a5fa', MACRO:'#34d399',
    GEO:'#fb923c',    MARKETS:'#60a5fa', FLASH:'#ff3333',
    EARNINGS:'#ffcc44', DEFI:'#8b5cf6', ENERGY:'#f97316',
  };
  return m[tag] || '#ff7700';
}

// ─── BUILD SECTOR TAB HTML ────────────────────────────────────────────────────
function _buildGHNewsHTML(sector) {
  const isAll = sector === 'ALL';

  // Gather articles
  let articles = [];
  if (isAll) {
    Object.values(_ghNews).forEach(arr => articles.push(...arr));
    articles.sort((a,b) => (b.ts||0) - (a.ts||0));
    articles = articles.slice(0, MAX_DISPLAY);
  } else {
    articles = (_ghNews[sector] || []).slice(0, MAX_DISPLAY);
  }

  if (articles.length === 0) {
    return `<div style="padding:40px 20px;text-align:center;color:#443322;font-size:10px;letter-spacing:2px">
      NO ARTICLES — LOADING FROM GITHUB...<br>
      <span style="font-size:8px;color:#332211;margin-top:8px;display:block">
        URL: ${GITHUB_NEWS_URL.slice(0,60)}...
      </span>
    </div>`;
  }

  const now = Date.now()/1000;
  let rows = '';
  let prevDay = '';

  for (const art of articles) {
    const dayStr = art.ts
      ? new Date(art.ts*1000).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})
      : 'TODAY';

    // Day separator
    if (dayStr !== prevDay) {
      rows += `<tr><td colspan="4" style="padding:6px 8px 2px;color:#332200;font-size:7.5px;letter-spacing:2px;border-top:1px solid #1a0f00;border-bottom:1px solid #0f0800">
        ${dayStr.toUpperCase()}
      </td></tr>`;
      prevDay = dayStr;
    }

    const ageS  = now - (art.ts||now);
    const isNew = ageS < 900; // < 15 min
    const tagC  = _tagColor(art.sector || art.tag);
    const tierC = _tierColor(art.tier);
    const src   = (art.src||'').slice(0,14);

    rows += `<tr class="_ghn-row" style="border-bottom:1px solid #0d0900;cursor:pointer"
      onclick="if(${JSON.stringify(art.link||'')}){window.open(${JSON.stringify(art.link||'')})}"
      onmouseover="this.style.background='#0f0900'" onmouseout="this.style.background=''">
      <td style="padding:4px 6px 4px 10px;width:44px;white-space:nowrap;color:#443322;font-size:9px;font-family:'Roboto Mono',monospace;vertical-align:top;padding-top:5px">
        ${_fmtTime(art.ts)}
      </td>
      <td style="padding:4px 5px;width:70px;vertical-align:top">
        <span style="display:inline-block;font-size:7px;letter-spacing:.5px;color:${tagC};border:1px solid ${tagC}44;padding:0 4px;line-height:14px;white-space:nowrap">
          ${(art.sector||art.tag||'NEWS').slice(0,8)}
        </span>
      </td>
      <td style="padding:4px 8px 4px 4px;line-height:1.4;vertical-align:top">
        <span style="color:${isNew?'#ffaa44':'#cc7733'};font-size:10px">
          ${isNew ? '● ' : ''}${art.title}
        </span>
        ${art.body ? `<div style="color:#553322;font-size:8px;margin-top:2px;line-height:1.3">${art.body.slice(0,120)}...</div>` : ''}
      </td>
      <td style="padding:4px 10px 4px 4px;white-space:nowrap;text-align:right;vertical-align:top">
        <span style="color:${tierC};font-size:8px">${src}</span><br>
        <span style="color:#332211;font-size:7.5px;font-family:'Roboto Mono',monospace">${_fmtAgo(art.ts)}</span>
      </td>
    </tr>`;
  }

  const cfg    = SECTOR_CFG[sector] || SECTOR_CFG.ALL;
  const upd    = _ghMeta.updated ? _fmtAgo(_ghMeta.updated) : '—';
  const count  = articles.length;

  return `
  <div style="display:flex;flex-direction:column;height:100%;background:#000;font-family:'Courier Prime','Courier New',monospace">
    <!-- Header strip -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 12px;border-bottom:1px solid #1a0f00;flex-shrink:0;background:#030200">
      <span style="color:${cfg.color};font-size:9px;font-weight:700;letter-spacing:1.5px">${cfg.label}</span>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="color:#443322;font-size:8px">${count} ARTICLES</span>
        <span style="color:#332211;font-size:7.5px">UPDATED ${upd}</span>
        <span onclick="window._ghFetchNow()" style="color:#663300;font-size:7.5px;letter-spacing:1px;cursor:pointer;border:1px solid #331100;padding:1px 6px"
          onmouseover="this.style.color='#ff7700'" onmouseout="this.style.color='#663300'">↻ REFRESH</span>
      </div>
    </div>
    <!-- Table -->
    <div style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#1a0f00 #000">
      <table style="width:100%;border-collapse:collapse">
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ─── SECTOR PANEL BUILDER (called by openPanel('GHNEWS')) ────────────────────
function buildGHNEWSPanel() {
  const tabs = Object.keys(SECTOR_CFG);
  const activeCfg = SECTOR_CFG[_ghActiveSector] || SECTOR_CFG.ALL;

  const tabHTML = tabs.map(sec => {
    const cfg = SECTOR_CFG[sec];
    const count = sec === 'ALL'
      ? Object.values(_ghNews).reduce((s,a) => s+a.length, 0)
      : (_ghNews[sec]||[]).length;
    const isOn = sec === _ghActiveSector;
    return `<div class="ptab${isOn?' on':''}" data-sec="${sec}"
      onclick="window._ghSwitchSector('${sec}')"
      style="gap:4px;display:flex;align-items:center;${isOn?'border-bottom:1px solid '+cfg.color+';color:'+cfg.color+';background:#0a0600':''}">
      ${sec} <span style="color:#443322;font-size:7px;margin-left:2px">${count}</span>
    </div>`;
  }).join('');

  return `
  <div style="display:flex;flex-direction:column;height:100%;background:#000;overflow:hidden">
    <div style="flex-shrink:0;background:#000;border-bottom:1px solid #1a0800;">
      <div style="height:20px;background:#b81111;display:flex;align-items:center;padding:0;border-bottom:1px solid #881010;position:relative">
        <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;letter-spacing:.2px;flex-shrink:0;background:#cc1111;border-right:1px solid #aa0e0e">Search News</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Actions &#9660;</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''"
          onclick="openPanel('CUSTSRCH')">Custom Searches</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Translate &#9660;</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Sector Feed</span>
        <span style="margin-left:auto;color:#ffcccc;font-size:9px;padding:0 10px;flex-shrink:0">Page 1</span>
      </div>
      <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
        <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
          <input id="ghnews-srch" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;caret-color:#1a0500;"
            oninput="(function(v){var b=document.getElementById('ghnews-body');if(!b)return;Array.from(b.querySelectorAll('[data-gh-item]')).forEach(function(el){var t=(el.textContent||'').toUpperCase();el.style.display=(!v||t.indexOf(v.toUpperCase())>=0)?'':'none';});})(this.value)"
            onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();}">
          <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0"
            onclick="var i=document.getElementById('ghnews-srch');i.value='';i.dispatchEvent(new Event('input'))">x</span>
        </div>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">&#8677; Sources</span>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
      </div>
      <div style="display:flex;align-items:center;background:#030200;border-bottom:1px solid #0d0800;overflow-x:auto">
        ${tabHTML}
      </div>
    </div>
    <div id="ghnews-body" style="flex:1;overflow:hidden">
      ${_buildGHNewsHTML(_ghActiveSector)}
    </div>
  </div>`;
}

// ─── SWITCH SECTOR TAB ────────────────────────────────────────────────────────
window._ghSwitchSector = function(sec) {
  _ghActiveSector = sec;
  // Update tabs
  document.querySelectorAll('[data-fn="GHNEWS"] .ptab').forEach(t => {
    const on = t.dataset.sec === sec;
    t.classList.toggle('on', on);
    const cfg = SECTOR_CFG[t.dataset.sec] || {};
    t.style.borderBottom = on ? `1px solid ${cfg.color}` : '';
    t.style.color = on ? cfg.color : '';
    t.style.background = on ? '#0a0600' : '';
  });
  const body = document.getElementById('ghnews-body');
  if (body) body.innerHTML = _buildGHNewsHTML(sec);
};

// ─── REFRESH PANEL ────────────────────────────────────────────────────────────
function _refreshGHPanel() {
  const body = document.getElementById('ghnews-body');
  if (body) body.innerHTML = _buildGHNewsHTML(_ghActiveSector);
}

window._ghFetchNow = function() { _fetchGHNews(true); };

// ─── REGISTER PANEL WITH EXISTING SYSTEM ─────────────────────────────────────
// Hook into the existing buildPanelContent dispatcher
(function _patchPanelSystem(){
  const _orig = window.buildPanelContent;
  if (typeof _orig === 'function') {
    window.buildPanelContent = function(fn) {
      if (fn === 'GHNEWS') return buildGHNEWSPanel();
      return _orig(fn);
    };
  }

  // Also patch the panel title map
  setTimeout(function(){
    try {
      // Patch _panelTitles / _TITLES if accessible
      const titleMaps = ['_panelTitles','_TITLES','_t'];
      titleMaps.forEach(k => {
        if (window[k] && typeof window[k] === 'object') {
          window[k]['GHNEWS'] = 'NEWS — SECTOR FEED';
        }
      });
    } catch(e){}
  }, 1000);
})();

// ─── SECTOR TABLE INTEGRATION ─────────────────────────────────────────────────
// Patches the existing sector table (PERF panel or similar) to show news count
function _buildSectorNewsTable() {
  const rows = Object.entries(SECTOR_CFG).filter(([s]) => s !== 'ALL').map(([sec, cfg]) => {
    const arts = _ghNews[sec] || [];
    const today = arts.filter(a => a.ts && (Date.now()/1000 - a.ts) < 86400).length;
    const week  = arts.length;
    const newest = arts[0];
    const newestTitle = newest ? newest.title.slice(0,55)+'…' : '—';

    return `<tr style="border-bottom:1px solid #0d0900;cursor:pointer"
      onclick="window._ghSwitchSectorAndOpen('${sec}')"
      onmouseover="this.style.background='#0a0700'" onmouseout="this.style.background=''">
      <td style="padding:5px 10px;white-space:nowrap">
        <span style="color:${cfg.color};font-size:9px;font-weight:700;letter-spacing:1px">${sec}</span>
      </td>
      <td style="padding:5px 8px;color:#aa6622;font-size:9px;font-family:'Roboto Mono',monospace;text-align:right">${today}</td>
      <td style="padding:5px 8px;color:#774411;font-size:9px;font-family:'Roboto Mono',monospace;text-align:right">${week}</td>
      <td style="padding:5px 10px;color:#553322;font-size:8.5px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
        ${newestTitle}
      </td>
    </tr>`;
  }).join('');

  return `
  <div style="padding:0;background:#000;font-family:'Courier Prime','Courier New',monospace">
    <div style="padding:6px 12px;border-bottom:1px solid #1a0f00;display:flex;align-items:center;justify-content:space-between">
      <span style="color:#F39F41;font-size:9px;font-weight:700;letter-spacing:2px">NEWS BY SECTOR</span>
      <span style="color:#443322;font-size:8px">TTL: ${TTL_DAYS} DAYS · AUTO-REFRESH</span>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="border-bottom:1px solid #1a0800">
          <th style="padding:3px 10px;color:#663300;font-size:7.5px;letter-spacing:1.5px;font-weight:700;text-align:left">SECTOR</th>
          <th style="padding:3px 8px;color:#663300;font-size:7.5px;letter-spacing:1.5px;font-weight:700;text-align:right">TODAY</th>
          <th style="padding:3px 8px;color:#663300;font-size:7.5px;letter-spacing:1.5px;font-weight:700;text-align:right">3 DAYS</th>
          <th style="padding:3px 10px;color:#663300;font-size:7.5px;letter-spacing:1.5px;font-weight:700;text-align:left">LATEST HEADLINE</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

// Open GH News panel pre-filtered to sector
window._ghSwitchSectorAndOpen = function(sec) {
  _ghActiveSector = sec;
  if (typeof window.openPanel === 'function') {
    window.openPanel('GHNEWS');
  }
};

// ─── INJECT SECTOR NEWS TABLE INTO EXISTING SECTOR PANELS ─────────────────────
// Finds the sector performance table and appends news section below it
function _injectSectorNewsTable() {
  // Try to find PERF panel body or any sector table
  const perfBodies = document.querySelectorAll('[data-fn="PERF"] .panel-body, [data-fn="GMHM"] .panel-body');
  perfBodies.forEach(body => {
    if (body.querySelector('#gh-sector-news-table')) return; // already injected
    const div = document.createElement('div');
    div.id = 'gh-sector-news-table';
    div.style.cssText = 'border-top:2px solid #1a0f00;margin-top:8px';
    div.innerHTML = _buildSectorNewsTable();
    body.appendChild(div);
  });
}

// ─── ADD "GHNEWS" TO CMD AUTOCOMPLETE ────────────────────────────────────────
setTimeout(function(){
  try {
    const lists = window._cmdList || window._CMD_LIST || window._BAC_LIST;
    if (Array.isArray(lists)) {
      lists.push({ cmd:'GHNEWS', desc:'News — GitHub Sector Feed (CRYPTO·STOCKS·MACRO·GEO)' });
    }
  } catch(e){}

  // Also try to hook into the autocomplete data array
  try {
    if (window._bacItems && Array.isArray(window._bacItems)) {
      window._bacItems.push({ cmd:'GHNEWS', desc:'Sector News — GitHub Live Feed', cat:'NEWS' });
    }
  } catch(e){}
}, 2000);

// ─── STARTUP ──────────────────────────────────────────────────────────────────
function _boot() {
  // Initial fetch
  _fetchGHNews(true);

  // Poll every 5 min
  setInterval(() => _fetchGHNews(false), POLL_INTERVAL_MS);

  // Re-inject sector table when PERF panel opens
  setInterval(_injectSectorNewsTable, 3000);

  console.log('%c GH-NEWS ENGINE LOADED ', 'background:#ff6600;color:#000;font-weight:bold');
  console.log('[GH-NEWS] Fetching from:', GITHUB_NEWS_URL);
  console.log('[GH-NEWS] To view: type GHNEWS in the command bar');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _boot);
} else {
  setTimeout(_boot, 800);
}

})();



(function(){
'use strict';

const TV_LIVE_URL    = 'https://raw.githubusercontent.com/fufikfx/app/main/data/tv_live.json';
const TV_POLL_MS     = 3000;     // check every 3s — SYNC WITH WIDGET
const TV_STALE_SECS  = 120;      // consider stale if >2 min old


let _tvData   = null;
let _tvFetch  = false;
window._tvLive = null;

// ── FETCH ──────────────────────────────────────────────────────────────────
async function _fetchTVLive(force) {
  if (_tvFetch && !force) return;
  _tvFetch = true;
  try {
    const resp = await fetch(TV_LIVE_URL + '?t=' + Date.now(), { cache: 'no-store' });
    if (!resp.ok) { _tvFetch = false; return; }
    const data = await resp.json();
    _tvData = data;
    window._tvLive = data;
    _applyTVData(data);
    console.log('[TV-LIVE] Loaded:', data.latest?.symbol, data.latest?.close, '|', (data.levels||[]).length, 'levels');
  } catch(e) {
    console.warn('[TV-LIVE] fetch error:', e.message);
  } finally {
    _tvFetch = false;
  }
}

// ── APPLY DATA ─────────────────────────────────────────────────────────────
function _applyTVData(data) {
  if (!data) return;
  const q = data.latest || {};
  const now = Math.floor(Date.now() / 1000);
  const age = now - (data.meta?.updated || 0);
  const stale = age > TV_STALE_SECS;

  // 1. Update status badge
  _updateTVBadge(q, stale, age);

  // 2. Inject quote into CRYPTO / MKT data if symbol matches
  _injectQuoteIntoDataArrays(q);

  // 3. Inject price levels from TV into news cache as market alerts
  if (!stale && Array.isArray(data.levels) && data.levels.length > 0) {
    _injectLevelsAsAlerts(q, data.levels, data.chart);
  }

  // 4. Trigger UI Refresh for ribbon synchronization
  if (typeof _requestRender === 'function') _requestRender();
  else if (typeof buildTicker === 'function') { buildTicker(); _patchCRYPTOPanel(); }


  // 4. Refresh TV panel if open
  const tvBody = document.getElementById('tv-live-body');
  if (tvBody) tvBody.innerHTML = _buildTVLiveHTML(data);
}

// ── STATUS BADGE ───────────────────────────────────────────────────────────
function _updateTVBadge(q, stale, ageSecs) {
  let badge = document.getElementById('tv-live-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'tv-live-badge';
    badge.style.cssText = [
      'position:fixed;bottom:6px;right:180px;z-index:9000',
      'background:#000;border:1px solid #1a1a00;padding:1px 8px',
      'font-family:\'Courier Prime\',monospace;font-size:8.5px',
      'display:flex;align-items:center;gap:5px;opacity:.85',
      'cursor:pointer;user-select:none'
    ].join(';');
    badge.onclick = () => { if (typeof openPanel === 'function') openPanel('TVLIVE'); };
    document.body.appendChild(badge);
  }
  const dot  = stale ? '⬤' : '⬤';
  const col  = stale ? '#663300' : '#009933';
  const sym  = q.symbol || 'TV';
  const px   = q.close  ? (q.close >= 1000 ? q.close.toLocaleString('en',{maximumFractionDigits:0}) : q.close >= 1 ? q.close.toFixed(2) : q.close.toFixed(4)) : '—';
  const chg  = q.chg_pct != null ? (q.chg_pct > 0 ? '+' : '') + q.chg_pct.toFixed(2) + '%' : '';
  const chgCol = (q.chg_pct || 0) >= 0 ? '#00aa33' : '#cc3300';
  const ageStr = ageSecs < 60 ? ageSecs + 's' : Math.floor(ageSecs/60) + 'm';
  badge.innerHTML = `<span style="color:${col};font-size:7px">${dot}</span><span style="color:#886600">TV</span><span style="color:#cc8800">${sym}</span><span style="color:#aa9900">${px}</span><span style="color:${chgCol}">${chg}</span><span style="color:#332200">${ageStr}</span>`;
}

// ── INJECT QUOTE INTO EXISTING DATA ARRAYS ─────────────────────────────────
function _injectQuoteIntoDataArrays(q) {
  if (!q.symbol || !q.close) return;
  
  // Mapping for TV Symbols to Terminal IDs
  const TV_MAP = {
    'SPX500': 'SPX',
    'NAS100': 'NDX',
    'US30':   'INDU',
    'GER40':  'DAX',
    'JPN225': 'NKY',
    'UK100':  'UKX',
    'XAUUSD': 'GOLD',
    'XAGUSD': 'SILVER'
  };

  const rawSym = q.symbol.toUpperCase();
  const baseSym = rawSym.replace(/USDT?$/, '');
  const targetId = TV_MAP[rawSym] || TV_MAP[baseSym] || baseSym;

  // Use the standardized updateCoin flow with highest priority (0)
  if (typeof updateCoin === 'function') {
    updateCoin(targetId, {
      px: q.close,
      chg: q.chg_pct,
      hi: q.high,
      lo: q.low,
      vol: q.volume
    }, 'tv', 0);
    
    // Also try full symbol (e.g. SPX Index) if it exists
    if (TV_MAP[rawSym] === 'SPX' || rawSym === 'SPX500') {
      updateCoin('SPX Index', { px: q.close, chg: q.chg_pct }, 'tv', 0);
    }
  }

  // Legacy fallback for objects not managed by updateCoin
  if (typeof MKT !== 'undefined' && MKT[targetId]) {
    MKT[targetId].px = q.close;
    MKT[targetId].chg = q.chg_pct || 0;
    MKT[targetId]._tvLive = true;
  }
}


// ── INJECT LEVELS AS NEWS ALERTS ───────────────────────────────────────────
function _injectLevelsAsAlerts(q, levels, chart) {
  if (!q.close || !levels.length) return;
  const close = q.close;
  const sym   = q.symbol || 'UNKNOWN';
  const now   = Date.now();

  // Find nearest levels above and below current price
  const above = levels.filter(l => l.price > close).sort((a,b) => a.price - b.price).slice(0,3);
  const below = levels.filter(l => l.price < close).sort((a,b) => b.price - a.price).slice(0,3);

  const allNearby = [...above, ...below];
  if (!allNearby.length) return;

  const news = allNearby.map(l => {
    const dist   = Math.abs((l.price - close) / close * 100);
    const dir    = l.price > close ? 'RESISTANCE' : 'SUPPORT';
    const urgent = dist < 0.5;
    return {
      title: `${sym} — ${dir} @ ${l.price >= 1000 ? l.price.toLocaleString('en',{maximumFractionDigits:0}) : l.price.toFixed(4)} (${dist.toFixed(2)}% away) [${l.source||'TV'}]`,
      src:   'TV·LEVELS',
      tag:   'MARKETS',
      ts:    now,
      link:  '',
      body:  `Current: ${close} | Level: ${l.price} | Distance: ${dist.toFixed(2)}%`,
      tier:  urgent ? 1 : 2,
      flash: urgent,
      color: l.price > close ? '#00aa44' : '#ff6600',
      _tvLevel: true,
      _ttl:     now + 5 * 60_000,  // expire in 5 min
    };
  });

  // Remove old TV level alerts, add new ones
  if (window._newsCache) {
    window._newsCache = window._newsCache.filter(n => !n._tvLevel || n._ttl > now);
    news.forEach(n => window._newsCache.unshift(n));
    if (window._newsCache.length > 800) window._newsCache.splice(800);
  }
  if (typeof NEWS_DATA !== 'undefined') {
    while (NEWS_DATA.length && NEWS_DATA[0]._tvLevel) NEWS_DATA.shift();
    news.forEach(n => NEWS_DATA.unshift({ ...n, ts: Math.floor(n.ts/1000) }));
  }
}

// ── BUILD TV LIVE PANEL HTML ────────────────────────────────────────────────
function _buildTVLiveHTML(data) {
  if (!data) return '<div style="padding:20px;color:#443322;font-size:9px;text-align:center">NO TV DATA — Run tv_bridge.js</div>';
  
  const q     = data.latest || {};
  const chart = data.chart  || {};
  const levels = data.levels || [];
  const snaps  = data.snapshots || [];
  const age   = Math.floor(Date.now()/1000) - (data.meta?.updated || 0);
  const stale = age > TV_STALE_SECS;
  const statusCol = stale ? '#883300' : '#00aa44';

  const px = v => v >= 1000 ? v.toLocaleString('en',{maximumFractionDigits:0}) : v >= 1 ? v.toFixed(2) : v.toFixed(4);
  const chgCol = c => c >= 0 ? '#00cc44' : '#ff4422';

  const levelsHTML = levels.slice(0,20).map(l => {
    const dist = q.close ? ((l.price - q.close) / q.close * 100) : 0;
    const dir  = l.price > (q.close||0) ? 'R' : 'S';
    const dirCol = dir === 'R' ? '#00aa33' : '#ff7700';
    return `<tr style="border-bottom:1px solid #0a0800">
      <td style="padding:3px 10px;font-family:'Roboto Mono',monospace;font-size:9px;color:${dirCol}">${dir}</td>
      <td style="padding:3px 8px;font-family:'Roboto Mono',monospace;font-size:9px;color:#cc8800">${px(l.price)}</td>
      <td style="padding:3px 8px;font-family:'Roboto Mono',monospace;font-size:9px;color:${dist>=0?'#009922':'#cc3300'}">${dist>=0?'+':''}${dist.toFixed(2)}%</td>
      <td style="padding:3px 10px;font-size:8.5px;color:#664400">${(l.source||'').slice(0,30)}</td>
    </tr>`;
  }).join('');

  return `
  <div style="padding:8px 12px;border-bottom:1px solid #1a0f00;display:flex;align-items:center;gap:12px">
    <span style="color:${statusCol};font-size:8px">⬤</span>
    <span style="color:#F39F41;font-size:9px;font-weight:700;letter-spacing:2px">TRADINGVIEW LIVE</span>
    <span style="color:#664400;font-size:8.5px">${chart.symbol||'—'} · ${chart.resolution||'—'}</span>
    <span style="color:#332200;font-size:8px;margin-left:auto">${stale?'STALE ':'LIVE '} ${age}s ago</span>
  </div>
  <div style="padding:6px 12px;border-bottom:1px solid #0d0800;display:flex;gap:20px">
    <div>
      <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px">LAST</div>
      <div style="color:#ff9900;font-family:'Roboto Mono',monospace;font-size:14px;font-weight:700">${q.close?px(q.close):'—'}</div>
    </div>
    <div>
      <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px">CHG</div>
      <div style="color:${chgCol(q.chg_pct||0)};font-family:'Roboto Mono',monospace;font-size:12px">${q.chg_pct!=null?(q.chg_pct>0?'+':'')+q.chg_pct.toFixed(2)+'%':'—'}</div>
    </div>
    <div>
      <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px">HIGH</div>
      <div style="color:#cc7700;font-family:'Roboto Mono',monospace;font-size:11px">${q.high?px(q.high):'—'}</div>
    </div>
    <div>
      <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px">LOW</div>
      <div style="color:#886600;font-family:'Roboto Mono',monospace;font-size:11px">${q.low?px(q.low):'—'}</div>
    </div>
    <div>
      <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px">VOL</div>
      <div style="color:#665500;font-family:'Roboto Mono',monospace;font-size:10px">${q.volume?(q.volume/1e6).toFixed(1)+'M':'—'}</div>
    </div>
  </div>
  <div style="padding:4px 12px;border-bottom:1px solid #0d0800">
    <span style="color:#553300;font-size:7.5px;letter-spacing:1.5px">INDICATORS: </span>
    <span style="color:#664400;font-size:8.5px">${(chart.studies||[]).slice(0,8).join(' · ')||'—'}</span>
  </div>
  ${levels.length ? `
  <div style="color:#553300;font-size:7.5px;letter-spacing:1.5px;padding:6px 12px 2px">PRICE LEVELS (${levels.length})</div>
  <table style="width:100%;border-collapse:collapse">
    <thead>
      <tr style="border-bottom:1px solid #1a0800">
        <th style="padding:3px 10px;color:#442200;font-size:7px;letter-spacing:1.5px;text-align:left">TYPE</th>
        <th style="padding:3px 8px;color:#442200;font-size:7px;letter-spacing:1.5px;text-align:left">PRICE</th>
        <th style="padding:3px 8px;color:#442200;font-size:7px;letter-spacing:1.5px;text-align:left">DIST</th>
        <th style="padding:3px 10px;color:#442200;font-size:7px;letter-spacing:1.5px;text-align:left">SOURCE</th>
      </tr>
    </thead>
    <tbody>${levelsHTML}</tbody>
  </table>` : '<div style="padding:20px;color:#332200;font-size:8.5px;text-align:center">No price levels — add Pine indicators with line.new() to your TV chart</div>'}
  `;
}

// ── PANEL INTEGRATION ──────────────────────────────────────────────────────
(function _patchTVPanel() {
  const _orig = window.buildPanelContent;
  if (typeof _orig === 'function') {
    window.buildPanelContent = function(fn) {
      if (fn === 'TVLIVE') return _buildTVLivePanelShell();
      return _orig(fn);
    };
  }

  // Register TVLIVE in autocomplete / cmd list
  setTimeout(() => {
    try {
      if (window._bacItems) window._bacItems.push({ cmd:'TVLIVE', desc:'TradingView Live — Chart Data & Levels', cat:'LIVE' });
      if (Array.isArray(window._cmdList)) window._cmdList.push({ cmd:'TVLIVE', desc:'TradingView Live Chart Data' });
    } catch(e) {}
  }, 1500);
})();

function _buildTVLivePanelShell() {
  setTimeout(() => {
    const b = document.getElementById('tv-live-body');
    if (b) b.innerHTML = _buildTVLiveHTML(_tvData);
    _fetchTVLive(true);
  }, 100);

  return `<div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
    <div style="flex-shrink:0;background:#000;border-bottom:1px solid #1a0800">
      <div style="height:20px;background:#7a3800;display:flex;align-items:center;padding:0;border-bottom:1px solid #552800">
        <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;letter-spacing:.2px;background:#8a4400;border-right:1px solid #662200">TradingView Live</span>
        <span style="color:#dd8844;font-size:8.5px;padding:0 10px">CDP → data/tv_live.json → terminal</span>
        <span onclick="window._tvFetchNow&&window._tvFetchNow()" style="color:#cc6600;font-size:8px;padding:0 10px;cursor:pointer;margin-left:auto;border-left:1px solid #441800" onmouseover="this.style.background='#1a0800'" onmouseout="this.style.background=''">↺ Refresh</span>
      </div>
    </div>
    <div id="tv-live-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#1a1000 #000">
      <div style="padding:30px;color:#443322;font-size:9px;text-align:center">Loading TV data...</div>
    </div>
  </div>`;
}

window._tvFetchNow = () => _fetchTVLive(true);

// ── STARTUP ────────────────────────────────────────────────────────────────
_fetchTVLive(true);
setInterval(() => _fetchTVLive(false), TV_POLL_MS);

console.log('%c TV-LIVE ENGINE LOADED ', 'background:#884400;color:#fff;font-weight:bold');
console.log('[TV-LIVE] Type TVLIVE in command bar to open live chart panel');

})();



(function(){
'use strict';

const GH_BASE       = 'https://raw.githubusercontent.com/fufikfx/app/main/data/';
const MACRO_URL     = GH_BASE + 'macro.json';
const BONDS_URL     = GH_BASE + 'bonds.json';
const POLL_MS       = 60 * 60 * 1000;  // 1 hodina

let _macroDB  = null;
let _bondsDB  = null;
window._macroDB = null;
window._bondsDB = null;

// ── FETCH BOTH ─────────────────────────────────────────────────────────────
async function _fetchMacroData() {
  const t = '?t=' + Date.now();
  try {
    const [mr, br] = await Promise.allSettled([
      fetch(MACRO_URL + t, {cache:'no-store'}).then(r => r.ok ? r.json() : null),
      fetch(BONDS_URL + t, {cache:'no-store'}).then(r => r.ok ? r.json() : null),
    ]);
    if (mr.status === 'fulfilled' && mr.value) {
      _macroDB = mr.value;
      window._macroDB = _macroDB;
      _patchLiveData(_macroDB);
      console.log('[MACRO-LOADER] macro.json loaded, updated:', _macroDB.meta?.updated_iso);
    }
    if (br.status === 'fulfilled' && br.value) {
      _bondsDB = br.value;
      window._bondsDB = _bondsDB;
      console.log('[MACRO-LOADER] bonds.json loaded,', _bondsDB.bonds?.length, 'bonds');
    }
    _refreshMacroPanels();
    _updateMacroBadge();
  } catch(e) {
    console.warn('[MACRO-LOADER] fetch error:', e.message);
  }
}

// ── PATCH _liveData.fred ───────────────────────────────────────────────────
function _patchLiveData(data) {
  if (!data || !window._liveData) return;
  if (!window._liveData.fred) window._liveData.fred = {};

  const cb  = data.central_banks || {};
  const inf = data.inflation || {};
  const gr  = data.growth    || {};

  if (cb.ffr)         window._liveData.fred.ffr          = cb.ffr;
  if (inf.cpi)        window._liveData.fred.cpi           = inf.cpi;
  if (gr.unemployment)window._liveData.fred.unemployment  = gr.unemployment;
  if (data.fomc)      window._liveData.fred.fomc          = data.fomc;
}

// ── PATCH buildMACRO ───────────────────────────────────────────────────────
const _origBuildMACRO = window.buildMACRO;
window.buildMACRO = function() {
  const base = typeof _origBuildMACRO === 'function' ? _origBuildMACRO() : '';
  if (!_macroDB) return base;

  const cb  = _macroDB.central_banks || {};
  const inf = _macroDB.inflation     || {};
  const gr  = _macroDB.growth        || {};
  const act = _macroDB.activity      || {};
  const age = _macroDB.meta ? Math.floor((Date.now()/1000) - _macroDB.meta.updated) : 9999;
  const ageStr = age < 3600 ? Math.floor(age/60)+'m ago' : Math.floor(age/3600)+'h ago';

  const fmt = (v, suffix='%') => v != null ? v + suffix : '—';
  const fmtChg = (v, p) => (v != null && p != null) ? (v > p ? '▲' : v < p ? '▼' : '–') : '';

  const rows = [
    // Inflation
    { section: 'INFLATION · LIVE', rows: [
      { c:'CPI YoY',      r:'USA', v: fmt(inf.cpi?.value),     prev: fmt(inf.cpi?.prev),     exp:'—', src:'FRED' },
      { c:'Core CPI',     r:'USA', v: fmt(inf.cpi_yoy?.value), prev: fmt(inf.cpi_yoy?.prev), exp:'—', src:'FRED' },
      { c:'PCE Deflator', r:'USA', v: fmt(inf.pce?.value),     prev: fmt(inf.pce?.prev),     exp:'—', src:'FRED' },
    ]},
    // Central Banks
    { section: 'CENTRAL BANKS · LIVE', rows: [
      { c:'FED FUNDS RATE', r:'USA', v: fmt(cb.ffr?.value), prev: fmt(cb.ffr?.prev), exp:'—', src:'FRED' },
      { c:'ECB DEPOSIT',    r:'EU',  v: fmt(cb.ecb?.value), prev: fmt(cb.ecb?.prev), exp:'—', src:'ECB' },
    ]},
    // Growth
    { section: 'GROWTH & LABOUR · LIVE', rows: [
      { c:'GDP QoQ',       r:'USA', v: fmt(gr.gdp?.value),          prev: fmt(gr.gdp?.prev),          exp:'—', src:'FRED' },
      { c:'Unemployment',  r:'USA', v: fmt(gr.unemployment?.value), prev: fmt(gr.unemployment?.prev), exp:'—', src:'FRED' },
      { c:'Retail Sales',  r:'USA', v: fmt(gr.retail?.value),       prev: fmt(gr.retail?.prev),       exp:'—', src:'FRED' },
    ]},
  ].filter(s => s.rows.some(r => r.v !== '—%' && r.v !== '—'));

  if (!rows.length) return base;  // no live data yet, show static

  let h = `<div style="background:#000;padding:2px 8px;border-bottom:1px solid #0d0800;display:flex;align-items:center;justify-content:space-between">
    <span style="color:#00aa44;font-size:7.5px;letter-spacing:1.5px">● LIVE DATA</span>
    <span style="color:#332200;font-size:7.5px">${ageStr}</span>
  </div>`;
  h += `<table class="pt"><colgroup><col><col style="width:38px"><col style="width:62px"><col style="width:62px"><col style="width:50px"><col style="width:40px"></colgroup>
  <tr><th>INDICATOR</th><th>REG</th><th class="r">ACTUAL</th><th class="r">PREV</th><th class="r">EST</th><th class="r">SRC</th></tr>`;

  rows.forEach(sec => {
    h += `<tr><td colspan="6" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:#998870;background:#000;border-top:1px solid #0d0a00">${sec.section}</td></tr>`;
    sec.rows.forEach(row => {
      const isLive = row.v !== '—%' && row.v !== '—';
      h += `<tr>
        <td class="ga" style="font-weight:400;font-size:9px">${row.c}</td>
        <td class="gr" style="font-size:8px">${row.r}</td>
        <td class="ga2 r" style="font-weight:700;color:${isLive?'#ffcc44':'#886622'}">${row.v}</td>
        <td class="wh r">${row.prev}</td>
        <td class="gr r">${row.exp}</td>
        <td style="padding:2px 6px;font-size:7px;color:#334422;text-align:right">${row.src||''}</td>
      </tr>`;
    });
  });

  return h + '</table>';
};

// ── PATCH buildBNDS — live data overlay with Bloomberg WGB style ──────────
const _origBuildBNDS = window.buildBNDS;
window.buildBNDS = function() {
  if (!_bondsDB || !Array.isArray(_bondsDB.bonds) || !_bondsDB.bonds.length) {
    return typeof _origBuildBNDS === 'function' ? _origBuildBNDS() : '';
  }

  const age = _bondsDB.meta ? Math.floor((Date.now()/1000) - _bondsDB.meta.updated) : 9999;
  const ageStr = age < 3600 ? Math.floor(age/60)+'m ago' : Math.floor(age/3600)+'h ago';
  const rtgCol = r => !r?'#443322':r==='AAA'?'#00cc44':r.startsWith('AA')?'#88cc44':r.startsWith('A')?'#ccaa00':r.startsWith('BB')?'#ff8800':'#ff2222';
  const TH = (t,al='right') => `<th style="padding:3px 6px;font-size:7.5px;color:#cc7722;text-align:${al};letter-spacing:.9px;font-weight:700;background:#060300;border-bottom:1px solid #1a1100">${t}</th>`;

  let rows = _bondsDB.bonds.map((b, i) => {
    const up = (b.chg || 0) >= 0;
    const yld = b.yield != null ? b.yield.toFixed(3) : '—';
    const chgStr = b.chg != null ? (up?'+':'')+b.chg.toFixed(3) : '—';
    const chgCol = up ? '#00ee55' : '#ff4444';
    const rowBg = i%2 ? '#040200' : '#000';
    return `<tr style="background:${rowBg}" onmouseover="this.style.background='rgba(243,159,65,.055)'" onmouseout="this.style.background='${rowBg}'">
      <td style="padding:3px 8px;color:#F39F41;font-size:10px;font-weight:700;white-space:nowrap;border-bottom:1px solid #0a0600">${b.name}</td>
      <td style="padding:3px 8px;color:#e8dfc8;font-size:10px;text-align:right;font-family:'Roboto Mono',monospace;border-bottom:1px solid #0a0600">${yld}</td>
      <td style="padding:3px 8px;color:${chgCol};font-size:9.5px;text-align:right;font-family:'Roboto Mono',monospace;font-weight:700;border-bottom:1px solid #0a0600">${chgStr}</td>
      <td style="padding:3px 6px;color:${rtgCol(b.rtg)};font-size:8px;text-align:center;border-bottom:1px solid #0a0600">${b.rtg||'—'}</td>
      <td style="padding:3px 8px;color:#665840;font-size:8.5px;text-align:right;border-bottom:1px solid #0a0600">${b.dur != null ? b.dur.toFixed(1) : '—'}y</td>
      <td style="padding:3px 8px;color:#332200;font-size:7px;text-align:right;border-bottom:1px solid #0a0600">${b.src||''}</td>
    </tr>`;
  }).join('');

  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Roboto Mono',monospace;scrollbar-width:thin;scrollbar-color:#1a1100 #000">
    <div style="background:#050300;border-bottom:1px solid #1a1100;padding:4px 10px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0">
      <span style="color:#F39F41;font-size:8.5px;font-weight:700;letter-spacing:2px">GOVERNMENT BONDS · LIVE</span>
      <span style="color:#00aa44;font-size:7.5px">● ${ageStr}</span>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead><tr>${TH('BOND','left')}${TH('YIELD')}${TH('CHG')}${TH('RTG','center')}${TH('DUR')}${TH('SRC')}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
};

// ── PATCH buildWIRP — inject FOMC probabilities ────────────────────────────
const _origBuildWIRP = window.buildWIRP;
window.buildWIRP = function() {
  const base = typeof _origBuildWIRP === 'function' ? _origBuildWIRP() : '';
  if (!_macroDB || !Array.isArray(_macroDB.fomc) || !_macroDB.fomc.length) return base;

  const fomc = _macroDB.fomc;
  const age  = _macroDB.meta ? Math.floor((Date.now()/1000) - _macroDB.meta.updated) : 9999;
  const ageStr = age < 3600 ? Math.floor(age/60)+'m ago' : Math.floor(age/3600)+'h ago';

  let fomcHTML = `<div style="background:#000;border-top:1px solid #0d0800;margin-top:4px">
    <div style="padding:3px 10px;background:#040200;border-bottom:1px solid #0d0800;display:flex;align-items:center;justify-content:space-between">
      <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">FOMC RATE PROBABILITIES · CME FEDWATCH</span>
      <span style="color:#00aa44;font-size:7px">● LIVE ${ageStr}</span>
    </div>`;

  fomc.slice(0, 4).forEach(m => {
    if (!m.date) return;
    const probs = Array.isArray(m.probabilities) ? m.probabilities : [];
    fomcHTML += `<div style="padding:4px 10px;border-bottom:1px solid #080400">
      <span style="color:#cc7700;font-size:8.5px;font-weight:700">${m.date}</span>
      <span style="color:#443322;font-size:7.5px;margin-left:8px">Current: ${m.current_rate||'—'}</span>
      <div style="display:flex;gap:4px;margin-top:3px;flex-wrap:wrap">
        ${probs.slice(0,6).map(p => `
          <span style="font-size:8px;padding:1px 6px;background:#0d0600;border:1px solid #1a0800;font-family:'Roboto Mono',monospace">
            <span style="color:#886600">${p.rate||p.label||'?'}</span>
            <span style="color:${(p.probability||0)>30?'#ffaa00':'#443322'};margin-left:4px">${p.probability!=null?p.probability.toFixed(1)+'%':'—'}</span>
          </span>`).join('')}
      </div>
    </div>`;
  });

  fomcHTML += '</div>';
  return base + fomcHTML;
};

// ── REFRESH MACRO PANELS ───────────────────────────────────────────────────
function _refreshMacroPanels() {
  if (typeof refreshMacroPanels === 'function') {
    try { refreshMacroPanels(); } catch(e) {}
  }
  // Also manually refresh open panels
  ['MACRO','WIRP','BNDS'].forEach(fn => {
    try {
      if (typeof PANEL_REGISTRY !== 'undefined') {
        Object.entries(PANEL_REGISTRY).forEach(([id, reg]) => {
          if (reg.fn !== fn) return;
          const body = document.getElementById('pb-' + id);
          if (!body || body.dataset.locked === '1') return;
          const st = body.scrollTop;
          body.innerHTML = buildPanelContent(fn);
          body.scrollTop = st;
        });
      }
    } catch(e) {}
  });
}

// ── STATUS BADGE ───────────────────────────────────────────────────────────
function _updateMacroBadge() {
  if (!_macroDB) return;
  let badge = document.getElementById('macro-live-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'macro-live-badge';
    badge.style.cssText = [
      'position:fixed;bottom:6px;right:360px;z-index:9000',
      'background:#000;border:1px solid #001a00;padding:1px 8px',
      'font-family:\'Courier Prime\',monospace;font-size:8.5px',
      'display:flex;align-items:center;gap:5px;opacity:.85',
      'cursor:pointer;user-select:none'
    ].join(';');
    badge.onclick = () => { if (typeof openPanel === 'function') openPanel('MACRO'); };
    document.body.appendChild(badge);
  }
  const age    = Math.floor((Date.now()/1000) - (_macroDB.meta?.updated || 0));
  const ageStr = age < 3600 ? Math.floor(age/60)+'m' : Math.floor(age/3600)+'h';
  const ffr    = _macroDB.central_banks?.ffr?.value;
  const cpi    = _macroDB.inflation?.cpi?.value;
  badge.innerHTML = `<span style="color:#009933;font-size:7px">⬤</span><span style="color:#006600">MACRO</span>${ffr!=null?`<span style="color:#448800">FFR ${ffr}%</span>`:''}${cpi!=null?`<span style="color:#335500">CPI ${cpi}%</span>`:''}<span style="color:#112200">${ageStr}</span>`;
}

// ── STARTUP ────────────────────────────────────────────────────────────────
setTimeout(() => _fetchMacroData(), 1200);
setInterval(() => _fetchMacroData(), POLL_MS);

<!-- ═══════════════════════════════════════════════════════════════════
     BLOOMBERG TERMINAL — AUTHENTIC VISUAL OVERHAUL v2.0
     Verified against Bloomberg Professional screenshots:
     - Primary amber:  #F39F41  (Bloomberg signature, confirmed)
     - Background:     #000000  (pure black)
     - Data white:     #e8dfc8  (warm off-white, not pure white)
     - UP:             #00ee55  (bright green on dark bg)
     - DOWN:           #ff4444  (bright red on dark bg)
     - UP bg:          rgba(0,170,55,0.10–0.42) — intensity scales with magnitude
     - DOWN bg:        rgba(210,35,35,0.10–0.42) — intensity scales with magnitude
     - Header labels:  #cc7722  (muted amber, not bright)
     - Header bg:      #0a0500  (nearly black with amber tint)
     - Row alternate:  #040200 / #000000
     - Dim text:       #665840 / #443322 / #332211
     - Ticker tape:    #ff8800 for symbols, #e8dfc8 for prices
═══════════════════════════════════════════════════════════════════ -->


<!-- ═══════════════════════════════════════════════════════════
     PANEL DATA FIX v5.4 — KOMPLETNÁ OPRAVA
     Problém: MKT[*].px = null → panely zobrazujú "—" všade
     Riešenie:
       1. Okamžite naplní MKT, STKS, CRYPTO fallback cenami
       2. Opraví zaseknuté data-locked zámky  
       3. Pridá status bar + force-refresh do každého panelu
       4. Auto-retry fetch pri zlyhaní
       5. Watchdog refreshAllPanels každých 30s
═══════════════════════════════════════════════════════════ -->
<script>
(function(){
'use strict';

/* ══════════════════════════════════════════════════════════
   1. FALLBACK CENY — naplní px:null okamžite pri štarte
   Hodnoty zodpovedajú aprílu 2026
══════════════════════════════════════════════════════════ */
function _seedFallbackPrices(){
  if(typeof MKT !== 'undefined'){
    var mktFallback={
      SPX:5580,INDU:41800,NDX:19200,TSX:24600,IBOV:130000,MERV:2720000,
      UKX:8600,DAX:22500,CAC:7980,FTSEMIB:37500,IBEX:13200,AEX:910,
      SMI:12700,OMX:2650,WIG20:2480,PX:1800,ATX:4150,NKY:35200,
      TOPX:2490,HSI:22800,SENSEX:74000,NIFTY:22500,KOSPI:2490,
      TWSE:21200,STI:3720,ASX200:8050,SHCOMP:3340,CSI300:3980,
      BVSP:130000,MEXBOL:56000,MOEX:2980,TA35:2180,EGX30:31000,
      TASI:11500,ADX:9400,DFM:4800,VIX:21.4,DXY:103.8,
    };
    Object.keys(mktFallback).forEach(function(k){
      if(MKT[k]&&(MKT[k].px===null||MKT[k].px===undefined||MKT[k].px<=0)){
        MKT[k].px=mktFallback[k];
        if(!MKT[k].open||MKT[k].open<=0) MKT[k].open=mktFallback[k]*0.998;
        if(!MKT[k].hi  ||MKT[k].hi  <=0) MKT[k].hi  =mktFallback[k]*1.004;
        if(!MKT[k].lo  ||MKT[k].lo  <=0) MKT[k].lo  =mktFallback[k]*0.994;
      }
    });
  }

  if(typeof STKS !== 'undefined'){
    var stksFallback={
      AAPL:198,NVDA:108,MSFT:388,GOOGL:162,META:580,AMZN:198,TSLA:262,
      AVGO:185,ORCL:168,NFLX:948,ADBE:380,CRM:298,AMD:108,QCOM:150,
      MU:82,AMAT:154,TXN:162,INTC:24,ASML:648,TSM:178,ARM:138,MRVL:68,
      SMCI:36,DELL:104,PLTR:82,SNOW:134,DDOG:112,NET:96,CRWD:348,ZS:174,
      OKTA:82,PANW:178,SOUN:10.8,RDDT:116,DUOL:272,IONQ:26,RGTI:8.8,
      QUBT:5.2,QBTS:7.4,RKLB:21,ASTS:23,ACHR:9,JOBY:7.6,LUNR:13.5,
      JPM:236,GS:572,BRK:524,BAC:42,WFC:76,MS:118,V:338,MA:528,AXP:262,
      C:68,SCHW:78,UNH:498,LLY:828,JNJ:158,ABBV:184,PFE:24.8,MRK:88,
      AMGN:264,REGN:592,VRTX:442,MRNA:33,BNTX:96,ISRG:548,RXRX:6.2,
      CRSP:37,BEAM:23,NVO:66,AZN:67,LMT:472,RTX:126,NOC:492,GD:272,
      BA:164,CAT:348,DE:382,HON:208,GE:198,WMT:98,COST:928,KO:68,PEP:148,
      HD:378,MCD:298,SBUX:98,NKE:68,ABNB:130,DASH:178,SPOT:604,PINS:28,
      CELH:27,MNST:47,SHOP:120,UBER:72,XOM:114,CVX:155,COP:104,CCJ:46,
      UEC:6.6,NEM:43,GOLD:17.8,AEM:86,WPM:62,FCX:38,MP:17.8,SAP:244,
      SONY:18,TM:186,BABA:122,BIDU:95,TCEHY:56,NOK:4.1,O:51,AMT:175,
      SPY:552,QQQ:462,IWM:194,VOO:506,VTI:224,DIA:414,ARKK:43,GLD:280,
      SLV:29,TLT:87,HYG:77,XLK:224,XLF:47,XLE:86,XLV:146,IBIT:47,FBTC:47,
      GBTC:51,ETHA:16,TQQQ:47,SQQQ:8.6,MSTR:308,COIN:198,HOOD:37,RIOT:8.2,
      MARA:13.8,CLSK:8.8,CORZ:12,HUT:17.8,HIVE:3.3,CRCL:28,SOFI:12.6,
      UPST:66,AFRM:43,PYPL:68,BX:150,APO:116,KKR:132
    };
    Object.keys(stksFallback).forEach(function(k){
      if(STKS[k]&&(STKS[k].px===null||STKS[k].px===undefined||STKS[k].px<=0)){
        STKS[k].px=stksFallback[k];
        if(!STKS[k].open||STKS[k].open<=0) STKS[k].open=stksFallback[k]*0.998;
        if(!STKS[k].hi  ||STKS[k].hi  <=0) STKS[k].hi  =stksFallback[k]*1.004;
        if(!STKS[k].lo  ||STKS[k].lo  <=0) STKS[k].lo  =stksFallback[k]*0.994;
      }
    });
  }

  if(typeof CRYPTO !== 'undefined'){
    var cryptoFallback={
      BTC:82500,ETH:1810,XRP:2.10,BNB:582,SOL:124,ADA:0.68,DOGE:0.162,
      TRX:0.228,AVAX:19.8,SHIB:0.0000128,LINK:13.2,DOT:4.20,MATIC:0.22,
      LTC:82,BCH:338,UNI:6.20,XLM:0.278,ATOM:4.42,NEAR:2.42,APT:4.80,
      SUI:2.18,ARB:0.348,OP:0.748,IMX:0.728,INJ:12.4,HYPE:14.2,
      RENDER:3.98,FET:0.858,OCEAN:0.448,ICP:5.48,FIL:2.88,ALGO:0.128,
      HBAR:0.168,AAVE:148,CRV:0.548,MKR:1380,TON:3.82,NOT:0.0048,
      WIF:1.04,BONK:0.0000188,PEPE:0.0000088,FLOKI:0.0000628,JUP:0.488,
      WLD:0.988,PYTH:0.218,JTO:1.88,RNDR:3.98,STRK:0.328,DYDX:0.788,
      GMX:16.8,SNX:1.08,LDO:0.788,PENDLE:2.88,ETHFI:1.28,EIGEN:1.08
    };
    CRYPTO.forEach(function(c){
      if(c.px===null||c.px===undefined||c.px<=0){
        var fb=cryptoFallback[c.s];
        if(fb) c.px=fb;
      }
    });
  }

  if(typeof COMDTY_DATA !== 'undefined'){
    var comdtyFallback={
      GOLD:3040,XAU:3040,GC1:3040,SILVER:33.8,XAG:33.8,SI1:33.8,
      PLATINUM:948,XPT:948,PALLADIUM:952,XPD:952,WTI:70.2,CL1:70.2,
      BRENT:73.8,CO1:73.8,NG1:3.88,WHEAT:518,W1:518,CORN:458,C1:458,
      SOYBEANS:984,S1:984,COFFEE:312,COTTON:66,SUGAR:19.8,COCOA:8840,
      LUMBER:482,COPPER:4.38,HG1:4.38,ALUMINUM:2280,NICKEL:15800,
      ZINC:2780,LEAD:1980,TIN:26800,URANIUM:68
    };
    COMDTY_DATA.forEach(function(c){
      if(c.px===null||c.px===undefined||c.px<=0){
        var fb=comdtyFallback[c.s]||comdtyFallback[c.n];
        if(fb){c.px=fb;if(!c.chg)c.chg=0;}
      }
    });
  }
}

// Spustí ihneď + opakovane kým sa naplnia premenné
_seedFallbackPrices();
setTimeout(_seedFallbackPrices,200);
setTimeout(_seedFallbackPrices,600);
setTimeout(_seedFallbackPrices,1500);

/* ══════════════════════════════════════════════════════════
   2. ODOMKNI ZASEKNUTÉ ZÁMKY
══════════════════════════════════════════════════════════ */
function _unlockStaleLocks(){
  document.querySelectorAll('.panel-body[data-locked="1"]').forEach(function(b){
    var la=parseInt(b.dataset.lockedAt||'0',10);
    if(!la){b.dataset.lockedAt=Date.now();return;}
    if(Date.now()-la>8000){b.dataset.locked='0';b.removeAttribute('data-locked-at');}
  });
}
setInterval(_unlockStaleLocks,4000);
new MutationObserver(function(muts){
  muts.forEach(function(m){
    if(m.type==='attributes'&&m.attributeName==='data-locked'&&m.target.dataset.locked==='1')
      m.target.dataset.lockedAt=Date.now();
  });
}).observe(document.body,{attributes:true,subtree:true,attributeFilter:['data-locked']});

/* ══════════════════════════════════════════════════════════
   3. STATUS BAR V KAŽDOM PANELI
══════════════════════════════════════════════════════════ */
var PANEL_DATA_SRC={
  CRYPTO:'BINANCE+CG',WEI:'YAHOO+STOOQ',FX:'FX-API+STOOQ',
  IDX:'YAHOO+STOOQ',EQUITY:'YAHOO+FINNHUB',COMDTY:'STOOQ+FX',
  WORLD:'YAHOO+STOOQ',MACRO:'FF+ECON',MOVERS:'MULTI-SRC',
  MMAP:'YAHOO',WN:'RSS+API',NWS:'RSS+API',FED:'FX-API',
  STOCKS2:'YAHOO+FINNHUB',DEFI:'DEFILLAMA',HYPER:'HYPERLIQUID',
};

function _ensurePanelDataBar(id,fn){
  var pnl=document.getElementById(id);if(!pnl)return;
  if(pnl.querySelector('.pnl-data-bar'))return;
  var tabs=pnl.querySelector('.panel-tabs');if(!tabs)return;
  var bar=document.createElement('div');
  bar.className='pnl-data-bar';bar.id='pdb-'+id;
  var src=PANEL_DATA_SRC[fn]?'· '+PANEL_DATA_SRC[fn]:'';
  bar.innerHTML='<span class="pnl-data-dot" id="pdb-dot-'+id+'"></span>'+
    '<span class="pnl-data-label" id="pdb-lbl-'+id+'">FALLBACK</span>'+
    '<span class="pnl-data-src"  id="pdb-src-'+id+'">'+src+'</span>'+
    '<span class="pnl-data-age"  id="pdb-age-'+id+'"></span>'+
    '<button class="pnl-refresh-btn" onclick="window._panelForceRefresh(''+id+'',''+fn+'')">↺ REFRESH</button>';
  tabs.after(bar);
}

window._setPanelDataStatus=function(id,state,label,src,ageMs){
  var dot=document.getElementById('pdb-dot-'+id);
  var lbl=document.getElementById('pdb-lbl-'+id);
  var ageEl=document.getElementById('pdb-age-'+id);
  var bar=document.getElementById('pdb-'+id);
  if(!dot||!lbl)return;
  dot.className='pnl-data-dot '+(state||'');
  lbl.textContent=label||'';
  if(ageEl)ageEl.textContent=ageMs!=null?(ageMs<3000?'just now':ageMs<60000?Math.round(ageMs/1000)+'s ago':Math.round(ageMs/60000)+'m ago'):'';
  if(bar)bar.classList.toggle('fail-bar',state==='fail');
};

function _injectAllBars(){
  var reg=window.PANEL_REGISTRY||{};
  Object.keys(reg).forEach(function(id){_ensurePanelDataBar(id,reg[id].fn);});
}
setInterval(_injectAllBars,2000);

/* ══════════════════════════════════════════════════════════
   4. FORCE REFRESH TLAČIDLO
══════════════════════════════════════════════════════════ */
window._panelForceRefresh=function(id,fn){
  var body=document.getElementById('pb-'+id);if(!body)return;
  body.dataset.locked='0';
  window._setPanelDataStatus(id,'stale','REFRESHING...','',null);
  _seedFallbackPrices();
  try{
    if(fn==='CRYPTO'||fn==='DOMN'){
      if(typeof fetchBinance24hr==='function')fetchBinance24hr();
      if(typeof fetchCoinGecko==='function')setTimeout(fetchCoinGecko,600);
    }else if(fn==='FX'||fn==='WORLD'||fn==='WEI'||fn==='IDX'){
      if(typeof fetchFX==='function')fetchFX();
      if(typeof fetchStooq==='function')fetchStooq();
      if(typeof fetchYahooQuotes==='function')setTimeout(fetchYahooQuotes,400);
    }else if(fn==='EQUITY'||fn==='MOVERS'||fn==='STOCKS2'){
      if(typeof fetchYahooQuotes==='function')fetchYahooQuotes();
      if(typeof fetchStooq==='function')setTimeout(fetchStooq,400);
      if(typeof fetchFinnhubTradFi==='function')setTimeout(fetchFinnhubTradFi,600);
    }else if(fn==='COMDTY'||fn==='ENERGY'||fn==='METALS'){
      if(typeof fetchStooq==='function')fetchStooq();
      if(typeof fetchFinnhubTradFi==='function')setTimeout(fetchFinnhubTradFi,400);
    }else if(fn==='WN'||fn==='NWS'){
      if(typeof fetchAllNews==='function')fetchAllNews(true);
    }else{
      if(typeof fetchBinance24hr==='function')fetchBinance24hr();
      if(typeof fetchFX==='function')setTimeout(fetchFX,200);
      if(typeof fetchStooq==='function')setTimeout(fetchStooq,400);
    }
  }catch(e){}
  setTimeout(function(){
    try{
      var reg=(window.PANEL_REGISTRY||{})[id];if(!reg)return;
      var pnl=document.getElementById(id);var ti=0;
      if(pnl)pnl.querySelectorAll('.ptab').forEach(function(t,i){if(t.classList.contains('on'))ti=i;});
      var html=ti>0?(typeof buildPanelContentTab==='function'?buildPanelContentTab(fn,ti):''):(typeof buildPanelContent==='function'?buildPanelContent(fn):'');
      if(html){var st=body.scrollTop,sl=body.scrollLeft;body.innerHTML=html;body.scrollTop=st;body.scrollLeft=sl;}
      _ensurePanelDataBar(id,fn);
      window._setPanelDataStatus(id,'live','REFRESHED','manual',0);
    }catch(e){window._setPanelDataStatus(id,'fail','ERR: '+e.message,'',null);}
  },2000);
};

/* ══════════════════════════════════════════════════════════
   5. LIVE STATUS + HOOKY
══════════════════════════════════════════════════════════ */
var _srcLastTs={};
function _markSrcLive(src){_srcLastTs[src]=Date.now();}
function _srcAge(src){return _srcLastTs[src]?Date.now()-_srcLastTs[src]:Infinity;}

['fetchBinance24hr','fetchCoinGecko','fetchFX','fetchStooq','fetchYahooQuotes','fetchFinnhubTradFi'].forEach(function(fname){
  var orig=window[fname];
  if(typeof orig!=='function')return;
  var srcMap={fetchBinance24hr:'BINANCE',fetchCoinGecko:'COINGECKO',fetchFX:'FX',fetchStooq:'STOOQ',fetchYahooQuotes:'YAHOO',fetchFinnhubTradFi:'FINNHUB'};
  window[fname]=async function(){
    try{var r=await orig.apply(this,arguments);_markSrcLive(srcMap[fname]);_updateAllPanelStatuses();return r;}
    catch(e){_updateAllPanelStatuses();throw e;}
  };
});

function _panelState(fn){
  var srcMap={CRYPTO:['BINANCE','COINGECKO'],WEI:['STOOQ','YAHOO'],FX:['FX'],IDX:['STOOQ','YAHOO'],EQUITY:['YAHOO','STOOQ','FINNHUB'],COMDTY:['STOOQ'],WORLD:['STOOQ','YAHOO'],MOVERS:['BINANCE','YAHOO'],STOCKS2:['YAHOO','STOOQ']};
  var srcs=srcMap[fn]||['BINANCE'];
  var minAge=Math.min.apply(null,srcs.map(function(s){return _srcAge(s);}));
  if(minAge===Infinity)return{state:'stale',label:'FALLBACK DATA',ageMs:null};
  if(minAge<20000)return{state:'live',label:'LIVE',ageMs:minAge};
  if(minAge<60000)return{state:'live',label:'RECENT',ageMs:minAge};
  if(minAge<180000)return{state:'stale',label:'STALE',ageMs:minAge};
  return{state:'fail',label:'NO LIVE DATA',ageMs:minAge};
}

function _updateAllPanelStatuses(){
  var reg=window.PANEL_REGISTRY||{};
  Object.keys(reg).forEach(function(id){
    var fn=reg[id].fn;var st=_panelState(fn);
    window._setPanelDataStatus(id,st.state,st.label,PANEL_DATA_SRC[fn]||'',st.ageMs);
  });
}
setInterval(_updateAllPanelStatuses,5000);

/* ══════════════════════════════════════════════════════════
   6. WATCHDOG + AUTO-RETRY
══════════════════════════════════════════════════════════ */
var _lastRefreshTs=Date.now();
var _origRefresh=window.refreshAllPanels;
if(typeof _origRefresh==='function'){
  window.refreshAllPanels=function(){
    _lastRefreshTs=Date.now();
    document.querySelectorAll('.panel-body[data-locked="1"]').forEach(function(b){
      var la=parseInt(b.dataset.lockedAt||'0',10);
      if(la&&Date.now()-la>6000)b.dataset.locked='0';
    });
    return _origRefresh.apply(this,arguments);
  };
}
setInterval(function(){
  if(Date.now()-_lastRefreshTs>30000){
    try{if(typeof refreshAllPanels==='function')refreshAllPanels();}catch(e){}
    _lastRefreshTs=Date.now();
  }
  // Auto-retry stale sources
  if(_srcAge('BINANCE')>45000&&typeof fetchBinance24hr==='function')try{fetchBinance24hr();}catch(e){}
  if(_srcAge('COINGECKO')>120000&&typeof fetchCoinGecko==='function')try{fetchCoinGecko();}catch(e){}
  if(_srcAge('FX')>90000&&typeof fetchFX==='function')try{fetchFX();}catch(e){}
  if(_srcAge('STOOQ')>90000&&typeof fetchStooq==='function')try{fetchStooq();}catch(e){}
  if(_srcAge('YAHOO')>90000&&typeof fetchYahooQuotes==='function')try{fetchYahooQuotes();}catch(e){}
},20000);

/* ══════════════════════════════════════════════════════════
   7. INJECT BARS DO NOVÝCH PANELOV + INITIAL REFRESH
══════════════════════════════════════════════════════════ */
new MutationObserver(function(muts){
  muts.forEach(function(m){
    m.addedNodes.forEach(function(n){
      if(n.nodeType!==1)return;
      var panels=[];
      if(n.classList&&n.classList.contains('panel'))panels.push(n);
      if(n.querySelectorAll)n.querySelectorAll('.panel').forEach(function(p){panels.push(p);});
      panels.forEach(function(pnl){
        var id=pnl.id;if(!id)return;
        var reg=(window.PANEL_REGISTRY||{})[id];if(!reg)return;
        setTimeout(function(){_ensurePanelDataBar(id,reg.fn);},150);
      });
    });
  });
}).observe(document.body,{childList:true,subtree:false});

// Po 3s rerenderuj všetky panely aby sa zobrazili fallback dáta
setTimeout(function(){
  var reg=window.PANEL_REGISTRY||{};
  if(Object.keys(reg).length>0){
    try{if(typeof refreshAllPanels==='function')refreshAllPanels();}catch(e){}
  }
  _injectAllBars();
  _updateAllPanelStatuses();
},3000);

console.log('[BBG-FIX v5.4] Loaded — fallback prices + watchdog + status bars + auto-retry');
})();



/* ═══════════════════════════════════════════════════════
   NVAI ENGINE — Financial AI Layer v5.5
   Modely přes NVIDIA NIM Cloud API (bez GPU, bez Dockeru)
   Inspirováno: AI Model Distillation for Financial Data
═══════════════════════════════════════════════════════ */
;(function(G){
'use strict';

const NV = G.NVAI = {
  /* ── Config ──────────────────────────────────────── */
  URL: 'https://integrate.api.nvidia.com/v1/chat/completions',
  MODELS: {
    'gemma-27b':  'google/gemma-3-27b-it',
    'llama-8b':   'meta/llama-3.1-8b-instruct',
    'llama-70b':  'meta/llama-3.3-70b-instruct',
    'nemotron':   'nvidia/llama-3.3-nemotron-super-49b-v1',
  },
  activeModel: 'gemma-27b',
  key: '',
  hist: [],          // chat history
  busy: false,
  lastBrief: '',
  lastBriefTs: 0,

  /* ── 13 event categories (NVIDIA Blueprint) ───── */
  CATEGORIES: [
    'Analyst Rating','Price Targets','Earnings','Labour Issues',
    'Mergers and Acquisitions','Dividends','Regulatory',
    'Stock price movement','Credit Ratings','Products-Services',
    'Product Approval','Guidance','OTHER'
  ],

  /* ── System prompt ──────────────────────────────── */
  SYS: `You are BBG·AI, an elite financial intelligence system inside a Bloomberg terminal.
Powered by NVIDIA NIM — distilled from NVIDIA AI Model Distillation blueprint for financial data.

STYLE: Concise, data-driven, trader-focused. Use:
▲ bullish signal  ▼ bearish signal  ◆ neutral/watch
ALL-CAPS for tickers: BTC, AAPL, SPX, EURUSD, GOLD
Lead with the key number or signal. Max 5 tight bullets or 2 short paragraphs.
End every analysis with:
SIGNAL: [BULLISH/BEARISH/NEUTRAL] — [confidence%] — [key catalyst]

EXPERTISE: Crypto (BTC ETH SOL XRP), Equities (SPX NDX key stocks),
FX (DXY EURUSD USDJPY), Macro (Fed ECB rates tariffs inflation),
Commodities (Gold Oil NG), Geopolitics affecting markets.
No disclaimers. Speak as a senior prop trader to peers.`,

  /* ── News classifier prompt (Blueprint-style) ─── */
  CLS_SYS: `You are a financial news classifier. Classify the headline into EXACTLY ONE of these 13 categories:
Analyst Rating, Price Targets, Earnings, Labour Issues, Mergers and Acquisitions,
Dividends, Regulatory, Stock price movement, Credit Ratings, Products-Services,
Product Approval, Guidance, OTHER.
Reply ONLY with the category name. No explanation.`,

  /* ── Build market context from live terminal data  */
  ctx() {
    const p = [];
    try {
      if(typeof CRYPTO!=='undefined'){
        const top = CRYPTO.slice(0,6).map(c=>{
          const px = c.px>1000?Math.round(c.px).toLocaleString():c.px>1?c.px.toFixed(2):c.px.toFixed(5);
          return `${c.s}=$${px}(${c.chg>=0?'+':''}${c.chg.toFixed(2)}%)`;
        });
        p.push('CRYPTO: '+top.join(' '));
      }
      if(typeof MKT!=='undefined'){
        const idxs=['SPX','NDX','INDU','DAX','NKY','HSI'].map(k=>{
          const m=MKT[k]; if(!m||!m.px)return null;
          return `${k}=${m.px>10000?Math.round(m.px).toLocaleString():m.px.toFixed(0)}(${m.chg>=0?'+':''}${m.chg.toFixed(2)}%)`;
        }).filter(Boolean);
        if(idxs.length) p.push('INDICES: '+idxs.join(' '));
      }
      if(typeof FXP!=='undefined'){
        const fx=FXP.slice(0,5).map(f=>`${f.p}=${((f.b+f.a)/2).toFixed(4)}(${f.c>=0?'+':''}${f.c.toFixed(2)}%)`);
        p.push('FX: '+fx.join(' '));
      }
      if(typeof COMDTY_DATA!=='undefined'){
        const cm=COMDTY_DATA.slice(0,4).map(c=>`${c.s}=$${c.px>100?Math.round(c.px):c.px.toFixed(2)}`);
        if(cm.length) p.push('COMMODITIES: '+cm.join(' '));
      }
      if(typeof _intelCache!=='undefined'&&_intelCache.items.length>0){
        const hl=_intelCache.items.slice(0,6).map(i=>i.title).join(' | ');
        p.push('HEADLINES: '+hl);
      }
    } catch(_){}
    return p.length?'\n\nLIVE MARKET DATA (April 2026):\n'+p.join('\n'):'';
  },

  /* ── Key management ──────────────────────────────── */
  setKey(k){
    k=(k||'').trim();
    if(!k)return false;
    this.key=k;
    try{sessionStorage.setItem('_nv_k',k);}catch(_){}
    this._dot('ready'); return true;
  },
  loadKey(){
    try{const k=sessionStorage.getItem('_nv_k');if(k){this.key=k;this._dot('ready');return true;}}catch(_){}
    return false;
  },
  clearKey(){
    this.key='';
    try{sessionStorage.removeItem('_nv_k');}catch(_){}
    this._dot('');
  },

  /* ── Status dots ─────────────────────────────────── */
  _dot(state){
    document.querySelectorAll('.nv-live-dot').forEach(d=>{d.className='nv-live-dot '+state;});
    const st=document.querySelectorAll('.nv-stat-txt');
    const txt={ready:'READY',busy:'THINKING',err:'ERROR','':'NO KEY'};
    st.forEach(el=>el.textContent=txt[state]||state);
  },

  /* ── Core query (streaming) ──────────────────────── */
  async stream(userMsg, onChunk, onDone, opts={}) {
    if(!this.key){onDone&&onDone('','NO_KEY');return;}
    if(this.busy){onDone&&onDone('','BUSY');return;}
    this.busy=true; this._dot('busy');

    const sysCtx = this.SYS + (opts.noCtx?'':this.ctx());
    const msgs=[{role:'system',content:opts.sys||sysCtx}];
    this.hist.slice(-8).forEach(h=>msgs.push({role:h.r,content:h.c}));
    msgs.push({role:'user',content:userMsg});

    let full='';
    try{
      const ctrl=new AbortController();
      const t=setTimeout(()=>ctrl.abort(),50000);
      const r=await fetch(this.URL,{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+this.key},
        body:JSON.stringify({
          model:this.MODELS[this.activeModel]||this.MODELS['gemma-27b'],
          messages:msgs, max_tokens:opts.maxTok||900,
          temperature:opts.temp||0.35, stream:true, top_p:0.9
        }),
        signal:ctrl.signal
      });
      clearTimeout(t);
      if(!r.ok){
        const e=await r.text().catch(()=>'');
        throw new Error(r.status===401?'INVALID_KEY':r.status===429?'RATE_LIMIT':`HTTP ${r.status}`);
      }
      const reader=r.body.getReader(), dec=new TextDecoder();
      let buf='';
      while(true){
        const{done,value}=await reader.read();
        if(done)break;
        buf+=dec.decode(value,{stream:true});
        const lines=buf.split('\n'); buf=lines.pop()||'';
        for(const ln of lines){
          if(!ln.startsWith('data: '))continue;
          const d=ln.slice(6).trim();
          if(d==='[DONE]'){reader.cancel();break;}
          try{const j=JSON.parse(d);const delta=j.choices?.[0]?.delta?.content||'';if(delta){full+=delta;onChunk&&onChunk(delta,full);}}catch(_){}
        }
      }
      this.hist.push({r:'user',c:userMsg},{r:'assistant',c:full});
      if(this.hist.length>20)this.hist=this.hist.slice(-20);
      this.busy=false; this._dot('ready');
      onDone&&onDone(full,null);
    }catch(e){
      this.busy=false; this._dot('err');
      onDone&&onDone(full,e.message);
    }
  },

  /* ── Single non-stream call ──────────────────────── */
  async ask(userMsg,opts={}){
    return new Promise((res,rej)=>{
      let full='';
      this.stream(userMsg,d=>full+=d,(f,e)=>e?rej(new Error(e)):res(f),opts);
    });
  },

  /* ── Classify single headline (Blueprint-style) ── */
  async classify(headline){
    return this.ask(headline,{sys:this.CLS_SYS,maxTok:30,temp:0.1,noCtx:true});
  },

  /* ── Classify batch of headlines ─────────────────── */
  async classifyBatch(headlines, onProgress){
    const results=[];
    for(let i=0;i<headlines.length;i++){
      const hl=headlines[i];
      try{
        const cat=await this.classify(hl);
        const valid=this.CATEGORIES.find(c=>cat.toLowerCase().includes(c.toLowerCase()))||'OTHER';
        results.push({headline:hl,category:valid});
      }catch(_){results.push({headline:hl,category:'OTHER'});}
      onProgress&&onProgress(i+1,headlines.length,results[results.length-1]);
      await new Promise(r=>setTimeout(r,200)); // rate limit
    }
    return results;
  },

  /* ── Highlight output text ───────────────────────── */
  fmt(text){
    if(!text)return '';
    const SYMS=/\b(BTC|ETH|SOL|XRP|BNB|ADA|DOGE|AAPL|NVDA|MSFT|TSLA|GOOGL|META|AMZN|SPX|NDX|INDU|DAX|NKY|HSI|EURUSD|USDJPY|GBPUSD|AUDUSD|DXY|GOLD|XAU|WTI|BRENT|NG1|FED|ECB|BOE|BOJ|USD|EUR|GBP|JPY|CHF|BUY|SELL|HOLD|LONG|SHORT|SIGNAL|BULLISH|BEARISH|NEUTRAL|FLASH|MACRO|CRYPTO)\b/g;
    return text
      .replace(/\n#{1,3} ?([^\n]+)/g,'<span class="nv-hd">$1</span>')
      .replace(SYMS,'<span class="nv-sym">$1</span>')
      .replace(/▲[^\n]*/g,m=>`<span class="nv-up">${m}</span>`)
      .replace(/▼[^\n]*/g,m=>`<span class="nv-dn">${m}</span>`)
      .replace(/(\+\d+\.?\d*%)/g,'<span class="nv-up">$1</span>')
      .replace(/(-\d+\.?\d*%)/g,'<span class="nv-dn">$1</span>')
      .replace(/^SIGNAL:.*/gm,m=>`<b style="color:#00ff88">${m}</b>`);
  },

  /* ── Update INTEL widget ─────────────────────────── */
  _updateIntel(txt){
    const el=document.getElementById('nv-intel-body');
    if(el){el.className='nv-intel-body live';el.innerHTML=this.fmt(txt);}
    this.lastBrief=txt; this.lastBriefTs=Date.now();
  }
};

/* ═══════════════════════════════════════════════════
   PANEL BUILDER — fn='NVAI'
═══════════════════════════════════════════════════ */
G.buildNVAI = function(){
  NV.loadKey();
  const hk=!!NV.key;
  const CHIPS=[
    {l:'📊 MARKET SCAN',   q:'Full market scan: crypto, equities, FX, commodities. Key levels, momentum, top 3 signals right now.'},
    {l:'₿ BTC SIGNAL',     q:'BTC technical + on-chain signal. Support/resistance, trend, conviction level. Is this a buy dip or dead cat?'},
    {l:'📈 EQUITY FLOW',   q:'Which sectors/stocks show strongest momentum? Flag any breakouts, reversals, or distribution patterns.'},
    {l:'🌍 MACRO BRIEF',   q:'Macro summary: Fed stance, tariff impact, inflation trajectory, central bank divergence, DXY outlook.'},
    {l:'💱 FX SIGNALS',    q:'Top 3 FX setups with entry/target/stop. DXY trend and impact on majors and EM currencies.'},
    {l:'⚠ RISK RADAR',    q:'Top 3 tail risks to markets next 48h. Black swan watch. What events require immediate attention?'},
    {l:'🏆 TOP TRADE',     q:'Single highest-conviction trade right now. Asset, direction, entry zone, target, invalidation level.'},
    {l:'📰 NEWS IMPACT',   q:'Analyze top headlines for market impact. What moves markets today? Separate signal from noise.'},
    {l:'🔬 CLASSIFY NEWS', q:'__CLASSIFY__'},
  ];

  return `<div id="nvai-wrap">
<!-- topbar -->
<div class="nv-topbar">
  <span class="nv-topbar-logo">⬡ BBG·AI NIM</span>
  <span class="nv-topbar-model" id="nv-model-display">${NV.MODELS[NV.activeModel]}</span>
  <div class="nv-topbar-right">
    <span class="nv-live-dot ${hk?'ready':''}"></span>
    <span class="nv-stat-txt">${hk?'READY':'NO KEY'}</span>
  </div>
</div>

<!-- API key -->
<div class="nv-key-row">
  <span class="nv-key-lbl">NGC KEY</span>
  <input class="nv-key-inp" id="nv-key-inp" type="password"
    placeholder="nvapi-..."
    value="${NV.key?'••••••••••••••':'':''}"
    onkeydown="event.stopPropagation();if(event.key==='Enter')window._nvSave()"
    oninput="this.dataset.ch='1';event.stopPropagation()">
  <button class="nv-key-btn ${hk?'ok':''}" onclick="window._nvSave()">${hk?'✓ CONNECTED':'CONNECT'}</button>
  <button class="nv-key-btn clr" onclick="window._nvClear()" title="Clear key">✕</button>
</div>

<!-- model selector -->
<div class="nv-model-row">
  <span class="nv-model-lbl">MODEL</span>
  <select class="nv-model-sel" id="nv-model-sel" onchange="window._nvSetModel(this.value)">
    <option value="gemma-27b" ${NV.activeModel==='gemma-27b'?'selected':''}>google/gemma-3-27b-it (fast · free tier)</option>
    <option value="llama-8b"  ${NV.activeModel==='llama-8b' ?'selected':''}>meta/llama-3.1-8b-instruct (lightweight)</option>
    <option value="llama-70b" ${NV.activeModel==='llama-70b'?'selected':''}>meta/llama-3.3-70b-instruct (powerful)</option>
    <option value="nemotron"  ${NV.activeModel==='nemotron' ?'selected':''}>nvidia/nemotron-super-49b (finance specialist)</option>
  </select>
</div>

<!-- query bar -->
<div class="nv-query-row">
  <input class="nv-query-inp" id="nv-q" placeholder="Ask about markets, signals, macro, crypto, news classification..."
    onkeydown="event.stopPropagation();if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();window._nvSend();}"
    oninput="event.stopPropagation()">
  <button class="nv-send-btn" id="nv-send" onclick="window._nvSend()">ANALYZE ▶</button>
</div>

<!-- quick chips -->
<div class="nv-chips">
  ${CHIPS.map((c,i)=>`<button class="nv-chip" onclick="window._nvChip(${i})">${c.l}</button>`).join('')}
  <button class="nv-chip red" onclick="window._nvClearHist()" style="margin-left:auto">✕ CLEAR</button>
</div>

<!-- output -->
<div class="nv-out" id="nv-out">
  <div class="nv-empty" id="nv-empty">
    <div class="nv-logo-big">⬡</div>
    <div style="color:#003318;font-size:11px;font-weight:700;letter-spacing:2px">BBG·AI NIM</div>
    <div style="margin-top:10px">${hk?'Select analysis or type query below':'Connect NVIDIA NIM key to activate'}</div>
    <div style="margin-top:8px;color:#1a1000;font-size:7.5px">
      ${hk?'Model: '+NV.MODELS[NV.activeModel]:'Get free key → build.nvidia.com → Get API Key'}
    </div>
    <div style="margin-top:16px;color:#0a0800;font-size:7px;line-height:2">
      Powered by NVIDIA NIM Cloud · AI Model Distillation Blueprint<br>
      13-category financial news classifier · Streaming responses
    </div>
  </div>
</div>

<!-- news classifier sub-panel (hidden by default) -->
<div id="nv-cls-panel" style="display:none;flex-direction:column;height:100%;overflow:hidden">
  <div class="nv-cls-hdr">
    <span class="nv-cls-title">⬡ FINANCIAL NEWS CLASSIFIER</span>
    <span style="color:#334422;font-size:7px;margin-left:8px">13 categories · NVIDIA Blueprint</span>
    <button class="nv-chip" onclick="window._nvClsBack()" style="margin-left:auto">← BACK</button>
  </div>
  <div style="padding:6px 12px;border-bottom:1px solid #0d0800;background:#010100;flex-shrink:0">
    <textarea id="nv-cls-inp" rows="3"
      style="width:100%;background:#030200;border:1px solid #1a1100;color:#c8c0a8;font-size:9px;font-family:'Roboto Mono',monospace;padding:6px;resize:none;outline:none;line-height:1.5"
      placeholder="Paste headlines (one per line) to classify..."
      onkeydown="event.stopPropagation()"></textarea>
    <div style="display:flex;gap:6px;margin-top:5px;align-items:center">
      <button class="nv-send-btn" style="padding:3px 12px;font-size:7.5px" onclick="window._nvClassify()">▶ CLASSIFY ALL</button>
      <span style="color:#334422;font-size:7px">Uses 13-category NVIDIA Blueprint taxonomy</span>
      <span id="nv-cls-prog" style="margin-left:auto;color:#446633;font-size:7.5px"></span>
    </div>
  </div>
  <div id="nv-cls-results" style="flex:1;overflow-y:auto;background:#000;scrollbar-width:thin;scrollbar-color:#1a1000 #000"></div>
</div>
</div>

<script>
(function(){
/* ── wire up UI controls ── */
const _chips=${JSON.stringify(CHIPS)};
window._nvChips=_chips;

window._nvSave=function(){
  const inp=document.getElementById('nv-key-inp');
  if(!inp||!inp.dataset.ch)return;
  const k=inp.value.trim();
  if(!k||k.startsWith('••'))return;
  if(NVAI.setKey(k)){
    inp.value='••••••••••••••';inp.dataset.ch='';
    const btns=document.querySelectorAll('.nv-key-btn:not(.clr)');
    btns.forEach(b=>{b.textContent='✓ CONNECTED';b.classList.add('ok');});
    const em=document.getElementById('nv-empty');
    if(em){em.querySelector('div:nth-child(3)').textContent='Select analysis or type query below';}
  }
};

window._nvClear=function(){
  NVAI.clearKey();
  const inp=document.getElementById('nv-key-inp');
  if(inp){inp.value='';inp.dataset.ch='';}
  const btns=document.querySelectorAll('.nv-key-btn:not(.clr)');
  btns.forEach(b=>{b.textContent='CONNECT';b.classList.remove('ok');});
};

window._nvSetModel=function(m){
  NVAI.activeModel=m;
  const d=document.getElementById('nv-model-display');
  if(d)d.textContent=NVAI.MODELS[m]||m;
};

window._nvClearHist=function(){
  NVAI.hist=[];
  const out=document.getElementById('nv-out');
  if(out)out.innerHTML='<div class="nv-empty"><div class="nv-logo-big">⬡</div><div>History cleared</div></div>';
};

window._nvChip=function(i){
  const p=_chips[i];if(!p)return;
  document.querySelectorAll('.nv-chip').forEach((c,j)=>c.classList.toggle('act',j===i));
  if(p.q==='__CLASSIFY__'){window._nvShowCls();return;}
  const inp=document.getElementById('nv-q');
  if(inp)inp.value=p.q;
  window._nvSend();
};

window._nvSend=function(){
  const inp=document.getElementById('nv-q');
  const btn=document.getElementById('nv-send');
  const out=document.getElementById('nv-out');
  if(!inp||!out)return;
  const q=inp.value.trim();if(!q)return;

  if(!NVAI.key){
    _nvAppend('sys','⚠ Connect your NVIDIA NIM key first\nGet free key at build.nvidia.com → Get API Key');
    return;
  }

  const em=document.getElementById('nv-empty');if(em)em.remove();
  _nvAppend('usr',q);
  inp.value='';
  if(btn){btn.disabled=true;btn.textContent='...';}

  // thinking indicator
  const thk=document.createElement('div');
  thk.className='nv-think';
  thk.innerHTML='⬡ BBG·AI <span class="nv-think-dots"></span>';
  thk.id='nv-thk';
  out.appendChild(thk);out.scrollTop=out.scrollHeight;

  let aiEl=null,aiBody=null;

  NVAI.stream(q,
    function(delta,full){
      if(!aiEl){
        const t=document.getElementById('nv-thk');if(t)t.remove();
        aiEl=_nvAppend('ai','','stream');
        aiBody=aiEl.querySelector('.nv-msg-body');
      }
      if(aiBody){aiBody.innerHTML=NVAI.fmt(full);out.scrollTop=out.scrollHeight;}
    },
    function(full,err){
      const t=document.getElementById('nv-thk');if(t)t.remove();
      if(err&&!full){
        _nvAppend('sys','⚠ '+err+(err==='INVALID_KEY'?' — Check key at build.nvidia.com':err==='RATE_LIMIT'?' — Wait 30s':''));
      } else if(aiEl&&aiBody){
        aiEl.classList.remove('stream');
        aiBody.innerHTML=NVAI.fmt(full);
        out.scrollTop=out.scrollHeight;
      }
      if(btn){btn.disabled=false;btn.textContent='ANALYZE ▶';}
    }
  );
};

function _nvAppend(role,text,cls){
  const out=document.getElementById('nv-out');if(!out)return null;
  const div=document.createElement('div');
  div.className='nv-msg '+(role==='usr'?'usr':role==='sys'?'sys':'ai')+(cls?' '+cls:'');
  const ts=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const lbl=role==='usr'?'YOU':role==='sys'?'SYSTEM':'⬡ BBG·AI';
  div.innerHTML='<div class="nv-msg-role">'+lbl+'</div>'
    +'<div class="nv-msg-ts">'+ts+'</div>'
    +'<div class="nv-msg-body">'+NVAI.fmt(text)+'</div>';
  out.appendChild(div);out.scrollTop=out.scrollHeight;
  return div;
}
window._nvAppend=_nvAppend;

/* ── News Classifier UI ── */
window._nvShowCls=function(){
  const wrap=document.getElementById('nvai-wrap');
  const out=document.getElementById('nv-out');
  const cls=document.getElementById('nv-cls-panel');
  if(!wrap||!out||!cls)return;
  out.style.display='none';cls.style.display='flex';
};
window._nvClsBack=function(){
  const out=document.getElementById('nv-out');
  const cls=document.getElementById('nv-cls-panel');
  if(out)out.style.display='';if(cls)cls.style.display='none';
  document.querySelectorAll('.nv-chip').forEach(c=>c.classList.remove('act'));
};
window._nvClassify=async function(){
  const ta=document.getElementById('nv-cls-inp');
  const res=document.getElementById('nv-cls-results');
  const prog=document.getElementById('nv-cls-prog');
  if(!ta||!res)return;
  const lines=ta.value.split('\n').map(s=>s.trim()).filter(Boolean);
  if(!lines.length)return;
  if(!NVAI.key){res.innerHTML='<div style="padding:12px;color:#ff3333;font-size:9px">⚠ Connect API key first</div>';return;}

  // Category colors
  const catCol={
    'Analyst Rating':'#F39F41','Price Targets':'#ff8800','Earnings':'#00cc44',
    'Labour Issues':'#ff6666','Mergers and Acquisitions':'#00ccff','Dividends':'#88dd22',
    'Regulatory':'#ff4400','Stock price movement':'#00ff88','Credit Ratings':'#ffcc00',
    'Products-Services':'#aa88ff','Product Approval':'#00ffcc','Guidance':'#ffaa44','OTHER':'#555'
  };

  res.innerHTML='<div style="padding:8px 12px;color:#446633;font-size:8px;letter-spacing:.5px">Classifying '+lines.length+' headlines...</div>';

  let done=0;
  await NVAI.classifyBatch(lines, function(n,total,row){
    done=n;
    if(prog)prog.textContent=n+'/'+total;
    const col=catCol[row.category]||'#888';
    const rowEl=document.createElement('div');
    rowEl.className='nv-cls-row';
    rowEl.innerHTML=`<span class="nv-cls-cat" style="color:${col}">${row.category}</span><span class="nv-cls-hl">${row.headline.slice(0,120)}</span>`;
    // remove loading msg on first result
    if(n===1)res.innerHTML='<div class="nv-cls-hdr"><span class="nv-cls-title">CLASSIFICATION RESULTS</span><span style="color:#334422;font-size:7px;margin-left:8px">${total} headlines</span></div>';
    res.appendChild(rowEl);
    res.scrollTop=res.scrollHeight;
  });
  if(prog)prog.textContent='Done ✓ '+done;
};
})();
<\/script>`;
};

/* ═══════════════════════════════════════════════════
   Hook into buildPanelContent
═══════════════════════════════════════════════════ */
(function(){
  const _orig = G.buildPanelContent;
  if(typeof _orig==='function'){
    G.buildPanelContent = function(fn){
      if(fn==='NVAI') return G.buildNVAI ? G.buildNVAI() : '';
      return _orig.call(this,fn);
    };
  }
  const _origT = G.buildPanelContentTab;
  if(typeof _origT==='function'){
    G.buildPanelContentTab = function(fn,ti){
      if(fn==='NVAI') return G.buildNVAI ? G.buildNVAI() : '';
      return _origT.call(this,fn,ti);
    };
  }
})();

/* ═══════════════════════════════════════════════════
   INTEL Panel Widget — injects AI brief into INTEL
═══════════════════════════════════════════════════ */
G._nvInjectIntel = function(){
  const feed=document.getElementById('intel-feed');
  if(!feed||document.getElementById('nv-intel-widget'))return;
  const w=document.createElement('div');
  w.id='nv-intel-widget'; w.className='nv-intel-widget';
  w.innerHTML=`<div class="nv-intel-hdr">
    <span class="nv-intel-logo">⬡ BBG·AI NIM</span>
    <span style="color:#224433;font-size:7px;margin-left:4px">· ${NV.MODELS[NV.activeModel]}</span>
    <div style="margin-left:auto;display:flex;align-items:center;gap:5px">
      <span class="nv-live-dot ${NV.key?'ready':''}"></span>
      <span class="nv-stat-txt" style="font-size:7px">${NV.key?'READY':'Set key in NVAI panel'}</span>
    </div>
    <button class="nv-intel-run" onclick="window._nvIntelRun()">▶ AI BRIEF</button>
    <button class="nv-intel-run" onclick="openPanel('NVAI')" style="margin-left:4px">OPEN AI →</button>
  </div>
  <div class="nv-intel-body ${NV.lastBrief?'live':''}" id="nv-intel-body">
    ${NV.lastBrief?NV.fmt(NV.lastBrief):'Click ▶ AI BRIEF for live market intelligence · Set key in NVAI panel first'}
  </div>`;
  feed.insertAdjacentElement('beforebegin',w);
};

G._nvIntelRun = async function(){
  if(!NV.key){
    const el=document.getElementById('nv-intel-body');
    if(el){el.className='nv-intel-body';el.textContent='⚠ Open NVAI panel → connect API key';}
    return;
  }
  const el=document.getElementById('nv-intel-body');
  if(el){el.className='nv-intel-body load';el.textContent='⬡ Analyzing...';}
  const q='Quick market intelligence brief: 3 bullets max. Most important development, key price signal, top risk. Be specific with tickers and levels.';
  try{
    const r=await NV.ask(q,{maxTok:300});
    NV._updateIntel(r);
  }catch(e){
    if(el){el.className='nv-intel-body';el.textContent='⚠ '+e.message;}
  }
};

/* ═══════════════════════════════════════════════════
   Add NVAI to PANELS menu + observe INTEL panel
═══════════════════════════════════════════════════ */
(function(){
  NV.loadKey();

  function injectMenu(){
    let inserted=false;
    document.querySelectorAll('.ql-it').forEach(el=>{
      if(inserted)return;
      if(el.textContent.includes('Central Bank Intelligence')||el.textContent.includes('Global Intelligence')){
        const n=document.createElement('div');
        n.className='ql-it';
        n.style.cssText='border-left:2px solid #00cc44;cursor:pointer';
        n.innerHTML='<div class="ql-it-desc" style="color:#00cc66;font-weight:700">⬡ NVAI · AI Market Intelligence (NIM)</div>';
        n.onclick=function(){if(typeof openPanel==='function')openPanel('NVAI');if(typeof closeAllQL==='function')closeAllQL();};
        el.after(n); inserted=true;
      }
    });
  }

  function observeIntel(){
    new MutationObserver(function(){
      if(document.getElementById('intel-feed')&&!document.getElementById('nv-intel-widget'))
        G._nvInjectIntel();
    }).observe(document.body,{childList:true,subtree:true});
  }

  const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();
  ready(function(){
    setTimeout(injectMenu,1000);
    observeIntel();
    setTimeout(function(){
      if(document.getElementById('intel-feed'))G._nvInjectIntel();
      injectMenu();
    },1800);
  });

  // Hook refreshAllPanels to re-inject widget
  const _origR=G.refreshAllPanels;
  if(typeof _origR==='function'){
    G.refreshAllPanels=function(){
      const r=_origR.apply(this,arguments);
      setTimeout(function(){
        if(document.getElementById('intel-feed')&&!document.getElementById('nv-intel-widget'))
          G._nvInjectIntel();
      },120);
      return r;
    };
  }

  console.log('[NVAI v5.5] Loaded · Model:',NV.MODELS[NV.activeModel]);
})();

})(window);
