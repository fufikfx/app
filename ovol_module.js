// ══════════════════════════════════════════════════════════════════════════════
// OVOL — Crypto Options Volatility Analytics Module
// Integrates: Deribit API + OKX Options API
// Panels: IV Surface, Skew Curve, Term Structure, Greeks, OI, Expected Move
// Author: Terminal Extension v1.0
// ══════════════════════════════════════════════════════════════════════════════

// ── Black-Scholes Implementation ─────────────────────────────────────────────
const BS = {
  cdf(x) {
    const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;
    const sign = x<0?-1:1;
    const ax = Math.abs(x)/Math.SQRT2;
    const t = 1/(1+p*ax);
    const y = 1-(((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t)*Math.exp(-ax*ax);
    return 0.5*(1+sign*y);
  },
  pdf(x){ return Math.exp(-0.5*x*x)/Math.sqrt(2*Math.PI); },
  d1(S,K,T,r,σ){ return (Math.log(S/K)+(r+0.5*σ*σ)*T)/(σ*Math.sqrt(T)); },
  d2(S,K,T,r,σ){ return this.d1(S,K,T,r,σ)-σ*Math.sqrt(T); },
  call(S,K,T,r,σ){
    if(T<=0) return Math.max(S-K,0);
    const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
    return S*this.cdf(d1)-K*Math.exp(-r*T)*this.cdf(d2);
  },
  put(S,K,T,r,σ){
    if(T<=0) return Math.max(K-S,0);
    const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
    return K*Math.exp(-r*T)*this.cdf(-d2)-S*this.cdf(-d1);
  },
  impliedVol(price,S,K,T,r,type,tol=1e-6,maxIter=100){
    if(price<=0||T<=0) return null;
    const intrinsic = type==='C'?Math.max(S-K,0):Math.max(K-S,0);
    if(price<intrinsic-0.001) return null;
    let σ=0.5;
    for(let i=0;i<maxIter;i++){
      const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
      const price_th = type==='C'?this.call(S,K,T,r,σ):this.put(S,K,T,r,σ);
      const vega = S*this.pdf(d1)*Math.sqrt(T);
      if(vega<1e-10) break;
      const err = price_th-price;
      if(Math.abs(err)<tol) return σ;
      σ -= err/vega;
      if(σ<=0) σ=0.001;
      if(σ>10) return null;
    }
    return σ>0&&σ<10?σ:null;
  },
  // Greeks
  delta(S,K,T,r,σ,type){
    const d1=this.d1(S,K,T,r,σ);
    return type==='C'?this.cdf(d1):(this.cdf(d1)-1);
  },
  gamma(S,K,T,r,σ){ return this.pdf(this.d1(S,K,T,r,σ))/(S*σ*Math.sqrt(T)); },
  vega(S,K,T,r,σ){ return S*this.pdf(this.d1(S,K,T,r,σ))*Math.sqrt(T)/100; },
  theta(S,K,T,r,σ,type){
    const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
    const t1=-S*this.pdf(d1)*σ/(2*Math.sqrt(T));
    if(type==='C') return (t1-r*K*Math.exp(-r*T)*this.cdf(d2))/365;
    return (t1+r*K*Math.exp(-r*T)*this.cdf(-d2))/365;
  },
  vanna(S,K,T,r,σ){
    const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
    return -this.pdf(d1)*d2/σ;
  },
  charm(S,K,T,r,σ,type){
    const d1=this.d1(S,K,T,r,σ), d2=d1-σ*Math.sqrt(T);
    const x = this.pdf(d1)*(r/(σ*Math.sqrt(T))-d2/(2*T));
    return type==='C'?-x:x;
  }
};

// ── DERIBIT API Client ────────────────────────────────────────────────────────
const DeribitAPI = {
  BASE: 'https://www.deribit.com/api/v2/public',
  PROXY: 'https://corsproxy.io/?url=',
  
  async fetch(method, params={}) {
    const qs = new URLSearchParams({...params}).toString();
    const url = `${this.BASE}/${method}?${qs}`;
    const proxied = `${this.PROXY}${encodeURIComponent(url)}`;
    
    // Try direct first, then proxy
    for(const u of [url, proxied]) {
      try {
        const r = await fetch(u, {signal: AbortSignal.timeout(10000)});
        if(!r.ok) continue;
        const j = await r.json();
        if(j.result !== undefined) return j.result;
      } catch(e) { /* try next */ }
    }
    return null;
  },

  async getInstruments(currency='BTC') {
    return await this.fetch('get_instruments', {currency, kind:'option', expired:'false'});
  },

  async getTicker(instrument) {
    return await this.fetch('ticker', {instrument_name: instrument});
  },

  async getBookSummary(currency='BTC') {
    return await this.fetch('get_book_summary_by_currency', {currency, kind:'option'});
  },

  async getIndex(currency='BTC') {
    return await this.fetch('get_index_price', {index_name:`${currency.toLowerCase()}_usd`});
  },

  async getVolIndex(currency='BTC') {
    return await this.fetch('get_volatility_index_data', {
      currency,
      start_timestamp: Date.now()-86400000,
      end_timestamp: Date.now(),
      resolution:'3600'
    });
  }
};

// ── OKX Options API Client ────────────────────────────────────────────────────
const OKXAPI = {
  BASE: 'https://www.okx.com/api/v5',
  PROXY: 'https://corsproxy.io/?url=',
  
  async fetch(endpoint, params={}) {
    const qs = new URLSearchParams(params).toString();
    const url = `${this.BASE}/${endpoint}?${qs}`;
    const proxied = `${this.PROXY}${encodeURIComponent(url)}`;
    for(const u of [url, proxied]) {
      try {
        const r = await fetch(u, {signal: AbortSignal.timeout(10000)});
        if(!r.ok) continue;
        const j = await r.json();
        if(j.data) return j.data;
      } catch(e) {}
    }
    return null;
  },

  async getInstruments(uly='BTC-USD') {
    return await this.fetch('public/instruments', {instType:'OPTION', uly});
  },

  async getTickers(uly='BTC-USD') {
    return await this.fetch('market/tickers', {instType:'OPTION', uly});
  },

  async getOptionMarketData(uly='BTC-USD') {
    return await this.fetch('public/opt-summary', {uly, expTime: ''});
  }
};

// ── Data Processor ────────────────────────────────────────────────────────────
const OptionsDataProcessor = {
  // Parse Deribit instruments into structured data
  parseDeribitInstrument(name) {
    // BTC-14APR26-80000-C
    const parts = name.split('-');
    if(parts.length!==4) return null;
    const [ccy, expStr, strikeStr, type] = parts;
    const expDate = this.parseExpiry(expStr);
    if(!expDate) return null;
    const strike = parseInt(strikeStr);
    const T = Math.max((expDate-Date.now())/(365.25*24*3600*1000), 0);
    return { ccy, expDate, expStr, strike, type, T, name };
  },

  parseExpiry(s) {
    // 14APR26 → Date
    const months = {JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11};
    const m = s.match(/^(\d+)([A-Z]+)(\d+)$/);
    if(!m) return null;
    const day=parseInt(m[1]), mon=months[m[2]], yr=2000+parseInt(m[3]);
    if(mon===undefined) return null;
    return new Date(Date.UTC(yr, mon, day, 8, 0, 0)).getTime(); // Deribit expires 8:00 UTC
  },

  // Group options by expiry
  groupByExpiry(options) {
    const byExpiry = {};
    for(const opt of options) {
      if(!byExpiry[opt.expStr]) byExpiry[opt.expStr] = {expStr:opt.expStr, expDate:opt.expDate, T:opt.T, calls:[], puts:[]};
      (opt.type==='C' ? byExpiry[opt.expStr].calls : byExpiry[opt.expStr].puts).push(opt);
    }
    return Object.values(byExpiry).sort((a,b)=>a.expDate-b.expDate);
  },

  // Calculate ATM IV for an expiry
  calcATMiv(calls, puts, spot) {
    if(!calls.length || !puts.length) return null;
    // Find nearest strikes
    const allStrikes = [...new Set([...calls.map(c=>c.strike), ...puts.map(p=>p.strike)])].sort((a,b)=>a-b);
    const atm = allStrikes.reduce((prev,curr)=>Math.abs(curr-spot)<Math.abs(prev-spot)?curr:prev, allStrikes[0]);
    
    const call = calls.find(c=>c.strike===atm);
    const put = puts.find(p=>p.strike===atm);
    const ivs = [];
    if(call?.iv) ivs.push(call.iv);
    if(put?.iv) ivs.push(put.iv);
    return ivs.length ? ivs.reduce((a,b)=>a+b,0)/ivs.length : null;
  },

  // Build vol surface data [strike%, DTE, IV]
  buildSurface(expiries, spot) {
    const points = [];
    for(const exp of expiries) {
      const dte = exp.T * 365.25;
      if(dte > 400 || dte < 0.5) continue;
      const allOpts = [...exp.calls, ...exp.puts];
      for(const opt of allOpts) {
        if(!opt.iv || opt.iv > 3 || opt.iv < 0.05) continue;
        const strikePct = (opt.strike/spot-1)*100;
        if(strikePct < -50 || strikePct > 50) continue;
        points.push({x: strikePct, y: dte, z: opt.iv*100, type: opt.type, strike: opt.strike});
      }
    }
    return points;
  },

  // Calculate 25-delta skew
  calc25dSkew(calls, puts, spot, T) {
    if(T<=0) return null;
    // Find 25-delta call and put
    const r = 0;
    const atmIVguess = 0.6;
    const find25d = (opts, targetDelta, type) => {
      let best = null, bestDiff = 999;
      for(const o of opts) {
        if(!o.iv) continue;
        const d = Math.abs(BS.delta(spot, o.strike, T, r, o.iv, type));
        const diff = Math.abs(d - targetDelta);
        if(diff < bestDiff) { bestDiff = diff; best = o; }
      }
      return best;
    };
    const c25 = find25d(calls, 0.25, 'C');
    const p25 = find25d(puts, 0.25, 'P');
    if(!c25?.iv || !p25?.iv) return null;
    return (c25.iv - p25.iv) * 100; // in vol points
  },

  // Calculate risk reversal (25d call - 25d put)
  calcRiskReversal(calls, puts, spot, T) {
    return this.calc25dSkew(calls, puts, spot, T);
  },

  // Expected move
  calcExpectedMove(atmIV, T) {
    if(!atmIV || T<=0) return null;
    const sigma1 = atmIV * Math.sqrt(T);
    return { sigma1, sigma2: 2*sigma1 };
  },

  // Max pain
  calcMaxPain(calls, puts, spot) {
    const strikes = [...new Set([...calls.map(c=>c.strike), ...puts.map(p=>p.strike)])].sort((a,b)=>a-b);
    let minPain = Infinity, maxPainStrike = spot;
    for(const s of strikes) {
      let pain = 0;
      for(const c of calls) if(c.oi) pain += c.oi * Math.max(s - c.strike, 0);
      for(const p of puts) if(p.oi) pain += p.oi * Math.max(p.strike - s, 0);
      if(pain < minPain) { minPain = pain; maxPainStrike = s; }
    }
    return maxPainStrike;
  }
};

// ── Main OVOL Panel Builder ────────────────────────────────────────────────────
window.buildOVOL = function(currency='BTC', tabIndex=0) {
  const tabs = ['OVERVIEW','SURFACE','SKEW','TERM','GREEKS','CHAIN'];
  const tab = tabs[tabIndex] || 'OVERVIEW';
  const uid = 'ovol-' + currency.toLowerCase();
  
  return `
<div id="${uid}-root" style="display:flex;flex-direction:column;height:100%;background:#000;overflow:hidden;font-family:'Courier New',monospace">
  <!-- Header toolbar -->
  <div style="flex-shrink:0;height:28px;background:#0a0800;border-bottom:1px solid #1c1400;display:flex;align-items:center;padding:0 8px;gap:8px">
    <div style="display:flex;gap:1px">
      ${['BTC','ETH','SOL'].map(c=>`
        <button onclick="window._ovolLoad('${c}',document.getElementById('${uid}-root'))" 
          style="background:${c===currency?'#2a1c00':'#0a0800'};border:1px solid ${c===currency?'#F39F41':'#1c1400'};color:${c===currency?'#F39F41':'#555'};
          font-family:'Roboto Mono',monospace;font-size:8px;padding:0 7px;height:18px;cursor:pointer;letter-spacing:.3px">${c}</button>
      `).join('')}
    </div>
    <div style="width:1px;height:14px;background:#1c1400"></div>
    <select id="${uid}-source" onchange="window._ovolLoad('${currency}',document.getElementById('${uid}-root'))"
      style="background:#0a0800;border:1px solid #1c1400;color:#888;font-family:'Roboto Mono',monospace;font-size:8px;padding:0 4px;height:18px;outline:none">
      <option value="deribit">DERIBIT</option>
      <option value="okx">OKX</option>
      <option value="both">DERIBIT+OKX</option>
    </select>
    <div id="${uid}-status" style="font-size:8px;color:#555;letter-spacing:.3px">INITIALIZING...</div>
    <div style="margin-left:auto;display:flex;gap:4px">
      <div id="${uid}-spot" style="font-family:'Roboto Mono',monospace;font-size:9px;color:#F39F41;letter-spacing:.3px">──────</div>
      <button onclick="window._ovolLoad('${currency}',document.getElementById('${uid}-root'))"
        style="background:#0a0800;border:1px solid #1c1400;color:#555;font-family:'Roboto Mono',monospace;font-size:8px;padding:0 6px;height:18px;cursor:pointer">↻ REFRESH</button>
    </div>
  </div>
  
  <!-- Tabs -->
  <div style="flex-shrink:0;height:22px;background:#050400;border-bottom:1px solid #1c1400;display:flex">
    ${tabs.map((t,i)=>`
      <div onclick="window._ovolTab('${currency}','${uid}',${i})" id="${uid}-tab-${i}"
        style="padding:0 10px;height:100%;display:inline-flex;align-items:center;font-size:8px;letter-spacing:.4px;cursor:pointer;border-right:1px solid #1c1400;
        color:${i===tabIndex?'#F39F41':'#444'};background:${i===tabIndex?'#0a0800':'transparent'};border-bottom:${i===tabIndex?'1px solid #F39F41':'none'}">${t}</div>
    `).join('')}
  </div>
  
  <!-- Content -->
  <div id="${uid}-content" style="flex:1;overflow:hidden;position:relative">
    <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#333;font-size:10px;letter-spacing:1px">
      LOADING OPTIONS DATA FROM DERIBIT...
    </div>
  </div>
</div>`;
};

// ── Tab switching ─────────────────────────────────────────────────────────────
window._ovolTab = function(currency, uid, tabIdx) {
  const tabs = ['OVERVIEW','SURFACE','SKEW','TERM','GREEKS','CHAIN'];
  // Update tab UI
  tabs.forEach((_,i)=>{
    const el = document.getElementById(`${uid}-tab-${i}`);
    if(el) {
      el.style.color = i===tabIdx?'#F39F41':'#444';
      el.style.background = i===tabIdx?'#0a0800':'transparent';
      el.style.borderBottom = i===tabIdx?'1px solid #F39F41':'none';
    }
  });
  // Render tab content
  const content = document.getElementById(`${uid}-content`);
  const root = document.getElementById(`${uid}-root`);
  if(!content || !root) return;
  
  const cached = root._ovolData;
  if(!cached) {
    window._ovolLoad(currency, root, tabIdx);
    return;
  }
  content.innerHTML = window._ovolRenderTab(tabs[tabIdx], cached, currency);
  window._ovolInitCharts(tabs[tabIdx], cached, uid);
};

// ── Main data loader ──────────────────────────────────────────────────────────
window._ovolLoad = async function(currency, rootEl, tabIdx=0) {
  if(!rootEl) return;
  const uid = rootEl.id;
  const statusEl = document.getElementById(`${uid}-status`);
  const spotEl = document.getElementById(`${uid}-spot`);
  const contentEl = document.getElementById(`${uid}-content`);
  
  if(statusEl) statusEl.textContent = 'FETCHING...';
  if(contentEl) contentEl.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:12px">
      <div style="color:#F39F41;font-size:9px;letter-spacing:1px">FETCHING OPTIONS DATA</div>
      <div style="color:#333;font-size:8px">DERIBIT API → PARSING → CALCULATING IV...</div>
      <div style="width:200px;height:1px;background:#1c1400;position:relative;overflow:hidden">
        <div style="position:absolute;left:-50%;width:50%;height:100%;background:#F39F41;animation:ovol-load 1s infinite linear"></div>
      </div>
    </div>
    <style>@keyframes ovol-load{from{left:-50%}to{left:100%}}</style>`;

  try {
    // Fetch spot price
    const [spotData, instruments, bookSummary] = await Promise.allSettled([
      DeribitAPI.getIndex(currency),
      DeribitAPI.getInstruments(currency),
      DeribitAPI.getBookSummary(currency)
    ]);

    const spot = spotData.value?.index_price || spotData.value?.settlement_price || 0;
    const instList = instruments.value || [];
    const bookList = bookSummary.value || [];

    if(spotEl) spotEl.textContent = spot ? `${currency} $${Math.round(spot).toLocaleString()}` : '──';

    // Build options map
    const optMap = {};
    for(const b of bookList) {
      optMap[b.instrument_name] = b;
    }

    // Parse instruments
    const parsedOpts = [];
    for(const inst of instList) {
      const parsed = OptionsDataProcessor.parseDeribitInstrument(inst.instrument_name);
      if(!parsed || parsed.T <= 0) continue;
      const book = optMap[inst.instrument_name];
      if(!book) continue;
      
      const mid = book.mid_price || ((book.best_bid_price||0)+(book.best_ask_price||0))/2;
      const markPrice = (book.mark_price||mid||0) * spot;
      
      // Calculate or use provided IV
      let iv = book.mark_iv ? book.mark_iv/100 : null;
      if(!iv && markPrice > 0 && spot > 0 && parsed.T > 0) {
        iv = BS.impliedVol(markPrice, spot, parsed.strike, parsed.T, 0, parsed.type);
      }
      
      parsedOpts.push({
        ...parsed,
        iv,
        mark: markPrice,
        bid: (book.best_bid_price||0)*spot,
        ask: (book.best_ask_price||0)*spot,
        oi: book.open_interest || 0,
        volume: book.volume || 0,
        delta: book.greeks?.delta || (iv ? BS.delta(spot, parsed.strike, parsed.T, 0, iv, parsed.type) : null),
        gamma: book.greeks?.gamma || (iv ? BS.gamma(spot, parsed.strike, parsed.T, 0, iv) : null),
        vega: book.greeks?.vega || (iv ? BS.vega(spot, parsed.strike, parsed.T, 0, iv) : null),
        theta: book.greeks?.theta || (iv ? BS.theta(spot, parsed.strike, parsed.T, 0, iv, parsed.type) : null),
        vanna: iv ? BS.vanna(spot, parsed.strike, parsed.T, 0, iv) * spot : null,
      });
    }

    // Group by expiry
    const expiries = OptionsDataProcessor.groupByExpiry(parsedOpts);
    
    // Build term structure
    const termStructure = expiries.map(exp => {
      const atmIV = OptionsDataProcessor.calcATMiv(exp.calls, exp.puts, spot);
      const skew25d = OptionsDataProcessor.calc25dSkew(exp.calls, exp.puts, spot, exp.T);
      const maxPain = OptionsDataProcessor.calcMaxPain(exp.calls, exp.puts, spot);
      const totalOI = [...exp.calls, ...exp.puts].reduce((s,o)=>s+o.oi, 0);
      const callOI = exp.calls.reduce((s,o)=>s+o.oi, 0);
      const putOI = exp.puts.reduce((s,o)=>s+o.oi, 0);
      return { ...exp, atmIV, skew25d, maxPain, totalOI, callOI, putOI };
    });

    // Build surface points
    const surfacePoints = OptionsDataProcessor.buildSurface(expiries, spot);

    // Front expiry for distribution stats
    const front = termStructure[0];
    const frontIV = front?.atmIV;
    const frontT = front?.T;

    // Calculate distribution stats from front month
    const em = frontIV && frontT ? OptionsDataProcessor.calcExpectedMove(frontIV, frontT) : null;

    // Aggregate OI for all Greeks
    const allOpts = parsedOpts.filter(o=>o.iv);
    const netVanna = allOpts.reduce((s,o)=>s+(o.vanna||0)*o.oi*(o.type==='C'?1:-1),0);
    const netVega = allOpts.reduce((s,o)=>s+(o.vega||0)*o.oi,0);
    
    const data = {
      currency, spot, parsedOpts, expiries, termStructure,
      surfacePoints, netVanna, netVega, frontIV, frontT,
      expectedMove: em,
      fetchTime: new Date(),
      totalContracts: parsedOpts.length,
      totalOI: allOpts.reduce((s,o)=>s+o.oi,0)
    };
    
    // Cache on root element
    rootEl._ovolData = data;
    
    if(statusEl) statusEl.textContent = `LIVE · ${parsedOpts.length} OPTS · ${expiries.length} EXPIRIES`;

    const tabs = ['OVERVIEW','SURFACE','SKEW','TERM','GREEKS','CHAIN'];
    if(contentEl) {
      contentEl.innerHTML = window._ovolRenderTab(tabs[tabIdx], data, currency);
      setTimeout(() => window._ovolInitCharts(tabs[tabIdx], data, uid), 50);
    }
    
  } catch(e) {
    if(statusEl) statusEl.textContent = 'ERROR: ' + e.message;
    if(contentEl) contentEl.innerHTML = `<div style="padding:20px;color:#cc3333;font-size:9px">${e.message}</div>`;
  }
};

// ── Tab Renderers ─────────────────────────────────────────────────────────────
window._ovolRenderTab = function(tab, data, currency) {
  switch(tab) {
    case 'OVERVIEW': return _ovolRenderOverview(data, currency);
    case 'SURFACE':  return _ovolRenderSurface(data, currency);
    case 'SKEW':     return _ovolRenderSkew(data, currency);
    case 'TERM':     return _ovolRenderTerm(data, currency);
    case 'GREEKS':   return _ovolRenderGreeks(data, currency);
    case 'CHAIN':    return _ovolRenderChain(data, currency);
    default:         return _ovolRenderOverview(data, currency);
  }
};

// ── Overview Tab ──────────────────────────────────────────────────────────────
function _ovolRenderOverview(data, currency) {
  const { spot, frontIV, termStructure, expectedMove, frontT, totalOI } = data;
  const front = termStructure[0] || {};
  const back = termStructure.find(e=>e.T>30/365.25) || termStructure[1] || {};
  const skew = front.skew25d;
  const skewColor = skew===null?'#555':skew>0?'#00cc44':'#ff3d3d';
  const skewLabel = skew===null?'N/A':(skew>0?'+':'')+skew?.toFixed(2)+'%';
  
  const maxPainPct = front.maxPain ? ((front.maxPain/spot-1)*100).toFixed(1) : 'N/A';
  const pcRatio = front.callOI&&front.putOI ? (front.putOI/front.callOI).toFixed(2) : 'N/A';
  
  // Build mini vol smile sparkline for front expiry
  const smileData = front.calls?.filter(c=>c.iv).map(c=>({x:c.strike,y:c.iv*100}))
    .concat(front.puts?.filter(p=>p.iv).map(p=>({x:p.strike,y:p.iv*100}))||[])
    .sort((a,b)=>a.x-b.x) || [];

  // Cards row
  const cards = [
    {label:'SPOT', value:`$${Math.round(spot).toLocaleString()}`, sub:'', color:'#F39F41'},
    {label:'ATM IV (FRONT)', value: frontIV ? `${(frontIV*100).toFixed(1)}%` : 'N/A', sub:front.expStr||'', color:'#00ccff'},
    {label:'25Δ SKEW', value: skewLabel, sub:'call - put', color: skewColor},
    {label:'P/C RATIO', value: pcRatio, sub:`C:${Math.round(front.callOI||0)} P:${Math.round(front.putOI||0)}`, color: parseFloat(pcRatio)>1?'#ff3d3d':'#00cc44'},
    {label:'MAX PAIN', value: front.maxPain ? `$${Math.round(front.maxPain).toLocaleString()}` : 'N/A', sub: `${maxPainPct}% from spot`, color:'#ff8800'},
    {label:'1σ MOVE', value: expectedMove ? `±${(expectedMove.sigma1*100).toFixed(1)}%` : 'N/A', sub: `2σ: ±${expectedMove?(expectedMove.sigma2*100).toFixed(1):0}%`, color:'#cc88ff'},
    {label:'TOTAL OI', value: totalOI>1000?`${(totalOI/1000).toFixed(1)}K`:`${totalOI}`, sub:'all expiries', color:'#F39F41'},
    {label:'EXPIRIES', value: termStructure.length, sub:'active options', color:'#888'},
  ];

  return `
<div style="display:flex;flex-direction:column;height:100%;overflow-y:auto;padding:8px;gap:8px;scrollbar-width:thin;scrollbar-color:#1c1400 #000">
  <!-- Stats cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
    ${cards.map(c=>`
      <div style="background:#050400;border:1px solid #1c1400;padding:7px 9px">
        <div style="font-size:7.5px;color:#444;letter-spacing:.5px;margin-bottom:3px">${c.label}</div>
        <div style="font-size:14px;font-family:'Roboto Mono',monospace;color:${c.color};letter-spacing:-.3px">${c.value}</div>
        <div style="font-size:7.5px;color:#333;margin-top:2px">${c.sub}</div>
      </div>
    `).join('')}
  </div>
  
  <!-- Term structure summary table -->
  <div style="background:#050400;border:1px solid #1c1400">
    <div style="padding:5px 9px;border-bottom:1px solid #1c1400;font-size:8px;color:#F39F41;letter-spacing:.5px">TERM STRUCTURE OVERVIEW</div>
    <table style="width:100%;border-collapse:collapse;font-size:8px;font-family:'Roboto Mono',monospace">
      <thead>
        <tr style="border-bottom:1px solid #0a0800">
          ${['EXPIRY','DTE','ATM IV','25Δ SKEW','MAX PAIN','C OI','P OI','P/C'].map(h=>
            `<th style="padding:4px 8px;text-align:right;color:#444;font-weight:normal;letter-spacing:.3px">${h}</th>`
          ).join('')}
        </tr>
      </thead>
      <tbody>
        ${termStructure.slice(0,12).map((exp,i)=>{
          const dte = Math.round(exp.T*365.25);
          const iv = exp.atmIV ? `${(exp.atmIV*100).toFixed(1)}%` : '—';
          const sk = exp.skew25d !== null ? (exp.skew25d>0?'+':'')+exp.skew25d?.toFixed(2)+'%' : '—';
          const skColor = !exp.skew25d?'#555':exp.skew25d>0?'#00cc44':'#ff3d3d';
          const mp = exp.maxPain ? `$${Math.round(exp.maxPain/1000)}K` : '—';
          const pc = exp.callOI&&exp.putOI ? (exp.putOI/exp.callOI).toFixed(2) : '—';
          return `<tr style="border-bottom:1px solid #0a0800;${i===0?'background:#0a0800':''}">
            <td style="padding:4px 8px;color:#F39F41">${exp.expStr}</td>
            <td style="padding:4px 8px;text-align:right;color:#666">${dte}d</td>
            <td style="padding:4px 8px;text-align:right;color:#00ccff">${iv}</td>
            <td style="padding:4px 8px;text-align:right;color:${skColor}">${sk}</td>
            <td style="padding:4px 8px;text-align:right;color:#ff8800">${mp}</td>
            <td style="padding:4px 8px;text-align:right;color:#00cc44">${exp.callOI>1000?(exp.callOI/1000).toFixed(1)+'K':exp.callOI||0}</td>
            <td style="padding:4px 8px;text-align:right;color:#ff3d3d">${exp.putOI>1000?(exp.putOI/1000).toFixed(1)+'K':exp.putOI||0}</td>
            <td style="padding:4px 8px;text-align:right;color:${parseFloat(pc)>1?'#ff3d3d':'#00cc44'}">${pc}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
  
  <!-- Vol smile mini chart + Expected move -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
    <div style="background:#050400;border:1px solid #1c1400;padding:8px">
      <div style="font-size:8px;color:#F39F41;letter-spacing:.5px;margin-bottom:6px">FRONT MONTH VOL SMILE (${front.expStr||'N/A'})</div>
      <canvas id="ovol-smile-mini" width="260" height="120" style="width:100%;height:120px"></canvas>
    </div>
    <div style="background:#050400;border:1px solid #1c1400;padding:8px">
      <div style="font-size:8px;color:#F39F41;letter-spacing:.5px;margin-bottom:6px">EXPECTED MOVE CONE</div>
      <canvas id="ovol-emove-mini" width="260" height="120" style="width:100%;height:120px"></canvas>
    </div>
  </div>
</div>`;
}

// ── Surface Tab (Vol Surface 3D via CSS/Canvas) ────────────────────────────────
function _ovolRenderSurface(data, currency) {
  return `
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:8px;gap:6px">
  <div style="display:flex;gap:6px;flex-shrink:0">
    <div style="font-size:8px;color:#555;letter-spacing:.3px">
      ${data.surfacePoints.length} points · strike vs DTE vs IV
    </div>
    <div style="margin-left:auto;display:flex;gap:8px">
      <label style="font-size:8px;color:#444;cursor:pointer">
        <input type="checkbox" id="ovol-surf-calls" checked style="margin-right:3px">CALLS</label>
      <label style="font-size:8px;color:#444;cursor:pointer">
        <input type="checkbox" id="ovol-surf-puts" checked style="margin-right:3px">PUTS</label>
    </div>
  </div>
  <canvas id="ovol-surface-canvas" style="flex:1;width:100%;min-height:0;background:#020100;border:1px solid #0a0800"></canvas>
  <div style="flex-shrink:0;font-size:7.5px;color:#333;text-align:center">
    Strike % from Spot → horizontal · Days to Expiry → depth · IV% → height/color
  </div>
</div>`;
}

// ── Skew Tab ──────────────────────────────────────────────────────────────────
function _ovolRenderSkew(data, currency) {
  return `
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:8px;gap:6px">
  <div style="flex-shrink:0;font-size:8px;color:#F39F41;letter-spacing:.5px">25Δ SKEW CURVE — ${currency} · ALL EXPIRIES</div>
  <canvas id="ovol-skew-canvas" style="flex:1;width:100%;min-height:0;background:#020100;border:1px solid #0a0800"></canvas>
  <div style="flex-shrink:0;display:grid;grid-template-columns:repeat(${Math.min(data.termStructure.length,8)},1fr);gap:2px">
    ${data.termStructure.slice(0,8).map(exp=>{
      const sk = exp.skew25d;
      const col = sk===null?'#333':sk>0?'#00cc44':'#ff3d3d';
      return `<div style="background:#050400;border:1px solid #0a0800;padding:4px;text-align:center">
        <div style="font-size:7px;color:#444">${exp.expStr}</div>
        <div style="font-size:9px;font-family:'Roboto Mono',monospace;color:${col}">${sk===null?'—':(sk>0?'+':'')+sk.toFixed(2)+'%'}</div>
      </div>`;
    }).join('')}
  </div>
</div>`;
}

// ── Term Structure Tab ─────────────────────────────────────────────────────────
function _ovolRenderTerm(data, currency) {
  return `
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:8px;gap:6px">
  <div style="flex-shrink:0;font-size:8px;color:#F39F41;letter-spacing:.5px">IV TERM STRUCTURE — ${currency} · ATM IV by Expiry</div>
  <canvas id="ovol-term-canvas" style="flex:2;width:100%;min-height:0;background:#020100;border:1px solid #0a0800"></canvas>
  <div style="flex-shrink:0;font-size:8px;color:#F39F41;letter-spacing:.5px">OI BY EXPIRY</div>
  <canvas id="ovol-oi-canvas" style="flex:1;width:100%;min-height:0;background:#020100;border:1px solid #0a0800"></canvas>
</div>`;
}

// ── Greeks Tab ────────────────────────────────────────────────────────────────
function _ovolRenderGreeks(data, currency) {
  return `
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:8px;gap:6px">
  <div style="flex-shrink:0;font-size:8px;color:#F39F41;letter-spacing:.5px">NET GREEKS EXPOSURE — ${currency} · All Expiries Aggregated</div>
  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4px;min-height:0">
    <div style="background:#020100;border:1px solid #0a0800;overflow:hidden">
      <div style="font-size:7.5px;color:#555;padding:4px 6px;border-bottom:1px solid #0a0800">NET GAMMA by Strike</div>
      <canvas id="ovol-gamma-canvas" style="width:100%;height:calc(100% - 22px)"></canvas>
    </div>
    <div style="background:#020100;border:1px solid #0a0800;overflow:hidden">
      <div style="font-size:7.5px;color:#555;padding:4px 6px;border-bottom:1px solid #0a0800">NET VEGA by Strike</div>
      <canvas id="ovol-vega-canvas" style="width:100%;height:calc(100% - 22px)"></canvas>
    </div>
    <div style="background:#020100;border:1px solid #0a0800;overflow:hidden">
      <div style="font-size:7.5px;color:#555;padding:4px 6px;border-bottom:1px solid #0a0800">NET VANNA by Strike</div>
      <canvas id="ovol-vanna-canvas" style="width:100%;height:calc(100% - 22px)"></canvas>
    </div>
    <div style="background:#020100;border:1px solid #0a0800;overflow:hidden">
      <div style="font-size:7.5px;color:#555;padding:4px 6px;border-bottom:1px solid #0a0800">NET DELTA by Strike</div>
      <canvas id="ovol-delta-canvas" style="width:100%;height:calc(100% - 22px)"></canvas>
    </div>
  </div>
</div>`;
}

// ── Chain Tab ─────────────────────────────────────────────────────────────────
function _ovolRenderChain(data, currency) {
  const front = data.expiries[0];
  if(!front) return '<div style="padding:20px;color:#333;font-size:9px">No expiry data</div>';
  
  const strikes = [...new Set([...front.calls.map(c=>c.strike), ...front.puts.map(p=>p.strike)])].sort((a,b)=>a-b);
  const spotIdx = strikes.findIndex(s=>s>=data.spot);
  const visStrikes = strikes.slice(Math.max(0,spotIdx-12), spotIdx+12);
  
  return `
<div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
  <div style="flex-shrink:0;height:22px;background:#050400;border-bottom:1px solid #0a0800;display:flex;align-items:center;padding:0 8px;gap:8px">
    <span style="font-size:8px;color:#F39F41">OPTIONS CHAIN · ${front.expStr}</span>
    <span style="font-size:7.5px;color:#444">SPOT: $${Math.round(data.spot).toLocaleString()}</span>
  </div>
  <div style="flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1c1400 #000">
    <table style="width:100%;border-collapse:collapse;font-size:8px;font-family:'Roboto Mono',monospace">
      <thead style="position:sticky;top:0;background:#050400;z-index:1">
        <tr>
          ${['OI','VOL','DELTA','IV','BID','ASK','|STRIKE|','BID','ASK','IV','DELTA','VOL','OI'].map((h,i)=>`
            <th style="padding:4px 5px;text-align:${i<6?'right':i===6?'center':'left'};color:${i===6?'#F39F41':'#444'};font-weight:normal;letter-spacing:.3px;border-bottom:1px solid #0a0800;${i<6?'background:#020800':'background:#080200'};white-space:nowrap;font-size:7.5px">${h}</th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        ${visStrikes.map(strike=>{
          const isATM = Math.abs(strike - data.spot) < (data.spot*0.005);
          const call = front.calls.find(c=>c.strike===strike);
          const put = front.puts.find(p=>p.strike===strike);
          const fmt = (v,dec=2)=>v!=null?v.toFixed(dec):'—';
          const fmtK = v => v>=1000?`$${(v/1000).toFixed(0)}K`:`$${v}`;
          return `<tr style="border-bottom:1px solid #050400;${isATM?'background:#0a0800;':''}">
            <td style="padding:3px 5px;text-align:right;color:#00cc44;background:#020800">${call?.oi>1000?(call.oi/1000).toFixed(1)+'K':call?.oi||'—'}</td>
            <td style="padding:3px 5px;text-align:right;color:#00cc44;background:#020800">${call?.volume>100?(call.volume/1000).toFixed(1)+'K':fmt(call?.volume,0)}</td>
            <td style="padding:3px 5px;text-align:right;color:#00cc44;background:#020800">${fmt(call?.delta)}</td>
            <td style="padding:3px 5px;text-align:right;color:#00ccff;background:#020800">${call?.iv?`${(call.iv*100).toFixed(1)}%`:'—'}</td>
            <td style="padding:3px 5px;text-align:right;color:#888;background:#020800">${call?.bid?`$${call.bid.toFixed(0)}`:'—'}</td>
            <td style="padding:3px 5px;text-align:right;color:#888;background:#020800">${call?.ask?`$${call.ask.toFixed(0)}`:'—'}</td>
            <td style="padding:3px 6px;text-align:center;color:${isATM?'#ff8800':'#F39F41'};font-weight:${isATM?700:400};border-left:1px solid #1c1400;border-right:1px solid #1c1400">${fmtK(strike)}</td>
            <td style="padding:3px 5px;text-align:left;color:#888;background:#080200">${put?.bid?`$${put.bid.toFixed(0)}`:'—'}</td>
            <td style="padding:3px 5px;text-align:left;color:#888;background:#080200">${put?.ask?`$${put.ask.toFixed(0)}`:'—'}</td>
            <td style="padding:3px 5px;text-align:left;color:#00ccff;background:#080200">${put?.iv?`${(put.iv*100).toFixed(1)}%`:'—'}</td>
            <td style="padding:3px 5px;text-align:left;color:#ff3d3d;background:#080200">${fmt(put?.delta)}</td>
            <td style="padding:3px 5px;text-align:left;color:#ff3d3d;background:#080200">${put?.volume>100?(put.volume/1000).toFixed(1)+'K':fmt(put?.volume,0)}</td>
            <td style="padding:3px 5px;text-align:left;color:#ff3d3d;background:#080200">${put?.oi>1000?(put.oi/1000).toFixed(1)+'K':put?.oi||'—'}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

// ── Chart Initializers ────────────────────────────────────────────────────────
window._ovolInitCharts = function(tab, data, uid) {
  try {
    switch(tab) {
      case 'OVERVIEW': _ovolDrawSmileMini(data); _ovolDrawEmoveMini(data); break;
      case 'SURFACE':  _ovolDrawSurface(data); break;
      case 'SKEW':     _ovolDrawSkew(data); break;
      case 'TERM':     _ovolDrawTerm(data); _ovolDrawOIBar(data); break;
      case 'GREEKS':   _ovolDrawGreeks(data); break;
    }
  } catch(e) { console.warn('[OVOL] Chart error:', e); }
};

// Helper: draw line chart on canvas
function _drawLineChart(canvasId, series, opts={}) {
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || canvas.width;
  const H = canvas.offsetHeight || canvas.height;
  canvas.width = W * (window.devicePixelRatio||1);
  canvas.height = H * (window.devicePixelRatio||1);
  ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  
  ctx.fillStyle = '#020100';
  ctx.fillRect(0,0,W,H);
  
  if(!series || !series.length) return;
  
  const pad = opts.pad || {l:40,r:10,t:10,b:25};
  const allX = series.flatMap(s=>s.points.map(p=>p.x));
  const allY = series.flatMap(s=>s.points.map(p=>p.y));
  const xMin = opts.xMin ?? Math.min(...allX);
  const xMax = opts.xMax ?? Math.max(...allX);
  const yMin = opts.yMin ?? Math.min(...allY)*0.95;
  const yMax = opts.yMax ?? Math.max(...allY)*1.05;
  
  const toX = v => pad.l + (v-xMin)/(xMax-xMin||1) * (W-pad.l-pad.r);
  const toY = v => H-pad.b - (v-yMin)/(yMax-yMin||1) * (H-pad.t-pad.b);
  
  // Grid
  ctx.strokeStyle = '#0a0800'; ctx.lineWidth = 0.5;
  for(let i=0;i<=4;i++) {
    const y = pad.t + i*(H-pad.t-pad.b)/4;
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
    const val = yMax - i*(yMax-yMin)/4;
    ctx.fillStyle = '#333'; ctx.font = '7px Roboto Mono,monospace';
    ctx.textAlign='right'; ctx.fillText(val.toFixed(opts.yDec||1), pad.l-2, y+3);
  }
  
  // X axis labels
  ctx.fillStyle = '#333'; ctx.font = '7px Roboto Mono,monospace'; ctx.textAlign='center';
  for(let i=0;i<=5;i++) {
    const x = xMin + i*(xMax-xMin)/5;
    const px = toX(x);
    ctx.fillText(opts.xFmt ? opts.xFmt(x) : x.toFixed(opts.xDec||0), px, H-6);
  }
  
  // Spot line
  if(opts.spot) {
    const sx = toX(opts.spot);
    ctx.strokeStyle = '#F39F41'; ctx.lineWidth = 0.7; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(sx,pad.t); ctx.lineTo(sx,H-pad.b); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#F39F41'; ctx.textAlign='center'; ctx.font='7px Roboto Mono,monospace';
    ctx.fillText('Spot', sx, pad.t-2);
  }
  
  // Zero line
  if(opts.zeroLine && yMin<=0 && yMax>=0) {
    const zy = toY(0);
    ctx.strokeStyle = '#1c1400'; ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(pad.l,zy); ctx.lineTo(W-pad.r,zy); ctx.stroke();
  }
  
  // Series
  for(const s of series) {
    if(!s.points.length) continue;
    ctx.strokeStyle = s.color || '#F39F41'; ctx.lineWidth = s.width||1.5;
    ctx.setLineDash(s.dash||[]);
    ctx.beginPath();
    s.points.forEach((p,i)=>{
      const px=toX(p.x), py=toY(p.y);
      if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    // Dots
    if(s.dots) {
      ctx.fillStyle = s.color||'#F39F41';
      for(const p of s.points) {
        ctx.beginPath(); ctx.arc(toX(p.x),toY(p.y),2,0,Math.PI*2); ctx.fill();
      }
    }
  }
  
  if(opts.title) {
    ctx.fillStyle = '#555'; ctx.font = '8px Courier New,monospace'; ctx.textAlign='left';
    ctx.fillText(opts.title, pad.l+2, 14);
  }
}

// ── Mini Vol Smile ────────────────────────────────────────────────────────────
function _ovolDrawSmileMini(data) {
  const front = data.expiries[0];
  if(!front) return;
  
  const callPts = front.calls.filter(c=>c.iv&&c.strike>data.spot*0.7&&c.strike<data.spot*1.3)
    .map(c=>({x:(c.strike/data.spot-1)*100, y:c.iv*100}));
  const putPts = front.puts.filter(p=>p.iv&&p.strike>data.spot*0.7&&p.strike<data.spot*1.3)
    .map(p=>({x:(p.strike/data.spot-1)*100, y:p.iv*100}));
  
  _drawLineChart('ovol-smile-mini', [
    {points: putPts.sort((a,b)=>a.x-b.x), color:'#ff3d3d', width:1.5},
    {points: callPts.sort((a,b)=>a.x-b.x), color:'#00cc44', width:1.5}
  ], {
    spot: 0, pad:{l:30,r:5,t:12,b:18},
    xFmt: v=>`${v>0?'+':''}${v.toFixed(0)}%`,
    yFmt: v=>`${v.toFixed(0)}%`, yDec:0, title:'IV Smile'
  });
}

// ── Expected Move Mini ────────────────────────────────────────────────────────
function _ovolDrawEmoveMini(data) {
  const { spot, expectedMove, frontT } = data;
  if(!expectedMove || !spot) return;
  
  const canvas = document.getElementById('ovol-emove-mini');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth||260, H = canvas.offsetHeight||120;
  canvas.width=W*(window.devicePixelRatio||1); canvas.height=H*(window.devicePixelRatio||1);
  ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  ctx.fillStyle='#020100'; ctx.fillRect(0,0,W,H);
  
  const pad={l:50,r:10,t:10,b:20};
  const s1 = expectedMove.sigma1;
  const priceMin = spot*(1-s1*2.5);
  const priceMax = spot*(1+s1*2.5);
  const toY = p => pad.t + (priceMax-p)/(priceMax-priceMin)*(H-pad.t-pad.b);
  const cx = W/2;
  
  // Grid lines
  ctx.strokeStyle='#0a0800'; ctx.lineWidth=0.5;
  [priceMin, spot*(1-s1), spot, spot*(1+s1), priceMax].forEach(p=>{
    const y=toY(p);
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
    ctx.fillStyle='#333'; ctx.font='7px Roboto Mono'; ctx.textAlign='right';
    ctx.fillText('$'+Math.round(p/1000)+'K', pad.l-2, y+3);
  });
  
  // Cone
  const nowX=pad.l+20, expX=W-pad.r-10;
  const spotY=toY(spot);
  ctx.strokeStyle='#F39F41'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(nowX,spotY); ctx.lineTo(expX,toY(spot*(1+s1))); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(nowX,spotY); ctx.lineTo(expX,toY(spot*(1-s1))); ctx.stroke();
  ctx.strokeStyle='rgba(100,0,255,.4)'; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(nowX,spotY); ctx.lineTo(expX,toY(spot*(1+s1*2))); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(nowX,spotY); ctx.lineTo(expX,toY(spot*(1-s1*2))); ctx.stroke();
  ctx.setLineDash([]);
  
  // Fill cone
  ctx.fillStyle='rgba(243,159,65,.04)';
  ctx.beginPath(); ctx.moveTo(nowX,spotY);
  ctx.lineTo(expX,toY(spot*(1+s1))); ctx.lineTo(expX,toY(spot*(1-s1)));
  ctx.closePath(); ctx.fill();
  
  // Spot dot
  ctx.fillStyle='#F39F41'; ctx.beginPath(); ctx.arc(nowX,spotY,3,0,Math.PI*2); ctx.fill();
  
  // Labels
  ctx.fillStyle='#888'; ctx.font='7px Roboto Mono'; ctx.textAlign='left';
  ctx.fillText(`+1σ $${Math.round(spot*(1+s1)/1000)}K`, expX+2, toY(spot*(1+s1))+3);
  ctx.fillText(`-1σ $${Math.round(spot*(1-s1)/1000)}K`, expX+2, toY(spot*(1-s1))+3);
  
  ctx.fillStyle='#555'; ctx.textAlign='center';
  ctx.fillText('Now', nowX, H-4);
  ctx.fillText('Expiry', expX, H-4);
}

// ── Vol Surface (pseudo-3D isometric) ─────────────────────────────────────────
function _ovolDrawSurface(data) {
  const canvas = document.getElementById('ovol-surface-canvas');
  if(!canvas || !data.surfacePoints.length) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth||500, H = canvas.offsetHeight||300;
  canvas.width=W*(window.devicePixelRatio||1); canvas.height=H*(window.devicePixelRatio||1);
  ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  ctx.fillStyle='#020100'; ctx.fillRect(0,0,W,H);
  
  const pts = data.surfacePoints.filter(p=>p.y>=0&&p.y<=365&&Math.abs(p.x)<=40);
  if(!pts.length) return;
  
  // Sort by DTE descending for painter's algorithm
  pts.sort((a,b)=>b.y-a.y||(a.x-b.x));
  
  const xMin=-40, xMax=40, yMin=0, yMax=180, zMin=20, zMax=120;
  
  // Isometric projection
  const isoAngleX = 0.3, isoAngleY = 0.6;
  const scale=4;
  const offX=W*0.5, offY=H*0.7;
  
  const project = (strikePct, dte, iv) => {
    const nx=(strikePct-xMin)/(xMax-xMin);
    const ny=(dte-yMin)/(yMax-yMin);
    const nz=(iv-zMin)/(zMax-zMin);
    const sx=nx*scale*50;
    const sy=ny*scale*50;
    const sz=nz*scale*30;
    return {
      px: offX + sx - sy,
      py: offY - sz + sx*isoAngleX + sy*isoAngleY
    };
  };
  
  // Color by IV
  const ivColor = (iv) => {
    const t = Math.max(0,Math.min(1,(iv-zMin)/(zMax-zMin)));
    const r=Math.round(20+t*235), g=Math.round(80-t*20), b=Math.round(200-t*200);
    return `rgba(${r},${g},${b},0.8)`;
  };
  
  // Draw surface points as small quads
  const ptSize = Math.max(2, Math.min(6, 300/pts.length));
  for(const pt of pts) {
    const {px,py} = project(pt.x, pt.y, pt.z);
    if(px<0||px>W||py<0||py>H) continue;
    ctx.fillStyle = ivColor(pt.z);
    ctx.fillRect(px-ptSize/2, py-ptSize/2, ptSize, ptSize);
  }
  
  // Axes labels
  ctx.fillStyle='#555'; ctx.font='8px Roboto Mono'; ctx.textAlign='center';
  ctx.fillText('Strike % from Spot', offX, H-5);
  
  // IV scale
  for(let iv=30;iv<=100;iv+=10) {
    const {px,py}=project(-40,0,iv);
    ctx.fillStyle='#333'; ctx.textAlign='right'; ctx.font='7px Roboto Mono';
    ctx.fillText(`${iv}%`, px-2, py+3);
  }
  
  // Spot line
  const {px:sx0,py:sy0}=project(0,0,zMin);
  const {px:sx1,py:sy1}=project(0,yMax,zMin);
  ctx.strokeStyle='#F39F41'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(sx0,sy0); ctx.lineTo(sx1,sy1); ctx.stroke();
  ctx.setLineDash([]);
}

// ── Skew Curve Chart ──────────────────────────────────────────────────────────
function _ovolDrawSkew(data) {
  const pts = data.termStructure.filter(e=>e.skew25d!==null&&e.T>0&&e.T<1.5)
    .map(e=>({x:e.T*365.25, y:e.skew25d}));
  
  _drawLineChart('ovol-skew-canvas', [
    {points:pts, color:'#00ccff', width:2, dots:true}
  ], {
    zeroLine:true, xFmt:v=>`${Math.round(v)}d`, yFmt:v=>`${v.toFixed(1)}%`,
    yDec:1, pad:{l:40,r:10,t:15,b:25},
    title:'25Δ Risk Reversal (Call IV - Put IV)'
  });
}

// ── Term Structure Chart ──────────────────────────────────────────────────────
function _ovolDrawTerm(data) {
  const pts = data.termStructure.filter(e=>e.atmIV&&e.T>0&&e.T<1.5)
    .map(e=>({x:e.T*365.25, y:e.atmIV*100}));
  
  _drawLineChart('ovol-term-canvas', [
    {points:pts, color:'#00ccff', width:2, dots:true}
  ], {
    xFmt:v=>`${Math.round(v)}d`, yDec:1,
    pad:{l:35,r:10,t:12,b:22},
    title:'ATM Implied Volatility Term Structure'
  });
}

// ── OI Bar Chart ──────────────────────────────────────────────────────────────
function _ovolDrawOIBar(data) {
  const canvas = document.getElementById('ovol-oi-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=canvas.offsetWidth||400, H=canvas.offsetHeight||100;
  canvas.width=W*(window.devicePixelRatio||1); canvas.height=H*(window.devicePixelRatio||1);
  ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  ctx.fillStyle='#020100'; ctx.fillRect(0,0,W,H);
  
  const exps = data.termStructure.filter(e=>e.totalOI>0).slice(0,12);
  if(!exps.length) return;
  
  const maxOI = Math.max(...exps.map(e=>Math.max(e.callOI,e.putOI)));
  const barW = (W-60) / (exps.length*2+exps.length-1);
  const maxH = H-30;
  const toH = v => v/maxOI*maxH;
  
  exps.forEach((exp,i) => {
    const x = 30 + i*(barW*2+2);
    const cH=toH(exp.callOI), pH=toH(exp.putOI);
    ctx.fillStyle='#00cc44'; ctx.fillRect(x, H-20-cH, barW, cH);
    ctx.fillStyle='#ff3d3d'; ctx.fillRect(x+barW+1, H-20-pH, barW, pH);
    ctx.fillStyle='#333'; ctx.font='6px Roboto Mono'; ctx.textAlign='center';
    ctx.fillText(exp.expStr, x+barW, H-4);
  });
}

// ── Greeks Charts ─────────────────────────────────────────────────────────────
function _ovolDrawGreeks(data) {
  const { spot, parsedOpts } = data;
  if(!parsedOpts.length) return;
  
  // Aggregate by strike
  const strikeMap = {};
  for(const o of parsedOpts) {
    if(!o.iv) continue;
    const s = o.strike;
    if(!strikeMap[s]) strikeMap[s] = {gamma:0, vega:0, vanna:0, delta:0, count:0};
    const sign = o.type==='C'?1:-1;
    const oi = o.oi||1;
    strikeMap[s].gamma += (o.gamma||0)*oi;
    strikeMap[s].vega += (o.vega||0)*oi;
    strikeMap[s].vanna += (o.vanna||0)*oi*sign;
    strikeMap[s].delta += (o.delta||0)*oi;
  }
  
  const strikes = Object.keys(strikeMap).map(Number).sort((a,b)=>a-b)
    .filter(s=>s>spot*0.6&&s<spot*1.4);
  
  const mk = (key, col) => ({
    points: strikes.map(s=>({x:s/spot-1, y:strikeMap[s][key]})),
    color: col, width:1
  });
  
  const opts2 = {spot:0, xFmt:v=>`${(v*100).toFixed(0)}%`, zeroLine:true, yDec:2, pad:{l:40,r:5,t:8,b:18}};
  
  _drawLineChart('ovol-gamma-canvas', [mk('gamma','#00ccff')], {...opts2, title:'Gamma'});
  _drawLineChart('ovol-vega-canvas', [mk('vega','#cc88ff')], {...opts2, title:'Vega'});
  _drawLineChart('ovol-vanna-canvas', [mk('vanna','#ff8800')], {...opts2, title:'Vanna', zeroLine:true});
  _drawLineChart('ovol-delta-canvas', [mk('delta','#00cc44')], {...opts2, title:'Delta', zeroLine:true});
}

// ── Register panel in terminal ─────────────────────────────────────────────────
// Add to buildPanelContent switch
if(typeof buildPanelContent === 'function') {
  const _origBuildPanel = buildPanelContent;
  window.buildPanelContent = function(fn) {
    if(fn==='OVOL') return buildOVOL('BTC', 0);
    if(fn==='OVOL-ETH') return buildOVOL('ETH', 0);
    return _origBuildPanel(fn);
  };
}

// ── Register panel names ───────────────────────────────────────────────────────
if(typeof openPanel === 'function') {
  const _origOpen = openPanel;
  window.openPanel = function(fn, posX, posY) {
    if(fn==='OVOL'||fn==='OVOL-ETH') {
      // Custom wide panel for options
      const div = document.createElement('div');
      div.className='panel'; div.id='pnl-ovol-'+(Date.now()%10000);
      div.style.cssText=`left:${posX||80}px;top:${posY||40}px;width:1100px;height:720px;z-index:${(window.zTop=window.zTop||1000)+1}`;
      div.innerHTML=`
        <div class="panel-hd" onmousedown="startDrag(event,'${div.id}')">
          <div class="panel-tag">${fn}</div>
          <span class="panel-live"></span>
          <div class="panel-btns" style="display:flex;align-items:center;gap:5px;padding:0 6px">
            <span onclick="closePanel('${div.id}')" style="cursor:pointer;color:#555;font-size:10px;padding:2px 4px">✕</span>
          </div>
        </div>
        <div class="panel-body" style="height:calc(100% - 22px)">
          ${buildOVOL(fn==='OVOL'?'BTC':'ETH', 0)}
        </div>`;
      document.getElementById('map-overlay')?.appendChild(div);
      if(window.PANEL_REGISTRY) window.PANEL_REGISTRY[div.id]={fn,minimized:false,maximized:false};
      // Auto-load data
      setTimeout(()=>{
        const root=document.getElementById(`ovol-${fn==='OVOL'?'btc':'eth'}-root`);
        if(root) window._ovolLoad(fn==='OVOL'?'BTC':'ETH', root, 0);
      }, 100);
      return;
    }
    return _origOpen(fn, posX, posY);
  };
}

console.log('[OVOL] Options Analytics Module loaded. Use openPanel("OVOL") to open.');
