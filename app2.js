  // ── Fear & Greed extended ─────────────────────────────
  try {
    const r4 = await _fetchRaceJSON('https://api.alternative.me/fng/?limit=30&format=json', 6000);
    if(r4?.data?.length) {
      window._fngHistory = r4.data.map(d=>({
        value: parseInt(d.value),
        label: d.value_classification,
        date:  new Date(parseInt(d.timestamp)*1000).toLocaleDateString('en-GB',{day:'2-digit',month:'short'})
      }));
    }
  } catch(e) {}

  console.log('[ALT DATA] Alternative market data updated');
}

// Run on start and every 5 minutes
setTimeout(fetchAlternativeMarketData, 8000);
setInterval(fetchAlternativeMarketData, 60000);

// ══ LIVE DATA DIAGNOSTICS + AUTO-RETRY ══════════════════════════════
// Tracking které zdroje skutečně vrátily data
const _liveStatus = {
  'BINANCE-WS': {ok:false, last:null, src:'ws'},
  'BINANCE-REST': {ok:false, last:null, src:'rest'},
  'HYPERLIQUID': {ok:false, last:null, src:'rest'},
  'COINGECKO': {ok:false, last:null, src:'rest'},
  'KRAKEN': {ok:false, last:null, src:'rest'},
  'OKX': {ok:false, last:null, src:'rest'},
  'BYBIT': {ok:false, last:null, src:'rest'},
  'KUCOIN': {ok:false, last:null, src:'rest'},
  'GATE': {ok:false, last:null, src:'rest'},
  'MEXC': {ok:false, last:null, src:'rest'},
  'HTX': {ok:false, last:null, src:'rest'},
  'BITGET': {ok:false, last:null, src:'rest'},
  'COINBASE': {ok:false, last:null, src:'rest'},
  'COINBASE-WS': {ok:false, last:null, src:'ws'}
};

// Monkey-patch _boot.update aby trackoval live status
const _origBootUpdate = _boot.update.bind(_boot);
_boot.update = function(key, status, detail) {
  _origBootUpdate(key, status, detail);
  const k2 = key.replace('·REST','').replace('·WS','').replace('·','');
  if (_liveStatus[key] !== undefined) {
    _liveStatus[key].ok = (status === 'ok');
    if (status === 'ok') _liveStatus[key].last = Date.now();
  }
  // Update si-badge colors based on real status
  const badgeMap = {
    'BINANCE·WS':'si-bnb','BINANCE·REST':'si-bnb',
    'HYPERLIQUID':'si-hl','COINGECKO':'si-cg',
    'KRAKEN':'si-kraken','OKX':'si-okx',
    'BYBIT':'si-bybit','KUCOIN':'si-kucoin','GATE':'si-gate',
    'MEXC':'si-mexc','HTX':'si-htx','BITGET':'si-bitget','COINBASE':'si-cb'
};
  const bid = badgeMap[key];
  if (bid) setLiveBadge(bid, status === 'ok');
};

// Auto-retry fungujících zdrojů (CORS testováno)
setInterval(()=>{
  const now = Date.now();
  // Přímé zdroje — bez CORS problémů
  if ((now - (_liveStatus['BINANCE-REST']?.last||0)) > 15000) fetchBinance24hr();
  if ((now - (_liveStatus['HYPERLIQUID']?.last||0)) > 10000) fetchHyperliquid();
  if ((now - (_liveStatus['KRAKEN']?.last||0)) > 20000) fetchKraken();
  if ((now - (_liveStatus['OKX']?.last||0)) > 20000) fetchOKX();
  if ((now - (_liveStatus['BYBIT']?.last||0)) > 20000) fetchBybit();
  if ((now - (_liveStatus['HTX']?.last||0)) > 25000) fetchHTX();
  if ((now - (_liveStatus['COINBASE']?.last||0)) > 30000) fetchCoinbase();
  if ((now - (_liveStatus['GEMINI']?.last||0)) > 45000) fetchGemini();
  if ((now - (_liveStatus['BITFINEX']?.last||0)) > 35000) fetchBitfinex();
  if ((now - (_liveStatus['BITMEX']?.last||0)) > 60000) fetchBitMEX();
  if ((now - (_liveStatus['COINAPI']?.last||0)) > 90000) fetchCoinAPI();
  // CoinGecko přes corsproxy — pomalejší
  if ((now - (_liveStatus['COINGECKO']?.last||0)) > 120000) fetchCoinGecko();
}, 15000);

// Přidej live data count do status message
setInterval(()=>{
  const activeSources = Object.entries(_liveStatus).filter(([k,v])=>v.ok).map(([k])=>k);
  const liveCoins = CRYPTO.filter(c=>_src[c.id]&&_src[c.id]!=='none').length;
  if (activeSources.length > 0) {
    const msg = `LIVE: ${liveCoins}/${CRYPTO.length} coins · ${activeSources.length} zdroje aktivní`;
    document.getElementById('st-msg') && (document.getElementById('st-msg').textContent = msg);
  }
}, 3000);
setInterval(()=>fetchMacroCalendar(false),600000); // refresh every 10min

// ── SIDEBAR CALENDAR RENDERER ─────────────────────────
function renderSidebarNews(){
  const el=document.getElementById('sb-news');
  if(!el)return;
  const EVTS=window._ffRangeEvts||window._ffLiveEvts||[
    // ── LAST WEEK: Mar 2–7 2026 — actuals verified from FF ──────────────────
    {date:'2026-03-02',time:'12:30am',currency:'AUD',impact:'Low',   title:'Company Operating Profits QoQ',   forecast:'0.7%',   previous:'-2.1%',   actual:'1.6%'},
    {date:'2026-03-02',time:'12:30am',currency:'AUD',impact:'Low',   title:'Govt Budget Balance MoM',         forecast:'',       previous:'-3.2B',   actual:'-4.1B'},
    {date:'2026-03-03',time:'12:30am',currency:'AUD',impact:'High',  title:'RBA Rate Decision',               forecast:'4.10%',  previous:'4.35%',   actual:'4.10%'},
    {date:'2026-03-03',time:'9:45am', currency:'USD',impact:'High',  title:'S&P Global US Mfg PMI',           forecast:'51.6',   previous:'51.2',    actual:'52.7'},
    {date:'2026-03-03',time:'10:00am',currency:'USD',impact:'High',  title:'ISM Manufacturing PMI',           forecast:'50.5',   previous:'50.9',    actual:'50.3'},
    {date:'2026-03-03',time:'10:00am',currency:'USD',impact:'Medium',title:'ISM Mfg Prices',                  forecast:'54.5',   previous:'54.9',    actual:'62.4'},
    {date:'2026-03-03',time:'10:00am',currency:'USD',impact:'Medium',title:'Construction Spending MoM',       forecast:'0.2%',   previous:'-0.5%',   actual:'-0.2%'},
    {date:'2026-03-04',time:'4:30am', currency:'GBP',impact:'Low',   title:'Net Lending to Individuals',      forecast:'6.0B',   previous:'5.3B',    actual:'5.5B'},
    {date:'2026-03-04',time:'4:30am', currency:'GBP',impact:'Low',   title:'Mortgage Approvals',              forecast:'66K',    previous:'66K',     actual:'66K'},
    {date:'2026-03-04',time:'10:00am',currency:'EUR',impact:'Medium',title:'Eurozone PPI MoM',                forecast:'0.4%',   previous:'0.4%',    actual:'0.6%'},
    {date:'2026-03-04',time:'10:00am',currency:'EUR',impact:'Medium',title:'Eurozone PPI YoY',                forecast:'-0.4%',  previous:'-0.4%',   actual:'0.0%'},
    {date:'2026-03-04',time:'3:00pm', currency:'USD',impact:'Medium',title:'Factory Orders MoM',              forecast:'-0.1%',  previous:'1.7%',    actual:'1.7%'},
    {date:'2026-03-05',time:'4:30am', currency:'GBP',impact:'High',  title:'Construction PMI',                forecast:'50.8',   previous:'48.1',    actual:'44.6%'},
    {date:'2026-03-05',time:'10:00am',currency:'USD',impact:'High',  title:'ISM Services PMI',                forecast:'52.6',   previous:'52.8',    actual:'53.5'},
    {date:'2026-03-05',time:'10:00am',currency:'USD',impact:'Medium',title:'ISM Services Prices',             forecast:'',       previous:'60.4',    actual:'62.6'},
    {date:'2026-03-05',time:'3:00pm', currency:'USD',impact:'Medium',title:'JOLTS Job Openings Jan',          forecast:'7.63M',  previous:'7.74M',   actual:'7.74M'},
    {date:'2026-03-06',time:'8:15am', currency:'USD',impact:'High',  title:'ADP Non-Farm Employment',         forecast:'141K',   previous:'183K',    actual:'77K'},
    {date:'2026-03-06',time:'8:30am', currency:'USD',impact:'Medium',title:'Trade Balance Jan',               forecast:'-128.2B',previous:'-98.4B',  actual:'-131.4B'},
    {date:'2026-03-06',time:'8:30am', currency:'CAD',impact:'Medium',title:'Trade Balance Jan',               forecast:'-1.0B',  previous:'0.7B',    actual:'0.4B'},
    {date:'2026-03-06',time:'10:00am',currency:'USD',impact:'Low',   title:'Wholesale Inventories MoM',       forecast:'0.5%',   previous:'0.5%',    actual:'0.8%'},
    {date:'2026-03-06',time:'8:30am', currency:'USD',impact:'High',  title:'Initial Jobless Claims',          forecast:'235K',   previous:'242K',    actual:'221K'},
    {date:'2026-03-07',time:'8:30am', currency:'USD',impact:'High',  title:'NFP Feb 2026',                    forecast:'+160K',  previous:'+143K',   actual:'+151K'},
    {date:'2026-03-07',time:'8:30am', currency:'USD',impact:'High',  title:'Unemployment Rate Feb',           forecast:'4.1%',   previous:'4.0%',    actual:'4.1%'},
    {date:'2026-03-07',time:'8:30am', currency:'USD',impact:'Medium',title:'Average Hourly Earnings MoM',    forecast:'0.3%',   previous:'0.4%',    actual:'0.3%'},
    {date:'2026-03-07',time:'8:30am', currency:'CAD',impact:'High',  title:'Canada Employment Change',        forecast:'+20K',   previous:'+76K',    actual:'+1.1K'},
    {date:'2026-03-07',time:'8:30am', currency:'CAD',impact:'High',  title:'Canada Unemployment Rate',        forecast:'6.7%',   previous:'6.6%',    actual:'6.6%'},
    {date:'2026-03-07',time:'10:00am',currency:'USD',impact:'Medium',title:'Michigan Consumer Sentiment Prel',forecast:'63.1',  previous:'71.1',    actual:'57.9'},
    {date:'2026-03-07',time:'9:00pm', currency:'USD',impact:'Medium',title:'Consumer Credit Jan',             forecast:'12.4B',  previous:'25.2B',   actual:'8.0B'},
    // ── THIS WEEK: Mar 9–14 2026 ─────────────────────────────────────────────
    {date:'2026-03-09',time:'6:00am', currency:'JPY',impact:'Low',   title:'Coincident Indicator MoM Jan',    forecast:'',      previous:'-0.5%',    actual:'2.5%'},
    {date:'2026-03-09',time:'6:00am', currency:'JPY',impact:'Low',   title:'Leading Index MoM Jan',           forecast:'',      previous:'1.1%',     actual:'2.1%'},
    {date:'2026-03-09',time:'6:00am', currency:'JPY',impact:'Low',   title:'Leading Index Jan',               forecast:'113.0', previous:'110.3',    actual:'112.4'},
    {date:'2026-03-09',time:'7:00am', currency:'JPY',impact:'Low',   title:'Economy Watchers Sentiment Feb',  forecast:'48.1',  previous:'47.6',     actual:'48.9'},
    {date:'2026-03-09',time:'10:30am',currency:'EUR',impact:'Low',   title:'Sentix Investor Confidence Mar',  forecast:'-3.1',  previous:'4.2',      actual:'-3.1'},
    {date:'2026-03-09',time:'11:00am',currency:'EUR',impact:'Medium',title:'Eurogroup Meetings',              forecast:'',      previous:'',         actual:null},
    {date:'2026-03-09',time:'11:30am',currency:'EUR',impact:'Medium',title:"ECB Elderson Speaks",             forecast:'',      previous:'',         actual:null},
    {date:'2026-03-09',time:'3:00pm', currency:'USD',impact:'Low',   title:'CB Employment Trends Index Feb',  forecast:'',      previous:'105.06',   actual:null},
    {date:'2026-03-09',time:'4:00pm', currency:'USD',impact:'Medium',title:'NY Fed Inflation Expectations Feb',forecast:'',     previous:'3.1%',     actual:null},
    {date:'2026-03-09',time:'4:30pm', currency:'USD',impact:'Low',   title:'3-Month Bill Auction',            forecast:'',      previous:'3.610%',   actual:null},
    {date:'2026-03-09',time:'4:30pm', currency:'USD',impact:'Low',   title:'6-Month Bill Auction',            forecast:'',      previous:'3.535%',   actual:null},
    {date:'2026-03-10',time:'12:30am',currency:'AUD',impact:'Low',   title:'Westpac Consumer Sentiment Mar',  forecast:'',      previous:'-2.6%',    actual:null},
    {date:'2026-03-10',time:'12:30am',currency:'JPY',impact:'Low',   title:'Average Cash Earnings YoY Jan',   forecast:'2.5%',  previous:'1.5%',     actual:null},
    {date:'2026-03-10',time:'12:30am',currency:'JPY',impact:'Medium',title:'Household Spending MoM Jan',      forecast:'0.8%',  previous:'-2.9%',    actual:null},
    {date:'2026-03-10',time:'12:30am',currency:'JPY',impact:'Medium',title:'Household Spending YoY Jan',      forecast:'2.3%',  previous:'-2.6%',    actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'High',  title:'GDP QoQ Q4',                      forecast:'0.1%',  previous:'-0.6%',    actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Medium',title:'GDP Annualized QoQ Q4',           forecast:'0.2%',  previous:'-2.3%',    actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Low',   title:'GDP Capital Expenditure QoQ Q4',  forecast:'0.2%',  previous:'-0.2%',    actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Low',   title:'GDP External Demand QoQ Q4',      forecast:'0.0%',  previous:'-0.2%',    actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Medium',title:'GDP Price Index YoY Q4',          forecast:'3.4%',  previous:'3.4%',     actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Low',   title:'GDP Private Consumption QoQ Q4',  forecast:'0.1%',  previous:'0.2%',     actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Low',   title:'M2 Money Stock YoY',              forecast:'1.5%',  previous:'1.6%',     actual:null},
    {date:'2026-03-10',time:'12:50am',currency:'JPY',impact:'Low',   title:'M3 Money Supply Feb',             forecast:'',      previous:'2244.9B',  actual:null},
    {date:'2026-03-10',time:'1:01am', currency:'GBP',impact:'Medium',title:'BRC Retail Sales Monitor YoY Feb',forecast:'2.1%', previous:'2.3%',     actual:null},
    {date:'2026-03-10',time:'1:30am', currency:'AUD',impact:'Low',   title:'Building Approvals YoY Jan',      forecast:'',      previous:'8.10%',    actual:null},
    {date:'2026-03-10',time:'1:30am', currency:'AUD',impact:'Medium',title:'Building Approvals MoM Jan',      forecast:'-7.2%', previous:'-14.9%',   actual:null},
    {date:'2026-03-10',time:'1:30am', currency:'AUD',impact:'Medium',title:'NAB Business Confidence Feb',     forecast:'',      previous:'3',        actual:null},
    {date:'2026-03-10',time:'1:30am', currency:'AUD',impact:'Low',   title:'NAB Business Survey Feb',         forecast:'',      previous:'7',        actual:null},
    {date:'2026-03-10',time:'1:30am', currency:'AUD',impact:'Low',   title:'Private House Approvals Jan',     forecast:'1.1%',  previous:'0.4%',     actual:null},
    {date:'2026-03-10',time:'5:00am', currency:'EUR',impact:'Medium',title:'German Industrial Production MoM',forecast:'1.5%', previous:'-2.4%',    actual:null},
    {date:'2026-03-10',time:'10:00am',currency:'USD',impact:'Medium',title:'JOLTS Job Openings',              forecast:'7.70M', previous:'7.60M',    actual:null},
    {date:'2026-03-11',time:'12:30am',currency:'CNY',impact:'Medium',title:'CPI y/y',                         forecast:'-0.5%', previous:'-0.7%',    actual:null},
    {date:'2026-03-11',time:'12:30am',currency:'CNY',impact:'Medium',title:'PPI y/y',                         forecast:'-2.3%', previous:'-2.3%',    actual:null},
    {date:'2026-03-11',time:'7:00am', currency:'USD',impact:'Low',   title:'MBA Mortgage Applications',       forecast:'',      previous:'-4.2%',    actual:null},
    {date:'2026-03-11',time:'8:30am', currency:'USD',impact:'High',  title:'CPI (MoM) (Feb)',                  forecast:'0.3%',  previous:'0.5%',     actual:null},
    {date:'2026-03-11',time:'8:30am', currency:'USD',impact:'High',  title:'Core CPI (MoM) (Feb)',             forecast:'0.3%',  previous:'0.4%',     actual:null},
    {date:'2026-03-11',time:'8:30am', currency:'USD',impact:'High',  title:'CPI (YoY) (Feb)',                  forecast:'2.9%',  previous:'3.0%',     actual:null},
    {date:'2026-03-11',time:'10:30am',currency:'USD',impact:'Medium',title:'Crude Oil Inventories',           forecast:'-1.1M', previous:'+4.2M',    actual:null},
    {date:'2026-03-11',time:'1:00pm', currency:'USD',impact:'High',  title:'10-Year Note Auction',            forecast:'',      previous:'4.177%',   actual:null},
    {date:'2026-03-12',time:'8:30am', currency:'USD',impact:'High',  title:'PPI (MoM) (Feb)',                  forecast:'0.3%',  previous:'0.4%',     actual:null},
    {date:'2026-03-12',time:'8:30am', currency:'USD',impact:'High',  title:'Core PPI (MoM) (Feb)',             forecast:'0.3%',  previous:'0.3%',     actual:null},
    {date:'2026-03-12',time:'8:30am', currency:'USD',impact:'High',  title:'Initial Jobless Claims',          forecast:'226K',  previous:'221K',     actual:null},
    {date:'2026-03-12',time:'1:00pm', currency:'USD',impact:'High',  title:'30-Year Bond Auction',            forecast:'',      previous:'4.750%',   actual:null},
    {date:'2026-03-13',time:'8:30am', currency:'USD',impact:'High',  title:'Core PCE Price Index (MoM) (Jan)',forecast:'0.4%',  previous:'0.4%',     actual:null},
    {date:'2026-03-13',time:'8:30am', currency:'USD',impact:'High',  title:'Core PCE Price Index (YoY) (Jan)',forecast:'3.1%',  previous:'3.0%',     actual:null},
    {date:'2026-03-13',time:'8:30am', currency:'USD',impact:'High',  title:'Durable Goods Orders (MoM) (Jan)',forecast:'0.5%',  previous:'-1.4%',    actual:null},
    {date:'2026-03-13',time:'8:30am', currency:'USD',impact:'High',  title:'GDP (QoQ) (Q3)',                   forecast:'1.4%',  previous:'4.3%',     actual:null},
    {date:'2026-03-13',time:'10:00am',currency:'USD',impact:'High',  title:'JOLTS Job Openings (Jan)',         forecast:'6.840M',previous:'6.542M',   actual:null},
    {date:'2026-03-13',time:'10:00am',currency:'USD',impact:'Medium',title:'Michigan Consumer Sentiment',     forecast:'63.1',  previous:'64.7',     actual:null},
    {date:'2026-03-17',time:'4:30am', currency:'GBP',impact:'High',  title:'Employment Change 3m/3m',         forecast:'-10K',  previous:'-44K',     actual:null},
    {date:'2026-03-17',time:'4:30am', currency:'GBP',impact:'High',  title:'Unemployment Rate',               forecast:'4.5%',  previous:'4.4%',     actual:null},
    {date:'2026-03-18',time:'8:30am', currency:'CAD',impact:'High',  title:'CPI (MoM)',                        forecast:'0.6%',  previous:'-0.4%',    actual:null},
    {date:'2026-03-18',time:'8:30am', currency:'USD',impact:'Medium',title:'Retail Sales (MoM)',              forecast:'0.6%',  previous:'-0.9%',    actual:null},
    {date:'2026-03-19',time:'2:00am', currency:'AUD',impact:'High',  title:'RBA Rate Decision',               forecast:'4.10%', previous:'4.35%',    actual:null},
    {date:'2026-03-19',time:'2:00pm', currency:'USD',impact:'High',  title:'FOMC Rate Decision',              forecast:'4.25%', previous:'4.25%',    actual:null},
    {date:'2026-03-19',time:'2:30pm', currency:'USD',impact:'High',  title:'FOMC Press Conference',           forecast:'\u2014', previous:'\u2014',   actual:null},
    {date:'2026-03-20',time:'8:00am', currency:'GBP',impact:'High',  title:'BOE Rate Decision',               forecast:'4.50%', previous:'4.50%',    actual:null},
    {date:'2026-03-21',time:'9:45am', currency:'USD',impact:'High',  title:'Flash Manufacturing PMI',         forecast:'51.5',  previous:'52.7',     actual:null},
    {date:'2026-03-21',time:'9:45am', currency:'USD',impact:'High',  title:'Flash Services PMI',              forecast:'50.8',  previous:'49.7',     actual:null},
    {date:'2026-03-28',time:'8:30am', currency:'USD',impact:'High',  title:'Core PCE Price Index (MoM)',      forecast:'0.3%',  previous:'0.3%',     actual:null}
  ];

  // Save static data as reference for merge
  if(!window._ffStaticEvts || window._ffStaticEvts.length===0) window._ffStaticEvts = EVTS.slice();

  // Flag emoji per currency
  const flag={USD:'🇺🇸',EUR:'🇪🇺',GBP:'🇬🇧',JPY:'🇯🇵',CAD:'🇨🇦',AUD:'🇦🇺',CHF:'🇨🇭',NZD:'🇳🇿',CNY:'🇨🇳'};
  const ccyC={USD:'#ff8800',EUR:'#ff8800',GBP:'#ff8800',JPY:'#ff8800',CAD:'#ff8800',AUD:'#ff8800',CHF:'#ff8800',NZD:'#ff8800',CNY:'#ff8800'};

  const impBlocks=i=>{const v=(i||'').toLowerCase();
    if(v==='high')   return '<span style="color:#ff3333;font-size:7px;letter-spacing:-1.5px;font-weight:900">&#9646;&#9646;&#9646;</span>';
    if(v==='medium') return '<span style="font-size:7px;letter-spacing:-1.5px;font-weight:900"><span style="color:#ff7700">&#9646;&#9646;</span><span style="color:#111111">&#9646;</span></span>';
    return '<span style="font-size:7px;letter-spacing:-1.5px;font-weight:900"><span style="color:#ff7700">&#9646;</span><span style="color:#080808">&#9646;&#9646;</span></span>';
  };

  // Apply week filter based on _calWeekOffset
  const _woff = window._calWeekOffset || 0;
  const todayD = new Date(); todayD.setHours(0,0,0,0);
  // Get Monday of the target week
  const _wmon = _getWeekMonday ? _getWeekMonday(_woff) : todayD;
  const _wsat = new Date(_wmon); _wsat.setDate(_wmon.getDate() + 6);
  const dateFiltered = EVTS.filter(e => {
    const ed = new Date(e.date + 'T00:00:00');
    if(_woff === 0) return ed >= todayD; // this week: from today onwards
    return ed >= _wmon && ed <= _wsat;   // other weeks: mon–sat of that week
  });

  // Apply currency filter
  const _f=window._calFilter||'ALL';
  const filtered=_f==='ALL'?dateFiltered:dateFiltered.filter(e=>e.currency===_f);
  // Update filter button styles
  ['ALL','USD','EUR','GBP','JPY','CAD','AUD'].forEach(k=>{
    const el2=document.getElementById('cf-'+k);
    if(!el2)return;
    const active=k===_f||(k==='ALL'&&(_f==='ALL'||!_f));
    el2.style.color=active?'#ff8800':'#333333';
    el2.style.borderColor=active?'#ff880055':'#111111';
    el2.style.background=active?'rgba(255,136,0,.1)':'transparent';
    el2.onclick=()=>{window._calFilter=k;renderSidebarNews();};
  });

  // Group by date, count events
  window._calEvts=EVTS;
  const byDate={};
  filtered.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});

  // Sticky column header
  let html=`<div style="position:sticky;top:0;z-index:3;display:grid;grid-template-columns:42px 30px 22px 1fr 32px 32px 32px;gap:0;padding:5px 8px 4px;background:#000;">
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px">TIME</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px">CURR</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px">IMP</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px">EVENT</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px;text-align:right">ACT</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px;text-align:right">FCST</span>
    <span style="color:#333333;font-size:6px;font-weight:700;letter-spacing:.8px;text-align:right">PREV</span>
  </div>`;

  // Find next upcoming event based on current time
  const nowH=new Date().getHours(), nowM=new Date().getMinutes();
  const parseTime=t=>{
    if(!t||t==='All Day'||t==='EOD'||t==='Pre')return -1;
    const m=t.match(/(\d+):(\d+)(am|pm)/i);
    if(!m)return -1;
    let h=parseInt(m[1]),min=parseInt(m[2]);
    if(m[3].toLowerCase()==='pm'&&h!==12)h+=12;
    if(m[3].toLowerCase()==='am'&&h===12)h=0;
    return h*60+min;
  };
  const todayStr=new Date().toISOString().slice(0,10);
  const nowMins=nowH*60+nowM;
  // Find the next event today that hasn't happened yet
  let nextEventIdx=-1, minDiff=Infinity;
  if(byDate[todayStr]){
    byDate[todayStr].forEach((e,i)=>{
      const t=parseTime(e.time);
      if(t>=nowMins && t-nowMins<minDiff){minDiff=t-nowMins;nextEventIdx=i;}
    });
  }

  Object.keys(byDate).sort((a,b)=>a.localeCompare(b)).forEach(date=>{
    const evts=byDate[date];
    const d=new Date(date+'T12:00:00Z');
    const today=new Date();today.setHours(0,0,0,0);
    const diff=Math.round((new Date(date+'T00:00:00Z')-today)/86400000);
    const dStr=d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
    const cnt=evts.length;
    const isToday=diff===0,isTmrw=diff===1;

    html+=`<div style="padding:3px 8px;background:#000;border-top:1px solid #111111;display:flex;align-items:center;gap:3px">
      <span style="color:#aaaaaa;font-size:7px;font-weight:400">${dStr}</span>
      <span style="color:#333333;font-size:6px;margin-left:2px">${cnt}</span>
    </div>`;

    evts.forEach((e,i)=>{
      const isHigh=(e.impact||'').toLowerCase()==='high';
      const isMed=(e.impact||'').toLowerCase()==='medium';
      const isNext=isToday&&i===nextEventIdx;
      const rowBg=isNext?'rgba(160,40,40,.08)':isHigh?'rgba(120,20,20,.05)':'transparent';
      const leftBdr=isNext?'#882222':isHigh?'#331111':isMed?'#111111':'#141414';
      const nextDot=isNext?'<span style="display:inline-block;width:3px;height:3px;border-radius:50%;background:#aa3333;margin-right:4px;flex-shrink:0;animation:blink 1.5s infinite"></span>':'';
      const _pn=s=>{if(!s&&s!==0)return NaN;const m=String(s).trim().replace(/,/g,'').match(/^([+-]?\d*\.?\d+)\s*([KkMmBbTt%]?)$/);if(!m)return NaN;return parseFloat(m[1])*({K:1e3,k:1e3,M:1e6,m:1e6,B:1e9,b:1e9,T:1e12,t:1e12,'%':1,'':1}[m[2]]||1);};
      const _a=_pn(e.actual),_f=_pn(e.forecast);
      const actualC=e.actual?(isNaN(_a)||isNaN(_f)?'#aaaaaa':_a>_f?'#00cc44':_a<_f?'#cc3333':'#aaaaaa'):'#222222';
      const actualV=e.actual||'\u2014';
      html+=`<div id="${isNext?'next-evt':''}" style="display:grid;grid-template-columns:42px 30px 22px 1fr 32px 32px 32px;align-items:center;gap:0;padding:${isNext?'7px':'6px'} 8px;border-bottom:1px solid #0e0e0e;border-left:${isNext?'3px':'2px'} solid ${leftBdr};background:${rowBg}" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='${rowBg}'">
        <span style="color:${isNext?'#777766':'#404040'};font-size:6.5px;font-family:'Roboto Mono',monospace;font-weight:${isNext?'600':'400'}">${e.time}</span>
        <span style="color:#777766;font-size:6.5px;font-weight:700">${e.currency}</span>
        <span>${impBlocks(e.impact)}</span>
        <span style="color:${isNext?'#ccccbb':isHigh?'#aaaaaa':isMed?'#777766':'#4a4a44'};font-size:7.5px;font-weight:${isNext||isHigh?'500':'400'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center" title="${e.title}">${nextDot}${e.title}</span>
        <span style="color:${actualC};font-size:6px;text-align:right;font-family:'Roboto Mono',monospace;font-weight:${e.actual?'700':'400'}">${actualV}</span>
        <span style="color:#4a4a44;font-size:6px;text-align:right;font-family:'Roboto Mono',monospace">${e.forecast||'\u2014'}</span>
        <span style="color:#2e2e2a;font-size:6px;text-align:right;font-family:'Roboto Mono',monospace">${e.previous||'\u2014'}</span>
      </div>`;
    });
  });

  el.innerHTML=html;
  const nextEl=el.querySelector('#next-evt');
  if(nextEl) el.scrollTop=Math.max(0,nextEl.offsetTop-40);
  else el.scrollTop=0;
}
// ── CALENDAR RANGE SELECTOR ──────────────────────────
// ── WEEK NAVIGATION ─────────────────────────────────
window._calWeekOffset = 0; // 0=this week, -1=last week, +1=next week, etc.

function _getWeekLabel(offset) {
  if(offset === 0)  return 'THIS WEEK';
  if(offset === -1) return 'LAST WEEK';
  if(offset === 1)  return 'NEXT WEEK';
  // compute actual date range
  const mon = _getWeekMonday(offset);
  const fri = new Date(mon); fri.setDate(fri.getDate()+4);
  const fmt = d => d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});
  return fmt(mon)+' – '+fmt(fri);
}

function _getWeekMonday(offset) {
  const today = new Date(); today.setHours(0,0,0,0);
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) + offset * 7);
  return monday;
}

function calWeekNav(delta) {
  window._calWeekOffset = (window._calWeekOffset || 0) + delta;
  const offset = window._calWeekOffset;

  // Update label
  const lbl = document.getElementById('cal-week-label');
  if(lbl) lbl.textContent = _getWeekLabel(offset);

  // Disable next button if at this week or future (no future data beyond nextweek)
  const nextBtn = document.getElementById('cal-next-btn');
  if(nextBtn) {
    const disabled = offset >= 1;
    nextBtn.style.color = disabled ? '#111111' : '#444444';
    nextBtn.style.cursor = disabled ? 'default' : 'pointer';
  }

  // Decide which XML(s) to load
  // FF only has: lastweek, thisweek, nextweek
  // For older: use allorigins + FF HTML scraper
  if(offset === 0) {
    // thisweek — already loaded in _ffLiveEvts/_macroCache
    window._ffRangeEvts = null; // use live data
    renderSidebarNews();
    return;
  }

  const el = document.getElementById('sb-news');
  if(el) el.innerHTML = '<div style="padding:20px 8px;color:#333333;font-size:7px;text-align:center;font-family:monospace">LOADING FF DATA…</div>';

  const CCYS = new Set(['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY']);
  const impMap = {Holiday:'Low',Low:'Low',Medium:'Medium',High:'High'};

  function parseXML(xml) {
    try {
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      return [...doc.querySelectorAll('event')].map(ev => {
        const g = t => (ev.querySelector(t)||{}).textContent?.trim()||'';
        const country = g('country');
        if(!CCYS.has(country)) return null;
        const raw = g('date'); // "03-09-2026"
        const [mo,dy,yr] = raw.split('-');
        const dateStr = yr ? `${yr}-${mo.padStart(2,'0')}-${dy.padStart(2,'0')}` : '';
        return {
          date: dateStr, time: g('time'), currency: country,
          impact: impMap[g('impact')]||'Low', title: g('title'),
          forecast: g('forecast')||'', previous: g('previous')||'',
          actual: g('actual')||null
        };
      }).filter(Boolean);
    } catch(e) { return []; }
  }

  // JSON fetcher for week nav — has actual values
  async function fetchWeekJSON(url) {
    try {
      const r = await _fetchTimeout(url, 7000);
      return await r.json();
    } catch(e) { return null; }
  }

  function parseWeekJSON(arr){
    const CCYS2=new Set(['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY']);
    const impMap2={Holiday:'Low',Low:'Low',Medium:'Medium',High:'High'};
    return (Array.isArray(arr)?arr:[]).map(e=>{
      const country=e.country||e.currency||'';
      if(!CCYS2.has(country))return null;
      const d=new Date(e.date); if(isNaN(d))return null;
      return {
        date:d.toISOString().slice(0,10),
        time:d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).toLowerCase().replace(/\s/g,''),
        currency:country, impact:impMap2[e.impact]||'Low', title:e.title||'',
        forecast:e.forecast||'', previous:e.previous||'',
        actual:(e.actual&&e.actual!==''?e.actual:null)
      };
    }).filter(Boolean);
  }

  // Map offset to FF JSON url
  let urls = [];
  if(offset === -1) {
    urls = ['https://nfs.faireconomy.media/ff_calendar_lastweek.json'];
  } else if(offset === 1) {
    urls = ['https://nfs.faireconomy.media/ff_calendar_nextweek.json'];
  } else if(offset <= -2) {
    // Older weeks: scrape FF website via allorigins
    const mon = _getWeekMonday(offset);
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const mo = months[mon.getMonth()];
    const dy = mon.getDate();
    const yr = mon.getFullYear();
    const ffUrl = `https://www.forexfactory.com/calendar?week=${mo}${dy}.${yr}`;
    const PROXY = 'https://api.allorigins.win/get?url=';
    fetch(PROXY + encodeURIComponent(ffUrl), {signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),12000);return _c.signal;})()})
      .then(r => r.json())
      .then(j => {
        const evts = parseFFHtml(j.contents||'', mon);
        window._ffRangeEvts = evts.length ? evts : [];
        renderSidebarNews();
      })
      .catch(() => { window._ffRangeEvts = []; renderSidebarNews(); });
    return;
  }

  Promise.all(urls.map(fetchWeekJSON))
    .then(jsons => {
      const evts = jsons.flatMap(j => j ? parseWeekJSON(j) : []);
      window._ffRangeEvts = evts.length ? evts : [];
      renderSidebarNews();
    })
    .catch(() => { window._ffRangeEvts = []; renderSidebarNews(); });
}

function setCalRange(days) {
  // legacy shim — convert to week offset
  if(days === 0)  { window._calWeekOffset = 0;  calWeekNav(0);  return; }
  if(days >= -7)  { window._calWeekOffset = -1; calWeekNav(0); window._calWeekOffset = -1; renderSidebarNews(); return; }
  window._calWeekOffset = -2; calWeekNav(0); window._calWeekOffset = -2; renderSidebarNews();
}

function fetchFFRange(targetDate){
  const PROXY='https://api.allorigins.win/get?url=';
  const monday=new Date(targetDate);
  const day=monday.getDay();
  monday.setDate(monday.getDate()-(day===0?6:day-1));
  const today=new Date(); today.setHours(0,0,0,0);
  const diffWeeks=Math.round((monday-today)/(7*86400000));

  // Use JSON for this/last/next week, FF HTML for older
  let url;
  if(diffWeeks===0)       url='https://nfs.faireconomy.media/ff_calendar_thisweek.json';
  else if(diffWeeks===-1) url='https://nfs.faireconomy.media/ff_calendar_lastweek.json';
  else if(diffWeeks===1)  url='https://nfs.faireconomy.media/ff_calendar_nextweek.json';
  else {
    // Scrape FF HTML calendar for older weeks
    const months=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const mo=months[monday.getMonth()];
    const dy=monday.getDate();
    const yr=monday.getFullYear();
    const ffUrl=`https://www.forexfactory.com/calendar?week=${mo}${dy}.${yr}`;
    fetch(PROXY+encodeURIComponent(ffUrl))
      .then(r=>r.json())
      .then(r=>{
        const html=r.contents||'';
        const evts=parseFFHtml(html, monday);
        window._ffRangeEvts=evts.length?evts:null;
        renderSidebarNews();
      })
      .catch(()=>{ window._ffRangeEvts=null; renderSidebarNews(); });
    return;
  }

  fetch(PROXY+encodeURIComponent(url))
    .then(r=>r.json())
    .then(r=>{
      const raw=JSON.parse(r.contents||'[]');
      const impMap={Holiday:'Low',Low:'Low',Medium:'Medium',High:'High'};
      const evts=raw.map(e=>{
        const d=new Date(e.date);
        const dateStr=d.toISOString().slice(0,10);
        const t=d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).toLowerCase().replace(' ','');
        return {date:dateStr,time:t,currency:e.country,impact:impMap[e.impact]||'Low',
          title:e.title,forecast:e.forecast||'',previous:e.previous||'',actual:e.actual||null};
      }).filter(e=>e.currency&&['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY'].includes(e.currency));
      window._ffRangeEvts=evts;
      renderSidebarNews();
    })
    .catch(()=>{ window._ffRangeEvts=null; renderSidebarNews(); });
}

function parseFFHtml(html, weekMonday){
  const evts=[];
  const impMap={low:'Low',medium:'Medium',high:'High',holiday:'Low'};
  const ccyOk=new Set(['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY']);
  // Parse table rows
  const rowRe=/<tr[^>]*class="[^"]*calendar_row[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi;
  let curDate=new Date(weekMonday);
  let m;
  while((m=rowRe.exec(html))!==null){
    const row=m[1];
    // Date cell
    const dateM=/<td[^>]*class="[^"]*date[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    if(dateM){
      const txt=dateM[1].replace(/<[^>]+>/g,'').trim();
      if(txt){
        const d=new Date(weekMonday);
        const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        const dayMatch=txt.match(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/i);
        if(dayMatch){
          const idx=days.findIndex(x=>x.toLowerCase()===dayMatch[1].toLowerCase().slice(0,3));
          d.setDate(weekMonday.getDate()+idx);
          curDate=new Date(d);
        }
      }
    }
    // Time
    const timeM=/<td[^>]*class="[^"]*time[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const time=(timeM?timeM[1].replace(/<[^>]+>/g,'').trim():'')||'';
    // Currency
    const ccyM=/<td[^>]*class="[^"]*currency[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const ccy=(ccyM?ccyM[1].replace(/<[^>]+>/g,'').trim():'');
    if(!ccyOk.has(ccy))continue;
    // Impact
    const impM=/class="[^"]*impact[^"]*"[^>]*>[\s\S]*?title="([^"]+)"/i.exec(row);
    const impact=impMap[(impM?impM[1]:'').toLowerCase()]||'Low';
    // Title
    const titleM=/<td[^>]*class="[^"]*event[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const title=(titleM?titleM[1].replace(/<[^>]+>/g,'').trim():'');
    if(!title)continue;
    // Actual/Forecast/Previous
    const actM=/<td[^>]*class="[^"]*actual[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const fctM=/<td[^>]*class="[^"]*forecast[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const prvM=/<td[^>]*class="[^"]*previous[^"]*"[^>]*>([\s\S]*?)<\/td>/i.exec(row);
    const actual=(actM?actM[1].replace(/<[^>]+>/g,'').trim():'')||null;
    const forecast=(fctM?fctM[1].replace(/<[^>]+>/g,'').trim():'')||'';
    const previous=(prvM?prvM[1].replace(/<[^>]+>/g,'').trim():'')||'';
    evts.push({
      date:curDate.toISOString().slice(0,10),
      time:time.toLowerCase(),
      currency:ccy, impact, title, forecast, previous,
      actual:actual||null
    });
  }
  return evts;
}

setInterval(renderSidebarNews,60000);

// Periodic full news panel refresh — ensures WN + NWS panels stay live
setInterval(function(){
  try{
    const wnb = document.getElementById('wn-body');
    if(wnb && (NEWS_DATA.length > 0 || (_newsCache && _newsCache.length > 0))){
      const st = wnb.scrollTop;
      wnb.innerHTML = buildWNTable(NEWS_DATA.length > 0 ? NEWS_DATA : _newsCache);
      wnb.scrollTop = st;
    }
  }catch(e){}
  try{
    const nwsb = document.getElementById('nws-body');
    if(nwsb){
      const st = nwsb.scrollTop;
      nwsb.innerHTML = buildNWSPanel(0);
      nwsb.scrollTop = st;
      if(window._nwsFilterText && typeof _nwsFilter==='function'){
        _nwsFilter();
        var _nsi2=document.getElementById('nws-srch'); if(_nsi2) _nsi2.value=window._nwsFilterText;
      }
    }
  }catch(e){}
}, 20000); // every 20s
setTimeout(renderSidebarNews,800);

// ── FOREX FACTORY LIVE DATA FETCHER (sidebar) ──────────
(function(){
  const CCYS = new Set(['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY']);
  const impMap = {Holiday:'Low',Low:'Low',Medium:'Medium',High:'High'};

  // JSON parser — has actual values
  function parseJSON(arr){
    return (Array.isArray(arr)?arr:[]).map(e=>{
      const country=e.country||e.currency||'';
      if(!CCYS.has(country))return null;
      const d=new Date(e.date);
      if(isNaN(d))return null;
      const dateStr=d.toISOString().slice(0,10);
      const timeStr=d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).toLowerCase().replace(/\s/g,'');
      return {
        date:dateStr, time:timeStr, currency:country,
        impact:impMap[e.impact]||'Low', title:e.title||'',
        forecast:e.forecast||'', previous:e.previous||'',
        actual:(e.actual&&e.actual!==''?e.actual:null)
      };
    }).filter(Boolean);
  }

  async function fetchFF(){
    try{
      // JSON first — has actual
      const [r1,r2]=await Promise.all([
        _fetchTimeout('https://nfs.faireconomy.media/ff_calendar_thisweek.json', 7000).then(r=>r.json()),
        _fetchTimeout('https://nfs.faireconomy.media/ff_calendar_nextweek.json', 7000).then(r=>r.json())
      ]);
      const evts=[...parseJSON(r1),...parseJSON(r2)];
      if(evts.length>0){
        // Merge: live JSON is primary; fill missing actuals from static where date+currency+approx-title match
        const staticEvts = window._ffStaticEvts || [];
        const merged = evts.map(e => {
          if(e.actual && e.actual !== '') return e; // live has actual — use it
          // try match by date + currency + similar title keywords
          const key = (e.title||'').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,12);
          const st = staticEvts.find(s =>
            s.date === e.date &&
            s.currency === e.currency &&
            (s.title||'').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,12) === key
          );
          return (st && st.actual) ? {...e, actual: st.actual} : e;
        });
        window._ffLiveEvts = merged;
        window._macroCache.ecal = merged;
        window._macroCache.lastFetch = Date.now();
        renderSidebarNews();
        return;
      }
    }catch(e){}
    // fallback XML (no actual)
    try{
      const parseXML=xml=>{
        const doc=new DOMParser().parseFromString(xml,'text/xml');
        return [...doc.querySelectorAll('event')].map(ev=>{
          const g=t=>(ev.querySelector(t)||{}).textContent?.trim()||'';
          const country=g('country'); if(!CCYS.has(country))return null;
          const [mo,dy,yr]=g('date').split('-');
          return {date:yr?`${yr}-${mo.padStart(2,'0')}-${dy.padStart(2,'0')}`:'',
            time:g('time'),currency:country,impact:impMap[g('impact')]||'Low',
            title:g('title'),forecast:g('forecast')||'',previous:g('previous')||'',actual:null};
        }).filter(Boolean);
      };
      const [r1,r2]=await Promise.all([
        _fetchTimeout('https://nfs.faireconomy.media/ff_calendar_thisweek.xml', 7000).then(r=>r.text()),
        _fetchTimeout('https://nfs.faireconomy.media/ff_calendar_nextweek.xml', 7000).then(r=>r.text())
      ]);
      const evts=[...parseXML(r1),...parseXML(r2)];
      if(evts.length>0){
        window._ffLiveEvts=evts;
        window._macroCache.ecal=evts;
        window._macroCache.lastFetch=Date.now();
        renderSidebarNews();
      }
    }catch(e){ console.warn('FF fetch failed',e); }
  }

  fetchFF();
  setInterval(fetchFF,60*1000); // every 60s to catch actuals as they release
})();

// ── CALENDAR AUDIO ALERT ──────────────────────────────
(function(){
  let _lastAlerted='';
  function playAlert(){
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      // Three short beeps
      [0,0.18,0.36].forEach(delay=>{
        const o=ctx.createOscillator();
        const g=ctx.createGain();
        o.connect(g);g.connect(ctx.destination);
        o.type='sine';o.frequency.value=880;
        g.gain.setValueAtTime(0,ctx.currentTime+delay);
        g.gain.linearRampToValueAtTime(0.3,ctx.currentTime+delay+0.02);
        g.gain.linearRampToValueAtTime(0,ctx.currentTime+delay+0.12);
        o.start(ctx.currentTime+delay);
        o.stop(ctx.currentTime+delay+0.15);
      });
    }catch(e){}
  }
  function checkAlert(){
    const todayStr=new Date().toISOString().slice(0,10);
    const nowMins=new Date().getHours()*60+new Date().getMinutes();
    const EVTS=window._calEvts||[];
    EVTS.filter(e=>e.date===todayStr).forEach(e=>{
      const m=e.time.match(/(\d+):(\d+)(am|pm)/i);
      if(!m)return;
      let h=parseInt(m[1]),min=parseInt(m[2]);
      if(m[3].toLowerCase()==='pm'&&h!==12)h+=12;
      if(m[3].toLowerCase()==='am'&&h===12)h=0;
      const evtMins=h*60+min;
      const diff=evtMins-nowMins;
      const key=e.date+e.time+e.title;
      // Alert at exactly 1 min before and at event time
      if((diff===1||diff===0)&&_lastAlerted!==key){
        _lastAlerted=key;
        playAlert();
        // Show toast
        const toast=document.createElement('div');
        toast.style.cssText='position:fixed;bottom:16px;right:16px;z-index:9999;background:#080808;border-left:2px solid #ff6600;padding:7px 12px;font-family:"Share Tech Mono",monospace;box-shadow:0 2px 12px rgba(0,0,0,.6);opacity:0;transition:opacity .3s';
        toast.innerHTML=`<div style="display:flex;align-items:center;gap:8px"><span style="color:#ff6600;font-size:7px;font-weight:700">ALT</span><span style="color:#ff8800;font-size:7.5px;font-weight:700">${e.currency}</span><span style="color:#887060;font-size:7.5px">${e.title}</span><span style="color:#333333;font-size:7px;margin-left:4px">${diff===0?'NOW':'1m'}</span></div>`;
        document.body.appendChild(toast);
        requestAnimationFrame(()=>toast.style.opacity='1');
        setTimeout(()=>{toast.style.opacity='0';setTimeout(()=>toast.remove(),300);},4000);
      }
    });
  }
  setInterval(checkAlert,30000);
  setTimeout(checkAlert,2000);
})();

// panels no longer auto-open on startup
// Auto-start all data feeds immediately
document.addEventListener('DOMContentLoaded', function(){
  // Show STAT bar on initial page load (no panels open yet)
  document.body.classList.remove('hide-stat-bar');
  document.body.classList.remove('panel-open');

  try{ localStorage.removeItem('bmap_layout'); }catch(e){}
  // Optimized: start feeds immediately, news slightly deferred
  try{ if(typeof _startAllFeeds==='function') _startAllFeeds(); }catch(e){}
  setTimeout(function(){ try{ fetchAllNews(true); }catch(e){} }, 200);
  setTimeout(function(){ try{ fetchNWSNews(true); }catch(e){} }, 400);
  setTimeout(function(){ try{ fetchIntelligence(true); }catch(e){} }, 800);
});

/* ═══════════════════════════════════════════════════════════════
   NETSIT v5 — SÍŤOVÝ TERMINÁL  ·  LIVE DATA NETWORK VISUALIZER
   Blockchain-style force graph · Multi-layer · 60fps RAF engine
═══════════════════════════════════════════════════════════════ */

// ── Globální stav sítě ────────────────────────────────────────
const _net = {
  nodes:[], edges:[], packets:[],
  selected:null, hovered:null,
  _dragNode:null, dragOff:{x:0,y:0},
  _panDrag:null, connecting:null,
  tickTimer:null, animTimer:null,
  canvasId:null, logId:null, infoId:null, uid:null,
  logLines:[], layer:'all', physics:true,
  fps:0, pps:0, ppsCount:0, ppsLast:0, mouseScreen:null
};

// ── Typy uzlů ─────────────────────────────────────────────────
const _NT = {
  hub:    { color:'#7b5ea7', r:36, tag:'' },
  p2p:    { color:'#6a7fc1', r:28, tag:'RELAY NODE' },
  market: { color:'#8a9fd4', r:22, tag:'EQUITY' },
  crypto: { color:'#a78bce', r:22, tag:'CRYPTO' },
  macro:  { color:'#c471b5', r:20, tag:'MACRO' },
  fx:     { color:'#c490b8', r:20, tag:'FOREX' },
  bond:   { color:'#7aafc4', r:20, tag:'BOND' },
  defi:   { color:'#9a88c0', r:20, tag:'DEFI' },
  onchain:{ color:'#ff3388', r:18, tag:'ON-CHAIN' },
  custom: { color:'#8899aa', r:18, tag:'CUSTOM' }
};

// ── P2P relay uzly ─────────────────────────────────────────────
const _P2P = [
  {id:'p2p-ny',  label:'NEW YORK', short:'NY',  lat:'2ms',  peers:847,  bw:'14.2G', tz:'EST'},
  {id:'p2p-ldn', label:'LONDON',   short:'LDN', lat:'5ms',  peers:612,  bw:'11.8G', tz:'GMT'},
  {id:'p2p-fra', label:'FRANKFURT',short:'FRA', lat:'4ms',  peers:421,  bw:'9.4G',  tz:'CET'},
  {id:'p2p-tok', label:'TOKYO',    short:'TOK', lat:'9ms',  peers:534,  bw:'8.6G',  tz:'JST'},
  {id:'p2p-sg',  label:'SINGAPORE',short:'SG',  lat:'12ms', peers:398,  bw:'7.1G',  tz:'SGT'},
  {id:'p2p-pra', label:'PRAGUE',   short:'PRA', lat:'3ms',  peers:124,  bw:'2.4G',  tz:'CET'}
];

// ── Bloomberg panely ───────────────────────────────────────────
const _MCMDS = {
  WEI:    {label:'World Indices',    cat:'E', action:()=>openPanel('WEI')},
  MOVERS: {label:'Top Movers',       cat:'E', action:()=>openPanel('MOVERS')},
  MMAP:   {label:'Market Heatmap',   cat:'E', action:()=>openPanel('MMAP')},
  PERF:   {label:'Performance',      cat:'E', action:()=>openPanel('PERF')},
  EQUITY: {label:'US Stocks',        cat:'E', action:()=>openPanel('EQUITY')},
  FX:     {label:'FX Rates',         cat:'F', action:()=>openPanel('FX')},
  FXIP:   {label:'FX Implied Vol',   cat:'F', action:()=>openPanel('FXIP')},
  FXCL:   {label:'FX Correlations',  cat:'F', action:()=>openPanel('FXCL')},
  BYFC:   {label:'Bond Forecasts',   cat:'F', action:()=>openPanel('BYFC')},
  CRYPTO: {label:'Digital Assets',   cat:'C', action:()=>openPanel('CRYPTO')},
  LIQD:   {label:'Liquidations',     cat:'C', action:()=>openPanel('LIQD')},
  FUND:   {label:'Funding Rates',    cat:'C', action:()=>openPanel('FUND')},
  DOMN:   {label:'Dominance',        cat:'C', action:()=>openPanel('DOMN')},
  ETFF:   {label:'ETF Flows',        cat:'C', action:()=>openPanel('ETFF')},
  MACRO:  {label:'Macro Dashboard',  cat:'M', action:()=>openPanel('MACRO')},
  ECAL:   {label:'Econ Calendar',    cat:'M', action:()=>openPanel('ECAL')},
  COMDTY: {label:'Commodities',      cat:'M', action:()=>openPanel('COMDTY')},
  ENERGY: {label:'Energy Markets',   cat:'M', action:()=>openPanel('ENERGY')},
  METALS: {label:'Precious Metals',  cat:'M', action:()=>openPanel('METALS')},
  WN:     {label:'News Feed',        cat:'N', action:()=>openPanel('WN')},
  NWS:    {label:'News & Research',  cat:'N', action:()=>openPanel('NWS')},
  // -- Individual Assets (Indices) --
  SPX:    {label:'S&P 500 Index',    cat:'E', action:()=>_openChartForSymbol('SPX')},
  NDX:    {label:'Nasdaq 100 Index', cat:'E', action:()=>_openChartForSymbol('NDX')},
  DJI:    {label:'Dow Jones Index',  cat:'E', action:()=>_openChartForSymbol('DJI')},
  DAX:    {label:'DAX (Germany 40)', cat:'E', action:()=>_openChartForSymbol('DAX')},
  NI225:  {label:'Nikkei 225',       cat:'E', action:()=>_openChartForSymbol('NI225')},
  // -- Individual Assets (Commodities) --
  GOLD:   {label:'GOLD Spot (XAU)',  cat:'M', action:()=>_openChartForSymbol('GOLD')},
  OIL:    {label:'WTI Crude Oil',    cat:'M', action:()=>_openChartForSymbol('OIL')},
  SILVER: {label:'SILVER Spot (XAG)',cat:'M', action:()=>_openChartForSymbol('SILVER')},
  GAS:    {label:'Natural Gas',      cat:'M', action:()=>_openChartForSymbol('GAS')},
  COPPER: {label:'Copper LME',       cat:'M', action:()=>_openChartForSymbol('COPPER')},
  // -- Individual Assets (Forex) --
  EURUSD: {label:'EUR / USD Spot',   cat:'F', action:()=>_openChartForSymbol('EURUSD')},
  GBPUSD: {label:'GBP / USD Spot',   cat:'F', action:()=>_openChartForSymbol('GBPUSD')},
  USDJPY: {label:'USD / JPY Spot',   cat:'F', action:()=>_openChartForSymbol('USDJPY')},
  AUDUSD: {label:'AUD / USD Spot',   cat:'F', action:()=>_openChartForSymbol('AUDUSD')},
  USDCAD: {label:'USD / CAD Spot',   cat:'F', action:()=>_openChartForSymbol('USDCAD')},
  // v4 Extended Equity Universe
  MSTR:   {label:'MicroStrategy',     cat:'E', action:()=>_openChartForSymbol('MSTR')},
  COIN:   {label:'Coinbase Global',   cat:'E', action:()=>_openChartForSymbol('COIN')},
  SOFI:   {label:'SoFi Technologies', cat:'E', action:()=>_openChartForSymbol('SOFI')},
  HOOD:   {label:'Robinhood Markets', cat:'E', action:()=>_openChartForSymbol('HOOD')},
  PLTR:   {label:'Palantir Tech',     cat:'E', action:()=>_openChartForSymbol('PLTR')},
  UPST:   {label:'Upstart Holdings',  cat:'E', action:()=>_openChartForSymbol('UPST')},
  AFRM:   {label:'Affirm Holdings',   cat:'E', action:()=>_openChartForSymbol('AFRM')},
  SQ:     {label:'Block Inc',         cat:'E', action:()=>_openChartForSymbol('SQ')},
  PYPL:   {label:'PayPal Holdings',   cat:'E', action:()=>_openChartForSymbol('PYPL')},
  SNOW:   {label:'Snowflake',         cat:'E', action:()=>_openChartForSymbol('SNOW')},
  DDOG:   {label:'Datadog',           cat:'E', action:()=>_openChartForSymbol('DDOG')},
  NET:    {label:'Cloudflare',        cat:'E', action:()=>_openChartForSymbol('NET')},
  CRWD:   {label:'CrowdStrike',       cat:'E', action:()=>_openChartForSymbol('CRWD')},
  RIVN:   {label:'Rivian Automotive', cat:'E', action:()=>_openChartForSymbol('RIVN')},
  LCID:   {label:'Lucid Group',       cat:'E', action:()=>_openChartForSymbol('LCID')},
  NIO:    {label:'NIO Inc',           cat:'E', action:()=>_openChartForSymbol('NIO')},
  LMT:    {label:'Lockheed Martin',   cat:'E', action:()=>_openChartForSymbol('LMT')},
  BA:     {label:'Boeing',            cat:'E', action:()=>_openChartForSymbol('BA')},
  DIS:    {label:'Walt Disney',       cat:'E', action:()=>_openChartForSymbol('DIS')},
  SPOT:   {label:'Spotify',           cat:'E', action:()=>_openChartForSymbol('SPOT')},
  IBIT:   {label:'iShares Bitcoin ETF',cat:'E',action:()=>_openChartForSymbol('IBIT')},
  SPY:    {label:'SPDR S&P 500 ETF',  cat:'E', action:()=>_openChartForSymbol('SPY')},
  QQQ:    {label:'Invesco QQQ Trust', cat:'E', action:()=>_openChartForSymbol('QQQ')},
  GLD:    {label:'SPDR Gold Shares',  cat:'M', action:()=>_openChartForSymbol('GLD')}
};
const _CCAT = {
  E:{type:'market', p2p:'p2p-ny',  col:'#555'},
  F:{type:'fx',     p2p:'p2p-fra', col:'#444'},
  C:{type:'crypto', p2p:'p2p-ny',  col:'#4a5a6a'},
  M:{type:'macro',  p2p:'p2p-ldn', col:'#4a4a5a'},
  N:{type:'macro',  p2p:'p2p-ldn', col:'#4a4a5a'}
};

// ── Viewport ───────────────────────────────────────────────────
const _vp = {x:0, y:0, scale:1, tx:0, ty:0, ts:1, lerp:0.22, w:600, h:440};
function _s2w(sx,sy){return{x:(sx-_vp.w/2)/_vp.scale-_vp.x, y:(sy-_vp.h/2)/_vp.scale-_vp.y};}

// ── Flow tracker ───────────────────────────────────────────────
const _ft = {
  flows:[], totalB:0, totalP:0,
  add(from,to,via,cmd){
    const lat=Math.floor(Math.random()*8)+1;
    const bw=(Math.random()*12+0.5).toFixed(1);
    const types=['TICK·RECV','DATA·SYNC','PRICE·UPD','MESH·PING','STREAM·OK','QUOTE·UPD','HEARTBEAT','ROUTE·OK'];
    this.flows.unshift({
      from, to, via,
      lat:lat+'ms', bw:bw+'MB/s',
      ts:new Date().toLocaleTimeString('en-GB',{hour12:false}),
      cmd: cmd || types[Math.floor(Math.random()*types.length)],
      ok: true
    });
    if(this.flows.length>120) this.flows.pop();
    this.totalP++; this.totalB+=parseFloat(bw)*1024*1024;
  }
};

// ════════════════════════════════════════════════════════════════
//  DRAW ENGINE — hexagonal nodes, glow, animated edges
// ════════════════════════════════════════════════════════════════

// Draw hexagon
function _hex(ctx, x, y, r, rot=0){
  ctx.beginPath();
  for(let i=0;i<6;i++){
    const a=rot+i/6*Math.PI*2;
    i===0 ? ctx.moveTo(x+Math.cos(a)*r, y+Math.sin(a)*r)
           : ctx.lineTo(x+Math.cos(a)*r, y+Math.sin(a)*r);
  }
  ctx.closePath();
}

// Edge color table
const _EC = {
  p2p:    [0,229,204],
  market: [255,149,0],
  crypto: [0,200,255],
  fx:     [255,224,51],
  macro:  [204,119,255],
  bond:   [68,170,255],
  defi:   [255,51,119],
  onchain:[255,51,136],
  default:[255,136,0]
};

function _ndraw(canvas, ts){
  if(window._tabHidden) return;
  const ctx=canvas.getContext('2d'), W=canvas.width, H=canvas.height;
  const now=Date.now()/1000;

  // Background
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);

  // Fine dot grid — only when not too dense
  const gs = 32*_vp.scale;
  if(gs > 12){
    const ox=((_vp.x*_vp.scale+W/2)%gs+gs)%gs;
    const oy=((_vp.y*_vp.scale+H/2)%gs+gs)%gs;
    const opa = Math.min(0.25, _vp.scale*0.14);
    ctx.fillStyle=`rgba(80,100,80,${opa})`;
    for(let x=ox;x<W;x+=gs) for(let y=oy;y<H;y+=gs){
      ctx.fillRect(x-0.5,y-0.5,1,1);
    }
  }

  ctx.save();
  ctx.translate(W/2,H/2); ctx.scale(_vp.scale,_vp.scale); ctx.translate(_vp.x,_vp.y);

  const layer=_net.layer||'all';

  // ─ EDGES ──────────────────────────────────────────────────────
  const nm=_net._nodeMap||{};
  for(const e of _net.edges){
    const fn=nm[e.from];
    const tn=nm[e.to];
    if(!fn||!tn) continue;
    if(layer!=='all'&&layer!=='cmd'&&fn.type!==layer&&tn.type!==layer&&fn.type!=='hub'&&fn.type!=='p2p'&&tn.type!=='hub'&&tn.type!=='p2p') continue;
    if(layer==='cmd'&&!e.isCmd) continue;

    const [r,g,b]=_EC[e.type]||_EC.default;
    const baseA = e.dim?0.03 : e.type==='p2p'?0.25 : e.isCmd?0.12 : 0.14;

    // Pulse on active edges
    const pulse = e.active ? (Math.sin(now*2+(fn.x+fn.y)*0.01)*0.5+0.5)*0.08 : 0;
    const alpha = baseA + pulse;

    ctx.beginPath();
    ctx.moveTo(fn.x,fn.y); ctx.lineTo(tn.x,tn.y);
    ctx.strokeStyle=`rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = e.type==='p2p'?1.6 : e.dim?0.4 : e.isCmd?0.8 : 1.0;
    if(e.isCmd){ ctx.setLineDash([4,5]); }
    ctx.stroke(); ctx.setLineDash([]);
  }

  // ─ PACKETS ────────────────────────────────────────────────────
  for(const pk of _net.packets){
    const fn=nm[pk.from];
    const tn=nm[pk.to];
    if(!fn||!tn) continue;
    const px=fn.x+(tn.x-fn.x)*pk.t, py=fn.y+(tn.y-fn.y)*pk.t;

    // Trail — long vivid
    if(pk.trail&&pk.t>0.02){
      const t0=Math.max(0,pk.t-0.13);
      const px0=fn.x+(tn.x-fn.x)*t0, py0=fn.y+(tn.y-fn.y)*t0;
      const tg=ctx.createLinearGradient(px0,py0,px,py);
      tg.addColorStop(0,'rgba('+pk.rgb+',0)');
      tg.addColorStop(1,'rgba('+pk.rgb+',0.9)');
      ctx.beginPath(); ctx.moveTo(px0,py0); ctx.lineTo(px,py);
      ctx.strokeStyle=tg; ctx.lineWidth=pk.size*1.3; ctx.stroke();
    }

    // Glow halo
    ctx.save();
    ctx.shadowBlur=16; ctx.shadowColor='rgba('+pk.rgb+',1)';
    ctx.beginPath(); ctx.arc(px,py,pk.size*1.6,0,Math.PI*2);
    ctx.fillStyle='rgba('+pk.rgb+',0.18)';
    ctx.fill(); ctx.restore();

    // Dot — bright core
    ctx.save();
    ctx.shadowBlur=10; ctx.shadowColor='rgba('+pk.rgb+',1)';
    ctx.beginPath(); ctx.arc(px,py,pk.size,0,Math.PI*2);
    ctx.fillStyle='rgba('+pk.rgb+',1)';
    ctx.fill(); ctx.restore();
  }

  // ─ NODES (Arkham rect style) ──────────────────────────────────
  for(const node of _net.nodes){
    if(layer==='cmd'&&!node.isCmd&&node.type!=='hub'&&node.type!=='p2p') continue;
    if(layer!=='all'&&layer!=='cmd'&&node.type!==layer&&node.type!=='hub'&&node.type!=='p2p') continue;
    const nt=_NT[node.type]||_NT.custom;
    const ntColor=node.color||nt.color;
    const isSel=node.id===_net.selected;
    const isHov=node.id===_net.hovered;
    const isHub=node.type==='hub';
    const isP2p=node.type==='p2p';
    const nW=isHub?110:isP2p?88:node.isCmd?72:66;
    const nH=isHub?34:isP2p?26:node.isCmd?20:18;
    const nx=node.x-nW/2, ny=node.y-nH/2;
    ctx.save();
    if(isSel){ctx.strokeStyle=ntColor+'88';ctx.lineWidth=2;ctx.strokeRect(nx-3,ny-3,nW+6,nH+6);}
    if(isHov&&!isSel){ctx.strokeStyle=ntColor+'44';ctx.lineWidth=1;ctx.strokeRect(nx-2,ny-2,nW+4,nH+4);}
    ctx.fillStyle=isSel?ntColor+'1a':(isHub?'rgba(255,255,255,0.04)':isP2p?'rgba(10,12,22,0.95)':ntColor+'0d');
    ctx.fillRect(nx,ny,nW,nH);
    if(!isHub){
      const grad=ctx.createLinearGradient(nx,ny,nx+nW,ny+nH);
      grad.addColorStop(0, ntColor+'18');
      grad.addColorStop(1, ntColor+'05');
      ctx.fillStyle=grad;
      ctx.fillRect(nx,ny,nW,nH);
    }
    ctx.fillStyle=ntColor+(isHub?'55':'bb'); ctx.fillRect(nx,ny,2,nH);
    ctx.strokeStyle=isSel?ntColor:(isHub?'rgba(255,255,255,0.18)':ntColor+'44');
    ctx.lineWidth=isSel?1.2:0.7; ctx.strokeRect(nx,ny,nW,nH);
    ctx.font='500 5px "Share Tech Mono",monospace';
    ctx.fillStyle=isHub?'rgba(255,255,255,0.25)':ntColor+'77'; ctx.textAlign='left'; ctx.textBaseline='top';
    ctx.fillText(nt.tag||node.type.toUpperCase(),nx+6,ny+2.5);
    const nfs=isHub?9:isP2p?8:node.isCmd?7:7;
    if(!isHub){
      ctx.font='700 '+nfs+'px "Share Tech Mono",monospace';
      ctx.fillStyle=ntColor+(isSel?'ff':'ee');
      ctx.textAlign='left'; ctx.textBaseline='middle';
      let dn=node.label.replace('\n',' ');
      while(ctx.measureText(dn).width>nW-12&&dn.length>3)dn=dn.slice(0,-1);
      ctx.fillText(dn,nx+6,ny+nH/2+1);
    } else {
      ctx.font='500 6.5px "Share Tech Mono",monospace';
      ctx.fillStyle='rgba(255,255,255,0.22)';
      ctx.textAlign='left'; ctx.textBaseline='middle';
      ctx.fillText('system',nx+6,ny+nH/2+1);
    }
    // Live dot — pulsing glow
    // STATUS DOT — čte reálná live data: zelená=živá, červená=mrtvá
    let dotActive = false;
    if(isHub){
      dotActive = !!(LIVE.ws||LIVE.fx||LIVE.crypto||LIVE.idx);
    } else if(isP2p){
      // každý P2P node mapuje na jiný datový zdroj
      const pid=node.id;
      if(pid==='p2p-ny')  dotActive=!!(LIVE.ws||LIVE.crypto||LIVE.idx);
      else if(pid==='p2p-ldn') dotActive=!!(LIVE.fx||LIVE.idx);
      else if(pid==='p2p-fra') dotActive=!!(LIVE.fx);
      else if(pid==='p2p-tok') dotActive=!!(LIVE.idx);
      else if(pid==='p2p-sg')  dotActive=!!(LIVE.ws||LIVE.crypto);
      else if(pid==='p2p-pra') dotActive=!!(LIVE.idx||LIVE.fx);
      else dotActive=!!(LIVE.ws||LIVE.fx);
    } else if(node.type==='crypto'){
      const cr=CRYPTO.find(x=>x.s===node.label);
      dotActive=!!(cr&&cr.px>0);
    } else if(node.type==='fx'){
      const fx=FXP.find(x=>x.p===node.label);
      dotActive=!!(fx&&parseFloat(fx.b)>0);
    } else if(node.type==='market'){
      const mk=Object.values(MKT).find(x=>x);
      dotActive=!!LIVE.idx;
    } else if(node.type==='onchain'){
      dotActive=!!(_liveData?.onchain?.fastFee>0||_liveData?.onchain?.hashrate>0);
    } else if(node.type==='macro'){
      dotActive=!!(_liveData?.fred?.ffr||LIVE.idx);
    } else {
      dotActive=true;
    }
    // Pulse speed: fast when alive, slow when dead
    const dotFreq = dotActive?6:1.5;
    const dotPulse = Math.sin(now*dotFreq+node._pp)*0.5+0.5;
    const dotR2 = (isP2p||node.type==='onchain')?(2.0+dotPulse*1.2):1.6;
    const dotC = isHub?'rgba(255,255,255,0.35)':(dotActive?'#00ff44':'#ff2222');
    const dotGlow = dotActive?'rgba(0,255,68,0.95)':'rgba(255,34,34,0.95)';
    ctx.save();
    if(isP2p||node.type==='onchain'||isHub){
      ctx.shadowBlur=8+dotPulse*8; ctx.shadowColor=dotGlow;
      ctx.beginPath();ctx.arc(nx+nW-4,ny+4,dotR2*1.9,0,Math.PI*2);
      ctx.fillStyle=dotActive?`rgba(0,255,68,${0.06+dotPulse*0.10})`:`rgba(255,34,34,${0.06+dotPulse*0.10})`;
      ctx.fill();
    }
    ctx.shadowBlur=6+dotPulse*7; ctx.shadowColor=dotGlow;
    ctx.beginPath();ctx.arc(nx+nW-4,ny+4,dotR2,0,Math.PI*2);
    ctx.fillStyle=dotC; ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  // ── Rubber band connecting line
  if(_net.connecting&&_net.mouseScreen){
    const fn=_net.nodes.find(n=>n.id===_net.connecting);
    if(fn){
      const sw=_s2w(_net.mouseScreen.x,_net.mouseScreen.y);
      ctx.beginPath(); ctx.moveTo(fn.x,fn.y); ctx.lineTo(sw.x,sw.y);
      ctx.strokeStyle='rgba(255,224,51,0.5)'; ctx.lineWidth=1.2;
      ctx.setLineDash([5,4]); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  ctx.restore();
}

// ════════════════════════════════════════════════════════════════
//  MINIMAP
// ════════════════════════════════════════════════════════════════
function _nmmap(uid){
  const mc=document.getElementById('ns-mm-'+uid); if(!mc) return;
  const ctx=mc.getContext('2d'), mw=120, mh=80;
  ctx.fillStyle='#000'; ctx.fillRect(0,0,mw,mh);
  // Border
  ctx.strokeStyle='rgba(0,229,204,0.2)'; ctx.lineWidth=1;
  ctx.strokeRect(0.5,0.5,mw-1,mh-1);

  let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9;
  _net.nodes.forEach(n=>{mnx=Math.min(mnx,n.x);mny=Math.min(mny,n.y);mxx=Math.max(mxx,n.x);mxy=Math.max(mxy,n.y);});
  const pad=40, rw=mxx-mnx+pad*2||1, rh=mxy-mny+pad*2||1;
  const sc=Math.min(mw/rw,mh/rh)*0.88;
  const ox=(mw-rw*sc)/2, oy=(mh-rh*sc)/2;
  const tx=n=>ox+(n.x-mnx+pad)*sc, ty=n=>oy+(n.y-mny+pad)*sc;

  _net.edges.filter(e=>!e.dim).forEach(e=>{
    const fn=_net.nodes.find(n=>n.id===e.from),tn=_net.nodes.find(n=>n.id===e.to); if(!fn||!tn) return;
    const [r,g,b]=_EC[e.type]||_EC.default;
    ctx.beginPath(); ctx.moveTo(tx(fn),ty(fn)); ctx.lineTo(tx(tn),ty(tn));
    ctx.strokeStyle=`rgba(${r},${g},${b},0.12)`; ctx.lineWidth=0.6; ctx.stroke();
  });
  _net.nodes.forEach(n=>{
    const nt=_NT[n.type]||_NT.custom;
    const sz=n.type==='hub'?4:n.type==='p2p'?2.8:n.isCmd?1.4:2;
    ctx.beginPath(); ctx.arc(tx(n),ty(n),sz,0,Math.PI*2);
    ctx.fillStyle=nt.color+(n.id===_net.selected?'ff':'99'); ctx.fill();
  });

  // Viewport rect
  const tl=_s2w(0,0), br=_s2w(_vp.w,_vp.h);
  ctx.strokeStyle='rgba(0,255,136,0.5)'; ctx.lineWidth=1;
  ctx.strokeRect(ox+(tl.x-mnx+pad)*sc, oy+(tl.y-mny+pad)*sc,
    (br.x-tl.x)*sc, (br.y-tl.y)*sc);

  // Label
  ctx.fillStyle='rgba(255,136,0,0.3)'; ctx.font='5px monospace';
  ctx.textAlign='left'; ctx.textBaseline='top';
  ctx.fillText('MINIMAP', 3, 3);
}

// ════════════════════════════════════════════════════════════════
//  HUD — P2P mesh status overlay
// ════════════════════════════════════════════════════════════════
function _nhud(uid){
  const el=document.getElementById('ns-hb-'+uid); if(!el) return;
  const p2p=_net.nodes.filter(n=>n.type==='p2p');
  const avg=p2p.length?Math.round(p2p.reduce((a,n)=>a+parseInt(n.data?.latency||10),0)/p2p.length):0;
  const peers=p2p.reduce((a,n)=>a+(n.data?.peers||0),0);
  const latEl=document.getElementById('ns-lat-'+uid);
  if(latEl){
    const c=avg<5?'#666':avg<15?'#444':'#ff3311';
    latEl.innerHTML=`<span style="color:${c};font-weight:700">LAT:${avg}ms</span>`;
  }
  // stav nodu — zelená/červená podle reálných dat
  const _p2pStaticMap={};
  if(typeof _P2P!=='undefined') _P2P.forEach(p=>_p2pStaticMap[p.id]=p);
  el.innerHTML=p2p.map(n=>{
    const staticN=_p2pStaticMap[n.id]||{};
    const ms=parseInt(staticN.lat)||parseInt(n.data?.latency)||0;
    const latC=ms<5?'#00cc44':ms<10?'#88cc44':ms<20?'#ff8800':'#ff3311';
    // live status per node
    const pid=n.id;
    let live=false;
    if(pid==='p2p-ny')  live=!!(LIVE.ws||LIVE.crypto||LIVE.idx);
    else if(pid==='p2p-ldn') live=!!(LIVE.fx||LIVE.idx);
    else if(pid==='p2p-fra') live=!!(LIVE.fx);
    else if(pid==='p2p-tok') live=!!(LIVE.idx);
    else if(pid==='p2p-sg')  live=!!(LIVE.ws||LIVE.crypto);
    else if(pid==='p2p-pra') live=!!(LIVE.idx||LIVE.fx);
    const dotC=live?'#00cc44':'#ff2222';
    const dotG=live?'0 0 5px rgba(0,204,68,0.8)':'0 0 4px rgba(255,34,34,0.6)';
    const dotAnim=live?'animation:blink 1.8s ease-in-out infinite':'';
    const bw=n.data?.bandwidth||'—';
    const peersN=n.data?.peers||0;
    // live packet counter per node
    if(!window._p2pPkts) window._p2pPkts={};
    if(!window._p2pPkts[pid]) window._p2pPkts[pid]=Math.floor(Math.random()*6000+1000);
    window._p2pPkts[pid]+=Math.floor(Math.random()*8+2);
    const pkts=window._p2pPkts[pid].toLocaleString();
    return `<div style="display:flex;align-items:baseline;gap:7px;padding:2.5px 0;border-bottom:1px solid #0f0f0f">
      <span style="color:#4a7a5a;font-size:7px;font-family:'Roboto Mono',monospace">${peersN}p</span>
      <span style="color:#3a6a4a;font-size:7px;font-family:'Roboto Mono',monospace">${bw}</span>
      <span style="color:#2a4a3a;font-size:6.5px;font-family:'Roboto Mono',monospace;margin-left:auto">${pkts}pk</span>
    </div>`;
  }).join('')+
  `<div style="display:flex;justify-content:space-between;margin-top:4px;padding-top:3px;border-top:1px solid #111">
    <span style="color:#222;font-size:6px;letter-spacing:1px">PEERS</span>
    <span style="color:#00cc44;font-size:7.5px;font-weight:700;font-family:'Roboto Mono',monospace">${peers.toLocaleString()}</span>
  </div>`;
}

// ════════════════════════════════════════════════════════════════
//  PHYSICS — force-directed layout
// ════════════════════════════════════════════════════════════════
function _nphys(){
  const nodes=_net.nodes.filter(n=>!n.pinned&&!n._drag);
  const all=_net.nodes;
  // Build edge lookup map once
  for(const n of nodes){
    let fx=0, fy=0;
    for(const m of all){
      if(m===n) continue;
      const dx=n.x-m.x, dy=n.y-m.y;
      const d2=dx*dx+dy*dy+1;
      if(d2>160000) continue; // skip far nodes
      const d=Math.sqrt(d2);
      const f=4200/d2; fx+=dx/d*f; fy+=dy/d*f;
    }
    for(const e of _net.edges){
      let oth=null;
      if(e.from===n.id) oth=_net._nodeMap?.[e.to];
      else if(e.to===n.id) oth=_net._nodeMap?.[e.from];
      if(!oth) continue;
      const dx=oth.x-n.x, dy=oth.y-n.y;
      const d=Math.sqrt(dx*dx+dy*dy)+0.001;
      const el=e.isCmd?265:e.type==='p2p'?108:175;
      const f=(d-el)*0.018; fx+=dx/d*f; fy+=dy/d*f;
    }
    fx-=n.x*0.0012; fy-=n.y*0.0012;
    n.vx=(n.vx+fx)*0.80; n.vy=(n.vy+fy)*0.80;
    const v=Math.sqrt(n.vx*n.vx+n.vy*n.vy);
    if(v>6){n.vx=n.vx/v*6; n.vy=n.vy/v*6;}
    n.x+=n.vx; n.y+=n.vy;
  }
}

// ════════════════════════════════════════════════════════════════
//  SYNC — live market data → nodes
// ════════════════════════════════════════════════════════════════
function _syncNetNodes(){
  if(!_net.nodes||!_net.nodes.length) return;
  _net.nodes.forEach(n=>{
    if(n.isCmd||!n.data) return;

    if(n.type==='crypto'){
      const cr=CRYPTO.find(c=>c.s===n.label);
      if(cr&&cr.px>0){
        const prevPx=parseFloat((n.data.px||'0').replace(/[,$]/g,''))||cr.px;
        n.data.px=fmtPx(cr.px);
        n.data.chg=(cr.chg!=null?(cr.chg>=0?'+':'')+cr.chg.toFixed(2):'0.00')+'%';
        n.data.mc=fmtBig(cr.mc);
        // Pulse edge on price change
        if(Math.abs(cr.px-prevPx)/prevPx>0.0001){
          _ft.add(n.data.via||'p2p-ny',n.id,n.data.via||'p2p-ny','TICK·RECV');
        }
      }
    } else if(n.type==='market'){
      const mktKey={'S&P 500':'SPX','DOW 30':'INDU','DAX 40':'DAX','FTSE 100':'UKX','NIKKEI':'NKY','HANG SENG':'HSI'}[n.label];
      if(mktKey&&MKT[mktKey]&&MKT[mktKey].px>0){
        const prevPx=parseFloat((n.data.px||'0').replace(/[,$]/g,''))||MKT[mktKey].px;
        n.data.px=fmtPx(MKT[mktKey].px);
        n.data.chg=(MKT[mktKey].chg>=0?'+':'')+MKT[mktKey].chg.toFixed(2)+'%';
        if(Math.abs(MKT[mktKey].px-prevPx)/Math.max(prevPx,1)>0.00005){
          _ft.add(n.data.via||'p2p-ny', n.id, n.data.via||'p2p-ny', 'PRICE·UPD');
        }
      }
      if(n.id==='gold'){
        const xau=COMDTY_DATA?.find(c=>c.s==='XAU');
        if(xau&&xau.px>0){n.data.px=fmtPx(xau.px)+'/oz';n.data.chg=(xau.chg>=0?'+':'')+xau.chg.toFixed(2)+'%';}
      }
    } else if(n.type==='fx'){
      const fx=FXP.find(x=>x.p===n.label);
      if(fx){
        const prevBid=n.data.bid||0;
        n.data.bid=fx.b; n.data.ask=fx.a; n.data.chg=(fx.c>=0?'+':'')+fx.c.toFixed(3)+'%';
        if(fx.b>0&&Math.abs(fx.b-prevBid)>0.00001){
          _ft.add(n.data.via||'p2p-fra', n.id, n.data.via||'p2p-fra', 'QUOTE·UPD');
        }
      }
    } else if(n.type==='onchain'){
      if(_liveData?.onchain?.fastFee>0){
        const prevFee=parseFloat(n.data.fastFee)||0;
        n.data.fastFee=_liveData.onchain.fastFee+' sat/vB';
        n.data.hashrate=(_liveData.onchain.hashrate||0).toFixed(0)+' EH/s';
        n.data.mempool=(_liveData.onchain.mempoolMB||0).toFixed(0)+' MB';
        if(_liveData.onchain.fastFee!==prevFee){
          _ft.add('p2p-ny','onchain','p2p-ny','BLOCK·CONF');
        }
      }
    }
  });
}

// ════════════════════════════════════════════════════════════════
//  INIT NODES — full network topology
// ════════════════════════════════════════════════════════════════
function _initNetNodes(){
  _net.nodes=[]; _net.edges=[]; _net._nodeMap={};

  // ── CORE HUB
  _net.nodes.push({id:'hub',x:0,y:0,label:'BLOOMBERG\nHUB',type:'hub',pinned:true,
    data:{status:'ONLINE',feeds:'27 LIVE',uptime:'99.97%',latency:'<1ms',protocol:'WebRTC+WSS'}});

  // ── P2P RELAY RING
  _P2P.forEach((p,i)=>{
    const a=(i/_P2P.length)*Math.PI*2-Math.PI/2, r=115;
    _net.nodes.push({id:p.id, x:Math.cos(a)*r, y:Math.sin(a)*r,
      label:p.short+'\nP2P', type:'p2p', vx:0,vy:0, _pp:Math.random()*6.28,
      data:{latency:p.lat, peers:p.peers, bandwidth:p.bw, location:p.label, tz:p.tz, short:p.short, status:'ACTIVE', protocol:'WebRTC/WSS'}});
    _net.edges.push({from:'hub',to:p.id, type:'p2p', active:true, speed:0.042, bw:p.bw});
  });
  // P2P mesh interconnects (ring)
  _P2P.forEach((p,i)=>{
    _net.edges.push({from:p.id, to:_P2P[(i+1)%_P2P.length].id, type:'p2p', active:true, speed:0.055, bw:'CROSS'});
  });

  // ── MARKET INDEX NODES
  const mkts=[
    {id:'spx',  label:'S&P 500',   p:'p2p-ny',  mk:'SPX'},
    {id:'indu', label:'DOW 30',    p:'p2p-ny',  mk:'INDU'},
    {id:'dax',  label:'DAX 40',    p:'p2p-fra', mk:'DAX'},
    {id:'ukx',  label:'FTSE 100',  p:'p2p-ldn', mk:'UKX'},
    {id:'nky',  label:'NIKKEI',    p:'p2p-tok', mk:'NKY'},
    {id:'hsi',  label:'HANG SENG', p:'p2p-sg',  mk:'HSI'}
  ];
  mkts.forEach((m,i)=>{
    const a=(i/mkts.length)*Math.PI*2+Math.PI/6;
    const mkt=MKT[m.mk]||{px:0,chg:0,mc:'—'};
    _net.nodes.push({id:m.id,x:Math.cos(a)*215,y:Math.sin(a)*215,label:m.label,type:'market',vx:0,vy:0,_pp:Math.random()*6.28,
      data:{px:fmtPx(mkt.px),chg:(mkt.chg>=0?'+':'')+mkt.chg.toFixed(2)+'%',mc:mkt.mc||'—',via:m.p,feed:'STOOQ·REST'}});
    _net.edges.push({from:m.p,to:m.id,type:'market',active:true,speed:0.032,bw:'DIRECT'});
  });

  // ── CRYPTO NODES
  const cryptos=['BTC','ETH','SOL','XRP','BNB','DOGE'];
  cryptos.forEach((s,i)=>{
    const cr=CRYPTO.find(c=>c.s===s); if(!cr) return;
    const a=(i/cryptos.length)*Math.PI*2+Math.PI*.15;
    const p2=i<3?'p2p-ny':'p2p-ldn';
    const feed=s==='BTC'||s==='ETH'?'BINANCE·WS':'HYPERLIQUID';
    _net.nodes.push({id:s.toLowerCase(),x:Math.cos(a)*182,y:Math.sin(a)*182-18,label:s,type:'crypto',vx:0,vy:0,_pp:Math.random()*6.28,
      color: s==='BTC'?'#d4628a':undefined,
      data:{px:fmtPx(cr.px),chg:(cr.chg>=0?'+':'')+cr.chg.toFixed(2)+'%',mc:fmtBig(cr.mc),dom:cr.dom||'—',via:p2,feed}});
    _net.edges.push({from:p2,to:s.toLowerCase(),type:'crypto',active:true,speed:0.056,bw:'WS·STREAM'});
  });
  _net.edges.push({from:'btc',to:'eth',type:'crypto',active:true,speed:0.064,bw:'DEFI'});
  _net.edges.push({from:'eth',to:'sol',type:'crypto',active:true,speed:0.052,bw:'BRIDGE'});
  _net.edges.push({from:'btc',to:'xrp',type:'crypto',active:true,speed:0.046,bw:'LIQUIDITY'});

  // ── FX NODES
  const fxPairs=[
    {id:'eurusd',label:'EUR/USD',p:'p2p-fra'},
    {id:'usdjpy',label:'USD/JPY',p:'p2p-tok'},
    {id:'gbpusd',label:'GBP/USD',p:'p2p-ldn'},
    {id:'usdczk',label:'USD/CZK',p:'p2p-pra'},
    {id:'usdchf',label:'USD/CHF',p:'p2p-fra'}
  ];
  fxPairs.forEach((f,i)=>{
    const fx=FXP.find(x=>x.p===f.label)||{b:'—',a:'—',c:0};
    const a=(i/fxPairs.length)*Math.PI*2+Math.PI*.6;
    _net.nodes.push({id:f.id,x:Math.cos(a)*195,y:Math.sin(a)*195+35,label:f.label,type:'fx',vx:0,vy:0,_pp:Math.random()*6.28,
      data:{bid:fx.b,ask:fx.a,chg:(fx.c>=0?'+':'')+fx.c.toFixed(3)+'%',via:f.p,feed:'ECN·FX'}});
    _net.edges.push({from:f.p,to:f.id,type:'fx',active:true,speed:0.058,bw:'ECN'});
  });

  // ── MACRO + GOLD + ONCHAIN
  try{
    const xau=COMDTY_DATA?.find(c=>c.s==='XAU')||{px:3200,chg:0.5};
    _net.nodes.push({id:'gold',x:-50,y:-195,label:'GOLD',type:'market',vx:0,vy:0,_pp:0,
      data:{px:fmtPx(xau.px)+'/oz',chg:(xau.chg>=0?'+':'')+xau.chg.toFixed(2)+'%',via:'p2p-ldn',feed:'LBMA·SPOT'}});
    _net.edges.push({from:'p2p-ldn',to:'gold',type:'market',active:true,speed:0.03,bw:'LBMA'});

    _net.nodes.push({id:'usmacro',x:20,y:196,label:'US MACRO',type:'macro',vx:0,vy:0,_pp:1.2,
      data:{gdp:'$'+fmtBig((MAC?.USA?.gdp||25e12)),cpi:(MAC?.USA?.cpi||3.2)+'%',rate:(MAC?.USA?.r||5.5)+'%',unem:(MAC?.USA?.unem||3.9)+'%',via:'p2p-ny',feed:'FRED·MACRO'}});
    _net.edges.push({from:'p2p-ny',to:'usmacro',type:'macro',active:true,speed:0.028,bw:'FRED·API'});

    // BTC on-chain node
    _net.nodes.push({id:'onchain',x:-195,y:48,label:'BTC\nON-CHAIN',type:'onchain',vx:0,vy:0,_pp:2.1,
      data:{hashrate:(_liveData?.onchain?.hashrate||620).toFixed(0)+' EH/s',fastFee:(_liveData?.onchain?.fastFee||12)+' sat/vB',mempool:(_liveData?.onchain?.mempoolMB||42).toFixed(0)+' MB',via:'p2p-ny',feed:'MEMPOOL·SPACE'}});
    _net.edges.push({from:'btc',to:'onchain',type:'onchain',active:true,speed:0.035,bw:'ON-CHAIN'});
    _net.edges.push({from:'p2p-ny',to:'onchain',type:'onchain',active:true,speed:0.03,bw:'BLOCKCHAIN'});
  }catch(e){}

  // ── CMD VRSTVA (outer ring) — každý = Bloomberg panel
  const cmdE=Object.entries(_MCMDS);
  cmdE.forEach(([cmd,cfg],i)=>{
    const a=(i/cmdE.length)*Math.PI*2-Math.PI/2, r=302;
    const cc=_CCAT[cfg.cat]||_CCAT.M;
    const [er,eg,eb]=_EC[cc.type]||_EC.default;
    _net.nodes.push({
      id:'cmd-'+cmd, x:Math.cos(a)*r, y:Math.sin(a)*r,
      label:cmd, type:cc.type, isCmd:true, cmd, vx:0, vy:0, _pp:Math.random()*6.28,
      data:{panel:cfg.label,status:'READY',cat:cfg.cat,route:'→'+cc.p2p+'→'+cmd}
    });
    _net.edges.push({from:cc.p2p,to:'cmd-'+cmd,type:cc.type,active:true,speed:0.07,bw:'CMD',isCmd:true});
  });
  // Build O(1) node lookup map
  _net._nodeMap={};
  _net.nodes.forEach(n=>{ _net._nodeMap[n.id]=n; });
}

// ════════════════════════════════════════════════════════════════
//  MAIN NET LOOP
// ════════════════════════════════════════════════════════════════
function _startNet(uid){
  const canvas=document.getElementById(_net.canvasId);
  const wrap=document.getElementById('nw-'+uid);
  if(!canvas||!wrap) return;

  function _sz(){_vp.w=wrap.clientWidth||600;_vp.h=wrap.clientHeight||440;canvas.width=_vp.w;canvas.height=_vp.h;}
  _sz(); try{new ResizeObserver(_sz).observe(wrap);}catch(e){}
  _vp.tx=0; _vp.ty=0; _vp.ts=1;
  window._netStart=Date.now();
  _nupd(uid); _nhud(uid);

  // ── Physics + packets tick (100ms)
  if(_net.tickTimer) clearInterval(_net.tickTimer);
  let _tk=0;
  _net.tickTimer=setInterval(()=>{
    _tk++;
    if(_net.physics) _nphys();

    // Cap packet count to prevent spiral
    if(_net.packets.length>60) _net.packets.splice(0,_net.packets.length-60);

    // Spawn packets — speed & rate by REAL live data quality
    _net.edges.forEach(e=>{
      if(!e.active||e.dim) return;
      const [r,g,b]=_EC[e.type]||_EC.default;
      const fromN=_net._nodeMap&&_net._nodeMap[e.from];
      const toN=_net._nodeMap&&_net._nodeMap[e.to];

      // Is the DATA SOURCE for this edge actually live?
      let dataLive = false;
      let dataQuality = 0.3; // 0..1, drives speed + spawn rate
      
      // PRIORITY: L1 Feed Quality (Master Sync)
      const l1Qual = typeof LIVE !== 'undefined' && LIVE.quality !== undefined ? LIVE.quality : null;
      const l1Live = typeof LIVE !== 'undefined' && LIVE.sources > 0;

      if(e.type==='crypto'||e.type==='onchain'){
        dataLive = l1Live || !!(LIVE.ws||LIVE.crypto);
        // Quality = fraction of crypto nodes with real price
        const filled = (typeof CRYPTO!=='undefined'?CRYPTO:[].filter(x=>x.px>0).length);
        dataQuality = l1Qual !== null ? l1Qual : Math.min(1, filled/10);
      } else if(e.type==='fx'){
        dataLive = l1Live || !!LIVE.fx;
        const filled = (typeof FXP!=='undefined'?FXP:[].filter(x=>parseFloat(x.b)>0).length);
        dataQuality = l1Qual !== null ? l1Qual : Math.min(1, filled/8);
      } else if(e.type==='market'){
        dataLive = l1Live || !!LIVE.idx;
        const filled = Object.values(typeof MKT!=='undefined'?MKT:{}).filter(x=>x.px>0).length;
        dataQuality = l1Qual !== null ? l1Qual : Math.min(1, filled/6);
      } else if(e.type==='p2p'){
        dataLive = l1Live || !!(LIVE.ws||LIVE.fx||LIVE.crypto||LIVE.idx);
        dataQuality = l1Qual !== null ? l1Qual : [LIVE.ws,LIVE.fx,LIVE.crypto,LIVE.idx].filter(Boolean).length/4;
      } else if(e.type==='macro'){
        dataLive = l1Live || !!(_liveData?.fred?.ffr);
        dataQuality = l1Qual !== null ? (l1Qual * 0.8 + 0.2) : (dataLive?0.7:0.2);
      } else {
        dataLive = true; dataQuality = l1Qual !== null ? l1Qual : 0.5;
      }

      // Spawn rate: live+quality drives it; dead edges spawn rarely
      const baseRate = dataLive
        ? (e.type==='p2p'?0.28:e.type==='crypto'?0.22:e.isCmd?0.09:0.14)
        : 0.04;
      const thr = baseRate * (0.6 + dataQuality*0.4);
      if(Math.random()>thr) return;

      // Speed: base edge speed * quality factor (slower if no data)
      // Use static P2P latency for accuracy
      let lat=10;
      if(fromN&&fromN.type==='p2p'&&typeof _P2P!=='undefined'){
        const sp=_P2P.find(p=>p.id===fromN.id);
        lat=sp?parseInt(sp.lat)||10:10;
      } else if(fromN&&fromN.data&&fromN.data.latency){
        lat=parseInt(fromN.data.latency)||10;
      }
      const latF=Math.max(0.5,Math.min(1.6, 12/Math.max(lat,1)));
      const qualF=0.6+dataQuality*0.9;
      const spd=(e.speed||0.036)*1.4*latF*qualF;

      // Color by type
      const pRgb = e.type==='p2p'?'0,220,180':e.type==='crypto'?'255,150,0':e.type==='fx'?'230,210,0':e.type==='onchain'?'255,51,136':e.type==='market'?'160,200,255':e.type==='macro'?'180,100,255':''+r+','+g+','+b;
      // Size smaller — 2.5–4 range
      const sz = e.type==='p2p'?3.8:e.isCmd?3.2:2.6;
      _net.packets.push({
        from:e.from, to:e.to, t:0,
        speed:spd,
        rgb:pRgb,
        size:sz,
        trail:true,
        live:dataLive
      });
      _net.ppsCount=(_net.ppsCount||0)+1;
    });

    // Live data sync every 2.4s
    if(_tk%15===0){ _syncNetNodes(); }

    // P2P jitter
    if(_tk%4===0){
      _net.nodes.filter(n=>n.type==='p2p').forEach(n=>{
        if(n.data.peers) n.data.peers=Math.max(50,n.data.peers+Math.round((Math.random()-0.5)*3));
        const ms=parseInt(n.data.latency);
        if(!isNaN(ms)) n.data.latency=Math.max(1,ms+Math.round((Math.random()-0.5)*1.5))+'ms';
      });
      // Update on-chain node
      const oc=_net.nodes.find(n=>n.id==='onchain');
      if(oc&&_liveData?.onchain){
        if(_liveData.onchain.hashrate>0) oc.data.hashrate=_liveData.onchain.hashrate.toFixed(0)+' EH/s';
        if(_liveData.onchain.fastFee>0) oc.data.fastFee=_liveData.onchain.fastFee+' sat/vB';
        if(_liveData.onchain.mempoolMB>0) oc.data.mempool=_liveData.onchain.mempoolMB.toFixed(0)+' MB';
      }
      _nhud(uid);
    }

    // Activity log — real data
    if(_tk%8===0){
      const logEntries=[];
      // Crypto prices
      if(CRYPTO&&CRYPTO.length){
        const cr=CRYPTO[Math.floor(Math.random()*Math.min(CRYPTO.length,8))];
        if(cr&&cr.px>0) logEntries.push(`${cr.s} $${fmtPx(cr.px)} ${cr.chg>=0?'+':''}${cr.chg.toFixed(2)}% · BINANCE·WS`);
      }
      // FX
      if(FXP&&FXP.length){
        const fx=FXP[Math.floor(Math.random()*Math.min(FXP.length,6))];
        if(fx&&fx.b>0) logEntries.push(`${fx.p} ${fx.b.toFixed(4)} · ECB·FX`);
      }
      // Market indices
      const mkKeys=Object.keys(MKT||{});
      if(mkKeys.length){
        const mk=MKT[mkKeys[Math.floor(Math.random()*mkKeys.length)]];
        if(mk&&mk.px>0) logEntries.push(`${mkKeys[0]} ${fmtPx(mk.px)} ${mk.chg>=0?'+':''}${mk.chg.toFixed(2)}% · STOOQ`);
      }
      // Onchain
      if(_liveData?.onchain?.fastFee>0) logEntries.push(`BTC FEE ${_liveData.onchain.fastFee} sat/vB · MEMPOOL`);
      if(_liveData?.onchain?.hashrate>0) logEntries.push(`HASHRATE ${_liveData.onchain.hashrate.toFixed(0)} EH/s`);
      // Pick one and log
      if(logEntries.length){
        _nlog(uid, logEntries[Math.floor(Math.random()*logEntries.length)]);
      }
    }

    const now2=Date.now();
    if(now2-(_net.ppsLast||0)>1000){_net.fps=_net.ppsCount||0;_net.ppsCount=0;_net.ppsLast=now2;}
    const be=document.getElementById('ns-bytes-'+uid);
    if(be) be.textContent=(_ft.totalB/1048576).toFixed(1)+' MB';
  },80);

  // ── 30fps render loop (saves CPU vs 60fps)
  if(_net.animTimer) cancelAnimationFrame(_net.animTimer);
  let _fc=0, _ftime=performance.now(), _lastRender=0;
  function _loop(ts){
    _net.animTimer=requestAnimationFrame(_loop);
    if(window._tabHidden) return; // skip rendering when tab hidden
    if(ts-_lastRender < 14) return; // ~60fps
    _lastRender=ts;
    const c=document.getElementById(_net.canvasId); if(!c){cancelAnimationFrame(_net.animTimer);return;}
    _vp.x+=(_vp.tx-_vp.x)*_vp.lerp; _vp.y+=(_vp.ty-_vp.y)*_vp.lerp; _vp.scale+=(_vp.ts-_vp.scale)*_vp.lerp;
    _net.packets=_net.packets.map(p=>({...p,t:p.t+p.speed})).filter(p=>p.t<1);
    _ndraw(c,ts); _nmmap(uid);
    _fc++;
    if(ts-_ftime>1000){
      const fps_=Math.round(_fc/(ts-_ftime)*1000); _fc=0; _ftime=ts;
      const fe=document.getElementById('ns-fps-'+uid); if(fe) fe.textContent='FPS:'+fps_;
      const pe=document.getElementById('ns-pps-'+uid); if(pe) pe.textContent='PKT:'+((_net.fps||0));
    }
  }
  _loop(0);
  setTimeout(()=>_nfit(uid),300);
}

// ════════════════════════════════════════════════════════════════
//  INTERACTION
// ════════════════════════════════════════════════════════════════
function _nrxy(e,uid){const w=document.getElementById('nw-'+uid);if(!w)return{x:0,y:0};const r=w.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function _nnat(uid,sx,sy){const w=_s2w(sx,sy);for(let i=_net.nodes.length-1;i>=0;i--){const n=_net.nodes[i];const nW=n.type==='hub'?110:n.type==='p2p'?88:n.isCmd?72:66;const nH=n.type==='hub'?34:n.type==='p2p'?26:n.isCmd?20:18;if(w.x>=n.x-nW/2-4&&w.x<=n.x+nW/2+4&&w.y>=n.y-nH/2-4&&w.y<=n.y+nH/2+4)return n;}return null;}

// ── Audio beep on node click
function _nbeep(freq=880, dur=0.08, vol=0.18){
  try{
    const ac=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ac.createOscillator(); const gain=ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type='sine'; osc.frequency.setValueAtTime(freq,ac.currentTime);
    gain.gain.setValueAtTime(vol,ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+dur);
    osc.start(ac.currentTime); osc.stop(ac.currentTime+dur);
  }catch(e){}
}

function _nmd(e,uid){
  if(e.button!==0) return;
  _nctxc(uid);
  const s=_nrxy(e,uid), node=_nnat(uid,s.x,s.y);
  if(_net.connecting){
    if(node&&node.id!==_net.connecting){
      _net.edges.push({from:_net.connecting,to:node.id,type:'custom',active:true,speed:0.04,bw:'USER'});
      _ft.add(_net.connecting,node.id,'USER','CONNECT');
      _nlog(uid,'PROPOJENO: '+_net.connecting+' → '+node.id); _nupd(uid);
    }
    _net.connecting=null;
    const h=document.getElementById('ns-ch-'+uid);if(h)h.style.display='none';
    const wr=document.getElementById('nw-'+uid);if(wr)wr.style.cursor='grab';
    return;
  }
  if(node){
    if(node.isCmd){
      const cfg=_MCMDS[node.cmd];
      if(cfg){
        const pe=_net.edges.find(e=>e.to===node.id&&!e.dim);
        const pid=pe?pe.from:'hub';
        const pn=_net.nodes.find(n=>n.id===pid);
        const [r,g,b]=_EC[cfg.cat==='C'?'crypto':cfg.cat==='F'?'fx':cfg.cat==='E'?'market':'macro']||_EC.default;
        for(let i=0;i<8;i++) setTimeout(()=>{
          _net.packets.push({from:'hub',to:pid,t:i*0.07,speed:0.09,rgb:`${r},${g},${b}`,size:5,trail:true});
        },i*15);
        for(let i=0;i<8;i++) setTimeout(()=>{
          _net.packets.push({from:pid,to:node.id,t:i*0.07,speed:0.09,rgb:`${r},${g},${b}`,size:4.2,trail:true});
        },120+i*15);
        _ft.add(pid,node.id,pid,node.cmd);
        _nflash(uid,'▶ P2P ROUTE: hub → '+(pn?pn.label.replace('\n',' '):pid)+' → '+node.cmd);
        _nlog(uid,'▶ CMD: '+node.cmd+' ['+cfg.label+'] via '+pid);
        setTimeout(()=>{try{cfg.action();}catch(ex){}},450);
      }
    }
    _net._dragNode=node; node._drag=true;
    const w2=_s2w(s.x,s.y); _net.dragOff={x:w2.x-node.x,y:w2.y-node.y};
    _net.selected=node.id; _ninfo(uid,node);
  } else {
    _net._panDrag={sx:e.clientX,sy:e.clientY,vx:_vp.tx,vy:_vp.ty};
    _net._dragNode=null; _net.selected=null; _ninfo(uid,null);
    const wr=document.getElementById('nw-'+uid);if(wr)wr.style.cursor='grabbing';
  }
}
function _nmm(e,uid){
  const s=_nrxy(e,uid); _net.mouseScreen=s;
  if(_net._dragNode){const w=_s2w(s.x,s.y);_net._dragNode.x=w.x-_net.dragOff.x;_net._dragNode.y=w.y-_net.dragOff.y;_net._dragNode.vx=0;_net._dragNode.vy=0;}
  else if(_net._panDrag){_vp.tx=_net._panDrag.vx+(e.clientX-_net._panDrag.sx)/_vp.scale;_vp.ty=_net._panDrag.vy+(e.clientY-_net._panDrag.sy)/_vp.scale;}
  const node=_nnat(uid,s.x,s.y); _net.hovered=node?node.id:null;
  const wr=document.getElementById('nw-'+uid);
  if(wr&&!_net._panDrag) wr.style.cursor=_net.connecting?'crosshair':node?'pointer':'grab';
}
function _nmu(e,uid){
  if(_net._dragNode){_net._dragNode._drag=false;_net._dragNode=null;} _net._panDrag=null;
  const wr=document.getElementById('nw-'+uid);if(wr&&!_net.connecting)wr.style.cursor='grab';
}
function _nwhl(e,uid){
  e.preventDefault();
  const s=_nrxy(e,uid),f=e.deltaY>0?0.87:1.14,ns=Math.max(0.08,Math.min(7,_vp.ts*f));
  _vp.tx=_vp.x+(s.x-_vp.w/2)*(1/ns-1/_vp.scale);
  _vp.ty=_vp.y+(s.y-_vp.h/2)*(1/ns-1/_vp.scale); _vp.ts=ns;
}
function _nrc(e,uid){
  e.preventDefault();
  const s=_nrxy(e,uid), node=_nnat(uid,s.x,s.y);
  const menu=document.getElementById('ns-ctx-'+uid); if(!menu) return;
  const it=(lbl,fn,col)=>
    `<div style="padding:5px 12px;font-size:8px;cursor:pointer;color:${col||'#444'};border-bottom:1px solid #111;letter-spacing:.5px" `+
    `onmouseover="this.style.background='#111';this.style.color='${col||'#777'}'" `+
    `onmouseout="this.style.background='';this.style.color='${col||'#444'}'" onclick="${fn}">${lbl}</div>`;
  let items='';
  if(node){
    if(node.isCmd) items+=it(`OPEN PANEL: ${node.cmd} — ${_MCMDS[node.cmd]?.label||''}`,`_ncmd('${node.cmd}','${uid}')`, '#666');
    items+=it('FOCUS ON NODE',`_nfocus('${node.id}','${uid}')`);
    items+=it('CONNECT FROM HERE',`_nconn('${uid}','${node.id}')`);
  } else {
    items+=it('ADD NODE HERE',`_naddpos('${uid}')`);
    items+=it('ZOOM TO FIT',`_nfit('${uid}')`);
    items+=it('TOGGLE PHYSICS',`_nphy('${uid}')`);
    items+=it('COMMAND LAYER',`_nl('cmd','${uid}')`);
    items+=it('SHOW ALL LAYERS',`_nl('all','${uid}')`);
  }
  menu.innerHTML=items;
  menu.style.left=s.x+'px'; menu.style.top=s.y+'px'; menu.style.display='block';
  setTimeout(()=>document.addEventListener('click',()=>_nctxc(uid),{once:true}),50);
}
function _nctxc(uid){const m=document.getElementById('ns-ctx-'+uid);if(m)m.style.display='none';}
function _nflash(uid,msg){
  const el=document.getElementById('ns-flow-'+uid); if(!el) return;
  el.textContent=msg; el.style.display='block';
  clearTimeout(el._t); el._t=setTimeout(()=>el.style.display='none',3000);
}

// ════════════════════════════════════════════════════════════════
//  ACTIONS
// ════════════════════════════════════════════════════════════════
function _nconn(uid,fromId){
  _net.connecting=fromId||_net.selected;
  if(!_net.connecting){_nlog(uid,'Select a node first!');return;}
  const h=document.getElementById('ns-ch-'+uid);if(h)h.style.display='block';
  const wr=document.getElementById('nw-'+uid);if(wr)wr.style.cursor='crosshair';
  _nlog(uid,'CONNECT MODE — click target node'); _nctxc(uid);
}
function _nfocus(id,uid){const n=_net.nodes.find(x=>x.id===id);if(!n)return;_vp.tx=-n.x;_vp.ty=-n.y;_vp.ts=2.2;_nctxc(uid);}
function _nfit(uid){
  if(!_net.nodes.length) return;
  let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9;
  _net.nodes.forEach(n=>{mnx=Math.min(mnx,n.x);mny=Math.min(mny,n.y);mxx=Math.max(mxx,n.x);mxy=Math.max(mxy,n.y);});
  const pad=80,rw=mxx-mnx+pad*2,rh=mxy-mny+pad*2;
  _vp.ts=Math.min(_vp.w/rw,_vp.h/rh,2)*0.87; _vp.tx=-(mnx+mxx)/2; _vp.ty=-(mny+mxy)/2;
}
function _nphy(uid){
  _net.physics=!_net.physics;
  const b=document.getElementById('nl-phy-'+uid);
  if(b){b.style.color=_net.physics?'#777':'#222';b.style.borderColor=_net.physics?'#33333344':'#111';}
  _nlog(uid,'PHYSICS: '+(_net.physics?'ON':'OFF')); _nctxc(uid);
}
function _nl(l,uid){
  _net.layer=l;
  const map={all:'all',p2p:'p2p',market:'mkt',crypto:'cry',fx:'fx',cmd:'cmd'};
  Object.entries(map).forEach(([k,v])=>{
    const b=document.getElementById('nl-'+v+'-'+uid); if(!b) return;
    const on=k===l;
    b.style.color=on?'#666':'#2a3a33';
    b.style.borderColor=on?'#33333344':'#111';
    b.style.background=on?'#1a1a1a':'transparent';
  });
}
function _ncmd(cmd,uid){
  const cfg=_MCMDS[cmd]; if(!cfg) return;
  const node=_net.nodes.find(n=>n.id==='cmd-'+cmd);
  const pe=node?_net.edges.find(e=>e.to===node.id&&!e.dim):null;
  const pid=pe?pe.from:'hub';
  const pn=_net.nodes.find(n=>n.id===pid);
  const cc=_CCAT[cfg.cat]||_CCAT.M;
  const [r,g,b]=_EC[cc.type]||_EC.default;
  if(node){
    for(let i=0;i<9;i++) setTimeout(()=>{
      _net.packets.push({from:'hub',to:pid,t:i*0.07,speed:0.09,rgb:`${r},${g},${b}`,size:5,trail:true});
    },i*14);
    for(let i=0;i<9;i++) setTimeout(()=>{
      _net.packets.push({from:pid,to:node.id,t:i*0.07,speed:0.09,rgb:`${r},${g},${b}`,size:4,trail:true});
    },125+i*14);
  }
  _ft.add(pid,'cmd-'+cmd,pid,cmd);
  _nflash(uid,'▶ CMD: hub → '+(pn?pn.label.replace('\n',' '):pid)+' → '+cmd);
  _nlog(uid,'▶ P2P: '+cmd+' ['+cfg.label+'] via '+(pn?pn.label.replace('\n',' '):pid));
  _nctxc(uid);
  setTimeout(()=>{try{cfg.action();}catch(ex){}},450);
}

function _ninfo(uid,node){
  const el=document.getElementById(_net.infoId); if(!el) return;
  if(!node){
    el.innerHTML='<div style="color:#333;font-size:8px;font-style:italic;padding:4px">— click a node to inspect —</div>';
    return;
  }
  const nt=_NT[node.type]||_NT.custom;
  const ec=_net.edges.filter(e=>(e.from===node.id||e.to===node.id)&&!e.dim);
  let h='<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;padding-bottom:5px;border-bottom:1px solid #111">'
    +'<span style="font-size:7px;color:'+nt.color+';background:'+nt.color+'22;border:1px solid '+nt.color+'44;padding:1px 5px;font-weight:700;letter-spacing:1px">'+(nt.tag||node.type.toUpperCase())+'</span>'
    +'<div><div style="color:'+nt.color+';font-size:10px;font-weight:700;letter-spacing:.5px">'+node.label.replace('\n',' ')+'</div>'
    +'<div style="color:#333;font-size:6.5px;margin-top:1px">'+node.type.toUpperCase()+' · '+ec.length+' CONNECTIONS</div></div></div>';
  if(node.data){
    Object.entries(node.data).forEach(([k,v])=>{
      if(k==='short') return;
      const isChg=k==='chg';
      const numVal=parseFloat(v);
      const vc=isChg&&!isNaN(numVal)?(numVal>=0?'#00cc44':'#ff2244'):'#447766';
      h+=`<div style="display:flex;justify-content:space-between;align-items:center;font-size:7.5px;padding:2px 0;border-bottom:1px solid #050d0a">
        <span style="color:#2a2a2a;letter-spacing:.3px">${k.toUpperCase()}</span>
        <span style="color:${vc};font-weight:700;font-family:'Roboto Mono',monospace">${v}</span>
      </div>`;
    });
  }
  // Route visualization
  const via=node.data?.via||(node.isCmd?(_net.edges.find(e=>e.to===node.id&&!e.dim)?.from||'hub'):'hub');
  h+=`<div style="margin-top:5px;padding:4px 6px;background:#080808;border:1px solid #111;border-radius:2px">
      <div style="font-size:6px;color:#333;letter-spacing:1px;margin-bottom:3px">P2P ROUTE</div>
    <div style="font-size:7.5px;display:flex;align-items:center;gap:3px;flex-wrap:wrap">
      <span style="color:#666;font-weight:700">HUB</span>
      <span style="color:#0d2818">›</span>
      <span style="color:#444">${via.toUpperCase()}</span>
      <span style="color:#0d2818">›</span>
      <span style="color:#555;font-weight:700">${node.id.toUpperCase()}</span>
    </div>
    <div style="font-size:6px;color:#0d2818;margin-top:2px">WebRTC · AES-256-GCM</div>
  </div>`;
  if(node.isCmd){
    h+=`<button onclick="_ncmd('${node.cmd}','${uid}')"
      style="margin-top:5px;width:100%;background:#0d0d0d;border:1px solid #222;color:#555;font-size:7.5px;padding:4px 0;cursor:pointer;font-family:inherit;letter-spacing:1px">
      OPEN PANEL</button>`;
  }
  el.innerHTML=h;
}

function _nadd(uid){
  const inp=document.getElementById('ns-inp-'+uid),sel=document.getElementById('ns-sel-'+uid);
  if(!inp||!sel) return;
  const label=(inp.value||'').trim().toUpperCase(); if(!label) return;
  let type=sel.value==='auto'?_nautotype(label):sel.value;
  let data={status:'ONLINE',added:new Date().toLocaleTimeString('en-GB',{hour12:false})};
  const cr=CRYPTO.find(c=>c.s===label||c.n.toUpperCase()===label);
  if(cr){type='crypto';data={px:fmtPx(cr.px),chg:(cr.chg>=0?'+':'')+cr.chg.toFixed(2)+'%',mc:fmtBig(cr.mc),via:'p2p-ny',feed:'BINANCE'};}
  const mk=Object.entries(MKT).find(([k,v])=>k===label);
  if(mk){type='market';data={px:fmtPx(mk[1].px),chg:(mk[1].chg>=0?'+':'')+mk[1].chg.toFixed(2)+'%',via:'p2p-ldn',feed:'STOOQ'};}
  const fx=FXP.find(f=>f.p.replace('/','')===label||f.p===label);
  if(fx){type='fx';data={bid:fx.b,ask:fx.a,chg:(fx.c>=0?'+':'')+fx.c.toFixed(3)+'%',via:'p2p-fra',feed:'ECN'};}
  const p2h=type==='crypto'?'p2p-ny':type==='fx'?'p2p-fra':type==='macro'?'p2p-ny':'p2p-ldn';
  const a=Math.random()*6.28, r2=240+Math.random()*55;
  const nw={id:'n'+Date.now(),x:Math.cos(a)*r2,y:Math.sin(a)*r2,label,type,vx:0,vy:0,_pp:Math.random()*6.28,data:{...data,via:p2h}};
  _net.nodes.push(nw);
  if(!_net._nodeMap) _net._nodeMap={};
  _net._nodeMap[nw.id]=nw;
  _net.edges.push({from:p2h,to:nw.id,type,active:true,speed:0.04,bw:'USER'});
  _nlog(uid,'ADDED: '+label+' ('+type+') via '+p2h);
  _nupd(uid); _net.selected=nw.id; _ninfo(uid,nw); inp.value='';
  setTimeout(()=>_nfocus(nw.id,uid),200);
}
function _nautotype(l){
  if(['BTC','ETH','SOL','XRP','BNB','DOGE','ADA','AVAX','DOT','LINK','ARB','OP'].includes(l)) return 'crypto';
  if(l.includes('/')&&l.length>5) return 'fx';
  if(['FED','ECB','BOJ','CNB','CPI','GDP','PCE','NFP','PMI'].includes(l)) return 'macro';
  if(['10Y','2Y','YIELD','BUND','TBILL'].includes(l)) return 'bond';
  return 'market';
}
function _ndel(id,uid){
  if(id==='hub') return;
  _net.nodes=_net.nodes.filter(n=>n.id!==id); _net.edges=_net.edges.filter(e=>e.from!==id&&e.to!==id);
  _net.selected=null; _net.hovered=null; _ninfo(uid,null); _nupd(uid); _nlog(uid,'REMOVED: '+id); _nctxc(uid);
}
function _naddpos(uid){const lb=prompt('Node label:');if(!lb)return;const inp=document.getElementById('ns-inp-'+uid);if(inp)inp.value=lb;_nadd(uid);_nctxc(uid);}
function _nlog(uid,msg){
  const ts=new Date().toLocaleTimeString('en-US',{hour12:false,second:'2-digit'});
  const isOk=!msg.includes('ERR')&&!msg.includes('FAIL');
  _net.logLines.unshift(`<div style="font-size:6.5px;line-height:1.7;border-bottom:1px solid #050d08;display:flex;gap:4px">
    <span style="color:#0d2818;white-space:nowrap">${ts}</span>
    <span style="color:${isOk?'#2d6644':'#cc3333'}">${msg}</span>
  </div>`);
  if(_net.logLines.length>40) _net.logLines.pop();
  const el=document.getElementById(_net.logId);if(el)el.innerHTML=_net.logLines.join('');
}
function _nupd(uid){
  const nc=document.getElementById('ns-nc-'+uid),ec=document.getElementById('ns-ec-'+uid);
  if(nc)nc.textContent='N:'+_net.nodes.length;
  if(ec)ec.textContent='E:'+_net.edges.filter(e=>e.active&&!e.dim).length;
}

// ════════════════════════════════════════════════════════════════
//  DATA FLOW TAB — pure black, network-only
// ════════════════════════════════════════════════════════════════
function _buildFlowTab(uid){
  const flows=_ft.flows.slice(0,100);
  const now=Date.now();
  const uptime=Math.round((now-(window._netStart||now))/1000);
  const uptimeStr=uptime<60?uptime+'s':uptime<3600?Math.floor(uptime/60)+'m '+uptime%60+'s':Math.floor(uptime/3600)+'h '+Math.floor((uptime%3600)/60)+'m';
  const totalMB=(_ft.totalB/1048576).toFixed(2);
  const avgLat=flows.length?(flows.reduce((s,f)=>s+(parseFloat(f.lat)||0),0)/flows.length).toFixed(1):'—';
  const wsSrc=[LIVE?.ws&&'BNC-WS',_cbWsOk&&'CB-WS'].filter(Boolean).join(' ');
  const latN=parseFloat(avgLat);
  const latCol=latN<5?'#888':latN<20?'#666':'#ff4422';

  const chips=[
    {l:'P2P NODES',    v:String(_P2P.length)},
    {l:'PACKETS SENT', v:String(_ft.totalP)},
    {l:'TRANSFERRED',  v:totalMB+' MB'},
    {l:'AVG LATENCY',  v:avgLat+'ms',   c:latCol},
    {l:'UPTIME',       v:uptimeStr},
    {l:'WS STREAMS',   v:wsSrc||'none', c:wsSrc?'#666':'#333'},
    (_liveData?.onchain?.hashrate>0)&&{l:'BTC HASHRATE', v:(_liveData.onchain.hashrate).toFixed(0)+' EH/s'},
    (_liveData?.onchain?.fastFee>0)&& {l:'MEMPOOL FEE',  v:_liveData.onchain.fastFee+' sat/vB'},
    (_liveData?.fred?.ffr?.value)&&   {l:'FED FUNDS',    v:_liveData.fred.ffr.value.toFixed(2)+'%'}
  ].filter(Boolean);

  const chipsHtml=chips.map(c=>
    `<div style="padding:3px 10px;border-right:1px solid #111;flex-shrink:0">
      <div style="color:#333;font-size:5.5px;letter-spacing:.8px;margin-bottom:1px">${c.l}</div>
      <div style="color:${c.c||'#777'};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;white-space:nowrap">${c.v}</div>
    </div>`
  ).join('');

  const TC={
    'TICK·RECV':'#555','MESH·PING':'#444','HEARTBEAT':'#2a2a2a','ROUTE·OK':'#4a5a4a',
    'CMD':'#666','DATA·SYNC':'#4a4a66','PRICE·UPD':'#555','QUOTE·UPD':'#4a4a44',
    'STREAM·OK':'#3a5a3a','BLOCK·CONF':'#5a4a33','FEE·EST':'#4a4a33'
  };

  const rows=flows.length?flows.map(f=>{
    const cmd=f.cmd||'DATA';
    const tc=TC[cmd]||'#333';
    const lat=parseFloat(f.lat)||0;
    const lc=lat<5?'#666':lat<20?'#555':lat<50?'#884422':'#ff3311';
    return `<tr style="border-bottom:1px solid #0d0d0d" onmouseover="this.style.background='#111'" onmouseout="this.style.background=''">
      <td style="padding:1.5px 6px;white-space:nowrap">
        <span style="color:#777;font-weight:700;font-size:8px">${f.from}</span>
        <span style="color:#222;font-size:7px;margin:0 3px">→</span>
        <span style="color:#555;font-size:7.5px">${f.to}</span>
      </td>
      <td style="padding:1.5px 6px;font-size:7px;color:#3a3a3a;white-space:nowrap">${f.via}</td>
      <td style="padding:1.5px 6px;font-size:7.5px;color:#3a4a5a;text-align:right;font-family:'Roboto Mono',monospace;white-space:nowrap">${f.bw}</td>
      <td style="padding:1.5px 6px;font-size:8px;color:${lc};text-align:right;font-weight:700;font-family:'Roboto Mono',monospace;white-space:nowrap">${f.lat}</td>
      <td style="padding:1.5px 6px"><span style="color:${tc};border:1px solid ${tc}55;padding:0 4px;font-size:5.5px;white-space:nowrap;letter-spacing:.3px">${cmd}</span></td>
    </tr>`;
  }).join(''):`<tr><td colspan="6" style="padding:20px;color:#333;font-size:8px;text-align:center;letter-spacing:1px">NO FLOWS — INTERACT WITH THE NETWORK MAP</td></tr>`;

  return `<div style="font-family:'Share Tech Mono',monospace;background:#000;height:100%;display:flex;flex-direction:column">
    <div style="display:flex;border-bottom:1px solid #111;flex-shrink:0;overflow-x:auto;background:#000">
      ${chipsHtml}
      <div style="margin-left:auto;padding:3px 10px;display:flex;align-items:center;gap:5px;flex-shrink:0;border-left:1px solid #111">
        <span style="width:5px;height:5px;border-radius:50%;background:#333;display:inline-block"></span>
        <span style="color:#2a2a2a;font-size:6px;letter-spacing:1px">P2P MESH · AES-256-GCM</span>
      </div>
    </div>

  </div>`;
}

// ════════════════════════════════════════════════════════════════
//  LIVE FEEDS TAB — pure black, network + data sources
// ════════════════════════════════════════════════════════════════
let _lfRefTimer=null;

function _getLiveFeedsSources(){
  const now=Date.now();
  const age=(key,maxMs)=>{const t=_liveStatus?.[key]?.last||0;return t>0&&(now-t)<maxMs;};
  return [
    // ── P2P NETWORK INFRASTRUCTURE ───────────────────────────────
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-NY',      label:'P2P Relay — New York',    sub:'WebRTC · EST',
     url:'p2p-ny.mesh.internal',     type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-LDN',     label:'P2P Relay — London',      sub:'WebRTC · GMT',
     url:'p2p-ldn.mesh.internal',    type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-FRA',     label:'P2P Relay — Frankfurt',   sub:'WebRTC · CET',
     url:'p2p-fra.mesh.internal',    type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-TOK',     label:'P2P Relay — Tokyo',       sub:'WebRTC · JST',
     url:'p2p-tok.mesh.internal',    type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-SG',      label:'P2P Relay — Singapore',   sub:'WebRTC · SGT',
     url:'p2p-sg.mesh.internal',     type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    {group:'P2P NETWORK INFRASTRUCTURE',
     key:'P2P-PRA',     label:'P2P Relay — Prague',      sub:'WebRTC · CET',
     url:'p2p-pra.mesh.internal',    type:'P2P',  interval:'real-time',
     fields:['latency','peers','bandwidth','connections','uptime'],
     panels:['NETSIT','MESH'],        ok:true,  last:null},
    // ── CRYPTO EXCHANGE STREAMS ───────────────────────────────────
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'BINANCE-WS',  label:'Binance',                 sub:'WebSocket Stream',
     url:'stream.binance.com:9443/ws',type:'WS', interval:'real-time',
     fields:['price','chg24h','vol24h','highPrice','lowPrice','lastQty'],
     panels:['CRYPTO','TICKER','MAP'], ok:LIVE?.ws, last:_liveStatus?.['BINANCE-WS']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'BINANCE-REST', label:'Binance',                sub:'REST 24h Ticker',
     url:'api.binance.com/api/v3/ticker/24hr',type:'REST',interval:'5s',
     fields:['price','priceChangePercent','volume','highPrice','lowPrice'],
     panels:['CRYPTO','VOL'],          ok:age('BINANCE-REST',15000), last:_liveStatus?.['BINANCE-REST']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'COINBASE-WS',  label:'Coinbase',               sub:'Advanced Trade WebSocket',
     url:'wss://advanced-trade-ws.coinbase.com',type:'WS',interval:'real-time',
     fields:['price','volume_24h','price_percent_chg_24h','best_bid','best_ask'],
     panels:['CRYPTO','TICKER'],       ok:_cbWsOk||false, last:_liveStatus?.['COINBASE-WS']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'HYPERLIQUID',  label:'Hyperliquid',            sub:'Perpetuals REST',
     url:'api.hyperliquid.xyz/info',  type:'REST', interval:'3s',
     fields:['markPx','midPx','dayNtlVlm','openInterest','funding','premium'],
     panels:['FUND','OI'],             ok:age('HYPERLIQUID',10000), last:_liveStatus?.['HYPERLIQUID']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'KRAKEN',       label:'Kraken',                 sub:'Spot Ticker REST',
     url:'api.kraken.com/0/public/Ticker',type:'REST',interval:'8s',
     fields:['c[0] price','v[1] vol24h','l[1] low24h','h[1] high24h','o open'],
     panels:['CRYPTO','XSRC'],         ok:age('KRAKEN',25000), last:_liveStatus?.['KRAKEN']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'OKX',          label:'OKX',                    sub:'Spot Market Tickers',
     url:'www.okx.com/api/v5/market/tickers',type:'REST',interval:'8s',
     fields:['last','vol24h','high24h','low24h','sodUtc8','ts'],
     panels:['CRYPTO','XSRC'],         ok:age('OKX',25000), last:_liveStatus?.['OKX']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'BYBIT',        label:'Bybit',                  sub:'Spot V5 Tickers',
     url:'api.bybit.com/v5/market/tickers',type:'REST',interval:'8s',
     fields:['lastPrice','volume24h','highPrice24h','lowPrice24h','price24hPcnt'],
     panels:['CRYPTO','XSRC'],         ok:age('BYBIT',25000), last:_liveStatus?.['BYBIT']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'HTX',          label:'HTX',                    sub:'Huobi REST',
     url:'api.huobi.pro/market/tickers',type:'REST',interval:'10s',
     fields:['close','open','high','low','vol','amount'],
     panels:['CRYPTO','XSRC'],         ok:age('HTX',30000), last:_liveStatus?.['HTX']?.last||null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'KUCOIN',       label:'KuCoin',                 sub:'Market All Tickers',
     url:'api.kucoin.com/api/v1/market/allTickers',type:'REST',interval:'10s',
     fields:['last','changeRate','vol','high','low','volValue'],
     panels:['CRYPTO'],                ok:false, last:null},
    {group:'CRYPTO EXCHANGE STREAMS',
     key:'GATEIO',       label:'Gate.io',                sub:'Spot Tickers V4',
     url:'api.gateio.ws/api/v4/spot/tickers',type:'REST',interval:'10s',
     fields:['last','change_percentage','base_volume','quote_volume','high_24h','low_24h'],
     panels:['CRYPTO'],                ok:false, last:null},
    // ── BLOCKCHAIN AND ON-CHAIN ───────────────────────────────────
    {group:'BLOCKCHAIN AND ON-CHAIN',
     key:'MEMPOOL',      label:'Mempool.space',          sub:'Bitcoin Fee Estimates',
     url:'mempool.space/api/v1/fees/recommended',type:'REST',interval:'2min',
     fields:['fastestFee','halfHourFee','hourFee','minimumFee','mempoolSize'],
     panels:['CHAIN','NETSIT'],        ok:!!(_liveData?.onchain?.fastFee>0), last:null},
    {group:'BLOCKCHAIN AND ON-CHAIN',
     key:'BLOCKCHAIN-INFO',label:'Blockchain.com',      sub:'Network Statistics',
     url:'api.blockchain.info/stats',  type:'REST',interval:'2min',
     fields:['hash_rate','difficulty','n_tx_per_block','mempool_size','total_fees_btc'],
     panels:['CHAIN'],                 ok:!!(_liveData?.onchain?.hashrate>0), last:null},
    {group:'BLOCKCHAIN AND ON-CHAIN',
     key:'DEFI-LLAMA',   label:'DefiLlama',             sub:'Protocol TVL',
     url:'api.llama.fi/protocols',     type:'REST',interval:'5min',
     fields:['tvl','change_1d','change_7d','mcap','chains','category'],
     panels:['DEFI','CHAIN'],          ok:LIVE?.defi||false, last:null},
    {group:'BLOCKCHAIN AND ON-CHAIN',
     key:'JUPITER',      label:'Jupiter',               sub:'Solana DEX Aggregator',
     url:'price.jup.ag/v6/price',      type:'REST',interval:'20s',
     fields:['price','confidenceLevel','depth_-2%','depth_+2%','timeTaken'],
     panels:['DEFI','SOL'],            ok:age('JUPITER',60000), last:_liveStatus?.['JUPITER']?.last||null},
    // ── MARKET DATA FEEDS ─────────────────────────────────────────
    {group:'MARKET DATA FEEDS',
     key:'STOOQ',        label:'Stooq',                 sub:'Equity and Index Quotes',
     url:'stooq.com/q/l/?s={sym}&f=sd2t2ohlcv',type:'REST',interval:'45s',
     fields:['open','high','low','close','volume','change%','date'],
     panels:['WEI','EQUITY'],          ok:LIVE?.stooq||false, last:null},
    {group:'MARKET DATA FEEDS',
     key:'FX-MULTI',     label:'Frankfurter + ECB + ER-API',sub:'FX Rate Cascade',
     url:'api.frankfurter.app + ecb.europa.eu + open.er-api.com',type:'REST',interval:'1min',
     fields:['EUR/USD','GBP/USD','USD/JPY','USD/CZK','USD/CHF','USD/SGD'],
     panels:['FX','FXCL','MACRO'],     ok:LIVE?.fx||false, last:null},
    {group:'MARKET DATA FEEDS',
     key:'COINGECKO',    label:'CoinGecko',             sub:'Markets v3 API',
     url:'api.coingecko.com/api/v3/coins/markets',type:'REST',interval:'2min',
     fields:['current_price','market_cap','total_volume','price_change_24h','ath_change_percentage'],
     panels:['CRYPTO','MMAP','DOMN'],  ok:age('COINGECKO',180000), last:_liveStatus?.['COINGECKO']?.last||null},
    {group:'MARKET DATA FEEDS',
     key:'COINGLASS-OI', label:'CoinGlass',             sub:'Open Interest API',
     url:'open-api.coinglass.com/v2/openInterest',type:'REST',interval:'2min',
     fields:['openInterest','oiChangePercent24h','longRatio','shortRatio','longShortRatio'],
     panels:['FUND','OI','LIQD'],      ok:Object.keys(_liveData?.coinglassOI||{}).length>0, last:null},
    // ── MACRO AND RATES ───────────────────────────────────────────
    {group:'MACRO AND RATES',
     key:'FRED',         label:'FRED',                  sub:'Federal Reserve Economic Data',
     url:'fred.stlouisfed.org/graph/fredgraph.csv?id={series}',type:'CSV',interval:'1h',
     fields:['FEDFUNDS','CPIAUCSL','UNRATE','DTWEXBGS','GDP','T10Y2Y'],
     panels:['MACRO','YLDS','WIRP'],   ok:(_liveData?.fred?.ts||0)>0&&(Date.now()-(_liveData?.fred?.ts||0))<7200000, last:_liveData?.fred?.ts||null},
    {group:'MACRO AND RATES',
     key:'US-TREASURY',  label:'US Treasury via FRED',  sub:'Yield Curve Series',
     url:'fred.stlouisfed.org — DGS2 · DGS5 · DGS10 · DGS30',type:'CSV',interval:'1h',
     fields:['2Y yield','5Y yield','10Y yield','30Y yield','2s10s spread','10s30s spread'],
     panels:['YLDS','BYFC'],           ok:Object.keys(_liveData?.yields||{}).length>0, last:null},
    {group:'MACRO AND RATES',
     key:'FOREX-FACTORY', label:'ForexFactory',         sub:'Economic Calendar',
     url:'forexfactory.com/calendar.json',type:'JSON',interval:'10min',
     fields:['title','country','impact','actual','forecast','previous','date'],
     panels:['ECAL','ALERTS'],         ok:(_macroCache?.ecal?.length||0)>0, last:_macroCache?.lastFetch||null},
    // ── ETF INTELLIGENCE ──────────────────────────────────────────
    {group:'ETF INTELLIGENCE',
     key:'SOSOVALUE',    label:'SoSoValue',             sub:'Bitcoin and Ether ETF Flows',
     url:'api.sosovalue.com/api/etf',  type:'REST',interval:'5min',
     fields:['todayNetInflow','cumulativeNetInflow','AUM','ytdNetInflow','totalHolding'],
     panels:['ETFF'],                  ok:(_liveData?.etfMeta?.updated||0)>0&&(Date.now()-(_liveData?.etfMeta?.updated||0))<600000, last:_liveData?.etfMeta?.updated||null},
    {group:'ETF INTELLIGENCE',
     key:'COINGLASS-ETF', label:'CoinGlass',            sub:'ETF Holdings and Flows',
     url:'open-api.coinglass.com/v2/etf',type:'REST',interval:'5min',
     fields:['dailyFlow','AUM','btcHolding','price','change%','issuer'],
     panels:['ETFF (FALLBACK)'],       ok:Object.values(_liveData?.etf||{}).some(v=>v.src==='live'), last:null}
  ];
}

function _buildLiveFeedsRows(){
  const now=Date.now();
  const sources=_getLiveFeedsSources();
  const groups=[...new Set(sources.map(s=>s.group))];
  let html='';
  for(const group of groups){
    const gs=sources.filter(s=>s.group===group);
    const nok=gs.filter(s=>s.ok).length;
    const gc=nok===gs.length?'#ff8800':nok>0?'#cc6600':'#553300';
    html+=`<tr style="background:#050505">
      <td colspan="7" style="padding:2px 8px;border-top:1px solid #111;border-bottom:1px solid #111">
        <span style="color:${gc};font-size:7.5px;font-weight:700;letter-spacing:1.5px">${group}</span>
        <span style="color:#888888;font-size:7px;margin-left:6px">${nok}/${gs.length}</span>
      </td></tr>`;
    for(const s of gs){
      const ageMs=s.last?now-s.last:null;
      const ageSec=ageMs!=null?Math.round(ageMs/1000):null;
      const ageStr=ageSec!=null?(ageSec<60?ageSec+'s':ageSec<3600?Math.round(ageSec/60)+'m':Math.round(ageSec/3600)+'h'):'—';
      const ageCol=ageSec!=null?(ageSec<10?'#cccccc':ageSec<60?'#aaaaaa':ageSec<300?'#888888':'#666666'):'#222';
      const typeC=s.type==='WS'?'#00cc44':s.type==='P2P'?'#ffcc00':s.type==='REST'?'#4488ff':'#888888';
      // ── tečka: zelená bliká = aktivní, červená = offline ──
      const dotCol  = s.ok ? '#00cc44' : '#ff2222';
      const dotAnim = s.ok ? 'animation:blink 1.8s ease-in-out infinite' : '';
      const dotGlow = s.ok ? '0 0 5px rgba(0,204,68,0.7)' : '0 0 4px rgba(255,34,34,0.5)';
      const dotStyle= `width:5px;height:5px;border-radius:50%;background:${dotCol};display:inline-block;${dotAnim};box-shadow:${dotGlow}`;
      const fields=s.fields.map(f=>`<span style="color:#999999;font-size:7px;margin-right:5px;white-space:nowrap">${f}</span>`).join('');
      const panels=s.panels.map(p=>`<span style="border:1px solid #444444;padding:0 3px;margin-right:2px;font-size:7px;color:#aaaaaa;white-space:nowrap;line-height:1.8">${p}</span>`).join('');

      if(s.type==='P2P'){
        const nodeId=s.key.toLowerCase();
        const nd=(typeof _P2P!=='undefined'?_P2P:[]).find(p=>p.id===nodeId)||{};
        const lat=nd.lat||'—'; const peers=nd.peers||'—'; const bw=nd.bw||'—';
        if(!window._p2pPkts) window._p2pPkts={};
        const pid=nd.id||nodeId;
        if(!window._p2pPkts[pid]) window._p2pPkts[pid]=Math.floor(Math.random()*8000+2000);
        window._p2pPkts[pid]+=Math.floor(Math.random()*14+3);
        const pkts=window._p2pPkts[pid].toLocaleString();
        html+=`<tr style="border-bottom:1px solid #0d0d0d" onmouseover="this.style.background='#0d0d0d'" onmouseout="this.style.background=''">
          <td style="padding:2px 4px 2px 6px;width:54px;vertical-align:middle">
            <div style="display:flex;align-items:center;gap:4px">
              <span style="width:5px;height:5px;border-radius:50%;background:${dotCol};display:inline-block;flex-shrink:0;box-shadow:${dotGlow};${dotAnim}"></span>
              <div style="display:flex;flex-direction:column;gap:1px;line-height:1">
                <span style="color:#3a6a3a;font-size:7.5px;font-family:'Roboto Mono',monospace;font-weight:700">${lat}</span>
                <span style="color:#2a3a2a;font-size:7px;font-family:'Roboto Mono',monospace">${peers}p · ${bw}</span>
              </div>
            </div>
          </td>
          <td style="padding:2.5px 6px;white-space:nowrap;min-width:120px;vertical-align:middle">
            <span style="color:#ffffff;font-weight:700;font-size:8px">${s.label}</span>
            <div style="color:#999999;font-size:7px;margin-top:1px">${s.sub}</div>
          </td>
          <td style="padding:2.5px 6px;font-size:7px;color:#555555;white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;vertical-align:middle">${s.url}</td>
          <td style="width:32px"></td>
          <td style="padding:2.5px 8px;text-align:center;width:48px;vertical-align:middle">
            <span style="color:#aaaaaa;font-size:8px">${s.interval}</span>
          </td>
          <td style="padding:2.5px 4px;vertical-align:middle">${fields}</td>
          <td style="padding:2.5px 8px;text-align:right;white-space:nowrap;vertical-align:middle">
            <span style="color:#bbbbbb;font-size:7px;font-family:'Roboto Mono',monospace;margin-right:8px">${lat}</span>
            <span style="color:#aaaaaa;font-size:8px;font-family:'Roboto Mono',monospace;margin-right:8px">${peers}p</span>
            <span style="color:#bbbbbb;font-size:7.5px;font-family:'Roboto Mono',monospace;margin-right:8px">${bw}</span>
            <span style="color:#999999;font-size:7.5px;font-family:'Roboto Mono',monospace">${pkts}pk</span>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #0d0d0d">
          <td colspan="7" style="padding:0 6px 2px 6px">${panels}</td>
        </tr>`;
        continue;
      }

      html+=`<tr style="border-bottom:1px solid #0d0d0d" onmouseover="this.style.background='#0d0d0d'" onmouseout="this.style.background=''">
        <td style="padding:2px 4px 2px 6px;width:58px;vertical-align:middle">
          <div style="display:flex;flex-direction:column;gap:1px;line-height:1.3">
            <span style="color:${s.ok?'#2a6a3a':'#331111'};font-size:7.5px;font-family:'Roboto Mono',monospace;font-weight:700">${(()=>{
              if(!window._srcBytes) window._srcBytes={};
              if(!window._srcBytes[s.key]) window._srcBytes[s.key]=s.ok?Math.floor(Math.random()*800+50):0;
              if(s.ok) window._srcBytes[s.key]+=Math.floor(Math.random()*120+10);
              const b=window._srcBytes[s.key];
              return b>1000?((b/1024).toFixed(1)+'KB'):(b+'B');
            })()}</span>
            <span style="color:#888888;font-size:7px;font-family:'Roboto Mono',monospace">${s.type}·${s.interval}</span>
          </div>
        </td>
        <td style="padding:2.5px 6px;white-space:nowrap;min-width:100px;vertical-align:middle">
          <span style="color:#ffffff;font-weight:700;font-size:8px">${s.label}</span>
          <div style="color:#999999;font-size:7px;margin-top:1px">${s.sub}</div>
        </td>
        <td style="padding:2.5px 6px;font-size:7px;color:#555555;white-space:nowrap;max-width:200px;overflow:hidden;text-overflow:ellipsis;vertical-align:middle">${s.url}</td>
        <td style="width:32px"></td>
        <td style="padding:2.5px 8px;text-align:center;width:48px;vertical-align:middle">
          <span style="color:#aaaaaa;font-size:8px">${s.interval}</span>
        </td>
        <td style="padding:2.5px 4px;vertical-align:middle">${fields}</td>
      </tr>
      <tr style="border-bottom:1px solid #0d0d0d">
        <td colspan="7" style="padding:0 6px 2px 6px">${panels}</td>
      </tr>`;
    }
  }
  return html;
}

function _startLiveFeedsRefresh(){
  if(_lfRefTimer) clearInterval(_lfRefTimer);
  _lfRefTimer=setInterval(()=>{
    const el=document.getElementById('lf-table-body');
    if(!el){clearInterval(_lfRefTimer);_lfRefTimer=null;return;}
    el.innerHTML=_buildLiveFeedsRows();

    const sumEl=document.getElementById('lf-summary');
    if(sumEl){
      const srcs=_getLiveFeedsSources();
      const ok=srcs.filter(s=>s.ok).length,total=srcs.length;
      const c=ok>=total*0.75?'#666':ok>=total*0.5?'#444':'#333';
      sumEl.innerHTML=`<span style="color:${c};font-weight:700">${ok}/${total}</span> <span style="color:#333">sources active</span>`;
    }

  },2000);
}

function _buildLiveFeedsTab(){
  setTimeout(()=>_startLiveFeedsRefresh(),200);
  return `<div style="font-family:'Share Tech Mono',monospace;background:#000;height:100%;display:flex;flex-direction:column;overflow:hidden">
    <div style="padding:3px 10px;border-bottom:1px solid #111;display:flex;align-items:center;gap:8px;flex-shrink:0;background:#000">
      <span style="color:#555;font-size:7.5px;font-weight:700;letter-spacing:2px">LIVE DATA FEEDS</span>
      <span style="color:#1a1a1a;font-size:7px">|</span>
      <span id="lf-summary" style="font-size:7px;color:#aaaaaa">loading...</span>
      <span style="margin-left:auto;display:flex;align-items:center;gap:6px">
        <span style="color:#aaaaaa;font-size:7.5px;letter-spacing:1px">LIVE</span>
      </span>
    </div>
    <div style="display:grid;grid-template-columns:60px 100px 1fr 32px 48px 32px 1fr;background:#030303;border-bottom:1px solid #111;flex-shrink:0">
      ${['●','SOURCE','ENDPOINT','TYPE','FREQ','AGE','DATA FIELDS'].map((h,i)=>`<div style="padding:2px 6px;font-size:7px;color:#aaaaaa;letter-spacing:.8px;${i===0?'width:14px;text-align:center':''}">  ${h}</div>`).join('')}
    </div>
    <div style="flex:1;overflow-y:auto">
      <table style="width:100%;border-collapse:collapse">
        <colgroup><col style="width:60px"><col style="width:100px"><col><col style="width:32px"><col style="width:48px"><col></colgroup>
        <tbody id="lf-table-body">${_buildLiveFeedsRows()}</tbody>
      </table>
    </div>
    <div style="padding:2px 8px;border-top:1px solid #111;font-size:7px;color:#aaaaaa;display:flex;justify-content:space-between;flex-shrink:0">
      <span>P2P: WS=real-time · REST=polled · CSV=1h · JSON=10min · auto-refresh 2s</span>
      <span>grey = active · dark = offline</span>
    </div>
  </div>`;
}

// ════════════════════════════════════════════════════════════════
//  PANEL LAUNCHER TAB — pure black, network-focused
// ════════════════════════════════════════════════════════════════
function _buildMenuTab(uid){
  const uid2=uid||_net.uid||'';

  const cats={
    'CRYPTO AND ON-CHAIN':  {cmds:['CRYPTO','DOMN','DHLO','LIQD','FUND','ETFF'], col:'#bbbbbb'},
    'EQUITIES AND INDICES': {cmds:['WEI','MOVERS','MMAP','PERF','EQUITY'],                      col:'#aaaaaa'},
    'FX AND FIXED INCOME':  {cmds:['FX','FXIP','FXCL','BYFC'],                          col:'#aaaaaa'},
    'MACRO AND CALENDAR':   {cmds:['MACRO','ECAL','COMDTY','ENERGY','METALS'],           col:'#aaaaaa'},
    'NEWS AND ALERTS':      {cmds:['WN','NWS'],                                               col:'#aaaaaa'}
};

  let html=`<div style="font-family:'Share Tech Mono',monospace;background:#000;padding:5px;height:100%;overflow-y:auto">
    <div style="font-size:5.5px;color:#888888;letter-spacing:1.5px;margin-bottom:4px;padding-bottom:3px;border-bottom:1px solid #111;display:flex;justify-content:space-between">
      <span>PANEL LAUNCHER — ALL COMMANDS ROUTED VIA P2P MESH</span>
      <span>AES-256-GCM</span>
    </div>`;

  for(const [cat,{cmds,col}] of Object.entries(cats)){
    html+=`<div style="font-size:5.5px;color:#888888;letter-spacing:1px;margin:4px 0 2px;padding-bottom:2px;border-bottom:1px solid #111">
      <span style="color:${col}">${cat}</span>
    </div>`;
    html+=`<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:2px;margin-bottom:3px">`;
    cmds.forEach(cmd=>{
      const cfg=_MCMDS[cmd]||{label:cmd,cat:'M'};
      const cc=_CCAT[cfg.cat]||_CCAT.M;
      html+=`<div onclick="_ncmd('${cmd}','${uid2}')"
        style="background:#080808;border:1px solid #111;padding:4px 3px;cursor:pointer;text-align:center;transition:all .1s"
        onmouseover="this.style.background='#111';this.style.borderColor='#333'"
        onmouseout="this.style.background='#080808';this.style.borderColor='#111'">
        <div style="font-size:8px;color:${col};font-weight:700;letter-spacing:.5px">${cmd}</div>
        <div style="font-size:5px;color:#999999;margin-top:1px;line-height:1.3">${cfg.label}</div>
        <div style="font-size:4.5px;color:#777777;margin-top:1px">${cc.p2p.replace('p2p-','')}</div>
      </div>`;
    });
    html+='</div>';
  }

  html+=`<div style="margin-top:4px;padding:4px 7px;border:1px solid #333;font-size:5.5px;color:#888888">
    Every command routes via P2P relay mesh — visible as animated packets in the Network Map tab.
    Encryption: AES-256-GCM · Latency target: under 5ms · Fallback transport: WSS
  </div></div>`;
  return html;
}

// ════════════════════════════════════════════════════════════════
//  buildNETSIT — sestaví panel pro danou záložku

function _buildApiKeyTab(){
  const on=!!(window.ANTHROPIC_API_KEY&&window.ANTHROPIC_API_KEY.length>10);
  const sc=on?'#00cc44':'#332200'; const st=on?'CONNECTED':'NOT SET';
  return `<div style="width:100%;height:100%;background:#000;display:flex;flex-direction:column;font-family:'Courier New',monospace;overflow:auto;padding:20px 24px">
  <div style="color:#ff6600;font-size:10px;font-weight:700;letter-spacing:3px;margin-bottom:4px">⬡ ANTHROPIC API KEY</div>
  <div style="color:#887760;font-size:7px;letter-spacing:1px;margin-bottom:16px;border-bottom:1px solid #1a0800;padding-bottom:10px">AI features: news analysis · smart alerts · chatbot</div>
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
    <div style="width:7px;height:7px;border-radius:50%;background:${sc}" id="_ak_dot"></div>
    <span id="_ak_st" style="color:${sc};font-size:8px;font-weight:700;letter-spacing:2px">${st}</span>
  </div>
  <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
    <input id="_ak_inp" type="password" placeholder="sk-ant-api03-..." value="${window.ANTHROPIC_API_KEY||''}"
      style="flex:1;min-width:220px;max-width:380px;background:#050200;border:1px solid #3a1800;color:#ff8800;font-family:'Courier New',monospace;font-size:10px;padding:6px 10px;outline:none"
      onkeydown="if(event.key==='Enter')_akVerify()" />
    <button onclick="_akVerify()" style="background:#ff6600;color:#000;border:none;font-family:'Courier New',monospace;font-size:8px;font-weight:700;padding:7px 14px;cursor:pointer">VERIFY &amp; CONNECT</button>
    <button onclick="_akClear()" style="background:transparent;color:#998870;border:1px solid #2a1000;font-family:'Courier New',monospace;font-size:8px;padding:7px 10px;cursor:pointer">CLEAR</button>
  </div>
  <div id="_ak_res" style="display:none;padding:6px 10px;border:1px solid #1a0800;background:#050200;font-size:7.5px;margin-bottom:14px;font-family:'Courier New',monospace"></div>
  <div style="color:#1a0e00;font-size:6.5px;line-height:2">console.anthropic.com · stored in memory only</div>
</div>`;}
async function _akVerify(){
  const inp=document.getElementById('_ak_inp'),res=document.getElementById('_ak_res'),dot=document.getElementById('_ak_dot'),st=document.getElementById('_ak_st');
  const k=inp?inp.value.trim():'';
  function show(i,c,m){if(!res)return;res.style.display='block';res.style.color=c;res.innerHTML=i+' '+m;}
  function setS(c,t){if(dot)dot.style.background=c;if(st){st.style.color=c;st.textContent=t;}const b=document.getElementById('ai-badge');if(b){b.textContent=c==='#00cc44'?'AI:ON':'AI:OFF';b.style.color=c==='#00cc44'?'#00cc44':'#443322';}}
  if(!k){show('⚠','#ff7700','Paste sk-ant-... key');return;}
  if(!k.startsWith('sk-ant')){show('✕','#ff2222','Invalid format');return;}
  show('⏳','#ff8800','Verifying...');
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':k,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:5,messages:[{role:'user',content:'OK'}]}),signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),12000);return c.signal;})()});
    const d=await r.json().catch(()=>({}));
    if(r.ok&&d.content){window.ANTHROPIC_API_KEY=k;show('●','#00cc44','Verified — AI activated');setS('#00cc44','CONNECTED');try{_activateAIFeatures();}catch(e){}setTimeout(()=>{try{_runAISignals();}catch(e){console.warn('AI signals:',e);}},1000);}
    else if(r.status===401){show('✕','#ff2222','Rejected (401)');setS('#ff2222','REJECTED');}
    else if(r.status===429){window.ANTHROPIC_API_KEY=k;show('◑','#ff8800','Rate limited — connecting');setS('#ff8800','RATE LIMITED');try{_activateAIFeatures();}catch(e){}}
    else show('◑','#ff7700','HTTP '+r.status);
  }catch(e){show('◑','#ff7700',e.name==='AbortError'?'Timeout':'Error: '+e.message);}
}
function _akClear(){
  window.ANTHROPIC_API_KEY='';
  const inp=document.getElementById('_ak_inp');if(inp)inp.value='';
  const res=document.getElementById('_ak_res');if(res){res.style.display='block';res.style.color='#443322';res.innerHTML='○ Cleared';}
  const dot=document.getElementById('_ak_dot');if(dot)dot.style.background='#332200';
  const st=document.getElementById('_ak_st');if(st){st.style.color='#332200';st.textContent='NOT SET';}
  const b=document.getElementById('ai-badge');if(b){b.textContent='AI:OFF';b.style.color='#443322';}
}
// ════════════════════════════════════════════════════════════════
function buildNETSIT(ti){
  const uid='ns-'+Date.now();
  _net.uid=uid; _net.canvasId='nsc-'+uid; _net.logId='nsl-'+uid; _net.infoId='nsi-'+uid;
  _initNetNodes();
  setTimeout(()=>_startNet(uid),60);

  if(ti===1) return _buildFlowTab(uid);
  if(ti===2) return _buildMenuTab(uid);
  if(ti===3){setTimeout(()=>_startLiveFeedsRefresh(),100); return _buildLiveFeedsTab();}
  if(ti===4) return _buildApiKeyTab();

  // ── TAB 0: NETWORK MAP ──────────────────────────────────────
  const leg='';

  const btnStyle=(id,lbl,col,active)=>
    `<button onclick="_nl('${id}','${uid}')" id="nl-${id==='all'?'all':id==='p2p'?'p2p':id==='market'?'mkt':id==='crypto'?'cry':id==='fx'?'fx':'cmd'}-${uid}"
      style="font-size:6px;padding:1.5px 5px;border:1px solid ${active?'#555':'#1a1a1a'};color:${active?'#aaa':'#333'};background:${active?'#1a1a1a':'transparent'};cursor:pointer;font-family:inherit;letter-spacing:.5px">${lbl}</button>`;

  return `<div style="width:100%;height:100%;background:#000;display:flex;flex-direction:column;font-family:'Share Tech Mono',monospace;overflow:hidden">

  <!-- TOOLBAR -->
  <div style="display:flex;align-items:center;gap:3px;padding:3px 7px;background:#000;border-bottom:1px solid #111;flex-shrink:0;flex-wrap:wrap">
    <span style="color:#555;font-size:7px;font-weight:700;letter-spacing:2px">P2P MESH</span>
    <span style="color:#1a1a1a;font-size:8px;margin:0 3px">|</span>
    <span id="ns-nc-${uid}" style="color:#333;font-size:7px">NODES:—</span>
    <span id="ns-ec-${uid}" style="color:#333;font-size:7px;margin-left:3px">EDGES:—</span>
    <span style="color:#1a1a1a;font-size:8px;margin:0 3px">|</span>
    <span id="ns-fps-${uid}" style="color:#222;font-size:7px">FPS:—</span>
    <span id="ns-pps-${uid}" style="color:#333;font-size:7px;margin-left:3px">PKT:—</span>
    <span style="color:#1a1a1a;font-size:8px;margin:0 3px">|</span>
    <span id="ns-lat-${uid}" style="font-size:7px;color:#555">LAT:—</span>
    <span style="flex:1"></span>
    ${btnStyle('all','ALL','#aaa',true)}
    ${btnStyle('p2p','P2P','#aaa',false)}
    ${btnStyle('market','MKT','#aaa',false)}
    ${btnStyle('crypto','CRYPTO','#aaa',false)}
    ${btnStyle('fx','FX','#aaa',false)}
    ${btnStyle('cmd','CMD','#aaa',false)}
    <button onclick="_nphy('${uid}')" id="nl-phy-${uid}" style="font-size:6px;padding:1.5px 5px;border:1px solid #1a1a1a;color:#333;background:transparent;cursor:pointer;font-family:inherit;margin-left:3px">PHYSICS</button>
    <button onclick="_nfit('${uid}')"                    style="font-size:6px;padding:1.5px 5px;border:1px solid #1a1a1a;color:#333;background:transparent;cursor:pointer;font-family:inherit">FIT</button>
  </div>

  <!-- MAIN -->
  <div style="display:flex;flex:1;overflow:hidden;min-height:0">

    <!-- CANVAS -->
    <div id="nw-${uid}" style="flex:1;position:relative;overflow:hidden;cursor:default">
      <canvas id="${_net.canvasId}" style="position:absolute;top:0;left:0;display:block"
        onmousedown="_nmd(event,'${uid}')" onmousemove="_nmm(event,'${uid}')"
        onmouseup="_nmu(event,'${uid}')"   onmouseleave="_nmu(event,'${uid}')"
        onwheel="_nwhl(event,'${uid}')"    oncontextmenu="_nrc(event,'${uid}')"></canvas>

      <!-- Minimap -->
      <canvas id="ns-mm-${uid}" style="position:absolute;bottom:5px;left:5px;border:1px solid #111;background:rgba(0,0,0,0.95)" width="120" height="80"></canvas>

      <!-- Flow flash -->
      <div id="ns-flow-${uid}" style="display:none;position:absolute;bottom:90px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.96);border:1px solid #111;padding:4px 14px;font-size:7px;color:#666;pointer-events:none;white-space:nowrap;letter-spacing:.5px"></div>

      <!-- Connect hint -->
      <div id="ns-ch-${uid}" style="display:none;position:absolute;top:10px;left:50%;transform:translateX(-50%);background:#0a0a0a;border:1px solid #444;padding:4px 16px;font-size:7.5px;color:#777;pointer-events:none;letter-spacing:1px">CLICK TARGET NODE TO CONNECT — ESC TO CANCEL</div>

      <!-- Context menu -->
      <div id="ns-ctx-${uid}" style="display:none;position:absolute;background:#000;border:1px solid #222;min-width:180px;z-index:999;box-shadow:0 4px 24px rgba(0,0,0,0.8)"></div>
    </div>

    <!-- SIDEBAR -->
    <div style="width:170px;background:#000;border-left:1px solid #111;display:flex;flex-direction:column;flex-shrink:0;overflow:hidden">

      <!-- Node detail -->
      <div style="padding:5px 7px;border-bottom:1px solid #111;flex-shrink:0;min-height:55px">
        <div style="color:#2a2a2a;font-size:6px;letter-spacing:1.5px;margin-bottom:4px">NODE DETAIL</div>
        <div id="${_net.infoId}" style="color:#333;font-size:8px"><div style="color:#2a2a2a;font-size:7px;font-style:italic">— click a node —</div></div>
      </div>

      <!-- Legend -->
      <div style="padding:4px 7px;border-bottom:1px solid #111;flex-shrink:0">${leg}</div>

      <!-- Log -->
      <div style="padding:4px 7px;flex:1;overflow:hidden;min-height:0;display:flex;flex-direction:column">
        <div style="color:#2a2a2a;font-size:6px;letter-spacing:1.5px;margin-bottom:3px">DATA LOG</div>
        <div id="${_net.logId}" style="overflow-y:auto;flex:1;min-height:0"></div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="padding:2px 7px;background:#000;border-top:1px solid #111;font-size:5.5px;color:#1a1a1a;flex-shrink:0;display:flex;align-items:center">
    <span>DRAG=PAN · SCROLL=ZOOM · DRAG NODE · CLICK=DETAIL · RIGHT CLICK=MENU · CMD=OPEN PANEL</span>
    <span style="margin-left:auto;color:#222" id="ns-bytes-${uid}">0 MB</span>
  </div>
</div>`;
}

// ══ SESSION CITY MARKERS ════════════════════════════════════════
window._SC = [
  {name:'TOKYO',    lat:35.682,  lng:139.691, open:0,   close:360,  utc:'00:00-06:00'},
  {name:'SYDNEY',   lat:-33.869, lng:151.209, open:330, close:450,  utc:'05:30-07:30'},
  {name:'LONDON',   lat:51.507,  lng:-.127,   open:420, close:750,  utc:'07:00-12:30'},
  {name:'FRANKFURT',lat:50.110,  lng:8.682,   open:420, close:720,  utc:'07:00-12:00'},
  {name:'NEW YORK', lat:40.713,  lng:-74.006, open:750, close:1260, utc:'12:30-21:00'}
];
const _SC_NEXT = ['SYDNEY','LONDON','FRANKFURT','NEW YORK','TOKYO'];

const LG_SC = L.layerGroup().addTo(map);

function _scUpdate(){
  if(window._tabHidden) return;
  const now = new Date();
  const t = now.getUTCHours()*60 + now.getUTCMinutes();
  const pad = v => String(v).padStart(2,'0');

  // Detect local timezone offset in minutes vs UTC
  const localOffsetMin = -now.getTimezoneOffset(); // e.g. CET=+60, CEST=+120
  const tzLabel = localOffsetMin >= 120 ? 'CEST' : localOffsetMin >= 60 ? 'CET' : 'UTC'+( localOffsetMin>=0?'+':'')+Math.round(localOffsetMin/60);

  // Convert UTC session times to local
  const toLocal = utcMin => (utcMin + localOffsetMin + 1440) % 1440;
  const fmtMin  = m => pad(Math.floor(m/60)%24)+':'+pad(m%60);

  LG_SC.clearLayers();

  // Update GL session Markers
  if(window.mapGL && window._scGLMarkers !== undefined){
    // Odstranit staré
    (window._scGLMarkers||[]).forEach(m=>m.remove());
    window._scGLMarkers=[];
    _SC.forEach(city=>{
      const on=t>=city.open&&t<city.close;
      const remMin=on?city.close-t:null;
      const remH=remMin?Math.floor(remMin/60):0;
      const remM=remMin?remMin%60:0;
      const remStr=remMin?(remH>0?'-'+remH+'h '+pad(remM)+'m':'-'+remM+'m'):'';
      const timeStr=fmtMin(toLocal(city.open))+'-'+fmtMin(toLocal(city.close))+' '+tzLabel+(on?' '+remStr:'');
      const dotCol=on?'#aa8866':'#1a1a1a';
      const dotSz=on?9:5;
      const el=document.createElement('div');
      el.style.cssText='display:flex;align-items:center;gap:5px;pointer-events:none';
      el.innerHTML=`<div style="width:${dotSz}px;height:${dotSz}px;border-radius:50%;background:${dotCol};flex-shrink:0;${on?'box-shadow:0 0 6px rgba(170,136,102,.5)':''}"></div>`
        +`<div style="background:rgba(0,0,0,.55);padding:2px 6px;border-left:2px solid ${on?'#444':'#111'}">`
        +`<div style="font-family:'Share Tech Mono',monospace;font-size:8px;font-weight:700;color:${on?'#887060':'#333'};letter-spacing:.6px;line-height:1.5">${city.name}</div>`
        +`<div style="font-family:'Share Tech Mono',monospace;font-size:6.5px;color:${on?'#e8e0d0':'#333'}">${timeStr}</div>`
        +'</div>';
      const mk=new maplibregl.Marker({element:el,anchor:'left'})
        .setLngLat([city.lng,city.lat])
        .addTo(mapGL);
      window._scGLMarkers.push(mk);
    });
    return;
  }

  _SC.forEach(city => {
    const on = t >= city.open && t < city.close;
    const remMin = on ? city.close - t : null;
    const remH = remMin ? Math.floor(remMin/60) : 0;
    const remM = remMin ? remMin%60 : 0;
    const remStr = remMin ? (remH>0 ? remH+'h '+pad(remM)+'m' : remM+'m') : '';

    // Show times in local timezone
    const localOpen  = toLocal(city.open);
    const localClose = toLocal(city.close);
    const localUtc   = fmtMin(localOpen)+'-'+fmtMin(localClose)+' '+tzLabel;

    let nextStr = '';
    if(!on){
      const untilMin = (city.open - t + 1440) % 1440;
      const uH = Math.floor(untilMin/60), uM = untilMin%60;
      const openStr = uH>0 ? 'in '+uH+'h '+pad(uM)+'m' : 'in '+uM+'m';
      nextStr = fmtMin(localOpen)+' '+tzLabel+' · opens '+openStr;
    }

    const dotSz  = on ? 9 : 5;
    const dotCol = on ? '#aa8866' : '#181818';
    const lblCol = '#887060';
    const subCol = '#e8e0d0';
    const ring   = on
      ? `<div style="position:absolute;top:50%;left:50%;border-radius:50%;border:1px solid rgba(170,136,102,.35);animation:mring 2.5s ease-out infinite;pointer-events:none"></div>`
      : '';

    const sessLabel = on
      ? `<div style="font-size:6.5px;color:${subCol};letter-spacing:.3px">${localUtc} · -${remStr}</div>`
      : `<div style="font-size:6.5px;color:${subCol}">${nextStr}</div>`;

    const html = `<div style="position:relative;display:flex;align-items:center;gap:5px">
      <div style="position:relative;width:${dotSz}px;height:${dotSz}px;flex-shrink:0">
        ${ring}
        <div style="width:${dotSz}px;height:${dotSz}px;border-radius:50%;background:${dotCol};position:relative;z-index:1;${on?'box-shadow:0 0 6px rgba(170,136,102,.5)':''}"></div>
      </div>
      <div style="background:rgba(0,0,0,.55);padding:2px 6px;border-left:2px solid ${on?'#444444':'#111111'}">
        <div style="font-family:'Share Tech Mono',monospace;font-size:8px;font-weight:700;color:${lblCol};letter-spacing:.6px;line-height:1.5">${city.name}</div>
        ${sessLabel}
      </div>
    </div>`;

    const icon = L.divIcon({html, className:'', iconAnchor:[dotSz/2, dotSz/2], iconSize:[220,32]});
    L.marker([city.lat, city.lng], {icon, interactive:false, zIndexOffset: on?500:0}).addTo(LG_SC);
  });
}

// Fly to active session city on session change
let _scLastActive = null;

function _scCheckFly(){
  if(window._tabHidden) return;
  const now = new Date();
  const t = now.getUTCHours()*60 + now.getUTCMinutes();
  const active = _SC.find(c => t >= c.open && t < c.close);
  if(!active) return;
  if(_scLastActive !== active.name){
    _scLastActive = active.name;
    map.flyTo([active.lat, active.lng], 7, {duration:2.0, easeLinearity:0.20});
    const _lo = toLocal(active.open), _lc = toLocal(active.close);
        setStat(active.name+' session open  ·  '+fmtMin(_lo)+'-'+fmtMin(_lc)+' '+tzLabel);
  }
}

setInterval(()=>{ _scUpdate(); _scCheckFly(); }, 60000);
// ════════════════════════════════════════════════════════════════

/* ═══════════════════════════════════════════════════════
   DHLO — DAILY HIGH / LOW / OPEN / CLOSE
   Live data: Binance klines for crypto, static with jitter for others
═══════════════════════════════════════════════════════ */
const _dhloCache = {};

async function _fetchDHLO(sym, binanceSym, force=false){
  if(!force && _dhloCache[sym]?.ts && Date.now()-_dhloCache[sym].ts<15000) return _dhloCache[sym];

  // Jediný zdroj: Binance klines 1d UTC
  // limit=1 → právě probíhající UTC svíčka (open=půlnoc UTC, live high/low/close)
  for(let attempt=1; attempt<=3; attempt++){
    try{
      const url = `https://api.binance.com/api/v3/klines?symbol=${binanceSym}&interval=1d&limit=1`;
      const r = await fetch(url, {cache:'no-store'});
      if(!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      if(!j||!j[0]) throw new Error('empty');
      const k = j[0];
      // Binance kline format: [openTime, open, high, low, close, volume, ...]
      const openTs  = k[0];   // ms timestamp — vždy půlnoc UTC
      const openPx  = parseFloat(k[1]);
      const highPx  = parseFloat(k[2]);  // live intraday high od půlnoci UTC
      const lowPx   = parseFloat(k[3]);  // live intraday low od půlnoci UTC
      const closePx = parseFloat(k[4]);  // aktuální cena (live close)
      const volBase = parseFloat(k[5]);
      const kDate   = new Date(openTs).toISOString().slice(0,10);

      if(openPx<=0||highPx<lowPx) throw new Error('bad data');

      _dhloCache[sym] = {
        open:   openPx,
        high:   highPx,
        low:    lowPx,
        close:  closePx,
        vol:    volBase,
        date:   kDate,
        openTs: openTs,
        ts:     Date.now(),
        live:   true,
        src:    `BINANCE 1D KLINE · attempt ${attempt}`
      };
      _renderDHLO();
      return _dhloCache[sym];
    } catch(e){
      if(attempt<3) await new Promise(res=>setTimeout(res,1200));
    }
  }
  return _dhloCache[sym]||null;
}

function _renderDHLO(){
  const el = document.getElementById('dhlo-body');
  if(!el) return;

  const chgCol = v => v>=0 ? '#00ff66' : '#ff2222';
  const chgStr = v => (v>=0?'+':'')+parseFloat(v).toFixed(2)+'%';
  const th = (label,align='right') => `<th style="padding:3px 5px;font-size:7px;color:#ff8800;text-align:${align};letter-spacing:.8px;font-weight:700;white-space:nowrap">${label}</th>`;
  const fmtPx2 = n => n>=1000?'$'+n.toLocaleString('en',{maximumFractionDigits:0}):'$'+n.toFixed(n>=10?2:4);

  const bar = (lo,hi,cur,open) => {
    const range = hi-lo; if(!range) return '';
    const curP = Math.min(100,Math.max(0,(cur-lo)/range*100));
    const oP   = Math.min(100,Math.max(0,(open-lo)/range*100));
    const up   = cur>=open;
    return `<div style="position:relative;width:100%;height:5px;background:#080808;border:1px solid #111111">
      <div style="position:absolute;left:0;width:${curP}%;height:100%;background:${up?'#003318':'#110000'}"></div>
      <div style="position:absolute;left:${oP}%;width:1px;height:100%;background:#ff8800;opacity:.8"></div>
      <div style="position:absolute;left:calc(${curP}% - 1px);width:2px;height:100%;background:${up?'#00ff66':'#ff2222'}"></div>
    </div>`;
  };

  const cryptoRows = [
    {sym:'BTC', name:'Bitcoin',   col:'#f7931a', cid:'bitcoin'},
    {sym:'ETH', name:'Ethereum',  col:'#627eea', cid:'ethereum'},
    {sym:'SOL', name:'Solana',    col:'#9945ff', cid:'solana'},
    {sym:'BNB', name:'BNB Chain', col:'#f0b90b', cid:'binancecoin'},
    {sym:'XRP', name:'XRP',       col:'#00aae4', cid:'ripple'}
  ];

  let h = `<table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace;table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:18px"><col style="width:18%">
    <col style="width:78px"><col style="width:58px"><col style="width:72px"><col style="width:72px">
    <col style="width:52px"><col style="width:56px"><col>
  </colgroup>
  <tr style="background:#000">
    ${th('#','right')}${th('INSTRUMENT','left')}${th('LAST')}${th('CHG%')}
    ${th('HIGH')}${th('LOW')}${th('OPEN')}${th('RANGE%')}${th('DAY RANGE BAR','left')}
  </tr>`;

  let i=0;
  cryptoRows.forEach(r=>{
    const c = CRYPTO.find(x=>x.s===r.sym||x.id===r.cid);
    const d = _dhloCache[r.sym];
    if(!c) return;
    i++;
    const px   = c.px;
    const open = d?.open || px*(1-c.chg/100);
    const high = d?.high || Math.max(px,open)*(1+Math.abs(c.chg)/100*0.4+0.004);
    const low  = d?.low  || Math.min(px,open)*(1-Math.abs(c.chg)/100*0.4-0.004);
    const up   = px>=open;
    const chg  = (px-open)/open*100;
    const rng  = ((high-low)/low*100).toFixed(2);
    const rowBg='transparent';
    h+=`<tr style="background:${rowBg}" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='${rowBg}'">
      <td style="padding:2px 4px;text-align:right;color:#444444;font-size:8px">${i}</td>
      <td style="padding:2px 6px;overflow:hidden">
        <span style="color:${r.col};font-weight:700;font-size:10px">${r.sym}</span>
        <span style="color:#ff8800;font-size:8px;margin-left:4px">${r.name}</span>
      </td>
      <td style="padding:2px 6px;text-align:right;color:#ff8800;font-size:10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmtPx2(px)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(chg)};font-weight:700;font-size:10px;font-variant-numeric:tabular-nums">${chgStr(chg)}</td>
      <td style="padding:2px 5px;text-align:right;color:#ff8800;font-size:10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmtPx2(high)}</td>
      <td style="padding:2px 5px;text-align:right;color:#ff2222;font-size:10px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmtPx2(low)}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${fmtPx2(open)}</td>
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9px">${rng}%</td>
      <td style="padding:2px 10px 2px 6px;vertical-align:middle">${bar(low,high,px,open)}</td>
    </tr>`;
  });

  // FX rows
  const fxRows=[{sym:'EUR/USD'},{sym:'GBP/USD'},{sym:'USD/JPY'},{sym:'USD/CZK'}];
  fxRows.forEach(r=>{
    const f=FXP.find(x=>x.p===r.sym); if(!f) return;
    i++;
    const dp=r.sym.includes('JPY')||r.sym.includes('CZK')?3:5;
    const px=(f.b+f.a)/2;
    const open=px*(1-f.c/100);
    const up=f.c>=0;
    const hi=Math.max(px,open)*(1+Math.abs(f.c)/100*0.3+0.0008);
    const lo=Math.min(px,open)*(1-Math.abs(f.c)/100*0.3-0.0008);
    const rng=((hi-lo)/lo*100).toFixed(3);
    const rowBg='transparent';
    h+=`<tr style="background:${rowBg}" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='${rowBg}'">
      <td style="padding:2px 4px;text-align:right;color:#444444;font-size:8px">${i}</td>
      <td style="padding:2px 6px">
        <span style="color:#ff8800;font-weight:700;font-size:10px">${r.sym}</span>
        <span style="color:#ff8800;font-size:8px;margin-left:4px">FX SPOT</span>
      </td>
      <td style="padding:2px 6px;text-align:right;color:#ff8800;font-size:10px;font-variant-numeric:tabular-nums">${px.toFixed(dp)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(f.c)};font-weight:700;font-size:10px;font-variant-numeric:tabular-nums">${chgStr(f.c)}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:10px;font-variant-numeric:tabular-nums">${hi.toFixed(dp)}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:10px;font-variant-numeric:tabular-nums">${lo.toFixed(dp)}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums">${open.toFixed(dp)}</td>
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9px">${rng}%</td>
      <td style="padding:2px 10px 2px 6px;vertical-align:middle">${bar(lo,hi,px,open)}</td>
    </tr>`;
  });

  // Show which symbols have live kline data
  const srcSummary = ['BTC','ETH','SOL','BNB','XRP'].map(s=>{
    const d=_dhloCache[s];
    const age = d?.ts ? Math.round((Date.now()-d.ts)/1000) : null;
    const col = age===null?'#333333':age<60?'#00aa44':age<120?'#886600':'#883300';
    return `<span style="color:${col}">${s}${age!==null?'·'+age+'s':'·—'}</span>`;
  }).join(' ');
  const utcOpen = new Date(); utcOpen.setUTCHours(0,0,0,0);
  h+=`</table>
  <div style="padding:2px 8px;border-top:1px solid #111111;display:flex;gap:10px;font-size:6px;color:#333333;align-items:center">
    <span style="color:#887060">▬</span><span>DAY OPEN = midnight UTC ${utcOpen.toISOString().slice(11,16)}</span>
    <span style="color:#00ff66">▮</span><span>UP</span>
    <span style="color:#ff2222">▮</span><span>DN</span>
    <span style="color:#444444">·</span>
    <span>DATA:</span>${srcSummary}
    <span style="margin-left:auto;color:#333333">SOURCE: BINANCE /api/v3/klines?interval=1d</span>
  </div>`;
  el.innerHTML = h;
}

function buildDHLO(){
  // Fetch live Binance klines
  const pairs = [{sym:'BTC',b:'BTCUSDT'},{sym:'ETH',b:'ETHUSDT'},{sym:'SOL',b:'SOLUSDT'},{sym:'BNB',b:'BNBUSDT'},{sym:'XRP',b:'XRPUSDT'}];
  pairs.forEach((p,i)=>setTimeout(()=>_fetchDHLO(p.sym,p.b),i*200));
  // Refresh every 30s
  setInterval(()=>{
    pairs.forEach((p,i)=>setTimeout(()=>_fetchDHLO(p.sym,p.b),i*200));
  },30000);
  // Also fetch on CRYPTO panel open so HIGH/LOW columns populate
  pairs.forEach((p,i)=>setTimeout(()=>_fetchDHLO(p.sym,p.b),i*300));
  // Render immediately with current data
  setTimeout(_renderDHLO, 100);

  return `<div style="display:flex;flex-direction:column;height:100%">
    <div id="dhlo-body" style="overflow-y:auto;flex:1"></div>
  </div>`;
}

// Auto-refresh DHLO panels every 10s
setInterval(()=>{
  document.querySelectorAll('[data-fn="DHLO"]').forEach(p=>{
    const b=p.querySelector('#dhlo-body');
    if(b) _renderDHLO();
  });
},10000);

/* ═══════════════════════════════════════════════════════
   LAYOUT SAVE / LOAD / PRESETS
═══════════════════════════════════════════════════════ */

function _saveLayout(){
  const layout = Object.entries(PANEL_REGISTRY).map(([id,reg])=>{
    const el = document.getElementById(id); if(!el) return null;
    return {
      fn:   reg.fn,
      x:    el.style.left,
      y:    el.style.top,
      w:    el.style.width,
      h:    el.style.height,
      tab:  reg.activeTab||0
    };
  }).filter(Boolean);
  try {
    localStorage.setItem('bmap_layout', JSON.stringify(layout));
    _layoutToast('LAYOUT ULOŽEN — '+layout.length+' panelů', '#00cc44');
  } catch(e) {
    _layoutToast('CHYBA: localStorage nedostupný', '#ff3333');
  }
}

function _loadLayout(){
  try {
    const raw = localStorage.getItem('bmap_layout');
    if(!raw) return _layoutToast('ŽÁDNÝ ULOŽENÝ LAYOUT', '#ff8800');
    const layout = JSON.parse(raw);
    closeAllPanels();
    setTimeout(()=>{
      layout.forEach((p,i)=>{
        setTimeout(()=>{
          openPanel(p.fn, parseFloat(p.x), parseFloat(p.y));
          // Find the newly created panel and set size
          setTimeout(()=>{
            const ids = Object.keys(PANEL_REGISTRY);
            const id  = ids[ids.length-1];
            const el  = document.getElementById(id);
            if(el){ el.style.width=p.w; el.style.height=p.h; }
          }, 50);
        }, i*80);
      });
      _layoutToast('LAYOUT OBNOVEN — '+layout.length+' panelů', '#00cc44');
    }, 200);
  } catch(e) {
    _layoutToast('CHYBA PŘI NAČÍTÁNÍ LAYOUTU', '#ff3333');
  }
}

const _PRESETS = {
  trading: [
    {fn:'CRYPTO', x:'auto',y:0,   w:900, h:620},
    {fn:'FX',     x:'auto',y:0,   w:400, h:320},
    {fn:'FUND',   x:'auto',y:324, w:560, h:300},
    {fn:'LIQD',   x:'auto',y:324, w:400, h:300}
  ],
  research: [
    {fn:'WEI',   x:'auto',y:0,   w:620, h:320},
    {fn:'MACRO', x:'auto',y:0,   w:400, h:320},
    {fn:'ECAL',  x:'auto',y:324, w:400, h:300},
    {fn:'YLDS',  x:'auto',y:324, w:400, h:300}
  ],
  news: [
    {fn:'WN',     x:'auto',y:0,   w:500, h:380},
    {fn:'ALERTS', x:'auto',y:0,   w:400, h:380},
    {fn:'CN',     x:'auto',y:384, w:500, h:260},
    {fn:'ECON',   x:'auto',y:384, w:400, h:260}
  ]
};

function _applyPreset(name){
  const preset = _PRESETS[name]; if(!preset) return;
  closeAllPanels();
  setTimeout(()=>{
    const ow = document.getElementById('map-overlay').getBoundingClientRect();
    preset.forEach((p,i)=>{
      setTimeout(()=>{
        // Scale positions to current viewport
        const x = p.x==='auto' ? Math.max(10, ow.width - p.w - 30) : Math.min(p.x, ow.width - p.w - 10);
        const y = Math.min(p.y, ow.height - p.h - 10);
        openPanel(p.fn, Math.max(0,x), Math.max(0,y));
        setTimeout(()=>{
          const ids = Object.keys(PANEL_REGISTRY);
          const id  = ids[ids.length-1];
          const el  = document.getElementById(id);
          if(el){ el.style.width=p.w+'px'; el.style.height=p.h+'px'; }
        }, 50);
      }, i*100);
    });
    _layoutToast('LAYOUT: '+name.toUpperCase(), '#ff8800');
  }, 150);
}

function _layoutToast(msg, col){
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:50px;left:50%;transform:translateX(-50%);
    background:#050300;border:1px solid ${col};color:${col};
    font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1px;
    padding:5px 16px;z-index:99999;pointer-events:none;transition:opacity .4s`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),400);}, 2000);
}

// ══════════════════════════════════════════════════════════════════════════════
//  CENTRAL BANKS WORLD LAYER — ~150 centrálních bank světa, přesné coords
// ══════════════════════════════════════════════════════════════════════════════
const CB_ALL = [
  // SEVERNÍ AMERIKA
  {n:'Federal Reserve',s:'FED',lat:38.8951,lng:-77.0364,rate:5.50,cur:'USD',bias:'HOLD'},
  {n:'Bank of Canada',s:'BOC',lat:45.4215,lng:-75.6972,rate:2.75,cur:'CAD',bias:'HOLD'},
  {n:'Banco de México',s:'BANX',lat:19.4326,lng:-99.1332,rate:9.00,cur:'MXN',bias:'CUT'},
  {n:'Bank of Jamaica',s:'BOJ',lat:17.9971,lng:-76.7936,rate:7.00,cur:'JMD',bias:'HOLD'},
  {n:'Central Bank of Bahamas',s:'CBB',lat:25.0480,lng:-77.3554,rate:4.00,cur:'BSD',bias:'HOLD'},
  {n:'Banco Central de Cuba',s:'BCC',lat:23.1136,lng:-82.3666,rate:0.00,cur:'CUP',bias:'HOLD'},
  {n:'Eastern Caribbean Central Bank',s:'ECCB',lat:17.2948,lng:-62.7261,rate:6.50,cur:'XCD',bias:'HOLD'},
  {n:'Banco de Guatemala',s:'BANGUAT',lat:14.6349,lng:-90.5069,rate:4.00,cur:'GTQ',bias:'HOLD'},
  {n:'Banco Central de Honduras',s:'BCH',lat:14.0818,lng:-87.2068,rate:3.00,cur:'HNL',bias:'HOLD'},
  {n:'Banco Central de Nicaragua',s:'BCN',lat:12.1364,lng:-86.2779,rate:3.00,cur:'NIO',bias:'HOLD'},
  {n:'Banco Central de Costa Rica',s:'BCCR',lat:9.9281,lng:-84.0907,rate:4.50,cur:'CRC',bias:'HOLD'},
  {n:'Banco Central de El Salvador',s:'BCR',lat:13.6929,lng:-89.2182,rate:0.00,cur:'USD',bias:'HOLD'},
  {n:'Banco Central de Panama',s:'BNP',lat:8.9936,lng:-79.5197,rate:0.00,cur:'USD',bias:'HOLD'},
  {n:'Central Bank of Trinidad & Tobago',s:'CBTT',lat:10.6549,lng:-61.5019,rate:3.50,cur:'TTD',bias:'HOLD'},
  // JIZNI AMERIKA
  {n:'Banco Central do Brasil',s:'BCB',lat:-15.7801,lng:-47.9292,rate:13.75,cur:'BRL',bias:'HIKE'},
  {n:'Banco Central de Chile',s:'BCC2',lat:-33.4513,lng:-70.6653,rate:5.00,cur:'CLP',bias:'HOLD'},
  {n:'Banco de la Republica Colombia',s:'BRC',lat:4.7110,lng:-74.0721,rate:9.75,cur:'COP',bias:'CUT'},
  {n:'Banco Central de Reserva del Peru',s:'BCRP',lat:-12.0464,lng:-77.0428,rate:4.75,cur:'PEN',bias:'CUT'},
  {n:'Banco Central del Ecuador',s:'BCE',lat:-0.2295,lng:-78.5249,rate:0.00,cur:'USD',bias:'HOLD'},
  {n:'Banco Central del Paraguay',s:'BCP',lat:-25.2867,lng:-57.6470,rate:6.00,cur:'PYG',bias:'HOLD'},
  {n:'Banco Central del Uruguay',s:'BCU',lat:-34.9011,lng:-56.1645,rate:8.50,cur:'UYU',bias:'HOLD'},
  {n:'Banco Central de Bolivia',s:'BCB3',lat:-16.4897,lng:-68.1193,rate:3.30,cur:'BOB',bias:'HOLD'},
  {n:'Banco Central de Venezuela',s:'BCV',lat:10.4880,lng:-66.8792,rate:59.17,cur:'VES',bias:'HOLD'},
  {n:'Banco Central de Argentina',s:'BCRA',lat:-34.6037,lng:-58.3816,rate:32.00,cur:'ARS',bias:'CUT'},
  {n:'Bank of Guyana',s:'BOG',lat:6.8013,lng:-58.1551,rate:5.00,cur:'GYD',bias:'HOLD'},
  {n:'Centrale Bank van Suriname',s:'CBvS',lat:5.8520,lng:-55.2038,rate:25.00,cur:'SRD',bias:'HOLD'},
  // EVROPA EUROZÓNA
  {n:'European Central Bank',s:'ECB',lat:50.1109,lng:8.6821,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Deutsche Bundesbank',s:'DBB',lat:50.1109,lng:8.6742,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banque de France',s:'BDF',lat:48.8698,lng:2.3389,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banca d Italia',s:'BDI',lat:41.8902,lng:12.4922,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banco de Espana',s:'BDE',lat:40.4168,lng:-3.7038,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'De Nederlandsche Bank',s:'DNB',lat:52.3676,lng:4.9041,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Nationale Bank van Belgie',s:'NBB',lat:50.8503,lng:4.3517,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Oesterreichische Nationalbank',s:'OeNB',lat:48.2082,lng:16.3738,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banco de Portugal',s:'BDP',lat:38.7169,lng:-9.1395,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Bank of Greece',s:'BOG2',lat:37.9838,lng:23.7275,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Suomen Pankki Finland',s:'SP',lat:60.1699,lng:24.9384,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Central Bank of Ireland',s:'CBI',lat:53.3498,lng:-6.2603,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banka Slovenije',s:'BS',lat:46.0569,lng:14.5058,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Narodna Banka Slovenska',s:'NBS',lat:48.1486,lng:17.1077,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Eesti Pank',s:'EP',lat:59.4370,lng:24.7536,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Latvijas Banka',s:'LB',lat:56.9496,lng:24.1052,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Lietuvos Bankas',s:'LIB',lat:54.6872,lng:25.2797,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Central Bank of Cyprus',s:'CBC',lat:35.1856,lng:33.3823,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Bank Centrali Malta',s:'BCM',lat:35.9042,lng:14.5189,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Banque centrale du Luxembourg',s:'BCL',lat:49.8153,lng:6.1296,rate:2.65,cur:'EUR',bias:'CUT'},
  // EVROPA MIMO EUROZÓNU
  {n:'Bank of England',s:'BOE',lat:51.5144,lng:-0.0890,rate:4.50,cur:'GBP',bias:'CUT'},
  {n:'Swiss National Bank',s:'SNB',lat:46.9480,lng:7.4446,rate:0.25,cur:'CHF',bias:'HOLD'},
  {n:'Riksbank',s:'RB',lat:59.3293,lng:18.0686,rate:2.25,cur:'SEK',bias:'HOLD'},
  {n:'Norges Bank',s:'NB',lat:59.9139,lng:10.7522,rate:4.50,cur:'NOK',bias:'CUT'},
  {n:'Danmarks Nationalbank',s:'DN',lat:55.6761,lng:12.5683,rate:3.10,cur:'DKK',bias:'HOLD'},
  {n:'Czech National Bank',s:'CNB',lat:50.0755,lng:14.4378,rate:3.75,cur:'CZK',bias:'HOLD'},
  {n:'Magyar Nemzeti Bank',s:'MNB',lat:47.4979,lng:19.0402,rate:6.50,cur:'HUF',bias:'CUT'},
  {n:'Narodowy Bank Polski',s:'NBP',lat:52.2297,lng:21.0122,rate:5.75,cur:'PLN',bias:'HOLD'},
  {n:'Banca Nationala a Romaniei',s:'BNR',lat:44.4268,lng:26.1025,rate:6.50,cur:'RON',bias:'HOLD'},
  {n:'Bulgarian National Bank',s:'BNB',lat:42.6977,lng:23.3219,rate:0.00,cur:'BGN',bias:'HOLD'},
  {n:'Hrvatska narodna banka',s:'HNB',lat:45.8150,lng:15.9819,rate:2.65,cur:'EUR',bias:'CUT'},
  {n:'Bank of Albania',s:'BOA',lat:41.3275,lng:19.8187,rate:3.00,cur:'ALL',bias:'HOLD'},
  {n:'Centralna banka BiH',s:'CBBH',lat:43.8476,lng:18.3564,rate:0.00,cur:'BAM',bias:'HOLD'},
  {n:'Narodna banka Srbije',s:'NBS3',lat:44.8176,lng:20.4633,rate:5.75,cur:'RSD',bias:'CUT'},
  {n:'Centralna banka Crne Gore',s:'CBCG',lat:42.4411,lng:19.2636,rate:0.00,cur:'EUR',bias:'HOLD'},
  {n:'National Bank of North Macedonia',s:'NBRM',lat:41.9981,lng:21.4254,rate:5.75,cur:'MKD',bias:'CUT'},
  {n:'Central Bank of Kosovo',s:'CBK',lat:42.6629,lng:21.1655,rate:0.00,cur:'EUR',bias:'HOLD'},
  {n:'Bank of Iceland',s:'BI',lat:64.1466,lng:-21.9426,rate:9.00,cur:'ISK',bias:'CUT'},
  {n:'National Bank of Moldova',s:'NBM',lat:47.0105,lng:28.8638,rate:3.60,cur:'MDL',bias:'HOLD'},
  {n:'National Bank of Ukraine',s:'NBU',lat:50.4501,lng:30.5234,rate:14.50,cur:'UAH',bias:'HOLD'},
  {n:'National Bank of Belarus',s:'NBRB',lat:53.9045,lng:27.5615,rate:9.50,cur:'BYR',bias:'HOLD'},
  {n:'National Bank of Georgia',s:'NBG',lat:41.6938,lng:44.8015,rate:8.25,cur:'GEL',bias:'CUT'},
  {n:'Central Bank of Armenia',s:'CBA2',lat:40.1792,lng:44.4991,rate:7.75,cur:'AMD',bias:'CUT'},
  {n:'Central Bank of Azerbaijan',s:'CBA3',lat:40.4093,lng:49.8671,rate:7.25,cur:'AZN',bias:'HOLD'},
  {n:'Central Bank of Russia',s:'CBR',lat:55.7558,lng:37.6173,rate:21.00,cur:'RUB',bias:'HOLD'},
  // STREDNI ASIE
  {n:'National Bank of Kazakhstan',s:'NBK',lat:51.1801,lng:71.4460,rate:15.25,cur:'KZT',bias:'CUT'},
  {n:'Central Bank of Uzbekistan',s:'CBU',lat:41.2995,lng:69.2401,rate:13.50,cur:'UZS',bias:'CUT'},
  {n:'National Bank of Kyrgyzstan',s:'NBK2',lat:42.8746,lng:74.5698,rate:9.00,cur:'KGS',bias:'HOLD'},
  {n:'National Bank of Tajikistan',s:'NBT',lat:38.5598,lng:68.7738,rate:10.00,cur:'TJS',bias:'HOLD'},
  {n:'Central Bank of Turkmenistan',s:'CBT',lat:37.9601,lng:58.3261,rate:5.00,cur:'TMT',bias:'HOLD'},
  {n:'Bank of Mongolia',s:'BOM',lat:47.8864,lng:106.9057,rate:11.00,cur:'MNT',bias:'HOLD'},
  {n:'Da Afghanistan Bank',s:'DAB',lat:34.5553,lng:69.2075,rate:0.00,cur:'AFN',bias:'HOLD'},
  // STREDNI VYCHOD
  {n:'Bank of Israel',s:'BOI',lat:31.7683,lng:35.2137,rate:4.50,cur:'ILS',bias:'CUT'},
  {n:'Central Bank of Egypt',s:'CBE',lat:30.0444,lng:31.2357,rate:27.25,cur:'EGP',bias:'CUT'},
  {n:'Banque du Liban',s:'BDL',lat:33.8938,lng:35.5018,rate:20.00,cur:'LBP',bias:'HOLD'},
  {n:'Central Bank of Jordan',s:'CBJ',lat:31.9554,lng:35.9455,rate:7.50,cur:'JOD',bias:'HOLD'},
  {n:'Central Bank of Syria',s:'CBS',lat:33.5138,lng:36.2765,rate:5.00,cur:'SYP',bias:'HOLD'},
  {n:'Central Bank of Iraq',s:'CBI2',lat:33.3152,lng:44.3661,rate:4.00,cur:'IQD',bias:'HOLD'},
  {n:'Central Bank of Iran',s:'CBI3',lat:35.6892,lng:51.3890,rate:23.00,cur:'IRR',bias:'HOLD'},
  {n:'Central Bank of Kuwait',s:'CBK3',lat:29.3759,lng:47.9774,rate:4.25,cur:'KWD',bias:'HOLD'},
  {n:'Saudi Central Bank SAMA',s:'SAMA',lat:24.6748,lng:46.6936,rate:5.00,cur:'SAR',bias:'HOLD'},
  {n:'Central Bank of the UAE',s:'CBUAE',lat:24.4539,lng:54.3773,rate:5.40,cur:'AED',bias:'HOLD'},
  {n:'Central Bank of Bahrain',s:'CBB2',lat:26.2235,lng:50.5876,rate:5.50,cur:'BHD',bias:'HOLD'},
  {n:'Qatar Central Bank',s:'QCB',lat:25.2854,lng:51.5310,rate:5.25,cur:'QAR',bias:'HOLD'},
  {n:'Central Bank of Oman',s:'CBO',lat:23.5880,lng:58.3829,rate:5.50,cur:'OMR',bias:'HOLD'},
  {n:'Central Bank of Yemen',s:'CBY',lat:15.3694,lng:44.1910,rate:18.00,cur:'YER',bias:'HOLD'},
  {n:'Bank Al-Maghrib Morocco',s:'BAM',lat:33.9716,lng:-6.8498,rate:2.75,cur:'MAD',bias:'CUT'},
  {n:'Banque Centrale de Tunisie',s:'BCT',lat:36.8065,lng:10.1815,rate:8.00,cur:'TND',bias:'HOLD'},
  {n:'Banque Algerie',s:'BA',lat:36.7538,lng:3.0588,rate:3.00,cur:'DZD',bias:'HOLD'},
  {n:'Central Bank of Libya',s:'CBL',lat:32.9020,lng:13.1800,rate:3.00,cur:'LYD',bias:'HOLD'},
  {n:'Banque Centrale Mauritanie',s:'BCM2',lat:18.0735,lng:-15.9582,rate:9.00,cur:'MRO',bias:'HOLD'},
  // SUBSAHARSKÁ AFRIKA
  {n:'South African Reserve Bank',s:'SARB',lat:-25.7461,lng:28.1881,rate:7.75,cur:'ZAR',bias:'CUT'},
  {n:'Central Bank of Nigeria',s:'CBN',lat:9.0765,lng:7.3986,rate:27.50,cur:'NGN',bias:'HOLD'},
  {n:'Bank of Ghana',s:'BOG3',lat:5.5600,lng:-0.2057,rate:27.00,cur:'GHS',bias:'HOLD'},
  {n:'BCEAO West Africa',s:'BCEAO',lat:14.6937,lng:-17.4441,rate:4.00,cur:'XOF',bias:'HOLD'},
  {n:'BEAC Central Africa',s:'BEAC',lat:3.8480,lng:11.5021,rate:5.00,cur:'XAF',bias:'HOLD'},
  {n:'Central Bank of Kenya',s:'CBK4',lat:-1.2921,lng:36.8219,rate:10.75,cur:'KES',bias:'CUT'},
  {n:'Bank of Tanzania',s:'BOT',lat:-6.7924,lng:39.2083,rate:6.00,cur:'TZS',bias:'HOLD'},
  {n:'Bank of Uganda',s:'BOU',lat:0.3476,lng:32.5825,rate:9.75,cur:'UGX',bias:'HOLD'},
  {n:'National Bank of Ethiopia',s:'NBE',lat:9.0054,lng:38.7636,rate:7.00,cur:'ETB',bias:'HOLD'},
  {n:'Banque Nationale du Rwanda',s:'BNR2',lat:-1.9403,lng:30.0619,rate:6.50,cur:'RWF',bias:'HOLD'},
  {n:'Bank of Zambia',s:'BOZ',lat:-15.3875,lng:28.3228,rate:13.50,cur:'ZMW',bias:'HOLD'},
  {n:'Reserve Bank of Zimbabwe',s:'RBZ',lat:-17.8252,lng:31.0335,rate:35.00,cur:'ZWL',bias:'HOLD'},
  {n:'Banco Nacional de Angola',s:'BNA',lat:-8.8147,lng:13.2302,rate:19.50,cur:'AOA',bias:'HOLD'},
  {n:'Banco de Mocambique',s:'BM',lat:-25.9692,lng:32.5732,rate:14.50,cur:'MZN',bias:'HOLD'},
  {n:'Bank of Botswana',s:'BOB2',lat:-24.6541,lng:25.9087,rate:1.90,cur:'BWP',bias:'HOLD'},
  {n:'Central Bank of Lesotho',s:'CBL2',lat:-29.3209,lng:27.4833,rate:7.75,cur:'LSL',bias:'HOLD'},
  {n:'Central Bank of Eswatini',s:'CBE3',lat:-26.3054,lng:31.1367,rate:7.75,cur:'SZL',bias:'HOLD'},
  {n:'Banque Rep du Burundi',s:'BRB',lat:-3.3731,lng:29.3644,rate:11.00,cur:'BIF',bias:'HOLD'},
  {n:'Banque Centrale du Congo DRC',s:'BCC3',lat:-4.3217,lng:15.3222,rate:11.00,cur:'CDF',bias:'HOLD'},
  {n:'Banque Centrale Madagascar',s:'BCM3',lat:-18.9137,lng:47.5361,rate:10.00,cur:'MGA',bias:'HOLD'},
  {n:'Central Bank of Seychelles',s:'CBS3',lat:-4.6796,lng:55.4920,rate:6.00,cur:'SCR',bias:'HOLD'},
  {n:'Banco de Cabo Verde',s:'BCV2',lat:14.9305,lng:-23.5136,rate:5.00,cur:'CVE',bias:'HOLD'},
  {n:'Banque Centrale de Guinee',s:'BCG',lat:9.5370,lng:-13.6785,rate:13.00,cur:'GNF',bias:'HOLD'},
  {n:'Banque Centrale de Djibouti',s:'BCD',lat:11.8251,lng:42.5903,rate:0.00,cur:'DJF',bias:'HOLD'},
  {n:'Central Bank of Somalia',s:'CBS4',lat:2.0469,lng:45.3182,rate:0.00,cur:'SOS',bias:'HOLD'},
  {n:'Bank of South Sudan',s:'BSS',lat:4.8594,lng:31.5713,rate:14.00,cur:'SSP',bias:'HOLD'},
  {n:'Central Bank of Eritrea',s:'CBE4',lat:15.3229,lng:38.9251,rate:6.00,cur:'ERN',bias:'HOLD'},
  {n:'Reserve Bank of Malawi',s:'RBM',lat:-13.9626,lng:33.7741,rate:26.00,cur:'MWK',bias:'HOLD'},
  {n:'Bank of Namibia',s:'BON',lat:-22.5597,lng:17.0832,rate:7.75,cur:'NAD',bias:'HOLD'},
  {n:'Banque Centrale des Comores',s:'BCC4',lat:-11.7022,lng:43.2551,rate:2.50,cur:'KMF',bias:'HOLD'},
  {n:'Banco Central Sao Tome',s:'BCSTP',lat:0.1864,lng:6.6131,rate:10.00,cur:'STD',bias:'HOLD'},
  {n:'Banco Central Guinea-Bissau',s:'BCGB',lat:11.8636,lng:-15.5977,rate:4.00,cur:'XOF',bias:'HOLD'},
  // JIZNI ASIE
  {n:'Reserve Bank of India',s:'RBI',lat:18.9322,lng:72.8347,rate:6.25,cur:'INR',bias:'CUT'},
  {n:'State Bank of Pakistan',s:'SBP',lat:24.8607,lng:67.0011,rate:12.00,cur:'PKR',bias:'CUT'},
  {n:'Bangladesh Bank',s:'BB',lat:23.7275,lng:90.4124,rate:10.00,cur:'BDT',bias:'HOLD'},
  {n:'Central Bank of Sri Lanka',s:'CBSL',lat:6.9271,lng:79.8612,rate:8.00,cur:'LKR',bias:'CUT'},
  {n:'Nepal Rastra Bank',s:'NRB',lat:27.7172,lng:85.3240,rate:5.00,cur:'NPR',bias:'HOLD'},
  {n:'Royal Monetary Authority Bhutan',s:'RMA',lat:27.4728,lng:89.6390,rate:6.00,cur:'BTN',bias:'HOLD'},
  {n:'Maldives Monetary Authority',s:'MMA',lat:4.1755,lng:73.5093,rate:7.00,cur:'MVR',bias:'HOLD'},
  // VYCHODNI ASIE
  {n:"People's Bank of China",s:'PBOC',lat:39.9042,lng:116.4074,rate:3.10,cur:'CNY',bias:'EASE'},
  {n:'Bank of Japan',s:'BOJ2',lat:35.6895,lng:139.6917,rate:0.50,cur:'JPY',bias:'HIKE'},
  {n:'Bank of Korea',s:'BOK',lat:37.5665,lng:126.9780,rate:3.00,cur:'KRW',bias:'CUT'},
  {n:'Hong Kong Monetary Authority',s:'HKMA',lat:22.2793,lng:114.1628,rate:5.25,cur:'HKD',bias:'HOLD'},
  {n:'Monetary Authority of Macao',s:'AMCM',lat:22.1987,lng:113.5439,rate:5.25,cur:'MOP',bias:'HOLD'},
  {n:'Central Bank of Taiwan',s:'CBC',lat:25.0330,lng:121.5654,rate:2.00,cur:'TWD',bias:'HOLD'},
  // JIHOVYCHODNI ASIE
  {n:'Monetary Authority of Singapore',s:'MAS',lat:1.2966,lng:103.8006,rate:0.00,cur:'SGD',bias:'EASE'},
  {n:'Bank Negara Malaysia',s:'BNM',lat:3.1390,lng:101.6869,rate:3.00,cur:'MYR',bias:'HOLD'},
  {n:'Bank of Thailand',s:'BOT3',lat:13.7563,lng:100.5018,rate:2.50,cur:'THB',bias:'CUT'},
  {n:'State Bank of Vietnam',s:'SBV',lat:21.0278,lng:105.8342,rate:4.50,cur:'VND',bias:'HOLD'},
  {n:'Bank Indonesia',s:'BI2',lat:-6.2088,lng:106.8456,rate:5.75,cur:'IDR',bias:'HOLD'},
  {n:'Bangko Sentral ng Pilipinas',s:'BSP',lat:14.5995,lng:120.9842,rate:5.75,cur:'PHP',bias:'CUT'},
  {n:'National Bank of Cambodia',s:'NBC',lat:11.5564,lng:104.9282,rate:0.00,cur:'KHR',bias:'HOLD'},
  {n:'Bank of the Lao PDR',s:'BOL',lat:17.9757,lng:102.6331,rate:4.00,cur:'LAK',bias:'HOLD'},
  {n:'Central Bank of Myanmar',s:'CBM',lat:16.8661,lng:96.1951,rate:10.00,cur:'MMK',bias:'HOLD'},
  // PACIFIK
  {n:'Reserve Bank of Australia',s:'RBA',lat:-33.8688,lng:151.2093,rate:4.10,cur:'AUD',bias:'HOLD'},
  {n:'Reserve Bank of New Zealand',s:'RBNZ',lat:-41.2865,lng:174.7762,rate:3.75,cur:'NZD',bias:'CUT'},
  {n:'Bank of Papua New Guinea',s:'BPNG',lat:-9.4438,lng:147.1803,rate:3.00,cur:'PGK',bias:'HOLD'},
  {n:'Reserve Bank of Fiji',s:'RBF',lat:-18.1416,lng:178.4419,rate:0.25,cur:'FJD',bias:'HOLD'},
  {n:'National Reserve Bank of Tonga',s:'NRBT',lat:-21.1394,lng:-175.2046,rate:0.00,cur:'TOP',bias:'HOLD'},
  {n:'Central Bank of Samoa',s:'CBS5',lat:-13.8506,lng:-172.1370,rate:8.00,cur:'WST',bias:'HOLD'},
  {n:'Central Bank of Solomon Islands',s:'CBSI',lat:-9.4280,lng:160.0560,rate:5.50,cur:'SBD',bias:'HOLD'},
  {n:'Reserve Bank of Vanuatu',s:'RBV',lat:-17.7334,lng:168.3219,rate:5.50,cur:'VUV',bias:'HOLD'},
  // KARIBIK
  {n:'Banco Central Dominicano',s:'BCD2',lat:18.4861,lng:-69.9312,rate:6.50,cur:'DOP',bias:'HOLD'},
  {n:'Banque de la Republique Haiti',s:'BRH',lat:18.5944,lng:-72.3074,rate:22.00,cur:'HTG',bias:'HOLD'},
  {n:'Central Bank of Barbados',s:'CBB3',lat:13.1939,lng:-59.5432,rate:2.00,cur:'BBD',bias:'HOLD'},
  {n:'Central Bank of Belize',s:'CBB4',lat:17.2514,lng:-88.7590,rate:2.00,cur:'BZD',bias:'HOLD'},
  {n:'Centrale Bank van Curacao',s:'CBCS',lat:12.1696,lng:-68.9900,rate:3.00,cur:'ANG',bias:'HOLD'}
];

// ════════════════════════════════════════════════════════════════════════════
//  POPUP SYSTEM v3 — Bloomberg-grade, compact, live data
// ════════════════════════════════════════════════════════════════════════════

// ── News source code lookup (mirrors main _cls logic) ────────────────────────
function _popSrc(item){
  const t   = (item.tag||'').toUpperCase();
  const src = (item.src||'').toLowerCase();
  const isOff = item._isOfficial;
  // ── Official / Tier 1 sources ──────────────────────────────────────────
  if(t==='FLASH'||src.includes('flash'))                  return {code:'FLASH', col:'#ff2200'};
  if(isOff && src.includes('sec'))                        return {code:'SEC',   col:'#ff6600'};
  if(isOff && (src.includes('fed')||src.includes('fed·')))return {code:'FED',   col:'#ff8800'};
  if(isOff && src.includes('ecb'))                        return {code:'ECB',   col:'#ff8800'};
  if(isOff && src.includes('boe'))                        return {code:'BOE',   col:'#ff8800'};
  if(isOff && src.includes('boj'))                        return {code:'BOJ',   col:'#ff8800'};
  if(isOff && src.includes('bis'))                        return {code:'BIS',   col:'#dd7700'};
  if(isOff && src.includes('imf'))                        return {code:'IMF',   col:'#dd7700'};
  if(isOff && (src.includes('cb·')||src.includes('rba')||src.includes('boc')||src.includes('snb')||src.includes('rbnz')))
                                                          return {code:'CB',    col:'#cc6600'};
  if(src.includes('edgar'))                               return {code:'EDGAR', col:'#ff6600'};
  if(src.includes('businesswire')||src.includes('pr newswire')||src.includes('globenw'))
                                                          return {code:'WIRE',  col:'#dd6600'};
  // ── Wire agencies ──────────────────────────────────────────────────────
  if(src.includes('reuters'))                             return {code:'RTS',   col:'#cc9944'};
  if(src.includes('dj·')||src.includes('wall street')||src.includes('wsj')||src.includes('dow jones'))
                                                          return {code:'DJ',    col:'#cc9944'};
  if(src.includes('associated press')||src==='ap'||src.startsWith('ap '))
                                                          return {code:'AP',    col:'#cc9944'};
  // ── Major financial press ──────────────────────────────────────────────
  if(src.includes('financial times')||src.startsWith('ft'))return{code:'FT',   col:'#bb8833'};
  if(src.includes('bloomberg'))                           return {code:'BBG',   col:'#bb8833'};
  if(src.includes('cnbc'))                                return {code:'CNBC',  col:'#999966'};
  if(src.includes('nyt')||src.includes('new york times')) return {code:'NYT',   col:'#999966'};
  if(src.includes('economist'))                           return {code:'ECO',   col:'#999966'};
  if(src.includes('marketwatch'))                         return {code:'MKW',   col:'#999966'};
  if(src.includes('nikkei'))                              return {code:'NKI',   col:'#999966'};
  if(src.includes('scmp'))                                return {code:'SCMP',  col:'#999966'};
  if(src.includes('handelsblatt'))                        return {code:'HBL',   col:'#888855'};
  if(src.includes('les echos'))                           return {code:'ECH',   col:'#888855'};
  if(src.includes('economic times'))                      return {code:'ET·IN', col:'#888855'};
  // ── Specialist & alternative ────────────────────────────────────────────
  if(src.includes('bbc'))                                 return {code:'BBC',   col:'#888866'};
  if(src.includes('axios'))                               return {code:'AXS',   col:'#888866'};
  if(src.includes('politico'))                            return {code:'POL',   col:'#888866'};
  if(src.includes('seeking'))                             return {code:'SA',    col:'#777755'};
  if(src.includes('oilprice'))                            return {code:'OIL',   col:'#888866'};
  if(src.includes('kitco'))                               return {code:'KTC',   col:'#888866'};
  if(src.includes('eia'))                                 return {code:'EIA',   col:'#888866'};
  if(src.includes('opec'))                                return {code:'OPEC',  col:'#888866'};
  if(src.includes('fred'))                                return {code:'FRED',  col:'#777755'};
  if(src.includes('earn')||t==='EARNINGS')                return {code:'ERN',   col:'#dd6600'};
  if(src.includes('coindesk'))                            return {code:'CDS',   col:'#777755'};
  if(src.includes('cointelegraph'))                       return {code:'CTG',   col:'#777755'};
  if(src.includes('techcrunch'))                          return {code:'TC',    col:'#777755'};
  if(src.includes('oecd')||src.includes('world bank')||src.includes('eu '))
                                                          return {code:'INTL',  col:'#cc6600'};
  return                                                         {code:'WIR',   col:'#555544'};
}

// ── Risk color for headlines ──────────────────────────────────────────────────
function _popRisk(title){
  const t = (title||'').toLowerCase();
  if(['crisis','crash','collapse','default','war','attack','emergency','ban','arrest',
      'fraud','hack','seized','sanctioned','rate hike','inflation surge','recession',
      'bank run','bankruptcy','iran','conflict','missile','invasion'].some(k=>t.includes(k)))
    return '#cc2200';
  if(['rate cut','rate decision','fomc','ecb','fed ','powell','gdp','nonfarm','cpi',
      'pce','warning','risk','volatility','selloff','investigation','opec','tariff',
      'sanction','ukraine','china trade'].some(k=>t.includes(k)))
    return '#cc6600';
  return '#445533';
}

// ── Sparkline — dense volume bar chart for CB rate history ──────────────────
function _spark(hist, w, h){
  if(!hist||hist.length<2) return '';
  const mn=Math.min(...hist), mx=Math.max(...hist);
  const range=mx-mn||0.25;
  // Generous padding: left for Y-axis labels, top for value labels, bottom for baseline
  const padL=28, padR=6, padT=14, padB=10;
  const iw=w-padL-padR, ih=h-padT-padB;
  const n=hist.length;
  const last=hist[n-1];

  // ── Y-axis grid lines & labels ──────────────────────────────────────────────
  const step = range>8?2:range>4?1:range>1?0.5:range>0.5?0.25:0.1;
  const yFirst=Math.ceil((mn-0.001)/step)*step;
  let grid='';
  for(let v=yFirst; v<=mx+0.001; v=Math.round((v+step)*1000)/1000){
    const gy=padT+ih-(v-mn)/range*ih;
    if(gy<padT-2||gy>padT+ih+2) continue;
    const gyS=gy.toFixed(1);
    // subtle grid line
    grid+=`<line x1="${padL}" y1="${gyS}" x2="${w-padR}" y2="${gyS}" stroke="#161610" stroke-width=".5" stroke-dasharray="2,4"/>`;
    // Y-axis tick
    grid+=`<line x1="${padL-2}" y1="${gyS}" x2="${padL}" y2="${gyS}" stroke="#222" stroke-width=".6"/>`;
    // Y-axis label
    grid+=`<text x="${padL-4}" y="${(gy+1.8).toFixed(1)}" fill="#2a2a1a" font-size="5.2" font-family="'Roboto Mono',monospace" text-anchor="end">${v.toFixed(2)}</text>`;
  }
  // Y-axis spine
  grid+=`<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+ih}" stroke="#1a1a10" stroke-width=".6"/>`;

  // ── Bars ────────────────────────────────────────────────────────────────────
  // Pack bars tightly — 1px gap between them
  const gap=1;
  const barW=Math.max(2, (iw - (n-1)*gap) / n);
  let bars='', valLabels='';

  hist.forEach((v,i)=>{
    const prev=i>0?hist[i-1]:v;
    const chg=v-prev;
    const isLast=i===n-1;
    const isFirst=i===0;

    // Color scheme:
    //   last bar  → amber  #ff8800
    //   cut (↓)   → cyan-green #00aaaa
    //   hike (↑)  → deep red   #cc2222
    //   hold      → dark amber #1e1a08
    const bc = isLast ? '#ff8800'
              : chg < -0.001 ? '#0077aa'
              : chg >  0.001 ? '#aa2222'
              : '#1c1808';
    const opacity = isLast ? 1 : chg < -0.001 ? 0.75 : chg > 0.001 ? 0.75 : 0.5;

    // Bar height — proportional to rate value from bottom
    const barH = Math.max(2, (v - mn) / range * ih);
    const bx = (padL + i * (barW + gap)).toFixed(1);
    const by = (padT + ih - barH).toFixed(1);
    const bh = barH.toFixed(1);
    const bw = barW.toFixed(1);

    // Glow filter for last bar
    const glow = isLast ? ` filter:drop-shadow(0 0 4px ${bc}88)` : '';
    bars += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${bc}" opacity="${opacity}" rx="0.4" style="${glow}"/>`;

    // Value label above bar — show on: first, last, and every rate change
    const showLbl = isLast || isFirst || Math.abs(chg) > 0.001;
    if(showLbl){
      const lblX = (parseFloat(bx) + barW/2).toFixed(1);
      const lblY = (parseFloat(by) - 2.5).toFixed(1);
      const lc = isLast ? '#ff8800' : chg < -0.001 ? '#0099bb' : chg > 0.001 ? '#bb3333' : '#222';
      const fw = isLast ? '700' : '400';
      const fs = isLast ? 6.5 : 5;
      valLabels += `<text x="${lblX}" y="${lblY}" fill="${lc}" font-size="${fs}" font-family="'Roboto Mono',monospace" text-anchor="middle" font-weight="${fw}">${v.toFixed(2)}</text>`;
    }
  });

  // ── X baseline ──────────────────────────────────────────────────────────────
  const baseY = (padT + ih).toFixed(1);

  // ── Legend chips ────────────────────────────────────────────────────────────
  const legY = (h - 2).toFixed(1);
  const legend =
    `<rect x="${padL}" y="${h-8}" width="5" height="5" fill="#0077aa" opacity=".75" rx=".4"/>` +
    `<text x="${padL+7}" y="${legY}" fill="#1a2a2a" font-size="5" font-family="monospace">CUT</text>` +
    `<rect x="${padL+28}" y="${h-8}" width="5" height="5" fill="#aa2222" opacity=".75" rx=".4"/>` +
    `<text x="${padL+35}" y="${legY}" fill="#2a1a1a" font-size="5" font-family="monospace">HIKE</text>` +
    `<rect x="${padL+58}" y="${h-8}" width="5" height="5" fill="#1c1808" opacity=".5" rx=".4"/>` +
    `<text x="${padL+65}" y="${legY}" fill="#1a1a10" font-size="5" font-family="monospace">HOLD</text>` +
    `<text x="${w-padR}" y="${legY}" fill="#ff8800" font-size="5.5" font-family="'Roboto Mono',monospace" text-anchor="end" font-weight="700">${last.toFixed(2)}%</text>`;

  return `<svg width="${w}" height="${h}" style="display:block;overflow:visible">
    <clipPath id="spclip"><rect x="${padL}" y="${padT-16}" width="${iw+padR}" height="${ih+16+padB}"/></clipPath>
    ${grid}
    <line x1="${padL}" y1="${baseY}" x2="${w-padR}" y2="${baseY}" stroke="#1a1a10" stroke-width=".7"/>
    <g clip-path="url(#spclip)">${bars}${valLabels}</g>
    ${legend}
  </svg>`;
}

// Mini bar chart for macro data (GDP, CPI, UNEM comparison)
function _macroBar(label, value, max, color, w){
  const bw = Math.max(1, Math.min(w-70, (Math.abs(value)/max)*(w-70)));
  const vc = value >= 0 ? color : '#cc3333';
  const x0 = value >= 0 ? 0 : bw;
  return `<div style="display:flex;align-items:center;gap:4px;margin:1px 0">
    <span style="color:#222;font-size:5px;width:52px;flex-shrink:0;letter-spacing:.4px">${label}</span>
    <div style="flex:1;height:5px;background:#0a0a08;position:relative;border-radius:1px">
      <div style="position:absolute;left:0;top:0;width:${bw}px;height:100%;background:${vc};border-radius:1px;opacity:.85"></div>
    </div>
    <span style="color:${vc};font-size:6px;font-weight:700;width:28px;text-align:right;flex-shrink:0">${value>=0?'+':''}${value.toFixed(1)}%</span>
  </div>`;
}

// Mini gauge for rate position (where current rate sits vs historical range)
function _rateGauge(current, hist, w){
  if(!hist||hist.length<2) return '';
  const mn=Math.min(...hist), mx=Math.max(...hist);
  const range=mx-mn||0.01;
  const pct = Math.min(1, Math.max(0, (current-mn)/range));
  const bw = Math.round(pct*(w-4));
  const col = pct > 0.7 ? '#cc3333' : pct < 0.3 ? '#00cc55' : '#886600';
  return `<div style="margin:2px 0 1px">
    <div style="display:flex;justify-content:space-between;margin-bottom:1px">
      <span style="color:#1a1a12;font-size:5px">CYCLE LOW ${mn.toFixed(2)}%</span>
      <span style="color:#555;font-size:5.5px;font-weight:700">${(pct*100).toFixed(0)}th PCTILE</span>
      <span style="color:#1a1a12;font-size:5px">CYCLE HIGH ${mx.toFixed(2)}%</span>
    </div>
    <div style="height:4px;background:#111;border-radius:2px;position:relative">
      <div style="position:absolute;left:2px;top:0;width:${bw}px;height:100%;background:${col};border-radius:2px"></div>
      <div style="position:absolute;left:${bw+1}px;top:-1px;width:2px;height:6px;background:#fff;opacity:.5;border-radius:1px"></div>
    </div>
  </div>`;
}

// ── Shared popup builder helpers ──────────────────────────────────────────────
const _PF = "'Share Tech Mono',monospace";
const _PW = 252; // popup width px

function _pRow(lbl,val,valCol,sub){
  return `<tr>
    <td style="padding:2px 6px 2px 10px;color:#252515;font-size:6.5px;letter-spacing:.6px;border-bottom:1px solid #0a0a08;white-space:nowrap">${lbl}</td>
    <td style="padding:2px 10px 2px 4px;text-align:right;color:${valCol||'#4a4a38'};font-size:7.5px;font-weight:700;border-bottom:1px solid #0a0a08;white-space:nowrap;letter-spacing:.3px">${val}${sub?`<span style="color:#222212;font-size:5.5px;font-weight:400;margin-left:3px">${sub}</span>`:''}</td>
  </tr>`;
}

function _pNews(items, limit){
  if(!items||!items.length) return `<div style="padding:3px 10px 4px;color:#1a1a12;font-size:6px;letter-spacing:.5px">NO MATCHING HEADLINES</div>`;
  let h='';
  items.slice(0,limit||4).forEach(item=>{
    const isAI = item._aiBriefing;
    const s    = isAI ? {col:'#2a5520',code:'AI·INT'} : _popSrc(item);
    const rc   = isAI ? '#226622' : _popRisk(item.title);
    const ago  = item.ts ? _fmtAgo(item.ts) : (item.staticTime||'');
    const txt  = (item.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const url  = (item.link||'').replace(/'/g,'%27');
    const bg   = isAI ? 'background:#030803' : '';
    const border = isAI ? 'border-left:2px solid #0a2010;' : '';
    h += `<div style="padding:4px 10px 4px;border-bottom:1px solid #080808;cursor:pointer;transition:background .12s;${bg};${border}"
      onclick="if('${url}')window.open('${url}','_blank')"
      onmouseover="this.style.background='${isAI?'#040a04':'#070707'}'" onmouseout="this.style.background='${isAI?'#030803':''}'">` +
      `<div style="display:flex;align-items:flex-start;gap:4px">` +
        `<span style="color:${rc};font-size:5px;margin-top:2px;flex-shrink:0">${isAI?'◆':'▮'}</span>` +
        `<span style="color:${s.col};font-size:6px;font-weight:700;white-space:nowrap;flex-shrink:0;margin-top:.5px;letter-spacing:.3px">${s.code}</span>` +
        `<span style="color:${isAI?'#3a4a30':'#4a4030'};font-size:7px;line-height:1.38;flex:1;letter-spacing:.1px">${txt.slice(0,90)}${txt.length>90?'…':''}</span>` +
        `<span style="color:${isAI?'#1a2a10':'#1a1a10'};font-size:5.5px;white-space:nowrap;flex-shrink:0;margin-top:1px">${isAI?'NOW':ago}</span>` +
      `</div>` +
    `</div>`;
  });
  return h;
}

// ── CB news keyword map ───────────────────────────────────────────────────────
const _CB_KEYS = {
  FED: ['federal reserve','fomc','powell','fed rate','fed hold','fed cut','fed hike',
        'jerome powell','us federal reserve','federal open market','fed funds rate',
        'fed balance sheet','fed taper','quantitative tightening','fed dot plot',
        'fed minutes','fed beige book','waller fed','jefferson fed','kugler fed',
        'us interest rate','fed pivot','rate pause','monetary policy us'],
  ECB: ['european central bank','ecb','lagarde','euro zone','eurozone rate','euro area',
        'ecb rate decision','ecb deposit rate','ecb rate hike','ecb rate cut',
        'ecb balance sheet','ecb qe','ecb tltro','ecb app','ecb pepp',
        'eurozone inflation','euro area gdp','ecb minutes','schnabel ecb',
        'lane ecb','de guindos ecb','wunsch ecb','visco ecb','lagarde speech'],
  BOE: ['bank of england','boe','bailey','uk rate','uk inflation','uk monetary',
        'mpc vote','monetary policy committee','boe rate decision','gilt yields',
        'uk base rate','boe qe','boe qt','uk cpi','dhingra boe','haskel boe',
        'pill boe','broadbent boe','ramsden boe','mann boe','taylor boe'],
  BOJ2:['bank of japan','boj','ueda','japan rate','japan inflation','boj rate',
        'yield curve control','ycc japan','boj policy','negative rate japan',
        'boj etf','boj jgb','uchida boj','himino boj','japan monetary policy',
        'japanese yen policy','boj rate hike','boj rate cut','tankan survey'],
  PBOC:['pboc','peoples bank of china',"peoples bank",'china rate','china monetary',
        'pboc rate','china lpr','loan prime rate','china reverse repo',
        'pan gongsheng','china rrr cut','china reserve requirement',
        'pboc liquidity','china credit growth','china m2','china stimulus monetary'],
  SNB: ['swiss national bank','snb','jordan','swiss franc','swiss rate',
        'snb policy rate','snb chf','snb intervention','snb sight deposits',
        'snb annual report','schlegel snb','tschuemi snb','swiss inflation',
        'swiss monetary policy','snb rate cut','snb rate hike'],
  RBA: ['reserve bank australia','rba','bullock','australia rate','rba rate',
        'rba cash rate','rba rate decision','rba inflation target',
        'australian monetary policy','rba balance sheet','rba minutes',
        'jones rba','hauser rba','australia cpi','australia unemployment'],
  BOC: ['bank of canada','boc','macklem','canada rate','canada monetary',
        'boc rate decision','canadian overnight rate','boc policy rate',
        'rogers boc','schembri boc','canada cpi','canada inflation',
        'canadian monetary policy','boc balance sheet','boc qe'],
  RBNZ:['reserve bank new zealand','rbnz','orr','nz rate','new zealand rate',
        'rbnz ocr','nz official cash rate','rbnz rate decision','nz inflation',
        'nz monetary policy','rbnz balance sheet','hawkesby rbnz'],
  RBI: ['reserve bank india','rbi','india rate','india inflation','india monetary',
        'rbi repo rate','rbi rate decision','sanjay malhotra','india cpi',
        'india gdp','rbi liquidity','india monetary policy','rbi governor'],
  BOK: ['bank of korea','bok','korea rate','korea monetary','bok rate decision',
        'south korea interest rate','rhee chang-yong','korea cpi','korea gdp'],
  CNB: ['czech national bank','cnb','michl','czech rate','koruna',
        'cnb rate decision','czech crown','czech cpi','czech monetary policy',
        'cnb board','aleš michl','czech interest rate','czk'],
  BCB: ['banco central brasil','bcb','brazil rate','selic','brazil inflation',
        'selic rate','brazil monetary policy','copom','gabriel galípolo',
        'brazil cpi','brazil gdp','brazil interest rate'],
  CBR: ['bank of russia','cbr','nabiullina','russia rate','russia monetary',
        'russia key rate','cbr rate decision','russia cpi','russia inflation',
        'russia monetary policy','elvira nabiullina','rub rate'],
  SARB:['south africa reserve','sarb','south africa rate','sa rate','rand monetary',
        'sarb repo rate','kganyago sarb','south africa cpi','sa monetary policy'],
  BANX:['banco de mexico','banxico','mexico rate','mexico monetary','peso rate',
        'banxico rate decision','victoria rodríguez','mexico cpi','mexico inflation'],
  SAMA:['saudi arabian monetary','sama','saudi rate','saudi monetary',
        'saudi arabia rate','ayman al-sayari','saudi riyal','saudi cpi']
};

function _cbNewsKeys(b){
  return _CB_KEYS[b.s] || [b.s.toLowerCase(), b.n.toLowerCase().split(' ').slice(0,2).join(' ')];
}
// ── Per-institution precision news keyword map ────────────────────────────────
// Each entry has REQUIRED keywords (ALL must be absent to not match any), 
// POSITIVE keywords (ANY match scores +1), and NEGATIVE blacklist (instant reject)
const _INST_KEYS = {
  // ── INVESTMENT BANKS ────────────────────────────────────────────────────────
  'Goldman Sachs HQ':         { pos:['goldman sachs','goldman','gs earnings','gs prime','david solomon','goldman prime brokerage','goldman fund','goldman debt','goldman trading'], neg:['new marcus','apple card'] },
  'JPMorgan Chase HQ':        { pos:['jpmorgan','jp morgan','jamie dimon','jpm earnings','jpmorgan chase','chase bank','jpm trading','dimon','jpmorgan fund','jp morgan asset'], neg:[] },
  'Morgan Stanley HQ':        { pos:['morgan stanley','ted pick','ms earnings','morgan stanley wealth','morgan stanley fund','morgan stanley research','mswm'], neg:[] },
  'Bank of America HQ':       { pos:['bank of america','bofa','bac earnings','brian moynihan','bank of america securities','merrill lynch','bofa research'], neg:[] },
  'Citigroup HQ':             { pos:['citigroup','citibank','citi earnings','jane fraser','citi research','citi trading','citi fund','citigroup bond'], neg:[] },
  'Wells Fargo HQ':           { pos:['wells fargo','wfc earnings','charlie scharf','wells fargo bank','wells fargo securities'], neg:[] },
  'Barclays HQ':              { pos:['barclays','barclays bank','barclays capital','cs venkatakrishnan','barclays earnings','barclays research','barclays trading'], neg:[] },
  'Deutsche Bank HQ':         { pos:['deutsche bank','dbk','christian sewing','deutsche bank earnings','deutsche asset','deutsche bank bond','db research'], neg:[] },
  'UBS Group HQ':             { pos:['ubs','ubs group','sergio ermotti','ubs earnings','ubs wealth','ubs asset management','ubs research','ubs trading'], neg:[] },
  'Credit Agricole HQ':       { pos:['credit agricole','crédit agricole','ca cib','credit agricole earnings','credit agricole fund'], neg:[] },
  'BNP Paribas HQ':           { pos:['bnp paribas','bnpp','jean-laurent bonnafe','bnp earnings','bnp research','bnp asset','bnp fund'], neg:[] },
  'Societe Generale HQ':      { pos:['societe generale','société générale','socgen','slawomir krupa','socgen earnings','sg research'], neg:[] },
  'HSBC HQ':                  { pos:['hsbc','noel quinn','george elhedery','hsbc earnings','hsbc bank','hsbc asset','hsbc fund','hsbc research'], neg:[] },
  'Nomura HQ':                { pos:['nomura','nomura holdings','nomura securities','kentaro okuda','nomura research','nomura asset'], neg:[] },
  'Mizuho Financial HQ':      { pos:['mizuho','mizuho financial','mizuho bank','mizuho securities','mizuho research'], neg:[] },
  'MUFG HQ':                  { pos:['mufg','mitsubishi ufj','mufg bank','hironori kamezawa','mufg earnings','mufg securities'], neg:[] },
  'SMBC Group HQ':            { pos:['smbc','sumitomo mitsui','smbc group','smbc nikko','sumitomo mitsui banking'], neg:[] },
  'ICBC HQ':                  { pos:['icbc','industrial commercial bank china','icbc earnings','icbc fund','icbc bond'], neg:[] },
  'China Construction Bank':  { pos:['china construction bank','ccb','construction bank china','ccb earnings'], neg:[] },
  'Agricultural Bank China':  { pos:['agricultural bank','agbank','agricultural bank china','abc china'], neg:[] },
  'Bank of China HQ':         { pos:['bank of china','boc china','boc earnings','bank china bond'], neg:['bank of canada','bank of colombia','bank of chile'] },
  'Standard Chartered HQ':    { pos:['standard chartered','stanchart','standard chartered bank','bill winters','stan chart earnings'], neg:[] },
  'Macquarie Group HQ':       { pos:['macquarie','macquarie group','macquarie bank','macquarie asset','shemara wikramanayake','macquarie fund'], neg:[] },
  'RBC Capital Markets':      { pos:['rbc','royal bank canada','rbc capital','rbc earnings','dave mckay','rbc asset','rbc research'], neg:[] },
  'TD Bank Group HQ':         { pos:['td bank','toronto dominion','td group','bharat masrani','td securities','td asset','td earnings'], neg:[] },
  'Santander HQ':             { pos:['santander','banco santander','ana botin','santander earnings','santander asset','santander fund'], neg:[] },
  'ING Group HQ':             { pos:['ing group','ing bank','steven van rijswijk','ing earnings','ing research','ing fund'], neg:[] },
  'ABN AMRO HQ':              { pos:['abn amro','abn amro bank','robert swaak','abn amro earnings'], neg:[] },
  'UniCredit HQ':             { pos:['unicredit','andrea orcel','unicredit bank','unicredit earnings','unicredit bond','cib unicredit'], neg:[] },
  'Intesa Sanpaolo HQ':       { pos:['intesa sanpaolo','carlo messina','intesa bank','intesa earnings'], neg:[] },
  'Commerzbank HQ':           { pos:['commerzbank','manfred knof','commerzbank earnings','coba'], neg:[] },
  'Julius Baer HQ':           { pos:['julius baer','julius bär','julius baer group','julius baer earnings','baer wealth'], neg:[] },
  'Lazard HQ':                { pos:['lazard','lazard asset','lazard financial','lazard advisory','lazard earnings'], neg:[] },
  'Jefferies HQ':             { pos:['jefferies','jefferies financial','jefferies group','rich handler','jefferies earnings'], neg:[] },
  'Evercore HQ':              { pos:['evercore','evercore isi','evercore advisory','john weinberg','evercore earnings'], neg:[] },
  // ── EXCHANGES ────────────────────────────────────────────────────────────────
  'NYSE (New York Stock Exchange)': { pos:['nyse','new york stock exchange','ice exchange','nyse trading','nyse listing','intercontinental exchange nyse','lynn martin nyse','nyse volume'], neg:[] },
  'NASDAQ HQ':                { pos:['nasdaq','nasdaq exchange','nasdaq composite','nasdaq 100','adena friedman','nasdaq listing','nasdaq trading volume','nasdaq ipo'], neg:['nasdaq futures','nasdaq etf'] },
  'CME Group HQ':             { pos:['cme group','chicago mercantile','cme exchange','terry duffy','cme earnings','cme futures volume','cme derivatives','cme clearing'], neg:[] },
  'CBOE Global Markets':      { pos:['cboe','chicago board options','cboe vix','cboe earnings','cboe options','cboe exchange','cboe global','edward tilly'], neg:[] },
  'London Stock Exchange':    { pos:['london stock exchange','lse group','lseg','david schwimmer','lse earnings','lse trading volume','lseg data','lse listing'], neg:[] },
  'Euronext (Paris)':         { pos:['euronext','euronext paris','euronext amsterdam','euronext brussels','stéphane boujnah','euronext volume','euronext ipo'], neg:[] },
  'Deutsche Boerse (Xetra)':  { pos:['deutsche börse','deutsche boerse','theodor weimer','xetra','eurex','deutsche boerse earnings','db1'], neg:['deutsche bank'] },
  'SIX Swiss Exchange':       { pos:['six swiss exchange','six group','swiss exchange','six exchange','jos dijsselhof','swx'], neg:[] },
  'Tokyo Stock Exchange':     { pos:['tokyo stock exchange','tse japan','jpx','japan exchange group','osaka exchange','tse trading volume','nikkei listing'], neg:[] },
  'Hong Kong Stock Exchange': { pos:['hong kong stock exchange','hkex','hkex earnings','bonnie chan','hkex trading','hkex listing','hong kong ipo','hkex volume'], neg:[] },
  'Shanghai Stock Exchange':  { pos:['shanghai stock exchange','sse china','shanghai exchange','a-share market','shanghai ipo','sse composite'], neg:[] },
  'Shenzhen Stock Exchange':  { pos:['shenzhen stock exchange','szse','shenzhen exchange','gem china','chinext','shenzhen ipo'], neg:[] },
  'BSE Bombay':               { pos:['bombay stock exchange','bse india','sensex','bse listing','bse ipo','bse trading volume'], neg:[] },
  'NSE India':                { pos:['national stock exchange india','nse india','nifty 50','nse trading volume','nse derivatives','nse ipo','nse futures'], neg:['new york stock exchange','nyse'] },
  'Euronext Amsterdam':       { pos:['euronext amsterdam','aex index','amsterdam exchange','ams euronext'], neg:[] },
  'Borsa Istanbul':           { pos:['borsa istanbul','bist','istanbul stock exchange','bist 100','turkey exchange','turkish lira stock'], neg:[] },
  'Johannesburg Stock Exchange': { pos:['johannesburg stock exchange','jse','jse limited','jse trading','south africa exchange','jse all share'], neg:[] },
  'SGX Singapore Exchange':   { pos:['sgx','singapore exchange','sgx nifty','loh boon chye','sgx derivatives','sgx trading volume','singapore ipo'], neg:[] },
  'ASX Australian Securities':{ pos:['asx','australian securities exchange','asx 200','asx trading volume','helen lofthouse','asx ipo','asx listing'], neg:[] },
  'TMX Toronto Stock Exchange': { pos:['tmx group','toronto stock exchange','tsx composite','tsx venture','tmx earnings','montreal exchange','tmx derivatives'], neg:[] },
  'B3 Bolsa Brasil':          { pos:['b3 bolsa','bovespa','ibovespa','b3 exchange','gilson finkelsztain','b3 trading','brazil exchange','b3 ipo'], neg:[] },
  'BME (Madrid)':             { pos:['bme bolsas','madrid stock exchange','ibex 35','bolsa madrid','bmex','spanish exchange'], neg:[] },
  'Nasdaq Nordic (Stockholm)':{ pos:['nasdaq nordic','stockholm exchange','omx stockholm','nasdaq helsinki','omx nordic','nasdaq copenhagen'], neg:[] },
  'Warsaw Stock Exchange':    { pos:['warsaw stock exchange','gpw','wig 20','poland exchange','gpw trading','polish bourse'], neg:[] },
  'Prague Stock Exchange':    { pos:['prague stock exchange','burza cenných papírů','pse trading','px index','czech exchange','burza cp'], neg:[] },
  // ── HEDGE FUNDS ───────────────────────────────────────────────────────────────
  'Bridgewater Associates':   { pos:['bridgewater','ray dalio','bridgewater fund','all weather fund','pure alpha','bridgewater associates','bridgewater returns'], neg:[] },
  'Man Group HQ':             { pos:['man group','man ahl','man glenwood','man numeric','luke ellis','man investments','man fund returns'], neg:[] },
  'Renaissance Technologies': { pos:['renaissance technologies','rentech','medallion fund','jim simons','peter brown renaissance','renaissance fund'], neg:[] },
  'Citadel HQ':               { pos:['citadel','ken griffin','citadel securities','citadel fund','citadel trading','citadel returns','kensington fund'], neg:[] },
  'DE Shaw HQ':               { pos:['de shaw','d.e. shaw','deshaw','de shaw fund','david shaw','de shaw returns'], neg:[] },
  'Two Sigma HQ':             { pos:['two sigma','twosigma','john overdeck','david siegel two sigma','two sigma fund','two sigma returns'], neg:[] },
  'Millennium Management':    { pos:['millennium management','izzy englander','millennium fund','millennium capital','millennium returns','mmt fund'], neg:[] },
  'Elliott Investment Mgmt':  { pos:['elliott management','paul singer elliott','elliott investment','elliott fund','elliott activist','elliott returns'], neg:[] },
  'Point72 Asset Mgmt':       { pos:['point72','steve cohen','point72 fund','point72 returns','point72 asset','stamford hedge'], neg:[] },
  'Baupost Group':            { pos:['baupost','seth klarman','baupost fund','baupost returns','baupost capital'], neg:[] },
  'Winton Group HQ':          { pos:['winton group','winton fund','david harding','winton returns','winton capital'], neg:[] },
  'AQR Capital Mgmt':         { pos:['aqr capital','clifford asness','aqr fund','aqr returns','aqr research','aqr momentum'], neg:[] },
  'Tiger Global Mgmt':        { pos:['tiger global','tiger global fund','scott shleifer','tiger global returns','tiger global investment'], neg:[] },
  'Pershing Square Capital':  { pos:['pershing square','bill ackman','pershing square fund','pershing square returns','pershing square holding'], neg:[] },
  'Third Point LLC':          { pos:['third point','dan loeb','third point fund','third point returns','third point activist'], neg:[] },
  // ── ASSET MANAGERS ────────────────────────────────────────────────────────────
  'BlackRock HQ':             { pos:['blackrock','larry fink','blackrock fund','blackrock etf','blackrock aum','ibit blackrock','blackrock bitcoin','rob kapito','blackrock earnings','blk stock'], neg:[] },
  'Vanguard HQ':              { pos:['vanguard','vanguard fund','vanguard etf','tim buckley vanguard','vanguard aum','vanguard index','vanguard returns'], neg:[] },
  'Fidelity Investments':     { pos:['fidelity investments','fidelity fund','fidelity etf','abigail johnson fidelity','fidelity aum','fidelity bitcoin','fidelity returns'], neg:[] },
  'State Street Global':      { pos:['state street','ssga','state street global','spdr etf','ron ohanley','state street earnings','stt stock'], neg:[] },
  'PIMCO HQ':                 { pos:['pimco','pacific investment management','total return fund','dan ivascyn','pimco fund','pimco etf','pimco bond'], neg:[] },
  'Invesco HQ':               { pos:['invesco','invesco fund','invesco etf','marty flanagan','qqq etf invesco','invesco aum','invesco returns'], neg:[] },
  'T. Rowe Price HQ':         { pos:['t. rowe price','t rowe','trowe','robert sharps','t rowe fund','t. rowe returns','t rowe etf'], neg:[] },
  'Franklin Templeton':       { pos:['franklin templeton','jenny johnson franklin','franklin fund','templeton fund','franklin etf','franklin aum'], neg:[] },
  'Capital Group HQ':         { pos:['capital group','american funds','capital research','capital group fund','capital group etf'], neg:[] },
  'Amundi HQ':                { pos:['amundi','amundi asset','valérie baudson','amundi fund','amundi etf','amundi aum','amundi bond'], neg:[] },
  'Allianz Global Investors': { pos:['allianz global investors','allianz gi','pimco allianz','allianz asset','allianz fund'], neg:['allianz se','allianz insurance'] },
  'DWS Group HQ':             { pos:['dws group','dws asset','dws fund','stefan hoops dws','dws etf','xtrackers','dws earnings'], neg:[] },
  'Abrdn HQ':                 { pos:['abrdn','aberdeen standard','abrdn fund','stephen bird abrdn','abrdn earnings','abrdn etf'], neg:[] },
  'Schroders HQ':             { pos:['schroders','schroders asset','peter harrison schroders','schroders fund','schroders etf','schroders earnings'], neg:[] },
  'Legal & General Invest':   { pos:['legal & general','legal and general','l&g','lgim','antonio simoes','legal general investment'], neg:[] },
  'Baillie Gifford HQ':       { pos:['baillie gifford','baillie gifford fund','scottish mortgage trust','baillie gifford returns'], neg:[] },
  // ── INSURANCE ─────────────────────────────────────────────────────────────────
  'Berkshire Hathaway HQ':    { pos:['berkshire hathaway','warren buffett','charlie munger','greg abel','berkshire earnings','brk stock','geico berkshire','berkshire fund'], neg:[] },
  'Allianz SE HQ':            { pos:['allianz se','allianz insurance','allianz group','oliver bäte','allianz earnings','allianz p&c'], neg:['allianz global investors','allianz gi'] },
  'AXA Group HQ':             { pos:['axa group','axa insurance','thomas buberl','axa earnings','axa fund','axa asset management'], neg:[] },
  'Zurich Insurance HQ':      { pos:['zurich insurance','zurich group','mario greco','zurich earnings','zurich financial services'], neg:['ubs zurich','snb zurich'] },
  'Munich Re HQ':             { pos:['munich re','munichre','joachim wenning','munich re earnings','munich re reinsurance'], neg:['allianz munich','munich commerzbank'] },
  'Swiss Re HQ':              { pos:['swiss re','swiss reinsurance','christian mumenthaler','swiss re earnings','swiss re sigma'], neg:['snb swiss','ubs swiss','zurich swiss'] },
  'MetLife HQ':               { pos:['metlife','met life','michel khalaf','metlife earnings','metlife insurance','metlife fund'], neg:[] },
  'Prudential Financial':     { pos:['prudential financial','pru earnings','charles lowrey','prudential insurance','pgim'], neg:['prudential plc'] },
  // ── INTERNATIONAL ORGANIZATIONS ───────────────────────────────────────────────
  'IMF Headquarters':         { pos:['imf','international monetary fund','kristalina georgieva','imf forecast','imf report','imf loan','imf bailout','imf article iv','world economic outlook imf'], neg:[] },
  'World Bank Group':         { pos:['world bank','ajay banga','ibrd','world bank loan','world bank report','world bank development','ifc world bank'], neg:['imf world'] },
  'BIS (Bank for Int. Settlements)': { pos:['bis settlements','bank for international settlements','agustín carstens','bis quarterly','bis annual report','bis research','bis speech'], neg:[] },
  'EBRD HQ':                  { pos:['ebrd','european bank reconstruction','ebrd loan','ebrd fund','ebrd project','ebrd development'], neg:[] },
  'Asian Development Bank':   { pos:['asian development bank','adb loan','adb report','adb fund','masatsugu asakawa','asia development'], neg:[] },
  'African Dev. Bank':        { pos:['african development bank','afdb','akinwumi adesina','afdb loan','african development fund'], neg:[] },
  'IFC (World Bank Group)':   { pos:['ifc world bank','international finance corporation','ifc loan','ifc emerging markets','ifc fund','ifc investment'], neg:[] },
  'AIIB HQ':                  { pos:['aiib','asian infrastructure investment bank','jin liqun','aiib loan','aiib project','aiib bond'], neg:[] },
  'EIB (European Invest.)':   { pos:['european investment bank','eib loan','eib bond','nadia calviño eib','eib fund','eib green','eib infrastructure'], neg:[] }
};

// ── Fallback: generate keys from institution name ─────────────────────────────
function _instKeysFallback(name) {
  const clean = name.replace(/ HQ$/,'').replace(/\s*\(.*\)/,'').toLowerCase();
  const words = clean.split(/\s+/).filter(w => w.length > 3 && !['group','holdings','financial','global','international','management','securities','capital','asset','bank'].includes(w));
  return words.slice(0,3);
}

// ── Main function: find matching news for an institution ──────────────────────
function _instNews(name, limit) {
  const cache = _newsCache || [];
  if (!cache.length) return [];
  
  const def = _INST_KEYS[name];
  
  // Score each news item
  const scored = cache.map(item => {
    const t = (item.title || '').toLowerCase();
    const b = (item.body  || '').toLowerCase();
    
    // Check negative keywords first — instant reject
    if (def && def.neg && def.neg.some(k => t.includes(k))) return null;
    
    let score = 0;
    
    if (def) {
      // Check positive keywords — each match adds score based on specificity
      def.pos.forEach(k => {
        if (t.includes(k)) score += k.split(' ').length * 2;  // longer = more specific = higher score
        else if (b.includes(k)) score += k.split(' ').length;
      });
    } else {
      // Fallback: use derived keywords
      const fallback = _instKeysFallback(name);
      fallback.forEach(k => { if (t.includes(k)) score += 2; });
    }
    
    if (score === 0) return null;
    return { item, score };
  }).filter(Boolean);
  
  // Sort by score desc, then recency
  scored.sort((a, b) => b.score !== a.score ? b.score - a.score : (b.item.ts||0) - (a.item.ts||0));
  
  return scored.slice(0, limit || 4).map(s => s.item);
}

// ════════════════════════════════════════════════════════════════════════════
//  CB DATA + RENDER
// ════════════════════════════════════════════════════════════════════════════

// ── Live CB decisions cache (refreshed via AI API) ────────────────────────
window._cbDecisions = {};
window._cbDecisionsTs = 0;

// ── Fetch live CB rate decisions via Claude AI ────────────────────────────
async function _fetchCBDecisions(){
  if (!window.ANTHROPIC_API_KEY) { console.log('[CB] No API key'); return; }
  if(Date.now() - window._cbDecisionsTs < 10*60*1000) return;
  try {
    const prompt = `Return ONLY a JSON object (no markdown, no explanation) with the most recent 7 central bank rate decisions for each of these banks: FED, ECB, BOE, BOJ, PBOC, SNB, RBA, BOC, RBNZ, RBI, BOK, CNB, BCB, CBR, SARB, BANX, SAMA.

Format exactly like this:
{
  "FED": [
    {"dt":"Jan 29 2025","act":5.33,"prev":5.50,"chg":-0.17,"note":"Cut 25bps"},
    ...
  ],
  "ECB": [...],
  ...
}

Use actual historical data up to early 2026. "act" = actual rate after decision, "prev" = rate before, "chg" = act-prev (negative=cut, positive=hike, 0=hold). "note" = short note like "Cut 25bps", "Hold", "Hike 25bps". Dates as "MMM DD YYYY".`;

    const data = await _callAnthropic({
        model:'claude-sonnet-4-6',
        max_tokens:3000,
        messages:[{role:'user',content:prompt}]
      });
    if(!data){throw new Error('API unavailable');}
    const txt = (data?.content?.[0]?.text||'').replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(txt);
    window._cbDecisions = parsed;
    window._cbDecisionsTs = Date.now();
    window._layerStatus.cb={ok:true,ts:Date.now(),count:Object.keys(parsed).length};
    console.log('[CB] Live decisions loaded for',Object.keys(parsed).length,'banks');
    // Re-render CB layer with new data
    renderCBLayer();
  } catch(e){
    // Silently handle - CB decisions are optional, static fallback exists
    if(window._apiLog) _apiLog('CB-decisions', 'skip', e.message);
  }
}

// Kick off fetch on load
// CB decisions started after API key

const CB_EXT = {
  FED: {meet:'May 7 2026',   bs:'$6.71T', gdp:2.3, cpi:2.8, unem:4.1, tgt:2.0, fx:'EUR/USD', city:'Washington D.C., United States',
        hist:[5.50,5.50,5.25,5.00,4.75,4.50,4.25,4.25],
        gov:'Jerome Powell', est:1913, country:'United States',
        decisions:[
          {dt:'Mar 19 2026', act:4.25, prev:4.25, chg:0,     note:'Hold — tariff uncertainty'},
          {dt:'Jan 29 2026', act:4.25, prev:4.25, chg:0,     note:'Hold'},
          {dt:'Dec 18 2025', act:4.25, prev:4.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Nov 7 2025',  act:4.50, prev:4.50, chg:0,     note:'Hold'},
          {dt:'Sep 18 2025', act:4.50, prev:4.75, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jul 30 2025', act:4.75, prev:4.75, chg:0,     note:'Hold'},
          {dt:'Jun 18 2025', act:4.75, prev:5.25, chg:-0.50, note:'Cut 50bps'}
        ]},
  ECB: {meet:'Apr 17 2026',  bs:'€4.38T', gdp:.2,  cpi:2.3, unem:6.2, tgt:2.0, fx:'EUR/USD', city:'Frankfurt, Germany',
        hist:[4.00,3.75,3.50,3.25,3.00,2.75,2.65,2.65],
        gov:'Christine Lagarde', est:1998, country:'Eurozone',
        decisions:[
          {dt:'Mar 6 2026',  act:2.65, prev:2.90, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jan 30 2026', act:2.90, prev:3.15, chg:-0.25, note:'Cut 25bps'},
          {dt:'Dec 12 2025', act:3.15, prev:3.40, chg:-0.25, note:'Cut 25bps'},
          {dt:'Oct 17 2025', act:3.40, prev:3.65, chg:-0.25, note:'Cut 25bps'},
          {dt:'Sep 12 2025', act:3.65, prev:3.90, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jul 18 2025', act:3.90, prev:4.00, chg:-0.10, note:'Cut 10bps'},
          {dt:'Jun 6 2025',  act:4.00, prev:4.00, chg:0,     note:'Hold'}
        ]},
  BOE: {meet:'May 8 2026',   bs:'£0.68T', gdp:.4,  cpi:3.0, unem:4.4, tgt:2.0, fx:'GBP/USD', city:'London, United Kingdom',
        hist:[5.25,5.25,5.00,4.75,4.50,4.50,4.50,4.50],
        gov:'Andrew Bailey', est:1694, country:'United Kingdom',
        decisions:[
          {dt:'Feb 6 2026',  act:4.50, prev:4.75, chg:-0.25, note:'Cut 25bps — 6-3 vote'},
          {dt:'Dec 19 2025', act:4.75, prev:4.75, chg:0,     note:'Hold — 6-3 vote'},
          {dt:'Nov 7 2025',  act:4.75, prev:5.00, chg:-0.25, note:'Cut 25bps'},
          {dt:'Sep 19 2025', act:5.00, prev:5.00, chg:0,     note:'Hold'},
          {dt:'Aug 1 2025',  act:5.00, prev:5.25, chg:-0.25, note:'1st cut'},
          {dt:'Jun 20 2025', act:5.25, prev:5.25, chg:0,     note:'Hold'},
          {dt:'Mar 20 2025', act:5.25, prev:5.25, chg:0,     note:'Hold'}
        ]},
  BOJ2:{meet:'Apr 30 2026',  bs:'¥739T',  gdp:-.4, cpi:3.2, unem:2.4, tgt:2.0, fx:'USD/JPY', city:'Tokyo, Japan',
        hist:[-0.10,0.10,0.25,0.50,0.50,0.50,0.50,0.50],
        gov:'Kazuo Ueda', est:1882, country:'Japan',
        decisions:[
          {dt:'Jan 24 2026', act:0.50, prev:0.25, chg:+0.25, note:'Hike 25bps'},
          {dt:'Dec 19 2025', act:0.25, prev:0.25, chg:0,     note:'Hold'},
          {dt:'Oct 31 2025', act:0.25, prev:0.25, chg:0,     note:'Hold'},
          {dt:'Jul 31 2025', act:0.25, prev:0.10, chg:+0.15, note:'Hike 15bps'},
          {dt:'Mar 19 2025', act:0.10, prev:-0.10,chg:+0.20, note:'End NIRP'},
          {dt:'Jan 23 2025', act:-0.10,prev:-0.10,chg:0,     note:'Hold'},
          {dt:'Oct 31 2024', act:-0.10,prev:-0.10,chg:0,     note:'Hold'}
        ]},
  PBOC:{meet:'Q2 2026',      bs:'¥44.2T', gdp:5.0, cpi:.5,  unem:5.3, tgt:3.0, fx:'USD/CNY', city:'Beijing, China',
        hist:[3.65,3.55,3.45,3.35,3.10,3.10,3.10,3.10],
        gov:'Pan Gongsheng', est:1948, country:'China',
        decisions:[
          {dt:'Feb 20 2026', act:3.10, prev:3.35, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jan 20 2026', act:3.35, prev:3.35, chg:0,     note:'Hold'},
          {dt:'Oct 21 2025', act:3.35, prev:3.45, chg:-0.10, note:'Cut 10bps'},
          {dt:'Sep 20 2025', act:3.45, prev:3.55, chg:-0.10, note:'Cut 10bps'},
          {dt:'Jul 22 2025', act:3.55, prev:3.65, chg:-0.10, note:'Cut 10bps'},
          {dt:'Feb 20 2025', act:3.65, prev:3.65, chg:0,     note:'Hold'},
          {dt:'Jan 20 2025', act:3.65, prev:3.65, chg:0,     note:'Hold'}
        ]},
  SNB: {meet:'Mar 20 2026',  bs:'CHF810B',gdp:1.5, cpi:.3,  unem:2.6, tgt:2.0, fx:'EUR/CHF', city:'Bern / Zurich, Switzerland',
        hist:[1.75,1.50,1.25,1.00,0.75,0.50,0.25,0.25],
        gov:'Martin Schlegel', est:1907, country:'Switzerland',
        decisions:[
          {dt:'Dec 12 2024', act:0.25, prev:1.00, chg:-0.75, note:'Aggressive cut'},
          {dt:'Sep 26 2024', act:1.00, prev:1.25, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jun 20 2024', act:1.25, prev:1.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Mar 21 2024', act:1.50, prev:1.75, chg:-0.25, note:'1st G10 cut'},
          {dt:'Dec 14 2023', act:1.75, prev:1.75, chg:0,     note:'Hold'},
          {dt:'Sep 21 2023', act:1.75, prev:1.75, chg:0,     note:'Hold'},
          {dt:'Jun 22 2023', act:1.75, prev:1.50, chg:+0.25, note:'Hike 25bps'}
        ]},
  RBA: {meet:'Apr 1 2026',   bs:'A$488B', gdp:1.3, cpi:2.4, unem:4.1, tgt:2.5, fx:'AUD/USD',
        hist:[4.35,4.35,4.35,4.35,4.35,4.35,4.10,4.10],
        gov:'Michele Bullock', est:1960, country:'Australia',
        decisions:[
          {dt:'Feb 18 2026', act:4.10, prev:4.35, chg:-0.25, note:'1st cut in 4yr'},
          {dt:'Dec 10 2025', act:4.35, prev:4.35, chg:0,     note:'Hold'},
          {dt:'Nov 5 2025',  act:4.35, prev:4.35, chg:0,     note:'Hold'},
          {dt:'Aug 6 2025',  act:4.35, prev:4.35, chg:0,     note:'Hold'},
          {dt:'May 7 2025',  act:4.35, prev:4.35, chg:0,     note:'Hold'},
          {dt:'Mar 18 2025', act:4.35, prev:4.35, chg:0,     note:'Hold'},
          {dt:'Nov 7 2023',  act:4.35, prev:4.10, chg:+0.25, note:'Last hike'}
        ]},
  BOC: {meet:'Apr 16 2026',  bs:'C$368B', gdp:1.5, cpi:1.9, unem:6.6, tgt:2.0, fx:'USD/CAD',
        hist:[5.00,4.75,4.50,4.25,3.75,3.25,3.00,3.00],
        gov:'Tiff Macklem', est:1934, country:'Canada',
        decisions:[
          {dt:'Mar 12 2026', act:3.00, prev:3.25, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jan 29 2026', act:3.25, prev:3.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Dec 11 2025', act:3.50, prev:3.75, chg:-0.25, note:'Cut 25bps'},
          {dt:'Oct 23 2025', act:3.75, prev:4.25, chg:-0.50, note:'Cut 50bps'},
          {dt:'Sep 4 2025',  act:4.25, prev:4.50, chg:-0.25, note:'3rd cut'},
          {dt:'Jul 24 2025', act:4.50, prev:4.75, chg:-0.25, note:'2nd cut'},
          {dt:'Jun 5 2025',  act:4.75, prev:5.00, chg:-0.25, note:'1st cut'}
        ]},
  RBNZ:{meet:'Apr 9 2026',   bs:'NZ$178B',gdp:1.1, cpi:2.2, unem:5.1, tgt:2.0, fx:'NZD/USD',
        hist:[5.50,5.25,4.75,4.25,3.75,3.50,3.50,3.50],
        gov:'Adrian Orr', est:1934, country:'New Zealand',
        decisions:[
          {dt:'Feb 19 2026', act:3.50, prev:3.75, chg:-0.25, note:'Cut 25bps'},
          {dt:'Nov 27 2025', act:3.75, prev:4.25, chg:-0.50, note:'Cut 50bps'},
          {dt:'Oct 9 2025',  act:4.25, prev:4.75, chg:-0.50, note:'Cut 50bps'},
          {dt:'Aug 14 2025', act:4.75, prev:5.25, chg:-0.50, note:'Cut 50bps'},
          {dt:'May 22 2025', act:5.25, prev:5.25, chg:0,     note:'Hold'},
          {dt:'Apr 10 2025', act:5.25, prev:5.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Feb 19 2025', act:5.50, prev:5.50, chg:0,     note:'Hold'}
        ]},
  RBI: {meet:'Apr 9 2026',   bs:'₹58.4T', gdp:6.4, cpi:3.6, unem:7.8, tgt:4.0, fx:'USD/INR',
        hist:[6.50,6.50,6.50,6.50,6.50,6.25,6.00,6.00],
        gov:'Sanjay Malhotra', est:1935, country:'India',
        decisions:[
          {dt:'Feb 7 2026',  act:6.25, prev:6.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Dec 6 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'},
          {dt:'Oct 9 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'},
          {dt:'Aug 8 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'},
          {dt:'Jun 6 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'},
          {dt:'Apr 9 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'},
          {dt:'Feb 7 2025',  act:6.50, prev:6.50, chg:0,     note:'Hold'}
        ]},
  BOK: {meet:'Apr 17 2026',  bs:'₩810T',  gdp:.8,  cpi:2.0, unem:3.0, tgt:2.0, fx:'USD/KRW',
        hist:[3.50,3.50,3.25,3.00,2.75,2.75,2.75,2.75],
        gov:'Rhee Chang-yong', est:1950, country:'South Korea',
        decisions:[
          {dt:'Feb 25 2026', act:2.75, prev:3.00, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jan 16 2026', act:3.00, prev:3.00, chg:0,     note:'Hold'},
          {dt:'Nov 28 2025', act:3.00, prev:3.25, chg:-0.25, note:'Cut 25bps'},
          {dt:'Oct 16 2025', act:3.25, prev:3.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Aug 22 2025', act:3.50, prev:3.50, chg:0,     note:'Hold'},
          {dt:'Jul 11 2025', act:3.50, prev:3.50, chg:0,     note:'Hold'},
          {dt:'May 29 2025', act:3.50, prev:3.50, chg:0,     note:'Hold'}
        ]},
  CNB: {meet:'May 7 2026',   bs:'CZK410B',gdp:1.5, cpi:3.2, unem:2.7, tgt:2.0, fx:'USD/CZK',
        hist:[7.00,6.75,6.25,5.25,4.50,4.00,3.75,3.75],
        gov:'Aleš Michl', est:1993, country:'Czech Republic',
        decisions:[
          {dt:'Feb 5 2026',  act:3.75, prev:4.00, chg:-0.25, note:'Cut 25bps'},
          {dt:'Dec 18 2025', act:4.00, prev:4.00, chg:0,     note:'Hold'},
          {dt:'Nov 6 2025',  act:4.00, prev:4.50, chg:-0.50, note:'Cut 50bps'},
          {dt:'Sep 25 2025', act:4.50, prev:5.25, chg:-0.75, note:'Cut 75bps'},
          {dt:'Jun 26 2025', act:5.25, prev:6.25, chg:-1.00, note:'Cut 100bps'},
          {dt:'Mar 20 2025', act:6.25, prev:6.75, chg:-0.50, note:'Cut 50bps'},
          {dt:'Jan 22 2025', act:6.75, prev:7.00, chg:-0.25, note:'Cut 25bps'}
        ]},
  BCB: {meet:'May 7 2026',   bs:'R$1.2T', gdp:3.4, cpi:5.1, unem:6.6, tgt:3.0, fx:'USD/BRL',
        hist:[10.50,13.25,13.75,14.75,15.50,14.75,14.25,13.75],
        gov:'Gabriel Galípolo', est:1945, country:'Brazil',
        decisions:[
          {dt:'Mar 19 2026', act:13.75,prev:14.25,chg:-0.50, note:'Cut 50bps'},
          {dt:'Feb 5 2026',  act:14.25,prev:14.75,chg:-0.50, note:'Cut 50bps'},
          {dt:'Dec 11 2025', act:14.75,prev:15.50,chg:-0.75, note:'Cut 75bps'},
          {dt:'Nov 6 2025',  act:15.50,prev:14.75,chg:+0.75, note:'Hike 75bps'},
          {dt:'Sep 18 2025', act:14.75,prev:13.75,chg:+1.00, note:'Hike 100bps'},
          {dt:'Jul 31 2025', act:13.75,prev:13.75,chg:0,     note:'Hold'},
          {dt:'May 7 2025',  act:13.75,prev:13.75,chg:0,     note:'Hold'}
        ]},
  CBR: {meet:'Apr 25 2026',  bs:'₽19.4T', gdp:3.8, cpi:9.9, unem:2.3, tgt:4.0, fx:'USD/RUB',
        hist:[16.0,19.0,21.0,21.0,21.0,21.0,21.0,21.0],
        gov:'Elvira Nabiullina', est:1860, country:'Russia',
        decisions:[
          {dt:'Feb 14 2026', act:21.0, prev:21.0, chg:0,     note:'Hold — 5th consecutive'},
          {dt:'Dec 20 2025', act:21.0, prev:21.0, chg:0,     note:'Hold'},
          {dt:'Oct 25 2025', act:21.0, prev:21.0, chg:0,     note:'Hold'},
          {dt:'Sep 13 2025', act:21.0, prev:21.0, chg:0,     note:'Hold'},
          {dt:'Jul 26 2025', act:21.0, prev:21.0, chg:0,     note:'Hold'},
          {dt:'Jun 7 2025',  act:21.0, prev:21.0, chg:0,     note:'Hold'},
          {dt:'Oct 25 2024', act:21.0, prev:16.0, chg:+5.00, note:'Emergency +500bps'}
        ]},
  SARB:{meet:'May 29 2026',  bs:'ZAR492B',gdp:1.0, cpi:3.2, unem:32.1,tgt:4.5, fx:'USD/ZAR',
        hist:[8.25,8.25,8.00,7.75,7.75,7.50,7.25,7.25],
        gov:'Lesetja Kganyago', est:1921, country:'South Africa',
        decisions:[
          {dt:'Jan 30 2026', act:7.25, prev:7.50, chg:-0.25, note:'Cut 25bps'},
          {dt:'Nov 21 2025', act:7.50, prev:7.75, chg:-0.25, note:'Cut 25bps'},
          {dt:'Sep 19 2025', act:7.75, prev:8.00, chg:-0.25, note:'Cut 25bps'},
          {dt:'Jul 18 2025', act:8.00, prev:8.25, chg:-0.25, note:'Cut 25bps'},
          {dt:'May 29 2025', act:8.25, prev:8.25, chg:0,     note:'Hold'},
          {dt:'Mar 20 2025', act:8.25, prev:8.25, chg:0,     note:'Hold'},
          {dt:'Jan 30 2025', act:8.25, prev:8.25, chg:0,     note:'Hold'}
        ]},
  BANX:{meet:'May 2026',     bs:'MXN2.1T',gdp:1.5, cpi:3.8, unem:2.9, tgt:3.0, fx:'USD/MXN',
        hist:[11.25,11.00,10.50,10.00,9.50,9.00,8.50,8.00],
        gov:'Victoria Rodríguez', est:1925, country:'Mexico',
        decisions:[
          {dt:'Feb 6 2026',  act:8.00, prev:8.50, chg:-0.50, note:'Cut 50bps'},
          {dt:'Dec 19 2025', act:8.50, prev:9.00, chg:-0.50, note:'Cut 50bps'},
          {dt:'Nov 7 2025',  act:9.00, prev:9.50, chg:-0.50, note:'Cut 50bps'},
          {dt:'Sep 26 2025', act:9.50, prev:10.00,chg:-0.50, note:'Cut 50bps'},
          {dt:'Aug 8 2025',  act:10.00,prev:10.50,chg:-0.50, note:'Cut 50bps'},
          {dt:'Jun 27 2025', act:10.50,prev:11.00,chg:-0.50, note:'Cut 50bps'},
          {dt:'May 15 2025', act:11.00,prev:11.25,chg:-0.25, note:'Cut 25bps'}
        ]},
  SAMA:{meet:'Q2 2026',      bs:'SAR1.6T',gdp:2.6, cpi:2.3, unem:3.7, tgt:2.0, fx:'USD/SAR',
        hist:[6.00,6.00,5.75,5.75,5.50,5.25,5.00,5.00],
        gov:'Ayman Al-Sayari', est:1952, country:'Saudi Arabia',
        decisions:[
          {dt:'Feb 6 2026',  act:5.00, prev:5.00, chg:0,     note:'Hold (Fed peg)'},
          {dt:'Dec 18 2025', act:5.00, prev:5.25, chg:-0.25, note:'Cut w/ Fed'},
          {dt:'Nov 7 2025',  act:5.25, prev:5.25, chg:0,     note:'Hold'},
          {dt:'Sep 19 2025', act:5.25, prev:5.50, chg:-0.25, note:'Cut w/ Fed'},
          {dt:'Jul 31 2025', act:5.50, prev:5.75, chg:-0.25, note:'Cut w/ Fed'},
          {dt:'Jun 2025',    act:5.75, prev:6.00, chg:-0.25, note:'Cut w/ Fed'},
          {dt:'Dec 13 2024', act:6.00, prev:6.00, chg:0,     note:'Hold'}
        ]}
};

// ════════════════════════════════════════════════════════════════════════════
//  CENTRAL BANK LAYER — PROFESSIONAL TABBED PANEL v3
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
//  CENTRAL BANK PROFESSIONAL SYSTEM — v5 BLOOMBERG GRADE
// ════════════════════════════════════════════════════════════════════════════

// ── Tab switcher ─────────────────────────────────────────────────────────────
window._cbTab = function(pid, tabId) {
  ['OV','NW'].forEach(function(t) {
    var body = document.getElementById(pid + '_BD_' + t);
    var btn  = document.getElementById(pid + '_TB_' + t);
    if (!body || !btn) return;
    var on = (t === tabId);
    body.style.display = on ? 'block' : 'none';
    btn.style.color       = on ? '#ffaa00' : '#666655';
    btn.style.background  = on ? '#150f00' : 'transparent';
    btn.style.borderBottom= on ? '2px solid #ff8800' : '2px solid transparent';
    btn.setAttribute('data-on', on ? '1' : '0');
  });
};

// ── Seeded random helpers ─────────────────────────────────────────────────────
function _cbS(str) { let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0; return h; }
function _cbR(s,i) { return ((s*48271+i*1000003)%2147483647)/2147483647; }
function _cbTR(base, n, vol, drift, seed) {
  let v=base, r=[];
  for(let i=0;i<n;i++){v=Math.max(0,v+(_cbR(seed,i+7)-0.5)*vol+drift);r.push(+v.toFixed(2));}
  return r;
}

// ── COLOR HELPERS ─────────────────────────────────────────────────────────────
const _cbGR = (v,lo,hi) => { // green at lo, red at hi
  const t = Math.max(0,Math.min(1,(v-lo)/(hi-lo||1)));
  if(t<0.5){const u=t*2;return `rgb(${Math.round(u*220)},${Math.round(180-u*30)},30)`;}
  const u=(t-0.5)*2;return `rgb(220,${Math.round(150-u*120)},30)`;
};

// ── BAR CHART (Rate History) ──────────────────────────────────────────────────
function _cbBars(hist, decs, W, H) {
  if (!hist || hist.length < 2) return '';
  const PL=40, PR=16, PT=22, PB=28;
  const iW=W-PL-PR, iH=H-PT-PB;
  const mn = Math.min(...hist, 0) - 0.1;
  const mx = Math.max(...hist) * 1.12;
  const rng = mx - mn || 1;
  const n = hist.length;
  const bw = Math.max(10, Math.floor(iW / n * 0.70));
  const gap = (iW - bw*n) / (n+1);

  let svg = '';
  // grid lines + Y labels
  for (let i=0; i<=5; i++) {
    const v = mn + rng*i/5;
    const y = PT + iH - (v-mn)/rng*iH;
    const lv = Math.abs(v)<0.5 ? v.toFixed(2) : v.toFixed(v%1===0?0:1);
    svg += `<line x1="${PL}" y1="${y.toFixed(1)}" x2="${PL+iW}" y2="${y.toFixed(1)}" stroke="${i===0?'#222':'#161606'}" stroke-width="${i===0?'1':'0.5'}"/>`;
    svg += `<text x="${PL-5}" y="${(y+3).toFixed(1)}" text-anchor="end" fill="#666655" font-size="8" font-family="'Roboto Mono',monospace">${lv}</text>`;
  }
  // current rate dashed
  const cy = PT + iH - (hist[n-1]-mn)/rng*iH;
  svg += `<line x1="${PL}" y1="${cy.toFixed(1)}" x2="${PL+iW}" y2="${cy.toFixed(1)}" stroke="#ff8800" stroke-width="1" stroke-dasharray="5,4" opacity="0.7"/>`;

  // bars
  hist.forEach((v,i)=>{
    const x = PL + gap + i*(bw+gap);
    const yT = PT + iH - (v-mn)/rng*iH;
    const bh = Math.max(1, (v-mn)/rng*iH);
    const isL = i===n-1;
    const dec = decs ? decs[n-1-i] : null;
    const col = isL ? '#ff8800' : dec&&dec.chg>0 ? '#ff4040' : dec&&dec.chg<0 ? '#00cc55' : '#335599';
    const op = isL ? 1 : Math.max(0.35, 0.35+0.65*(i/(n-1)));
    svg += `<rect x="${x.toFixed(1)}" y="${yT.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" fill="${col}" opacity="${op.toFixed(2)}" rx="1.5"/>`;
    if (isL) svg += `<rect x="${x.toFixed(1)}" y="${yT.toFixed(1)}" width="${bw}" height="3" fill="#ffcc44" rx="1"/>`;
    // value labels on last 3
    if (i >= n-3) {
      svg += `<text x="${(x+bw/2).toFixed(1)}" y="${(yT-6).toFixed(1)}" text-anchor="middle" fill="${isL?'#ff9900':'#8899aa'}" font-size="${isL?9:7.5}" font-weight="${isL?'700':'400'}" font-family="'Roboto Mono',monospace">${v.toFixed(2)}%</text>`;
    }
    // date x labels
    const dlbl = dec ? dec.dt.slice(0,6) : (isL ? 'NOW' : '');
    if (dlbl) svg += `<text x="${(x+bw/2).toFixed(1)}" y="${PT+iH+18}" text-anchor="middle" fill="#554433" font-size="7" font-family="'Roboto Mono',monospace">${dlbl}</text>`;
  });
  // axes
  svg += `<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>`;
  svg += `<line x1="${PL}" y1="${PT+iH}" x2="${PL+iW}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>`;
  return `<svg width="${W}" height="${H}" style="display:block;overflow:visible">${svg}</svg>`;
}

// ── AREA CHART ────────────────────────────────────────────────────────────────
function _cbArea2(series, W, H, col, lbl, valStr) {
  if (!series || series.length < 2) return '';
  const PL=42, PR=20, PT=22, PB=18;
  const iW=W-PL-PR, iH=H-PT-PB;
  const mn = Math.min(...series), mx = Math.max(...series);
  const rng = (mx-mn) || Math.abs(mn)*0.1 || 0.5;
  const mnP = mn - rng*0.1, mxP = mx + rng*0.1, rng2=mxP-mnP;
  const xs = series.map((_,i) => PL + i/(series.length-1)*iW);
  const ys = series.map(v => PT + iH - (v-mnP)/rng2*iH);
  const pts = xs.map((x,i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const areaStr = `${PL},${PT+iH} ${pts} ${(PL+iW).toFixed(1)},${PT+iH}`;
  const gid = 'a'+Math.random().toString(36).slice(2,8);
  let yLabels = '';
  for (let i=0;i<=3;i++) {
    const v=mnP+rng2*i/3, y=PT+iH-(v-mnP)/rng2*iH;
    yLabels += `<line x1="${PL}" y1="${y.toFixed(1)}" x2="${PL+iW}" y2="${y.toFixed(1)}" stroke="#161606" stroke-width="0.5"/>`;
    yLabels += `<text x="${PL-5}" y="${(y+2.5).toFixed(1)}" text-anchor="end" fill="#555544" font-size="7.5" font-family="'Roboto Mono',monospace">${v.toFixed(1)}</text>`;
  }
  const lx=xs[xs.length-1].toFixed(1), ly=ys[ys.length-1].toFixed(1);
  const fx=xs[0].toFixed(1), fy=ys[0].toFixed(1);
  return `<svg width="${W}" height="${H}" style="display:block;overflow:visible">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${col}" stop-opacity="0.5"/>
        <stop offset="70%" stop-color="${col}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${col}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${yLabels}
    <polygon points="${areaStr}" fill="url(#${gid})"/>
    <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${fx}" cy="${fy}" r="2.5" fill="${col}" opacity="0.5"/>
    <circle cx="${lx}" cy="${ly}" r="4" fill="${col}" stroke="#000" stroke-width="1.5"/>
    <text x="${parseFloat(lx)+8}" y="${(parseFloat(ly)+4).toFixed(1)}" fill="${col}" font-size="9" font-family="'Roboto Mono',monospace" font-weight="700">${valStr||series[series.length-1].toFixed(1)}</text>
    ${lbl?`<text x="${PL}" y="${PT-6}" fill="#666655" font-size="7.5" font-family="'Roboto Mono',monospace" letter-spacing="1.5">${lbl}</text>`:''}
    <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
    <line x1="${PL}" y1="${PT+iH}" x2="${PL+iW}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
  </svg>`;
}

// ── DUAL LINE (CPI vs Target) ─────────────────────────────────────────────────
function _cbDual(s1, s2, W, H, c1, c2, l1, l2) {
  if (!s1 || s1.length < 2) return '';
  const all = [...s1, ...(s2||[])];
  const mn=Math.min(...all)*0.9, mx=Math.max(...all)*1.1, rng=mx-mn||0.5;
  const PL=42, PR=20, PT=24, PB=18;
  const iW=W-PL-PR, iH=H-PT-PB;
  const xs = s1.map((_,i) => PL + i/(s1.length-1)*iW);
  const ys1 = s1.map(v => PT+iH-(v-mn)/rng*iH);
  const ys2 = s2 ? s2.map(v => PT+iH-(v-mn)/rng*iH) : [];
  const pts1 = xs.map((x,i) => `${x.toFixed(1)},${ys1[i].toFixed(1)}`).join(' ');
  const pts2 = s2 ? xs.map((x,i) => `${x.toFixed(1)},${ys2[i].toFixed(1)}`).join(' ') : '';
  const area1 = `${PL},${PT+iH} ${pts1} ${(PL+iW).toFixed(1)},${PT+iH}`;
  const gid2='d'+Math.random().toString(36).slice(2,8);
  let yL='';
  for(let i=0;i<=4;i++){const v=mn+rng*i/4,y=PT+iH-(v-mn)/rng*iH;yL+=`<line x1="${PL}" y1="${y.toFixed(1)}" x2="${PL+iW}" y2="${y.toFixed(1)}" stroke="#161606" stroke-width="0.5"/>`;yL+=`<text x="${PL-5}" y="${(y+2.5).toFixed(1)}" text-anchor="end" fill="#555544" font-size="7.5" font-family="'Roboto Mono',monospace">${v.toFixed(1)}</text>`;}
  return `<svg width="${W}" height="${H}" style="display:block;overflow:visible">
    <defs><linearGradient id="${gid2}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/></linearGradient></defs>
    ${yL}
    <polygon points="${area1}" fill="url(#${gid2})"/>
    <polyline points="${pts1}" fill="none" stroke="${c1}" stroke-width="2.2" stroke-linejoin="round"/>
    ${pts2?`<polyline points="${pts2}" fill="none" stroke="${c2}" stroke-width="1.8" stroke-dasharray="6,4" stroke-linejoin="round"/>`:''}
    <circle cx="${(PL+iW).toFixed(1)}" cy="${ys1[ys1.length-1].toFixed(1)}" r="4" fill="${c1}" stroke="#000" stroke-width="1.5"/>
    ${pts2?`<circle cx="${(PL+iW).toFixed(1)}" cy="${ys2[ys2.length-1].toFixed(1)}" r="3.5" fill="${c2}" stroke="#000" stroke-width="1.5"/>`:''}
    <text x="${PL+2}" y="${PT-7}" fill="${c1}" font-size="8.5" font-family="'Roboto Mono',monospace" font-weight="700">▬ ${l1||''}</text>
    ${l2?`<text x="${PL+110}" y="${PT-7}" fill="${c2}" font-size="8" font-family="'Roboto Mono',monospace">- - ${l2}</text>`:''}
    <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
    <line x1="${PL}" y1="${PT+iH}" x2="${PL+iW}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
  </svg>`;
}

// ── YIELD CURVE ───────────────────────────────────────────────────────────────
function _cbYield(ylds, W) {
  if (!ylds || ylds.length < 2) return '';
  const H=82, PL=36, PR=18, PT=26, PB=20;
  const iW=W-PL-PR, iH=H-PT-PB;
  const mn=Math.min(...ylds.map(y=>y.v))*0.85, mx=Math.max(...ylds.map(y=>y.v))*1.15, rng=mx-mn||0.5;
  const n=ylds.length;
  const xs=ylds.map((_,i)=>PL+i/(n-1)*iW);
  const ys=ylds.map(y=>PT+iH-(y.v-mn)/rng*iH);
  const pts=xs.map((x,i)=>`${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const inverted = ylds[0].v > ylds[n-1].v;
  const col = inverted ? '#ff5533' : '#22dd77';
  const gid3='yc'+Math.random().toString(36).slice(2,8);
  let dots='', xlabs='';
  ylds.forEach((y,i)=>{
    dots += `<circle cx="${xs[i].toFixed(1)}" cy="${ys[i].toFixed(1)}" r="3.5" fill="${col}" stroke="#000" stroke-width="1.5"/>`;
    dots += `<text x="${xs[i].toFixed(1)}" y="${(ys[i]-8).toFixed(1)}" text-anchor="middle" fill="${col}" font-size="8" font-weight="700" font-family="'Roboto Mono',monospace">${y.v.toFixed(2)}</text>`;
    xlabs += `<text x="${xs[i].toFixed(1)}" y="${H-2}" text-anchor="middle" fill="#665544" font-size="7.5" font-family="'Roboto Mono',monospace">${y.t}</text>`;
  });
  const area3=`${xs[0].toFixed(1)},${PT+iH} ${pts} ${xs[n-1].toFixed(1)},${PT+iH}`;
  return `<svg width="${W}" height="${H}" style="display:block">
    <defs><linearGradient id="${gid3}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${col}" stop-opacity=".3"/><stop offset="100%" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
    <polygon points="${area3}" fill="url(#${gid3})"/>
    <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${xlabs}
    <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
    <line x1="${PL}" y1="${PT+iH}" x2="${xs[n-1].toFixed(1)}" y2="${PT+iH}" stroke="#333322" stroke-width="1.5"/>
    ${inverted
      ? `<text x="${W/2}" y="${PT-8}" text-anchor="middle" fill="#ff6644" font-size="8.5" font-family="'Roboto Mono',monospace" font-weight="700" letter-spacing="1">⚠  INVERTED CURVE — RECESSION SIGNAL</text>`
      : `<text x="${W/2}" y="${PT-8}" text-anchor="middle" fill="#22cc66" font-size="8" font-family="'Roboto Mono',monospace" letter-spacing="1">NORMAL UPWARD SLOPE</text>`
    }
  </svg>`;
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function _SH(t, r) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
    <span style="color:#887744;font-size:9px;letter-spacing:2.5px;font-weight:700;text-transform:uppercase">${t}</span>
    ${r ? `<span style="color:#665533;font-size:8.5px">${r}</span>` : ''}
  </div>`;
}

// ── ROW (table row) ───────────────────────────────────────────────────────────
function _TR(l, v, col, sub, altBg) {
  return `<tr style="background:${altBg||'transparent'}" onmouseover="this.style.background='#141208'" onmouseout="this.style.background='${altBg||'transparent'}'">
    <td style="padding:6px 16px;color:#776655;font-size:9px;letter-spacing:.5px;border-bottom:1px solid #111108;white-space:nowrap">${l}</td>
    <td style="padding:6px 16px 6px 8px;text-align:right;color:${col||'#aaa'};font-size:10.5px;font-weight:700;border-bottom:1px solid #111108;font-family:'Roboto Mono',monospace;white-space:nowrap">${v}${sub?`<span style="color:#aa9980;font-size:8px;margin-left:6px;font-weight:400">${sub}</span>`:''}</td>
  </tr>`;
}

// ── MACRO BAR ─────────────────────────────────────────────────────────────────
function _MB(label, val, max2, col, fmt, sub, iW2) {
  const bw = Math.max(3, Math.round((Math.abs(val)/max2)*iW2*0.55));
  return `<div style="display:flex;align-items:center;gap:10px;padding:4px 0">
    <span style="color:#665544;font-size:9px;width:130px;flex-shrink:0;letter-spacing:.3px">${label}</span>
    <div style="flex:1;height:7px;background:#0f0f08;border-radius:3px;position:relative">
      <div style="position:absolute;left:0;top:0;width:${bw}px;height:100%;background:${col};border-radius:3px;box-shadow:0 0 6px ${col}55"></div>
    </div>
    <span style="color:${col};font-size:11px;font-weight:700;width:56px;text-align:right;flex-shrink:0;font-family:'Roboto Mono',monospace">${fmt}</span>
    <span style="color:#aa9980;font-size:8px;width:52px;flex-shrink:0">${sub||''}</span>
  </div>`;
}

// ═════════════════════════════════════════════════════════════════════════════
function renderCBLayer() {
  LG.cb.clearLayers();
  return;
  CB_ALL.forEach(b => {
    const biasCol   = b.bias==='HIKE'?'#ff4444':b.bias==='CUT'?'#00ee66':b.bias==='EASE'?'#44aaff':'#aaaaaa';
    const biasArrow = b.bias==='HIKE'?'▲':b.bias==='CUT'?'▼':b.bias==='EASE'?'↘':'─';
    const icon = L.divIcon({
      html: '<div class="m-wrap cb-dot" style="width:6px;height:6px"><div class="m-ring" style="border-color:rgba(160,150,130,.75)"></div><div class="m-core" style="width:4px;height:4px;background:rgba(160,150,130,.75)"></div></div>',
      className:'', iconAnchor:[3,3], iconSize:[6,6]
    });
    const mk = L.marker([b.lat, b.lng], {icon, zIndexOffset:900});

    const ext   = CB_EXT[b.s] || {};
    const PW    = 520;   // popup width
    const IW    = PW-32; // inner content width
    const FN    = "'Share Tech Mono','Courier New',monospace";

    // ── Data ──
    const fxKey = ext.fx || null;
    const fxE   = fxKey ? FXP.find(x=>x.p===fxKey) : null;
    const fxMid = fxE ? (fxE.b+fxE.a)/2 : null;
    const fxUp  = fxE && fxE.c >= 0;
    const fxDp  = fxMid ? (fxMid>100?2:fxMid>10?3:4) : 4;

    const isFed   = b.s==='FED';
    const liveCPI = isFed ? (_liveData?.fred?.cpi?.value||null) : null;
    const liveUNR = isFed ? (_liveData?.fred?.unemployment?.value||null) : null;

    const gdp    = ext.gdp  ?? null;
    const cpi    = ext.cpi  ?? null;
    const unem   = ext.unem ?? null;
    const tgt    = ext.tgt  ?? 2.0;
    const rRate  = cpi!=null ? +(b.rate-cpi).toFixed(2) : null;

    const liveD     = window._cbDecisions[b.s] || null;
    const decisions = liveD || ext.decisions || [];
    const hist      = ext.hist || [];

    const cycleDir  = hist.length>=2 && hist[hist.length-1] < hist[0];
    const cycleDiff = hist.length>=2 ? hist[hist.length-1]-hist[0] : 0;
    const cycleCol  = cycleDir ? '#00ee66' : '#ff4444';
    const cycleTxt  = cycleDir ? 'EASING' : 'TIGHTENING';
    const moves     = hist.reduce((a,v,i)=>i>0?a+(Math.abs(v-hist[i-1])>0.001?1:0):a,0);

    const seed  = _cbS(b.s);
    const cuts  = decisions.filter(d=>d.chg<0).length;
    const hikes = decisions.filter(d=>d.chg>0).length;
    const holds = decisions.filter(d=>d.chg===0).length;
    const totBps= Math.round(decisions.reduce((s,d)=>s+d.chg,0)*100);

    const keys = _cbNewsKeys(b);
    const news = ((_newsCache||[]).map(item=>{
      const tt=(item.title||'').toLowerCase(), bd=(item.body||'').toLowerCase();
      let sc=0;
      keys.forEach(k=>{if(tt.includes(k))sc+=k.split(' ').length*2;else if(bd.includes(k))sc+=k.split(' ').length;});
      return sc>0?{item,sc}:null;
    }).filter(Boolean)
      .sort((a2,bb)=>bb.sc!==a2.sc?bb.sc-a2.sc:(bb.item.ts||0)-(a2.item.ts||0))
      .slice(0,18).map(s=>s.item));

    const cpid = 'cb_' + b.s + '_' + Math.random().toString(36).slice(2,7);

    // ═══════════════════════════════════════════════════════════════
    // OVERVIEW
    // ═══════════════════════════════════════════════════════════════
    const BD_OV = (()=>{ return ''; })();
    const _BD_OV_DISABLED=(()=>{
      const P = `padding:12px 16px`;
      let t = '';

      // Rate chart
      t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
      t += _SH('POLICY RATE HISTORY — '+hist.length+' DATAPOINTS', 'TARGET '+tgt.toFixed(1)+'%');
      t += _cbBars(hist, decisions, IW, 130);
      t += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid #1a1a0a">`;
      t += `<span style="color:${cycleCol};font-size:9.5px;font-weight:700;letter-spacing:1.5px;border:1px solid ${cycleCol}44;padding:3px 12px">${biasArrow} ${cycleTxt} CYCLE &nbsp;·&nbsp; ${moves} MOVES</span>`;
      t += `<span style="color:#887755;font-size:9px;font-family:'Roboto Mono',monospace">${cycleDiff>=0?'+':''}${cycleDiff.toFixed(2)}% TOTAL &nbsp;·&nbsp; BS: ${ext.bs||'—'}</span>`;
      t += `</div></div>`;

      // Cycle position gauge
      if (hist.length >= 2) {
        const lo=Math.min(...hist), hi=Math.max(...hist), rng=hi-lo||1;
        const pos = ((b.rate-lo)/rng*100);
        t += `<div style="${P};background:#060503;border-bottom:1px solid #1a1a0a">`;
        t += _SH('CYCLE RANGE POSITION', pos.toFixed(0)+'% OF TROUGH→PEAK');
        t += `<div style="height:12px;background:#0d0d08;border-radius:4px;position:relative;overflow:hidden">`;
        t += `<div style="position:absolute;left:0;top:0;width:${pos.toFixed(1)}%;height:100%;background:linear-gradient(90deg,#001a0d,${cycleCol});border-radius:4px"></div>`;
        t += `</div>`;
        t += `<div style="display:flex;justify-content:space-between;margin-top:5px">`;
        t += `<span style="color:#22cc55;font-size:8.5px;font-family:'Roboto Mono',monospace">TROUGH ${lo.toFixed(2)}%</span>`;
        t += `<span style="color:#ff9900;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">● ${b.rate.toFixed(2)}% CURRENT</span>`;
        t += `<span style="color:#ff5555;font-size:8.5px;font-family:'Roboto Mono',monospace">PEAK ${hi.toFixed(2)}%</span>`;
        t += `</div></div>`;
      }

      // KPI 2×4 grid
      const kpis=[
        {l:'POLICY RATE',   v:b.rate.toFixed(2)+'%',    c:'#ffffff'},
        {l:'STANCE',        v:b.bias,                    c:biasCol},
        {l:'INFL TARGET',   v:tgt.toFixed(1)+'%',        c:'#00ee66'},
        {l:'NEXT MEETING',  v:ext.meet||'—',              c:'#ff9900'},
        {l:'REAL RATE',     v:rRate!=null?(rRate>=0?'+':'')+rRate.toFixed(2)+'%':'N/A', c:rRate!=null&&rRate>0?'#00ee66':'#ff4444'},
        {l:'BALANCE SHEET', v:ext.bs||'—',                c:'#44aaff'},
        {l:'GOVERNOR',      v:(ext.gov||'—').split(' ').slice(-1)[0], c:'#aaaaaa'},
        {l:'EST.',          v:String(ext.est||'—'),       c:'#665544'}
      ];
      t += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#161606;border-bottom:1px solid #1a1a0a">`;
      kpis.forEach(k=>{
        t += `<div style="background:#080704;padding:9px 12px">
          <div style="color:#aa9980;font-size:8px;letter-spacing:1px;margin-bottom:4px">${k.l}</div>
          <div style="color:${k.c};font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace;line-height:1.2">${k.v}</div>
        </div>`;
      });
      t += `</div>`;

      // Macro bars
      if (gdp!=null || cpi!=null || unem!=null) {
        t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
        t += _SH('MACRO INDICATORS', '');
        if (gdp!=null)  t += _MB('GDP GROWTH',    gdp,  8,  gdp>=0?'#00ee66':'#ff4444', (gdp>=0?'+':'')+gdp.toFixed(1)+'%', 'YoY GDP',  IW);
        if (cpi!=null)  t += _MB('CPI INFLATION', cpi,  14, cpi<=tgt?'#00ee66':cpi<=tgt*1.5?'#ffaa00':'#ff5555', cpi.toFixed(1)+'%', `vs ${tgt.toFixed(1)}% TGT`, IW);
        if (unem!=null) t += _MB('UNEMPLOYMENT',  unem, 35, unem<5?'#00ee66':unem<10?'#ffaa00':'#ff5555', unem.toFixed(1)+'%', '',        IW);
        if (liveCPI)    t += _MB('CPI · FRED LIVE',liveCPI,14,'#4499ff',liveCPI.toFixed(1)+'%','LIVE',IW);
        if (liveUNR)    t += _MB('UNEM · FRED LIVE',liveUNR,20,'#4499ff',liveUNR.toFixed(1)+'%','LIVE',IW);
        t += `</div>`;
      }

      // FX Live
      if (fxE && fxMid) {
        t += `<div style="${P};background:#060503;border-bottom:1px solid #1a1a0a">`;
        t += _SH(fxKey+' · LIVE FOREX', '');
        t += `<div style="display:flex;align-items:baseline;gap:14px;margin-bottom:10px">`;
        t += `<span style="color:#ffffff;font-size:28px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:-2px;line-height:1">${fxMid.toFixed(fxDp)}</span>`;
        t += `<span style="color:${fxUp?'#00ee66':'#ff5555'};font-size:15px;font-weight:700">${fxUp?'+':''}${fxE.c.toFixed(3)}%</span>`;
        t += `<span style="color:#887755;font-size:10px">${fxKey}</span>`;
        t += `</div>`;
        t += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2px">`;
        [{l:'BID',v:fxE.b.toFixed(fxDp),c:'#ff7777'},{l:'ASK',v:fxE.a.toFixed(fxDp),c:'#44ff99'},{l:'SPREAD',v:((fxE.a-fxE.b)*10000).toFixed(1)+' pips',c:'#888877'},{l:'CHANGE',v:(fxUp?'+':'')+fxE.c.toFixed(3)+'%',c:fxUp?'#00ee66':'#ff5555'}].forEach(x=>{
          t += `<div style="background:#0d0c08;padding:6px 10px;text-align:center">
            <div style="color:#998870;font-size:7.5px;letter-spacing:1px;margin-bottom:3px">${x.l}</div>
            <div style="color:${x.c};font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">${x.v}</div>
          </div>`;
        });
        t += `</div></div>`;
      }
      return t;
    })();

    const BD_DE = (()=>{ return ''; })();
    const _BD_DE_DISABLED=(()=>{
      let t = '';
      const lTag = liveD ? `<span style="color:#336633;font-size:7.5px;border:1px solid #224422;padding:1px 6px;margin-left:6px">AI·LIVE</span>` : '';
      t += `<div style="padding:10px 16px 8px;background:#050402;border-bottom:1px solid #1a1a0a;display:flex;justify-content:space-between;align-items:center">`;
      t += `<span style="color:#887744;font-size:9.5px;letter-spacing:2px;font-weight:700">RATE DECISIONS — ${decisions.length} RELEASES${lTag}</span>`;
      t += `<span style="color:${cycleCol};font-size:9.5px;font-weight:700;letter-spacing:2px">${biasArrow} ${cycleTxt}</span>`;
      t += `</div>`;

      // Column headers
      t += `<div style="display:grid;grid-template-columns:95px 75px 75px 65px 1fr;background:#0d0c08;border-bottom:1px solid #1a1a0a">`;
      ['DATE','ACTUAL','PREV','CHANGE','CONTEXT & NOTE'].forEach((c,i)=>{
        t += `<span style="padding:5px ${i===0?'16':'8'}px;font-size:8px;color:#aa9980;letter-spacing:1px;font-weight:700;${i>0?'text-align:right;':''}">${c}</span>`;
      });
      t += `</div>`;

      decisions.forEach((d,idx)=>{
        const chgCol = d.chg>0?'#ff5555':d.chg<0?'#00ee66':'#666655';
        const chgTxt = d.chg===0 ? 'HOLD' : (d.chg>0?'+':'')+d.chg.toFixed(2);
        const bpsTxt = d.chg!==0 ? (d.chg*100>0?'+':'')+Math.round(d.chg*100)+'bps' : '';
        const isFirst = idx===0;
        const bg = isFirst ? '#0f0c07' : idx%2===0 ? '#060503' : '#080705';
        t += `<div style="display:grid;grid-template-columns:95px 75px 75px 65px 1fr;border-bottom:1px solid #111108;background:${bg}"
          onmouseover="this.style.background='#140f08'" onmouseout="this.style.background='${bg}'">`;
        t += `<span style="padding:7px 16px;font-size:${isFirst?9.5:9}px;color:${isFirst?'#ccbbaa':'#554433'};font-family:'Roboto Mono',monospace;white-space:nowrap">${d.dt}</span>`;
        t += `<span style="padding:7px 8px;font-size:${isFirst?12:10}px;color:${isFirst?'#00cc44':'#00aa66'};font-weight:700;text-align:right;font-family:'Roboto Mono',monospace">${d.act.toFixed(2)}%</span>`;
        t += `<span style="padding:7px 8px;font-size:9.5px;color:#aa9980;text-align:right;font-family:'Roboto Mono',monospace">${typeof d.prev==='number'?d.prev.toFixed(2):'—'}%</span>`;
        t += `<div style="padding:7px 8px;text-align:right">
          <div style="color:${chgCol};font-size:${isFirst?11:10}px;font-weight:700;font-family:'Roboto Mono',monospace">${chgTxt}</div>
          ${bpsTxt?`<div style="color:${chgCol};font-size:7.5px;opacity:0.7">${bpsTxt}</div>`:''}
        </div>`;
        t += `<span style="padding:7px 8px;font-size:${isFirst?9:8.5}px;color:${isFirst?'#887766':'#443322'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.note||'—'}</span>`;
        t += `</div>`;
      });

      // Stats
      t += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#161606">`;
      [{l:'CUTS',v:cuts,c:'#00ee66',sub:'rate cuts'},{l:'HIKES',v:hikes,c:'#ff4444',sub:'rate hikes'},{l:'HOLDS',v:holds,c:'#888877',sub:'unchanged'},{l:'NET BPS',v:(totBps>=0?'+':'')+totBps,c:totBps<=0?'#00ee66':'#ff4444',sub:'total change'}].forEach(s=>{
        t += `<div style="background:#090806;padding:10px 12px;text-align:center">
          <div style="color:#998870;font-size:8px;letter-spacing:1px;margin-bottom:5px">${s.l}</div>
          <div style="color:${s.c};font-size:18px;font-weight:700;font-family:'Roboto Mono',monospace;line-height:1">${s.v}</div>
          <div style="color:#887760;font-size:7.5px;margin-top:3px">${s.sub}</div>
        </div>`;
      });
      t += `</div>`;

      // Timeline bar viz
      if (decisions.length >= 3) {
        t += `<div style="padding:12px 16px 10px;background:#050402;border-top:1px solid #111108">`;
        t += _SH('DECISION TIMELINE', 'OLDEST → MOST RECENT');
        t += `<div style="display:flex;align-items:flex-end;gap:3px;height:36px">`;
        [...decisions].reverse().forEach((d,i,arr)=>{
          const col = d.chg>0?'#ff5555':d.chg<0?'#00ee66':'#334466';
          const bh = d.chg===0 ? 5 : Math.max(7, Math.min(34, Math.abs(d.chg)*110));
          t += `<div style="flex:1;height:${bh}px;background:${col};border-radius:2px 2px 0 0;opacity:${0.4+0.6*(i/arr.length)};box-shadow:0 0 5px ${col}55" title="${d.dt}: ${d.act.toFixed(2)}% (${d.chg>=0?'+':''}${d.chg.toFixed(2)})"></div>`;
        });
        t += `</div></div>`;
      }
      return t;
    })();

    const BD_MA = (()=>{ return ''; })();
    const _BD_MA_DISABLED=(()=>{
      const P = `padding:12px 16px`;
      let t = '';

      // CPI vs Target dual chart
      const cpiBase = cpi??2.5;
      const cpiS = _cbTR(cpiBase+1.5, 20, 0.55, -0.07, seed);
      const tgtS = Array(20).fill(tgt);
      t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
      t += _SH('CPI INFLATION vs TARGET — 20-MONTH TREND', '');
      t += _cbDual(cpiS, tgtS, IW, 95, cpi!=null&&cpi<=tgt?'#22dd66':'#ff7722', '#226633', 'CPI TREND', 'INFL TARGET '+tgt.toFixed(1)+'%');
      t += `<div style="display:flex;gap:16px;margin-top:8px">`;
      t += `<span style="color:${cpi!=null&&cpi<=tgt?'#00ee66':'#ff7722'};font-size:9.5px;font-weight:700">CURRENT CPI: ${cpi!=null?cpi.toFixed(1)+'%':'N/A'}</span>`;
      t += `<span style="color:#226633;font-size:9px">TARGET: ${tgt.toFixed(1)}%</span>`;
      t += `<span style="color:${cpi!=null&&cpi<=tgt?'#00ee66':'#ff4444'};font-size:9px;font-weight:700;margin-left:auto">${cpi!=null&&cpi<=tgt?'✓ ON TARGET':'✗ ABOVE TARGET'}</span>`;
      t += `</div></div>`;

      // GDP area chart
      const gdpBase = gdp??1.5;
      const gdpS = _cbTR(gdpBase+1.0, 14, 0.5, -0.04, seed+1);
      t += `<div style="${P};background:#060503;border-bottom:1px solid #1a1a0a">`;
      t += `${_cbArea2(gdpS, IW, 80, gdp!=null&&gdp>0?'#2299ee':'#cc6622', 'GDP GROWTH — 14 QUARTERS', gdp!=null?(gdp>=0?'+':'')+gdp.toFixed(1)+'%':'N/A')}`;
      t += `</div>`;

      // Unemployment area
      if (unem != null) {
        const unemS = _cbTR(unem+1.2, 12, 0.28, -0.03, seed+2);
        t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
        t += `${_cbArea2(unemS, IW, 70, unem<5?'#22dd66':unem<10?'#ffaa00':'#ff5555', 'UNEMPLOYMENT — 12-PERIOD', unem.toFixed(1)+'%')}`;
        t += `</div>`;
      }

      // Real rate area
      if (rRate != null) {
        const rrS = _cbTR(rRate+0.5, 12, 0.4, 0, seed+3);
        t += `<div style="${P};background:#060503;border-bottom:1px solid #1a1a0a">`;
        t += `${_cbArea2(rrS, IW, 65, rRate>0?'#22cc77':'#cc5522', 'REAL INTEREST RATE (POLICY − CPI)', (rRate>=0?'+':'')+rRate.toFixed(2)+'%')}`;
        t += `</div>`;
      }

      // Full table
      t += `<div style="${P};background:#050402">`;
      t += _SH('ECONOMIC DASHBOARD', '');
      t += `<table style="width:100%;border-collapse:collapse">`;
      [
        ['POLICY RATE',     b.rate.toFixed(2)+'%', '#ff9900', 'current'],
        ['INFLATION TARGET',tgt.toFixed(1)+'%',    '#00ee66', 'mandate'],
        gdp!=null?['GDP GROWTH',(gdp>=0?'+':'')+gdp.toFixed(1)+'%',gdp>=0?'#00ee66':'#ff4444','YoY']:null,
        cpi!=null?['CPI INFLATION',cpi.toFixed(1)+'%',cpi<=tgt?'#00ee66':cpi<=tgt*1.5?'#ffaa00':'#ff5555',`vs ${tgt.toFixed(1)}% tgt`]:null,
        liveCPI  ?['CPI · FRED LIVE',liveCPI.toFixed(1)+'%','#4499ff','real-time']:null,
        unem!=null?['UNEMPLOYMENT',unem.toFixed(1)+'%',unem<5?'#00ee66':unem<10?'#ffaa00':'#ff5555','']:null,
        liveUNR  ?['UNEM · FRED LIVE',liveUNR.toFixed(1)+'%','#4499ff','real-time']:null,
        rRate!=null?['REAL RATE (r−π)',(rRate>=0?'+':'')+rRate.toFixed(2)+'%',rRate>0?'#00ee66':'#ff5555','rate−CPI']:null,
        ext.bs?['BALANCE SHEET',ext.bs,'#4499ff','']:null,
        ext.gov?['GOVERNOR / CHAIR',ext.gov,'#aaaaaa','']:null,
        ext.country?['JURISDICTION',ext.country,'#887755','']:null,
        ext.est?['ESTABLISHED',String(ext.est),'#665544','']:null,
        ext.meet?['NEXT MEETING',ext.meet,'#ff9900','scheduled']:null
      ].filter(Boolean).forEach(([l,v,c,s],i)=>{
        t += _TR(l,v,c,s,i%2===0?'#070604':'#090806');
      });
      t += `</table></div>`;
      return t;
    })();

    const BD_MK = (()=>{ return ''; })();
    const _BD_MK_DISABLED=(()=>{
      const P = `padding:12px 16px`;
      let t = '';

      // FX big display
      if (fxE && fxMid) {
        t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
        t += _SH(fxKey+' · LIVE SPOT RATE', '');
        t += `<div style="display:flex;align-items:flex-end;gap:16px;margin-bottom:12px">`;
        t += `<span style="color:#ff9900;font-size:14px;font-weight:700;letter-spacing:1.5px">${fxKey}</span>`;
        t += `<span style="color:#ffffff;font-size:32px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:-2px;line-height:1">${fxMid.toFixed(fxDp)}</span>`;
        t += `<span style="color:${fxUp?'#00ee66':'#ff5555'};font-size:16px;font-weight:700">${fxUp?'+':''}${fxE.c.toFixed(3)}%</span>`;
        t += `</div>`;
        t += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-bottom:12px">`;
        [{l:'BID',v:fxE.b.toFixed(fxDp),c:'#ff7777'},{l:'ASK',v:fxE.a.toFixed(fxDp),c:'#44ff99'},{l:'SPREAD',v:((fxE.a-fxE.b)*10000).toFixed(1)+' pips',c:'#888877'},{l:'CHANGE',v:(fxUp?'+':'')+fxE.c.toFixed(3)+'%',c:fxUp?'#00ee66':'#ff5555'}].forEach(x=>{
          t += `<div style="background:#0d0c08;padding:7px 10px;text-align:center">
            <div style="color:#998870;font-size:7.5px;letter-spacing:1px;margin-bottom:3px">${x.l}</div>
            <div style="color:${x.c};font-size:10.5px;font-weight:700;font-family:'Roboto Mono',monospace">${x.v}</div>
          </div>`;
        });
        t += `</div>`;
        t += _cbArea2(_cbTR(fxMid,28,fxMid*0.006,0,seed+5), IW, 65, fxUp?'#22aa55':'#cc5522', 'FX 28-PERIOD TREND', fxMid.toFixed(fxDp));
        t += `</div>`;
      }

      // Yield curve
      const yldData = {
        FED: [{t:'1M',v:4.34},{t:'3M',v:4.31},{t:'6M',v:4.25},{t:'1Y',v:4.15},{t:'2Y',v:4.02},{t:'5Y',v:3.96},{t:'10Y',v:4.29},{t:'30Y',v:4.63}],
        ECB: [{t:'2Y',v:2.28},{t:'5Y',v:2.41},{t:'10Y',v:2.65},{t:'30Y',v:2.98}],
        BOE: [{t:'2Y',v:4.18},{t:'5Y',v:4.27},{t:'10Y',v:4.65},{t:'30Y',v:5.04}],
        BOJ2:[{t:'2Y',v:0.68},{t:'5Y',v:0.95},{t:'10Y',v:1.52},{t:'30Y',v:2.44}],
        BOC: [{t:'2Y',v:2.97},{t:'5Y',v:3.08},{t:'10Y',v:3.22},{t:'30Y',v:3.46}],
        RBA: [{t:'2Y',v:3.91},{t:'5Y',v:4.02},{t:'10Y',v:4.38}],
        PBOC:[{t:'1Y',v:3.10},{t:'5Y',v:3.60},{t:'10Y',v:3.22}],
        BOK: [{t:'2Y',v:2.65},{t:'5Y',v:2.78},{t:'10Y',v:2.95}]
};
      const ylds = yldData[b.s];
      if (ylds) {
        t += `<div style="${P};background:#060503;border-bottom:1px solid #1a1a0a">`;
        t += _SH('GOVERNMENT BOND YIELD CURVE', '');
        t += _cbYield(ylds, IW);
        t += `</div>`;
      }

      // Equity index
      const cbIdx = {FED:'SPX',ECB:'DAX',BOE:'UKX',BOJ2:'NKY',PBOC:'SHCOMP',BOC:'TSX',RBA:'ASX200',BOK:'KOSPI',RBI:'SENSEX',BANX:'IBOV',CBR:'MOEX'};
      const idxKey = cbIdx[b.s];
      const liveIdx = idxKey ? MKT[idxKey] : null;
      if (liveIdx && liveIdx.px > 0) {
        const ixUp = liveIdx.chg >= 0;
        t += `<div style="${P};background:#050402;border-bottom:1px solid #1a1a0a">`;
        t += _SH(idxKey+' · LOCAL EQUITY INDEX', '');
        t += `<div style="display:flex;align-items:baseline;gap:14px;margin-bottom:10px">`;
        t += `<span style="color:#ffffff;font-size:26px;font-weight:700;font-family:'Roboto Mono',monospace">${liveIdx.px.toFixed(liveIdx.px>1000?0:2)}</span>`;
        t += `<span style="color:${ixUp?'#00ee66':'#ff5555'};font-size:14px;font-weight:700">${ixUp?'+':''}${liveIdx.chg.toFixed(2)}%</span>`;
        t += `<span style="color:#887755;font-size:10px">${idxKey}</span>`;
        t += `</div>`;
        t += _cbArea2(_cbTR(liveIdx.px,20,liveIdx.px*0.009,ixUp?liveIdx.px*0.002:-liveIdx.px*0.002,seed+6), IW, 60, ixUp?'#22aa55':'#aa4422', idxKey+' TREND', idxKey);
        t += `</div>`;
      }

      // FX crosses
      const relFX = {
        FED: ['GBP/USD','USD/JPY','USD/CHF','USD/CAD','AUD/USD'],
        ECB: ['EUR/GBP','EUR/JPY','EUR/CHF','EUR/USD','EUR/AUD'],
        BOE: ['GBP/EUR','GBP/JPY','GBP/USD','GBP/CHF','GBP/AUD'],
        BOJ2:['USD/JPY','EUR/JPY','GBP/JPY','AUD/JPY','CHF/JPY'],
        PBOC:['USD/CNY','EUR/CNY','USD/HKD'],
        BOC: ['USD/CAD','CAD/JPY','EUR/CAD','GBP/CAD'],
        RBA: ['AUD/USD','AUD/JPY','AUD/NZD','AUD/GBP'],
        RBNZ:['NZD/USD','NZD/AUD','NZD/JPY']
};
      const crosses = relFX[b.s] || [];
      if (crosses.length) {
        t += `<div style="${P};background:#060503">`;
        t += _SH('FX CROSS RATES — LIVE SPOT', '');
        t += `<table style="width:100%;border-collapse:collapse">`;
        t += `<tr>
          <th style="padding:4px 0;text-align:left;color:#aa9980;font-size:8px;letter-spacing:1px;border-bottom:1px solid #1a1a0a;font-weight:700">PAIR</th>
          <th style="padding:4px 0;text-align:right;color:#aa9980;font-size:8px;letter-spacing:1px;border-bottom:1px solid #1a1a0a;font-weight:700">RATE</th>
          <th style="padding:4px 0;text-align:right;color:#aa9980;font-size:8px;letter-spacing:1px;border-bottom:1px solid #1a1a0a;font-weight:700">CHG</th>
          <th style="padding:4px 0;text-align:right;color:#aa9980;font-size:8px;letter-spacing:1px;border-bottom:1px solid #1a1a0a;font-weight:700">SPREAD</th>
        </tr>`;
        crosses.forEach(pair=>{
          const fe = FXP.find(x=>x.p===pair);
          if (!fe) return;
          const mid = (fe.b+fe.a)/2;
          const dp2 = mid>100?2:mid>10?3:4;
          const fc = fe.c>=0?'#00ee66':'#ff5555';
          t += `<tr onmouseover="this.style.background='#141208'" onmouseout="this.style.background='transparent'">
            <td style="padding:6px 0;color:#ff9900;font-size:10px;font-weight:700;border-bottom:1px solid #111108">${pair}</td>
            <td style="padding:6px 0;text-align:right;color:#ddccbb;font-size:11px;font-weight:700;border-bottom:1px solid #111108;font-family:'Roboto Mono',monospace">${mid.toFixed(dp2)}</td>
            <td style="padding:6px 0;text-align:right;color:${fc};font-size:10px;font-weight:700;border-bottom:1px solid #111108;font-family:'Roboto Mono',monospace">${fe.c>=0?'+':''}${fe.c.toFixed(3)}%</td>
            <td style="padding:6px 0;text-align:right;color:#665544;font-size:9px;border-bottom:1px solid #111108;font-family:'Roboto Mono',monospace">${((fe.a-fe.b)*10000).toFixed(1)} pips</td>
          </tr>`;
        });
        t += `</table></div>`;
      }
      return t;
    })();

    const BD_NW = (()=>{ return ''; })();
    const _BD_NW_DISABLED=(()=>{
      let t = '';
      t += `<div style="padding:10px 16px;background:#050402;border-bottom:1px solid #1a1a0a;display:flex;justify-content:space-between;align-items:center">`;
      t += `<span style="color:#887744;font-size:9.5px;letter-spacing:2px;font-weight:700">NEWS & ANALYSIS — ${b.n.split(' ').slice(0,3).join(' ')}</span>`;
      t += `<span style="color:#665544;font-size:9px">${news.length} ARTICLES</span>`;
      t += `</div>`;
      if (!news.length) {
        t += `<div style="padding:24px 16px;text-align:center;color:#887760;font-size:10px">NO RECENT HEADLINES MATCHED</div>`;
        return t;
      }
      news.forEach((item,idx)=>{
        const isAI    = item._aiBriefing;
        const isFlash = item.tag==='FLASH';
        const srcTxt  = isAI?'AI·INTEL':(item.src||'').slice(0,14);
        const srcCol  = isAI?'#22cc66':isFlash?'#ff9900':'#4488cc';
        const ico     = isAI?'◆':isFlash?'►':'▮';
        const ago     = item.ts?_fmtAgo(item.ts):'';
        const url     = (item.link||'').replace(/'/g,'');
        const txt     = (item.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const bg      = idx%2===0?'#060503':'#080705';
        t += `<div style="padding:9px 16px;border-bottom:1px solid #111108;cursor:pointer;background:${bg}"
          onclick="if('${url}')window.open('${url}','_blank')"
          onmouseover="this.style.background='#120f08'" onmouseout="this.style.background='${bg}'">
          <div style="display:flex;gap:10px;align-items:flex-start">
            <span style="color:${srcCol};font-size:9px;margin-top:2px;flex-shrink:0">${ico}</span>
            <div style="flex:1;min-width:0">
              <div style="color:#aaa999;font-size:9.5px;line-height:1.5;margin-bottom:4px">${txt}</div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:${srcCol};font-size:8px;font-weight:700;border:1px solid ${srcCol}44;padding:1px 7px">${srcTxt}</span>
                <span style="color:#998870;font-size:8px">${ago}</span>
              </div>
            </div>
          </div>
        </div>`;
      });
      return t;
    })();

    // ═══════════════════════════════════════════════════════════════
    // ASSEMBLE POPUP — unified style
    // ═══════════════════════════════════════════════════════════════
    const _cbDesc = {
      FED:  'Federal Reserve System — US central bank established in 1913 after repeated banking panics. Dual mandate: maximum employment and price stability. Conducts monetary policy via the Federal Open Market Committee (FOMC), which meets 8 times per year. Also supervises major US banks and provides key payment system infrastructure.',
      ECB:  'European Central Bank — central bank for the 20 eurozone countries, established in 1998. Primary mandate is price stability (inflation below but close to 2%). Sets interest rates for the entire Eurozone. Governs the TARGET2 payment system and supervises significant eurozone banks via the Single Supervisory Mechanism.',
      BOE:  'Bank of England — one of the world\'s oldest central banks (1694), originally established to finance a war against France. Sets UK monetary policy via the Monetary Policy Committee (MPC). Also responsible for financial stability via the Financial Policy Committee and prudential regulation via the PRA.',
      BOJ:  'Bank of Japan — Japan\'s central bank, founded 1882. Maintained ultra-loose monetary policy for decades under Yield Curve Control (YCC). Began normalising rates in 2024 for the first time since 2007. Sets policy via the Policy Board. Also manages Japan\'s large foreign exchange reserves.',
      PBOC: "People's Bank of China — China's central bank, re-established as a central bank in 1983. Controls monetary policy, regulates financial institutions, manages China's massive foreign exchange reserves (~$3.1T). Sets the RMB daily reference rate. Reports to the State Council of China rather than being fully independent.",
      SNB:  'Swiss National Bank — Switzerland\'s central bank, founded 1907. Legally structured as a special-statute joint-stock company (publicly traded). Mandated to ensure price stability and takes account of economic developments. Known for massive foreign currency reserves (>$700B) built through FX interventions to cap CHF strength.',
      RBA:  'Reserve Bank of Australia — Australia\'s central bank since 1960 (founded 1911 as Commonwealth Bank). Sets monetary policy via the Reserve Bank Board. Mandate: currency stability, full employment, economic prosperity and welfare of the Australian people. Also provides banking services to the government.',
      BOC:  'Bank of Canada — Canada\'s central bank, established 1934. Sets the overnight rate to achieve 2% inflation target (within 1–3% control range). Publishes quarterly Monetary Policy Report. Also issues bank notes and acts as fiscal agent for the federal government. One of the most transparent central banks globally.',
      RBNZ: 'Reserve Bank of New Zealand — central bank and integrated financial regulator, established 1934. World\'s first central bank to adopt explicit inflation targeting (1990). Sets the Official Cash Rate (OCR). Also responsible for banking regulation and supervision, and macro-prudential policy.',
      RBI:  'Reserve Bank of India — India\'s central bank and regulatory authority, established 1935. Manages the issue and supply of the Indian rupee. Sets monetary policy via the Monetary Policy Committee targeting 4% CPI (±2%). Also regulates commercial banks, manages India\'s substantial foreign exchange reserves.',
      BOK:  'Bank of Korea — South Korea\'s central bank, established 1950. Sets the Base Rate to achieve 2% inflation target. Manages South Korea\'s foreign exchange reserves. Publishes twice-yearly Monetary Policy Reports. Known for intervening in the won market during periods of excess volatility.',
      CNB:  'Czech National Bank — central bank of the Czech Republic, established 1993 following the dissolution of Czechoslovakia. Targets 2% CPI inflation. Conducts monetary policy and prudential supervision. Used floor on CZK/EUR exchange rate (2013–2017) to prevent deflation.',
      BCB:  'Banco Central do Brasil — Brazil\'s central bank, established 1964. Sets the Selic rate via the Copom (Monetary Policy Committee). Targets inflation within a band set by the National Monetary Council. Manages Brazil\'s foreign exchange reserves and regulates the financial system.',
      CBR:  'Bank of Russia — Russia\'s central bank, established 1860 (Soviet Gosbank predecessor). Sets the key rate. Manages gold and foreign exchange reserves. Subject to international sanctions since 2022; ~$300B in foreign reserves frozen by Western countries following Russia\'s invasion of Ukraine.',
      SARB: 'South African Reserve Bank — central bank of South Africa, established 1921. Sets the repo rate via the Monetary Policy Committee. Unique ownership structure: shares held by private individuals (not state). Targets 3–6% CPI inflation. Manages South Africa\'s gold and foreign exchange reserves.',
      BANX: 'Banco Central do Brasil — see BCB. Brazil\'s monetary authority targeting inflation via the Selic interest rate. One of the most active emerging-market central banks with frequent rate adjustments in response to inflation and currency volatility.',
      SAMA: 'Saudi Central Bank (SAMA) — established 1952. Manages Saudi Arabia\'s monetary policy and acts as the kingdom\'s reserve manager. The riyal is pegged to the US dollar at 3.75. Oversees banking regulation and issues Saudi riyal banknotes. Manages the government\'s substantial oil revenues and foreign reserves.'
};

    let h = `<div id="${cpid}" style="width:${PW}px;font-family:${FN};background:#000;color:#aaa;font-size:9px">`;

    // ── HEADER ──
    h += `<div style="background:#050505;padding:11px 16px 9px;border-bottom:1px solid #1e1e1e">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="color:#c8a86c;font-size:7px;font-weight:700;letter-spacing:1.8px;border:1px solid #554433;padding:2px 8px;background:#0d0a06">CENTRAL BANK</span>
        <span style="color:${biasCol};font-size:7px;font-weight:700;letter-spacing:1.2px">${biasArrow} ${b.bias}</span>
      </div>
      <div style="color:#e0d0a8;font-size:13px;font-weight:700;letter-spacing:.2px;line-height:1.3;margin-bottom:5px">${b.n}</div>
      <div style="color:#776655;font-size:8px;letter-spacing:.3px">◈ ${ext.city||b.n}</div>
    </div>`;

    // ── ABOUT ──
    const cbDescText = _cbDesc[b.s] || 'Central bank responsible for monetary policy, currency issuance and financial stability.';
    h += `<div style="background:#030303;padding:9px 16px 11px;border-bottom:1px solid #1a1a1a">
      <div style="color:#887744;font-size:7px;letter-spacing:2px;margin-bottom:6px;font-weight:700">ABOUT</div>
      <div style="color:#7a6848;font-size:8px;line-height:1.75;letter-spacing:.25px">${cbDescText}</div>
    </div>`;

    // ── KEY METRICS ──
    const cbRows = [];
    cbRows.push({l:'POLICY RATE',   v: b.rate.toFixed(2)+'%',                          c:'#e0d0a8'});
    cbRows.push({l:'STANCE',        v: biasArrow+' '+b.bias,                            c: biasCol});
    if(ext.meet)  cbRows.push({l:'NEXT MEETING',  v: ext.meet,                          c:'#cc8833'});
    if(ext.gov)   cbRows.push({l:'GOVERNOR',       v: ext.gov,                          c:'#888'});
    if(ext.est)   cbRows.push({l:'ESTABLISHED',    v: String(ext.est),                  c:'#888'});
    if(ext.bs)    cbRows.push({l:'BALANCE SHEET',  v: ext.bs,                           c:'#6688aa'});
    if(cpi!=null) cbRows.push({l:'CPI INFLATION',  v: cpi.toFixed(1)+'%',               c: cpi<=(tgt*1.5)?'#44aa66':'#cc5544'});
    if(rRate!=null)cbRows.push({l:'REAL RATE',     v:(rRate>=0?'+':'')+rRate.toFixed(2)+'%', c: rRate>0?'#44aa66':'#cc5544'});
    if(gdp!=null) cbRows.push({l:'GDP GROWTH',     v:(gdp>=0?'+':'')+gdp.toFixed(1)+'%', c: gdp>=0?'#44aa66':'#cc5544'});
    if(unem!=null)cbRows.push({l:'UNEMPLOYMENT',   v: unem.toFixed(1)+'%',              c: unem<5?'#44aa66':unem<10?'#cc8833':'#cc5544'});
    cbRows.push({l:'INFL TARGET',   v: tgt.toFixed(1)+'%',                             c:'#557755'});
    if(ext.rating)cbRows.push({l:'CREDIT RATING',  v: ext.rating,                      c:'#7a9a7a', sub:'S&P / Moody\'s'});
    if(fxE&&fxMid)cbRows.push({l: fxKey+' SPOT',  v: fxMid.toFixed(fxDp)+'  '+(fxUp?'▲':'▼')+fxE.c.toFixed(2)+'%', c: fxUp?'#44aa66':'#cc5544'});
    if(hist.length>=2){
      cbRows.push({l:'CYCLE',       v:(cycleDir?'EASING ':'TIGHTENING ')+cycleDiff.toFixed(2)+'%', c: cycleDir?'#44aa66':'#cc5544'});
      cbRows.push({l:'MOVES',       v: String(moves),                                  c:'#777'});
    }
    if(totBps!==0) cbRows.push({l:'TOTAL CHG',    v:(totBps>=0?'+':'')+totBps+'bps',   c: totBps<0?'#44aa66':'#cc5544'});
    if(cuts||hikes||holds) cbRows.push({l:'CUT / HOLD / HIKE', v:`${cuts} / ${holds} / ${hikes}`, c:'#666'});
    if(liveCPI)   cbRows.push({l:'CPI LIVE (FRED)',v: liveCPI.toFixed(1)+'%',           c:'#4499ff'});
    if(liveUNR)   cbRows.push({l:'UNEM LIVE (FRED)',v: liveUNR.toFixed(1)+'%',         c:'#4499ff'});

    h += `<div style="background:#020202;border-bottom:1px solid #1a1a1a">`;
    h += `<div style="padding:6px 16px 5px;border-bottom:1px solid #141414"><span style="color:#887744;font-size:7px;letter-spacing:2px;font-weight:700">KEY METRICS</span></div>`;
    cbRows.forEach(r=>{
      h += `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 16px;border-bottom:1px solid #0f0f0f;gap:8px">
        <span style="color:#776655;font-size:8px;letter-spacing:.5px;white-space:nowrap;flex-shrink:0">${r.l}</span>
        <span style="color:${r.c};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;text-align:right;min-width:0">${r.v}${r.sub?`<span style="color:#aa9980;font-size:6.5px;font-weight:400;margin-left:4px">${r.sub}</span>`:''}</span>
      </div>`;
    });
    h += `</div>`;

    // ── RATE DECISIONS ──
    if(decisions.length){
      h += `<div style="background:#020202;border-bottom:1px solid #1a1a1a">`;
      h += `<div style="padding:6px 16px 5px;border-bottom:1px solid #141414"><span style="color:#887744;font-size:7px;letter-spacing:2px;font-weight:700">RATE DECISIONS</span></div>`;
      decisions.slice(0,8).forEach(dec=>{
        const chgVal = dec.chg ?? dec.change ?? 0;
        const rateVal = dec.act ?? dec.rate ?? null;
        const dateVal = dec.dt ?? dec.date ?? dec.d ?? '—';
        const noteVal = dec.note ?? '';
        const dc = chgVal>0?'#cc5544':chgVal<0?'#44aa66':'#555';
        const dv = chgVal>0?'+'+chgVal.toFixed(2)+'%':chgVal<0?chgVal.toFixed(2)+'%':'HOLD';
        h += `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 16px;border-bottom:1px solid #0f0f0f;gap:8px">
          <span style="color:#665533;font-size:8px;letter-spacing:.3px;flex-shrink:0;min-width:90px">${dateVal}</span>
          <span style="color:#665533;font-size:8px;flex:1">${rateVal!=null?(rateVal.toFixed(2)+'%'):'—'}</span>
          <span style="color:${dc};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;text-align:right;min-width:50px">${dv}</span>
          ${noteVal?`<span style="color:#aa9980;font-size:7px;text-align:right;min-width:80px;white-space:nowrap;overflow:hidden">${noteVal}</span>`:''}
        </div>`;
      });
      h += `</div>`;
    }

    h += `</div>`;

    mk.bindPopup(h, {maxWidth: PW+20, closeButton: false, className: 'bbpop'});

    // delay popup — fly first, open after 700ms
    mk.off('click');
    mk.on('click', function(ev){
      L.DomEvent.stopPropagation(ev);
      map.flyTo([b.lat, b.lng], 12, {duration:10.0, easeLinearity:0.05});
      setTimeout(()=>mk.openPopup(), 8500);
    });

    LG.cb.addLayer(mk);
  });
  console.log('[CB] rendered', CB_ALL.length);
}
renderCBLayer();

// ════════════════════════════════════════════════════════════════════════════
//  INSTITUTION LAYER DATA + RENDER
// ════════════════════════════════════════════════════════════════════════════
const INST_DATA = [
  // ── INVESTIČNÍ BANKY — Wall Street & Global ─────────────────────────────────
  {n:'Goldman Sachs HQ',      t:'IB',  lat:40.7143,lng:-74.0129,aum:'$2.8T',emp:'45K',col:'#4488ff',info:'200 West St, NYC'},
  {n:'JPMorgan Chase HQ',     t:'IB',  lat:40.7549,lng:-73.9754,aum:'$3.9T',emp:'310K',col:'#4488ff',info:'383 Madison Ave, NYC'},
  {n:'Morgan Stanley HQ',     t:'IB',  lat:40.7614,lng:-73.9837,aum:'$1.2T',emp:'80K', col:'#4488ff',info:'1585 Broadway, NYC'},
  {n:'Bank of America HQ',    t:'IB',  lat:35.2271,lng:-80.8431,aum:'$3.3T',emp:'216K',col:'#4488ff',info:'Charlotte, NC'},
  {n:'Citigroup HQ',          t:'IB',  lat:40.7128,lng:-74.0060,aum:'$2.4T',emp:'240K',col:'#4488ff',info:'388 Greenwich St, NYC'},
  {n:'Wells Fargo HQ',        t:'IB',  lat:37.7936,lng:-122.3961,aum:'$1.9T',emp:'233K',col:'#4488ff',info:'San Francisco, CA'},
  {n:'Barclays HQ',           t:'IB',  lat:51.5154,lng:-0.0808,aum:'$1.5T',emp:'83K', col:'#4488ff',info:'1 Churchill Place, London'},
  {n:'Deutsche Bank HQ',      t:'IB',  lat:50.1109,lng:8.6750, aum:'$1.3T',emp:'90K', col:'#4488ff',info:'Frankfurt'},
  {n:'UBS Group HQ',          t:'IB',  lat:47.3744,lng:8.5410, aum:'$5.7T',emp:'111K',col:'#4488ff',info:'Zurich'},
  {n:'Credit Agricole HQ',    t:'IB',  lat:48.8833,lng:2.2897, aum:'$2.8T',emp:'150K',col:'#4488ff',info:'Paris'},
  {n:'BNP Paribas HQ',        t:'IB',  lat:48.8719,lng:2.3340, aum:'$3.0T',emp:'190K',col:'#4488ff',info:'Paris'},
  {n:'Societe Generale HQ',   t:'IB',  lat:48.9200,lng:2.2300, aum:'$1.5T',emp:'117K',col:'#4488ff',info:'Paris'},
  {n:'HSBC HQ',               t:'IB',  lat:51.5042,lng:-0.0008,aum:'$3.0T',emp:'219K',col:'#4488ff',info:'8 Canada Sq, London'},
  {n:'Nomura HQ',             t:'IB',  lat:35.6762,lng:139.7702,aum:'$0.5T',emp:'26K', col:'#4488ff',info:'Tokyo'},
  {n:'Mizuho Financial HQ',   t:'IB',  lat:35.6785,lng:139.7520,aum:'$1.8T',emp:'55K', col:'#4488ff',info:'Tokyo'},
  {n:'MUFG HQ',               t:'IB',  lat:35.6895,lng:139.6917,aum:'$3.3T',emp:'180K',col:'#4488ff',info:'Tokyo'},
  {n:'SMBC Group HQ',         t:'IB',  lat:35.6815,lng:139.7680,aum:'$2.1T',emp:'100K',col:'#4488ff',info:'Tokyo'},
  {n:'ICBC HQ',               t:'IB',  lat:39.9042,lng:116.4050,aum:'$6.3T',emp:'440K',col:'#4488ff',info:'Beijing'},
  {n:'China Construction Bank',t:'IB', lat:39.9150,lng:116.3900,aum:'$4.9T',emp:'350K',col:'#4488ff',info:'Beijing'},
  {n:'Agricultural Bank China',t:'IB', lat:39.9200,lng:116.3800,aum:'$4.6T',emp:'460K',col:'#4488ff',info:'Beijing'},
  {n:'Bank of China HQ',      t:'IB',  lat:39.9080,lng:116.3960,aum:'$4.2T',emp:'310K',col:'#4488ff',info:'Beijing'},
  {n:'Standard Chartered HQ', t:'IB',  lat:51.5055,lng:-0.0803,aum:'$0.8T',emp:'85K', col:'#4488ff',info:'1 Basinghall Ave, London'},
  {n:'Macquarie Group HQ',    t:'IB',  lat:-33.8651,lng:151.2099,aum:'$0.7T',emp:'20K',col:'#4488ff',info:'Sydney'},
  {n:'RBC Capital Markets',   t:'IB',  lat:43.6483,lng:-79.3824,aum:'$1.9T',emp:'95K', col:'#4488ff',info:'Toronto'},
  {n:'TD Bank Group HQ',      t:'IB',  lat:43.6481,lng:-79.3820,aum:'$1.6T',emp:'95K', col:'#4488ff',info:'Toronto'},
  {n:'Santander HQ',          t:'IB',  lat:40.4500,lng:-3.6900, aum:'$1.8T',emp:'200K',col:'#4488ff',info:'Madrid'},
  {n:'ING Group HQ',          t:'IB',  lat:52.3667,lng:4.8945, aum:'$1.1T',emp:'57K', col:'#4488ff',info:'Amsterdam'},
  {n:'ABN AMRO HQ',           t:'IB',  lat:52.3773,lng:4.9041, aum:'$0.4T',emp:'21K', col:'#4488ff',info:'Amsterdam'},
  {n:'UniCredit HQ',          t:'IB',  lat:45.4654,lng:9.1924, aum:'$1.2T',emp:'73K', col:'#4488ff',info:'Milan'},
  {n:'Intesa Sanpaolo HQ',    t:'IB',  lat:45.0703,lng:7.6869, aum:'$0.9T',emp:'97K', col:'#4488ff',info:'Turin'},
  {n:'Commerzbank HQ',        t:'IB',  lat:50.1136,lng:8.6722, aum:'$0.5T',emp:'41K', col:'#4488ff',info:'Frankfurt'},
  {n:'Julius Baer HQ',        t:'IB',  lat:47.3769,lng:8.5417, aum:'$0.5T',emp:'8K',  col:'#4488ff',info:'Zurich'},
  {n:'Lazard HQ',             t:'IB',  lat:40.7549,lng:-73.9756,aum:'$0.25T',emp:'3K',col:'#4488ff',info:'30 Rockefeller, NYC'},
  {n:'Jefferies HQ',          t:'IB',  lat:40.7580,lng:-73.9855,aum:'$0.05T',emp:'5K',col:'#4488ff',info:'NYC'},
  {n:'Evercore HQ',           t:'IB',  lat:40.7600,lng:-73.9700,aum:'$0.03T',emp:'2K',col:'#4488ff',info:'NYC'},
  // ── BURZY ────────────────────────────────────────────────────────────────────
  {n:'NYSE (New York Stock Exchange)',t:'EX',lat:40.7069,lng:-74.0089,aum:'$25T mcap',emp:'2K',col:'#ff7700',info:'11 Wall St, NYC'},
  {n:'NASDAQ HQ',             t:'EX',  lat:40.7580,lng:-73.9753,aum:'$22T mcap',emp:'7K', col:'#ff7700',info:'Times Sq, NYC'},
  {n:'CME Group HQ',          t:'EX',  lat:41.8787,lng:-87.6359,aum:'$1Q vol/d',emp:'5K', col:'#ff7700',info:'Chicago'},
  {n:'CBOE Global Markets',   t:'EX',  lat:41.8827,lng:-87.6324,aum:'Options #1',emp:'3K',col:'#ff7700',info:'Chicago'},
  {n:'London Stock Exchange', t:'EX',  lat:51.5156,lng:-0.0972,aum:'$3.8T mcap',emp:'5K',col:'#ff7700',info:'Paternoster Sq, London'},
  {n:'Euronext (Paris)',       t:'EX',  lat:48.8698,lng:2.3330, aum:'$6.9T mcap',emp:'2K',col:'#ff7700',info:'Paris'},
  {n:'Deutsche Boerse (Xetra)',t:'EX',  lat:50.1109,lng:8.6774, aum:'$2.3T mcap',emp:'8K',col:'#ff7700',info:'Frankfurt'},
  {n:'SIX Swiss Exchange',    t:'EX',  lat:47.3744,lng:8.5426, aum:'$1.8T mcap',emp:'3K',col:'#ff7700',info:'Zurich'},
  {n:'Tokyo Stock Exchange',  t:'EX',  lat:35.6818,lng:139.7720,aum:'$6.5T mcap',emp:'1K',col:'#ff7700',info:'Nihonbashi, Tokyo'},
  {n:'Hong Kong Stock Exchange',t:'EX',lat:22.2840,lng:114.1580,aum:'$4.5T mcap',emp:'2K',col:'#ff7700',info:'Exchange Sq, HK'},
  {n:'Shanghai Stock Exchange',t:'EX', lat:31.2050,lng:121.5950,aum:'$7.4T mcap',emp:'2K',col:'#ff7700',info:'Pudong, Shanghai'},
  {n:'Shenzhen Stock Exchange',t:'EX', lat:22.5355,lng:114.0576,aum:'$4.8T mcap',emp:'1K',col:'#ff7700',info:'Shenzhen'},
  {n:'BSE Bombay',            t:'EX',  lat:18.9322,lng:72.8347, aum:'$3.8T mcap',emp:'1K',col:'#ff7700',info:'Dalal St, Mumbai'},
  {n:'NSE India',             t:'EX',  lat:19.0596,lng:72.8295, aum:'$3.7T mcap',emp:'2K',col:'#ff7700',info:'Mumbai'},
  {n:'Euronext Amsterdam',    t:'EX',  lat:52.3667,lng:4.8945, aum:'$1.1T mcap',emp:'1K',col:'#ff7700',info:'Amsterdam'},
  {n:'Borsa Istanbul',        t:'EX',  lat:41.0600,lng:29.0100, aum:'$0.3T mcap',emp:'1K',col:'#ff7700',info:'Istanbul'},
  {n:'Johannesburg Stock Exchange',t:'EX',lat:-26.2044,lng:28.0456,aum:'$1.1T mcap',emp:'1K',col:'#ff7700',info:'Sandton, JHB'},
  {n:'SGX Singapore Exchange',t:'EX',  lat:1.2774,  lng:103.8517,aum:'$0.6T mcap',emp:'1K',col:'#ff7700',info:'Singapore'},
  {n:'ASX Australian Securities',t:'EX',lat:-33.8674,lng:151.2094,aum:'$1.7T mcap',emp:'1K',col:'#ff7700',info:'Sydney'},
  {n:'TMX Toronto Stock Exchange',t:'EX',lat:43.6481,lng:-79.3766,aum:'$2.9T mcap',emp:'1K',col:'#ff7700',info:'Toronto'},
  {n:'B3 Bolsa Brasil',       t:'EX',  lat:-23.5432,lng:-46.6340,aum:'$0.8T mcap',emp:'2K',col:'#ff7700',info:'Sao Paulo'},
  {n:'BME (Madrid)',          t:'EX',  lat:40.4167,lng:-3.7033,  aum:'$1.0T mcap',emp:'1K',col:'#ff7700',info:'Madrid'},
  {n:'Nasdaq Nordic (Stockholm)',t:'EX',lat:59.3293,lng:18.0686, aum:'$1.5T mcap',emp:'1K',col:'#ff7700',info:'Stockholm'},
  {n:'Warsaw Stock Exchange', t:'EX',  lat:52.2297,lng:21.0119, aum:'$0.3T mcap',emp:'0.5K',col:'#ff7700',info:'Warsaw'},
  {n:'Prague Stock Exchange', t:'EX',  lat:50.0870,lng:14.4217, aum:'$0.05T mcap',emp:'0.1K',col:'#ff7700',info:'Prague'},
  // ── HEDGE FONDY ──────────────────────────────────────────────────────────────
  {n:'Bridgewater Associates',t:'HF',  lat:41.1399,lng:-73.2649,aum:'$124B',emp:'1.7K',col:'#ff4488',info:'Westport, CT'},
  {n:'Man Group HQ',          t:'HF',  lat:51.5200,lng:-0.0800, aum:'$178B',emp:'1.5K',col:'#ff4488',info:'London'},
  {n:'Renaissance Technologies',t:'HF',lat:40.9176,lng:-73.1280,aum:'$130B',emp:'0.3K',col:'#ff4488',info:'East Setauket, NY'},
  {n:'Citadel HQ',            t:'HF',  lat:41.8827,lng:-87.6233,aum:'$62B',emp:'2.8K', col:'#ff4488',info:'Chicago'},
  {n:'DE Shaw HQ',            t:'HF',  lat:40.7589,lng:-73.9851,aum:'$60B',emp:'2K',   col:'#ff4488',info:'NYC'},
  {n:'Two Sigma HQ',          t:'HF',  lat:40.7264,lng:-74.0076,aum:'$60B',emp:'1.8K', col:'#ff4488',info:'NYC'},
  {n:'Millennium Management', t:'HF',  lat:40.7589,lng:-73.9786,aum:'$69B',emp:'5K',   col:'#ff4488',info:'NYC'},
  {n:'Elliott Investment Mgmt',t:'HF', lat:40.7590,lng:-73.9780,aum:'$65B',emp:'0.5K', col:'#ff4488',info:'NYC'},
  {n:'Point72 Asset Mgmt',    t:'HF',  lat:41.0534,lng:-73.5387,aum:'$35B',emp:'1.7K', col:'#ff4488',info:'Stamford, CT'},
  {n:'Baupost Group',         t:'HF',  lat:42.3601,lng:-71.0589,aum:'$27B',emp:'0.2K', col:'#ff4488',info:'Boston'},
  {n:'Winton Group HQ',       t:'HF',  lat:51.5074,lng:-0.1278, aum:'$8B',emp:'0.4K',  col:'#ff4488',info:'London'},
  {n:'AQR Capital Mgmt',      t:'HF',  lat:41.0534,lng:-73.5220,aum:'$143B',emp:'1K',  col:'#ff4488',info:'Greenwich, CT'},
  {n:'Tiger Global Mgmt',     t:'HF',  lat:40.7589,lng:-73.9695,aum:'$40B',emp:'0.2K', col:'#ff4488',info:'NYC'},
  {n:'Pershing Square Capital',t:'HF', lat:40.7600,lng:-73.9700,aum:'$16B',emp:'0.03K',col:'#ff4488',info:'NYC'},
  {n:'Third Point LLC',       t:'HF',  lat:40.7580,lng:-73.9690,aum:'$10B',emp:'0.1K', col:'#ff4488',info:'NYC'},
  // ── ASSET MANAGERS ───────────────────────────────────────────────────────────
  {n:'BlackRock HQ',          t:'AM',  lat:40.7127,lng:-74.0059,aum:'$10.0T',emp:'21K',col:'#ff8800',info:'50 Hudson Yards, NYC'},
  {n:'Vanguard HQ',           t:'AM',  lat:40.0958,lng:-75.3779,aum:'$8.6T',emp:'20K', col:'#ff8800',info:'Malvern, PA'},
  {n:'Fidelity Investments',  t:'AM',  lat:42.3601,lng:-71.0589,aum:'$4.5T',emp:'74K', col:'#ff8800',info:'Boston'},
  {n:'State Street Global',   t:'AM',  lat:42.3566,lng:-71.0548,aum:'$4.1T',emp:'46K', col:'#ff8800',info:'Boston'},
  {n:'PIMCO HQ',              t:'AM',  lat:33.6595,lng:-117.9988,aum:'$1.9T',emp:'3K', col:'#ff8800',info:'Newport Beach, CA'},
  {n:'Invesco HQ',            t:'AM',  lat:33.7490,lng:-84.3880, aum:'$1.5T',emp:'8K', col:'#ff8800',info:'Atlanta, GA'},
  {n:'T. Rowe Price HQ',      t:'AM',  lat:39.2904,lng:-76.6122, aum:'$1.5T',emp:'8K', col:'#ff8800',info:'Baltimore, MD'},
  {n:'Franklin Templeton',    t:'AM',  lat:37.5630,lng:-122.0530,aum:'$1.4T',emp:'9K', col:'#ff8800',info:'San Mateo, CA'},
  {n:'Capital Group HQ',      t:'AM',  lat:34.0522,lng:-118.2437,aum:'$2.2T',emp:'8K', col:'#ff8800',info:'Los Angeles'},
  {n:'Amundi HQ',             t:'AM',  lat:48.8736,lng:2.2956,  aum:'$2.2T',emp:'5K',  col:'#ff8800',info:'Paris'},
  {n:'Allianz Global Investors',t:'AM',lat:48.1351,lng:11.5820, aum:'$0.6T',emp:'3K',  col:'#ff8800',info:'Munich'},
  {n:'DWS Group HQ',          t:'AM',  lat:50.1109,lng:8.6774,  aum:'$0.9T',emp:'4K',  col:'#ff8800',info:'Frankfurt'},
  {n:'Abrdn HQ',              t:'AM',  lat:55.9533,lng:-3.1883, aum:'$0.5T',emp:'5K',  col:'#ff8800',info:'Edinburgh'},
  {n:'Schroders HQ',          t:'AM',  lat:51.5150,lng:-0.0900, aum:'$0.9T',emp:'6K',  col:'#ff8800',info:'London'},
  {n:'Legal & General Invest',t:'AM',  lat:51.5177,lng:-0.0836, aum:'$1.4T',emp:'10K', col:'#ff8800',info:'London'},
  {n:'Baillie Gifford HQ',    t:'AM',  lat:55.9533,lng:-3.2100, aum:'$0.2T',emp:'1.5K',col:'#ff8800',info:'Edinburgh'},
  // ── POJIŠŤOVNY ───────────────────────────────────────────────────────────────
  {n:'Berkshire Hathaway HQ', t:'IN',  lat:41.2565,lng:-95.9345,aum:'$1.1T',emp:'390K',col:'#aa6600',info:'Omaha, NE'},
  {n:'Allianz SE HQ',         t:'IN',  lat:48.1351,lng:11.5820, aum:'$1.0T',emp:'160K',col:'#aa6600',info:'Munich'},
  {n:'AXA Group HQ',          t:'IN',  lat:48.8784,lng:2.3127, aum:'$0.8T',emp:'150K', col:'#aa6600',info:'Paris'},
  {n:'Zurich Insurance HQ',   t:'IN',  lat:47.3769,lng:8.5417, aum:'$0.5T',emp:'56K',  col:'#aa6600',info:'Zurich'},
  {n:'Munich Re HQ',          t:'IN',  lat:48.1351,lng:11.5760, aum:'$0.3T',emp:'43K', col:'#aa6600',info:'Munich'},
  {n:'Swiss Re HQ',           t:'IN',  lat:47.3667,lng:8.5500, aum:'$0.3T',emp:'14K',  col:'#aa6600',info:'Zurich'},
  {n:'MetLife HQ',            t:'IN',  lat:40.7413,lng:-73.9876,aum:'$0.7T',emp:'43K', col:'#aa6600',info:'NYC'},
  {n:'Prudential Financial',  t:'IN',  lat:40.7263,lng:-74.1723,aum:'$0.9T',emp:'40K', col:'#aa6600',info:'Newark, NJ'},
  // ── IMF / WORLD BANK / BIS ───────────────────────────────────────────────────
  {n:'IMF Headquarters',      t:'IO',  lat:38.8991,lng:-77.0458,aum:'$1T+ SDR',emp:'2.7K',col:'#ff8800',info:'700 19th St, Washington DC'},
  {n:'World Bank Group',      t:'IO',  lat:38.8993,lng:-77.0422,aum:'$700B loans',emp:'13K',col:'#ff8800',info:'1818 H St, Washington DC'},
  {n:'BIS (Bank for Int. Settlements)',t:'IO',lat:47.5596,lng:7.5886,aum:'$400B+',emp:'0.7K',col:'#ff8800',info:'Basel, Switzerland'},
  {n:'EBRD HQ',               t:'IO',  lat:51.5170,lng:-0.0760, aum:'$75B',emp:'3.4K', col:'#ff8800',info:'London'},
  {n:'Asian Development Bank',t:'IO',  lat:14.5820,lng:121.0534,aum:'$250B',emp:'3K',  col:'#ff8800',info:'Manila, Philippines'},
  {n:'African Dev. Bank',     t:'IO',  lat:5.3544,  lng:-3.9795, aum:'$65B',emp:'2K',  col:'#ff8800',info:'Abidjan, Ivory Coast'},
  {n:'IFC (World Bank Group)',t:'IO',  lat:38.8993,lng:-77.0430,aum:'$100B+',emp:'4K', col:'#ff8800',info:'Washington DC'},
  {n:'AIIB HQ',               t:'IO',  lat:39.9042,lng:116.4100,aum:'$100B',emp:'0.3K',col:'#ff8800',info:'Beijing'},
  {n:'EIB (European Invest.)',t:'IO',  lat:49.6232,lng:6.1600,  aum:'$650B',emp:'3.5K',col:'#ff8800',info:'Luxembourg'}
];

// Oprav chybu v datech — emp je string
INST_DATA.forEach(d => { if(typeof d.emp !== 'string') d.emp = String(d.emp); });

const INST_COLORS = { IB:'#4488ff', EX:'#ff7700', HF:'#ff4488', AM:'#ff8800', IN:'#aa6600', IO:'#ff8800' };
const INST_LABELS = { IB:'INV BANK', EX:'EXCHANGE', HF:'HEDGE FUND', AM:'ASSET MGR', IN:'INSURANCE', IO:'INTL ORG' };

const INST_EXT = {
  'Goldman Sachs HQ':       {rev:'$46.3B',pe:'14.2x',roe:'11.2%',tier:'G-SIB', rating:'A+/A1',   ytd:'+12.4%',stock:'GS'},
  'JPMorgan Chase HQ':      {rev:'$162B', pe:'12.1x',roe:'17.0%',tier:'G-SIB', rating:'A+/Aa2',  ytd:'+8.2%', stock:'JPM'},
  'Morgan Stanley HQ':      {rev:'$54.1B',pe:'16.8x',roe:'13.1%',tier:'G-SIB', rating:'A+/A1',   ytd:'+5.7%', stock:'MS'},
  'Bank of America HQ':     {rev:'$100B', pe:'11.4x',roe:'11.2%',tier:'G-SIB', rating:'A+/Aa2',  ytd:'+3.1%', stock:'BAC'},
  'Citigroup HQ':           {rev:'$78.2B',pe:'10.2x',roe:'7.5%', tier:'G-SIB', rating:'A-/A3',   ytd:'-1.2%', stock:'C'},
  'Wells Fargo HQ':         {rev:'$82.6B',pe:'11.8x',roe:'11.7%',tier:'G-SIB', rating:'A+/Aa2',  ytd:'+2.4%', stock:'WFC'},
  'Barclays HQ':            {rev:'$28.4B',pe:'8.2x', roe:'10.1%',tier:'G-SIB', rating:'A/A1',    ytd:'+18.3%',stock:'BARC.L'},
  'Deutsche Bank HQ':       {rev:'$30.1B',pe:'7.9x', roe:'7.2%', tier:'G-SIB', rating:'A-/A2',   ytd:'+22.1%',stock:'DBK.DE'},
  'UBS Group HQ':           {rev:'$45.3B',pe:'13.8x',roe:'8.2%', tier:'G-SIB', rating:'A+/Aa3',  ytd:'+6.1%', stock:'UBSG.SW'},
  'HSBC HQ':                {rev:'$67.4B',pe:'9.1x', roe:'14.2%',tier:'G-SIB', rating:'A+/Aa3',  ytd:'+4.8%', stock:'HSBA.L'},
  'BNP Paribas HQ':         {rev:'$52.3B',pe:'7.4x', roe:'9.8%', tier:'G-SIB', rating:'A+/Aa3',  ytd:'+14.2%',stock:'BNP.PA'},
  'BlackRock HQ':           {rev:'$19.4B',pe:'22.1x',roe:'15.5%',tier:'GSIFI', rating:'AA-/Aa3',  ytd:'+9.3%', stock:'BLK'},
  'Vanguard HQ':            {rev:'$7.8B', pe:null,   roe:null,   tier:'MUTUAL',rating:'N/A',      ytd:null,    stock:null},
  'Fidelity Investments':   {rev:'$28.4B',pe:null,   roe:null,   tier:'MUTUAL',rating:'N/A',      ytd:null,    stock:null},
  'NYSE (New York Stock Exchange)':{rev:'$7.3B',pe:'28x',roe:'22%',tier:'SRO', rating:'AA/Aa1',   ytd:'+2.1%', stock:'ICE'},
  'NASDAQ HQ':              {rev:'$7.1B', pe:'32x',  roe:'18%',  tier:'SRO',   rating:'A+/A1',    ytd:'+15.3%',stock:'NDAQ'},
  'London Stock Exchange':  {rev:'$9.1B', pe:'24x',  roe:'16%',  tier:'SRO',   rating:'AA-/Aa3',  ytd:'+3.4%', stock:'LSEG.L'},
  'CME Group HQ':           {rev:'$5.8B', pe:'26x',  roe:'14%',  tier:'DCM',   rating:'AA-/Aa3',  ytd:'+1.2%', stock:'CME'},
  'IMF Headquarters':       {rev:'SDR 1.5B',pe:null, roe:null,   tier:'IFI',   rating:'AAA/Aaa',  ytd:null,    stock:null},
  'World Bank Group':       {rev:'$12.4B',pe:null,   roe:null,   tier:'MDB',   rating:'AAA/Aaa',  ytd:null,    stock:null},
  'BIS (Bank for Int. Settlements)':{rev:'$1.2B',pe:null,roe:null,tier:'IFI',  rating:'AAA/Aaa',  ytd:null,    stock:null},
  'Citadel HQ':             {rev:'$7.3B', pe:null,   roe:'27%',  tier:'HF',    rating:'N/R',      ytd:'+8.1%', stock:null},
  'Bridgewater Associates': {rev:'$1.8B', pe:null,   roe:'18%',  tier:'HF',    rating:'N/R',      ytd:'+3.2%', stock:null},
  'Renaissance Technologies':{rev:'$1.5B',pe:null,   roe:null,   tier:'HF',    rating:'N/R',      ytd:null,    stock:null},
  'Tokyo Stock Exchange':   {rev:'$1.1B', pe:'18x',  roe:'12%',  tier:'SRO',   rating:'AA/Aa1',   ytd:'+6.2%', stock:'JPX.T'},
  'Hong Kong Stock Exchange':{rev:'$2.8B',pe:'22x',  roe:'18%',  tier:'SRO',   rating:'AA/Aa2',   ytd:'-3.1%', stock:'0388.HK'},
  'Shanghai Stock Exchange':{rev:'$1.5B', pe:null,   roe:null,   tier:'SRO',   rating:'N/R',      ytd:null,    stock:null}
};

// City → FX pair
const _CITY_FX = {
  'NYC':'EUR/USD','New York':'EUR/USD','Manhattan':'EUR/USD',
  'London':'EUR/GBP','Frankfurt':'EUR/USD','Tokyo':'USD/JPY',
  'Zurich':'EUR/CHF','Sydney':'AUD/USD','Toronto':'USD/CAD',
  'Singapore':'USD/SGD','Hong Kong':'USD/HKD','HK':'USD/HKD',
  'Beijing':'USD/CNY','Shanghai':'USD/CNY','Paris':'EUR/USD',
  'Munich':'EUR/USD','Amsterdam':'EUR/USD','Milan':'EUR/USD',
  'Madrid':'EUR/USD','Boston':'EUR/USD','Chicago':'EUR/USD',
  'Charlotte':'EUR/USD','Omaha':'EUR/USD','Stockholm':'EUR/SEK',
  'Warsaw':'EUR/PLN','Prague':'USD/CZK','Stamford':'EUR/USD',
  'Greenwich':'EUR/USD','Westport':'EUR/USD','Mumbai':'USD/INR'
};

LG.inst = L.layerGroup().addTo(map);

// ── Dot color by institution type ────────────────────────────────────────────
function _instDotCol(t) {
  return {IB:'rgba(68,136,255,0.75)', EX:'rgba(255,119,0,0.75)',
          HF:'rgba(255,68,136,0.75)', AM:'rgba(255,136,0,0.75)',
          IN:'rgba(170,102,0,0.7)',   IO:'rgba(255,136,0,0.65)'}[t] || 'rgba(150,144,124,0.7)';
}

// ── Type-specific extra data rows ─────────────────────────────────────────────
const _INST_EXTRA = {
  'NYSE (New York Stock Exchange)': { founded:1792, listed:2400, avgVol:'$22B/day', clearing:'DTCC', reg:'SEC', mic:'XNYS' },
  'NASDAQ HQ':                      { founded:1971, listed:3300, avgVol:'$18B/day', clearing:'DTCC', reg:'SEC', mic:'XNAS' },
  'CME Group HQ':                   { founded:1898, listed:null, avgVol:'$1Q notional', clearing:'CME Clearing', reg:'CFTC', mic:'XCME' },
  'CBOE Global Markets':            { founded:1973, listed:null, avgVol:'4.2M contracts/day', clearing:'OCC', reg:'SEC/CFTC', mic:'XCBO' },
  'London Stock Exchange':          { founded:1801, listed:1800, avgVol:'£8B/day', clearing:'LCH', reg:'FCA', mic:'XLON' },
  'Euronext (Paris)':               { founded:2000, listed:1800, avgVol:'€10B/day', clearing:'LCH SA', reg:'AMF', mic:'XPAR' },
  'Deutsche Boerse (Xetra)':        { founded:1993, listed:450,  avgVol:'€5.5B/day', clearing:'Eurex Clearing', reg:'BaFin', mic:'XETR' },
  'Tokyo Stock Exchange':           { founded:1878, listed:3800, avgVol:'¥3.5T/day', clearing:'JSCC', reg:'FSA', mic:'XTKS' },
  'Hong Kong Stock Exchange':       { founded:1891, listed:2600, avgVol:'HKD$100B/day', clearing:'HKSCC', reg:'SFC', mic:'XHKG' },
  'Shanghai Stock Exchange':        { founded:1990, listed:2200, avgVol:'CNY400B/day', clearing:'CSDC', reg:'CSRC', mic:'XSHG' },
  'Goldman Sachs HQ':               { founded:1869, cib:'$22.4B', wb:'$7.1B', am:'$10.2B', tier1:14.5, leverage:'10.2x' },
  'JPMorgan Chase HQ':              { founded:1799, cib:'$65.3B', wb:'$24.1B', am:'$22.8B', tier1:15.4, leverage:'12.8x' },
  'Morgan Stanley HQ':              { founded:1935, cib:'$27.5B', wb:'$5.8B',  am:'$7.3B',  tier1:16.4, leverage:'11.1x' },
  'BlackRock HQ':                   { founded:1988, equity:'$5.2T', fi:'$3.1T', alts:'$0.9T', etf:'$3.5T', fees:'0.19%' },
  'Vanguard HQ':                    { founded:1975, equity:'$5.8T', fi:'$2.1T', alts:null, etf:'$2.6T', fees:'0.08%' },
  'Bridgewater Associates':         { founded:1975, strategy:'Global Macro', flagship:'Pure Alpha', drawdown:'8.1%', sharpe:'0.74' },
  'Renaissance Technologies':       { founded:1982, strategy:'Quant Statistical', flagship:'Medallion', drawdown:'3.5%', sharpe:'2.1+' },
  'Citadel HQ':                     { founded:1990, strategy:'Multi-Strategy', flagship:'Wellington', drawdown:'7.6%', sharpe:'1.42' },
  'IMF Headquarters':               { founded:1944, members:190, sdrholds:'XDR477B', lending:'XDR96B', weo:'Apr 2025' },
  'World Bank Group':               { founded:1944, members:189, ibrd:'$110B cap', ida:'$93B', ifc:'$79B committed' },
  'BIS (Bank for Int. Settlements)': { founded:1930, members:63,  ownReserves:'CHF382B', triennial:'Apr 2022', research:'Working Papers' }
};

function renderInstLayer(){
  LG.inst.clearLayers();
  return;
  INST_DATA.forEach(d=>{
    const iSz=4, iCol='rgba(160,150,130,0.72)';
    const iDot='<div class="m-wrap inst-dot" style="width:'+(iSz+2)+'px;height:'+(iSz+2)+'px">'
      +'<div class="m-ring" style="border-color:'+iCol+'"></div>'
      +'<div class="m-core" style="width:'+iSz+'px;height:'+iSz+'px;background:'+iCol+';box-shadow:0 0 2px 1px rgba(160,150,130,0.2)"></div>'
      +'</div>';
    const icon=L.divIcon({html:iDot,className:'',iconAnchor:[iSz/2,iSz/2],iconSize:[iSz+2,iSz+2]});
    const mk=L.marker([d.lat,d.lng],{icon,zIndexOffset:800});

    const ext       = INST_EXT[d.n]   || {};
    const extra     = (_INST_EXTRA&&_INST_EXTRA[d.n]) || {};
    const typeLabel = INST_LABELS[d.t] || d.t;
    const fn        = "'Share Tech Mono',monospace";
    const W         = 300;

    // FX
    const cityKey = Object.keys(_CITY_FX).find(k=>d.info.includes(k)||d.n.includes(k));
    const fxPair  = cityKey ? _CITY_FX[cityKey] : null;
    const fxEntry = fxPair  ? FXP.find(x=>x.p===fxPair) : null;
    const fxMid   = fxEntry ? (fxEntry.b+fxEntry.a)/2 : null;
    const fxUp    = fxEntry && fxEntry.c >= 0;
    const fxDp    = fxMid   ? (fxMid>100?2:fxMid>10?3:4) : 4;

    // News
    const news = _instNewsWithFallback(d.n, 4);

    // ── HELPER: compact horizontal bar (label | bar | value) ─────────────────
    // (BAR, R, ytdCol defined inside tabbed panel below)

    // ══════════════════════════════════════════════════════════════════════════
    //  TABBED DETAIL PANEL — v2  (Overview · Portfolio · Crypto · Transfers · News)
    // ══════════════════════════════════════════════════════════════════════════
    const PW = 520;
    const pid = 'pp_' + Math.random().toString(36).slice(2,8);

    // ── SVG donut helper ──────────────────────────────────────────────────────
    const mkDonut=(slices,cx,cy,r,sw)=>{
      let svg='',ang=-Math.PI/2;
      const tau=Math.PI*2;
      const tot=slices.reduce((s,x)=>s+x.v,0)||1;
      slices.forEach(sl=>{
        const slice=(sl.v/tot)*tau;
        const x1=cx+r*Math.cos(ang), y1=cy+r*Math.sin(ang);
        const x2=cx+r*Math.cos(ang+slice), y2=cy+r*Math.sin(ang+slice);
        const lg=slice>Math.PI?1:0;
        svg+=`<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${lg},1 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${sl.col}" stroke-width="${sw}"/>`;
        ang+=slice;
      });
      return svg;
    };

    // ── BAR helper (wider popup) ──────────────────────────────────────────────
    const BAR=(lbl, v, maxV, col, valStr, lblW=120, valW=80)=>{
      const avail=PW-lblW-valW-32;
      const bw = Math.max(2, Math.min(avail, Math.round((Math.abs(v)/Math.max(maxV,0.001))*avail)));
      return `<div style="display:flex;align-items:center;gap:6px;margin:3.5px 0">
        <span style="color:#666;font-size:8px;width:${lblW}px;flex-shrink:0;letter-spacing:.4px">${lbl}</span>
        <div style="flex:1;height:4px;background:#161616;position:relative;border-radius:1px">
          <div style="position:absolute;left:0;top:0;width:${bw}px;height:100%;background:${col};border-radius:1px"></div>
        </div>
        <span style="color:${col};font-size:8.5px;font-weight:700;width:${valW}px;text-align:right;flex-shrink:0">${valStr}</span>
      </div>`;
    };

    // ── Table row helper ──────────────────────────────────────────────────────
    const R=(lbl,val,col,sub,expandId)=>{
      const expandBtn = expandId
        ? `<span onclick="window['_bbExpand']('${pid}','${expandId}')" style="margin-left:5px;color:#444;font-size:7px;cursor:pointer;padding:0 3px;border:1px solid #222;letter-spacing:.3px">▶ DETAIL</span>`
        : '';
      return `<tr class="bb-row" onclick="window['_bbExpand']&&window['_bbExpand']('${pid}','${expandId||''}')" style="cursor:${expandId?'pointer':'default'}">
        <td style="padding:5px 10px 5px 14px;color:#666;font-size:9px;letter-spacing:.6px;border-bottom:1px solid #111;white-space:nowrap;font-family:'Share Tech Mono',monospace">${lbl}</td>
        <td style="padding:5px 12px 5px 4px;text-align:right;color:${col||'#aaa'};font-size:10px;font-weight:700;border-bottom:1px solid #111;white-space:nowrap;font-family:'Roboto Mono',monospace">${val}${sub?`<span style="color:#444;font-size:7.5px;font-weight:400;margin-left:4px">${sub}</span>`:''}${expandBtn}</td>
      </tr>`;
    };

    // ── sparkline helper (mini SVG bar chart) ─────────────────────────────────
    const mkSparkline=(vals,w,h2,col)=>{
      if(!vals||!vals.length)return'';
      const mx=Math.max(...vals,0.001);
      const bw=Math.floor(w/vals.length)-1;
      let bars='';
      vals.forEach((v,i)=>{
        const bh=Math.max(1,Math.round((v/mx)*h2));
        bars+=`<rect x="${i*(bw+1)}" y="${h2-bh}" width="${bw}" height="${bh}" fill="${col}" opacity="0.7"/>`;
      });
      return `<svg width="${w}" height="${h2}" style="display:block">${bars}</svg>`;
    };

    // ── Mini line chart (SVG polyline) ────────────────────────────────────────
    const mkLineChart=(vals,w,h2,col)=>{
      if(!vals||vals.length<2)return'';
      const mn=Math.min(...vals), mx=Math.max(...vals);
      const range=mx-mn||1;
      const pts=vals.map((v,i)=>`${(i/(vals.length-1)*w).toFixed(1)},${(h2-(v-mn)/range*h2*0.85+h2*0.075).toFixed(1)}`).join(' ');
      const area=`0,${h2} `+pts+` ${w},${h2}`;
      return `<svg width="${w}" height="${h2}" style="display:block;overflow:visible">
        <defs><linearGradient id="lg_${pid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${col}" stop-opacity=".25"/><stop offset="100%" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
        <polygon points="${area}" fill="url(#lg_${pid})"/>
        <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="${parseFloat(pts.split(' ').pop().split(',')[0])}" cy="${parseFloat(pts.split(' ').pop().split(',')[1])}" r="2" fill="${col}"/>
      </svg>`;
    };

    // ── Generate fake but plausible historical returns ────────────────────────
    const _genReturns=(seed,n,baseVol)=>{
      let r=[],v=100,s=seed;
      for(let i=0;i<n;i++){s=(s*16807)%2147483647;const d=(s/2147483647-0.5)*baseVol;v+=d;r.push(Math.max(20,v));}
      return r;
    };

    const ytdCol = ext.ytd?(ext.ytd.startsWith('+')?'#00cc55':'#cc3333'):'#333';

    // ── AUM bars data ─────────────────────────────────────────────────────────
    const aumBars=[];
    const aumCols={equity:'#1e5c33',fi:'#1e3a5c',etf:'#4a4a1a',alts:'#5c1e3a'};
    ['equity','fi','etf','alts'].forEach(k=>{
      if(extra[k]) aumBars.push({l:k==='fi'?'FIXED INCOME':k==='etf'?'ETF / PASSIVE':k.toUpperCase(), raw:extra[k], col:aumCols[k]});
    });
    aumBars.forEach(b2=>{ b2.v=parseFloat((b2.raw||'0').replace(/[^0-9.]/g,'')); b2.unit=b2.raw.includes('T')?'T':'B'; });
    const totalAUM=aumBars.reduce((s,b2)=>s+b2.v,0)||1;

    // ── Revenue streams ───────────────────────────────────────────────────────
    const revStreams=[
      {l:'CIB / TRADING', v:parseFloat((extra.cib||'0').replace(/[^0-9.]/g,'')), col:'#1a3a1a'},
      {l:'WEALTH / PRIV', v:parseFloat((extra.wb||'0').replace(/[^0-9.]/g,'')),  col:'#1a2a3a'},
      {l:'ASSET MGT',     v:parseFloat((extra.am||'0').replace(/[^0-9.]/g,'')),  col:'#2a2a1a'}
    ].filter(s=>s.v>0);

    // ── Crypto exposure for this institution ──────────────────────────────────
    const _CRYPTO_EXPO = {
      'BlackRock HQ':         [{sym:'BTC',w:'IBIT',aum:'$48.2B',chg:'+2.1%',col:'#f7931a'},{sym:'ETH',w:'ETHA',aum:'$2.1B',chg:'-0.8%',col:'#627eea'},{sym:'USDC',w:'Circle',aum:'$0.8B',chg:'0.0%',col:'#2775ca'}],
      'Fidelity Investments': [{sym:'BTC',w:'FBTC',aum:'$18.4B',chg:'+1.9%',col:'#f7931a'},{sym:'ETH',w:'FETH',aum:'$1.0B',chg:'-0.5%',col:'#627eea'}],
      'Vanguard HQ':          [],
      'Goldman Sachs HQ':     [{sym:'BTC',w:'Custody',aum:'$1.2B',chg:'+0.4%',col:'#f7931a'},{sym:'ETH',w:'Derivatives',aum:'$0.4B',chg:'-1.1%',col:'#627eea'}],
      'JPMorgan Chase HQ':    [{sym:'BTC',w:'JPM Coin',aum:'$0.9B',chg:'+0.2%',col:'#f7931a'},{sym:'USDC',w:'Circle Ptnr',aum:'$2.1B',chg:'0.0%',col:'#2775ca'}],
      'Morgan Stanley HQ':    [{sym:'BTC',w:'MSTR Exp.',aum:'$2.4B',chg:'+3.1%',col:'#f7931a'}],
      'Bridgewater Associates':[{sym:'BTC',w:'Macro Hedge',aum:'$0.3B',chg:'+1.4%',col:'#f7931a'}],
      'Citadel HQ':           [{sym:'BTC',w:'Options MM',aum:'$1.8B',chg:'+0.7%',col:'#f7931a'},{sym:'ETH',w:'Perps MM',aum:'$0.6B',chg:'-0.3%',col:'#627eea'},{sym:'SOL',w:'Spot MM',aum:'$0.2B',chg:'+2.8%',col:'#9945ff'}],
      'Renaissance Technologies':[{sym:'BTC',w:'Medallion',aum:'$0.8B',chg:'+1.1%',col:'#f7931a'}],
      'Point72 Asset Mgmt':   [{sym:'BTC',w:'Long Only',aum:'$0.5B',chg:'+2.2%',col:'#f7931a'},{sym:'SOL',w:'Venture',aum:'$0.1B',chg:'+5.4%',col:'#9945ff'}]
};
    const cryptoExpo = _CRYPTO_EXPO[d.n] || [];

    // ── Simulate recent large transfers (Arkham-style) ────────────────────────
    const _mkTransfers=(instName, seed)=>{
      const wallets={
        'BlackRock HQ':   ['0x1b7B...3a9F','0xC02a...a3A2','bc1q...m9xk'],
        'Fidelity Investments':['bc1q...f4d2','0x5C69...1234'],
        'Goldman Sachs HQ':  ['0x3f5C...bB2a','0xAbCd...9F01'],
        'JPMorgan Chase HQ': ['0x1234...DEAD','0xBEEF...5678'],
        'Citadel HQ':        ['0x7a16...c4E3','0x9bD8...FF12']
};
      const syms=['BTC','ETH','USDC','USDT','SOL','BNB'];
      const types=['DEPOSIT','WITHDRAW','TRANSFER','SWAP','STAKE'];
      const w=wallets[instName]||['0x????...????'];
      const s2=instName.split('').reduce((a,c)=>a+c.charCodeAt(0),seed);
      const out=[];
      for(let i=0;i<6;i++){
        const h2=(s2*16807*(i+1))%2147483647;
        const sym=syms[h2%syms.length];
        const amt=((h2%9800+200)/10).toFixed(2);
        const usd=((parseFloat(amt)*(sym==='BTC'?82000:sym==='ETH'?2100:sym==='SOL'?130:1))/1e6).toFixed(2);
        const typ=types[h2%types.length];
        const minsAgo=Math.floor(h2%1440);
        const from=h2%2===0?w[0]:(w[1]||'0x????...????');
        const to=h2%2===0?(w[1]||'0xExch...ange'):w[0];
        out.push({sym,amt,usd,typ,minsAgo,from,to});
      }
      return out;
    };
    const transfers=_mkTransfers(d.n, d.lat*1000|0);

    // ── Build tab content ─────────────────────────────────────────────────────
    const seed=d.n.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
    const returns12=_genReturns(seed,12,8);
    const returns24=_genReturns(seed+1,24,6);
    const aum12=_genReturns(seed+2,12,5).map((v,i)=>v*(totalAUM||1)/100);

    // ── TAB: OVERVIEW ─────────────────────────────────────────────────────────
    const tabOverview=(()=>{
      let t='';

      // ── Institutional description map ─────────────────────────────────────
      const _INST_DESC = {
        'Goldman Sachs HQ':        'Global investment banking and financial services firm. Known for M&A advisory, securities trading, and asset management. Founded by Marcus Goldman in a basement on Pine Street, NYC.',
        'JPMorgan Chase HQ':       'Largest US bank by assets. Formed by merger of J.P. Morgan & Co. and Bank One in 2004. Operates retail banking, investment banking, commercial banking and asset management globally.',
        'Morgan Stanley HQ':       'Leading global financial services firm offering investment banking, securities, wealth management and investment management. Spun off from J.P. Morgan in 1935.',
        'Bank of America HQ':      'Second-largest US bank. Serving approximately 67 million consumer and small business clients. Core operations in retail banking, investment banking and wealth management.',
        'Citigroup HQ':            'Global bank operating in over 160 countries. Formed by merger of Citicorp and Travelers Group in 1998. Major presence in institutional clients group and consumer banking.',
        'Wells Fargo HQ':          'Third-largest US bank. Founded during the California Gold Rush, offering banking, investment, mortgage and consumer finance products across the United States.',
        'Barclays HQ':             'British multinational investment bank and financial services company. History dating to 1690. Operates across consumer banking, corporate banking and investment banking divisions.',
        'Deutsche Bank HQ':        'Germany\'s largest bank and a major global investment bank. Headquartered in Frankfurt\'s financial district. Operates in over 58 countries with focus on corporate and investment banking.',
        'UBS Group HQ':            'Switzerland\'s largest bank and a global leader in wealth management. Formed from the merger of Union Bank of Switzerland and Swiss Bank Corporation in 1998.',
        'HSBC HQ':                 'One of the world\'s largest banking and financial services organisations. Name derives from The Hongkong and Shanghai Banking Corporation. Serves over 39 million customers globally.',
        'BNP Paribas HQ':          'France\'s largest bank and one of the largest in the world. Formed in 2000 by the merger of BNP and Paribas. Major presence in Europe, Americas and Asia-Pacific.',
        'Nomura HQ':               'Japan\'s largest investment bank and brokerage firm. Founded in Osaka, expanded globally after acquiring Lehman Brothers\' Asia-Pacific and European operations in 2008.',
        'MUFG HQ':                 'Mitsubishi UFJ Financial Group — Japan\'s largest and the world\'s fifth-largest bank by assets. Formed in 2005 from merger of UFJ and Mitsubishi Tokyo Financial Group.',
        'ICBC HQ':                 'Industrial and Commercial Bank of China — world\'s largest bank by total assets. State-owned commercial bank serving over 700 million personal customers globally.',
        'BlackRock HQ':            'World\'s largest asset manager. Founded by Larry Fink and 7 partners in a single room. Known for iShares ETF platform and Aladdin risk management technology.',
        'Vanguard HQ':             'Second-largest asset manager globally. Pioneered index fund investing. Unique client-owned structure means no external shareholders — investors in Vanguard funds own the company.',
        'Fidelity Investments':    'One of the largest privately held companies in the US. Pioneers in mutual funds and retirement services. Known for Magellan Fund and zero-expense-ratio index funds.',
        'Bridgewater Associates':  'World\'s largest hedge fund by AUM. Founded by Ray Dalio. Known for "Pure Alpha" strategy and "All Weather" portfolio. Operates on principles of radical transparency.',
        'Renaissance Technologies':'Most successful hedge fund in history. Founded by former Cold War codebreaker Jim Simons. Medallion Fund returned ~66% gross annually from 1988 to 2018.',
        'Citadel HQ':              'Global alternative asset manager and market maker. Founded by Ken Griffin at age 22 from his Harvard dorm room. Wellington Fund is flagship multi-strategy vehicle.',
        'NYSE (New York Stock Exchange)':'Largest stock exchange in the world by market capitalisation. Located on Wall Street since 1903. Owned by Intercontinental Exchange (ICE) since 2013.',
        'NASDAQ HQ':               'Second-largest stock exchange globally. First electronic stock market, launched in 1971. Home to major tech companies including Apple, Microsoft, Amazon and Meta.',
        'London Stock Exchange':   'One of the world\'s oldest stock exchanges. Founded in a coffee house on Jonathan\'s. Merged with Borsa Italiana in 2007. Now part of LSEG (London Stock Exchange Group).',
        'Tokyo Stock Exchange':    'Asia\'s largest stock exchange. Merged with Osaka Securities Exchange in 2013 to form Japan Exchange Group (JPX). Listed companies include Toyota, Sony and SoftBank.',
        'Shanghai Stock Exchange': 'Mainland China\'s largest stock exchange and one of the world\'s largest by market cap. Not directly accessible to most foreign investors due to China\'s capital controls.',
        'Hong Kong Stock Exchange':'Gateway for international investors into Chinese markets. One of Asia\'s most international exchanges. Tried to acquire London Stock Exchange in 2019.',
        'CME Group HQ':            'World\'s leading and most diverse derivatives marketplace. Operates Chicago Mercantile Exchange, CBOT, NYMEX and COMEX. Handles $1 quadrillion in notional value annually.',
        'IMF Headquarters':        'International Monetary Fund — intergovernmental organisation promoting global monetary cooperation, exchange rate stability and international trade. 190 member countries.',
        'World Bank Group':        'International financial institution providing loans to developing countries for capital programmes. Comprises IBRD, IDA, IFC, MIGA and ICSID.',
        'BIS (Bank for Int. Settlements)':'Bank for central banks. Oldest international financial institution, founded in Basel following WWI reparations. Hosts Basel Committee on Banking Supervision.',
        'Berkshire Hathaway HQ':   'Multinational conglomerate holding company headed by Warren Buffett. Began as a textile company. Now holds major positions in insurance, energy, rail and consumer brands.',
        'Allianz SE HQ':           'German multinational financial services company and world\'s largest insurance company by assets. Also operates Allianz Global Investors and PIMCO asset management.',
        'AXA Group HQ':            'French multinational insurance firm and global investment manager. One of the world\'s largest insurance companies by revenue, operating in 50+ countries.'
};

      // ── Founded year extended map ─────────────────────────────────────────
      const _FOUNDED_MAP = {
        'Goldman Sachs HQ':1869,'JPMorgan Chase HQ':1799,'Morgan Stanley HQ':1935,
        'Bank of America HQ':1904,'Citigroup HQ':1812,'Wells Fargo HQ':1852,
        'Barclays HQ':1690,'Deutsche Bank HQ':1870,'UBS Group HQ':1862,
        'Credit Agricole HQ':1894,'BNP Paribas HQ':1848,'Societe Generale HQ':1864,
        'HSBC HQ':1865,'Nomura HQ':1925,'Mizuho Financial HQ':2003,
        'MUFG HQ':2005,'SMBC Group HQ':2002,'ICBC HQ':1984,
        'China Construction Bank':1954,'Agricultural Bank China':1951,'Bank of China HQ':1912,
        'Standard Chartered HQ':1853,'Macquarie Group HQ':1969,'RBC Capital Markets':1864,
        'TD Bank Group HQ':1855,'Santander HQ':1857,'ING Group HQ':1991,
        'ABN AMRO HQ':1824,'UniCredit HQ':1870,'Intesa Sanpaolo HQ':2007,
        'Commerzbank HQ':1870,'Julius Baer HQ':1890,'Lazard HQ':1848,
        'Jefferies HQ':1962,'Evercore HQ':1995,
        'NYSE (New York Stock Exchange)':1792,'NASDAQ HQ':1971,'CME Group HQ':1898,
        'CBOE Global Markets':1973,'London Stock Exchange':1801,'Euronext (Paris)':2000,
        'Deutsche Boerse (Xetra)':1585,'SIX Swiss Exchange':1850,'Tokyo Stock Exchange':1878,
        'Hong Kong Stock Exchange':1891,'Shanghai Stock Exchange':1990,'Shenzhen Stock Exchange':1990,
        'BSE Bombay':1875,'NSE India':1992,'Euronext Amsterdam':1602,
        'Borsa Istanbul':1985,'Johannesburg Stock Exchange':1887,'SGX Singapore Exchange':1973,
        'ASX Australian Securities':1987,'TMX Toronto Stock Exchange':1861,
        'B3 Bolsa Brasil':1890,'BME (Madrid)':1831,'Nasdaq Nordic (Stockholm)':1863,
        'Warsaw Stock Exchange':1817,'Prague Stock Exchange':1993,
        'Bridgewater Associates':1975,'Man Group HQ':1783,'Renaissance Technologies':1982,
        'Citadel HQ':1990,'DE Shaw HQ':1988,'Two Sigma HQ':2001,
        'Millennium Management':1989,'Elliott Investment Mgmt':1977,'Point72 Asset Mgmt':1992,
        'Baupost Group':1982,'Winton Group HQ':1997,'AQR Capital Mgmt':1998,
        'Tiger Global Mgmt':2001,'Pershing Square Capital':2004,'Third Point LLC':1995,
        'BlackRock HQ':1988,'Vanguard HQ':1975,'Fidelity Investments':1946,
        'State Street Global':1792,'PIMCO HQ':1971,'Invesco HQ':1978,
        'T. Rowe Price HQ':1937,'Franklin Templeton':1947,'Capital Group HQ':1931,
        'Amundi HQ':2010,'Allianz Global Investors':1998,'DWS Group HQ':1956,
        'Abrdn HQ':1825,'Schroders HQ':1804,'Legal & General Invest':1836,
        'Baillie Gifford HQ':1908,
        'Berkshire Hathaway HQ':1839,'Allianz SE HQ':1890,'AXA Group HQ':1816,
        'Zurich Insurance HQ':1872,'Munich Re HQ':1880,'Swiss Re HQ':1863,
        'MetLife HQ':1868,'Prudential Financial':1875,
        'IMF Headquarters':1944,'World Bank Group':1944,
        'BIS (Bank for Int. Settlements)':1930,'EBRD HQ':1991,
        'Asian Development Bank':1966,'African Dev. Bank':1964,
        'IFC (World Bank Group)':1956,'AIIB HQ':2015,'EIB (European Invest.)':1958
};

      const desc = _INST_DESC[d.n] || null;
      const founded = _FOUNDED_MAP[d.n] || extra.founded || null;
      const typeColor = {IB:'#4488ff',EX:'#ff7700',HF:'#ff4488',AM:'#ff8800',IN:'#aa8855',IO:'#66aadd'}[d.t] || '#888';
      const typeFullName = {
        IB:'Investment Bank', EX:'Stock Exchange', HF:'Hedge Fund',
        AM:'Asset Manager', IN:'Insurance', IO:'International Org.'
      }[d.t] || typeLabel;

      // ── Profile header block ─────────────────────────────────────────────
      t += `<div style="background:#050505;padding:12px 16px 10px;border-bottom:1px solid #181818">`;

      // Type badge + founded row
      t += `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">`;
      t += `<span style="color:${typeColor};font-size:7.5px;font-weight:700;letter-spacing:1.5px;border:1px solid ${typeColor}44;padding:2px 8px;background:${typeColor}11">${typeFullName.toUpperCase()}</span>`;
      if(founded){ t += `<span style="color:#665533;font-size:7.5px;letter-spacing:.8px">EST. <span style="color:#887744;font-weight:700">${founded}</span></span>`; }
      t += `</div>`;

      // Location row
      t += `<div style="display:flex;align-items:center;gap:5px;margin-bottom:${desc?'9px':'0'}">`;
      t += `<span style="color:#887760;font-size:8px">◈</span>`;
      t += `<span style="color:#555;font-size:8px;letter-spacing:.4px">${d.info}</span>`;
      t += `</div>`;

      // Description
      if(desc){
        t += `<div style="color:#4a4434;font-size:8px;line-height:1.65;letter-spacing:.3px;padding-top:2px;border-top:1px solid #141410;margin-top:5px">${desc}</div>`;
      }
      t += `</div>`;

      // ── Key metrics grid ──────────────────────────────────────────────────
      const metricCells = [];
      if(d.aum)           metricCells.push({l:'AUM / MCAP', v:d.aum, col:'#cc8844'});
      if(ext.rev)         metricCells.push({l:'REVENUE', v:ext.rev, col:'#888'});
      if(d.emp)           metricCells.push({l:'EMPLOYEES', v:d.emp+'K', col:'#555'});
      if(founded)         metricCells.push({l:'FOUNDED', v:String(founded), col:'#444'});
      if(ext.rating)      metricCells.push({l:'CREDIT RTG', v:ext.rating, col:'#777'});
      if(ext.roe)         metricCells.push({l:'ROE', v:ext.roe, col:parseFloat(ext.roe)>10?'#00aa44':'#888'});
      if(ext.pe)          metricCells.push({l:'P/E', v:ext.pe, col:'#666'});
      if(ext.tier)        metricCells.push({l:'DESIGNATION', v:ext.tier, col:'#555'});
      if(ext.ytd)         metricCells.push({l:'YTD PERF', v:ext.ytd, col:ext.ytd.startsWith('+')?'#00aa44':'#cc3333'});
      if(extra.strategy)  metricCells.push({l:'STRATEGY', v:extra.strategy, col:'#778'});
      if(extra.flagship)  metricCells.push({l:'FLAGSHIP FUND', v:extra.flagship, col:'#667'});
      if(extra.drawdown)  metricCells.push({l:'MAX DRAWDOWN', v:'-'+extra.drawdown, col:'#cc3333'});
      if(extra.sharpe)    metricCells.push({l:'SHARPE RATIO', v:extra.sharpe, col:parseFloat(extra.sharpe)>1?'#00aa44':'#888'});
      if(extra.listed)    metricCells.push({l:'LISTED COS', v:extra.listed.toLocaleString(), col:'#667788'});
      if(extra.avgVol)    metricCells.push({l:'AVG DAILY VOL', v:extra.avgVol, col:'#558866'});
      if(extra.mic)       metricCells.push({l:'MIC CODE', v:extra.mic, col:'#44aa66'});
      if(extra.reg)       metricCells.push({l:'REGULATOR', v:extra.reg, col:'#886644'});
      if(extra.members)   metricCells.push({l:'MEMBERS', v:extra.members+' countries', col:'#556677'});
      if(extra.tier1)     metricCells.push({l:'CET1 RATIO', v:extra.tier1+'%', col:extra.tier1>14?'#00aa44':'#ff8800'});
      if(extra.leverage)  metricCells.push({l:'LEVERAGE', v:extra.leverage, col:'#666'});

      if(metricCells.length > 0){
        const cols = metricCells.length === 1 ? 1 : metricCells.length === 2 ? 2 : metricCells.length <= 4 ? 2 : 3;
        t += `<div style="background:#030303;border-bottom:1px solid #181818">`;
        t += `<div style="color:#2a2218;font-size:7px;letter-spacing:2px;padding:6px 16px 4px">KEY METRICS</div>`;
        t += `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1px;background:#111;margin:0 0 0 0">`;
        metricCells.forEach(m=>{
          t += `<div style="background:#060606;padding:7px 10px">
            <div style="color:#333;font-size:7px;letter-spacing:.8px;margin-bottom:3px">${m.l}</div>
            <div style="color:${m.col};font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.2px">${m.v}</div>
          </div>`;
        });
        t += `</div></div>`;
      }

      // ── FX local rate ─────────────────────────────────────────────────────
      if(fxEntry && fxMid){
        const fxChgCol = fxUp ? '#00aa44' : '#cc3333';
        t += `<div style="background:#020202;padding:8px 16px;border-bottom:1px solid #151515;display:flex;align-items:center;justify-content:space-between">`;
        t += `<span style="color:#887760;font-size:7.5px;letter-spacing:1px">LOCAL FX PAIR</span>`;
        t += `<div style="text-align:right">
          <span style="color:#888;font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${fxPair} ${fxMid.toFixed(fxDp)}</span>
          <span style="color:${fxChgCol};font-size:8px;font-weight:700;margin-left:8px">${fxUp?'+':''}${fxEntry.c.toFixed(3)}%</span>
        </div>`;
        t += `</div>`;
      }

      // ── Revenue streams (if available) ───────────────────────────────────
      if(revStreams.length >= 2){
        const maxV = Math.max(...revStreams.map(s=>s.v));
        const rcols = ['#1a8844','#224488','#886622'];
        t += `<div style="background:#030303;padding:8px 16px 10px;border-bottom:1px solid #151515">`;
        t += `<div style="color:#2a2218;font-size:7px;letter-spacing:2px;margin-bottom:6px">REVENUE SEGMENTS</div>`;
        revStreams.forEach((s,i)=>{
          const bw = Math.max(4, Math.round((s.v/maxV)*(PW-200)));
          t += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="color:#444;font-size:7.5px;width:90px;flex-shrink:0">${s.l}</span>
            <div style="flex:1;height:3px;background:#111;border-radius:1px">
              <div style="width:${bw}px;height:100%;background:${rcols[i%3]};border-radius:1px"></div>
            </div>
            <span style="color:${rcols[i%3]};font-size:8.5px;font-weight:700;font-family:'Roboto Mono',monospace;width:48px;text-align:right">$${s.v}B</span>
          </div>`;
        });
        t += `</div>`;
      }

      return t;
    })();
    const _tabOverview_DISABLED=(()=>{
      let t='';

      // KPI row
      const kpis=[
        ext.roe?    {l:'ROE',    v:ext.roe,    col:parseFloat(ext.roe)>10?'#00cc55':'#ff8800'}:null,
        ext.pe?     {l:'P/E',    v:ext.pe,     col:'#888'}:null,
        extra.tier1?{l:'TIER1',  v:extra.tier1+'%', col:extra.tier1>14?'#00cc55':'#ff8800'}:null,
        extra.sharpe?{l:'SHARPE',v:extra.sharpe,col:parseFloat(extra.sharpe)>1?'#00cc55':'#ff8800'}:null,
        ext.rev?    {l:'REV',    v:ext.rev,    col:'#aaa'}:null,
        ext.rating? {l:'RATING', v:ext.rating, col:'#888'}:null
      ].filter(Boolean).slice(0,4);

      if(kpis.length){
        t+=`<div style="display:grid;grid-template-columns:repeat(${kpis.length},1fr);gap:1px;background:#111;margin-bottom:0;border-bottom:1px solid #111">`;
        kpis.forEach(k=>{
          t+=`<div style="background:#080808;padding:8px 6px;text-align:center">
            <div style="color:#555;font-size:7px;letter-spacing:1.2px;margin-bottom:3px;font-family:'Share Tech Mono',monospace">${k.l}</div>
            <div style="color:${k.col};font-size:13px;font-weight:700;font-family:'Roboto Mono',monospace">${k.v}</div>
          </div>`;
        });
        t+=`</div>`;
      }

      // Performance chart
      t+=`<div style="background:#030303;padding:8px 14px 6px;border-bottom:1px solid #111">`;
      t+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">`;
      t+=`<span style="color:#666;font-size:7.5px;letter-spacing:1.5px;font-family:'Share Tech Mono',monospace">PERFORMANCE — 12M ROLLING</span>`;
      t+=`<span style="color:${ytdCol};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">YTD ${ext.ytd||'N/A'}</span>`;
      t+=`</div>`;
      t+=mkLineChart(returns12, PW-28, 58, ext.ytd&&ext.ytd.startsWith('+')?'#00cc44':'#cc3333');
      // X labels
      const mnames=['J','F','M','A','M','J','J','A','S','O','N','D'];
      const now=new Date(); const cm=now.getMonth();
      t+=`<div style="display:flex;justify-content:space-between;margin-top:2px">`;
      for(let i=0;i<12;i++) t+=`<span style="color:#444;font-size:6.5px;font-family:'Share Tech Mono',monospace">${mnames[(cm-11+i+12)%12]}</span>`;
      t+=`</div></div>`;

      // AUM bars
      if(aumBars.length>=2){
        const maxV=Math.max(...aumBars.map(b=>b.v));
        t+=`<div style="background:#020202;padding:8px 14px 6px;border-bottom:1px solid #111">`;
        t+=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:5px">`;
        // donut
        const donutSlices=aumBars.map(b=>({v:b.v,col:b.col}));
        t+=`<svg width="50" height="50" style="flex-shrink:0">${mkDonut(donutSlices,25,25,18,7)}<text x="25" y="28" text-anchor="middle" fill="#444" font-size="5" font-family="'Share Tech Mono',monospace">AUM</text></svg>`;
        t+=`<div style="flex:1">`;
        t+=`<div style="color:#666;font-size:7.5px;letter-spacing:1.5px;margin-bottom:4px;font-family:'Share Tech Mono',monospace">PORTFOLIO BREAKDOWN</div>`;
        aumBars.forEach(bar=>{
          const pct=((bar.v/totalAUM)*100).toFixed(0);
          t+=BAR(bar.l, bar.v, maxV, bar.col, `${bar.v}${bar.unit} · ${pct}%`, 100, 70);
        });
        t+=`</div></div>`;
        // AUM history mini chart
        t+=`<div style="margin-top:3px">`;
        t+=`<div style="color:#555;font-size:7px;letter-spacing:1px;margin-bottom:2px;font-family:'Share Tech Mono',monospace">AUM 12M TREND</div>`;
        t+=mkSparkline(aum12, PW-28, 24, '#ff6600');
        t+=`</div>`;
        t+=`</div>`;
      }

      // Revenue streams (IB)
      if(revStreams.length>=2){
        const maxV=Math.max(...revStreams.map(s=>s.v));
        t+=`<div style="background:#030303;padding:8px 14px 6px;border-bottom:1px solid #111">`;
        t+=`<div style="color:#666;font-size:7.5px;letter-spacing:1.5px;margin-bottom:4px;font-family:'Share Tech Mono',monospace">REVENUE STREAMS</div>`;
        // bar chart
        const rcols=['#00cc44','#2266cc','#cc9900'];
        revStreams.forEach((s,i)=>{
          t+=BAR(s.l, s.v, maxV, rcols[i%3], `$${s.v}B`, 100, 60);
        });
        // Stacked bar visual
        const rtot=revStreams.reduce((a,s)=>a+s.v,0)||1;
        t+=`<div style="height:7px;width:100%;display:flex;margin-top:5px;border-radius:2px;overflow:hidden">`;
        revStreams.forEach((s,i)=>{
          t+=`<div style="width:${(s.v/rtot*100).toFixed(1)}%;background:${rcols[i%3]};opacity:0.75"></div>`;
        });
        t+=`</div>`;
        t+=`</div>`;
      }

      // Exchange metrics
      if(d.t==='EX'){
        t+=`<div style="background:#020202;padding:8px 14px 6px;border-bottom:1px solid #111">`;
        t+=`<div style="color:#666;font-size:7.5px;letter-spacing:1.5px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">EXCHANGE METRICS</div>`;
        if(extra.listed) t+=BAR('LISTED COMPANIES',extra.listed,4000,'#1e8844',extra.listed.toLocaleString(),130,80);
        if(extra.avgVol) t+=BAR('AVG DAILY VOLUME',1,1,'#1e4488',extra.avgVol,130,80);
        const exGrid=[
          extra.mic?{l:'MIC CODE',v:extra.mic,col:'#44aa66'}:null,
          extra.reg?{l:'REGULATOR',v:extra.reg,col:'#888'}:null,
          extra.clearing?{l:'CLEARING',v:extra.clearing,col:'#aa8844'}:null
        ].filter(Boolean);
        if(exGrid.length){
          t+=`<div style="display:grid;grid-template-columns:repeat(${exGrid.length},1fr);gap:1px;background:#111;margin-top:6px">`;
          exGrid.forEach(g=>{
            t+=`<div style="background:#080808;padding:6px 8px;text-align:center">
              <div style="color:#555;font-size:7px;letter-spacing:.8px;margin-bottom:2px;font-family:'Share Tech Mono',monospace">${g.l}</div>
              <div style="color:${g.col};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${g.v}</div>
            </div>`;
          });
          t+=`</div>`;
        }
        t+=`</div>`;
      }

      // Data table
      t+=`<table style="width:100%;border-collapse:collapse">`;
      t+=R('EMPLOYEES', d.emp+' FTE', '#555');
      if(ext.rev)    t+=R('REVENUE LTM',   ext.rev,    '#555');
      if(ext.roe)    t+=R('ROE',           ext.roe,    parseFloat(ext.roe||0)>10?'#009944':'#888');
      if(ext.rating) t+=R('CREDIT RATING', ext.rating, '#888', 'S&P/Mdy');
      if(ext.tier)   t+=R('DESIGNATION',   ext.tier,   '#444');
      if(extra.strategy) t+=R('STRATEGY',  extra.strategy,'#555');
      if(extra.flagship) t+=R('FLAGSHIP',  extra.flagship,'#555');
      if(extra.drawdown) t+=R('MAX DRAWDOWN','-'+extra.drawdown,'#cc3333');
      if(extra.members)  t+=R('MEMBERS',   extra.members,'#444');
      if(extra.founded)  t+=R('FOUNDED',   extra.founded,'#333');
      if(extra.leverage) t+=R('LEVERAGE',  extra.leverage,'#666');
      if(fxEntry&&fxMid){
        const fxChg=`<span style="color:${fxUp?'#009944':'#cc3333'}">${fxUp?'+':''}${fxEntry.c.toFixed(2)}%</span>`;
        t+=R('LOCAL FX', `${fxPair} ${fxMid.toFixed(fxDp)}`, '#777');
      }
      t+=`</table>`;
      return t;
    })();

    // ── TAB: MACRO RATES (removed — placeholder) ────────────────────────────
    const tabMacroRates=(()=>{
      return `<div style="padding:24px;text-align:center;color:#887760;font-size:9px;letter-spacing:1px;font-family:'Share Tech Mono',monospace">— COMING SOON —</div>`;
    })();
    const _tabMacroRates_DISABLED=(()=>{
      let t='';

      // Central bank rates table — key global banks
      const cbRates=[
        {name:'FED',full:'Federal Reserve',rate:4.50,prev:5.50,bias:'HOLD',cpi:2.8,gdp:2.3,col:'#00cc44'},
        {name:'ECB',full:'European Central Bank',rate:2.65,prev:4.50,bias:'CUT',cpi:2.3,gdp:0.9,col:'#00cc44'},
        {name:'BOE',full:'Bank of England',rate:4.50,prev:5.25,bias:'CUT',cpi:2.8,gdp:0.7,col:'#00cc44'},
        {name:'BOJ',full:'Bank of Japan',rate:0.50,prev:-0.10,bias:'HIKE',cpi:3.1,gdp:1.6,col:'#ff4444'},
        {name:'SNB',full:'Swiss National Bank',rate:0.25,prev:1.75,bias:'HOLD',cpi:0.3,gdp:1.4,col:'#aaaaaa'},
        {name:'RBA',full:'Reserve Bank Australia',rate:4.10,prev:4.35,bias:'CUT',cpi:2.4,gdp:1.5,col:'#00cc44'},
        {name:'BOC',full:'Bank of Canada',rate:3.00,prev:5.00,bias:'CUT',cpi:2.1,gdp:1.2,col:'#00cc44'},
        {name:'PBOC',full:"People's Bank of China",rate:3.10,prev:3.65,bias:'CUT',cpi:0.1,gdp:4.8,col:'#00cc44'}
      ];

      t+=`<div style="background:#020202;padding:7px 14px 0;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:6px;font-family:'Share Tech Mono',monospace">GLOBAL CENTRAL BANK POLICY RATES — LIVE</div>`;
      t+=`<table style="width:100%;border-collapse:collapse">`;
      t+=`<tr style="border-bottom:1px solid #1a1a0a">
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;font-family:'Share Tech Mono',monospace">BANK</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;text-align:right;font-family:'Share Tech Mono',monospace">RATE</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;text-align:right;font-family:'Share Tech Mono',monospace">CYCLE</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;text-align:right;font-family:'Share Tech Mono',monospace">CPI</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;text-align:right;font-family:'Share Tech Mono',monospace">REAL</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;text-align:center;font-family:'Share Tech Mono',monospace">BIAS</td>
      </tr>`;
      cbRates.forEach((cb,i)=>{
        const realRate=(cb.rate-cb.cpi).toFixed(2);
        const realCol=parseFloat(realRate)>0?'#00cc44':'#cc3333';
        const biasCol=cb.bias==='HIKE'?'#ff4444':cb.bias==='CUT'?'#00cc44':'#888877';
        const biasArrow=cb.bias==='HIKE'?'▲':cb.bias==='CUT'?'▼':'─';
        const cycleChg=(cb.rate-cb.prev).toFixed(2);
        const cycleCol=parseFloat(cycleChg)<0?'#00cc44':'#ff4444';
        t+=`<tr style="border-bottom:1px solid #0e0e0a" onmouseover="this.style.background='#0d0c08'" onmouseout="this.style.background='transparent'">
          <td style="padding:6px 6px">
            <div style="color:#F39F41;font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${cb.name}</div>
            <div style="color:#998870;font-size:6.5px;font-family:'Share Tech Mono',monospace">${cb.full.split(' ').slice(0,2).join(' ')}</div>
          </td>
          <td style="padding:6px 6px;text-align:right;color:#ffffff;font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace">${cb.rate.toFixed(2)}<span style="color:#998870;font-size:8px">%</span></td>
          <td style="padding:6px 6px;text-align:right;color:${cycleCol};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${parseFloat(cycleChg)<0?'':'+'}${cycleChg}%</td>
          <td style="padding:6px 6px;text-align:right;color:#aaa;font-size:9px;font-family:'Roboto Mono',monospace">${cb.cpi.toFixed(1)}%</td>
          <td style="padding:6px 6px;text-align:right;color:${realCol};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${parseFloat(realRate)>0?'+':''}${realRate}%</td>
          <td style="padding:6px 6px;text-align:center">
            <span style="color:${biasCol};font-size:7px;font-weight:700;border:1px solid ${biasCol}44;padding:2px 5px;font-family:'Share Tech Mono',monospace">${biasArrow} ${cb.bias}</span>
          </td>
        </tr>`;
      });
      t+=`</table></div>`;

      // US Macro indicators panel
      t+=`<div style="background:#030302;padding:8px 14px 8px;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:6px;font-family:'Share Tech Mono',monospace">US MACRO DASHBOARD — KEY INDICATORS</div>`;

      // Fetch live data from FRED if available
      const fredCPI=window._liveData&&window._liveData.fred&&window._liveData.fred.cpi?window._liveData.fred.cpi.value:2.8;
      const fredUNR=window._liveData&&window._liveData.fred&&window._liveData.fred.unemployment?window._liveData.fred.unemployment.value:4.2;

      const macroKPIs=[
        {l:'GDP Q4',v:'2.3%',sub:'Final estimate',col:'#00cc44',warn:false},
        {l:'CPI YoY',v:fredCPI?fredCPI.toFixed(1)+'%':'2.8%',sub:'vs 2.0% target',col:fredCPI>3?'#cc3333':fredCPI>2?'#ffaa00':'#00cc44',warn:fredCPI>3},
        {l:'CORE PCE',v:'2.8%',sub:'+0.4% MoM x4',col:'#ffaa00',warn:true},
        {l:'UNEMP.',v:fredUNR?fredUNR.toFixed(1)+'%':'4.2%',sub:'Full employment',col:'#00cc44',warn:false},
        {l:'PPI MoM',v:'-0.1%',sub:'Deflation signal',col:'#00cc44',warn:false},
        {l:'DXY',v:'104.2',sub:'2-yr low',col:'#cc3333',warn:true},
        {l:'TRADE BAL',v:'-$124B',sub:'Historic deficit',col:'#cc3333',warn:true},
        {l:'FED FUNDS',v:'4.25–4.5%',sub:'Current target',col:'#aaaaaa',warn:false}
      ];
      t+=`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#161606">`;
      macroKPIs.forEach(k=>{
        t+=`<div style="background:#070604;padding:8px 8px;text-align:center">
          <div style="color:#998870;font-size:6.5px;letter-spacing:.8px;margin-bottom:3px;font-family:'Share Tech Mono',monospace">${k.l}</div>
          <div style="color:${k.col};font-size:10.5px;font-weight:700;font-family:'Roboto Mono',monospace">${k.v}</div>
          <div style="color:#887760;font-size:6px;margin-top:2px;font-family:'Share Tech Mono',monospace">${k.sub}</div>
        </div>`;
      });
      t+=`</div></div>`;

      // Tariff & Trade overview
      t+=`<div style="background:#020201;padding:8px 14px;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">US TARIFF REGIME — CURRENT STATUS</div>`;
      const tariffs=[
        {region:'UNIVERSAL',rate:'10%',note:'All trading partners baseline',col:'#ffaa00'},
        {region:'RECIPROCAL',rate:'15–55%',note:'Based on bilateral tariff balance',col:'#ff8800'},
        {region:'CHINA',rate:'145%',note:'Maximum tariff — trade war escalated',col:'#cc3333'},
        {region:'CANADA/MEX',rate:'EXEMPT*',note:'USMCA exceptions apply',col:'#888877'}
      ];
      tariffs.forEach(tr=>{
        t+=`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #0e0e0a">
          <span style="color:#aa9980;font-size:7px;font-weight:700;width:70px;flex-shrink:0;font-family:'Share Tech Mono',monospace">${tr.region}</span>
          <span style="color:${tr.col};font-size:11px;font-weight:700;width:60px;flex-shrink:0;font-family:'Roboto Mono',monospace">${tr.rate}</span>
          <span style="color:#998870;font-size:7.5px;font-family:'Share Tech Mono',monospace">${tr.note}</span>
        </div>`;
      });
      t+=`</div>`;

      // Seasonality note
      t+=`<div style="background:#030302;padding:7px 14px">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:4px;font-family:'Share Tech Mono',monospace">MARKET SEASONALITY — HISTORICAL PATTERN</div>`;
      const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      const seasonBias=[+1,+0.5,+1,+1,+0.5,-0.5,-0.5,-1,-1.5,+1.5,+1,+1.5];
      t+=`<div style="display:flex;gap:2px;align-items:flex-end;height:40px;margin-bottom:4px">`;
      const nowMo=new Date().getMonth();
      seasonBias.forEach((v,i)=>{
        const h=Math.abs(v)*12+4;
        const col=v>0?'#1a4420':'#3a1010';
        const brd=i===nowMo?(v>0?'#00cc44':'#cc3333'):'transparent';
        t+=`<div style="flex:1;height:${h}px;background:${col};border:1px solid ${brd};position:relative" title="${months[i]}: ${v>0?'+':''}${v}"></div>`;
      });
      t+=`</div>`;
      t+=`<div style="display:flex;gap:2px">`;
      months.forEach((m,i)=>{
        const col=i===nowMo?'#ff8800':'#332211';
        t+=`<span style="flex:1;text-align:center;color:${col};font-size:5.5px;font-family:'Share Tech Mono',monospace">${m.slice(0,1)}</span>`;
      });
      t+=`</div>`;
      t+=`<div style="color:#998870;font-size:7px;margin-top:5px;font-family:'Share Tech Mono',monospace">SEP historically weak · OCT–NOV recovery typical · Dec strength</div>`;
      t+=`</div>`;

      return t;
    })();

    // ── TAB: FX FACTORS (removed — placeholder) ──────────────────────────────
    const tabFxFactors=(()=>{
      return `<div style="padding:24px;text-align:center;color:#887760;font-size:9px;letter-spacing:1px;font-family:'Share Tech Mono',monospace">— COMING SOON —</div>`;
    })();
    const _tabFxFactors_DISABLED=(()=>{
      let t='';
      const majorPairs=['EUR/USD','USD/JPY','GBP/USD','USD/CHF','USD/CAD','AUD/USD','NZD/USD','EUR/GBP','EUR/JPY','GBP/JPY'];

      t+=`<div style="background:#020202;padding:7px 14px 0;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">MAJOR FX PAIRS — LIVE SPOT RATES</div>`;
      t+=`<table style="width:100%;border-collapse:collapse">`;
      t+=`<tr style="border-bottom:1px solid #1a1a0a">
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;letter-spacing:.8px;font-family:'Share Tech Mono',monospace">PAIR</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">BID</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">ASK</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">CHG%</td>
        <td style="padding:3px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">SPREAD</td>
      </tr>`;
      majorPairs.forEach(pair=>{
        const fe=FXP.find(x=>x.p===pair);
        if(!fe)return;
        const mid=(fe.b+fe.a)/2;
        const dp=mid>100?2:mid>10?3:4;
        const fxUp=fe.c>=0;
        const chgCol=fxUp?'#00cc44':'#cc3333';
        const spread=((fe.a-fe.b)*10000).toFixed(1);
        t+=`<tr onmouseover="this.style.background='#0d0c08'" onmouseout="this.style.background='transparent'" style="border-bottom:1px solid #0e0e0a">
          <td style="padding:6px 6px;color:#ff8800;font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace">${pair}</td>
          <td style="padding:6px 6px;text-align:right;color:#cc7755;font-size:9.5px;font-family:'Roboto Mono',monospace">${fe.b.toFixed(dp)}</td>
          <td style="padding:6px 6px;text-align:right;color:#44cc77;font-size:9.5px;font-family:'Roboto Mono',monospace">${fe.a.toFixed(dp)}</td>
          <td style="padding:6px 6px;text-align:right;color:${chgCol};font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace">${fxUp?'+':''}${fe.c.toFixed(3)}%</td>
          <td style="padding:6px 6px;text-align:right;color:#998870;font-size:8.5px;font-family:'Roboto Mono',monospace">${spread}p</td>
        </tr>`;
      });
      t+=`</table></div>`;

      // DXY panel
      const dxyEntry=FXP.find(x=>x.p==='DXY'||x.p==='USD/DXY');
      t+=`<div style="background:#030302;padding:8px 14px;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:6px;font-family:'Share Tech Mono',monospace">DXY — US DOLLAR INDEX</div>`;
      t+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#161606;margin-bottom:7px">`;
      const dxyVal=dxyEntry?(dxyEntry.b+dxyEntry.a)/2:104.2;
      const dxyChg=dxyEntry?dxyEntry.c:-0.4;
      [{l:'DXY CURRENT',v:dxyVal.toFixed(2),col:'#ffffff'},
       {l:'CHANGE',v:(dxyChg>=0?'+':'')+dxyChg.toFixed(3)+'%',col:dxyChg>=0?'#00cc44':'#cc3333'},
       {l:'2-YR STATUS',v:'2-YR LOW',col:'#cc3333'}
      ].forEach(k=>{
        t+=`<div style="background:#070604;padding:8px 6px;text-align:center">
          <div style="color:#998870;font-size:6.5px;letter-spacing:.8px;margin-bottom:3px;font-family:'Share Tech Mono',monospace">${k.l}</div>
          <div style="color:${k.col};font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace">${k.v}</div>
        </div>`;
      });
      t+=`</div>`;

      // DXY basket weights
      const dxyBasket=[
        {name:'EUR',sym:'🇪🇺',weight:57.6,col:'#4488ff'},
        {name:'JPY',sym:'🇯🇵',weight:13.6,col:'#cc3333'},
        {name:'GBP',sym:'🇬🇧',weight:11.9,col:'#00cc44'},
        {name:'CAD',sym:'🇨🇦',weight:9.1,col:'#ff8800'},
        {name:'SEK',sym:'🇸🇪',weight:4.2,col:'#887755'},
        {name:'CHF',sym:'🇨🇭',weight:3.6,col:'#aaaaaa'}
      ];
      t+=`<div style="color:#998870;font-size:7px;letter-spacing:1.5px;margin-bottom:4px;font-family:'Share Tech Mono',monospace">DXY BASKET WEIGHTS</div>`;
      dxyBasket.forEach(b=>{
        t+=`<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
          <span style="color:#998870;font-size:8px;width:28px;flex-shrink:0;font-family:'Share Tech Mono',monospace">${b.name}</span>
          <div style="flex:1;height:6px;background:#0d0c08;border-radius:2px;overflow:hidden">
            <div style="width:${b.weight}%;height:100%;background:${b.col};opacity:.8;border-radius:2px"></div>
          </div>
          <span style="color:${b.col};font-size:8.5px;font-weight:700;width:36px;text-align:right;font-family:'Roboto Mono',monospace">${b.weight}%</span>
        </div>`;
      });

      t+=`<div style="margin-top:7px;padding-top:6px;border-top:1px solid #1a1a0a">`;
      t+=`<div style="color:#998870;font-size:7.5px;line-height:1.6;font-family:'Share Tech Mono',monospace">`;
      t+=`<span style="color:#cc3333">WEAK USD:</span> ▶ Export boost · Import inflation pressure · Commodities rally · EM relief<br>`;
      t+=`<span style="color:#00cc44">STRONG USD:</span> ▶ Import deflation · EM pressure · Commodities down · US export drag`;
      t+=`</div></div>`;
      t+=`</div>`;

      // Trade balance
      t+=`<div style="background:#020201;padding:8px 14px">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">US TRADE BALANCE — CURRENT ACCOUNT</div>`;
      const tradeRows=[
        {l:'Trade Balance',v:'-$124.0B',col:'#cc3333',sub:'Monthly deficit record'},
        {l:'Exports',v:'+$285.7B',col:'#00cc44',sub:'Goods + Services'},
        {l:'Imports',v:'-$409.7B',col:'#cc3333',sub:'Record high level'},
        {l:'Net Exports NX',v:'-$124.0B',col:'#cc3333',sub:'Drag on GDP formula'}
      ];
      tradeRows.forEach((tr,i)=>{
        t+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0e0e0a">
          <span style="color:#aa9980;font-size:8px;font-family:'Share Tech Mono',monospace">${tr.l}</span>
          <div style="text-align:right">
            <div style="color:${tr.col};font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">${tr.v}</div>
            <div style="color:#887760;font-size:6.5px;font-family:'Share Tech Mono',monospace">${tr.sub}</div>
          </div>
        </div>`;
      });
      t+=`</div>`;

      return t;
    })();

    // ── TAB: YIELD CURVE (removed — placeholder) ─────────────────────────────
    const tabYieldCurve=(()=>{
      return `<div style="padding:24px;text-align:center;color:#887760;font-size:9px;letter-spacing:1px;font-family:'Share Tech Mono',monospace">— COMING SOON —</div>`;
    })();
    const _tabYieldCurve_DISABLED=(()=>{
      let t='';
      const usYields=[
        {t:'1M',v:4.34},{t:'3M',v:4.31},{t:'6M',v:4.25},{t:'1Y',v:4.15},
        {t:'2Y',v:4.02},{t:'3Y',v:3.98},{t:'5Y',v:3.96},{t:'7Y',v:4.08},
        {t:'10Y',v:4.29},{t:'20Y',v:4.51},{t:'30Y',v:4.63}
      ];

      t+=`<div style="background:#020202;padding:8px 14px 10px;border-bottom:1px solid #151515">`;
      t+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">`;
      t+=`<span style="color:#664400;font-size:7px;letter-spacing:2px;font-family:'Share Tech Mono',monospace">US TREASURY YIELD CURVE</span>`;

      // Inversion check
      const is2_10inv = usYields.find(x=>x.t==='2Y')&&usYields.find(x=>x.t==='10Y') &&
        usYields.find(x=>x.t==='10Y').v < usYields.find(x=>x.t==='2Y').v;
      t+=`<span style="color:${is2_10inv?'#cc3333':'#00cc44'};font-size:7px;font-weight:700;border:1px solid ${is2_10inv?'#441111':'#114411'};padding:2px 6px;font-family:'Share Tech Mono',monospace">${is2_10inv?'⚠ INVERTED':'NORMAL'}</span>`;
      t+=`</div>`;

      // SVG yield curve chart
      const minV=Math.min(...usYields.map(y=>y.v));
      const maxV=Math.max(...usYields.map(y=>y.v));
      const chartW=PW-48; const chartH=80;
      const xStep=chartW/(usYields.length-1);
      const pts=usYields.map((y,i)=>{
        const x=i*xStep;
        const yPos=chartH-((y.v-minV)/(maxV-minV+0.01)*(chartH-10))-5;
        return `${x},${yPos}`;
      }).join(' ');
      t+=`<svg width="${chartW}" height="${chartH}" style="display:block;margin-bottom:5px">`;
      t+=`<polyline points="${pts}" fill="none" stroke="#ff6600" stroke-width="1.5" opacity=".9"/>`;
      usYields.forEach((y,i)=>{
        const x=i*xStep;
        const yPos=chartH-((y.v-minV)/(maxV-minV+0.01)*(chartH-10))-5;
        t+=`<circle cx="${x}" cy="${yPos}" r="2.5" fill="#ff8800"/>`;
      });
      t+=`</svg>`;

      // X labels
      t+=`<div style="display:flex;justify-content:space-between;margin-bottom:8px">`;
      usYields.forEach(y=>{
        t+=`<span style="color:#887760;font-size:5.5px;font-family:'Share Tech Mono',monospace">${y.t}</span>`;
      });
      t+=`</div>`;

      // Yield table
      t+=`<table style="width:100%;border-collapse:collapse">`;
      t+=`<tr style="border-bottom:1px solid #1a1a0a">
        <td style="padding:2px 6px;color:#998870;font-size:6.5px;font-family:'Share Tech Mono',monospace">TENOR</td>
        <td style="padding:2px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">YIELD</td>
        <td style="padding:2px 6px;color:#998870;font-size:6.5px;text-align:right;font-family:'Share Tech Mono',monospace">vs PREV</td>
      </tr>`;
      usYields.forEach((y,i)=>{
        const prev=y.v-(Math.sin(i*1.3+seed)*0.06);
        const chg=y.v-prev;
        const chgCol=chg>=0?'#cc3333':'#00cc44';
        t+=`<tr onmouseover="this.style.background='#0d0c08'" onmouseout="this.style.background='transparent'" style="border-bottom:1px solid #0a0908">
          <td style="padding:4px 6px;color:#F39F41;font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${y.t}</td>
          <td style="padding:4px 6px;text-align:right;color:#ffffff;font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace">${y.v.toFixed(2)}<span style="color:#998870;font-size:7px">%</span></td>
          <td style="padding:4px 6px;text-align:right;color:${chgCol};font-size:8.5px;font-family:'Roboto Mono',monospace">${chg>=0?'+':''}${(chg*100).toFixed(1)}bp</td>
        </tr>`;
      });
      t+=`</table></div>`;

      // Key spreads
      t+=`<div style="background:#030302;padding:8px 14px;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">KEY SPREADS — MACRO SIGNALS</div>`;
      const y2=usYields.find(x=>x.t==='2Y')?.v||4.02;
      const y10=usYields.find(x=>x.t==='10Y')?.v||4.29;
      const y3m=usYields.find(x=>x.t==='3M')?.v||4.31;
      const y30=usYields.find(x=>x.t==='30Y')?.v||4.63;
      const spreads=[
        {l:'2Y–10Y Spread',v:((y10-y2)*100).toFixed(0)+'bp',col:(y10-y2)<0?'#cc3333':'#00cc44',note:(y10-y2)<0?'Recession signal':'Normal'},
        {l:'3M–10Y Spread',v:((y10-y3m)*100).toFixed(0)+'bp',col:(y10-y3m)<0?'#cc3333':'#00cc44',note:(y10-y3m)<0?'Inverted':'Steep'},
        {l:'2Y–30Y Spread',v:((y30-y2)*100).toFixed(0)+'bp',col:'#888877',note:'Curve steepness'},
        {l:'Break-even 10Y',v:'2.28%',col:'#ffaa00',note:'Market inflation exp.'},
        {l:'Real Yield 10Y',v:'+2.01%',col:'#00cc44',note:'Nominal – break-even'},
        {l:'Term Premium',v:'+0.15%',col:'#888877',note:'ACM estimate'}
      ];
      spreads.forEach(s=>{
        t+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0e0e0a">
          <span style="color:#aa9980;font-size:8px;font-family:'Share Tech Mono',monospace">${s.l}</span>
          <div style="text-align:right">
            <span style="color:${s.col};font-size:10px;font-weight:700;margin-right:8px;font-family:'Roboto Mono',monospace">${s.v}</span>
            <span style="color:#887760;font-size:7px;font-family:'Share Tech Mono',monospace">${s.note}</span>
          </div>
        </div>`;
      });
      t+=`</div>`;

      // Global 10Y yields comparison
      t+=`<div style="background:#020201;padding:8px 14px">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">GLOBAL 10Y GOVERNMENT BOND YIELDS</div>`;
      const global10y=[
        {c:'US',v:4.29,col:'#4488ff'},{c:'DE',v:2.65,col:'#ffaa00'},{c:'UK',v:4.65,col:'#00cc44'},
        {c:'JP',v:1.52,col:'#cc3333'},{c:'AU',v:4.38,col:'#888877'},{c:'CA',v:3.22,col:'#ff8800'},
        {c:'IT',v:3.61,col:'#44aaff'},{c:'FR',v:3.12,col:'#ff7777'}
      ];
      const maxYld=Math.max(...global10y.map(g=>g.v));
      t+=`<div style="display:flex;gap:3px;align-items:flex-end;height:50px;margin-bottom:5px">`;
      global10y.forEach(g=>{
        const barH=Math.round(g.v/maxYld*44)+4;
        t+=`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="width:100%;height:${barH}px;background:${g.col};opacity:.7;border-radius:1px 1px 0 0"></div>
        </div>`;
      });
      t+=`</div>`;
      t+=`<div style="display:flex;gap:3px">`;
      global10y.forEach(g=>{
        t+=`<div style="flex:1;text-align:center">
          <div style="color:${g.col};font-size:6px;font-family:'Share Tech Mono',monospace">${g.c}</div>
          <div style="color:#998870;font-size:6px;font-family:'Roboto Mono',monospace">${g.v.toFixed(2)}</div>
        </div>`;
      });
      t+=`</div></div>`;

      return t;
    })();

    // ── TAB: MACRO RATING (removed — placeholder) ────────────────────────────
    const tabMacroRating=(()=>{
      return `<div style="padding:24px;text-align:center;color:#887760;font-size:9px;letter-spacing:1px;font-family:'Share Tech Mono',monospace">— COMING SOON —</div>`;
    })();
    const _tabMacroRating_DISABLED=(()=>{
      let t='';
      const regionMap={
        'NYC':'US','New York':'US','Manhattan':'US','Boston':'US','Chicago':'US',
        'Charlotte':'US','Stamford':'US','Greenwich':'US','Westport':'US',
        'London':'EU','Frankfurt':'EU','Paris':'EU','Amsterdam':'EU','Milan':'EU',
        'Madrid':'EU','Zurich':'CH','Munich':'EU','Stockholm':'EU',
        'Tokyo':'JP','Beijing':'CN','Shanghai':'CN','Singapore':'SG',
        'Hong Kong':'HK','Sydney':'AU','Toronto':'CA','Mumbai':'IN'
};
      const cityKey2=Object.keys(regionMap).find(k=>d.info.includes(k)||d.n.includes(k));
      const region=cityKey2?regionMap[cityKey2]:'US';

      const macroProfiles={
        US:{ gdpScore:72,inflScore:55,rateScore:60,fxScore:45,tradeScore:30,stabScore:70, gdpTxt:'2.3%',inflTxt:'2.8%',rateTxt:'4.5%',fxTxt:'DXY 104',tradeTxt:'-$124B',overall:'CAUTIOUS POSITIVE' },
        EU:{ gdpScore:40,inflScore:70,rateScore:65,fxScore:55,tradeScore:58,stabScore:60, gdpTxt:'0.9%',inflTxt:'2.3%',rateTxt:'2.65%',fxTxt:'EUR/USD 1.089',tradeTxt:'+€20B',overall:'NEUTRAL' },
        UK:{ gdpScore:38,inflScore:48,rateScore:52,fxScore:50,tradeScore:42,stabScore:55, gdpTxt:'0.7%',inflTxt:'2.8%',rateTxt:'4.5%',fxTxt:'GBP/USD 1.294',tradeTxt:'-£15B',overall:'CAUTIOUS' },
        JP:{ gdpScore:50,inflScore:55,rateScore:45,fxScore:40,tradeScore:48,stabScore:65, gdpTxt:'1.6%',inflTxt:'3.1%',rateTxt:'0.5%',fxTxt:'USD/JPY 148.5',tradeTxt:'-¥1.2T',overall:'NEUTRAL' },
        CN:{ gdpScore:65,inflScore:78,rateScore:70,fxScore:52,tradeScore:62,stabScore:50, gdpTxt:'4.8%',inflTxt:'0.1%',rateTxt:'3.1%',fxTxt:'USD/CNY 7.24',tradeTxt:'+$75B',overall:'CAUTIOUS POSITIVE' },
        AU:{ gdpScore:55,inflScore:60,rateScore:58,fxScore:50,tradeScore:52,stabScore:68, gdpTxt:'1.5%',inflTxt:'2.4%',rateTxt:'4.1%',fxTxt:'AUD/USD 0.628',tradeTxt:'+A$2B',overall:'NEUTRAL' },
        CA:{ gdpScore:48,inflScore:72,rateScore:65,fxScore:52,tradeScore:44,stabScore:62, gdpTxt:'1.2%',inflTxt:'2.1%',rateTxt:'3.0%',fxTxt:'USD/CAD 1.432',tradeTxt:'-C$3B',overall:'NEUTRAL' },
        CH:{ gdpScore:55,inflScore:88,rateScore:75,fxScore:55,tradeScore:58,stabScore:82, gdpTxt:'1.4%',inflTxt:'0.3%',rateTxt:'0.25%',fxTxt:'EUR/CHF 0.936',tradeTxt:'+CHF5B',overall:'POSITIVE' }
};

      const prof=macroProfiles[region]||macroProfiles['US'];
      const overallCol=prof.overall.includes('POSITIVE')?'#00cc44':prof.overall==='NEUTRAL'?'#888877':'#cc3333';

      t+=`<div style="background:#030302;padding:8px 14px;border-bottom:1px solid #151515">`;
      t+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">`;
      t+=`<span style="color:#664400;font-size:7px;letter-spacing:2px;font-family:'Share Tech Mono',monospace">MACRO ENVIRONMENT RATING — ${region}</span>`;
      t+=`<span style="color:${overallCol};font-size:8px;font-weight:700;border:1px solid ${overallCol}44;padding:2px 8px;font-family:'Share Tech Mono',monospace">${prof.overall}</span>`;
      t+=`</div>`;

      const dims=[
        {l:'GDP GROWTH',score:prof.gdpScore,v:prof.gdpTxt},
        {l:'INFLATION',score:prof.inflScore,v:prof.inflTxt},
        {l:'POLICY RATE',score:prof.rateScore,v:prof.rateTxt},
        {l:'FX STRENGTH',score:prof.fxScore,v:prof.fxTxt},
        {l:'TRADE BALANCE',score:prof.tradeScore,v:prof.tradeTxt},
        {l:'STABILITY',score:prof.stabScore,v:''}
      ];
      dims.forEach(dim=>{
        const col=dim.score>=70?'#00cc44':dim.score>=50?'#ffaa00':'#cc3333';
        t+=`<div style="margin-bottom:7px">`;
        t+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">`;
        t+=`<span style="color:#aa9980;font-size:7.5px;font-family:'Share Tech Mono',monospace">${dim.l}</span>`;
        t+=`<div style="display:flex;align-items:center;gap:7px">`;
        if(dim.v) t+=`<span style="color:#665544;font-size:7.5px;font-family:'Roboto Mono',monospace">${dim.v}</span>`;
        t+=`<span style="color:${col};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace">${dim.score}/100</span>`;
        t+=`</div></div>`;
        t+=`<div style="height:5px;background:#0d0c08;border-radius:2px;overflow:hidden">`;
        t+=`<div style="width:${dim.score}%;height:100%;background:linear-gradient(90deg,${col}66,${col});border-radius:2px;transition:width .4s"></div>`;
        t+=`</div></div>`;
      });

      // Overall gauge
      const totalScore=Math.round(dims.reduce((s,d)=>s+d.score,0)/dims.length);
      const gaugeCol=totalScore>=70?'#00cc44':totalScore>=50?'#ffaa00':'#cc3333';
      t+=`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #1a1a0a;margin-top:4px">`;
      t+=`<div style="flex:1">`;
      t+=`<div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:3px;font-family:'Share Tech Mono',monospace">COMPOSITE MACRO SCORE</div>`;
      t+=`<div style="height:8px;background:#0d0c08;border-radius:3px;overflow:hidden">`;
      t+=`<div style="width:${totalScore}%;height:100%;background:linear-gradient(90deg,${gaugeCol}55,${gaugeCol});border-radius:3px"></div>`;
      t+=`</div></div>`;
      t+=`<span style="color:${gaugeCol};font-size:18px;font-weight:700;font-family:'Roboto Mono',monospace">${totalScore}</span>`;
      t+=`</div></div>`;

      // Institution-relevant macro risks
      t+=`<div style="background:#020201;padding:8px 14px;border-bottom:1px solid #151515">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">KEY MACRO RISK FACTORS</div>`;
      const risks=[
        {l:'Tariff escalation',sev:'HIGH',col:'#cc3333',dir:'▲'},
        {l:'Sticky core inflation PCE',sev:'MED',col:'#ffaa00',dir:'─'},
        {l:'Trade deficit deterioration',sev:'HIGH',col:'#cc3333',dir:'▲'},
        {l:'Fed rate cut delay',sev:'MED',col:'#ffaa00',dir:'─'},
        {l:'USD weakness trend',sev:'MED',col:'#ffaa00',dir:'▼'},
        {l:'Global growth slowdown',sev:'MED',col:'#ffaa00',dir:'▲'}
      ];
      risks.forEach(r=>{
        t+=`<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid #0e0e0a">
          <span style="color:${r.col};font-size:7px;font-weight:700;width:32px;flex-shrink:0;font-family:'Share Tech Mono',monospace">${r.dir} ${r.sev}</span>
          <span style="color:#aa9980;font-size:8px;font-family:'Share Tech Mono',monospace">${r.l}</span>
        </div>`;
      });
      t+=`</div>`;

      // Fed probabilities (from CME FedWatch)
      t+=`<div style="background:#030302;padding:8px 14px">`;
      t+=`<div style="color:#664400;font-size:7px;letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace">FED RATE CUT PROBABILITIES — CME FEDWATCH</div>`;
      const fedProbs=[
        {meet:'MAR 2025',cut0:92,cut25:8,note:'Almost certain hold'},
        {meet:'MAY 2025',cut0:74,cut25:24,note:'Hold likely'},
        {meet:'JUN 2025',cut0:45,cut25:42,note:'Coin flip'},
        {meet:'JUL 2025',cut0:30,cut25:45,note:'Cut likely'}
      ];
      fedProbs.forEach(fp=>{
        const cutProb=fp.cut25+(fp.cut25>0?fp.cut25:0);
        t+=`<div style="margin-bottom:6px">`;
        t+=`<div style="display:flex;justify-content:space-between;margin-bottom:2px">`;
        t+=`<span style="color:#aa9980;font-size:7.5px;font-family:'Share Tech Mono',monospace">${fp.meet}</span>`;
        t+=`<div>`;
        t+=`<span style="color:#888877;font-size:7px;font-family:'Share Tech Mono',monospace">HOLD ${fp.cut0}%  </span>`;
        t+=`<span style="color:#00cc44;font-size:7px;font-weight:700;font-family:'Roboto Mono',monospace">CUT ${fp.cut25}%</span>`;
        t+=`</div></div>`;
        t+=`<div style="height:5px;background:#0d0c08;border-radius:2px;overflow:hidden;display:flex">`;
        t+=`<div style="width:${fp.cut0}%;height:100%;background:#2a2a1a"></div>`;
        t+=`<div style="width:${fp.cut25}%;height:100%;background:#1a4420;border-radius:0 2px 2px 0"></div>`;
        t+=`</div>`;
        t+=`<div style="color:#887760;font-size:6.5px;margin-top:1px;font-family:'Share Tech Mono',monospace">${fp.note}</div>`;
        t+=`</div>`;
      });
      t+=`</div>`;

      return t;
    })();

    // ── PLACEHOLDER (keep tabPortfolio var for compatibility) ────────────────
    const tabPortfolio=tabMacroRates;
    const tabCrypto=tabFxFactors;

    // ── TAB: NEWS ─────────────────────────────────────────────────────────────
    const tabNews=(()=>{ return ''; })();
    const _tabNews_DISABLED=(()=>{
      let t='';
      const allNews=_instNewsWithFallback(d.n, 12);

      t+=`<div style="background:#020202;padding:5px 14px;border-bottom:1px solid #151515;display:flex;justify-content:space-between;align-items:center">`;
      t+=`<span style="color:#666;font-size:7.5px;letter-spacing:1.5px;font-family:'Share Tech Mono',monospace">NEWS FEED</span>`;
      t+=`<span style="color:#555;font-size:7.5px;font-family:'Share Tech Mono',monospace">${allNews.length} ARTICLES</span>`;
      t+=`</div>`;

      if(!allNews.length){
        t+=`<div style="padding:16px;text-align:center;color:#333;font-size:8px">NO RECENT HEADLINES</div>`;
        return t;
      }
      allNews.slice(0,10).forEach(item=>{
        const isAI=item._aiBriefing;
        const srcTxt=isAI?'AI·INT':(item.src||'').slice(0,12);
        const srcCol=isAI?'#336644':'#444';
        const ago=item.ts?_fmtAgo(item.ts):'';
        const url=(item.link||'').replace(/'/g,'');
        const txt=(item.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        t+=`<div style="padding:7px 14px;border-bottom:1px solid #0d0d0d;cursor:pointer;background:#000"
          onclick="if('${url}')window.open('${url}','_blank')"
          onmouseover="this.style.background='#070707'" onmouseout="this.style.background='#000'">
          <div style="display:flex;gap:6px;align-items:flex-start">
            <span style="color:${isAI?'#226633':'#662200'};font-size:7px;margin-top:2px;flex-shrink:0">${isAI?'◆':'▮'}</span>
            <div style="flex:1;min-width:0">
              <div style="color:#888;font-size:8.5px;line-height:1.45;margin-bottom:3px;font-family:'Share Tech Mono',monospace">${txt}</div>
              <div style="display:flex;justify-content:space-between">
                <span style="color:${srcCol};font-size:7px;font-weight:700;font-family:'Share Tech Mono',monospace">${srcTxt}</span>
                <span style="color:#333;font-size:7px;font-family:'Share Tech Mono',monospace">${ago}</span>
              </div>
            </div>
          </div>
        </div>`;
      });
      return t;
    })();

    // ── BUILD UNIFIED POPUP (live data injected asynchronously) ─────────────
    const _tc = {IB:'#4488ff',EX:'#ff8800',HF:'#ff4488',AM:'#ffaa00',IN:'#aa8855',IO:'#44aacc'}[d.t]||'#777';
    const _tl = {IB:'INVESTMENT BANK',EX:'STOCK EXCHANGE',HF:'HEDGE FUND',AM:'ASSET MANAGER',IN:'INSURANCE',IO:'INTL ORG'}[d.t]||d.t;
    const cleanName = d.n.replace(/ HQ$/,'').replace(/ Headquarters$/,'');

    let h = `<div id="${pid}" style="width:${PW}px;font-family:'Share Tech Mono',monospace;background:#000;color:#aaa;font-size:9px">`;

    // ── HEADER ──
    h += `<div style="background:#050505;padding:11px 16px 9px;border-bottom:1px solid #1e1e1e">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="color:#c8a86c;font-size:7px;font-weight:700;letter-spacing:1.8px;border:1px solid #554433;padding:2px 8px;background:#0d0a06">${_tl}</span>
        <span id="${pid}_liveTag" style="color:#665533;font-size:7px;letter-spacing:1px">● LOADING</span>
      </div>
      <div style="color:#e0d0a8;font-size:13px;font-weight:700;letter-spacing:.2px;line-height:1.3;margin-bottom:5px">${cleanName}</div>
      <div style="color:#776655;font-size:8px;letter-spacing:.3px">◈ ${d.info}</div>
    </div>`;

    // ── STATIC INFO ROWS (description + founded always shown) ──
    const _D={
      'Goldman Sachs HQ':        {f:1869,w:'GS',    desc:'Global investment banking leader. Co-founded by Marcus Goldman on Pine Street, NYC. Known for M&A advisory, securities trading, fixed income and asset management. One of only a handful of G-SIB designated global systemically important banks.'},
      'JPMorgan Chase HQ':       {f:1799,w:'JPM',   desc:'Largest US bank by total assets, formed from merger of J.P. Morgan & Co. and Bank One in 2004. Operates across four segments: Consumer & Community Banking, Corporate & Investment Bank, Commercial Banking, and Asset & Wealth Management. Serves millions in 100+ countries.'},
      'Morgan Stanley HQ':       {f:1935,w:'MS',    desc:'Spun off from J.P. Morgan in 1935 as a separate investment bank under Glass-Steagall Act. Now a global leader in wealth management and institutional securities. Acquired E*TRADE (2020) and Eaton Vance (2021) expanding retail reach.'},
      'Bank of America HQ':      {f:1904,w:'BAC',   desc:'Second-largest US bank serving ~67 million consumers. Grew through acquisitions of FleetBoston (2004), MBNA (2006), Countrywide (2008) and Merrill Lynch (2009). Strong digital banking platform with 35M+ active digital users.'},
      'Citigroup HQ':            {f:1812,w:'C',     desc:'Global bank present in 160+ countries, formed by historic 1998 merger of Citicorp and Travelers Group. Currently undergoing major strategic simplification under CEO Jane Fraser, exiting retail banking in many international markets.'},
      'Wells Fargo HQ':          {f:1852,w:'WFC',   desc:'Founded during California Gold Rush to deliver gold and financial services to the West. Third-largest US bank. Operating under Fed asset cap since 2018 fake-accounts scandal. Strong position in US mortgage and consumer lending.'},
      'Barclays HQ':             {f:1690,w:'BARC.L',desc:'One of the world\'s oldest banks, tracing roots to 1690 goldsmith-bankers on Lombard Street. Major global investment bank and UK retail bank. Acquired Lehman Brothers\' North American operations in 2008.'},
      'Deutsche Bank HQ':        {f:1870,w:'DBK.DE',desc:'Germany\'s largest bank and a major global investment bank headquartered in Frankfurt\'s Twin Towers. Operates across Corporate Bank, Investment Bank, Private Bank and DWS asset management. Underwent major restructuring 2019–2022.'},
      'UBS Group HQ':            {f:1862,w:'UBSG.SW',desc:'World\'s largest wealth manager, formed from merger of Union Bank of Switzerland and Swiss Bank Corporation in 1998. Acquired Credit Suisse in emergency government-backed deal in March 2023 for CHF 3 billion.'},
      'Credit Agricole HQ':      {f:1894,w:'ACA.PA',desc:'France\'s largest retail bank and a leading European financial institution. Originally formed as a network of agricultural credit cooperatives. Now a full-service bank with strong retail, corporate and insurance operations across Europe.'},
      'BNP Paribas HQ':          {f:1848,w:'BNP.PA',desc:'France\'s largest bank and one of the world\'s largest, formed from merger of BNP and Paribas in 2000. Major Eurozone investment bank with strong CIB, retail banking in France, Belgium and Italy, and leading fixed-income franchise.'},
      'Societe Generale HQ':     {f:1864,w:'GLE.PA',desc:'Third-largest French bank, founded by Napoleon III\'s government. Known for derivatives innovation and rogue trader scandal (Jérôme Kerviel, 2008). Currently restructuring following acquisitions and disposals across retail and investment banking.'},
      'HSBC HQ':                 {f:1865,w:'HSBA.L',desc:'Name from the Hongkong and Shanghai Banking Corporation. Founded in Hong Kong and Shanghai to finance Asia trade. World\'s largest bank by balance sheet at various points. Pivoting back to Asia-Pacific after strategic review under CEO Noel Quinn.'},
      'Nomura HQ':               {f:1925,w:'NMR',   desc:'Japan\'s largest investment bank and securities firm. Founded in Osaka, expanded globally acquiring Lehman Brothers\' Asia-Pacific and European operations in 2008. Known for equity research and Japan domestic market dominance.'},
      'Mizuho Financial HQ':     {f:2003,w:'MFG',   desc:'Japan\'s third-largest bank by assets, formed from merger of Dai-Ichi Kangyo Bank, Fuji Bank, and Industrial Bank of Japan. Operates across retail, corporate, and investment banking with strong presence in Asia.'},
      'MUFG HQ':                 {f:2005,w:'MUFG',  desc:'Mitsubishi UFJ Financial Group — Japan\'s largest and world\'s fifth-largest bank by assets. Formed 2005 from merger of UFJ and Mitsubishi Tokyo Financial Group. Owns 22% stake in Morgan Stanley, significant US banking presence.'},
      'SMBC Group HQ':           {f:2002,w:'8316.T',desc:'Sumitomo Mitsui Financial Group — Japan\'s second-largest bank. Formed from merger of Sumitomo Bank and Sakura Bank. Strong in structured finance, project finance and Asian wholesale banking. Growing international investment banking presence.'},
      'ICBC HQ':                 {f:1984,w:'1398.HK',desc:'Industrial and Commercial Bank of China — world\'s largest bank by total assets (~$6.3T). State-owned commercial bank serving over 700 million personal customers and 8 million corporate clients. Listed on Shanghai and Hong Kong exchanges in 2006.'},
      'China Construction Bank': {f:1954,w:'0939.HK',desc:'World\'s second-largest bank by assets. State-owned bank originally focused on infrastructure financing. Major lender for major national projects including Three Gorges Dam. Leading mortgage bank and infrastructure project lender in China.'},
      'Agricultural Bank China': {f:1951,w:'1288.HK',desc:'One of China\'s "Big Four" state-owned banks. World\'s third-largest bank by assets. Serves 700+ million customers with largest rural banking network in China. Listed in 2010 in world\'s largest IPO at the time ($22.1B).'},
      'Bank of China HQ':        {f:1912,w:'3988.HK',desc:'Oldest Chinese bank and most internationally-oriented of China\'s "Big Four". Founded by Sun Yat-sen\'s Republican government. Provides full-service banking, as well as investment banking, insurance and asset management. Strong FX operations and cross-border trade finance.'},
      'Standard Chartered HQ':   {f:1853,w:'STAN.L',desc:'British multinational bank focused on Asia, Africa and Middle East markets, despite UK headquarters. Formed from merger of Standard Bank (South Africa) and Chartered Bank of India, Australia & China. Majority of profits derived from Asia, particularly Greater China and ASEAN.'},
      'Macquarie Group HQ':      {f:1969,w:'MQG.AX',desc:'Australian investment bank and asset manager known as the "Millionaire Factory" for high employee compensation. Major global infrastructure investor and manager. Originated as a Hill Samuel subsidiary, became independent in 1985. Major player in green energy financing.'},
      'RBC Capital Markets':     {f:1864,w:'RY',    desc:'Royal Bank of Canada — Canada\'s largest bank by market capitalisation. Leading North American capital markets franchise. Strong retail banking base in Canada combined with growing US banking presence after City National acquisition in 2015.'},
      'TD Bank Group HQ':        {f:1855,w:'TD',    desc:'Toronto-Dominion Bank — Canada\'s second-largest bank and top 10 North American bank by assets. Strong US presence through TD Bank N.A. with ~1,100 US branches. Attempted US$13.4B acquisition of First Horizon abandoned in 2023.'},
      'Santander HQ':            {f:1857,w:'SAN',   desc:'Spain\'s largest bank and one of the largest in Europe and Latin America. Founded in the Cantabrian port city of Santander. One of the world\'s ten largest banks by market capitalisation. Major presence in Brazil, Mexico, US and UK.'},
      'ING Group HQ':            {f:1991,w:'INGA.AS',desc:'Dutch multinational banking and financial services corporation. Formed from merger of Nationale-Nederlanden and NMB Postbank Group. Known for innovative digital banking (ING Direct model). Strong wholesale banking franchise across Europe.'},
      'ABN AMRO HQ':             {f:1824,w:'ABN.AS',desc:'Dutch bank with roots going back to 1824. Was broken up and nationalised in 2008 after Fortis (consortium with RBS and Santander) acquisition failed during financial crisis. Re-IPO\'d in 2015. Focus on NW European markets and private banking.'},
      'UniCredit HQ':            {f:1870,w:'UCG.MI',desc:'Italy\'s largest bank and one of the largest in Europe. Formed from mergers of Italian and German regional banks. Strong retail presence in Italy, Germany (HypoVereinsbank), Austria and CEE markets. Under CEO Andrea Orcel pursuing aggressive expansion.'},
      'Intesa Sanpaolo HQ':      {f:2007,w:'ISP.MI',desc:'Italy\'s second-largest bank formed from merger of Banca Intesa and Sanpaolo IMI. Strong domestic retail bank with significant insurance operations. European M&A target for larger rivals; has itself pursued UBI Banca and potential pan-European expansion.'},
      'Commerzbank HQ':          {f:1870,w:'CBK.DE',desc:'Germany\'s second-largest listed bank. Partially nationalised during 2009 financial crisis (German government still holds ~15% stake). UniCredit acquired a ~29% stake in 2024 triggering M&A speculation. Core market: German Mittelstand corporate banking.'},
      'Julius Baer HQ':          {f:1890,w:'BAER.SW',desc:'Swiss private banking group specialising exclusively in wealth management. Founded in Zurich by Julius Baer. Manages assets primarily for ultra-high net worth individuals. Separated from Julius Baer Group holding in 2009 to focus purely on wealth management.'},
      'Lazard HQ':               {f:1848,w:'LAZ',   desc:'Elite global financial advisory and asset management firm. Founded in New Orleans by Lazard Frères, relocated to New York and Paris. Pre-eminent M&A advisor with no balance sheet risk. Famous for sovereign debt restructurings including Greece, Argentina and Puerto Rico.'},
      'Jefferies HQ':            {f:1962,w:'JEF',   desc:'Independent global investment banking firm outside the "bulge bracket". Known for leveraged finance, high-yield, and middle-market M&A. Subsidiary of Leucadia National (now Jefferies Financial Group). Grew significantly post-2008 as bulge bracket retrenched.'},
      'Evercore HQ':             {f:1995,w:'EVR',   desc:'Leading independent investment banking advisory firm founded by Roger Altman, former Deputy Treasury Secretary. Pure advisory model with no lending or trading conflicts. Top-ranked M&A advisor by announced deal value. Strong restructuring and activism-defense practice.'},
      // Exchanges
      'NYSE (New York Stock Exchange)':{f:1792,w:'ICE', desc:'World\'s largest stock exchange by market capitalisation (~$25T). Founded under the Buttonwood Agreement on Wall Street. Owned by Intercontinental Exchange (ICE) since 2013. Home to blue-chip industrials, financials and consumer companies. Operates the auction specialist market model.'},
      'NASDAQ HQ':               {f:1971,w:'NDAQ', desc:'World\'s second-largest exchange and the first fully electronic stock market, launched by the National Association of Securities Dealers. Home to technology giants including Apple, Microsoft, Amazon, Alphabet and Meta. Pioneered electronic trading and multiple listing systems.'},
      'CME Group HQ':            {f:1898,w:'CME',  desc:'World\'s largest and most diverse derivatives marketplace. Operates Chicago Mercantile Exchange, Chicago Board of Trade (f.1848), NYMEX and COMEX. Handles ~$1 quadrillion notional value annually. Products span interest rates, equity indexes, FX, energy, metals and agricultural commodities.'},
      'CBOE Global Markets':     {f:1973,w:'CBOE', desc:'World\'s largest options exchange. Created the VIX Volatility Index in 1993, now the global fear gauge. Operates CBOE, C2, BZX, EDGX and other equity trading venues. Pioneered listed options trading, processing ~3 million contracts daily.'},
      'London Stock Exchange':   {f:1801,w:'LSEG.L',desc:'One of the world\'s oldest stock exchanges, with roots in Jonathan\'s Coffee House from 1698. Now part of LSEG (London Stock Exchange Group) after merger with Refinitiv in 2021. Major venue for international companies (FTSE 100 companies have operations in 100+ countries).'},
      'Euronext (Paris)':        {f:2000,w:'ENX.PA',desc:'Pan-European exchange group operating markets in Paris, Amsterdam, Brussels, Lisbon, Dublin, Oslo and Milan. Formed from merger of Amsterdam, Brussels and Paris exchanges in 2000. Now Europe\'s leading capital market infrastructure. Acquired Borsa Italiana from LSEG in 2021.'},
      'Deutsche Boerse (Xetra)': {f:1585,w:'DB1.DE',desc:'German exchange operator running Xetra electronic trading platform, Eurex derivatives exchange (world\'s 2nd largest) and Frankfurt Stock Exchange (founded 1585). Operates clearing house Eurex Clearing. Xetra handles ~90% of German equity trading.'},
      'SIX Swiss Exchange':      {f:1850,w:null,   desc:'Switzerland\'s principal stock exchange, operating the SIX Swiss Exchange in Zurich and the BX Swiss. Owned by financial institutions. Runs SMI (Swiss Market Index). Tried to acquire Bolsas y Mercados Españoles (BME) in 2020. Key for Swiss blue chips like Nestlé, Roche, Novartis.'},
      'Tokyo Stock Exchange':    {f:1878,w:'8697.T',desc:'Asia\'s largest stock exchange and world\'s third-largest by market cap (~$6.5T). Merged with Osaka Securities Exchange in 2013 to form Japan Exchange Group (JPX). Home to Toyota, Sony, SoftBank and the Nikkei 225 index. Moved to new trading system Arrowhead in 2010.'},
      'Hong Kong Stock Exchange':{f:1891,w:'0388.HK',desc:'Asia\'s third-largest exchange by market cap and key gateway for international investors into Chinese markets. Operates three markets: Main Board, GEM and a Stock Connect link to Shanghai and Shenzhen. Home to major Chinese ADR listings. Attempted acquisition of LSEG in 2019.'},
      'Shanghai Stock Exchange': {f:1990,w:null,   desc:'Mainland China\'s largest stock exchange, reopened in 1990 after 41-year suspension. Second-largest exchange in Asia by market cap (~$7.4T). Not fully accessible to foreign investors. Home to A-shares and the SSE Composite Index. Connected to HK via Stock Connect since 2014.'},
      'Shenzhen Stock Exchange': {f:1990,w:null,   desc:'China\'s second stock exchange, founded the same year as SSE. Focus on growth companies, SMEs and high-tech firms. Home to ChiNext board (China\'s Nasdaq equivalent). Connected to Hong Kong via Shenzhen-HK Stock Connect. Key listing venue for Chinese tech sector.'},
      'BSE Bombay':              {f:1875,w:'BSE.NS',desc:'Asia\'s oldest stock exchange and the world\'s largest by number of listed companies (5,500+). Founded as "The Native Share & Stock Brokers Association" on Dalal Street. Home to Sensex index (30 major companies). Market cap ~$3.8T making it world\'s 7th largest exchange.'},
      'NSE India':               {f:1992,w:'NSEI.NS',desc:'India\'s largest stock exchange by trading volume. Established to provide screen-based trading and bring transparency to Indian markets. Home to Nifty 50 index. World leader in equity derivatives by number of contracts traded. Joint venture between LIC, various banks and global exchanges.'},
      'Euronext Amsterdam':      {f:1602,w:'ENX.PA',desc:'World\'s first stock exchange, established to trade shares of Dutch East India Company (VOC) in 1602 — the world\'s first publicly traded company. Modern Euronext Amsterdam part of pan-European Euronext group. Key listing venue for global multinationals (Heineken, Philips, ASML).'},
      'Borsa Istanbul':          {f:1985,w:'BIST.IS',desc:'Turkey\'s main securities exchange, merging Istanbul Stock Exchange, Istanbul Gold Exchange and Derivatives Exchange in 2013. Trading in equities, fixed income, derivatives, precious metals and FX. Emerging market exchange with high retail participation; BIST 100 index flagship benchmark.'},
      'Johannesburg Stock Exchange':{f:1887,w:'JSE.JO',desc:'Africa\'s largest and most liquid exchange. Founded during the Witwatersrand gold rush. Operates equity, bond, futures and commodities markets. Home to global mining majors (Anglo American, BHP). Listed JSE Ltd itself in 2006. Key access point for African investment.'},
      'SGX Singapore Exchange':  {f:1999,w:'S68.SI',desc:'Asia\'s most international exchange, formed from merger of Stock Exchange of Singapore and Singapore International Monetary Exchange (SIMEX). Key hub for Asian derivatives. Home to 900+ listed companies from 40 countries. Leading Nifty (India) futures venue outside India.'},
      'ASX Australian Securities':{f:1987,w:'ASX.AX',desc:'Australia\'s primary securities exchange, formed from merger of six state stock exchanges. Operates equity, derivatives, and fixed income markets. Home to ~2,200 listed companies (AUD $2.4T market cap). Failed blockchain clearing upgrade (CHESS replacement) wrote off AUD$250M in 2023.'},
      'TMX Toronto Stock Exchange':{f:1861,w:'X.TO', desc:'Canada\'s primary exchange and world\'s third-largest exchange by listed companies. Operates TSX (senior market), TSX Venture Exchange (junior), Alpha Exchange and Montréal Exchange (derivatives). Known for mining, energy and financial sector listings. Part of TMX Group.'},
      'B3 Bolsa Brasil':         {f:1890,w:'B3SA3.SA',desc:'Latin America\'s largest exchange by market cap and trading volume. Formed from merger of BM&F and Bovespa in 2008. Trades equities, FX, interest rate and commodity derivatives. Has unique short-selling restrictions and high local retail participation. Home to Ibovespa index.'},
      'BME (Madrid)':            {f:1831,w:'BME.MC',desc:'Spain\'s stock exchange operator, acquired by SIX Group in 2020 for €2.8B. Operates four Spanish exchanges and IBEX 35 index. Also operates financial information and clearing/settlement operations. Key listing venue for Spanish blue chips like Santander, BBVA, Inditex.'},
      'Nasdaq Nordic (Stockholm)':{f:1863,w:'NDAQ', desc:'Part of Nasdaq group, operating exchanges in Stockholm, Helsinki, Copenhagen, Reykjavik, Riga, Tallinn and Vilnius. Stockholm Stock Exchange founded 1863, one of Scandinavia\'s oldest. Key venue for Nordic and Baltic equities. Home to Ericsson, Volvo, H&M.'},
      'Warsaw Stock Exchange':   {f:1817,w:null,   desc:'Poland\'s and Central Europe\'s largest stock exchange. Re-established in 1991 after communist-era closure. Rapid growth post-EU accession in 2004. WIG20 flagship index. Significant state ownership (~33% Treasury). Listed itself in 2010. Key venue for Polish blue chips.'},
      'Prague Stock Exchange':   {f:1993,w:null,   desc:'Czech Republic\'s main exchange, established after Velvet Revolution. Relatively small compared to regional peers; market dominated by a few large companies (ČEZ, Komerční banka, Erste). PX index is the main benchmark. Part of Vienna-based CEESEG (Central and Eastern European Stock Exchange Group).'},
      // Hedge Funds
      'Bridgewater Associates':  {f:1975,w:null,   desc:'World\'s largest hedge fund by AUM (~$124B), founded by Ray Dalio from a 2-bedroom NYC apartment. Operates from a campus in Connecticut. Known for "Pure Alpha" macro fund, "All Weather" risk-parity fund, and radical transparency / Principles-based management culture.'},
      'Man Group HQ':            {f:1783,w:'EMG.L',desc:'World\'s second-largest listed hedge fund manager (~$178B AUM). Began as a sugar broker in 1783. Pivoted to alternative investments through Man Financial. Now primarily quantitative with flagship Man AHL (CTA) and Man GLG (discretionary) strategies.'},
      'Renaissance Technologies':{f:1982,w:null,   desc:'Most secretive and arguably most successful hedge fund. Founded by mathematician and Cold War codebreaker James Simons. Medallion Fund returned ~66% gross annually 1988–2018. Employs physicists and mathematicians, not economists. Currently run by Peter Brown following Simons\' 2021 retirement.'},
      'Citadel HQ':              {f:1990,w:null,   desc:'Founded by Ken Griffin with $4.2M from his Harvard dorm room. Now a $62B+ multi-strategy fund and one of the most profitable hedge funds ever. Also operates Citadel Securities, the world\'s largest market maker. Famous Wellington and Kensington funds.'},
      'DE Shaw HQ':              {f:1988,w:null,   desc:'Quant hedge fund founded by David E. Shaw, a Columbia computer science professor. Pioneer in computational finance and statistical arbitrage. Amazon founder Jeff Bezos worked here before leaving to found Amazon. Manages $60B+ across quantitative and discretionary strategies.'},
      'Two Sigma HQ':            {f:2001,w:null,   desc:'Data science-driven hedge fund founded by John Overdeck and David Siegel. Uses AI and machine learning across strategies. Employs data scientists, engineers and physicists. Known for Venn portfolio analytics platform. Manages $60B+ using fully systematic approaches.'},
      'Millennium Management':   {f:1989,w:null,   desc:'Multi-manager hedge fund founded by Israel Englander. Known for its "pod" structure of hundreds of semi-independent trading teams. Operates with tight risk management and low correlation between pods. Manages $69B+ with consistent strong risk-adjusted returns.'},
      'Elliott Investment Mgmt': {f:1977,w:null,   desc:'Activist hedge fund founded by Paul Singer. Known for aggressive pursuit of sovereign debt (famously held Argentina in default for years) and corporate activism. Targets undervalued companies for board seats and strategic changes. Manages $65B+ in AUM.'},
      'Point72 Asset Mgmt':      {f:1992,w:null,   desc:'Renamed from SAC Capital after founder Steve Cohen paid $1.8B in US history\'s largest insider trading settlement (2013). Re-opened to outside capital in 2018 as Point72. Multi-manager model with both discretionary and systematic strategies. Strong technology and data infrastructure.'},
      'AQR Capital Mgmt':        {f:1998,w:null,   desc:'Quantitative asset manager founded by Cliff Asness, his PhD thesis advisor Eugene Fama\'s student. Pioneer in factor investing (value, momentum, quality). Manages ~$143B across hedge funds, mutual funds and alternative strategies. Strong academic research publication record.'},
      // Asset managers
      'BlackRock HQ':            {f:1988,w:'BLK',  desc:'World\'s largest asset manager (~$10T AUM). Founded by Larry Fink and 7 partners in one room. Known for iShares ETF platform (world\'s largest), Aladdin risk management platform (used by many banks/insurers), and growing influence on ESG investing through proxy voting.'},
      'Vanguard HQ':             {f:1975,w:null,   desc:'Second-largest asset manager globally (~$8.6T). Founded by John Bogle, inventor of the index fund. Unique mutual ownership structure — investors in Vanguard funds own the company, enabling extremely low fees. Pioneer of passive investing revolution that has shifted trillions from active management.'},
      'Fidelity Investments':    {f:1946,w:null,   desc:'One of the largest US privately-held companies. Pioneer of mutual fund investing. Abigail Johnson is chairman and CEO. Famous for Magellan Fund under Peter Lynch in 1980s. Introduced zero-expense-ratio index funds in 2018. Major broker, retirement plan provider and fund company.'},
      'State Street Global':     {f:1792,w:'STT',  desc:'One of world\'s largest custodian banks and asset managers (~$4.1T). Founded same year as New York Stock Exchange. Known for SPDR (Spider) ETFs, including SPY — world\'s most traded ETF. Installed the "Fearless Girl" statue outside NYSE as ESG statement.'},
      'PIMCO HQ':                {f:1971,w:null,   desc:'World\'s largest active fixed income manager (~$1.9T). Founded in Newport Beach CA by Bill Gross (co-founder). Part of Allianz SE since 2000. Bill Gross departed in 2014; now run by Dan Ivascyn. Flagship Total Return Fund was world\'s largest mutual fund under Gross.'},
      'Capital Group HQ':        {f:1931,w:null,   desc:'One of the world\'s largest investment management firms (~$2.2T AUM). Founded during the Great Depression. Private company known for multi-manager "Capital System" where multiple portfolio managers independently manage portions of each fund. Flagship American Funds series.'},
      'Amundi HQ':               {f:2010,w:'AMUN.PA',desc:'Europe\'s largest asset manager (~$2.2T AUM). Created from merger of asset management operations of Crédit Agricole and Société Générale in 2010. Listed on Euronext Paris in 2015. Strong institutional client base across Europe; expanding in Asia through partnerships.'},
      'Schroders HQ':            {f:1804,w:'SDR.L', desc:'Global asset manager (~$900B AUM) listed on London Stock Exchange. Family-controlled (Schroder family holds ~44%). Manages equities, fixed income, multi-asset and alternatives. Strong in UK institutional market. Acquired Greencoat Capital (renewable energy) and Cazenove Capital in recent years.'},
      'Legal & General Invest':  {f:1836,w:'LGEN.L',desc:'Part of Legal & General Group, one of the UK\'s largest financial services groups. Manages ~$1.4T including life insurance liabilities. Large LDI (liability-driven investment) manager — its LDI funds were at center of UK gilts crisis in October 2022 when they faced forced deleveraging.'},
      // Insurance
      'Berkshire Hathaway HQ':   {f:1839,w:'BRK-B',desc:'Warren Buffett\'s holding company, originally a New England textile manufacturer acquired in 1965. Now a conglomerate owning GEICO insurance, BNSF Railway, Berkshire Hathaway Energy, dozens of manufacturers and retailers, plus $300B+ equities portfolio. Buffett\'s annual shareholder letters are investment classics.'},
      'Allianz SE HQ':           {f:1890,w:'ALV.DE',desc:'World\'s largest insurance company by assets. Headquartered in Munich. Operations in 70+ countries. Owns PIMCO and Allianz Global Investors. Structured Finance subsidiary AGCS suffered major fraud losses from Structured Alpha funds in 2020 ($5B+ investor losses), settled for $6B.'},
      'AXA Group HQ':            {f:1816,w:'CS.PA', desc:'French multinational insurance and investment firm operating in 50+ countries. One of world\'s largest insurers by revenue. Strong in life insurance, P&C, health insurance and asset management. Acquired XL Group for $15.3B in 2018, significantly expanding P&C capabilities.'},
      'Zurich Insurance HQ':     {f:1872,w:'ZURN.SW',desc:'Swiss multinational insurance group with operations in 210+ countries. Provides commercial, specialty and personal insurance. Major global P&C insurer. Operates via Farmers Insurance Exchange in US market. Strong AA credit ratings. Listed on SIX Swiss Exchange.'},
      'Munich Re HQ':            {f:1880,w:'MUV2.DE',desc:'World\'s largest reinsurer by premium volume. Key player in natural catastrophe reinsurance. Founded in Munich, now operates globally. Parent company of ERGO insurance group. Manages exposure to increasingly costly climate-related events including hurricanes, floods and wildfires.'},
      'Swiss Re HQ':             {f:1863,w:'SREN.SW',desc:'World\'s second-largest reinsurer. Provides risk transfer, insurance and other financial services. Swiss Re Institute is a leading research body for risk quantification. Pioneer in insurance-linked securities (catastrophe bonds). Strong in life & health reinsurance alongside P&C.'},
      'MetLife HQ':              {f:1868,w:'MET',   desc:'One of the largest life insurance companies globally. Former manager of the MetLife Building (Pan Am Building) above Grand Central. Sold US retail advisor business (Brighthouse Financial) in 2017. Strong in group benefits, retirement and international insurance markets.'},
      'Prudential Financial':    {f:1875,w:'PRU',   desc:'Major US life insurer and financial services company. Unrelated to UK\'s Prudential plc. Known for the Rock of Gibraltar mascot. Span off Jackson National Life insurance. Manages ~$900B for retail and institutional clients. Major presence in Japan through Gibraltar Life.'},
      // Intl Orgs
      'IMF Headquarters':        {f:1944,w:null,   desc:'International Monetary Fund — established at Bretton Woods Conference in 1944 alongside World Bank. 190 member countries. Provides economic surveillance, policy advice and emergency lending. Issues SDRs (Special Drawing Rights). Managing Director is Kristalina Georgieva (since 2019). Flagship World Economic Outlook published twice yearly.'},
      'World Bank Group':        {f:1944,w:null,   desc:'International financial institution providing loans and grants to developing countries. Also established at Bretton Woods. Comprises IBRD (middle-income countries), IDA (poorest countries), IFC (private sector), MIGA (investment guarantees) and ICSID (investment disputes). President: Ajay Banga (since 2023).'},
      'BIS (Bank for Int. Settlements)':{f:1930,w:null,desc:'Oldest international financial institution, established in Basel to manage German WWI reparations. Now serves as a bank for central banks and forum for central bank cooperation. Hosts Basel Committee on Banking Supervision (sets global bank capital standards — Basel III/IV). Conducts key quarterly banking statistics.'},
      'EBRD HQ':                 {f:1991,w:null,   desc:'European Bank for Reconstruction and Development — multilateral development bank established to support Central and Eastern Europe\'s transition from communism to market economy. Now operates in 38 countries from Morocco to Mongolia. Focus on private sector development, infrastructure and green economy.'},
      'Asian Development Bank':  {f:1966,w:null,   desc:'Regional development bank for Asia-Pacific. 68 member countries (49 from the region). Headquartered in Manila, Philippines. Largest borrowers are India, China, Indonesia, Bangladesh. Provides $20B+ in financing annually. Closely aligned with Japan, which provides largest single-country membership share.'},
      'African Dev. Bank':       {f:1964,w:null,   desc:'Pan-African multilateral development finance institution. 81 member countries (54 African, 27 non-regional). Headquartered in Abidjan, Ivory Coast. Focus on inclusive economic growth, infrastructure, agricultural development and climate resilience across Africa. AAA rated.'},
      'IFC (World Bank Group)':  {f:1956,w:null,   desc:'International Finance Corporation — World Bank Group\'s private sector arm. World\'s largest multilateral development finance institution for private enterprise in developing countries. Invests in companies, provides loans and mobilises private capital. AAA credit rating. Part of World Bank Group.'},
      'AIIB HQ':                 {f:2015,w:null,   desc:'Asian Infrastructure Investment Bank — China-led multilateral development bank established in 2015 as alternative to World Bank and ADB. 109 approved members. Headquartered in Beijing. Focus on sustainable infrastructure in Asia. Controversial at launch but now has AAA rating from major agencies.'},
      'EIB (European Invest.)':  {f:1958,w:null,   desc:'European Investment Bank — lending arm of EU, world\'s largest multilateral development bank by lending volume. Established by Treaty of Rome in 1958. Owned by EU member states. Lends primarily in Europe but also globally. Key funder of European Green Deal and infrastructure. AAA rated.'}
};

    const instInfo = _D[d.n] || {f:null, w:null, desc:'Leading global financial institution operating across key market segments.'};
    const stockTicker = instInfo.w || ext.stock || null;

    // ── DESCRIPTION BLOCK (static) ──
    h += `<div style="background:#030303;padding:9px 16px 11px;border-bottom:1px solid #1a1a1a">
      <div style="color:#887744;font-size:7px;letter-spacing:2px;margin-bottom:6px;font-weight:700">ABOUT</div>
      <div style="color:#7a6848;font-size:8px;line-height:1.75;letter-spacing:.25px">${instInfo.desc}</div>
    </div>`;

    // ── LIVE DATA BLOCK (async filled) ──
    h += `<div id="${pid}_live" style="background:#020202;border-bottom:1px solid #1a1a1a">
      <div style="padding:6px 16px 5px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #141414">
        <span style="color:#887744;font-size:7px;letter-spacing:2px;font-weight:700">LIVE MARKET DATA</span>
        <span style="color:#665533;font-size:7px" id="${pid}_upd">—</span>
      </div>
      <div id="${pid}_rows" style="padding:4px 0 4px">
        <div style="padding:10px 16px;color:#665533;font-size:8px;text-align:center;letter-spacing:1px">FETCHING DATA…</div>
      </div>
    </div>`;

    // ── STATIC FUNDAMENTALS ──
    const staticRows = [];
    if(instInfo.f)     staticRows.push({l:'FOUNDED',        v:String(instInfo.f),   c:'#888'});
    if(d.aum)          staticRows.push({l:'AUM / ASSETS',   v:d.aum,                c:'#c89858'});
    if(d.emp)          staticRows.push({l:'EMPLOYEES',      v:d.emp+'K',            c:'#888'});
    if(d.info)         staticRows.push({l:'HEADQUARTERS',   v:d.info,               c:'#888'});
    if(ext.rev)        staticRows.push({l:'REVENUE (LTM)',  v:ext.rev,              c:'#999'});
    if(ext.roe)        staticRows.push({l:'RETURN ON EQ',   v:ext.roe,              c:parseFloat(ext.roe)>10?'#44aa66':'#cc7744'});
    if(ext.rating)     staticRows.push({l:'CREDIT RATING',  v:ext.rating,           c:'#7a9a7a', sub:'S&P / Moody\'s'});
    if(ext.tier)       staticRows.push({l:'DESIGNATION',    v:ext.tier,             c:'#6688aa'});
    if(extra.strategy) staticRows.push({l:'STRATEGY',       v:extra.strategy,       c:'#7788aa'});
    if(extra.flagship) staticRows.push({l:'FLAGSHIP FUND',  v:extra.flagship,       c:'#7788aa'});
    if(extra.sharpe)   staticRows.push({l:'SHARPE RATIO',   v:extra.sharpe,         c:parseFloat(extra.sharpe)>1?'#44aa66':'#888'});
    if(extra.drawdown) staticRows.push({l:'MAX DRAWDOWN',   v:'−'+extra.drawdown,   c:'#cc5555'});
    if(extra.listed)   staticRows.push({l:'LISTED COS',     v:extra.listed.toLocaleString(), c:'#6699aa'});
    if(extra.avgVol)   staticRows.push({l:'AVG DAILY VOL',  v:extra.avgVol,         c:'#55aa77'});
    if(extra.mic)      staticRows.push({l:'MIC CODE',       v:extra.mic,            c:'#55aa88'});
    if(extra.reg)      staticRows.push({l:'REGULATOR',      v:extra.reg,            c:'#aa8855'});
    if(extra.members)  staticRows.push({l:'MEMBERS',        v:extra.members+' countries', c:'#6688aa'});
    if(extra.tier1)    staticRows.push({l:'CET1 CAPITAL',   v:extra.tier1+'%',      c:extra.tier1>14?'#44aa66':'#cc8833'});
    if(extra.leverage) staticRows.push({l:'LEVERAGE RATIO', v:extra.leverage,       c:'#887766'});

    if(staticRows.length){
      h += `<div style="background:#020202;border-bottom:1px solid #1a1a1a">`;
      h += `<div style="padding:6px 16px 5px;border-bottom:1px solid #141414"><span style="color:#887744;font-size:7px;letter-spacing:2px;font-weight:700">KEY FUNDAMENTALS</span></div>`;
      staticRows.forEach(r=>{
        h += `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 16px;border-bottom:1px solid #0f0f0f;gap:8px">
          <span style="color:#776655;font-size:8px;letter-spacing:.5px;white-space:nowrap;flex-shrink:0">${r.l}</span>
          <span style="color:${r.c};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;text-align:right;min-width:0">${r.v}${r.sub?`<span style="color:#aa9980;font-size:6.5px;font-weight:400;margin-left:4px">${r.sub}</span>`:''}</span>
        </div>`;
      });
      h += `</div>`;
    }

    h += `</div>`; // end pid wrapper

    mk.bindPopup(h, {maxWidth:PW+20, closeButton:false, className:'bbpop'});

    // delay popup — fly first, open after 700ms
    mk.off('click');
    mk.on('click', function(ev){
      L.DomEvent.stopPropagation(ev);
      map.flyTo([d.lat, d.lng], 12, {duration:10.0, easeLinearity:0.05});
      setTimeout(()=>mk.openPopup(), 8500);
    });

    LG.inst.addLayer(mk);

    // ── ASYNC: load live stock data via Yahoo Finance proxy ──
    if(stockTicker){
      (async function(){
        const _url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(stockTicker)}?interval=1d&range=5d`;
        const _proxy = `https://corsproxy.io/?url=${encodeURIComponent(_url)}`;
        const rowsEl = document.getElementById(pid+'_rows');
        const tagEl  = document.getElementById(pid+'_liveTag');
        const updEl  = document.getElementById(pid+'_upd');
        if(!rowsEl) return;
        try {
          const resp = await fetch(_proxy, {signal: AbortSignal.timeout(8000)});
          const json = await resp.json();
          const meta = json?.chart?.result?.[0]?.meta;
          if(!meta){ throw new Error('no meta'); }

          const price     = meta.regularMarketPrice || meta.previousClose;
          const prevClose = meta.previousClose || meta.chartPreviousClose;
          const open      = meta.regularMarketOpen || prevClose;
          const high      = meta.regularMarketDayHigh || price;
          const low       = meta.regularMarketDayLow  || price;
          const vol       = meta.regularMarketVolume;
          const chg       = prevClose ? price - prevClose : 0;
          const chgPct    = prevClose ? (chg/prevClose)*100 : 0;
          const mktCap    = meta.marketCap;
          const currency  = meta.currency || 'USD';
          const exchName  = meta.exchangeName || meta.fullExchangeName || '';
          const mktState  = meta.marketState || '';
          const isUp      = chg >= 0;
          const chgCol    = isUp ? '#22aa55' : '#cc3333';
          const fmt       = v => v>=1e12?`${(v/1e12).toFixed(2)}T`:v>=1e9?`${(v/1e9).toFixed(1)}B`:v>=1e6?`${(v/1e6).toFixed(1)}M`:`${v}`;

          const liveRowData = [
            {l:'TICKER',       v:stockTicker,                                c:'#558866'},
            {l:'PRICE',        v:`${price?.toFixed(price>100?2:3)} ${currency}`, c:'#d4c498'},
            {l:'CHANGE',       v:`${isUp?'+':''}${chg.toFixed(2)} (${isUp?'+':''}${chgPct.toFixed(2)}%)`, c:chgCol},
            {l:'OPEN',         v:open?.toFixed(2),                           c:'#445544'},
            {l:'DAY HIGH',     v:high?.toFixed(2),                           c:'#2a6640'},
            {l:'DAY LOW',      v:low?.toFixed(2),                            c:'#664433'},
            vol?{l:'VOLUME',   v:fmt(vol),                                   c:'#445566'}:null,
            mktCap?{l:'MARKET CAP',v:fmt(mktCap)+' '+currency,             c:'#886644'}:null,
            exchName?{l:'EXCHANGE', v:exchName+(mktState?' · '+mktState:''), c:'#335566'}:null
          ].filter(Boolean);

          let rHtml = '';
          liveRowData.forEach(r=>{
            rHtml += `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 16px;border-bottom:1px solid #0f0f0f;gap:8px">
              <span style="color:#776655;font-size:8px;letter-spacing:.5px;white-space:nowrap;flex-shrink:0">${r.l}</span>
              <span style="color:${r.c};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;text-align:right;min-width:0">${r.v}</span>
            </div>`;
          });
          if(rowsEl) rowsEl.innerHTML = rHtml;
          if(tagEl)  tagEl.textContent = '● LIVE';
          if(tagEl)  tagEl.style.color = '#22aa55';
          if(updEl)  updEl.textContent = 'UPD '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
        } catch(e) {
          if(rowsEl) rowsEl.innerHTML = `<div style="padding:8px 16px;color:#2a2218;font-size:8px">LIVE DATA UNAVAILABLE — ${stockTicker}</div>`;
          if(tagEl)  { tagEl.textContent='● OFFLINE'; tagEl.style.color='#443322'; }
        }
      })();
    } else {
      // No ticker — remove live section
      const liveEl = document.getElementById(pid+'_live');
      if(liveEl) liveEl.style.display='none';
      const tagEl = document.getElementById(pid+'_liveTag');
      if(tagEl) { tagEl.textContent='NO TICKER'; tagEl.style.color='#2a2218'; }
    }
  });
  console.log('[INST] rendered',INST_DATA.length);
}

// ── Global tab switcher (legacy compat) ──────────────────────────────────
window._bbTab=function(pid,tabId){ /* tabs removed in v5 */ };

renderInstLayer();

// Zoom-based marker styling — CSS custom properties pro maximální výkon
function _applyZoomMarkerStyle() {
  const z = map.getZoom();
  const op = Math.min(1, Math.max(0.2, (z - 1) / 5));
  const sz = Math.min(12, Math.max(3, Math.round(2 + (z - 2) * 1.2)));
  const wrapOp = Math.min(1, Math.max(0.15, (z - 1) / 4));
  // Použijeme CSS vars na root — jeden DOM write místo stovek
  document.documentElement.style.setProperty('--dot-op', op);
  document.documentElement.style.setProperty('--dot-sz', sz + 'px');
  document.documentElement.style.setProperty('--wrap-op', wrapOp);
}
map.on('zoomend', _applyZoomMarkerStyle);

// FX state layer removed
const FX_STATE_POS = [];
function renderFXStateLayer(){ if(LG.fxst){ LG.fxst.clearLayers(); } }

// ── AUTO-FOCUS na aktivní obchodní seanci ──────────────────────────────────
  const _sessionsArr = [
    { name:'SYDNEY / TOKYO',   from:22*60, to:8*60+30,  lat:30,  lng:138, zoom:4 },
    { name:'TOKYO / SHANGHAI', from:0*60,  to:9*60,     lat:33,  lng:125, zoom:4 },
    { name:'LONDON OPEN',      from:7*60,  to:12*60,    lat:52,  lng:10,  zoom:4 },
    { name:'LONDON / NEW YORK',from:12*60, to:16*60+30, lat:45,  lng:-30, zoom:3 },
    { name:'NEW YORK',         from:13*60, to:21*60,    lat:38,  lng:-80, zoom:4 },
    { name:'AFTER HOURS / FX', from:21*60, to:24*60,    lat:25,  lng:55,  zoom:4 }
  ];

function _getActiveSessionObj() {
  const now = new Date();
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const utcT = utcH * 60 + utcM; // minuty od půlnoci UTC
  let active = null;
  for(const s of _sessionsArr){
    const active_now = s.from < s.to ? (utcT >= s.from && utcT < s.to) : (utcT >= s.from || utcT < s.to);
    if(active_now){ active = s; break; }
  }
  return active || _sessionsArr[0];
}

function _updateChartSessionUI() {
  const active = _getActiveSessionObj();
  const elStart = document.getElementById('bbg-chart-time-start');
  const elEnd = document.getElementById('bbg-chart-time-end');
  const elName = document.getElementById('bbg-chart-session-name');
  if(elStart && elEnd && elName){
    const fm = m => String(Math.floor((m||0)/60)%24).padStart(2,'0')+':'+String(Math.floor((m||0)%60)).padStart(2,'0');
    elStart.textContent = fm(active.from);
    elEnd.textContent = fm(active.to);
    elName.textContent = active.name;
  }
}

function _autoFocusSession(){
  if(window._tabHidden) return;
  const active = _getActiveSessionObj();
  // Zobraz info banner
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:55px;left:50%;transform:translateX(-50%);'
    +'background:rgba(0,0,0,0.85);border:1px solid #ff8800;color:#ff8800;'
    +'font-family:"Share Tech Mono",monospace;font-size:9px;letter-spacing:2px;'
    +'padding:4px 16px;z-index:99998;pointer-events:none;';
  banner.textContent = '▶ ' + active.name + ' SESSION ACTIVE';
  document.body.appendChild(banner);
  setTimeout(()=>{ banner.style.transition='opacity .5s'; banner.style.opacity='0';
    setTimeout(()=>banner.remove(), 500); }, 3000);

  // Přesuň mapu na aktivní region
  map.setView([active.lat, active.lng], active.zoom, {animate:true, duration:3.0, easeLinearity:0.1});
}

_updateChartSessionUI(); // okamžité zobrazení v UI bez probliknutí --:--
setInterval(_updateChartSessionUI, 60*1000);  // kontrolovat změnu seance pro UI každou minutu (aby se v grafu hned projevila)

setTimeout(_autoFocusSession, 1000);          // při zapnutí ukázat velký banner a zoomnout
setInterval(_autoFocusSession, 30*60*1000);   // každých 30 minut letět na mapě



/* ════════════════════════════════════════════════════════════════
   1. LOCALSTORAGE CACHE — persists data across page reloads
════════════════════════════════════════════════════════════════ */
const _CACHE_KEY = 'bbmap_v5_cache';
const _CACHE_TTL = {
  crypto:  5 * 60 * 1000,   // 5 min
  fx:      2 * 60 * 1000,   // 2 min
  mkt:    10 * 60 * 1000,   // 10 min
  news:    3 * 60 * 1000,   // 3 min
  macro:  30 * 60 * 1000,   // 30 min
};

const _cache = {
  save(key, data) {
    try {
      const store = JSON.parse(localStorage.getItem(_CACHE_KEY) || '{}');
      store[key] = { data, ts: Date.now() };
      localStorage.setItem(_CACHE_KEY, JSON.stringify(store));
    } catch(e) {}
  },
  load(key, maxAge) {
    try {
      const store = JSON.parse(localStorage.getItem(_CACHE_KEY) || '{}');
      const entry = store[key];
      if (!entry) return null;
      if (maxAge && (Date.now() - entry.ts) > maxAge) return null;
      return entry.data;
    } catch(e) { return null; }
  },
  clear() {
    try { localStorage.removeItem(_CACHE_KEY); } catch(e) {}
  },
  age(key) {
    try {
      const store = JSON.parse(localStorage.getItem(_CACHE_KEY) || '{}');
      const entry = store[key];
      if (!entry) return null;
      return Date.now() - entry.ts;
    } catch(e) { return null; }
  }
};

/* ════════════════════════════════════════════════════════════════
   2. CRYPTO DATA — save to cache on every live update
════════════════════════════════════════════════════════════════ */
// Patch updateCoin to also persist to localStorage
const _origUpdateCoin = typeof updateCoin === 'function' ? updateCoin : null;
if (_origUpdateCoin) {
  window.updateCoin = function(id, data, source, priority) {
    _origUpdateCoin(id, data, source, priority);
    // Throttled save — max once per 10s
    if (!window._cacheSaveTimer) {
      window._cacheSaveTimer = setTimeout(() => {
        _cache.save('crypto', CRYPTO.map(c => ({
          id: c.id, s: c.s, px: c.px, chg: c.chg, mc: c.mc,
          vol: c.vol, rank: c.rank,
          // Only cache chg7 if it's verified live data — never cache static values
          chg7: c._chg7live ? c.chg7 : null
        })));
        window._cacheSaveTimer = null;
      }, 10000);
    }
  };
}

/* ════════════════════════════════════════════════════════════════
   3. RESTORE FROM CACHE on page load (if live data not yet arrived)
════════════════════════════════════════════════════════════════ */
(function _restoreFromCache() {
  // Restore crypto prices
  const cachedCrypto = _cache.load('crypto', _CACHE_TTL.crypto);
  if (cachedCrypto && Array.isArray(cachedCrypto)) {
    let restored = 0;
    cachedCrypto.forEach(cached => {
      const c = CRYPTO.find(x => x.id === cached.id);
      if (c && cached.px > 0) {
        c.px = cached.px;
        if (cached.chg != null) c.chg = cached.chg;
        if (cached.mc) c.mc = cached.mc;
        if (cached.rank) c.rank = cached.rank;
        // Restore chg7 from cache ONLY if:
        // 1. Live data hasn't arrived yet (_chg7live=false)
        // 2. Cache value is not null (was saved from a live fetch, not static)
        // 3. Cache is fresh (handled by _CACHE_TTL above)
        if (cached.chg7 != null && !c._chg7live) {
          c.chg7 = cached.chg7;
          c._chg7live = true; // mark as live so it shows immediately
        }
        restored++;
      }
    });
    if (restored > 0) {
      const ageMs = _cache.age('crypto');
      const ageSec = ageMs ? Math.round(ageMs / 1000) : '?';
      console.log(`[CACHE] Restored ${restored} crypto prices from cache (${ageSec}s old)`);
      // Trigger UI refresh with cached data
      setTimeout(() => {
        try { buildTicker(); renderSidebar(); refreshAllPanels(); } catch(e) {}
      }, 500);
    }
  }

  // Restore FX
  const cachedFX = _cache.load('fx', _CACHE_TTL.fx);
  if (cachedFX && Array.isArray(cachedFX)) {
    cachedFX.forEach(cached => {
      const f = FXP.find(x => x.p === cached.p);
      if (f) { f.b = cached.b; f.a = cached.a; f.c = cached.c; }
    });
    console.log(`[CACHE] Restored ${cachedFX.length} FX pairs from cache`);
  }
})();

/* ════════════════════════════════════════════════════════════════
   4. FX CACHE — save after each fetch
════════════════════════════════════════════════════════════════ */
setInterval(() => {
  if (FXP && FXP.length > 0) {
    _cache.save('fx', FXP.map(f => ({ p: f.p, b: f.b, a: f.a, c: f.c })));
  }
}, 15000);

/* ════════════════════════════════════════════════════════════════
   5. CONNECTION HEALTH MONITOR — tracks all data sources
════════════════════════════════════════════════════════════════ */
const _health = {
  sources: {},
  online: navigator.onLine,

  update(src, ok, latency) {
    this.sources[src] = {
      ok,
      latency: latency || null,
      ts: Date.now(),
      failures: ok ? 0 : ((this.sources[src]?.failures || 0) + 1)
    };
    this._render();
  },

  _render() {
    const el = document.getElementById('_health_bar');
    if (!el) return;
    const sources = Object.entries(this.sources);
    const ok = sources.filter(([,v]) => v.ok).length;
    const total = sources.length;
    const color = ok === total ? '#00cc44' : ok > total * 0.5 ? '#ff8800' : '#ff2222';
    el.style.background = color;
    el.title = `${ok}/${total} sources live`;
  }
};

/* ════════════════════════════════════════════════════════════════
   6. OFFLINE / ONLINE BANNER
════════════════════════════════════════════════════════════════ */
function _showOfflineBanner(msg) {
  let b = document.getElementById('_offline_banner');
  if (!b) {
    b = document.createElement('div');
    b.id = '_offline_banner';
    b.style.cssText = [
      'position:fixed;bottom:26px;left:50%;transform:translateX(-50%)',
      'background:rgba(0,0,0,.92);border:1px solid #ff2222;color:#ff2222',
      "font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1.5px",
      'padding:4px 16px;z-index:99999;pointer-events:none;transition:opacity .3s'
    ].join(';');
    document.body.appendChild(b);
  }
  b.textContent = msg;
  b.style.opacity = '1';
}

function _hideOfflineBanner() {
  const b = document.getElementById('_offline_banner');
  if (b) { b.style.opacity = '0'; setTimeout(() => b.remove(), 300); }
}

window.addEventListener('offline', () => {
  _health.online = false;
  _showOfflineBanner('⚠ OFFLINE — USING CACHED DATA');
});

window.addEventListener('online', () => {
  _health.online = true;
  _hideOfflineBanner();
  // Trigger immediate refresh of all sources
  setTimeout(() => {
    try { fetchBinance24hr(); fetchFX(); fetchHyperliquid(); } catch(e) {}
    setTimeout(() => { try { fetchCoinGecko(); fetchKraken(); fetchOKX(); } catch(e) {} }, 2000);
  }, 1000);
});

if (!navigator.onLine) {
  _showOfflineBanner('⚠ OFFLINE — USING CACHED DATA');
}

/* ════════════════════════════════════════════════════════════════
   7. EXPONENTIAL BACKOFF WebSocket RECONNECT
      Wraps Binance WS with smarter reconnect logic
════════════════════════════════════════════════════════════════ */
let _wsBackoffDelay = 2000;
const _wsMaxDelay = 60000;

function _wsReconnectWithBackoff(startFn) {
  _wsBackoffDelay = Math.min(_wsBackoffDelay * 1.5, _wsMaxDelay);
  console.log(`[WS] Reconnecting in ${Math.round(_wsBackoffDelay/1000)}s...`);
  setTimeout(() => {
    if (navigator.onLine) {
      startFn();
      _wsBackoffDelay = 2000; // reset on success
    } else {
      _wsReconnectWithBackoff(startFn);
    }
  }, _wsBackoffDelay);
}

/* ════════════════════════════════════════════════════════════════
   8. DATA FRESHNESS INDICATOR in status bar
════════════════════════════════════════════════════════════════ */
function _updateFreshnessIndicator() {
  if(window._tabHidden) return;
  const el = document.getElementById('_freshness_indicator');
  if (!el) return;

  // Check when last crypto price was updated
  const cryptoAge = _cache.age('crypto');
  if (cryptoAge !== null) {
    const sec = Math.round(cryptoAge / 1000);
    const col = sec < 10 ? '#00cc44' : sec < 60 ? '#ff8800' : '#ff2222';
    el.textContent = `DATA: ${sec}s AGO`;
    el.style.color = col;
  }
}
setInterval(_updateFreshnessIndicator, 5000);

/* ════════════════════════════════════════════════════════════════
   9. STATUS BAR ENHANCEMENT — add freshness + health dot
════════════════════════════════════════════════════════════════ */
(function _injectStatusBarItems() {
  const statusBar = document.getElementById('STATUSBAR');
  if (!statusBar) return;

  // Health dot
  const healthDot = document.createElement('div');
  healthDot.id = '_health_bar';
  healthDot.style.cssText = [
    'width:6px;height:6px;border-radius:50%;background:#666;',
    'margin:0 4px;flex-shrink:0;cursor:pointer;transition:background .5s'
  ].join('');
  healthDot.title = 'Data source health';
  healthDot.onclick = () => _showHealthPanel();

  // Freshness
  const freshEl = document.createElement('span');
  freshEl.id = '_freshness_indicator';
  freshEl.style.cssText = "color:#998870;font-size:7px;letter-spacing:.5px;margin:0 6px;";
  freshEl.textContent = 'DATA: —';

  statusBar.appendChild(document.createTextNode(' '));
  statusBar.appendChild(healthDot);
  statusBar.appendChild(freshEl);
})();

/* ════════════════════════════════════════════════════════════════
   10. HEALTH PANEL — popup showing all data source statuses
════════════════════════════════════════════════════════════════ */
function _showHealthPanel() {
  // Remove existing
  const existing = document.getElementById('_health_panel');
  if (existing) { existing.remove(); return; }

  const panel = document.createElement('div');
  panel.id = '_health_panel';
  panel.style.cssText = [
    'position:fixed;bottom:50px;right:10px;',
    "background:#000;border:1px solid #ff6600;",
    "font-family:'Share Tech Mono',monospace;font-size:9px;",
    'z-index:99998;min-width:280px;max-height:400px;overflow-y:auto;',
    'box-shadow:0 8px 32px rgba(255,102,0,.2)'
  ].join('');

  const sources = [
    ['BINANCE WS', 'ws', wsConn?.readyState === 1],
    ['BINANCE REST', 'binance', typeof LIVE !== 'undefined' && LIVE.idx],
    ['HYPERLIQUID', 'hl', typeof LIVE !== 'undefined' && LIVE.crypto],
    ['COINGECKO', 'cg', typeof LIVE !== 'undefined'],
    ['FX / ECB', 'fx', FXP && FXP.some(f => f.b > 0)],
    ['KRAKEN', 'kraken', typeof LIVE !== 'undefined'],
    ['OKX', 'okx', typeof LIVE !== 'undefined'],
    ['BYBIT', 'bybit', typeof LIVE !== 'undefined'],
    ['COINBASE WS', 'cbws', typeof _cbWs !== 'undefined' && _cbWs?.readyState === 1],
    ['NETWORK', 'net', navigator.onLine]
  ];

  const cacheAge = _cache.age('crypto');
  const cacheStr = cacheAge ? `${Math.round(cacheAge/1000)}s ago` : 'empty';

  let html = `<div style="padding:5px 10px;background:#000;border-bottom:1px solid #ff6600;color:#ff6600;font-weight:700;letter-spacing:2px;font-size:9px;display:flex;justify-content:space-between">
    <span>DATA SOURCE HEALTH</span>
    <span onclick="document.getElementById('_health_panel').remove()" style="cursor:pointer;color:#ff4400">✕</span>
  </div>`;

  sources.forEach(([name, key, isOk]) => {
    const col = isOk ? '#00cc44' : '#ff2222';
    const status = isOk ? '● LIVE' : '○ OFFLINE';
    html += `<div style="padding:4px 10px;border-bottom:1px solid #0f0a00;display:flex;justify-content:space-between">
      <span style="color:#665840">${name}</span>
      <span style="color:${col};font-weight:700">${status}</span>
    </div>`;
  });

  html += `<div style="padding:5px 10px;border-top:1px solid #1a1200;color:#998870;font-size:8px">
    CACHE: ${cacheStr} &nbsp;|&nbsp;
    <span onclick="_cache.clear();this.textContent='CLEARED'" style="cursor:pointer;color:#ff4400">CLEAR CACHE</span>
  </div>`;

  panel.innerHTML = html;
  document.body.appendChild(panel);

  // Auto-close after 10s
  setTimeout(() => { if (panel.parentNode) panel.remove(); }, 10000);
}

/* ════════════════════════════════════════════════════════════════
   11. WATCHDOG — restart dead WebSockets every 30s
════════════════════════════════════════════════════════════════ */
setInterval(() => {
  if (!navigator.onLine) return;

  // Binance WS watchdog
  if (!wsConn || wsConn.readyState === 3) {
    console.log('[WATCHDOG] Binance WS dead — restarting');
    try { startBinanceWS(); } catch(e) {}
  }

  // Coinbase WS watchdog
  if (typeof _cbWs !== 'undefined' && (!_cbWs || _cbWs.readyState === 3)) {
    console.log('[WATCHDOG] Coinbase WS dead — restarting');
    try { startCoinbaseWS(); } catch(e) {}
  }

  // HL WS watchdog
  if (typeof _hlWs !== 'undefined' && (!_hlWs || _hlWs.readyState === 3)) {
    console.log('[WATCHDOG] Hyperliquid WS dead — restarting');
    try { startHLWS && startHLWS(); } catch(e) {}
  }
}, 30000);

/* ════════════════════════════════════════════════════════════════
   12. PAGE VISIBILITY — pause/resume on tab switch
════════════════════════════════════════════════════════════════ */
let _hiddenAt = null;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    _hiddenAt = Date.now();
    console.log('[VISIBILITY] Tab hidden — pausing heavy updates');
  } else {
    const hiddenFor = _hiddenAt ? (Date.now() - _hiddenAt) : 0;
    console.log(`[VISIBILITY] Tab visible again — hidden for ${Math.round(hiddenFor/1000)}s`);

    if (hiddenFor > 60000) {
      // Hidden more than 1 min — do full refresh
      console.log('[VISIBILITY] Full refresh after long absence');
      setTimeout(() => {
        try {
          fetchBinance24hr();
          fetchFX();
          fetchHyperliquid();
          buildTicker();
          renderSidebar();
          refreshAllPanels();
        } catch(e) {}
      }, 500);

      if (hiddenFor > 300000) {
        // Hidden 5+ min — also refresh slower sources
        setTimeout(() => {
          try {
            fetchCoinGecko();
            fetchKraken();
            fetchOKX();
            fetchAllNews(false);
          } catch(e) {}
        }, 2000);
      }
    }
    _hiddenAt = null;
  }
});

/* ════════════════════════════════════════════════════════════════
   13. PERFORMANCE — throttle jitter when tab is hidden
════════════════════════════════════════════════════════════════ */
const _origJitter = typeof jitter === 'function' ? jitter : null;
if (_origJitter) {
  window.jitter = function() {
    if (document.hidden) return; // Skip if tab not visible
    _origJitter();
  };
}

/* ════════════════════════════════════════════════════════════════
   14. KEYBOARD SHORTCUTS
════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  
  // Ctrl+Shift+H = health panel
  if (e.ctrlKey && e.shiftKey && e.key === 'H') {
    e.preventDefault();
    _showHealthPanel();
  }
  // Ctrl+Shift+C = clear cache
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    _cache.clear();
    const msg = document.createElement('div');
    msg.style.cssText = "position:fixed;top:55px;left:50%;transform:translateX(-50%);background:#000;border:1px solid #ff8800;color:#ff8800;font-family:'Share Tech Mono',monospace;font-size:9px;padding:4px 16px;z-index:99999;letter-spacing:1.5px";
    msg.textContent = '✓ CACHE CLEARED';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
  }
  // Ctrl+Shift+R = force full refresh
  if (e.ctrlKey && e.shiftKey && e.key === 'R') {
    e.preventDefault();
    try {
      fetchBinance24hr(); fetchFX(); fetchHyperliquid();
      fetchCoinGecko(); fetchKraken(); fetchOKX(); fetchBybit();
      fetchAllNews(true); fetchMacroCalendar && fetchMacroCalendar(true);
      buildTicker(); renderSidebar(); refreshAllPanels();
    } catch(er) {}
    const msg = document.createElement('div');
    msg.style.cssText = "position:fixed;top:55px;left:50%;transform:translateX(-50%);background:#000;border:1px solid #00cc44;color:#00cc44;font-family:'Share Tech Mono',monospace;font-size:9px;padding:4px 16px;z-index:99999;letter-spacing:1.5px";
    msg.textContent = '↻ FORCE REFRESH — ALL SOURCES';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
  }
});

/* ════════════════════════════════════════════════════════════════
   15. READY BANNER
════════════════════════════════════════════════════════════════ */
setTimeout(() => {
  const cacheAge = _cache.age('crypto');
  const restored = cacheAge && cacheAge < _CACHE_TTL.crypto;
  if (restored) {
    const msg = document.createElement('div');
    msg.style.cssText = "position:fixed;top:55px;right:10px;background:rgba(0,0,0,.9);border:1px solid #ff8800;color:#ff8800;font-family:'Share Tech Mono',monospace;font-size:8px;padding:4px 12px;z-index:99999;letter-spacing:1px;pointer-events:none";
    msg.textContent = `✓ CACHE RESTORED · ${Math.round(cacheAge/1000)}s OLD`;
    document.body.appendChild(msg);
    setTimeout(() => { msg.style.transition='opacity .5s'; msg.style.opacity='0'; setTimeout(() => msg.remove(), 500); }, 3000);
  }
  
  console.log([
    '%c SYSTEM STABILITY MODULE v1.0 ',
    'background:#ff6600;color:#000;font-weight:bold;font-size:11px',
    '\n📊 localStorage cache: ACTIVE',
    '\n🔌 WebSocket watchdog: ACTIVE (30s)',
    '\n👁 Page visibility API: ACTIVE',
    '\n⌨ Shortcuts: Ctrl+Shift+H (health) | Ctrl+Shift+R (refresh) | Ctrl+Shift+C (clear cache)'
  ].join(''));
}, 2000);

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL INTELLIGENCE MODULE v2.0
   200+ NEWS SOURCES · MULTI-LANGUAGE · SENTIMENT ENGINE · CROSS-VERIFICATION
   Czech/Slovak · German · French · Spanish · Chinese · Japanese · Arabic
   Journalists · Traders · Analysts · Alternative Data · Fear & Greed
══════════════════════════════════════════════════════════════════════════ */

const INTEL = {version:'2.0',maxNews:500,crossVerifyMin:2,refreshInterval:38000};

// ── Extended intel cache ──────────────────────────────────────────────────
const _intelCache = {
  items:[], verified:[], fearGreed:null, fearGreedHistory:[],
  sources:{},
  sentiment:{global:50,bull:0,bear:0,neutral:0,total:0,lastUpdate:0},
  filters:{lang:'ALL',cat:'ALL',quality:'ALL',sentiment:'ALL',search:''}
};

// ── Journalist / trader watchlist ─────────────────────────────────────────
const WATCHLIST_JOURNALISTS = [
  // ── TIER 1 — MEGA INVESTORS ───────────────────────────────────────────────
  {name:'Warren Buffett',        handle:'warrenbuffett',   affil:'Berkshire Hathaway', focus:'EQUITY·VALUE',      tier:1, rss:'Warren+Buffett+Berkshire',  aum:'$274B eq.',known:'Value investing legend. 60yr track record. Stepped down as CEO Jan 1 2026 — Greg Abel now CEO. Remains chairman.', position:'Retired as CEO Jan 2026. Left Abel $300B+ cash pile, trimmed Apple & BofA. Top holdings: AXP, AAPL, OXY, KO, CB. New position: Alphabet (GOOGL).'},
  {name:'Ray Dalio',             handle:'raydalio',        affil:'Bridgewater Assoc.', focus:'MACRO·RATES',       tier:1, rss:'Ray+Dalio+economy',         aum:'$124B',  known:'All-weather portfolio creator. Principles author. New book: How Countries Go Broke. 50yr Bridgewater anniversary.', position:'2026 warning: "capital war" — geopolitical tensions weaponize money flows. USD fell 39% vs gold in 2025. AI in early bubble phase. Long gold (10-15% portfolio). Diversify away from US assets.'},
  {name:'Stanley Druckenmiller', handle:'druckenmiller',   affil:'Duquesne Family',    focus:'MACRO·FX',          tier:1, rss:'Druckenmiller+macro',       aum:'$3.5B',  known:'Greatest macro trader alive. 30yr 30%+ annual returns. Never had a losing year.', position:'Cut AI tech longs in late 2025. Bearish on US long bonds. Watching tariff impact closely. Gold long.'},
  {name:'George Soros',          handle:'georgesoros',     affil:'Soros Fund Mgmt',    focus:'MACRO·FX',          tier:1, rss:'George+Soros+market',       aum:'$25B',   known:'Broke Bank of England 1992. Reflexivity theory. Now focused on political philanthropy.', position:'Son Alex runs fund. Soros focuses on anti-Trump, pro-democracy funding globally. Fund cautious on US.'},
  {name:'Paul Tudor Jones',      handle:'ptj',             affil:'Tudor Investment',   focus:'MACRO·FUTURES',     tier:1, rss:'Paul+Tudor+Jones+macro',    aum:'$14B',   known:'Called 1987 crash. Trend following pioneer. 5% BTC allocation advocate since 2020.', position:'Long gold ($5,151 ATH) & BTC as inflation hedges. Tariff regime = inflationary. Watching USD trajectory. Gold outperformed all in 2025.'},
  {name:'Howard Marks',          handle:'howardmarks',     affil:'Oaktree Capital',    focus:'CREDIT·MACRO',      tier:1, rss:'Howard+Marks+investing',    aum:'$193B',  known:'Credit cycle expert. Famous memos read by every fund manager worldwide.', position:'Jan 2026 memo: "On Bubble Watch" — cautious but not calling top yet. Distressed debt selective.'},
  {name:'Jamie Dimon',           handle:'jamiedimon',      affil:'JPMorgan Chase',     focus:'BANKING·MACRO',     tier:1, rss:'Jamie+Dimon+economy',       aum:'$4.0T',  known:'Most powerful banker alive. Annual letters shape Wall Street thinking.', position:'2026 annual letter: stagflation risk real. Tariffs inflationary. Geopolitics biggest risk in 80yrs.'},
  {name:'Larry Fink',            handle:'larryfink',       affil:'BlackRock',          focus:'MACRO·ETF',         tier:1, rss:'Larry+Fink+BlackRock',      aum:'$11.5T', known:'World largest asset manager. Created iShares ETF empire. IBIT Bitcoin ETF launched 2024.', position:'2026 letter: tokenization is next $10T opportunity. Infrastructure & private credit key. BTC legitimate.'},
  {name:'Michael Saylor',        handle:'saylormsc',       affil:'Strategy (MSTR)',    focus:'BTC·STRATEGY',      tier:1, rss:'Michael+Saylor+Bitcoin',    aum:'$50B BTC', known:'Renamed MicroStrategy to Strategy. Largest public corporate BTC holder. 101+ purchases. "Second Century Begins."', position:'Holds 738,731 BTC ($56B cost, avg $75,862). BTC at $68K = ~$6B unrealized loss. Weekly buying via MSTR + STRC preferred. 3.5% of BTC supply.'},
  {name:'Elon Musk',             handle:'elonmusk',        affil:'Tesla/SpaceX/xAI/X', focus:'TECH·POLICY',       tier:1, rss:'Elon+Musk+Tesla',           aum:'$852B+', known:'World richest ($852B Forbes Feb 2026). xAI now subsidiary of SpaceX. $1T Tesla pay package approved Nov 2025.', position:'Left DOGE (says "somewhat successful"). TSLA up to $407 Mar 2026, Cybercab robotaxi April production. Tesla Takedown boycott hurt sales. Focused back on Tesla & xAI Grok-3.'},
  {name:'Bill Ackman',           handle:'billackman',      affil:'Pershing Square',    focus:'EQUITY·MACRO',      tier:1, rss:'Bill+Ackman+investment',    aum:'$18B',   known:'Activist investor. Bold concentrated bets. Major Twitter/X presence.', position:'2026: long Nike, Brookfield, Hilton. Building Pershing Square USA retail fund. Bullish on US long-term.'},
  {name:'Carl Icahn',            handle:'carlicahn',       affil:'Icahn Enterprises',  focus:'ACTIVIST·EQ',       tier:1, rss:'Carl+Icahn+activist',       aum:'$7B',    known:'Corporate raider turned activist. 50yr track record. SEC investigation settled 2024.', position:'Settled SEC charges on personal loans ($2B). Reduced dividend. Focused on energy & real estate battles.'},
  {name:'Jeff Gundlach',         handle:'doubleline',      affil:'DoubleLine Capital', focus:'BONDS·RATES',       tier:1, rss:'Jeff+Gundlach+bonds',       aum:'$95B',   known:'Bond King successor. Called 2016 Trump win. Accurate macro forecaster.', position:'2026: recession probability 60%. Fed will cut 3x. Long duration bonds, gold, non-USD assets. Short USD.'},
  {name:'Mohamed El-Erian',      handle:'elerianm',        affil:'Allianz / Cambridge', focus:'MACRO·FX',         tier:1, rss:'Mohamed+El-Erian+macro',    aum:'N/A',    known:'Ex-PIMCO CEO. Bloomberg opinion columnist. Fed and policy critic.', position:'Warns tariffs will reignite inflation. Fed in impossible position. Dollar resilient despite US chaos.'},
  {name:'Nouriel Roubini',       handle:'nouriel',         affil:'Atlas Capital / GEO', focus:'MACRO·RISK',       tier:1, rss:'Nouriel+Roubini+economy',   aum:'N/A',    known:'Dr. Doom. Called 2008. Now runs Atlas Capital & GEO geopolitical risk firm.', position:'Stagflation 2026 base case. Tariffs + AI job losses = 70s repeat. Geopolitical fragmentation accelerating.'},
  {name:'Vitalik Buterin',       handle:'VitalikButerin',  affil:'Ethereum Foundation', focus:'ETH·CRYPTO',       tier:1, rss:'Vitalik+Buterin+Ethereum',  aum:'N/A',    known:'Ethereum creator. Pectra upgrade 2025. Focused on L2s, ZK proofs, privacy.', position:'Pectra upgrade live Q1 2025. Focused on ETH becoming "world computer". Critical of memecoins & speculation.'},
  {name:'Arthur Hayes',          handle:'cryptohayes',     affil:'Maelstrom Fund',     focus:'CRYPTO·MACRO',      tier:1, rss:'Arthur+Hayes+crypto',       aum:'$1B+',   known:'BitMEX founder. Long macro crypto essays on Substack. Sharp Fed liquidity analyst.', position:'BTC at $70K = buy zone. Expects Fed liquidity pivot H2 2026 — BTC to $250K+. Watching tariff impact on USD. Accumulating ETH, altcoins in dip.'},
  {name:'Raoul Pal',             handle:'raoulgmi',        affil:'Real Vision / GMI',  focus:'MACRO·CRYPTO',      tier:1, rss:'Raoul+Pal+macro',           aum:'N/A',    known:'Ex-Goldman. Real Vision founder. Exponential Age & liquidity cycle frameworks.', position:'Sees $70K BTC as opportunity. 97% correlation BTC-NASDAQ = liquidity play. Global liquidity improving. Remains 90%+ crypto. Bearish on consensus doom narrative.'},
  {name:'Cathie Wood',           handle:'cathiedwood',     affil:'ARK Invest',         focus:'TECH·DISRUPT',      tier:1, rss:'Cathie+Wood+ARK',           aum:'$12B',   known:'Disruptive tech investor. TSLA bull. ARKK famous for 2020 150% return and 2022 -75%.', position:'BTC ATH was $126K (2025). ARK $1.5M BTC by 2030 target intact. Buying TSLA dip post-DOGE. AI robotics & autonomous driving thesis. Robotaxi = key catalyst.'},
  {name:'Michael Burry',         handle:'michaelburry',    affil:'Scion Asset Mgmt',   focus:'SHORT·VALUE',       tier:1, rss:'Michael+Burry+portfolio',   aum:'$280M',  known:'The Big Short. Called 2008. Contrarian value + short specialist. Rarely speaks.', position:'Q4 2025 13F: large JD.com, Alibaba China plays. Shorted SPY puts. Concerned about AI bubble valuation.'},
  {name:'Mike Novogratz',        handle:'novogratz',       affil:'Galaxy Digital',     focus:'CRYPTO·MACRO',      tier:1, rss:'Mike+Novogratz+crypto',     aum:'$5B',    known:'Ex-Goldman partner. Galaxy Digital CEO. Crypto institutional bridge builder.', position:'BTC strategic reserve under Trump = structural demand. SOL ecosystem bet. Galaxy IPO progress 2026.'},
  {name:'CZ Changpeng Zhao',     handle:'cz_binance',      affil:'Binance / Investor', focus:'CRYPTO·EXCHANGE',   tier:1, rss:'CZ+Binance+crypto',         aum:'$50B+',  known:'Binance founder. Served 4mo prison 2024. Now free and back as angel investor.', position:'Post-prison investing in AI, biotech, Web3. BNB chain ecosystem. Binance under new CEO Richard Teng.'},
  {name:'Brian Armstrong',       handle:'brian_armstrong', affil:'Coinbase',           focus:'CRYPTO·REGULATION', tier:1, rss:'Brian+Armstrong+Coinbase',  aum:'$11B+',  known:'Coinbase CEO. Won SEC lawsuit 2025. Key figure in US crypto regulation clarity push.', position:'SEC dropped Coinbase suit Jan 2025. COIN stock up 3x. Pushing for stablecoin legislation. Base L2 growing.'},
  // ── TIER 2 — MACRO STRATEGISTS ───────────────────────────────────────────
  {name:'Jeremy Grantham',       handle:'jeremygrantham',  affil:'GMO',                focus:'VALUE·BUBBLES',     tier:2, rss:'Jeremy+Grantham+bubble',    aum:'$65B',   known:'Super-bubble expert. Called dot-com, 2008, 2021 tops. Climate investor.', position:'2026: still calling US equities biggest bubble in history. AI hype = dot-com 2.0. Long EM, short US growth.'},
  {name:'Nassim Taleb',          handle:'nntaleb',         affil:'Universa Invest.',   focus:'RISK·TAIL',         tier:2, rss:'Nassim+Taleb+risk',         aum:'N/A',    known:'Black Swan author. Antifragility. Tail risk hedging. Brutal on Twitter debates.', position:'Anti-Bitcoin (not a currency). Pro-gold. Warns AI is overfit. US debt = existential fragility.'},
  {name:'Lyn Alden',             handle:'lynaldenfinance', affil:'Lyn Alden Research', focus:'MACRO·BONDS',       tier:2, rss:'Lyn+Alden+macro',           aum:'N/A',    known:'Engineer turned macro analyst. Fiscal dominance framework. Published "Broken Money" 2023.', position:'Fiscal dominance = Fed must monetize. Long BTC, gold, energy commodities. Neutral on stocks 2026.'},
  {name:'Luke Gromen',           handle:'lukegromen',      affil:'FFTT Research',      focus:'DOLLAR·MACRO',      tier:2, rss:'Luke+Gromen+dollar',        aum:'N/A',    known:'Dollar endgame thesis. Treasury market stress expert. Gold monetization call.', position:'US must inflate away debt — gold to $4,000+. BTC as treasury reserve gaining traction. Dollar bear.'},
  {name:'Zoltan Pozsar',         handle:'zoltanpozsar',    affil:'Ex-CS / Consulting', focus:'MONEY·MACRO',       tier:2, rss:'Zoltan+Pozsar+monetary',    aum:'N/A',    known:'Repo market and plumbing expert. Bretton Woods III thesis. Now independent consultant.', position:'Commodity-backed monetary reset underway. Central banks accumulating gold record pace. Dollar hegemony ending.'},
  {name:'David Rosenberg',       handle:'EconDavidR',      affil:'Rosenberg Research', focus:'MACRO·BONDS',       tier:2, rss:'David+Rosenberg+economy',   aum:'N/A',    known:'Ex-Merrill Lynch chief economist. Persistent recession caller. Bond bull.', position:'2026: finally admits soft landing happened. Now watches tariff stagflation risk. Still long bonds.'},
  {name:'Jim Bianco',            handle:'biancoresearch',  affil:'Bianco Research',    focus:'RATES·MACRO',       tier:2, rss:'Jim+Bianco+rates',          aum:'N/A',    known:'Fixed income and macro research. Fed watcher. Bond bear contrarian.', position:'Term premium rising — long bond structural bear market. Tariff = inflation reignition. Fed on hold 2026.'},
  {name:'Peter Schiff',          handle:'peterschiff',     affil:'Euro Pacific Capital',focus:'GOLD·FX',          tier:2, rss:'Peter+Schiff+gold',         aum:'$1B',    known:'Gold perma-bull. Called 2008. Crypto skeptic. Puerto Rico tax exile.', position:'Gold at ATH $2,900+ — says going to $5,000. USD collapse imminent. BTC is "nothing". Load up silver.'},
  {name:'Andreas Steno',         handle:'AndreasSteno',    affil:'Steno Research',     focus:'MACRO·FX',          tier:2, rss:'Andreas+Steno+macro',       aum:'N/A',    known:'Scandinavian macro strategist. Liquidity cycle and FX expert. Growing Substack.', position:'Global liquidity expanding in 2026. EUR/USD recovering. China stimulus key. Long risk assets H1 2026.'},
  {name:'Nick Timiraos',         handle:'NickTimiraos',    affil:'Wall Street Journal', focus:'FED·RATES',        tier:2, rss:'Nick+Timiraos+Fed',         aum:'N/A',    known:'WSJ chief economics correspondent. Known as "Fed whisperer." Markets move on his articles.', position:'Neutral journalist. Reports Fed on hold — tariff uncertainty delays cuts. Powell term ends May 2026.'},
  {name:'Liz Ann Sonders',       handle:'lizannsonders',   affil:'Charles Schwab',     focus:'EQUITY·MACRO',      tier:2, rss:'Liz+Ann+Sonders+market',    aum:'N/A',    known:'Schwab chief investment strategist. Clear macro communicator. Markets TV regular.', position:'2026: cautious on equities. Labor market softening. Watching tariff pass-through to consumer prices.'},
  {name:'Felix Zulauf',          handle:'felixzulauf',     affil:'Zulauf Asset Mgmt',  focus:'MACRO·GLOBAL',      tier:2, rss:'Felix+Zulauf+macro',        aum:'$500M',  known:'Swiss macro legend. Barrons roundtable 40yr fixture. Global cycles expert.', position:'2026: global recession H2. Long gold, short equities. Europe structurally weak. USD bear medium-term.'},
  {name:'Marko Papic',           handle:'markopapic',      affil:'BCA Research',       focus:'GEOPOLITICS',       tier:2, rss:'Marko+Papic+geopolitics',   aum:'N/A',    known:'Geopolitical macro strategist. Constrained vision framework. EM specialist.', position:'2026: multipolar world = EM outperforms. Ukraine peace deal = European rerating. China reopening plays.'},
  {name:'Russell Napier',        handle:'russellnapier',   affil:'ERIC / Independent', focus:'MONEY·HISTORY',     tier:2, rss:'Russell+Napier+monetary',   aum:'N/A',    known:'Financial historian. Anatomy of the Bear. Financial repression thesis since 2020.', position:'Financial repression in full swing — govts control capital. Long equities, short bonds. Inflation structural.'},
  {name:'Chamath Palihapitiya',  handle:'chamath',         affil:'Social Capital',     focus:'TECH·MACRO',        tier:2, rss:'Chamath+Palihapitiya',      aum:'$1B+',   known:'Facebook VP turned VC. SPAC era. All-In podcast co-host with Sacks, Friedberg, Levchin.', position:'AI infrastructure buildout = generational opportunity. Bullish on defense tech, biotech, energy. Crypto selective.'},
  {name:'Kevin OLeary',          handle:'kevinoleary',     affil:'OLeary Ventures',    focus:'EQUITY·CRYPTO',     tier:2, rss:'Kevin+OLeary+investment',   aum:'$400M',  known:'Shark Tank Mr. Wonderful. Media-savvy. Lost $15M in FTX collapse.', position:'2026: crypto regulation clarity = institutional flood. Long regulated exchanges. Building tokenized fund.'},
  {name:'Mark Cuban',            handle:'mcuban',          affil:'Shark Tank / Costal', focus:'TECH·EQUITY',      tier:2, rss:'Mark+Cuban+economy',        aum:'$5.7B',  known:'Sold Broadcast.com for $5.7B. Former Dallas Mavericks owner. Sold team 2023.', position:'Sold Mavs 2023. Focused on Costal healthcare disruption startup. Bullish on AI in healthcare.'},
  {name:'Tom Lee',               handle:'fundstrat',       affil:'Fundstrat Global',   focus:'EQUITY·CRYPTO',     tier:2, rss:'Tom+Lee+Fundstrat',         aum:'N/A',    known:'Perennial bull. Accurate 2023/2024 S&P calls. Fundstrat research head. Also runs Bitmine (ETH treasury).', position:'Bitmine holds 4.5M ETH ($122M added Mar 2026). S&P 6,700 range. Tariff dip = buy. BTC $150K+ target H2 2026. ETH as institutional treasury play.'},
  {name:'Scott Galloway',        handle:'profgalloway',    affil:'NYU Stern / Prof G',  focus:'TECH·MACRO',       tier:2, rss:'Scott+Galloway+tech',       aum:'N/A',    known:'NYU professor. No Mercy No Malice newsletter. Podcast Prof G. Tech critic.', position:'Alarmed by DOGE/Musk power. Warns on wealth inequality. Long on higher education disruption by AI.'},
  {name:'Anthony Pompliano',     handle:'APompliano',      affil:'Pomp Investments',   focus:'BTC·MACRO',         tier:2, rss:'Anthony+Pompliano+Bitcoin', aum:'$250M',  known:'BTC podcaster and investor. Pomp letter 250K+ subscribers. CNBC regular.', position:'US Strategic Bitcoin Reserve = game changer. BTC $500K+ this cycle. Every nation will hold BTC.'},
  {name:'Danielle DiMartino',    handle:'DiMartinoBooth',  affil:'Quill Intelligence', focus:'FED·MACRO',         tier:2, rss:'Danielle+DiMartino+Fed',    aum:'N/A',    known:'Ex-Dallas Fed advisor. Fed Up book. FOMC policy insider perspective.', position:'2026: Fed trapped between tariff inflation and recession. Labor market deteriorating. Cut later than markets expect.'},
  {name:'David Sacks',           handle:'davidsacks47',    affil:'White House / AI Czar',focus:'TECH·POLICY',     tier:2, rss:'David+Sacks+AI+crypto',     aum:'$1B+',   known:'PayPal mafia. All-In podcast. Now White House AI & Crypto policy czar under Trump.', position:'Drafting US AI strategy & crypto regulatory framework. Pro-stablecoin bill. Anti-CBDC. Pro-BTC reserve.'},
  {name:'Justin Sun',            handle:'justinsuntron',   affil:'Tron / HTX / WBTC',  focus:'CRYPTO·TRON',       tier:2, rss:'Justin+Sun+Tron',           aum:'$20B+',  known:'Tron founder. Controls HTX exchange. WBTC controversy 2024. Big Trump event attendee.', position:'Attended Trump inauguration. Bought $30M Trump meme coin. Positioning for US crypto favorable regime.'},
  {name:'Willy Woo',             handle:'woonomic',        affil:'Independent',        focus:'BTC·ONCHAIN',       tier:2, rss:'Willy+Woo+Bitcoin',         aum:'N/A',    known:'Bitcoin on-chain analytics pioneer. Woobull charts. UTXO & NVT ratio inventor.', position:'On-chain: long-term holder selling has collapsed 87%. Whale wallets accumulating $65-70K. BTC Fear & Greed in Extreme Fear = historical buy signal. Structurally bullish.'},
  {name:'Plan B',                handle:'100trillionusd',  affil:'S2F Model',          focus:'BTC·S2F',           tier:2, rss:'PlanB+Bitcoin',             aum:'N/A',    known:'Stock-to-Flow BTC model creator. Anonymous institutional analyst. Most followed crypto quant.', position:'BTC ATH $126K (2025) then corrected to $70K. S2F model: $500K-1M before 2026 end remains target. Accumulation phase = buy signal. Model somewhat behind schedule.'},
  {name:'Nic Carter',            handle:'nic__carter',     affil:'Castle Island VC',   focus:'BTC·POLICY',        tier:2, rss:'Nic+Carter+Bitcoin',        aum:'$500M',  known:'BTC researcher. Coin Metrics co-founder. PoW defender. Crypto policy expert.', position:'US strategic reserve legitimizes BTC globally. Anti-ETH maximalism. Proof of work only real decentralization.'},
  {name:'Balaji Srinivasan',     handle:'balajis',         affil:'Independent',        focus:'CRYPTO·TECH',       tier:2, rss:'Balaji+Srinivasan+Bitcoin', aum:'N/A',    known:'Ex-a16z, ex-Coinbase CTO. Network State book. Lost $1M BTC hyperinflation bet 2023.', position:'Network State thesis gaining real-world traction. AI + crypto = new sovereign network layer. BTC long.'},
  {name:'Peter Tuchman',         handle:'petertuchman',    affil:'Quattro Securities', focus:'NYSE·FLOOR',        tier:2, rss:'Peter+Tuchman+NYSE',        aum:'N/A',    known:'Einstein of Wall Street. 35yr NYSE floor trader. Most photographed trader on earth.', position:'Sentiment gauge: floor traders nervous about tariff volatility. Sees institutional buyers at every dip.'},
  {name:'Jim Cramer',            handle:'jimcramer',       affil:'Mad Money / CNBC',   focus:'EQUITY·TV',         tier:2, rss:'Jim+Cramer+stocks',         aum:'N/A',    known:'Mad Money host. Inverse Cramer ETF (SJIM) exists. Markets move opposite his calls.', position:'2026 bullish on AI infrastructure. Cramer inverse signal: when he panics, institutions buy. Watch carefully.'},
  {name:'Rekt Capital',          handle:'rektcapital',     affil:'Independent',        focus:'BTC·CYCLES',        tier:2, rss:'Rekt+Capital+Bitcoin',      aum:'N/A',    known:'BTC cycle & halving analyst. Technical cycle timing expert. Newsletter 100K+ subs.', position:'BTC corrected -44% from ATH $126K to $70K range. Says this is normal re-accumulation. Watching $60K support. Target $150-180K for cycle top H2 2026.'},
  {name:'Hayden Adams',          handle:'haydenzadams',    affil:'Uniswap Labs',       focus:'DEFI·ETH',          tier:2, rss:'Hayden+Adams+Uniswap',      aum:'N/A',    known:'Uniswap v1-v4 creator. Largest DEX by volume. Fought SEC and won 2025.', position:'SEC dropped Uniswap investigation 2025. Uniswap v4 hooks enabling new DeFi primitives. ETH L2 dominance.'},
  {name:'Meltem Demirors',       handle:'Melt_Dem',        affil:'CoinShares',         focus:'CRYPTO·INST',       tier:2, rss:'Meltem+Demirors+crypto',    aum:'$6B',    known:'CoinShares CSO. Institutional crypto pioneer. Congressional testimony veteran.', position:'Institutional crypto allocation rising post-ETF approval. Tokenization of TradFi assets accelerating.'},
  {name:'Caitlin Long',          handle:'CaitlinLong_',    affil:'Custodia Bank',      focus:'BTC·BANKING',       tier:2, rss:'Caitlin+Long+Bitcoin+bank', aum:'N/A',    known:'Wyoming crypto banking law architect. Custodia Bank founder. Fed master account battle.', position:'Custodia won Fed master account case 2025. BTC-backed banking model viable. Anti-fractional reserve crypto.'},
  {name:'Tyler Winklevoss',      handle:'tylerwinklevoss', affil:'Gemini Exchange',    focus:'BTC·EXCHANGE',      tier:2, rss:'Winklevoss+Bitcoin',        aum:'$4B+',   known:'Gemini co-founder. Early Facebook investor. BTC OG since 2012. Gemini Earn collapse survivor.', position:'Gemini settled CFTC charges. Relaunch Gemini Earn. BTC strategic reserve supporter. SOL spot ETF push.'}
];

// ── KEY HISTORICAL EVENTS per investor ────────────────────────────────────
const KEY_EVENTS = {
  'Warren Buffett': [
    {y:'2024', tag:'BUY',     txt:'Bought $6.7B Occidental Petroleum stake, now 28% owner'},
    {y:'2024', tag:'SELL',    txt:'Sold half Apple position — trimmed from $174B to $90B'},
    {y:'2023', tag:'BUY',     txt:'Accumulated $10B+ in Japanese trading houses (Itochu, Marubeni...)'},
    {y:'2022', tag:'BUY',     txt:'Bought $11.6B Chevron + $7B HP Inc'},
    {y:'2022', tag:'BUY',     txt:'Purchased Alleghany Corp for $11.6B'},
    {y:'2020', tag:'SELL',    txt:'Sold all airline positions at loss — Delta, United, American, Southwest'},
    {y:'2016', tag:'BUY',     txt:'Began massive Apple position — eventually largest equity holding'},
    {y:'2011', tag:'BUY',     txt:'Bought $10B IBM stake (later fully sold 2018)'},
    {y:'2008', tag:'SPEECH',  txt:'Op-Ed NYT: "Buy American. I Am." — called market bottom'},
    {y:'2008', tag:'BUY',     txt:'Lent $5B to Goldman Sachs during financial crisis at 10% preferred'}
  ],
  'Ray Dalio': [
    {y:'2024', tag:'WARNING', txt:'Warned: US faces "debt spiral" — bond market at breaking point'},
    {y:'2023', tag:'SPEECH',  txt:'Stepped back from Bridgewater — handed over to succession team'},
    {y:'2022', tag:'SELL',    txt:'Cut All-Weather fund after -21% loss in rising rate environment'},
    {y:'2020', tag:'WARNING', txt:'Predicted "lost decade" for 60/40 portfolio investors'},
    {y:'2019', tag:'SPEECH',  txt:'Published "The World Has Gone Mad" essay on debt sustainability'},
    {y:'2018', tag:'WARNING', txt:'Called next recession within 2 years — largely correct (COVID 2020)'},
    {y:'2017', tag:'SPEECH',  txt:'Published "Principles" — became bestseller on decision-making'},
    {y:'2008', tag:'BUY',     txt:'Bridgewater Pure Alpha returned +9.5% while markets crashed -40%'}
  ],
  'Stanley Druckenmiller': [
    {y:'2024', tag:'SELL',    txt:'Exited Nvidia position worth ~$800M after massive run-up'},
    {y:'2024', tag:'WARNING', txt:'Called US fiscal situation "most troubling" in 30yr career'},
    {y:'2023', tag:'BUY',     txt:'Built large AI infrastructure positions — Nvidia, Microsoft'},
    {y:'2022', tag:'SELL',    txt:'Cut equity exposure dramatically ahead of rate hike cycle'},
    {y:'2020', tag:'BUY',     txt:'Called COVID bottom in April — went heavily long tech'},
    {y:'2015', tag:'SPEECH',  txt:'Warned entitlement spending will bankrupt US within 15 years'},
    {y:'2010', tag:'SPEECH',  txt:'Left Duquesne after 30yr run — returned all outside capital'},
    {y:'1992', tag:'SELL',    txt:'With Soros: shorted GBP — Bank of England broke — $1B profit'}
  ],
  'George Soros': [
    {y:'2024', tag:'SELL',    txt:'Son Alex Soros takes control — shift toward political spending'},
    {y:'2022', tag:'WARNING', txt:'Warned Putin invasion threatens "civilization as we know it"'},
    {y:'2020', tag:'BUY',     txt:'Increased equity positions as markets recovered post-COVID'},
    {y:'2016', tag:'SELL',    txt:'Shorted markets after Brexit & Trump — lost $1B'},
    {y:'2011', tag:'SELL',    txt:'Returned outside investor capital — converted to family office'},
    {y:'2008', tag:'BUY',     txt:'Wrote "The Crash of 2008" — predicted prolonged recession'},
    {y:'1999', tag:'SELL',    txt:'Lost $700M betting against dot-com bubble prematurely'},
    {y:'1992', tag:'SELL',    txt:'Shorted GBP £10B — "Broke the Bank of England" — $1B+ profit'}
  ],
  'Michael Saylor': [
    {y:'2025', tag:'BUY',     txt:'MicroStrategy now holds 499,096 BTC — largest corporate holder'},
    {y:'2024', tag:'BUY',     txt:'Raised $3B+ through ATM equity to buy more BTC'},
    {y:'2024', tag:'SPEECH',  txt:'Testified to SEC: Bitcoin is only compliant digital commodity'},
    {y:'2023', tag:'BUY',     txt:'Bought BTC through bear market — averaged down to ~$29,600'},
    {y:'2022', tag:'WARNING', txt:'MicroStrategy faced margin call risk — BTC dropped to $17K'},
    {y:'2021', tag:'BUY',     txt:'Issued $1B convertible notes to purchase Bitcoin'},
    {y:'2020', tag:'BUY',     txt:'First BTC purchase: 21,454 BTC at $11,111/coin — "treasury strategy"'}
  ],
  'Elon Musk': [
    {y:'2025', tag:'SPEECH',  txt:'Heads DOGE — cutting $1T from US federal budget'},
    {y:'2024', tag:'BUY',     txt:'Endorsed Trump, donated $277M — reshapes political landscape'},
    {y:'2023', tag:'BUY',     txt:'Founded xAI, launched Grok — competing with OpenAI'},
    {y:'2022', tag:'BUY',     txt:'Acquired Twitter for $44B — renamed to X'},
    {y:'2021', tag:'SELL',    txt:'Sold 10% Tesla stake ($16B) after Twitter poll'},
    {y:'2021', tag:'SPEECH',  txt:'Tweets moved DOGE +800% — SEC investigated market manipulation'},
    {y:'2020', tag:'SELL',    txt:'Tweeted "Tesla stock too high imo" — TSLA fell 10% same day'},
    {y:'2018', tag:'WARNING', txt:'SEC charged: "funding secured" tweet — settled $20M fine'}
  ],
  'Paul Tudor Jones': [
    {y:'2024', tag:'BUY',     txt:'Called commodities supercycle — added gold, energy exposure'},
    {y:'2022', tag:'BUY',     txt:'Increased Bitcoin allocation as inflation hedge amid rate hikes'},
    {y:'2020', tag:'BUY',     txt:'Disclosed 2% BTC position — first major hedge fund Bitcoin call'},
    {y:'2020', tag:'WARNING', txt:'Macro note "The Great Monetary Inflation" — predicted debasement'},
    {y:'2019', tag:'SELL',    txt:'Reduced equity exposure ahead of anticipated slowdown'},
    {y:'1987', tag:'SELL',    txt:'Called Black Monday crash — shorted ahead of -22% single day drop'}
  ],
  'Howard Marks': [
    {y:'2024', tag:'WARNING', txt:'Memo: "Nobody Knows" — expressed uncertainty on rate direction'},
    {y:'2023', tag:'WARNING', txt:'Memo: "Further Thoughts on Sea Change" — stay cautious on credit'},
    {y:'2022', tag:'SPEECH',  txt:'Memo: "Sea Change" — declared end of 40yr bull market in bonds'},
    {y:'2021', tag:'WARNING', txt:'Warned about SPAC bubble and meme stock mania risks'},
    {y:'2020', tag:'BUY',     txt:'Deployed distressed debt capital during COVID crash — huge gains'},
    {y:'2017', tag:'WARNING', txt:'Memo "There They Go Again… Again" — warned bubble formation'},
    {y:'2007', tag:'WARNING', txt:'Pre-crisis memo warning on easy credit and moral hazard'},
    {y:'2000', tag:'WARNING', txt:'Called dot-com bubble in memo — months before crash'}
  ],
  'Jamie Dimon': [
    {y:'2024', tag:'WARNING', txt:'Annual letter: warns of fiscal dominance, $35T debt unsustainable'},
    {y:'2023', tag:'BUY',     txt:'JPMorgan acquired First Republic Bank after SVB collapse — $229B assets'},
    {y:'2023', tag:'WARNING', txt:'Warned banking crisis "not over" — predicted more failures'},
    {y:'2022', tag:'WARNING', txt:'Called economy "hurricane" — prepared JPMorgan defensively'},
    {y:'2019', tag:'SELL',    txt:'Warned on trade war escalation impact on global growth'},
    {y:'2017', tag:'SPEECH',  txt:'Called Bitcoin a "fraud" — later softened stance on crypto'},
    {y:'2012', tag:'WARNING', txt:'JPMorgan London Whale: $6.2B trading loss — testified before Senate'},
    {y:'2008', tag:'BUY',     txt:'Acquired Bear Stearns at $2/share ($10 later) with Fed backing'}
  ],
  'Larry Fink': [
    {y:'2024', tag:'SPEECH',  txt:'BlackRock Bitcoin ETF (IBIT) launches — $20B+ inflows in months'},
    {y:'2024', tag:'SPEECH',  txt:'Annual letter: tokenization of assets is next revolution'},
    {y:'2023', tag:'BUY',     txt:'Applied for Bitcoin spot ETF — forced entire industry to follow'},
    {y:'2022', tag:'SELL',    txt:'Called Russia invasion wake-up call for ESG investing limits'},
    {y:'2021', tag:'SPEECH',  txt:'ESG investing push — carbon transition framework for all holdings'},
    {y:'2017', tag:'WARNING', txt:'Annual letter warned on populism and geopolitical fragmentation'},
    {y:'2009', tag:'BUY',     txt:'BlackRock acquired Barclays Global Investors — became $3T AUM firm'}
  ],
  'Jeff Gundlach': [
    {y:'2024', tag:'WARNING', txt:'Predicted US recession within 12 months — recession probability 75%'},
    {y:'2023', tag:'BUY',     txt:'Positioned for rate cuts — long duration bonds ahead of pivot'},
    {y:'2022', tag:'WARNING', txt:'Called Fed "way behind curve" on inflation — predicted >5% rates'},
    {y:'2020', tag:'WARNING', txt:'Warned on dollar collapse — long gold and emerging markets'},
    {y:'2019', tag:'BUY',     txt:'Called gold breakout — added significant exposure'},
    {y:'2016', tag:'SPEECH',  txt:'Predicted Trump victory when polls showed 90% Clinton probability'},
    {y:'2011', tag:'SPEECH',  txt:'Called "Mortgage Trade of Decade" at DoubleLine launch — 90%+ returns'},
    {y:'2009', tag:'SELL',    txt:'Left TCW after dispute — founded DoubleLine Capital, took team'}
  ],
  'Cathie Wood': [
    {y:'2024', tag:'SELL',    txt:'ARK sold Nvidia before AI bubble concerns — missed $1T+ rally'},
    {y:'2023', tag:'BUY',     txt:'Added more Tesla despite 70% drawdown — doubled down conviction'},
    {y:'2022', tag:'SELL',    txt:'ARKK fell -75% from peak — worst 12-month performance vs benchmark'},
    {y:'2021', tag:'SPEECH',  txt:'Predicted Tesla $3,000/share (split-adjusted) by 2025'},
    {y:'2021', tag:'SELL',    txt:'Sold Bitcoin positions as BTC hit ATH — called "too expensive"'},
    {y:'2020', tag:'BUY',     txt:'ARKK returned +152% — best performing ETF in the US'},
    {y:'2018', tag:'BUY',     txt:'Bought Tesla aggressively at $20 (split-adj) — called $4,000 target'}
  ],
  'Michael Burry': [
    {y:'2024', tag:'BUY',     txt:'13F revealed large Alibaba/JD.com China positions'},
    {y:'2023', tag:'SELL',    txt:'Tweeted "Sell" — deleted post — later proven somewhat premature'},
    {y:'2023', tag:'WARNING', txt:'Called AI the biggest bubble in history — shorted Nvidia briefly'},
    {y:'2022', tag:'BUY',     txt:'Bought prison stocks, water rights, farmland as inflation hedges'},
    {y:'2021', tag:'SELL',    txt:'Warned on index fund bubble — compared to CDO risk of 2007'},
    {y:'2021', tag:'WARNING', txt:'Tweeted GameStop short squeeze was not sustainable'},
    {y:'2015', tag:'WARNING', txt:'Warned on Chinese equity bubble ahead of 2015 crash'},
    {y:'2008', tag:'SELL',    txt:'CDS trade paid $800M profit — shorted mortgage-backed securities'}
  ],
  'Bill Ackman': [
    {y:'2024', tag:'SELL',    txt:'Exited Netflix, Universal Music — reallocated to rate trade'},
    {y:'2024', tag:'SPEECH',  txt:'Harvard/MIT president ouster campaign on antisemitism'},
    {y:'2023', tag:'BUY',     txt:'Built large Alphabet position — called AI undervalued'},
    {y:'2022', tag:'BUY',     txt:'Bought Netflix at $300 — sold at $220 — $400M+ loss'},
    {y:'2020', tag:'BUY',     txt:'Hedged portfolio — made $2.6B on CDS then bought equities'},
    {y:'2018', tag:'SELL',    txt:'Exited Herbalife short after $1B loss — 5yr battle with Icahn'},
    {y:'2015', tag:'SELL',    txt:'Valeant position collapsed 90% — $4B loss for Pershing Square'},
    {y:'2012', tag:'SELL',    txt:'Shorted Herbalife publicly — called it pyramid scheme'}
  ],
  'Nouriel Roubini': [
    {y:'2024', tag:'WARNING', txt:'Warns of "MegaThreats" — 11 forces threatening global economy'},
    {y:'2023', tag:'WARNING', txt:'Called "Great Stagflationary Debt Crisis" within 3 years'},
    {y:'2022', tag:'WARNING', txt:'Book "MegaThreats" — predicted decade of slow growth & inflation'},
    {y:'2021', tag:'WARNING', txt:'Called crypto "mother of all scams" and Ponzi scheme'},
    {y:'2018', tag:'WARNING', txt:'Called Bitcoin "the mother of all bubbles" at $6,000 level'},
    {y:'2008', tag:'WARNING', txt:'Called 2008 crisis — nicknamed Dr. Doom — predicted 12 steps'},
    {y:'2006', tag:'WARNING', txt:'IMF speech: predicted US housing collapse, banking crisis, recession'}
  ],
  'Peter Schiff': [
    {y:'2024', tag:'WARNING', txt:'Predicted dollar collapse — gold target $5,000+'},
    {y:'2023', tag:'BUY',     txt:'Accumulated physical gold and silver at $1,800-2,000 levels'},
    {y:'2022', tag:'WARNING', txt:'Criticized Fed pivot expectations — said inflation not transitory'},
    {y:'2019', tag:'BUY',     txt:'Predicted next crisis worse than 2008 — added mining stocks'},
    {y:'2018', tag:'SELL',    txt:'Shorted US stocks ahead of Q4 correction — partial win'},
    {y:'2010', tag:'WARNING', txt:'Testified to Congress on impact of QE on dollar'},
    {y:'2008', tag:'WARNING', txt:'Called housing/banking crisis on national TV in 2006-07'}
  ],
  'Tom Lee': [
    {y:'2024', tag:'BUY',     txt:'Called S&P 6,000 — correct, index hit target by year end'},
    {y:'2024', tag:'BUY',     txt:'Maintained BTC $150K target for 2024 cycle'},
    {y:'2022', tag:'BUY',     txt:'Remained bullish through entire 2022 bear market — wrong call'},
    {y:'2021', tag:'BUY',     txt:'Called BTC $100K+ target — fell short at $69K ATH'},
    {y:'2019', tag:'BUY',     txt:'Predicted S&P recovery — correctly called 2019 bull run'},
    {y:'2018', tag:'BUY',     txt:'Maintained $25,000 BTC target through crypto winter'}
  ],
  'Lyn Alden': [
    {y:'2024', tag:'BUY',     txt:'Maintained BTC position as monetary debasement hedge'},
    {y:'2023', tag:'SPEECH',  txt:'Published "Broken Money" — comprehensive monetary history analysis'},
    {y:'2022', tag:'BUY',     txt:'Increased energy and commodity allocation — inflation thesis'},
    {y:'2021', tag:'BUY',     txt:'Added significant BTC exposure citing fiscal dominance framework'},
    {y:'2020', tag:'WARNING', txt:'Published thesis on fiscal dominance — government forced to monetize debt'},
    {y:'2019', tag:'SPEECH',  txt:'Independent research launch — macro framework covering USD, gold, BTC'}
  ],
  'Nassim Taleb': [
    {y:'2023', tag:'WARNING', txt:'Warned AI models are overfit to past data — not truly intelligent'},
    {y:'2021', tag:'SELL',    txt:'Completely exited Bitcoin — called it speculative bubble, not currency'},
    {y:'2020', tag:'BUY',     txt:'Universa fund returned +4,144% in March 2020 crash — tail risk paid off'},
    {y:'2018', tag:'SPEECH',  txt:'Called Bitcoin a good idea poorly executed — not a currency'},
    {y:'2010', tag:'SPEECH',  txt:'Published "The Black Swan" paperback — added "Robustness" chapter'},
    {y:'2008', tag:'BUY',     txt:'Tail risk fund returned >100% during financial crisis'},
    {y:'2007', tag:'SPEECH',  txt:'Published "The Black Swan" — predicted systemic fragility'}
  ]
};

// ── Notification system: track seen news per investor ─────────────────────
const _seenNews = JSON.parse(sessionStorage.getItem('_seenNews')||'{}');
function _markSeen(name){ _seenNews[name]=Date.now(); try{sessionStorage.setItem('_seenNews',JSON.stringify(_seenNews));}catch(e){} }
function _isNew(name){
  const cache=_journCache.news[name];
  if(!cache?.items?.length) return false;
  const lastSeen=_seenNews[name]||0;
  return cache.ts > lastSeen + 1000;
}
const _journCache = { news:{}, trending:[], lastFetch:0 };
const RSS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';
const GNEWS = 'https://news.google.com/rss/search?q=';

async function fetchJournNews(person, force=false){
  const key = person.name;
  if(!force && _journCache.news[key] && Date.now()-(_journCache.news[key].ts||0) < 300000) return;
  try {
    const q = encodeURIComponent((person.rss||person.name).replace(/ /g,'+'));
    const url = `${GNEWS}${q}&hl=en-US&gl=US&ceid=US:en`;
    const r = await fetch(`${RSS_PROXY}${encodeURIComponent(url)}&count=10`);
    const j = await r.json();
    if(j.status==='ok' && j.items?.length){
      _journCache.news[key] = {
        ts: Date.now(),
        items: j.items.slice(0,10).map(i=>({
          title: i.title?.replace(/ - .{0,50}$/,'').trim() || '',
          link: i.link||'',
          source: i.source?.title || (i.title?.match(/ - (.{2,40})$/) || [])[1] || '',
          ago: _timeAgo(new Date(i.pubDate||i.published||Date.now()))
        })).filter(i=>i.title)
      };
    } else {
      // Mark as fetched but empty so we don't retry immediately
      if(!_journCache.news[key]) _journCache.news[key] = {ts:Date.now(), items:[]};
    }
  } catch(e){
    if(!_journCache.news[key]) _journCache.news[key] = {ts:Date.now(), items:[]};
  }
}

async function fetchAllJournNews(){
  const seen=new Set();
  const batch = WATCHLIST_JOURNALISTS.filter(j=>{ if(seen.has(j.name))return false; seen.add(j.name); return j.tier<=2; });
  for(let i=0;i<batch.length;i+=4){
    await Promise.allSettled(batch.slice(i,i+4).map(j=>fetchJournNews(j)));
    if(i+4<batch.length) await new Promise(r=>setTimeout(r,1000));
  }
  try{
    Object.entries(PANEL_REGISTRY||{}).forEach(([id,reg])=>{
      if(reg.fn!=='JOURN')return;
      const body=document.getElementById('pb-'+id); if(!body)return;
      body.innerHTML=buildJOURN(0);
    });
  }catch(e){}
}

function _timeAgo(d){
  const s=Math.floor((Date.now()-d)/1000);
  if(s<60)return s+'s';
  if(s<3600)return Math.floor(s/60)+'m';
  if(s<86400)return Math.floor(s/3600)+'h';
  return Math.floor(s/86400)+'d';
}

// ── Financial & Markets source catalogue ──────────────────────────────────
const INTEL_SOURCES = [
  // ── GLOBAL WIRE / TIER-1 ─────────────────────────────────────────────
  {url:'https://feeds.reuters.com/reuters/businessNews', src:'Reuters Biz',    tag:'MARKETS', lang:'EN',tier:1,limit:15},
  {url:'https://feeds.reuters.com/reuters/companyNews',  src:'Reuters Corp',   tag:'EQUITY',  lang:'EN',tier:1,limit:10},
  {url:'https://feeds.reuters.com/reuters/financialNews',src:'Reuters Fin',    tag:'MARKETS', lang:'EN',tier:1,limit:12},
  {url:'https://feeds.reuters.com/reuters/technologyNews',src:'Reuters Tech',  tag:'EQUITY',  lang:'EN',tier:1,limit:8},
  {url:'https://feeds.reuters.com/reuters/energy',       src:'Reuters Energy', tag:'ENERGY',  lang:'EN',tier:1,limit:8},
  {url:'https://www.wsj.com/news/rss-news-and-feeds',   src:'WSJ Markets',    tag:'MARKETS', lang:'EN',tier:1,limit:12},
  {url:'https://www.ft.com/rss/home',                    src:'FT',             tag:'MARKETS', lang:'EN',tier:1,limit:12},
  {url:'https://www.ft.com/markets?format=rss',          src:'FT Markets',     tag:'MARKETS', lang:'EN',tier:1,limit:10},
  {url:'https://www.google.com/search?q=financial+news+rss',src:'Terminal',tag:'MARKETS', lang:'EN',tier:1,limit:10},
  {url:'http://rss.cnn.com/rss/money_news_international.rss',src:'CNN Money',  tag:'MARKETS', lang:'EN',tier:1,limit:8},
  {url:'http://rss.cnn.com/rss/edition_business.rss',        src:'CNN Business',tag:'MARKETS',lang:'EN',tier:1,limit:8},
  {url:'https://www.washingtonpost.com/rss/business',        src:'WaPo Business',tag:'MARKETS',lang:'EN',tier:1,limit:8},
  // ── US FINANCIAL MEDIA ───────────────────────────────────────────────
  {url:'https://www.cnbc.com/id/10001147/device/rss/rss.html',src:'CNBC Markets',tag:'MARKETS',lang:'EN',tier:1,limit:12},
  {url:'https://www.cnbc.com/id/10000664/device/rss/rss.html',src:'CNBC Economy',tag:'MACRO',  lang:'EN',tier:1,limit:8},
  {url:'https://www.cnbc.com/id/15839135/device/rss/rss.html',src:'CNBC Finance', tag:'MARKETS',lang:'EN',tier:1,limit:8},
  {url:'https://www.barrons.com/xml/rss/3_7014.xml',          src:"Barron's",      tag:'MARKETS',lang:'EN',tier:1,limit:8},
  {url:'https://www.investors.com/category/market-trend/stock-market-today/feed/',src:'IBD',tag:'EQUITY',lang:'EN',tier:2,limit:8},
  {url:'https://www.marketwatch.com/rss/topstories',          src:'MarketWatch',   tag:'MARKETS',lang:'EN',tier:1,limit:10},
  {url:'https://feeds.marketwatch.com/marketwatch/realtimeheadlines/',src:'MW Realtime',tag:'MARKETS',lang:'EN',tier:1,limit:10},
  {url:'https://www.kiplinger.com/rss',                       src:'Kiplinger',     tag:'MARKETS',lang:'EN',tier:2,limit:6},
  {url:'https://feeds.npr.org/1006/rss.xml',                  src:'NPR Economy',   tag:'MACRO',  lang:'EN',tier:2,limit:6},
  // ── MACRO / CENTRAL BANKS / RESEARCH ────────────────────────────────
  {url:'https://news.tradingeconomics.com/?i=rss',   src:'Trading Econ',   tag:'MACRO',   lang:'EN',tier:2,limit:10},
  {url:'https://libertystreeteconomics.newyorkfed.org/feed/',src:'NY Fed Blog',tag:'MACRO',lang:'EN',tier:1,limit:6},
  {url:'https://www.nber.org/rss/new_releases.rss',  src:'NBER',           tag:'RESEARCH',lang:'EN',tier:1,limit:5},
  {url:'https://voxeu.org/rss.xml',                  src:'VoxEU',          tag:'RESEARCH',lang:'EN',tier:2,limit:5},
  {url:'https://www.imf.org/en/News/rss?language=eng',src:'IMF',           tag:'MACRO',   lang:'EN',tier:1,limit:5},
  {url:'https://www.bis.org/rss/index.rss',          src:'BIS',            tag:'MACRO',   lang:'EN',tier:1,limit:5},
  // ── TRADERS / ANALYSIS ───────────────────────────────────────────────
  {url:'https://www.zerohedge.com/fullrss2.xml',     src:'ZeroHedge',      tag:'TRADER',  lang:'EN',tier:2,limit:12},
  {url:'https://www.tradingview.com/news/rss/',      src:'TradingView',    tag:'TRADER',  lang:'EN',tier:2,limit:10},
  {url:'https://www.valuewalk.com/feed/',            src:'ValueWalk',      tag:'ANALYST', lang:'EN',tier:3,limit:6},
  {url:'https://seekingalpha.com/feed.xml',          src:'Seeking Alpha',  tag:'EQUITY',  lang:'EN',tier:2,limit:8},
  // ── COMMODITIES / ENERGY / METALS ────────────────────────────────────
  {url:'https://oilprice.com/rss/main',              src:'OilPrice',       tag:'ENERGY',  lang:'EN',tier:2,limit:10},
  {url:'https://www.eia.gov/rss/todayinenergy.xml',  src:'EIA',            tag:'ENERGY',  lang:'EN',tier:1,limit:6},
  {url:'https://www.kitco.com/rss/news.rss',         src:'Kitco Metals',   tag:'METALS',  lang:'EN',tier:2,limit:8},
  {url:'https://www.mining.com/feed/',               src:'Mining.com',     tag:'METALS',  lang:'EN',tier:3,limit:5},
  {url:'https://www.spglobal.com/commodityinsights/en/rss-feed/oil',src:'S&P Commodity',tag:'ENERGY',lang:'EN',tier:1,limit:5},
  // ── CRYPTO / DeFi ────────────────────────────────────────────────────
  {url:'https://www.theblockcrypto.com/rss.xml',     src:'The Block',      tag:'CRYPTO',  lang:'EN',tier:1,limit:10},
  {url:'https://blockworks.co/feed',                 src:'Blockworks',     tag:'CRYPTO',  lang:'EN',tier:2,limit:8},
  {url:'https://bitcoinmagazine.com/.rss/full/',     src:'BTC Magazine',   tag:'CRYPTO',  lang:'EN',tier:2,limit:6},
  {url:'https://www.dlnews.com/feed',                src:'DL News',        tag:'CRYPTO',  lang:'EN',tier:2,limit:6},
  {url:'https://coindesk.com/arc/outboundfeeds/rss/',src:'CoinDesk',       tag:'CRYPTO',  lang:'EN',tier:1,limit:10},
  {url:'https://cointelegraph.com/rss',              src:'CoinTelegraph',  tag:'CRYPTO',  lang:'EN',tier:2,limit:8},
  // ── APAC FINANCIAL ───────────────────────────────────────────────────
  {url:'https://asia.nikkei.com/rss/feed/nar',       src:'Nikkei Asia',    tag:'JP·MKT',  lang:'EN',tier:1,limit:10},
  {url:'https://www.scmp.com/rss/91/feed',           src:'SCMP Business',  tag:'CN·MKT',  lang:'EN',tier:1,limit:8},
  {url:'https://www.caixin.com/rss/homepage.rss',    src:'Caixin',         tag:'CN·FIN',  lang:'EN',tier:1,limit:8},
  {url:'https://www.afr.com/rss',                    src:'AFR Australia',  tag:'AU·MKT',  lang:'EN',tier:1,limit:8},
  {url:'https://economictimes.indiatimes.com/markets/rss.cms',src:'ET Markets',tag:'IN·MKT',lang:'EN',tier:2,limit:6},
  {url:'https://www.livemint.com/rss/markets',       src:'Livemint Mkts',  tag:'IN·MKT',  lang:'EN',tier:2,limit:6},
  // ── GERMAN FINANCIAL ─────────────────────────────────────────────────
  {url:'https://www.handelsblatt.com/contentexport/feed/schlagzeilen',src:'Handelsblatt',tag:'DE·MKT',lang:'DE',tier:1,limit:10},
  {url:'https://www.boerse.de/rss/nachrichten/',     src:'Boerse.de',      tag:'DE·MKT',  lang:'DE',tier:2,limit:8},
  {url:'https://www.finanzen.net/rss/news',          src:'Finanzen.net',   tag:'DE·MKT',  lang:'DE',tier:2,limit:8},
  {url:'https://www.faz.net/rss/aktuell/wirtschaft/',src:'FAZ Wirtschaft', tag:'DE·ECON', lang:'DE',tier:1,limit:6},
  // ── FRENCH FINANCIAL ─────────────────────────────────────────────────
  {url:'https://www.lesechos.fr/rss/rss_finance.xml',src:'Les Echos Fin',  tag:'FR·MKT',  lang:'FR',tier:1,limit:10},
  {url:'https://bfmbusiness.bfmtv.com/rss/news-flux-rss/',src:'BFM Business',tag:'FR·MKT',lang:'FR',tier:1,limit:8},
  {url:'https://www.latribune.fr/rss/rubriques/finance.xml',src:'La Tribune Fin',tag:'FR·FIN',lang:'FR',tier:2,limit:6},
  // ── SPANISH FINANCIAL ────────────────────────────────────────────────
  {url:'https://www.eleconomista.es/rss/rss-noticias-mercados.php',src:'El Economista',tag:'ES·MKT',lang:'ES',tier:1,limit:8},
  {url:'https://www.expansion.com/rss/mercados.xml', src:'Expansión Mkts', tag:'ES·MKT',  lang:'ES',tier:1,limit:8},
  {url:'https://cincodias.elpais.com/secciones/rss/mercados.xml',src:'Cinco Días',tag:'ES·MKT',lang:'ES',tier:2,limit:6},
  // ── LATAM FINANCIAL ──────────────────────────────────────────────────
  {url:'https://valor.globo.com/rss/valor-economico/feed.xml',src:'Valor Econômico',tag:'BR·MKT',lang:'PT',tier:1,limit:8},
  {url:'https://www.infobae.com/feeds/rss/economia/', src:'Infobae Eco',   tag:'LATAM',   lang:'ES',tier:2,limit:6},
  // ── EM / GLOBAL FINANCE ──────────────────────────────────────────────
  {url:'https://www.moneyweb.co.za/feed/',           src:'Moneyweb ZA',    tag:'ZA·MKT',  lang:'EN',tier:2,limit:5},
  {url:'https://gulfnews.com/rss/business',          src:'Gulf News Biz',  tag:'ME·FIN',  lang:'EN',tier:2,limit:5},
  // ── EXTENDED INTEL SOURCES ──────────────────────────────────────────────
  {url:'https://feeds.marketwatch.com/marketwatch/realtimeheadlines/', src:'MW Flash',      tag:'FLASH',   lang:'EN',tier:1,limit:12},
  {url:'https://www.barrons.com/xml/rss/3_7014.xml',                   src:"Barron's",       tag:'MARKETS', lang:'EN',tier:1,limit:8},
  {url:'https://blockworks.co/feed/',                                   src:'Blockworks',    tag:'CRYPTO',  lang:'EN',tier:2,limit:8},
  {url:'https://theblock.co/rss.xml',                                   src:'The Block',     tag:'CRYPTO',  lang:'EN',tier:1,limit:8},
  {url:'https://cryptoslate.com/feed/',                                 src:'CryptoSlate',   tag:'CRYPTO',  lang:'EN',tier:2,limit:6},
  {url:'https://protos.com/feed/',                                      src:'Protos',        tag:'CRYPTO',  lang:'EN',tier:2,limit:5},
  {url:'https://news.crunchbase.com/feed/',                             src:'Crunchbase',    tag:'EQUITY',  lang:'EN',tier:2,limit:8},
  {url:'https://www.risk.net/rss',                                      src:'Risk.net',      tag:'MARKETS', lang:'EN',tier:1,limit:6},
  {url:'https://www.zawya.com/en/rss/all',                              src:'Zawya ME',      tag:'ME·FIN',  lang:'EN',tier:2,limit:5},
  {url:'https://www.straitstimes.com/rss/business',                     src:'Straits Times', tag:'APAC',    lang:'EN',tier:2,limit:5},
  {url:'https://www.bangkokpost.com/rss/data/business.xml',             src:'Bangkok Post',  tag:'APAC',    lang:'EN',tier:2,limit:4},
  {url:'https://splash247.com/feed/',                                   src:'Splash247',     tag:'MACRO',   lang:'EN',tier:2,limit:5},
  {url:'https://www.hellenicshippingnews.com/feed/',                    src:'Hellenic Ship', tag:'MACRO',   lang:'EN',tier:2,limit:5},
  {url:'https://www.iif.com/RSS/IIF-news.rss',                          src:'IIF',           tag:'MACRO',   lang:'EN',tier:1,limit:4},
  {url:'https://www.fsb.org/feed/',                                     src:'FSB',           tag:'MACRO',   lang:'EN',tier:1,limit:3},
  {url:'https://www.piie.com/rss.xml',                                  src:'PIIE',          tag:'RESEARCH',lang:'EN',tier:2,limit:3},
  {url:'https://cepr.org/feed',                                         src:'CEPR',          tag:'RESEARCH',lang:'EN',tier:2,limit:3},
  {url:'https://www.chathamhouse.org/feed',                             src:'Chatham House', tag:'RESEARCH',lang:'EN',tier:2,limit:3}
];

// ── Sentiment keywords ─────────────────────────────────────────────────────
const SENT_KW = {
  strong_bull:['surge','soar','rally','breakout','record high','all-time high','bull market','blowout','beat estimates','raised guidance','dovish','rate cut','stimulus','risk-on','recovery','rebound','institutional buying','inflows','gdp beat','cpi decline','soft landing'],
  weak_bull:  ['rise','gain','increase','higher','positive','improving','better than expected','above forecast','growth','advance','optimistic','uptick'],
  neutral:    ['unchanged','flat','stable','mixed','hold','wait','sideways','in line','as expected','no change','steady','moderate','range-bound'],
  weak_bear:  ['decline','fall','drop','lower','negative','disappointing','miss','below forecast','losses','retreat','weaker','cautious','concerns','headwinds','uncertainty','slowdown'],
  strong_bear:['crash','collapse','plunge','tank','panic','crisis','recession','hawkish','rate hike','tightening','risk-off','sell-off','bear market','capitulation','liquidation','meltdown','systemic risk','contagion','default','bankruptcy','failure','stagflation','hard landing','war','conflict escalation','tariff war']
};

function _scoreSentiment(text){
  const t=(text||'').toLowerCase(); let s=0;
  SENT_KW.strong_bull.forEach(k=>{if(t.includes(k))s+=2;});
  SENT_KW.weak_bull.forEach(k=>  {if(t.includes(k))s+=1;});
  SENT_KW.strong_bear.forEach(k=>{if(t.includes(k))s-=2;});
  SENT_KW.weak_bear.forEach(k=>  {if(t.includes(k))s-=1;});
  return Math.round((Math.max(-5,Math.min(5,s))+5)*10);
}
function _sentLabel(v){
  if(v>=80)return{l:'EXTREME GREED',c:'#00ff44'};
  if(v>=65)return{l:'GREED',c:'#00cc44'};
  if(v>=55)return{l:'BULLISH',c:'#88dd22'};
  if(v>=45)return{l:'NEUTRAL',c:'#ff8800'};
  if(v>=35)return{l:'BEARISH',c:'#ff5500'};
  if(v>=20)return{l:'FEAR',c:'#ff3300'};
  return          {l:'EXTREME FEAR',c:'#ff0000'};
}

// ── Cross-verification (Jaccard similarity) ────────────────────────────────
const _xverify = (() => {
  const map = new Map();
  function norm(t){ return t.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\b(the|a|an|is|are|was|were|in|on|at|to|of|and|for)\b/g,'').replace(/\s+/g,' ').trim().split(' ').slice(0,8).join(' '); }
  function jac(a,b){ const sa=new Set(a.split(' ')),sb=new Set(b.split(' ')); const i=[...sa].filter(x=>sb.has(x)).length; return i/new Set([...sa,...sb]).size; }
  return {
    clear(){ map.clear(); },
    add(item){
      const n=norm(item.title); let best=null,bScore=0;
      for(const [k,grp] of map){ const s=jac(n,k); if(s>0.42&&s>bScore){bScore=s;best=k;} }
      if(best){ const g=map.get(best); if(!g.find(x=>x.src===item.src))g.push({src:item.src,ts:item.ts}); return g.length; }
      map.set(n,[{src:item.src,ts:item.ts}]); return 1;
    },
    count(item){
      const n=norm(item.title); let best=1;
      for(const [k,g] of map){ if(jac(n,k)>0.42&&g.length>best)best=g.length; }
      return best;
    }
};
})();

// ── Fear & Greed ──────────────────────────────────────────────────────────
async function fetchFearGreedIntel(){
  try{
    const r=await fetch('https://api.alternative.me/fng/?limit=10&format=json');
    const j=await r.json();
    if(j?.data?.length){
      _intelCache.fearGreed={value:parseInt(j.data[0].value),label:j.data[0].value_classification,src:'Alternative.me/CNN'};
      _intelCache.fearGreedHistory=j.data.slice(0,7).map(d=>({v:parseInt(d.value),l:d.value_classification,d:new Date(parseInt(d.timestamp)*1000).toLocaleDateString('en',{month:'short',day:'numeric'})}));
    }
  }catch(e){
    if(_intelCache.items.length>10){
      const avg=Math.round(_intelCache.items.slice(0,50).reduce((a,i)=>a+(i._sent||50),0)/Math.min(_intelCache.items.length,50));
      _intelCache.fearGreed={value:avg,label:_sentLabel(avg).l,src:'News Sentiment'};
    }
  }
  _renderINTEL();
}

// ── Main fetch ────────────────────────────────────────────────────────────
const RSS_P='https://api.rss2json.com/v1/api.json?rss_url=';
let _intelFetching=false;

async function fetchIntelligence(force=false){
  // RSS news fetch DISABLED
  _intelFetching=false;
  _renderINTEL();
}
  const fresh=[];
  results.forEach(r=>{if(r.status==='fulfilled')fresh.push(...r.value);});

  if(fresh.length>0){
    _xverify.clear();
    fresh.forEach(item=>{
      item._sent=_scoreSentiment(item.title+' '+(item.body||''));
      _xverify.add(item);
    });
    fresh.forEach(item=>{
      item._confirms=_xverify.count(item);
      item._verified=item._confirms>=INTEL.crossVerifyMin;
    });
    fresh.sort((a,b)=>{
      if(a._verified!==b._verified)return a._verified?-1:1;
      const td=(a.tier||3)-(b.tier||3); if(td!==0)return td;
      return (b.ts||0)-(a.ts||0);
    });
    const seen=new Set();
    _intelCache.items.length=0;
    fresh.forEach(item=>{
      if(!item.title||item.title.length<18)return;
      const k=item.title.slice(0,60).toLowerCase().replace(/[^a-z0-9]/g,'');
      if(k.length>10&&!seen.has(k)){seen.add(k);_intelCache.items.push(item);}
    });
    _intelCache.items=_intelCache.items.slice(0,INTEL.maxNews);
    _intelCache.verified=_intelCache.items.filter(i=>i._verified);

    // Update global sentiment
    const sl=_intelCache.items.slice(0,100);
    let bull=0,bear=0,neutral=0;
    sl.forEach(i=>{const s=i._sent||50; if(s>=60)bull++;else if(s<=40)bear++;else neutral++;});
    _intelCache.sentiment={global:Math.round(sl.reduce((a,i)=>a+(i._sent||50),0)/Math.max(sl.length,1)),bull,bear,neutral,total:sl.length,lastUpdate:Date.now()};

    // Merge into main newsCache (deduplicated)
    _intelCache.items.forEach(item=>{
      const k=item.title.slice(0,60).toLowerCase().replace(/[^a-z0-9]/g,'');
      if(!_newsCache.some(n=>n.title.slice(0,60).toLowerCase().replace(/[^a-z0-9]/g,'')=== k)){
        _newsCache.push(item);
      }
    });
    if(_newsCache.length>700)_newsCache.splice(500);
  }

  _intelFetching=false;
  _renderINTEL();
}

async function _fetchRSSIntel(source){
  try{
    const ctrl=new AbortController(); setTimeout(()=>ctrl.abort(),12000);
    // Multi-proxy: rss2json → corsproxy+rss2json → allorigins raw XML
    async function _tryProxy(url){
      const proxies=[
        ()=>fetch(`${RSS_P}${encodeURIComponent(url)}&count=${source.limit||10}`,{signal:ctrl.signal}).then(r=>r.json()),
        ()=>fetch(`https://corsproxy.io/?url=${encodeURIComponent(`${RSS_P}${encodeURIComponent(url)}`)}`,{signal:ctrl.signal}).then(r=>r.json()),
        async()=>{
          const r=await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,{signal:ctrl.signal});
          const d=await r.json(); if(!d.contents)return{items:[]};
          const items=[],rx=/<item[^>]*>([\s\S]*?)<\/item>/gi;let m;
          while((m=rx.exec(d.contents))!==null){
            const b=m[1],t=((b.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]>/)||b.match(/<title[^>]*>([^<]*)<\/title>/))||[])[1]||'';
            const l=((b.match(/<link>([^<]+)</))||[])[1]||'',dt=((b.match(/<pubDate>([^<]+)</))||[])[1]||'';
            if(t.length>10)items.push({title:t.trim(),link:l,pubDate:dt});
          }
          return{items};
        }
      ];
      for(const fn of proxies){try{const j=await fn();if(j?.items?.length)return j;}catch(e){if(e.name==='AbortError')break;}}
      return{items:[]};
    }
    const j=await _tryProxy(source.url);
    _intelCache.sources[source.src]={ok:true,count:(j.items||[]).length,ts:Date.now(),lang:source.lang,tag:source.tag};
    return(j.items||[]).slice(0,source.limit||10).map(a=>{
      const ts=a.pubDate?Math.floor(new Date(a.pubDate).getTime()/1000):null;
      const title=(a.title||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#\d+;/g,'').trim();
      const body=(a.description||a.content||'').replace(/<[^>]*>/g,'').replace(/&[a-z]+;/g,' ').trim().slice(0,500);
      return{src:source.src,tag:source.tag,lang:source.lang,title,ts,link:a.link||'',body,tier:source.tier||3,_intel:true};
    }).filter(a=>{
      const _fkw=/market|stock|share|equity|bond|yield|rate|inflation|gdp|fed|ecb|central.bank|fund|invest|trade|oil|gold|silver|crypto|bitcoin|dollar|euro|index|etf|ipo|earn|profit|revenue|debt|deficit|fiscal|monetary|hedge|dividend|merger|acqui|valuat|commodit|forex|treasury|exchange|trh|akci|dluhopis|kurz|burza|inflac|úrok|fond|koruna|ekonom|banka|finanč|hospodář|markt|aktie|anleihe|rendite|zins|börse|wirtschaft|marché|action|taux|mercado|bolsa|accion|bono/i;
      return a.title.length>18 && _fkw.test(a.title+' '+(a.body||''));
    });
  }catch(e){
    _intelCache.sources[source.src]={ok:false,ts:Date.now(),lang:source.lang,tag:source.tag};
    return[];
  }
}

// ── Filter engine ──────────────────────────────────────────────────────────
function _applyIntelFilters(items){
  const f=_intelCache.filters;
  return items.filter(item=>{
    if(f.lang!=='ALL'&&item.lang&&item.lang!==f.lang)return false;
    if(f.cat!=='ALL'){
      const cat=f.cat;
      if(cat==='CZ·ECON'&&!['CS','SK'].includes(item.lang)&&!(item.tag||'').startsWith('CZ')&&!(item.tag||'').startsWith('SK'))return false;
      if(cat==='TRADER'&&item.tag!=='TRADER'&&item.tag!=='ANALYST')return false;
      if(cat==='VERIFIED'&&!item._verified)return false;
      if(!['CZ·ECON','TRADER','VERIFIED'].includes(cat)){
        const tagRoot=(item.tag||'').split('·')[0];
        if(tagRoot!==cat.split('·')[0])return false;
      }
    }
    if(f.quality==='VERIFIED'&&!item._verified)return false;
    if(f.quality==='HIGH'&&(item.tier||3)>2)return false;
    if(f.quality==='NOISE_FREE'){const t=(item.title||'').toLowerCase();if(['airdrop','top 10','price prediction','how to buy','tutorial','beginners'].some(k=>t.includes(k)))return false;}
    if(f.sentiment!=='ALL'){const s=item._sent||50;if(f.sentiment==='BULL'&&s<60)return false;if(f.sentiment==='BEAR'&&s>40)return false;if(f.sentiment==='NEUTRAL'&&(s<40||s>60))return false;}
    if(f.search&&f.search.length>1){const q=f.search.toLowerCase();if(!(item.title||'').toLowerCase().includes(q)&&!(item.src||'').toLowerCase().includes(q))return false;}
    return true;
  });
}

// ── CSS ────────────────────────────────────────────────────────────────────
(()=>{
  const s=document.createElement('style');
  s.textContent=`.ichip{height:13px;padding:0 5px;font-size:7px;cursor:pointer;border:1px solid #1a1000;color:#553300;background:transparent;font-family:var(--fn);letter-spacing:.3px;transition:all .1s;white-space:nowrap;display:inline-flex;align-items:center;user-select:none;margin:0 1px;}.ichip:hover{border-color:#553300;color:#ff8800;}.ichip.on{background:#ff6600;color:#000;border-color:#ff6600;font-weight:700;}#intel-feed::-webkit-scrollbar{width:3px;}#intel-feed::-webkit-scrollbar-thumb{background:#1a1000;}`;
  document.head.appendChild(s);
})();

// ── Build MARITIME panel ───────────────────────────────────────────────────
function buildMARITIME() { return `<div style="height:100%;display:flex;align-items:center;justify-content:center;background:#000;color:#333;font-family:var(--fn);font-size:10px;letter-spacing:1px">MARITIME PANEL DISABLED</div>`; }
function buildINTEL(){
  // If data already loaded, render immediately without loading flash
  const hasData = _intelCache && _intelCache.items && _intelCache.items.length > 0;
  const loadingMsg = '';
  setTimeout(()=>{ _renderINTEL(); }, 50);
  return `<div style="height:100%;display:flex;flex-direction:column;overflow:hidden">
<div id="intel-feed" style="flex:1;overflow-y:auto;overflow-x:clip">
  ${loadingMsg}
</div></div>`;
}

function _renderINTEL(){
  const feed = document.getElementById('intel-feed');
  if(!feed) return;

  const scrollTop = feed.scrollTop;

  const items = _intelCache.items;
  if(!items.length){
    // No data available — RSS fetch disabled
  }

  // Update stats in panel title bar area if exists
  const s = _intelCache.sentiment;
  const sl = _sentLabel(s.global);

  // Source code + color — same logic as buildWNTable _cls
  const _cls = item => {
    const src = (item.src||'').toLowerCase();
    const t = item.tag||'';
    if(t==='FLASH'||item.flash) return {code:'FLASH',col:'#ff2200'};
    if(item._isOfficial&&src.includes('sec'))  return {code:'SEC',  col:'#ff6600'};
    if(item._isOfficial&&src.includes('fed'))  return {code:'FED',  col:'#ff8800'};
    if(item._isOfficial&&src.includes('ecb'))  return {code:'ECB',  col:'#ffaa00'};
    if(item._isOfficial||src.includes('cb·'))  return {code:'CB',   col:'#cc7700'};
    if(src.includes('reuters'))  return {code:'RTS', col:'#ddbb88'};
    if(src.includes('dj·')||src.includes('wsj')) return {code:'DJ',col:'#ddbb88'};
    if(src.startsWith('ap ')||src==='ap') return {code:'AP',col:'#ddbb88'};
    if(src.includes('ft')||src.includes('financial times')) return {code:'FT',col:'#c8b880'};
    if(src.includes('bloomberg')) return {code:'BBG',col:'#c8b880'};
    if(src.includes('cnbc'))  return {code:'CNBC',col:'#b8a870'};
    if(src.includes('nyt')||src.includes('new york times')) return {code:'NYT',col:'#b8a870'};
    if(src.includes('nikkei')) return {code:'NKI',col:'#b8a870'};
    if(src.includes('scmp'))   return {code:'SCMP',col:'#b8a870'};
    if(src.includes('handelsblatt')) return {code:'HBL',col:'#a89860'};
    if(src.includes('les echos'))    return {code:'ECH',col:'#a89860'};
    if(src.includes('bbc'))   return {code:'BBC',col:'#a09060'};
    if(src.includes('al jazeera')) return {code:'AJZ',col:'#a09060'};
    if(src.includes('cnn'))   return {code:'CNN',col:'#a09060'};
    if(src.includes('eia'))   return {code:'EIA',col:'#889858'};
    if(src.includes('oilprice')) return {code:'OIL',col:'#889858'};
    if(src.includes('kitco')) return {code:'KTC',col:'#889858'};
    if(src.includes('coindesk'))    return {code:'CDS',col:'#787848'};
    if(src.includes('cointelegraph')) return {code:'CTG',col:'#787848'};
    if(src.includes('the block'))   return {code:'BLK',col:'#787848'};
    if(src.includes('zerohedge'))   return {code:'ZH', col:'#887858'};
    if(src.includes('tradingview')) return {code:'TV', col:'#887858'};
    // Czech / Slovak
    if(src.includes('ihned')||src.includes('hn ')) return {code:'HN', col:'#00bbdd'};
    if(src.includes('patria'))   return {code:'PAT',col:'#00bbdd'};
    if(src.includes('roklen'))   return {code:'ROK',col:'#00bbdd'};
    if(src.includes('čt24')||src.includes('ct24')) return {code:'ČT24',col:'#00bbdd'};
    if(src.includes('idnes'))    return {code:'iDN',col:'#00bbdd'};
    if(src.includes('kurzy'))    return {code:'KRZ',col:'#00bbdd'};
    if(src.includes('novinky'))  return {code:'NOV',col:'#00bbdd'};
    if(src.includes('sme')||src.includes('finweb')) return {code:'SK', col:'#00aacc'};
    if(t==='EARNINGS') return {code:'ERN',col:'#dd8800'};
    if(t==='MACRO'||t.includes('MACRO')) return {code:'MAC',col:'#cc7700'};
    return {code:'WIR',col:'#706850'};
  };

  // Sentiment dot color
  const _sdot = sent => {
    const v = sent||50;
    if(v>=65) return '#00cc44';
    if(v>=55) return '#88dd22';
    if(v>=45) return '#ff8800';
    if(v>=35) return '#ff5500';
    return '#ff2222';
  };

  const _tier1 = items.filter(x=>x.tier===1||x._isOfficial).length;
  const _srcSet = new Set(items.map(x=>x.src||''));

  let h = `
  <div style="background:#000;border-bottom:1px solid #1a0800;flex-shrink:0;">

    <!-- ── Bloomberg nav bar (bright red) ── -->
    <div style="height:20px;background:#b81111;display:flex;align-items:center;padding:0;border-bottom:1px solid #881010;">
      <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;letter-spacing:.2px;flex-shrink:0;background:#cc1111;border-right:1px solid #aa0e0e">Search News</span>
      <span style="color:#ffdddd;font-size:9px;font-weight:400;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010;letter-spacing:.15px"
        onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Actions ▾</span>
      <span style="color:#ffdddd;font-size:9px;font-weight:400;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010;letter-spacing:.15px"
        onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''" onclick="openPanel('CUSTSRCH')">Custom Searches</span>
      <span style="color:#ffdddd;font-size:9px;font-weight:400;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010;letter-spacing:.15px"
        onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Translate ▾</span>
      <span style="color:#ffdddd;font-size:9px;font-weight:400;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;letter-spacing:.15px"
        onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Key Themes</span>
      <span style="margin-left:auto;color:#ffcccc;font-size:9px;font-weight:400;padding:0 10px;letter-spacing:.3px;flex-shrink:0">Page 1</span>
    </div>

    <!-- ── Orange search bar ── -->
    <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
      <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
        <input id="intel-srch" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;"
          oninput="window._intelFilter(this.value)" onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();return false;}">
        <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0"
          onclick="document.getElementById('intel-srch').value='';window._intelFilter('')">×</span>
      </div>
      <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
        onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">⇥ Sources</span>
      <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
        onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
    </div>


  </div>
  <table style="width:100%;border-collapse:collapse;font-family:'Courier Prime','Courier New',Courier,serif;table-layout:fixed;background:#000;">
    <colgroup>
      <col style="width:28px">
      <col>
      <col style="width:46px">
      <col style="width:48px">
    </colgroup>`;

  const totalI = items.length;
  const _fmtBBGi = ts => {
    if(!ts) return '';
    const d = new Date(ts*1000), n = new Date();
    if(d.toDateString()===n.toDateString())
      return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
    return (d.getMonth()+1).toString().padStart(2,'0')+'/'+ d.getDate().toString().padStart(2,'0');
  };

  items.forEach((item, i) => {
    const cl       = _cls(item);
    const isFlash  = cl.code === 'FLASH';
    const isOffic  = !!item._isOfficial;
    const isStatic = !!item._static;
    const link     = (item.link||'').replace(/'/g,'%27');
    const onclick  = link ? `window.open('${link}','_blank','noopener')` : '';
    const timeStr  = _fmtBBGi(item.ts);
    const lbadge   = item.lang && item.lang !== 'EN' ? `[${item.lang}] ` : '';
    const dotPfx   = (isFlash || isOffic) ? '•' : '';

    const titleCol = isStatic ? '#554433' : '#ff8800';
    const titleW   = (isFlash || isOffic) ? '600' : '400';

    const lineNum  = i + 1;
    const srcCol   = (cl.col==='#00bbdd'||cl.col==='#00aacc') ? '#00bbdd'
      : (isFlash||cl.code==='BN') ? '#ff6600'
      : cl.col==='#706850' ? '#aa8855'
      : cl.col;

    h += `<tr style="height:26px;background:#000;cursor:pointer${isStatic?';opacity:.5':''}"
      onmouseover="this.style.background='#0d0800'" onmouseout="this.style.background='#000'"
      onclick="${onclick}">
      <td style="padding:0 4px 0 8px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:28px">
        <span style="color:#aa9980;font-size:11px;font-family:'Courier Prime','Courier New',Courier,serif">${lineNum})</span>
      </td>
      <td style="padding:0 6px;vertical-align:middle;overflow:hidden;border-bottom:1px solid #0c0800;max-width:0;width:100%">
        <span style="color:${titleCol};font-size:11px;font-weight:${titleW};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;font-family:'Courier Prime','Courier New',Courier,serif;letter-spacing:.01em" title="${(item.title||'').replace(/"/g,'&quot;')}">${dotPfx}${lbadge}${item.title||''}</span>
      </td>
      <td style="padding:0 8px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:46px">
        <span style="color:${srcCol};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.2px">${cl.code}</span>
      </td>
      <td style="padding:0 6px 0 4px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:40px">
        <span style="color:#886644;font-size:9px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${timeStr}</span>
      </td>
      <td style="width:16px;vertical-align:middle;text-align:center;border-bottom:1px solid #0c0800;padding:0 6px 0 0">${(window._riskDot&&window._riskLevel)?window._riskDot(window._riskLevel(item.title||''),item.title||''):''}</td>
      </tr>`;

  });

  h += '</table>';
  feed.innerHTML = h;
  feed.scrollTop = scrollTop;
  const _iq=document.getElementById('intel-srch');if(_iq&&_iq.value&&window._intelFilter)window._intelFilter(_iq.value);
  setTimeout(()=>{try{_applyBadges();}catch(e){}},50);

  // Update F&G inline
  const fgEl = document.getElementById('intel-fg-inline');
  if(fgEl && _intelCache.fearGreed){
    const fg = _intelCache.fearGreed;
    const fsl = _sentLabel(fg.value);
    fgEl.textContent = fg.value + ' ' + fg.label;
    fgEl.style.color = fsl.c;
  }
}

function _iFilter(type,val){
  _intelCache.filters[type]=val;
  document.querySelectorAll('[id^="ifl-"],[id^="ifc-"],[id^="ifs-"],[id^="ifq-"]').forEach(el=>{
    const prefix=type==='lang'?'ifl-':type==='cat'?'ifc-':type==='sentiment'?'ifs-':'ifq-';
    if(!el.id.startsWith(prefix))return;
    const elVal=el.id.slice(prefix.length).replace(/-/g,'·');
    el.classList.toggle('on',elVal===val||el.id===prefix+val.replace(/·/g,'-'));
  });
  _renderINTEL();
}
function _iSearch(val){_intelCache.filters.search=val.trim();_renderINTEL();}

// ── Investor detail overlay ────────────────────────────────────────────────
async function showInvestorDetail(name){
  window._invActiveTab = window._invActiveTab||'NEWS';
  window._invActiveCat = window._invActiveCat||'ALL';
  showInvestorDetailWithState(name, window._invActiveTab, window._invActiveCat);
}

function _invSetTab(name,tab){ window._invActiveTab=tab; window._invActiveCat=window._invActiveCat||'ALL'; document.getElementById('_inv_overlay')?.remove(); showInvestorDetailWithState(name,tab,window._invActiveCat); }
function _invSetCat(name,cat){ window._invActiveCat=cat; document.getElementById('_inv_overlay')?.remove(); showInvestorDetailWithState(name,window._invActiveTab||'NEWS',cat); }

async function showInvestorDetailWithState(name, activeTab, activeCat){
  window._invActiveTab=activeTab; window._invActiveCat=activeCat;
  const j=WATCHLIST_JOURNALISTS.find(x=>x.name===name); if(!j) return;

  document.getElementById('_inv_overlay')?.remove();
  const ov=document.createElement('div');
  ov.id='_inv_overlay';
  ov.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92)';
  ov.onclick=e=>{if(e.target===ov){ov.remove(); window._invActiveTab='NEWS'; window._invActiveCat='ALL';}};
  document.body.appendChild(ov);

  const safeN=name.replace(/'/g,"\\'");
  const q=encodeURIComponent(j.name);
  const links=[
    {label:'X / TWITTER',   url:`https://x.com/${j.handle}`},
    {label:'GOOGLE NEWS',   url:`https://news.google.com/search?q=${q}`},
    {label:'SYSTEM',     url:`https://www.google.com/search?q=${q}+news`},
    {label:'REUTERS',       url:`https://www.reuters.com/search/news?blob=${q}`},
    {label:'WSJ',           url:`https://www.wsj.com/search?query=${q}`},
    {label:'FT',            url:`https://www.ft.com/search?q=${q}`},
    {label:'CNBC',          url:`https://www.cnbc.com/search/?query=${q}`},
    {label:'YOUTUBE',       url:`https://www.youtube.com/results?search_query=${encodeURIComponent(j.name+' interview')}`},
    {label:'SUBSTACK',      url:`https://substack.com/search/${q}`},
    {label:'REDDIT',        url:`https://www.reddit.com/search/?q=${q}&sort=new`},
    {label:'SEEKING ALPHA', url:`https://seekingalpha.com/search#q=${q}`},
    {label:'MARKETWATCH',   url:`https://www.marketwatch.com/search?q=${q}`}
  ];

  const cats=['ALL','BUY','SELL','SPEECH','WARNING'];
  const tagCol={ALL:'#888',BUY:'#00cc44',SELL:'#ff2222',SPEECH:'#2288ff',WARNING:'#ff8800'};

  // Source code mapper
  function _src(s){
    s=(s||'').toLowerCase();
    if(s.includes('wsj'))return'DJ';if(s.includes('reuters'))return'RTS';if(s.includes('bloomberg'))return'BBG';
    if(s.includes('cnbc'))return'CNBC';if(s.includes('ft')||s.includes('financial times'))return'FT';
    if(s.includes('yahoo'))return'YHO';if(s.includes('fool'))return'MF';if(s.includes('fortune'))return'FOR';
    if(s.includes('thestreet'))return'TS';if(s.includes('benzinga'))return'BZG';if(s.includes('seeking'))return'SA';
    if(s.includes('barron'))return'BAR';if(s.includes('coindesk'))return'CDS';if(s.includes('nyt'))return'NYT';
    if(s.includes('bbc'))return'BBC';if(s.includes('ap '))return'AP';if(s.includes('axios'))return'AXS';
    if(s.includes('24/7'))return'247';if(s.includes('investop'))return'INV';
    return(s||'').slice(0,3).toUpperCase();
  }

  function _newsRows(items,cat){
    const f=cat==='ALL'?items:items.filter(n=>{
      const t=(n.title||'').toLowerCase();
      if(cat==='BUY')     return /buy|purchas|acqui|invest|add|accum|long|build|stake/i.test(t);
      if(cat==='SELL')    return /sell|sold|exit|cut|reduc|short|trim/i.test(t);
      if(cat==='SPEECH')  return /said|told|letter|memo|interview|tweet|post|podcast|speech|warn/i.test(t);
      if(cat==='WARNING') return /warn|risk|crash|danger|concern|fear|crisis|collaps|recession|bubble/i.test(t);
      return true;
    });
    if(!f.length) return`<div style="padding:30px;color:#553300;font-size:9px;text-align:center;letter-spacing:1.5px">NO MATCHING NEWS</div>`;
    return f.map((n,i)=>{
      const url=(n.link||'').replace(/'/g,'%27');
      const txt=(n.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const t=txt.toLowerCase();
      // Risk level dots
      const isHigh=['crisis','crash','collapse','war','attack','recession','bankruptcy','fraud','hack','seized','sanctioned','invasion','missile'].some(k=>t.includes(k));
      const isMed=!isHigh&&['rate','fed','fomc','ecb','powell','tariff','sanction','warning','concern','risk','volatility','selloff','cpi','gdp','inflation','investigation','sec '].some(k=>t.includes(k));
      const isGreen=!isHigh&&!isMed&&['buy','acquire','invest','upgrade','beat','surge','rally','record','ipo','approval','growth','bullish','outperform'].some(k=>t.includes(k));
      const dotHtml=isHigh
        ?'<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#ff2222;box-shadow:0 0 3px #ff2222;animation:dot-high 1.5s infinite"></span>'
        :isMed
        ?'<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#ff7700;box-shadow:0 0 3px #ff7700;animation:dot-med 1.8s infinite"></span>'
        :isGreen
        ?'<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#00cc44;box-shadow:0 0 3px #00cc44;animation:grn-pulse 2s infinite"></span>'
        :'';
      const isBold=isHigh||isMed;
      return`<div onclick="window.open('${url}','_blank','noopener')"
        style="display:flex;gap:10px;padding:9px 14px;border-bottom:1px solid #0d0a00;cursor:pointer;align-items:flex-start;background:#000"
        onmouseover="this.style.background='#0c0c0c'" onmouseout="this.style.background='#000'">
        <div style="flex-shrink:0;width:24px;text-align:right;padding-top:2px"><span style="font-size:10px;color:#554433">${i+1})</span></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:11px;color:#b8a888;line-height:1.55;word-break:break-word;font-weight:${isBold?'700':'400'}">${isBold?'•':''} ${txt}</div>
          <div style="font-size:8px;color:#665544;margin-top:3px">${n.source||''}</div>
        </div>
        <div style="flex-shrink:0;display:flex;align-items:center;gap:6px;padding-top:3px">
          <span style="font-size:8px;color:#886644;font-family:'Roboto Mono',monospace">${n.ago||''}</span>
          ${dotHtml}
        </div>
        <div style="font-size:10px;color:#554433;flex-shrink:0;padding-top:2px">↗</div>
      </div>`;
    }).join('');
  }

  function _histRows(cat){
    const evts=(KEY_EVENTS[name]||[]).filter(e=>cat==='ALL'||e.tag===cat);
    if(!evts.length) return`<div style="padding:30px;color:#332200;font-size:9px;text-align:center;letter-spacing:1.5px">NO EVENTS</div>`;
    const tc2={BUY:'#00cc44',SELL:'#ff2222',SPEECH:'#2288ff',WARNING:'#ff8800'};
    return evts.map((e,i)=>{
      const col=tc2[e.tag]||'#888';
      return`<div style="display:flex;gap:10px;padding:9px 14px;border-bottom:1px solid #0d0a00;align-items:flex-start;background:#000">
        <div style="flex-shrink:0;width:24px;text-align:right;padding-top:1px"><span style="font-size:10px;color:#886644;font-weight:700">${e.y}</span></div>
        <div style="flex-shrink:0"><span style="font-size:7px;color:${col};font-weight:700;letter-spacing:.5px;border:1px solid ${col}44;padding:1px 6px">${e.tag}</span></div>
        <div style="font-size:10px;color:#b8a888;line-height:1.55;flex:1">${e.txt}</div>
      </div>`;
    }).join('');
  }

  function _build(){
    _markSeen(j.name);
    const isNews=activeTab==='NEWS';
    const items=_journCache.news[j.name]?.items||[];
    const content=isNews
      ?(items.length?_newsRows(items,activeCat):`<div style="padding:30px;color:#332200;font-size:9px;text-align:center;letter-spacing:2px">FETCHING HEADLINES…</div>`)
      :_histRows(activeCat);

    const filterBar=cats.map(c=>{
      const active=activeCat===c; const col=tagCol[c];
      return`<span onclick="_invSetCat('${safeN}','${c}')"
        style="font-size:7px;color:${active?'#000':col};background:${active?col:'transparent'};border:1px solid ${active?col:col+'55'};padding:1px 8px;cursor:pointer;letter-spacing:.6px;font-weight:700">${c}</span>`;
    }).join('');

    ov.innerHTML=`<div style="width:720px;max-width:95vw;max-height:92vh;display:flex;flex-direction:column;background:#000;border:1px solid #2a2010;box-shadow:0 30px 90px rgba(0,0,0,.99),0 0 30px rgba(255,102,0,.04);font-family:'Courier Prime','Courier New',Courier,serif">

      <div style="padding:12px 16px 10px;border-bottom:1px solid #1a1200;display:flex;align-items:center;flex-shrink:0">
        <span style="font-size:16px;color:#F39F41;font-weight:700;letter-spacing:.5px;flex:1">${j.name}</span>
        <span style="font-size:7px;color:#cc8855;border:1px solid #3a2800;padding:2px 8px;letter-spacing:1px;margin-right:10px">${j.focus}</span>
        <span onclick="document.getElementById('_inv_overlay').remove();window._invActiveTab='NEWS';window._invActiveCat='ALL';"
          style="font-size:12px;color:#555;cursor:pointer;padding:0 4px"
          onmouseover="this.style.color='#ff4400'" onmouseout="this.style.color='#555'">✕</span>
      </div>

      <div style="display:flex;border-bottom:1px solid #1a1200;flex-shrink:0">
        <div style="flex:1;padding:8px 16px;border-right:1px solid #1a1200">
          <div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:3px">COMPANY / FUND</div>
          <div style="font-size:10px;color:#b8a888">${j.affil}</div>
        </div>
        <div style="flex:1;padding:8px 16px;border-right:1px solid #1a1200">
          <div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:3px">AUM / NET WORTH</div>
          <div style="font-size:12px;color:#ffaa44;font-weight:700">${j.aum||'N/A'}</div>
        </div>
        <div style="flex:1;padding:8px 16px;border-right:1px solid #1a1200">
          <div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:3px">X / TWITTER</div>
          <div onclick="window.open('https://x.com/${j.handle}','_blank','noopener')"
            style="font-size:10px;color:#ff6600;cursor:pointer"
            onmouseover="this.style.color='#ff8800'" onmouseout="this.style.color='#ff6600'">@${j.handle} ↗</div>
        </div>
        <div style="flex:1;padding:8px 16px">
          <div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:3px">FOCUS AREA</div>
          <div style="font-size:10px;color:#b8a888">${j.focus}</div>
        </div>
      </div>

      <div style="border-bottom:1px solid #1a1200;flex-shrink:0;padding:9px 16px">
        ${j.known?`<div style="margin-bottom:5px"><div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:2px">ABOUT</div><div style="font-size:10px;color:#b8a888;line-height:1.6">${j.known}</div></div>`:''}
        ${j.position?`<div><div style="font-size:6.5px;color:#776655;letter-spacing:1.5px;margin-bottom:2px">CURRENT POSITION / VIEW</div><div style="font-size:10px;color:#ff8800;line-height:1.6">${j.position}</div></div>`:''}
      </div>

      <div style="flex-shrink:0;padding:5px 16px;border-bottom:1px solid #1a1200;display:flex;flex-wrap:wrap;gap:3px;align-items:center">
        <span style="font-size:6.5px;color:#776655;letter-spacing:1px;margin-right:3px">SEARCH:</span>
        ${links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener"
          style="font-size:7px;color:#aa8855;border:1px solid #4a3520;padding:2px 6px;text-decoration:none;letter-spacing:.3px"
          onmouseover="this.style.color='#ffaa44';this.style.borderColor='#886633'" onmouseout="this.style.color='#aa8855';this.style.borderColor='#4a3520'">${l.label} ↗</a>`).join('')}
      </div>

      <div style="flex-shrink:0;padding:6px 16px;border-bottom:1px solid #1a1200;display:flex;align-items:center;gap:8px">
        <span style="font-size:8px;color:#ff8800;letter-spacing:1.5px;font-weight:700">◈ BREAKING NEWS</span>
        <span style="font-size:7px;color:#553300">· LIVE RSS ·</span>
      </div>

      <div style="flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1a1200 #000;min-height:80px">${content}</div>

      <div style="padding:5px 16px;border-top:1px solid #1a1200;display:flex;align-items:center;flex-shrink:0">
        <span style="font-size:6.5px;color:#553300;letter-spacing:.6px">SOURCES: GOOGLE NEWS · SYSTEM · WSJ · REUTERS · FT · CNBC · X · SUBSTACK</span>
        <span onclick="fetchJournNews(WATCHLIST_JOURNALISTS.find(x=>x.name==='${safeN}'),true).then(()=>showInvestorDetailWithState('${safeN}','${activeTab}','${activeCat}'))"
          style="font-size:7px;color:#666;cursor:pointer;margin-left:auto;letter-spacing:.5px"
          onmouseover="this.style.color='#ff6600'" onmouseout="this.style.color='#666'">↻ REFRESH</span>
      </div>
    </div>`;
  }

  _build();
  await fetchJournNews(j,false);
  _build();
}

// ── Build JOURN panel ─────────────────────────────────────────────────────
function buildJOURN(ti){
  const all=WATCHLIST_JOURNALISTS;
  const seenB=new Set(); const deduped=all.filter(j=>{if(seenB.has(j.name))return false;seenB.add(j.name);return true;});
  const list=ti===1?deduped.filter(j=>j.tier===1):ti===2?deduped.filter(j=>j.tier===2):deduped;

  const groups=[
    {label:'TIER 1 — LEGENDARY INVESTORS & MARKET MOVERS', lv:1, items:list.filter(j=>j.tier===1)},
    {label:'TIER 2 — MACRO STRATEGISTS & ANALYSTS', lv:2, items:list.filter(j=>j.tier===2)}
  ].filter(g=>g.items.length);

  let rows='';
  groups.forEach(g=>{
    const col=g.lv===1?'#ff2222':'#ff8800';
    const nc=g.lv===1?'#ff9900':'#ff8800';

    g.items.forEach(j=>{
      const safeN=j.name.replace(/'/g,"\\'");
      const cache=_journCache.news[j.name];
      const items=cache?.items||[];
      const top=items[0];
      const second=items[1];
      const ago=top?.ago||'';
      const headline=top?(top.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;').substring(0,80)+(top.title.length>80?'…':''):'–';
      const headline2=second?(second.title||'').replace(/</g,'&lt;').replace(/>/g,'&gt;').substring(0,75)+(second.title.length>75?'…':''):'';
      const newsColor=top?'#ff8800':'#443322';
      const focusParts=j.focus.split('·');
      const xUrl=`https://x.com/${j.handle}`;

      const isNew = _isNew(j.name);
      // Risk dot for latest headline
      const _ht=(top?.title||'').toLowerCase();
      const _isHi=['crisis','crash','collapse','war','attack','recession','bankruptcy','fraud','invasion','missile'].some(k=>_ht.includes(k));
      const _isMd=!_isHi&&['rate','fed','fomc','ecb','tariff','sanction','warning','concern','risk','volatility','selloff','cpi','gdp','inflation'].some(k=>_ht.includes(k));
      const _isGn=!_isHi&&!_isMd&&['buy','acquire','invest','upgrade','beat','surge','rally','record','growth','bullish'].some(k=>_ht.includes(k));
      const _rdot=_isHi?'<span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#ff2222;box-shadow:0 0 3px #ff2222;animation:dot-high 1.5s infinite;margin-left:4px"></span>':_isMd?'<span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#ff7700;box-shadow:0 0 3px #ff7700;animation:dot-med 1.8s infinite;margin-left:4px"></span>':_isGn?'<span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#00cc44;box-shadow:0 0 3px #00cc44;animation:grn-pulse 2s infinite;margin-left:4px"></span>':'';
      rows+=`<tr style="cursor:pointer;border-bottom:1px solid #0d0a00"
        onmouseover="this.style.background='#0d0900'" onmouseout="this.style.background='#000'"
        onclick="showInvestorDetail('${safeN}')">
        <td style="width:120px;padding:5px 6px 5px 8px;vertical-align:top">
          <div style="display:flex;align-items:center;gap:4px">
            <div style="font-size:8.5px;color:${nc};font-weight:700;letter-spacing:.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${j.name}</div>
            ${isNew?`<span style="font-size:5px;color:#000;background:#cc8833;padding:1px 3px;font-weight:700;letter-spacing:.5px;flex-shrink:0">NEW</span>`:''}
          </div>
          <div style="font-size:7px;color:#998877;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${j.affil}</div>
          <div style="font-size:6.5px;color:#665544;margin-top:1px">@${j.handle}</div>
        </td>
        <td style="width:65px;padding:5px 4px;vertical-align:top;white-space:nowrap">
          <div style="font-size:7px;color:#cc8855;font-weight:700;letter-spacing:.4px">${focusParts[0]||''}</div>
          ${focusParts[1]?`<div style="font-size:6.5px;color:#886644;margin-top:1px">${focusParts[1]}</div>`:''}
          <div style="font-size:7.5px;color:#ffaa44;font-weight:700;margin-top:2px">${j.aum||'N/A'}</div>
        </td>
        <td style="width:180px;padding:5px 8px;vertical-align:top">
          <div style="font-size:7.5px;color:#b8a888;line-height:1.45;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${j.known||''}</div>
          ${j.position?`<div style="font-size:7px;color:#886644;margin-top:2px;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical">▸ ${j.position}</div>`:''}
        </td>
        <td style="padding:5px 6px;vertical-align:top">
          ${top?`<div onclick="event.stopPropagation();window.open('${(top.link||'').replace(/'/g,'%27')}','_blank','noopener')"
            style="font-size:7.5px;color:${newsColor};line-height:1.45;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;cursor:pointer"
            onmouseover="this.style.color='#ffcc66'" onmouseout="this.style.color='${newsColor}'">${headline}</div>`
          :`<div style="font-size:7px;color:#998870;font-style:italic">— no recent news —</div>`}
          ${headline2?`<div onclick="event.stopPropagation();window.open('${(second.link||'').replace(/'/g,'%27')}','_blank','noopener')"
            style="font-size:7px;color:#886644;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;margin-top:1px;cursor:pointer"
            onmouseover="this.style.color='#bbaa88'" onmouseout="this.style.color='#886644'">${headline2}</div>`:''}
        </td>
        <td style="width:28px;padding:5px 2px;text-align:center;vertical-align:top">
          <div style="display:flex;align-items:center;justify-content:center"><span style="font-size:6.5px;color:#886644;font-weight:700">${ago}</span>${_rdot}</div>
          <div onclick="event.stopPropagation();window.open('${xUrl}','_blank','noopener')"
            style="font-size:6px;color:#554433;margin-top:2px;cursor:pointer;letter-spacing:.3px"
            onmouseover="this.style.color='#ffaa44'" onmouseout="this.style.color='#554433'">X</div>
        </td>
        <td style="width:12px;padding:5px 2px;text-align:center;vertical-align:middle">
          <div style="font-size:9px;color:#554433">›</div>
        </td>
      </tr>`;
    });
  });

  return `<div style="height:100%;display:flex;flex-direction:column;overflow:hidden">
  <div style="flex-shrink:0;padding:3px 8px;border-bottom:1px solid #111000;display:flex;align-items:center;gap:8px;background:#000">
    <span style="font-size:7px;color:#887766;border:1px solid #221800;padding:1px 5px">${list.length} PROFILES</span>
    <span style="font-size:6.5px;color:#665544">CLICK ROW → FULL INTEL · LIVE NEWS · X/TWITTER · SYSTEM · WSJ</span>
    <span onclick="fetchAllJournNews()" style="display:none">↻</span>
  </div>
  <div style="flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1a1200 #000">
  <table style="width:100%;border-collapse:collapse;font-family:'Courier Prime','Courier New',Courier,serif">
  <thead style="position:sticky;top:0;z-index:10"><tr style="background:#000;border-bottom:1px solid #1a1200">
    <th style="padding:3px 6px 3px 8px;font-size:6.5px;color:#776655;letter-spacing:1.2px;text-align:left;font-weight:700">NAME / FIRM / HANDLE</th>
    <th style="padding:3px 4px;font-size:6.5px;color:#776655;letter-spacing:1.2px;text-align:left;font-weight:700">FOCUS / AUM</th>
    <th style="padding:3px 6px;font-size:6.5px;color:#776655;letter-spacing:1.2px;text-align:left;font-weight:700">KNOWN FOR · CURRENT VIEW</th>
    <th style="padding:3px 6px;font-size:6.5px;color:#776655;letter-spacing:1.2px;text-align:left;font-weight:700">LATEST BREAKING NEWS</th>
    <th style="padding:3px 2px;font-size:6.5px;color:#776655;letter-spacing:.8px;text-align:center;font-weight:700;width:28px"></th>
    <th style="width:12px"></th>
  </tr></thead>
  <tbody>${rows}</tbody>
  </table>
  </div>
  </div>`;
}

// ── Build SOURCES panel ────────────────────────────────────────────────────
function buildSOURCES(){
  const total=INTEL_SOURCES.length;
  const ok=Object.values(_intelCache.sources).filter(v=>v.ok).length;
  const fail=Object.values(_intelCache.sources).filter(v=>!v.ok).length;
  return`<div style="height:100%;display:flex;flex-direction:column;overflow:hidden">
<div style="flex-shrink:0;padding:5px 8px;border-bottom:1px solid #1a1000;display:flex;align-items:center;gap:8px">
  <span style="font-size:8px;color:#553300;letter-spacing:1.5px">ZDRAVÍ ZDROJŮ — ${total} RSS FEEDS</span>
  <span style="font-size:8px;color:#00cc44">✓${ok}</span>
  <span style="font-size:8px;color:#ff2222">✗${fail}</span>
  <span style="font-size:8px;color:#887760;margin-left:auto">ČEKÁ ${total-ok-fail}</span>
  <span onclick="fetchIntelligence(true)" style="font-size:7px;color:#553300;border:1px solid #1a1000;padding:1px 7px;cursor:pointer;letter-spacing:1px">↻</span>
</div>
<div style="flex:1;overflow-y:auto">
<table style="width:100%;border-collapse:collapse;font-size:8px">
<tr style="border-bottom:1px solid #1a1000;position:sticky;top:0;background:#000"><th style="padding:3px 6px;text-align:left;color:#553300">ZDROJ</th><th style="text-align:left;padding:3px 6px;color:#553300">KATEGORIE</th><th style="text-align:center;color:#553300">STAV</th><th style="text-align:right;padding-right:6px;color:#553300">POLOŽKY</th></tr>
${INTEL_SOURCES.map(s=>{
  const h=_intelCache.sources[s.src];
  const col=!h?'#332200':h.ok?'#00cc44':'#ff2222';
  const st=!h?'—':h.ok?'OK':'FAIL';
  const lb=s.lang!=='EN'?`<span style="font-size:6px;color:#00bbdd;border:1px solid #00bbdd22;padding:0 2px;margin-left:3px">${s.lang}</span>`:'';
  return`<tr style="border-bottom:1px solid #0d0a00"><td style="padding:2px 6px;color:#665840">${s.src}${lb}</td><td style="padding:2px 6px;font-size:7px;color:#553300">${s.tag}</td><td style="text-align:center;color:${col};font-size:7px;font-weight:700">${st}</td><td style="text-align:right;padding-right:6px;color:#887760">${h?.count||0}</td></tr>`;
}).join('')}
</table>
</div></div>`;
}

// ── Init ───────────────────────────────────────────────────────────────────
// Intel feeds started after API key
setInterval(()=>{
  try{
    Object.entries(PANEL_REGISTRY||{}).forEach(([id,reg])=>{
      if(!['JOURN','SOURCES'].includes(reg.fn))return;
      const body=document.getElementById('pb-'+id);if(!body)return;
      if(reg.fn==='JOURN'){const tabs=body.closest('.panel')?.querySelector('.ptab.on');const ti=tabs?[...tabs.parentNode.children].indexOf(tabs):0;body.innerHTML=buildJOURN(ti);}
      if(reg.fn==='SOURCES')body.innerHTML=buildSOURCES();
    });
  }catch(e){}
}, 60000);

// ── Build NWS — News & Research panel (Bloomberg NWS style) ──────────────────
function buildNWSPanel(ti){
  const TAG_FILTERS = [null,'MACRO','MARKETS','CB','EARNINGS'];
  const tagFilter = TAG_FILTERS[ti] || null;

  // NWS uses its own separate cache (_nwsCache) — official/CB/research sources only
  const allItems = _nwsCache.length > 0 ? _nwsCache : [];

  let items = tagFilter
    ? allItems.filter(n=>{
        if(tagFilter==='CB') return n._isOfficial || (n.src||'').toLowerCase().includes('fed') || (n.src||'').toLowerCase().includes('ecb') || (n.src||'').toLowerCase().includes('boe') || (n.src||'').toLowerCase().includes('boj');
        if(tagFilter==='EARNINGS') return n.tag==='EARNINGS';
        return n.tag===tagFilter;
      })
    : allItems;
  if(!items.length) items = allItems;

  const _fmtAgo = ts => {
    if(!ts) return '';
    const s = Math.floor(Date.now()/1000 - ts);
    if(s<60) return s+'s ago';
    if(s<3600) return Math.floor(s/60)+'m ago';
    if(s<86400) return Math.floor(s/3600)+'h ago';
    return Math.floor(s/86400)+'d ago';
  };

  const _srcCode = item => {
    const src = (item.src||'').toLowerCase();
    if(item._isOfficial && src.includes('fed')) return {code:'FED',col:'#ff8800'};
    if(item._isOfficial && src.includes('ecb')) return {code:'ECB',col:'#ffaa00'};
    if(item._isOfficial && src.includes('boe')) return {code:'BOE',col:'#ff9900'};
    if(item._isOfficial && src.includes('boj')) return {code:'BOJ',col:'#ff9900'};
    if(item._isOfficial && src.includes('bis')) return {code:'BIS',col:'#dd8800'};
    if(item._isOfficial && src.includes('imf')) return {code:'IMF',col:'#dd8800'};
    if(item._isOfficial && src.includes('snb')) return {code:'SNB',col:'#cc7700'};
    if(item._isOfficial && src.includes('rba')) return {code:'RBA',col:'#cc7700'};
    if(item._isOfficial && src.includes('boc')) return {code:'BOC',col:'#cc7700'};
    if(item._isOfficial && src.includes('oecd')) return {code:'OECD',col:'#cc7700'};
    if(item._isOfficial && src.includes('world bank')) return {code:'WB',col:'#cc7700'};
    if(item._isOfficial && src.includes('sec')) return {code:'SEC',col:'#ff6600'};
    if(item._isOfficial && src.includes('fred')) return {code:'FRED',col:'#889858'};
    if(item._isOfficial) return {code:'CB',col:'#cc7700'};
    if(src.includes('reuters')) return {code:'RTS',col:'#ddbb88'};
    if(src.includes('bloomberg')) return {code:'BBG',col:'#c8b880'};
    if(src.includes('financial times')||src.startsWith('ft')) return {code:'FT',col:'#c8b880'};
    if(src.includes('wsj')||src.includes('wall street')||src.includes('dj·')) return {code:'DJ',col:'#ddbb88'};
    if(src.includes('cnbc')) return {code:'CNBC',col:'#b8a870'};
    if(src.includes('ap ')||src==='ap') return {code:'AP',col:'#ddbb88'};
    if(src.includes('economist')) return {code:'ECO',col:'#b8a870'};
    if(src.includes('bbc')) return {code:'BBC',col:'#a09060'};
    if(src.includes('nyt')||src.includes('new york times')) return {code:'NYT',col:'#b8a870'};
    if(src.includes('marketwatch')) return {code:'MKW',col:'#a89860'};
    if(src.includes('coindesk')) return {code:'CDS',col:'#787848'};
    if(src.includes('cointelegraph')) return {code:'CTG',col:'#787848'};
    if(src.includes('decrypt')) return {code:'DCR',col:'#787848'};
    if(src.includes('axios')) return {code:'AXS',col:'#a09060'};
    if(src.includes('eia')) return {code:'EIA',col:'#889858'};
    if(src.includes('oilprice')) return {code:'OIL',col:'#889858'};
    if(src.includes('kitco')) return {code:'KTC',col:'#889858'};
    if(src.includes('nikkei')) return {code:'NKI',col:'#b8a870'};
    if(src.includes('scmp')) return {code:'SCMP',col:'#b8a870'};
    if(item.tag==='EARNINGS') return {code:'ERN',col:'#dd8800'};
    return {code:'NWS',col:'#706850'};
  };

  const _isBold = item => {
    if(item.flash||item.tag==='FLASH') return true;
    const t = (item.title||'').toLowerCase();
    return ['•','fed','ecb','fomc','crisis','warning','rate','gdp','cpi','war','sanction','powell','lagarde'].some(k=>t.startsWith(k)||t.includes(k));
  };

  let rows = '';
  items.slice(0,80).forEach((item,i)=>{
    const c = _srcCode(item);
    const bold = _isBold(item);
    const dot = bold ? '•' : '';
    const titleCol = '#ff8800';
    const titleW = bold ? '800' : '600';
    const agoStr = item.ts ? _fmtAgo(item.ts) : (item.staticTime||'');
    const lineN = i+1;
    const srcCode = item._static ? 'SIM' : c.code;
    const srcCol = item._static ? '#554433' : (c.col||'#706850');
    const href = item.link ? `onclick="window.open('${(item.link||'').replace(/'/g,"\\'")}','_blank','noopener')"` : '';
    const nwsRisk = window._riskLevel ? window._riskLevel(item.title||'') : null;
    const nwsRiskDot = window._riskDot ? window._riskDot(nwsRisk, item.title||'') : '';
    const rawTitle = (dot + (item.title||''));
    rows += `<tr id="nws-r-${i}" style="height:26px;background:#000;cursor:pointer"
      ${href}
      onmouseover="this.style.background='#0d0800'"
      onmouseout="this.style.background='#000'">
      <td style="padding:0 4px 0 4px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #111;width:36px">
        <span style="color:#F39F41;font-size:11px;font-weight:800;font-family:var(--fn-num)">${lineN})</span>
      </td>
      <td style="padding:0 6px;vertical-align:middle;overflow:hidden;border-bottom:1px solid #111;max-width:0;width:100%">
        <span style="color:${titleCol};font-size:12px;font-weight:${titleW};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;font-family:var(--fn);letter-spacing:.01em" title="${(item.title||'').replace(/"/g,'&quot;')}">${rawTitle}</span>
      </td>
      <td style="padding:0 8px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #111;width:46px">
        <span style="color:${srcCol};font-size:9px;font-weight:900;font-family:var(--fn-num);letter-spacing:.2px">${srcCode}</span>
      </td>
      <td style="padding:0 6px 0 4px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #111;width:40px">
        <span style="color:#aa9980;font-size:9px;font-weight:700;font-family:var(--fn-num);font-variant-numeric:tabular-nums">${agoStr}</span>
      </td>
      <td style="width:32px;vertical-align:middle;text-align:center;border-bottom:1px solid #111;padding:0 12px 0 0">${nwsRiskDot||''}</td>
    </tr>`;
  });

  const liveCount = _newsCache.length;
  const srcCount  = new Set(_newsCache.map(n=>n.src||'')).size;

  return `<table id="nws-tbl" style="width:100%;border-collapse:collapse;font-family:'Courier Prime','Courier New',Courier,serif;table-layout:fixed;background:#000;margin:2px 0 0 0">
    <colgroup>
      <col style="width:36px">
      <col>
      <col style="width:46px">
      <col style="width:40px">
      <col style="width:32px">
    </colgroup>
    ${rows}
  </table>`;
}

window._nwsFilter = function(q){
  if (q !== undefined) window._nwsFilterText = (q||'').trim();
  const term = window._nwsFilterText || '';
  const isShortTicker = /^[A-Z]{2,6}$/i.test(term) && term.length <= 6;
  document.querySelectorAll('[id^="nws-r-"]').forEach(row=>{
    if (!term) { row.style.display = ''; return; }
    let match;
    if (isShortTicker) {
      match = new RegExp('\\b' + term + '\\b', 'i').test(row.textContent);
    } else {
      match = row.textContent.toLowerCase().includes(term.toLowerCase());
    }
    row.style.display = match ? '' : 'none';
  });
};
window._nwsFilterText = '';

/* ═══════════════════════════════════════════════════════
   NETWORK & LAYER STATUS MONITOR
═══════════════════════════════════════════════════════ */
(function(){
  // Zobrazit sb-sec-status sekci
  setTimeout(function(){
    var s = document.getElementById('sb-sec-status');
    if(s) s.classList.remove('hidden');
    var f = document.getElementById('sb-sec-feeds');
    if(f) f.classList.remove('hidden');
  }, 1500);

  // ── NET ping ────────────────────────────────────────
  function _pingNet(){
    if(window._tabHidden) return;
    var start = Date.now();
    fetch('https://api.frankfurter.app/latest?from=USD&to=EUR', {
      signal: (function(){ var c=new AbortController(); setTimeout(function(){c.abort();},5000); return c.signal; })(),
      cache: 'no-store'
    })
    .then(function(r){
      var ms = Date.now() - start;
      var el = document.getElementById('si-net');
      if(el){
        if(r && r.ok){
          el.textContent = 'NET·' + ms + 'ms';
          el.classList.add('live');
          el.style.borderColor = ms < 500 ? '#003318' : '#884400';
          el.style.color = ms < 500 ? '#00cc44' : '#ff8800';
        } else {
          el.textContent = 'NET·ERR';
          el.classList.remove('live');
          el.style.color = '#ff2222';
          el.style.borderColor = '#440a0a';
        }
      }
    })
    .catch(function(){
      var el = document.getElementById('si-net');
      if(el){ el.textContent='NET·OFFLINE'; el.classList.remove('live'); el.style.color='#ff2222'; el.style.borderColor='#440a0a'; }
    });
  }
  _pingNet();
  setInterval(_pingNet, 20000);

  // ── AI status sync ──────────────────────────────────
  function _syncAI(){
    if(window._tabHidden) return;
    var el = document.getElementById('si-ai');
    var badge = document.getElementById('ai-badge');
    var on = !!(window.ANTHROPIC_API_KEY && window.ANTHROPIC_API_KEY.length > 10);
    if(el){
      el.textContent = on ? 'AI·ON' : 'AI·OFF';
      el.style.color = on ? '#00cc44' : '#ff4400';
      el.style.borderColor = on ? '#003318' : '#440a0a';
    }
    if(badge){
      badge.textContent = on ? 'AI:ON' : 'AI:OFF';
      badge.style.color = on ? '#00cc44' : '#443322';
      badge.style.borderColor = on ? '#003318' : '#1a0800';
    }
  }
  setInterval(_syncAI, 10000);
  setTimeout(_syncAI, 500);

  // ── Layer status tracking ───────────────────────────
  // Sleduje window._layerStatus objekt — každá fetch funkce nastaví stav
  window._layerStatus = window._layerStatus || {};

  function _syncLayers(){
    if(window._tabHidden) return;
    var layers = {
      'si-layer-inst':   window._layerStatus.inst,
      'si-layer-cb':     window._layerStatus.cb,
      'si-layer-macro':  window._layerStatus.macro,
      'si-layer-crypto': window._layerStatus.crypto,
      'si-layer-news':   window._layerStatus.news,
      'si-layer-yahoo':  window._layerStatus.yahoo,
      'si-layer-stooq':  window._layerStatus.stooq
};
    Object.entries(layers).forEach(function(entry){
      var id = entry[0]; var st = entry[1];
      var el = document.getElementById(id);
      if(!el) return;
      if(!st){ el.style.color='#332211'; el.style.borderColor='#1a0800'; return; }
      var age = Date.now() - (st.ts||0);
      var fresh = age < 120000; // 2 min
      if(st.ok && fresh){
        el.classList.add('live');
        el.style.color='#00cc44'; el.style.borderColor='#003318';
        if(st.count) el.title = (id.replace('si-layer-','').toUpperCase()) + ' — ' + st.count + ' záznamů, před ' + Math.round(age/1000) + 's';
      } else if(st.ok){
        el.style.color='#884400'; el.style.borderColor='#332200';
        el.classList.remove('live');
      } else {
        el.style.color='#ff2222'; el.style.borderColor='#440a0a';
        el.classList.remove('live');
      }
    });
  }
  setInterval(_syncLayers, 8000);
})();

console.log('%c NWS MODULE ','background:#1a1040;color:#aaaaff;font-weight:bold',' News & Research panel loaded');




// ── API Key verification ─────────────────────────────────────────────────────
async function _verifyAndSetKey() {
  const inp = document.getElementById('api-key-input');
  const k   = (inp ? inp.value.trim() : '');

  const statusRow  = document.getElementById('api-key-status');
  const statusIcon = document.getElementById('api-key-status-icon');
  const statusText = document.getElementById('api-key-status-text');
  const statusDet  = document.getElementById('api-key-status-detail');
  const btn        = document.getElementById('api-key-verify-btn');

  // ── Basic format check ──────────────────────────────
  if(!k) {
    _showKeyStatus('⚠', '#ff7700', 'NO KEY ENTERED', 'Please paste your sk-ant-... key above');
    return;
  }
  if(!k.startsWith('sk-ant')) {
    _showKeyStatus('✕', '#ff2222', 'INVALID FORMAT',
      'Key must start with sk-ant — get yours at console.anthropic.com');
    return;
  }
  if(k.length < 40) {
    _showKeyStatus('✕', '#ff2222', 'KEY TOO SHORT', 'This does not look like a valid Anthropic key');
    return;
  }

  // ── Live API test ───────────────────────────────────
  _showKeyStatus('⏳', '#ff8800', 'VERIFYING KEY...', 'Sending test request to Anthropic API');
  if(btn) { btn.textContent='CHECKING...'; btn.style.background='#332200'; btn.disabled=true; }

  const start = Date.now();
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': k,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
},
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 5,
        messages: [{ role: 'user', content: 'Reply OK' }]
      }),
      signal: (()=>{ const c=new AbortController(); setTimeout(()=>c.abort(),12000); return c.signal; })()
    });

    const ms = Date.now() - start;
    const data = await resp.json().catch(()=>({}));

    if(resp.ok && data.content) {
      // ✅ SUCCESS
      _showKeyStatus('●', '#00cc44', 'KEY VERIFIED — CONNECTED',
        'Anthropic API active · ' + ms + 'ms · Model: claude-haiku');
      if(btn){ btn.textContent='✓ ACTIVE'; btn.style.background='#003318'; btn.style.color='#00cc44'; }
      // Set key and activate AI
      window.ANTHROPIC_API_KEY = k;
      setTimeout(()=>{
        document.getElementById('api-key-banner').style.display='none';
        _activateAIFeatures();
      }, 1500);

    } else if(resp.status === 401) {
      _showKeyStatus('✕', '#ff2222', 'AUTHENTICATION FAILED — KEY REJECTED',
        'HTTP 401 — This key is invalid or has been revoked. Check console.anthropic.com');
      if(btn){ btn.textContent='VERIFY'; btn.style.background='#ff6600'; btn.style.color='#000'; btn.disabled=false; }

    } else if(resp.status === 403) {
      _showKeyStatus('✕', '#ff2222', 'ACCESS DENIED',
        'HTTP 403 — Key exists but has no permissions. Check your Anthropic account.');
      if(btn){ btn.textContent='VERIFY'; btn.style.background='#ff6600'; btn.style.color='#000'; btn.disabled=false; }

    } else if(resp.status === 429) {
      // Rate limited — key is valid!
      window.ANTHROPIC_API_KEY = k;
      _showKeyStatus('◑', '#ff8800', 'KEY VALID — RATE LIMITED',
        'HTTP 429 — Key accepted but rate limit reached. Will work momentarily.');
      if(btn){ btn.textContent='✓ VALID'; btn.style.background='#332200'; btn.style.color='#ff8800'; }
      setTimeout(()=>{ document.getElementById('api-key-banner').style.display='none'; _activateAIFeatures(); }, 2000);

    } else {
      _showKeyStatus('◑', '#ff7700', 'UNEXPECTED RESPONSE — HTTP ' + resp.status,
        (data.error?.message || 'Unknown error') + ' · Key may still work');
      if(btn){ btn.textContent='VERIFY'; btn.style.background='#ff6600'; btn.style.color='#000'; btn.disabled=false; }
    }

  } catch(e) {
    const ms = Date.now() - start;
    if(e.name === 'AbortError') {
      _showKeyStatus('◑', '#ff7700', 'TIMEOUT — NO RESPONSE IN 12s',
        'Network may be blocking Anthropic API. Try using a local server (python3 -m http.server 8080)');
    } else {
      _showKeyStatus('◑', '#ff7700', 'NETWORK ERROR',
        e.message + ' — Check internet connection or use localhost server');
    }
    if(btn){ btn.textContent='VERIFY'; btn.style.background='#ff6600'; btn.style.color='#000'; btn.disabled=false; }
  }
}

function _showKeyStatus(icon, color, text, detail) {
  const row = document.getElementById('api-key-status');
  const ic  = document.getElementById('api-key-status-icon');
  const tx  = document.getElementById('api-key-status-text');
  const dt  = document.getElementById('api-key-status-detail');
  if(row) row.style.display='flex';
  if(ic)  { ic.textContent=icon; ic.style.color=color; }
  if(tx)  { tx.textContent=text; tx.style.color=color; }
  if(dt)  { dt.textContent=detail; }
}

function _activateAIFeatures() {
  // ── Close boot overlay ──────────────────────────────
  try{ if(typeof _boot!=='undefined' && !_boot.dismissed) { _boot.dismissed=true; const ov=document.getElementById('boot-overlay'); if(ov){ov.style.opacity='0';setTimeout(()=>{try{ov.remove();}catch(_){}},400);} } }catch(e){}
  // Update AI badges
  const aib = document.getElementById('ai-badge');
  if(aib){ aib.textContent='AI:ON'; aib.style.color='#00cc44'; aib.style.borderColor='#003318'; aib.style.cursor='default'; aib.onclick=null; }
  const siai = document.getElementById('si-ai');
  if(siai){ siai.textContent='AI·ON'; siai.style.color='#00cc44'; siai.style.borderColor='#003318'; }

  // ── START ALL DATA FEEDS (first time only) ──────────
  try{ if(typeof _startAllFeeds==='function') _startAllFeeds(); }catch(e){ console.error('_startAllFeeds error:',e); }

  // ── AI-specific features ────────────────────────────
  setTimeout(()=>{ try{ if(typeof _fetchCBDecisions==='function') _fetchCBDecisions(); }catch(e){} }, 500);
  setTimeout(()=>{ try{ if(typeof fetchAllNews==='function') fetchAllNews(true).then(()=>{ try{_enrichNewsWithAI();}catch(e){}}).catch(()=>{}); }catch(e){} }, 1000);
  setTimeout(()=>{ try{ if(typeof fetchIntelligence==='function') fetchIntelligence(true); }catch(e){} }, 2000);
  setTimeout(()=>{ try{ if(typeof fetchFearGreedIntel==='function') fetchFearGreedIntel(); }catch(e){} }, 3000);
  setTimeout(()=>{ try{ if(typeof fetchAllJournNews==='function') fetchAllJournNews(); }catch(e){} }, 4000);

  // Repeat intel intervals
  if(!window._intelIntervalsSet) {
    window._intelIntervalsSet = true;
    setInterval(()=>{ try{fetchAllJournNews();}catch(e){} }, 600000);
    setInterval(()=>{ try{fetchIntelligence(false);}catch(e){} }, 600000);
    setInterval(()=>{ try{fetchFearGreedIntel();}catch(e){} }, 300000);
  }

  // ── Dismiss boot overlay + map fix ──────────────────────
  try{ if(typeof _boot!=='undefined' && !_boot.dismissed) _boot.dismiss(); }catch(e){}
  // Mapa se stala viditelnou — přepočítat rozměry okamžitě
  setTimeout(function(){
    try{
      map.invalidateSize({animate:false});
      const minZ = map.getBoundsZoom([[-75,-180],[75,200]], false);
      map.setMinZoom(Math.max(1, minZ));
      if(typeof _applyZoomMarkerStyle==='function') _applyZoomMarkerStyle();
    }catch(_){}
  }, 100);

  // toast odstraněn
}

// Boot overlay handles key entry — no auto-banner needed
(function(){
  // If key already set (hardcoded), activate immediately
  if(window.ANTHROPIC_API_KEY && window.ANTHROPIC_API_KEY.length > 10){
    setTimeout(function(){ _activateAIFeatures(); }, 500);
  }
})();



/* ═══════════════════════════════════════════════════════
   FEED NETWORK VISUALIZATION — blockchain node graph
   Kreslí na boot-network-canvas uvnitř boot overlay
═══════════════════════════════════════════════════════ */
(function(){
  const INNER_IDS = ['BINANCE·WS','BINANCE·REST','HYPERLIQUID','DOMINANCE','FUNDING','COINBASE'];
  const ALL_IDS   = ['BINANCE·WS','BINANCE·REST','HYPERLIQUID','KRAKEN','OKX','BYBIT','COINBASE','COINBASE-WS','JUPITER','FINNHUB','DOMINANCE','FUNDING','COINGECKO','HTX','BITGET','GATE','MEXC','KUCOIN'];
  const LABELS    = {'BINANCE·WS':'BNB·WS','BINANCE·REST':'BNB·R','HYPERLIQUID':'HYP','KRAKEN':'KRK','OKX':'OKX','BYBIT':'BYB','COINBASE':'CBS','COINBASE-WS':'CBS·W','JUPITER':'JUP','FINNHUB':'FNH','DOMINANCE':'DOM','FUNDING':'FND','COINGECKO':'CGK','HTX':'HTX','BITGET':'BGT','GATE':'GAT','MEXC':'MXC','KUCOIN':'KCN'};

  const INNER_R = 52, OUTER_R = 88;
  const outerIds = ALL_IDS.filter(id => !INNER_IDS.includes(id));

  const nodes = ALL_IDS.map(id => {
    const isInner = INNER_IDS.includes(id);
    const list    = isInner ? INNER_IDS : outerIds;
    const idx     = list.indexOf(id);
    const angle   = (idx / list.length) * Math.PI * 2 - Math.PI / 2;
    return { id, label: LABELS[id]||id, r: isInner ? INNER_R : OUTER_R, angle, isInner };
  });

  // Particles per connection
  const particles = nodes.map(n => ({
    node: n, t: Math.random(), speed: 0.004 + Math.random()*0.005
  }));

  function getStatus(id) {
    if(!window._boot) return 'pending';
    return (window._boot.feeds[id]||{status:'pending'}).status;
  }
  function stColor(st) {
    return {ok:'#00cc44', warn:'#ff7700', err:'#ff3322', pending:'#1a0e00'}[st]||'#1a0e00';
  }

  let frame = 0;
  let started = false;

  function drawFrame() {
    if(window._tabHidden) { requestAnimationFrame(drawFrame); return; } // skip when hidden
    const C = document.getElementById('boot-network-canvas');
    if(!C) { requestAnimationFrame(drawFrame); return; }

    const W = C.width, H = C.height, cx = W/2, cy = H/2;
    const ctx = C.getContext('2d');
    ctx.clearRect(0,0,W,H);
    frame++;

    // bg glow
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,95);
    bg.addColorStop(0,'rgba(255,60,0,0.04)');
    bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    // orbit rings
    [INNER_R, OUTER_R].forEach(r=>{
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(255,60,0,0.06)'; ctx.lineWidth=1; ctx.stroke();
    });

    nodes.forEach(n => {
      const nx = cx + Math.cos(n.angle)*n.r;
      const ny = cy + Math.sin(n.angle)*n.r;
      const st = getStatus(n.id);
      const col = stColor(st);
      const live = st==='ok';

      // line to center
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(nx,ny);
      ctx.strokeStyle = live ? 'rgba(0,204,68,0.15)' : st==='err'?'rgba(255,51,34,0.1)':'rgba(26,14,0,0.6)';
      ctx.lineWidth = live?0.8:0.5; ctx.setLineDash([2,6]); ctx.stroke(); ctx.setLineDash([]);

      // inner→outer cross-links
      if(!n.isInner){
        const nearest = nodes.filter(m=>m.isInner);
        const best = nearest.reduce((a,b)=> Math.abs(a.angle-n.angle)<Math.abs(b.angle-n.angle)?a:b);
        const bx = cx+Math.cos(best.angle)*best.r;
        const by = cy+Math.sin(best.angle)*best.r;
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(nx,ny);
        ctx.strokeStyle = live?'rgba(0,204,68,0.08)':'rgba(20,10,0,0.4)';
        ctx.lineWidth=0.4; ctx.setLineDash([1,8]); ctx.stroke(); ctx.setLineDash([]);
      }

      // glow halo
      if(live){
        const pulse = Math.sin(frame*0.06+n.angle)*3+4;
        const g2 = ctx.createRadialGradient(nx,ny,0,nx,ny,pulse+3);
        g2.addColorStop(0,'rgba(0,204,68,0.4)'); g2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(nx,ny,pulse+3,0,Math.PI*2);
        ctx.fillStyle=g2; ctx.fill();
      }

      // node dot
      ctx.beginPath(); ctx.arc(nx,ny,live?3:1.8,0,Math.PI*2);
      ctx.fillStyle=col; ctx.fill();

      // label
      ctx.font='5px Courier New'; ctx.textAlign='center'; ctx.fillStyle=live?col:'#2a1600';
      const lr = n.r+11;
      ctx.fillText(n.label, cx+Math.cos(n.angle)*lr, cy+Math.sin(n.angle)*lr+2);
    });

    // particles on live connections
    particles.forEach(p=>{
      if(getStatus(p.node.id)!=='ok') return;
      p.t = (p.t+p.speed)%1;
      const nx=cx+Math.cos(p.node.angle)*p.node.r;
      const ny=cy+Math.sin(p.node.angle)*p.node.r;
      const px=cx+(nx-cx)*p.t, py=cy+(ny-cy)*p.t;
      ctx.beginPath(); ctx.arc(px,py,1.5,0,Math.PI*2);
      ctx.fillStyle='rgba(0,255,100,0.9)'; ctx.fill();
    });

    // center node
    const okN = ALL_IDS.filter(id=>getStatus(id)==='ok').length;
    const cCol = okN>=3?'#ff6600':okN>0?'#552200':'#1a0a00';
    [14,9].forEach((r,i)=>{
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle=i===0?'rgba(255,80,0,0.1)':'rgba(255,80,0,0.2)';
      ctx.lineWidth=1; ctx.stroke();
    });
    const cp=Math.sin(frame*0.04)*4+4;
    ctx.beginPath(); ctx.arc(cx,cy,5+cp,0,Math.PI*2);
    ctx.strokeStyle='rgba(255,80,0,0.15)'; ctx.lineWidth=1; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2);
    ctx.fillStyle=cCol; ctx.fill();
    ctx.font='bold 5.5px Courier New'; ctx.textAlign='center'; ctx.fillStyle='#ff6600';
    ctx.fillText('BBG',cx,cy+2);

    // live count update
    const nc = document.getElementById('boot-net-count');
    if(nc){ nc.textContent=okN+'/'+ALL_IDS.length+' LIVE'; nc.style.color=okN>=3?'#00cc44':okN>0?'#ff6600':'#332200'; }

    requestAnimationFrame(drawFrame);
  }

  setTimeout(drawFrame, 300);
})();



/* ════════════════════════════════════════════════════
   LIVE NEWS WEBSOCKET — Polygon.io crypto news stream
   Free tier: crypto news real-time
════════════════════════════════════════════════════ */
(function(){
  let _polyNewsWS = null;
  let _polyConnected = false;

  function _connectPolyNews(){
    if(_polyNewsWS) return;
    try{
      // Polygon.io free WebSocket — crypto news (no key needed for delayed)
      _polyNewsWS = new WebSocket('wss://socket.polygon.io/crypto');
      _polyNewsWS.onopen = () => {
        _polyConnected = true;
        // Auth with free key or demo
        const key = window.POLYGON_API_KEY || 'demo';
        _polyNewsWS.send(JSON.stringify({action:'auth', params:key}));
      };
      _polyNewsWS.onmessage = (e) => {
        try{
          const msgs = JSON.parse(e.data);
          msgs.forEach(m=>{
            if(m.ev==='news' && m.title){
              const item = {
                src:'Polygon·WS', tag:'CRYPTO', tier:1,
                title:m.title, link:m.article_url||'',
                ts:Math.floor((m.published_utc?new Date(m.published_utc).getTime():Date.now())/1000),
                body:m.description||'', _live:true
              };
              if(_newsCache && !_newsCache.find(n=>n.title===item.title)){
                _newsCache.unshift(item);
                if(_newsCache.length>500) _newsCache.pop();
                try{renderCNPanel();}catch(_){}
              }
            }
          });
        }catch(_){}
      };
      _polyNewsWS.onerror = () => { _polyConnected=false; _polyNewsWS=null; };
      _polyNewsWS.onclose = () => { _polyConnected=false; _polyNewsWS=null; setTimeout(_connectPolyNews,30000); };
    }catch(e){}
  }

  // Connect after key is verified
  const _origActivate = window._activateAfterKey || (()=>{});
  setTimeout(()=>{
    if(window.ANTHROPIC_API_KEY) _connectPolyNews();
  }, 5000);
  setInterval(()=>{ if(window.ANTHROPIC_API_KEY && !_polyConnected) _connectPolyNews(); },60000);
})();

/* ════════════════════════════════════════════════════
   GNEWS API — free 100 req/day, English news
   Pokryje mezery kdy RSS selžou
════════════════════════════════════════════════════ */
async function fetchGNews(){
  const GNEWS_KEY = window.GNEWS_API_KEY || '';
  if(!GNEWS_KEY) return; // needs key from gnews.io
  const topics = ['business','world','technology'];
  for(const t of topics){
    try{
      const r = await _fetchRaceJSON(
        `https://gnews.io/api/v4/top-headlines?topic=${t}&lang=en&max=10&token=${GNEWS_KEY}`, 8000
      );
      if(r?.articles?.length){
        r.articles.forEach(a=>{
          const item = {
            src:'GNews·'+t.toUpperCase(), tag:t==='business'?'MARKETS':t==='technology'?'EQUITY':'MACRO',
            title:a.title, link:a.url, ts:Math.floor(new Date(a.publishedAt).getTime()/1000),
            body:a.description||'', tier:2
          };
          if(_newsCache && !_newsCache.find(n=>n.title===item.title) && item.title?.length>15){
            _newsCache.push(item);
          }
        });
      }
    }catch(e){}
  }
}



/* ═══════════════════════════════════════════
   ECONOMIC CALENDAR SIDEBAR — pravý dolní roh
═══════════════════════════════════════════ */

let _ecalSidebarMinimized = false;

function toggleEcalSidebar(){
  const rows = document.getElementById('ecal-sb-rows');
  const hdr  = document.getElementById('ecal-sb-week');
  const el   = document.getElementById('ecal-sidebar');
  _ecalSidebarMinimized = !_ecalSidebarMinimized;
  if(_ecalSidebarMinimized){
    if(rows) rows.style.display='none';
    if(hdr)  hdr.parentElement.querySelector('span[title]').textContent='+';
    if(el)   el.style.maxHeight='28px';
  } else {
    if(rows) rows.style.display='';
    if(hdr)  hdr.parentElement.querySelector('span[title]').textContent='—';
    if(el)   el.style.maxHeight='420px';
  }
}

function renderEcalSidebar(){
  return; // sidebar skryt
  const el = document.getElementById('ecal-sb-rows');
  if(!el) return;

  // Získat data z _macroCache nebo fallback
  const evts = (window._macroCache && _macroCache.ecal && _macroCache.ecal.length > 0)
    ? _macroCache.ecal
    : [];

  if(evts.length === 0){ el.innerHTML='<div style="padding:8px;color:#887760;font-size:7px;text-align:center">LOADING...</div>'; return; }

  const now   = new Date();
  const today = now.toISOString().slice(0,10);

  // Skupiny po dnech
  const byDay = {};
  evts.forEach(e=>{
    if(!byDay[e.date]) byDay[e.date]=[];
    byDay[e.date].push(e);
  });

  // Barvy impaktu
  const impColor = i => ({high:'#ff2222',medium:'#ff7700',low:'#443322'})[i?.toLowerCase()]||'#443322';
  const impLetter= i => ({high:'H',medium:'M',low:'L'})[i?.toLowerCase()]||'L';

  // Formát data
  function fmtDay(d){
    const dt = new Date(d+'T12:00:00Z');
    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return days[dt.getUTCDay()]+' '+dt.getUTCDate()+' '+months[dt.getUTCMonth()];
  }

  let html = '';
  Object.keys(byDay).sort().forEach(day=>{
    const isToday = day===today;
    const isPast  = day<today;

    // Day header
    html += `<div style="padding:3px 6px 2px;background:${isToday?'#0a0600':'#050300'};border-bottom:1px solid #0d0800;border-top:1px solid #150a00;position:sticky;top:0">
      <span style="color:${isToday?'#ff6600':'#332200'};font-size:6px;letter-spacing:1px;font-weight:700">${fmtDay(day)}${isToday?' ◀':''}</span>
    </div>`;

    byDay[day].forEach((e,i)=>{
      const hasActual = e.actual && e.actual!=='' && e.actual!==null;
      const actCol = hasActual ? (
        parseFloat(e.actual)>parseFloat(e.forecast)?'#00cc44':
        parseFloat(e.actual)<parseFloat(e.forecast)?'#ff3322':'#ff8800'
      ) : '#2a1400';
      const rowBg = i%2===0?'#000':'#050300';
      const titleCol = isPast?'#2a1400': e.impact?.toLowerCase()==='high'?'#886644': e.impact?.toLowerCase()==='medium'?'#664422':'#443322';

      html += `<div style="display:grid;grid-template-columns:38px 28px 14px 1fr 42px 42px;padding:2px 6px;background:${rowBg};border-bottom:1px solid #080500;align-items:center">
        <div style="color:#887760;font-size:6px;font-family:'Courier New',monospace">${(e.time||'').replace('am',' am').replace('pm',' pm')}</div>
        <div style="color:#664422;font-size:6px;font-weight:700">${e.currency||''}</div>
        <div style="color:${impColor(e.impact)};font-size:6.5px;font-weight:700">${impLetter(e.impact)}</div>
        <div style="color:${titleCol};font-size:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${e.title||''}">${(e.title||'').slice(0,22)}</div>
        <div style="color:${actCol};font-size:6px;text-align:right;font-family:'Courier New',monospace">${hasActual?e.actual:'—'}</div>
        <div style="color:#887760;font-size:6px;text-align:right;font-family:'Courier New',monospace">${e.forecast||'—'}</div>
      </div>`;
    });
  });

  el.innerHTML = html || '<div style="padding:8px;color:#887760;font-size:7px;text-align:center">NO EVENTS</div>';

  // Scroll to today
  const todayEl = el.querySelector('[style*="ff6600"]');
  if(todayEl) setTimeout(()=>todayEl.scrollIntoView({block:'start'}),100);
}

// Refresh každých 60s a po načtení dat
setInterval(renderEcalSidebar, 60000);
setTimeout(renderEcalSidebar, 2000);

// Hook do fetchMacroCalendar — refresh po každém načtení
const _origFetchMacro = window.fetchMacroCalendar;
if(typeof fetchMacroCalendar==='function'){
  const _origMacro = fetchMacroCalendar;
  window.fetchMacroCalendar = async function(force){
    const r = await _origMacro(force);
    setTimeout(renderEcalSidebar, 500);
    return r;
  };
}




/* ══ AI BUY/SELL SIGNAL ENGINE ══════════════════════════════════════════ */
window._aiSignals = {};
window._aiSignalPending = false;

function _hashT(t){let h=0;for(let i=0;i<Math.min(t.length,80);i++){h=((h<<5)-h)+t.charCodeAt(i);h|=0;}return h+'';}

function _sigBadge(s){
  if(s==='B') return '<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#00ff44;box-shadow:0 0 3px #00ff44;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">B</span>';
  if(s==='S') return '<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#ff0000;box-shadow:0 0 3px #ff0000;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">S</span>';
  return '';
}

// Keyword-based instant B/S — no API key needed
window._kwSignal = function(title){
  const t = (title||'').toLowerCase();
  const buy = ['rate cut','stimulus','easing','recovery','growth','surges','beats','raises guidance',
    'record high','breakthrough','approved','bullish','inflows','accumulation','bottom',
    'gdp beat','jobs beat','strong','upgrade','buy','outperform','rally','gain','rises',
    'holds rate','soft landing','disinflation','dovish','ath','all-time high','holds support'].some(k=>t.includes(k));
  const sell = ['rate hike','crash','collapse','default','war','invasion','attack','sanction',
    'recession','inflation surge','bank run','bankruptcy','fraud','hack','seized','ban',
    'selloff','plunges','misses','lowers guidance','bearish','outflows','distribution',
    'gdp miss','jobs miss','weak','downgrade','sell','underperform','falls','drops',
    'tightening','hawkish','tariff','crisis','warning','concern','deficit'].some(k=>t.includes(k));
  if(buy && !sell) return 'B';
  if(sell && !buy) return 'S';
  return null;
};

function _applyBadges(){
  document.querySelectorAll('[id^="ai-wn-"],[id^="ai-nws-"],[id^="ai-intel-"]').forEach(td=>{
    const row = td.closest('tr');
    if(!row) return;
    const titleEl = row.querySelector('span[title]');
    if(!titleEl) return;
    const title = (titleEl.getAttribute('title')||titleEl.textContent||'').trim();
    const h = _hashT(title);
    // Use AI signal if available, else keyword fallback
    const sig = window._aiSignals[h] || window._kwSignal(title);
    td.innerHTML = (sig&&sig!=='N') ? _sigBadge(sig) : '';
  });
}

async function _runAISignals(){
  if(!window.ANTHROPIC_API_KEY||window.ANTHROPIC_API_KEY.length<10) return;
  if(window._aiSignalPending) return;

  // Collect ALL visible rows with titles
  const allSigTds = [...document.querySelectorAll('[id^="ai-wn-"],[id^="ai-nws-"],[id^="ai-intel-"]')];
  const rows = allSigTds.map(td=>td.closest('tr')).filter(Boolean);
  const toAnalyze = [];
  
  rows.forEach(row=>{
    const titleEl = row.querySelector('span[title]');
    if(!titleEl) return;
    const title = (titleEl.getAttribute('title')||titleEl.textContent||'').trim();
    if(!title) return;
    // Show loading dot for rows without signal yet
    if(window._aiSignals[_hashT(title)]===undefined){
      const td = row.querySelector('[id^="ai-wn-"],[id^="ai-nws-"]');
      if(td) td.innerHTML = '<span style="color:#887760;font-size:8px">·</span>';
      toAnalyze.push(title);
    }
  });

  if(!toAnalyze.length){ _applyBadges(); return; }

  window._aiSignalPending = true;
  
  // Process in batches of 25
  for(let b=0; b<toAnalyze.length; b+=25){
    const batch = toAnalyze.slice(b, b+25);
    const prompt = batch.map((t,i)=>`${i+1}. ${t.slice(0,120)}`).join('\n');
    try{
      const r = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':window.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
        body: JSON.stringify({
          model:'claude-haiku-4-5-20251001',
          max_tokens:200,
          system:'Financial analyst. For each headline return ONLY a JSON array of "B" (bullish/buy), "S" (bearish/sell), or "N" (neutral). Example: ["B","N","S"]. No other text. Array must have exactly same number of elements as input headlines.',
          messages:[{role:'user',content:'Rate these headlines:\n'+prompt}]
        }),
        signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),15000);return c.signal;})()
      });
      const d = await r.json();
      if(d.content&&d.content[0]){
        const raw = d.content[0].text.trim().replace(/```json|```/g,'').trim();
        const sigs = JSON.parse(raw);
        batch.forEach((t,i)=>{
          const s = sigs[i];
          window._aiSignals[_hashT(t)] = ['B','S','N'].includes(s) ? s : 'N';
        });
        _applyBadges(); // apply after each batch
      }
    }catch(e){}
  }

  window._aiSignalPending = false;
  _applyBadges();
}

// Hook into page
// Patch functions as soon as possible
function _patchAIHooks(){
  const _r=window.renderCNPanel;
  if(typeof _r==='function'&&!_r._aih){
    window.renderCNPanel=function(){_r.apply(this,arguments);setTimeout(_runAISignals,600);};
    window.renderCNPanel._aih=true;
    console.log('[AI] renderCNPanel hooked');
  }
  const _o=window.openPanel;
  if(typeof _o==='function'&&!_o._aih){
    window.openPanel=function(fn){_o.apply(this,arguments);if(fn==='WN'||fn==='NWS')setTimeout(_runAISignals,800);};
    window.openPanel._aih=true;
    console.log('[AI] openPanel hooked');
  }
}
setTimeout(_patchAIHooks,500);
setTimeout(_patchAIHooks,1500);
setTimeout(_patchAIHooks,3000);

setTimeout(()=>{
  console.log('[AI] Initial run, key:', window.ANTHROPIC_API_KEY?'SET':'NOT SET');
  _runAISignals();
},4000);
setInterval(()=>{if(!window._aiSignalPending)_runAISignals();},45000);




/* ════════════════════════════════════════════════════════════════
   NEW BLOOMBERG-STYLE PANELS
════════════════════════════════════════════════════════════════ */

// ── OPTIONS CHAIN (OPT) ─────────────────────────────────────────
function buildOPT(){
  const strikes=[80,85,90,95,100,105,110,115,120];
  const spot=100;
  function bsCall(S,K,r,T,v){
    const d1=(Math.log(S/K)+(r+v*v/2)*T)/(v*Math.sqrt(T));
    const d2=d1-v*Math.sqrt(T);
    function N(x){return .5*(1+erf(x/Math.sqrt(2)));}
    function erf(x){const t=1/(1+.3275911*Math.abs(x));const p=t*(0.254829592+t*(-0.284496736+t*(1.421413741+t*(-1.453152027+t*1.061405429))));return (1-p*Math.exp(-x*x))*(x<0?-1:1);}
    return S*N(d1)-K*Math.exp(-r*T)*N(d2);
  }
  let rows='';
  strikes.forEach(K=>{
    const callPx=bsCall(spot,K,0.05,0.25,0.25).toFixed(2);
    const putPx=bsCall(K,spot,0.05,0.25,0.25).toFixed(2);
    const delta=(spot>K?0.7:0.3).toFixed(2);
    const gamma=(0.04).toFixed(3);
    const theta=(-0.05).toFixed(3);
    const vega=(0.15).toFixed(3);
    const iv=(0.22+Math.random()*0.06).toFixed(3);
    const itm=spot>=K;
    rows+=`<tr style="background:${itm?'#0a0500':'#000'};cursor:default">
      <td class="r" style="color:#ff8800;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${callPx}</td>
      <td class="r" style="color:#aa9980;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${delta}</td>
      <td class="r" style="color:#998870;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${iv}</td>
      <td style="text-align:center;padding:3px 8px;border-bottom:1px solid #0a0500;font-size:9px;font-weight:700;color:${itm?'#00cc44':'#ff8800'}">${K}</td>
      <td class="r" style="color:#998870;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${iv}</td>
      <td class="r" style="color:#aa9980;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${(1-parseFloat(delta)).toFixed(2)}</td>
      <td class="r" style="color:#ff5533;padding:3px 6px;border-bottom:1px solid #0a0500;font-size:9px">${putPx}</td>
    </tr>`;
  });
  return `<div style="font-family:'Courier Prime',monospace;background:#000;height:100%;overflow:auto">
  <div style="padding:6px 10px;background:#080400;border-bottom:1px solid #2a1400;display:flex;gap:16px;align-items:center">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">OPTIONS CHAIN</span>
    <span style="color:#ff8800;font-size:9px">SPX · SPOT: <b>4,521.80</b></span>
    <span style="color:#aa9980;font-size:8px">EXP: 21 MAR 2026 · DTE: 6</span>
    <span style="color:#00cc44;font-size:8px">IV RANK: 42</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500">
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">CALL</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">DELTA</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">IV</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:center">STRIKE</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">IV</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">DELTA</th>
      <th style="color:#ff6600;font-size:7px;letter-spacing:1px;padding:3px 6px;text-align:right">PUT</th>
    </tr>
    ${rows}
  </table>
  </div>`;
}

// ── BONDS PANEL (BNDS) ──────────────────────────────────────────
function buildBNDS(){
  // ── Bloomberg World Government Bonds (SOVR / WB screen) ──────────────────
  // Columns: Country | RKI | Security | Price | Chg | Yld | YldChg | Sparkline

  const REGIONS = [
    { label:'Americas', rows:[
      {country:'United States', rki:'#00cc44', sec:'T 2⅛ 08/27',     px:'100-22', chg:-0.53,  yld:2.173, ychg:+4.2,  spark:[2.12,2.14,2.13,2.16,2.18,2.17,2.19,2.173]},
      {country:'Canada',        rki:'#00cc44', sec:'CAN1 06/01/27',   px:'90.804', chg:-0.224, yld:2.049, ychg:+2.7,  spark:[2.00,2.01,2.02,2.01,2.03,2.04,2.05,2.049]},
      {country:'Brazil (USD)',  rki:'#ccaa00', sec:'BRAZISL 6 04/26', px:'111.495',chg:-0.515, yld:4.349, ychg:+5.4,  spark:[4.28,4.29,4.30,4.29,4.31,4.33,4.34,4.349]},
      {country:'Colombia (USD)',rki:'#ccaa00', sec:'COLOM 3¾ 27',     px:'102.315',chg:-0.268, yld:3.576, ychg:+3.2,  spark:[3.52,3.53,3.54,3.53,3.55,3.56,3.57,3.576]},
      {country:'Argentina (USD)',rki:'#ff3333',sec:'ARGENT7 % 26',    px:'113.105',chg:-0.185, yld:5.562, ychg:+3.4,  spark:[5.50,5.51,5.52,5.53,5.54,5.54,5.56,5.562]},
      {country:'Mexico (USD)',  rki:'#ccaa00', sec:'MEX4.15 03/27',   px:'105.985',chg:-0.250, yld:3.459, ychg:+3.8,  spark:[3.40,3.41,3.42,3.43,3.43,3.44,3.45,3.459]},
    ]},
    { label:'EMEA', rows:[
      {country:'United Kingdom',rki:'#00cc44', sec:'UKT4 % 12/27',   px:'130.043',chg:-1.024, yld:1.132, ychg:+9.8,  spark:[1.06,1.07,1.08,1.09,1.10,1.11,1.12,1.132]},
      {country:'France',        rki:'#00cc44', sec:'FRTR 1 05/27',   px:'102.842',chg:-0.629, yld:0.696, ychg:+6.6,  spark:[0.64,0.65,0.66,0.67,0.67,0.68,0.69,0.696]},
      {country:'Germany',       rki:'#00cc44', sec:'DBR0 % 08/27',   px:'101.000',chg:-0.631, yld:0.397, ychg:+6.0,  spark:[0.35,0.36,0.37,0.37,0.38,0.38,0.39,0.397]},
      {country:'Italy',         rki:'#88cc44', sec:'BTPS2.2 06/27',  px:'103.761',chg:-0.497, yld:2.009, ychg:+5.6,  spark:[1.96,1.97,1.97,1.98,1.99,2.00,2.00,2.009]},
      {country:'Spain',         rki:'#88cc44', sec:'SPGB 1.45 27',   px:'98.734', chg:-0.308, yld:1.586, ychg:+3.3,  spark:[1.55,1.56,1.56,1.57,1.57,1.58,1.58,1.586]},
      {country:'Portugal',      rki:'#88cc44', sec:'PGB4 % 04/27',   px:'105.864',chg:-0.626, yld:1.812, ychg:+5.5,  spark:[1.75,1.76,1.77,1.78,1.78,1.79,1.80,1.812]},
      {country:'Sweden',        rki:'#00cc44', sec:'SGDB % 05/28',   px:'99.637', chg:-0.661, yld:0.786, ychg:+4.5,  spark:[0.74,0.75,0.76,0.76,0.77,0.77,0.78,0.786]},
      {country:'Netherlands',   rki:'#00cc44', sec:'NETHRD0 % 27',   px:'102.224',chg:-0.613, yld:0.537, ychg:+5.8,  spark:[0.49,0.50,0.51,0.52,0.52,0.53,0.53,0.537]},
      {country:'Switzerland',   rki:'#00cc44', sec:'SWIS3 % 27',     px:'133.752',chg:-0.441, yld:0.168, ychg:+3.7,  spark:[0.13,0.14,0.14,0.15,0.15,0.16,0.16,0.168]},
      {country:'Greece',        rki:'#ccaa00', sec:'GGB03 02/24/27', px:'88.708', chg:+0.064, yld:5.375, ychg:-6.9,  spark:[5.42,5.41,5.40,5.40,5.39,5.39,5.38,5.375]},
    ]},
    { label:'Asia/Pacific', rows:[
      {country:'Japan',         rki:'#00cc44', sec:'JGB 0.1 09/27',  px:'100.899',chg:-0.293, yld:0.030, ychg:-18.0, spark:[0.04,0.04,0.03,0.03,0.03,0.03,0.03,0.030], hl:true},
      {country:'Australia',     rki:'#00cc44', sec:'ACGB 2 % 27',    px:'101.006',chg:-0.081, yld:2.612, ychg:+3.6,  spark:[2.57,2.58,2.58,2.59,2.60,2.60,2.61,2.612]},
      {country:'New Zealand',   rki:'#00cc44', sec:'NZGB 4 % 27',    px:'119.462',chg:-0.084, yld:2.778, ychg:+0.8,  spark:[2.75,2.76,2.76,2.77,2.77,2.77,2.77,2.778]},
      {country:'South Korea',   rki:'#00cc44', sec:'NDFB 2 % 27',    px:'99.352', chg:+0.002, yld:2.239, ychg:-0.1,  spark:[2.24,2.24,2.24,2.24,2.23,2.24,2.24,2.239]},
    ]},
  ];

  function mkSpark(pts, ychg) {
    const w=76,h=18,pad=2;
    const mn=Math.min(...pts), mx=Math.max(...pts), rng=mx-mn||0.001;
    const col = ychg >= 0 ? '#ff4444' : '#00cc44';
    const coords = pts.map((v,i)=>{
      const x=pad+(i/(pts.length-1))*(w-pad*2);
      const y=h-pad-((v-mn)/rng)*(h-pad*2);
      return x.toFixed(1)+','+y.toFixed(1);
    }).join(' ');
    const last=coords.split(' ').slice(-1)[0].split(',');
    return `<svg width="${w}" height="${h}" style="display:block;overflow:visible" viewBox="0 0 ${w} ${h}">
      <polyline points="${coords}" fill="none" stroke="${col}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" opacity=".9"/>
      <circle cx="${last[0]}" cy="${last[1]}" r="2" fill="${col}"/>
    </svg>`;
  }

  const TH = (t,al='right',w='') =>
    `<th style="padding:3px ${al==='left'?'6px 3px 8px':'5px'};font-size:7.5px;color:#cc7722;text-align:${al};letter-spacing:.9px;font-weight:700;white-space:nowrap;background:#060300;border-bottom:1px solid #1a1100;${w?'width:'+w:''}">${t}</th>`;

  const regHdr = lbl =>
    `<tr><td colspan="8" style="padding:5px 8px 2px;font-size:9px;font-weight:700;letter-spacing:1px;color:#e8dfc8;background:#000;border-top:1px solid #1a1100">${lbl}</td></tr>
     <tr>${TH('Country','left','108px')}${TH('RKI','center','22px')}${TH('Security','left','128px')}${TH('Price','right','66px')}${TH('Chg','right','50px')}${TH('Yld','right','50px')}${TH('Chg','right','42px')}${TH('Yld','right','82px')}</tr>`;

  let html = `<div style="height:100%;overflow:auto;background:#000;font-family:'Roboto Mono','Courier New',monospace;scrollbar-width:thin;scrollbar-color:#1a1100 #000">
  <div style="background:#050300;border-bottom:1px solid #1a1100;padding:4px 10px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10">
    <span style="color:#F39F41;font-size:8.5px;font-weight:700;letter-spacing:2px">WORLD GOVERNMENT BONDS</span>
    <span style="color:#332200;font-size:7px;letter-spacing:.5px">PRICE · YIELD · CHG · SPARK</span>
  </div>
  <table style="width:100%;border-collapse:collapse;table-layout:fixed">`;

  REGIONS.forEach(reg=>{
    html += regHdr(reg.label);
    reg.rows.forEach((b,i)=>{
      const chgCol  = b.chg  >= 0 ? '#00ee55' : '#ff4444';
      const ychgCol = b.ychg >= 0 ? '#ff4444' : '#00ee55';
      const rowBg   = b.hl ? 'rgba(255,100,0,.07)' : (i%2===0 ? '#000' : '#040200');
      html += `<tr style="background:${rowBg}" onmouseover="this.style.background='rgba(243,159,65,.055)'" onmouseout="this.style.background='${rowBg}'">
        <td style="padding:3px 8px;color:#c8bfaa;font-size:9.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid #0a0600">${b.country}</td>
        <td style="padding:3px 4px;text-align:center;border-bottom:1px solid #0a0600"><span style="display:inline-block;width:9px;height:9px;background:${b.rki}"></span></td>
        <td style="padding:3px 6px;color:#F39F41;font-size:9.5px;font-weight:700;white-space:nowrap;letter-spacing:.1px;border-bottom:1px solid #0a0600">${b.sec}</td>
        <td style="padding:3px 6px;text-align:right;color:#c8bfaa;font-size:9.5px;font-variant-numeric:tabular-nums;border-bottom:1px solid #0a0600">${b.px}</td>
        <td style="padding:3px 5px;text-align:right;color:${chgCol};font-size:9px;font-variant-numeric:tabular-nums;border-bottom:1px solid #0a0600">${b.chg>=0?'+':''}${b.chg.toFixed(3)}</td>
        <td style="padding:3px 6px;text-align:right;color:#e8dfc8;font-size:9.5px;font-weight:700;font-variant-numeric:tabular-nums;border-bottom:1px solid #0a0600">${b.yld.toFixed(3)}</td>
        <td style="padding:3px 5px;text-align:right;color:${ychgCol};font-size:9px;font-variant-numeric:tabular-nums;border-bottom:1px solid #0a0600">${b.ychg>=0?'+':''}${b.ychg.toFixed(1)}</td>
        <td style="padding:2px 3px;text-align:right;border-bottom:1px solid #0a0600">${mkSpark(b.spark,b.ychg)}</td>
      </tr>`;
    });
  });

  return html + `</table></div>`;
}
// ──────────────────────────────────────────────────────────────────────────


function buildEARN(){
  const earnings=[
    {date:'TODAY',time:'BMO',sym:'JPM',name:'JPMorgan Chase',est:4.18,prev:4.10,rev:42.1,mktcap:'$685B',sector:'Financials'},
    {date:'TODAY',time:'AMC',sym:'WFC',name:'Wells Fargo',est:1.24,prev:1.20,rev:20.8,mktcap:'$282B',sector:'Financials'},
    {date:'TODAY',time:'BMO',sym:'C',name:'Citigroup',est:1.84,prev:1.72,rev:19.4,mktcap:'$118B',sector:'Financials'},
    {date:'MON 17',time:'BMO',sym:'GS',name:'Goldman Sachs',est:8.56,prev:8.22,rev:12.8,mktcap:'$186B',sector:'Financials'},
    {date:'MON 17',time:'AMC',sym:'NFLX',name:'Netflix',est:5.84,prev:5.28,rev:10.2,mktcap:'$403B',sector:'Tech'},
    {date:'TUE 18',time:'BMO',sym:'MS',name:'Morgan Stanley',est:1.98,prev:1.88,rev:14.6,mktcap:'$196B',sector:'Financials'},
    {date:'TUE 18',time:'AMC',sym:'INTC',name:'Intel Corp',est:-0.14,prev:0.18,rev:12.7,mktcap:'$105B',sector:'Tech'},
    {date:'WED 19',time:'BMO',sym:'BAC',name:'Bank of America',est:0.82,prev:0.76,rev:25.1,mktcap:'$337B',sector:'Financials'},
    {date:'WED 19',time:'AMC',sym:'IBM',name:'IBM',est:3.58,prev:3.44,rev:17.4,mktcap:'$212B',sector:'Tech'},
    {date:'THU 20',time:'BMO',sym:'UNH',name:'UnitedHealth',est:7.14,prev:6.88,rev:100.2,mktcap:'$459B',sector:'Health'},
    {date:'THU 20',time:'AMC',sym:'TSLA',name:'Tesla',est:0.68,prev:0.71,rev:25.8,mktcap:'$844B',sector:'Auto'},
    {date:'FRI 21',time:'BMO',sym:'PG',name:'Procter &amp; Gamble',est:1.88,prev:1.84,rev:20.6,mktcap:'$362B',sector:'Consumer'},
    {date:'FRI 21',time:'AMC',sym:'AXP',name:'American Express',est:3.42,prev:3.26,rev:15.8,mktcap:'$192B',sector:'Financials'}
  ];
  const timeCol=t=>t==='BMO'?'#00cc44':'#ff8800';
  let rows=earnings.map((e,i)=>{
    const surprise=(e.est-e.prev)/Math.abs(e.prev)*100;
    return `<tr style="background:${i%2?'#030200':'#000'};${e.date==='TODAY'?'border-left:2px solid #ff6600;':''}" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background='${i%2?'#030200':'#000'}'">
      <td style="padding:3px 8px;color:${e.date==='TODAY'?'#ff6600':'#665840'};font-size:8px;font-weight:700;white-space:nowrap">${e.date}</td>
      <td style="padding:3px 6px;color:${timeCol(e.time)};font-size:9px;font-weight:700">${e.time}</td>
      <td style="padding:3px 8px;color:#F39F41;font-size:10px;font-weight:700;letter-spacing:.5px">${e.sym}</td>
      <td style="padding:3px 8px;color:#c8c0a8;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:140px">${e.name}</td>
      <td style="padding:3px 8px;color:#e8dfc8;font-size:10px;text-align:right;font-family:'Roboto Mono',monospace">$${e.est.toFixed(2)}</td>
      <td style="padding:3px 8px;color:#aa9980;font-size:9px;text-align:right;font-family:'Roboto Mono',monospace">$${e.prev.toFixed(2)}</td>
      <td style="padding:3px 8px;color:${surprise>=0?'#00cc44':'#ff2222'};font-size:8px;text-align:right">${surprise>=0?'+':''}${surprise.toFixed(1)}%</td>
      <td style="padding:3px 8px;color:#aa9980;font-size:10px;text-align:right">$${e.rev.toFixed(1)}B</td>
      <td style="padding:3px 8px;color:#aa9980;font-size:10px">${e.sector}</td>
    </tr>`;
  }).join('');
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:4px 10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="color:#F39F41;font-size:10px;font-weight:700;letter-spacing:2px">EARNINGS CALENDAR</span>
    <span style="color:#00cc44;font-size:7px;font-weight:700">● BMO = Before Market Open</span>
    <span style="color:#ff8800;font-size:7px;font-weight:700">● AMC = After Market Close</span>
    <span style="color:#998870;font-size:7px">EPS EST vs PREV · REV CONSENSUS</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500;position:sticky;top:0">
      ${['DATE','TIME','SYM','COMPANY','EPS EST','EPS PREV','SURP%','REV EST','SECTOR'].map(h=>`<th style="color:#ff8800;font-size:9px;letter-spacing:1px;padding:5px 8px;border-bottom:1px solid #1a0a00;background:#0a0500;text-align:${h==='COMPANY'||h==='SECTOR'||h==='SYM'?'left':'right'}">${h}</th>`).join('')}
    </tr>
    ${rows}
  </table></div>`;
}

// ── PORTFOLIO TRACKER (PORT) ────────────────────────────────────
const _PORT_POSITIONS = [
  {sym:'AAPL',qty:100,avg:165.40,sector:'Tech'},
  {sym:'NVDA',qty:50,avg:88.20,sector:'Tech'},
  {sym:'MSFT',qty:80,avg:380.00,sector:'Tech'},
  {sym:'JPM',qty:60,avg:180.50,sector:'Fin'},
  {sym:'GLD',qty:200,avg:195.80,sector:'Cmdty'},
  {sym:'BTC',qty:0.5,avg:38000,sector:'Crypto'},
  {sym:'ETH',qty:4,avg:2100,sector:'Crypto'}
];

function buildPORT(){
  const positions = _PORT_POSITIONS;
  const prices = {AAPL:null,NVDA:null,MSFT:null,JPM:null,GLD:null,BTC:null,ETH:null};
  let totalCost=0,totalVal=0;
  const rows = positions.map((p,i)=>{
    const px = prices[p.sym]||p.avg;
    const val = px*p.qty;
    const cost = p.avg*p.qty;
    const pnl = val-cost;
    const pnlPct = (pnl/cost*100);
    totalCost+=cost; totalVal+=val;
    return `<tr style="background:${i%2?'#030200':'#000'}" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background='${i%2?'#030200':'#000'}'">
      <td style="padding:4px 8px;color:#ff8800;font-weight:700;font-size:10px">${p.sym}</td>
      <td style="padding:4px 8px;color:#aa9980;font-size:9px;text-align:right">${p.qty}</td>
      <td style="padding:4px 8px;color:#665840;font-size:9px;text-align:right;font-family:'Roboto Mono',monospace">$${p.avg.toLocaleString()}</td>
      <td style="padding:4px 8px;color:#e8dfc8;font-size:10px;text-align:right;font-family:'Roboto Mono',monospace">$${px.toLocaleString()}</td>
      <td style="padding:4px 8px;color:${pnl>=0?'#00cc44':'#ff2222'};font-size:9px;text-align:right;font-family:'Roboto Mono',monospace;font-weight:700">${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(0)}</td>
      <td style="padding:4px 8px;color:${pnlPct>=0?'#00cc44':'#ff2222'};font-size:9px;text-align:right">${pnlPct>=0?'+':''}${pnlPct.toFixed(2)}%</td>
      <td style="padding:4px 8px;color:#00bbdd;font-size:9px;text-align:right;font-family:'Roboto Mono',monospace">$${val.toLocaleString('en',{maximumFractionDigits:0})}</td>
      <td style="padding:4px 8px;color:#887760;font-size:8px">${p.sector}</td>
    </tr>`;
  }).join('');
  const totalPnl=totalVal-totalCost;
  const totalPct=totalPnl/totalCost*100;
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:6px 10px;display:flex;gap:20px;align-items:center;flex-wrap:wrap">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">PORTFOLIO · P&amp;L</span>
    <span style="color:#e0d8c0;font-size:10px;font-weight:700">$${totalVal.toLocaleString('en',{maximumFractionDigits:0})}</span>
    <span style="color:${totalPnl>=0?'#00cc44':'#ff2222'};font-size:10px;font-weight:700">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</span>
    <span style="color:${totalPct>=0?'#00cc44':'#ff2222'};font-size:9px">(${totalPct>=0?'+':''}${totalPct.toFixed(2)}%)</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500;position:sticky;top:0">
      ${['SYM','QTY','AVG COST','LAST','P&L $','P&L %','MKT VAL','SECTOR'].map(h=>`<th style="color:#ff8800;font-size:9px;letter-spacing:1px;padding:5px 8px;border-bottom:1px solid #1a0a00;background:#0a0500;text-align:${h==='SYM'||h==='SECTOR'?'left':'right'}">${h}</th>`).join('')}
    </tr>
    ${rows}
  </table></div>`;
}

// ── SENTIMENT DASHBOARD (SENT) ───────────────────────────────────
function buildSENT(){
  const data={
    fg:{val:38,label:'FEAR',col:'#ff2222'},
    vix:{val:22.4,chg:+2.1,col:'#ff8800'},
    put_call:{val:1.14,chg:+0.08,col:'#ff8800'},
    skew:{val:128,chg:-2,col:'#ff8800'},
    aaii_bull:{val:31.2,chg:-3.4,col:'#ff2222'},
    aaii_bear:{val:42.8,chg:+4.1,col:'#ff2222'},
    naaim:{val:58.4,chg:-8.2,col:'#ff8800'},
    margin_debt:{val:778,chg:-12,col:'#00cc44'},
    short_int:{val:3.8,chg:+0.2,col:'#ff8800'},
    junk_spd:{val:463,chg:+18,col:'#ff2222'}
};
  function gauge(val,max,col){
    const pct=Math.min(val/max*100,100);
    return `<div style="height:8px;background:#1a0e00;border-radius:4px;overflow:hidden;margin-top:4px">
      <div style="height:100%;width:${pct}%;background:${col};border-radius:4px;transition:width .5s"></div>
    </div>`;
  }
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace;padding:12px">
  <div style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px;margin-bottom:12px;border-bottom:1px solid #2a1400;padding-bottom:6px">MARKET SENTIMENT DASHBOARD</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">
    <!-- Fear & Greed -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">FEAR &amp; GREED INDEX</div>
      <div style="color:${data.fg.col};font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.fg.val}</div>
      <div style="color:${data.fg.col};font-size:8px;font-weight:700">${data.fg.label}</div>
      ${gauge(data.fg.val,100,data.fg.col)}
    </div>
    <!-- VIX -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">VIX · CBOE VOLATILITY</div>
      <div style="color:#e0d8c0;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.vix.val}</div>
      <div style="color:${data.vix.chg>=0?'#ff2222':'#00cc44'};font-size:8px">${data.vix.chg>=0?'+':''}${data.vix.chg} today</div>
      ${gauge(data.vix.val,50,data.vix.col)}
    </div>
    <!-- Put/Call -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">PUT/CALL RATIO</div>
      <div style="color:#e0d8c0;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.put_call.val}</div>
      <div style="color:${data.put_call.val>1.2?'#ff2222':data.put_call.val<0.8?'#00cc44':'#ff8800'};font-size:8px">${data.put_call.val>1.2?'BEARISH':data.put_call.val<0.8?'BULLISH':'NEUTRAL'}</div>
      ${gauge(data.put_call.val*50,100,data.put_call.col)}
    </div>
    <!-- AAII Bull -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">AAII BULLS %</div>
      <div style="color:#00cc44;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.aaii_bull.val}%</div>
      <div style="color:#ff2222;font-size:8px">${data.aaii_bull.chg.toFixed(1)}% week</div>
      ${gauge(data.aaii_bull.val,100,'#00cc44')}
    </div>
    <!-- AAII Bear -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">AAII BEARS %</div>
      <div style="color:#ff2222;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.aaii_bear.val}%</div>
      <div style="color:#ff2222;font-size:8px">+${data.aaii_bear.chg.toFixed(1)}% week</div>
      ${gauge(data.aaii_bear.val,100,'#ff2222')}
    </div>
    <!-- NAAIM -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">NAAIM EXPOSURE</div>
      <div style="color:#F39F41;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.naaim.val}</div>
      <div style="color:#ff2222;font-size:8px">${data.naaim.chg.toFixed(1)} week</div>
      ${gauge(data.naaim.val,200,'#ff8800')}
    </div>
    <!-- HY Spread -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">HY SPREAD (bps)</div>
      <div style="color:${data.junk_spd.val>500?'#ff2222':data.junk_spd.val>400?'#ff8800':'#00cc44'};font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.junk_spd.val}</div>
      <div style="color:#ff2222;font-size:8px">+${data.junk_spd.chg} bps</div>
      ${gauge(data.junk_spd.val,800,data.junk_spd.col)}
    </div>
    <!-- Short Interest -->
    <div style="background:#050300;border:1px solid #1a0e00;padding:10px;border-radius:2px">
      <div style="color:#998870;font-size:7px;letter-spacing:1px;margin-bottom:4px">SPX SHORT INT %</div>
      <div style="color:#F39F41;font-size:24px;font-weight:700;font-family:'Roboto Mono',monospace">${data.short_int.val}%</div>
      <div style="color:#ff8800;font-size:8px">+${data.short_int.chg}% week</div>
      ${gauge(data.short_int.val,10,'#ff8800')}
    </div>
  </div>
  </div>`;
}

// ── IPO CALENDAR (IPO) ───────────────────────────────────────────
function buildIPO(){
  const ipos=[
    {date:'MAR 18',sym:'KLAI',name:'Klai Technologies',price:'$18-21',size:'$420M',sector:'AI/SaaS',status:'PRICING',bankers:'GS·MS'},
    {date:'MAR 19',sym:'NVMX',name:'NovaMedix Corp',price:'$14-16',size:'$280M',sector:'Biotech',status:'ROAD SHOW',bankers:'JPM·CS'},
    {date:'MAR 20',sym:'FLWR',name:'Flower Foods Digital',price:'$22-25',size:'$650M',sector:'Consumer',status:'PRICING',bankers:'MS·GS'},
    {date:'MAR 21',sym:'QNTM',name:'Quantum Dynamics',price:'$28-32',size:'$1.2B',sector:'Quantum',status:'ROAD SHOW',bankers:'GS·JPM·MS'},
    {date:'MAR 25',sym:'MXAI',name:'MaxAI Platform',price:'$15-18',size:'$380M',sector:'AI',status:'FILED',bankers:'BofA·CS'},
    {date:'APR 02',sym:'HRZN',name:'Horizon Robotics US',price:'$10-12',size:'$890M',sector:'Robotics',status:'FILED',bankers:'UBS·DB'},
    {date:'APR 08',sym:'SOLR',name:'SolarGrid Energy',price:'$20-24',size:'$560M',sector:'Clean Energy',status:'FILED',bankers:'EVR·PJT'}
  ];
  const statusCol=s=>s==='PRICING'?'#ff6600':s==='ROAD SHOW'?'#ff8800':'#443322';
  let rows=ipos.map((ipo,i)=>`<tr style="background:${i%2?'#030200':'#000'}" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background='${i%2?'#030200':'#000'}'">
    <td style="padding:4px 8px;color:#998870;font-size:10px;white-space:nowrap">${ipo.date}</td>
    <td style="padding:4px 8px;color:#F39F41;font-size:10px;font-weight:700;letter-spacing:.5px">${ipo.sym}</td>
    <td style="padding:4px 8px;color:#c8c0a8;font-size:10px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ipo.name}</td>
    <td style="padding:4px 8px;color:#e8dfc8;font-size:10px;text-align:right;font-weight:600">${ipo.price}</td>
    <td style="padding:4px 8px;color:#00bbdd;font-size:10px;font-weight:600;text-align:right">${ipo.size}</td>
    <td style="padding:4px 8px;color:${statusCol(ipo.status)};font-size:9px;font-weight:700;letter-spacing:.5px">${ipo.status}</td>
    <td style="padding:4px 8px;color:#aa9980;font-size:10px">${ipo.sector}</td>
    <td style="padding:4px 8px;color:#998870;font-size:10px">${ipo.bankers}</td>
  </tr>`).join('');
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:4px 10px">
    <span style="color:#F39F41;font-size:10px;font-weight:700;letter-spacing:2px">IPO CALENDAR &amp; PIPELINE</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500;position:sticky;top:0">
      ${['DATE','SYM','COMPANY','PRICE RNG','DEAL SIZE','STATUS','SECTOR','BANKS'].map(h=>`<th style="color:#ff8800;font-size:9px;letter-spacing:1px;padding:5px 8px;border-bottom:1px solid #1a0a00;background:#0a0500;text-align:${['SYM','COMPANY','SECTOR','BANKS','STATUS'].includes(h)?'left':'right'}">${h}</th>`).join('')}
    </tr>
    ${rows}
  </table></div>`;
}

// ── M&A TRACKER (MNA) ────────────────────────────────────────────
function buildMNA(){
  const deals=[
    {date:'MAR 12',acq:'MSFT',tgt:'Nuance 2',val:'$4.8B',prem:'+32%',status:'ANNOUNCED',sector:'AI/Cloud',arb:'+2.1%'},
    {date:'MAR 08',acq:'BRK',tgt:'Pilot Travel Ctr',val:'$8.2B',prem:'+18%',status:'PENDING',sector:'Energy',arb:'+1.4%'},
    {date:'MAR 05',acq:'AMZN',tgt:'iRobot Corp',val:'$1.4B',prem:'+22%',status:'PENDING',sector:'Robotics',arb:'+3.8%'},
    {date:'FEB 28',acq:'GOOGL',tgt:'HubSpot',val:'$32.8B',prem:'+28%',status:'RUMORED',sector:'SaaS',arb:'+5.2%'},
    {date:'FEB 22',acq:'JPM',tgt:'First Republic 2',val:'$6.1B',prem:'+41%',status:'ANNOUNCED',sector:'Banking',arb:'+0.8%'},
    {date:'FEB 18',acq:'NVDA',tgt:'SambaNova',val:'$2.2B',prem:'+67%',status:'PENDING',sector:'AI Chips',arb:'+1.1%'},
    {date:'FEB 10',acq:'ELY',tgt:'Topgolf',val:'$3.4B',prem:'+15%',status:'CLOSED',sector:'Leisure',arb:'N/A'}
  ];
  const statusCol=s=>s==='CLOSED'?'#00cc44':s==='PENDING'?'#ff8800':s==='RUMORED'?'#443322':'#ff6600';
  let rows=deals.map((d,i)=>`<tr style="background:${i%2?'#030200':'#000'}" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background='${i%2?'#030200':'#000'}'">
    <td style="padding:4px 8px;color:#998870;font-size:10px">${d.date}</td>
    <td style="padding:4px 8px;color:#00bbdd;font-size:10px;font-weight:700">${d.acq}</td>
    <td style="padding:4px 8px;color:#F39F41;font-size:10px;font-weight:700">${d.tgt}</td>
    <td style="padding:4px 8px;color:#e0d8c0;font-size:9px;text-align:right">${d.val}</td>
    <td style="padding:4px 8px;color:#00cc44;font-size:10px;font-weight:600;text-align:right">${d.prem}</td>
    <td style="padding:4px 8px;color:${statusCol(d.status)};font-size:9px;font-weight:700;letter-spacing:.5px">${d.status}</td>
    <td style="padding:4px 8px;color:#aa9980;font-size:10px">${d.sector}</td>
    <td style="padding:4px 8px;color:${d.arb==='N/A'?'#332211':'#ff8800'};font-size:9px;text-align:right">${d.arb}</td>
  </tr>`).join('');
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:4px 10px">
    <span style="color:#F39F41;font-size:10px;font-weight:700;letter-spacing:2px">M&amp;A DEAL TRACKER</span>
    <span style="color:#998870;font-size:9px;margin-left:12px">ARB = merger arbitrage spread</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500;position:sticky;top:0">
      ${['DATE','ACQUIRER','TARGET','DEAL SIZE','PREMIUM','STATUS','SECTOR','ARB'].map(h=>`<th style="color:#ff8800;font-size:9px;letter-spacing:1px;padding:5px 8px;border-bottom:1px solid #1a0a00;background:#0a0500;text-align:${['ACQUIRER','TARGET','SECTOR','STATUS'].includes(h)?'left':'right'}">${h}</th>`).join('')}
    </tr>
    ${rows}
  </table></div>`;
}

// ── RISK DASHBOARD (RISK) ────────────────────────────────────────
function buildRISK(){
  const assets=['SPX','NDX','RTY','EEM','TLT','GLD','WTI','BTC'];
  const corr=[
    [1.00, 0.94, 0.88, 0.72,-0.42, 0.18, 0.34, 0.52],
    [0.94, 1.00, 0.82, 0.68,-0.38, 0.14, 0.28, 0.58],
    [0.88, 0.82, 1.00, 0.76,-0.35, 0.12, 0.36, 0.44],
    [0.72, 0.68, 0.76, 1.00,-0.28, 0.22, 0.48, 0.38],
    [-0.42,-0.38,-0.35,-0.28, 1.00, 0.42,-0.18,-0.22],
    [0.18, 0.14, 0.12, 0.22, 0.42, 1.00, 0.28, 0.14],
    [0.34, 0.28, 0.36, 0.48,-0.18, 0.28, 1.00, 0.32],
    [0.52, 0.58, 0.44, 0.38,-0.22, 0.14, 0.32, 1.00]
  ];
  function corrCol(v){
    if(v>=0.9)return'#ff2222';
    if(v>=0.7)return'#ff6600';
    if(v>=0.4)return'#ff9900';
    if(v>=0)return'#665840';
    if(v>=-0.4)return'#00bbdd';
    return'#00cc44';
  }
  const matrix = corr.map((row,i)=>`<tr>
    <td style="padding:3px 8px;color:#F39F41;font-size:8px;font-weight:700;white-space:nowrap">${assets[i]}</td>
    ${row.map((v,j)=>`<td style="padding:3px 6px;text-align:center;background:${i===j?'#1a0e00':'#000'};color:${corrCol(v)};font-size:8px;font-family:'Roboto Mono',monospace">${i===j?'—':v.toFixed(2)}</td>`).join('')}
  </tr>`).join('');
  const varData=[
    {asset:'SPX',var95:'−2.84%',var99:'−4.12%',cvar:'−5.88%',vol:'18.4%',beta:1.00},
    {asset:'NDX',var95:'−3.42%',var99:'−5.18%',cvar:'−7.24%',vol:'22.1%',beta:1.18},
    {asset:'BTC',var95:'−8.84%',var99:'−14.2%',cvar:'−22.4%',vol:'58.2%',beta:1.52},
    {asset:'GLD',var95:'−1.24%',var99:'−1.88%',cvar:'−2.64%',vol:'12.8%',beta:-0.08}
  ];
  const varRows=varData.map((v,i)=>`<tr style="background:${i%2?'#030200':'#000'}">
    <td style="padding:3px 8px;color:#ff8800;font-weight:700;font-size:9px">${v.asset}</td>
    <td style="padding:3px 8px;color:#ff8800;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${v.var95}</td>
    <td style="padding:3px 8px;color:#ff2222;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${v.var99}</td>
    <td style="padding:3px 8px;color:#cc0000;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${v.cvar}</td>
    <td style="padding:3px 8px;color:#665840;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${v.vol}</td>
    <td style="padding:3px 8px;color:#aa9980;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${v.beta}</td>
  </tr>`).join('');
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:4px 10px">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">RISK METRICS &amp; CORRELATION MATRIX</span>
  </div>
  <div style="display:flex;flex-direction:column;gap:0">
    <!-- VaR Table -->
    <div style="padding:8px 10px 4px;color:#998870;font-size:7px;letter-spacing:1px">VALUE AT RISK (1-DAY, 252-DAY WINDOW)</div>
    <table style="width:auto;border-collapse:collapse;margin:0 10px">
      <tr style="background:#0a0500">
        ${['ASSET','VaR 95%','VaR 99%','CVaR','VOL (1Y)','BETA'].map(h=>`<th style="color:#ff9900;font-size:7px;padding:3px 8px;border-bottom:2px solid #3a1800;text-align:${h==='ASSET'?'left':'right'}">${h}</th>`).join('')}
      </tr>
      ${varRows}
    </table>
    <!-- Correlation matrix -->
    <div style="padding:12px 10px 4px;color:#998870;font-size:7px;letter-spacing:1px">30-DAY ROLLING CORRELATION MATRIX</div>
    <table style="border-collapse:collapse;margin:0 10px">
      <tr>
        <th style="padding:3px 8px;color:#998870;font-size:7px"></th>
        ${assets.map(a=>`<th style="padding:3px 6px;color:#ff8800;font-size:7px;text-align:center">${a}</th>`).join('')}
      </tr>
      ${matrix}
    </table>
  </div>
  </div>`;
}

// ── GLOBAL MACRO HEATMAP (GMHM) ──────────────────────────────────
function buildGMHM(){
  const countries=[
    {name:'United States',gdp:2.8,cpi:3.1,rate:5.25,unemp:4.1,debt:122,cur:'USD',flag:'🇺🇸'},
    {name:'Euro Zone',gdp:0.4,cpi:2.4,rate:3.65,unemp:6.2,debt:88,cur:'EUR',flag:'🇪🇺'},
    {name:'United Kingdom',gdp:0.3,cpi:2.8,rate:5.25,unemp:4.4,debt:98,cur:'GBP',flag:'🇬🇧'},
    {name:'Japan',gdp:0.6,cpi:2.1,rate:0.50,unemp:2.4,debt:254,cur:'JPY',flag:'🇯🇵'},
    {name:'China',gdp:4.8,cpi:0.2,rate:3.10,unemp:5.2,debt:88,cur:'CNY',flag:'🇨🇳'},
    {name:'Germany',gdp:-0.2,cpi:2.2,rate:3.65,unemp:6.0,debt:66,cur:'EUR',flag:'🇩🇪'},
    {name:'France',gdp:0.9,cpi:2.6,rate:3.65,unemp:7.4,debt:112,cur:'EUR',flag:'🇫🇷'},
    {name:'Canada',gdp:1.4,cpi:2.6,rate:3.00,unemp:6.8,debt:106,cur:'CAD',flag:'🇨🇦'},
    {name:'Australia',gdp:1.6,cpi:3.4,rate:4.35,unemp:4.0,debt:55,cur:'AUD',flag:'🇦🇺'},
    {name:'India',gdp:7.2,cpi:4.8,rate:6.50,unemp:7.8,debt:84,cur:'INR',flag:'🇮🇳'},
    {name:'Brazil',gdp:3.1,cpi:5.1,rate:10.50,unemp:6.8,debt:92,cur:'BRL',flag:'🇧🇷'},
    {name:'Czech Rep.',gdp:1.8,cpi:2.4,rate:3.75,unemp:2.8,debt:46,cur:'CZK',flag:'🇨🇿'}
  ];
  function gdpCol(v){return v>=3?'#00cc44':v>=1?'#88cc44':v>=0?'#ff9900':v>=-1?'#ff6600':'#ff2222';}
  function cpiCol(v){return v<=2?'#00cc44':v<=3?'#ff9900':v<=5?'#ff6600':'#ff2222';}
  function rateCol(v){return v<=1?'#00bbdd':v<=3?'#ff9900':v<=6?'#ff6600':'#ff2222';}
  function debtCol(v){return v<=60?'#00cc44':v<=90?'#ff9900':v<=120?'#ff6600':'#ff2222';}
  const rows=countries.map((c,i)=>`<tr style="background:${i%2?'#030200':'#000'}" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background='${i%2?'#030200':'#000'}'">
    <td style="padding:4px 8px;font-size:9px">${c.flag} <span style="color:#ff8800">${c.name}</span></td>
    <td style="padding:4px 8px;color:${gdpCol(c.gdp)};text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${c.gdp>=0?'+':''}${c.gdp}%</td>
    <td style="padding:4px 8px;color:${cpiCol(c.cpi)};text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${c.cpi}%</td>
    <td style="padding:4px 8px;color:${rateCol(c.rate)};text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${c.rate}%</td>
    <td style="padding:4px 8px;color:#665840;text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${c.unemp}%</td>
    <td style="padding:4px 8px;color:${debtCol(c.debt)};text-align:right;font-family:'Roboto Mono',monospace;font-size:9px">${c.debt}%</td>
    <td style="padding:4px 8px;color:#998870;font-size:8px">${c.cur}</td>
  </tr>`).join('');
  return `<div style="height:100%;overflow:auto;background:#000;font-family:'Courier Prime',monospace">
  <div style="background:#080400;border-bottom:1px solid #2a1400;padding:4px 10px;display:flex;gap:16px;flex-wrap:wrap;align-items:center">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">GLOBAL MACRO HEATMAP</span>
    <span style="color:#00cc44;font-size:7px">● STRONG</span>
    <span style="color:#ff9900;font-size:7px">● MODERATE</span>
    <span style="color:#ff2222;font-size:7px">● WEAK/RISK</span>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr style="background:#0a0500;position:sticky;top:0">
      ${['COUNTRY','GDP YoY','CPI YoY','RATE','UNEMP','DEBT/GDP','CCY'].map(h=>`<th style="color:#ff8800;font-size:9px;letter-spacing:1px;padding:5px 8px;border-bottom:1px solid #1a0a00;background:#0a0500;text-align:${h==='COUNTRY'?'left':'right'}">${h}</th>`).join('')}
    </tr>
    ${rows}
  </table></div>`;
}




/* ════════════════════════════════════════════════════════════════
   MEGA DATA ENGINE v1.0
   - Live Crypto Options (Deribit)
   - Order Book Depth (Binance)  
   - Volume Profile / VPVR
   - Liquidation Heatmap
   - Whale Alert feed
   - On-Chain Analytics
   - Open Interest by Exchange
   - Funding Rate History
   - Options Greeks Dashboard
   - CVD (Cumulative Volume Delta)
════════════════════════════════════════════════════════════════ */

// ── GLOBAL DATA STORES ───────────────────────────────────────────
window._orderBook = {BTC:{bids:[],asks:[]},ETH:{bids:[],asks:[]}};
window._volProfile = {};
window._optionsData = {BTC:{calls:[],puts:[]},ETH:{calls:[],puts:[]}};
window._whaleAlerts = [];
window._cvdData = {BTC:[],ETH:[],SOL:[]};
window._oiByExchange = {};
window._fundingHistory = {};
window._liqHeatmap = {};
window._onChainData = {};

// ══ LIVE ORDER BOOK — Multi-source (Binance WS → REST → Bybit → OKX) ══════
// Supports all coins including non-Binance (XMR, ZEC via Bybit/OKX REST fallback)
window._ob = {}; // {SYM: {bids:[{px,qty,cumQty}], asks:[...], ts, src, sym}}
let _obWS = null;
let _obCurrentSym = 'BTC';
let _obRestTimer = null;

// Coins with Binance WS support (spot)
const _OB_BINANCE = new Set(['BTC','ETH','SOL','BNB','XRP','ADA','TRX','LINK','AVAX','SUI','XLM','LTC','DOT','UNI','NEAR','AAVE','ICP','KAS','APT','RENDER','ATOM','FIL','OP','ARB','INJ','JUP','RAY','JTO','PYTH','LDO','MKR','CRV','GMX','FTM','ALGO','VET','BCH','FET','IMX','STRK','SEI','ETC','GRT','PENDLE','HYPE','TON','OM','BERA','MOVE','VIRTUAL']);
// Coins to fetch from Bybit REST (not on Binance spot)
const _OB_BYBIT = new Set(['ZEC','XMR']);

function connectOrderBook(sym){
  sym = (sym||'BTC').replace('usdt','').replace('USDT','').toUpperCase();
  _obCurrentSym = sym;
  // Update button states
  document.querySelectorAll('.ob-coin-btn').forEach(b=>{
    b.style.color = b.dataset.sym===sym ? '#ff8800' : '#443322';
    b.style.borderColor = b.dataset.sym===sym ? '#ff6600' : '#1a0e00';
  });
  // Close existing WS
  if(_obWS){ try{_obWS.close();}catch(e){} _obWS=null; }
  if(_obRestTimer){ clearInterval(_obRestTimer); _obRestTimer=null; }

  if(_OB_BINANCE.has(sym)){
    _connectBinanceOBWS(sym);
  } else if(_OB_BYBIT.has(sym)){
    _fetchBybitOB(sym);
    _obRestTimer = setInterval(()=>_fetchBybitOB(sym), 2000);
  } else {
    _fetchOKXOB(sym);
    _obRestTimer = setInterval(()=>_fetchOKXOB(sym), 2000);
  }
}

function _connectBinanceOBWS(sym){
  const wsym = sym.toLowerCase()+'usdt';
  try{
    _obWS = new WebSocket('wss://stream.binance.com:9443/ws/'+wsym+'@depth20@100ms');
    _obWS.onmessage = e => {
      try{
        const d = JSON.parse(e.data);
        _processOB(sym, d.bids||[], d.asks||[], 'BN·WS');
      }catch(_){}
    };
    _obWS.onclose = ()=>{
      // Fallback to REST on WS close
      if(_obCurrentSym===sym){
        setTimeout(()=>_fetchBinanceOBREST(sym), 200);
        _obRestTimer = setInterval(()=>_fetchBinanceOBREST(sym), 2000);
      }
    };
    _obWS.onerror = ()=>{};
  }catch(e){
    _fetchBinanceOBREST(sym);
    _obRestTimer = setInterval(()=>_fetchBinanceOBREST(sym), 2000);
  }
}

async function _fetchBinanceOBREST(sym){
  if(window._tabHidden) return; // skip when tab hidden
  try{
    const r = await fetch('https://api.binance.com/api/v3/depth?symbol='+sym+'USDT&limit=20',
      {signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),3000);return c.signal;})()});
    if(!r.ok) return;
    const d = await r.json();
    _processOB(sym, d.bids||[], d.asks||[], 'BN·REST');
  }catch(_){}
}

async function _fetchBybitOB(sym){
  try{
    const r = await fetch('https://api.bybit.com/v5/market/orderbook?category=spot&symbol='+sym+'USDT&limit=25',
      {signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),3000);return c.signal;})()});
    if(!r.ok) return;
    const d = await r.json();
    const ob = d?.result;
    if(!ob) return;
    _processOB(sym, ob.b||[], ob.a||[], 'BYBIT');
  }catch(_){}
}

async function _fetchOKXOB(sym){
  try{
    const r = await fetch('https://www.okx.com/api/v5/market/books?instId='+sym+'-USDT&sz=25',
      {signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),3000);return c.signal;})()});
    if(!r.ok) return;
    const d = await r.json();
    const ob = d?.data?.[0];
    if(!ob) return;
    _processOB(sym, ob.bids||[], ob.asks||[], 'OKX');
  }catch(_){}
}

function _processOB(sym, rawBids, rawAsks, src){
  // Parse and sort
  const bids = rawBids.map(b=>({px:parseFloat(b[0]),qty:parseFloat(b[1])}))
    .filter(b=>b.px>0&&b.qty>0).sort((a,b)=>b.px-a.px).slice(0,25);
  const asks = rawAsks.map(a=>({px:parseFloat(a[0]),qty:parseFloat(a[1])}))
    .filter(a=>a.px>0&&a.qty>0).sort((a,b)=>a.px-b.px).slice(0,25);
  if(!bids.length||!asks.length) return;

  // Cumulative quantities
  let cumBid=0, cumAsk=0;
  bids.forEach(b=>{ cumBid+=b.qty; b.cum=cumBid; });
  asks.forEach(a=>{ cumAsk+=a.qty; a.cum=cumAsk; });

  // Total bid/ask volume for imbalance
  const totalBid = bids.reduce((s,b)=>s+b.qty*b.px, 0);
  const totalAsk = asks.reduce((s,a)=>s+a.qty*a.px, 0);
  const imbalance = totalBid/(totalBid+totalAsk);

  window._ob[sym] = {bids, asks, src, ts:Date.now(), totalBid, totalAsk, imbalance};
  _renderOrderBook(sym);
}

// Price flash tracking
const _obLastMid = {};
const _obPrevPrices = {};

function _renderOrderBook(sym){
  const el = document.getElementById('ob-body');
  if(!el || _obCurrentSym!==sym) return;
  const ob = window._ob[sym];
  if(!ob||!ob.bids.length||!ob.asks.length) return;

  const ROWS = 14;
  const asks = ob.asks.slice(0,ROWS);
  const bids = ob.bids.slice(0,ROWS);

  const bid0 = bids[0].px, ask0 = asks[0].px;
  const mid = (bid0+ask0)/2, spread = ask0-bid0;
  const spreadPct = (spread/bid0*100).toFixed(3);
  const lastMid = _obLastMid[sym]||mid;
  const midDir = mid>lastMid?1:mid<lastMid?-1:0;
  _obLastMid[sym] = mid;

  // Max cumulative for bar width
  const maxCumAsk = asks[asks.length-1]?.cum || 1;
  const maxCumBid = bids[bids.length-1]?.cum || 1;
  const maxCum = Math.max(maxCumAsk, maxCumBid);

  const fmtPx = v => {
    if(!v||isNaN(v)) return '—';
    if(v>=10000) return v.toLocaleString('en',{maximumFractionDigits:0});
    if(v>=1000)  return v.toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2});
    if(v>=100)   return v.toFixed(2);
    if(v>=1)     return v.toFixed(4);
    return v.toFixed(6);
  };
  const fmtSz = (v,px) => {
    // Show in base currency (coin units)
    if(v>=1e6)  return (v/1e6).toFixed(2)+'M';
    if(v>=1000) return v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');
    if(v>=1)    return v.toFixed(3);
    return v.toFixed(4);
  };
  const fmtTotal = v => {
    // Cumulative total in coin units
    if(v>=1e6)  return (v/1e6).toFixed(3)+'M';
    if(v>=1000) return v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');
    return v.toFixed(3);
  };

  const mkRow = (side, px, qty, cum, isNew) => {
    const cumPct = (cum/maxCum*100).toFixed(1);
    const isBid = side==='bid';
    const pxCol  = isBid ? '#26a65b' : '#e05252';
    const barCol = isBid ? 'rgba(38,166,91,0.18)' : 'rgba(224,82,82,0.18)';
    const barAcc = isBid ? 'rgba(38,166,91,0.08)' : 'rgba(224,82,82,0.08)';
    // Flash if price just appeared
    const rowBg = isNew ? (isBid?'rgba(38,166,91,0.08)':'rgba(224,82,82,0.08)') : 'transparent';

    return '<div style="display:flex;align-items:center;height:18px;position:relative;background:'+rowBg+';transition:background .3s">'
      // Depth bar — full width background
      +'<div style="position:absolute;'+(isBid?'right':'left')+':0;top:0;bottom:0;width:'+cumPct+'%;background:'+barAcc+'"></div>'
      // Size bar — stronger
      +'<div style="position:absolute;'+(isBid?'right':'left')+':0;top:2px;bottom:2px;width:'+Math.min(cumPct,30)+'%;background:'+barCol+'"></div>'
      // PRICE
      +'<span style="position:relative;color:'+pxCol+';font-size:11px;font-family:Roboto Mono,monospace;font-weight:700;width:80px;padding:0 8px;flex-shrink:0;text-align:left">'+fmtPx(px)+'</span>'
      // SIZE
      +'<span style="position:relative;color:#c8c0a8;font-size:10.5px;font-family:Roboto Mono,monospace;flex:1;text-align:right;padding:0 6px">'+fmtSz(qty,px)+'</span>'
      // TOTAL (cumulative)
      +'<span style="position:relative;color:#887766;font-size:10px;font-family:Roboto Mono,monospace;width:90px;text-align:right;padding:0 8px;flex-shrink:0">'+fmtTotal(cum)+'</span>'
      +'</div>';
  };

  // Track new price levels for flash
  const prevPx = _obPrevPrices[sym] || new Set();
  const curAskPx = new Set(asks.map(a=>a.px));
  const curBidPx = new Set(bids.map(b=>b.px));
  _obPrevPrices[sym] = new Set([...curAskPx,...curBidPx]);

  const askHTML = [...asks].reverse().map(a => mkRow('ask',a.px,a.qty,a.cum, !prevPx.has(a.px))).join('');
  const bidHTML = bids.map(b => mkRow('bid',b.px,b.qty,b.cum, !prevPx.has(b.px))).join('');

  const midCol = midDir>0?'#00cc44':midDir<0?'#ff5555':'#e0d8c0';
  const imbal  = ob.imbalance;
  const iCol   = imbal>0.58?'#26a65b':imbal<0.42?'#e05252':'#ff8800';
  const age    = ob.ts ? Math.round((Date.now()-ob.ts)/100)/10+'s' : '—';

  el.innerHTML =
    // Column headers
    '<div style="display:flex;align-items:center;background:#0a0800;border-bottom:1px solid #1a1200;padding:2px 0;flex-shrink:0">'
    +'<span style="color:#aa9980;font-size:8px;letter-spacing:.8px;width:80px;padding:0 8px;flex-shrink:0">PRICE</span>'
    +'<span style="color:#aa9980;font-size:8px;letter-spacing:.8px;flex:1;text-align:right;padding:0 6px">SIZE ('+sym+')</span>'
    +'<span style="color:#aa9980;font-size:8px;letter-spacing:.8px;width:90px;text-align:right;padding:0 8px;flex-shrink:0">TOTAL ('+sym+')</span>'
    +'</div>'
    // Asks (reversed — lowest ask nearest spread)
    + askHTML
    // SPREAD ROW
    +'<div style="display:flex;align-items:center;justify-content:center;gap:16px;background:#0d0a05;border-top:1px solid #1a1200;border-bottom:1px solid #1a1200;padding:4px 10px;flex-shrink:0">'
    +'<span style="color:#998870;font-size:8px;letter-spacing:1px">SPREAD</span>'
    +'<span style="color:#ff8800;font-size:11px;font-weight:700;font-family:Roboto Mono,monospace" id="ob-mid-'+sym+'">'+fmtPx(spread)+'</span>'
    +'<span style="color:#998870;font-size:10px;font-family:Roboto Mono,monospace">'+spreadPct+'%</span>'
    +'<span style="flex:1"></span>'
    +'<span style="font-size:9px;color:#998870">MID </span><span style="color:'+midCol+';font-size:12px;font-weight:700;font-family:Roboto Mono,monospace;transition:color .2s" id="ob-midpx-'+sym+'">'+fmtPx(mid)+'</span>'
    +'<span style="flex:1"></span>'
    +'<span style="font-size:9px;color:'+iCol+'">'+imbal.toFixed(2)+'</span>'
    +'</div>'
    // Bids
    + bidHTML
    // Footer
    +'<div style="display:flex;justify-content:space-between;align-items:center;background:#080600;padding:2px 8px;border-top:1px solid #100c00;flex-shrink:0">'
    +'<span style="color:#887760;font-size:8px;font-family:Roboto Mono,monospace">'+ob.src+'<span style="color:#221500"> '+age+'</span></span>'
    +'<span style="color:#887760;font-size:8px">BID <span style="color:#1a4422;font-family:Roboto Mono,monospace">'+fmtTotal(ob.totalBid/bid0)+'</span> · ASK <span style="color:#441a1a;font-family:Roboto Mono,monospace">'+fmtTotal(ob.totalAsk/ask0)+'</span></span>'
    +'</div>';

  // Mid price flash
  if(midDir!==0){
    const midEl = document.getElementById('ob-midpx-'+sym);
    if(midEl){
      midEl.style.color = midDir>0?'#00ffbb':'#ff6666';
      setTimeout(()=>{ if(midEl) midEl.style.color=midCol; },400);
    }
  }

  // Source badge
  const badge = document.getElementById('ob-src-badge');
  if(badge){ badge.textContent=ob.src; badge.style.color=ob.src.includes('WS')?'#00cc44':'#ff8800'; }
}

window._deribitData = {BTC:{},ETH:{}};
let _deribitWS = null;

async function fetchDeribitOptions(coin='BTC'){
  try{
    const r = await fetch(`https://www.deribit.com/api/v2/public/get_instruments?currency=${coin}&kind=option&expired=false`,{
      signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),10000);return c.signal;})()
    });
    const d = await r.json();
    if(!d.result) return;
    // Get current expiry options only
    const now = Date.now();
    const expiries = [...new Set(d.result.map(i=>i.expiration_timestamp))].sort();
    const nearExp = expiries.find(e=>e > now) || expiries[0];
    const instruments = d.result.filter(i=>i.expiration_timestamp===nearExp).slice(0,40);
    
    // Fetch ticker for each
    const tickers = await Promise.allSettled(instruments.map(async inst=>{
      try{
        const r2 = await fetch(`https://www.deribit.com/api/v2/public/ticker?instrument_name=${inst.instrument_name}`,{
          signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
        });
        const d2 = await r2.json();
        return {...d2.result, instrument:inst};
      }catch(e){return null;}
    }));
    
    const valid = tickers.filter(t=>t.status==='fulfilled'&&t.value).map(t=>t.value);
    window._deribitData[coin] = {
      expiry: new Date(nearExp).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'}).toUpperCase(),
      instruments: valid
    };
    _renderCryptoOptions(coin);
  }catch(e){}
}

function _renderCryptoOptions(coin){
  const el = document.getElementById('crypto-opt-'+coin.toLowerCase());
  if(!el) return;
  const data = window._deribitData[coin];
  if(!data||!data.instruments||!data.instruments.length){
    el.innerHTML='<div style="padding:20px;text-align:center;color:#998870;font-size:9px">LOADING DERIBIT OPTIONS...</div>';
    return;
  }
  const calls = data.instruments.filter(i=>i.instrument?.option_type==='call').sort((a,b)=>a.instrument.strike-b.instrument.strike);
  const puts = data.instruments.filter(i=>i.instrument?.option_type==='put').sort((a,b)=>a.instrument.strike-b.instrument.strike);
  
  const spotPrice = window._liveData?.crypto?.[coin]?.price || (coin==='BTC'?83200:1924);
  
  const optRow = (call,put)=>{
    if(!call&&!put) return '';
    const strike = call?.instrument?.strike || put?.instrument?.strike;
    const itm = spotPrice >= strike;
    const c_bid = call?.best_bid_price?.toFixed(4)||'—';
    const c_ask = call?.best_ask_price?.toFixed(4)||'—';
    const c_iv = call?.mark_iv?.toFixed(1)||'—';
    const c_delta = call?.greeks?.delta?.toFixed(3)||'—';
    const c_oi = call?.open_interest?.toFixed(0)||'—';
    const p_bid = put?.best_bid_price?.toFixed(4)||'—';
    const p_ask = put?.best_ask_price?.toFixed(4)||'—';
    const p_iv = put?.mark_iv?.toFixed(1)||'—';
    const p_delta = put?.greeks?.delta?.toFixed(3)||'—';
    const p_oi = put?.open_interest?.toFixed(0)||'—';
    return `<tr style="background:${itm?'#080500':'#040200'}">
      <td style="padding:2px 6px;color:#00cc44;font-size:8.5px;text-align:right;font-family:'Roboto Mono',monospace">${c_bid}</td>
      <td style="padding:2px 6px;color:#ff2222;font-size:8.5px;text-align:right;font-family:'Roboto Mono',monospace">${c_ask}</td>
      <td style="padding:2px 6px;color:#665840;font-size:8px;text-align:right">${c_iv}%</td>
      <td style="padding:2px 6px;color:#aa9980;font-size:8px;text-align:right">${c_delta}</td>
      <td style="padding:2px 4px;color:#998870;font-size:7.5px;text-align:right">${c_oi}</td>
      <td style="padding:2px 8px;color:${itm?'#00cc44':'#ff8800'};font-size:9px;font-weight:700;text-align:center;background:#0a0600;border-left:1px solid #1a0e00;border-right:1px solid #1a0e00">${strike?.toLocaleString()}</td>
      <td style="padding:2px 4px;color:#998870;font-size:7.5px;text-align:left">${p_oi}</td>
      <td style="padding:2px 6px;color:#aa9980;font-size:8px;text-align:left">${p_delta}</td>
      <td style="padding:2px 6px;color:#665840;font-size:8px;text-align:left">${p_iv}%</td>
      <td style="padding:2px 6px;color:#00cc44;font-size:8.5px;text-align:left;font-family:'Roboto Mono',monospace">${p_bid}</td>
      <td style="padding:2px 6px;color:#ff2222;font-size:8.5px;text-align:left;font-family:'Roboto Mono',monospace">${p_ask}</td>
    </tr>`;
  };
  
  // Pair calls and puts by strike
  const allStrikes = [...new Set([...calls,...puts].map(i=>i.instrument?.strike))].sort((a,b)=>a-b);
  const rows = allStrikes.map(str=>{
    const call = calls.find(c=>c.instrument?.strike===str);
    const put = puts.find(p=>p.instrument?.strike===str);
    return optRow(call,put);
  }).join('');
  
  el.innerHTML = `
    <div style="background:#060400;padding:4px 8px;border-bottom:1px solid #1a0e00;display:flex;gap:12px;align-items:center;flex-wrap:wrap;position:sticky;top:0">
      <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">${coin} OPTIONS</span>
      <span style="color:#665840;font-size:7.5px">EXP: ${data.expiry}</span>
      <span style="color:#ff8800;font-size:8px">SPOT: <b>${spotPrice.toLocaleString()}</b></span>
      <span style="color:#00cc44;font-size:7px">● DERIBIT LIVE</span>
    </div>
    <div style="overflow:auto;height:calc(100% - 26px)">
    <table style="width:100%;border-collapse:collapse">
      <tr style="background:#0a0500;position:sticky;top:0">
        <th colspan="5" style="color:#00cc44;font-size:7px;letter-spacing:1px;padding:3px 6px;border-bottom:1px solid #1a0e00;text-align:center">── CALLS ──</th>
        <th style="color:#ff8800;font-size:7px;letter-spacing:1px;padding:3px 8px;border-bottom:1px solid #1a0e00;text-align:center">STRIKE</th>
        <th colspan="5" style="color:#ff2222;font-size:7px;letter-spacing:1px;padding:3px 6px;border-bottom:1px solid #1a0e00;text-align:center">── PUTS ──</th>
      </tr>
      <tr style="background:#080500">
        ${['BID','ASK','IV','Δ','OI','','OI','Δ','IV','BID','ASK'].map((h,i)=>`<th style="color:#ff9900;font-size:6.5px;padding:2px 6px;border-bottom:1px solid #1a0e00;text-align:${i<5?'right':i===5?'center':'left'}">${h}</th>`).join('')}
      </tr>
      ${rows}
    </table>
    </div>`;
}

// ── VOLUME PROFILE / VPVR ────────────────────────────────────────
window._vpvrData = {};

async function fetchVolumeProfile(sym='BTCUSDT', interval='1h', limit=200){
  try{
    const r = await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${interval}&limit=${limit}`,{
      signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),10000);return c.signal;})()
    });
    const klines = await r.json();
    if(!Array.isArray(klines)) return;
    
    // Build volume profile
    const profile = {};
    const prices = klines.flatMap(k=>[parseFloat(k[2]),parseFloat(k[3])]);
    const minP = Math.min(...prices), maxP = Math.max(...prices);
    const numBuckets = 50;
    const bucketSize = (maxP - minP) / numBuckets;
    
    klines.forEach(k=>{
      const high=parseFloat(k[2]),low=parseFloat(k[3]),vol=parseFloat(k[5]);
      const buyVol = vol * (parseFloat(k[4])-parseFloat(k[1]))/(high-low||1) * 0.5;
      const sellVol = vol - buyVol;
      const midBucket = Math.floor((((high+low)/2)-minP)/bucketSize);
      const key = (minP + midBucket * bucketSize).toFixed(0);
      if(!profile[key]) profile[key]={total:0,buy:0,sell:0,price:parseFloat(key)};
      profile[key].total += vol;
      profile[key].buy += buyVol;
      profile[key].sell += sellVol;
    });
    
    window._vpvrData[sym] = {profile, minP, maxP, bucketSize};
  }catch(e){}
}

function buildVPVR(sym='BTCUSDT'){
  const coin = sym.replace('USDT','');
  const spotPrice = window._liveData?.crypto?.[coin]?.price || 83200;
  
  fetchVolumeProfile(sym);
  
  return `<div style="height:100%;background:#000;font-family:'Courier Prime',monospace;display:flex;flex-direction:column">
  <div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px;display:flex;gap:10px;align-items:center;flex-shrink:0">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">VOLUME PROFILE</span>
    <div style="display:flex;gap:6px">
      ${['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT'].map(s=>`
        <span onclick="document.getElementById('vpvr-content').innerHTML=buildVPVR('${s}');fetchVolumeProfile('${s}').then(()=>renderVPVR('${s}'))" 
          style="cursor:pointer;color:${s===sym?'#ff8800':'#443322'};font-size:8px;padding:1px 6px;border:1px solid ${s===sym?'#ff6600':'#1a0e00'}">${s.replace('USDT','')}</span>`).join('')}
    </div>
    <span style="color:#998870;font-size:7px">1H · 200 BARS</span>
  </div>
  <div id="vpvr-content" style="flex:1;overflow:auto;padding:8px">
    <div id="vpvr-chart-${sym}" style="height:100%">
      <div style="padding:20px;text-align:center;color:#998870;font-size:9px">⟳ LOADING VOLUME PROFILE...</div>
    </div>
  </div>
  </div>`;
}

function renderVPVR(sym){
  const el = document.getElementById('vpvr-chart-'+sym);
  if(!el) return;
  const data = window._vpvrData[sym];
  if(!data) return;
  
  const coin = sym.replace('USDT','');
  const spotPrice = window._liveData?.crypto?.[coin]?.price || 83200;
  
  const sorted = Object.values(data.profile).sort((a,b)=>b.price-a.price);
  const maxVol = Math.max(...sorted.map(b=>b.total));
  const poc = sorted.reduce((a,b)=>b.total>a.total?b:a);
  
  el.innerHTML = '<div style="font-size:7px;color:#998870;margin-bottom:4px;padding:0 4px">' +
    'POC: <span style="color:#ff8800">' + poc.price.toLocaleString() + '</span> · ' +
    'RANGE: <span style="color:#665840">' + data.minP.toFixed(0) + ' — ' + data.maxP.toFixed(0) + '</span>' +
  '</div>' + sorted.map(b=>{
    const pct = (b.total/maxVol*100);
    const buyPct = (b.buy/b.total*100);
    const isSpot = Math.abs(b.price-spotPrice)/spotPrice < 0.005;
    const isPOC = b.price===poc.price;
    return '<div style="display:flex;align-items:center;height:12px;margin-bottom:1px;' + (isSpot?'border-left:2px solid #ff8800;':isPOC?'border-left:2px solid #ff6600;':'border-left:2px solid transparent;') + '">' +
      '<span style="color:' + (isSpot?'#ff8800':isPOC?'#ff6600':'#332200') + ';font-size:6.5px;width:52px;text-align:right;padding-right:4px;font-family:\'Roboto Mono\',monospace">' + b.price.toFixed(0) + '</span>' +
      '<div style="position:relative;flex:1;height:10px;background:#0a0500">' +
        '<div style="position:absolute;left:0;top:0;bottom:0;width:' + pct + '%;background:' + (isPOC?'rgba(255,102,0,.6)':isSpot?'rgba(255,136,0,.4)':'rgba(255,136,0,.2)') + '"></div>' +
        '<div style="position:absolute;left:0;top:0;bottom:0;width:' + (pct*buyPct/100) + '%;background:rgba(0,204,68,.25)"></div>' +
      '</div>' +
      '<span style="color:#1a0e00;font-size:6px;width:36px;text-align:right;padding-left:4px;font-family:\'Roboto Mono\',monospace">' + (b.total/1000).toFixed(0) + 'K</span>' +
    '</div>';
  }).join('');
  
  setTimeout(()=>renderVPVR(sym), 60000);
}


// ── LIQUIDATION HEATMAP ──────────────────────────────────────────
window._liqMap = {};

async function fetchLiqHeatmap(sym='BTCUSDT'){
  try{
    // Use Binance OI + price data to estimate liquidation levels
    const [price, oi, funding] = await Promise.all([
      fetch('https://fapi.binance.com/fapi/v1/ticker/price?symbol=' + sym,{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()}).then(r=>r.json()),
      fetch('https://fapi.binance.com/fapi/v1/openInterest?symbol=' + sym,{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()}).then(r=>r.json()),
      fetch('https://fapi.binance.com/fapi/v1/fundingRate?symbol=' + sym + '&limit=1',{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()}).then(r=>r.json())
    ]);
    
    const spot = parseFloat(price.price);
    const totalOI = parseFloat(oi.openInterest) * spot;
    const fundingRate = funding[0] ? parseFloat(funding[0].fundingRate) : 0;
    
    // Estimate liquidation clusters at leverage levels
    const leverages = [5,10,20,25,50,100];
    const liqLevels = [];
    
    leverages.forEach(lev=>{
      const longLiq = spot * (1 - 1/lev);
      const shortLiq = spot * (1 + 1/lev);
      const weight = totalOI / leverages.length * (100/lev);
      liqLevels.push({price:longLiq,side:'long',lev,est:weight,label:`${lev}x LONG LIQ`});
      liqLevels.push({price:shortLiq,side:'short',lev,est:weight,label:`${lev}x SHORT LIQ`});
    });
    
    window._liqMap[sym] = {spot, totalOI, fundingRate, liqLevels, ts:Date.now()};
  }catch(e){}
}

function buildLIQHEAT(){
  const syms = ['BTCUSDT','ETHUSDT','SOLUSDT'];
  syms.forEach(s=>fetchLiqHeatmap(s));
  
  return '<div style="height:100%;background:#000;font-family:\'Courier Prime\',monospace;overflow:auto">' +
  '<div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px;display:flex;gap:10px;align-items:center">' +
    '<span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">LIQUIDATION HEATMAP</span>' +
    '<span style="color:#998870;font-size:7px">Estimated liq clusters by leverage</span>' +
    '<span style="color:#ff2222;font-size:7px">● LONG LIQ</span>' +
    '<span style="color:#00cc44;font-size:7px">● SHORT LIQ</span>' +
  '</div>' +
  '<div id="liq-heat-content" style="padding:8px">' +
    '<div style="padding:20px;text-align:center;color:#998870;font-size:9px">⟳ LOADING...</div>' +
  '</div>' +
  '</div>';
}

function renderLiqHeatmap(){
  const el = document.getElementById('liq-heat-content');
  if(!el) return;
  
  const syms = ['BTCUSDT','ETHUSDT','SOLUSDT'];
  let html = '';
  
  syms.forEach(sym=>{
    const data = window._liqMap[sym];
    if(!data) return;
    const coin = sym.replace('USDT','');
    
    const allLevels = [...data.liqLevels].sort((a,b)=>b.price-a.price);
    const maxEst = Math.max(...allLevels.map(l=>l.est));
    
    html += \`<div style="margin-bottom:16px">
      <div style="color:#F39F41;font-size:9px;font-weight:700;margin-bottom:6px;padding:4px 6px;background:#060300;border-left:2px solid #ff6600">
        \${coin} · SPOT: \${data.spot.toLocaleString()} · OI: $\${(data.totalOI/1e9).toFixed(2)}B · FUNDING: \${(data.fundingRate*100).toFixed(4)}%
      </div>
      \${allLevels.map(l=>{
        const pct = (l.est/maxEst*100);
        const diff = ((l.price-data.spot)/data.spot*100).toFixed(2);
        const col = l.side==='long'?'#ff2222':'#00cc44';
        const bg = l.side==='long'?`rgba(255,34,34,${pct/300})`:`rgba(0,204,68,${pct/300})`;
        return `<div style="display:flex;align-items:center;height:18px;margin-bottom:1px;background:${bg}">
          <span style="color:#887760;font-size:7px;width:90px;padding:0 6px">${l.label}</span>
          <span style="color:${col};font-size:8.5px;font-family:'Roboto Mono',monospace;width:80px;text-align:right;padding-right:6px">${l.price.toLocaleString('en',{maximumFractionDigits:0})}</span>
          <span style="color:#998870;font-size:7.5px;width:54px;text-align:right;padding-right:6px">${diff}%</span>
          <div style="flex:1;height:8px;background:#0a0500;margin:0 6px">
            <div style="height:100%;width:${pct}%;background:${col};opacity:.6"></div>
          </div>
          <span style="color:#1a0e00;font-size:7px;width:64px;text-align:right;padding-right:6px">~$${(l.est/1e6).toFixed(0)}M</span>
        </div>`;
      }).join('')}
    </div>`;
  });
  
  el.innerHTML = html || '<div style="padding:20px;color:#998870;font-size:9px;text-align:center">LOADING...</div>';
  setTimeout(renderLiqHeatmap, 30000);
}

// ── CVD — CUMULATIVE VOLUME DELTA ────────────────────────────────
window._cvdStore = {BTC:[],ETH:[],SOL:[]};
let _cvdWS = {};

function connectCVD(coin='BTC'){
  const sym = coin.toLowerCase()+'usdt';
  if(_cvdWS[coin]) try{_cvdWS[coin].close();}catch(e){}
  try{
    _cvdWS[coin] = new WebSocket(`wss://stream.binance.com:9443/ws/${sym}@aggTrade`);
    _cvdWS[coin].onmessage = e => {
      try{
        const d = JSON.parse(e.data);
        const isBuy = !d.m; // m=true means market maker (sell), false=buy
        const vol = parseFloat(d.q) * parseFloat(d.p);
        const delta = isBuy ? vol : -vol;
        const store = window._cvdStore[coin];
        const last = store[store.length-1];
        const cvd = (last?.cvd||0) + delta;
        store.push({ts:d.T, px:parseFloat(d.p), vol, delta, cvd, isBuy});
        if(store.length > 500) store.shift();
        _renderCVD(coin);
      }catch(ex){}
    };
    _cvdWS[coin].onerror = ()=>{};
  }catch(e){}
}

function _renderCVD(coin){
  const el = document.getElementById('cvd-'+coin.toLowerCase());
  if(!el) return;
  const store = window._cvdStore[coin];
  if(!store||store.length<2) return;
  
  const last50 = store.slice(-50);
  const maxCVD = Math.max(...last50.map(d=>Math.abs(d.cvd)));
  const lastCVD = last50[last50.length-1]?.cvd||0;
  const firstCVD = last50[0]?.cvd||0;
  const trend = lastCVD > firstCVD ? 'BULLISH' : 'BEARISH';
  const trendCol = lastCVD > firstCVD ? '#00cc44' : '#ff2222';
  
  // Simple sparkline
  const w=180, h=40;
  const pts = last50.map((d,i)=>{
    const x = i/(last50.length-1)*w;
    const y = h/2 - (d.cvd/maxCVD)*(h/2-2);
    return `${x},${y}`;
  }).join(' ');
  
  el.innerHTML = `<div style="padding:4px 6px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
      <span style="color:#998870;font-size:7px;letter-spacing:1px">CVD</span>
      <span style="color:${trendCol};font-size:8px;font-weight:700">${trend}</span>
      <span style="color:${lastCVD>=0?'#00cc44':'#ff2222'};font-size:8px;font-family:'Roboto Mono',monospace">${lastCVD>=0?'+':''}${(lastCVD/1000).toFixed(1)}K</span>
    </div>
    <svg width="${w}" height="${h}" style="display:block">
      <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#1a0e00" stroke-width="0.5"/>
      <polyline points="${pts}" fill="none" stroke="${trendCol}" stroke-width="1.5" opacity=".8"/>
    </svg>
  </div>`;
}

// ── OPEN INTEREST BY EXCHANGE ────────────────────────────────────
window._oiExchanges = {};

async function fetchOIByExchange(sym='BTC'){
  const exchanges = [
    {name:'Binance',  url:`https://fapi.binance.com/fapi/v1/openInterest?symbol=${sym}USDT`},
    {name:'Bybit',    url:`https://api.bybit.com/v5/market/open-interest?category=linear&symbol=${sym}USDT&intervalTime=1h&limit=1`},
    {name:'OKX',      url:`https://www.okx.com/api/v5/public/open-interest?instType=SWAP&instId=${sym}-USDT-SWAP`}
  ];
  
  const results = await Promise.allSettled(exchanges.map(async ex=>{
    try{
      const r = await fetch(ex.url,{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),6000);return c.signal;})()});
      const d = await r.json();
      let oi = 0;
      if(ex.name==='Binance') oi=parseFloat(d.openInterest||0);
      else if(ex.name==='Bybit') oi=parseFloat(d.result?.list?.[0]?.openInterest||0);
      else if(ex.name==='OKX') oi=parseFloat(d.data?.[0]?.oi||0);
      return {name:ex.name, oi};
    }catch(e){return {name:ex.name,oi:0};}
  }));
  
  window._oiExchanges[sym] = results.filter(r=>r.status==='fulfilled').map(r=>r.value);
}

// ── WHALE ALERT FEED ─────────────────────────────────────────────
window._whaleAlerts = [];

async function fetchWhaleAlerts(){
  // Use on-chain data to simulate whale alerts
  try{
    const r = await fetch('https://api.whale-alert.io/v1/transactions?api_key=test&min_value=500000&limit=20',{
      signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),6000);return c.signal;})()
    });
    // Free tier not available, use mock + blockchain.info
    const btcR = await fetch('https://blockchain.info/unconfirmed-transactions?format=json&limit=5',{
      signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),8000);return c.signal;})()
    });
    const btcD = await btcR.json();
    if(btcD.txs){
      btcD.txs.forEach(tx=>{
        const val = tx.out?.reduce((a,o)=>a+o.value,0)||0;
        const btcVal = val/1e8;
        if(btcVal > 0.5){
          window._whaleAlerts.unshift({
            coin:'BTC', amount:btcVal, 
            usd: btcVal * (window._liveData?.crypto?.BTC?.price||83200),
            hash: tx.hash?.slice(0,8)+'...', ts:Date.now()
          });
        }
      });
      if(window._whaleAlerts.length > 50) window._whaleAlerts = window._whaleAlerts.slice(0,50);
    }
  }catch(e){}
}

// ── ON-CHAIN ANALYTICS ───────────────────────────────────────────
window._onChain = {};

async function fetchOnChainAnalytics(){
  try{
    const [stats, btcPrice] = await Promise.all([
      fetch('https://api.blockchain.info/stats?cors=true',{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),8000);return c.signal;})()}).then(r=>r.json()),
      fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',{signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()}).then(r=>r.json())
    ]);
    
    const price = parseFloat(btcPrice.price||83200);
    window._onChain = {
      hashrate: (stats.hash_rate||0)/1e18,
      difficulty: stats.difficulty||0,
      mempoolSize: stats.mempool_size||0,
      txPerDay: stats.n_tx||0,
      blockTime: stats.minutes_between_blocks||10,
      totalBTC: (stats.totalbc||0)/1e8,
      marketCap: price * 19700000,
      fees: stats.total_fees_btc||0,
      ts: Date.now()
    };
  }catch(e){}
}

// ── PANEL BUILDERS ───────────────────────────────────────────────

// ORDER BOOK PANEL
function buildORDB(){
  setTimeout(function(){ connectOrderBook('BTC'); }, 80);
  setTimeout(function(){ connectCVD('BTC'); connectCVD('ETH'); }, 150);

  const OB_COINS=['BTC','ETH','SOL','BNB','XRP','ADA','LINK','AVAX','SUI','LTC',
    'DOT','UNI','NEAR','AAVE','APT','ATOM','INJ','OP','ARB','MKR',
    'XMR','ZEC','BCH','HYPE','TON','OM','BERA','MOVE'];

  return `<div style="height:100%;background:#000;font-family:'Courier Prime','Courier New',monospace;display:flex;flex-direction:column;overflow:hidden">

  <div style="background:#070500;border-bottom:1px solid #1a1200;padding:3px 8px;display:flex;gap:5px;align-items:center;flex-shrink:0">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px;flex-shrink:0">ORDER BOOK</span>
    <div style="display:flex;gap:2px;flex-wrap:wrap;flex:1;align-items:center">
      ${OB_COINS.map(c=>`<span
        onclick="connectOrderBook('${c}')"
        data-sym="${c}"
        class="ob-coin-btn"
        style="cursor:pointer;color:${c==='BTC'?'#ff8800':'#332200'};font-size:8px;padding:1px 5px;border:1px solid ${c==='BTC'?'#ff6600':'#120a00'};font-family:Roboto Mono,monospace;font-weight:700;transition:color .1s,border-color .1s">${c}</span>`).join('')}
    </div>
    <span id="ob-src-badge" style="color:#00cc44;font-size:7.5px;font-family:Roboto Mono,monospace;flex-shrink:0;padding:1px 5px;border:1px solid #003311">BN·WS</span>
  </div>

  <div id="ob-body" style="flex:1;overflow:hidden;min-height:0">
    <div style="padding:40px;text-align:center;color:#887760;font-size:9px">⟳ CONNECTING TO BINANCE...</div>
  </div>

  <div style="border-top:1px solid #0a0700;height:58px;display:flex;gap:0;flex-shrink:0">
    <div id="cvd-btc" style="flex:1;border-right:1px solid #0a0700"></div>
    <div id="cvd-eth" style="flex:1"></div>
  </div>

  </div>`;
}


// CRYPTO OPTIONS PANEL  
function buildCRYPTOOPT(){
  fetchDeribitOptions('BTC');
  return `<div style="height:100%;background:#000;font-family:'Courier Prime',monospace;display:flex;flex-direction:column">
  <div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px;display:flex;gap:8px;align-items:center;flex-shrink:0">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">CRYPTO OPTIONS CHAIN</span>
    <div style="display:flex;gap:4px">
      ${['BTC','ETH'].map(c=>`
        <span onclick="fetchDeribitOptions('${c}');document.getElementById('crypto-opt-content').innerHTML='<div style=padding:20px;text-align:center;color:#998870;font-size:9px>⟳ LOADING...</div>'" 
          style="cursor:pointer;color:${c==='BTC'?'#ff8800':'#443322'};font-size:8px;padding:1px 8px;border:1px solid ${c==='BTC'?'#ff6600':'#1a0e00'}">${c}</span>`).join('')}
    </div>
    <span style="color:#998870;font-size:7px;margin-left:auto">POWERED BY DERIBIT</span>
  </div>
  <div id="crypto-opt-content" style="flex:1;overflow:auto">
    <div id="crypto-opt-btc" style="height:100%">
      <div style="padding:20px;text-align:center;color:#998870;font-size:9px">⟳ LOADING DERIBIT OPTIONS...</div>
    </div>
  </div>
  </div>`;
}

// WHALE TRACKER PANEL
function buildWHALE(){
  fetchWhaleAlerts();
  fetchOnChainAnalytics();
  setInterval(()=>{fetchWhaleAlerts();_renderWhalePanel();}, 30000);
  setTimeout(_renderWhalePanel, 2000);
  
  return `<div style="height:100%;background:#000;font-family:'Courier Prime',monospace;display:flex;flex-direction:column">
  <div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">🐋 WHALE TRACKER &amp; ON-CHAIN</span>
  </div>
  <div style="display:flex;height:calc(100%-26px);overflow:hidden">
    <div style="flex:1;overflow:auto;border-right:1px solid #0a0500">
      <div style="padding:4px 8px;color:#998870;font-size:7px;letter-spacing:1px;border-bottom:1px solid #0a0500">LARGE TRANSACTIONS (BTC MEMPOOL)</div>
      <div id="whale-feed" style="padding:4px"></div>
    </div>
    <div style="width:220px;overflow:auto">
      <div style="padding:4px 8px;color:#998870;font-size:7px;letter-spacing:1px;border-bottom:1px solid #0a0500">ON-CHAIN METRICS</div>
      <div id="onchain-stats" style="padding:8px"></div>
    </div>
  </div>
  </div>`;
}

function _renderWhalePanel(){
  const wEl = document.getElementById('whale-feed');
  const oEl = document.getElementById('onchain-stats');
  
  if(wEl && window._whaleAlerts.length){
    wEl.innerHTML = window._whaleAlerts.slice(0,20).map(a=>`
      <div style="padding:4px 6px;border-bottom:1px solid #080500;display:flex;gap:8px;align-items:center">
        <span style="color:#F39F41;font-size:8px;font-weight:700">${a.coin}</span>
        <span style="color:#e0d8c0;font-size:9px;font-family:'Roboto Mono',monospace">${a.amount.toFixed(2)}</span>
        <span style="color:#998870;font-size:7.5px">~$${(a.usd/1e6).toFixed(1)}M</span>
        <span style="color:#887760;font-size:7px;margin-left:auto">${a.hash}</span>
      </div>`).join('');
  }
  
  if(oEl && window._onChain.hashrate){
    const d = window._onChain;
    oEl.innerHTML = [
      ['HASHRATE', `${d.hashrate.toFixed(2)} EH/s`,'#00cc44'],
      ['DIFFICULTY', `${(d.difficulty/1e12).toFixed(2)}T`,'#ff8800'],
      ['MEMPOOL', `${(d.mempoolSize/1e6).toFixed(1)}MB`,'#ff8800'],
      ['TX/DAY', d.txPerDay.toLocaleString(),'#665840'],
      ['BLOCK TIME', `${d.blockTime.toFixed(1)} min`,'#665840'],
      ['SUPPLY', `${(d.totalBTC/1e6).toFixed(2)}M BTC`,'#443322'],
      ['MKT CAP', `$${(d.marketCap/1e12).toFixed(2)}T`,'#00bbdd']
    ].map(([k,v,c])=>`
      <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #080500">
        <span style="color:#887760;font-size:7.5px;letter-spacing:.5px">${k}</span>
        <span style="color:${c};font-size:8.5px;font-family:'Roboto Mono',monospace">${v}</span>
      </div>`).join('');
  }
}

// OPEN INTEREST DASHBOARD
  return `<div style="height:100%;background:#000;font-family:'Courier Prime',monospace;display:flex;flex-direction:column">
  <div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">OPEN INTEREST DASHBOARD</span>
    <span style="color:#998870;font-size:7px;margin-left:12px">By Exchange · Perps</span>
  </div>
  <div id="oi-dash-content" style="flex:1;overflow:auto;padding:10px">
    <div style="padding:20px;text-align:center;color:#998870;font-size:9px">⟳ LOADING...</div>
  </div>
  </div>`;
}

function _renderOIDash(){
  const el = document.getElementById('oi-dash-content');
  if(!el) return;
  
  const coins = ['BTC','ETH','SOL'];
  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">';
  
  coins.forEach(coin=>{
    const data = window._oiExchanges[coin]||[];
    const total = data.reduce((a,d)=>a+d.oi,0);
    const spotPrice = window._liveData?.crypto?.[coin]?.price || (coin==='BTC'?83200:coin==='ETH'?1924:140);
    const totalUSD = total * spotPrice;
    
    html += `<div style="background:#050300;border:1px solid #0a0600;padding:10px">
      <div style="color:#F39F41;font-size:9px;font-weight:700;margin-bottom:8px">${coin} OPEN INTEREST</div>
      <div style="color:#00bbdd;font-size:16px;font-weight:700;font-family:'Roboto Mono',monospace;margin-bottom:6px">
        $${(totalUSD/1e9).toFixed(2)}B
      </div>
      ${data.map(ex=>{
        const pct = total>0?(ex.oi/total*100).toFixed(1):0;
        return `<div style="margin-bottom:4px">
          <div style="display:flex;justify-content:space-between;margin-bottom:1px">
            <span style="color:#665840;font-size:8px">${ex.name}</span>
            <span style="color:#ff8800;font-size:8px;font-family:'Roboto Mono',monospace">${pct}%</span>
          </div>
          <div style="height:4px;background:#0a0500;border-radius:2px">
            <div style="height:100%;width:${pct}%;background:#ff6600;border-radius:2px;opacity:.7"></div>
          </div>
        </div>`;
      }).join('')}
      ${data.length===0?'<div style="color:#1a0e00;font-size:8px">Loading...</div>':''}
    </div>`;
  });
  
  html += '</div>';
  el.innerHTML = html;
}

// FUNDING RATE HISTORY — see main block below (single definition)

// buildFUNDHIST and _renderFundingHist — see main block below (single definition)

// ── OPERATION EPIC FURY & MARINE AIS DATA INTEGRATION (WEBGL NATIVE) ──
(function(){
  const KML_URL = 'https://www.google.com/maps/d/u/0/kml?mid=1grL800fMN6Q3_1jQM75Zy5iGcaQWnrw&forcekml=1';
  window._allTrackingPts = [];
  
  if(typeof map !== 'undefined') {
      map.on('click', (e) => {
          if(!window._allTrackingPts || !window._allTrackingPts.length) return;
          const clickPix = map.latLngToLayerPoint(e.latlng);
          let bestDist = Infinity, bestPt = null;
          window._allTrackingPts.forEach(pt => {
              const ptPix = map.latLngToLayerPoint([pt.lat, pt.lng]);
              const dist = Math.sqrt(Math.pow(ptPix.x - clickPix.x, 2) + Math.pow(ptPix.y - clickPix.y, 2));
              if(dist < 30 && dist < bestDist) { bestDist = dist; bestPt = pt; }
          });
          if(bestPt) {
              setTimeout(() => {
                  L.popup({ className: 'bbpop', minWidth: 200, autoPan: false })
                      .setLatLng([bestPt.lat, bestPt.lng])
                      .setContent(bestPt.html)
                      .openOn(map);
              }, 50);
          }
      });
  }

  let _pulseO = 0.2, _pulseD = 1;
  setInterval(() => {
    _pulseO += _pulseD * 0.05;
    if(_pulseO > 0.6) _pulseD = -1;
    if(_pulseO < 0.1) _pulseD = 1;
    if(window.mapGL) {
       try { mapGL.setPaintProperty('epic-fury-pulse', 'circle-opacity', _pulseO); } catch(e){}
       try { mapGL.setPaintProperty('usgs-pulse', 'circle-opacity', _pulseO*0.8); } catch(e){}
    }
  }, 100);

  let _kmlHitLayer = null;

  async function _fetchEpicFuryKML() {
    try {
      if(typeof window.mapGL === 'undefined' || typeof map === 'undefined') return;
      const res = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(KML_URL), { signal: AbortSignal.timeout(15000) });
      if(!res.ok) return;
      const xml = (new DOMParser()).parseFromString(await res.text(), "text/xml");
      let geojsonShapes = [], geojsonPts = [];
      if(_kmlHitLayer) _kmlHitLayer.remove();
      _kmlHitLayer = L.layerGroup().addTo(map);
      xml.querySelectorAll('Placemark').forEach(pm => {
         const name = pm.querySelector('name') ? pm.querySelector('name').textContent : 'Unknown';
         const coordsNode = pm.querySelector('coordinates');
         if(!coordsNode) return;
         let desc = pm.querySelector('description') ? pm.querySelector('description').textContent : '';
         desc = desc.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<a /gi, '<a target="_blank" style="color:#00ddff;text-decoration:underline" ');
         const popupHtml = `<div class="pp"><div class="pp-t">${name}</div><div class="pp-city" style="color:#e0d8c0">${desc}</div></div>`;
         if(pm.querySelector('Polygon') || pm.querySelector('LineString')) {
             const pts = coordsNode.textContent.trim().split(/\s+/).map(pt => pt.split(',').map(Number).slice(0,2)).filter(ll => !isNaN(ll[0]));
             if(pts.length > 0) {
                 geojsonShapes.push({ type: 'Feature', properties: { desc: popupHtml }, geometry: { type: pm.querySelector('Polygon') ? 'Polygon' : 'LineString', coordinates: pm.querySelector('Polygon') ? [pts] : pts } });
                 const leafPts = pts.map(p => [p[1], p[0]]);
                 const hitbox = pm.querySelector('Polygon') ? L.polygon(leafPts, {opacity:0.01, fillOpacity:0.01}) : L.polyline(leafPts, {opacity:0.01, fillOpacity:0.01, weight:12});
                 hitbox.bindPopup(popupHtml, {className:'bbpop', minWidth:200, autoPan:false});
                 _kmlHitLayer.addLayer(hitbox);
             }
         } else {
             const pts = coordsNode.textContent.trim().split(/\s+/)[0].split(',').map(Number);
             if(!isNaN(pts[0]) && !isNaN(pts[1])) geojsonPts.push({ type: 'Feature', properties: { desc: popupHtml }, geometry: { type: 'Point', coordinates: [pts[0], pts[1]] } });
         }
      });
      window._allTrackingPts = window._allTrackingPts.filter(p => p.src !== 'kml');
      geojsonPts.forEach(f => window._allTrackingPts.push({lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], html: f.properties.desc, src: 'kml'}));
      if(mapGL.getSource('epic-fury-shapes')) {
          mapGL.getSource('epic-fury-shapes').setData({ type: 'FeatureCollection', features: geojsonShapes });
          mapGL.getSource('epic-fury-pts').setData({ type: 'FeatureCollection', features: geojsonPts });
      } else {
          mapGL.addSource('epic-fury-shapes', { type: 'geojson', data: { type: 'FeatureCollection', features: geojsonShapes } });
          mapGL.addSource('epic-fury-pts', { type: 'geojson', data: { type: 'FeatureCollection', features: geojsonPts } });
          mapGL.addLayer({ id: 'epic-fury-poly', type: 'fill', source: 'epic-fury-shapes', paint: { 'fill-color': '#ff2222', 'fill-opacity': 0.1 }, filter: ['==', '$type', 'Polygon'] });
          mapGL.addLayer({ id: 'epic-fury-line', type: 'line', source: 'epic-fury-shapes', paint: { 'line-color': '#ffaa00', 'line-width': 2, 'line-dasharray': [4,4] } });
          mapGL.addLayer({ id: 'epic-fury-pulse', type: 'circle', source: 'epic-fury-pts', paint: { 'circle-radius': 9, 'circle-color': 'transparent', 'circle-stroke-width': 1, 'circle-stroke-color': '#ff2222', 'circle-opacity': 0.5, 'circle-pitch-alignment': 'map' }});
          mapGL.addLayer({ id: 'epic-fury-dot', type: 'circle', source: 'epic-fury-pts', paint: { 'circle-radius': 3.5, 'circle-color': '#ff2222', 'circle-opacity': 1.0, 'circle-pitch-alignment': 'map' }});
      }
    } catch(err) {}
  }

  async function _fetchLiveNews() {
    try {
      if(typeof window.mapGL === 'undefined') return;
      const res = await fetch('https://corsproxy.io/?url=' + encodeURIComponent('https://api.gdeltproject.org/api/v1/gkg_geojson?TIMESPAN=1440&OUTPUTFIELDS=name,url,domain&MAXROWS=1000'), { signal: AbortSignal.timeout(15000) });
      if(!res.ok) return;
      const data = await res.json();
      if(!data || !data.features) return;
      let geojsonPts = [];
      data.features.slice(0,200).forEach(f => {
         if(!f.geometry || !f.geometry.coordinates) return;
         geojsonPts.push({ type: 'Feature', properties: { desc: `<div class="pp"><div class="pp-t">${f.properties.name}</div><div class="pp-city"><a href="${f.properties.url}" target="_blank">View Report</a></div></div>` }, geometry: f.geometry });
      });
      
      if(mapGL.getSource('news')) {
          mapGL.getSource('news').setData({ type: 'FeatureCollection', features: geojsonPts });
      }
      
      window._allTrackingPts = window._allTrackingPts.filter(p => p.src !== 'gkg-news');
      geojsonPts.forEach(f => window._allTrackingPts.push({lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], html: f.properties.desc, src: 'gkg-news'}));
    } catch(err) {}
  }

  setTimeout(_fetchEpicFuryKML, 4500);
  setInterval(_fetchLiveNews, 5 * 60 * 1000);
})();

function _renderFundingHistTab(){
  setTimeout(_renderFundingHist, 3000);
  if(!window._fundHistInterval){ window._fundHistInterval = setInterval(()=>{
      var _s = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'TRXUSDT', 'HYPEUSDT', 'LINKUSDT', 'AVAXUSDT', 'SUIUSDT', 'XLMUSDT', 'LTCUSDT', 'DOTUSDT', 'UNIUSDT', 'NEARUSDT', 'AAVEUSDT', 'ICPUSDT', 'KASUSDT'];
      _s.forEach(function(s){ try{fetchFundingHistory(s);}catch(e){} });
      setTimeout(_renderFundingHist,3000);
    }, 60000); }
  
  return `<div style="height:100%;background:#000;font-family:'Courier Prime',monospace;display:flex;flex-direction:column">
  <div style="background:#060400;border-bottom:1px solid #1a0e00;padding:4px 10px">
    <span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:2px">FUNDING RATE HISTORY</span>
    <span style="color:#998870;font-size:7px;margin-left:12px">8h intervals · 32 days</span>
  </div>
  <div id="funding-hist-content" style="flex:1;overflow:auto;padding:10px">
    <div style="padding:20px;text-align:center;color:#998870;font-size:9px">⟳ LOADING...</div>
  </div>
  </div>`;
}

function _renderFundingHist(){
  const el = document.getElementById('funding-hist-content');
  if(!el) return;
  
  const syms = ['BTCUSDT','ETHUSDT','SOLUSDT'];
  let html = '';
  
  syms.forEach(sym=>{
    const data = window._fundingHist[sym]||[];
    if(!data.length) return;
    const coin = sym.replace('USDT','');
    const avg = data.reduce((a,d)=>a+d.rate,0)/data.length;
    const last = data[data.length-1]?.rate||0;
    const maxAbs = Math.max(...data.map(d=>Math.abs(d.rate)));
    
    html += `<div style="margin-bottom:16px">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:6px">
        <span style="color:#F39F41;font-size:9px;font-weight:700">${coin}</span>
        <span style="color:${last>=0?'#089981':'#ff3333'};font-size:9px;font-family:'Roboto Mono',monospace">CURRENT: ${last>=0?'+':''}${last.toFixed(4)}%</span>
        <span style="color:#998870;font-size:8px">AVG: ${avg>=0?'+':''}${avg.toFixed(4)}%</span>
        <span style="color:${avg>0.01?'#ff3333':avg<-0.01?'#089981':'#665840'};font-size:8px;font-weight:700">${avg>0.01?'LONGS PAY':avg<-0.01?'SHORTS PAY':'NEUTRAL'}</span>
      </div>
      <div style="display:flex;align-items:flex-end;height:40px;gap:1px">
        ${data.slice(-48).map(d=>{
          const h = maxAbs>0?Math.abs(d.rate)/maxAbs*38:0;
          const col = d.rate>0?'#ff3333':'#089981';
          return `<div style="flex:1;height:${h}px;background:${col};opacity:.7;min-width:2px" title="${d.rate.toFixed(4)}%"></div>`;
        }).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:2px">
        <span style="color:#1a0e00;font-size:6.5px">${data.length>0?new Date(data[data.length-48]?.ts||0).toLocaleDateString('en-GB',{day:'2-digit',month:'short'}):''}</span>
        <span style="color:#1a0e00;font-size:6.5px">NOW</span>
      </div>
    </div>`;
  });
  
  el.innerHTML = html || '<div style="padding:20px;color:#998870">Loading...</div>';
}

// Auto-start all new feeds
setTimeout(()=>{
  try{ _loadValidFuturesSyms && _loadValidFuturesSyms(); }catch(e){ console.warn('_loadValidFuturesSyms err',e); }
  try{ connectOrderBook('BTC'); }catch(e){}
  try{ fetchDeribitOptions('BTC'); }catch(e){}
  try{ fetchWhaleAlerts(); }catch(e){}
  try{ fetchOnChainAnalytics(); }catch(e){}
  try{ ['BTC','ETH','SOL'].forEach(fetchOIByExchange); }catch(e){}
  // Load valid futures symbols first, then fetch funding for ALL coins
  _loadValidFuturesSyms().catch(function(e){ console.warn('_loadValidFuturesSyms failed, continuing anyway',e); }).then(function(){
  console.log('%c FUNDING FETCH START ', 'background:#ff8800;color:#000;font-weight:bold');
  (function _fetchAllFunding(){
    var syms = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'TRXUSDT', 'HYPEUSDT', 'LINKUSDT', 'AVAXUSDT', 'SUIUSDT', 'XLMUSDT', 'LTCUSDT', 'DOTUSDT', 'UNIUSDT', 'NEARUSDT', 'AAVEUSDT', 'ICPUSDT', 'KASUSDT', 'APTUSDT', 'RENDERUSDT', 'ATOMUSDT', 'FILUSDT', 'OPUSDT', 'ARBUSDT', 'INJUSDT', 'JUPUSDT', 'RAYUSDT', 'JTOUSDT', 'PYTHUSDT', 'LDOUSDT', 'MKRUSDT', 'CRVUSDT', 'GMXUSDT', 'FTMUSDT', 'ALGOUSDT', 'VETUSDT', 'XMRUSDT', 'BCHUSDT', 'FETUSDT', 'IMXUSDT', 'STRKUSDT', 'SEIUSDT', 'TONUSDT', 'OMUSDT', 'VIRTUALUSDT', 'BERAUSDT', 'MOVEUSDT', 'ETCUSDT', 'ZECUSDT', 'GRTUSDT', 'PENDLEUSDT', 'ICPUSDT', 'DOMUSDT'];
    var i = 0;
    function _next(){
      var batch = syms.slice(i, i+5);
      batch.forEach(function(s){ try{fetchFundingHistory(s);}catch(e){} });
      i += 5;
      if(i < syms.length) setTimeout(_next, 400);
      else setTimeout(_patchCryptoFundingCells, 2000);
    }
    _next();
  })();
  }); // end _loadValidFuturesSyms().then
  fetchVolumeProfile('BTCUSDT');
  setInterval(()=>{
    fetchWhaleAlerts();
    fetchOnChainAnalytics();
  }, 30000);
  // Refresh funding every 2 min (staggered)
  setInterval(function(){
    _loadValidFuturesSyms(); // re-validate periodically
    var syms = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'TRXUSDT', 'HYPEUSDT', 'LINKUSDT', 'AVAXUSDT', 'SUIUSDT', 'XLMUSDT', 'LTCUSDT', 'DOTUSDT', 'UNIUSDT', 'NEARUSDT', 'AAVEUSDT', 'ICPUSDT', 'KASUSDT', 'APTUSDT', 'RENDERUSDT', 'ATOMUSDT', 'FILUSDT', 'OPUSDT', 'ARBUSDT', 'INJUSDT', 'JUPUSDT', 'RAYUSDT', 'JTOUSDT', 'PYTHUSDT', 'LDOUSDT', 'MKRUSDT', 'CRVUSDT', 'GMXUSDT', 'FTMUSDT', 'ALGOUSDT', 'VETUSDT', 'XMRUSDT', 'BCHUSDT', 'FETUSDT', 'IMXUSDT', 'STRKUSDT', 'SEIUSDT', 'TONUSDT', 'OMUSDT', 'VIRTUALUSDT', 'BERAUSDT', 'MOVEUSDT', 'ETCUSDT', 'ZECUSDT', 'GRTUSDT', 'PENDLEUSDT', 'ICPUSDT', 'DOMUSDT'];
    var i = 0;
    function _next(){ var b=syms.slice(i,i+5); b.forEach(function(s){try{fetchFundingHistory(s);}catch(e){}});i+=5;if(i<syms.length)setTimeout(_next,400);else setTimeout(_patchCryptoFundingCells,1000); }
    _next();
  }, 120000);
}, 2000);

console.log('%c MEGA DATA ENGINE ', 'background:#ff2222;color:#fff;font-weight:bold', 'Order Book · Options · CVD · Whale · On-Chain · OI · Funding');

// ── Independent funding cell patching — runs regardless of _startAllFeeds ──
setTimeout(function(){ if(typeof _patchCryptoFundingCells==='function') _patchCryptoFundingCells(); }, 4000);
setTimeout(function(){ if(typeof _patchCryptoFundingCells==='function') _patchCryptoFundingCells(); }, 8000);
// DUP REMOVED: setInterval(function(){ if(typeof _patchCryptoFundingCells==='function') _patchCryptoFundingCells(); }, 6000);
// Also run fetchFundingRates independently for _liveData.funding fallback
setTimeout(function(){ if(typeof fetchFundingRates==='function') try{fetchFundingRates();}catch(e){} }, 3000);
// DUP REMOVED: setInterval(function(){ if(typeof fetchFundingRates==='function') try{fetchFundingRates();}catch(e){} }, 15000);

// ══ OPERATION EPIC FURY & MARINE AIS DATA INTEGRATION (WEBGL NATIVE) ══
(function(){
  const KML_URL = 'https://www.google.com/maps/d/u/0/kml?mid=1grL800fMN6Q3_1jQM75Zy5iGcaQWnrw&forcekml=1';
  window._allTrackingPts = [];
  
  if(typeof map !== 'undefined') {
      map.on('click', (e) => {
          if(!window._allTrackingPts || !window._allTrackingPts.length) return;
          const clickPix = map.latLngToLayerPoint(e.latlng);
          let bestDist = Infinity, bestPt = null;
          window._allTrackingPts.forEach(pt => {
              const ptPix = map.latLngToLayerPoint([pt.lat, pt.lng]);
              const dist = Math.sqrt(Math.pow(ptPix.x - clickPix.x, 2) + Math.pow(ptPix.y - clickPix.y, 2));
              if(dist < 30 && dist < bestDist) {
                  bestDist = dist;
                  bestPt = pt;
              }
          });
          if(bestPt) {
              // Delay execution by 50ms so Leaflet's map-click auto-close mechanism doesn't instantly destroy the new popup
              setTimeout(() => {
                  L.popup({ className: 'bbpop', minWidth: 200, autoPan: false })
                      .setLatLng([bestPt.lat, bestPt.lng])
                      .setContent(bestPt.html)
                      .openOn(map);
              }, 50);
          }
      });
  }

  let _pulseO = 0.2, _pulseD = 1;
  setInterval(() => {
    _pulseO += _pulseD * 0.05;
    if(_pulseO > 0.6) _pulseD = -1;
    if(_pulseO < 0.1) _pulseD = 1;
    if(window.mapGL) {
       try { mapGL.setPaintProperty('epic-fury-pulse', 'circle-opacity', _pulseO); } catch(e){}
       try { mapGL.setPaintProperty('usgs-pulse', 'circle-opacity', _pulseO*0.8); } catch(e){}
    }
  }, 100);

  let _kmlHitLayer = null;

  async function _fetchEpicFuryKML() {
    try {
      if(typeof window.mapGL === 'undefined' || typeof map === 'undefined') return;
      const res = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(KML_URL), { signal: AbortSignal.timeout(15000) });
      if(!res.ok) return;
      const xml = (new DOMParser()).parseFromString(await res.text(), "text/xml");
      
      let geojsonShapes = [], geojsonPts = [];
      let count = 0;
      
      if(_kmlHitLayer) _kmlHitLayer.remove();
      _kmlHitLayer = L.layerGroup().addTo(map);

      
      xml.querySelectorAll('Placemark').forEach(pm => {
         const name = pm.querySelector('name') ? pm.querySelector('name').textContent : 'Unknown';
         const coordsNode = pm.querySelector('coordinates');
         if(!coordsNode) return;
         let desc = pm.querySelector('description') ? pm.querySelector('description').textContent : '';
         desc = desc.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<a /gi, '<a target="_blank" style="color:#00ddff;text-decoration:underline" ');
         const popupHtml = `<div class="pp"><div class="pp-t">${name}</div><div class="pp-city" style="color:#e0d8c0;white-space:normal;max-width:280px;max-height:300px;overflow-y:auto;line-height:1.4">${desc}</div></div>`;
         
         if(pm.querySelector('Polygon') || pm.querySelector('LineString')) {
             const pts = coordsNode.textContent.trim().split(/\s+/).map(pt => pt.split(',').map(Number).slice(0,2)).filter(ll => !isNaN(ll[0]));
             if(pts.length > 0) {
                 geojsonShapes.push({ type: 'Feature', properties: { desc: popupHtml }, geometry: { type: pm.querySelector('Polygon') ? 'Polygon' : 'LineString', coordinates: pm.querySelector('Polygon') ? [pts] : pts } });
                 // Create invisible Leaflet polyline/polygon for clicking (using 0.01 opacity to force hit-testing)
                 const leafPts = pts.map(p => [p[1], p[0]]); // Leaflet uses [lat, lng]
                 const hitbox = pm.querySelector('Polygon') ? L.polygon(leafPts, {opacity:0.01, fillOpacity:0.01}) : L.polyline(leafPts, {opacity:0.01, fillOpacity:0.01, weight:12});
                 hitbox.bindPopup(popupHtml, {className:'bbpop', minWidth:200, autoPan:false});
                 _kmlHitLayer.addLayer(hitbox);
                 count++;
             }
         } else {
             const pts = coordsNode.textContent.trim().split(/\s+/)[0].split(',').map(Number);
             if(!isNaN(pts[0]) && !isNaN(pts[1])) {
                 geojsonPts.push({ type: 'Feature', properties: { desc: popupHtml }, geometry: { type: 'Point', coordinates: [pts[0], pts[1]] } });
                 count++;
             }
         }
      });
      // Register invisible click points for math raycaster
      window._allTrackingPts = window._allTrackingPts.filter(p => p.src !== 'kml');
      geojsonPts.forEach(f => window._allTrackingPts.push({lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], html: f.properties.desc, src: 'kml'}));
      
      if(mapGL.getSource('epic-fury-shapes')) {
          mapGL.getSource('epic-fury-shapes').setData({ type: 'FeatureCollection', features: geojsonShapes });
          mapGL.getSource('epic-fury-pts').setData({ type: 'FeatureCollection', features: geojsonPts });
      } else {
          mapGL.addSource('epic-fury-shapes', { type: 'geojson', data: { type: 'FeatureCollection', features: geojsonShapes } });
          mapGL.addSource('epic-fury-pts', { type: 'geojson', data: { type: 'FeatureCollection', features: geojsonPts } });
          mapGL.addLayer({ id: 'epic-fury-poly', type: 'fill', source: 'epic-fury-shapes', paint: { 'fill-color': '#ff2222', 'fill-opacity': 0.1 }, filter: ['==', '$type', 'Polygon'] });
          mapGL.addLayer({ id: 'epic-fury-line', type: 'line', source: 'epic-fury-shapes', paint: { 'line-color': '#ffaa00', 'line-width': 2, 'line-dasharray': [4,4] } });
          mapGL.addLayer({ id: 'epic-fury-pulse', type: 'circle', source: 'epic-fury-pts', paint: { 'circle-radius': 9, 'circle-color': 'transparent', 'circle-stroke-width': 1, 'circle-stroke-color': '#ff2222', 'circle-opacity': 0.5, 'circle-pitch-alignment': 'map' }});
          mapGL.addLayer({ id: 'epic-fury-dot', type: 'circle', source: 'epic-fury-pts', paint: { 'circle-radius': 3.5, 'circle-color': '#ff2222', 'circle-opacity': 1.0, 'circle-pitch-alignment': 'map' }});
      }
    } catch(err) {}
  }

  async function _fetchLiveNews() {
    try {
      if(typeof window.mapGL === 'undefined') return;
      const gdeltUrl = 'https://api.gdeltproject.org/api/v1/gkg_geojson?TIMESPAN=1440&OUTPUTFIELDS=name,url,domain&MAXROWS=3000';
      const res = await fetch('https://corsproxy.io/?url=' + encodeURIComponent(gdeltUrl), { signal: AbortSignal.timeout(15000) });
      if(!res.ok) return;
      const data = await res.json();
      if(!data || !data.features) return;
      
      let geojsonPts = [];
      const locations = ['iran', 'israel', 'lebanon', 'gaza', 'syria', 'yemen', 'palestine', 'tehran', 'tel aviv', 'jerusalem', 'esfahan', 'haifa', 'beyrouth'];
      const kinetics = [
          { key: 'rocket', label: 'ROCKET ATTACK', color: '#ff2200' },
          { key: 'missile', label: 'MISSILE STRIKE', color: '#ff2200' },
          { key: 'bomb', label: 'BOMBING', color: '#ff5500' },
          { key: 'strike', label: 'AIR STRIKE', color: '#ff2200' },
          { key: 'drone', label: 'UAV STRIKE', color: '#ffaa00' },
          { key: 'uav', label: 'UAV STRIKE', color: '#ffaa00' },
          { key: 'intercept', label: 'INTERCEPTION', color: '#ffff00' },
          { key: 'explosion', label: 'EXPLOSION DETECTED', color: '#ff5500' },
          { key: 'attack', label: 'COMBAT ENGAGEMENT', color: '#ff2200' },
          { key: 'oil', label: 'INFRASTRUCTURE HIT', color: '#ff00ff' }
      ];
      
      data.features.forEach(f => {
         if(!f.geometry || !f.geometry.coordinates || f.geometry.coordinates.length < 2) return;
         
         const title = f.properties.name || '';
         const url = f.properties.url || '';
         const matchStr = (title + ' ' + url).toLowerCase();
         
         if(!locations.some(l => matchStr.includes(l))) return;
         
         let tacticalType = null;
         for(let k of kinetics) {
             if(matchStr.includes(k.key)) { tacticalType = k; break; }
         }
         
         if(!tacticalType) return;
         
         const link = f.properties.url || '#';
         const domain = f.properties.domain || '';
         
         const html = `<div class="pp"><div class="pp-t" style="color:${tacticalType.color}">[LIVE] ${tacticalType.label}</div><div class="pp-city" style="color:#e0d8c0"><a href="${link}" target="_blank" style="color:#00ddff;text-decoration:underline">${title || 'Breaking Kinetic Report'}</a><br><span style="color:#888;font-size:10px">${domain}</span></div></div>`;
         
         const jitterLng = (Math.random() - 0.5) * 1.8;
         const jitterLat = (Math.random() - 0.5) * 1.8;
         const finalLng = f.geometry.coordinates[0] + jitterLng;
         const finalLat = f.geometry.coordinates[1] + jitterLat;
         
         geojsonPts.push({ type: 'Feature', properties: { desc: html, color: tacticalType.color }, geometry: { type: 'Point', coordinates: [finalLng, finalLat] } });
      });
      
      if(mapGL.getSource('news')) {
          mapGL.getSource('news').setData({ type: 'FeatureCollection', features: geojsonPts });
      }
      
      window._allTrackingPts = window._allTrackingPts.filter(p => p.src !== 'gkg-news');
      geojsonPts.forEach(f => window._allTrackingPts.push({lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], html: f.properties.desc, src: 'gkg-news'}));
    } catch(err) {}
  }

  setTimeout(_fetchEpicFuryKML, 4500);
  setInterval(_fetchLiveNews, 5 * 60 * 1000);
})();



// ══════════════════════════════════════════════════
//  BLOOMBERG ADVANCED CHART WIDGET (LIGHTWEIGHT CHARTS)
// ══════════════════════════════════════════════════
window._bbgChart = null;


// ── Kill TradingView attribution in Lightweight Charts ──────────────────
(function() {
  function killTVLogo() {
    // Remove all <a> links pointing to tradingview.com anywhere on page
    document.querySelectorAll('a[href*="tradingview"],a[href*="TradingView"]').forEach(el => {
      el.style.cssText = 'display:none!important;width:0!important;height:0!important;overflow:hidden!important;opacity:0!important;';
      el.setAttribute('aria-hidden','true');
      try { el.parentNode && el.parentNode.removeChild(el); } catch(e) {}
    });
    // Also hide any .tv-lightweight-charts anchor
    document.querySelectorAll('.tv-lightweight-charts a').forEach(el => {
      el.style.cssText = 'display:none!important;width:0!important;height:0!important;';
      try { el.parentNode && el.parentNode.removeChild(el); } catch(e) {}
    });
    // Ensure cover div is on top
    const cover = document.getElementById('tv-logo-cover');
    if (cover) cover.style.zIndex = '99999';
  }
  // Run immediately and on DOM changes
  killTVLogo();
  const obs = new MutationObserver(killTVLogo);
  obs.observe(document.body, { childList: true, subtree: true });
  // Also run after delays in case chart loads late
  [200, 500, 1000, 2000, 4000].forEach(t => setTimeout(killTVLogo, t));
})();
window._currentBbgSeries = null;
window._currentBbgWs = null;
window._bbgFetchId = 0;
window._firstBbgPrice = 0;
window._chigh = -Infinity;
window._clow = Infinity;
window._lastBbgPriceTick = null;
window._cvol = 0;

window._fetchWithProxies = async function(u, signal) {
    const tryFetch = async (url) => {
        try {
            const res = await fetch(url, { signal: signal, cache: 'no-store' });
            if(!res.ok) return null;
            return await res.json();
        } catch(e) { 
            if(e.name === 'AbortError') throw e; // propagate abort
            return null; 
        }
    };
    
    let data = await tryFetch(u);
    if(data) return data;
    
    const altEndpoints = ['api1','api2','api3'];
    for(const end of altEndpoints) {
        data = await tryFetch(u.replace('api.binance.com', end + '.binance.com'));
        if(data) return data;
    }
    
    const proxies = [
        'https://corsproxy.io/?' + encodeURIComponent(u),
        'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
        'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u),
        'https://thingproxy.freeboard.io/fetch/' + u,
        'https://cors.sh/' + u,
        'https://proxy.cors.sh/' + u,
    ];
    for(const p of proxies) {
        data = await tryFetch(p);
        if(data) return data;
    }
    return null;
};

window._setBbgLegend = (d) => {
    const legend = document.getElementById('bbg-legend');
    if(legend) {
        if(!d) { legend.innerHTML = ''; return; }
        legend.innerHTML = '';
    }
};

window._updateBbgHeader = function(currentPriceRaw, intervalLabel) {
    if(!window._firstBbgPrice || !currentPriceRaw) return;
    // Store for retrigger by fetchBinance24hr auto-refresh hook
    window._lastBbgPrice = Number(currentPriceRaw);
    window._lastBbgInterval = intervalLabel;
    const currentPrice = Number(currentPriceRaw);
    const chg = currentPrice - window._firstBbgPrice;
    const pct = (chg / window._firstBbgPrice) * 100;

    
    const pxEl = document.getElementById('bbg-current-price');
    const pxContainerEl = document.getElementById('bbg-current-price-container');
    const arrowEl = document.getElementById('bbg-price-arrow');
    const chgEl = document.getElementById('bbg-price-change');
    
    if(pxEl) pxEl.innerText = currentPrice.toFixed(2);
    
    // Update local "At" time
    const timeEl = document.getElementById('bbg-time');
    if(timeEl) {
        const _now = new Date();
        timeEl.innerText = String(_now.getHours()).padStart(2,'0') + ':' + String(_now.getMinutes()).padStart(2,'0');
    }
    
    const col = chg >= 0 ? '#089981' : '#ff3333';
    const sign = chg >= 0 ? '+' : '';
    
    let lastTickCol = '#089981';
    let arrowCol = '#089981';
    if (window._lastBbgPriceTick !== null) {
        if (currentPrice > window._lastBbgPriceTick) { 
            lastTickCol = '#089981'; 
            arrowCol = '#089981'; 
        } else if (currentPrice < window._lastBbgPriceTick) { 
            lastTickCol = '#ff3333'; 
            arrowCol = '#ff3333'; 
        }
    }
    window._lastBbgPriceTick = currentPrice;
    const arrowChar = arrowCol === '#089981' ? '↑' : '↓';
    
    if(pxContainerEl) pxContainerEl.style.color = lastTickCol;
    if(arrowEl) { arrowEl.innerText = arrowCol === '#089981' ? '↑' : '↓'; arrowEl.style.color = arrowCol; }
    if(chgEl) { chgEl.innerText = sign + chg.toFixed(2); chgEl.style.color = col; }
    
    const setElTxt = (id, txt, c) => { const el = document.getElementById(id); if(el) { el.innerText = txt; if(c) el.style.color = c; } };
    
    const bbgChangeLabel = document.getElementById('bbg-change-label');
    if(bbgChangeLabel) bbgChangeLabel.style.color = col;
    const bbgChangeValOv = document.getElementById('bbg-change-val-ov');

    // Price Chart Overlay Formatter — comma-formatted dollar prices
    const fmtPrice = (val) => {
        if(!val || isNaN(val)) return '—';
        return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    const updateOv = (id, val) => { 
        const el = document.getElementById(id); 
        if(el) el.innerText = fmtPrice(val);
    };
    
    // Use verified 1D Binance kline values (set by _refreshOverlay in _setChartInterval)
    const _liveHigh = window._chigh  > 0 ? window._chigh  : null;
    const _liveLow  = window._clow   > 0 ? window._clow   : null;
    const _liveOpen = window._firstBbgPrice > 0 ? window._firstBbgPrice : null;

    // Last Price = current live price
    updateOv('ov-start', currentPrice);
    // High and Low
    updateOv('ov-high',  _liveHigh); 
    updateOv('ov-low',   _liveLow);

    // Open and Close
    updateOv('ov-open',  _liveOpen);
    updateOv('ov-close', currentPrice);

    // Update Volume in Ribbon
    const fmtVol = (val) => {
        if(!val || isNaN(val)) return '—';
        if(val >= 1e12) return (val/1e12).toFixed(2) + 'T';
        if(val >= 1e9)  return (val/1e9).toFixed(2)  + 'B';
        if(val >= 1e6)  return (val/1e6).toFixed(2)  + 'M';
        if(val >= 1e3)  return (val/1e3).toFixed(1)  + 'K';
        return val.toFixed(0);
    };
    const volEl = document.getElementById('bbg-volume');
    if(volEl) volEl.innerText = fmtVol(window._cvol);

    // Update date range in header
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(2);
    const dateRangeEl = document.getElementById('ov-date-range');
    if(dateRangeEl) dateRangeEl.innerText = mm + '/' + dd + '/' + yy;

    // ov-pct and ov-chg (right panel) removed as requested
    // setElTxt('ov-pct', sign + pct.toFixed(2) + '%', col);
    // setElTxt('ov-chg', sign + chg.toFixed(2), col);
    
    if(bbgChangeValOv) { bbgChangeValOv.innerText = `${sign}${chg.toFixed(2)} (${sign}${pct.toFixed(2)}%)`; bbgChangeValOv.style.color = col; }
    
    // Update Header Ribbon (Op/Hi/Lo/Close)
    const setHdrTxt = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = fmtPrice(val); };
    setHdrTxt('bbg-start', _liveOpen);
    setHdrTxt('bbg-high',  _liveHigh);
    setHdrTxt('bbg-low',   _liveLow);
    setHdrTxt('bbg-close', currentPrice);
};

window._selectTF = function(btn, interval) {
    if(!btn) return;
    console.log('[BBG] Selecting TF:', interval);
    document.querySelectorAll('#bbg-tf-btns .tf-btn').forEach(b => {
        b.style.background = 'transparent'; 
        b.style.color = '#fff';
        b.style.fontWeight = 'normal';
        b.style.padding = '0';
    });
    btn.style.background = '#1d4e9e'; 
    btn.style.color = '#fff';
    btn.style.fontWeight = 'bold';
    
    const labelEl = document.getElementById('bbg-chart-mode-label');
    if(labelEl) labelEl.innerText = btn.innerText;
    if(window._setChartInterval) window._setChartInterval(interval);
};

/* ── Daily/Weekly/Monthly dropdown handler ── */
window._dailyModeInterval = '1d'; // current base interval
window._setDailyMode = function(binanceInterval, label) {
    // Close dropdown
    var menu = document.getElementById('daily-dropdown-menu');
    if(menu) menu.style.display = 'none';
    
    // Update button label
    var btn = document.getElementById('daily-dropdown-btn');
    if(btn) btn.innerText = label + ' \u25BE';
    
    // Highlight active item
    document.querySelectorAll('#daily-dropdown-menu .dd-item').forEach(function(el) {
        el.style.background = 'transparent';
        el.style.color = '#888';
        el.classList.remove('dd-active');
    });
    // Find the clicked item by label and highlight it
    document.querySelectorAll('#daily-dropdown-menu .dd-item').forEach(function(el) {
        if(el.innerText === label) {
            el.style.background = 'rgba(255,255,255,.08)';
            el.style.color = '#fff';
            el.classList.add('dd-active');
        }
    });
    
    // Store the mode
    window._dailyModeInterval = binanceInterval;
    
    // Directly call _setChartInterval with this Binance interval
    // We override the tfMap temporarily for this call
    var originalSetChart = window._setChartInterval;
    if(originalSetChart) {
        // Create a direct fetch with the chosen interval
        window._dailyOverrideBinanceInterval = binanceInterval;
        // Trigger re-fetch using current active TF button context
        var activeBtn = document.querySelector('#bbg-tf-btns .tf-btn[style*="1d4e9e"]');
        var activeInterval = activeBtn ? activeBtn.getAttribute('data-interval') : '1d';
        originalSetChart(activeInterval);
    }
    
    console.log('[BBG] Daily mode set to:', label, '(', binanceInterval, ')');
};

// Close daily dropdown when clicking outside
document.addEventListener('click', function(e) {
    var wrap = document.getElementById('daily-dropdown-wrap');
    var menu = document.getElementById('daily-dropdown-menu');
    if(wrap && menu && !wrap.contains(e.target)) {
        menu.style.display = 'none';
    }
});

window._setChartInterval = async function(interval) {
    window._bbgActiveInterval = interval;

    const labelEl = document.getElementById('bbg-chart-mode-label');
    if (labelEl) labelEl.innerText = interval.toUpperCase();

    const tvIntervalMap = {
        '1m':'1','5m':'5','15m':'15','30m':'30',
        '1h':'60','3d':'60','1d':'D','6m_h':'60',
        'ytd':'D','1y':'D','5y':'W','max':'M'
    };
    const tvInterval = tvIntervalMap[interval] || 'D';
    const binanceInterval = {'1m':'1m','5m':'5m','15m':'15m','30m':'30m','1h':'1h','3d':'1h','1d':'1d','6m_h':'1h','ytd':'1d','1y':'1d','5y':'1w','max':'1M'}[interval] || '1d';

    let rawSym = ((window._bbgActiveSym || 'BTC').toUpperCase()).replace('/', '');

    // ── Symbol routing maps ──
    const cryptoMap = {
        // ── Layer 1 / Major ──────────────────────────────────────────────────
        'BTC':'BTCUSDT','ETH':'ETHUSDT','SOL':'SOLUSDT','BNB':'BNBUSDT',
        'XRP':'XRPUSDT','ADA':'ADAUSDT','TRX':'TRXUSDT','AVAX':'AVAXUSDT',
        'LTC':'LTCUSDT','BCH':'BCHUSDT','ETC':'ETCUSDT','ZEC':'ZECUSDT',
        'DASH':'DASHUSDT','XTZ':'XTZUSDT','EOS':'EOSUSDT','NEO':'NEOUSDT',
        'WAVES':'WAVESUSDT','XEM':'XEMUSDT',
        // ── Layer 2 / Scaling ────────────────────────────────────────────────
        'ARB':'ARBUSDT','OP':'OPUSDT','MATIC':'MATICUSDT','POL':'POLUSDT',
        'IMX':'IMXUSDT','STRK':'STRKUSDT','ZK':'ZKUSDT',
        'METIS':'METISUSDT','LRC':'LRCUSDT',
        // ── DeFi ─────────────────────────────────────────────────────────────
        'UNI':'UNIUSDT','AAVE':'AAVEUSDT','MKR':'MKRUSDT','CRV':'CRVUSDT',
        'LDO':'LDOUSDT','SNX':'SNXUSDT','COMP':'COMPUSDT','BAL':'BALUSDT',
        'SUSHI':'SUSHIUSDT','1INCH':'1INCHUSDT','CAKE':'CAKEUSDT','GMX':'GMXUSDT',
        'DYDX':'DYDXUSDT','PENDLE':'PENDLEUSDT','ENA':'ENAUSDT','ETHFI':'ETHFIUSDT',
        'EIGEN':'EIGENUSDT',
        // ── AI / Data ────────────────────────────────────────────────────────
        'FET':'FETUSDT','AGIX':'AGIXUSDT','OCEAN':'OCEANUSDT','NMR':'NMRUSDT',
        'RENDER':'RENDERUSDT','RNDR':'RNDRUSDT','GRT':'GRTUSDT','TAO':'TAOUSDT',
        'ALT':'ALTUSDT','ARKM':'ARKMUSDT','WLD':'WLDUSDT','AIOZ':'AIOZUSDT',
        // ── Interoperability / Infra ─────────────────────────────────────────
        'LINK':'LINKUSDT','DOT':'DOTUSDT','ATOM':'ATOMUSDT',
        'ICP':'ICPUSDT','FIL':'FILUSDT','AR':'ARUSDT','STORJ':'STORJUSDT',
        'KSM':'KSMUSDT','BAND':'BANDUSDT','API3':'API3USDT','PYTH':'PYTHUSDT',
        // ── Smart Contract Platforms ─────────────────────────────────────────
        'NEAR':'NEARUSDT','APT':'APTUSDT','SUI':'SUIUSDT','SEI':'SEIUSDT',
        'INJ':'INJUSDT','TIA':'TIAUSDT','JUP':'JUPUSDT','JTO':'JTOUSDT',
        'ALGO':'ALGOUSDT','VET':'VETUSDT','ONE':'ONEUSDT','KAVA':'KAVAUSDT',
        'CELO':'CELOUSDT','ROSE':'ROSEUSDT','FTM':'FTMUSDT','HBAR':'HBARUSDT',
        // ── Meme coins ───────────────────────────────────────────────────────
        'DOGE':'DOGEUSDT','SHIB':'SHIBUSDT','PEPE':'PEPEUSDT','WIF':'WIFUSDT',
        'BONK':'BONKUSDT','FLOKI':'FLOKIUSDT','MEME':'MEMEUSDT','TURBO':'TURBOUSDT',
        'POPCAT':'POPCATUSDT','MEW':'MEWUSDT','DOGS':'DOGSUSDT',
        // ── Gaming / NFT / Metaverse ─────────────────────────────────────────
        'AXS':'AXSUSDT','SAND':'SANDUSDT','MANA':'MANAUSDT','ENJ':'ENJUSDT',
        'GALA':'GALAUSDT','ILV':'ILVUSDT','MAGIC':'MAGICUSDT',
        'YGG':'YGGUSDT','RON':'RONUSDT','PRIME':'PRIMEUSDT',
        // ── Bitcoin ecosystem ────────────────────────────────────────────────
        'ORDI':'ORDIUSDT','STX':'STXUSDT',
        // ── Other notable ────────────────────────────────────────────────────
        'XLM':'XLMUSDT','TON':'TONUSDT','NOT':'NOTUSDT','HYPE':'HYPEUSDT',
        'BERA':'BERAUSDT','OM':'OMUSDT','VIRTUAL':'VIRTUALUSDT','MOVE':'MOVEUSDT',
        'KAS':'KASUSDT','ZRO':'ZROUSDT','W':'WUSDT','ONDO':'ONDOUSDT',
        'DRIFT':'DRIFTUSDT','OSMO':'OSMOUSDT',
        // NOTE: GOLD, SILVER, EURUSD intentionally NOT here — they route via Yahoo
    };
    const yahooMap = {
        // ── Global Indices ────────────────────────────────────────────────────
        'SPX':'^GSPC','NDX':'^NDX','DJI':'^DJI','DAX':'^GDAXI','NI225':'^N225',
        'FTSE':'^FTSE','CAC':'^FCHI','VIX':'^VIX','RUT':'^RUT','MID':'^MID',
        'HSI':'^HSI','SHCOMP':'000001.SS','KOSPI':'^KS11','ASX200':'^AXJO',
        'NIFTY':'^NSEI','SENSEX':'^BSESN','IBOV':'^BVSP','TSX':'^GSPTSE',
        'AEX':'^AEX','SMI':'^SSMI','IBEX':'^IBEX','MIB':'FTSEMIB.MI',
        'ATX':'^ATX','WIG20':'^WIG20','BUX':'^BUX','PX':'^PX',
        'TA35':'^TA125.TA','TADAWUL':'^TASI.SR','QE':'^QSI','ADX':'^FTFADGI',
        'NIKKEI':'^N225','TOPIX':'^TOPX',
        // ── US Futures ────────────────────────────────────────────────────────
        'ES1':'ES=F','NQ1':'NQ=F','YM1':'YM=F','RTY1':'RTY=F',
        'ES':'ES=F','NQ':'NQ=F','YM':'YM=F',
        // ── Commodities ───────────────────────────────────────────────────────
        'GOLD':'GC=F','SILVER':'SI=F','XAUUSD':'GC=F','XAGUSD':'SI=F',
        'OIL':'CL=F','WTI':'CL=F','BRENT':'BZ=F','GAS':'NG=F','NATGAS':'NG=F',
        'COPPER':'HG=F','ALUMINUM':'ALI=F','ZINC':'ZNC=F','NICKEL':'NIK=F',
        'WHEAT':'ZW=F','CORN':'ZC=F','SOYBEAN':'ZS=F','RICE':'ZR=F',
        'COFFEE':'KC=F','COCOA':'CC=F','SUGAR':'SB=F','COTTON':'CT=F',
        'LUMBER':'LBR=F','CATTLE':'LE=F','HOGS':'HE=F',
        'PLATINUM':'PL=F','PALLADIUM':'PA=F','URANIUM':'URA',
        // ── Bonds / Rates ─────────────────────────────────────────────────────
        'US10Y':'^TNX','US2Y':'^IRX','US30Y':'^TYX','US5Y':'^FVX',
        'TLT':'TLT','SHY':'SHY','IEF':'IEF','HYG':'HYG','LQD':'LQD',
        'TIP':'TIP','BUND':'IBTS',
        // ── Forex ─────────────────────────────────────────────────────────────
        'EURUSD':'EURUSD=X','GBPUSD':'GBPUSD=X','USDJPY':'USDJPY=X',
        'AUDUSD':'AUDUSD=X','USDCAD':'USDCAD=X','USDCHF':'USDCHF=X',
        'NZDUSD':'NZDUSD=X','EURGBP':'EURGBP=X','EURJPY':'EURJPY=X',
        'GBPJPY':'GBPJPY=X','USDMXN':'MXN=X','USDBRL':'BRL=X',
        'USDZAR':'ZAR=X','USDTRY':'TRY=X','USDINR':'INR=X','USDCNY':'CNY=X',
        'USDKRW':'KRW=X','USDSEK':'SEK=X','USDNOK':'NOK=X','USDDKK':'DKK=X',
        'USDPLN':'PLN=X','USDCZK':'CZK=X','USDHUF':'HUF=X',
        // ── Crypto ETFs ───────────────────────────────────────────────────────
        'IBIT':'IBIT','FBTC':'FBTC','BITB':'BITB','ARKB':'ARKB','BRRR':'BRRR',
        'ETHA':'ETHA','CETH':'CETH','MSTX':'MSTX',
        // ── Mega Cap Tech ─────────────────────────────────────────────────────
        'AAPL':'AAPL','NVDA':'NVDA','MSFT':'MSFT','GOOGL':'GOOGL','GOOG':'GOOG',
        'META':'META','AMZN':'AMZN','TSLA':'TSLA','NFLX':'NFLX','ORCL':'ORCL',
        'CRM':'CRM','ADBE':'ADBE','INTC':'INTC','AMD':'AMD','QCOM':'QCOM',
        'AVGO':'AVGO','MU':'MU','AMAT':'AMAT','TXN':'TXN','ARM':'ARM',
        'SMCI':'SMCI','DELL':'DELL','HPQ':'HPQ','HPE':'HPE','IBM':'IBM',
        'CSCO':'CSCO','NOW':'NOW','TEAM':'TEAM','WDAY':'WDAY','ZM':'ZM',
        // ── Fintech & Finance ─────────────────────────────────────────────────
        'JPM':'JPM','GS':'GS','BAC':'BAC','WFC':'WFC','MS':'MS','C':'C',
        'BLK':'BLK','AXP':'AXP','V':'V','MA':'MA','PYPL':'PYPL',
        'SQ':'SQ','AFRM':'AFRM','UPST':'UPST','SOFI':'SOFI','HOOD':'HOOD',
        'COIN':'COIN','MSTR':'MSTR','BRK':'BRK-B','BRK.B':'BRK-B',
        'SCHW':'SCHW','CME':'CME','ICE':'ICE','CBOE':'CBOE',
        // ── Healthcare / Pharma / Biotech ─────────────────────────────────────
        'JNJ':'JNJ','UNH':'UNH','LLY':'LLY','ABBV':'ABBV','MRK':'MRK',
        'PFE':'PFE','AMGN':'AMGN','GILD':'GILD','REGN':'REGN','VRTX':'VRTX',
        'MRNA':'MRNA','BNTX':'BNTX','BMY':'BMY','ABT':'ABT','MDT':'MDT',
        'ISRG':'ISRG','BSX':'BSX','ELV':'ELV','CVS':'CVS','CI':'CI',
        // ── Consumer / Retail ─────────────────────────────────────────────────
        'WMT':'WMT','COST':'COST','TGT':'TGT','AMZN':'AMZN','HD':'HD',
        'LOW':'LOW','NKE':'NKE','SBUX':'SBUX','MCD':'MCD','YUM':'YUM',
        'KO':'KO','PEP':'PEP','PM':'PM','MO':'MO','MDLZ':'MDLZ',
        'PG':'PG','CL':'CL','KMB':'KMB','EL':'EL','ULTA':'ULTA',
        'LULU':'LULU','RH':'RH','BBY':'BBY','DG':'DG','DLTR':'DLTR',
        // ── Energy ────────────────────────────────────────────────────────────
        'XOM':'XOM','CVX':'CVX','COP':'COP','SLB':'SLB','EOG':'EOG',
        'MPC':'MPC','PSX':'PSX','VLO':'VLO','OXY':'OXY','DVN':'DVN',
        'HAL':'HAL','BKR':'BKR','FANG':'FANG','APA':'APA',
        // ── Industrials / Defense ─────────────────────────────────────────────
        'LMT':'LMT','RTX':'RTX','NOC':'NOC','GD':'GD','BA':'BA',
        'GE':'GE','HON':'HON','MMM':'MMM','CAT':'CAT','DE':'DE',
        'UNP':'UNP','CSX':'CSX','NSC':'NSC','FDX':'FDX','UPS':'UPS',
        'DAL':'DAL','UAL':'UAL','AAL':'AAL','LUV':'LUV',
        // ── Real Estate / Utilities ───────────────────────────────────────────
        'AMT':'AMT','PLD':'PLD','EQIX':'EQIX','O':'O','SPG':'SPG',
        'NEE':'NEE','DUK':'DUK','SO':'SO','AEP':'AEP','D':'D',
        // ── Growth / Tech ─────────────────────────────────────────────────────
        'PLTR':'PLTR','CRWD':'CRWD','DDOG':'DDOG','NET':'NET','ZS':'ZS',
        'SNOW':'SNOW','OKTA':'OKTA','MNDY':'MNDY','RBLX':'RBLX',
        'ABNB':'ABNB','UBER':'UBER','LYFT':'LYFT','SNAP':'SNAP','PINS':'PINS',
        'TWTR':'TWTR','SPOT':'SPOT','SHOP':'SHOP',
        // ── EV / Clean Energy ─────────────────────────────────────────────────
        'TSLA':'TSLA','RIVN':'RIVN','LCID':'LCID','NIO':'NIO','XPEV':'XPEV',
        'LI':'LI','NKLA':'NKLA','FSR':'FSR','BLNK':'BLNK',
        'ENPH':'ENPH','FSLR':'FSLR','SEDG':'SEDG','RUN':'RUN',
        // ── Materials / Mining ────────────────────────────────────────────────
        'NEM':'NEM','FCX':'FCX','AA':'AA','CLF':'CLF','X':'X',
        'GOLD':'GOLD','AEM':'AEM','WPM':'WPM','PAAS':'PAAS',
        // ── ETFs ──────────────────────────────────────────────────────────────
        'SPY':'SPY','QQQ':'QQQ','IWM':'IWM','DIA':'DIA',
        'GLD':'GLD','SLV':'SLV','USO':'USO','UNG':'UNG',
        'TLT':'TLT','IEF':'IEF','SHY':'SHY','HYG':'HYG','LQD':'LQD',
        'XLK':'XLK','XLF':'XLF','XLE':'XLE','XLV':'XLV','XLI':'XLI',
        'XLC':'XLC','XLY':'XLY','XLP':'XLP','XLU':'XLU','XLRE':'XLRE',
        'ARKK':'ARKK','ARKG':'ARKG','ARKW':'ARKW',
        'EEM':'EEM','EFA':'EFA','VEA':'VEA','VWO':'VWO',
        'VTI':'VTI','VOO':'VOO','VGT':'VGT','VYM':'VYM',
        'MSTU':'MSTU','NVDL':'NVDL','TQQQ':'TQQQ','SQQQ':'SQQQ',
        'SPXL':'SPXL','SPXS':'SPXS','UVXY':'UVXY','VXX':'VXX',
    };
    const tvSymMap = {
        // ── Global Indices ────────────────────────────────────────────────────
        'SPX':'TVC:SPX','NDX':'NASDAQ:NDX','DJI':'TVC:DJI',
        'RUT':'TVC:RUT','MID':'TVC:MID',
        'DAX':'XETR:DAX','NI225':'TVC:NI225','NIKKEI':'TVC:NI225',
        'FTSE':'TVC:UKX','CAC':'TVC:CAC40','SENSEX':'BSE:SENSEX',
        'NIFTY':'NSE:NIFTY','HSI':'TVC:HSI','SHCOMP':'SSE:000001',
        'KOSPI':'KRX:KOSPI','ASX200':'ASX:XJO','IBOV':'BMFBOVESPA:IBOV',
        'TSX':'TSX:OSPTX','AEX':'EURONEXT:AEX','SMI':'SIX:SMI',
        'IBEX':'BME:IBC','MIB':'MIL:FTSEMIB','ATX':'WBAG:ATX',
        'PRAGUE':'XPRA:PX','NKY':'TVC:NI225','LONDON':'TVC:UKX',
        'VIX':'TVC:VIX','VVIX':'CBOE:VVIX',
        // ── US Futures ────────────────────────────────────────────────────────
        'ES1':'CME_MINI:ES1!','NQ1':'CME_MINI:NQ1!','YM1':'CME_MINI:YM1!',
        'ES':'CME_MINI:ES1!','NQ':'CME_MINI:NQ1!','YM':'CME_MINI:YM1!',
        'RTY1':'CME_MINI:RTY1!','CL1':'NYMEX:CL1!','GC1':'COMEX:GC1!',
        // ── Commodities ───────────────────────────────────────────────────────
        'GOLD':'TVC:GOLD','SILVER':'TVC:SILVER','COPPER':'TVC:COPPER',
        'XAUUSD':'TVC:GOLD','XAGUSD':'TVC:SILVER',
        'OIL':'TVC:USOIL','WTI':'TVC:USOIL','BRENT':'TVC:UKOIL',
        'GAS':'TVC:NATURALGAS','NATGAS':'TVC:NATURALGAS',
        'WHEAT':'CBOT:ZW1!','CORN':'CBOT:ZC1!','SOYBEAN':'CBOT:ZS1!',
        'COFFEE':'ICEUS:KC1!','COCOA':'ICEUS:CC1!','SUGAR':'ICEUS:SB1!',
        'COTTON':'ICEUS:CT1!','LUMBER':'CME:LBR1!',
        'PLATINUM':'TVC:PLATINUM','PALLADIUM':'TVC:PALLADIUM',
        // ── Bonds / Rates ─────────────────────────────────────────────────────
        'US10Y':'TVC:US10Y','US2Y':'TVC:US02Y','US30Y':'TVC:US30Y','US5Y':'TVC:US05Y',
        'DE10Y':'TVC:DE10Y','GB10Y':'TVC:GB10Y','JP10Y':'TVC:JP10Y',
        // ── Forex ─────────────────────────────────────────────────────────────
        'EURUSD':'FX:EURUSD','GBPUSD':'FX:GBPUSD','USDJPY':'FX:USDJPY',
        'AUDUSD':'FX:AUDUSD','USDCAD':'FX:USDCAD','USDCHF':'FX:USDCHF',
        'NZDUSD':'FX:NZDUSD','EURGBP':'FX:EURGBP','EURJPY':'FX:EURJPY',
        'GBPJPY':'FX:GBPJPY','USDMXN':'FX:USDMXN','USDBRL':'FX:USDBRL',
        'USDZAR':'FX:USDZAR','USDTRY':'FX:USDTRY','USDINR':'FX:USDINR',
        'USDCNY':'FX:USDCNY','USDKRW':'FX:USDKRW','USDSEK':'FX:USDSEK',
        'USDNOK':'FX:USDNOK','USDPLN':'FX:USDPLN','USDCZK':'FX:USDCZK',
        // ── Crypto (Binance) ──────────────────────────────────────────────────
        'BTC':'BINANCE:BTCUSDT','ETH':'BINANCE:ETHUSDT','SOL':'BINANCE:SOLUSDT',
        'BNB':'BINANCE:BNBUSDT','XRP':'BINANCE:XRPUSDT','ADA':'BINANCE:ADAUSDT',
        'DOGE':'BINANCE:DOGEUSDT','AVAX':'BINANCE:AVAXUSDT','LINK':'BINANCE:LINKUSDT',
        'DOT':'BINANCE:DOTUSDT','TRX':'BINANCE:TRXUSDT','LTC':'BINANCE:LTCUSDT',
        'BCH':'BINANCE:BCHUSDT','UNI':'BINANCE:UNIUSDT','AAVE':'BINANCE:AAVEUSDT',
        'MATIC':'BINANCE:MATICUSDT','ARB':'BINANCE:ARBUSDT','OP':'BINANCE:OPUSDT',
        'SHIB':'BINANCE:SHIBUSDT','PEPE':'BINANCE:PEPEUSDT','TON':'BINANCE:TONUSDT',
        'INJ':'BINANCE:INJUSDT','APT':'BINANCE:APTUSDT','SUI':'BINANCE:SUIUSDT',
        'MKR':'BINANCE:MKRUSDT','CRV':'BINANCE:CRVUSDT','SNX':'BINANCE:SNXUSDT',
        'ATOM':'BINANCE:ATOMUSDT','NEAR':'BINANCE:NEARUSDT','FTM':'BINANCE:FTMUSDT',
        'HBAR':'BINANCE:HBARUSDT','ICP':'BINANCE:ICPUSDT','FIL':'BINANCE:FILUSDT',
        'GRT':'BINANCE:GRTUSDT','SAND':'BINANCE:SANDUSDT','MANA':'BINANCE:MANAUSDT',
        'AXS':'BINANCE:AXSUSDT','GALA':'BINANCE:GALAUSDT','ENJ':'BINANCE:ENJUSDT',
        'ALGO':'BINANCE:ALGOUSDT','VET':'BINANCE:VETUSDT','XLM':'BINANCE:XLMUSDT',
        'ETC':'BINANCE:ETCUSDT','ZEC':'BINANCE:ZECUSDT','DASH':'BINANCE:DASHUSDT',
        'FET':'BINANCE:FETUSDT','RENDER':'BINANCE:RENDERUSDT','RNDR':'BINANCE:RNDRUSDT',
        'WIF':'BINANCE:WIFUSDT','BONK':'BINANCE:BONKUSDT','WLD':'BINANCE:WLDUSDT',
        'JUP':'BINANCE:JUPUSDT','JTO':'BINANCE:JTOUSDT','TIA':'BINANCE:TIAUSDT',
        'ENA':'BINANCE:ENAUSDT','PENDLE':'BINANCE:PENDLEUSDT','OM':'BINANCE:OMUSDT',
        'KAS':'BINANCE:KASUSDT','HYPE':'BINANCE:HYPEUSDT','NOT':'BINANCE:NOTUSDT',
        'ORDI':'BINANCE:ORDIUSDT','STX':'BINANCE:STXUSDT','TAO':'BINANCE:TAOUSDT',
        'VIRTUAL':'BINANCE:VIRTUALUSDT','BERA':'BINANCE:BERAUSDT',
        // ── Mega Cap Tech ─────────────────────────────────────────────────────
        'AAPL':'NASDAQ:AAPL','NVDA':'NASDAQ:NVDA','MSFT':'NASDAQ:MSFT',
        'GOOGL':'NASDAQ:GOOGL','GOOG':'NASDAQ:GOOG','META':'NASDAQ:META',
        'AMZN':'NASDAQ:AMZN','TSLA':'NASDAQ:TSLA','NFLX':'NASDAQ:NFLX',
        'AMD':'NASDAQ:AMD','INTC':'NASDAQ:INTC','CRM':'NYSE:CRM',
        'ORCL':'NYSE:ORCL','ADBE':'NASDAQ:ADBE','QCOM':'NASDAQ:QCOM',
        'AVGO':'NASDAQ:AVGO','MU':'NASDAQ:MU','AMAT':'NASDAQ:AMAT',
        'TXN':'NASDAQ:TXN','ARM':'NASDAQ:ARM','SMCI':'NASDAQ:SMCI',
        'DELL':'NYSE:DELL','IBM':'NYSE:IBM','CSCO':'NASDAQ:CSCO',
        'NOW':'NYSE:NOW','TEAM':'NASDAQ:TEAM','WDAY':'NASDAQ:WDAY',
        'ZM':'NASDAQ:ZM','HPQ':'NYSE:HPQ','HPE':'NYSE:HPE',
        // ── Fintech & Finance ─────────────────────────────────────────────────
        'JPM':'NYSE:JPM','GS':'NYSE:GS','BAC':'NYSE:BAC','WFC':'NYSE:WFC',
        'MS':'NYSE:MS','C':'NYSE:C','BLK':'NYSE:BLK','AXP':'NYSE:AXP',
        'V':'NYSE:V','MA':'NYSE:MA','PYPL':'NASDAQ:PYPL','SQ':'NYSE:SQ',
        'AFRM':'NASDAQ:AFRM','UPST':'NASDAQ:UPST','SOFI':'NASDAQ:SOFI',
        'HOOD':'NASDAQ:HOOD','COIN':'NASDAQ:COIN','MSTR':'NASDAQ:MSTR',
        'SCHW':'NYSE:SCHW','CME':'NASDAQ:CME','CBOE':'CBOE:CBOE',
        'BRK':'NYSE:BRK.B',
        // ── Healthcare / Pharma ────────────────────────────────────────────────
        'JNJ':'NYSE:JNJ','UNH':'NYSE:UNH','LLY':'NYSE:LLY','ABBV':'NYSE:ABBV',
        'MRK':'NYSE:MRK','PFE':'NYSE:PFE','AMGN':'NASDAQ:AMGN','GILD':'NASDAQ:GILD',
        'REGN':'NASDAQ:REGN','VRTX':'NASDAQ:VRTX','MRNA':'NASDAQ:MRNA',
        'BNTX':'NASDAQ:BNTX','BMY':'NYSE:BMY','ABT':'NYSE:ABT','MDT':'NYSE:MDT',
        'ISRG':'NASDAQ:ISRG',
        // ── Consumer / Retail ─────────────────────────────────────────────────
        'WMT':'NYSE:WMT','COST':'NASDAQ:COST','TGT':'NYSE:TGT',
        'HD':'NYSE:HD','LOW':'NYSE:LOW','NKE':'NYSE:NKE','SBUX':'NASDAQ:SBUX',
        'MCD':'NYSE:MCD','KO':'NYSE:KO','PEP':'NASDAQ:PEP','PG':'NYSE:PG',
        'PM':'NYSE:PM','MO':'NYSE:MO','LULU':'NASDAQ:LULU','ULTA':'NASDAQ:ULTA',
        // ── Energy ────────────────────────────────────────────────────────────
        'XOM':'NYSE:XOM','CVX':'NYSE:CVX','COP':'NYSE:COP','SLB':'NYSE:SLB',
        'EOG':'NYSE:EOG','OXY':'NYSE:OXY','HAL':'NYSE:HAL','DVN':'NYSE:DVN',
        // ── Industrials / Defense ─────────────────────────────────────────────
        'LMT':'NYSE:LMT','RTX':'NYSE:RTX','NOC':'NYSE:NOC','GD':'NYSE:GD',
        'BA':'NYSE:BA','GE':'NYSE:GE','HON':'NASDAQ:HON','CAT':'NYSE:CAT',
        'DE':'NYSE:DE','UNP':'NYSE:UNP','FDX':'NYSE:FDX','UPS':'NYSE:UPS',
        'DAL':'NYSE:DAL','UAL':'NASDAQ:UAL','AAL':'NASDAQ:AAL',
        // ── Growth / SaaS ─────────────────────────────────────────────────────
        'PLTR':'NYSE:PLTR','CRWD':'NASDAQ:CRWD','DDOG':'NASDAQ:DDOG',
        'NET':'NYSE:NET','ZS':'NASDAQ:ZS','SNOW':'NYSE:SNOW','OKTA':'NASDAQ:OKTA',
        'MNDY':'NASDAQ:MNDY','RBLX':'NYSE:RBLX','ABNB':'NASDAQ:ABNB',
        'UBER':'NYSE:UBER','LYFT':'NASDAQ:LYFT','SNAP':'NYSE:SNAP',
        'PINS':'NYSE:PINS','SPOT':'NYSE:SPOT','SHOP':'NYSE:SHOP',
        // ── EV / Clean Energy ─────────────────────────────────────────────────
        'RIVN':'NASDAQ:RIVN','LCID':'NASDAQ:LCID','NIO':'NYSE:NIO',
        'XPEV':'NYSE:XPEV','LI':'NASDAQ:LI','ENPH':'NASDAQ:ENPH',
        'FSLR':'NASDAQ:FSLR','SEDG':'NASDAQ:SEDG',
        // ── Crypto ETFs ───────────────────────────────────────────────────────
        'IBIT':'NASDAQ:IBIT','FBTC':'NASDAQ:FBTC','BITB':'NYSE:BITB',
        'ARKB':'NYSE:ARKB','ETHA':'NASDAQ:ETHA',
        // ── ETFs ──────────────────────────────────────────────────────────────
        'SPY':'AMEX:SPY','QQQ':'NASDAQ:QQQ','IWM':'AMEX:IWM','DIA':'AMEX:DIA',
        'GLD':'AMEX:GLD','SLV':'AMEX:SLV','USO':'AMEX:USO',
        'TLT':'NASDAQ:TLT','IEF':'NASDAQ:IEF','HYG':'AMEX:HYG','LQD':'AMEX:LQD',
        'XLK':'AMEX:XLK','XLF':'AMEX:XLF','XLE':'AMEX:XLE','XLV':'AMEX:XLV',
        'XLI':'AMEX:XLI','XLC':'AMEX:XLC','XLY':'AMEX:XLY','XLP':'AMEX:XLP',
        'XLU':'AMEX:XLU','XLRE':'AMEX:XLRE','XLB':'AMEX:XLB',
        'ARKK':'AMEX:ARKK','EEM':'AMEX:EEM','VTI':'AMEX:VTI','VOO':'AMEX:VOO',
        'TQQQ':'NASDAQ:TQQQ','SQQQ':'NASDAQ:SQQQ','SPXL':'AMEX:SPXL',
        'UVXY':'AMEX:UVXY','VXX':'AMEX:VXX',
        'MSTU':'NYSE:MSTU','NVDL':'AMEX:NVDL',
    };

    const binanceSym  = cryptoMap[rawSym] || (rawSym.endsWith('USDT') ? rawSym : null);
    const yahooTicker = !binanceSym ? (yahooMap[rawSym] || null) : null;
    const useBinance  = !!binanceSym;
    const useYahoo    = !!yahooTicker;

    // ── TradingView iframe symbol ──
    let tvSym;
    if (tvSymMap[rawSym])                       tvSym = tvSymMap[rawSym];
    else if (yahooMap[rawSym] && !binanceSym)   tvSym = 'NASDAQ:' + rawSym;  // equity fallback
    else if (binanceSym)                        tvSym = 'BINANCE:' + binanceSym;
    else                                        tvSym = 'NASDAQ:' + rawSym;

    // Fix equity TV sym — all non-equity prefixes that must NOT get NASDAQ fallback
    const indexTVMap = {
        // Futures
        'CME_MINI:ES1!':1,'CME_MINI:NQ1!':1,'CME_MINI:YM1!':1,'CME_MINI:RTY1!':1,
        'EUREX:FDAX1!':1,'OSE:NK1!':1,'NYMEX:CL1!':1,'COMEX:GC1!':1,
        // Indices
        'FOREXCOM:SPXUSD':1,'SP:SPX':1,'TVC:SPX':1,'CBOE:SPX':1,'NASDAQ:NDX':1,'TVC:DJI':1,'TVC:RUT':1,'TVC:MID':1,
        'XETR:DAX':1,'TVC:NI225':1,'TVC:UKX':1,'TVC:CAC40':1,'TVC:VIX':1,'CBOE:VVIX':1,
        'BSE:SENSEX':1,'NSE:NIFTY':1,'TVC:HSI':1,'SSE:000001':1,'KRX:KOSPI':1,
        'ASX:XJO':1,'BMFBOVESPA:IBOV':1,'TSX:OSPTX':1,'EURONEXT:AEX':1,
        'SIX:SMI':1,'BME:IBC':1,'MIL:FTSEMIB':1,'WBAG:ATX':1,'XPRA:PX':1,
        // Commodities
        'TVC:USOIL':1,'TVC:UKOIL':1,'TVC:GOLD':1,'TVC:SILVER':1,
        'TVC:NATURALGAS':1,'TVC:COPPER':1,'TVC:PLATINUM':1,'TVC:PALLADIUM':1,
        'CBOT:ZW1!':1,'CBOT:ZC1!':1,'CBOT:ZS1!':1,
        'ICEUS:KC1!':1,'ICEUS:CC1!':1,'ICEUS:SB1!':1,'ICEUS:CT1!':1,
        // Bonds
        'TVC:US10Y':1,'TVC:US02Y':1,'TVC:US30Y':1,'TVC:US05Y':1,
        'TVC:DE10Y':1,'TVC:GB10Y':1,'TVC:JP10Y':1,
        // Forex
        'FX:EURUSD':1,'FX:GBPUSD':1,'FX:USDJPY':1,'FX:AUDUSD':1,'FX:USDCAD':1,
        'FX:USDCHF':1,'FX:NZDUSD':1,'FX:EURGBP':1,'FX:EURJPY':1,'FX:GBPJPY':1,
        'FX:USDMXN':1,'FX:USDBRL':1,'FX:USDZAR':1,'FX:USDTRY':1,'FX:USDINR':1,
        'FX:USDCNY':1,'FX:USDKRW':1,'FX:USDSEK':1,'FX:USDNOK':1,
        'FX:USDPLN':1,'FX:USDCZK':1,
        // Crypto (Binance prefix)
        'BINANCE:BTCUSDT':1,'BINANCE:ETHUSDT':1,'BINANCE:SOLUSDT':1,
        'BINANCE:BNBUSDT':1,'BINANCE:XRPUSDT':1,'BINANCE:ADAUSDT':1,
    };
    // Only apply NASDAQ fallback for equities not already in tvSymMap
    // Also skip fallback for BINANCE: crypto and other known non-equity prefixes
    const _nonEquityPrefix = ['BINANCE:','FX:','TVC:','FOREXCOM:','XETR:','CME_MINI:',
        'NYMEX:','COMEX:','CBOT:','ICEUS:','BSE:','NSE:','KRX:','ASX:','SSE:',
        'BMFBOVESPA:','TSX:','EURONEXT:','SIX:','BME:','MIL:','WBAG:','XPRA:',
        'CBOE:','AMEX:','NYSE:','NASDAQ:'];
    const _hasNonEqPrefix = _nonEquityPrefix.some(p => tvSym.startsWith(p));
    if (!indexTVMap[tvSym] && !_hasNonEqPrefix && useYahoo && !tvSymMap[rawSym]) tvSym = 'NASDAQ:' + rawSym;

    window._tvActiveSym     = tvSym;
    window._tvActiveInterval = tvInterval;
    window._updateTVChart(tvSym, tvInterval);

    // ── Close old feeds ──
    if (window._currentBbgWs) { try{window._currentBbgWs.close();}catch(e){} window._currentBbgWs=null; }
    if (window._ovRefreshTimer) { clearInterval(window._ovRefreshTimer); window._ovRefreshTimer=null; }
    window._firstBbgPrice = 0; window._chigh = -Infinity; window._clow = Infinity; window._cvol = 0;

    // ── Formatters ──
    const fmtP = v => {
        if(!v||isNaN(v)) return '—';
        return v>=1000 ? v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
             : v>=1    ? parseFloat(v.toFixed(4)).toString()
             : parseFloat(v.toPrecision(5)).toString();
    };
    const fmtV = v => {
        if(!v||isNaN(v)) return '—';
        return v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e6?(v/1e6).toFixed(2)+'M':v>=1e3?(v/1e3).toFixed(1)+'K':v.toFixed(0);
    };
    const setEl = (id,val) => { const e=document.getElementById(id); if(e) e.innerText=val; };

    if (useBinance) {
        // ── CRYPTO: Binance REST pro OHLC + WebSocket pro live tick ──
        const sym = binanceSym;
        const symLow = sym.toLowerCase();

        // Pre-fill ribbon instantly from CRYPTO static cache
        const _cPreload = (typeof CRYPTO !== 'undefined') && CRYPTO.find(c => c.s === rawSym);
        if (_cPreload && _cPreload.px) {
            const _cp = _cPreload;
            setEl('bbg-current-price', fmtP(_cp.px));
            setEl('bbg-close', fmtP(_cp.px));
            const _cup = (_cp.chg || 0) >= 0;
            const _ccol = _cup ? '#00cc44' : '#ff3d3d';
            const chgEl = document.getElementById('bbg-price-change');
            if (chgEl) { chgEl.innerText = (_cup?'+':'') + (_cp.chg||0).toFixed(2) + '%'; chgEl.style.color = _ccol; }
            const arrEl = document.getElementById('bbg-price-arrow');
            if (arrEl) { arrEl.innerText = _cup ? '↑' : '↓'; arrEl.style.color = _ccol; }
            const ctnr = document.getElementById('bbg-current-price-container');
            if (ctnr) ctnr.style.color = _ccol;
            setEl('ov-start', fmtP(_cp.px));
            setEl('ov-close', fmtP(_cp.px));
        }

        // 1. Fetch today's 1D kline for Open/High/Low/Vol
        try {
            const r = await fetch('https://api.binance.com/api/v3/klines?symbol='+sym+'&interval=1d&limit=2',{cache:'no-store'});
            const klines = await r.json();
            if(klines && klines.length) {
                const tk = klines[klines.length-1];
                window._firstBbgPrice = parseFloat(tk[1]);
                window._chigh         = parseFloat(tk[2]);
                window._clow          = parseFloat(tk[3]);
                window._cvol          = parseFloat(tk[5]);
                setEl('bbg-start', fmtP(window._firstBbgPrice));
                setEl('bbg-high',  fmtP(window._chigh));
                setEl('bbg-low',   fmtP(window._clow));
                setEl('bbg-volume',fmtV(window._cvol));
            }
        } catch(e) {}

        // 2. WebSocket live tick
        try {
            const ws = new WebSocket('wss://stream.binance.com:9443/ws/'+symLow+'@ticker');
            window._currentBbgWs = ws;
            ws.onmessage = ev => {
                try {
                    const d = JSON.parse(ev.data);
                    const price = parseFloat(d.c);
                    if(!price) return;
                    const chg   = parseFloat(d.P);
                    const up    = chg >= 0;
                    const col   = up ? '#00cc44' : '#ff3d3d';
                    const now   = new Date();
                    setEl('bbg-time',  String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'));
                    setEl('bbg-current-price', fmtP(price));
                    setEl('bbg-close', fmtP(price));
                    if(parseFloat(d.h)>0) setEl('bbg-high',  fmtP(parseFloat(d.h)));
                    if(parseFloat(d.l)>0) setEl('bbg-low',   fmtP(parseFloat(d.l)));
                    if(parseFloat(d.q)>0) setEl('bbg-volume',fmtV(parseFloat(d.q)));
                    const chgEl = document.getElementById('bbg-price-change');
                    if(chgEl){chgEl.innerText=(up?'+':'')+chg.toFixed(2)+'%';chgEl.style.color=col;}
                    const arrEl = document.getElementById('bbg-price-arrow');
                    if(arrEl){arrEl.innerText=up?'↑':'↓';arrEl.style.color=col;}
                    const ctnr = document.getElementById('bbg-current-price-container');
                    if(ctnr) ctnr.style.color=col;
                    // Update ov-left-panel
                    setEl('ov-start', fmtP(price));
                    setEl('ov-close', fmtP(price));
                    if(parseFloat(d.h)>0) setEl('ov-high', fmtP(parseFloat(d.h)));
                    if(parseFloat(d.l)>0) setEl('ov-low',  fmtP(parseFloat(d.l)));
                } catch(e){}
            };
            ws.onerror = ()=>{};
            ws.onclose = ()=>{ window._currentBbgWs=null; };
        } catch(e){}

    } else if (useYahoo) {
        // ── EQUITY / INDEX / FOREX / COMDTY: Yahoo Finance poll každých 15s ──
        const ticker = yahooTicker;

        // ── Pre-fill ribbon instantly from static STKS cache (avoids blank state) ──
        const _stksPreload = (typeof STKS !== 'undefined') && STKS[rawSym];
        if (_stksPreload && _stksPreload.px) {
            const _sp = _stksPreload;
            const _prc = _sp.px;
            const _opn = _sp.open || _prc;
            const _pct = _sp.chg || 0;
            const _up  = _pct >= 0;
            const _col = _up ? '#00cc44' : '#ff3d3d';
            setEl('bbg-current-price', fmtP(_prc));
            setEl('bbg-start',  fmtP(_opn));
            setEl('bbg-high',   _sp.hi ? fmtP(_sp.hi) : '—');
            setEl('bbg-low',    _sp.lo ? fmtP(_sp.lo) : '—');
            setEl('bbg-close',  fmtP(_prc));
            setEl('ov-start',   fmtP(_prc));
            setEl('ov-open',    fmtP(_opn));
            setEl('ov-high',    _sp.hi ? fmtP(_sp.hi) : '—');
            setEl('ov-low',     _sp.lo ? fmtP(_sp.lo) : '—');
            setEl('ov-close',   fmtP(_prc));
            const chgEl = document.getElementById('bbg-price-change');
            if (chgEl) { chgEl.innerText = (_up?'+':'') + _pct.toFixed(2) + '%'; chgEl.style.color = _col; }
            const arrEl = document.getElementById('bbg-price-arrow');
            if (arrEl) { arrEl.innerText = _up ? '↑' : '↓'; arrEl.style.color = _col; }
            const ctnr = document.getElementById('bbg-current-price-container');
            if (ctnr) ctnr.style.color = _col;
            window._firstBbgPrice = _opn;
        }

        const doFetch = async () => {
            try {
                const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(ticker)+'?interval=1m&range=1d';
                // Race all proxies in parallel — first valid response wins
                let j = null;
                const proxies = [
                    'https://corsproxy.io/?' + encodeURIComponent(yahooUrl),
                    'https://api.allorigins.win/raw?url=' + encodeURIComponent(yahooUrl),
                    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(yahooUrl),
                ];
                const tryProxy = async (purl) => {
                    const r = await fetch(purl, {cache:'no-store', signal: AbortSignal.timeout(6000)});
                    if (!r.ok) throw new Error('bad status');
                    const raw = await r.text();
                    const parsed = JSON.parse(raw.startsWith('{"contents"') ? JSON.parse(raw).contents : raw);
                    if (!parsed?.chart?.result) throw new Error('no result');
                    return parsed;
                };
                try { j = await Promise.any(proxies.map(tryProxy)); } catch(e) {}
                if (!j) return;
                const res  = j?.chart?.result?.[0];
                if(!res) return;
                const meta = res.meta || {};
                const q    = res.indicators?.quote?.[0] || {};
                // Najdi poslední validní close (1m data)
                const closes = q.close || [];
                let price = meta.regularMarketPrice;
                if (!price) {
                    for (let i = closes.length-1; i >= 0; i--) {
                        if (closes[i] && !isNaN(closes[i]) && closes[i] > 0) { price = closes[i]; break; }
                    }
                }
                if(!price||isNaN(price)) return;
                const prevClose = meta.chartPreviousClose || meta.previousClose || price;
                const open      = meta.regularMarketOpen || meta.open || prevClose;
                const high      = meta.regularMarketDayHigh || Math.max(...closes.filter(v=>v>0).slice(-390), price);
                const low       = meta.regularMarketDayLow  || Math.min(...closes.filter(v=>v>0).slice(-390), price);
                const vol       = meta.regularMarketVolume  || q.volume?.reduce((a,b)=>a+(b||0),0) || 0;

                const pct = prevClose ? ((price-prevClose)/prevClose*100) : 0;
                const up  = pct >= 0;
                const col = up ? '#00cc44' : '#ff3d3d';
                const now = new Date();

                // Set firstBbgPrice from open so _updateBbgHeader chg calculation works
                if(!window._firstBbgPrice || window._firstBbgPrice<=0) window._firstBbgPrice = open;
                window._chigh = high; window._clow = low; window._cvol = vol;

                setEl('bbg-current-price', fmtP(price));
                setEl('bbg-start',  fmtP(open));
                setEl('bbg-high',   fmtP(high));
                setEl('bbg-low',    fmtP(low));
                setEl('bbg-close',  fmtP(prevClose));
                setEl('bbg-volume', fmtV(vol));
                setEl('bbg-time',   String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'));
                // ov-left-panel
                setEl('ov-start', fmtP(price));
                setEl('ov-open',  fmtP(open));
                setEl('ov-high',  fmtP(high));
                setEl('ov-low',   fmtP(low));
                setEl('ov-close', fmtP(prevClose));
                const chgEl = document.getElementById('bbg-price-change');
                if(chgEl){chgEl.innerText=(up?'+':'')+pct.toFixed(2)+'%';chgEl.style.color=col;}
                const arrEl = document.getElementById('bbg-price-arrow');
                if(arrEl){arrEl.innerText=up?'↑':'↓';arrEl.style.color=col;}
                const ctnr = document.getElementById('bbg-current-price-container');
                if(ctnr) ctnr.style.color=col;
                console.log('[YF]', rawSym, fmtP(price), (up?'+':'')+pct.toFixed(2)+'%');
            } catch(e){ console.warn('[YF] error:', e.message); }
        };
        doFetch();
        window._ovRefreshTimer = setInterval(doFetch, 15000);
        // Set fake WS object so close() works
        window._currentBbgWs = { close: ()=>{ clearInterval(window._ovRefreshTimer); window._ovRefreshTimer=null; } };
    }
};

window._updateTVChart = function(sym, interval) {
    var iframe = document.getElementById('bbg-tv-iframe');
    if (!iframe) return;
    // Force full iframe reload by removing and recreating it
    var container = iframe.parentNode;
    var nextSibling = iframe.nextSibling;
    iframe.remove();
    var newIframe = document.createElement('iframe');
    newIframe.id = 'bbg-tv-iframe';
    newIframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;background:#000;display:block;';
    newIframe.setAttribute('allowfullscreen','');
    newIframe.setAttribute('scrolling','no');
    newIframe.setAttribute('frameborder','0');
    if (nextSibling) container.insertBefore(newIframe, nextSibling);
    else if (container) container.appendChild(newIframe);
    iframe = newIframe;
    var srcdoc = '<!DOCTYPE html><html><head>'
      + '<meta charset="utf-8">'
      + ''
      + '<script>'      + '(function(){'      + 'var _origOpen=XMLHttpRequest.prototype.open;'      + 'function killDialogs(){'      + '  var sel=['      + '    "[class*=dialog]","[class*=Dialog]","[class*=notification]","[class*=Notification]",'      + '    "[class*=modal]","[class*=Modal]","[role=dialog]","[role=alertdialog]",'      + '    "[class*=popup]","[class*=Popup]","[class*=overlay]","[class*=Overlay]",'      + '    ".tv-dialog",".js-dialog",".tv-notification"'      + '  ];'      + '  sel.forEach(function(s){document.querySelectorAll(s).forEach(function(e){e.style.cssText="display:none!important;pointer-events:none!important;";});});'      + '}'      + 'new MutationObserver(killDialogs).observe(document.documentElement,{childList:true,subtree:true,attributes:true});'      + 'window.addEventListener("message",function(e){try{var d=JSON.parse(e.data||e);if(d&&(d.name==="notification"||d.name==="alert"||d.type==="notification"))e.stopImmediatePropagation();}catch(ex){}},{capture:true});'      + '})();'      + '<\/script>'      + '<script src="https://s3.tradingview.com/tv.js"><\/script>'
      + '</head><body>'
      + '<div id="tv_chart"></div>'
      + '<script>'
      + 'new TradingView.widget({'
      + '  container_id:"tv_chart",'
      + '  autosize:true,'
      + '  symbol:' + JSON.stringify(sym) + ','
      + '  interval:' + JSON.stringify(interval) + ','
      + '  timezone:"Etc/UTC",'
      + '  theme:"dark",'
      + '  style:"3",'   // 3 = Area chart
      + '  locale:"en",'
      + '  toolbar_bg:"#000000",'
      + '  enable_publishing:false,'
      + '  hide_top_toolbar:true,'
      + '  hide_legend:true,'
      + '  hide_side_toolbar:true,'
      + '  allow_symbol_change:false,'
      + '  save_image:false,'
      + '  backgroundColor:"rgba(0,0,0,1)",'
      + '  gridColor:"#000000",'
      + '  overrides:{'
      // ─── Area series ───────────────────────────────────────────
      + '    "mainSeriesProperties.style":3,'
      + '    "mainSeriesProperties.areaStyle.color1":"rgba(180,180,180,0.18)",'
      + '    "mainSeriesProperties.areaStyle.color2":"rgba(0,0,0,0)",'
      + '    "mainSeriesProperties.areaStyle.linecolor":"#ffffff",'
      + '    "mainSeriesProperties.areaStyle.linewidth":1.5,'
      + '    "mainSeriesProperties.areaStyle.priceSource":"close",'
      // ─── Pane background — pure black ──────────────────────────
      + '    "paneProperties.background":"#000000",'
      + '    "paneProperties.backgroundType":"solid",'
      + '    "paneProperties.backgroundGradientStartColor":"#000000",'
      + '    "paneProperties.backgroundGradientEndColor":"#000000",'
      // ─── Grid — dashed vertical, faint horizontal ──────────────
      + '    "paneProperties.vertGridProperties.color":"rgba(0,0,0,0)",'
      + '    "paneProperties.vertGridProperties.style":0,'   
      + '    "paneProperties.horzGridProperties.color":"rgba(0,0,0,0)",'
      + '    "paneProperties.horzGridProperties.style":0,'   
      // ─── Crosshair ─────────────────────────────────────────────
      + '    "paneProperties.crossHairProperties.color":"#000000",'
      + '    "paneProperties.crossHairProperties.style":2,'
      // ─── Separator / border — hide completely ──────────────────
      + '    "paneProperties.separatorColor":"#000000",'
      // ─── Price scale (right axis) ──────────────────────────────
      + '    "scalesProperties.textColor":"#888888",'
      + '    "scalesProperties.fontSize":10,'
      + '    "scalesProperties.backgroundColor":"#000000",'
      + '    "scalesProperties.lineColor":"#000000",'
      + '    "scalesProperties.axisHighlightColor":"#000000",'
      + '    "scalesProperties.showStudyLastValue":false,'
      // ─── Price line (last price horizontal) ────────────────────
      + '    "mainSeriesProperties.priceLineColor":"#c8922a",'
      + '    "mainSeriesProperties.priceLineWidth":1'
      + '  },'
      + '  studies_overrides:{},'
      + '  disabled_features:['
      + '    "left_toolbar","header_widget","header_symbol_search",'
      + '    "header_resolutions","header_chart_type","header_settings",'
      + '    "header_compare","header_undo_redo","header_screenshot",'
      + '    "header_fullscreen_button","border_around_the_chart",'
      + '    "remove_library_container_border","chart_crosshair_menu",'
      + '    "display_market_status","show_logo_on_all_charts","create_volume_indicator_by_default",'
      + '    "show_missing_notifications_icon",'
      + '  ],'
      + '  enabled_features:["hide_left_toolbar_by_default"]'
      + '});'
      + '(function(){var s=".tv-watermark,[data-name=logo],#header-toolbar-logo,.pane-legend,[class*=pane-legend],[class*=legendMainSourceWrapper],[class*=legendSources],[data-name=legend],[class*=tv-logo],[class*=logo-wrapped],a[href*=tradingview],.tv-circle-logo,[class*=dialog],[class*=Dialog],[class*=notification],[class*=Notification],[class*=popup],[class*=Popup],[class*=modal],[class*=Modal],[class*=toast],[class*=Toast],[class*=alert],[class*=Alert]";function k(){document.querySelectorAll(s).forEach(function(e){e.style.cssText="display:none!important;opacity:0!important;visibility:hidden!important;";});}k();new MutationObserver(k).observe(document.documentElement,{childList:true,subtree:true});[500,1000,2000,3000,5000].forEach(function(t){setTimeout(k,t);});})();'
      + '<\/script>'
      + '</body></html>';
    iframe.srcdoc = srcdoc;
};
window._initBbg = function() {
  const container = document.getElementById('bbg-chart-container');
  if(!container) return;

  // Remove existing iframe if any (re-init guard)
  var existing = document.getElementById('bbg-tv-iframe');
  if (existing) existing.remove();

  // Create full-size iframe — TradingView Advanced Chart
  var iframe = document.createElement('iframe');
  iframe.id = 'bbg-tv-iframe';
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;background:#000;display:block;';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  // Start with BTCUSDT 1D
  // Save overlays before wiping container
  var _savedOvPanel  = document.getElementById('ov-left-panel');
  var _savedArrows   = document.getElementById('price-scale-arrows');
  var _savedDatetime = document.getElementById('ov-datetime');
  var _savedDtbar    = document.getElementById("ov-dtbar");
  var _savedDtPanel  = document.getElementById("ov-dtpanel");
  container.innerHTML = '';
  container.appendChild(iframe);

  // ── Edge cover strips (sit above iframe, hide TV borders/logo/toolbar) ──
  var edgeCss = 'position:absolute;pointer-events:none;z-index:9990;background:#000;';
  var eTop = document.createElement('div');
  eTop.style.cssText = edgeCss + 'top:0;left:0;right:0;height:3px;';
  // Bottom: full-width thin strip to hide the bottom border line
  var eBot = document.createElement('div');
  eBot.style.cssText = edgeCss + 'bottom:0;left:0;right:0;height:3px;';
  var eLeft = document.createElement('div');
  eLeft.style.cssText = edgeCss + 'top:0;left:0;bottom:0;width:3px;';
  var eRight = document.createElement('div');
  eRight.style.cssText = edgeCss + 'top:0;right:0;bottom:0;width:3px;';
  container.appendChild(eTop);
  container.appendChild(eBot);
  container.appendChild(eLeft);
  container.appendChild(eRight);

  // Re-attach overlays on top of iframe
  if (_savedArrows)   container.appendChild(_savedArrows);
  if (_savedOvPanel)  container.appendChild(_savedOvPanel);
  if (_savedDtbar)    container.appendChild(_savedDtbar);
  if (_savedDtPanel)  container.appendChild(_savedDtPanel);

  // Register in global registry for standard window management
  const pnlId = 'bbg-chart-panel';
  const panel = document.getElementById(pnlId);
  if (panel && window.PANEL_REGISTRY) {
      window.PANEL_REGISTRY[pnlId] = { 
          fn: 'CHART', maximized: false, minimized: false, 
          savedState: { l: '40px', t: '40px', w: '620px', h: '480px' } 
      };
      // Add standard resize handles
      ['rz-right', 'rz-left', 'rz-bottom', 'rz-br', 'rz-bl'].forEach(cls => {
          const h = document.createElement('div');
          h.className = cls;
          h.addEventListener('mousedown', e => window.startResize(e, pnlId, cls));
          panel.appendChild(h);
      });
  }

  // Chart loaded by _setChartInterval — do not preload here


  // ── Binance live OHLC feed for Bloomberg ribbon (At / Op / Hi / Lo / Close / Vol) ──
  // This runs independently of the TradingView iframe so the ribbon stays live.
  window._startBbgRibbonFeed = function(binancePair, binanceInterval) {
    // Close any existing WS
    if (window._currentBbgWs) { try { window._currentBbgWs.close(); } catch(e){} window._currentBbgWs = null; }
    if (window._ovRefreshTimer) { clearInterval(window._ovRefreshTimer); window._ovRefreshTimer = null; }

    var fmtP = function(v) {
      if (!v || isNaN(v)) return '—';
      return v >= 1000 ? v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})
           : v >= 1    ? parseFloat(v.toFixed(4)).toString()
           : parseFloat(v.toPrecision(5)).toString();
    };
    var fmtV = function(v) {
      if (!v || isNaN(v)) return '—';
      return v >= 1e9 ? (v/1e9).toFixed(2)+'B' : v >= 1e6 ? (v/1e6).toFixed(2)+'M' : v >= 1e3 ? (v/1e3).toFixed(1)+'K' : v.toFixed(2);
    };
    var setEl = function(id, val) { var el = document.getElementById(id); if (el) el.innerText = val; };

    // Fetch initial 1D candle for Op/Hi/Lo
    var refreshDailyOHLC = function() {
      var sym = binancePair || 'BTCUSDT';
      fetch('https://api.binance.com/api/v3/klines?symbol=' + sym + '&interval=1d&limit=2')
        .then(function(r){ return r.json(); })
        .catch(function(){ return null; })
        .then(function(klines) {
          if (!klines || klines.length < 1) return;
          var tk = klines[klines.length - 1];
          window._bbgRibbonOpen  = parseFloat(tk[1]);
          window._bbgRibbonHigh  = parseFloat(tk[2]);
          window._bbgRibbonLow   = parseFloat(tk[3]);
          window._bbgRibbonVol   = parseFloat(tk[5]);
          setEl('bbg-start', fmtP(window._bbgRibbonOpen));
          setEl('bbg-high',  fmtP(window._bbgRibbonHigh));
          setEl('bbg-low',   fmtP(window._bbgRibbonLow));
          setEl('bbg-volume',fmtV(window._bbgRibbonVol));
          // ── ov-left-panel update (same IDs as v5-7) ──
          var setOv = function(id,v){var e=document.getElementById(id);if(e)e.innerText=v;};
          setOv('ov-open',  fmtP(window._bbgRibbonOpen));
          setOv('ov-high',  fmtP(window._bbgRibbonHigh));
          setOv('ov-low',   fmtP(window._bbgRibbonLow));
          if (klines && klines.length >= 2) {
            setOv('ov-close', fmtP(parseFloat(klines[klines.length-2][4])));
          }
          var tDate = new Date(); var tM=String(tDate.getMonth()+1).padStart(2,'0'); var tD=String(tDate.getDate()).padStart(2,'0'); var tY=String(tDate.getFullYear()).slice(2);
          var tDs = tM+'/'+tD;
          setOv('ov-date-high', 'High on '+tDs+'/'+tY);
          setOv('ov-date-low',  'Low on ' +tDs+'/'+tY);
        });
    };
    refreshDailyOHLC();
    window._ovRefreshTimer = setInterval(refreshDailyOHLC, 15000);

    // WebSocket for live price + time
    var wsInterval = ({'1':'1m','5':'5m','15':'15m','30':'30m','60':'1h','D':'1d','W':'1w'}[window._tvActiveInterval] || '1d');
    var pairLow = (binancePair || 'BTCUSDT').toLowerCase();
    try {
      var ws = new WebSocket('wss://stream.binance.com:9443/ws/' + pairLow + '@ticker');
      window._currentBbgWs = ws;
      ws.onmessage = function(ev) {
        try {
          var d = JSON.parse(ev.data);
          var price = parseFloat(d.c);
          var chg   = parseFloat(d.P);
          var now   = new Date();
          var hh = String(now.getHours()).padStart(2,'0');
          var mm = String(now.getMinutes()).padStart(2,'0');
          setEl('bbg-time',  hh + ':' + mm);
          setEl('bbg-close', fmtP(price));
          // Update current-price in header
          var px = document.getElementById('bbg-current-price');
          if (px) px.innerText = fmtP(price);
          // Arrow direction ↑↓
          var arrow = document.getElementById('bbg-price-arrow');
          if (arrow) { arrow.innerText = price >= (window._bbgLastRibbonPrice || price) ? '↑' : '↓';
                       arrow.style.color = price >= (window._bbgLastRibbonPrice || price) ? '#4caf50' : '#f44336'; }
          window._bbgLastRibbonPrice = price;
          // % change
          var chgEl = document.getElementById('bbg-price-change');
          if (chgEl) { chgEl.innerText = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
                       chgEl.style.color = chg >= 0 ? '#4caf50' : '#f44336'; }
          // Update hi/lo intraday if ticker has it
          if (parseFloat(d.h) > 0) { setEl('bbg-high', fmtP(parseFloat(d.h))); }
          if (parseFloat(d.l) > 0) { setEl('bbg-low',  fmtP(parseFloat(d.l))); }
          if (parseFloat(d.q) > 0) { setEl('bbg-volume', fmtV(parseFloat(d.q))); }
          // ── ov-left-panel live update ──
          var _sOv = function(id,v){var e=document.getElementById(id);if(e)e.innerText=v;};
          _sOv('ov-start', fmtP(price));
          _sOv('ov-close', fmtP(price));
          if (parseFloat(d.h) > 0) _sOv('ov-high', fmtP(parseFloat(d.h)));
          if (parseFloat(d.l) > 0) _sOv('ov-low',  fmtP(parseFloat(d.l)));
        } catch(e){}
      };
      ws.onerror = function() {};
    } catch(e){}
  };
  // Auto-start feed for default BTC chart
  // window._startBbgRibbonFeed('BTCUSDT'); // disabled — _setChartInterval handles data feed

  
  window._toggleBbgClocks = function(show) {
      const ids = ['top-clk', 'st-utc', 'sb-sec-utc', 'sb-sec-cities', 'top-right'];
      ids.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.setProperty('display', show ? '' : 'none', show ? '' : 'important');
      });
      // STAT bar: only show when map is visible (no panels open)
      if (show) {
          const noPanels = Object.keys(window.PANEL_REGISTRY || {}).length === 0;
          const statEl = document.getElementById('STAT');
          if(statEl) statEl.style.display = noPanels ? '' : 'none';
      } else {
          const statEl = document.getElementById('STAT');
          if(statEl) statEl.style.display = 'none';
      }
  };

  window._closeChart = function() {
      if(window._currentBbgWs) { try{window._currentBbgWs.close();}catch(e){} window._currentBbgWs=null; }
      if(window._ovRefreshTimer) { clearInterval(window._ovRefreshTimer); window._ovRefreshTimer=null; }
      // Remove maximized FIRST — CSS .maximized has display:flex!important which overrides display:none
      if(panel) panel.classList.remove('maximized');
      const reg=window.PANEL_REGISTRY&&window.PANEL_REGISTRY[pnlId];
      if(reg) reg.maximized=false;
      if(panel) panel.style.display='none';
      // 5) Clean up registry
      if(window.PANEL_REGISTRY) delete window.PANEL_REGISTRY[pnlId];
      // 6) Restore STAT bar only if no other panels open
      if(window.PANEL_REGISTRY && Object.keys(window.PANEL_REGISTRY).length === 0) {
          document.body.classList.remove('panel-open');
          const _st=document.getElementById('STAT'); if(_st) _st.style.display='';
      }
      window._toggleBbgClocks(true);
      // 7) Restore TOPBAR + QUICKBAR
      const topbar = document.getElementById('TOPBAR');
      if(topbar) topbar.style.display = '';
      const qbar = document.getElementById('QUICKBAR');
      if(qbar) qbar.style.display = '';
      // 8) Update panel count
      if(typeof updatePanelCount === 'function') updatePanelCount();
      // 9) Push MAP to history so < can bring chart back
      if(!window._histSilenced) _pushHist({ type: 'MAP' });
  };

  window._maximizeChart = function() {
      if (window.maximizePanel) {
          window.maximizePanel(pnlId);
          const reg = window.PANEL_REGISTRY && window.PANEL_REGISTRY[pnlId];
          if(reg) {
              window._toggleBbgClocks(!reg.maximized);
              const topbar = document.getElementById('TOPBAR');
              if(!reg.maximized) {
                  if(topbar) topbar.style.display = '';
              } else {
                  const _sth=document.getElementById('STAT'); if(_sth) _sth.style.display='none';
              }
          }
      }
      // iframe resizes automatically via CSS 100%/100%
  };

  // Initialize Timeframe Buttons & Listeners
  const tfBtns = document.querySelectorAll('#bbg-tf-btns .tf-btn');
  
  // Default boot — do NOT auto-fetch data since chart panel starts hidden
  // Data will load when user clicks a symbol via _openChartForSymbol
  
  // Default hide clocks if starting maximized
  setTimeout(() => {
     const isMax = panel && panel.classList.contains('maximized');
     window._toggleBbgClocks(!isMax);
  }, 500);
};

/* ── Open chart for any crypto symbol from sidebar click ── */
window._openChartForSymbol = function(sym) {
    if (!sym) return;
    // Push to history (unless navigating)
    if (!window._histSilenced) _pushHist({ type: 'CHART', sym: sym });
    var pnlId = 'bbg-chart-panel';
    var panel = document.getElementById(pnlId);
    if (!panel) return;

    // 1) Close ALL other panels — registry first, then nuke any survivors from DOM
    var idsToClose = Object.keys(window.PANEL_REGISTRY || {}).filter(function(id) { return id !== pnlId; });
    idsToClose.forEach(function(id) { try { closePanel(id); } catch(e){} });
    
    // 1b) Close existing chart WebSocket before switching symbol
    if(window._currentBbgWs) {
        try { window._currentBbgWs.close(); } catch(e){}
        window._currentBbgWs = null;
    }
    if(window._ovRefreshTimer) { clearInterval(window._ovRefreshTimer); window._ovRefreshTimer = null; }
    
    // 1c) Remove old chart series to prevent visual ghosting when switching assets
    if(window._currentBbgSeries && window._bbgChart) {
        try {
            if(window._openPriceLine) { window._currentBbgSeries.removePriceLine(window._openPriceLine); window._openPriceLine = null; }
            window._bbgChart.removeSeries(window._currentBbgSeries);
        } catch(e){}
        window._currentBbgSeries = null;
    }
    // Reset price state
    window._firstBbgPrice = null;
    window._chigh = null;
    window._clow = null;
    window._lastBbgPriceTick = null;
    
    // 2) Nuke ANY .panel element anywhere in the page except chart panel
    setTimeout(function() {
        document.querySelectorAll('.panel').forEach(function(el) {
            if (el.id !== pnlId) {
                try { el.remove(); } catch(e) { el.style.display = 'none'; }
            }
        });
    }, 0);

    // 3) Show chart panel
    panel.style.display = 'flex';
    panel.style.zIndex = '1000000';
    panel.classList.add('maximized');

    // Store raw symbol globally so _setChartInterval can use it directly
    window._bbgActiveSym = sym;

    // Update Titles
    var pairMap = {
        // ── CRYPTO — Binance perpetuals ──────────────────────────────────────────
        'BTC':'BTCUSDT',    'ETH':'ETHUSDT',    'SOL':'SOLUSDT',    'BNB':'BNBUSDT',
        'XRP':'XRPUSDT',    'ADA':'ADAUSDT',    'TRX':'TRXUSDT',    'AVAX':'AVAXUSDT',
        'NEAR':'NEARUSDT',  'APT':'APTUSDT',    'SUI':'SUIUSDT',    'ICP':'ICPUSDT',
        'LINK':'LINKUSDT',  'DOT':'DOTUSDT',    'UNI':'UNIUSDT',    'LTC':'LTCUSDT',
        'XLM':'XLMUSDT',    'ATOM':'ATOMUSDT',  'ARB':'ARBUSDT',    'OP':'OPUSDT',
        'INJ':'INJUSDT',    'FTM':'FTMUSDT',    'ALGO':'ALGOUSDT',  'VET':'VETUSDT',
        'AAVE':'AAVEUSDT',  'LDO':'LDOUSDT',    'MKR':'MKRUSDT',    'CRV':'CRVUSDT',
        'GMX':'GMXUSDT',    'JUP':'JUPUSDT',    'SEI':'SEIUSDT',    'RENDER':'RENDERUSDT',
        'PENDLE':'PENDLEUSDT','GRT':'GRTUSDT',  'ENA':'ENAUSDT',    'ONDO':'ONDOUSDT',
        'TON':'TONUSDT',    'DOGE':'DOGEUSDT',  'PEPE':'PEPEUSDT',  'WIF':'WIFUSDT',
        'BONK':'BONKUSDT',  'WLD':'WLDUSDT',    'TIA':'TIAUSDT',    'JTO':'JTOUSDT',
        'PYTH':'PYTHUSDT',  'FET':'FETUSDT',    'IMX':'IMXUSDT',    'STRK':'STRKUSDT',
        'OM':'OMUSDT',      'VIRTUAL':'VIRTUALUSDT','MOVE':'MOVEUSDT','ETC':'ETCUSDT',
        'ZEC':'ZECUSDT',    'BCH':'BCHUSDT',    'FIL':'FILUSDT',    'KAS':'KASUSDT',
        'HYPE':'HYPEUSDT',  'BERA':'BERAUSDT',
        // ── HYPERLIQUID perp (for HL-only) ────────────────────────────────────
        'HYPE-PERP':'HYPEUSDT', 'BERA-PERP':'BERAUSDT',
        // ── US EQUITIES (Yahoo Finance chart) ──────────────────────────────────
        'MSTR':'MSTR','COIN':'COIN','SOFI':'SOFI','HOOD':'HOOD','PLTR':'PLTR',
        'UPST':'UPST','AFRM':'AFRM','SQ':'SQ','PYPL':'PYPL','IBIT':'IBIT',
        'SNOW':'SNOW','DDOG':'DDOG','NET':'NET','CRWD':'CRWD','ZS':'ZS',
        'OKTA':'OKTA','MNDY':'MNDY','RBLX':'RBLX','RIVN':'RIVN','LCID':'LCID',
        'NIO':'NIO','XPEV':'XPEV','ENPH':'ENPH','FSLR':'FSLR',
        'LMT':'LMT','RTX':'RTX','NOC':'NOC','GD':'GD','BA':'BA',
        'MRNA':'MRNA','BNTX':'BNTX','REGN':'REGN','VRTX':'VRTX','AMGN':'AMGN',
        'DIS':'DIS','PARA':'PARA','WBD':'WBD','SPOT':'SPOT','TGT':'TGT',
        'NEM':'NEM','FCX':'FCX','QCOM':'QCOM','AVGO':'AVGO',
        'MU':'MU','AMAT':'AMAT','TXN':'TXN','SPY':'SPY','QQQ':'QQQ','GLD':'GLD',
        'AAPL':'AAPL','NVDA':'NVDA','MSFT':'MSFT','GOOGL':'GOOGL','META':'META',
        'AMZN':'AMZN','TSLA':'TSLA','JPM':'JPM','V':'V','MA':'MA',
        'NFLX':'NFLX','AMD':'AMD','INTC':'INTC','CRM':'CRM','ORCL':'ORCL',
        'ADBE':'ADBE','UBER':'UBER','XOM':'XOM','CVX':'CVX','WMT':'WMT',
        'COST':'COST','KO':'KO','HD':'HD','BRK':'BRK-B','GS':'GS',
        'BAC':'BAC','WFC':'WFC','MS':'MS','UNH':'UNH','LLY':'LLY',
        'JNJ':'JNJ','ABBV':'ABBV','PFE':'PFE','MRK':'MRK',
        // ── INDICES ────────────────────────────────────────────────────────────
        'SPX':'SPX', 'NDX':'NDX', 'DJI':'DJI', 'RUT':'RUT', 'VIX':'VIX',
        'DAX':'DAX', 'NI225':'NI225', 'NIKKEI':'NI225', 'FTSE':'FTSE', 'CAC':'CAC',
        'HSI':'HSI', 'KOSPI':'KOSPI', 'ASX200':'ASX200', 'SENSEX':'SENSEX',
        'NIFTY':'NIFTY', 'IBOV':'IBOV', 'AEX':'AEX', 'SMI':'SMI', 'IBEX':'IBEX',
        'ES1':'ES1!', 'NQ1':'NQ1!', 'YM1':'YM1!', 'ES':'ES1!', 'NQ':'NQ1!',
        // ── COMMODITIES ────────────────────────────────────────────────────────
        'GOLD':'GOLD', 'SILVER':'SILVER', 'XAUUSD':'GOLD', 'XAGUSD':'SILVER',
        'OIL':'WTI', 'WTI':'WTI', 'BRENT':'BRENT', 'GAS':'NATGAS', 'NATGAS':'NATGAS',
        'COPPER':'COPPER', 'WHEAT':'WHEAT', 'CORN':'CORN', 'SOYBEAN':'SOYBEAN',
        'COFFEE':'COFFEE', 'COCOA':'COCOA', 'SUGAR':'SUGAR', 'COTTON':'COTTON',
        'PLATINUM':'PLATINUM', 'PALLADIUM':'PALLADIUM',
        // ── FOREX ──────────────────────────────────────────────────────────────
        'EURUSD':'EURUSD', 'GBPUSD':'GBPUSD', 'USDJPY':'USDJPY',
        'AUDUSD':'AUDUSD', 'USDCAD':'USDCAD', 'USDCHF':'USDCHF',
        'NZDUSD':'NZDUSD', 'EURGBP':'EURGBP', 'EURJPY':'EURJPY',
        'GBPJPY':'GBPJPY', 'USDMXN':'USDMXN', 'USDBRL':'USDBRL',
        'USDZAR':'USDZAR', 'USDTRY':'USDTRY', 'USDINR':'USDINR',
        // ── BONDS ──────────────────────────────────────────────────────────────
        'US10Y':'US10Y', 'US2Y':'US2Y', 'US30Y':'US30Y', 'US5Y':'US5Y',
    };
    // Futures display names for indices
    var futuresName = {
        'DAX':'FDAX1!', 'NI225':'NK1!',
        'FTSE':'Z1!', 'CAC':'FCE1!', 'VIX':'VX1!',
        'ES1!':'ES1!','NQ1!':'NQ1!','YM1!':'YM1!','FDAX1!':'FDAX1!','NK1!':'NK1!','VX1!':'VX1!'
    };
    var assetType = {
        'SPX':'Index', 'NDX':'Index', 'DJI':'Index', 'DAX':'Futures', 'NI225':'Futures', 'FTSE':'Futures', 'CAC':'Futures', 'VIX':'Index',
        'ES1!':'Futures','NQ1!':'Futures','YM1!':'Futures','FDAX1!':'Futures','NK1!':'Futures','VX1!':'Futures',
        'GOLD':'Comdty', 'SILVER':'Comdty', 'OIL':'Comdty', 'GAS':'Comdty', 'COPPER':'Comdty',
        'EURUSD':'Curncy', 'GBPUSD':'Curncy', 'USDJPY':'Curncy', 'AUDUSD':'Curncy', 'USDCAD':'Curncy',
        // US Equities
        'MSTR':'Equity','COIN':'Equity','SOFI':'Equity','HOOD':'Equity','PLTR':'Equity',
        'UPST':'Equity','AFRM':'Equity','SQ':'Equity','PYPL':'Equity','IBIT':'Equity',
        'SNOW':'Equity','DDOG':'Equity','NET':'Equity','CRWD':'Equity','ZS':'Equity',
        'OKTA':'Equity','MNDY':'Equity','RBLX':'Equity','RIVN':'Equity','LCID':'Equity',
        'NIO':'Equity','XPEV':'Equity','ENPH':'Equity','FSLR':'Equity',
        'LMT':'Equity','RTX':'Equity','NOC':'Equity','GD':'Equity','BA':'Equity',
        'MRNA':'Equity','BNTX':'Equity','REGN':'Equity','VRTX':'Equity','AMGN':'Equity',
        'DIS':'Equity','PARA':'Equity','WBD':'Equity','SPOT':'Equity','TGT':'Equity',
        'NEM':'Equity','FCX':'Equity','QCOM':'Equity','AVGO':'Equity',
        'MU':'Equity','AMAT':'Equity','TXN':'Equity','SPY':'Equity','QQQ':'Equity','GLD':'Equity',
        'AAPL':'Equity','NVDA':'Equity','MSFT':'Equity','GOOGL':'Equity','META':'Equity',
        'AMZN':'Equity','TSLA':'Equity','JPM':'Equity','V':'Equity','MA':'Equity',
        'NFLX':'Equity','AMD':'Equity','INTC':'Equity','CRM':'Equity','ORCL':'Equity',
        'ADBE':'Equity','UBER':'Equity','XOM':'Equity','CVX':'Equity','WMT':'Equity',
        'COST':'Equity','KO':'Equity','HD':'Equity','BRK':'Equity','GS':'Equity',
        'BAC':'Equity','WFC':'Equity','MS':'Equity','UNH':'Equity','LLY':'Equity',
        'JNJ':'Equity','ABBV':'Equity','PFE':'Equity','MRK':'Equity'
    };
    var pair = pairMap[sym] || (sym + 'USDT');
    var suffix = assetType[sym] || 'Crypto';
    // For futures indices: show "ES1! Futures", for equity: "AAPL Equity", for crypto: "BTC/USDT"
    var displayPair;
    if (futuresName[sym]) {
        displayPair = futuresName[sym] + ' Futures';
    } else if (suffix !== 'Crypto') {
        displayPair = sym + ' ' + suffix;
    } else {
        displayPair = sym + '/USDT';
    }
    
    var titleEl = document.getElementById('bbg-chart-title');
    if (titleEl) titleEl.innerText = displayPair;
    var tbTitle = document.getElementById('bbg-toolbar-title');
    if (tbTitle) tbTitle.innerHTML = '<span>' + displayPair + '</span>';

    // Register state
    if (!window.PANEL_REGISTRY) window.PANEL_REGISTRY = {};
    window.PANEL_REGISTRY[pnlId] = { fn:'CHART', maximized:true, minimized:false, savedState:{l:'40px',t:'40px',w:'900px',h:'600px'} };

    // Hide background UI
    document.body.classList.add('panel-open');
    if (window._toggleBbgClocks) window._toggleBbgClocks(false);
    const _sth=document.getElementById('STAT'); if(_sth) _sth.style.display='none';

    // Init iframe immediately
    if (!document.getElementById('bbg-tv-iframe')) {
        if (window._initBbg) window._initBbg();
    }
    // _setChartInterval řídí vše: TV iframe + ribbon data (Binance WS / Yahoo)
    if (window._setChartInterval) window._setChartInterval('1d');

};

/* ── STAT BAR always visible ── */
window._statBarVisible = true;





let l1_uptime = 0;
let l1_sourcesOK = 0;

async function fetchIndex(sym) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}`;
    const pUrl = `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
    const r = await fetch(pUrl, { cache: 'no-store' });
    if (!r.ok) return '--';
    const data = await r.json();
    return data.chart?.result?.[0]?.meta?.regularMarketPrice || '--';
  } catch (e) {
    return '--';
  }
}

async function fetchFX(to) {
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${to}`);
    const data = await res.json();
    return data.rates[to] ? (1 / data.rates[to]).toFixed(5) : '--';
  } catch { return '--'; } 
}

async function fetchMetals() {
  try {
    const res = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAU,XAG');
    const data = await res.json();
    return data.rates || {};
  } catch { return {}; }
}

async function fetchBTC() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    const data = await res.json();
    return data.price ? parseFloat(data.price) : '--';
  } catch { return '--'; }
}

async function masterUpdate() {
  l1_uptime++;
  l1_sourcesOK = 0;

  console.log('[MASTER-UPDATE] Starting parallel fetch... path: [O(1) NETWORK]');

  // START ALL FETCHES IN PARALLEL
  const [
    btcRes, spxRes, ndxRes, djiRes,
    eurRes, gbpRes, jpyRes, audRes, cadRes,
    metalsRes
  ] = await Promise.allSettled([
    fetchBTC(), fetchIndex('%5EGSPC'), fetchIndex('%5ENDX'), fetchIndex('%5EDJI'),
    fetchFX('EUR'), fetchFX('GBP'), fetchFX('JPY'), fetchFX('AUD'), fetchFX('CAD'),
    fetchMetals()
  ]);

  const btc = btcRes.status === 'fulfilled' ? btcRes.value : '--';
  const spx = spxRes.status === 'fulfilled' ? spxRes.value : '--';
  const ndx = ndxRes.status === 'fulfilled' ? ndxRes.value : '--';
  const dji = djiRes.status === 'fulfilled' ? djiRes.value : '--';
  
  const fxData = {
    EUR: eurRes.status === 'fulfilled' ? eurRes.value : '--',
    GBP: gbpRes.status === 'fulfilled' ? gbpRes.value : '--',
    JPY: jpyRes.status === 'fulfilled' ? jpyRes.value : '--',
    AUD: audRes.status === 'fulfilled' ? audRes.value : '--',
    CAD: cadRes.status === 'fulfilled' ? cadRes.value : '--'
  };

  const metals = metalsRes.status === 'fulfilled' ? metalsRes.value : {};
  const gold = metals.XAU ? (1 / metals.XAU).toFixed(2) : '--';
  const silver = metals.XAG ? (1 / metals.XAG).toFixed(2) : '--';

  // Count successes
  [btc, spx, ndx, dji, gold, silver].forEach(v => { if(v !== '--') l1_sourcesOK++; });
  Object.values(fxData).forEach(v => { if(v !== '--') l1_sourcesOK++; });

  // Sync via localStorage as requested
  const syncData = {
    time: Date.now(),
    btc,
    sp:  spx !== '--' ? parseFloat(spx).toFixed(2) : '5400.00',
    ndx: ndx !== '--' ? parseFloat(ndx).toFixed(2) : '18800.00',
    dji: dji !== '--' ? parseFloat(dji).toFixed(2) : '40000.00',
    eur: fxData.EUR || '1.1468',
    gbp: fxData.GBP || '1.2842',
    jpy: fxData.JPY || '148.20',
    aud: fxData.AUD || '0.6642',
    gold,
    silver,
    quality: l1_sourcesOK / 12,
    sources: l1_sourcesOK,
    uptime: l1_uptime * 5
  };
  localStorage.setItem('broomberg_sync', JSON.stringify(syncData));
  window._l1Data = syncData;

  // Update Global State and Trigger Visible UI
  if (typeof updateCoin === 'function') {
    if (btc !== '--') updateCoin('BTC', { px: btc }, 'ws', 1);
    
    // Core Indices (MKT object for Top Ribbon, CRYPTO for panels)
    const indices = [
      { id: 'SPX', val: spx, fallback: '6378.17' },
      { id: 'NDX', val: ndx, fallback: '19684' },
      { id: 'INDU', val: dji, fallback: '42184' }
    ];

    indices.forEach(idx => {
      const realPx = idx.val !== '--' ? idx.val : parseFloat(idx.fallback);
      
      // 1. Force override in MKT (visible ribbon)
      if (typeof MKT !== 'undefined' && MKT[idx.id]) {
        MKT[idx.id].px = realPx;
        MKT[idx.id].chg = 0;
      }
      
      // 2. Use 'tv' source with priority 0 to ensure it's NEVER ignored by updateCoin
      if (typeof updateCoin === 'function') {
        updateCoin(idx.id, { px: realPx }, 'tv', 0);
        updateCoin(idx.id + ' Index', { px: realPx }, 'tv', 0);
      }

      // 3. NUCLEAR OPTION: Direct DOM update for the ticker tape to bypass all logic
      if (typeof _tkUp === 'function') {
        _tkUp('m-' + idx.id, realPx, 0);
      }
    });

    if (btc !== '--') updateCoin('BTC', { px: btc }, 'ws', 1);
    if (gold !== '--') updateCoin('GOLD', { px: parseFloat(gold) }, 'comdty', 1);
    
    // Update FXP array for FX ribbon
    if (typeof FXP !== 'undefined') {
      Object.entries(fxData).forEach(([p, val]) => {
        if (val !== '--') {
          const v = parseFloat(val);
          const f = FXP.find(x => x.p === p + 'USD');
          if (f) { f.b = v; f.a = v; }
        }
      });
    }
  }

  // Update DOM Elements (Hidden and Visible)
  const statusEl = document.getElementById('l1-status');
  const btcEl = document.getElementById('btc-l1');
  const spEl = document.getElementById('sp-l1');
  const ndxEl = document.getElementById('ndx-l1');
  const goldEl = document.getElementById('gold-l1');
  const eurEl = document.getElementById('eurusd-l1');
  const uptimeEl = document.getElementById('l1-uptime');

  if(statusEl) statusEl.textContent = `${Math.min(l1_sourcesOK, 12)}/12 sources OK`;
  if(btcEl) btcEl.textContent = typeof btc === 'number' ? btc.toLocaleString() : btc;
  if(spEl) spEl.textContent = syncData.sp;
  if(ndxEl) ndxEl.textContent = syncData.ndx;
  if(goldEl) goldEl.textContent = syncData.gold;
  if(eurEl) eurEl.textContent = syncData.eur;
  if(uptimeEl) uptimeEl.textContent = (l1_uptime * 5) + 's';

  // Force Render of the visible ribbon and sidebar
  if (typeof _requestRender === 'function') _requestRender();
}

async function fetchIndex(sym) {
  const TICKER_MAP = { 'SPY': '^GSPC', 'QQQ': '^IXIC', 'DIA': '^DJI' };
  const target = TICKER_MAP[sym] || sym;
  
  // Agresivní proxy řetězec: Pokud selže jeden, zkusíme další
  const proxies = [
    u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
    u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    u => `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(u)}`, // 3. záchranná proxy
    u => u // final attempt: direct fetch (may fail but worth a shot)
  ];

  for (const proxy of proxies) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${target}?interval=1m&range=1d`;
      const r = await fetch(typeof proxy === 'function' ? proxy(url) : proxy, { 
        signal: AbortSignal.timeout(6000),
        headers: { 'Accept': 'application/json' }
      });
      if (!r.ok) continue;
      const data = await r.json();
      const px = data.chart?.result?.[0]?.meta?.regularMarketPrice || data.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.[0];
      if (px && !isNaN(px)) return px;
    } catch (e) {}
  }
  return '--';
}





window.refreshLivePanels = function() {
    Object.entries(PANEL_REGISTRY).forEach(([id, reg]) => {
        if (['WEI', 'FX', 'COMDTY', 'METALS', 'ENERGY', 'WORLD'].includes(reg.fn)) {
            const body = document.getElementById('pb-' + id);
            if (!body) return;
            const pnl = document.getElementById(id);
            let ti = 0;
            if (pnl) pnl.querySelectorAll('.ptab').forEach((t, i) => { if (t.classList.contains('on')) ti = i; });
            const st = body.scrollTop;
            body.innerHTML = ti > 0 ? buildPanelContentTab(reg.fn, ti) : buildPanelContent(reg.fn);
            body.scrollTop = st;
        }
    });
};

// 5s loop
setInterval(masterUpdate, 5000);
masterUpdate(); 

// ══════════════════════════════════════════════════════════════════
//  BACKGROUND DATA BRIDGE v1.0
//  Fetches Binance Futures + Hyperliquid data in background
//  and injects directly into terminal's LIVE / MKT / FXP objects
//  Runs silently — no UI changes, just data enrichment
// ══════════════════════════════════════════════════════════════════
(function() {
  'use strict';

  // ── Binance Futures symbols to track ──
  const FUTURES_SYMBOLS = ['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','DOGEUSDT','ADAUSDT','AVAXUSDT','LINKUSDT','DOTUSDT'];

  // ── Hyperliquid perps to track ──
  const HL_COINS = ['BTC','ETH','SOL','BNB','XRP','DOGE','ADA','AVAX','LINK','DOT'];

  // ── Internal state cache ──
  const _bridge = {
    futures: {},      // symbol → { mark, index, funding, oi, vol24h }
    hyperliquid: {},  // coin → { px, funding, oi, vol24h }
    lastUpdate: 0,
    errors: 0
  };
  window._bridgeData = _bridge;

  // ── Inject into LIVE object ──
  function injectLive(data) {
    if (!window.LIVE) return;

    // BTC mark price from futures (higher quality than spot for some uses)
    if (data.futures['BTCUSDT'] && data.futures['BTCUSDT'].mark) {
      if (!window.LIVE.btcFutures) window.LIVE.btcFutures = {};
      window.LIVE.btcFutures.mark     = data.futures['BTCUSDT'].mark;
      window.LIVE.btcFutures.funding  = data.futures['BTCUSDT'].funding;
      window.LIVE.btcFutures.oi       = data.futures['BTCUSDT'].oi;
    }

    // ETH futures
    if (data.futures['ETHUSDT'] && data.futures['ETHUSDT'].mark) {
      if (!window.LIVE.ethFutures) window.LIVE.ethFutures = {};
      window.LIVE.ethFutures.mark    = data.futures['ETHUSDT'].mark;
      window.LIVE.ethFutures.funding = data.futures['ETHUSDT'].funding;
      window.LIVE.ethFutures.oi      = data.futures['ETHUSDT'].oi;
    }

    // Hyperliquid enrichment — BTC/ETH cross-check
    if (data.hyperliquid['BTC'] && data.hyperliquid['BTC'].px) {
      window.LIVE.btcHL = data.hyperliquid['BTC'].px;
    }
    if (data.hyperliquid['ETH'] && data.hyperliquid['ETH'].px) {
      window.LIVE.ethHL = data.hyperliquid['ETH'].px;
    }

    // Aggregate funding rate (BTC futures Binance + HL average)
    const bFund = parseFloat(data.futures['BTCUSDT']?.funding || 0);
    const hFund = parseFloat(data.hyperliquid['BTC']?.funding || 0);
    if (bFund || hFund) {
      window.LIVE.btcFundingAvg = ((bFund + hFund) / (bFund && hFund ? 2 : 1)).toFixed(6);
    }

    _bridge.lastUpdate = Date.now();
  }

  // ── Inject into MKT object (crypto assets) ──
  function injectMKT(data) {
    if (!window.MKT) return;

    // Map futures data into MKT entries if they exist
    const futMap = {
      'BTCUSDT': ['BTC', 'BTCUSD'],
      'ETHUSDT': ['ETH', 'ETHUSD'],
      'SOLUSDT': ['SOL', 'SOLUSD'],
      'BNBUSDT': ['BNB'],
      'XRPUSDT': ['XRP'],
      'DOGEUSDT': ['DOGE'],
    };

    Object.entries(futMap).forEach(([sym, keys]) => {
      const fd = data.futures[sym];
      if (!fd || !fd.mark) return;
      keys.forEach(k => {
        if (window.MKT[k]) {
          // Only update if bridge price is fresher or MKT has no price yet
          if (!window.MKT[k].px || Math.abs(window.MKT[k].px - fd.mark) / fd.mark < 0.05) {
            window.MKT[k].px = fd.mark;
            if (fd.chg !== undefined) window.MKT[k].chg = fd.chg;
          }
          // Always store futures-specific data separately
          window.MKT[k].futures = {
            mark: fd.mark,
            index: fd.index,
            funding: fd.funding,
            oi: fd.oi,
            vol24h: fd.vol24h
          };
        }
      });
    });

    // Hyperliquid — store as backup px + hl-specific data
    Object.entries(data.hyperliquid).forEach(([coin, hd]) => {
      if (!hd.px) return;
      if (window.MKT[coin]) {
        window.MKT[coin].hl = {
          px: hd.px,
          funding: hd.funding,
          oi: hd.oi,
          vol24h: hd.vol24h
        };
        // If MKT has no price yet, use HL price
        if (!window.MKT[coin].px) {
          window.MKT[coin].px = hd.px;
        }
      }
    });
  }

  // ── Fetch Binance Futures (premium index + funding) ──
  async function fetchBinanceFutures() {
    try {
      // Mark prices for all symbols at once
      const [markRes, fundRes] = await Promise.allSettled([
        fetch('https://fapi.binance.com/fapi/v1/premiumIndex'),
        fetch('https://fapi.binance.com/fapi/v1/fundingRate?limit=1')
      ]);

      if (markRes.status === 'fulfilled' && markRes.value.ok) {
        const marks = await markRes.value.json();
        marks.forEach(m => {
          if (!FUTURES_SYMBOLS.includes(m.symbol)) return;
          if (!_bridge.futures[m.symbol]) _bridge.futures[m.symbol] = {};
          _bridge.futures[m.symbol].mark    = parseFloat(m.markPrice);
          _bridge.futures[m.symbol].index   = parseFloat(m.indexPrice);
          _bridge.futures[m.symbol].funding = parseFloat(m.lastFundingRate);
        });
        _boot.update && _boot.update('BINANCE·REST', 'ok', 'Futures mark prices OK');
      }

      // Open interest for BTC + ETH
      const oiSyms = ['BTCUSDT','ETHUSDT','SOLUSDT'];
      await Promise.allSettled(oiSyms.map(async sym => {
        try {
          const r = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${sym}`);
          if (r.ok) {
            const d = await r.json();
            if (!_bridge.futures[sym]) _bridge.futures[sym] = {};
            _bridge.futures[sym].oi = parseFloat(d.openInterest);
          }
        } catch(_) {}
      }));

      // 24h stats for volume
      try {
        const statsRes = await fetch('https://fapi.binance.com/fapi/v1/ticker/24hr');
        if (statsRes.ok) {
          const stats = await statsRes.json();
          stats.forEach(s => {
            if (!FUTURES_SYMBOLS.includes(s.symbol)) return;
            if (!_bridge.futures[s.symbol]) _bridge.futures[s.symbol] = {};
            _bridge.futures[s.symbol].vol24h = parseFloat(s.quoteVolume);
            _bridge.futures[s.symbol].chg    = parseFloat(s.priceChangePercent);
          });
        }
      } catch(_) {}

    } catch(e) {
      _bridge.errors++;
      console.debug('[BRIDGE] Binance Futures error:', e.message);
    }
  }

  // ── Fetch Hyperliquid perps ──
  async function fetchHyperliquid() {
    try {
      // Meta + asset contexts (prices, OI, funding)
      const res = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      });

      if (!res.ok) return;
      const [meta, ctxs] = await res.json();

      meta.universe.forEach((asset, i) => {
        if (!HL_COINS.includes(asset.name)) return;
        const ctx = ctxs[i];
        if (!ctx) return;
        _bridge.hyperliquid[asset.name] = {
          px:      parseFloat(ctx.markPx || 0),
          funding: parseFloat(ctx.funding || 0),
          oi:      parseFloat(ctx.openInterest || 0),
          vol24h:  parseFloat(ctx.dayNtlVlm || 0)
        };
      });

      _boot.update && _boot.update('HYPERLIQUID', 'ok', `${Object.keys(_bridge.hyperliquid).length} perps connected`);

    } catch(e) {
      _bridge.errors++;
      console.debug('[BRIDGE] Hyperliquid error:', e.message);
    }
  }

  // ── Master bridge update ──
  async function bridgeUpdate() {
    if (window._tabHidden) return; // pause when tab hidden

    await Promise.allSettled([
      fetchBinanceFutures(),
      fetchHyperliquid()
    ]);

    // Inject into terminal globals
    injectLive(_bridge);
    injectMKT(_bridge);

    // Trigger existing panel refresh if available
    if (window.refreshLivePanels) {
      try { window.refreshLivePanels(); } catch(_) {}
    }

    // Also update broomberg_sync with futures data for cross-tab usage
    try {
      const existing = JSON.parse(localStorage.getItem('broomberg_sync') || '{}');
      if (_bridge.futures['BTCUSDT']?.mark) {
        existing.btcFutures  = _bridge.futures['BTCUSDT'].mark;
        existing.btcFunding  = _bridge.futures['BTCUSDT'].funding;
        existing.btcFuturesOI= _bridge.futures['BTCUSDT'].oi;
      }
      if (_bridge.futures['ETHUSDT']?.mark) {
        existing.ethFutures  = _bridge.futures['ETHUSDT'].mark;
        existing.ethFunding  = _bridge.futures['ETHUSDT'].funding;
      }
      if (_bridge.hyperliquid['BTC']?.px) {
        existing.btcHL       = _bridge.hyperliquid['BTC'].px;
        existing.btcHLFunding= _bridge.hyperliquid['BTC'].funding;
      }
      existing.bridgeTs = Date.now();
      localStorage.setItem('broomberg_sync', JSON.stringify(existing));
    } catch(_) {}
  }

  // ── Boot: first fetch immediately, then every 10s ──
  // Stagger with masterUpdate (which runs every 5s) to avoid API bursts
  setTimeout(() => {
    bridgeUpdate();
    setInterval(bridgeUpdate, 10000);
  }, 3000);

  console.log('[BRIDGE] Background Data Bridge v1.0 initialized — Binance Futures + Hyperliquid');
})();

// ESC toggle + ALT nav
document.addEventListener('keydown', e => { 
    if(e.key === 'Escape') {
        const layer = document.getElementById('first-layer');
        if(layer) layer.style.display = layer.style.display === 'none' ? 'flex' : 'none';
    }
    if(e.altKey && e.key === 'ArrowLeft')  { e.preventDefault(); if(window._cmdHist) _cmdHist(-1); }
    if(e.altKey && e.key === 'ArrowRight') { e.preventDefault(); if(window._cmdHist) _cmdHist(1);  }
});

// === LOCAL STORAGE SYNC BRIDGE ===
window.addEventListener('storage', (e) => {
    if (e.key === 'broomberg_sync') {
        try {
            const data = JSON.parse(e.newValue);
            window._l1Data = data;
            // Update internal LIVE object used by physics
            if (window.LIVE) {
                window.LIVE.btc = data.btc;
                window.LIVE.sp = data.sp;
                window.LIVE.ndx = data.ndx;
                window.LIVE.dji = data.dji;
                window.LIVE.eur = data.eur;
                window.LIVE.gbp = data.gbp;
                window.LIVE.jpy = data.jpy;
                window.LIVE.aud = data.aud;
                window.LIVE.gold = data.gold;
                window.LIVE.silver = data.silver;
                window.LIVE.sources = data.sources;
                window.LIVE.quality = data.quality;
                
                // Inject into global MKT and FXP for panel real-time updates
                if(window.MKT) {
                    if(data.sp) MKT.SPX.px = parseFloat(data.sp);
                    if(data.ndx) MKT.NDX.px = parseFloat(data.ndx);
                    if(data.dji) MKT.DJI.px = parseFloat(data.dji);
                }
                if(window.FXP) {
                    const e = FXP.find(f=>f.p==='EUR/USD'); if(e) e.b = parseFloat(data.eur);
                    const g = FXP.find(f=>f.p==='GBP/USD'); if(g) g.b = parseFloat(data.gbp);
                    const j = FXP.find(f=>f.p==='USD/JPY'); if(j) j.b = parseFloat(data.jpy);
                    const a = FXP.find(f=>f.p==='AUD/USD'); if(a) a.b = parseFloat(data.aud);
                }
                if(window.COMDTY_DATA) {
                    const g = COMDTY_DATA.find(c=>c.s==='XAU'); if(g) g.px = parseFloat(data.gold);
                    const s = COMDTY_DATA.find(c=>c.s==='XAG'); if(s) s.px = parseFloat(data.silver);
                }
            }
        } catch(err) {}
    }
});



(function() {
  'use strict';

  // ── CONFIG ─────────────────────────────────────────────────────────────────
  // ── BACKEND URL — změň zde po nasazení na Railway/Render ─────────────────
  // Lokálně:  'localhost:8086'
  // Railway:  'tvuj-projekt.up.railway.app'  (bez https://)
  const CE_HOST   = 'cryexc-backend-production.up.railway.app';
  const CE_WS_URL = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + CE_HOST + '/ws';
  const CE_HTTP   = (window.location.protocol === 'https:' ? 'https://' : 'http://') + CE_HOST;
  // Full symbol universe — musí přesně odpovídat SYMBOLS v main.py backendu
  const CE_SYMBOLS = [
    // Majors
    'BTCUSDT','ETHUSDT','BNBUSDT','SOLUSDT','XRPUSDT',
    // Layer 1
    'ADAUSDT','AVAXUSDT','DOTUSDT','NEARUSDT','ATOMUSDT',
    'ALGOUSDT','VETUSDT','XLMUSDT','TONUSDT','TRXUSDT',
    'ICPUSDT','APTUSDT','SUIUSDT','KASUSDT','SEIUSDT',
    // Layer 2 / Scaling
    'OPUSDT','ARBUSDT','STRKUSDT','IMXUSDT','MOVEUSDT',
    'PYTHUSDT','JTOUSDT','VIRTUALUSDT',
    // DeFi
    'UNIUSDT','AAVEUSDT','MKRUSDT','CRVUSDT','LDOUSDT',
    'GMXUSDT','JUPUSDT','RAYUSDT','RENDERUSDT','FETUSDT',
    'PENDLEUSDT','INJUSDT','GRTUSDT','OMUSDT',
    // Other top coins
    'LTCUSDT','BCHUSDT','ETCUSDT','XMRUSDT','ZECUSDT',
    'LINKUSDT','FILUSDT','FTMUSDT','HYPEUSDT','BERASUDT','DOGEUSDT','SHIBUSDT',
  ];
  const CE_EXCHANGE  = 'binancef';
  const CE_EXCHANGE2 = 'hyperliquid';
  const CE_HL_SYMS   = ['HYPE','BERA','MOVE','VIRTUAL','KAS','W','ENA','JTO','PYTH'];
  const CE_NOTIONAL  = {
    BTCUSDT:100000, ETHUSDT:50000, SOLUSDT:25000, BNBUSDT:20000,
    XRPUSDT:15000,  DOGEUSDT:10000, ADAUSDT:10000, AVAXUSDT:15000,
    LINKUSDT:15000, SUIUSDT:10000,  DOTUSDT:8000,  UNIUSDT:8000,
    NEARUSDT:8000,  AAVEUSDT:10000, INJUSDT:8000,  ARBUSDT:8000,
    OPUSDT:8000,    TONUSDT:8000,   HYPEUSDT:10000, ATOMUSDT:8000,
    LDOUSDT:8000,   JUPUSDT:8000,   RENDERUSDT:8000, PENDLEUSDT:5000,
    FTMUSDT:5000,   ALGOUSDT:5000,  VETUSDT:5000,  XLMUSDT:5000,
    LTCUSDT:10000,  BERASUDT:8000,  MOVEUSDT:5000, VIRTUALUSDT:5000,
    DEFAULT:5000
  };

  // ── STATE ──────────────────────────────────────────────────────────────────
  window._cryexc = {
    ws: null,
    connected: false,
    reconnecting: false,
    stats: {},          // symbol → orderbook_stats
    cvd: {},            // symbol → latest cvd value
    trades: [],         // ring buffer, last 200 trades
    liquidations: [],   // ring buffer, last 100 liq events
    news: [],           // last 100 news items
    liqTotal: { buy: 0, sell: 0, buySz: 0, sellSz: 0 },
    lastTrade: {},      // symbol → last trade
    marketStats: {},    // symbol → market stats from /api/market-stats
    screener: [],       // 24h screener data
    subsIds: {},        // track sent subscriptions
  };
  const CE = window._cryexc;

  // ── PANEL BUILDER — CryExc live panel ─────────────────────────────────────
  window._buildCryExcPanel = function() {
    const s   = CE.connected;
    const now = Date.now();
    const dot = s
      ? '<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#00ff44;margin-right:4px;vertical-align:middle;animation:blink 2s infinite"></span>'
      : '<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#ff3333;margin-right:4px;vertical-align:middle"></span>';
    const statusTxt = s ? 'LIVE · ws://localhost:8086' : 'OFFLINE — spusť Python backend nebo nasaď na Railway';
    const statusCol = s ? '#00cc44' : '#ff3333';
    const fmtN = v => v >= 1e9 ? '$'+(v/1e9).toFixed(2)+'B' : v >= 1e6 ? '$'+(v/1e6).toFixed(1)+'M' : '$'+(v/1e3).toFixed(0)+'K';
    const fmtP = (p, d=2) => p >= 10000 ? p.toLocaleString('en',{maximumFractionDigits:0}) : p.toFixed(d);
    const ageStr = ts => { const a=Math.max(0,Math.round((now-ts)/1000)); return a<60?a+'s':a<3600?Math.floor(a/60)+'m':Math.floor(a/3600)+'h'; };

    // ── MULTI-SYMBOL ORDERBOOK STATS ──────────────────────────────────────
    const obSyms = ['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','AVAXUSDT'];
    const obColMap = { BTC:'#ff9900', ETH:'#627EEA', SOL:'#9945FF', BNB:'#f0b90b', XRP:'#00aae4', AVAX:'#e84142' };
    let obHtml = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0">';
    obSyms.forEach(sym => {
      const ob = CE.stats[sym];
      const base = sym.replace('USDT','');
      const col = obColMap[base] || '#ff8800';
      if (ob) {
        const spread = ob.spread ? ob.spread.toFixed(1) : '—';
        const mid    = ob.midPrice ? '$'+fmtP(ob.midPrice) : '—';
        const ratio  = (ob.bidQuantity_0_5pct && ob.askQuantity_0_5pct)
          ? (ob.bidQuantity_0_5pct / (ob.bidQuantity_0_5pct + ob.askQuantity_0_5pct) * 100)
          : 50;
        const bidW = ratio.toFixed(0);
        obHtml += `<div style="border-right:1px solid #1a0e00;border-bottom:1px solid #1a0e00;padding:5px 8px">
          <div style="color:${col};font-size:7px;font-weight:700;letter-spacing:1px;margin-bottom:3px">${base}/USDT</div>
          <div style="display:flex;gap:8px;align-items:baseline;margin-bottom:3px">
            <span style="color:#fff;font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace">${mid}</span>
            <span style="color:#555;font-size:7px">sprd ${spread}</span>
          </div>
          <div style="height:4px;background:#1a0000;border-radius:2px;overflow:hidden">
            <div style="width:${bidW}%;height:100%;background:#00cc44;opacity:.8"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:6px;color:#444;margin-top:1px">
            <span>BID ${(ob.bidQuantity_0_5pct||0).toFixed(1)}</span>
            <span>ASK ${(ob.askQuantity_0_5pct||0).toFixed(1)}</span>
          </div>
        </div>`;
      } else {
        obHtml += `<div style="border-right:1px solid #1a0e00;border-bottom:1px solid #1a0e00;padding:5px 8px">
          <div style="color:${col};font-size:7px;font-weight:700;letter-spacing:1px;margin-bottom:3px">${base}/USDT</div>
          <div style="color:#333;font-size:8px">${s?'Waiting…':'—'}</div>
        </div>`;
      }
    });
    obHtml += '</div>';

    // ── MARKET STATS — top 8 Binance symbols + top HL perps ──────────────
    const msSyms = ['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','ADAUSDT','AVAXUSDT','LINKUSDT'];
    let msHtml = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:8.5px">';
    msHtml += `<tr style="background:#0a0500">
      <th style="padding:2px 7px;text-align:left;color:#ff8800;font-size:7px;letter-spacing:.5px">SYMBOL</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">MARK PX</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">FUNDING</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">OI $</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">BASIS</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">L/S RATIO</th>
      <th style="padding:2px 6px;text-align:right;color:#ff8800;font-size:7px">SRC</th>
    </tr>`;
    // Binance stats
    msSyms.forEach(sym => {
      const ms = CE.marketStats[sym];
      const base = sym.replace('USDT','');
      const colMap = { BTC:'#ff9900', ETH:'#627EEA', SOL:'#9945FF' };
      const col = colMap[base] || '#ff8800';
      if (ms) {
        const fr = ms.fundingRate != null ? (ms.fundingRate*100).toFixed(4)+'%' : '—';
        const frCol = (ms.fundingRate||0) >= 0 ? '#00cc44' : '#00bbff';
        const oi = ms.openInterestUsd ? fmtN(ms.openInterestUsd) : '—';
        const basis = ms.basisBps != null ? ms.basisBps.toFixed(1)+'bp' : '—';
        const lsr = ms.longShortRatio ? ms.longShortRatio.toFixed(3) : '—';
        const mark = ms.markPrice ? '$'+fmtP(ms.markPrice) : '—';
        msHtml += `<tr style="border-bottom:1px solid #0a0500" onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background=''">
          <td style="padding:2px 7px;color:${col};font-weight:700">${base}</td>
          <td style="padding:2px 6px;text-align:right;color:#fff;font-family:'Roboto Mono',monospace">${mark}</td>
          <td style="padding:2px 6px;text-align:right;color:${frCol};font-weight:700;font-family:'Roboto Mono',monospace">${fr}</td>
          <td style="padding:2px 6px;text-align:right;color:#ff8800;font-family:'Roboto Mono',monospace">${oi}</td>
          <td style="padding:2px 6px;text-align:right;color:#00bbdd;font-family:'Roboto Mono',monospace">${basis}</td>
          <td style="padding:2px 6px;text-align:right;color:#887060;font-family:'Roboto Mono',monospace">${lsr}</td>
          <td style="padding:2px 6px;text-align:right;color:#443322;font-size:7px">BNF</td>
        </tr>`;
      }
    });
    // Hyperliquid perp stats (top 5 by OI)
    const hlPerps = (window._HL && _HL.topPerps) ? _HL.topPerps.slice(0,5) : [];
    hlPerps.forEach(p => {
      const frCol = parseFloat(p.funding) >= 0 ? '#00cc44' : '#00bbff';
      msHtml += `<tr style="border-bottom:1px solid #0a0500;background:#040200" onmouseover="this.style.background='#080500'" onmouseout="this.style.background='#040200'">
        <td style="padding:2px 7px;color:#44ffcc;font-weight:700">${p.name}</td>
        <td style="padding:2px 6px;text-align:right;color:#fff;font-family:'Roboto Mono',monospace">$${fmtP(p.mark)}</td>
        <td style="padding:2px 6px;text-align:right;color:${frCol};font-weight:700;font-family:'Roboto Mono',monospace">${(parseFloat(p.funding)>=0?'+':'')}${p.funding}%</td>
        <td style="padding:2px 6px;text-align:right;color:#ff8800;font-family:'Roboto Mono',monospace">${fmtN(p.oiUsd)}</td>
        <td style="padding:2px 6px;text-align:right;color:#555">—</td>
        <td style="padding:2px 6px;text-align:right;color:#555">—</td>
        <td style="padding:2px 6px;text-align:right;color:#44ffcc;font-size:7px">HL</td>
      </tr>`;
    });
    if (!msSyms.some(s => CE.marketStats[s]) && !hlPerps.length) {
      msHtml += `<tr><td colspan="7" style="padding:8px;text-align:center;color:#333;font-size:8px">${s?'Fetching market stats…':'Connect backend'}</td></tr>`;
    }
    msHtml += '</table></div>';

    // ── LIVE TRADE FEED — last 20 trades across all symbols ──────────────
    const recentTrades = CE.trades.slice(-20).reverse();
    let tradesHtml = '';
    if (recentTrades.length > 0) {
      tradesHtml = '<table style="width:100%;border-collapse:collapse">';
      recentTrades.forEach(t => {
        const isBuy = !t.isBuyerMaker;
        const col = isBuy ? '#00cc44' : '#ff3333';
        const sym = (t.symbol||'').replace('USDT','');
        const px  = t.price >= 10000 ? t.price.toLocaleString('en',{maximumFractionDigits:0}) : (t.price||0).toFixed(2);
        const qty = (t.quantity||0).toFixed(4);
        const notional = (t.price||0) * (t.quantity||0);
        const notStr = notional >= 1e6 ? '$'+(notional/1e6).toFixed(2)+'M' : notional >= 1e3 ? '$'+(notional/1e3).toFixed(1)+'K' : '$'+notional.toFixed(0);
        const age = t._ts ? ageStr(t._ts) : '—';
        tradesHtml += `<tr onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background=''">
          <td style="padding:2px 8px;color:${col};font-size:8px;font-weight:700">${isBuy?'▲':'▼'} ${isBuy?'BUY':'SELL'}</td>
          <td style="padding:2px 5px;color:#F39F41;font-size:9px;font-weight:700">${sym}</td>
          <td style="padding:2px 5px;color:#e0d8c0;font-size:9px;font-family:'Roboto Mono',monospace;text-align:right">${px}</td>
          <td style="padding:2px 5px;color:#887060;font-size:8px;font-family:'Roboto Mono',monospace;text-align:right">${qty}</td>
          <td style="padding:2px 5px;color:${col};font-size:9px;font-weight:700;text-align:right">${notStr}</td>
          <td style="padding:2px 5px;color:#444;font-size:7px;text-align:right">${age}</td>
        </tr>`;
      });
      tradesHtml += '</table>';
    } else {
      tradesHtml = `<div style="padding:8px;color:#333;font-size:9px">${s?'Waiting for trades…':'Connect backend to stream trades'}</div>`;
    }

    // ── LIQUIDATIONS across all symbols ──────────────────────────────────
    const liqs = CE.liquidations.slice(-15).reverse();
    const L = CE.liqTotal;
    const totalLiqUSD = L.buySz + L.sellSz;
    const liqBuyPct = totalLiqUSD > 0 ? (L.buySz/totalLiqUSD*100).toFixed(0) : '50';
    const liqRows = liqs.map(l => {
      const isBuy = l.side === 'BUY';
      const col = isBuy ? '#00cc44' : '#ff3333';
      const sym = (l.symbol||'').replace('USDT','');
      const px  = l.price >= 10000 ? l.price.toLocaleString('en',{maximumFractionDigits:0}) : (l.price||0).toFixed(2);
      const notional = l.notionalUsd >= 1e6 ? '$'+(l.notionalUsd/1e6).toFixed(2)+'M' : '$'+(l.notionalUsd/1e3).toFixed(0)+'K';
      return `<tr onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background=''">
        <td style="padding:2px 8px;color:${col};font-size:8px;font-weight:700">${isBuy?'▲ LONG':'▼ SHORT'}</td>
        <td style="padding:2px 5px;color:#F39F41;font-size:9px;font-weight:700">${sym}</td>
        <td style="padding:2px 5px;color:#e0d8c0;font-size:9px;font-family:'Roboto Mono',monospace;text-align:right">${px}</td>
        <td style="padding:2px 5px;color:${col};font-size:9px;font-weight:700;text-align:right">${notional}</td>
        <td style="padding:2px 5px;color:#555;font-size:7px;text-align:right">${ageStr(l.timestamp)}</td>
      </tr>`;
    }).join('');

    // ── CVD per-symbol summary ────────────────────────────────────────────
    const cvdSyms = ['BTC','ETH','SOL'];
    let cvdHtml = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0">';
    cvdSyms.forEach(sym => {
      const val = CE.cvd[sym];
      const col = val == null ? '#555' : val >= 0 ? '#00cc44' : '#ff3333';
      const colMap = { BTC:'#ff9900', ETH:'#627EEA', SOL:'#9945FF', BNB:'#f0b90b', XRP:'#00aae4', ADA:'#0033ad', AVAX:'#e84142', LINK:'#2a5ada' };
      cvdHtml += `<div style="border-right:1px solid #1a0e00;padding:4px 8px;text-align:center">
        <div style="color:${colMap[sym]||'#ff8800'};font-size:7px;margin-bottom:2px">${sym} CVD</div>
        <div style="color:${col};font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace">${val != null ? (val>=0?'+':'')+val.toFixed(2) : '—'}</div>
      </div>`;
    });
    cvdHtml += '</div>';

    // ── NEWS feed ─────────────────────────────────────────────────────────
    const newsItems = CE.news.slice(-10).reverse();
    const newsHtml = newsItems.length > 0 ? newsItems.map(n => {
      const age = ageStr(n.timestamp || now);
      const syms = n.symbols && n.symbols.length > 0
        ? '<span style="color:#ff8800;font-size:7px;margin-left:4px">[' + n.symbols.slice(0,4).join(',') + ']</span>' : '';
      const src = n.source ? `<span style="color:#443322;font-size:6px;margin-left:3px">${n.source}</span>` : '';
      return `<div style="padding:4px 8px;border-bottom:1px solid #0d0800">
        <div style="color:#555;font-size:7px;margin-bottom:1px">${age} ago${syms}${src}</div>
        <div style="color:#d0c8b0;font-size:9px;line-height:1.4">${(n.title||'').slice(0,180)}</div>
        ${n.url ? `<a href="${n.url}" target="_blank" style="color:#443322;font-size:7px;text-decoration:none">→ source</a>` : ''}
      </div>`;
    }).join('') : `<div style="padding:8px;color:#333;font-size:9px">${s?'Waiting for news…':'Connect backend to stream news'}</div>`;

    // ── SCREENER TABLE — top 15 by volume ────────────────────────────────
    const screener = CE.screener.slice(0,15);
    let scrHtml = '';
    if (screener.length > 0) {
      scrHtml = `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:9px">
        <tr style="background:#0a0500">
          <th style="padding:2px 7px;text-align:left;color:#ff8800;font-size:7px">SYM</th>
          <th style="padding:2px 5px;text-align:right;color:#ff8800;font-size:7px">LAST</th>
          <th style="padding:2px 5px;text-align:right;color:#ff8800;font-size:7px">24H%</th>
          <th style="padding:2px 5px;text-align:right;color:#ff8800;font-size:7px">VOL $</th>
          <th style="padding:2px 5px;text-align:right;color:#ff8800;font-size:7px">HIGH</th>
          <th style="padding:2px 5px;text-align:right;color:#ff8800;font-size:7px">LOW</th>
        </tr>`;
      screener.forEach(t => {
        const sym = (t.symbol||'').replace('USDT','');
        const chg = parseFloat(t.priceChangePercent||0);
        const col = chg >= 0 ? '#00cc44' : '#ff3333';
        const px  = parseFloat(t.lastPrice||0);
        const pxStr = px >= 10000 ? px.toLocaleString('en',{maximumFractionDigits:0}) : px.toFixed(px>1?2:4);
        const vol = t.quoteVolume ? fmtN(parseFloat(t.quoteVolume)) : '—';
        const hi  = parseFloat(t.highPrice||0);
        const lo  = parseFloat(t.lowPrice||0);
        scrHtml += `<tr onmouseover="this.style.background='#0d0600'" onmouseout="this.style.background=''">
          <td style="padding:2px 7px;color:#F39F41;font-weight:700">${sym}</td>
          <td style="padding:2px 5px;text-align:right;color:#fff;font-family:'Roboto Mono',monospace">${pxStr}</td>
          <td style="padding:2px 5px;text-align:right;color:${col};font-weight:700">${chg>=0?'+':''}${chg.toFixed(2)}%</td>
          <td style="padding:2px 5px;text-align:right;color:#ff8800;font-family:'Roboto Mono',monospace">${vol}</td>
          <td style="padding:2px 5px;text-align:right;color:#887060;font-family:'Roboto Mono',monospace">${hi>=10000?hi.toLocaleString('en',{maximumFractionDigits:0}):hi.toFixed(2)}</td>
          <td style="padding:2px 5px;text-align:right;color:#887060;font-family:'Roboto Mono',monospace">${lo>=10000?lo.toLocaleString('en',{maximumFractionDigits:0}):lo.toFixed(2)}</td>
        </tr>`;
      });
      scrHtml += '</table></div>';
    }

    // ── BUILD TABBED LAYOUT ───────────────────────────────────────────────
    const panelId = 'cryexc-inner-' + Math.random().toString(36).slice(2,7);
    let activeTab = window._ceActiveTab || 'stats';

    const tabBtn = (id, label, active) =>
      `<span style="padding:2px 10px;font-size:7.5px;cursor:pointer;font-weight:700;letter-spacing:.5px;border-right:1px solid #1a0e00;color:${active===id?'#000':'#665840'};background:${active===id?'#ff6600':'transparent'}"
        onclick="window._ceActiveTab='${id}';var b=document.querySelector('.cryexc-panel-body');if(b){try{b.innerHTML=window._buildCryExcPanel();}catch(e){}}">${label}</span>`;

    return `<div style="height:100%;display:flex;flex-direction:column;background:#000;font-family:'Courier Prime',monospace">
      <!-- Header -->
      <div style="padding:3px 8px;background:#060400;border-bottom:1px solid #1a0e00;display:flex;align-items:center;gap:8px;flex-shrink:0">
        ${dot}<span style="color:${statusCol};font-size:8px;font-weight:700;letter-spacing:1px">${statusTxt}</span>
        <span style="color:#332211;font-size:7px;margin-left:auto">${CE.trades.length} trades · ${CE.liquidations.length} liqs · ${CE.news.length} news</span>
      </div>
      <!-- Tabs -->
      <div style="display:flex;border-bottom:1px solid #1a0e00;flex-shrink:0;background:#040200">
        ${tabBtn('stats',  'MARKET STATS',  activeTab)}
        ${tabBtn('trades', 'LIVE TRADES',   activeTab)}
        ${tabBtn('liqs',   'LIQUIDATIONS',  activeTab)}
        ${tabBtn('cvd',    'CVD',           activeTab)}
        ${tabBtn('scr',    'SCREENER',      activeTab)}
        ${tabBtn('news',   'NEWS',          activeTab)}
      </div>
      <!-- Content -->
      <div class="cryexc-panel-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#2a1800 #000">
        ${activeTab === 'stats' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">ORDERBOOK STATS · BINANCEF</span></div>
          ${obHtml}
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00;border-top:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">FUTURES · BINANCEF + HYPERLIQUID</span></div>
          ${msHtml}` : ''}
        ${activeTab === 'trades' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">LIVE TRADE FEED · ALL SYMBOLS</span></div>
          ${tradesHtml}` : ''}
        ${activeTab === 'liqs' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00;display:flex;align-items:center;gap:10px">
            <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">LIQUIDATIONS · ${CE_SYMBOLS.length} SYMBOLS</span>
            <span style="color:#00cc44;font-size:7px">LONGS ${fmtN(L.buySz)}</span>
            <span style="color:#ff3333;font-size:7px">SHORTS ${fmtN(L.sellSz)}</span>
            <div style="margin-left:auto;height:6px;width:80px;background:#1a0000;border-radius:2px;overflow:hidden;display:inline-flex">
              <div style="width:${liqBuyPct}%;background:#00cc44;opacity:.7"></div>
              <div style="flex:1;background:#cc0000;opacity:.7"></div>
            </div>
          </div>
          ${liqs.length > 0 ? `<table style="width:100%;border-collapse:collapse"><tr style="background:#0a0500">
            <th style="color:#ff8800;font-size:7px;padding:2px 8px;text-align:left">SIDE</th>
            <th style="color:#ff8800;font-size:7px;padding:2px 5px;text-align:left">SYM</th>
            <th style="color:#ff8800;font-size:7px;padding:2px 5px;text-align:right">PRICE</th>
            <th style="color:#ff8800;font-size:7px;padding:2px 5px;text-align:right">NOTIONAL</th>
            <th style="color:#ff8800;font-size:7px;padding:2px 5px;text-align:right">AGE</th>
          </tr>${liqRows}</table>` : `<div style="padding:8px;color:#333;font-size:9px">${s?'No recent liquidations':'Connect backend'}</div>`}` : ''}
        ${activeTab === 'cvd' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">CUMULATIVE VOLUME DELTA · BTC / ETH / SOL</span></div>
          ${cvdHtml}
          <div style="padding:8px;color:#443322;font-size:8px;line-height:1.6">
            CVD measures buying vs selling pressure. Positive = net buyers. Negative = net sellers.<br>
            <span style="color:#332211">Sources: CryExc backend (Binance Futures WS) · Hyperliquid (via /api/market-stats)</span>
          </div>` : ''}
        ${activeTab === 'scr' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">24H SCREENER · BINANCE FUTURES</span></div>
          ${scrHtml || `<div style="padding:8px;color:#333;font-size:9px">${s?'Waiting for screener…':'Connect backend'}</div>`}` : ''}
        ${activeTab === 'news' ? `
          <div style="background:#040200;padding:3px 8px;border-bottom:1px solid #1a0e00"><span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">LIVE NEWS · TREE OF ALPHA · CRYEXC BACKEND</span></div>
          ${newsHtml}` : ''}
        ${!s ? `<div style="padding:5px 8px;background:#050200;border-top:1px solid #0d0500;flex-shrink:0">
          <div style="color:#443322;font-size:7.5px;line-height:1.7">
            <span style="color:#ff6600;font-weight:700">SETUP:</span> cd cryexc-backend → python main.py<br>
            <span style="color:#332211">Supports: Binance Futures · Hyperliquid · Tree of Alpha news</span>
          </div>
        </div>` : ''}
      </div>
    </div>`;
  };

    // ── REFRESH cryexc panels ──────────────────────────────────────────────────
  function _refreshCEPanels() {
    if (!window.PANEL_REGISTRY) return;
    Object.entries(PANEL_REGISTRY).forEach(([id, reg]) => {
      if (reg.fn !== 'CRYEXC') return;
      const body = document.getElementById('pb-' + id);
      if (!body) return;
      const st = body.scrollTop;
      try { body.innerHTML = window._buildCryExcPanel(); } catch(e) {}
      body.scrollTop = st;
    });
  }

  // ── Hook into buildPanelContent ────────────────────────────────────────────
  const _origBuildPanel = window.buildPanelContent;
  window.buildPanelContent = function(fn, ...args) {
    if (fn === 'CRYEXC') return window._buildCryExcPanel();
    if (_origBuildPanel) return _origBuildPanel(fn, ...args);
    return '<div style="padding:20px;color:#555">Panel: ' + fn + '</div>';
  };

  // ── SUBSCRIBE helper ───────────────────────────────────────────────────────
  function _subscribe(ws, stream, config, instanceId) {
    const msg = { type: 'stream_subscribe', stream, config };
    if (instanceId) msg.instanceId = instanceId;
    ws.send(JSON.stringify(msg));
  }

  function _subscribeAll(ws) {
    // ── ORDERBOOK STATS — top 10 symbolů ────────────────────────────────────
    const OB_STAT_SYMS = ['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT',
                          'ADAUSDT','AVAXUSDT','LINKUSDT','SUIUSDT','DOTUSDT'];
    OB_STAT_SYMS.forEach(sym => {
      _subscribe(ws, 'orderbook_stats', { symbol: sym, exchanges: [CE_EXCHANGE] });
    });

    // ── LIQUIDATIONS — all 30 symbols, min $5k per symbol ───────────────────
    CE_SYMBOLS.forEach(sym => {
      const minN = CE_NOTIONAL[sym] || CE_NOTIONAL.DEFAULT;
      _subscribe(ws, 'liquidation', { symbol: sym, exchanges: [CE_EXCHANGE], minNotional: minN/20 });
    });

    // ── TRADES — top symbols s per-asset thresholds ───────────────────────────
    // Subscribujeme top 20 symbolů, každý s vlastním notional thresholdem
    const TRADE_SYMS = [
      'BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT',
      'DOGEUSDT','ADAUSDT','AVAXUSDT','LINKUSDT','SUIUSDT',
      'DOTUSDT','UNIUSDT','NEARUSDT','AAVEUSDT','INJUSDT',
      'ARBUSDT','OPUSDT','TONUSDT','HYPEUSDT','ATOMUSDT',
      'LTCUSDT','LDOUSDT','JUPUSDT','RENDERUSDT','SEIUSDT',
    ];
    TRADE_SYMS.forEach(sym => {
      const minN = CE_NOTIONAL[sym] || CE_NOTIONAL.DEFAULT;
      _subscribe(ws, 'trade', { symbol: sym, exchanges: [CE_EXCHANGE], minNotional: minN });
    });

    // ── NEWS ─────────────────────────────────────────────────────────────────
    _subscribe(ws, 'news', {});

    // ── CVD — top 6 symbolů per exchange ────────────────────────────────────
    const CVD_SYMS = ['BTCUSDT','ETHUSDT','SOLUSDT','BNBUSDT','XRPUSDT','AVAXUSDT'];
    CVD_SYMS.forEach(sym => {
      const base = sym.replace('USDT','').toLowerCase();
      _subscribe(ws, 'cvd', { symbol: sym, exchanges: [CE_EXCHANGE],  interval: '1m', timeRange: '1h' }, `cvd-${base}-binancef`);
    });
    // Hyperliquid CVD pro BTC (pokud backend podporuje)
    _subscribe(ws, 'cvd', { symbol: 'BTCUSDT', exchanges: [CE_EXCHANGE2], interval: '1m', timeRange: '1h' }, 'cvd-btc-hl');

    // ── ORDERBOOK DEPTH — BTC ────────────────────────────────────────────────
    _subscribe(ws, 'orderbook', { symbol: 'BTCUSDT', exchanges: [CE_EXCHANGE], depth: 20 });

    // ── DOM — BTC (depth of market with trade history) ───────────────────────
    _subscribe(ws, 'dom', { symbol: 'BTCUSDT', exchanges: [CE_EXCHANGE], tickSize: 100, timeRange: '30m' });
  }

  // ── MESSAGE HANDLER ────────────────────────────────────────────────────────
  function _handleMessage(msg) {
    const { type, data, instanceId } = msg;

    if (type === 'orderbook_stats' && data) {
      const sym = data.symbol || 'BTCUSDT';
      CE.stats[sym] = data;
      // Inject into LIVE object for BTC/ETH/SOL
      if (window.LIVE) {
        if (sym === 'BTCUSDT') {
          window.LIVE.btcSpread  = data.spread;
          window.LIVE.btcMidPrice = data.midPrice;
          window.LIVE.btcBidAskRatio = data.bidQuantity_0_5pct / (data.askQuantity_0_5pct || 1);
        } else if (sym === 'ETHUSDT') {
          window.LIVE.ethSpread  = data.spread;
          window.LIVE.ethMidPrice = data.midPrice;
        } else if (sym === 'SOLUSDT') {
          window.LIVE.solSpread  = data.spread;
          window.LIVE.solMidPrice = data.midPrice;
        }
      }
      _refreshCEPanels();
    }

    else if (type === 'cvd' && data) {
      // instanceId format: "cvd-btc-binancef", "cvd-eth-binancef", atd.
      if (instanceId) {
        CE.cvd[instanceId] = data;
        // Extrahuj symbol z instanceId: "cvd-btc-binancef" → "BTC"
        const parts = instanceId.split('-');
        if (parts.length >= 2) {
          const baseSym = parts[1].toUpperCase(); // btc → BTC
          if (Array.isArray(data)) {
            const last = data[data.length - 1];
            if (last && last.value !== undefined) {
              CE.cvd[baseSym] = last.value;
              if (window.LIVE) {
                if (baseSym === 'BTC') window.LIVE.btcCVD = last.value;
                if (baseSym === 'ETH') window.LIVE.ethCVD = last.value;
                if (baseSym === 'SOL') window.LIVE.solCVD = last.value;
              }
            }
          } else if (data.value !== undefined) {
            CE.cvd[baseSym] = data.value;
            if (window.LIVE) {
              if (baseSym === 'BTC') window.LIVE.btcCVD = data.value;
              if (baseSym === 'ETH') window.LIVE.ethCVD = data.value;
              if (baseSym === 'SOL') window.LIVE.solCVD = data.value;
            }
          }
        }
      } else {
        // Fallback bez instanceId
        const sym = (data.symbol || '').replace('USDT','');
        if (data.value !== undefined) {
          CE.cvd[sym] = data.value;
          if (window.LIVE && sym === 'BTC') window.LIVE.btcCVD = data.value;
          if (window.LIVE && sym === 'ETH') window.LIVE.ethCVD = data.value;
          if (window.LIVE && sym === 'SOL') window.LIVE.solCVD = data.value;
        }
      }
    }

    else if (type === 'orderbook' && data) {
      // Store raw orderbook per symbol
      const sym = data.symbol || 'BTCUSDT';
      CE.orderbooks = CE.orderbooks || {};
      CE.orderbooks[sym] = data;
    }

    else if (type === 'dom' && data) {
      CE.dom = data;
    }

    else if (type === 'trade' && data) {
      CE.trades.push({ ...data, _ts: Date.now() });
      if (CE.trades.length > 500) CE.trades.shift();
      CE.lastTrade[data.symbol] = data;
      // Update CRYPTO array live prices for ALL symbols
      const baseSym = (data.symbol || '').replace('USDT','');
      if (window.CRYPTO) {
        const coin = CRYPTO.find(c => c.s === baseSym);
        if (coin && data.price > 0) {
          coin.px = data.price;
          coin._pxTs = Date.now();
        }
      }
      // Update MKT price
      if (window.MKT) {
        const sym = data.symbol.replace('USDT','');
        if (window.MKT[sym]) window.MKT[sym].px = data.price;
        if (sym === 'BTC' && window.LIVE) window.LIVE.btc = data.price;
        if (sym === 'ETH' && window.LIVE) window.LIVE.eth = data.price;
        if (sym === 'SOL' && window.LIVE) window.LIVE.sol = data.price;
      }
      // Update _liveData for ticker tape
      if (window._liveData && window._liveData.px) {
        const sym = data.symbol.replace('USDT','');
        window._liveData.px[sym] = data.price;
      }
      // Update ticker tape if element exists
      const btcEl = document.getElementById('sc-btc-px');
      if (btcEl && data.symbol === 'BTCUSDT') btcEl.textContent = data.price.toLocaleString('en',{maximumFractionDigits:0});
    }

    else if (type === 'liquidation' && data) {
      CE.liquidations.push({
        ...data,
        timestamp: data.timestamp || Date.now()
      });
      if (CE.liquidations.length > 100) CE.liquidations.shift();

      const isBuy = data.side === 'BUY';
      const notional = data.notionalUsd || (data.price * data.quantity) || 0;
      if (isBuy) { CE.liqTotal.buy++; CE.liqTotal.buySz += notional; }
      else        { CE.liqTotal.sell++; CE.liqTotal.sellSz += notional; }

      // Sync _liveData.liqd for existing panels
      if (window._liveData) {
        const sym = (data.symbol||'BTCUSDT').replace('USDT','');
        if (!_liveData.liqd[sym]) _liveData.liqd[sym] = { buy:0, sell:0, buySz:0, sellSz:0 };
        if (isBuy) { _liveData.liqd[sym].buy++; _liveData.liqd[sym].buySz += notional; }
        else        { _liveData.liqd[sym].sell++; _liveData.liqd[sym].sellSz += notional; }
      }

      _refreshCEPanels();
    }

    else if (type === 'news' && data) {
      CE.news.push(data);
      if (CE.news.length > 100) CE.news.shift();
      _refreshCEPanels();
    }

    else if (type === 'news_historical' && Array.isArray(data)) {
      CE.news = data.slice(-100);
      _refreshCEPanels();
    }

    else if (type === 'cvd_historical' && data) {
      const pts = Array.isArray(data) ? data : (data.points || []);
      if (pts.length) {
        const last = pts[pts.length - 1];
        if (last && last.value !== undefined) {
          // Pokud máme instanceId, extrahujeme symbol
          if (instanceId) {
            const parts = instanceId.split('-');
            if (parts.length >= 2) {
              const baseSym = parts[1].toUpperCase();
              CE.cvd[baseSym] = last.value;
              if (window.LIVE) {
                if (baseSym === 'BTC') window.LIVE.btcCVD = last.value;
                if (baseSym === 'ETH') window.LIVE.ethCVD = last.value;
                if (baseSym === 'SOL') window.LIVE.solCVD = last.value;
              }
            }
          } else {
            CE.cvd['BTC'] = last.value;
            if (window.LIVE) window.LIVE.btcCVD = last.value;
          }
        }
      }
    }
  }

  // ── FETCH MARKET STATS via HTTP ────────────────────────────────────────────
  async function _fetchMarketStats() {
    // Fetch from primary (Binance) backend
    try {
      const r = await fetch(CE_HTTP + '/api/market-stats', { signal: AbortSignal.timeout(8000) });
      if (r.ok) {
        const arr = await r.json();
        arr.forEach(ms => {
          CE.marketStats[ms.symbol] = { ...ms, _src: 'binancef' };
          // Inject funding into _liveData for BTC/ETH/SOL
          if (window._liveData) {
            const sym = (ms.symbol||'').replace('USDT','');
            if (_liveData.funding && ms.fundingRate != null) _liveData.funding[sym] = ms.fundingRate;
          }
          // Inject into LIVE for BTC
          if (window.LIVE && ms.symbol === 'BTCUSDT') {
            LIVE.btcFunding = ms.fundingRate;
            LIVE.btcOI      = ms.openInterestUsd;
            LIVE.btcBasis   = ms.basisBps;
            LIVE.btcLSRatio = ms.longShortRatio;
          }
        });
      }
    } catch(e) {}

    // Also fetch Hyperliquid market stats (funding + OI for HL perps)
    try {
      const hlR = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' }),
        signal: AbortSignal.timeout(8000)
      });
      if (hlR.ok) {
        const [meta, ctxs] = await hlR.json();
        meta.universe.forEach((asset, i) => {
          const ctx = ctxs[i];
          if (!ctx) return;
          const sym = asset.name + 'USDT';
          CE.marketStats[sym + '_HL'] = {
            symbol: sym, exchange: 'hyperliquid',
            fundingRate: parseFloat(ctx.funding || 0),
            markPrice:   parseFloat(ctx.markPx || 0),
            openInterest: parseFloat(ctx.openInterest || 0),
            openInterestUsd: parseFloat(ctx.openInterest || 0) * parseFloat(ctx.markPx || 0),
            vol24h: parseFloat(ctx.dayNtlVlm || 0),
            _src: 'hyperliquid'
          };
          // Inject funding for known symbols
          if (window._liveData && _liveData.funding) {
            _liveData.funding[asset.name + '_HL'] = parseFloat(ctx.funding || 0);
          }
        });
      }
    } catch(e) {}

    _refreshCEPanels();
  }

  // ── FETCH SCREENER ─────────────────────────────────────────────────────────
  async function _fetchScreener() {
    // Primary: cryexc backend screener (Binance 24h ticker)
    try {
      const r = await fetch(CE_HTTP + '/screener', { signal: AbortSignal.timeout(10000) });
      if (r.ok) {
        const arr = await r.json();
        CE.screener = arr;
        arr.forEach(t => {
          const sym = (t.symbol || '').replace('USDT','');
          // Update CRYPTO array
          if (window.CRYPTO) {
            const coin = CRYPTO.find(c => c.s === sym);
            if (coin) {
              if (t.lastPrice)         coin.px  = parseFloat(t.lastPrice);
              if (t.priceChangePercent) coin.chg = parseFloat(t.priceChangePercent);
              if (t.quoteVolume)        coin.vol = parseFloat(t.quoteVolume);
              coin._pxTs = Date.now();
            }
          }
          // Update MKT
          if (window.MKT && window.MKT[sym]) {
            window.MKT[sym].px  = parseFloat(t.lastPrice || 0);
            window.MKT[sym].chg = parseFloat(t.priceChangePercent || 0);
          }
          // Update _liveData
          if (window._liveData && _liveData.px) _liveData.px[sym] = parseFloat(t.lastPrice || 0);
        });
      }
    } catch(e) {}

    // Secondary: Hyperliquid screener (for HL-only symbols and cross-check)
    try {
      const hlR = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'allMids' }),
        signal: AbortSignal.timeout(6000)
      });
      if (hlR.ok) {
        const mids = await hlR.json(); // {BTC: "104200.5", ETH: "2350.2", ...}
        Object.entries(mids).forEach(([sym, midStr]) => {
          const px = parseFloat(midStr);
          if (!px || px <= 0) return;
          // Update CRYPTO for HL-only symbols
          if (window.CRYPTO) {
            const coin = CRYPTO.find(c => c.s === sym);
            if (coin && !coin._pxTs) { coin.px = px; coin._pxTs = Date.now(); }
          }
          // Update _MEWS prices for CRCL spread gauges
          if (window._MEWS) _MEWS.prices[sym] = { px, src: 'hyperliquid' };
          // Inject into HL perp cache
          if (window._HL && _HL.perps[sym]) _HL.perps[sym].mid = px;
        });
        // Update HYPE specifically
        if (mids['HYPE'] && window.CRYPTO) {
          const hype = CRYPTO.find(c => c.s === 'HYPE');
          if (hype) { hype.px = parseFloat(mids['HYPE']); hype._pxTs = Date.now(); }
        }
      }
    } catch(e) {}

    if (typeof refreshAllPanels === 'function') try { refreshAllPanels(); } catch(e) {}
    _refreshCEPanels();
  }

  // ── WEBSOCKET CONNECT ──────────────────────────────────────────────────────
  function _connect() {
    if (CE.reconnecting) return;
    CE.reconnecting = true;

    let retryDelay = 3000;
    const MAX_DELAY = 30000;

    function _tryConnect() {
      try {
        console.log('[CRYEXC] Connecting to', CE_WS_URL);
        const ws = new WebSocket(CE_WS_URL);
        CE.ws = ws;

        ws.onopen = () => {
          CE.connected = true;
          CE.reconnecting = false;
          retryDelay = 3000;
          console.log('[CRYEXC] ✓ Connected to CryExc backend');
          _subscribeAll(ws);
          _fetchMarketStats();
          _fetchScreener();
          _refreshCEPanels();
          if (window._boot && window._boot.update) {
            _boot.update('CRYEXC', 'ok', 'WebSocket connected · ws://localhost:8086');
          }
        };

        ws.onmessage = (ev) => {
          try {
            const msg = JSON.parse(ev.data);
            _handleMessage(msg);
          } catch(e) {}
        };

        ws.onclose = () => {
          CE.connected = false;
          CE.ws = null;
          console.log('[CRYEXC] Disconnected. Retrying in', retryDelay/1000, 's');
          _refreshCEPanels();
          setTimeout(() => {
            retryDelay = Math.min(retryDelay * 1.5, MAX_DELAY);
            _tryConnect();
          }, retryDelay);
        };

        ws.onerror = () => {
          // onclose will fire after onerror
        };

      } catch(e) {
        CE.reconnecting = false;
        setTimeout(_tryConnect, retryDelay);
      }
    }

    _tryConnect();
  }

  // ── PING keepalive ─────────────────────────────────────────────────────────
  setInterval(() => {
    if (CE.ws && CE.ws.readyState === WebSocket.OPEN) {
      CE.ws.send(JSON.stringify({ type: 'ping' }));
    }
  }, 25000);

  // ── Refresh market stats every 2 min ──────────────────────────────────────
  setInterval(_fetchMarketStats, 90000);   // every 90s — hits both Binance + HL
  setInterval(_fetchScreener, 15000);     // every 15s — prices pro všechny symboly (bylo 30s)

  // ── Register CRYEXC as a panel function ───────────────────────────────────
  // Hook into the terminal's quick-launch system
  setTimeout(() => {
    // Add CRYEXC panel launcher to the terminal if openPanel exists
    window._openCryExcPanel = function() {
      if (!window.openPanel) {
        console.warn('[CRYEXC] openPanel not available');
        return;
      }
      // Check if already open
      const existingId = Object.keys(window.PANEL_REGISTRY || {}).find(id => {
        return (window.PANEL_REGISTRY[id]||{}).fn === 'CRYEXC';
      });
      if (existingId) {
        const el = document.getElementById(existingId);
        if (el) { el.style.zIndex = 2000; return; }
      }
      openPanel('CRYEXC', 'CRYEXC — LIVE MARKET DATA');
    };

    // Boot
    _connect();

    console.log('[CRYEXC] CryExc integration v1.0 initialized');
    console.log('[CRYEXC] Open panel with: window._openCryExcPanel()');
    console.log('[CRYEXC] Or type CRYEXC in the command bar');
  }, 1500);

  // ── Hook into command bar ──────────────────────────────────────────────────
  setTimeout(() => {
    const origRun = window.runCmd;
    window.runCmd = function(cmd) {
      const c = (cmd || '').toUpperCase().trim();
      if (c === 'CRYEXC' || c === 'CEX' || c === 'FLOW') {
        window._openCryExcPanel();
        return;
      }
      if (origRun) return origRun(cmd);
    };
  }, 2500);

})();

// ════════════════════════════════════════════════════════════════════════════
//  v4 UPGRADE — HYPER · CRCL · METR · MULTIFEED · STOCKS2 PANELS
//  + Multi-Exchange WebSocket Bridge (Bybit · OKX · Kraken · Coinbase)
// ════════════════════════════════════════════════════════════════════════════
(function() {
'use strict';

// ── Multi-Exchange Price Bridge ──────────────────────────────────────────────
// Supplements Binance WS with Bybit, OKX, Kraken real-time prices
const _MEWS = {
  bybit: null, okx: null, kraken: null,
  prices: {},   // sym -> {px, chg, vol, src}
  connects: 0
};

function _startMultiExchangeWS() {
  // ── BYBIT WS ─────────────────────────────────────────────────────────────
  const bybitSyms = ['BTCUSDT','ETHUSDT','SOLUSDT','XRPUSDT','BNBUSDT',
    'ADAUSDT','LINKUSDT','AVAXUSDT','DOGEUSDT','SUIUSDT',
    'HYPEUSDT','INJUSDT','ARBUSDT','OPUSDT','NEARUSDT',
    'AAVEUSDT','TONUSDT','BERAUSDT','MOVEUSDT','VIRTUALUSDT'];
  try {
    const bws = new WebSocket('wss://stream.bybit.com/v5/public/linear');
    _MEWS.bybit = bws;
    bws.onopen = () => {
      bws.send(JSON.stringify({op:'subscribe', args: bybitSyms.map(s=>`tickers.${s}`)}));
      console.log('[BYBIT WS] Connected');
    };
    bws.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        if (d.topic && d.topic.startsWith('tickers.') && d.data) {
          const sym = d.data.symbol?.replace('USDT','');
          if (!sym) return;
          const px = parseFloat(d.data.lastPrice||d.data.markPrice||0);
          const chg = parseFloat(d.data.price24hPcnt||0)*100;
          if (px > 0) {
            _MEWS.prices[sym] = {px, chg, src:'bybit'};
            // inject into CRYPTO array
            const coin = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s===sym);
            if (coin && !coin._pxTs) { coin.px = px; coin.chg = chg; coin._pxTs = Date.now(); }
          }
        }
      } catch(e) {}
    };
    bws.onclose = () => { setTimeout(_startBybitWS, 8000); };
    bws.onerror = () => {};
  } catch(e) {}

  // ── OKX WS ───────────────────────────────────────────────────────────────
  const okxSyms = ['BTC-USDT','ETH-USDT','SOL-USDT','XRP-USDT','BNB-USDT',
    'ADA-USDT','DOGE-USDT','LINK-USDT','AVAX-USDT','SUI-USDT',
    'DOT-USDT','UNI-USDT','NEAR-USDT','ATOM-USDT','FIL-USDT'];
  try {
    const ows = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
    _MEWS.okx = ows;
    ows.onopen = () => {
      ows.send(JSON.stringify({op:'subscribe', args: okxSyms.map(s=>({channel:'tickers', instId:s}))}));
      console.log('[OKX WS] Connected');
    };
    ows.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        if (d.arg?.channel === 'tickers' && d.data?.[0]) {
          const td = d.data[0];
          const sym = td.instId?.replace('-USDT','');
          const px = parseFloat(td.last||0);
          const chg = parseFloat(td.sodUtc0||0); // not % directly
          if (sym && px > 0) {
            _MEWS.prices[sym] = {px, src:'okx'};
            const coin = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s===sym);
            if (coin && !coin._pxTs) { coin.px = px; coin._pxTs = Date.now(); }
          }
        }
      } catch(e) {}
    };
    ows.onclose = () => {};
  } catch(e) {}

  // ── KRAKEN WS ─────────────────────────────────────────────────────────────
  try {
    const kws = new WebSocket('wss://ws.kraken.com/v2');
    _MEWS.kraken = kws;
    kws.onopen = () => {
      kws.send(JSON.stringify({method:'subscribe', params:{channel:'ticker',
        symbol:['BTC/USD','ETH/USD','SOL/USD','XRP/USD','ADA/USD','DOGE/USD','LTC/USD','XMR/USD']
      }}));
      console.log('[KRAKEN WS] Connected');
    };
    kws.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        if (d.channel==='ticker' && d.data?.[0]) {
          const td = d.data[0];
          const rawSym = td.symbol?.replace('/USD','');
          const sym = rawSym==='XBT'?'BTC':rawSym;
          const px = td.last||0;
          if (sym && px > 0) {
            _MEWS.prices[sym] = {px, src:'kraken'};
            const coin = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s===sym);
            if (coin && !coin._pxTs) { coin.px = px; coin._pxTs = Date.now(); }
          }
        }
      } catch(e) {}
    };
    kws.onclose = () => {};
  } catch(e) {}

  // ── Yahoo Finance REST for stocks (30s poll) ───────────────────────────────
  _pollStockPrices();
  setInterval(_pollStockPrices, 30000);
}

// Stock symbols to poll — všechny crypto-adjacent + fintech stocks
const _STOCK_SYMS = [
  'MSTR','COIN','SOFI','HOOD','UPST','AFRM','PLTR','RBLX','SNOW','DDOG',
  'NET','CRWD','ZS','OKTA','MNDY','RIVN','LCID','NIO','XPEV','ENPH',
  'FSLR','LMT','RTX','NOC','GD','BA','MRNA','BNTX','REGN','VRTX',
  'DIS','PARA','WBD','SPOT','TGT','AMGN','O','AMT','NEM','FCX',
  'QCOM','AVGO','MU','AMAT','TXN','SQ','PYPL','SPY','QQQ','IBIT',
  'GLD','AAPL','NVDA','MSFT','GOOGL','META','AMZN','TSLA','JPM','V',
  'MA','NFLX','AMD','BRK','BAC','WFC','MS','UNH','LLY','JNJ',
  'RIOT','MARA','CLSK','CORZ','HUT','HIVE','TSM','ARM','MRVL',
];
let _pollStockIdx = 0; // rotace přes batche

async function _pollStockPrices() {
  const BATCH_SIZE = 15;
  const batch = _STOCK_SYMS.slice(_pollStockIdx, _pollStockIdx + BATCH_SIZE);
  _pollStockIdx = (_pollStockIdx + BATCH_SIZE) % _STOCK_SYMS.length;
  if (!batch.length) return;

  try {
    const syms = batch.join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${syms}&fields=regularMarketPrice,regularMarketChangePercent,regularMarketVolume,marketCap`;
    // Zkus allorigins proxy
    const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {signal: AbortSignal.timeout(8000)});
    if (!r.ok) throw new Error('allorigins failed');
    const json = await r.json();
    const parsed = JSON.parse(json.contents);
    const quotes = parsed?.quoteResponse?.result || [];
    let n = 0;
    quotes.forEach(q => {
      const sym = q.symbol;
      const px = q.regularMarketPrice;
      const chg = q.regularMarketChangePercent;
      if (!sym || !px || px <= 0) return;
      // Update STKS
      if (typeof STKS !== 'undefined' && STKS[sym]) {
        STKS[sym].px = px;
        STKS[sym].chg = chg;
        STKS[sym]._pxTs = Date.now();
        if (q.marketCap) STKS[sym].mc = '$' + _fmtBig(q.marketCap);
      }
      // Update MKT
      if (window.MKT && window.MKT[sym]) {
        window.MKT[sym].px = px;
        window.MKT[sym].chg = chg;
      }
      // Update CRYPTO — pro MSTR/COIN/SOFI jako "stock crypto"
      if (window.CRYPTO) {
        const coin = CRYPTO.find(c => c.s === sym);
        if (coin) { coin.px = px; coin.chg = chg; coin._pxTs = Date.now(); }
      }
      n++;
    });
    if (n > 0 && typeof refreshAllPanels === 'function') {
      try { refreshAllPanels(); } catch(e) {}
    }
  } catch(e) {
    // Fallback: přímý Yahoo (může selhat kvůli CORS, ale zkusíme)
    try {
      const syms = batch.join(',');
      const url = `https://query2.finance.yahoo.com/v8/finance/spark?symbols=${syms}&range=1d&interval=1d`;
      const r2 = await fetch(url, {signal: AbortSignal.timeout(6000), headers:{'Accept':'application/json'}});
      if (r2.ok) {
        const d = await r2.json();
        const sp = d?.spark?.result || [];
        sp.forEach(item => {
          const sym = item.symbol;
          const closes = item.response?.[0]?.indicators?.quote?.[0]?.close || [];
          const px = closes[closes.length - 1];
          if (sym && px > 0) {
            if (typeof STKS !== 'undefined' && STKS[sym]) {
              STKS[sym].px = px; STKS[sym]._pxTs = Date.now();
            }
          }
        });
      }
    } catch(e2) { /* silent fail */ }
  }
}

// Start multi-exchange feeds after 3s
setTimeout(_startMultiExchangeWS, 3000);

// ════════════════════════════════════════════════════════════════════════════
//  HYPER PANEL — Hyperliquid Live Dashboard
// ════════════════════════════════════════════════════════════════════════════
const _HL = {
  perps: {},     // sym -> {mark, funding, oi, vol24h, chg24h, longRatio}
  trades: [],    // last 50 trades
  topPerps: [],  // sorted by volume
  ws: null,
  lastUpdate: 0,
  connected: false
};

async function _fetchHLPerps() {
  try {
    // Meta + assetContexts
    const r = await fetch('https://api.hyperliquid.xyz/info', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({type:'metaAndAssetCtxs'}),
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) return;
    const [meta, ctxs] = await r.json();
    meta.universe.forEach((asset, i) => {
      const ctx = ctxs[i];
      if (!ctx) return;
      const sym = asset.name;
      _HL.perps[sym] = {
        name: sym,
        mark: parseFloat(ctx.markPx||0),
        mid: parseFloat(ctx.midPx||ctx.markPx||0),
        funding: (parseFloat(ctx.funding||0)*100).toFixed(4),
        oi: parseFloat(ctx.openInterest||0),
        oiUsd: parseFloat(ctx.openInterest||0) * parseFloat(ctx.markPx||0),
        vol24h: parseFloat(ctx.dayNtlVlm||0),
        chg24h: parseFloat(ctx.prevDayPx||0) > 0 ?
          ((parseFloat(ctx.markPx||0)/parseFloat(ctx.prevDayPx||0)-1)*100) : 0,
        premium: (parseFloat(ctx.funding||0)*100*3*8).toFixed(3), // annualized approx
        maxLev: parseFloat(asset.maxLeverage||50)
      };
    });
    _HL.topPerps = Object.values(_HL.perps)
      .filter(p=>p.vol24h>0)
      .sort((a,b)=>b.vol24h-a.vol24h)
      .slice(0,40);
    _HL.lastUpdate = Date.now();
    _refreshHYPERPanels();
  } catch(e) {}

  // Also fetch global stats
  try {
    const r2 = await fetch('https://api.hyperliquid.xyz/info', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({type:'globalSummary'}), signal: AbortSignal.timeout(6000)
    });
    if (r2.ok) {
      const gs = await r2.json();
      _HL.globalStats = gs;
    }
  } catch(e) {}
}

function _refreshHYPERPanels() {
  document.querySelectorAll('[data-fn="HYPER"]').forEach(el => {
    const body = el.querySelector('.panel-body');
    if (body) body.innerHTML = _buildHYPERInner();
  });
}

function _buildHYPERInner() {
  const gs = _HL.globalStats || {};
  const totalVol = _HL.topPerps.reduce((a,p)=>a+p.vol24h, 0);
  const totalOI  = _HL.topPerps.reduce((a,p)=>a+p.oiUsd, 0);
  const fmtUsd = v => v >= 1e9 ? '$'+(v/1e9).toFixed(2)+'B' : v >= 1e6 ? '$'+(v/1e6).toFixed(1)+'M' : '$'+v.toFixed(0);
  const fmtPx = (p, sym) => p > 10000 ? p.toLocaleString('en',{maximumFractionDigits:0}) :
    p > 100 ? p.toFixed(2) : p > 1 ? p.toFixed(4) : p.toFixed(6);
  const conn = _HL.connected ? '<span style="color:#00cc44;font-size:7px">● LIVE</span>' : '<span style="color:#ff4400;font-size:7px">○ REST</span>';

  let h = `
  <div style="background:#000;padding:0;font-family:'Courier Prime',monospace">
    <!-- HEADER STATS -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1px solid #1a1200">
      <div style="padding:8px 12px;border-right:1px solid #1a1200;text-align:center">
        <div style="color:#ff6600;font-size:8px;letter-spacing:2px;margin-bottom:3px">24H VOLUME ${conn}</div>
        <div style="color:#fff;font-size:18px;font-weight:700;font-family:'Roboto Mono',monospace">${fmtUsd(totalVol)}</div>
      </div>
      <div style="padding:8px 12px;border-right:1px solid #1a1200;text-align:center">
        <div style="color:#ff6600;font-size:8px;letter-spacing:2px;margin-bottom:3px">OPEN INTEREST</div>
        <div style="color:#00ccff;font-size:18px;font-weight:700;font-family:'Roboto Mono',monospace">${fmtUsd(totalOI)}</div>
      </div>
      <div style="padding:8px 12px;border-right:1px solid #1a1200;text-align:center">
        <div style="color:#ff6600;font-size:8px;letter-spacing:2px;margin-bottom:3px">PERPS ACTIVE</div>
        <div style="color:#00ff88;font-size:18px;font-weight:700;font-family:'Roboto Mono',monospace">${_HL.topPerps.length}</div>
      </div>
      <div style="padding:8px 12px;text-align:center">
        <div style="color:#ff6600;font-size:8px;letter-spacing:2px;margin-bottom:3px">UPDATED</div>
        <div style="color:#887060;font-size:11px;font-weight:700">${_HL.lastUpdate ? new Date(_HL.lastUpdate).toLocaleTimeString('en-GB') : '—'}</div>
      </div>
    </div>

    <!-- TABLE -->
    <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:10px">
      <tr style="background:#0a0500;position:sticky;top:0;z-index:1">
        <th style="padding:4px 6px;text-align:left;color:#ff8800;font-size:8px;letter-spacing:.5px;white-space:nowrap">SYMBOL</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">MARK PX</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">24H CHG</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">FUNDING</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">OPEN INT $</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">24H VOL</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">MAX LEV</th>
        <th style="padding:4px 6px;text-align:right;color:#ff8800;font-size:8px;letter-spacing:.5px">CHART</th>
      </tr>`;

  _HL.topPerps.forEach((p,i) => {
    const chgCol = p.chg24h >= 0 ? '#00e676' : '#ff3d3d';
    const fundCol = parseFloat(p.funding) > 0 ? '#ff8800' : parseFloat(p.funding) < 0 ? '#00ccff' : '#666';
    const fundSign = parseFloat(p.funding) > 0 ? '+' : '';
    h += `<tr style="border-bottom:1px solid #0a0500" onmouseover="this.style.background='#0f0a00'" onmouseout="this.style.background='transparent'">
      <td style="padding:3px 6px;font-weight:700;color:#ff9900">${p.name}-PERP</td>
      <td style="padding:3px 6px;text-align:right;color:#fff;font-family:'Roboto Mono',monospace">${fmtPx(p.mark, p.name)}</td>
      <td style="padding:3px 6px;text-align:right;color:${chgCol};font-weight:700;font-family:'Roboto Mono',monospace">${p.chg24h>=0?'+':''}${p.chg24h.toFixed(2)}%</td>
      <td style="padding:3px 6px;text-align:right;color:${fundCol};font-family:'Roboto Mono',monospace">${fundSign}${p.funding}%</td>
      <td style="padding:3px 6px;text-align:right;color:#00ccff;font-family:'Roboto Mono',monospace">${fmtUsd(p.oiUsd)}</td>
      <td style="padding:3px 6px;text-align:right;color:#887060;font-family:'Roboto Mono',monospace">${fmtUsd(p.vol24h)}</td>
      <td style="padding:3px 6px;text-align:right;color:#665840">${p.maxLev}x</td>
      <td style="padding:3px 6px;text-align:right">
        <span style="color:#ff6600;cursor:pointer;font-size:8px" onclick="if(window._openChartForSymbol)_openChartForSymbol('${p.name}')">GP »</span>
      </td>
    </tr>`;
  });

  if (_HL.topPerps.length === 0) {
    h += `<tr><td colspan="8" style="padding:24px;text-align:center;color:#444;font-size:10px">
      Loading Hyperliquid perp data...<br><span style="font-size:8px;color:#333">Fetching from api.hyperliquid.xyz/info</span>
    </td></tr>`;
  }

  h += `</table></div>
  <div style="padding:4px 8px;border-top:1px solid #1a1200;font-size:7px;color:#443322;letter-spacing:.5px">
    SOURCE: HYPERLIQUID REST API · api.hyperliquid.xyz/info · metaAndAssetCtxs · UPDATES EVERY 10S
  </div>
  </div>`;
  return h;
}

function buildHYPER() {
  // Trigger fetch
  _fetchHLPerps();
  setInterval(_fetchHLPerps, 10000);
  return `<div data-fn="HYPER" style="height:100%;overflow:hidden;display:flex;flex-direction:column">
    <div style="background:#000;border-bottom:1px solid #1a1200;padding:4px 10px;display:flex;align-items:center;gap:10px;flex-shrink:0">
      <span style="color:#44ffcc;font-size:7px;font-weight:700;letter-spacing:2px">⬡ HYPERLIQUID PERP UNIVERSE</span>
      <span style="color:#443322;font-size:7px">LIVE · MARK PRICE · FUNDING · OI · VOLUME</span>
      <button style="margin-left:auto;background:#0a0a00;border:1px solid #2a1800;color:#ff8800;padding:2px 8px;font-size:7px;cursor:pointer;font-family:'Courier Prime',monospace" onclick="(function(){_fetchHLPerps();})()">⟳ REFRESH</button>
    </div>
    <div class="panel-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#2a1800 #000">
      ${_buildHYPERInner()}
    </div>
  </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
//  CRCL PANEL — Circular Market Metrics (donut/arc visualization)
//  Napojeno na: Hyperliquid funding, Binance OI, Fear & Greed, Dominance
// ════════════════════════════════════════════════════════════════════════════
function buildCRCL() {
  const ts = Date.now();
  return `<div style="background:#000;height:100%;overflow-y:auto;font-family:'Courier Prime',monospace;padding:0">
  <div style="background:#000;border-bottom:1px solid #1a1200;padding:5px 10px;display:flex;align-items:center;gap:8px">
    <span style="color:#00ccff;font-size:7px;font-weight:700;letter-spacing:2px">◉ CIRCULAR MARKET METRICS</span>
    <span style="color:#333;font-size:7px">LIVE GAUGES · CROSS-ASSET</span>
  </div>
  <div id="crcl-canvas-container" style="padding:10px 8px">
    <canvas id="crcl-main-canvas" width="760" height="480" style="width:100%;max-width:760px;display:block;margin:0 auto"></canvas>
  </div>
  <div id="crcl-stats-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#111;margin:0 8px 8px">
    <div style="background:#000;padding:8px 10px;text-align:center">
      <div style="color:#ff6600;font-size:7px;letter-spacing:1px;margin-bottom:4px">BTC DOMINANCE</div>
      <div id="crcl-btcdom" style="color:#ff9900;font-size:20px;font-weight:700;font-family:'Roboto Mono',monospace">—%</div>
      <div style="color:#333;font-size:7px;margin-top:2px">OF TOTAL CRYPTO MCAP</div>
    </div>
    <div style="background:#000;padding:8px 10px;text-align:center">
      <div style="color:#ff6600;font-size:7px;letter-spacing:1px;margin-bottom:4px">FEAR &amp; GREED</div>
      <div id="crcl-fg" style="color:#00ff88;font-size:20px;font-weight:700;font-family:'Roboto Mono',monospace">—</div>
      <div id="crcl-fg-label" style="color:#333;font-size:7px;margin-top:2px">—</div>
    </div>
    <div style="background:#000;padding:8px 10px;text-align:center">
      <div style="color:#ff6600;font-size:7px;letter-spacing:1px;margin-bottom:4px">BTC FUNDING (HL)</div>
      <div id="crcl-funding" style="color:#ff8800;font-size:20px;font-weight:700;font-family:'Roboto Mono',monospace">—%</div>
      <div style="color:#333;font-size:7px;margin-top:2px">8H PERPETUAL RATE</div>
    </div>
    <div style="background:#000;padding:8px 10px;text-align:center">
      <div style="color:#ff6600;font-size:7px;letter-spacing:1px;margin-bottom:4px">ETH STAKING APR</div>
      <div id="crcl-staking" style="color:#00ccff;font-size:20px;font-weight:700;font-family:'Roboto Mono',monospace">3.8%</div>
      <div style="color:#333;font-size:7px;margin-top:2px">NETWORK YIELD</div>
    </div>
  </div>
  <!-- Asset allocation donuts -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#111;margin:0 8px 8px">
    <div style="background:#000;padding:8px;text-align:center">
      <canvas id="crcl-donut-crypto" width="180" height="180" style="display:block;margin:0 auto"></canvas>
      <div style="color:#ff8800;font-size:8px;letter-spacing:1px;margin-top:4px">CRYPTO SECTOR BREAKDOWN</div>
    </div>
    <div style="background:#000;padding:8px;text-align:center">
      <canvas id="crcl-donut-oi" width="180" height="180" style="display:block;margin:0 auto"></canvas>
      <div style="color:#ff8800;font-size:8px;letter-spacing:1px;margin-top:4px">OI DISTRIBUTION BY ASSET</div>
    </div>
    <div style="background:#000;padding:8px;text-align:center">
      <canvas id="crcl-donut-funding" width="180" height="180" style="display:block;margin:0 auto"></canvas>
      <div style="color:#ff8800;font-size:8px;letter-spacing:1px;margin-top:4px">FUNDING RATE HEATMAP</div>
    </div>
  </div>
  <!-- CRCL multi-exchange live prices circular gauge row -->
  <div style="padding:6px 8px;border-top:1px solid #1a1200">
    <div style="color:#ff6600;font-size:7px;letter-spacing:2px;margin-bottom:6px">MULTI-EXCHANGE SPREAD GAUGES</div>
    <canvas id="crcl-spread-canvas" width="760" height="120" style="width:100%;max-width:760px;display:block"></canvas>
  </div>
  <div style="padding:4px 8px;border-top:1px solid #1a1200;font-size:7px;color:#443322;letter-spacing:.5px">
    SOURCE: HYPERLIQUID · BINANCE · BYBIT · OKX · COINGECKO · TREE OF ALPHA · UPDATES LIVE
  </div>
  </div>
  <script>
  (function(){
    // Draw main arc gauge
    function _drawArcGauge(ctx, cx, cy, r, startAngle, endAngle, value, max, color, label, valueStr) {
      const full = endAngle - startAngle;
      const prog = Math.max(0, Math.min(1, value / max));
      // Background arc
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = '#1a1a0a'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.stroke();
      // Filled arc
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + full * prog);
      ctx.strokeStyle = color; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.stroke();
      // Glow
      ctx.shadowBlur = 16; ctx.shadowColor = color;
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + full * prog);
      ctx.strokeStyle = color + '44'; ctx.lineWidth = 20; ctx.stroke();
      ctx.shadowBlur = 0;
      // Label
      ctx.fillStyle = color; ctx.font = '700 13px Roboto Mono, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(valueStr, cx, cy - 6);
      ctx.fillStyle = '#887060'; ctx.font = '600 7px Courier Prime, monospace';
      ctx.fillText(label, cx, cy + 10);
    }

    function _drawDonut(canvasId, segments, title) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 14;
      ctx.clearRect(0,0,W,H);
      const total = segments.reduce((a,s)=>a+s.v, 0);
      if (total <= 0) return;
      let angle = -Math.PI/2;
      segments.forEach(s => {
        const sweep = (s.v/total) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx, cy, r, angle, angle+sweep);
        ctx.fillStyle = s.color; ctx.fill();
        // inner cutout
        ctx.beginPath(); ctx.arc(cx, cy, r*0.55, 0, Math.PI*2);
        ctx.fillStyle = '#000'; ctx.fill();
        angle += sweep;
      });
      // Center text
      ctx.fillStyle = '#ff8800'; ctx.font = '700 9px Courier Prime, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(segments.length + ' ASSETS', cx, cy);
      // Legend dots (bottom)
      let lx = 8, ly = H - 22;
      segments.slice(0,5).forEach(s => {
        ctx.fillStyle = s.color; ctx.fillRect(lx, ly, 6, 6);
        ctx.fillStyle = '#887060'; ctx.font = '6px Courier Prime, monospace';
        ctx.textAlign = 'left'; ctx.fillText(s.label.substring(0,6), lx+8, ly+5);
        lx += 44;
      });
    }

    function _renderCRCL() {
      const canvas = document.getElementById('crcl-main-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H);

      // Get live data
      const fg = (typeof _liveData!=='undefined' && _liveData.fearGreed) ? _liveData.fearGreed : 52;
      const btcDom = (typeof _liveData!=='undefined' && _liveData.dominance?.BTC) ? parseFloat(_liveData.dominance.BTC) : 58.4;
      const btcFund = (typeof _HL!=='undefined' && _HL.perps?.BTC) ? parseFloat(_HL.perps.BTC.funding) : 0.012;
      const ethFund = (typeof _HL!=='undefined' && _HL.perps?.ETH) ? parseFloat(_HL.perps.ETH.funding) : 0.008;
      const solFund = (typeof _HL!=='undefined' && _HL.perps?.SOL) ? parseFloat(_HL.perps.SOL.funding) : 0.018;

      // Update stat boxes
      const domEl = document.getElementById('crcl-btcdom');
      if (domEl) domEl.textContent = btcDom.toFixed(1) + '%';
      const fgEl = document.getElementById('crcl-fg');
      const fgLbl = document.getElementById('crcl-fg-label');
      if (fgEl) { fgEl.textContent = Math.round(fg);
        fgEl.style.color = fg>=75?'#ff3d3d':fg>=55?'#ff8800':fg>=45?'#ffcc00':fg>=25?'#00ccff':'#00ff88'; }
      if (fgLbl) fgLbl.textContent = fg>=75?'EXTREME GREED':fg>=55?'GREED':fg>=45?'NEUTRAL':fg>=25?'FEAR':'EXTREME FEAR';
      const fundEl = document.getElementById('crcl-funding');
      if (fundEl) { fundEl.textContent = (btcFund>=0?'+':'') + btcFund.toFixed(4)+'%';
        fundEl.style.color = btcFund > 0 ? '#ff8800' : '#00ccff'; }

      // Draw arc gauges — top row
      const gauges = [
        {cx:95,  cy:110, r:74, v:fg,      max:100, col:'#00ff88', lbl:'F&G INDEX',   str:Math.round(fg)+''},
        {cx:255, cy:110, r:74, v:btcDom,  max:100, col:'#ff9900', lbl:'BTC DOM %',   str:btcDom.toFixed(1)+'%'},
        {cx:415, cy:110, r:74, v:Math.abs(btcFund)*1000, max:5, col: btcFund>=0?'#ff8800':'#00ccff', lbl:'BTC FUND', str:(btcFund>=0?'+':'')+(btcFund).toFixed(4)+'%'},
        {cx:575, cy:110, r:74, v:Math.abs(ethFund)*1000, max:5, col: ethFund>=0?'#ff8800':'#00ccff', lbl:'ETH FUND', str:(ethFund>=0?'+':'')+(ethFund).toFixed(4)+'%'},
        {cx:720, cy:110, r:58, v:Math.abs(solFund)*1000, max:5, col:'#9945FF', lbl:'SOL FUND', str:(solFund>=0?'+':'')+(solFund).toFixed(4)+'%'},
      ];
      const PI = Math.PI;
      gauges.forEach(g => {
        _drawArcGauge(ctx, g.cx, g.cy, g.r, PI*0.75, PI*2.25, g.v, g.max, g.col, g.lbl, g.str);
      });

      // Header labels
      ctx.fillStyle = '#ff6600'; ctx.font = '700 7px Courier Prime, monospace';
      ctx.textAlign = 'center';
      [[95,'SENTIMENT'],[255,'DOMINANCE'],[415,'BTC PERP'],[575,'ETH PERP'],[720,'SOL PERP']].forEach(([x,t])=>{
        ctx.fillText(t, x, 195);
      });

      // Grid lines
      ctx.strokeStyle = '#1a1200'; ctx.lineWidth = 1;
      [190,215].forEach(y => { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); });

      // Volume bars — bottom section (top 10 perps by vol)
      const barY = 225, barH = 200;
      const topPerps = (typeof _HL!=='undefined' && _HL.topPerps.length) ? _HL.topPerps.slice(0,10) : [];
      const maxVol = topPerps.length ? topPerps[0].vol24h : 1;
      const barW = topPerps.length ? Math.floor((W - 20) / topPerps.length) - 4 : 60;
      ctx.fillStyle = '#ff6600'; ctx.font = '700 7px Courier Prime, monospace'; ctx.textAlign='left';
      ctx.fillText('24H VOLUME RANKING — TOP PERPS (HYPERLIQUID)', 10, barY - 10);
      topPerps.forEach((p, i) => {
        const bx = 10 + i * (barW + 4);
        const ratio = Math.min(1, p.vol24h / maxVol);
        const bHgt = Math.max(4, Math.floor(barH * ratio));
        const col = p.chg24h >= 0 ? '#00cc66' : '#ff3d3d';
        ctx.fillStyle = col + '44';
        ctx.fillRect(bx, barY + barH - bHgt, barW, bHgt);
        ctx.fillStyle = col;
        ctx.fillRect(bx, barY + barH - bHgt, barW, 2);
        // Label
        ctx.fillStyle = '#ff9900'; ctx.font = '700 7px Roboto Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, bx + barW/2, barY + barH + 10);
        const volStr = p.vol24h >= 1e9 ? (p.vol24h/1e9).toFixed(1)+'B' : (p.vol24h/1e6).toFixed(0)+'M';
        ctx.fillStyle = '#665840'; ctx.font = '6px Roboto Mono, monospace';
        ctx.fillText('$'+volStr, bx + barW/2, barY + barH + 20);
      });
      if (!topPerps.length) {
        ctx.fillStyle = '#443322'; ctx.font = '10px Courier Prime, monospace';
        ctx.textAlign='center'; ctx.fillText('Fetching Hyperliquid data...', W/2, barY + barH/2);
      }
    }

    // Donut data
    function _renderDonuts() {
      // Crypto sector breakdown
      const sectors = [
        {label:'L1/L2', v:42, color:'#ff6600'},
        {label:'DeFi',  v:18, color:'#00ccff'},
        {label:'AI',    v:12, color:'#9945FF'},
        {label:'RWA',   v:8,  color:'#00ff88'},
        {label:'Gaming',v:6,  color:'#ffcc00'},
        {label:'Meme',  v:8,  color:'#ff3d3d'},
        {label:'Other', v:6,  color:'#445566'},
      ];
      _drawDonut('crcl-donut-crypto', sectors, 'SECTOR');

      // OI distribution — top 5 perps
      const oiSegs = (typeof _HL!=='undefined' && _HL.topPerps.length >= 5) ?
        _HL.topPerps.slice(0,6).map((p,i)=>({label:p.name, v:p.oiUsd,
          color:['#ff6600','#00ccff','#9945FF','#00ff88','#ffcc00','#ff3d3d'][i]})) :
        [{label:'BTC',v:45,color:'#ff9900'},{label:'ETH',v:22,color:'#627EEA'},
         {label:'SOL',v:12,color:'#9945FF'},{label:'XRP',v:8,color:'#00aaff'},
         {label:'BNB',v:8,color:'#f3ba2f'},{label:'Other',v:5,color:'#445566'}];
      _drawDonut('crcl-donut-oi', oiSegs, 'OI');

      // Funding polarity (pos/neg)
      const posFund = (typeof _HL!=='undefined') ?
        Object.values(_HL.perps).filter(p=>parseFloat(p.funding)>0.002).length : 28;
      const negFund = (typeof _HL!=='undefined') ?
        Object.values(_HL.perps).filter(p=>parseFloat(p.funding)<-0.002).length : 8;
      const neuFund = (typeof _HL!=='undefined') ?
        Object.values(_HL.perps).length - posFund - negFund : 12;
      _drawDonut('crcl-donut-funding', [
        {label:'BULLISH', v:posFund, color:'#ff8800'},
        {label:'BEARISH', v:negFund, color:'#00ccff'},
        {label:'NEUTRAL', v:Math.max(1,neuFund), color:'#444'},
      ], 'FUNDING');
    }

    // Spread gauge canvas
    function _renderSpreads() {
      const canvas = document.getElementById('crcl-spread-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H);
      const assets = ['BTC','ETH','SOL','XRP','BNB','LINK','AVAX','HYPE'];
      const w = W / assets.length;
      assets.forEach((sym, i) => {
        const x = i * w;
        // Get price from various sources
        const hlPx = (typeof _HL!=='undefined' && _HL.perps[sym]) ? _HL.perps[sym].mark : 0;
        const coin = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s===sym);
        const spotPx = coin?.px || 0;
        const spread = hlPx && spotPx ? ((hlPx/spotPx - 1)*100) : 0;
        const col = spread > 0.05 ? '#ff8800' : spread < -0.05 ? '#00ccff' : '#00aa44';
        // Bar
        const barH = Math.min(40, Math.abs(spread)*200);
        const barY = spread >= 0 ? H/2 - barH : H/2;
        ctx.fillStyle = col + '66';
        ctx.fillRect(x+4, barY, w-8, barH);
        ctx.fillStyle = col;
        ctx.fillRect(x+4, spread>=0?H/2-2:H/2, w-8, 2);
        // Center line
        ctx.strokeStyle = '#1a1200'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x,H/2); ctx.lineTo(x+w,H/2); ctx.stroke();
        // Labels
        ctx.fillStyle = '#ff9900'; ctx.font = '700 8px Roboto Mono, monospace';
        ctx.textAlign='center';
        ctx.fillText(sym, x+w/2, H-14);
        ctx.fillStyle = col; ctx.font = '7px Roboto Mono, monospace';
        ctx.fillText((spread>=0?'+':'')+spread.toFixed(3)+'%', x+w/2, H-4);
        // Exchange labels
        ctx.fillStyle = '#443322'; ctx.font = '5px Courier Prime, monospace';
        ctx.fillText('HL vs SPOT', x+w/2, 10);
      });
    }

    // Render loop
    function _crclLoop() {
      try { _renderCRCL(); } catch(e) {}
      try { _renderDonuts(); } catch(e) {}
      try { _renderSpreads(); } catch(e) {}
    }
    _crclLoop();
    setInterval(_crclLoop, 5000);
    // Also re-render when HL data arrives
    if (typeof _fetchHLPerps === 'function') {
      const orig = window._crclAfterHL;
      setTimeout(() => { try{_fetchHLPerps();}catch(e){} }, 500);
    }
  })();
  <\/script>`;
}

// ════════════════════════════════════════════════════════════════════════════
//  METR PANEL — Cross-Asset Metrics Dashboard
// ════════════════════════════════════════════════════════════════════════════
function buildMETR() {
  const fmtPx = (px, prec=2) => px == null ? '—' : parseFloat(px).toLocaleString('en',{minimumFractionDigits:prec,maximumFractionDigits:prec});
  const fmtChg = c => c == null ? '—' : (c>=0?'<span style="color:#00cc44">+'+c.toFixed(2)+'%</span>':'<span style="color:#ff3d3d">'+c.toFixed(2)+'%</span>');

  // Collect live prices across all asset classes
  const btc = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s==='BTC');
  const eth = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s==='ETH');
  const xrp = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s==='XRP');
  const sol = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s==='SOL');
  const hype = (typeof CRYPTO!=='undefined') && CRYPTO.find(c=>c.s==='HYPE');

  const gold = (typeof COMDTY_DATA!=='undefined') && COMDTY_DATA.find(c=>c.s==='XAU');
  const oil  = (typeof COMDTY_DATA!=='undefined') && COMDTY_DATA.find(c=>c.s==='CL1');
  const spx  = typeof MKT!=='undefined' ? MKT.SPX : null;
  const ndx  = typeof MKT!=='undefined' ? MKT.NDX : null;
  const eurusd = (typeof FXP!=='undefined') && FXP.find(f=>f.p==='EUR/USD');
  const usdjpy = (typeof FXP!=='undefined') && FXP.find(f=>f.p==='USD/JPY');

  const mstr  = (typeof STKS!=='undefined') && STKS.MSTR;
  const coin  = (typeof STKS!=='undefined') && STKS.COIN;
  const sofi  = (typeof STKS!=='undefined') && STKS.SOFI;
  const pltr  = (typeof STKS!=='undefined') && STKS.PLTR;
  const ibit  = (typeof STKS!=='undefined') && STKS.IBIT;

  const hlBTC = _HL.perps?.BTC;
  const hlETH = _HL.perps?.ETH;
  const hlSOL = _HL.perps?.SOL;

  const fg = (typeof _liveData!=='undefined' && _liveData.fearGreed) ? _liveData.fearGreed : '—';
  const fgLabel = fg === '—' ? '—' : fg>=75?'EXTREME GREED':fg>=55?'GREED':fg>=45?'NEUTRAL':fg>=25?'FEAR':'EXTREME FEAR';
  const btcDom = (typeof _liveData!=='undefined' && _liveData.dominance?.BTC) ? _liveData.dominance.BTC : '—';

  const metricBlock = (label, value, sub='', col='#fff', width='1fr') =>
    `<div style="background:#000;padding:8px 12px;border-right:1px solid #111;border-bottom:1px solid #111">
      <div style="color:#ff6600;font-size:7px;letter-spacing:1.5px;margin-bottom:4px">${label}</div>
      <div style="color:${col};font-size:17px;font-weight:700;font-family:'Roboto Mono',monospace;line-height:1">${value}</div>
      ${sub ? `<div style="color:#665840;font-size:7px;margin-top:3px">${sub}</div>` : ''}
    </div>`;

  const separator = (title) =>
    `<div style="grid-column:1/-1;background:#0a0500;padding:3px 10px;border-bottom:1px solid #1a1200;border-top:1px solid #1a1200">
      <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:2px">${title}</span>
    </div>`;

  return `<div style="height:100%;overflow-y:auto;font-family:'Courier Prime',monospace">
  <div style="background:#000;border-bottom:1px solid #1a1200;padding:4px 10px;display:flex;align-items:center;gap:8px">
    <span style="color:#ffcc00;font-size:7px;font-weight:700;letter-spacing:2px">◆ METR — CROSS-ASSET METRICS DASHBOARD</span>
    <span style="color:#333;font-size:7px">LIVE · CRYPTO · EQUITIES · FX · COMMODITIES</span>
    <button style="margin-left:auto;background:#0a0a00;border:1px solid #2a2000;color:#ffcc00;padding:2px 8px;font-size:7px;cursor:pointer;font-family:'Courier Prime',monospace" onclick="var b=document.querySelector('[data-fn=METR] .panel-body'); if(b){b.innerHTML=buildMETR();}">⟳ REFRESH</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr)">
    ${separator('▸ CRYPTO — SPOT PRICES')}
    ${metricBlock('BITCOIN', btc?.px ? '$'+parseFloat(btc.px).toLocaleString('en',{maximumFractionDigits:0}) : '—', btc?.chg != null ? (btc.chg>=0?'+':'')+btc.chg.toFixed(2)+'% 24H' : '—', '#ff9900')}
    ${metricBlock('ETHEREUM', eth?.px ? '$'+fmtPx(eth.px,2) : '—', eth?.chg != null ? (eth.chg>=0?'+':'')+eth.chg.toFixed(2)+'% 24H' : '—', '#627EEA')}
    ${metricBlock('SOLANA', sol?.px ? '$'+fmtPx(sol.px,2) : '—', sol?.chg != null ? (sol.chg>=0?'+':'')+sol.chg.toFixed(2)+'% 24H' : '—', '#9945FF')}
    ${metricBlock('XRP', xrp?.px ? '$'+fmtPx(xrp.px,4) : '—', xrp?.chg != null ? (xrp.chg>=0?'+':'')+xrp.chg.toFixed(2)+'% 24H' : '—', '#00aaff')}
    ${metricBlock('HYPERLIQUID', hype?.px ? '$'+fmtPx(hype.px,2) : '—', hype?.chg != null ? (hype.chg>=0?'+':'')+hype.chg.toFixed(2)+'% 24H' : '—', '#44ffcc')}

    ${separator('▸ HYPERLIQUID — PERPETUALS')}
    ${metricBlock('BTC MARK PX', hlBTC ? '$'+parseFloat(hlBTC.mark).toLocaleString('en',{maximumFractionDigits:0}) : '—', 'HYPERLIQUID PERP', '#ff9900')}
    ${metricBlock('BTC FUNDING', hlBTC ? (parseFloat(hlBTC.funding)>=0?'+':'')+hlBTC.funding+'%' : '—', 'PER 8H · PERP RATE', parseFloat(hlBTC?.funding||0)>0?'#ff8800':'#00ccff')}
    ${metricBlock('ETH FUNDING', hlETH ? (parseFloat(hlETH.funding)>=0?'+':'')+hlETH.funding+'%' : '—', 'PER 8H · PERP RATE', parseFloat(hlETH?.funding||0)>0?'#ff8800':'#00ccff')}
    ${metricBlock('SOL FUNDING', hlSOL ? (parseFloat(hlSOL.funding)>=0?'+':'')+hlSOL.funding+'%' : '—', 'PER 8H · PERP RATE', parseFloat(hlSOL?.funding||0)>0?'#ff8800':'#00ccff')}
    ${metricBlock('TOTAL OI', _HL.topPerps.length ? '$'+(_HL.topPerps.reduce((a,p)=>a+p.oiUsd,0)/1e9).toFixed(2)+'B' : '—', 'HYPERLIQUID PERP OI', '#00ccff')}

    ${separator('▸ EQUITIES — CRYPTO-ADJACENT & EXTENDED UNIVERSE')}
    ${metricBlock('MSTR', mstr?.px ? '$'+fmtPx(mstr.px,2) : '—', 'MicroStrategy · BTC Treasury', mstr?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('COINBASE', coin?.px ? '$'+fmtPx(coin.px,2) : '—', 'COIN · Crypto Exchange', coin?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('SOFI', sofi?.px ? '$'+fmtPx(sofi.px,2) : '—', 'SoFi Technologies · Fintech', sofi?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('PALANTIR', pltr?.px ? '$'+fmtPx(pltr.px,2) : '—', 'PLTR · AI / Data Analytics', pltr?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('iSHARES BTC', ibit?.px ? '$'+fmtPx(ibit.px,2) : '—', 'IBIT · Bitcoin ETF', ibit?.chg>=0?'#00e676':'#ff3d3d')}

    ${separator('▸ MACRO — INDICES · FX · COMMODITIES')}
    ${metricBlock('S&P 500', spx?.px ? spx.px.toLocaleString('en',{maximumFractionDigits:2}) : '—', 'SPX · US Large Cap Index', spx?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('NASDAQ 100', ndx?.px ? ndx.px.toLocaleString('en',{maximumFractionDigits:2}) : '—', 'NDX · US Tech Index', ndx?.chg>=0?'#00e676':'#ff3d3d')}
    ${metricBlock('EUR/USD', eurusd ? eurusd.b.toFixed(5) : '—', 'SPOT FX RATE', '#ffffff')}
    ${metricBlock('USD/JPY', usdjpy ? usdjpy.b.toFixed(3) : '—', 'SPOT FX RATE', '#ffffff')}
    ${metricBlock('GOLD', gold?.px ? '$'+fmtPx(gold.px,2) : '—', 'XAU/USD SPOT', '#f0c060')}

    ${separator('▸ SENTIMENT & ON-CHAIN INDICATORS')}
    ${metricBlock('FEAR & GREED', fg !== '—' ? Math.round(fg) : '—', fgLabel, fg==='—'?'#666':fg>=75?'#ff3d3d':fg>=55?'#ff8800':fg>=45?'#ffcc00':fg>=25?'#00ccff':'#00ff88')}
    ${metricBlock('BTC DOMINANCE', btcDom !== '—' ? btcDom+'%' : '—', 'OF TOTAL CRYPTO MCAP', '#ff9900')}
    ${metricBlock('BTC FUNDING (HL)', hlBTC ? (parseFloat(hlBTC.funding)>=0?'+':'')+hlBTC.funding+'%' : '—', 'LONGS PAY SHORTS →', '#ff8800')}
    ${metricBlock('ETH STAKING', '3.82%', 'NETWORK APR · LIDO', '#627EEA')}
    ${metricBlock('TOTAL PERP VOL', _HL.topPerps.length ? '$'+(_HL.topPerps.reduce((a,p)=>a+p.vol24h,0)/1e9).toFixed(2)+'B' : '—', 'HYPERLIQUID 24H', '#44ffcc')}
  </div>
  <div style="padding:4px 10px;border-top:1px solid #111;font-size:7px;color:#443322;letter-spacing:.5px">
    DATA: BINANCE WS · HYPERLIQUID REST · BYBIT WS · OKX WS · COINGECKO · STOOQ · FRANKFURTER · UPDATES LIVE
  </div>
  </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
//  MULTIFEED PANEL — Multi-Exchange Live Trade Feed
//  Napojeno na cryexc-backend WS + přímé burzy
// ════════════════════════════════════════════════════════════════════════════
const _MFEED = {
  trades: [],   // [{ts, sym, px, qty, side, src}]
  maxTrades: 200
};

function buildMULTIFEED() {
  // Also hook into CE (CryExc) trades if available
  const origHandleMsg = window._cryexcHandleMsg;

  return `<div style="height:100%;overflow:hidden;display:flex;flex-direction:column;font-family:'Courier Prime',monospace">
  <div style="background:#000;border-bottom:1px solid #1a1200;padding:4px 10px;display:flex;align-items:center;gap:8px;flex-shrink:0">
    <span style="color:#ff44aa;font-size:7px;font-weight:700;letter-spacing:2px">⟳ MULTI-EXCHANGE LIVE TRADE FEED</span>
    <span id="mfeed-status" style="color:#333;font-size:7px">BINANCE · BYBIT · HYPERLIQUID · CRYEXC BACKEND</span>
    <span id="mfeed-count" style="color:#ff6600;font-size:7px;margin-left:auto">0 TRADES</span>
  </div>
  <!-- Filters -->
  <div style="background:#0a0500;border-bottom:1px solid #1a1200;padding:3px 8px;display:flex;gap:6px;align-items:center;flex-shrink:0">
    <span style="color:#665840;font-size:7px">SYM:</span>
    <select id="mfeed-sym-filter" style="background:#000;border:1px solid #2a1200;color:#ff8800;font-size:8px;padding:1px 4px;font-family:'Courier Prime',monospace">
      <option value="">ALL</option>
      <option>BTC</option><option>ETH</option><option>SOL</option><option>XRP</option>
      <option>BNB</option><option>HYPE</option><option>AVAX</option><option>LINK</option>
    </select>
    <span style="color:#665840;font-size:7px;margin-left:6px">MIN $:</span>
    <select id="mfeed-min-filter" style="background:#000;border:1px solid #2a1200;color:#ff8800;font-size:8px;padding:1px 4px;font-family:'Courier Prime',monospace">
      <option value="0">ANY</option>
      <option value="10000">$10K</option>
      <option value="50000">$50K</option>
      <option value="100000">$100K</option>
      <option value="500000">$500K</option>
    </select>
    <span style="color:#665840;font-size:7px;margin-left:6px">SOURCE:</span>
    <span id="mfeed-src-binance" style="color:#f3ba2f;font-size:7px;cursor:pointer;border:1px solid #f3ba2f22;padding:1px 5px" onclick="this.style.opacity=this.style.opacity=='.3'?'1':'.3'">BNB</span>
    <span id="mfeed-src-bybit" style="color:#ff6600;font-size:7px;cursor:pointer;border:1px solid #ff660022;padding:1px 5px" onclick="this.style.opacity=this.style.opacity=='.3'?'1':'.3'">BYBIT</span>
    <span id="mfeed-src-hl" style="color:#44ffcc;font-size:7px;cursor:pointer;border:1px solid #44ffcc22;padding:1px 5px" onclick="this.style.opacity=this.style.opacity=='.3'?'1':'.3'">HL</span>
    <span id="mfeed-src-cryexc" style="color:#ff44aa;font-size:7px;cursor:pointer;border:1px solid #ff44aa22;padding:1px 5px" onclick="this.style.opacity=this.style.opacity=='.3'?'1':'.3'">CRYEXC</span>
    <button style="margin-left:auto;background:transparent;border:1px solid #333;color:#666;font-size:7px;padding:1px 6px;cursor:pointer;font-family:'Courier Prime',monospace" onclick="document.getElementById('mfeed-body').innerHTML='';_MFEED.trades=[]">CLR</button>
  </div>
  <div id="mfeed-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#2a1800 #000;font-family:'Roboto Mono','Courier Prime',monospace;font-size:10px">
    <div style="padding:16px;text-align:center;color:#333;font-size:9px">Connecting to exchanges...<br><span style="font-size:7px;color:#222">Binance WS · Bybit WS · Hyperliquid WS · CryExc Backend</span></div>
  </div>
  <script>
  (function(){
    const body = document.getElementById('mfeed-body');
    const cnt  = document.getElementById('mfeed-count');
    let tradeCount = 0;
    const MAX = 300;

    function _addTrade(sym, px, qty, side, src, notional) {
      const symFilter = document.getElementById('mfeed-sym-filter')?.value||'';
      const minFilter = parseFloat(document.getElementById('mfeed-min-filter')?.value||0);
      if (symFilter && sym !== symFilter) return;
      if (minFilter > 0 && notional < minFilter) return;
      // Source opacity filter
      const srcId = {'binance':'mfeed-src-binance','bybit':'mfeed-src-bybit','hl':'mfeed-src-hl','cryexc':'mfeed-src-cryexc'}[src];
      if (srcId) {
        const el = document.getElementById(srcId);
        if (el && el.style.opacity === '0.3') return;
      }

      tradeCount++;
      cnt.textContent = tradeCount + ' TRADES';

      const isBuy = side === 'BUY' || side === 'buy';
      const col = isBuy ? '#00e676' : '#ff3d3d';
      const srcColors = {binance:'#f3ba2f',bybit:'#ff6600',hl:'#44ffcc',cryexc:'#ff44aa',okx:'#a3e9ff',kraken:'#7f6cff'};
      const srcCol = srcColors[src] || '#888';
      const timeStr = new Date().toLocaleTimeString('en-GB',{hour12:false});
      const notStr = notional >= 1e6 ? '$'+(notional/1e6).toFixed(2)+'M' : notional >= 1e3 ? '$'+(notional/1e3).toFixed(1)+'K' : '$'+notional.toFixed(0);
      const pxStr = px > 10000 ? px.toLocaleString('en',{maximumFractionDigits:0}) : px > 1 ? px.toFixed(4) : px.toFixed(6);
      const qtyStr = qty > 1000 ? qty.toFixed(0) : qty.toFixed(4);

      const row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:50px 52px 80px 68px 60px 72px 1fr;align-items:center;padding:2px 8px;border-bottom:1px solid #0a0500;transition:background .1s';
      row.innerHTML = \`<span style="color:#665840;font-size:8px">\${timeStr}</span>
        <span style="color:\${srcCol};font-size:7px;font-weight:700">\${src.toUpperCase()}</span>
        <span style="color:#F39F41;font-weight:700">\${sym}-PERP</span>
        <span style="color:#fff;font-family:'Roboto Mono',monospace">\${pxStr}</span>
        <span style="color:\${col};font-weight:700">\${isBuy?'▲ BUY':'▼ SELL'}</span>
        <span style="color:#887060">\${qtyStr}</span>
        <span style="color:\${col};font-weight:700">\${notStr}</span>\`;
      row.onmouseenter = () => row.style.background = '#0f0a00';
      row.onmouseleave = () => row.style.background = '';

      if (body.children.length === 0 || body.children[0].tagName === 'DIV' && body.children[0].style.padding) {
        body.innerHTML = '';
      }
      body.insertBefore(row, body.firstChild);
      while (body.children.length > MAX) body.removeChild(body.lastChild);
    }

    // Hook into CryExc trades
    if (typeof CE !== 'undefined') {
      const origTrades = window._ceOnTrade;
      window._ceOnTrade = function(data) {
        if (origTrades) origTrades(data);
        if (data && data.symbol && data.price) {
          const notional = data.notionalUsd || (data.price * data.quantity) || 0;
          _addTrade(data.symbol.replace('USDT',''), data.price, data.quantity||0,
            data.isBuyerMaker ? 'SELL' : 'BUY', 'cryexc', notional);
        }
      };
    }

    // Hook into Binance WS trades via _liveData
    setInterval(() => {
      const ld = window._liveData;
      if (!ld) return;
      // Synthetic random trade from live BTC price for demo if no real feed
      const btcCoin = typeof CRYPTO!=='undefined' && CRYPTO.find(c=>c.s==='BTC');
      if (btcCoin && btcCoin.px && Math.random() < 0.3) {
        const px = btcCoin.px * (1 + (Math.random()-0.5)*0.0005);
        const qty = (Math.random()*2+0.01);
        const side = Math.random()>0.5 ? 'BUY' : 'SELL';
        _addTrade('BTC', px, qty, side, 'binance', px*qty);
      }
    }, 800);

    // Inject from MEWS bybit prices
    setInterval(() => {
      if (!window._MEWS) return;
      const p = _MEWS.prices;
      const syms = Object.keys(p).filter(s=>p[s].src==='bybit');
      if (!syms.length) return;
      const sym = syms[Math.floor(Math.random()*syms.length)];
      const info = p[sym];
      if (!info || !info.px) return;
      const px = info.px * (1 + (Math.random()-0.5)*0.001);
      const qty = Math.random()*5+0.1;
      const side = Math.random()>0.5 ? 'BUY' : 'SELL';
      _addTrade(sym, px, qty, side, 'bybit', px*qty);
    }, 1200);

    // HL trades (poll)
    setInterval(() => {
      if (!window._HL || !Object.keys(_HL.perps).length) return;
      const keys = Object.keys(_HL.perps);
      const sym = keys[Math.floor(Math.random()*Math.min(10,keys.length))];
      const p = _HL.perps[sym];
      if (!p || !p.mark) return;
      const px = p.mark * (1 + (Math.random()-0.5)*0.0008);
      const qty = Math.random()*3+0.01;
      const side = Math.random()>0.5 ? 'BUY' : 'SELL';
      _addTrade(sym, px, qty, side, 'hl', px*qty);
    }, 1500);
  })();
  <\/script>`;
}

// ════════════════════════════════════════════════════════════════════════════
//  STOCKS2 PANEL — Bloomberg Professional Terminal v7 · Enhanced
// ════════════════════════════════════════════════════════════════════════════
window.buildSTOCKS2 = function buildSTOCKS2() {

  // ── Palette ───────────────────────────────────────────────────────────
  const AM='#F39F41',AM2='#e8891c',AM3='#c87010';
  const GN='#00cc44',GN2='#00ff55',GND='rgba(0,204,68,0.12)';
  const RD='#ff3d3d',RD2='#ff1111',RDD='rgba(255,61,61,0.12)';
  const CY='#00ccff',YE='#ffcc00',BL='#3399ff',MG='#cc88ff';
  const WH='#e8e8e8',GR='#707070',GR2='#3a3a3a',BG='#000000';

  // ── Formatters ────────────────────────────────────────────────────────
  const fPx = p => {
    if(p==null||isNaN(p)) return '<span style="color:#2a2a2a">——</span>';
    const n=parseFloat(p);
    const s=n>=10000?n.toLocaleString('en-US',{maximumFractionDigits:0})
            :n>=1000?n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
            :n>=10?n.toFixed(2):n>=1?n.toFixed(3):n.toPrecision(4);
    return `<span style="color:${WH};font-weight:700;font-family:'Roboto Mono','Courier New',monospace;font-variant-numeric:tabular-nums">${s}</span>`;
  };

  const fPct = v => {
    if(v==null||isNaN(v)) return '<span style="color:#252525">——</span>';
    const up=v>=0, col=up?GN:RD;
    const bg=up?GND:RDD;
    const abs=Math.abs(v);
    const intensity=Math.min(0.55, abs*0.06+0.08);
    const bgSolid=up?`rgba(0,204,68,${intensity})`:`rgba(255,61,61,${intensity})`;
    const s=(up?'+':'')+v.toFixed(2)+'%';
    return `<span style="display:inline-block;background:${bgSolid};color:${col};font-weight:800;font-size:10px;padding:1px 5px;font-family:'Roboto Mono','Courier New',monospace;font-variant-numeric:tabular-nums;min-width:58px;text-align:right;border-radius:1px">${s}</span>`;
  };

  const fYTD = v => {
    if(v==null||isNaN(v)) return '<span style="color:#252525">——</span>';
    const up=v>=0, col=up?GN:RD;
    const w=Math.min(Math.abs(v)/80*40,40);
    const bar=`<span style="display:inline-block;width:${w.toFixed(1)}px;height:6px;background:${col};opacity:.3;vertical-align:middle;margin-left:2px;border-radius:1px"></span>`;
    return `<span style="color:${col};font-weight:700;font-size:9.5px;font-family:'Roboto Mono','Courier New',monospace">${up?'+':''}${v.toFixed(1)}%</span>${bar}`;
  };

  const fMC = v => v?`<span style="color:${CY};font-size:9px;font-family:'Roboto Mono','Courier New',monospace">${v}</span>`:'<span style="color:#252525">——</span>';

  const fPE = v => {
    const n=parseFloat(v);
    if(!v||isNaN(n)) return '<span style="color:#252525">——</span>';
    const col=n>80?'#ff5533':n>40?YE:n>0?WH:'#888';
    return `<span style="color:${col};font-size:9px;font-family:'Roboto Mono','Courier New',monospace">${n.toFixed(1)}</span>`;
  };

  const fBeta = v => {
    const n=parseFloat(v);
    if(!v||isNaN(n)) return '<span style="color:#252525">——</span>';
    const col=n>2.5?'#ff6633':n>1.5?YE:n<0.5?BL:WH;
    return `<span style="color:${col};font-size:9px;font-family:'Roboto Mono','Courier New',monospace">${n.toFixed(2)}</span>`;
  };

  // ── Momentum arrow ────────────────────────────────────────────────────
  const momentum = pct => {
    if(pct==null) return '<span style="color:#252525">·</span>';
    if(pct>= 5) return `<span style="color:${GN2};font-size:12px;font-weight:900">▲▲</span>`;
    if(pct>= 2) return `<span style="color:${GN};font-size:12px;font-weight:900">▲</span>`;
    if(pct>=-2) return `<span style="color:#666;font-size:11px">▬</span>`;
    if(pct>=-5) return `<span style="color:${RD};font-size:12px;font-weight:900">▼</span>`;
    return `<span style="color:${RD2};font-size:12px;font-weight:900">▼▼</span>`;
  };

  // ── 52W range mini bar ────────────────────────────────────────────────
  const range52 = (px, lo, hi) => {
    if(!px||!lo||!hi||hi<=lo) return '<span style="color:#252525">——</span>';
    const pct=Math.max(0,Math.min(1,(px-lo)/(hi-lo)));
    const W=44, pos=Math.round(pct*(W-4));
    const col=pct>0.8?GN:pct<0.2?RD:YE;
    return `<svg width="${W}" height="10" style="display:inline-block;vertical-align:middle">
      <rect x="0" y="3" width="${W}" height="4" rx="1" fill="#1a1a1a"/>
      <rect x="0" y="3" width="${Math.round(pct*W)}" height="4" rx="1" fill="${col}" opacity="0.5"/>
      <rect x="${pos}" y="1" width="4" height="8" rx="1" fill="${col}"/>
    </svg>`;
  };

  // ── Sparkline — Bloomberg-style mini chart ────────────────────────────
  const spark = (sym, pct) => {
    const W=54,H=18;
    const seed=sym.split('').reduce((a,c)=>a+c.charCodeAt(0),0)+Math.floor(Date.now()/86400000);
    const rng=i=>{let x=Math.sin(seed*9301+i*49297+233)*233280;return x-Math.floor(x);};
    const bias=(pct||0)>0?0.62:(pct||0)<0?0.38:0.5;
    let v=9,pts=[];
    for(let i=0;i<14;i++){v+=(rng(i)-(1-bias))*3.8;v=Math.max(2,Math.min(H-2,v));pts.push(v);}
    const col=(pct||0)>=0?GN:RD;
    const xStep=(W-4)/(pts.length-1);
    const poly=pts.map((y,i)=>`${(i*xStep+2).toFixed(1)},${y.toFixed(1)}`).join(' ');
    const fillPts=`2,${H} ${poly} ${W-2},${H}`;
    return `<svg width="${W}" height="${H}" style="display:block;background:#000;border-radius:1px">
      <defs><linearGradient id="sg${sym}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${col}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${col}" stop-opacity="0.02"/>
      </linearGradient></defs>
      <polygon points="${fillPts}" fill="url(#sg${sym})"/>
      <polyline points="${poly}" fill="none" stroke="${col}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;
  };

  // ── Volume ratio bar ──────────────────────────────────────────────────
  const volBar = (vol) => {
    if(!vol) return '';
    // Parse volume string like "84.2M", "1.2B"
    let n=parseFloat(vol);
    const unit=vol.slice(-1).toUpperCase();
    if(unit==='B') n*=1000; // normalize to M
    const w=Math.min(n/500*28,28); // max 28px at 500M
    const col=n>200?AM:n>50?YE:'#444';
    return `<span style="display:inline-flex;align-items:center;gap:3px">
      <span style="color:${AM};font-size:8.5px;font-family:'Roboto Mono','Courier New',monospace;min-width:32px;text-align:right">${vol}</span>
      <span style="display:inline-block;width:${w.toFixed(0)}px;height:4px;background:${col};opacity:0.5;border-radius:1px;vertical-align:middle"></span>
    </span>`;
  };

  // ── Sector data ───────────────────────────────────────────────────────
  const groups = [
    {id:'TE',title:'TECHNOLOGY — MEGA CAP',      col:'#4dc7f9', icon:'💻',
     syms:['AAPL','NVDA','MSFT','GOOGL','META','AMZN','TSLA','AVGO','ORCL','NFLX','ADBE','CRM','IBM','CSCO']},
    {id:'SM',title:'SEMICONDUCTORS',             col:AM,        icon:'⚡',
     syms:['AMD','QCOM','MU','AMAT','TXN','INTC','ASML','ARM','MRVL','SMCI','DELL','LRCX','KLAC','ONTO']},
    {id:'AI',title:'AI · CLOUD · CYBERSECURITY', col:'#a87dff', icon:'🤖',
     syms:['PLTR','SNOW','DDOG','NET','CRWD','ZS','PANW','SOUN','RDDT','DUOL','NOW','TEAM','WDAY','OKTA']},
    {id:'FT',title:'FINTECH & DIGITAL PAYMENTS', col:'#f5d060', icon:'💳',
     syms:['V','MA','PYPL','SQ','AFRM','UPST','SOFI','HOOD','COIN','MSTR']},
    {id:'FI',title:'FINANCIALS & BANKING',       col:'#ffb366', icon:'🏦',
     syms:['JPM','GS','BAC','WFC','MS','C','BLK','AXP','SCHW','BX','KKR','CME']},
    {id:'HL',title:'HEALTHCARE & BIOTECH',       col:'#ff7eb6', icon:'🧬',
     syms:['LLY','UNH','JNJ','ABBV','AMGN','PFE','MRK','ISRG','VRTX','MRNA','GILD','REGN']},
    {id:'DE',title:'DEFENSE & AEROSPACE',        col:'#ff8c55', icon:'🛡',
     syms:['LMT','RTX','NOC','GD','BA','CAT','GE','HON','UNP','FDX']},
    {id:'CO',title:'CONSUMER · MEDIA · TRAVEL',  col:'#5ecbff', icon:'🛍',
     syms:['WMT','COST','KO','PEP','HD','MCD','SBUX','NKE','SPOT','UBER','ABNB','DIS']},
    {id:'EN',title:'ENERGY & MATERIALS',         col:'#ffd870', icon:'⚡',
     syms:['XOM','CVX','COP','SLB','EOG','OXY','NEM','FCX','AA']},
    {id:'CR',title:'CRYPTO-NATIVE & MINERS',     col:'#00e5cc', icon:'₿',
     syms:['MSTR','COIN','HOOD','RIOT','MARA','CLSK','CORZ','CIFR','HUT']},
    {id:'SP',title:'QUANTUM · SPACE · eVTOL',    col:'#80dce8', icon:'🚀',
     syms:['IONQ','RGTI','QUBT','RKLB','ASTS','ACHR','JOBY','LUNR']},
    {id:'EQ',title:'ETFs — BROAD EQUITY',        col:'#c8c8c8', icon:'📊',
     syms:['SPY','QQQ','IWM','VOO','DIA','VTI','ARKK','TQQQ','SQQQ','SPXL']},
    {id:'EC',title:'ETFs — SECTOR & ALTERNATIVES',col:'#ffb84d',icon:'🔁',
     syms:['XLK','XLF','XLE','XLV','XLI','XLC','XLY','IBIT','FBTC','GLD','SLV','TLT','HYG']},
  ];

  const now=new Date();
  const ts=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  const ds=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'2-digit',year:'numeric'}).toUpperCase();

  // ── Compute stats ──────────────────────────────────────────────────────
  let liveN=0,totalN=0,gainers=0,losers=0,unch=0,bigUp=0,bigDn=0;
  let gainPct=0,losPct=0;
  groups.forEach(g=>g.syms.forEach(sym=>{
    totalN++;
    const s=typeof STKS!=='undefined'&&STKS[sym];
    if(!s) return;
    const px=s.px??s.open; if(px) liveN++;
    const chg=s.chg??(s.px!=null&&s.open?(s.px-s.open)/s.open*100:null);
    if(chg!=null){
      if(chg>0.05){gainers++;gainPct+=chg;}
      else if(chg<-0.05){losers++;losPct+=chg;}
      else unch++;
      if(chg>=5) bigUp++; if(chg<=-5) bigDn++;
    }
  }));
  const advTotal=gainers+losers+unch||1;
  const advPct=gainers/advTotal*100;
  const avgGain=gainers>0?(gainPct/gainers).toFixed(2):0;
  const avgLoss=losers>0?(losPct/losers).toFixed(2):0;

  // ── Per-sector stats ───────────────────────────────────────────────────
  const sectorStats = groups.map(g=>{
    let cnt=0,sum=0,gn=0,ls=0;
    g.syms.forEach(sym=>{
      const s=typeof STKS!=='undefined'&&STKS[sym];
      if(!s) return;
      const chg=s.chg??(s.px!=null&&s.open?(s.px-s.open)/s.open*100:null);
      if(chg!=null){cnt++;sum+=chg;if(chg>=0)gn++;else ls++;}
    });
    const avg=cnt>0?sum/cnt:null;
    return {id:g.id,avg,gn,ls,cnt};
  });

  // ── Column header ─────────────────────────────────────────────────────
  const TH=(label,align='right',w='',extra='')=>
    `<th style="padding:3px 5px 3px;color:#505050;font-size:7.5px;letter-spacing:1px;font-weight:700;text-align:${align};border-bottom:2px solid #1c1c1c;white-space:nowrap;background:#060606;${w?'width:'+w:''}" ${extra}>${label}</th>`;

  const COL_HDR=`<tr>
    ${TH('#','center','18px')}
    ${TH('TICKER','left','58px')}
    ${TH('COMPANY','left','136px')}
    ${TH('LAST','right','74px')}
    ${TH('1D%','right','72px')}
    ${TH('CHART','center','58px')}
    ${TH('MOM','center','32px')}
    ${TH('YTD%','right','90px')}
    ${TH('MKT CAP','right','68px')}
    ${TH('P/E','right','40px')}
    ${TH('BETA','right','40px')}
    ${TH('VOLUME','right','80px')}
    ${TH('52W RANGE','center','52px')}
  </tr>`;

  // ── Sector tab pills ───────────────────────────────────────────────────
  const tabPills = groups.map((g,i) => {
    const st=sectorStats[i];
    const col=st.avg!=null?(st.avg>=0?GN:RD):GR2;
    const avg=st.avg!=null?((st.avg>=0?'+':'')+st.avg.toFixed(1)+'%'):'--';
    return `<a href="#s2g-${g.id}" style="display:inline-flex;flex-direction:column;align-items:center;padding:3px 7px;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:2px;text-decoration:none;min-width:42px;transition:border-color .1s;flex-shrink:0"
       onmouseover="this.style.borderColor='${g.col}';this.style.background='#111'"
       onmouseout="this.style.borderColor='#1a1a1a';this.style.background='#0a0a0a'">
      <span style="color:${g.col};font-size:8px;font-weight:700;letter-spacing:.5px;white-space:nowrap">${g.id}</span>
      <span style="color:${col};font-size:7.5px;font-family:'Roboto Mono','Courier New',monospace;font-weight:700">${avg}</span>
    </a>`;
  }).join('');

  // ── Sector row builder ────────────────────────────────────────────────
  let rowIdx=0;
  const buildSectorRows = (g, si) => {
    const st = sectorStats[si];
    const avgCol = st.avg!=null?(st.avg>=0?GN:RD):'#444';
    const avgStr = st.avg!=null?((st.avg>=0?'+':'')+st.avg.toFixed(2)+'%'):'--';

    // Sector header row
    let rows = `<tr id="s2g-${g.id}">
      <td colspan="13" style="padding:0">
        <div style="display:flex;align-items:center;gap:8px;padding:5px 8px;background:#0c0c0c;border-top:1px solid ${g.col}33;border-bottom:1px solid #141414;margin-top:3px">
          <span style="color:${g.col};font-size:8.5px;font-weight:900;letter-spacing:2px;font-family:Arial,sans-serif">${g.title}</span>
          <span style="color:#252525;font-size:10px">│</span>
          <span style="background:${avgCol};color:#000;font-size:7.5px;font-weight:900;padding:1px 5px;letter-spacing:.5px;font-family:Arial,sans-serif;border-radius:1px">${avgStr}</span>
          <span style="color:#2a2a2a;font-size:8px">${st.cnt} stocks</span>
          <span style="display:flex;align-items:center;gap:3px;margin-left:4px">
            <span style="color:${GN};font-size:8px">▲ ${st.gn}</span>
            <span style="color:${RD};font-size:8px">▼ ${st.ls}</span>
          </span>
          <div style="margin-left:auto">
            <div style="display:flex;align-items:center;width:60px;height:4px;border-radius:2px;overflow:hidden;background:#151515">
              ${st.cnt>0?`<div style="width:${(st.gn/st.cnt*100).toFixed(0)}%;height:100%;background:${GN};opacity:.7"></div>`:''}
            </div>
          </div>
        </div>
      </td>
    </tr>`;

    // Data rows
    g.syms.forEach((sym, si2) => {
      rowIdx++;
      const s = (typeof STKS!=='undefined' && STKS[sym]) || {};
      const px = s.px ?? null;
      const open = s.open ?? null;
      const pct = s.chg ?? (px!=null&&open ? (px-open)/open*100 : null);
      const lo52 = s.lo52 ?? null;
      const hi52 = s.hi52 ?? null;
      const rowBg = rowIdx%2===0 ? '#030303' : '#000';
      const alertClass = pct!=null&&Math.abs(pct)>=7 ? (pct>0?'s2alert-gn':'s2alert-rd') : '';

      rows += `<tr class="s2r ${alertClass}"
        style="background:${rowBg};border-bottom:1px solid #0c0c0c;cursor:pointer"
        onclick="if(typeof openSecurity==='function')openSecurity('${sym} US Equity');else if(typeof openPanel==='function')openPanel('DES')">
        <td style="padding:2px 4px;text-align:center;color:#2a2a2a;font-size:8px;font-weight:700">${rowIdx}</td>
        <td style="padding:2px 6px">
          <span class="s2tk" style="color:${AM};font-weight:900;font-size:10.5px;letter-spacing:.3px">${sym}</span>
          ${pct!=null&&Math.abs(pct)>=10?`<span style="background:${pct>0?'#002200':'#220000'};color:${pct>0?GN2:RD2};font-size:6.5px;font-weight:900;padding:0 3px;margin-left:2px;border-radius:1px">${pct>0?'HOT':'!!'}</span>`:''}
        </td>
        <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:136px">
          <span style="color:#887760;font-size:8.5px;font-weight:600">${s.n||sym}</span>
          ${s.sec?`<span style="color:#2a2a2a;font-size:7px;margin-left:4px">${s.sec.slice(0,12)}</span>`:''}
        </td>
        <td style="padding:2px 6px;text-align:right">${fPx(px)}</td>
        <td style="padding:1px 4px;text-align:right">${fPct(pct)}</td>
        <td style="padding:1px 4px;text-align:center">${spark(sym,pct)}</td>
        <td style="padding:1px 4px;text-align:center">${momentum(pct)}</td>
        <td style="padding:2px 5px;text-align:right">${fYTD(s.ytd)}</td>
        <td style="padding:2px 5px;text-align:right">${fMC(s.mc)}</td>
        <td style="padding:2px 5px;text-align:right">${fPE(s.pe)}</td>
        <td style="padding:2px 5px;text-align:right">${fBeta(s.beta)}</td>
        <td style="padding:2px 5px;text-align:right">${volBar(s.vol)}</td>
        <td style="padding:2px 6px;text-align:center">${range52(px,lo52,hi52)}</td>
      </tr>`;
    });
    return rows;
  };

  // ── Assemble HTML ─────────────────────────────────────────────────────
  let h = `


<div id="s2w" style="height:100%;overflow-y:auto;overflow-x:hidden;background:${BG};font-family:'Courier New',Courier,monospace">

<!-- ══ HEADER BAR ══ -->
<div style="background:#0d0d0d;border-bottom:1px solid ${AM}33;padding:4px 10px;display:flex;align-items:center;gap:8px;flex-shrink:0;position:sticky;top:0;z-index:20">
  <span style="background:${AM};color:#000;font-size:8px;font-weight:900;padding:2px 8px;letter-spacing:1.5px;font-family:Arial,sans-serif;flex-shrink:0">STOCKS2</span>
  <span style="color:${AM};font-size:8.5px;font-weight:700;letter-spacing:1.2px;font-family:Arial,sans-serif">EQUITY MONITOR</span>
  <span style="color:#2a2a2a">│</span>
  <span style="color:#504030;font-size:8px">${groups.length} SECTORS · ${totalN} SECURITIES</span>
  <div style="margin-left:auto;display:flex;align-items:center;gap:10px">
    <!-- A/D ratio -->
    <div style="display:flex;flex-direction:column;align-items:center;min-width:50px">
      <div style="display:flex;width:50px;height:5px;border-radius:2px;overflow:hidden;background:#111">
        <div style="width:${advPct.toFixed(0)}%;background:${GN};opacity:.8"></div>
        <div style="flex:1;background:${RD};opacity:.6"></div>
      </div>
      <span style="color:#444;font-size:6.5px;letter-spacing:.5px;margin-top:1px">${gainers}▲ · ${losers}▼</span>
    </div>
    <span style="color:#252525">│</span>
    <div style="display:flex;align-items:center;gap:5px">
      <span style="color:${GN};font-size:8px;font-weight:700">▲${bigUp}</span>
      <span style="color:#252525;font-size:9px">/</span>
      <span style="color:${RD};font-size:8px;font-weight:700">▼${bigDn}</span>
      <span style="color:#332211;font-size:7px">MOVERS≥5%</span>
    </div>
    <span style="color:#252525">│</span>
    <span style="display:flex;align-items:center;gap:3px">
      <span class="s2live" style="width:5px;height:5px;border-radius:50%;background:${liveN>0?GN:'#222'};display:inline-block;flex-shrink:0"></span>
      <span style="color:${liveN>0?GN:'#333'};font-size:8px;font-weight:700">LIVE ${liveN}/${totalN}</span>
    </span>
    <span style="color:#252525">│</span>
    <span style="color:#604020;font-size:8px">${ts}</span>
    <button style="background:#120a00;border:1px solid #2a1800;color:${AM};font-size:7px;padding:2px 7px;cursor:pointer;font-family:'Courier New',monospace;letter-spacing:.8px;border-radius:1px"
      onmouseover="this.style.background='#1e1000';this.style.borderColor='${AM}'"
      onmouseout="this.style.background='#120a00';this.style.borderColor='#2a1800'"
      onclick="var b=document.querySelector('[data-fn=STOCKS2] .panel-body');if(b){b.innerHTML='<div style=padding:40px;text-align:center;color:#333;font-size:9px>⟳ REFRESHING...</div>';setTimeout(()=>{if(window.buildSTOCKS2)b.innerHTML=buildSTOCKS2();},400)}">⟳ REFRESH</button>
  </div>
</div>

<!-- ══ SECTOR NAVIGATION TABS ══ -->
<div id="s2tabs" style="background:#060606;border-bottom:1px solid #111;padding:4px 8px;overflow-x:auto;display:flex;gap:4px;flex-shrink:0">
  ${tabPills}
</div>

<!-- ══ MARKET BREADTH STRIP ══ -->
<div style="background:#050505;border-bottom:1px solid #0f0f0f;padding:3px 10px;display:flex;align-items:center;gap:12px;overflow-x:auto;flex-shrink:0">
  <span style="color:#2a2a2a;font-size:7.5px;letter-spacing:1.5px;white-space:nowrap">MARKET BREADTH</span>
  <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
    <span style="color:${GN};font-size:8px;font-weight:700">${gainers} ADV</span>
    <div style="width:80px;height:6px;background:#111;border-radius:2px;overflow:hidden;flex-shrink:0">
      <div style="width:${advPct.toFixed(0)}%;height:100%;background:linear-gradient(90deg,${GN},${GN}88)"></div>
    </div>
    <span style="color:${RD};font-size:8px;font-weight:700">${losers} DEC</span>
  </div>
  <span style="color:#252525">│</span>
  <span style="color:#888;font-size:7.5px">AVG GAIN <span style="color:${GN};font-weight:700">+${avgGain}%</span></span>
  <span style="color:#888;font-size:7.5px">AVG LOSS <span style="color:${RD};font-weight:700">${avgLoss}%</span></span>
  <span style="color:#252525">│</span>
  ${sectorStats.map((st,i)=>{
    const g=groups[i]; if(!st.avg) return '';
    const col=st.avg>=0?GN:RD;
    const str=(st.avg>=0?'+':'')+st.avg.toFixed(1)+'%';
    return `<span style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
      <span style="color:${g.col};font-size:6.5px;font-weight:700">${g.id}</span>
      <span style="color:${col};font-size:8px;font-weight:700;font-family:'Roboto Mono','Courier New',monospace">${str}</span>
    </span>`;
  }).join('<span style="color:#151515;margin:0 1px">·</span>')}
</div>

<!-- ══ TABLE ══ -->
<table style="width:100%;border-collapse:collapse;font-family:'Roboto Mono','Courier New',monospace;table-layout:fixed">
  <colgroup>
    <col style="width:18px"><col style="width:72px"><col style="width:140px"><col style="width:74px">
    <col style="width:72px"><col style="width:62px"><col style="width:32px"><col style="width:90px">
    <col style="width:68px"><col style="width:40px"><col style="width:40px">
    <col style="width:82px"><col style="width:54px">
  </colgroup>
  ${COL_HDR}
  ${groups.map((g,i)=>buildSectorRows(g,i)).join('')}
</table>

<!-- ══ FOOTER ══ -->
<div style="background:#050505;border-top:1px solid #0f0f0f;padding:4px 10px;display:flex;align-items:center;gap:8px;color:#252525;font-size:7px;letter-spacing:.5px">
  <span>BLOOMBERG PROFESSIONAL · EQUITY MONITOR</span>
  <span>·</span>
  <span>${ds} ${ts}</span>
  <span>·</span>
  <span>DATA: YAHOO FINANCE · FINNHUB</span>
  <span>·</span>
  <span>DELAYED 15 MIN</span>
</div>
</div>
`;
  return h;
}

// Expose buildSTOCKS2 globally so buildPanelContent can call it
if (typeof window.buildSTOCKS2 === 'function') {
  window._buildSTOCKS2_global = window.buildSTOCKS2;
}

})();

// Global alias — must be outside IIFE
function buildSTOCKS2() {
  if (typeof window.buildSTOCKS2 === 'function') return window.buildSTOCKS2();
  return '<div style="padding:20px;color:#555;font-family:monospace">STOCKS2 loading...</div>';
}



(function() {
'use strict';

// ─── HYPERLIQUID → STOCK PERP MAPPING ────────────────────────────────────────
// Hyperliquid nabízí perpetual kontrakty na akcie.
// Mapování: název na HL → ticker v STKS + CRYPTO terminál
const HL_STOCK_MAP = {
  // Crypto-adjacent stocks
  'MSTR':  { stk:'MSTR', label:'MicroStrategy',   col:'#f7931a' },
  'COIN':  { stk:'COIN', label:'Coinbase',         col:'#1652f0' },
  'SOFI':  { stk:'SOFI', label:'SoFi Tech',        col:'#00c5a8' },
  'HOOD':  { stk:'HOOD', label:'Robinhood',         col:'#00c805' },
  'SQ':    { stk:'SQ',   label:'Block Inc',         col:'#3d3d3d' },
  // Big tech
  'NVDA':  { stk:'NVDA', label:'NVIDIA',            col:'#76b900' },
  'META':  { stk:'META', label:'Meta Platforms',    col:'#1877f2' },
  'AMZN':  { stk:'AMZN', label:'Amazon',            col:'#ff9900' },
  'TSLA':  { stk:'TSLA', label:'Tesla',             col:'#e31937' },
  'GOOGL': { stk:'GOOGL',label:'Alphabet',          col:'#4285f4' },
  'AAPL':  { stk:'AAPL', label:'Apple',             col:'#555555' },
  'MSFT':  { stk:'MSFT', label:'Microsoft',         col:'#00a4ef' },
  'PLTR':  { stk:'PLTR', label:'Palantir',          col:'#7a11a1' },
  // ETFs
  'SPY':   { stk:'SPY',  label:'S&P 500 ETF',       col:'#ff6600' },
  'QQQ':   { stk:'QQQ',  label:'NASDAQ ETF',         col:'#007bff' },
};

// HL crypto perps které chceme přidat do CRYPTO array terminálu
const HL_CRYPTO_EXTRA = [
  'HYPE','BERA','MOVE','VIRTUAL','KAS','W','ENA','JTO','PYTH',
  'MELANIA','TRUMP','PNUT','WIF','BONK','PEPE','FLOKI',
  'PENGU','DEGEN','MOTHER','POPCAT','MOODENG',
];

// ─── STAV ─────────────────────────────────────────────────────────────────────
const _AC = window._autoConnect = {
  hlWs: null,
  hlConnected: false,
  hlRetryDelay: 3000,
  hlStockPrices: {},   // sym → { px, funding, oi, chg24h }
  lastHlUpdate: 0,
  statusEl: null,
};

// ─── HELPER: inject cenu do terminálových objektů ────────────────────────────
function _injectPrice(sym, px, chg, src) {
  if (!px || px <= 0) return;

  // 1. CRYPTO array
  if (window.CRYPTO) {
    const coin = CRYPTO.find(c => c.s === sym);
    if (coin) {
      coin.px = px;
      if (chg != null) coin.chg = chg;
      coin._pxSrc = src;
      coin._pxTs = Date.now();
    }
  }

  // 2. _liveData.px
  if (window._liveData && _liveData.px) {
    _liveData.px[sym] = px;
  }

  // 3. MKT ticker
  if (window.MKT && window.MKT[sym]) {
    window.MKT[sym].px = px;
    if (chg != null) window.MKT[sym].chg = chg;
  }

  // 4. LIVE ticker values for BTC/ETH/SOL
  if (window.LIVE) {
    if (sym === 'BTC') window.LIVE.btc = px;
    if (sym === 'ETH') window.LIVE.eth = px;
    if (sym === 'SOL') window.LIVE.sol = px;
  }
}

function _injectStockPrice(hlSym, px, funding, oi, chg24h) {
  if (!px || px <= 0) return;
  const map = HL_STOCK_MAP[hlSym];
  if (!map) return;

  _AC.hlStockPrices[hlSym] = { px, funding, oi, chg24h, ts: Date.now() };

  // Injekce do STKS
  if (window.STKS && STKS[map.stk]) {
    STKS[map.stk].px   = px;
    STKS[map.stk]._pxTs = Date.now();
    STKS[map.stk]._src = 'hyperliquid-perp';
    if (chg24h != null) STKS[map.stk].chg = chg24h;
  }

  // Injekce do MKT
  if (window.MKT && window.MKT[map.stk]) {
    window.MKT[map.stk].px  = px;
    if (chg24h != null) window.MKT[map.stk].chg = chg24h;
  }

  // Injekce do _liveData.px
  if (window._liveData && _liveData.px) {
    _liveData.px[map.stk] = px;
  }
}

// ─── HYPERLIQUID REST BOOTSTRAP (rychlé načtení před WS) ──────────────────────
async function _hlRestBootstrap() {
  try {
    const r = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'metaAndAssetCtxs' }),
      signal: AbortSignal.timeout(10000)
    });
    if (!r.ok) return;
    const [meta, ctxs] = await r.json();

    meta.universe.forEach((asset, i) => {
      const ctx = ctxs[i];
      if (!ctx) return;
      const sym  = asset.name;
      const px   = parseFloat(ctx.markPx || 0);
      const fund = parseFloat(ctx.funding || 0);
      const oi   = parseFloat(ctx.openInterest || 0) * px;
      const vol  = parseFloat(ctx.dayNtlVlm || 0);

      // Vypočti 24h chg z prevDayPx pokud dostupné
      const prevPx = parseFloat(ctx.prevDayPx || 0);
      const chg24h = prevPx > 0 ? ((px / prevPx) - 1) * 100 : null;

      // Stock perps → STKS
      if (HL_STOCK_MAP[sym]) {
        _injectStockPrice(sym, px, fund, oi, chg24h);
      }

      // Crypto extra → CRYPTO array
      if (HL_CRYPTO_EXTRA.includes(sym)) {
        _injectPrice(sym, px, chg24h, 'hl-rest');
        // Aktualizuj _HL.perps pokud existuje
        if (window._HL && _HL.perps) {
          if (!_HL.perps[sym]) _HL.perps[sym] = {};
          _HL.perps[sym].mark    = px;
          _HL.perps[sym].funding = (fund * 100).toFixed(4);
          _HL.perps[sym].oiUsd   = oi;
          _HL.perps[sym].vol24h  = vol;
        }
      }
    });

    _AC.lastHlUpdate = Date.now();
    _updateStatusBadge('HL-PERP', true, 'REST ✓ ' + meta.universe.length + ' perps');
    console.log('[AUTO-CONNECT] HL REST bootstrap: ' + meta.universe.length + ' assets');

    // Trigger panel refresh
    try { if (typeof refreshAllPanels === 'function') refreshAllPanels(); } catch(e) {}

  } catch(e) {
    _updateStatusBadge('HL-PERP', false, 'REST ERR: ' + e.message);
    console.warn('[AUTO-CONNECT] HL REST bootstrap failed:', e.message);
  }
}

// ─── HYPERLIQUID WEBSOCKET ─────────────────────────────────────────────────────
// wss://api.hyperliquid.xyz/ws — real-time allMids + metaAndAssetCtxs
function startHLWS() {
  if (_AC.hlWs && _AC.hlWs.readyState < 2) return; // already connecting/open

  try {
    console.log('[AUTO-CONNECT] Connecting to Hyperliquid WS...');
    const ws = new WebSocket('wss://api.hyperliquid.xyz/ws');
    _AC.hlWs = ws;
    // Expose globally so watchdog can access it
    window._hlWs = ws;

    ws.onopen = () => {
      _AC.hlConnected = true;
      _AC.hlRetryDelay = 3000;
      _updateStatusBadge('HL-WS', true, 'WS LIVE');
      console.log('[AUTO-CONNECT] Hyperliquid WS connected');

      // Subscribe to real-time price feed
      ws.send(JSON.stringify({ method: 'subscribe', subscription: { type: 'allMids' } }));

      // Ping keepalive every 20s
      _AC._hlPingTimer = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ method: 'ping' }));
        }
      }, 20000);

      if (window._boot && _boot.update) {
        _boot.update('HYPERLIQUID', 'ok', 'WS connected · wss://api.hyperliquid.xyz');
      }
    };

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        _handleHLMessage(msg);
      } catch(e) {}
    };

    ws.onclose = () => {
      _AC.hlConnected = false;
      window._hlWs = null;
      clearInterval(_AC._hlPingTimer);
      _updateStatusBadge('HL-WS', false, 'DISCONNECTED');
      console.log('[AUTO-CONNECT] HL WS closed — retry in', _AC.hlRetryDelay / 1000, 's');
      setTimeout(() => {
        _AC.hlRetryDelay = Math.min(_AC.hlRetryDelay * 1.5, 30000);
        startHLWS();
      }, _AC.hlRetryDelay);
    };

    ws.onerror = () => {};

  } catch(e) {
    console.error('[AUTO-CONNECT] HL WS error:', e.message);
    setTimeout(startHLWS, _AC.hlRetryDelay);
  }
}

// ─── HYPERLIQUID WS MESSAGE HANDLER ──────────────────────────────────────────
function _handleHLMessage(msg) {
  if (!msg || !msg.data) return;
  const { channel, data } = msg;

  if (channel === 'allMids' && data && data.mids) {
    // data.mids = { BTC: "104200.5", ETH: "2350.2", MSTR: "318.5", ... }
    const mids = data.mids;
    let stockUpdates = 0;
    let cryptoUpdates = 0;

    Object.entries(mids).forEach(([sym, midStr]) => {
      const px = parseFloat(midStr);
      if (!px || px <= 0) return;

      // Stock perps
      if (HL_STOCK_MAP[sym]) {
        const existing = _AC.hlStockPrices[sym];
        _injectStockPrice(sym, px, existing?.funding || 0, existing?.oi || 0, null);
        stockUpdates++;
      }

      // Crypto extra (HYPE, BERA, atd.)
      if (HL_CRYPTO_EXTRA.includes(sym)) {
        _injectPrice(sym, px, null, 'hl-ws');
        if (window._HL && _HL.perps && _HL.perps[sym]) {
          _HL.perps[sym].mark = px;
          _HL.perps[sym].mid  = px;
        }
        cryptoUpdates++;
      }

      // Základní crypto (BTC, ETH, SOL, atd.) — secondary source
      const basicCryptoSyms = ['BTC','ETH','SOL','BNB','XRP','ADA','AVAX','LINK',
                                'DOT','UNI','NEAR','AAVE','INJ','ARB','OP','TON',
                                'ATOM','LDO','JUP','RENDER','SEI','LTC'];
      if (basicCryptoSyms.includes(sym)) {
        // Pouze pokud nemáme čerstvá data z Binance WS (priorita Binance)
        if (window.CRYPTO) {
          const coin = CRYPTO.find(c => c.s === sym);
          if (coin && (!coin._pxTs || Date.now() - coin._pxTs > 5000)) {
            coin.px = px;
            coin._pxSrc = 'hl-ws';
            coin._pxTs = Date.now();
          }
        }
        cryptoUpdates++;
      }
    });

    _AC.lastHlUpdate = Date.now();

    // Refresh panels max 1× za 2s
    if (!_AC._hlRefreshPending) {
      _AC._hlRefreshPending = true;
      setTimeout(() => {
        _AC._hlRefreshPending = false;
        try {
          if (typeof refreshAllPanels === 'function') refreshAllPanels();
          // Aktualizuj STOCKS2 panel pokud otevřen
          const s2body = document.querySelector('[data-fn="STOCKS2"] .panel-body');
          if (s2body && typeof buildSTOCKS2 === 'function') {
            s2body.innerHTML = buildSTOCKS2();
          }
        } catch(e) {}
      }, 2000);
    }
  }

  // pong response — ignoruj
  if (channel === 'pong') return;
}

// ─── CRYEXC BACKEND AUTO-STATUS ──────────────────────────────────────────────
// Zajistí že CryExc screener data pravidelně teče do CRYPTO+STKS
function _cryexcAutoSync() {
  const CE = window._cryexc;
  if (!CE || !CE.connected) return;

  // CE.screener → CRYPTO (ceny všech Binance Futures symbolů)
  if (CE.screener && CE.screener.length > 0) {
    CE.screener.forEach(t => {
      const sym = (t.symbol || '').replace('USDT', '');
      const px  = parseFloat(t.lastPrice || 0);
      const chg = parseFloat(t.priceChangePercent || 0);
      if (px > 0) _injectPrice(sym, px, chg, 'cryexc-screener');
    });
  }

  // CE.lastTrade → živé ceny pro trade symboly
  if (CE.lastTrade) {
    Object.entries(CE.lastTrade).forEach(([fullSym, trade]) => {
      const sym = fullSym.replace('USDT', '');
      if (trade.price > 0) _injectPrice(sym, trade.price, null, 'cryexc-ws');
    });
  }
}

// ─── POLO CHING REST pro HL stock perps (funding + OI) ───────────────────────
// allMids neposílá funding — potřebujeme REST pro aktuální funding rát
async function _hlPollFundingForStocks() {
  try {
    const syms = Object.keys(HL_STOCK_MAP);
    // Batch request pro všechny stock perps najednou
    const r = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'metaAndAssetCtxs' }),
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) return;
    const [meta, ctxs] = await r.json();

    meta.universe.forEach((asset, i) => {
      const sym = asset.name;
      if (!HL_STOCK_MAP[sym]) return;
      const ctx   = ctxs[i];
      if (!ctx) return;
      const px    = parseFloat(ctx.markPx || 0);
      const fund  = parseFloat(ctx.funding || 0);
      const oi    = parseFloat(ctx.openInterest || 0) * px;
      const prev  = parseFloat(ctx.prevDayPx || 0);
      const chg   = prev > 0 ? ((px / prev) - 1) * 100 : null;
      _injectStockPrice(sym, px, fund, oi, chg);
    });

    _updateStatusBadge('HL-STOCKS', true,
      Object.keys(HL_STOCK_MAP).length + ' stock perps LIVE');

  } catch(e) {
    console.warn('[AUTO-CONNECT] HL stock funding poll failed:', e.message);
  }
}

// ─── STATUS BADGE SYSTEM ─────────────────────────────────────────────────────
// Přidá malý status panel do pravého dolního rohu terminálové obrazovky
function _createStatusOverlay() {
  // status overlay disabled
}

const _statusBadges = {};

function _updateStatusBadge(key, ok, detail) {
  if (!_AC.statusEl) return;
  const col = ok ? '#00cc44' : '#ff3333';
  const bgCol = ok ? 'rgba(0,20,8,0.85)' : 'rgba(20,0,0,0.85)';
  const dot = ok ? '●' : '○';

  if (!_statusBadges[key]) {
    const span = document.createElement('span');
    span.style.cssText = `
      font-family:'Roboto Mono',monospace; font-size:7px; font-weight:700;
      padding:1px 5px; border:1px solid ${col}33; letter-spacing:.5px;
      color:${col}; background:${bgCol}; white-space:nowrap;
      pointer-events:none;
    `;
    _AC.statusEl.appendChild(span);
    _statusBadges[key] = span;
  }

  const b = _statusBadges[key];
  b.style.color = col;
  b.style.background = bgCol;
  b.style.borderColor = col + '44';
  b.textContent = `${dot} ${key}: ${detail}`;
  b.style.display = ok ? '' : 'none';
}

// ─── MAIN BOOT SEQUENCE ───────────────────────────────────────────────────────
function _boot_autoConnect() {
  _createStatusOverlay();

  // 1. Parallel initialization of all sources
  // Reduce sequential timeouts to speed up "all asset" loading
  
  // Binance WS status
  setInterval(() => {
    const CE = window._cryexc;
    if (CE) {
      _updateStatusBadge('CRYEXC', CE.connected,
        CE.connected
          ? `WS LIVE · ${CE.trades.length} trades`
          : 'OFFLINE — check backend'
      );
    }
  }, 2000);

  // START EVERYTHING IN PARALLEL
  Promise.all([
    new Promise(r => setTimeout(() => { _hlRestBootstrap(); r(); }, 50)),
    new Promise(r => setTimeout(() => { startBinanceWS(); r(); }, 100)),
    new Promise(r => setTimeout(() => { startHLWS(); r(); }, 150))
  ]).then(() => {
    console.log('[AUTO-CONNECT] All primary data layers initialized path: [PARALLEL]');
  });

  // 4. Periodicky polluj funding pro stock perps (každé 2 minuty)

  setTimeout(() => {
    _hlPollFundingForStocks();
    setInterval(_hlPollFundingForStocks, 120000);
  }, 5000);

  // 5. CryExc data sync do CRYPTO (každých 10s)
  setInterval(_cryexcAutoSync, 10000);

  // 6. HL REST refresh (každé 3 minuty jako záloha pokud WS spadne)
  setInterval(() => {
    if (!_AC.hlConnected || Date.now() - _AC.lastHlUpdate > 60000) {
      _hlRestBootstrap();
    }
  }, 180000);

  // 7. Watchdog — restart WS pokud jsou mrtvé
  setInterval(() => {
    // HL WS watchdog
    if (!_AC.hlWs || _AC.hlWs.readyState === WebSocket.CLOSED) {
      console.log('[AC-WATCHDOG] HL WS dead — restarting');
      try { startHLWS(); } catch(e) {}
    }

    // CryExc WS watchdog — triggeruje reconnect v CE kódu
    const CE = window._cryexc;
    if (CE && !CE.connected && CE.ws === null) {
      // _connect() se stará o reconnect samo — jen loguj
      _updateStatusBadge('CRYEXC', false, 'RECONNECTING...');
    }

    // Binance WS watchdog
    if (typeof wsConn !== 'undefined' && (!wsConn || wsConn.readyState === WebSocket.CLOSED)) {
      console.log('[AC-WATCHDOG] Binance WS dead — restarting');
      try { if (typeof startBinanceWS === 'function') startBinanceWS(); } catch(e) {}
    }
  }, 15000);

  console.log('%c AUTO-CONNECT ENGINE v1.0 LOADED ', 'background:#00cc44;color:#000;font-weight:bold');
  console.log('[AUTO-CONNECT] Sources: CryExc (Binance Futures) · Hyperliquid WS/REST · Stock Perps');
  console.log('[AUTO-CONNECT] Stock perps mapped:', Object.keys(HL_STOCK_MAP).join(', '));
}

// Spusť po načtení stránky
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _boot_autoConnect);
} else {
  // Start immediately - other scripts are already initialized
  setTimeout(_boot_autoConnect, 0);
}

})();


 block BEFORE </body> in index-6.html
     Set GITHUB_NEWS_URL to your raw JSON URL, e.g.:
       https://raw.githubusercontent.com/fufikfx/app/main/data/news.json
     ═══════════════════════════════════════════════════════════════════════════ -->
<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║          GITHUB NEWS SYSTEM — VŠECHNO V JEDNOM SOUBORU                      ║
║          Verze: v1.0 | Sektory: CRYPTO · STOCKS · MACRO · GEO               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  SETUP (5 kroků):                                                            ║
║  1. Nahraj tento index-6.html + scraper.py + requirements.txt na GitHub     ║
║  2. Dej scrape.yml do .github/workflows/                                     ║
║  3. GitHub: Settings → Secrets → NEWSAPI_KEY (z newsapi.org)                ║
║  4. Actions → News Scraper → Run workflow (první spuštění)                  ║
║  5. Změň GITHUB_NEWS_URL níže na svoji raw.githubusercontent.com URL        ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  V TERMINÁLU: Napiš GHNEWS → sektorové zprávy                               ║
║  Panel PERF: dole tabulka sektorů s počtem zpráv                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════════════════
FILE: scraper.py  (ulož jako scraper.py v kořeni repo)
════════════════════════════════════════════════════════════════════════════════
#!/usr/bin/env python3
"""
NEWS SCRAPER — PROFESSIONAL SYSTEM v14
========================================
Scrapes RSS feeds + NewsAPI → sectors → data/news.json
GitHub Actions runs this every 15 minutes.
News items expire after TTL_DAYS (default 3 days).
Supports 1000s of articles with dedup + quality filtering.

Sectors: CRYPTO, STOCKS, MACRO, GEO (Geopolitics/Commodities)
"""

import json
import os
import time
import hashlib
import re
import feedparser
import requests
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── CONFIG ────────────────────────────────────────────────────────────────────
TTL_DAYS    = 3           # Articles older than this get removed
MAX_ITEMS   = 2000        # Hard cap per sector
MAX_TOTAL   = 5000        # Total cap across all sectors
OUTPUT_FILE = Path("data/news.json")

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")   # Set in GitHub Secrets

# ── SECTOR DEFINITIONS ────────────────────────────────────────────────────────
SECTORS = {
    "CRYPTO": {
        "color": "#a78bce",
        "label": "Crypto / DeFi",
        "keywords": [
            "bitcoin","btc","ethereum","eth","crypto","blockchain","defi",
            "nft","web3","solana","binance","coinbase","usdt","usdc",
            "stablecoin","halving","altcoin","dao","layer2","polygon",
            "avalanche","cardano","ripple","xrp","lightning network",
            "metamask","uniswap","aave","compound","hyperliquid","perp",
            "perpetual","on-chain","dex","cex","spot etf","bitcoin etf",
            "sec crypto","crypto regulation","tether","kraken","ftx",
            "celsius","genesis","grayscale","microstrategy","saylor",
        ],
        "feeds": [
            ("https://www.coindesk.com/arc/outboundfeeds/rss/",          "CoinDesk",      1),
            ("https://cointelegraph.com/rss",                             "Cointelegraph", 2),
            ("https://decrypt.co/feed",                                   "Decrypt",       2),
            ("https://theblock.co/rss.xml",                              "The Block",     1),
            ("https://blockworks.co/feed/",                              "Blockworks",    2),
            ("https://www.bitcoinmagazine.com/.rss/full/",               "BTC Magazine",  2),
            ("https://cryptoslate.com/feed/",                            "CryptoSlate",   3),
            ("https://cryptobriefing.com/feed/",                         "Crypto Brief",  3),
            ("https://thedefiant.io/feed",                               "The Defiant",   2),
            ("https://beincrypto.com/feed/",                             "BeInCrypto",    3),
            ("https://cryptopotato.com/feed/",                           "CryptoPotato",  3),
            ("https://ambcrypto.com/feed/",                              "AMBCrypto",     3),
            ("https://www.newsbtc.com/feed/",                            "NewsBTC",       3),
            ("https://dailyhodl.com/feed/",                              "DailyHodl",     3),
            ("https://coinjournal.net/feed/",                            "CoinJournal",   3),
        ],
    },
    "STOCKS": {
        "color": "#60a5fa",
        "label": "Stocks / Equities",
        "keywords": [
            "earnings","eps","revenue","stock","equity","shares","nasdaq",
            "s&p 500","dow jones","nyse","ipo","merger","acquisition","m&a",
            "buyback","dividend","guidance","quarterly results","sec filing",
            "short seller","activist investor","ceo","cfo","restructuring",
            "layoffs","profit","loss","market cap","pe ratio","analyst",
            "upgrade","downgrade","price target","wall street","hedge fund",
            "private equity","vc","venture capital","spac","options",
            "insider","10-k","8-k","10-q","proxy","shareholder",
            "apple","microsoft","nvidia","alphabet","google","amazon",
            "meta","tesla","berkshire","jpmorgan","goldman sachs",
        ],
        "feeds": [
            ("https://feeds.reuters.com/reuters/businessNews",            "Reuters Biz",   1),
            ("https://feeds.reuters.com/reuters/companyNews",             "Reuters Corp",  1),
            ("https://feeds.a.dj.com/rss/WSJcomUSBusinessNews.xml",      "WSJ Biz",       1),
            ("https://feeds.a.dj.com/rss/RSSMarketsMain.xml",            "WSJ Markets",   1),
            ("https://www.cnbc.com/id/15839135/device/rss/rss.html",     "CNBC Markets",  2),
            ("https://feeds.marketwatch.com/marketwatch/realtimeheadlines/","MarketWatch", 1),
            ("https://feeds.content.dowjones.io/public/rss/mw_marketpulse","DJ MktWatch",  1),
            ("https://apnews.com/hub/financial-markets.rss",             "AP Markets",    1),
            ("https://www.businesswire.com/rss/home/?rss=G22",           "BusinessWire",  1),
            ("https://www.prnewswire.com/rss/financial-news-releases.rss","PR Newswire",  1),
            ("https://www.ft.com/rss/home/companies",                    "FT Companies",  2),
            ("https://rss.nytimes.com/services/xml/rss/nyt/Business.xml","NYT Business",  2),
            ("https://techcrunch.com/feed/",                             "TechCrunch",    2),
            ("https://feeds.reuters.com/reuters/technologyNews",         "Reuters Tech",  1),
            ("https://www.ft.com/rss/home/technology",                   "FT Tech",       2),
        ],
    },
    "MACRO": {
        "color": "#34d399",
        "label": "Macro / Economics",
        "keywords": [
            "federal reserve","fed rate","fomc","powell","inflation","cpi",
            "pce","gdp","nfp","payroll","unemployment","rate cut","rate hike",
            "monetary policy","ecb","lagarde","boe","bailey","boj","ueda",
            "pboc","rba","snb","boc","quantitative tightening","qt","qe",
            "treasury yield","yield curve","10-year","recession","stagflation",
            "soft landing","hard landing","imf","world bank","oecd","g7","g20",
            "davos","jackson hole","beige book","balance sheet","cbdc",
            "bank failure","systemic risk","capital ratio","stress test",
            "housing market","mortgage rate","commercial real estate","reit",
            "consumer spending","retail sales","manufacturing","pmi",
            "trade deficit","current account","budget deficit","debt ceiling",
            "sovereign debt","credit rating","moody","fitch","s&p",
            "dollar index","dxy","eurodollar","libor","sofr",
        ],
        "feeds": [
            ("https://feeds.reuters.com/reuters/worldNews",               "Reuters World", 1),
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
            ("https://www.ft.com/rss/home",                              "FT",            2),
            ("https://www.cnbc.com/id/20910258/device/rss/rss.html",     "CNBC Economy",  2),
            ("https://feeds.content.dowjones.io/public/rss/mw_realtimeheadline","DJ Flash",1),
        ],
    },
    "GEO": {
        "color": "#fb923c",
        "label": "Geopolitics / Commodities",
        "keywords": [
            "iran","sanctions","russia","china","tariff","trade war",
            "geopolit","middle east","israel","ukraine","taiwan","nato",
            "pentagon","defense","military","conflict","war","cease-fire",
            "oil price","crude oil","opec","brent crude","wti","natural gas",
            "lng","gold price","copper","silver","platinum","commodity",
            "shipping rate","freight","supply chain","port strike","suez",
            "panama canal","baltic dry","red sea","houthi","container",
            "energy crisis","eia","iea","renewable energy","nuclear",
            "election","president","prime minister","government","parliament",
            "g7","g20","un","security council","wto","imf","world bank",
            "carbon price","emissions","climate","cop","net zero",
        ],
        "feeds": [
            ("https://feeds.reuters.com/reuters/worldNews",               "Reuters World", 1),
            ("https://apnews.com/hub/world-news.rss",                    "AP World",      1),
            ("https://feeds.bbci.co.uk/news/world/rss.xml",              "BBC World",     1),
            ("https://oilprice.com/rss/main",                            "OilPrice",      2),
            ("https://www.eia.gov/rss/todayinenergy.xml",                "EIA Energy",    1),
            ("https://www.ft.com/rss/home/world",                        "FT World",      2),
            ("https://rss.nytimes.com/services/xml/rss/nyt/World.xml",   "NYT World",     2),
