/**
 * BLOOMBERG TERMINAL — DATA PATCH
 * ================================
 * Paste this script at the END of the <body>, just before </body>,
 * OR inject it via browser console after the page loads.
 *
 * Fixes:
 *  1. COMDTY_DATA (Gold, Oil, Brent, etc.) — fetches real prices from Yahoo Finance
 *     futures symbols (GC=F, CL=F, BZ=F, etc.) when Stooq fails
 *  2. Chart header (At / Op / Hi / Lo / Close / Vol) — seeds from COMDTY_DATA
 *     when TradingView iframe data is missing (BRENT/UKOIL case)
 *  3. Status bar bottom prices (BTC, ETH, Gold, WTI, SPX) — forces a refresh
 *     cycle when prices are null
 *  4. FX panel — adds Yahoo Finance fallback for FX pairs
 *  5. Adds a persistent self-healing loop that re-fetches every 30s
 */

(function() {
'use strict';

// ── 1. COMMODITY YAHOO FINANCE FALLBACK ──────────────────────────────────────
// Maps internal COMDTY_DATA symbols → Yahoo Finance futures tickers
const YAHOO_COMDTY_MAP = {
  'XAU':  'GC=F',    // Gold
  'XAG':  'SI=F',    // Silver
  'XPT':  'PL=F',    // Platinum
  'XPD':  'PA=F',    // Palladium
  'CL1':  'CL=F',    // WTI Crude
  'CO1':  'BZ=F',    // Brent Crude
  'NG1':  'NG=F',    // Natural Gas
  'HG1':  'HG=F',    // Copper
  'W1':   'ZW=F',    // Wheat
  'C1':   'ZC=F',    // Corn
  'S1':   'ZS=F',    // Soybeans
  'CC1':  'CC=F',    // Cocoa
  'KC1':  'KC=F',    // Coffee
  'CT1':  'CT=F',    // Cotton
  'SB1':  'SB=F',    // Sugar
  'LH1':  'HE=F',    // Lean Hogs
  'LC1':  'LE=F',    // Live Cattle
  'RB1':  'RB=F',    // RBOB Gasoline
  'HO1':  'HO=F',    // Heating Oil
};

// Reverse map: Yahoo symbol → COMDTY_DATA symbol
const YAHOO_COMDTY_REVERSE = {};
Object.entries(YAHOO_COMDTY_MAP).forEach(([k,v]) => { YAHOO_COMDTY_REVERSE[v] = k; });

async function fetchYahooComdty() {
  const syms = Object.values(YAHOO_COMDTY_MAP);
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(syms.join(','))}&fields=regularMarketPrice,regularMarketChangePercent,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,regularMarketVolume`;
  const url2 = url.replace('query1', 'query2');

  let data = null;
  try {
    const r = await Promise.race([
      fetch(url).then(x => x.json()),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
    ]);
    if (r?.quoteResponse?.result?.length) data = r;
  } catch(_) {}

  if (!data) {
    try {
      const r = await Promise.race([
        fetch(url2).then(x => x.json()),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
      ]);
      if (r?.quoteResponse?.result?.length) data = r;
    } catch(_) {}
  }

  if (!data?.quoteResponse?.result) return 0;

  let updated = 0;
  const COMDTY = window.COMDTY_DATA;
  if (!COMDTY) return 0;

  data.quoteResponse.result.forEach(q => {
    const internalSym = YAHOO_COMDTY_REVERSE[q.symbol];
    if (!internalSym) return;
    const cd = COMDTY.find(x => x.s === internalSym);
    if (!cd) return;
    const px = q.regularMarketPrice;
    if (!px || px <= 0 || isNaN(px)) return;
    cd.px = px;
    if (q.regularMarketChangePercent != null) cd.chg = q.regularMarketChangePercent;
    if (q.regularMarketOpen > 0) cd.open = q.regularMarketOpen;
    if (q.regularMarketDayHigh > 0) cd.hi = q.regularMarketDayHigh;
    if (q.regularMarketDayLow > 0) cd.lo = q.regularMarketDayLow;
    if (q.regularMarketVolume > 0) cd.vol = q.regularMarketVolume;
    updated++;
  });

  return updated;
}

// ── 2. FX FALLBACK via Yahoo Finance ─────────────────────────────────────────
const YAHOO_FX_MAP = {
  'EURUSD=X': 'EUR/USD',
  'GBPUSD=X': 'GBP/USD',
  'USDJPY=X': 'USD/JPY',
  'USDCHF=X': 'USD/CHF',
  'AUDUSD=X': 'AUD/USD',
  'NZDUSD=X': 'NZD/USD',
  'USDCAD=X': 'USD/CAD',
  'USDCNH=X': 'USD/CNH',
  'USDINR=X': 'USD/INR',
  'USDBRL=X': 'USD/BRL',
  'USDMXN=X': 'USD/MXN',
  'USDTRY=X': 'USD/TRY',
  'USDZAR=X': 'USD/ZAR',
  'USDRUB=X': 'USD/RUB',
  'USDKRW=X': 'USD/KRW',
  'USDSGD=X': 'USD/SGD',
  'USDSEK=X': 'USD/SEK',
  'USDNOK=X': 'USD/NOK',
  'USDDKK=X': 'USD/DKK',
  'USDPLN=X': 'USD/PLN',
  'USDCZK=X': 'USD/CZK',
  'USDHUF=X': 'USD/HUF',
  'EURGBP=X': 'EUR/GBP',
  'EURJPY=X': 'EUR/JPY',
  'GBPJPY=X': 'GBP/JPY',
};

async function fetchYahooFX() {
  const FXP = window.FXP;
  if (!FXP) return 0;

  const syms = Object.keys(YAHOO_FX_MAP).join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(syms)}&fields=regularMarketPrice,regularMarketChangePercent,bid,ask`;

  let data = null;
  try {
    const r = await Promise.race([
      fetch(url).then(x => x.json()),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
    ]);
    if (r?.quoteResponse?.result?.length) data = r;
  } catch(_) {}

  if (!data?.quoteResponse?.result) return 0;

  let updated = 0;
  data.quoteResponse.result.forEach(q => {
    const pair = YAHOO_FX_MAP[q.symbol];
    if (!pair) return;
    const entry = FXP.find(x => x.p === pair);
    if (!entry) return;
    const px = q.regularMarketPrice || q.bid;
    if (!px || px <= 0) return;
    const spread = pair.includes('JPY') ? 0.015 : 0.00015;
    entry.b = parseFloat(px.toFixed(5));
    entry.a = parseFloat((px + spread).toFixed(5));
    if (q.regularMarketChangePercent != null) entry.c = q.regularMarketChangePercent;
    updated++;
  });

  return updated;
}

// ── 3. CHART HEADER SEEDING FROM COMDTY_DATA ─────────────────────────────────
// When the TradingView iframe doesn't post back data (e.g. BRENT/UKOIL),
// seed the header fields from COMDTY_DATA so they don't stay as "—"
function seedChartHeaderFromComdty(sym) {
  if (!sym) return;
  const COMDTY = window.COMDTY_DATA;
  if (!COMDTY) return;

  // Map chart symbol names → COMDTY_DATA symbols
  const CHART_TO_COMDTY = {
    'BRENT': 'CO1', 'UKOIL': 'CO1', 'CO1': 'CO1', 'BZ=F': 'CO1',
    'WTI': 'CL1', 'USOIL': 'CL1', 'CL1': 'CL1', 'CL=F': 'CL1',
    'GOLD': 'XAU', 'XAUUSD': 'XAU', 'XAU': 'XAU', 'GC=F': 'XAU',
    'SILVER': 'XAG', 'XAGUSD': 'XAG', 'XAG': 'XAG', 'SI=F': 'XAG',
    'NATGAS': 'NG1', 'NATURALGAS': 'NG1', 'NG1': 'NG1', 'NG=F': 'NG1',
    'COPPER': 'HG1', 'HG1': 'HG1', 'HG=F': 'HG1',
    'WHEAT': 'W1', 'W1': 'W1', 'ZW=F': 'W1',
    'CORN': 'C1', 'C1': 'C1', 'ZC=F': 'C1',
  };

  const symUpper = String(sym).toUpperCase().replace('TVC:', '').replace('NYMEX:', '').replace('COMEX:', '').replace('!', '');
  const comdtySym = CHART_TO_COMDTY[symUpper];
  if (!comdtySym) return;

  const cd = COMDTY.find(x => x.s === comdtySym);
  if (!cd || !cd.px) return;

  // Only seed fields that are currently "—" (null/zero)
  function setIfEmpty(id, val, formatter) {
    if (!val || isNaN(val)) return;
    const el = document.getElementById(id);
    if (!el) return;
    const current = el.innerText.trim();
    if (current === '—' || current === '' || current === '—:—') {
      el.innerText = formatter ? formatter(val) : val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  const fmtPx = v => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtVol = v => {
    if (v >= 1e9) return (v/1e9).toFixed(2) + 'B';
    if (v >= 1e6) return (v/1e6).toFixed(2) + 'M';
    if (v >= 1e3) return (v/1e3).toFixed(1) + 'K';
    return v.toFixed(0);
  };

  // Set current price if missing
  setIfEmpty('bbg-current-price', cd.px, fmtPx);
  setIfEmpty('bbg-close', cd.px, fmtPx);

  // Set OHLC
  setIfEmpty('bbg-start', cd.open, fmtPx);
  setIfEmpty('bbg-high', cd.hi, fmtPx);
  setIfEmpty('bbg-low', cd.lo, fmtPx);

  // Set volume
  if (cd.vol) setIfEmpty('bbg-volume', cd.vol, fmtVol);

  // Set time
  const timeEl = document.getElementById('bbg-time');
  if (timeEl && (timeEl.innerText === '—:—' || timeEl.innerText === '')) {
    const now = new Date();
    timeEl.innerText = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  // Also seed window globals so the live update functions find them
  if (!window._chigh && cd.hi) window._chigh = cd.hi;
  if (!window._clow && cd.lo) window._clow = cd.lo;
  if (!window._firstBbgPrice && cd.open) window._firstBbgPrice = cd.open;
  if (!window._cvol && cd.vol) window._cvol = cd.vol;

  // Also update ov- overlay panel fields
  const ovFmt = v => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  ['ov-high', 'ov-low', 'ov-open', 'ov-close', 'ov-start'].forEach(id => {
    const el = document.getElementById(id);
    if (el && (el.innerText === '—' || el.innerText === '')) {
      if (id === 'ov-high' && cd.hi) el.innerText = ovFmt(cd.hi);
      if (id === 'ov-low' && cd.lo) el.innerText = ovFmt(cd.lo);
      if ((id === 'ov-open') && cd.open) el.innerText = ovFmt(cd.open);
      if ((id === 'ov-close' || id === 'ov-start') && cd.px) el.innerText = ovFmt(cd.px);
    }
  });
}

// ── 4. STATUS BAR PRICES (_updateStatPrices force-refresh) ───────────────────
function forceStatPricesRefresh() {
  if (typeof window._updateStatPrices === 'function') {
    window._updateStatPrices();
  }
  // Also directly patch any null sbp elements from known live data
  const COMDTY = window.COMDTY_DATA;
  const CRYPTO = window.CRYPTO;
  const MKT = window.MKT;

  const patches = [
    { id: 'sbp-xau', chgId: 'sbp-xau-c', get: () => COMDTY?.find(x => x.s === 'XAU') },
    { id: 'sbp-wti', chgId: 'sbp-wti-c', get: () => COMDTY?.find(x => x.s === 'CL1') },
    { id: 'sbp-btc', chgId: 'sbp-btc-c', get: () => CRYPTO?.find(x => x.s === 'BTC') },
    { id: 'sbp-eth', chgId: 'sbp-eth-c', get: () => CRYPTO?.find(x => x.s === 'ETH') },
    { id: 'sbp-spx', chgId: 'sbp-spx-c', get: () => MKT?.['SPX'] },
  ];

  const fmtTickPx = typeof window.fmtTickPx === 'function' ? window.fmtTickPx : (v) => {
    if (!v || isNaN(v)) return '—';
    if (v >= 10000) return v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    if (v >= 100)   return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return v.toFixed(4);
  };

  patches.forEach(({ id, chgId, get }) => {
    const data = get();
    if (!data) return;
    const px = data.px;
    const chg = data.chg;
    if (px && !isNaN(px) && px > 0) {
      const el = document.getElementById(id);
      if (el && (el.textContent === '—' || el.textContent === '' || el.textContent === '0')) {
        el.textContent = fmtTickPx(px);
      }
    }
    if (chg != null && !isNaN(chg)) {
      const el = document.getElementById(chgId);
      if (el && (el.textContent === '—' || el.textContent === '')) {
        const up = chg >= 0;
        el.textContent = (up ? '+' : '') + chg.toFixed(2) + '%';
        el.className = 'sbp-chg ' + (up ? 'up' : 'dn');
      }
    }
  });
}

// ── 5. TICKER TAPE — refresh after commodity data loads ──────────────────────
function refreshTickerIfStale() {
  if (typeof window.buildTicker === 'function') {
    window.buildTicker();
  }
  if (typeof window.refreshAllPanels === 'function') {
    window.refreshAllPanels();
  }
}

// ── 6. CHART SYMBOL WATCHER — detect when chart switches to commodity ────────
// Watches bbg-chart-title for changes and seeds header data
let _lastChartSym = '';
function watchChartSymbol() {
  const titleEl = document.getElementById('bbg-chart-title');
  if (!titleEl) return;

  const observer = new MutationObserver(() => {
    const sym = titleEl.innerText || titleEl.textContent;
    if (sym && sym !== _lastChartSym) {
      _lastChartSym = sym;
      // Delay slightly to let TradingView iframe load first
      setTimeout(() => {
        seedChartHeaderFromComdty(sym);
      }, 2500);
      // Second attempt if still empty after 6s
      setTimeout(() => {
        seedChartHeaderFromComdty(sym);
      }, 6000);
    }
  });

  observer.observe(titleEl, { childList: true, characterData: true, subtree: true });

  // Also check toolbar title
  const toolbarTitle = document.getElementById('bbg-toolbar-title');
  if (toolbarTitle) {
    observer.observe(toolbarTitle, { childList: true, characterData: true, subtree: true });
  }
}

// ── 7. MAIN PATCH RUNNER ─────────────────────────────────────────────────────
async function runPatch(isInitial) {
  const label = isInitial ? '[PATCH-INIT]' : '[PATCH-REFRESH]';
  console.log(label, 'Starting data patch...');

  // Fetch commodity prices from Yahoo
  const comdtyCount = await fetchYahooComdty();
  console.log(label, `Commodity prices updated: ${comdtyCount}`);

  // Fetch FX rates from Yahoo
  const fxCount = await fetchYahooFX();
  console.log(label, `FX pairs updated: ${fxCount}`);

  // Refresh UI
  if (comdtyCount > 0 || fxCount > 0) {
    refreshTickerIfStale();
    forceStatPricesRefresh();
  }

  // Always try to seed chart header in case it's empty
  const chartTitle = document.getElementById('bbg-chart-title');
  if (chartTitle) {
    const sym = chartTitle.innerText || chartTitle.textContent;
    if (sym) seedChartHeaderFromComdty(sym);
  }

  // Force-refresh status bar regardless
  forceStatPricesRefresh();

  // Trigger existing Stooq fetch too (might work for some symbols)
  if (typeof window.fetchStooq === 'function') {
    window.fetchStooq().catch(() => {});
  }
}

// ── 8. BOOTSTRAP ─────────────────────────────────────────────────────────────
function bootstrap() {
  console.log('[PATCH] Bloomberg Terminal data patch loading...');

  // Start chart symbol watcher
  watchChartSymbol();

  // Initial run after a short delay (let original fetches run first)
  setTimeout(() => runPatch(true), 3000);

  // Also run immediately in case we're late-loading
  setTimeout(() => runPatch(false), 500);

  // Periodic self-healing loop every 30 seconds
  setInterval(() => runPatch(false), 30000);

  // Hook into existing _updateStatPrices if it exists
  const origUpdateStat = window._updateStatPrices;
  if (typeof origUpdateStat === 'function') {
    window._updateStatPrices = function() {
      origUpdateStat.apply(this, arguments);
      // After original runs, force a patch if values are still null
      setTimeout(forceStatPricesRefresh, 100);
    };
  }

  console.log('[PATCH] Loaded. Yahoo Finance commodity + FX fallback active. Chart header seeding active.');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

})(); // end IIFE
