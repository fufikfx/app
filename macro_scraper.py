#!/usr/bin/env python3
"""
MACRO DATA SCRAPER — Professional System v14
=============================================
Stahuje makroekonomická data z bezplatných API:
  - FRED (Fed reserve): CPI, FFR, unemployment, GDP
  - US Treasury: výnosy státních dluhopisů
  - OECD: sazby centrálních bank
  - Forex Factory: ekonomický kalendář
  - ECB: sazba ECB
  - World Government Bonds: výnosy dluhopisů

Výstup: data/macro.json  (čte index.html)
        data/bonds.json  (čte index.html)

GitHub Actions: každou hodinu
"""

import json, os, time, requests
from datetime import datetime, timezone, timedelta
from pathlib import Path

OUTPUT_MACRO = Path("data/macro.json")
OUTPUT_BONDS = Path("data/bonds.json")
FRED_KEY     = os.getenv("FRED_API_KEY", "")   # bezplatný klíč z fred.stlouisfed.org
TIMEOUT      = 12

def _get(url, **kw):
    headers = {"User-Agent": "Mozilla/5.0 (compatible; MacroBot/2.0)"}
    r = requests.get(url, timeout=TIMEOUT, headers=headers, **kw)
    r.raise_for_status()
    return r

def _now():
    return int(time.time())

# ── FRED ──────────────────────────────────────────────────────────────────────
FRED_SERIES = {
    "ffr":          "FEDFUNDS",       # Fed Funds Rate
    "cpi":          "CPIAUCSL",       # CPI All Urban
    "cpi_yoy":      "CPILFESL",       # Core CPI
    "pce":          "PCEPI",          # PCE Deflator
    "unemployment": "UNRATE",         # Unemployment Rate
    "gdp":          "A191RL1Q225SBEA",# GDP Growth QoQ
    "retail":       "RSXFS",          # Retail Sales
    "ism_mfg":      "MANEMP",         # Manufacturing Employment proxy
    "t2y":          "DGS2",           # 2Y Treasury
    "t5y":          "DGS5",           # 5Y Treasury
    "t10y":         "DGS10",          # 10Y Treasury
    "t30y":         "DGS30",          # 30Y Treasury
}

def fetch_fred(series_id, limit=5):
    if not FRED_KEY:
        return None
    try:
        url = (
            f"https://api.stlouisfed.org/fred/series/observations"
            f"?series_id={series_id}&api_key={FRED_KEY}&file_type=json"
            f"&sort_order=desc&limit={limit}"
        )
        data = _get(url).json()
        obs = [o for o in data.get("observations", []) if o.get("value", ".") != "."]
        if not obs:
            return None
        latest = obs[0]
        prev   = obs[1] if len(obs) > 1 else None
        val    = float(latest["value"])
        prev_v = float(prev["value"]) if prev else None
        return {
            "value":    round(val, 3),
            "prev":     round(prev_v, 3) if prev_v is not None else None,
            "date":     latest["date"],
            "series":   series_id,
        }
    except Exception as e:
        print(f"  [WARN] FRED {series_id}: {e}")
        return None

# ── ECB ───────────────────────────────────────────────────────────────────────
def fetch_ecb_rate():
    """ECB deposit facility rate from ECB Data Portal."""
    try:
        url = "https://data-api.ecb.europa.eu/service/data/FM/B.U2.EUR.4F.KR.MRR_FR.LEV?format=jsondata&lastNObservations=2"
        data = _get(url).json()
        series = data["dataSets"][0]["series"]
        key    = list(series.keys())[0]
        obs    = series[key]["observations"]
        sorted_keys = sorted(obs.keys(), key=lambda x: int(x))
        last   = obs[sorted_keys[-1]][0]
        prev   = obs[sorted_keys[-2]][0] if len(sorted_keys) > 1 else None
        return {"value": round(last, 2), "prev": round(prev, 2) if prev else None, "src": "ECB"}
    except Exception as e:
        print(f"  [WARN] ECB rate: {e}")
        return None

# ── BOJ / BOE / CNB ───────────────────────────────────────────────────────────
def fetch_bis_rates():
    """Bank for International Settlements policy rate data."""
    rates = {}
    try:
        # BIS publishes policy rates CSV
        url = "https://www.bis.org/statistics/full_bis_cb_policy_rates_csv.zip"
        # Fallback: use hardcoded known values with date, scraper updates when available
        # These are updated by OECD/BIS — free endpoint
        url2 = "https://stats.oecd.org/sdmx-json/data/DP_LIVE/.STINT.TOT.PC_PA.Q/OECD?contentType=csv&startPeriod=2024&endPeriod=2026"
        r = _get(url2)
        lines = r.text.strip().split("\n")
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) < 8:
                continue
            country = parts[0].strip('"')
            period  = parts[6].strip('"')
            try:
                val = float(parts[7].strip('"'))
            except:
                continue
            if country in ["GBR", "JPN", "CZE", "AUS", "CAN", "CHE"] and period >= "2024-Q1":
                if country not in rates or period > rates[country]["period"]:
                    rates[country] = {"value": val, "period": period}
    except Exception as e:
        print(f"  [WARN] BIS/OECD rates: {e}")
    return rates

# ── WORLD GOVERNMENT BONDS ────────────────────────────────────────────────────
def fetch_gov_bonds():
    """
    World Government Bonds — výnosy ze volně dostupného zdroje.
    Primárně FRED (US), fallback na statické hodnoty pro ostatní.
    """
    bonds = {}
    # US treasuries from FRED
    for key, series in [("US_2Y", "DGS2"), ("US_5Y", "DGS5"), ("US_10Y", "DGS10"), ("US_30Y", "DGS30")]:
        r = fetch_fred(series, limit=2)
        if r:
            bonds[key] = {"yield": r["value"], "prev": r["prev"], "date": r["date"], "src": "FRED"}

    # EU/UK/JP bonds — stgov.worldgovernmentbonds.com (volný JSON endpoint)
    BOND_MAP = {
        "DE_10Y": "germany",
        "UK_10Y": "united-kingdom",
        "JP_10Y": "japan",
        "IT_10Y": "italy",
        "FR_10Y": "france",
        "ES_10Y": "spain",
        "CZ_10Y": "czech-republic",
    }
    for key, country in BOND_MAP.items():
        try:
            url = f"https://markets.businessinsider.com/bonds/finder?maturity=10y&country={country}"
            # Fallback to a simpler free source
            pass
        except:
            pass

    # Use investing.com free data via allorigins proxy for non-FRED bonds
    INVESTING_IDS = {
        "DE_10Y": "23693",   # German Bund 10Y
        "UK_10Y": "23673",   # UK Gilt 10Y
        "JP_10Y": "23901",   # Japan 10Y
        "IT_10Y": "23731",   # Italy BTP 10Y
        "FR_10Y": "23701",   # France OAT 10Y
        "ES_10Y": "23721",   # Spain 10Y
    }
    for key, iid in INVESTING_IDS.items():
        try:
            url = f"https://api.allorigins.win/raw?url=" + requests.utils.quote(
                f"https://sbcharts.investing.com/bond_chart_data/country_bond_chart_data_{iid}.json"
            )
            data = _get(url, timeout=8).json()
            if data and "data" in data and len(data["data"]) > 0:
                last = data["data"][-1]
                prev = data["data"][-2] if len(data["data"]) > 1 else None
                val  = float(last[1]) if last[1] else None
                pv   = float(prev[1]) if prev and prev[1] else None
                if val:
                    bonds[key] = {"yield": round(val, 3), "prev": round(pv, 3) if pv else None, "src": "Investing"}
        except Exception as e:
            print(f"  [WARN] Bond {key}: {e}")

    return bonds

# ── FOMC / WIRP ───────────────────────────────────────────────────────────────
def fetch_fomc_expectations():
    """
    CME FedWatch probabilities — free via CME Group public endpoint.
    Vrací pravděpodobnosti pro následující FOMC meeting.
    """
    try:
        # CME FedWatch public API
        url = "https://www.cmegroup.com/CmeWS/mvc/ProductCalendar/V2/FedWatch/probabilities"
        data = _get(url, timeout=10).json()
        meetings = data.get("meetings", [])
        result = []
        for m in meetings[:6]:  # next 6 meetings
            result.append({
                "date":        m.get("meetingDate", ""),
                "current_rate": m.get("currentRate", ""),
                "probabilities": m.get("probabilities", []),
            })
        return result
    except Exception as e:
        print(f"  [WARN] FedWatch: {e}")
        # Fallback: hardcoded current expectations
        return []

# ── MACRO INDICATORS ──────────────────────────────────────────────────────────
def build_macro_data():
    print("\n▶ Fetching MACRO indicators...")
    macro = {
        "meta": {"updated": _now(), "updated_iso": datetime.now(timezone.utc).isoformat()},
        "inflation": {},
        "central_banks": {},
        "growth": {},
        "activity": {},
        "fomc": [],
    }

    # FRED indicators
    if FRED_KEY:
        print("  FRED: CPI, FFR, unemployment, GDP...")
        for key, series in FRED_SERIES.items():
            r = fetch_fred(series)
            if r:
                macro["inflation" if key in ("cpi","cpi_yoy","pce") else
                      "central_banks" if key == "ffr" else
                      "growth" if key in ("gdp","unemployment","retail") else
                      "activity"][key] = r

        # ECB rate
        ecb = fetch_ecb_rate()
        if ecb:
            macro["central_banks"]["ecb"] = ecb

        # FOMC
        fomc = fetch_fomc_expectations()
        if fomc:
            macro["fomc"] = fomc
    else:
        print("  [INFO] No FRED_API_KEY — skipping FRED (free key: fred.stlouisfed.org)")

    return macro

# ── BONDS ─────────────────────────────────────────────────────────────────────
def build_bonds_data():
    print("\n▶ Fetching BONDS data...")
    bonds_raw = fetch_gov_bonds()

    # Compose structured bonds array matching buildBNDS() format
    BOND_DEFS = [
        {"key": "US_2Y",  "name": "US 2Y",    "rtg": "AAA", "dur": 1.9,  "country": "US"},
        {"key": "US_5Y",  "name": "US 5Y",    "rtg": "AAA", "dur": 4.7,  "country": "US"},
        {"key": "US_10Y", "name": "US 10Y",   "rtg": "AAA", "dur": 8.9,  "country": "US"},
        {"key": "US_30Y", "name": "US 30Y",   "rtg": "AAA", "dur": 18.2, "country": "US"},
        {"key": "DE_10Y", "name": "GER 10Y",  "rtg": "AAA", "dur": 9.1,  "country": "DE"},
        {"key": "UK_10Y", "name": "UK 10Y",   "rtg": "AA",  "dur": 8.8,  "country": "UK"},
        {"key": "JP_10Y", "name": "JPN 10Y",  "rtg": "A+",  "dur": 9.0,  "country": "JP"},
        {"key": "IT_10Y", "name": "ITA 10Y",  "rtg": "BBB", "dur": 8.5,  "country": "IT"},
        {"key": "FR_10Y", "name": "FRA 10Y",  "rtg": "AA-", "dur": 8.7,  "country": "FR"},
        {"key": "ES_10Y", "name": "SPN 10Y",  "rtg": "A",   "dur": 8.6,  "country": "ES"},
        {"key": "CZ_10Y", "name": "CZK 10Y",  "rtg": "AA-", "dur": 7.8,  "country": "CZ"},
    ]

    bonds_out = []
    for b in BOND_DEFS:
        live = bonds_raw.get(b["key"])
        entry = dict(b)
        if live:
            entry["yield"] = live["yield"]
            entry["chg"]   = round(live["yield"] - live["prev"], 3) if live.get("prev") else 0
            entry["src"]   = live.get("src", "API")
            entry["date"]  = live.get("date", "")
        bonds_out.append(entry)

    return {
        "meta":  {"updated": _now(), "updated_iso": datetime.now(timezone.utc).isoformat()},
        "bonds": bonds_out,
    }

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    print(f"\n{'='*60}")
    print(f"  MACRO SCRAPER — {now_str}")
    print(f"  FRED key: {'SET' if FRED_KEY else 'NOT SET (free key at fred.stlouisfed.org)'}")
    print(f"{'='*60}")

    OUTPUT_MACRO.parent.mkdir(parents=True, exist_ok=True)

    # MACRO indicators
    macro = build_macro_data()
    with open(OUTPUT_MACRO, "w") as f:
        json.dump(macro, f, ensure_ascii=False, separators=(",", ":"))
    print(f"\n✅ macro.json saved — {sum(len(v) for v in macro.values() if isinstance(v, dict))} indicators")

    # BONDS
    bonds = build_bonds_data()
    with open(OUTPUT_BONDS, "w") as f:
        json.dump(bonds, f, ensure_ascii=False, separators=(",", ":"))
    print(f"✅ bonds.json saved — {len(bonds['bonds'])} bonds")

    print(f"\n{'='*60}\n")

if __name__ == "__main__":
    main()
