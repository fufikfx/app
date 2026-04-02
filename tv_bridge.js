#!/usr/bin/env node
/**
 * TRADINGVIEW → PROFESSIONAL SYSTEM v14
 * =======================================
 * Bridge: TradingView Desktop (CDP) → GitHub data/tv_live.json
 * 
 * Co dělá:
 *  - Každých 30s tahá live data z TradingView (ceny, indikátory, úrovně)
 *  - Ukládá do data/tv_live.json na GitHub
 *  - Professional System v14 tento soubor načítá a zobrazuje v terminálu
 * 
 * Použití:
 *   node tv_bridge.js                    # spustit bridge
 *   node tv_bridge.js --once             # jednorázový snapshot
 *   node tv_bridge.js --symbols BTCUSDT,ETHUSDT,NVDA  # konkrétní symboly
 * 
 * Požadavky:
 *   - TradingView Desktop s --remote-debugging-port=9222
 *   - npm install chrome-remote-interface
 */

import CDP from 'chrome-remote-interface';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const PORT       = 9222;
const OUTPUT     = 'data/tv_live.json';
const INTERVAL   = 30_000;  // 30 sekund
const ONCE       = process.argv.includes('--once');
const SYMBOLS_ARG = process.argv.find(a => a.startsWith('--symbols='));
const CUSTOM_SYMBOLS = SYMBOLS_ARG ? SYMBOLS_ARG.split('=')[1].split(',') : null;

// ── HELPERS ──────────────────────────────────────────────────────────────────

async function evaluate(client, js) {
  const { Runtime } = client;
  const res = await Runtime.evaluate({ expression: js, returnByValue: true, awaitPromise: true });
  if (res.exceptionDetails) throw new Error(res.exceptionDetails.text || 'CDP eval error');
  return res.result?.value;
}

async function getClient() {
  const targets = await CDP.List({ port: PORT });
  const target = targets.find(t => t.url?.includes('tradingview') || t.type === 'page');
  if (!target) throw new Error('No TradingView page found. Launch TV with --remote-debugging-port=9222');
  return CDP({ port: PORT, target: target.id });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── DATA EXTRACTORS ───────────────────────────────────────────────────────────

const CHART_API = `window.TradingViewApi._activeChartWidgetWV.value()`;
const MODEL     = `${CHART_API}._chartWidget.model()`;
const BARS_PATH = `${MODEL}.mainSeries().bars()`;

async function getQuote(client) {
  return evaluate(client, `(function(){
    var chart = ${CHART_API};
    var m = ${MODEL};
    var bars = m.mainSeries().bars();
    var last = bars.lastIndex();
    var v = bars.valueAt(last);
    if (!v) return null;
    var prev = bars.valueAt(last - 1);
    var chg = prev ? ((v[4] - prev[4]) / prev[4] * 100) : 0;
    return {
      symbol:   chart.symbol(),
      resolution: chart.resolution(),
      time:     v[0],
      open:     v[1],
      high:     v[2],
      low:      v[3],
      close:    v[4],
      volume:   v[5] || 0,
      chg_pct:  Math.round(chg * 100) / 100,
    };
  })()`);
}

async function getIndicators(client) {
  return evaluate(client, `(function(){
    var chart = ${CHART_API};
    var studies = chart.getAllStudies();
    var result = [];
    studies.forEach(function(s) {
      try {
        var vals = chart.getStudyById(s.id).getInputValues();
        result.push({ id: s.id, name: s.name, inputs: vals });
      } catch(e) {}
    });
    return result;
  })()`);
}

async function getPineLines(client, filter) {
  const js = `(function(){
    var chart = ${CHART_API}._chartWidget;
    var model = chart.model();
    var sources = model.model().dataSources();
    var levels = [];
    var seen = new Set();
    var filter = ${filter ? `'${filter}'` : 'null'};
    for (var i = 0; i < sources.length; i++) {
      var s = sources[i];
      if (!s.metaInfo) continue;
      try {
        var meta = s.metaInfo();
        var name = meta.description || meta.shortDescription || '';
        if (!name) continue;
        if (filter && name.indexOf(filter) === -1) continue;
        var g = s._graphics;
        if (!g || !g._primitivesCollection) continue;
        var pc = g._primitivesCollection;
        var outer = pc.dwghlines;
        if (!outer) continue;
        var inner = outer.get('hlines');
        if (!inner) continue;
        var coll = inner.get(false);
        if (!coll || !coll._primitivesDataById) continue;
        coll._primitivesDataById.forEach(function(v) {
          var price = v.price || (v._data && v._data.price);
          if (price && !seen.has(Math.round(price * 100))) {
            seen.add(Math.round(price * 100));
            levels.push({ price: price, source: name });
          }
        });
      } catch(e) {}
    }
    levels.sort(function(a, b) { return b.price - a.price; });
    return levels.slice(0, 30);
  })()`;
  return evaluate(client, js);
}

async function getStudyValues(client) {
  return evaluate(client, `(function(){
    var chart = ${CHART_API};
    var studies = chart.getAllStudies();
    var values = [];
    studies.forEach(function(s) {
      try {
        var study = chart.getStudyById(s.id);
        var data = study.getDataValues(chart.getVisibleRange().from, chart.getVisibleRange().to);
        if (data && data.length > 0) {
          var last = data[data.length - 1];
          values.push({ name: s.name, values: last.slice(1, 5) });
        }
      } catch(e) {}
    });
    return values;
  })()`).catch(() => []);
}

async function getChartState(client) {
  return evaluate(client, `(function(){
    var chart = ${CHART_API};
    return {
      symbol:     chart.symbol(),
      resolution: chart.resolution(),
      chartType:  chart.chartType(),
      studies:    chart.getAllStudies().map(function(s){ return s.name; }),
    };
  })()`);
}

// ── MAIN SNAPSHOT ─────────────────────────────────────────────────────────────

async function snapshot() {
  const client = await getClient();
  await client.Runtime.enable();
  
  try {
    const [quote, state, lines] = await Promise.allSettled([
      getQuote(client),
      getChartState(client),
      getPineLines(client, null),
    ]);

    const quoteData  = quote.status  === 'fulfilled' ? quote.value  : null;
    const stateData  = state.status  === 'fulfilled' ? state.value  : null;
    const linesData  = lines.status  === 'fulfilled' ? lines.value  : [];

    const data = {
      meta: {
        updated:     Math.floor(Date.now() / 1000),
        updated_iso: new Date().toISOString(),
        source:      'tradingview-mcp-bridge',
      },
      chart: stateData || {},
      quote: quoteData || {},
      levels: linesData || [],
    };

    // Load existing, merge
    let existing = { meta: {}, snapshots: [] };
    if (existsSync(OUTPUT)) {
      try { existing = JSON.parse(readFileSync(OUTPUT, 'utf8')); } catch {}
    }
    if (!Array.isArray(existing.snapshots)) existing.snapshots = [];

    // Keep last 48 snapshots (24h at 30min intervals)
    existing.snapshots.unshift({ ts: data.meta.updated, quote: data.quote, levels: data.levels });
    existing.snapshots = existing.snapshots.slice(0, 48);
    existing.meta = data.meta;
    existing.chart = data.chart;
    existing.latest = data.quote;
    existing.levels = data.levels;

    writeFileSync(OUTPUT, JSON.stringify(existing, null, 2));
    console.log(`[TV-BRIDGE] ${new Date().toISOString()} — ${data.quote?.symbol} ${data.quote?.close} (${data.quote?.chg_pct > 0 ? '+' : ''}${data.quote?.chg_pct}%) | ${(data.levels||[]).length} levels`);
    return data;

  } finally {
    await client.close();
  }
}

// ── MAIN LOOP ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('[TV-BRIDGE] Starting TradingView → Professional System bridge');
  console.log(`[TV-BRIDGE] Output: ${OUTPUT}`);
  console.log(`[TV-BRIDGE] Interval: ${INTERVAL / 1000}s`);
  
  // Create output dir
  try { execSync('mkdir -p data'); } catch {}

  while (true) {
    try {
      await snapshot();
    } catch(e) {
      if (e.message.includes('ECONNREFUSED') || e.message.includes('CDP')) {
        console.warn('[TV-BRIDGE] TradingView not connected. Launch with --remote-debugging-port=9222');
      } else {
        console.error('[TV-BRIDGE] Error:', e.message);
      }
    }

    if (ONCE) break;
    await sleep(INTERVAL);
  }
}

main().catch(e => {
  console.error('[TV-BRIDGE] Fatal:', e.message);
  process.exit(1);
});
