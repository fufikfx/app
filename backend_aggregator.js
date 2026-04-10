// Node.js 18+ required (for native fetch)
const fs = require('fs');
const path = require('path');

// ── HELPERS ─────────────────────────────────────────────────────────────
async function _bg(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP Error ${r.status}: ${url}`);
  return r.json();
}

// ── DERIBIT (Anchor) ────────────────────────────────────────────────────
async function _bderibit(cur) {
  const [bSum, ixSum, dvolSum] = await Promise.all([
    _bg(`https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=${cur}&kind=option`),
    _bg(`https://www.deribit.com/api/v2/public/get_index_price?index_name=${cur.toLowerCase()}_usdt`),
    _bg(`https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${cur}&resolution=1D`)
      .catch(() => ({ result: { data: [[0, 0, 0, 0, 0]] } }))
  ]);

  const spot = parseFloat(ixSum?.result?.index_price || 0);
  let dvol = 0;
  if(dvolSum?.result?.data?.length > 0){
    const row = dvolSum.result.data[dvolSum.result.data.length - 1];
    dvol = parseFloat(row[4] || 0);
  }
  const now = Date.now();
  const pts = [];

  const _parseExpiry = (s) => {
    const m = s.match(/(?:BTC|ETH)-(\d{1,2})([A-Z]{3})(\d{2})/);
    if (!m) return null;
    return new Date(`${m[1]} ${m[2]} 20${m[3]} 08:00 UTC`);
  };

  (bSum.result || []).forEach(b => {
    const p = b.instrument_name.split('-');
    if (p.length < 4) return;
    const K = parseFloat(p[2]);
    const optType = p[3];

    const bidIv = b.bid_iv || 0;
    const askIv = b.ask_iv || 0;
    let iv = (bidIv > 0 && askIv > 0) ? (bidIv + askIv) / 2 : b.mark_iv || 0;
    if (!(iv > 2 && iv < 500)) return;

    const exp = _parseExpiry(p[1]);
    if (!exp) return;
    const dte = Math.round((exp - now) / 86400000);
    if (dte < 1 || dte > 400) return;

    if (spot > 0) {
      const logMny = Math.log(K / spot);
      if (Math.abs(logMny) > 0.9) return;
    }

    const oi = b.open_interest || 0;
    const vol = (b.stats?.volume_usd) || (b.stats?.volume ? b.stats.volume * spot : 0) || 0;
    const ivSpread = (askIv > 0 && bidIv > 0) ? (askIv - bidIv) : 20;
    const spreadQ = Math.exp(-ivSpread / 30);
    const logMny = spot > 0 ? Math.abs(Math.log(K / spot)) : 0;
    const atmW = Math.exp(-4 * logMny * logMny);
    const dteW = Math.exp(-dte / 120);

    const liquidityW = Math.max(0.01, Math.sqrt(oi + 1) * Math.log1p(vol + 1) * spreadQ);
    const weight = liquidityW * (1 + 2 * atmW) * (1 + dteW);

    pts.push({ K, dte, iv, oi, vol, weight, optType, logMny });
  });

  if (dvol > 5 && dvol < 400) {
    const atmPts = pts.filter(p => Math.abs(p.logMny) < 0.05 && p.dte >= 25 && p.dte <= 35);
    if (atmPts.length > 0) {
      const avgATMiv = atmPts.reduce((s, p) => s + p.iv, 0) / atmPts.length;
      const dvolAdj = dvol / avgATMiv;
      if (dvolAdj > 0.7 && dvolAdj < 1.4) {
        pts.forEach(p => {
          const wingFade = 0.4 + 0.6 * Math.exp(-6 * p.logMny * p.logMny);
          p.iv = p.iv * (1 + (dvolAdj - 1) * wingFade);
        });
      }
    }
  }

  return { spot, pts, live: true };
}

// ── BYBIT ─────────────────────────────────────────────────────────────
async function _bbybit(cur) {
  const base = cur.toUpperCase();
  const [tk, ix] = await Promise.all([
    _bg(`https://api.bybit.com/v5/market/tickers?category=option&baseCoin=${base}`),
    _bg(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${base}USDT`)
  ]);
  const spot = parseFloat(ix.result?.list?.[0]?.lastPrice || 0);
  const now = Date.now();
  const pts = [];

  (tk.result?.list || []).forEach(b => {
    const p = b.symbol.split('-');
    if (p.length < 4) return;
    const K = parseFloat(p[2]);
    const optType = p[3];

    const _parseDate = (s) => {
      const m = s.match(/(\d{1,2})([A-Z]{3})(\d{2})/);
      if (!m) return null;
      return new Date(`${m[1]} ${m[2]} 20${m[3]} 08:00 UTC`);
    };
    const exp = _parseDate(p[1]);
    if (!exp) return;
    const dte = Math.round((exp - now) / 86400000);
    if (dte < 1 || dte > 400) return;

    const bidIv = parseFloat(b.bid1Iv || 0);
    const askIv = parseFloat(b.ask1Iv || 0);
    const markIv = parseFloat(b.markIv || 0);
    let iv = (bidIv > 0 && askIv > 0) ? (bidIv + askIv) * 50 : markIv * 100;
    if (!(iv > 2 && iv < 500)) return;

    const oi = parseFloat(b.openInterest || 0);
    const vol = parseFloat(b.volume24h || 0);
    const logMny = Math.abs(Math.log(K / spot));
    if (logMny > 0.9) return;

    const weight = Math.sqrt(oi + 1) * Math.log1p(vol + 1) * Math.exp(-4 * logMny * logMny);
    pts.push({ K, dte, iv, oi, vol, weight, optType, logMny, src: 'bybit' });
  });
  return { spot, pts };
}

// ── BINANCE ─────────────────────────────────────────────────────────────
async function _bbinance(cur) {
  const base = cur.toUpperCase();
  const [tk, ix] = await Promise.all([
    _bg(`https://eapi.binance.com/eapi/v1/ticker`),
    _bg(`https://api.binance.com/api/v3/ticker/price?symbol=${base}USDT`)
  ]);
  const spot = parseFloat(ix.price || 0);
  const now = Date.now();
  const pts = [];

  (tk || []).forEach(b => {
    if (!b.symbol.startsWith(base)) return;
    const p = b.symbol.split('-');
    if (p.length < 4) return;
    const K = parseFloat(p[2]);
    const optType = p[3];
    const _parseDate = (s) => {
      const yr = '20' + s.substring(0, 2);
      const mo = s.substring(2, 4);
      const dy = s.substring(4, 6);
      return new Date(`${yr}-${mo}-${dy}T08:00:00Z`);
    };
    const exp = _parseDate(p[1]);
    if (!exp) return;
    const dte = Math.round((exp - now) / 86400000);
    if (dte < 1 || dte > 400) return;

    const bidIv = parseFloat(b.bidIv || 0);
    const askIv = parseFloat(b.askIv || 0);
    let iv = (bidIv > 0 && askIv > 0) ? (bidIv + askIv) * 50 : parseFloat(b.markIv || 0) * 100;
    if (!(iv > 2 && iv < 500)) return;

    const oi = parseFloat(b.openInterest || 0);
    const vol = parseFloat(b.volume || 0);
    const logMny = Math.abs(Math.log(K / spot));
    if (logMny > 0.9) return;

    const weight = Math.sqrt(oi + 1) * Math.log1p(vol + 1) * Math.exp(-4 * logMny * logMny);
    pts.push({ K, dte, iv, oi, vol, weight, optType, logMny, src: 'binance' });
  });
  return { spot, pts };
}

// ── AGGREGATION ENGINE ──────────────────────────────────────────────────
async function aggregateSurface(sym) {
  const dMerged = { spot: 0, pts: [], _ts: Date.now(), _src: 'aggregated', fb: false, live: true };
  const venues = ['deribit', 'bybit', 'binance']; 
  
  const results = await Promise.allSettled(venues.map(v => {
    if (v === 'deribit') return _bderibit(sym.toUpperCase());
    if (v === 'bybit') return _bbybit(sym);
    if (v === 'binance') return _bbinance(sym);
    return null;
  }));

  let totalSpot = 0, spotCount = 0;
  results.forEach(res => {
    if (res.status === 'fulfilled' && res.value) {
      if (res.value.spot > 0) {
        totalSpot += res.value.spot;
        spotCount++;
      }
      if (res.value.pts) dMerged.pts.push(...res.value.pts);
    } else {
      console.error(`Failed fetching for ${sym}:`, res.reason);
    }
  });

  if (spotCount > 0) dMerged.spot = totalSpot / spotCount;
  // Filter out anomalies
  dMerged.pts = dMerged.pts.filter(p => p.iv > 0 && p.iv < 400);

  return dMerged;
}

// ── MAIN RUNNER ─────────────────────────────────────────────────────────
async function run() {
  console.log('Starting Aggregation...');
  try {
    const data = {
      btc: await aggregateSurface('btc'),
      eth: await aggregateSurface('eth'),
      _ts: Date.now()
    };

    const outDir = path.join(__dirname, 'data');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outDir, 'volsurface.json'), JSON.stringify(data));
    console.log('Successfully wrote combined volsurface.json');
    process.exit(0);
  } catch (error) {
    console.error('Aggregation failed:', error);
    process.exit(1);
  }
}

run();
