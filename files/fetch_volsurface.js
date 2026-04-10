// scripts/fetch_volsurface.js
// Stahuje vol surface data z Deribit a ukládá do data/volsurface.json

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'volsurface.json');

async function fetchJSON(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

async function fetchDeribit(currency) {
  const cur = currency.toUpperCase();
  const [book, index] = await Promise.all([
    fetchJSON(`https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=${cur}&kind=option`),
    fetchJSON(`https://www.deribit.com/api/v2/public/get_index_price?index_name=${cur.toLowerCase()}_usd`)
  ]);

  const spot = index.result?.index_price || 0;
  const now  = Date.now();
  const pts  = [];

  (book.result || []).forEach(b => {
    if (!b.instrument_name) return;
    if (!(b.mark_iv > 0 && b.mark_iv < 600)) return;

    const p = b.instrument_name.split('-');
    if (p.length < 4) return;

    const K   = parseFloat(p[2]);
    const exp = new Date(p[1].replace(/(\d+)([A-Z]+)(\d+)/, '$1 $2 20$3') + ' 08:00 UTC');
    const dte = Math.round((exp - now) / 86400000);

    if (dte < 1 || dte > 180) return;
    if (spot > 0 && (K < spot * 0.50 || K > spot * 1.55)) return;

    pts.push({ K, dte, iv: b.mark_iv });
  });

  if (pts.length < 20) throw new Error(`Too few points for ${cur}: ${pts.length}`);

  return { spot, pts, live: true, ts: Date.now() };
}

function sabrFallback(sym, spot) {
  // Používá historickou vol z jednoduchého odhadu jako fallback
  const al = 0.65, be = 0.7;
  const ro  = sym === 'btc' ? -0.15 : -0.20;
  const nu  = 0.35;
  const DT  = [1,3,5,7,10,14,21,30,45,60,90,120];
  const NK  = 25;
  const pts = [];

  DT.forEach(dte => {
    const tau = dte / 365;
    for (let i = 0; i < NK; i++) {
      const pct = -0.40 + i * 0.80 / (NK - 1);
      const K = spot * (1 + pct), F = spot;
      let iv;

      if (Math.abs(pct) < 1e-4) {
        iv = al / Math.pow(F, 1 - be) * 100;
      } else {
        const z   = (nu / al) * Math.pow(F * K, (1-be)/2) * Math.log(F / K);
        const chi = Math.abs(z) < 1e-8
          ? 1
          : Math.log((Math.sqrt(1 - 2*ro*z + z*z) + z - ro) / (1 - ro)) / z;
        const t1  = al / (Math.pow(F*K, (1-be)/2) * (1 + ((1-be)*Math.log(F/K))**2/24 + ((1-be)*Math.log(F/K))**4/1920));
        const t2  = 1 + ((1-be)**2/24 * al**2/Math.pow(F*K,1-be) + ro*be*nu*al/(4*Math.pow(F*K,(1-be)/2)) + nu**2*(2-3*ro**2)/24) * tau;
        iv = Math.max(5, t1 * (z / chi) * t2 * 100);
      }

      // Short-expiry term structure
      if (dte <= 5)  iv *= (1 + 0.4 * Math.exp(-Math.pow(pct / 0.08, 2)));
      if (dte <= 10 && Math.abs(pct) > 0.2) iv *= 1.15;

      pts.push({ K, dte, iv });
    }
  });

  return { spot, pts, live: false, ts: Date.now() };
}

async function run() {
  const result = {};

  for (const sym of ['btc', 'eth']) {
    const cur = sym.toUpperCase();
    console.log(`Fetching ${cur}…`);
    try {
      result[sym] = await fetchDeribit(cur);
      console.log(`  ✓ Deribit — ${result[sym].pts.length} points, spot=${result[sym].spot}`);
    } catch (err) {
      console.warn(`  ✗ Deribit failed (${err.message}), using SABR fallback`);
      // Potřebujeme spot — zkus Binance
      let spot = 0;
      try {
        const tk = await fetchJSON(`https://api.binance.com/api/v3/ticker/price?symbol=${cur}USDT`);
        spot = parseFloat(tk.price);
      } catch (e2) {
        console.error(`  ✗ Binance spot fetch also failed — skipping ${cur}`);
        continue;
      }
      result[sym] = sabrFallback(sym, spot);
      console.log(`  ✓ SABR fallback — ${result[sym].pts.length} points, spot=${spot}`);
    }
  }

  // Ulož data/volsurface.json
  const dir = path.dirname(OUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
  console.log(`Saved → ${OUT}`);
}

run().catch(err => { console.error(err); process.exit(1); });
