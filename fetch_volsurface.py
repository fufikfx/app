#!/usr/bin/env python3
"""
BACKQUANT VOL SURFACE FETCHER
Fetches live BTC + ETH options data from Deribit,
saves as data/volsurface.json for the terminal app.
Run by GitHub Actions every 15 minutes.
"""

import json, math, time, re, urllib.request
from datetime import datetime, timezone

OUTPUT = "data/volsurface.json"

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "backquant/1.0"})
    with urllib.request.urlopen(req, timeout=12) as r:
        return json.loads(r.read().decode())

def fetch_deribit(currency):
    cur = currency.upper()
    book = fetch(f"https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency={cur}&kind=option")
    index = fetch(f"https://www.deribit.com/api/v2/public/get_index_price?index_name={cur.lower()}_usd")
    spot = index.get("result", {}).get("index_price", 0)
    now_ms = time.time() * 1000
    pts = []
    for b in book.get("result", []):
        name = b.get("instrument_name", "")
        mark_iv = b.get("mark_iv", 0)
        if not name or not (0 < mark_iv < 600):
            continue
        parts = name.split("-")
        if len(parts) < 4:
            continue
        try:
            K = float(parts[2])
        except ValueError:
            continue
        m = re.match(r"(\d+)([A-Z]+)(\d+)", parts[1])
        if not m:
            continue
        try:
            exp_dt = datetime.strptime(f"{m.group(1)} {m.group(2)} 20{m.group(3)} 08:00", "%d %b %Y %H:%M").replace(tzinfo=timezone.utc)
            dte = round((exp_dt.timestamp() * 1000 - now_ms) / 86_400_000)
        except Exception:
            continue
        if dte < 1 or dte > 365:
            continue
        if spot > 0 and (K < spot * 0.25 or K > spot * 2.50):
            continue
        pts.append({"K": K, "dte": dte, "iv": mark_iv})
    if len(pts) < 30:
        raise RuntimeError(f"Not enough points for {currency}: {len(pts)}")
    return {"spot": spot, "pts": pts, "live": True}

def sabr_fallback(sym):
    b = sym.upper() + "USDT"
    tk = fetch(f"https://api.binance.com/api/v3/ticker/24hr?symbol={b}")
    kl = fetch(f"https://api.binance.com/api/v3/klines?symbol={b}&interval=1h&limit=720")
    cl = [float(k[4]) for k in kl]
    spot = cl[-1]
    ret = [math.log(cl[i]/cl[i-1]) for i in range(1, len(cl[-168:]))]
    hv = math.sqrt(sum(r*r for r in ret) / len(ret)) * math.sqrt(8760)
    al = max(0.3, hv); be = 0.7; ro = -0.15 if sym == "btc" else -0.20; nu = 0.35
    DT = [1,3,5,7,10,14,21,30,45,60,90,120]; NK = 25; pts = []
    for dte in DT:
        tau = dte / 365
        for i in range(NK):
            pct = -0.40 + i * 0.80 / (NK - 1)
            K = spot * (1 + pct); F = spot
            if abs(pct) < 1e-4:
                iv = al / (F ** (1 - be)) * 100
            else:
                z = (nu / al) * (F * K) ** ((1 - be) / 2) * math.log(F / K)
                chi = 1 if abs(z) < 1e-8 else math.log((math.sqrt(1 - 2*ro*z + z*z) + z - ro) / (1 - ro)) / z
                t1 = al / ((F*K)**((1-be)/2) * (1 + ((1-be)*math.log(F/K))**2/24 + ((1-be)*math.log(F/K))**4/1920))
                t2 = 1 + ((1-be)**2/24 * al**2 / (F*K)**(1-be) + ro*be*nu*al/(4*(F*K)**((1-be)/2)) + nu**2*(2-3*ro**2)/24) * tau
                iv = max(10, t1 * (z / chi) * t2 * 100)
            pts.append({"K": K, "dte": dte, "iv": iv})
    return {"spot": spot, "pts": pts, "live": False}

def run():
    import os
    os.makedirs("data", exist_ok=True)
    result = {"updated": datetime.utcnow().isoformat() + "Z", "btc": None, "eth": None}

    for sym, cur in [("btc", "BTC"), ("eth", "ETH")]:
        try:
            print(f"Fetching {cur} from Deribit...")
            result[sym] = fetch_deribit(cur)
            print(f"  ✓ {cur}: {len(result[sym]['pts'])} points, spot={result[sym]['spot']:.0f}")
        except Exception as e:
            print(f"  Deribit failed for {cur}: {e}, falling back to SABR...")
            try:
                result[sym] = sabr_fallback(sym)
                print(f"  ✓ {cur} SABR: {len(result[sym]['pts'])} points")
            except Exception as e2:
                print(f"  ✗ SABR also failed for {cur}: {e2}")

    with open(OUTPUT, "w") as f:
        json.dump(result, f, separators=(",", ":"))
    print(f"\nSaved → {OUTPUT}  ({os.path.getsize(OUTPUT)//1024} KB)")

if __name__ == "__main__":
    run()
