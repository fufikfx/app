#!/usr/bin/env python3
"""
NEWS SCRAPER — PROFESSIONAL SYSTEM v14
========================================
Scrapes RSS feeds → 12 category folders → data/news.json
GitHub Actions runs this every 15 minutes.
News items expire after TTL_DAYS (7 days = weekly purge).
Real data only — no synthetic articles.

Categories match sidebar menu:
  ALL_NEWS, TOP_NEWS, MACRO, MARKETS, CRYPTO, EARNINGS,
  ENERGY, CENTRAL_BANKS, COMPANY, RESEARCH, INTELLIGENCE, WATCHLIST
"""

import json
import os
import time
import hashlib
import re
import feedparser
import requests
from datetime import datetime, timezone
from pathlib import Path

# ── CONFIG ────────────────────────────────────────────────────────────────────
TTL_DAYS    = 7           # Articles older than 7 days get removed (weekly purge)
MAX_ITEMS   = 500         # Hard cap per category
OUTPUT_FILE = Path("data/news.json")

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")   # Set in GitHub Secrets

# ── CATEGORY DEFINITIONS ──────────────────────────────────────────────────────
# Each category = unique RSS feeds relevant ONLY to that folder
CATEGORIES = {

    "TOP_NEWS": {
        "label": "Top News Stories",
        "color": "#ff7700",
        "icon": "★",
        "feeds": [
            ("https://feeds.reuters.com/reuters/topNews",                 "Reuters Top",    1),
            ("https://apnews.com/hub/ap-top-news.rss",                   "AP Top News",    1),
            ("https://feeds.bbci.co.uk/news/rss.xml",                    "BBC Top",        1),
            ("https://feeds.a.dj.com/rss/WSJcomUSBusinessNews.xml",      "WSJ Top",        1),
            ("https://www.ft.com/rss/home",                              "FT Top",         1),
            ("https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml","NYT Top",        1),
            ("https://feeds.content.dowjones.io/public/rss/mw_realtimeheadline","DJ Flash", 1),
        ],
        "keywords": [],
    },

    "MACRO": {
        "label": "Macro — Central Banks & Data",
        "color": "#34d399",
        "icon": "🏦",
        "feeds": [
            ("https://www.federalreserve.gov/feeds/press_all.xml",        "Fed·Official",  1),
            ("https://www.federalreserve.gov/feeds/speeches.xml",         "Fed·Speeches",  1),
            ("https://www.ecb.europa.eu/rss/press.html",                  "ECB·Official",  1),
            ("https://www.bankofengland.co.uk/rss/publications",          "BOE·Official",  1),
            ("https://www.bis.org/doclist/all_speeches.rss",              "BIS",           1),
            ("https://www.imf.org/en/News/rss?language=eng",             "IMF",           1),
            ("https://www.oecd.org/newsroom/rss/",                       "OECD",          1),
            ("https://www.worldbank.org/en/news/rss",                    "World Bank",    1),
            ("https://apnews.com/hub/economy.rss",                       "AP Economy",    1),
            ("https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml", "NYT Economy",   2),
            ("https://feeds.bbci.co.uk/news/business/rss.xml",           "BBC Business",  2),
            ("https://www.cnbc.com/id/20910258/device/rss/rss.html",     "CNBC Economy",  2),
        ],
        "keywords": [
            "federal reserve","fed rate","fomc","powell","inflation","cpi",
            "pce","gdp","nfp","payroll","unemployment","rate cut","rate hike",
            "monetary policy","ecb","lagarde","boe","bailey","boj","ueda",
            "pboc","rba","snb","boc","quantitative tightening","qt","qe",
            "treasury yield","yield curve","10-year","recession","stagflation",
            "soft landing","hard landing","imf","world bank","oecd","g7","g20",
            "davos","jackson hole","beige book","balance sheet","cbdc",
            "consumer spending","retail sales","manufacturing","pmi",
            "trade deficit","current account","budget deficit","debt ceiling",
            "sovereign debt","credit rating","moody","fitch","dollar index","dxy",
        ],
    },

    "MARKETS": {
        "label": "Markets — Equities & FX",
        "color": "#60a5fa",
        "icon": "📈",
        "feeds": [
            ("https://feeds.reuters.com/reuters/businessNews",            "Reuters Biz",   1),
            ("https://feeds.a.dj.com/rss/RSSMarketsMain.xml",            "WSJ Markets",   1),
            ("https://www.cnbc.com/id/15839135/device/rss/rss.html",     "CNBC Markets",  2),
            ("https://feeds.marketwatch.com/marketwatch/realtimeheadlines/","MarketWatch", 1),
            ("https://feeds.content.dowjones.io/public/rss/mw_marketpulse","DJ MktWatch",  1),
            ("https://apnews.com/hub/financial-markets.rss",             "AP Markets",    1),
            ("https://www.ft.com/rss/home/companies",                    "FT Companies",  2),
            ("https://rss.nytimes.com/services/xml/rss/nyt/Business.xml","NYT Business",  2),
            ("https://feeds.reuters.com/reuters/technologyNews",         "Reuters Tech",  1),
        ],
        "keywords": [
            "stock","equity","shares","nasdaq","s&p 500","dow jones","nyse",
            "forex","fx","eur/usd","gbp/usd","usd/jpy","currency","exchange rate",
            "market open","market close","futures","options","vix","volatility",
            "bull market","bear market","rally","selloff","correction",
            "etf","index","portfolio","trading","hedge fund","asset manager",
        ],
    },

    "CRYPTO": {
        "label": "Crypto — Digital Assets",
        "color": "#a78bce",
        "icon": "₿",
        "feeds": [
            ("https://www.coindesk.com/arc/outboundfeeds/rss/",          "CoinDesk",      1),
            ("https://cointelegraph.com/rss",                             "Cointelegraph", 2),
            ("https://decrypt.co/feed",                                   "Decrypt",       2),
            ("https://theblock.co/rss.xml",                              "The Block",     1),
            ("https://blockworks.co/feed/",                              "Blockworks",    2),
            ("https://www.bitcoinmagazine.com/.rss/full/",               "BTC Magazine",  2),
            ("https://cryptoslate.com/feed/",                            "CryptoSlate",   3),
            ("https://thedefiant.io/feed",                               "The Defiant",   2),
            ("https://beincrypto.com/feed/",                             "BeInCrypto",    3),
        ],
        "keywords": [
            "bitcoin","btc","ethereum","eth","crypto","blockchain","defi",
            "nft","web3","solana","binance","coinbase","usdt","usdc",
            "stablecoin","halving","altcoin","dao","layer2","polygon",
            "avalanche","cardano","ripple","xrp","metamask","uniswap",
            "aave","compound","hyperliquid","perp","perpetual","on-chain",
            "dex","cex","spot etf","bitcoin etf","sec crypto","tether",
            "kraken","ftx","celsius","grayscale","microstrategy","saylor",
        ],
    },

    "EARNINGS": {
        "label": "Earnings — Corp Results",
        "color": "#fbbf24",
        "icon": "📊",
        "feeds": [
            ("https://www.businesswire.com/rss/home/?rss=G22",           "BusinessWire",  1),
            ("https://www.prnewswire.com/rss/financial-news-releases.rss","PR Newswire",  1),
            ("https://feeds.reuters.com/reuters/companyNews",             "Reuters Corp",  1),
            ("https://www.cnbc.com/id/15839069/device/rss/rss.html",     "CNBC Earnings", 1),
            ("https://feeds.a.dj.com/rss/WSJcomUSBusinessNews.xml",      "WSJ Corp",      1),
            ("https://apnews.com/hub/business.rss",                      "AP Business",   1),
            ("https://techcrunch.com/feed/",                             "TechCrunch",    2),
        ],
        "keywords": [
            "earnings","eps","revenue","quarterly results","q1","q2","q3","q4",
            "net income","operating income","profit","loss","beats","misses",
            "guidance","full year outlook","annual results","sec filing",
            "10-k","8-k","10-q","proxy","shareholder","buyback","dividend",
            "ipo","merger","acquisition","m&a","deal","takeover","spinoff",
        ],
    },

    "ENERGY": {
        "label": "Energy — Oil & Gas",
        "color": "#f97316",
        "icon": "⚡",
        "feeds": [
            ("https://oilprice.com/rss/main",                            "OilPrice",      1),
            ("https://www.eia.gov/rss/todayinenergy.xml",                "EIA Energy",    1),
            ("https://www.rigzone.com/news/rss/rigzone_latest.aspx",     "Rigzone",       2),
            ("https://feeds.reuters.com/reuters/environmentNews",        "Reuters Energy",1),
            ("https://www.naturalgasintel.com/feed/",                    "NGI",           2),
            ("https://www.spglobal.com/commodityinsights/en/rss-feed/oil","S&P Cmdty",   1),
            ("https://apnews.com/hub/energy-industry.rss",               "AP Energy",    1),
        ],
        "keywords": [
            "oil price","crude oil","opec","brent crude","wti","natural gas",
            "lng","petroleum","refinery","pipeline","drilling","rig count",
            "energy crisis","eia","iea","renewable energy","nuclear","solar",
            "wind energy","battery","ev","electric vehicle","hydrogen",
            "carbon price","emissions","climate","cop","net zero",
            "saudi aramco","exxon","chevron","shell","bp","total energies",
        ],
    },

    "CENTRAL_BANKS": {
        "label": "Central Banks — FED ECB BOE BOJ",
        "color": "#a3e635",
        "icon": "🏛",
        "feeds": [
            ("https://www.federalreserve.gov/feeds/press_all.xml",        "FED·Official",  1),
            ("https://www.federalreserve.gov/feeds/speeches.xml",         "FED·Speeches",  1),
            ("https://www.federalreserve.gov/feeds/h15.xml",              "FED·Rates",     1),
            ("https://www.ecb.europa.eu/rss/press.html",                  "ECB·Official",  1),
            ("https://www.bankofengland.co.uk/rss/publications",          "BOE·Official",  1),
            ("https://www.boj.or.jp/en/rss/news.xml",                    "BOJ·Official",  1),
            ("https://www.bis.org/doclist/all_speeches.rss",              "BIS",           1),
            ("https://www.snb.ch/en/news/rss",                           "SNB",           1),
            ("https://www.riksbank.se/en-gb/press-and-published/rss/",   "Riksbank",      2),
            ("https://www.rba.gov.au/rss/rss-cb-news-and-information.xml","RBA",          2),
        ],
        "keywords": [
            "federal reserve","fed","fomc","powell","ecb","lagarde","boe",
            "bailey","boj","ueda","pboc","rba","snb","boc","riksbank",
            "rate decision","interest rate","rate cut","rate hike","basis points",
            "monetary policy statement","press conference","balance sheet",
            "quantitative tightening","qt","qe","quantitative easing",
            "forward guidance","inflation target","neutral rate","terminal rate",
        ],
    },

    "COMPANY": {
        "label": "Company News",
        "color": "#94a3b8",
        "icon": "🏢",
        "feeds": [
            ("https://feeds.reuters.com/reuters/companyNews",             "Reuters Corp",  1),
            ("https://www.businesswire.com/rss/home/?rss=G1",            "BizWire Corp",  1),
            ("https://www.prnewswire.com/rss/news-releases-list.rss",    "PRNewswire",    1),
            ("https://feeds.a.dj.com/rss/WSJcomUSBusinessNews.xml",      "WSJ Corp",      1),
            ("https://techcrunch.com/feed/",                             "TechCrunch",    2),
            ("https://www.ft.com/rss/home/technology",                   "FT Tech",       2),
            ("https://feeds.reuters.com/reuters/technologyNews",         "Reuters Tech",  1),
            ("https://apnews.com/hub/technology.rss",                    "AP Tech",       1),
        ],
        "keywords": [
            "ceo","cfo","coo","chairman","appointed","resigned","stepped down",
            "layoffs","restructuring","reorg","headcount","workforce","hiring",
            "partnership","joint venture","contract","agreement","deal",
            "product launch","new product","release","update","recall",
            "lawsuit","settlement","fine","penalty","investigation","regulatory",
            "apple","microsoft","nvidia","alphabet","google","amazon",
            "meta","tesla","berkshire","jpmorgan","goldman sachs","bank of america",
        ],
    },

    "RESEARCH": {
        "label": "News & Research — Filtered",
        "color": "#e879f9",
        "icon": "🔬",
        "feeds": [
            ("https://www.nber.org/rss/new_working_papers.rss",          "NBER Papers",   1),
            ("https://www.brookings.edu/feed/",                          "Brookings",     1),
            ("https://www.piie.com/rss.xml",                             "PIIE",          1),
            ("https://cepr.org/feed",                                    "CEPR",          1),
            ("https://voxeu.org/rss.xml",                                "VoxEU",         1),
            ("https://www.federalreserve.gov/feeds/feds.xml",            "Fed·Research",  1),
            ("https://www.ecb.europa.eu/rss/wpapers.html",               "ECB·Research",  1),
            ("https://www.bis.org/doclist/wpapers.rss",                  "BIS·Papers",    1),
            ("https://www.imf.org/en/Publications/WP/rss?language=eng",  "IMF·Papers",    1),
        ],
        "keywords": [
            "research","paper","working paper","study","analysis","report",
            "forecast","projection","estimate","model","data","survey",
            "outlook","assessment","review","monitor","tracker",
            "economists","researchers","analysts","think tank","policy",
        ],
    },

    "INTELLIGENCE": {
        "label": "Global Intelligence Feed",
        "color": "#fb923c",
        "icon": "🌐",
        "feeds": [
            ("https://feeds.reuters.com/reuters/worldNews",               "Reuters World", 1),
            ("https://apnews.com/hub/world-news.rss",                    "AP World",      1),
            ("https://feeds.bbci.co.uk/news/world/rss.xml",              "BBC World",     1),
            ("https://rss.nytimes.com/services/xml/rss/nyt/World.xml",   "NYT World",     2),
            ("https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml","NYT Politics",  2),
            ("https://feeds.reuters.com/reuters/politicsNews",           "Reuters Pol",   1),
            ("https://www.aljazeera.com/xml/rss/all.xml",                "Al Jazeera",    2),
            ("https://foreignpolicy.com/feed/",                          "Foreign Policy",2),
            ("https://www.defensenews.com/rss/",                         "Defense News",  2),
            ("https://www.cnbc.com/id/100727362/device/rss/rss.html",    "CNBC World",    2),
        ],
        "keywords": [
            "iran","sanctions","russia","china","tariff","trade war",
            "geopolit","middle east","israel","ukraine","taiwan","nato",
            "pentagon","defense","military","conflict","war","cease-fire",
            "election","president","prime minister","government","parliament",
            "g7","g20","un","security council","wto","diplomacy","treaty",
            "intelligence","security","terrorism","espionage","cyber attack",
        ],
    },

    "WATCHLIST": {
        "label": "Journalist & Trader Watchlist",
        "color": "#ff4444",
        "icon": "👁",
        "feeds": [
            ("https://feeds.reuters.com/reuters/topNews",                 "Reuters Top",   1),
            ("https://feeds.content.dowjones.io/public/rss/mw_realtimeheadline","DJ Flash",1),
            ("https://feeds.marketwatch.com/marketwatch/realtimeheadlines/","MarketWatch", 1),
            ("https://apnews.com/hub/ap-top-news.rss",                   "AP Breaking",   1),
            ("https://www.coindesk.com/arc/outboundfeeds/rss/",          "CoinDesk",      1),
            ("https://feeds.reuters.com/reuters/businessNews",            "Reuters Biz",   1),
            ("https://oilprice.com/rss/main",                            "OilPrice",      1),
            ("https://www.federalreserve.gov/feeds/press_all.xml",        "FED·Official",  1),
        ],
        "keywords": [
            "breaking","alert","flash","urgent","exclusive","first","just in",
            "developing","update","confirmed","sources say","sources tell",
            "market moving","significant","major","key","critical","shock",
            "surprise","unexpected","record","historic","crisis","emergency",
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


def _parse_ts(pub_date_str) -> int:
    if not pub_date_str:
        return int(time.time())
    try:
        return int(time.mktime(pub_date_str))
    except Exception:
        pass
    try:
        from email.utils import parsedate_to_datetime
        return int(parsedate_to_datetime(str(pub_date_str)).timestamp())
    except Exception:
        return int(time.time())


def fetch_rss(url: str, src_name: str, category: str, tier: int, limit: int = 30) -> list:
    items = []
    try:
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "Mozilla/5.0 (compatible; NewsBot/2.0)"
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

            items.append({
                "id":       _dedup_key(title),
                "title":    title,
                "src":      src_name,
                "category": category,
                "tag":      category,
                "ts":       ts,
                "link":     link,
                "body":     desc,
                "tier":     tier,
            })
    except Exception as e:
        print(f"  [WARN] {src_name}: {e}")
    return items


def load_existing() -> dict:
    if OUTPUT_FILE.exists():
        try:
            with open(OUTPUT_FILE) as f:
                return json.load(f)
        except Exception:
            pass
    return {"meta": {}, "categories": {c: [] for c in CATEGORIES}}


def expire_old(articles: list, ttl_days: int = TTL_DAYS) -> list:
    cutoff = int(time.time()) - ttl_days * 86400
    return [a for a in articles if (a.get("ts") or 0) >= cutoff]


def merge_articles(existing: list, fresh: list, max_items: int = MAX_ITEMS) -> list:
    seen  = {a["id"] for a in existing}
    added = 0
    for art in fresh:
        if art["id"] not in seen:
            seen.add(art["id"])
            existing.append(art)
            added += 1
    existing.sort(key=lambda a: (a.get("tier", 3), -(a.get("ts") or 0)))
    print(f"    + {added} new articles added")
    return existing[:max_items]


def main():
    now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    print(f"\n{'='*60}")
    print(f"  NEWS SCRAPER — {now_str}")
    print(f"  TTL: {TTL_DAYS} days (weekly auto-purge)")
    print(f"{'='*60}")

    data = load_existing()
    if "categories" not in data:
        data["categories"] = {}

    # Build ALL_NEWS combined from all other categories' feeds
    all_feeds_seen = set()
    all_fresh = []

    for cat_id, cfg in CATEGORIES.items():
        print(f"\n▶ {cat_id} — {cfg['label']}")
        existing = data["categories"].get(cat_id, [])
        existing = expire_old(existing)

        fresh_all = []
        for feed_url, src_name, tier in cfg["feeds"]:
            print(f"  RSS {src_name}...")
            items = fetch_rss(feed_url, src_name, cat_id, tier)
            fresh_all.extend(items)
            # Collect for ALL_NEWS
            for it in items:
                if it["id"] not in all_feeds_seen:
                    all_feeds_seen.add(it["id"])
                    all_fresh.append(dict(it, category="ALL_NEWS", tag="ALL_NEWS"))

        merged = merge_articles(existing, fresh_all)
        data["categories"][cat_id] = merged
        print(f"  ✓ {len(merged)} total articles")

    # Build ALL_NEWS (union of everything, tier-sorted, capped at 1000)
    existing_all = data["categories"].get("ALL_NEWS", [])
    existing_all = expire_old(existing_all)
    all_merged = merge_articles(existing_all, all_fresh, max_items=1000)
    data["categories"]["ALL_NEWS"] = all_merged
    print(f"\n▶ ALL_NEWS — combined: {len(all_merged)} articles")

    # Meta
    data["meta"] = {
        "updated":      int(time.time()),
        "updated_iso":  datetime.now(timezone.utc).isoformat(),
        "ttl_days":     TTL_DAYS,
        "categories":   {c: len(data["categories"].get(c, [])) for c in list(CATEGORIES.keys()) + ["ALL_NEWS"]},
        "total":        sum(len(data["categories"].get(c, [])) for c in CATEGORIES),
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    print(f"\n{'='*60}")
    print(f"  ✅ Saved → {OUTPUT_FILE}")
    print(f"  Categories: {data['meta']['categories']}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
