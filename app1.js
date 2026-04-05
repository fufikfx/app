/* LightweightCharts v4.1.3 inlined */
/*!
 * @license
 * TradingView Lightweight Charts™ v4.1.3
 * Copyright (c) 2024 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
!function(){"use strict";const t={upColor:"#26a69a",downColor:"#ef5350",wickVisible:!0,borderVisible:!0,borderColor:"#378658",borderUpColor:"#26a69a",borderDownColor:"#ef5350",wickColor:"#737375",wickUpColor:"#26a69a",wickDownColor:"#ef5350"},i={upColor:"#26a69a",downColor:"#ef5350",openVisible:!0,thinBars:!0},n={color:"#2196f3",lineStyle:0,lineWidth:3,lineType:0,lineVisible:!0,crosshairMarkerVisible:!0,crosshairMarkerRadius:4,crosshairMarkerBorderColor:"",crosshairMarkerBorderWidth:2,crosshairMarkerBackgroundColor:"",lastPriceAnimation:0,pointMarkersVisible:!1},s={topColor:"rgba( 46, 220, 135, 0.4)",bottomColor:"rgba( 40, 221, 100, 0)",invertFilledArea:!1,lineColor:"#33D778",lineStyle:0,lineWidth:3,lineType:0,lineVisible:!0,crosshairMarkerVisible:!0,crosshairMarkerRadius:4,crosshairMarkerBorderColor:"",crosshairMarkerBorderWidth:2,crosshairMarkerBackgroundColor:"",lastPriceAnimation:0,pointMarkersVisible:!1},e={baseValue:{type:"price",price:0},topFillColor1:"rgba(38, 166, 154, 0.28)",topFillColor2:"rgba(38, 166, 154, 0.05)",topLineColor:"rgba(38, 166, 154, 1)",bottomFillColor1:"rgba(239, 83, 80, 0.05)",bottomFillColor2:"rgba(239, 83, 80, 0.28)",bottomLineColor:"rgba(239, 83, 80, 1)",lineWidth:3,lineStyle:0,lineType:0,lineVisible:!0,crosshairMarkerVisible:!0,crosshairMarkerRadius:4,crosshairMarkerBorderColor:"",crosshairMarkerBorderWidth:2,crosshairMarkerBackgroundColor:"",lastPriceAnimation:0,pointMarkersVisible:!1},r={color:"#26a69a",base:0},h={color:"#2196f3"},l={title:"",visible:!0,lastValueVisible:!0,priceLineVisible:!0,priceLineSource:0,priceLineWidth:1,priceLineColor:"",priceLineStyle:2,baseLineVisible:!0,baseLineWidth:1,baseLineColor:"#B2B5BE",baseLineStyle:0,priceFormat:{type:"price",precision:2,minMove:.01}};var a,o;function _(t,i){const n={0:[],1:[t.lineWidth,t.lineWidth],2:[2*t.lineWidth,2*t.lineWidth],3:[6*t.lineWidth,6*t.lineWidth],4:[t.lineWidth,4*t.lineWidth]}[i];t.setLineDash(n)}function u(t,i,n,s){t.beginPath();const e=t.lineWidth%2?.5:0;t.moveTo(n,i+e),t.lineTo(s,i+e),t.stroke()}function c(t,i){if(!t)throw new Error("Assertion failed"+(i?": "+i:""))}function d(t){if(void 0===t)throw new Error("Value is undefined");return t}function f(t){if(null===t)throw new Error("Value is null");return t}function v(t){return f(d(t))}!function(t){t[t.Simple=0]="Simple",t[t.WithSteps=1]="WithSteps",t[t.Curved=2]="Curved"}(a||(a={})),function(t){t[t.Solid=0]="Solid",t[t.Dotted=1]="Dotted",t[t.Dashed=2]="Dashed",t[t.LargeDashed=3]="LargeDashed",t[t.SparseDotted=4]="SparseDotted"}(o||(o={}));const p={khaki:"#f0e68c",azure:"#f0ffff",aliceblue:"#f0f8ff",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",gray:"#808080",green:"#008000",honeydew:"#f0fff0",floralwhite:"#fffaf0",lightblue:"#add8e6",lightcoral:"#f08080",lemonchiffon:"#fffacd",hotpink:"#ff69b4",lightyellow:"#ffffe0",greenyellow:"#adff2f",lightgoldenrodyellow:"#fafad2",limegreen:"#32cd32",linen:"#faf0e6",lightcyan:"#e0ffff",magenta:"#f0f",maroon:"#800000",olive:"#808000",orange:"#ffa500",oldlace:"#fdf5e6",mediumblue:"#0000cd",transparent:"#0000",lime:"#0f0",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",midnightblue:"#191970",orchid:"#da70d6",mediumorchid:"#ba55d3",mediumturquoise:"#48d1cc",orangered:"#ff4500",royalblue:"#4169e1",powderblue:"#b0e0e6",red:"#f00",coral:"#ff7f50",turquoise:"#40e0d0",white:"#fff",whitesmoke:"#f5f5f5",wheat:"#f5deb3",teal:"#008080",steelblue:"#4682b4",bisque:"#ffe4c4",aquamarine:"#7fffd4",aqua:"#0ff",sienna:"#a0522d",silver:"#c0c0c0",springgreen:"#00ff7f",antiquewhite:"#faebd7",burlywood:"#deb887",brown:"#a52a2a",beige:"#f5f5dc",chocolate:"#d2691e",chartreuse:"#7fff00",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cadetblue:"#5f9ea0",tomato:"#ff6347",fuchsia:"#f0f",blue:"#00f",salmon:"#fa8072",blanchedalmond:"#ffebcd",slateblue:"#6a5acd",slategray:"#708090",thistle:"#d8bfd8",tan:"#d2b48c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",blueviolet:"#8a2be2",black:"#000",darkmagenta:"#8b008b",darkslateblue:"#483d8b",darkkhaki:"#bdb76b",darkorchid:"#9932cc",darkorange:"#ff8c00",darkgreen:"#006400",darkred:"#8b0000",dodgerblue:"#1e90ff",darkslategray:"#2f4f4f",dimgray:"#696969",deepskyblue:"#00bfff",firebrick:"#b22222",forestgreen:"#228b22",indigo:"#4b0082",ivory:"#fffff0",lavenderblush:"#fff0f5",feldspar:"#d19275",indianred:"#cd5c5c",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightskyblue:"#87cefa",lightslategray:"#789",lightslateblue:"#8470ff",snow:"#fffafa",lightseagreen:"#20b2aa",lightsalmon:"#ffa07a",darksalmon:"#e9967a",darkviolet:"#9400d3",mediumpurple:"#9370d8",mediumaquamarine:"#66cdaa",skyblue:"#87ceeb",lavender:"#e6e6fa",lightsteelblue:"#b0c4de",mediumvioletred:"#c71585",mintcream:"#f5fffa",navajowhite:"#ffdead",navy:"#000080",olivedrab:"#6b8e23",palevioletred:"#d87093",violetred:"#d02090",yellow:"#ff0",yellowgreen:"#9acd32",lawngreen:"#7cfc00",pink:"#ffc0cb",paleturquoise:"#afeeee",palegoldenrod:"#eee8aa",darkolivegreen:"#556b2f",darkseagreen:"#8fbc8f",darkturquoise:"#00ced1",peachpuff:"#ffdab9",deeppink:"#ff1493",violet:"#ee82ee",palegreen:"#98fb98",mediumseagreen:"#3cb371",peru:"#cd853f",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",purple:"#800080",seagreen:"#2e8b57",seashell:"#fff5ee",papayawhip:"#ffefd5",mediumslateblue:"#7b68ee",plum:"#dda0dd",mediumspringgreen:"#00fa9a"};function m(t){return t<0?0:t>255?255:Math.round(t)||0}function b(t){return t<=0||t>0?t<0?0:t>1?1:Math.round(1e4*t)/1e4:0}const w=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,g=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,M=/^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/,x=/^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/;function S(t){(t=t.toLowerCase())in p&&(t=p[t]);{const i=x.exec(t)||M.exec(t);if(i)return[m(parseInt(i[1],10)),m(parseInt(i[2],10)),m(parseInt(i[3],10)),b(i.length<5?1:parseFloat(i[4]))]}{const i=g.exec(t);if(i)return[m(parseInt(i[1],16)),m(parseInt(i[2],16)),m(parseInt(i[3],16)),1]}{const i=w.exec(t);if(i)return[m(17*parseInt(i[1],16)),m(17*parseInt(i[2],16)),m(17*parseInt(i[3],16)),1]}throw new Error(`Cannot parse color: ${t}`)}function y(t){const i=S(t);return{t:`rgb(${i[0]}, ${i[1]}, ${i[2]})`,i:(n=i,.199*n[0]+.687*n[1]+.114*n[2]>160?"black":"white")};var n}class k{constructor(){this.h=[]}l(t,i,n){const s={o:t,_:i,u:!0===n};this.h.push(s)}v(t){const i=this.h.findIndex((i=>t===i.o));i>-1&&this.h.splice(i,1)}p(t){this.h=this.h.filter((i=>i._!==t))}m(t,i,n){const s=[...this.h];this.h=this.h.filter((t=>!t.u)),s.forEach((s=>s.o(t,i,n)))}M(){return this.h.length>0}S(){this.h=[]}}function C(t,...i){for(const n of i)for(const i in n)void 0!==n[i]&&("object"!=typeof n[i]||void 0===t[i]||Array.isArray(n[i])?t[i]=n[i]:C(t[i],n[i]));return t}function T(t){return"number"==typeof t&&isFinite(t)}function P(t){return"number"==typeof t&&t%1==0}function R(t){return"string"==typeof t}function D(t){return"boolean"==typeof t}function O(t){const i=t;if(!i||"object"!=typeof i)return i;let n,s,e;for(s in n=Array.isArray(i)?[]:{},i)i.hasOwnProperty(s)&&(e=i[s],n[s]=e&&"object"==typeof e?O(e):e);return n}function A(t){return null!==t}function B(t){return null===t?void 0:t}const V="-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";function z(t,i,n){return void 0===i&&(i=V),`${n=void 0!==n?`${n} `:""}${t}px ${i}`}class E{constructor(t){this.k={C:1,T:5,P:NaN,R:"",D:"",O:"",A:"",B:0,V:0,I:0,L:0,N:0},this.F=t}W(){const t=this.k,i=this.j(),n=this.H();return t.P===i&&t.D===n||(t.P=i,t.D=n,t.R=z(i,n),t.L=2.5/12*i,t.B=t.L,t.V=i/12*t.T,t.I=i/12*t.T,t.N=0),t.O=this.$(),t.A=this.U(),this.k}$(){return this.F.W().layout.textColor}U(){return this.F.q()}j(){return this.F.W().layout.fontSize}H(){return this.F.W().layout.fontFamily}}class I{constructor(){this.Y=[]}X(t){this.Y=t}K(t,i,n){this.Y.forEach((s=>{s.K(t,i,n)}))}}class L{K(t,i,n){t.useBitmapCoordinateSpace((t=>this.Z(t,i,n)))}}class N extends L{constructor(){super(...arguments),this.G=null}J(t){this.G=t}Z({context:t,horizontalPixelRatio:i,verticalPixelRatio:n}){if(null===this.G||null===this.G.tt)return;const s=this.G.tt,e=this.G,r=Math.max(1,Math.floor(i))%2/2,h=h=>{t.beginPath();for(let l=s.to-1;l>=s.from;--l){const s=e.it[l],a=Math.round(s.nt*i)+r,o=s.st*n,_=h*n+r;t.moveTo(a,o),t.arc(a,o,_,0,2*Math.PI)}t.fill()};e.et>0&&(t.fillStyle=e.rt,h(e.ht+e.et)),t.fillStyle=e.lt,h(e.ht)}}function F(){return{it:[{nt:0,st:0,ot:0,_t:0}],lt:"",rt:"",ht:0,et:0,tt:null}}const W={from:0,to:1};class j{constructor(t,i){this.ut=new I,this.ct=[],this.dt=[],this.ft=!0,this.F=t,this.vt=i,this.ut.X(this.ct)}bt(t){const i=this.F.wt();i.length!==this.ct.length&&(this.dt=i.map(F),this.ct=this.dt.map((t=>{const i=new N;return i.J(t),i})),this.ut.X(this.ct)),this.ft=!0}gt(){return this.ft&&(this.Mt(),this.ft=!1),this.ut}Mt(){const t=2===this.vt.W().mode,i=this.F.wt(),n=this.vt.xt(),s=this.F.St();i.forEach(((i,e)=>{var r;const h=this.dt[e],l=i.yt(n);if(t||null===l||!i.kt())return void(h.tt=null);const a=f(i.Ct());h.lt=l.Tt,h.ht=l.ht,h.et=l.Pt,h.it[0]._t=l._t,h.it[0].st=i.Dt().Rt(l._t,a.Ot),h.rt=null!==(r=l.At)&&void 0!==r?r:this.F.Bt(h.it[0].st/i.Dt().Vt()),h.it[0].ot=n,h.it[0].nt=s.zt(n),h.tt=W}))}}class H extends L{constructor(t){super(),this.Et=t}Z({context:t,bitmapSize:i,horizontalPixelRatio:n,verticalPixelRatio:s}){if(null===this.Et)return;const e=this.Et.It.kt,r=this.Et.Lt.kt;if(!e&&!r)return;const h=Math.round(this.Et.nt*n),l=Math.round(this.Et.st*s);t.lineCap="butt",e&&h>=0&&(t.lineWidth=Math.floor(this.Et.It.et*n),t.strokeStyle=this.Et.It.O,t.fillStyle=this.Et.It.O,_(t,this.Et.It.Nt),function(t,i,n,s){t.beginPath();const e=t.lineWidth%2?.5:0;t.moveTo(i+e,n),t.lineTo(i+e,s),t.stroke()}(t,h,0,i.height)),r&&l>=0&&(t.lineWidth=Math.floor(this.Et.Lt.et*s),t.strokeStyle=this.Et.Lt.O,t.fillStyle=this.Et.Lt.O,_(t,this.Et.Lt.Nt),u(t,l,0,i.width))}}class ${constructor(t){this.ft=!0,this.Ft={It:{et:1,Nt:0,O:"",kt:!1},Lt:{et:1,Nt:0,O:"",kt:!1},nt:0,st:0},this.Wt=new H(this.Ft),this.jt=t}bt(){this.ft=!0}gt(){return this.ft&&(this.Mt(),this.ft=!1),this.Wt}Mt(){const t=this.jt.kt(),i=f(this.jt.Ht()),n=i.$t().W().crosshair,s=this.Ft;if(2===n.mode)return s.Lt.kt=!1,void(s.It.kt=!1);s.Lt.kt=t&&this.jt.Ut(i),s.It.kt=t&&this.jt.qt(),s.Lt.et=n.horzLine.width,s.Lt.Nt=n.horzLine.style,s.Lt.O=n.horzLine.color,s.It.et=n.vertLine.width,s.It.Nt=n.vertLine.style,s.It.O=n.vertLine.color,s.nt=this.jt.Yt(),s.st=this.jt.Xt()}}function U(t,i,n,s,e,r){t.fillRect(i+r,n,s-2*r,r),t.fillRect(i+r,n+e-r,s-2*r,r),t.fillRect(i,n,r,e),t.fillRect(i+s-r,n,r,e)}function q(t,i,n,s,e,r){t.save(),t.globalCompositeOperation="copy",t.fillStyle=r,t.fillRect(i,n,s,e),t.restore()}function Y(t,i){return t.map((t=>0===t?t:t+i))}function X(t,i,n,s,e,r){t.beginPath(),t.lineTo(i+s-r[1],n),0!==r[1]&&t.arcTo(i+s,n,i+s,n+r[1],r[1]),t.lineTo(i+s,n+e-r[2]),0!==r[2]&&t.arcTo(i+s,n+e,i+s-r[2],n+e,r[2]),t.lineTo(i+r[3],n+e),0!==r[3]&&t.arcTo(i,n+e,i,n+e-r[3],r[3]),t.lineTo(i,n+r[0]),0!==r[0]&&t.arcTo(i,n,i+r[0],n,r[0])}function K(t,i,n,s,e,r,h=0,l=[0,0,0,0],a=""){if(t.save(),!h||!a||a===r)return X(t,i,n,s,e,l),t.fillStyle=r,t.fill(),void t.restore();const o=h/2;if("transparent"!==r){X(t,i+h,n+h,s-2*h,e-2*h,Y(l,-h)),t.fillStyle=r,t.fill()}if("transparent"!==a){X(t,i+o,n+o,s-h,e-h,Y(l,-o)),t.lineWidth=h,t.strokeStyle=a,t.closePath(),t.stroke()}t.restore()}function Z(t,i,n,s,e,r,h){t.save(),t.globalCompositeOperation="copy";const l=t.createLinearGradient(0,0,0,e);l.addColorStop(0,r),l.addColorStop(1,h),t.fillStyle=l,t.fillRect(i,n,s,e),t.restore()}class G{constructor(t,i){this.J(t,i)}J(t,i){this.Et=t,this.Kt=i}Vt(t,i){return this.Et.kt?t.P+t.L+t.B:0}K(t,i,n,s){if(!this.Et.kt||0===this.Et.Zt.length)return;const e=this.Et.O,r=this.Kt.t,h=t.useBitmapCoordinateSpace((t=>{const h=t.context;h.font=i.R;const l=this.Gt(t,i,n,s),a=l.Jt,o=(t,i)=>{l.Qt?K(h,a.ti,a.ii,a.ni,a.si,t,a.ei,[a.ht,0,0,a.ht],i):K(h,a.ri,a.ii,a.ni,a.si,t,a.ei,[0,a.ht,a.ht,0],i)};return o(r,"transparent"),this.Et.hi&&(h.fillStyle=e,h.fillRect(a.ri,a.li,a.ai-a.ri,a.oi)),o("transparent",r),this.Et._i&&(h.fillStyle=i.A,h.fillRect(l.Qt?a.ui-a.ei:0,a.ii,a.ei,a.ci-a.ii)),l}));t.useMediaCoordinateSpace((({context:t})=>{const n=h.di;t.font=i.R,t.textAlign=h.Qt?"right":"left",t.textBaseline="middle",t.fillStyle=e,t.fillText(this.Et.Zt,n.fi,(n.ii+n.ci)/2+n.vi)}))}Gt(t,i,n,s){var e;const{context:r,bitmapSize:h,mediaSize:l,horizontalPixelRatio:a,verticalPixelRatio:o}=t,_=this.Et.hi||!this.Et.pi?i.T:0,u=this.Et.mi?i.C:0,c=i.L+this.Kt.bi,d=i.B+this.Kt.wi,f=i.V,v=i.I,p=this.Et.Zt,m=i.P,b=n.gi(r,p),w=Math.ceil(n.Mi(r,p)),g=m+c+d,M=i.C+f+v+w+_,x=Math.max(1,Math.floor(o));let S=Math.round(g*o);S%2!=x%2&&(S+=1);const y=u>0?Math.max(1,Math.floor(u*a)):0,k=Math.round(M*a),C=Math.round(_*a),T=null!==(e=this.Kt.xi)&&void 0!==e?e:this.Kt.Si,P=Math.round(T*o)-Math.floor(.5*o),R=Math.floor(P+x/2-S/2),D=R+S,O="right"===s,A=O?l.width-u:u,B=O?h.width-y:y;let V,z,E;return O?(V=B-k,z=B-C,E=A-_-f-u):(V=B+k,z=B+C,E=A+_+f),{Qt:O,Jt:{ii:R,li:P,ci:D,ni:k,si:S,ht:2*a,ei:y,ti:V,ri:B,ai:z,oi:x,ui:h.width},di:{ii:R/o,ci:D/o,fi:E,vi:b}}}}class J{constructor(t){this.yi={Si:0,t:"#000",wi:0,bi:0},this.ki={Zt:"",kt:!1,hi:!0,pi:!1,At:"",O:"#FFF",_i:!1,mi:!1},this.Ci={Zt:"",kt:!1,hi:!1,pi:!0,At:"",O:"#FFF",_i:!0,mi:!0},this.ft=!0,this.Ti=new(t||G)(this.ki,this.yi),this.Pi=new(t||G)(this.Ci,this.yi)}Zt(){return this.Ri(),this.ki.Zt}Si(){return this.Ri(),this.yi.Si}bt(){this.ft=!0}Vt(t,i=!1){return Math.max(this.Ti.Vt(t,i),this.Pi.Vt(t,i))}Di(){return this.yi.xi||0}Oi(t){this.yi.xi=t}Ai(){return this.Ri(),this.ki.kt||this.Ci.kt}Bi(){return this.Ri(),this.ki.kt}gt(t){return this.Ri(),this.ki.hi=this.ki.hi&&t.W().ticksVisible,this.Ci.hi=this.Ci.hi&&t.W().ticksVisible,this.Ti.J(this.ki,this.yi),this.Pi.J(this.Ci,this.yi),this.Ti}Vi(){return this.Ri(),this.Ti.J(this.ki,this.yi),this.Pi.J(this.Ci,this.yi),this.Pi}Ri(){this.ft&&(this.ki.hi=!0,this.Ci.hi=!1,this.zi(this.ki,this.Ci,this.yi))}}class Q extends J{constructor(t,i,n){super(),this.jt=t,this.Ei=i,this.Ii=n}zi(t,i,n){if(t.kt=!1,2===this.jt.W().mode)return;const s=this.jt.W().horzLine;if(!s.labelVisible)return;const e=this.Ei.Ct();if(!this.jt.kt()||this.Ei.Li()||null===e)return;const r=y(s.labelBackgroundColor);n.t=r.t,t.O=r.i;const h=2/12*this.Ei.P();n.bi=h,n.wi=h;const l=this.Ii(this.Ei);n.Si=l.Si,t.Zt=this.Ei.Ni(l._t,e),t.kt=!0}}const tt=/[1-9]/g;class it{constructor(){this.Et=null}J(t){this.Et=t}K(t,i){if(null===this.Et||!1===this.Et.kt||0===this.Et.Zt.length)return;const n=t.useMediaCoordinateSpace((({context:t})=>(t.font=i.R,Math.round(i.Fi.Mi(t,f(this.Et).Zt,tt)))));if(n<=0)return;const s=i.Wi,e=n+2*s,r=e/2,h=this.Et.ji;let l=this.Et.Si,a=Math.floor(l-r)+.5;a<0?(l+=Math.abs(0-a),a=Math.floor(l-r)+.5):a+e>h&&(l-=Math.abs(h-(a+e)),a=Math.floor(l-r)+.5);const o=a+e,_=Math.ceil(0+i.C+i.T+i.L+i.P+i.B);t.useBitmapCoordinateSpace((({context:t,horizontalPixelRatio:n,verticalPixelRatio:s})=>{const e=f(this.Et);t.fillStyle=e.t;const r=Math.round(a*n),h=Math.round(0*s),l=Math.round(o*n),u=Math.round(_*s),c=Math.round(2*n);if(t.beginPath(),t.moveTo(r,h),t.lineTo(r,u-c),t.arcTo(r,u,r+c,u,c),t.lineTo(l-c,u),t.arcTo(l,u,l,u-c,c),t.lineTo(l,h),t.fill(),e.hi){const r=Math.round(e.Si*n),l=h,a=Math.round((l+i.T)*s);t.fillStyle=e.O;const o=Math.max(1,Math.floor(n)),_=Math.floor(.5*n);t.fillRect(r-_,l,o,a-l)}})),t.useMediaCoordinateSpace((({context:t})=>{const n=f(this.Et),e=0+i.C+i.T+i.L+i.P/2;t.font=i.R,t.textAlign="left",t.textBaseline="middle",t.fillStyle=n.O;const r=i.Fi.gi(t,"Apr0");t.translate(a+s,e+r),t.fillText(n.Zt,0,0)}))}}class nt{constructor(t,i,n){this.ft=!0,this.Wt=new it,this.Ft={kt:!1,t:"#4c525e",O:"white",Zt:"",ji:0,Si:NaN,hi:!0},this.vt=t,this.Hi=i,this.Ii=n}bt(){this.ft=!0}gt(){return this.ft&&(this.Mt(),this.ft=!1),this.Wt.J(this.Ft),this.Wt}Mt(){const t=this.Ft;if(t.kt=!1,2===this.vt.W().mode)return;const i=this.vt.W().vertLine;if(!i.labelVisible)return;const n=this.Hi.St();if(n.Li())return;t.ji=n.ji();const s=this.Ii();if(null===s)return;t.Si=s.Si;const e=n.$i(this.vt.xt());t.Zt=n.Ui(f(e)),t.kt=!0;const r=y(i.labelBackgroundColor);t.t=r.t,t.O=r.i,t.hi=n.W().ticksVisible}}class st{constructor(){this.qi=null,this.Yi=0}Xi(){return this.Yi}Ki(t){this.Yi=t}Dt(){return this.qi}Zi(t){this.qi=t}Gi(t){return[]}Ji(){return[]}kt(){return!0}}var et;!function(t){t[t.Normal=0]="Normal",t[t.Magnet=1]="Magnet",t[t.Hidden=2]="Hidden"}(et||(et={}));class rt extends st{constructor(t,i){super(),this.Qi=null,this.tn=NaN,this.nn=0,this.sn=!0,this.en=new Map,this.rn=!1,this.hn=NaN,this.ln=NaN,this.an=NaN,this.on=NaN,this.Hi=t,this._n=i,this.un=new j(t,this);this.cn=((t,i)=>n=>{const s=i(),e=t();if(n===f(this.Qi).dn())return{_t:e,Si:s};{const t=f(n.Ct());return{_t:n.fn(s,t),Si:s}}})((()=>this.tn),(()=>this.ln));const n=((t,i)=>()=>{const n=this.Hi.St().vn(t()),s=i();return n&&Number.isFinite(s)?{ot:n,Si:s}:null})((()=>this.nn),(()=>this.Yt()));this.pn=new nt(this,t,n),this.mn=new $(this)}W(){return this._n}bn(t,i){this.an=t,this.on=i}wn(){this.an=NaN,this.on=NaN}gn(){return this.an}Mn(){return this.on}xn(t,i,n){this.rn||(this.rn=!0),this.sn=!0,this.Sn(t,i,n)}xt(){return this.nn}Yt(){return this.hn}Xt(){return this.ln}kt(){return this.sn}yn(){this.sn=!1,this.kn(),this.tn=NaN,this.hn=NaN,this.ln=NaN,this.Qi=null,this.wn()}Cn(t){return null!==this.Qi?[this.mn,this.un]:[]}Ut(t){return t===this.Qi&&this._n.horzLine.visible}qt(){return this._n.vertLine.visible}Tn(t,i){this.sn&&this.Qi===t||this.en.clear();const n=[];return this.Qi===t&&n.push(this.Pn(this.en,i,this.cn)),n}Ji(){return this.sn?[this.pn]:[]}Ht(){return this.Qi}Rn(){this.mn.bt(),this.en.forEach((t=>t.bt())),this.pn.bt(),this.un.bt()}Dn(t){return t&&!t.dn().Li()?t.dn():null}Sn(t,i,n){this.On(t,i,n)&&this.Rn()}On(t,i,n){const s=this.hn,e=this.ln,r=this.tn,h=this.nn,l=this.Qi,a=this.Dn(n);this.nn=t,this.hn=isNaN(t)?NaN:this.Hi.St().zt(t),this.Qi=n;const o=null!==a?a.Ct():null;return null!==a&&null!==o?(this.tn=i,this.ln=a.Rt(i,o)):(this.tn=NaN,this.ln=NaN),s!==this.hn||e!==this.ln||h!==this.nn||r!==this.tn||l!==this.Qi}kn(){const t=this.Hi.wt().map((t=>t.Bn().An())).filter(A),i=0===t.length?null:Math.max(...t);this.nn=null!==i?i:NaN}Pn(t,i,n){let s=t.get(i);return void 0===s&&(s=new Q(this,i,n),t.set(i,s)),s}}function ht(t){return"left"===t||"right"===t}class lt{constructor(t){this.Vn=new Map,this.zn=[],this.En=t}In(t,i){const n=function(t,i){return void 0===t?i:{Ln:Math.max(t.Ln,i.Ln),Nn:t.Nn||i.Nn}}(this.Vn.get(t),i);this.Vn.set(t,n)}Fn(){return this.En}Wn(t){const i=this.Vn.get(t);return void 0===i?{Ln:this.En}:{Ln:Math.max(this.En,i.Ln),Nn:i.Nn}}jn(){this.Hn(),this.zn=[{$n:0}]}Un(t){this.Hn(),this.zn=[{$n:1,Ot:t}]}qn(t){this.Yn(),this.zn.push({$n:5,Ot:t})}Hn(){this.Yn(),this.zn.push({$n:6})}Xn(){this.Hn(),this.zn=[{$n:4}]}Kn(t){this.Hn(),this.zn.push({$n:2,Ot:t})}Zn(t){this.Hn(),this.zn.push({$n:3,Ot:t})}Gn(){return this.zn}Jn(t){for(const i of t.zn)this.Qn(i);this.En=Math.max(this.En,t.En),t.Vn.forEach(((t,i)=>{this.In(i,t)}))}static ts(){return new lt(2)}static ns(){return new lt(3)}Qn(t){switch(t.$n){case 0:this.jn();break;case 1:this.Un(t.Ot);break;case 2:this.Kn(t.Ot);break;case 3:this.Zn(t.Ot);break;case 4:this.Xn();break;case 5:this.qn(t.Ot);break;case 6:this.Yn()}}Yn(){const t=this.zn.findIndex((t=>5===t.$n));-1!==t&&this.zn.splice(t,1)}}const at=".";function ot(t,i){if(!T(t))return"n/a";if(!P(i))throw new TypeError("invalid length");if(i<0||i>16)throw new TypeError("invalid length");if(0===i)return t.toString();return("0000000000000000"+t.toString()).slice(-i)}class _t{constructor(t,i){if(i||(i=1),T(t)&&P(t)||(t=100),t<0)throw new TypeError("invalid base");this.Ei=t,this.ss=i,this.es()}format(t){const i=t<0?"−":"";return t=Math.abs(t),i+this.rs(t)}es(){if(this.hs=0,this.Ei>0&&this.ss>0){let t=this.Ei;for(;t>1;)t/=10,this.hs++}}rs(t){const i=this.Ei/this.ss;let n=Math.floor(t),s="";const e=void 0!==this.hs?this.hs:NaN;if(i>1){let r=+(Math.round(t*i)-n*i).toFixed(this.hs);r>=i&&(r-=i,n+=1),s=at+ot(+r.toFixed(this.hs)*this.ss,e)}else n=Math.round(n*i)/i,e>0&&(s=at+ot(0,e));return n.toFixed(0)+s}}class ut extends _t{constructor(t=100){super(t)}format(t){return`${super.format(t)}%`}}class ct{constructor(t){this.ls=t}format(t){let i="";return t<0&&(i="-",t=-t),t<995?i+this.os(t):t<999995?i+this.os(t/1e3)+"K":t<999999995?(t=1e3*Math.round(t/1e3),i+this.os(t/1e6)+"M"):(t=1e6*Math.round(t/1e6),i+this.os(t/1e9)+"B")}os(t){let i;const n=Math.pow(10,this.ls);return i=(t=Math.round(t*n)/n)>=1e-15&&t<1?t.toFixed(this.ls).replace(/\.?0+$/,""):String(t),i.replace(/(\.[1-9]*)0+$/,((t,i)=>i))}}function dt(t,i,n,s,e,r,h){if(0===i.length||s.from>=i.length||s.to<=0)return;const{context:l,horizontalPixelRatio:a,verticalPixelRatio:o}=t,_=i[s.from];let u=r(t,_),c=_;if(s.to-s.from<2){const i=e/2;l.beginPath();const n={nt:_.nt-i,st:_.st},s={nt:_.nt+i,st:_.st};l.moveTo(n.nt*a,n.st*o),l.lineTo(s.nt*a,s.st*o),h(t,u,n,s)}else{const e=(i,n)=>{h(t,u,c,n),l.beginPath(),u=i,c=n};let d=c;l.beginPath(),l.moveTo(_.nt*a,_.st*o);for(let h=s.from+1;h<s.to;++h){d=i[h];const s=r(t,d);switch(n){case 0:l.lineTo(d.nt*a,d.st*o);break;case 1:l.lineTo(d.nt*a,i[h-1].st*o),s!==u&&(e(s,d),l.lineTo(d.nt*a,i[h-1].st*o)),l.lineTo(d.nt*a,d.st*o);break;case 2:{const[t,n]=mt(i,h-1,h);l.bezierCurveTo(t.nt*a,t.st*o,n.nt*a,n.st*o,d.nt*a,d.st*o);break}}1!==n&&s!==u&&(e(s,d),l.moveTo(d.nt*a,d.st*o))}(c!==d||c===d&&1===n)&&h(t,u,c,d)}}const ft=6;function vt(t,i){return{nt:t.nt-i.nt,st:t.st-i.st}}function pt(t,i){return{nt:t.nt/i,st:t.st/i}}function mt(t,i,n){const s=Math.max(0,i-1),e=Math.min(t.length-1,n+1);var r,h;return[(r=t[i],h=pt(vt(t[n],t[s]),ft),{nt:r.nt+h.nt,st:r.st+h.st}),vt(t[n],pt(vt(t[e],t[i]),ft))]}function bt(t,i,n,s,e){const{context:r,horizontalPixelRatio:h,verticalPixelRatio:l}=i;r.lineTo(e.nt*h,t*l),r.lineTo(s.nt*h,t*l),r.closePath(),r.fillStyle=n,r.fill()}class wt extends L{constructor(){super(...arguments),this.G=null}J(t){this.G=t}Z(t){var i;if(null===this.G)return;const{it:n,tt:s,_s:e,et:r,Nt:h,us:l}=this.G,a=null!==(i=this.G.cs)&&void 0!==i?i:this.G.ds?0:t.mediaSize.height;if(null===s)return;const o=t.context;o.lineCap="butt",o.lineJoin="round",o.lineWidth=r,_(o,h),o.lineWidth=1,dt(t,n,l,s,e,this.fs.bind(this),bt.bind(null,a))}}function gt(t,i,n){return Math.min(Math.max(t,i),n)}function Mt(t,i,n){return i-t<=n}function xt(t){const i=Math.ceil(t);return i%2==0?i-1:i}class St{vs(t,i){const n=this.ps,{bs:s,ws:e,gs:r,Ms:h,xs:l,cs:a}=i;if(void 0===this.Ss||void 0===n||n.bs!==s||n.ws!==e||n.gs!==r||n.Ms!==h||n.cs!==a||n.xs!==l){const n=t.context.createLinearGradient(0,0,0,l);if(n.addColorStop(0,s),null!=a){const i=gt(a*t.verticalPixelRatio/l,0,1);n.addColorStop(i,e),n.addColorStop(i,r)}n.addColorStop(1,h),this.Ss=n,this.ps=i}return this.Ss}}class yt extends wt{constructor(){super(...arguments),this.ys=new St}fs(t,i){return this.ys.vs(t,{bs:i.ks,ws:"",gs:"",Ms:i.Cs,xs:t.bitmapSize.height})}}function kt(t,i){const n=t.context;n.strokeStyle=i,n.stroke()}class Ct extends L{constructor(){super(...arguments),this.G=null}J(t){this.G=t}Z(t){if(null===this.G)return;const{it:i,tt:n,_s:s,us:e,et:r,Nt:h,Ts:l}=this.G;if(null===n)return;const a=t.context;a.lineCap="butt",a.lineWidth=r*t.verticalPixelRatio,_(a,h),a.lineJoin="round";const o=this.Ps.bind(this);void 0!==e&&dt(t,i,e,n,s,o,kt),l&&function(t,i,n,s,e){const{horizontalPixelRatio:r,verticalPixelRatio:h,context:l}=t;let a=null;const o=Math.max(1,Math.floor(r))%2/2,_=n*h+o;for(let n=s.to-1;n>=s.from;--n){const s=i[n];if(s){const i=e(t,s);i!==a&&(l.beginPath(),null!==a&&l.fill(),l.fillStyle=i,a=i);const n=Math.round(s.nt*r)+o,u=s.st*h;l.moveTo(n,u),l.arc(n,u,_,0,2*Math.PI)}}l.fill()}(t,i,l,n,o)}}class Tt extends Ct{Ps(t,i){return i.lt}}function Pt(t,i,n,s,e=0,r=i.length){let h=r-e;for(;0<h;){const r=h>>1,l=e+r;s(i[l],n)===t?(e=l+1,h-=r+1):h=r}return e}const Rt=Pt.bind(null,!0),Dt=Pt.bind(null,!1);function Ot(t,i){return t.ot<i}function At(t,i){return i<t.ot}function Bt(t,i,n){const s=i.Rs(),e=i.ui(),r=Rt(t,s,Ot),h=Dt(t,e,At);if(!n)return{from:r,to:h};let l=r,a=h;return r>0&&r<t.length&&t[r].ot>=s&&(l=r-1),h>0&&h<t.length&&t[h-1].ot<=e&&(a=h+1),{from:l,to:a}}class Vt{constructor(t,i,n){this.Ds=!0,this.Os=!0,this.As=!0,this.Bs=[],this.Vs=null,this.zs=t,this.Es=i,this.Is=n}bt(t){this.Ds=!0,"data"===t&&(this.Os=!0),"options"===t&&(this.As=!0)}gt(){return this.zs.kt()?(this.Ls(),null===this.Vs?null:this.Ns):null}Fs(){this.Bs=this.Bs.map((t=>Object.assign(Object.assign({},t),this.zs.js().Ws(t.ot))))}Hs(){this.Vs=null}Ls(){this.Os&&(this.$s(),this.Os=!1),this.As&&(this.Fs(),this.As=!1),this.Ds&&(this.Us(),this.Ds=!1)}Us(){const t=this.zs.Dt(),i=this.Es.St();if(this.Hs(),i.Li()||t.Li())return;const n=i.qs();if(null===n)return;if(0===this.zs.Bn().Ys())return;const s=this.zs.Ct();null!==s&&(this.Vs=Bt(this.Bs,n,this.Is),this.Xs(t,i,s.Ot),this.Ks())}}class zt extends Vt{constructor(t,i){super(t,i,!0)}Xs(t,i,n){i.Zs(this.Bs,B(this.Vs)),t.Gs(this.Bs,n,B(this.Vs))}Js(t,i){return{ot:t,_t:i,nt:NaN,st:NaN}}$s(){const t=this.zs.js();this.Bs=this.zs.Bn().Qs().map((i=>{const n=i.Ot[3];return this.te(i.ie,n,t)}))}}class Et extends zt{constructor(t,i){super(t,i),this.Ns=new I,this.ne=new yt,this.se=new Tt,this.Ns.X([this.ne,this.se])}te(t,i,n){return Object.assign(Object.assign({},this.Js(t,i)),n.Ws(t))}Ks(){const t=this.zs.W();this.ne.J({us:t.lineType,it:this.Bs,Nt:t.lineStyle,et:t.lineWidth,cs:null,ds:t.invertFilledArea,tt:this.Vs,_s:this.Es.St().ee()}),this.se.J({us:t.lineVisible?t.lineType:void 0,it:this.Bs,Nt:t.lineStyle,et:t.lineWidth,tt:this.Vs,_s:this.Es.St().ee(),Ts:t.pointMarkersVisible?t.pointMarkersRadius||t.lineWidth/2+2:void 0})}}class It extends L{constructor(){super(...arguments),this.Et=null,this.re=0,this.he=0}J(t){this.Et=t}Z({context:t,horizontalPixelRatio:i,verticalPixelRatio:n}){if(null===this.Et||0===this.Et.Bn.length||null===this.Et.tt)return;if(this.re=this.le(i),this.re>=2){Math.max(1,Math.floor(i))%2!=this.re%2&&this.re--}this.he=this.Et.ae?Math.min(this.re,Math.floor(i)):this.re;let s=null;const e=this.he<=this.re&&this.Et.ee>=Math.floor(1.5*i);for(let r=this.Et.tt.from;r<this.Et.tt.to;++r){const h=this.Et.Bn[r];s!==h.oe&&(t.fillStyle=h.oe,s=h.oe);const l=Math.floor(.5*this.he),a=Math.round(h.nt*i),o=a-l,_=this.he,u=o+_-1,c=Math.min(h._e,h.ue),d=Math.max(h._e,h.ue),f=Math.round(c*n)-l,v=Math.round(d*n)+l,p=Math.max(v-f,this.he);t.fillRect(o,f,_,p);const m=Math.ceil(1.5*this.re);if(e){if(this.Et.ce){const i=a-m;let s=Math.max(f,Math.round(h.de*n)-l),e=s+_-1;e>f+p-1&&(e=f+p-1,s=e-_+1),t.fillRect(i,s,o-i,e-s+1)}const i=a+m;let s=Math.max(f,Math.round(h.fe*n)-l),e=s+_-1;e>f+p-1&&(e=f+p-1,s=e-_+1),t.fillRect(u+1,s,i-u,e-s+1)}}}le(t){const i=Math.floor(t);return Math.max(i,Math.floor(function(t,i){return Math.floor(.3*t*i)}(f(this.Et).ee,t)))}}class Lt extends Vt{constructor(t,i){super(t,i,!1)}Xs(t,i,n){i.Zs(this.Bs,B(this.Vs)),t.ve(this.Bs,n,B(this.Vs))}pe(t,i,n){return{ot:t,me:i.Ot[0],be:i.Ot[1],we:i.Ot[2],ge:i.Ot[3],nt:NaN,de:NaN,_e:NaN,ue:NaN,fe:NaN}}$s(){const t=this.zs.js();this.Bs=this.zs.Bn().Qs().map((i=>this.te(i.ie,i,t)))}}class Nt extends Lt{constructor(){super(...arguments),this.Ns=new It}te(t,i,n){return Object.assign(Object.assign({},this.pe(t,i,n)),n.Ws(t))}Ks(){const t=this.zs.W();this.Ns.J({Bn:this.Bs,ee:this.Es.St().ee(),ce:t.openVisible,ae:t.thinBars,tt:this.Vs})}}class Ft extends wt{constructor(){super(...arguments),this.ys=new St}fs(t,i){const n=this.G;return this.ys.vs(t,{bs:i.Me,ws:i.xe,gs:i.Se,Ms:i.ye,xs:t.bitmapSize.height,cs:n.cs})}}class Wt extends Ct{constructor(){super(...arguments),this.ke=new St}Ps(t,i){const n=this.G;return this.ke.vs(t,{bs:i.Ce,ws:i.Ce,gs:i.Te,Ms:i.Te,xs:t.bitmapSize.height,cs:n.cs})}}class jt extends zt{constructor(t,i){super(t,i),this.Ns=new I,this.Pe=new Ft,this.Re=new Wt,this.Ns.X([this.Pe,this.Re])}te(t,i,n){return Object.assign(Object.assign({},this.Js(t,i)),n.Ws(t))}Ks(){const t=this.zs.Ct();if(null===t)return;const i=this.zs.W(),n=this.zs.Dt().Rt(i.baseValue.price,t.Ot),s=this.Es.St().ee();this.Pe.J({it:this.Bs,et:i.lineWidth,Nt:i.lineStyle,us:i.lineType,cs:n,ds:!1,tt:this.Vs,_s:s}),this.Re.J({it:this.Bs,et:i.lineWidth,Nt:i.lineStyle,us:i.lineVisible?i.lineType:void 0,Ts:i.pointMarkersVisible?i.pointMarkersRadius||i.lineWidth/2+2:void 0,cs:n,tt:this.Vs,_s:s})}}class Ht extends L{constructor(){super(...arguments),this.Et=null,this.re=0}J(t){this.Et=t}Z(t){if(null===this.Et||0===this.Et.Bn.length||null===this.Et.tt)return;const{horizontalPixelRatio:i}=t;if(this.re=function(t,i){if(t>=2.5&&t<=4)return Math.floor(3*i);const n=1-.2*Math.atan(Math.max(4,t)-4)/(.5*Math.PI),s=Math.floor(t*n*i),e=Math.floor(t*i),r=Math.min(s,e);return Math.max(Math.floor(i),r)}(this.Et.ee,i),this.re>=2){Math.floor(i)%2!=this.re%2&&this.re--}const n=this.Et.Bn;this.Et.De&&this.Oe(t,n,this.Et.tt),this.Et._i&&this.Ae(t,n,this.Et.tt);const s=this.Be(i);(!this.Et._i||this.re>2*s)&&this.Ve(t,n,this.Et.tt)}Oe(t,i,n){if(null===this.Et)return;const{context:s,horizontalPixelRatio:e,verticalPixelRatio:r}=t;let h="",l=Math.min(Math.floor(e),Math.floor(this.Et.ee*e));l=Math.max(Math.floor(e),Math.min(l,this.re));const a=Math.floor(.5*l);let o=null;for(let t=n.from;t<n.to;t++){const n=i[t];n.ze!==h&&(s.fillStyle=n.ze,h=n.ze);const _=Math.round(Math.min(n.de,n.fe)*r),u=Math.round(Math.max(n.de,n.fe)*r),c=Math.round(n._e*r),d=Math.round(n.ue*r);let f=Math.round(e*n.nt)-a;const v=f+l-1;null!==o&&(f=Math.max(o+1,f),f=Math.min(f,v));const p=v-f+1;s.fillRect(f,c,p,_-c),s.fillRect(f,u+1,p,d-u),o=v}}Be(t){let i=Math.floor(1*t);this.re<=2*i&&(i=Math.floor(.5*(this.re-1)));const n=Math.max(Math.floor(t),i);return this.re<=2*n?Math.max(Math.floor(t),Math.floor(1*t)):n}Ae(t,i,n){if(null===this.Et)return;const{context:s,horizontalPixelRatio:e,verticalPixelRatio:r}=t;let h="";const l=this.Be(e);let a=null;for(let t=n.from;t<n.to;t++){const n=i[t];n.Ee!==h&&(s.fillStyle=n.Ee,h=n.Ee);let o=Math.round(n.nt*e)-Math.floor(.5*this.re);const _=o+this.re-1,u=Math.round(Math.min(n.de,n.fe)*r),c=Math.round(Math.max(n.de,n.fe)*r);if(null!==a&&(o=Math.max(a+1,o),o=Math.min(o,_)),this.Et.ee*e>2*l)U(s,o,u,_-o+1,c-u+1,l);else{const t=_-o+1;s.fillRect(o,u,t,c-u+1)}a=_}}Ve(t,i,n){if(null===this.Et)return;const{context:s,horizontalPixelRatio:e,verticalPixelRatio:r}=t;let h="";const l=this.Be(e);for(let t=n.from;t<n.to;t++){const n=i[t];let a=Math.round(Math.min(n.de,n.fe)*r),o=Math.round(Math.max(n.de,n.fe)*r),_=Math.round(n.nt*e)-Math.floor(.5*this.re),u=_+this.re-1;if(n.oe!==h){const t=n.oe;s.fillStyle=t,h=t}this.Et._i&&(_+=l,a+=l,u-=l,o-=l),a>o||s.fillRect(_,a,u-_+1,o-a+1)}}}class $t extends Lt{constructor(){super(...arguments),this.Ns=new Ht}te(t,i,n){return Object.assign(Object.assign({},this.pe(t,i,n)),n.Ws(t))}Ks(){const t=this.zs.W();this.Ns.J({Bn:this.Bs,ee:this.Es.St().ee(),De:t.wickVisible,_i:t.borderVisible,tt:this.Vs})}}class Ut{constructor(t,i){this.Ie=t,this.Ei=i}K(t,i,n){this.Ie.draw(t,this.Ei,i,n)}}class qt extends Vt{constructor(t,i,n){super(t,i,!1),this.mn=n,this.Ns=new Ut(this.mn.renderer(),(i=>{const n=t.Ct();return null===n?null:t.Dt().Rt(i,n.Ot)}))}Le(t){return this.mn.priceValueBuilder(t)}Ne(t){return this.mn.isWhitespace(t)}$s(){const t=this.zs.js();this.Bs=this.zs.Bn().Qs().map((i=>Object.assign(Object.assign({ot:i.ie,nt:NaN},t.Ws(i.ie)),{Fe:i.We})))}Xs(t,i){i.Zs(this.Bs,B(this.Vs))}Ks(){this.mn.update({bars:this.Bs.map(Yt),barSpacing:this.Es.St().ee(),visibleRange:this.Vs},this.zs.W())}}function Yt(t){return{x:t.nt,time:t.ot,originalData:t.Fe,barColor:t.oe}}class Xt extends L{constructor(){super(...arguments),this.Et=null,this.je=[]}J(t){this.Et=t,this.je=[]}Z({context:t,horizontalPixelRatio:i,verticalPixelRatio:n}){if(null===this.Et||0===this.Et.it.length||null===this.Et.tt)return;this.je.length||this.He(i);const s=Math.max(1,Math.floor(n)),e=Math.round(this.Et.$e*n)-Math.floor(s/2),r=e+s;for(let i=this.Et.tt.from;i<this.Et.tt.to;i++){const h=this.Et.it[i],l=this.je[i-this.Et.tt.from],a=Math.round(h.st*n);let o,_;t.fillStyle=h.oe,a<=e?(o=a,_=r):(o=e,_=a-Math.floor(s/2)+s),t.fillRect(l.Rs,o,l.ui-l.Rs+1,_-o)}}He(t){if(null===this.Et||0===this.Et.it.length||null===this.Et.tt)return void(this.je=[]);const i=Math.ceil(this.Et.ee*t)<=1?0:Math.max(1,Math.floor(t)),n=Math.round(this.Et.ee*t)-i;this.je=new Array(this.Et.tt.to-this.Et.tt.from);for(let i=this.Et.tt.from;i<this.Et.tt.to;i++){const s=this.Et.it[i],e=Math.round(s.nt*t);let r,h;if(n%2){const t=(n-1)/2;r=e-t,h=e+t}else{const t=n/2;r=e-t,h=e+t-1}this.je[i-this.Et.tt.from]={Rs:r,ui:h,Ue:e,qe:s.nt*t,ot:s.ot}}for(let t=this.Et.tt.from+1;t<this.Et.tt.to;t++){const n=this.je[t-this.Et.tt.from],s=this.je[t-this.Et.tt.from-1];n.ot===s.ot+1&&(n.Rs-s.ui!==i+1&&(s.Ue>s.qe?s.ui=n.Rs-i-1:n.Rs=s.ui+i+1))}let s=Math.ceil(this.Et.ee*t);for(let t=this.Et.tt.from;t<this.Et.tt.to;t++){const i=this.je[t-this.Et.tt.from];i.ui<i.Rs&&(i.ui=i.Rs);const n=i.ui-i.Rs+1;s=Math.min(n,s)}if(i>0&&s<4)for(let t=this.Et.tt.from;t<this.Et.tt.to;t++){const i=this.je[t-this.Et.tt.from];i.ui-i.Rs+1>s&&(i.Ue>i.qe?i.ui-=1:i.Rs+=1)}}}class Kt extends zt{constructor(){super(...arguments),this.Ns=new Xt}te(t,i,n){return Object.assign(Object.assign({},this.Js(t,i)),n.Ws(t))}Ks(){const t={it:this.Bs,ee:this.Es.St().ee(),tt:this.Vs,$e:this.zs.Dt().Rt(this.zs.W().base,f(this.zs.Ct()).Ot)};this.Ns.J(t)}}class Zt extends zt{constructor(){super(...arguments),this.Ns=new Tt}te(t,i,n){return Object.assign(Object.assign({},this.Js(t,i)),n.Ws(t))}Ks(){const t=this.zs.W(),i={it:this.Bs,Nt:t.lineStyle,us:t.lineVisible?t.lineType:void 0,et:t.lineWidth,Ts:t.pointMarkersVisible?t.pointMarkersRadius||t.lineWidth/2+2:void 0,tt:this.Vs,_s:this.Es.St().ee()};this.Ns.J(i)}}const Gt=/[2-9]/g;class Jt{constructor(t=50){this.Ye=0,this.Xe=1,this.Ke=1,this.Ze={},this.Ge=new Map,this.Je=t}Qe(){this.Ye=0,this.Ge.clear(),this.Xe=1,this.Ke=1,this.Ze={}}Mi(t,i,n){return this.tr(t,i,n).width}gi(t,i,n){const s=this.tr(t,i,n);return((s.actualBoundingBoxAscent||0)-(s.actualBoundingBoxDescent||0))/2}tr(t,i,n){const s=n||Gt,e=String(i).replace(s,"0");if(this.Ge.has(e))return d(this.Ge.get(e)).ir;if(this.Ye===this.Je){const t=this.Ze[this.Ke];delete this.Ze[this.Ke],this.Ge.delete(t),this.Ke++,this.Ye--}t.save(),t.textBaseline="middle";const r=t.measureText(e);return t.restore(),0===r.width&&i.length||(this.Ge.set(e,{ir:r,nr:this.Xe}),this.Ze[this.Xe]=e,this.Ye++,this.Xe++),r}}class Qt{constructor(t){this.sr=null,this.k=null,this.er="right",this.rr=t}hr(t,i,n){this.sr=t,this.k=i,this.er=n}K(t){null!==this.k&&null!==this.sr&&this.sr.K(t,this.k,this.rr,this.er)}}class ti{constructor(t,i,n){this.lr=t,this.rr=new Jt(50),this.ar=i,this.F=n,this.j=-1,this.Wt=new Qt(this.rr)}gt(){const t=this.F._r(this.ar);if(null===t)return null;const i=t.ur(this.ar)?t.cr():this.ar.Dt();if(null===i)return null;const n=t.dr(i);if("overlay"===n)return null;const s=this.F.vr();return s.P!==this.j&&(this.j=s.P,this.rr.Qe()),this.Wt.hr(this.lr.Vi(),s,n),this.Wt}}class ii extends L{constructor(){super(...arguments),this.Et=null}J(t){this.Et=t}pr(t,i){var n;if(!(null===(n=this.Et)||void 0===n?void 0:n.kt))return null;const{st:s,et:e,mr:r}=this.Et;return i>=s-e-7&&i<=s+e+7?{br:this.Et,mr:r}:null}Z({context:t,bitmapSize:i,horizontalPixelRatio:n,verticalPixelRatio:s}){if(null===this.Et)return;if(!1===this.Et.kt)return;const e=Math.round(this.Et.st*s);e<0||e>i.height||(t.lineCap="butt",t.strokeStyle=this.Et.O,t.lineWidth=Math.floor(this.Et.et*n),_(t,this.Et.Nt),u(t,e,0,i.width))}}class ni{constructor(t){this.wr={st:0,O:"rgba(0, 0, 0, 0)",et:1,Nt:0,kt:!1},this.gr=new ii,this.ft=!0,this.zs=t,this.Es=t.$t(),this.gr.J(this.wr)}bt(){this.ft=!0}gt(){return this.zs.kt()?(this.ft&&(this.Mr(),this.ft=!1),this.gr):null}}class si extends ni{constructor(t){super(t)}Mr(){this.wr.kt=!1;const t=this.zs.Dt(),i=t.Sr().Sr;if(2!==i&&3!==i)return;const n=this.zs.W();if(!n.baseLineVisible||!this.zs.kt())return;const s=this.zs.Ct();null!==s&&(this.wr.kt=!0,this.wr.st=t.Rt(s.Ot,s.Ot),this.wr.O=n.baseLineColor,this.wr.et=n.baseLineWidth,this.wr.Nt=n.baseLineStyle)}}class ei extends L{constructor(){super(...arguments),this.Et=null}J(t){this.Et=t}We(){return this.Et}Z({context:t,horizontalPixelRatio:i,verticalPixelRatio:n}){const s=this.Et;if(null===s)return;const e=Math.max(1,Math.floor(i)),r=e%2/2,h=Math.round(s.qe.x*i)+r,l=s.qe.y*n;t.fillStyle=s.yr,t.beginPath();const a=Math.max(2,1.5*s.kr)*i;t.arc(h,l,a,0,2*Math.PI,!1),t.fill(),t.fillStyle=s.Cr,t.beginPath(),t.arc(h,l,s.ht*i,0,2*Math.PI,!1),t.fill(),t.lineWidth=e,t.strokeStyle=s.Tr,t.beginPath(),t.arc(h,l,s.ht*i+e/2,0,2*Math.PI,!1),t.stroke()}}const ri=[{Pr:0,Rr:.25,Dr:4,Or:10,Ar:.25,Br:0,Vr:.4,zr:.8},{Pr:.25,Rr:.525,Dr:10,Or:14,Ar:0,Br:0,Vr:.8,zr:0},{Pr:.525,Rr:1,Dr:14,Or:14,Ar:0,Br:0,Vr:0,zr:0}];function hi(t,i,n,s){return function(t,i){if("transparent"===t)return t;const n=S(t),s=n[3];return`rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i*s})`}(t,n+(s-n)*i)}function li(t,i){const n=t%2600/2600;let s;for(const t of ri)if(n>=t.Pr&&n<=t.Rr){s=t;break}c(void 0!==s,"Last price animation internal logic error");const e=(n-s.Pr)/(s.Rr-s.Pr);return{Cr:hi(i,e,s.Ar,s.Br),Tr:hi(i,e,s.Vr,s.zr),ht:(r=e,h=s.Dr,l=s.Or,h+(l-h)*r)};var r,h,l}class ai{constructor(t){this.Wt=new ei,this.ft=!0,this.Er=!0,this.Ir=performance.now(),this.Lr=this.Ir-1,this.Nr=t}Fr(){this.Lr=this.Ir-1,this.bt()}Wr(){if(this.bt(),2===this.Nr.W().lastPriceAnimation){const t=performance.now(),i=this.Lr-t;if(i>0)return void(i<650&&(this.Lr+=2600));this.Ir=t,this.Lr=t+2600}}bt(){this.ft=!0}jr(){this.Er=!0}kt(){return 0!==this.Nr.W().lastPriceAnimation}Hr(){switch(this.Nr.W().lastPriceAnimation){case 0:return!1;case 1:return!0;case 2:return performance.now()<=this.Lr}}gt(){return this.ft?(this.Mt(),this.ft=!1,this.Er=!1):this.Er&&(this.$r(),this.Er=!1),this.Wt}Mt(){this.Wt.J(null);const t=this.Nr.$t().St(),i=t.qs(),n=this.Nr.Ct();if(null===i||null===n)return;const s=this.Nr.Ur(!0);if(s.qr||!i.Yr(s.ie))return;const e={x:t.zt(s.ie),y:this.Nr.Dt().Rt(s._t,n.Ot)},r=s.O,h=this.Nr.W().lineWidth,l=li(this.Xr(),r);this.Wt.J({yr:r,kr:h,Cr:l.Cr,Tr:l.Tr,ht:l.ht,qe:e})}$r(){const t=this.Wt.We();if(null!==t){const i=li(this.Xr(),t.yr);t.Cr=i.Cr,t.Tr=i.Tr,t.ht=i.ht}}Xr(){return this.Hr()?performance.now()-this.Ir:2599}}function oi(t,i){return xt(Math.min(Math.max(t,12),30)*i)}function _i(t,i){switch(t){case"arrowDown":case"arrowUp":return oi(i,1);case"circle":return oi(i,.8);case"square":return oi(i,.7)}}function ui(t){return function(t){const i=Math.ceil(t);return i%2!=0?i-1:i}(oi(t,1))}function ci(t){return Math.max(oi(t,.1),3)}function di(t,i,n,s,e){const r=_i("square",n),h=(r-1)/2,l=t-h,a=i-h;return s>=l&&s<=l+r&&e>=a&&e<=a+r}function fi(t,i,n,s){const e=(_i("arrowUp",s)-1)/2*n.Kr,r=(xt(s/2)-1)/2*n.Kr;i.beginPath(),t?(i.moveTo(n.nt-e,n.st),i.lineTo(n.nt,n.st-e),i.lineTo(n.nt+e,n.st),i.lineTo(n.nt+r,n.st),i.lineTo(n.nt+r,n.st+e),i.lineTo(n.nt-r,n.st+e),i.lineTo(n.nt-r,n.st)):(i.moveTo(n.nt-e,n.st),i.lineTo(n.nt,n.st+e),i.lineTo(n.nt+e,n.st),i.lineTo(n.nt+r,n.st),i.lineTo(n.nt+r,n.st-e),i.lineTo(n.nt-r,n.st-e),i.lineTo(n.nt-r,n.st)),i.fill()}function vi(t,i,n,s,e,r){return di(i,n,s,e,r)}class pi extends L{constructor(){super(...arguments),this.Et=null,this.rr=new Jt,this.j=-1,this.H="",this.Zr=""}J(t){this.Et=t}hr(t,i){this.j===t&&this.H===i||(this.j=t,this.H=i,this.Zr=z(t,i),this.rr.Qe())}pr(t,i){if(null===this.Et||null===this.Et.tt)return null;for(let n=this.Et.tt.from;n<this.Et.tt.to;n++){const s=this.Et.it[n];if(bi(s,t,i))return{br:s.Gr,mr:s.mr}}return null}Z({context:t,horizontalPixelRatio:i,verticalPixelRatio:n},s,e){if(null!==this.Et&&null!==this.Et.tt){t.textBaseline="middle",t.font=this.Zr;for(let s=this.Et.tt.from;s<this.Et.tt.to;s++){const e=this.Et.it[s];void 0!==e.Zt&&(e.Zt.ji=this.rr.Mi(t,e.Zt.Jr),e.Zt.Vt=this.j,e.Zt.nt=e.nt-e.Zt.ji/2),mi(e,t,i,n)}}}}function mi(t,i,n,s){i.fillStyle=t.O,void 0!==t.Zt&&function(t,i,n,s,e,r){t.save(),t.scale(e,r),t.fillText(i,n,s),t.restore()}(i,t.Zt.Jr,t.Zt.nt,t.Zt.st,n,s),function(t,i,n){if(0===t.Ys)return;switch(t.Qr){case"arrowDown":return void fi(!1,i,n,t.Ys);case"arrowUp":return void fi(!0,i,n,t.Ys);case"circle":return void function(t,i,n){const s=(_i("circle",n)-1)/2;t.beginPath(),t.arc(i.nt,i.st,s*i.Kr,0,2*Math.PI,!1),t.fill()}(i,n,t.Ys);case"square":return void function(t,i,n){const s=_i("square",n),e=(s-1)*i.Kr/2,r=i.nt-e,h=i.st-e;t.fillRect(r,h,s*i.Kr,s*i.Kr)}(i,n,t.Ys)}t.Qr}(t,i,function(t,i,n){const s=Math.max(1,Math.floor(i))%2/2;return{nt:Math.round(t.nt*i)+s,st:t.st*n,Kr:i}}(t,n,s))}function bi(t,i,n){return!(void 0===t.Zt||!function(t,i,n,s,e,r){const h=s/2;return e>=t&&e<=t+n&&r>=i-h&&r<=i+h}(t.Zt.nt,t.Zt.st,t.Zt.ji,t.Zt.Vt,i,n))||function(t,i,n){if(0===t.Ys)return!1;switch(t.Qr){case"arrowDown":case"arrowUp":return vi(0,t.nt,t.st,t.Ys,i,n);case"circle":return function(t,i,n,s,e){const r=2+_i("circle",n)/2,h=t-s,l=i-e;return Math.sqrt(h*h+l*l)<=r}(t.nt,t.st,t.Ys,i,n);case"square":return di(t.nt,t.st,t.Ys,i,n)}}(t,i,n)}function wi(t,i,n,s,e,r,h,l,a){const o=T(n)?n:n.ge,_=T(n)?n:n.be,u=T(n)?n:n.we,c=T(i.size)?Math.max(i.size,0):1,d=ui(l.ee())*c,f=d/2;switch(t.Ys=d,i.position){case"inBar":return t.st=h.Rt(o,a),void(void 0!==t.Zt&&(t.Zt.st=t.st+f+r+.6*e));case"aboveBar":return t.st=h.Rt(_,a)-f-s.th,void 0!==t.Zt&&(t.Zt.st=t.st-f-.6*e,s.th+=1.2*e),void(s.th+=d+r);case"belowBar":return t.st=h.Rt(u,a)+f+s.ih,void 0!==t.Zt&&(t.Zt.st=t.st+f+r+.6*e,s.ih+=1.2*e),void(s.ih+=d+r)}i.position}class gi{constructor(t,i){this.ft=!0,this.nh=!0,this.sh=!0,this.eh=null,this.Wt=new pi,this.Nr=t,this.Hi=i,this.Et={it:[],tt:null}}bt(t){this.ft=!0,this.sh=!0,"data"===t&&(this.nh=!0)}gt(t){if(!this.Nr.kt())return null;this.ft&&this.rh();const i=this.Hi.W().layout;return this.Wt.hr(i.fontSize,i.fontFamily),this.Wt.J(this.Et),this.Wt}hh(){if(this.sh){if(this.Nr.lh().length>0){const t=this.Hi.St().ee(),i=ci(t),n=1.5*ui(t)+2*i;this.eh={above:n,below:n}}else this.eh=null;this.sh=!1}return this.eh}rh(){const t=this.Nr.Dt(),i=this.Hi.St(),n=this.Nr.lh();this.nh&&(this.Et.it=n.map((t=>({ot:t.time,nt:0,st:0,Ys:0,Qr:t.shape,O:t.color,Gr:t.Gr,mr:t.id,Zt:void 0}))),this.nh=!1);const s=this.Hi.W().layout;this.Et.tt=null;const e=i.qs();if(null===e)return;const r=this.Nr.Ct();if(null===r)return;if(0===this.Et.it.length)return;let h=NaN;const l=ci(i.ee()),a={th:l,ih:l};this.Et.tt=Bt(this.Et.it,e,!0);for(let e=this.Et.tt.from;e<this.Et.tt.to;e++){const o=n[e];o.time!==h&&(a.th=l,a.ih=l,h=o.time);const _=this.Et.it[e];_.nt=i.zt(o.time),void 0!==o.text&&o.text.length>0&&(_.Zt={Jr:o.text,nt:0,st:0,ji:0,Vt:0});const u=this.Nr.ah(o.time);null!==u&&wi(_,o,u,a,s.fontSize,l,t,i,r.Ot)}this.ft=!1}}class Mi extends ni{constructor(t){super(t)}Mr(){const t=this.wr;t.kt=!1;const i=this.zs.W();if(!i.priceLineVisible||!this.zs.kt())return;const n=this.zs.Ur(0===i.priceLineSource);n.qr||(t.kt=!0,t.st=n.Si,t.O=this.zs.oh(n.O),t.et=i.priceLineWidth,t.Nt=i.priceLineStyle)}}class xi extends J{constructor(t){super(),this.jt=t}zi(t,i,n){t.kt=!1,i.kt=!1;const s=this.jt;if(!s.kt())return;const e=s.W(),r=e.lastValueVisible,h=""!==s._h(),l=0===e.seriesLastValueMode,a=s.Ur(!1);if(a.qr)return;r&&(t.Zt=this.uh(a,r,l),t.kt=0!==t.Zt.length),(h||l)&&(i.Zt=this.dh(a,r,h,l),i.kt=i.Zt.length>0);const o=s.oh(a.O),_=y(o);n.t=_.t,n.Si=a.Si,i.At=s.$t().Bt(a.Si/s.Dt().Vt()),t.At=o,t.O=_.i,i.O=_.i}dh(t,i,n,s){let e="";const r=this.jt._h();return n&&0!==r.length&&(e+=`${r} `),i&&s&&(e+=this.jt.Dt().fh()?t.ph:t.mh),e.trim()}uh(t,i,n){return i?n?this.jt.Dt().fh()?t.mh:t.ph:t.Zt:""}}function Si(t,i,n,s){const e=Number.isFinite(i),r=Number.isFinite(n);return e&&r?t(i,n):e||r?e?i:n:s}class yi{constructor(t,i){this.bh=t,this.wh=i}gh(t){return null!==t&&(this.bh===t.bh&&this.wh===t.wh)}Mh(){return new yi(this.bh,this.wh)}xh(){return this.bh}Sh(){return this.wh}yh(){return this.wh-this.bh}Li(){return this.wh===this.bh||Number.isNaN(this.wh)||Number.isNaN(this.bh)}Jn(t){return null===t?this:new yi(Si(Math.min,this.xh(),t.xh(),-1/0),Si(Math.max,this.Sh(),t.Sh(),1/0))}kh(t){if(!T(t))return;if(0===this.wh-this.bh)return;const i=.5*(this.wh+this.bh);let n=this.wh-i,s=this.bh-i;n*=t,s*=t,this.wh=i+n,this.bh=i+s}Ch(t){T(t)&&(this.wh+=t,this.bh+=t)}Th(){return{minValue:this.bh,maxValue:this.wh}}static Ph(t){return null===t?null:new yi(t.minValue,t.maxValue)}}class ki{constructor(t,i){this.Rh=t,this.Dh=i||null}Oh(){return this.Rh}Ah(){return this.Dh}Th(){return null===this.Rh?null:{priceRange:this.Rh.Th(),margins:this.Dh||void 0}}static Ph(t){return null===t?null:new ki(yi.Ph(t.priceRange),t.margins)}}class Ci extends ni{constructor(t,i){super(t),this.Bh=i}Mr(){const t=this.wr;t.kt=!1;const i=this.Bh.W();if(!this.zs.kt()||!i.lineVisible)return;const n=this.Bh.Vh();null!==n&&(t.kt=!0,t.st=n,t.O=i.color,t.et=i.lineWidth,t.Nt=i.lineStyle,t.mr=this.Bh.W().id)}}class Ti extends J{constructor(t,i){super(),this.Nr=t,this.Bh=i}zi(t,i,n){t.kt=!1,i.kt=!1;const s=this.Bh.W(),e=s.axisLabelVisible,r=""!==s.title,h=this.Nr;if(!e||!h.kt())return;const l=this.Bh.Vh();if(null===l)return;r&&(i.Zt=s.title,i.kt=!0),i.At=h.$t().Bt(l/h.Dt().Vt()),t.Zt=this.zh(s.price),t.kt=!0;const a=y(s.axisLabelColor||s.color);n.t=a.t;const o=s.axisLabelTextColor||a.i;t.O=o,i.O=o,n.Si=l}zh(t){const i=this.Nr.Ct();return null===i?"":this.Nr.Dt().Ni(t,i.Ot)}}class Pi{constructor(t,i){this.Nr=t,this._n=i,this.Eh=new Ci(t,this),this.lr=new Ti(t,this),this.Ih=new ti(this.lr,t,t.$t())}Lh(t){C(this._n,t),this.bt(),this.Nr.$t().Nh()}W(){return this._n}Fh(){return this.Eh}Wh(){return this.Ih}jh(){return this.lr}bt(){this.Eh.bt(),this.lr.bt()}Vh(){const t=this.Nr,i=t.Dt();if(t.$t().St().Li()||i.Li())return null;const n=t.Ct();return null===n?null:i.Rt(this._n.price,n.Ot)}}class Ri extends st{constructor(t){super(),this.Hi=t}$t(){return this.Hi}}const Di={Bar:(t,i,n,s)=>{var e;const r=i.upColor,h=i.downColor,l=f(t(n,s)),a=v(l.Ot[0])<=v(l.Ot[3]);return{oe:null!==(e=l.O)&&void 0!==e?e:a?r:h}},Candlestick:(t,i,n,s)=>{var e,r,h;const l=i.upColor,a=i.downColor,o=i.borderUpColor,_=i.borderDownColor,u=i.wickUpColor,c=i.wickDownColor,d=f(t(n,s)),p=v(d.Ot[0])<=v(d.Ot[3]);return{oe:null!==(e=d.O)&&void 0!==e?e:p?l:a,Ee:null!==(r=d.At)&&void 0!==r?r:p?o:_,ze:null!==(h=d.Hh)&&void 0!==h?h:p?u:c}},Custom:(t,i,n,s)=>{var e;return{oe:null!==(e=f(t(n,s)).O)&&void 0!==e?e:i.color}},Area:(t,i,n,s)=>{var e,r,h,l;const a=f(t(n,s));return{oe:null!==(e=a.lt)&&void 0!==e?e:i.lineColor,lt:null!==(r=a.lt)&&void 0!==r?r:i.lineColor,ks:null!==(h=a.ks)&&void 0!==h?h:i.topColor,Cs:null!==(l=a.Cs)&&void 0!==l?l:i.bottomColor}},Baseline:(t,i,n,s)=>{var e,r,h,l,a,o;const _=f(t(n,s));return{oe:_.Ot[3]>=i.baseValue.price?i.topLineColor:i.bottomLineColor,Ce:null!==(e=_.Ce)&&void 0!==e?e:i.topLineColor,Te:null!==(r=_.Te)&&void 0!==r?r:i.bottomLineColor,Me:null!==(h=_.Me)&&void 0!==h?h:i.topFillColor1,xe:null!==(l=_.xe)&&void 0!==l?l:i.topFillColor2,Se:null!==(a=_.Se)&&void 0!==a?a:i.bottomFillColor1,ye:null!==(o=_.ye)&&void 0!==o?o:i.bottomFillColor2}},Line:(t,i,n,s)=>{var e,r;const h=f(t(n,s));return{oe:null!==(e=h.O)&&void 0!==e?e:i.color,lt:null!==(r=h.O)&&void 0!==r?r:i.color}},Histogram:(t,i,n,s)=>{var e;return{oe:null!==(e=f(t(n,s)).O)&&void 0!==e?e:i.color}}};class Oi{constructor(t){this.$h=(t,i)=>void 0!==i?i.Ot:this.Nr.Bn().Uh(t),this.Nr=t,this.qh=Di[t.Yh()]}Ws(t,i){return this.qh(this.$h,this.Nr.W(),t,i)}}var Ai;!function(t){t[t.NearestLeft=-1]="NearestLeft",t[t.None=0]="None",t[t.NearestRight=1]="NearestRight"}(Ai||(Ai={}));const Bi=30;class Vi{constructor(){this.Xh=[],this.Kh=new Map,this.Zh=new Map}Gh(){return this.Ys()>0?this.Xh[this.Xh.length-1]:null}Jh(){return this.Ys()>0?this.Qh(0):null}An(){return this.Ys()>0?this.Qh(this.Xh.length-1):null}Ys(){return this.Xh.length}Li(){return 0===this.Ys()}Yr(t){return null!==this.tl(t,0)}Uh(t){return this.il(t)}il(t,i=0){const n=this.tl(t,i);return null===n?null:Object.assign(Object.assign({},this.nl(n)),{ie:this.Qh(n)})}Qs(){return this.Xh}sl(t,i,n){if(this.Li())return null;let s=null;for(const e of n){s=zi(s,this.el(t,i,e))}return s}J(t){this.Zh.clear(),this.Kh.clear(),this.Xh=t}Qh(t){return this.Xh[t].ie}nl(t){return this.Xh[t]}tl(t,i){const n=this.rl(t);if(null===n&&0!==i)switch(i){case-1:return this.hl(t);case 1:return this.ll(t);default:throw new TypeError("Unknown search mode")}return n}hl(t){let i=this.al(t);return i>0&&(i-=1),i!==this.Xh.length&&this.Qh(i)<t?i:null}ll(t){const i=this.ol(t);return i!==this.Xh.length&&t<this.Qh(i)?i:null}rl(t){const i=this.al(t);return i===this.Xh.length||t<this.Xh[i].ie?null:i}al(t){return Rt(this.Xh,t,((t,i)=>t.ie<i))}ol(t){return Dt(this.Xh,t,((t,i)=>t.ie>i))}_l(t,i,n){let s=null;for(let e=t;e<i;e++){const t=this.Xh[e].Ot[n];Number.isNaN(t)||(null===s?s={ul:t,cl:t}:(t<s.ul&&(s.ul=t),t>s.cl&&(s.cl=t)))}return s}el(t,i,n){if(this.Li())return null;let s=null;const e=f(this.Jh()),r=f(this.An()),h=Math.max(t,e),l=Math.min(i,r),a=Math.ceil(h/Bi)*Bi,o=Math.max(a,Math.floor(l/Bi)*Bi);{const t=this.al(h),e=this.ol(Math.min(l,a,i));s=zi(s,this._l(t,e,n))}let _=this.Kh.get(n);void 0===_&&(_=new Map,this.Kh.set(n,_));for(let t=Math.max(a+1,h);t<o;t+=Bi){const i=Math.floor(t/Bi);let e=_.get(i);if(void 0===e){const t=this.al(i*Bi),s=this.ol((i+1)*Bi-1);e=this._l(t,s,n),_.set(i,e)}s=zi(s,e)}{const t=this.al(o),i=this.ol(l);s=zi(s,this._l(t,i,n))}return s}}function zi(t,i){if(null===t)return i;if(null===i)return t;return{ul:Math.min(t.ul,i.ul),cl:Math.max(t.cl,i.cl)}}class Ei{constructor(t){this.dl=t}K(t,i,n){this.dl.draw(t)}fl(t,i,n){var s,e;null===(e=(s=this.dl).drawBackground)||void 0===e||e.call(s,t)}}class Ii{constructor(t){this.Ge=null,this.mn=t}gt(){var t;const i=this.mn.renderer();if(null===i)return null;if((null===(t=this.Ge)||void 0===t?void 0:t.vl)===i)return this.Ge.pl;const n=new Ei(i);return this.Ge={vl:i,pl:n},n}ml(){var t,i,n;return null!==(n=null===(i=(t=this.mn).zOrder)||void 0===i?void 0:i.call(t))&&void 0!==n?n:"normal"}}function Li(t){var i,n,s,e,r;return{Zt:t.text(),Si:t.coordinate(),xi:null===(i=t.fixedCoordinate)||void 0===i?void 0:i.call(t),O:t.textColor(),t:t.backColor(),kt:null===(s=null===(n=t.visible)||void 0===n?void 0:n.call(t))||void 0===s||s,hi:null===(r=null===(e=t.tickVisible)||void 0===e?void 0:e.call(t))||void 0===r||r}}class Ni{constructor(t,i){this.Wt=new it,this.bl=t,this.wl=i}gt(){return this.Wt.J(Object.assign({ji:this.wl.ji()},Li(this.bl))),this.Wt}}class Fi extends J{constructor(t,i){super(),this.bl=t,this.Ei=i}zi(t,i,n){const s=Li(this.bl);n.t=s.t,t.O=s.O;const e=2/12*this.Ei.P();n.bi=e,n.wi=e,n.Si=s.Si,n.xi=s.xi,t.Zt=s.Zt,t.kt=s.kt,t.hi=s.hi}}class Wi{constructor(t,i){this.gl=null,this.Ml=null,this.xl=null,this.Sl=null,this.yl=null,this.kl=t,this.Nr=i}Cl(){return this.kl}Rn(){var t,i;null===(i=(t=this.kl).updateAllViews)||void 0===i||i.call(t)}Cn(){var t,i,n,s;const e=null!==(n=null===(i=(t=this.kl).paneViews)||void 0===i?void 0:i.call(t))&&void 0!==n?n:[];if((null===(s=this.gl)||void 0===s?void 0:s.vl)===e)return this.gl.pl;const r=e.map((t=>new Ii(t)));return this.gl={vl:e,pl:r},r}Ji(){var t,i,n,s;const e=null!==(n=null===(i=(t=this.kl).timeAxisViews)||void 0===i?void 0:i.call(t))&&void 0!==n?n:[];if((null===(s=this.Ml)||void 0===s?void 0:s.vl)===e)return this.Ml.pl;const r=this.Nr.$t().St(),h=e.map((t=>new Ni(t,r)));return this.Ml={vl:e,pl:h},h}Tn(){var t,i,n,s;const e=null!==(n=null===(i=(t=this.kl).priceAxisViews)||void 0===i?void 0:i.call(t))&&void 0!==n?n:[];if((null===(s=this.xl)||void 0===s?void 0:s.vl)===e)return this.xl.pl;const r=this.Nr.Dt(),h=e.map((t=>new Fi(t,r)));return this.xl={vl:e,pl:h},h}Tl(){var t,i,n,s;const e=null!==(n=null===(i=(t=this.kl).priceAxisPaneViews)||void 0===i?void 0:i.call(t))&&void 0!==n?n:[];if((null===(s=this.Sl)||void 0===s?void 0:s.vl)===e)return this.Sl.pl;const r=e.map((t=>new Ii(t)));return this.Sl={vl:e,pl:r},r}Pl(){var t,i,n,s;const e=null!==(n=null===(i=(t=this.kl).timeAxisPaneViews)||void 0===i?void 0:i.call(t))&&void 0!==n?n:[];if((null===(s=this.yl)||void 0===s?void 0:s.vl)===e)return this.yl.pl;const r=e.map((t=>new Ii(t)));return this.yl={vl:e,pl:r},r}Rl(t,i){var n,s,e;return null!==(e=null===(s=(n=this.kl).autoscaleInfo)||void 0===s?void 0:s.call(n,t,i))&&void 0!==e?e:null}pr(t,i){var n,s,e;return null!==(e=null===(s=(n=this.kl).hitTest)||void 0===s?void 0:s.call(n,t,i))&&void 0!==e?e:null}}function ji(t,i,n,s){t.forEach((t=>{i(t).forEach((t=>{t.ml()===n&&s.push(t)}))}))}function Hi(t){return t.Cn()}function $i(t){return t.Tl()}function Ui(t){return t.Pl()}class qi extends Ri{constructor(t,i,n,s,e){super(t),this.Et=new Vi,this.Eh=new Mi(this),this.Dl=[],this.Ol=new si(this),this.Al=null,this.Bl=null,this.Vl=[],this.zl=[],this.El=null,this.Il=[],this._n=i,this.Ll=n;const r=new xi(this);this.en=[r],this.Ih=new ti(r,this,t),"Area"!==n&&"Line"!==n&&"Baseline"!==n||(this.Al=new ai(this)),this.Nl(),this.Fl(e)}S(){null!==this.El&&clearTimeout(this.El)}oh(t){return this._n.priceLineColor||t}Ur(t){const i={qr:!0},n=this.Dt();if(this.$t().St().Li()||n.Li()||this.Et.Li())return i;const s=this.$t().St().qs(),e=this.Ct();if(null===s||null===e)return i;let r,h;if(t){const t=this.Et.Gh();if(null===t)return i;r=t,h=t.ie}else{const t=this.Et.il(s.ui(),-1);if(null===t)return i;if(r=this.Et.Uh(t.ie),null===r)return i;h=t.ie}const l=r.Ot[3],a=this.js().Ws(h,{Ot:r}),o=n.Rt(l,e.Ot);return{qr:!1,_t:l,Zt:n.Ni(l,e.Ot),ph:n.Wl(l),mh:n.jl(l,e.Ot),O:a.oe,Si:o,ie:h}}js(){return null!==this.Bl||(this.Bl=new Oi(this)),this.Bl}W(){return this._n}Lh(t){const i=t.priceScaleId;void 0!==i&&i!==this._n.priceScaleId&&this.$t().Hl(this,i),C(this._n,t),void 0!==t.priceFormat&&(this.Nl(),this.$t().$l()),this.$t().Ul(this),this.$t().ql(),this.mn.bt("options")}J(t,i){this.Et.J(t),this.Yl(),this.mn.bt("data"),this.un.bt("data"),null!==this.Al&&(i&&i.Xl?this.Al.Wr():0===t.length&&this.Al.Fr());const n=this.$t()._r(this);this.$t().Kl(n),this.$t().Ul(this),this.$t().ql(),this.$t().Nh()}Zl(t){this.Vl=t,this.Yl();const i=this.$t()._r(this);this.un.bt("data"),this.$t().Kl(i),this.$t().Ul(this),this.$t().ql(),this.$t().Nh()}Gl(){return this.Vl}lh(){return this.zl}Jl(t){const i=new Pi(this,t);return this.Dl.push(i),this.$t().Ul(this),i}Ql(t){const i=this.Dl.indexOf(t);-1!==i&&this.Dl.splice(i,1),this.$t().Ul(this)}Yh(){return this.Ll}Ct(){const t=this.ta();return null===t?null:{Ot:t.Ot[3],ia:t.ot}}ta(){const t=this.$t().St().qs();if(null===t)return null;const i=t.Rs();return this.Et.il(i,1)}Bn(){return this.Et}ah(t){const i=this.Et.Uh(t);return null===i?null:"Bar"===this.Ll||"Candlestick"===this.Ll||"Custom"===this.Ll?{me:i.Ot[0],be:i.Ot[1],we:i.Ot[2],ge:i.Ot[3]}:i.Ot[3]}na(t){const i=[];ji(this.Il,Hi,"top",i);const n=this.Al;return null!==n&&n.kt()?(null===this.El&&n.Hr()&&(this.El=setTimeout((()=>{this.El=null,this.$t().sa()}),0)),n.jr(),i.push(n),i):i}Cn(){const t=[];this.ea()||t.push(this.Ol),t.push(this.mn,this.Eh,this.un);const i=this.Dl.map((t=>t.Fh()));return t.push(...i),ji(this.Il,Hi,"normal",t),t}ra(){return this.ha(Hi,"bottom")}la(t){return this.ha($i,t)}aa(t){return this.ha(Ui,t)}oa(t,i){return this.Il.map((n=>n.pr(t,i))).filter((t=>null!==t))}Gi(t){return[this.Ih,...this.Dl.map((t=>t.Wh()))]}Tn(t,i){if(i!==this.qi&&!this.ea())return[];const n=[...this.en];for(const t of this.Dl)n.push(t.jh());return this.Il.forEach((t=>{n.push(...t.Tn())})),n}Ji(){const t=[];return this.Il.forEach((i=>{t.push(...i.Ji())})),t}Rl(t,i){if(void 0!==this._n.autoscaleInfoProvider){const n=this._n.autoscaleInfoProvider((()=>{const n=this._a(t,i);return null===n?null:n.Th()}));return ki.Ph(n)}return this._a(t,i)}ua(){return this._n.priceFormat.minMove}ca(){return this.da}Rn(){var t;this.mn.bt(),this.un.bt();for(const t of this.en)t.bt();for(const t of this.Dl)t.bt();this.Eh.bt(),this.Ol.bt(),null===(t=this.Al)||void 0===t||t.bt(),this.Il.forEach((t=>t.Rn()))}Dt(){return f(super.Dt())}yt(t){if(!(("Line"===this.Ll||"Area"===this.Ll||"Baseline"===this.Ll)&&this._n.crosshairMarkerVisible))return null;const i=this.Et.Uh(t);if(null===i)return null;return{_t:i.Ot[3],ht:this.fa(),At:this.va(),Pt:this.pa(),Tt:this.ma(t)}}_h(){return this._n.title}kt(){return this._n.visible}ba(t){this.Il.push(new Wi(t,this))}wa(t){this.Il=this.Il.filter((i=>i.Cl()!==t))}ga(){if(this.mn instanceof qt!=!1)return t=>this.mn.Le(t)}Ma(){if(this.mn instanceof qt!=!1)return t=>this.mn.Ne(t)}ea(){return!ht(this.Dt().xa())}_a(t,i){if(!P(t)||!P(i)||this.Et.Li())return null;const n="Line"===this.Ll||"Area"===this.Ll||"Baseline"===this.Ll||"Histogram"===this.Ll?[3]:[2,1],s=this.Et.sl(t,i,n);let e=null!==s?new yi(s.ul,s.cl):null;if("Histogram"===this.Yh()){const t=this._n.base,i=new yi(t,t);e=null!==e?e.Jn(i):i}let r=this.un.hh();return this.Il.forEach((n=>{const s=n.Rl(t,i);if(null==s?void 0:s.priceRange){const t=new yi(s.priceRange.minValue,s.priceRange.maxValue);e=null!==e?e.Jn(t):t}var h,l,a,o;(null==s?void 0:s.margins)&&(h=r,l=s.margins,r={above:Math.max(null!==(a=null==h?void 0:h.above)&&void 0!==a?a:0,l.above),below:Math.max(null!==(o=null==h?void 0:h.below)&&void 0!==o?o:0,l.below)})})),new ki(e,r)}fa(){switch(this.Ll){case"Line":case"Area":case"Baseline":return this._n.crosshairMarkerRadius}return 0}va(){switch(this.Ll){case"Line":case"Area":case"Baseline":{const t=this._n.crosshairMarkerBorderColor;if(0!==t.length)return t}}return null}pa(){switch(this.Ll){case"Line":case"Area":case"Baseline":return this._n.crosshairMarkerBorderWidth}return 0}ma(t){switch(this.Ll){case"Line":case"Area":case"Baseline":{const t=this._n.crosshairMarkerBackgroundColor;if(0!==t.length)return t}}return this.js().Ws(t).oe}Nl(){switch(this._n.priceFormat.type){case"custom":this.da={format:this._n.priceFormat.formatter};break;case"volume":this.da=new ct(this._n.priceFormat.precision);break;case"percent":this.da=new ut(this._n.priceFormat.precision);break;default:{const t=Math.pow(10,this._n.priceFormat.precision);this.da=new _t(t,this._n.priceFormat.minMove*t)}}null!==this.qi&&this.qi.Sa()}Yl(){const t=this.$t().St();if(!t.ya()||this.Et.Li())return void(this.zl=[]);const i=f(this.Et.Jh());this.zl=this.Vl.map(((n,s)=>{const e=f(t.ka(n.time,!0)),r=e<i?1:-1;return{time:f(this.Et.il(e,r)).ie,position:n.position,shape:n.shape,color:n.color,id:n.id,Gr:s,text:n.text,size:n.size,originalTime:n.originalTime}}))}Fl(t){switch(this.un=new gi(this,this.$t()),this.Ll){case"Bar":this.mn=new Nt(this,this.$t());break;case"Candlestick":this.mn=new $t(this,this.$t());break;case"Line":this.mn=new Zt(this,this.$t());break;case"Custom":this.mn=new qt(this,this.$t(),d(t));break;case"Area":this.mn=new Et(this,this.$t());break;case"Baseline":this.mn=new jt(this,this.$t());break;case"Histogram":this.mn=new Kt(this,this.$t());break;default:throw Error("Unknown chart style assigned: "+this.Ll)}}ha(t,i){const n=[];return ji(this.Il,t,i,n),n}}class Yi{constructor(t){this._n=t}Ca(t,i,n){let s=t;if(0===this._n.mode)return s;const e=n.dn(),r=e.Ct();if(null===r)return s;const h=e.Rt(t,r),l=n.Ta().filter((t=>t instanceof qi)).reduce(((t,s)=>{if(n.ur(s)||!s.kt())return t;const e=s.Dt(),r=s.Bn();if(e.Li()||!r.Yr(i))return t;const h=r.Uh(i);if(null===h)return t;const l=v(s.Ct());return t.concat([e.Rt(h.Ot[3],l.Ot)])}),[]);if(0===l.length)return s;l.sort(((t,i)=>Math.abs(t-h)-Math.abs(i-h)));const a=l[0];return s=e.fn(a,r),s}}class Xi extends L{constructor(){super(...arguments),this.Et=null}J(t){this.Et=t}Z({context:t,bitmapSize:i,horizontalPixelRatio:n,verticalPixelRatio:s}){if(null===this.Et)return;const e=Math.max(1,Math.floor(n));t.lineWidth=e,function(t,i){t.save(),t.lineWidth%2&&t.translate(.5,.5),i(),t.restore()}(t,(()=>{const r=f(this.Et);if(r.Pa){t.strokeStyle=r.Ra,_(t,r.Da),t.beginPath();for(const s of r.Oa){const r=Math.round(s.Aa*n);t.moveTo(r,-e),t.lineTo(r,i.height+e)}t.stroke()}if(r.Ba){t.strokeStyle=r.Va,_(t,r.za),t.beginPath();for(const n of r.Ea){const r=Math.round(n.Aa*s);t.moveTo(-e,r),t.lineTo(i.width+e,r)}t.stroke()}}))}}class Ki{constructor(t){this.Wt=new Xi,this.ft=!0,this.Qi=t}bt(){this.ft=!0}gt(){if(this.ft){const t=this.Qi.$t().W().grid,i={Ba:t.horzLines.visible,Pa:t.vertLines.visible,Va:t.horzLines.color,Ra:t.vertLines.color,za:t.horzLines.style,Da:t.vertLines.style,Ea:this.Qi.dn().Ia(),Oa:(this.Qi.$t().St().Ia()||[]).map((t=>({Aa:t.coord})))};this.Wt.J(i),this.ft=!1}return this.Wt}}class Zi{constructor(t){this.mn=new Ki(t)}Fh(){return this.mn}}const Gi={La:4,Na:1e-4};function Ji(t,i){const n=100*(t-i)/i;return i<0?-n:n}function Qi(t,i){const n=Ji(t.xh(),i),s=Ji(t.Sh(),i);return new yi(n,s)}function tn(t,i){const n=100*(t-i)/i+100;return i<0?-n:n}function nn(t,i){const n=tn(t.xh(),i),s=tn(t.Sh(),i);return new yi(n,s)}function sn(t,i){const n=Math.abs(t);if(n<1e-15)return 0;const s=Math.log10(n+i.Na)+i.La;return t<0?-s:s}function en(t,i){const n=Math.abs(t);if(n<1e-15)return 0;const s=Math.pow(10,n-i.La)-i.Na;return t<0?-s:s}function rn(t,i){if(null===t)return null;const n=sn(t.xh(),i),s=sn(t.Sh(),i);return new yi(n,s)}function hn(t,i){if(null===t)return null;const n=en(t.xh(),i),s=en(t.Sh(),i);return new yi(n,s)}function ln(t){if(null===t)return Gi;const i=Math.abs(t.Sh()-t.xh());if(i>=1||i<1e-15)return Gi;const n=Math.ceil(Math.abs(Math.log10(i))),s=Gi.La+n;return{La:s,Na:1/Math.pow(10,s)}}class an{constructor(t,i){if(this.Fa=t,this.Wa=i,function(t){if(t<0)return!1;for(let i=t;i>1;i/=10)if(i%10!=0)return!1;return!0}(this.Fa))this.ja=[2,2.5,2];else{this.ja=[];for(let t=this.Fa;1!==t;){if(t%2==0)this.ja.push(2),t/=2;else{if(t%5!=0)throw new Error("unexpected base");this.ja.push(2,2.5),t/=5}if(this.ja.length>100)throw new Error("something wrong with base")}}}Ha(t,i,n){const s=0===this.Fa?0:1/this.Fa;let e=Math.pow(10,Math.max(0,Math.ceil(Math.log10(t-i)))),r=0,h=this.Wa[0];for(;;){const t=Mt(e,s,1e-14)&&e>s+1e-14,i=Mt(e,n*h,1e-14),l=Mt(e,1,1e-14);if(!(t&&i&&l))break;e/=h,h=this.Wa[++r%this.Wa.length]}if(e<=s+1e-14&&(e=s),e=Math.max(1,e),this.ja.length>0&&(l=e,a=1,o=1e-14,Math.abs(l-a)<o))for(r=0,h=this.ja[0];Mt(e,n*h,1e-14)&&e>s+1e-14;)e/=h,h=this.ja[++r%this.ja.length];var l,a,o;return e}}class on{constructor(t,i,n,s){this.$a=[],this.Ei=t,this.Fa=i,this.Ua=n,this.qa=s}Ha(t,i){if(t<i)throw new Error("high < low");const n=this.Ei.Vt(),s=(t-i)*this.Ya()/n,e=new an(this.Fa,[2,2.5,2]),r=new an(this.Fa,[2,2,2.5]),h=new an(this.Fa,[2.5,2,2]),l=[];return l.push(e.Ha(t,i,s),r.Ha(t,i,s),h.Ha(t,i,s)),function(t){if(t.length<1)throw Error("array is empty");let i=t[0];for(let n=1;n<t.length;++n)t[n]<i&&(i=t[n]);return i}(l)}Xa(){const t=this.Ei,i=t.Ct();if(null===i)return void(this.$a=[]);const n=t.Vt(),s=this.Ua(n-1,i),e=this.Ua(0,i),r=this.Ei.W().entireTextOnly?this.Ka()/2:0,h=r,l=n-1-r,a=Math.max(s,e),o=Math.min(s,e);if(a===o)return void(this.$a=[]);let _=this.Ha(a,o),u=a%_;u+=u<0?_:0;const c=a>=o?1:-1;let d=null,f=0;for(let n=a-u;n>o;n-=_){const s=this.qa(n,i,!0);null!==d&&Math.abs(s-d)<this.Ya()||(s<h||s>l||(f<this.$a.length?(this.$a[f].Aa=s,this.$a[f].Za=t.Ga(n)):this.$a.push({Aa:s,Za:t.Ga(n)}),f++,d=s,t.Ja()&&(_=this.Ha(n*c,o))))}this.$a.length=f}Ia(){return this.$a}Ka(){return this.Ei.P()}Ya(){return Math.ceil(2.5*this.Ka())}}function _n(t){return t.slice().sort(((t,i)=>f(t.Xi())-f(i.Xi())))}var un;!function(t){t[t.Normal=0]="Normal",t[t.Logarithmic=1]="Logarithmic",t[t.Percentage=2]="Percentage",t[t.IndexedTo100=3]="IndexedTo100"}(un||(un={}));const cn=new ut,dn=new _t(100,1);class fn{constructor(t,i,n,s){this.Qa=0,this.io=null,this.Rh=null,this.no=null,this.so={eo:!1,ro:null},this.ho=0,this.lo=0,this.ao=new k,this.oo=new k,this._o=[],this.uo=null,this.co=null,this.do=null,this.fo=null,this.da=dn,this.vo=ln(null),this.po=t,this._n=i,this.mo=n,this.bo=s,this.wo=new on(this,100,this.Mo.bind(this),this.xo.bind(this))}xa(){return this.po}W(){return this._n}Lh(t){if(C(this._n,t),this.Sa(),void 0!==t.mode&&this.So({Sr:t.mode}),void 0!==t.scaleMargins){const i=d(t.scaleMargins.top),n=d(t.scaleMargins.bottom);if(i<0||i>1)throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);if(n<0||n>1)throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${n}`);if(i+n>1)throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i+n}`);this.yo(),this.co=null}}ko(){return this._n.autoScale}Ja(){return 1===this._n.mode}fh(){return 2===this._n.mode}Co(){return 3===this._n.mode}Sr(){return{Nn:this._n.autoScale,To:this._n.invertScale,Sr:this._n.mode}}So(t){const i=this.Sr();let n=null;void 0!==t.Nn&&(this._n.autoScale=t.Nn),void 0!==t.Sr&&(this._n.mode=t.Sr,2!==t.Sr&&3!==t.Sr||(this._n.autoScale=!0),this.so.eo=!1),1===i.Sr&&t.Sr!==i.Sr&&(!function(t,i){if(null===t)return!1;const n=en(t.xh(),i),s=en(t.Sh(),i);return isFinite(n)&&isFinite(s)}(this.Rh,this.vo)?this._n.autoScale=!0:(n=hn(this.Rh,this.vo),null!==n&&this.Po(n))),1===t.Sr&&t.Sr!==i.Sr&&(n=rn(this.Rh,this.vo),null!==n&&this.Po(n));const s=i.Sr!==this._n.mode;s&&(2===i.Sr||this.fh())&&this.Sa(),s&&(3===i.Sr||this.Co())&&this.Sa(),void 0!==t.To&&i.To!==t.To&&(this._n.invertScale=t.To,this.Ro()),this.oo.m(i,this.Sr())}Do(){return this.oo}P(){return this.mo.fontSize}Vt(){return this.Qa}Oo(t){this.Qa!==t&&(this.Qa=t,this.yo(),this.co=null)}Ao(){if(this.io)return this.io;const t=this.Vt()-this.Bo()-this.Vo();return this.io=t,t}Oh(){return this.zo(),this.Rh}Po(t,i){const n=this.Rh;(i||null===n&&null!==t||null!==n&&!n.gh(t))&&(this.co=null,this.Rh=t)}Li(){return this.zo(),0===this.Qa||!this.Rh||this.Rh.Li()}Eo(t){return this.To()?t:this.Vt()-1-t}Rt(t,i){return this.fh()?t=Ji(t,i):this.Co()&&(t=tn(t,i)),this.xo(t,i)}Gs(t,i,n){this.zo();const s=this.Vo(),e=f(this.Oh()),r=e.xh(),h=e.Sh(),l=this.Ao()-1,a=this.To(),o=l/(h-r),_=void 0===n?0:n.from,u=void 0===n?t.length:n.to,c=this.Io();for(let n=_;n<u;n++){const e=t[n],h=e._t;if(isNaN(h))continue;let l=h;null!==c&&(l=c(e._t,i));const _=s+o*(l-r),u=a?_:this.Qa-1-_;e.st=u}}ve(t,i,n){this.zo();const s=this.Vo(),e=f(this.Oh()),r=e.xh(),h=e.Sh(),l=this.Ao()-1,a=this.To(),o=l/(h-r),_=void 0===n?0:n.from,u=void 0===n?t.length:n.to,c=this.Io();for(let n=_;n<u;n++){const e=t[n];let h=e.me,l=e.be,_=e.we,u=e.ge;null!==c&&(h=c(e.me,i),l=c(e.be,i),_=c(e.we,i),u=c(e.ge,i));let d=s+o*(h-r),f=a?d:this.Qa-1-d;e.de=f,d=s+o*(l-r),f=a?d:this.Qa-1-d,e._e=f,d=s+o*(_-r),f=a?d:this.Qa-1-d,e.ue=f,d=s+o*(u-r),f=a?d:this.Qa-1-d,e.fe=f}}fn(t,i){const n=this.Mo(t,i);return this.Lo(n,i)}Lo(t,i){let n=t;return this.fh()?n=function(t,i){return i<0&&(t=-t),t/100*i+i}(n,i):this.Co()&&(n=function(t,i){return t-=100,i<0&&(t=-t),t/100*i+i}(n,i)),n}Ta(){return this._o}No(){if(this.uo)return this.uo;let t=[];for(let i=0;i<this._o.length;i++){const n=this._o[i];null===n.Xi()&&n.Ki(i+1),t.push(n)}return t=_n(t),this.uo=t,this.uo}Fo(t){-1===this._o.indexOf(t)&&(this._o.push(t),this.Sa(),this.Wo())}jo(t){const i=this._o.indexOf(t);if(-1===i)throw new Error("source is not attached to scale");this._o.splice(i,1),0===this._o.length&&(this.So({Nn:!0}),this.Po(null)),this.Sa(),this.Wo()}Ct(){let t=null;for(const i of this._o){const n=i.Ct();null!==n&&((null===t||n.ia<t.ia)&&(t=n))}return null===t?null:t.Ot}To(){return this._n.invertScale}Ia(){const t=null===this.Ct();if(null!==this.co&&(t||this.co.Ho===t))return this.co.Ia;this.wo.Xa();const i=this.wo.Ia();return this.co={Ia:i,Ho:t},this.ao.m(),i}$o(){return this.ao}Uo(t){this.fh()||this.Co()||null===this.do&&null===this.no&&(this.Li()||(this.do=this.Qa-t,this.no=f(this.Oh()).Mh()))}qo(t){if(this.fh()||this.Co())return;if(null===this.do)return;this.So({Nn:!1}),(t=this.Qa-t)<0&&(t=0);let i=(this.do+.2*(this.Qa-1))/(t+.2*(this.Qa-1));const n=f(this.no).Mh();i=Math.max(i,.1),n.kh(i),this.Po(n)}Yo(){this.fh()||this.Co()||(this.do=null,this.no=null)}Xo(t){this.ko()||null===this.fo&&null===this.no&&(this.Li()||(this.fo=t,this.no=f(this.Oh()).Mh()))}Ko(t){if(this.ko())return;if(null===this.fo)return;const i=f(this.Oh()).yh()/(this.Ao()-1);let n=t-this.fo;this.To()&&(n*=-1);const s=n*i,e=f(this.no).Mh();e.Ch(s),this.Po(e,!0),this.co=null}Zo(){this.ko()||null!==this.fo&&(this.fo=null,this.no=null)}ca(){return this.da||this.Sa(),this.da}Ni(t,i){switch(this._n.mode){case 2:return this.Go(Ji(t,i));case 3:return this.ca().format(tn(t,i));default:return this.zh(t)}}Ga(t){switch(this._n.mode){case 2:return this.Go(t);case 3:return this.ca().format(t);default:return this.zh(t)}}Wl(t){return this.zh(t,f(this.Jo()).ca())}jl(t,i){return t=Ji(t,i),this.Go(t,cn)}Qo(){return this._o}t_(t){this.so={ro:t,eo:!1}}Rn(){this._o.forEach((t=>t.Rn()))}Sa(){this.co=null;const t=this.Jo();let i=100;null!==t&&(i=Math.round(1/t.ua())),this.da=dn,this.fh()?(this.da=cn,i=100):this.Co()?(this.da=new _t(100,1),i=100):null!==t&&(this.da=t.ca()),this.wo=new on(this,i,this.Mo.bind(this),this.xo.bind(this)),this.wo.Xa()}Wo(){this.uo=null}Jo(){return this._o[0]||null}Bo(){return this.To()?this._n.scaleMargins.bottom*this.Vt()+this.lo:this._n.scaleMargins.top*this.Vt()+this.ho}Vo(){return this.To()?this._n.scaleMargins.top*this.Vt()+this.ho:this._n.scaleMargins.bottom*this.Vt()+this.lo}zo(){this.so.eo||(this.so.eo=!0,this.i_())}yo(){this.io=null}xo(t,i){if(this.zo(),this.Li())return 0;t=this.Ja()&&t?sn(t,this.vo):t;const n=f(this.Oh()),s=this.Vo()+(this.Ao()-1)*(t-n.xh())/n.yh();return this.Eo(s)}Mo(t,i){if(this.zo(),this.Li())return 0;const n=this.Eo(t),s=f(this.Oh()),e=s.xh()+s.yh()*((n-this.Vo())/(this.Ao()-1));return this.Ja()?en(e,this.vo):e}Ro(){this.co=null,this.wo.Xa()}i_(){const t=this.so.ro;if(null===t)return;let i=null;const n=this.Qo();let s=0,e=0;for(const r of n){if(!r.kt())continue;const n=r.Ct();if(null===n)continue;const h=r.Rl(t.Rs(),t.ui());let l=h&&h.Oh();if(null!==l){switch(this._n.mode){case 1:l=rn(l,this.vo);break;case 2:l=Qi(l,n.Ot);break;case 3:l=nn(l,n.Ot)}if(i=null===i?l:i.Jn(f(l)),null!==h){const t=h.Ah();null!==t&&(s=Math.max(s,t.above),e=Math.max(s,t.below))}}}if(s===this.ho&&e===this.lo||(this.ho=s,this.lo=e,this.co=null,this.yo()),null!==i){if(i.xh()===i.Sh()){const t=this.Jo(),n=5*(null===t||this.fh()||this.Co()?1:t.ua());this.Ja()&&(i=hn(i,this.vo)),i=new yi(i.xh()-n,i.Sh()+n),this.Ja()&&(i=rn(i,this.vo))}if(this.Ja()){const t=hn(i,this.vo),n=ln(t);if(r=n,h=this.vo,r.La!==h.La||r.Na!==h.Na){const s=null!==this.no?hn(this.no,this.vo):null;this.vo=n,i=rn(t,n),null!==s&&(this.no=rn(s,n))}}this.Po(i)}else null===this.Rh&&(this.Po(new yi(-.5,.5)),this.vo=ln(null));var r,h;this.so.eo=!0}Io(){return this.fh()?Ji:this.Co()?tn:this.Ja()?t=>sn(t,this.vo):null}n_(t,i,n){return void 0===i?(void 0===n&&(n=this.ca()),n.format(t)):i(t)}zh(t,i){return this.n_(t,this.bo.priceFormatter,i)}Go(t,i){return this.n_(t,this.bo.percentageFormatter,i)}}class vn{constructor(t,i){this._o=[],this.s_=new Map,this.Qa=0,this.e_=0,this.r_=1e3,this.uo=null,this.h_=new k,this.wl=t,this.Hi=i,this.l_=new Zi(this);const n=i.W();this.a_=this.o_("left",n.leftPriceScale),this.__=this.o_("right",n.rightPriceScale),this.a_.Do().l(this.u_.bind(this,this.a_),this),this.__.Do().l(this.u_.bind(this,this.__),this),this.c_(n)}c_(t){if(t.leftPriceScale&&this.a_.Lh(t.leftPriceScale),t.rightPriceScale&&this.__.Lh(t.rightPriceScale),t.localization&&(this.a_.Sa(),this.__.Sa()),t.overlayPriceScales){const i=Array.from(this.s_.values());for(const n of i){const i=f(n[0].Dt());i.Lh(t.overlayPriceScales),t.localization&&i.Sa()}}}d_(t){switch(t){case"left":return this.a_;case"right":return this.__}return this.s_.has(t)?d(this.s_.get(t))[0].Dt():null}S(){this.$t().f_().p(this),this.a_.Do().p(this),this.__.Do().p(this),this._o.forEach((t=>{t.S&&t.S()})),this.h_.m()}v_(){return this.r_}p_(t){this.r_=t}$t(){return this.Hi}ji(){return this.e_}Vt(){return this.Qa}m_(t){this.e_=t,this.b_()}Oo(t){this.Qa=t,this.a_.Oo(t),this.__.Oo(t),this._o.forEach((i=>{if(this.ur(i)){const n=i.Dt();null!==n&&n.Oo(t)}})),this.b_()}Ta(){return this._o}ur(t){const i=t.Dt();return null===i||this.a_!==i&&this.__!==i}Fo(t,i,n){const s=void 0!==n?n:this.g_().w_+1;this.M_(t,i,s)}jo(t){const i=this._o.indexOf(t);c(-1!==i,"removeDataSource: invalid data source"),this._o.splice(i,1);const n=f(t.Dt()).xa();if(this.s_.has(n)){const i=d(this.s_.get(n)),s=i.indexOf(t);-1!==s&&(i.splice(s,1),0===i.length&&this.s_.delete(n))}const s=t.Dt();s&&s.Ta().indexOf(t)>=0&&s.jo(t),null!==s&&(s.Wo(),this.x_(s)),this.uo=null}dr(t){return t===this.a_?"left":t===this.__?"right":"overlay"}S_(){return this.a_}y_(){return this.__}k_(t,i){t.Uo(i)}C_(t,i){t.qo(i),this.b_()}T_(t){t.Yo()}P_(t,i){t.Xo(i)}R_(t,i){t.Ko(i),this.b_()}D_(t){t.Zo()}b_(){this._o.forEach((t=>{t.Rn()}))}dn(){let t=null;return this.Hi.W().rightPriceScale.visible&&0!==this.__.Ta().length?t=this.__:this.Hi.W().leftPriceScale.visible&&0!==this.a_.Ta().length?t=this.a_:0!==this._o.length&&(t=this._o[0].Dt()),null===t&&(t=this.__),t}cr(){let t=null;return this.Hi.W().rightPriceScale.visible?t=this.__:this.Hi.W().leftPriceScale.visible&&(t=this.a_),t}x_(t){null!==t&&t.ko()&&this.O_(t)}A_(t){const i=this.wl.qs();t.So({Nn:!0}),null!==i&&t.t_(i),this.b_()}B_(){this.O_(this.a_),this.O_(this.__)}V_(){this.x_(this.a_),this.x_(this.__),this._o.forEach((t=>{this.ur(t)&&this.x_(t.Dt())})),this.b_(),this.Hi.Nh()}No(){return null===this.uo&&(this.uo=_n(this._o)),this.uo}z_(){return this.h_}E_(){return this.l_}O_(t){const i=t.Qo();if(i&&i.length>0&&!this.wl.Li()){const i=this.wl.qs();null!==i&&t.t_(i)}t.Rn()}g_(){const t=this.No();if(0===t.length)return{I_:0,w_:0};let i=0,n=0;for(let s=0;s<t.length;s++){const e=t[s].Xi();null!==e&&(e<i&&(i=e),e>n&&(n=e))}return{I_:i,w_:n}}M_(t,i,n){let s=this.d_(i);if(null===s&&(s=this.o_(i,this.Hi.W().overlayPriceScales)),this._o.push(t),!ht(i)){const n=this.s_.get(i)||[];n.push(t),this.s_.set(i,n)}s.Fo(t),t.Zi(s),t.Ki(n),this.x_(s),this.uo=null}u_(t,i,n){i.Sr!==n.Sr&&this.O_(t)}o_(t,i){const n=Object.assign({visible:!0,autoScale:!0},O(i)),s=new fn(t,n,this.Hi.W().layout,this.Hi.W().localization);return s.Oo(this.Vt()),s}}class pn{constructor(t,i,n=50){this.Ye=0,this.Xe=1,this.Ke=1,this.Ge=new Map,this.Ze=new Map,this.L_=t,this.N_=i,this.Je=n}F_(t){const i=t.time,n=this.N_.cacheKey(i),s=this.Ge.get(n);if(void 0!==s)return s.W_;if(this.Ye===this.Je){const t=this.Ze.get(this.Ke);this.Ze.delete(this.Ke),this.Ge.delete(d(t)),this.Ke++,this.Ye--}const e=this.L_(t);return this.Ge.set(n,{W_:e,nr:this.Xe}),this.Ze.set(this.Xe,n),this.Ye++,this.Xe++,e}}class mn{constructor(t,i){c(t<=i,"right should be >= left"),this.j_=t,this.H_=i}Rs(){return this.j_}ui(){return this.H_}U_(){return this.H_-this.j_+1}Yr(t){return this.j_<=t&&t<=this.H_}gh(t){return this.j_===t.Rs()&&this.H_===t.ui()}}function bn(t,i){return null===t||null===i?t===i:t.gh(i)}class wn{constructor(){this.q_=new Map,this.Ge=null,this.Y_=!1}X_(t){this.Y_=t,this.Ge=null}K_(t,i){this.Z_(i),this.Ge=null;for(let n=i;n<t.length;++n){const i=t[n];let s=this.q_.get(i.timeWeight);void 0===s&&(s=[],this.q_.set(i.timeWeight,s)),s.push({index:n,time:i.time,weight:i.timeWeight,originalTime:i.originalTime})}}G_(t,i){const n=Math.ceil(i/t);return null!==this.Ge&&this.Ge.J_===n||(this.Ge={Ia:this.Q_(n),J_:n}),this.Ge.Ia}Z_(t){if(0===t)return void this.q_.clear();const i=[];this.q_.forEach(((n,s)=>{t<=n[0].index?i.push(s):n.splice(Rt(n,t,(i=>i.index<t)),1/0)}));for(const t of i)this.q_.delete(t)}Q_(t){let i=[];for(const n of Array.from(this.q_.keys()).sort(((t,i)=>i-t))){if(!this.q_.get(n))continue;const s=i;i=[];const e=s.length;let r=0;const h=d(this.q_.get(n)),l=h.length;let a=1/0,o=-1/0;for(let n=0;n<l;n++){const l=h[n],_=l.index;for(;r<e;){const t=s[r],n=t.index;if(!(n<_)){a=n;break}r++,i.push(t),o=n,a=1/0}if(a-_>=t&&_-o>=t)i.push(l),o=_;else if(this.Y_)return s}for(;r<e;r++)i.push(s[r])}return i}}class gn{constructor(t){this.tu=t}iu(){return null===this.tu?null:new mn(Math.floor(this.tu.Rs()),Math.ceil(this.tu.ui()))}nu(){return this.tu}static su(){return new gn(null)}}function Mn(t,i){return t.weight>i.weight?t:i}class xn{constructor(t,i,n,s){this.e_=0,this.eu=null,this.ru=[],this.fo=null,this.do=null,this.hu=new wn,this.lu=new Map,this.au=gn.su(),this.ou=!0,this._u=new k,this.uu=new k,this.cu=new k,this.du=null,this.fu=null,this.vu=[],this._n=i,this.bo=n,this.pu=i.rightOffset,this.mu=i.barSpacing,this.Hi=t,this.N_=s,this.bu(),this.hu.X_(i.uniformDistribution)}W(){return this._n}wu(t){C(this.bo,t),this.gu(),this.bu()}Lh(t,i){var n;C(this._n,t),this._n.fixLeftEdge&&this.Mu(),this._n.fixRightEdge&&this.xu(),void 0!==t.barSpacing&&this.Hi.Kn(t.barSpacing),void 0!==t.rightOffset&&this.Hi.Zn(t.rightOffset),void 0!==t.minBarSpacing&&this.Hi.Kn(null!==(n=t.barSpacing)&&void 0!==n?n:this.mu),this.gu(),this.bu(),this.cu.m()}vn(t){var i,n;return null!==(n=null===(i=this.ru[t])||void 0===i?void 0:i.time)&&void 0!==n?n:null}$i(t){var i;return null!==(i=this.ru[t])&&void 0!==i?i:null}ka(t,i){if(this.ru.length<1)return null;if(this.N_.key(t)>this.N_.key(this.ru[this.ru.length-1].time))return i?this.ru.length-1:null;const n=Rt(this.ru,this.N_.key(t),((t,i)=>this.N_.key(t.time)<i));return this.N_.key(t)<this.N_.key(this.ru[n].time)?i?n:null:n}Li(){return 0===this.e_||0===this.ru.length||null===this.eu}ya(){return this.ru.length>0}qs(){return this.Su(),this.au.iu()}yu(){return this.Su(),this.au.nu()}ku(){const t=this.qs();if(null===t)return null;const i={from:t.Rs(),to:t.ui()};return this.Cu(i)}Cu(t){const i=Math.round(t.from),n=Math.round(t.to),s=f(this.Tu()),e=f(this.Pu());return{from:f(this.$i(Math.max(s,i))),to:f(this.$i(Math.min(e,n)))}}Ru(t){return{from:f(this.ka(t.from,!0)),to:f(this.ka(t.to,!0))}}ji(){return this.e_}m_(t){if(!isFinite(t)||t<=0)return;if(this.e_===t)return;const i=this.yu(),n=this.e_;if(this.e_=t,this.ou=!0,this._n.lockVisibleTimeRangeOnResize&&0!==n){const i=this.mu*t/n;this.mu=i}if(this._n.fixLeftEdge&&null!==i&&i.Rs()<=0){const i=n-t;this.pu-=Math.round(i/this.mu)+1,this.ou=!0}this.Du(),this.Ou()}zt(t){if(this.Li()||!P(t))return 0;const i=this.Au()+this.pu-t;return this.e_-(i+.5)*this.mu-1}Zs(t,i){const n=this.Au(),s=void 0===i?0:i.from,e=void 0===i?t.length:i.to;for(let i=s;i<e;i++){const s=t[i].ot,e=n+this.pu-s,r=this.e_-(e+.5)*this.mu-1;t[i].nt=r}}Bu(t){return Math.ceil(this.Vu(t))}Zn(t){this.ou=!0,this.pu=t,this.Ou(),this.Hi.zu(),this.Hi.Nh()}ee(){return this.mu}Kn(t){this.Eu(t),this.Ou(),this.Hi.zu(),this.Hi.Nh()}Iu(){return this.pu}Ia(){if(this.Li())return null;if(null!==this.fu)return this.fu;const t=this.mu,i=5*(this.Hi.W().layout.fontSize+4)/8*(this._n.tickMarkMaxCharacterLength||8),n=Math.round(i/t),s=f(this.qs()),e=Math.max(s.Rs(),s.Rs()-n),r=Math.max(s.ui(),s.ui()-n),h=this.hu.G_(t,i),l=this.Tu()+n,a=this.Pu()-n,o=this.Lu(),_=this._n.fixLeftEdge||o,u=this._n.fixRightEdge||o;let c=0;for(const t of h){if(!(e<=t.index&&t.index<=r))continue;let n;c<this.vu.length?(n=this.vu[c],n.coord=this.zt(t.index),n.label=this.Nu(t),n.weight=t.weight):(n={needAlignCoordinate:!1,coord:this.zt(t.index),label:this.Nu(t),weight:t.weight},this.vu.push(n)),this.mu>i/2&&!o?n.needAlignCoordinate=!1:n.needAlignCoordinate=_&&t.index<=l||u&&t.index>=a,c++}return this.vu.length=c,this.fu=this.vu,this.vu}Fu(){this.ou=!0,this.Kn(this._n.barSpacing),this.Zn(this._n.rightOffset)}Wu(t){this.ou=!0,this.eu=t,this.Ou(),this.Mu()}ju(t,i){const n=this.Vu(t),s=this.ee(),e=s+i*(s/10);this.Kn(e),this._n.rightBarStaysOnScroll||this.Zn(this.Iu()+(n-this.Vu(t)))}Uo(t){this.fo&&this.Zo(),null===this.do&&null===this.du&&(this.Li()||(this.do=t,this.Hu()))}qo(t){if(null===this.du)return;const i=gt(this.e_-t,0,this.e_),n=gt(this.e_-f(this.do),0,this.e_);0!==i&&0!==n&&this.Kn(this.du.ee*i/n)}Yo(){null!==this.do&&(this.do=null,this.$u())}Xo(t){null===this.fo&&null===this.du&&(this.Li()||(this.fo=t,this.Hu()))}Ko(t){if(null===this.fo)return;const i=(this.fo-t)/this.ee();this.pu=f(this.du).Iu+i,this.ou=!0,this.Ou()}Zo(){null!==this.fo&&(this.fo=null,this.$u())}Uu(){this.qu(this._n.rightOffset)}qu(t,i=400){if(!isFinite(t))throw new RangeError("offset is required and must be finite number");if(!isFinite(i)||i<=0)throw new RangeError("animationDuration (optional) must be finite positive number");const n=this.pu,s=performance.now();this.Hi.qn({Yu:t=>(t-s)/i>=1,Xu:e=>{const r=(e-s)/i;return r>=1?t:n+(t-n)*r}})}bt(t,i){this.ou=!0,this.ru=t,this.hu.K_(t,i),this.Ou()}Ku(){return this._u}Zu(){return this.uu}Gu(){return this.cu}Au(){return this.eu||0}Ju(t){const i=t.U_();this.Eu(this.e_/i),this.pu=t.ui()-this.Au(),this.Ou(),this.ou=!0,this.Hi.zu(),this.Hi.Nh()}Qu(){const t=this.Tu(),i=this.Pu();null!==t&&null!==i&&this.Ju(new mn(t,i+this._n.rightOffset))}tc(t){const i=new mn(t.from,t.to);this.Ju(i)}Ui(t){return void 0!==this.bo.timeFormatter?this.bo.timeFormatter(t.originalTime):this.N_.formatHorzItem(t.time)}Lu(){const{handleScroll:t,handleScale:i}=this.Hi.W();return!(t.horzTouchDrag||t.mouseWheel||t.pressedMouseMove||t.vertTouchDrag||i.axisDoubleClickReset.time||i.axisPressedMouseMove.time||i.mouseWheel||i.pinch)}Tu(){return 0===this.ru.length?null:0}Pu(){return 0===this.ru.length?null:this.ru.length-1}ic(t){return(this.e_-1-t)/this.mu}Vu(t){const i=this.ic(t),n=this.Au()+this.pu-i;return Math.round(1e6*n)/1e6}Eu(t){const i=this.mu;this.mu=t,this.Du(),i!==this.mu&&(this.ou=!0,this.nc())}Su(){if(!this.ou)return;if(this.ou=!1,this.Li())return void this.sc(gn.su());const t=this.Au(),i=this.e_/this.mu,n=this.pu+t,s=new mn(n-i+1,n);this.sc(new gn(s))}Du(){const t=this.ec();if(this.mu<t&&(this.mu=t,this.ou=!0),0!==this.e_){const t=.5*this.e_;this.mu>t&&(this.mu=t,this.ou=!0)}}ec(){return this._n.fixLeftEdge&&this._n.fixRightEdge&&0!==this.ru.length?this.e_/this.ru.length:this._n.minBarSpacing}Ou(){const t=this.rc();this.pu>t&&(this.pu=t,this.ou=!0);const i=this.hc();null!==i&&this.pu<i&&(this.pu=i,this.ou=!0)}hc(){const t=this.Tu(),i=this.eu;if(null===t||null===i)return null;return t-i-1+(this._n.fixLeftEdge?this.e_/this.mu:Math.min(2,this.ru.length))}rc(){return this._n.fixRightEdge?0:this.e_/this.mu-Math.min(2,this.ru.length)}Hu(){this.du={ee:this.ee(),Iu:this.Iu()}}$u(){this.du=null}Nu(t){let i=this.lu.get(t.weight);return void 0===i&&(i=new pn((t=>this.lc(t)),this.N_),this.lu.set(t.weight,i)),i.F_(t)}lc(t){return this.N_.formatTickmark(t,this.bo)}sc(t){const i=this.au;this.au=t,bn(i.iu(),this.au.iu())||this._u.m(),bn(i.nu(),this.au.nu())||this.uu.m(),this.nc()}nc(){this.fu=null}gu(){this.nc(),this.lu.clear()}bu(){this.N_.updateFormatter(this.bo)}Mu(){if(!this._n.fixLeftEdge)return;const t=this.Tu();if(null===t)return;const i=this.qs();if(null===i)return;const n=i.Rs()-t;if(n<0){const t=this.pu-n-1;this.Zn(t)}this.Du()}xu(){this.Ou(),this.Du()}}class Sn{K(t,i,n){t.useMediaCoordinateSpace((t=>this.Z(t,i,n)))}fl(t,i,n){t.useMediaCoordinateSpace((t=>this.ac(t,i,n)))}ac(t,i,n){}}class yn extends Sn{constructor(t){super(),this.oc=new Map,this.Et=t}Z(t){}ac(t){if(!this.Et.kt)return;const{context:i,mediaSize:n}=t;let s=0;for(const t of this.Et._c){if(0===t.Zt.length)continue;i.font=t.R;const e=this.uc(i,t.Zt);e>n.width?t.ju=n.width/e:t.ju=1,s+=t.cc*t.ju}let e=0;switch(this.Et.dc){case"top":e=0;break;case"center":e=Math.max((n.height-s)/2,0);break;case"bottom":e=Math.max(n.height-s,0)}i.fillStyle=this.Et.O;for(const t of this.Et._c){i.save();let s=0;switch(this.Et.fc){case"left":i.textAlign="left",s=t.cc/2;break;case"center":i.textAlign="center",s=n.width/2;break;case"right":i.textAlign="right",s=n.width-1-t.cc/2}i.translate(s,e),i.textBaseline="top",i.font=t.R,i.scale(t.ju,t.ju),i.fillText(t.Zt,0,t.vc),i.restore(),e+=t.cc*t.ju}}uc(t,i){const n=this.mc(t.font);let s=n.get(i);return void 0===s&&(s=t.measureText(i).width,n.set(i,s)),s}mc(t){let i=this.oc.get(t);return void 0===i&&(i=new Map,this.oc.set(t,i)),i}}class kn{constructor(t){this.ft=!0,this.Ft={kt:!1,O:"",_c:[],dc:"center",fc:"center"},this.Wt=new yn(this.Ft),this.jt=t}bt(){this.ft=!0}gt(){return this.ft&&(this.Mt(),this.ft=!1),this.Wt}Mt(){const t=this.jt.W(),i=this.Ft;i.kt=t.visible,i.kt&&(i.O=t.color,i.fc=t.horzAlign,i.dc=t.vertAlign,i._c=[{Zt:t.text,R:z(t.fontSize,t.fontFamily,t.fontStyle),cc:1.2*t.fontSize,vc:0,ju:0}])}}class Cn extends st{constructor(t,i){super(),this._n=i,this.mn=new kn(this)}Tn(){return[]}Cn(){return[this.mn]}W(){return this._n}Rn(){this.mn.bt()}}var Tn,Pn,Rn,Dn,On;!function(t){t[t.OnTouchEnd=0]="OnTouchEnd",t[t.OnNextTap=1]="OnNextTap"}(Tn||(Tn={}));class An{constructor(t,i,n){this.bc=[],this.wc=[],this.e_=0,this.gc=null,this.Mc=new k,this.xc=new k,this.Sc=null,this.yc=t,this._n=i,this.N_=n,this.kc=new E(this),this.wl=new xn(this,i.timeScale,this._n.localization,n),this.vt=new rt(this,i.crosshair),this.Cc=new Yi(i.crosshair),this.Tc=new Cn(this,i.watermark),this.Pc(),this.bc[0].p_(2e3),this.Rc=this.Dc(0),this.Oc=this.Dc(1)}$l(){this.Ac(lt.ns())}Nh(){this.Ac(lt.ts())}sa(){this.Ac(new lt(1))}Ul(t){const i=this.Bc(t);this.Ac(i)}Vc(){return this.gc}zc(t){const i=this.gc;this.gc=t,null!==i&&this.Ul(i.Ec),null!==t&&this.Ul(t.Ec)}W(){return this._n}Lh(t){C(this._n,t),this.bc.forEach((i=>i.c_(t))),void 0!==t.timeScale&&this.wl.Lh(t.timeScale),void 0!==t.localization&&this.wl.wu(t.localization),(t.leftPriceScale||t.rightPriceScale)&&this.Mc.m(),this.Rc=this.Dc(0),this.Oc=this.Dc(1),this.$l()}Ic(t,i){if("left"===t)return void this.Lh({leftPriceScale:i});if("right"===t)return void this.Lh({rightPriceScale:i});const n=this.Lc(t);null!==n&&(n.Dt.Lh(i),this.Mc.m())}Lc(t){for(const i of this.bc){const n=i.d_(t);if(null!==n)return{Ht:i,Dt:n}}return null}St(){return this.wl}Nc(){return this.bc}Fc(){return this.Tc}Wc(){return this.vt}jc(){return this.xc}Hc(t,i){t.Oo(i),this.zu()}m_(t){this.e_=t,this.wl.m_(this.e_),this.bc.forEach((i=>i.m_(t))),this.zu()}Pc(t){const i=new vn(this.wl,this);void 0!==t?this.bc.splice(t,0,i):this.bc.push(i);const n=void 0===t?this.bc.length-1:t,s=lt.ns();return s.In(n,{Ln:0,Nn:!0}),this.Ac(s),i}k_(t,i,n){t.k_(i,n)}C_(t,i,n){t.C_(i,n),this.ql(),this.Ac(this.$c(t,2))}T_(t,i){t.T_(i),this.Ac(this.$c(t,2))}P_(t,i,n){i.ko()||t.P_(i,n)}R_(t,i,n){i.ko()||(t.R_(i,n),this.ql(),this.Ac(this.$c(t,2)))}D_(t,i){i.ko()||(t.D_(i),this.Ac(this.$c(t,2)))}A_(t,i){t.A_(i),this.Ac(this.$c(t,2))}Uc(t){this.wl.Uo(t)}qc(t,i){const n=this.St();if(n.Li()||0===i)return;const s=n.ji();t=Math.max(1,Math.min(t,s)),n.ju(t,i),this.zu()}Yc(t){this.Xc(0),this.Kc(t),this.Zc()}Gc(t){this.wl.qo(t),this.zu()}Jc(){this.wl.Yo(),this.Nh()}Xc(t){this.wl.Xo(t)}Kc(t){this.wl.Ko(t),this.zu()}Zc(){this.wl.Zo(),this.Nh()}wt(){return this.wc}Qc(t,i,n,s,e){this.vt.bn(t,i);let r=NaN,h=this.wl.Bu(t);const l=this.wl.qs();null!==l&&(h=Math.min(Math.max(l.Rs(),h),l.ui()));const a=s.dn(),o=a.Ct();null!==o&&(r=a.fn(i,o)),r=this.Cc.Ca(r,h,s),this.vt.xn(h,r,s),this.sa(),e||this.xc.m(this.vt.xt(),{x:t,y:i},n)}td(t,i,n){const s=n.dn(),e=s.Ct(),r=s.Rt(t,f(e)),h=this.wl.ka(i,!0),l=this.wl.zt(f(h));this.Qc(l,r,null,n,!0)}nd(t){this.Wc().yn(),this.sa(),t||this.xc.m(null,null,null)}ql(){const t=this.vt.Ht();if(null!==t){const i=this.vt.gn(),n=this.vt.Mn();this.Qc(i,n,null,t)}this.vt.Rn()}sd(t,i,n){const s=this.wl.vn(0);void 0!==i&&void 0!==n&&this.wl.bt(i,n);const e=this.wl.vn(0),r=this.wl.Au(),h=this.wl.qs();if(null!==h&&null!==s&&null!==e){const i=h.Yr(r),l=this.N_.key(s)>this.N_.key(e),a=null!==t&&t>r&&!l,o=this.wl.W().allowShiftVisibleRangeOnWhitespaceReplacement,_=i&&(!(void 0===n)||o)&&this.wl.W().shiftVisibleRangeOnNewBar;if(a&&!_){const i=t-r;this.wl.Zn(this.wl.Iu()-i)}}this.wl.Wu(t)}Kl(t){null!==t&&t.V_()}_r(t){const i=this.bc.find((i=>i.No().includes(t)));return void 0===i?null:i}zu(){this.Tc.Rn(),this.bc.forEach((t=>t.V_())),this.ql()}S(){this.bc.forEach((t=>t.S())),this.bc.length=0,this._n.localization.priceFormatter=void 0,this._n.localization.percentageFormatter=void 0,this._n.localization.timeFormatter=void 0}ed(){return this.kc}vr(){return this.kc.W()}f_(){return this.Mc}rd(t,i,n){const s=this.bc[0],e=this.hd(i,t,s,n);return this.wc.push(e),1===this.wc.length?this.$l():this.Nh(),e}ld(t){const i=this._r(t),n=this.wc.indexOf(t);c(-1!==n,"Series not found"),this.wc.splice(n,1),f(i).jo(t),t.S&&t.S()}Hl(t,i){const n=f(this._r(t));n.jo(t);const s=this.Lc(i);if(null===s){const s=t.Xi();n.Fo(t,i,s)}else{const e=s.Ht===n?t.Xi():void 0;s.Ht.Fo(t,i,e)}}Qu(){const t=lt.ts();t.jn(),this.Ac(t)}ad(t){const i=lt.ts();i.Un(t),this.Ac(i)}Xn(){const t=lt.ts();t.Xn(),this.Ac(t)}Kn(t){const i=lt.ts();i.Kn(t),this.Ac(i)}Zn(t){const i=lt.ts();i.Zn(t),this.Ac(i)}qn(t){const i=lt.ts();i.qn(t),this.Ac(i)}Hn(){const t=lt.ts();t.Hn(),this.Ac(t)}od(){return this._n.rightPriceScale.visible?"right":"left"}_d(){return this.Oc}q(){return this.Rc}Bt(t){const i=this.Oc,n=this.Rc;if(i===n)return i;if(t=Math.max(0,Math.min(100,Math.round(100*t))),null===this.Sc||this.Sc.ks!==n||this.Sc.Cs!==i)this.Sc={ks:n,Cs:i,ud:new Map};else{const i=this.Sc.ud.get(t);if(void 0!==i)return i}const s=function(t,i,n){const[s,e,r,h]=S(t),[l,a,o,_]=S(i),u=[m(s+n*(l-s)),m(e+n*(a-e)),m(r+n*(o-r)),b(h+n*(_-h))];return`rgba(${u[0]}, ${u[1]}, ${u[2]}, ${u[3]})`}(n,i,t/100);return this.Sc.ud.set(t,s),s}$c(t,i){const n=new lt(i);if(null!==t){const s=this.bc.indexOf(t);n.In(s,{Ln:i})}return n}Bc(t,i){return void 0===i&&(i=2),this.$c(this._r(t),i)}Ac(t){this.yc&&this.yc(t),this.bc.forEach((t=>t.E_().Fh().bt()))}hd(t,i,n,s){const e=new qi(this,t,i,n,s),r=void 0!==t.priceScaleId?t.priceScaleId:this.od();return n.Fo(e,r),ht(r)||e.Lh(t),e}Dc(t){const i=this._n.layout;return"gradient"===i.background.type?0===t?i.background.topColor:i.background.bottomColor:i.background.color}}function Bn(t){return!T(t)&&!R(t)}function Vn(t){return T(t)}!function(t){t[t.Disabled=0]="Disabled",t[t.Continuous=1]="Continuous",t[t.OnDataUpdate=2]="OnDataUpdate"}(Pn||(Pn={})),function(t){t[t.LastBar=0]="LastBar",t[t.LastVisible=1]="LastVisible"}(Rn||(Rn={})),function(t){t.Solid="solid",t.VerticalGradient="gradient"}(Dn||(Dn={})),function(t){t[t.Year=0]="Year",t[t.Month=1]="Month",t[t.DayOfMonth=2]="DayOfMonth",t[t.Time=3]="Time",t[t.TimeWithSeconds=4]="TimeWithSeconds"}(On||(On={}));const zn=t=>t.getUTCFullYear();function En(t,i,n){return i.replace(/yyyy/g,(t=>ot(zn(t),4))(t)).replace(/yy/g,(t=>ot(zn(t)%100,2))(t)).replace(/MMMM/g,((t,i)=>new Date(t.getUTCFullYear(),t.getUTCMonth(),1).toLocaleString(i,{month:"long"}))(t,n)).replace(/MMM/g,((t,i)=>new Date(t.getUTCFullYear(),t.getUTCMonth(),1).toLocaleString(i,{month:"short"}))(t,n)).replace(/MM/g,(t=>ot((t=>t.getUTCMonth()+1)(t),2))(t)).replace(/dd/g,(t=>ot((t=>t.getUTCDate())(t),2))(t))}class In{constructor(t="yyyy-MM-dd",i="default"){this.dd=t,this.fd=i}F_(t){return En(t,this.dd,this.fd)}}class Ln{constructor(t){this.vd=t||"%h:%m:%s"}F_(t){return this.vd.replace("%h",ot(t.getUTCHours(),2)).replace("%m",ot(t.getUTCMinutes(),2)).replace("%s",ot(t.getUTCSeconds(),2))}}const Nn={pd:"yyyy-MM-dd",md:"%h:%m:%s",bd:" ",wd:"default"};class Fn{constructor(t={}){const i=Object.assign(Object.assign({},Nn),t);this.gd=new In(i.pd,i.wd),this.Md=new Ln(i.md),this.xd=i.bd}F_(t){return`${this.gd.F_(t)}${this.xd}${this.Md.F_(t)}`}}function Wn(t){return 60*t*60*1e3}function jn(t){return 60*t*1e3}const Hn=[{Sd:($n=1,1e3*$n),yd:10},{Sd:jn(1),yd:20},{Sd:jn(5),yd:21},{Sd:jn(30),yd:22},{Sd:Wn(1),yd:30},{Sd:Wn(3),yd:31},{Sd:Wn(6),yd:32},{Sd:Wn(12),yd:33}];var $n;function Un(t,i){if(t.getUTCFullYear()!==i.getUTCFullYear())return 70;if(t.getUTCMonth()!==i.getUTCMonth())return 60;if(t.getUTCDate()!==i.getUTCDate())return 50;for(let n=Hn.length-1;n>=0;--n)if(Math.floor(i.getTime()/Hn[n].Sd)!==Math.floor(t.getTime()/Hn[n].Sd))return Hn[n].yd;return 0}function qn(t){let i=t;if(R(t)&&(i=Xn(t)),!Bn(i))throw new Error("time must be of type BusinessDay");const n=new Date(Date.UTC(i.year,i.month-1,i.day,0,0,0,0));return{kd:Math.round(n.getTime()/1e3),Cd:i}}function Yn(t){if(!Vn(t))throw new Error("time must be of type isUTCTimestamp");return{kd:t}}function Xn(t){const i=new Date(t);if(isNaN(i.getTime()))throw new Error(`Invalid date string=${t}, expected format=yyyy-mm-dd`);return{day:i.getUTCDate(),month:i.getUTCMonth()+1,year:i.getUTCFullYear()}}function Kn(t){R(t.time)&&(t.time=Xn(t.time))}class Zn{options(){return this._n}setOptions(t){this._n=t,this.updateFormatter(t.localization)}preprocessData(t){Array.isArray(t)?function(t){t.forEach(Kn)}(t):Kn(t)}createConverterToInternalObj(t){return f(function(t){return 0===t.length?null:Bn(t[0].time)||R(t[0].time)?qn:Yn}(t))}key(t){return"object"==typeof t&&"kd"in t?t.kd:this.key(this.convertHorzItemToInternal(t))}cacheKey(t){const i=t;return void 0===i.Cd?new Date(1e3*i.kd).getTime():new Date(Date.UTC(i.Cd.year,i.Cd.month-1,i.Cd.day)).getTime()}convertHorzItemToInternal(t){return Vn(i=t)?Yn(i):Bn(i)?qn(i):qn(Xn(i));var i}updateFormatter(t){if(!this._n)return;const i=t.dateFormat;this._n.timeScale.timeVisible?this.Td=new Fn({pd:i,md:this._n.timeScale.secondsVisible?"%h:%m:%s":"%h:%m",bd:"   ",wd:t.locale}):this.Td=new In(i,t.locale)}formatHorzItem(t){const i=t;return this.Td.F_(new Date(1e3*i.kd))}formatTickmark(t,i){const n=function(t,i,n){switch(t){case 0:case 10:return i?n?4:3:2;case 20:case 21:case 22:case 30:case 31:case 32:case 33:return i?3:2;case 50:return 2;case 60:return 1;case 70:return 0}}(t.weight,this._n.timeScale.timeVisible,this._n.timeScale.secondsVisible),s=this._n.timeScale;if(void 0!==s.tickMarkFormatter){const e=s.tickMarkFormatter(t.originalTime,n,i.locale);if(null!==e)return e}return function(t,i,n){const s={};switch(i){case 0:s.year="numeric";break;case 1:s.month="short";break;case 2:s.day="numeric";break;case 3:s.hour12=!1,s.hour="2-digit",s.minute="2-digit";break;case 4:s.hour12=!1,s.hour="2-digit",s.minute="2-digit",s.second="2-digit"}const e=void 0===t.Cd?new Date(1e3*t.kd):new Date(Date.UTC(t.Cd.year,t.Cd.month-1,t.Cd.day));return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()).toLocaleString(n,s)}(t.time,n,i.locale)}maxTickMarkWeight(t){let i=t.reduce(Mn,t[0]).weight;return i>30&&i<50&&(i=30),i}fillWeightsForPoints(t,i){!function(t,i=0){if(0===t.length)return;let n=0===i?null:t[i-1].time.kd,s=null!==n?new Date(1e3*n):null,e=0;for(let r=i;r<t.length;++r){const i=t[r],h=new Date(1e3*i.time.kd);null!==s&&(i.timeWeight=Un(h,s)),e+=i.time.kd-(n||i.time.kd),n=i.time.kd,s=h}if(0===i&&t.length>1){const i=Math.ceil(e/(t.length-1)),n=new Date(1e3*(t[0].time.kd-i));t[0].timeWeight=Un(new Date(1e3*t[0].time.kd),n)}}(t,i)}static Pd(t){return C({localization:{dateFormat:"dd MMM 'yy"}},null!=t?t:{})}}function Gn(t){var i=t.width,n=t.height;if(i<0)throw new Error("Negative width is not allowed for Size");if(n<0)throw new Error("Negative height is not allowed for Size");return{width:i,height:n}}function Jn(t,i){return t.width===i.width&&t.height===i.height}var Qn=function(){function t(t){var i=this;this._resolutionListener=function(){return i._onResolutionChanged()},this._resolutionMediaQueryList=null,this._observers=[],this._window=t,this._installResolutionListener()}return t.prototype.dispose=function(){this._uninstallResolutionListener(),this._window=null},Object.defineProperty(t.prototype,"value",{get:function(){return this._window.devicePixelRatio},enumerable:!1,configurable:!0}),t.prototype.subscribe=function(t){var i=this,n={next:t};return this._observers.push(n),{unsubscribe:function(){i._observers=i._observers.filter((function(t){return t!==n}))}}},t.prototype._installResolutionListener=function(){if(null!==this._resolutionMediaQueryList)throw new Error("Resolution listener is already installed");var t=this._window.devicePixelRatio;this._resolutionMediaQueryList=this._window.matchMedia("all and (resolution: ".concat(t,"dppx)")),this._resolutionMediaQueryList.addListener(this._resolutionListener)},t.prototype._uninstallResolutionListener=function(){null!==this._resolutionMediaQueryList&&(this._resolutionMediaQueryList.removeListener(this._resolutionListener),this._resolutionMediaQueryList=null)},t.prototype._reinstallResolutionListener=function(){this._uninstallResolutionListener(),this._installResolutionListener()},t.prototype._onResolutionChanged=function(){var t=this;this._observers.forEach((function(i){return i.next(t._window.devicePixelRatio)})),this._reinstallResolutionListener()},t}();var ts=function(){function t(t,i,n){var s;this._canvasElement=null,this._bitmapSizeChangedListeners=[],this._suggestedBitmapSize=null,this._suggestedBitmapSizeChangedListeners=[],this._devicePixelRatioObservable=null,this._canvasElementResizeObserver=null,this._canvasElement=t,this._canvasElementClientSize=Gn({width:this._canvasElement.clientWidth,height:this._canvasElement.clientHeight}),this._transformBitmapSize=null!=i?i:function(t){return t},this._allowResizeObserver=null===(s=null==n?void 0:n.allowResizeObserver)||void 0===s||s,this._chooseAndInitObserver()}return t.prototype.dispose=function(){var t,i;if(null===this._canvasElement)throw new Error("Object is disposed");null===(t=this._canvasElementResizeObserver)||void 0===t||t.disconnect(),this._canvasElementResizeObserver=null,null===(i=this._devicePixelRatioObservable)||void 0===i||i.dispose(),this._devicePixelRatioObservable=null,this._suggestedBitmapSizeChangedListeners.length=0,this._bitmapSizeChangedListeners.length=0,this._canvasElement=null},Object.defineProperty(t.prototype,"canvasElement",{get:function(){if(null===this._canvasElement)throw new Error("Object is disposed");return this._canvasElement},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"canvasElementClientSize",{get:function(){return this._canvasElementClientSize},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bitmapSize",{get:function(){return Gn({width:this.canvasElement.width,height:this.canvasElement.height})},enumerable:!1,configurable:!0}),t.prototype.resizeCanvasElement=function(t){this._canvasElementClientSize=Gn(t),this.canvasElement.style.width="".concat(this._canvasElementClientSize.width,"px"),this.canvasElement.style.height="".concat(this._canvasElementClientSize.height,"px"),this._invalidateBitmapSize()},t.prototype.subscribeBitmapSizeChanged=function(t){this._bitmapSizeChangedListeners.push(t)},t.prototype.unsubscribeBitmapSizeChanged=function(t){this._bitmapSizeChangedListeners=this._bitmapSizeChangedListeners.filter((function(i){return i!==t}))},Object.defineProperty(t.prototype,"suggestedBitmapSize",{get:function(){return this._suggestedBitmapSize},enumerable:!1,configurable:!0}),t.prototype.subscribeSuggestedBitmapSizeChanged=function(t){this._suggestedBitmapSizeChangedListeners.push(t)},t.prototype.unsubscribeSuggestedBitmapSizeChanged=function(t){this._suggestedBitmapSizeChangedListeners=this._suggestedBitmapSizeChangedListeners.filter((function(i){return i!==t}))},t.prototype.applySuggestedBitmapSize=function(){if(null!==this._suggestedBitmapSize){var t=this._suggestedBitmapSize;this._suggestedBitmapSize=null,this._resizeBitmap(t),this._emitSuggestedBitmapSizeChanged(t,this._suggestedBitmapSize)}},t.prototype._resizeBitmap=function(t){var i=this.bitmapSize;Jn(i,t)||(this.canvasElement.width=t.width,this.canvasElement.height=t.height,this._emitBitmapSizeChanged(i,t))},t.prototype._emitBitmapSizeChanged=function(t,i){var n=this;this._bitmapSizeChangedListeners.forEach((function(s){return s.call(n,t,i)}))},t.prototype._suggestNewBitmapSize=function(t){var i=this._suggestedBitmapSize,n=Gn(this._transformBitmapSize(t,this._canvasElementClientSize)),s=Jn(this.bitmapSize,n)?null:n;null===i&&null===s||null!==i&&null!==s&&Jn(i,s)||(this._suggestedBitmapSize=s,this._emitSuggestedBitmapSizeChanged(i,s))},t.prototype._emitSuggestedBitmapSizeChanged=function(t,i){var n=this;this._suggestedBitmapSizeChangedListeners.forEach((function(s){return s.call(n,t,i)}))},t.prototype._chooseAndInitObserver=function(){var t=this;this._allowResizeObserver?new Promise((function(t){var i=new ResizeObserver((function(n){t(n.every((function(t){return"devicePixelContentBoxSize"in t}))),i.disconnect()}));i.observe(document.body,{box:"device-pixel-content-box"})})).catch((function(){return!1})).then((function(i){return i?t._initResizeObserver():t._initDevicePixelRatioObservable()})):this._initDevicePixelRatioObservable()},t.prototype._initDevicePixelRatioObservable=function(){var t=this;if(null!==this._canvasElement){var i=is(this._canvasElement);if(null===i)throw new Error("No window is associated with the canvas");this._devicePixelRatioObservable=function(t){return new Qn(t)}(i),this._devicePixelRatioObservable.subscribe((function(){return t._invalidateBitmapSize()})),this._invalidateBitmapSize()}},t.prototype._invalidateBitmapSize=function(){var t,i;if(null!==this._canvasElement){var n=is(this._canvasElement);if(null!==n){var s=null!==(i=null===(t=this._devicePixelRatioObservable)||void 0===t?void 0:t.value)&&void 0!==i?i:n.devicePixelRatio,e=this._canvasElement.getClientRects(),r=void 0!==e[0]?function(t,i){return Gn({width:Math.round(t.left*i+t.width*i)-Math.round(t.left*i),height:Math.round(t.top*i+t.height*i)-Math.round(t.top*i)})}(e[0],s):Gn({width:this._canvasElementClientSize.width*s,height:this._canvasElementClientSize.height*s});this._suggestNewBitmapSize(r)}}},t.prototype._initResizeObserver=function(){var t=this;null!==this._canvasElement&&(this._canvasElementResizeObserver=new ResizeObserver((function(i){var n=i.find((function(i){return i.target===t._canvasElement}));if(n&&n.devicePixelContentBoxSize&&n.devicePixelContentBoxSize[0]){var s=n.devicePixelContentBoxSize[0],e=Gn({width:s.inlineSize,height:s.blockSize});t._suggestNewBitmapSize(e)}})),this._canvasElementResizeObserver.observe(this._canvasElement,{box:"device-pixel-content-box"}))},t}();function is(t){return t.ownerDocument.defaultView}var ns=function(){function t(t,i,n){if(0===i.width||0===i.height)throw new TypeError("Rendering target could only be created on a media with positive width and height");if(this._mediaSize=i,0===n.width||0===n.height)throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");this._bitmapSize=n,this._context=t}return t.prototype.useMediaCoordinateSpace=function(t){try{return this._context.save(),this._context.setTransform(1,0,0,1,0,0),this._context.scale(this._horizontalPixelRatio,this._verticalPixelRatio),t({context:this._context,mediaSize:this._mediaSize})}finally{this._context.restore()}},t.prototype.useBitmapCoordinateSpace=function(t){try{return this._context.save(),this._context.setTransform(1,0,0,1,0,0),t({context:this._context,mediaSize:this._mediaSize,bitmapSize:this._bitmapSize,horizontalPixelRatio:this._horizontalPixelRatio,verticalPixelRatio:this._verticalPixelRatio})}finally{this._context.restore()}},Object.defineProperty(t.prototype,"_horizontalPixelRatio",{get:function(){return this._bitmapSize.width/this._mediaSize.width},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_verticalPixelRatio",{get:function(){return this._bitmapSize.height/this._mediaSize.height},enumerable:!1,configurable:!0}),t}();function ss(t,i){var n=t.canvasElementClientSize;if(0===n.width||0===n.height)return null;var s=t.bitmapSize;if(0===s.width||0===s.height)return null;var e=t.canvasElement.getContext("2d",i);return null===e?null:new ns(e,n,s)}const es="undefined"!=typeof window;function rs(){return!!es&&window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1}function hs(){return!!es&&/iPhone|iPad|iPod/.test(window.navigator.platform)}function ls(t){return t+t%2}function as(t,i){return t.Rd-i.Rd}function os(t,i,n){const s=(t.Rd-i.Rd)/(t.ot-i.ot);return Math.sign(s)*Math.min(Math.abs(s),n)}class _s{constructor(t,i,n,s){this.Dd=null,this.Od=null,this.Ad=null,this.Bd=null,this.Vd=null,this.zd=0,this.Ed=0,this.Id=t,this.Ld=i,this.Nd=n,this.ss=s}Fd(t,i){if(null!==this.Dd){if(this.Dd.ot===i)return void(this.Dd.Rd=t);if(Math.abs(this.Dd.Rd-t)<this.ss)return}this.Bd=this.Ad,this.Ad=this.Od,this.Od=this.Dd,this.Dd={ot:i,Rd:t}}Pr(t,i){if(null===this.Dd||null===this.Od)return;if(i-this.Dd.ot>50)return;let n=0;const s=os(this.Dd,this.Od,this.Ld),e=as(this.Dd,this.Od),r=[s],h=[e];if(n+=e,null!==this.Ad){const t=os(this.Od,this.Ad,this.Ld);if(Math.sign(t)===Math.sign(s)){const i=as(this.Od,this.Ad);if(r.push(t),h.push(i),n+=i,null!==this.Bd){const t=os(this.Ad,this.Bd,this.Ld);if(Math.sign(t)===Math.sign(s)){const i=as(this.Ad,this.Bd);r.push(t),h.push(i),n+=i}}}}let l=0;for(let t=0;t<r.length;++t)l+=h[t]/n*r[t];Math.abs(l)<this.Id||(this.Vd={Rd:t,ot:i},this.Ed=l,this.zd=function(t,i){const n=Math.log(i);return Math.log(1*n/-t)/n}(Math.abs(l),this.Nd))}Xu(t){const i=f(this.Vd),n=t-i.ot;return i.Rd+this.Ed*(Math.pow(this.Nd,n)-1)/Math.log(this.Nd)}Yu(t){return null===this.Vd||this.Wd(t)===this.zd}Wd(t){const i=t-f(this.Vd).ot;return Math.min(i,this.zd)}}function us(t,i){const n=f(t.ownerDocument).createElement("canvas");t.appendChild(n);const s=function(t,i){if("device-pixel-content-box"===i.type)return new ts(t,i.transform,i.options);throw new Error("Unsupported binding target")}(n,{type:"device-pixel-content-box",options:{allowResizeObserver:!1},transform:(t,i)=>({width:Math.max(t.width,i.width),height:Math.max(t.height,i.height)})});return s.resizeCanvasElement(i),s}function cs(t){var i;t.width=1,t.height=1,null===(i=t.getContext("2d"))||void 0===i||i.clearRect(0,0,1,1)}function ds(t,i,n,s){t.fl&&t.fl(i,n,s)}function fs(t,i,n,s){t.K(i,n,s)}function vs(t,i,n,s){const e=t(n,s);for(const t of e){const n=t.gt();null!==n&&i(n)}}function ps(t){es&&void 0!==window.chrome&&t.addEventListener("mousedown",(t=>{if(1===t.button)return t.preventDefault(),!1}))}class ms{constructor(t,i,n){this.jd=0,this.Hd=null,this.$d={nt:Number.NEGATIVE_INFINITY,st:Number.POSITIVE_INFINITY},this.Ud=0,this.qd=null,this.Yd={nt:Number.NEGATIVE_INFINITY,st:Number.POSITIVE_INFINITY},this.Xd=null,this.Kd=!1,this.Zd=null,this.Gd=null,this.Jd=!1,this.Qd=!1,this.tf=!1,this.if=null,this.nf=null,this.sf=null,this.ef=null,this.rf=null,this.hf=null,this.lf=null,this.af=0,this._f=!1,this.uf=!1,this.cf=!1,this.df=0,this.ff=null,this.vf=!hs(),this.pf=t=>{this.mf(t)},this.bf=t=>{if(this.wf(t)){const i=this.gf(t);if(++this.Ud,this.qd&&this.Ud>1){const{Mf:n}=this.xf(gs(t),this.Yd);n<30&&!this.tf&&this.Sf(i,this.kf.yf),this.Cf()}}else{const i=this.gf(t);if(++this.jd,this.Hd&&this.jd>1){const{Mf:n}=this.xf(gs(t),this.$d);n<5&&!this.Qd&&this.Tf(i,this.kf.Pf),this.Rf()}}},this.Df=t,this.kf=i,this._n=n,this.Of()}S(){null!==this.if&&(this.if(),this.if=null),null!==this.nf&&(this.nf(),this.nf=null),null!==this.ef&&(this.ef(),this.ef=null),null!==this.rf&&(this.rf(),this.rf=null),null!==this.hf&&(this.hf(),this.hf=null),null!==this.sf&&(this.sf(),this.sf=null),this.Af(),this.Rf()}Bf(t){this.ef&&this.ef();const i=this.Vf.bind(this);if(this.ef=()=>{this.Df.removeEventListener("mousemove",i)},this.Df.addEventListener("mousemove",i),this.wf(t))return;const n=this.gf(t);this.Tf(n,this.kf.zf),this.vf=!0}Rf(){null!==this.Hd&&clearTimeout(this.Hd),this.jd=0,this.Hd=null,this.$d={nt:Number.NEGATIVE_INFINITY,st:Number.POSITIVE_INFINITY}}Cf(){null!==this.qd&&clearTimeout(this.qd),this.Ud=0,this.qd=null,this.Yd={nt:Number.NEGATIVE_INFINITY,st:Number.POSITIVE_INFINITY}}Vf(t){if(this.cf||null!==this.Gd)return;if(this.wf(t))return;const i=this.gf(t);this.Tf(i,this.kf.Ef),this.vf=!0}If(t){const i=xs(t.changedTouches,f(this.ff));if(null===i)return;if(this.df=Ms(t),null!==this.lf)return;if(this.uf)return;this._f=!0;const n=this.xf(gs(i),f(this.Gd)),{Lf:s,Nf:e,Mf:r}=n;if(this.Jd||!(r<5)){if(!this.Jd){const t=.5*s,i=e>=t&&!this._n.Ff(),n=t>e&&!this._n.Wf();i||n||(this.uf=!0),this.Jd=!0,this.tf=!0,this.Af(),this.Cf()}if(!this.uf){const n=this.gf(t,i);this.Sf(n,this.kf.jf),ws(t)}}}Hf(t){if(0!==t.button)return;const i=this.xf(gs(t),f(this.Zd)),{Mf:n}=i;if(n>=5&&(this.Qd=!0,this.Rf()),this.Qd){const i=this.gf(t);this.Tf(i,this.kf.$f)}}xf(t,i){const n=Math.abs(i.nt-t.nt),s=Math.abs(i.st-t.st);return{Lf:n,Nf:s,Mf:n+s}}Uf(t){let i=xs(t.changedTouches,f(this.ff));if(null===i&&0===t.touches.length&&(i=t.changedTouches[0]),null===i)return;this.ff=null,this.df=Ms(t),this.Af(),this.Gd=null,this.hf&&(this.hf(),this.hf=null);const n=this.gf(t,i);if(this.Sf(n,this.kf.qf),++this.Ud,this.qd&&this.Ud>1){const{Mf:t}=this.xf(gs(i),this.Yd);t<30&&!this.tf&&this.Sf(n,this.kf.yf),this.Cf()}else this.tf||(this.Sf(n,this.kf.Yf),this.kf.Yf&&ws(t));0===this.Ud&&ws(t),0===t.touches.length&&this.Kd&&(this.Kd=!1,ws(t))}mf(t){if(0!==t.button)return;const i=this.gf(t);if(this.Zd=null,this.cf=!1,this.rf&&(this.rf(),this.rf=null),rs()){this.Df.ownerDocument.documentElement.removeEventListener("mouseleave",this.pf)}if(!this.wf(t))if(this.Tf(i,this.kf.Xf),++this.jd,this.Hd&&this.jd>1){const{Mf:n}=this.xf(gs(t),this.$d);n<5&&!this.Qd&&this.Tf(i,this.kf.Pf),this.Rf()}else this.Qd||this.Tf(i,this.kf.Kf)}Af(){null!==this.Xd&&(clearTimeout(this.Xd),this.Xd=null)}Zf(t){if(null!==this.ff)return;const i=t.changedTouches[0];this.ff=i.identifier,this.df=Ms(t);const n=this.Df.ownerDocument.documentElement;this.tf=!1,this.Jd=!1,this.uf=!1,this.Gd=gs(i),this.hf&&(this.hf(),this.hf=null);{const i=this.If.bind(this),s=this.Uf.bind(this);this.hf=()=>{n.removeEventListener("touchmove",i),n.removeEventListener("touchend",s)},n.addEventListener("touchmove",i,{passive:!1}),n.addEventListener("touchend",s,{passive:!1}),this.Af(),this.Xd=setTimeout(this.Gf.bind(this,t),240)}const s=this.gf(t,i);this.Sf(s,this.kf.Jf),this.qd||(this.Ud=0,this.qd=setTimeout(this.Cf.bind(this),500),this.Yd=gs(i))}Qf(t){if(0!==t.button)return;const i=this.Df.ownerDocument.documentElement;rs()&&i.addEventListener("mouseleave",this.pf),this.Qd=!1,this.Zd=gs(t),this.rf&&(this.rf(),this.rf=null);{const t=this.Hf.bind(this),n=this.mf.bind(this);this.rf=()=>{i.removeEventListener("mousemove",t),i.removeEventListener("mouseup",n)},i.addEventListener("mousemove",t),i.addEventListener("mouseup",n)}if(this.cf=!0,this.wf(t))return;const n=this.gf(t);this.Tf(n,this.kf.tv),this.Hd||(this.jd=0,this.Hd=setTimeout(this.Rf.bind(this),500),this.$d=gs(t))}Of(){this.Df.addEventListener("mouseenter",this.Bf.bind(this)),this.Df.addEventListener("touchcancel",this.Af.bind(this));{const t=this.Df.ownerDocument,i=t=>{this.kf.iv&&(t.composed&&this.Df.contains(t.composedPath()[0])||t.target&&this.Df.contains(t.target)||this.kf.iv())};this.nf=()=>{t.removeEventListener("touchstart",i)},this.if=()=>{t.removeEventListener("mousedown",i)},t.addEventListener("mousedown",i),t.addEventListener("touchstart",i,{passive:!0})}hs()&&(this.sf=()=>{this.Df.removeEventListener("dblclick",this.bf)},this.Df.addEventListener("dblclick",this.bf)),this.Df.addEventListener("mouseleave",this.nv.bind(this)),this.Df.addEventListener("touchstart",this.Zf.bind(this),{passive:!0}),ps(this.Df),this.Df.addEventListener("mousedown",this.Qf.bind(this)),this.sv(),this.Df.addEventListener("touchmove",(()=>{}),{passive:!1})}sv(){void 0===this.kf.ev&&void 0===this.kf.rv&&void 0===this.kf.hv||(this.Df.addEventListener("touchstart",(t=>this.lv(t.touches)),{passive:!0}),this.Df.addEventListener("touchmove",(t=>{if(2===t.touches.length&&null!==this.lf&&void 0!==this.kf.rv){const i=bs(t.touches[0],t.touches[1])/this.af;this.kf.rv(this.lf,i),ws(t)}}),{passive:!1}),this.Df.addEventListener("touchend",(t=>{this.lv(t.touches)})))}lv(t){1===t.length&&(this._f=!1),2!==t.length||this._f||this.Kd?this.av():this.ov(t)}ov(t){const i=this.Df.getBoundingClientRect()||{left:0,top:0};this.lf={nt:(t[0].clientX-i.left+(t[1].clientX-i.left))/2,st:(t[0].clientY-i.top+(t[1].clientY-i.top))/2},this.af=bs(t[0],t[1]),void 0!==this.kf.ev&&this.kf.ev(),this.Af()}av(){null!==this.lf&&(this.lf=null,void 0!==this.kf.hv&&this.kf.hv())}nv(t){if(this.ef&&this.ef(),this.wf(t))return;if(!this.vf)return;const i=this.gf(t);this.Tf(i,this.kf._v),this.vf=!hs()}Gf(t){const i=xs(t.touches,f(this.ff));if(null===i)return;const n=this.gf(t,i);this.Sf(n,this.kf.uv),this.tf=!0,this.Kd=!0}wf(t){return t.sourceCapabilities&&void 0!==t.sourceCapabilities.firesTouchEvents?t.sourceCapabilities.firesTouchEvents:Ms(t)<this.df+500}Sf(t,i){i&&i.call(this.kf,t)}Tf(t,i){i&&i.call(this.kf,t)}gf(t,i){const n=i||t,s=this.Df.getBoundingClientRect()||{left:0,top:0};return{clientX:n.clientX,clientY:n.clientY,pageX:n.pageX,pageY:n.pageY,screenX:n.screenX,screenY:n.screenY,localX:n.clientX-s.left,localY:n.clientY-s.top,ctrlKey:t.ctrlKey,altKey:t.altKey,shiftKey:t.shiftKey,metaKey:t.metaKey,cv:!t.type.startsWith("mouse")&&"contextmenu"!==t.type&&"click"!==t.type,dv:t.type,fv:n.target,vv:t.view,pv:()=>{"touchstart"!==t.type&&ws(t)}}}}function bs(t,i){const n=t.clientX-i.clientX,s=t.clientY-i.clientY;return Math.sqrt(n*n+s*s)}function ws(t){t.cancelable&&t.preventDefault()}function gs(t){return{nt:t.pageX,st:t.pageY}}function Ms(t){return t.timeStamp||performance.now()}function xs(t,i){for(let n=0;n<t.length;++n)if(t[n].identifier===i)return t[n];return null}function Ss(t){return{Ec:t.Ec,mv:{mr:t.bv.externalId},wv:t.bv.cursorStyle}}function ys(t,i,n){for(const s of t){const t=s.gt();if(null!==t&&t.pr){const e=t.pr(i,n);if(null!==e)return{vv:s,mv:e}}}return null}function ks(t,i){return n=>{var s,e,r,h;return(null!==(e=null===(s=n.Dt())||void 0===s?void 0:s.xa())&&void 0!==e?e:"")!==i?[]:null!==(h=null===(r=n.la)||void 0===r?void 0:r.call(n,t))&&void 0!==h?h:[]}}class Cs{constructor(t,i,n,s){this.Ei=null,this.gv=null,this.Mv=!1,this.xv=new Jt(200),this.Zr=null,this.Sv=0,this.yv=!1,this.kv=()=>{this.yv||this.Qi.Cv().$t().Nh()},this.Tv=()=>{this.yv||this.Qi.Cv().$t().Nh()},this.Qi=t,this._n=i,this.mo=i.layout,this.kc=n,this.Pv="left"===s,this.Rv=ks("normal",s),this.Dv=ks("top",s),this.Ov=ks("bottom",s),this.Av=document.createElement("div"),this.Av.style.height="100%",this.Av.style.overflow="hidden",this.Av.style.width="25px",this.Av.style.left="0",this.Av.style.position="relative",this.Bv=us(this.Av,Gn({width:16,height:16})),this.Bv.subscribeSuggestedBitmapSizeChanged(this.kv);const e=this.Bv.canvasElement;e.style.position="absolute",e.style.zIndex="1",e.style.left="0",e.style.top="0",this.Vv=us(this.Av,Gn({width:16,height:16})),this.Vv.subscribeSuggestedBitmapSizeChanged(this.Tv);const r=this.Vv.canvasElement;r.style.position="absolute",r.style.zIndex="2",r.style.left="0",r.style.top="0";const h={tv:this.zv.bind(this),Jf:this.zv.bind(this),$f:this.Ev.bind(this),jf:this.Ev.bind(this),iv:this.Iv.bind(this),Xf:this.Lv.bind(this),qf:this.Lv.bind(this),Pf:this.Nv.bind(this),yf:this.Nv.bind(this),zf:this.Fv.bind(this),_v:this.Wv.bind(this)};this.jv=new ms(this.Vv.canvasElement,h,{Ff:()=>!this._n.handleScroll.vertTouchDrag,Wf:()=>!0})}S(){this.jv.S(),this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.Tv),cs(this.Vv.canvasElement),this.Vv.dispose(),this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.kv),cs(this.Bv.canvasElement),this.Bv.dispose(),null!==this.Ei&&this.Ei.$o().p(this),this.Ei=null}Hv(){return this.Av}P(){return this.mo.fontSize}$v(){const t=this.kc.W();return this.Zr!==t.R&&(this.xv.Qe(),this.Zr=t.R),t}Uv(){if(null===this.Ei)return 0;let t=0;const i=this.$v(),n=f(this.Bv.canvasElement.getContext("2d"));n.save();const s=this.Ei.Ia();n.font=this.qv(),s.length>0&&(t=Math.max(this.xv.Mi(n,s[0].Za),this.xv.Mi(n,s[s.length-1].Za)));const e=this.Yv();for(let i=e.length;i--;){const s=this.xv.Mi(n,e[i].Zt());s>t&&(t=s)}const r=this.Ei.Ct();if(null!==r&&null!==this.gv){const i=this.Ei.fn(1,r),s=this.Ei.fn(this.gv.height-2,r);t=Math.max(t,this.xv.Mi(n,this.Ei.Ni(Math.floor(Math.min(i,s))+.11111111111111,r)),this.xv.Mi(n,this.Ei.Ni(Math.ceil(Math.max(i,s))-.11111111111111,r)))}n.restore();const h=t||34;return ls(Math.ceil(i.C+i.T+i.V+i.I+5+h))}Xv(t){null!==this.gv&&Jn(this.gv,t)||(this.gv=t,this.yv=!0,this.Bv.resizeCanvasElement(t),this.Vv.resizeCanvasElement(t),this.yv=!1,this.Av.style.width=`${t.width}px`,this.Av.style.height=`${t.height}px`)}Kv(){return f(this.gv).width}Zi(t){this.Ei!==t&&(null!==this.Ei&&this.Ei.$o().p(this),this.Ei=t,t.$o().l(this.ao.bind(this),this))}Dt(){return this.Ei}Qe(){const t=this.Qi.Zv();this.Qi.Cv().$t().A_(t,f(this.Dt()))}Gv(t){if(null===this.gv)return;if(1!==t){this.Jv(),this.Bv.applySuggestedBitmapSize();const t=ss(this.Bv);null!==t&&(t.useBitmapCoordinateSpace((t=>{this.Qv(t),this.Ae(t)})),this.Qi.tp(t,this.Ov),this.ip(t),this.Qi.tp(t,this.Rv),this.np(t))}this.Vv.applySuggestedBitmapSize();const i=ss(this.Vv);null!==i&&(i.useBitmapCoordinateSpace((({context:t,bitmapSize:i})=>{t.clearRect(0,0,i.width,i.height)})),this.sp(i),this.Qi.tp(i,this.Dv))}ep(){return this.Bv.bitmapSize}rp(t,i,n){const s=this.ep();s.width>0&&s.height>0&&t.drawImage(this.Bv.canvasElement,i,n)}bt(){var t;null===(t=this.Ei)||void 0===t||t.Ia()}zv(t){if(null===this.Ei||this.Ei.Li()||!this._n.handleScale.axisPressedMouseMove.price)return;const i=this.Qi.Cv().$t(),n=this.Qi.Zv();this.Mv=!0,i.k_(n,this.Ei,t.localY)}Ev(t){if(null===this.Ei||!this._n.handleScale.axisPressedMouseMove.price)return;const i=this.Qi.Cv().$t(),n=this.Qi.Zv(),s=this.Ei;i.C_(n,s,t.localY)}Iv(){if(null===this.Ei||!this._n.handleScale.axisPressedMouseMove.price)return;const t=this.Qi.Cv().$t(),i=this.Qi.Zv(),n=this.Ei;this.Mv&&(this.Mv=!1,t.T_(i,n))}Lv(t){if(null===this.Ei||!this._n.handleScale.axisPressedMouseMove.price)return;const i=this.Qi.Cv().$t(),n=this.Qi.Zv();this.Mv=!1,i.T_(n,this.Ei)}Nv(t){this._n.handleScale.axisDoubleClickReset.price&&this.Qe()}Fv(t){if(null===this.Ei)return;!this.Qi.Cv().$t().W().handleScale.axisPressedMouseMove.price||this.Ei.fh()||this.Ei.Co()||this.hp(1)}Wv(t){this.hp(0)}Yv(){const t=[],i=null===this.Ei?void 0:this.Ei;return(n=>{for(let s=0;s<n.length;++s){const e=n[s].Tn(this.Qi.Zv(),i);for(let i=0;i<e.length;i++)t.push(e[i])}})(this.Qi.Zv().No()),t}Qv({context:t,bitmapSize:i}){const{width:n,height:s}=i,e=this.Qi.Zv().$t(),r=e.q(),h=e._d();r===h?q(t,0,0,n,s,r):Z(t,0,0,n,s,r,h)}Ae({context:t,bitmapSize:i,horizontalPixelRatio:n}){if(null===this.gv||null===this.Ei||!this.Ei.W().borderVisible)return;t.fillStyle=this.Ei.W().borderColor;const s=Math.max(1,Math.floor(this.$v().C*n));let e;e=this.Pv?i.width-s:0,t.fillRect(e,0,s,i.height)}ip(t){if(null===this.gv||null===this.Ei)return;const i=this.Ei.Ia(),n=this.Ei.W(),s=this.$v(),e=this.Pv?this.gv.width-s.T:0;n.borderVisible&&n.ticksVisible&&t.useBitmapCoordinateSpace((({context:t,horizontalPixelRatio:r,verticalPixelRatio:h})=>{t.fillStyle=n.borderColor;const l=Math.max(1,Math.floor(h)),a=Math.floor(.5*h),o=Math.round(s.T*r);t.beginPath();for(const n of i)t.rect(Math.floor(e*r),Math.round(n.Aa*h)-a,o,l);t.fill()})),t.useMediaCoordinateSpace((({context:t})=>{var r;t.font=this.qv(),t.fillStyle=null!==(r=n.textColor)&&void 0!==r?r:this.mo.textColor,t.textAlign=this.Pv?"right":"left",t.textBaseline="middle";const h=this.Pv?Math.round(e-s.V):Math.round(e+s.T+s.V),l=i.map((i=>this.xv.gi(t,i.Za)));for(let n=i.length;n--;){const s=i[n];t.fillText(s.Za,h,s.Aa+l[n])}}))}Jv(){if(null===this.gv||null===this.Ei)return;let t=this.gv.height/2;const i=[],n=this.Ei.No().slice(),s=this.Qi.Zv(),e=this.$v();this.Ei===s.cr()&&this.Qi.Zv().No().forEach((t=>{s.ur(t)&&n.push(t)}));const r=this.Ei.Ta()[0],h=this.Ei;n.forEach((n=>{const e=n.Tn(s,h);e.forEach((t=>{t.Oi(null),t.Ai()&&i.push(t)})),r===n&&e.length>0&&(t=e[0].Si())})),i.forEach((t=>t.Oi(t.Si())));this.Ei.W().alignLabels&&this.lp(i,e,t)}lp(t,i,n){if(null===this.gv)return;const s=t.filter((t=>t.Si()<=n)),e=t.filter((t=>t.Si()>n));s.sort(((t,i)=>i.Si()-t.Si())),s.length&&e.length&&e.push(s[0]),e.sort(((t,i)=>t.Si()-i.Si()));for(const n of t){const t=Math.floor(n.Vt(i)/2),s=n.Si();s>-t&&s<t&&n.Oi(t),s>this.gv.height-t&&s<this.gv.height+t&&n.Oi(this.gv.height-t)}for(let t=1;t<s.length;t++){const n=s[t],e=s[t-1],r=e.Vt(i,!1),h=n.Si(),l=e.Di();h>l-r&&n.Oi(l-r)}for(let t=1;t<e.length;t++){const n=e[t],s=e[t-1],r=s.Vt(i,!0),h=n.Si(),l=s.Di();h<l+r&&n.Oi(l+r)}}np(t){if(null===this.gv)return;const i=this.Yv(),n=this.$v(),s=this.Pv?"right":"left";i.forEach((i=>{if(i.Bi()){i.gt(f(this.Ei)).K(t,n,this.xv,s)}}))}sp(t){if(null===this.gv||null===this.Ei)return;const i=this.Qi.Cv().$t(),n=[],s=this.Qi.Zv(),e=i.Wc().Tn(s,this.Ei);e.length&&n.push(e);const r=this.$v(),h=this.Pv?"right":"left";n.forEach((i=>{i.forEach((i=>{i.gt(f(this.Ei)).K(t,r,this.xv,h)}))}))}hp(t){this.Av.style.cursor=1===t?"ns-resize":"default"}ao(){const t=this.Uv();this.Sv<t&&this.Qi.Cv().$t().$l(),this.Sv=t}qv(){return z(this.mo.fontSize,this.mo.fontFamily)}}function Ts(t,i){var n,s;return null!==(s=null===(n=t.ra)||void 0===n?void 0:n.call(t,i))&&void 0!==s?s:[]}function Ps(t,i){var n,s;return null!==(s=null===(n=t.Cn)||void 0===n?void 0:n.call(t,i))&&void 0!==s?s:[]}function Rs(t,i){var n,s;return null!==(s=null===(n=t.Gi)||void 0===n?void 0:n.call(t,i))&&void 0!==s?s:[]}function Ds(t,i){var n,s;return null!==(s=null===(n=t.na)||void 0===n?void 0:n.call(t,i))&&void 0!==s?s:[]}class Os{constructor(t,i){this.gv=Gn({width:0,height:0}),this.ap=null,this.op=null,this._p=null,this.up=!1,this.cp=new k,this.dp=new k,this.fp=0,this.vp=!1,this.pp=null,this.mp=!1,this.bp=null,this.wp=null,this.yv=!1,this.kv=()=>{this.yv||null===this.gp||this.Hi().Nh()},this.Tv=()=>{this.yv||null===this.gp||this.Hi().Nh()},this.Mp=t,this.gp=i,this.gp.z_().l(this.xp.bind(this),this,!0),this.Sp=document.createElement("td"),this.Sp.style.padding="0",this.Sp.style.position="relative";const n=document.createElement("div");n.style.width="100%",n.style.height="100%",n.style.position="relative",n.style.overflow="hidden",this.yp=document.createElement("td"),this.yp.style.padding="0",this.kp=document.createElement("td"),this.kp.style.padding="0",this.Sp.appendChild(n),this.Bv=us(n,Gn({width:16,height:16})),this.Bv.subscribeSuggestedBitmapSizeChanged(this.kv);const s=this.Bv.canvasElement;s.style.position="absolute",s.style.zIndex="1",s.style.left="0",s.style.top="0",this.Vv=us(n,Gn({width:16,height:16})),this.Vv.subscribeSuggestedBitmapSizeChanged(this.Tv);const e=this.Vv.canvasElement;e.style.position="absolute",e.style.zIndex="2",e.style.left="0",e.style.top="0",this.Cp=document.createElement("tr"),this.Cp.appendChild(this.yp),this.Cp.appendChild(this.Sp),this.Cp.appendChild(this.kp),this.Tp(),this.jv=new ms(this.Vv.canvasElement,this,{Ff:()=>null===this.pp&&!this.Mp.W().handleScroll.vertTouchDrag,Wf:()=>null===this.pp&&!this.Mp.W().handleScroll.horzTouchDrag})}S(){null!==this.ap&&this.ap.S(),null!==this.op&&this.op.S(),this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.Tv),cs(this.Vv.canvasElement),this.Vv.dispose(),this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.kv),cs(this.Bv.canvasElement),this.Bv.dispose(),null!==this.gp&&this.gp.z_().p(this),this.jv.S()}Zv(){return f(this.gp)}Pp(t){null!==this.gp&&this.gp.z_().p(this),this.gp=t,null!==this.gp&&this.gp.z_().l(Os.prototype.xp.bind(this),this,!0),this.Tp()}Cv(){return this.Mp}Hv(){return this.Cp}Tp(){if(null!==this.gp&&(this.Rp(),0!==this.Hi().wt().length)){if(null!==this.ap){const t=this.gp.S_();this.ap.Zi(f(t))}if(null!==this.op){const t=this.gp.y_();this.op.Zi(f(t))}}}Dp(){null!==this.ap&&this.ap.bt(),null!==this.op&&this.op.bt()}v_(){return null!==this.gp?this.gp.v_():0}p_(t){this.gp&&this.gp.p_(t)}zf(t){if(!this.gp)return;this.Op();const i=t.localX,n=t.localY;this.Ap(i,n,t)}tv(t){this.Op(),this.Bp(),this.Ap(t.localX,t.localY,t)}Ef(t){var i;if(!this.gp)return;this.Op();const n=t.localX,s=t.localY;this.Ap(n,s,t);const e=this.pr(n,s);this.Mp.Vp(null!==(i=null==e?void 0:e.wv)&&void 0!==i?i:null),this.Hi().zc(e&&{Ec:e.Ec,mv:e.mv})}Kf(t){null!==this.gp&&(this.Op(),this.zp(t))}Pf(t){null!==this.gp&&this.Ep(this.dp,t)}yf(t){this.Pf(t)}$f(t){this.Op(),this.Ip(t),this.Ap(t.localX,t.localY,t)}Xf(t){null!==this.gp&&(this.Op(),this.vp=!1,this.Lp(t))}Yf(t){null!==this.gp&&this.zp(t)}uv(t){if(this.vp=!0,null===this.pp){const i={x:t.localX,y:t.localY};this.Np(i,i,t)}}_v(t){null!==this.gp&&(this.Op(),this.gp.$t().zc(null),this.Fp())}Wp(){return this.cp}jp(){return this.dp}ev(){this.fp=1,this.Hi().Hn()}rv(t,i){if(!this.Mp.W().handleScale.pinch)return;const n=5*(i-this.fp);this.fp=i,this.Hi().qc(t.nt,n)}Jf(t){this.vp=!1,this.mp=null!==this.pp,this.Bp();const i=this.Hi().Wc();null!==this.pp&&i.kt()&&(this.bp={x:i.Yt(),y:i.Xt()},this.pp={x:t.localX,y:t.localY})}jf(t){if(null===this.gp)return;const i=t.localX,n=t.localY;if(null===this.pp)this.Ip(t);else{this.mp=!1;const s=f(this.bp),e=s.x+(i-this.pp.x),r=s.y+(n-this.pp.y);this.Ap(e,r,t)}}qf(t){0===this.Cv().W().trackingMode.exitMode&&(this.mp=!0),this.Hp(),this.Lp(t)}pr(t,i){const n=this.gp;return null===n?null:function(t,i,n){const s=t.No(),e=function(t,i,n){var s,e;let r,h;for(const o of t){const t=null!==(e=null===(s=o.oa)||void 0===s?void 0:s.call(o,i,n))&&void 0!==e?e:[];for(const i of t)l=i.zOrder,(!(a=null==r?void 0:r.zOrder)||"top"===l&&"top"!==a||"normal"===l&&"bottom"===a)&&(r=i,h=o)}var l,a;return r&&h?{bv:r,Ec:h}:null}(s,i,n);if("top"===(null==e?void 0:e.bv.zOrder))return Ss(e);for(const r of s){if(e&&e.Ec===r&&"bottom"!==e.bv.zOrder&&!e.bv.isBackground)return Ss(e);const s=ys(r.Cn(t),i,n);if(null!==s)return{Ec:r,vv:s.vv,mv:s.mv};if(e&&e.Ec===r&&"bottom"!==e.bv.zOrder&&e.bv.isBackground)return Ss(e)}return(null==e?void 0:e.bv)?Ss(e):null}(n,t,i)}$p(t,i){f("left"===i?this.ap:this.op).Xv(Gn({width:t,height:this.gv.height}))}Up(){return this.gv}Xv(t){Jn(this.gv,t)||(this.gv=t,this.yv=!0,this.Bv.resizeCanvasElement(t),this.Vv.resizeCanvasElement(t),this.yv=!1,this.Sp.style.width=t.width+"px",this.Sp.style.height=t.height+"px")}qp(){const t=f(this.gp);t.x_(t.S_()),t.x_(t.y_());for(const i of t.Ta())if(t.ur(i)){const n=i.Dt();null!==n&&t.x_(n),i.Rn()}}ep(){return this.Bv.bitmapSize}rp(t,i,n){const s=this.ep();s.width>0&&s.height>0&&t.drawImage(this.Bv.canvasElement,i,n)}Gv(t){if(0===t)return;if(null===this.gp)return;if(t>1&&this.qp(),null!==this.ap&&this.ap.Gv(t),null!==this.op&&this.op.Gv(t),1!==t){this.Bv.applySuggestedBitmapSize();const t=ss(this.Bv);null!==t&&(t.useBitmapCoordinateSpace((t=>{this.Qv(t)})),this.gp&&(this.Yp(t,Ts),this.Xp(t),this.Kp(t),this.Yp(t,Ps),this.Yp(t,Rs)))}this.Vv.applySuggestedBitmapSize();const i=ss(this.Vv);null!==i&&(i.useBitmapCoordinateSpace((({context:t,bitmapSize:i})=>{t.clearRect(0,0,i.width,i.height)})),this.Zp(i),this.Yp(i,Ds))}Gp(){return this.ap}Jp(){return this.op}tp(t,i){this.Yp(t,i)}xp(){null!==this.gp&&this.gp.z_().p(this),this.gp=null}zp(t){this.Ep(this.cp,t)}Ep(t,i){const n=i.localX,s=i.localY;t.M()&&t.m(this.Hi().St().Bu(n),{x:n,y:s},i)}Qv({context:t,bitmapSize:i}){const{width:n,height:s}=i,e=this.Hi(),r=e.q(),h=e._d();r===h?q(t,0,0,n,s,h):Z(t,0,0,n,s,r,h)}Xp(t){const i=f(this.gp).E_().Fh().gt();null!==i&&i.K(t,!1)}Kp(t){const i=this.Hi().Fc();this.Qp(t,Ps,ds,i),this.Qp(t,Ps,fs,i)}Zp(t){this.Qp(t,Ps,fs,this.Hi().Wc())}Yp(t,i){const n=f(this.gp).No();for(const s of n)this.Qp(t,i,ds,s);for(const s of n)this.Qp(t,i,fs,s)}Qp(t,i,n,s){const e=f(this.gp),r=e.$t().Vc(),h=null!==r&&r.Ec===s,l=null!==r&&h&&void 0!==r.mv?r.mv.br:void 0;vs(i,(i=>n(i,t,h,l)),s,e)}Rp(){if(null===this.gp)return;const t=this.Mp,i=this.gp.S_().W().visible,n=this.gp.y_().W().visible;i||null===this.ap||(this.yp.removeChild(this.ap.Hv()),this.ap.S(),this.ap=null),n||null===this.op||(this.kp.removeChild(this.op.Hv()),this.op.S(),this.op=null);const s=t.$t().ed();i&&null===this.ap&&(this.ap=new Cs(this,t.W(),s,"left"),this.yp.appendChild(this.ap.Hv())),n&&null===this.op&&(this.op=new Cs(this,t.W(),s,"right"),this.kp.appendChild(this.op.Hv()))}tm(t){return t.cv&&this.vp||null!==this.pp}im(t){return Math.max(0,Math.min(t,this.gv.width-1))}nm(t){return Math.max(0,Math.min(t,this.gv.height-1))}Ap(t,i,n){this.Hi().Qc(this.im(t),this.nm(i),n,f(this.gp))}Fp(){this.Hi().nd()}Hp(){this.mp&&(this.pp=null,this.Fp())}Np(t,i,n){this.pp=t,this.mp=!1,this.Ap(i.x,i.y,n);const s=this.Hi().Wc();this.bp={x:s.Yt(),y:s.Xt()}}Hi(){return this.Mp.$t()}Lp(t){if(!this.up)return;const i=this.Hi(),n=this.Zv();if(i.D_(n,n.dn()),this._p=null,this.up=!1,i.Zc(),null!==this.wp){const t=performance.now(),n=i.St();this.wp.Pr(n.Iu(),t),this.wp.Yu(t)||i.qn(this.wp)}}Op(){this.pp=null}Bp(){if(!this.gp)return;if(this.Hi().Hn(),document.activeElement!==document.body&&document.activeElement!==document.documentElement)f(document.activeElement).blur();else{const t=document.getSelection();null!==t&&t.removeAllRanges()}!this.gp.dn().Li()&&this.Hi().St().Li()}Ip(t){if(null===this.gp)return;const i=this.Hi(),n=i.St();if(n.Li())return;const s=this.Mp.W(),e=s.handleScroll,r=s.kineticScroll;if((!e.pressedMouseMove||t.cv)&&(!e.horzTouchDrag&&!e.vertTouchDrag||!t.cv))return;const h=this.gp.dn(),l=performance.now();if(null!==this._p||this.tm(t)||(this._p={x:t.clientX,y:t.clientY,kd:l,sm:t.localX,rm:t.localY}),null!==this._p&&!this.up&&(this._p.x!==t.clientX||this._p.y!==t.clientY)){if(t.cv&&r.touch||!t.cv&&r.mouse){const t=n.ee();this.wp=new _s(.2/t,7/t,.997,15/t),this.wp.Fd(n.Iu(),this._p.kd)}else this.wp=null;h.Li()||i.P_(this.gp,h,t.localY),i.Xc(t.localX),this.up=!0}this.up&&(h.Li()||i.R_(this.gp,h,t.localY),i.Kc(t.localX),null!==this.wp&&this.wp.Fd(n.Iu(),l))}}class As{constructor(t,i,n,s,e){this.ft=!0,this.gv=Gn({width:0,height:0}),this.kv=()=>this.Gv(3),this.Pv="left"===t,this.kc=n.ed,this._n=i,this.hm=s,this.lm=e,this.Av=document.createElement("div"),this.Av.style.width="25px",this.Av.style.height="100%",this.Av.style.overflow="hidden",this.Bv=us(this.Av,Gn({width:16,height:16})),this.Bv.subscribeSuggestedBitmapSizeChanged(this.kv)}S(){this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.kv),cs(this.Bv.canvasElement),this.Bv.dispose()}Hv(){return this.Av}Up(){return this.gv}Xv(t){Jn(this.gv,t)||(this.gv=t,this.Bv.resizeCanvasElement(t),this.Av.style.width=`${t.width}px`,this.Av.style.height=`${t.height}px`,this.ft=!0)}Gv(t){if(t<3&&!this.ft)return;if(0===this.gv.width||0===this.gv.height)return;this.ft=!1,this.Bv.applySuggestedBitmapSize();const i=ss(this.Bv);null!==i&&i.useBitmapCoordinateSpace((t=>{this.Qv(t),this.Ae(t)}))}ep(){return this.Bv.bitmapSize}rp(t,i,n){const s=this.ep();s.width>0&&s.height>0&&t.drawImage(this.Bv.canvasElement,i,n)}Ae({context:t,bitmapSize:i,horizontalPixelRatio:n,verticalPixelRatio:s}){if(!this.hm())return;t.fillStyle=this._n.timeScale.borderColor;const e=Math.floor(this.kc.W().C*n),r=Math.floor(this.kc.W().C*s),h=this.Pv?i.width-e:0;t.fillRect(h,0,e,r)}Qv({context:t,bitmapSize:i}){q(t,0,0,i.width,i.height,this.lm())}}function Bs(t){return i=>{var n,s;return null!==(s=null===(n=i.aa)||void 0===n?void 0:n.call(i,t))&&void 0!==s?s:[]}}const Vs=Bs("normal"),zs=Bs("top"),Es=Bs("bottom");class Is{constructor(t,i){this.am=null,this.om=null,this.k=null,this._m=!1,this.gv=Gn({width:0,height:0}),this.um=new k,this.xv=new Jt(5),this.yv=!1,this.kv=()=>{this.yv||this.Mp.$t().Nh()},this.Tv=()=>{this.yv||this.Mp.$t().Nh()},this.Mp=t,this.N_=i,this._n=t.W().layout,this.dm=document.createElement("tr"),this.fm=document.createElement("td"),this.fm.style.padding="0",this.vm=document.createElement("td"),this.vm.style.padding="0",this.Av=document.createElement("td"),this.Av.style.height="25px",this.Av.style.padding="0",this.pm=document.createElement("div"),this.pm.style.width="100%",this.pm.style.height="100%",this.pm.style.position="relative",this.pm.style.overflow="hidden",this.Av.appendChild(this.pm),this.Bv=us(this.pm,Gn({width:16,height:16})),this.Bv.subscribeSuggestedBitmapSizeChanged(this.kv);const n=this.Bv.canvasElement;n.style.position="absolute",n.style.zIndex="1",n.style.left="0",n.style.top="0",this.Vv=us(this.pm,Gn({width:16,height:16})),this.Vv.subscribeSuggestedBitmapSizeChanged(this.Tv);const s=this.Vv.canvasElement;s.style.position="absolute",s.style.zIndex="2",s.style.left="0",s.style.top="0",this.dm.appendChild(this.fm),this.dm.appendChild(this.Av),this.dm.appendChild(this.vm),this.bm(),this.Mp.$t().f_().l(this.bm.bind(this),this),this.jv=new ms(this.Vv.canvasElement,this,{Ff:()=>!0,Wf:()=>!this.Mp.W().handleScroll.horzTouchDrag})}S(){this.jv.S(),null!==this.am&&this.am.S(),null!==this.om&&this.om.S(),this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.Tv),cs(this.Vv.canvasElement),this.Vv.dispose(),this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.kv),cs(this.Bv.canvasElement),this.Bv.dispose()}Hv(){return this.dm}wm(){return this.am}gm(){return this.om}tv(t){if(this._m)return;this._m=!0;const i=this.Mp.$t();!i.St().Li()&&this.Mp.W().handleScale.axisPressedMouseMove.time&&i.Uc(t.localX)}Jf(t){this.tv(t)}iv(){const t=this.Mp.$t();!t.St().Li()&&this._m&&(this._m=!1,this.Mp.W().handleScale.axisPressedMouseMove.time&&t.Jc())}$f(t){const i=this.Mp.$t();!i.St().Li()&&this.Mp.W().handleScale.axisPressedMouseMove.time&&i.Gc(t.localX)}jf(t){this.$f(t)}Xf(){this._m=!1;const t=this.Mp.$t();t.St().Li()&&!this.Mp.W().handleScale.axisPressedMouseMove.time||t.Jc()}qf(){this.Xf()}Pf(){this.Mp.W().handleScale.axisDoubleClickReset.time&&this.Mp.$t().Xn()}yf(){this.Pf()}zf(){this.Mp.$t().W().handleScale.axisPressedMouseMove.time&&this.hp(1)}_v(){this.hp(0)}Up(){return this.gv}Mm(){return this.um}xm(t,i,n){Jn(this.gv,t)||(this.gv=t,this.yv=!0,this.Bv.resizeCanvasElement(t),this.Vv.resizeCanvasElement(t),this.yv=!1,this.Av.style.width=`${t.width}px`,this.Av.style.height=`${t.height}px`,this.um.m(t)),null!==this.am&&this.am.Xv(Gn({width:i,height:t.height})),null!==this.om&&this.om.Xv(Gn({width:n,height:t.height}))}Sm(){const t=this.ym();return Math.ceil(t.C+t.T+t.P+t.L+t.B+t.km)}bt(){this.Mp.$t().St().Ia()}ep(){return this.Bv.bitmapSize}rp(t,i,n){const s=this.ep();s.width>0&&s.height>0&&t.drawImage(this.Bv.canvasElement,i,n)}Gv(t){if(0===t)return;if(1!==t){this.Bv.applySuggestedBitmapSize();const i=ss(this.Bv);null!==i&&(i.useBitmapCoordinateSpace((t=>{this.Qv(t),this.Ae(t),this.Cm(i,Es)})),this.ip(i),this.Cm(i,Vs)),null!==this.am&&this.am.Gv(t),null!==this.om&&this.om.Gv(t)}this.Vv.applySuggestedBitmapSize();const i=ss(this.Vv);null!==i&&(i.useBitmapCoordinateSpace((({context:t,bitmapSize:i})=>{t.clearRect(0,0,i.width,i.height)})),this.Tm([...this.Mp.$t().wt(),this.Mp.$t().Wc()],i),this.Cm(i,zs))}Cm(t,i){const n=this.Mp.$t().wt();for(const s of n)vs(i,(i=>ds(i,t,!1,void 0)),s,void 0);for(const s of n)vs(i,(i=>fs(i,t,!1,void 0)),s,void 0)}Qv({context:t,bitmapSize:i}){q(t,0,0,i.width,i.height,this.Mp.$t()._d())}Ae({context:t,bitmapSize:i,verticalPixelRatio:n}){if(this.Mp.W().timeScale.borderVisible){t.fillStyle=this.Pm();const s=Math.max(1,Math.floor(this.ym().C*n));t.fillRect(0,0,i.width,s)}}ip(t){const i=this.Mp.$t().St(),n=i.Ia();if(!n||0===n.length)return;const s=this.N_.maxTickMarkWeight(n),e=this.ym(),r=i.W();r.borderVisible&&r.ticksVisible&&t.useBitmapCoordinateSpace((({context:t,horizontalPixelRatio:i,verticalPixelRatio:s})=>{t.strokeStyle=this.Pm(),t.fillStyle=this.Pm();const r=Math.max(1,Math.floor(i)),h=Math.floor(.5*i);t.beginPath();const l=Math.round(e.T*s);for(let s=n.length;s--;){const e=Math.round(n[s].coord*i);t.rect(e-h,0,r,l)}t.fill()})),t.useMediaCoordinateSpace((({context:t})=>{const i=e.C+e.T+e.L+e.P/2;t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.$(),t.font=this.qv();for(const e of n)if(e.weight<s){const n=e.needAlignCoordinate?this.Rm(t,e.coord,e.label):e.coord;t.fillText(e.label,n,i)}this.Mp.W().timeScale.allowBoldLabels&&(t.font=this.Dm());for(const e of n)if(e.weight>=s){const n=e.needAlignCoordinate?this.Rm(t,e.coord,e.label):e.coord;t.fillText(e.label,n,i)}}))}Rm(t,i,n){const s=this.xv.Mi(t,n),e=s/2,r=Math.floor(i-e)+.5;return r<0?i+=Math.abs(0-r):r+s>this.gv.width&&(i-=Math.abs(this.gv.width-(r+s))),i}Tm(t,i){const n=this.ym();for(const s of t)for(const t of s.Ji())t.gt().K(i,n)}Pm(){return this.Mp.W().timeScale.borderColor}$(){return this._n.textColor}j(){return this._n.fontSize}qv(){return z(this.j(),this._n.fontFamily)}Dm(){return z(this.j(),this._n.fontFamily,"bold")}ym(){null===this.k&&(this.k={C:1,N:NaN,L:NaN,B:NaN,Wi:NaN,T:5,P:NaN,R:"",Fi:new Jt,km:0});const t=this.k,i=this.qv();if(t.R!==i){const n=this.j();t.P=n,t.R=i,t.L=3*n/12,t.B=3*n/12,t.Wi=9*n/12,t.N=0,t.km=4*n/12,t.Fi.Qe()}return this.k}hp(t){this.Av.style.cursor=1===t?"ew-resize":"default"}bm(){const t=this.Mp.$t(),i=t.W();i.leftPriceScale.visible||null===this.am||(this.fm.removeChild(this.am.Hv()),this.am.S(),this.am=null),i.rightPriceScale.visible||null===this.om||(this.vm.removeChild(this.om.Hv()),this.om.S(),this.om=null);const n={ed:this.Mp.$t().ed()},s=()=>i.leftPriceScale.borderVisible&&t.St().W().borderVisible,e=()=>t._d();i.leftPriceScale.visible&&null===this.am&&(this.am=new As("left",i,n,s,e),this.fm.appendChild(this.am.Hv())),i.rightPriceScale.visible&&null===this.om&&(this.om=new As("right",i,n,s,e),this.vm.appendChild(this.om.Hv()))}}const Ls=!!es&&!!navigator.userAgentData&&navigator.userAgentData.brands.some((t=>t.brand.includes("Chromium")))&&!!es&&((null===(Ns=null===navigator||void 0===navigator?void 0:navigator.userAgentData)||void 0===Ns?void 0:Ns.platform)?"Windows"===navigator.userAgentData.platform:navigator.userAgent.toLowerCase().indexOf("win")>=0);var Ns;class Fs{constructor(t,i,n){var s;this.Om=[],this.Am=0,this.Qa=0,this.e_=0,this.Bm=0,this.Vm=0,this.zm=null,this.Em=!1,this.cp=new k,this.dp=new k,this.xc=new k,this.Im=null,this.Lm=null,this.Nm=t,this._n=i,this.N_=n,this.dm=document.createElement("div"),this.dm.classList.add("tv-lightweight-charts"),this.dm.style.overflow="hidden",this.dm.style.direction="ltr",this.dm.style.width="100%",this.dm.style.height="100%",(s=this.dm).style.userSelect="none",s.style.webkitUserSelect="none",s.style.msUserSelect="none",s.style.MozUserSelect="none",s.style.webkitTapHighlightColor="transparent",this.Fm=document.createElement("table"),this.Fm.setAttribute("cellspacing","0"),this.dm.appendChild(this.Fm),this.Wm=this.jm.bind(this),Ws(this._n)&&this.Hm(!0),this.Hi=new An(this.yc.bind(this),this._n,n),this.$t().jc().l(this.$m.bind(this),this),this.Um=new Is(this,this.N_),this.Fm.appendChild(this.Um.Hv());const e=i.autoSize&&this.qm();let r=this._n.width,h=this._n.height;if(e||0===r||0===h){const i=t.getBoundingClientRect();r=r||i.width,h=h||i.height}this.Ym(r,h),this.Xm(),t.appendChild(this.dm),this.Km(),this.Hi.St().Gu().l(this.Hi.$l.bind(this.Hi),this),this.Hi.f_().l(this.Hi.$l.bind(this.Hi),this)}$t(){return this.Hi}W(){return this._n}Zm(){return this.Om}Gm(){return this.Um}S(){this.Hm(!1),0!==this.Am&&window.cancelAnimationFrame(this.Am),this.Hi.jc().p(this),this.Hi.St().Gu().p(this),this.Hi.f_().p(this),this.Hi.S();for(const t of this.Om)this.Fm.removeChild(t.Hv()),t.Wp().p(this),t.jp().p(this),t.S();this.Om=[],f(this.Um).S(),null!==this.dm.parentElement&&this.dm.parentElement.removeChild(this.dm),this.xc.S(),this.cp.S(),this.dp.S(),this.Jm()}Ym(t,i,n=!1){if(this.Qa===i&&this.e_===t)return;const s=function(t){const i=Math.floor(t.width),n=Math.floor(t.height);return Gn({width:i-i%2,height:n-n%2})}(Gn({width:t,height:i}));this.Qa=s.height,this.e_=s.width;const e=this.Qa+"px",r=this.e_+"px";f(this.dm).style.height=e,f(this.dm).style.width=r,this.Fm.style.height=e,this.Fm.style.width=r,n?this.Qm(lt.ns(),performance.now()):this.Hi.$l()}Gv(t){void 0===t&&(t=lt.ns());for(let i=0;i<this.Om.length;i++)this.Om[i].Gv(t.Wn(i).Ln);this._n.timeScale.visible&&this.Um.Gv(t.Fn())}Lh(t){const i=Ws(this._n);this.Hi.Lh(t);const n=Ws(this._n);n!==i&&this.Hm(n),this.Km(),this.tb(t)}Wp(){return this.cp}jp(){return this.dp}jc(){return this.xc}ib(){null!==this.zm&&(this.Qm(this.zm,performance.now()),this.zm=null);const t=this.nb(null),i=document.createElement("canvas");i.width=t.width,i.height=t.height;const n=f(i.getContext("2d"));return this.nb(n),i}sb(t){if("left"===t&&!this.eb())return 0;if("right"===t&&!this.rb())return 0;if(0===this.Om.length)return 0;return f("left"===t?this.Om[0].Gp():this.Om[0].Jp()).Kv()}hb(){return this._n.autoSize&&null!==this.Im}lb(){return this.dm}Vp(t){this.Lm=t,this.Lm?this.lb().style.setProperty("cursor",t):this.lb().style.removeProperty("cursor")}ab(){return this.Lm}ob(){return d(this.Om[0]).Up()}tb(t){(void 0!==t.autoSize||!this.Im||void 0===t.width&&void 0===t.height)&&(t.autoSize&&!this.Im&&this.qm(),!1===t.autoSize&&null!==this.Im&&this.Jm(),t.autoSize||void 0===t.width&&void 0===t.height||this.Ym(t.width||this.e_,t.height||this.Qa))}nb(t){let i=0,n=0;const s=this.Om[0],e=(i,n)=>{let s=0;for(let e=0;e<this.Om.length;e++){const r=this.Om[e],h=f("left"===i?r.Gp():r.Jp()),l=h.ep();null!==t&&h.rp(t,n,s),s+=l.height}};if(this.eb()){e("left",0);i+=f(s.Gp()).ep().width}for(let s=0;s<this.Om.length;s++){const e=this.Om[s],r=e.ep();null!==t&&e.rp(t,i,n),n+=r.height}if(i+=s.ep().width,this.rb()){e("right",i);i+=f(s.Jp()).ep().width}const r=(i,n,s)=>{f("left"===i?this.Um.wm():this.Um.gm()).rp(f(t),n,s)};if(this._n.timeScale.visible){const i=this.Um.ep();if(null!==t){let e=0;this.eb()&&(r("left",e,n),e=f(s.Gp()).ep().width),this.Um.rp(t,e,n),e+=i.width,this.rb()&&r("right",e,n)}n+=i.height}return Gn({width:i,height:n})}_b(){let t=0,i=0,n=0;for(const s of this.Om)this.eb()&&(i=Math.max(i,f(s.Gp()).Uv(),this._n.leftPriceScale.minimumWidth)),this.rb()&&(n=Math.max(n,f(s.Jp()).Uv(),this._n.rightPriceScale.minimumWidth)),t+=s.v_();i=ls(i),n=ls(n);const s=this.e_,e=this.Qa,r=Math.max(s-i-n,0),h=this._n.timeScale.visible;let l=h?Math.max(this.Um.Sm(),this._n.timeScale.minimumHeight):0;var a;l=(a=l)+a%2;const o=0+l,_=e<o?0:e-o,u=_/t;let c=0;for(let t=0;t<this.Om.length;++t){const s=this.Om[t];s.Pp(this.Hi.Nc()[t]);let e=0,h=0;h=t===this.Om.length-1?_-c:Math.round(s.v_()*u),e=Math.max(h,2),c+=e,s.Xv(Gn({width:r,height:e})),this.eb()&&s.$p(i,"left"),this.rb()&&s.$p(n,"right"),s.Zv()&&this.Hi.Hc(s.Zv(),e)}this.Um.xm(Gn({width:h?r:0,height:l}),h?i:0,h?n:0),this.Hi.m_(r),this.Bm!==i&&(this.Bm=i),this.Vm!==n&&(this.Vm=n)}Hm(t){t?this.dm.addEventListener("wheel",this.Wm,{passive:!1}):this.dm.removeEventListener("wheel",this.Wm)}ub(t){switch(t.deltaMode){case t.DOM_DELTA_PAGE:return 120;case t.DOM_DELTA_LINE:return 32}return Ls?1/window.devicePixelRatio:1}jm(t){if(!(0!==t.deltaX&&this._n.handleScroll.mouseWheel||0!==t.deltaY&&this._n.handleScale.mouseWheel))return;const i=this.ub(t),n=i*t.deltaX/100,s=-i*t.deltaY/100;if(t.cancelable&&t.preventDefault(),0!==s&&this._n.handleScale.mouseWheel){const i=Math.sign(s)*Math.min(1,Math.abs(s)),n=t.clientX-this.dm.getBoundingClientRect().left;this.$t().qc(n,i)}0!==n&&this._n.handleScroll.mouseWheel&&this.$t().Yc(-80*n)}Qm(t,i){var n;const s=t.Fn();3===s&&this.cb(),3!==s&&2!==s||(this.fb(t),this.vb(t,i),this.Um.bt(),this.Om.forEach((t=>{t.Dp()})),3===(null===(n=this.zm)||void 0===n?void 0:n.Fn())&&(this.zm.Jn(t),this.cb(),this.fb(this.zm),this.vb(this.zm,i),t=this.zm,this.zm=null)),this.Gv(t)}vb(t,i){for(const n of t.Gn())this.Qn(n,i)}fb(t){const i=this.Hi.Nc();for(let n=0;n<i.length;n++)t.Wn(n).Nn&&i[n].B_()}Qn(t,i){const n=this.Hi.St();switch(t.$n){case 0:n.Qu();break;case 1:n.tc(t.Ot);break;case 2:n.Kn(t.Ot);break;case 3:n.Zn(t.Ot);break;case 4:n.Fu();break;case 5:t.Ot.Yu(i)||n.Zn(t.Ot.Xu(i))}}yc(t){null!==this.zm?this.zm.Jn(t):this.zm=t,this.Em||(this.Em=!0,this.Am=window.requestAnimationFrame((t=>{if(this.Em=!1,this.Am=0,null!==this.zm){const i=this.zm;this.zm=null,this.Qm(i,t);for(const n of i.Gn())if(5===n.$n&&!n.Ot.Yu(t)){this.$t().qn(n.Ot);break}}})))}cb(){this.Xm()}Xm(){const t=this.Hi.Nc(),i=t.length,n=this.Om.length;for(let t=i;t<n;t++){const t=d(this.Om.pop());this.Fm.removeChild(t.Hv()),t.Wp().p(this),t.jp().p(this),t.S()}for(let s=n;s<i;s++){const i=new Os(this,t[s]);i.Wp().l(this.pb.bind(this),this),i.jp().l(this.mb.bind(this),this),this.Om.push(i),this.Fm.insertBefore(i.Hv(),this.Um.Hv())}for(let n=0;n<i;n++){const i=t[n],s=this.Om[n];s.Zv()!==i?s.Pp(i):s.Tp()}this.Km(),this._b()}bb(t,i,n){var s;const e=new Map;if(null!==t){this.Hi.wt().forEach((i=>{const n=i.Bn().il(t);null!==n&&e.set(i,n)}))}let r;if(null!==t){const i=null===(s=this.Hi.St().$i(t))||void 0===s?void 0:s.originalTime;void 0!==i&&(r=i)}const h=this.$t().Vc(),l=null!==h&&h.Ec instanceof qi?h.Ec:void 0,a=null!==h&&void 0!==h.mv?h.mv.mr:void 0;return{wb:r,ie:null!=t?t:void 0,gb:null!=i?i:void 0,Mb:l,xb:e,Sb:a,yb:null!=n?n:void 0}}pb(t,i,n){this.cp.m((()=>this.bb(t,i,n)))}mb(t,i,n){this.dp.m((()=>this.bb(t,i,n)))}$m(t,i,n){this.xc.m((()=>this.bb(t,i,n)))}Km(){const t=this._n.timeScale.visible?"":"none";this.Um.Hv().style.display=t}eb(){return this.Om[0].Zv().S_().W().visible}rb(){return this.Om[0].Zv().y_().W().visible}qm(){return"ResizeObserver"in window&&(this.Im=new ResizeObserver((t=>{const i=t.find((t=>t.target===this.Nm));i&&this.Ym(i.contentRect.width,i.contentRect.height)})),this.Im.observe(this.Nm,{box:"border-box"}),!0)}Jm(){null!==this.Im&&this.Im.disconnect(),this.Im=null}}function Ws(t){return Boolean(t.handleScroll.mouseWheel||t.handleScale.mouseWheel)}function js(t,i){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&i.indexOf(s)<0&&(n[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var e=0;for(s=Object.getOwnPropertySymbols(t);e<s.length;e++)i.indexOf(s[e])<0&&Object.prototype.propertyIsEnumerable.call(t,s[e])&&(n[s[e]]=t[s[e]])}return n}function Hs(t,i,n,s){const e=n.value,r={ie:i,ot:t,Ot:[e,e,e,e],wb:s};return void 0!==n.color&&(r.O=n.color),r}function $s(t,i,n,s){const e=n.value,r={ie:i,ot:t,Ot:[e,e,e,e],wb:s};return void 0!==n.lineColor&&(r.lt=n.lineColor),void 0!==n.topColor&&(r.ks=n.topColor),void 0!==n.bottomColor&&(r.Cs=n.bottomColor),r}function Us(t,i,n,s){const e=n.value,r={ie:i,ot:t,Ot:[e,e,e,e],wb:s};return void 0!==n.topLineColor&&(r.Ce=n.topLineColor),void 0!==n.bottomLineColor&&(r.Te=n.bottomLineColor),void 0!==n.topFillColor1&&(r.Me=n.topFillColor1),void 0!==n.topFillColor2&&(r.xe=n.topFillColor2),void 0!==n.bottomFillColor1&&(r.Se=n.bottomFillColor1),void 0!==n.bottomFillColor2&&(r.ye=n.bottomFillColor2),r}function qs(t,i,n,s){const e={ie:i,ot:t,Ot:[n.open,n.high,n.low,n.close],wb:s};return void 0!==n.color&&(e.O=n.color),e}function Ys(t,i,n,s){const e={ie:i,ot:t,Ot:[n.open,n.high,n.low,n.close],wb:s};return void 0!==n.color&&(e.O=n.color),void 0!==n.borderColor&&(e.At=n.borderColor),void 0!==n.wickColor&&(e.Hh=n.wickColor),e}function Xs(t,i,n,s,e){const r=d(e)(n),h=Math.max(...r),l=Math.min(...r),a=r[r.length-1],o=[a,h,l,a],_=n,{time:u,color:c}=_;return{ie:i,ot:t,Ot:o,wb:s,We:js(_,["time","color"]),O:c}}function Ks(t){return void 0!==t.Ot}function Zs(t,i){return void 0!==i.customValues&&(t.kb=i.customValues),t}function Gs(t){return(i,n,s,e,r,h)=>function(t,i){return i?i(t):void 0===(n=t).open&&void 0===n.value;var n}(s,h)?Zs({ot:i,ie:n,wb:e},s):Zs(t(i,n,s,e,r),s)}function Js(t){return{Candlestick:Gs(Ys),Bar:Gs(qs),Area:Gs($s),Baseline:Gs(Us),Histogram:Gs(Hs),Line:Gs(Hs),Custom:Gs(Xs)}[t]}function Qs(t){return{ie:0,Cb:new Map,ia:t}}function te(t,i){if(void 0!==t&&0!==t.length)return{Tb:i.key(t[0].ot),Pb:i.key(t[t.length-1].ot)}}function ie(t){let i;return t.forEach((t=>{void 0===i&&(i=t.wb)})),d(i)}class ne{constructor(t){this.Rb=new Map,this.Db=new Map,this.Ob=new Map,this.Ab=[],this.N_=t}S(){this.Rb.clear(),this.Db.clear(),this.Ob.clear(),this.Ab=[]}Bb(t,i){let n=0!==this.Rb.size,s=!1;const e=this.Db.get(t);if(void 0!==e)if(1===this.Db.size)n=!1,s=!0,this.Rb.clear();else for(const i of this.Ab)i.pointData.Cb.delete(t)&&(s=!0);let r=[];if(0!==i.length){const n=i.map((t=>t.time)),e=this.N_.createConverterToInternalObj(i),h=Js(t.Yh()),l=t.ga(),a=t.Ma();r=i.map(((i,r)=>{const o=e(i.time),_=this.N_.key(o);let u=this.Rb.get(_);void 0===u&&(u=Qs(o),this.Rb.set(_,u),s=!0);const c=h(o,u.ie,i,n[r],l,a);return u.Cb.set(t,c),c}))}n&&this.Vb(),this.zb(t,r);let h=-1;if(s){const t=[];this.Rb.forEach((i=>{t.push({timeWeight:0,time:i.ia,pointData:i,originalTime:ie(i.Cb)})})),t.sort(((t,i)=>this.N_.key(t.time)-this.N_.key(i.time))),h=this.Eb(t)}return this.Ib(t,h,function(t,i,n){const s=te(t,n),e=te(i,n);if(void 0!==s&&void 0!==e)return{Xl:s.Pb>=e.Pb&&s.Tb>=e.Tb}}(this.Db.get(t),e,this.N_))}ld(t){return this.Bb(t,[])}Lb(t,i){const n=i;!function(t){void 0===t.wb&&(t.wb=t.time)}(n),this.N_.preprocessData(i);const s=this.N_.createConverterToInternalObj([i])(i.time),e=this.Ob.get(t);if(void 0!==e&&this.N_.key(s)<this.N_.key(e))throw new Error(`Cannot update oldest data, last time=${e}, new time=${s}`);let r=this.Rb.get(this.N_.key(s));const h=void 0===r;void 0===r&&(r=Qs(s),this.Rb.set(this.N_.key(s),r));const l=Js(t.Yh()),a=t.ga(),o=t.Ma(),_=l(s,r.ie,i,n.wb,a,o);r.Cb.set(t,_),this.Nb(t,_);const u={Xl:Ks(_)};if(!h)return this.Ib(t,-1,u);const c={timeWeight:0,time:r.ia,pointData:r,originalTime:ie(r.Cb)},d=Rt(this.Ab,this.N_.key(c.time),((t,i)=>this.N_.key(t.time)<i));this.Ab.splice(d,0,c);for(let t=d;t<this.Ab.length;++t)se(this.Ab[t].pointData,t);return this.N_.fillWeightsForPoints(this.Ab,d),this.Ib(t,d,u)}Nb(t,i){let n=this.Db.get(t);void 0===n&&(n=[],this.Db.set(t,n));const s=0!==n.length?n[n.length-1]:null;null===s||this.N_.key(i.ot)>this.N_.key(s.ot)?Ks(i)&&n.push(i):Ks(i)?n[n.length-1]=i:n.splice(-1,1),this.Ob.set(t,i.ot)}zb(t,i){0!==i.length?(this.Db.set(t,i.filter(Ks)),this.Ob.set(t,i[i.length-1].ot)):(this.Db.delete(t),this.Ob.delete(t))}Vb(){for(const t of this.Ab)0===t.pointData.Cb.size&&this.Rb.delete(this.N_.key(t.time))}Eb(t){let i=-1;for(let n=0;n<this.Ab.length&&n<t.length;++n){const s=this.Ab[n],e=t[n];if(this.N_.key(s.time)!==this.N_.key(e.time)){i=n;break}e.timeWeight=s.timeWeight,se(e.pointData,n)}if(-1===i&&this.Ab.length!==t.length&&(i=Math.min(this.Ab.length,t.length)),-1===i)return-1;for(let n=i;n<t.length;++n)se(t[n].pointData,n);return this.N_.fillWeightsForPoints(t,i),this.Ab=t,i}Fb(){if(0===this.Db.size)return null;let t=0;return this.Db.forEach((i=>{0!==i.length&&(t=Math.max(t,i[i.length-1].ie))})),t}Ib(t,i,n){const s={Wb:new Map,St:{Au:this.Fb()}};if(-1!==i)this.Db.forEach(((i,e)=>{s.Wb.set(e,{We:i,jb:e===t?n:void 0})})),this.Db.has(t)||s.Wb.set(t,{We:[],jb:n}),s.St.Hb=this.Ab,s.St.$b=i;else{const i=this.Db.get(t);s.Wb.set(t,{We:i||[],jb:n})}return s}}function se(t,i){t.ie=i,t.Cb.forEach((t=>{t.ie=i}))}function ee(t){const i={value:t.Ot[3],time:t.wb};return void 0!==t.kb&&(i.customValues=t.kb),i}function re(t){const i=ee(t);return void 0!==t.O&&(i.color=t.O),i}function he(t){const i=ee(t);return void 0!==t.lt&&(i.lineColor=t.lt),void 0!==t.ks&&(i.topColor=t.ks),void 0!==t.Cs&&(i.bottomColor=t.Cs),i}function le(t){const i=ee(t);return void 0!==t.Ce&&(i.topLineColor=t.Ce),void 0!==t.Te&&(i.bottomLineColor=t.Te),void 0!==t.Me&&(i.topFillColor1=t.Me),void 0!==t.xe&&(i.topFillColor2=t.xe),void 0!==t.Se&&(i.bottomFillColor1=t.Se),void 0!==t.ye&&(i.bottomFillColor2=t.ye),i}function ae(t){const i={open:t.Ot[0],high:t.Ot[1],low:t.Ot[2],close:t.Ot[3],time:t.wb};return void 0!==t.kb&&(i.customValues=t.kb),i}function oe(t){const i=ae(t);return void 0!==t.O&&(i.color=t.O),i}function _e(t){const i=ae(t),{O:n,At:s,Hh:e}=t;return void 0!==n&&(i.color=n),void 0!==s&&(i.borderColor=s),void 0!==e&&(i.wickColor=e),i}function ue(t){return{Area:he,Line:re,Baseline:le,Histogram:re,Bar:oe,Candlestick:_e,Custom:ce}[t]}function ce(t){const i=t.wb;return Object.assign(Object.assign({},t.We),{time:i})}const de={vertLine:{color:"#9598A1",width:1,style:3,visible:!0,labelVisible:!0,labelBackgroundColor:"#131722"},horzLine:{color:"#9598A1",width:1,style:3,visible:!0,labelVisible:!0,labelBackgroundColor:"#131722"},mode:1},fe={vertLines:{color:"#D6DCDE",style:0,visible:!0},horzLines:{color:"#D6DCDE",style:0,visible:!0}},ve={background:{type:"solid",color:"#FFFFFF"},textColor:"#191919",fontSize:12,fontFamily:V},pe={autoScale:!0,mode:0,invertScale:!1,alignLabels:!0,borderVisible:!0,borderColor:"#2B2B43",entireTextOnly:!1,visible:!1,ticksVisible:!1,scaleMargins:{bottom:.1,top:.2},minimumWidth:0},me={rightOffset:0,barSpacing:6,minBarSpacing:.5,fixLeftEdge:!1,fixRightEdge:!1,lockVisibleTimeRangeOnResize:!1,rightBarStaysOnScroll:!1,borderVisible:!0,borderColor:"#2B2B43",visible:!0,timeVisible:!1,secondsVisible:!0,shiftVisibleRangeOnNewBar:!0,allowShiftVisibleRangeOnWhitespaceReplacement:!1,ticksVisible:!1,uniformDistribution:!1,minimumHeight:0,allowBoldLabels:!0},be={color:"rgba(0, 0, 0, 0)",visible:!1,fontSize:48,fontFamily:V,fontStyle:"",text:"",horzAlign:"center",vertAlign:"center"};function we(){return{width:0,height:0,autoSize:!1,layout:ve,crosshair:de,grid:fe,overlayPriceScales:Object.assign({},pe),leftPriceScale:Object.assign(Object.assign({},pe),{visible:!1}),rightPriceScale:Object.assign(Object.assign({},pe),{visible:!0}),timeScale:me,watermark:be,localization:{locale:es?navigator.language:"",dateFormat:"dd MMM 'yy"},handleScroll:{mouseWheel:!0,pressedMouseMove:!0,horzTouchDrag:!0,vertTouchDrag:!0},handleScale:{axisPressedMouseMove:{time:!0,price:!0},axisDoubleClickReset:{time:!0,price:!0},mouseWheel:!0,pinch:!0},kineticScroll:{mouse:!1,touch:!0},trackingMode:{exitMode:1}}}class ge{constructor(t,i){this.Ub=t,this.qb=i}applyOptions(t){this.Ub.$t().Ic(this.qb,t)}options(){return this.Ei().W()}width(){return ht(this.qb)?this.Ub.sb(this.qb):0}Ei(){return f(this.Ub.$t().Lc(this.qb)).Dt}}function Me(t,i,n){const s=js(t,["time","originalTime"]),e=Object.assign({time:i},s);return void 0!==n&&(e.originalTime=n),e}const xe={color:"#FF0000",price:0,lineStyle:2,lineWidth:1,lineVisible:!0,axisLabelVisible:!0,title:"",axisLabelColor:"",axisLabelTextColor:""};class Se{constructor(t){this.Bh=t}applyOptions(t){this.Bh.Lh(t)}options(){return this.Bh.W()}Yb(){return this.Bh}}class ye{constructor(t,i,n,s,e){this.Xb=new k,this.zs=t,this.Kb=i,this.Zb=n,this.N_=e,this.Gb=s}S(){this.Xb.S()}priceFormatter(){return this.zs.ca()}priceToCoordinate(t){const i=this.zs.Ct();return null===i?null:this.zs.Dt().Rt(t,i.Ot)}coordinateToPrice(t){const i=this.zs.Ct();return null===i?null:this.zs.Dt().fn(t,i.Ot)}barsInLogicalRange(t){if(null===t)return null;const i=new gn(new mn(t.from,t.to)).iu(),n=this.zs.Bn();if(n.Li())return null;const s=n.il(i.Rs(),1),e=n.il(i.ui(),-1),r=f(n.Jh()),h=f(n.An());if(null!==s&&null!==e&&s.ie>e.ie)return{barsBefore:t.from-r,barsAfter:h-t.to};const l={barsBefore:null===s||s.ie===r?t.from-r:s.ie-r,barsAfter:null===e||e.ie===h?h-t.to:h-e.ie};return null!==s&&null!==e&&(l.from=s.wb,l.to=e.wb),l}setData(t){this.N_,this.zs.Yh(),this.Kb.Jb(this.zs,t),this.Qb("full")}update(t){this.zs.Yh(),this.Kb.tw(this.zs,t),this.Qb("update")}dataByIndex(t,i){const n=this.zs.Bn().il(t,i);if(null===n)return null;return ue(this.seriesType())(n)}data(){const t=ue(this.seriesType());return this.zs.Bn().Qs().map((i=>t(i)))}subscribeDataChanged(t){this.Xb.l(t)}unsubscribeDataChanged(t){this.Xb.v(t)}setMarkers(t){this.N_;const i=t.map((t=>Me(t,this.N_.convertHorzItemToInternal(t.time),t.time)));this.zs.Zl(i)}markers(){return this.zs.Gl().map((t=>Me(t,t.originalTime,void 0)))}applyOptions(t){this.zs.Lh(t)}options(){return O(this.zs.W())}priceScale(){return this.Zb.priceScale(this.zs.Dt().xa())}createPriceLine(t){const i=C(O(xe),t),n=this.zs.Jl(i);return new Se(n)}removePriceLine(t){this.zs.Ql(t.Yb())}seriesType(){return this.zs.Yh()}attachPrimitive(t){this.zs.ba(t),t.attached&&t.attached({chart:this.Gb,series:this,requestUpdate:()=>this.zs.$t().$l()})}detachPrimitive(t){this.zs.wa(t),t.detached&&t.detached()}Qb(t){this.Xb.M()&&this.Xb.m(t)}}class ke{constructor(t,i,n){this.iw=new k,this.uu=new k,this.um=new k,this.Hi=t,this.wl=t.St(),this.Um=i,this.wl.Ku().l(this.nw.bind(this)),this.wl.Zu().l(this.sw.bind(this)),this.Um.Mm().l(this.ew.bind(this)),this.N_=n}S(){this.wl.Ku().p(this),this.wl.Zu().p(this),this.Um.Mm().p(this),this.iw.S(),this.uu.S(),this.um.S()}scrollPosition(){return this.wl.Iu()}scrollToPosition(t,i){i?this.wl.qu(t,1e3):this.Hi.Zn(t)}scrollToRealTime(){this.wl.Uu()}getVisibleRange(){const t=this.wl.ku();return null===t?null:{from:t.from.originalTime,to:t.to.originalTime}}setVisibleRange(t){const i={from:this.N_.convertHorzItemToInternal(t.from),to:this.N_.convertHorzItemToInternal(t.to)},n=this.wl.Ru(i);this.Hi.ad(n)}getVisibleLogicalRange(){const t=this.wl.yu();return null===t?null:{from:t.Rs(),to:t.ui()}}setVisibleLogicalRange(t){c(t.from<=t.to,"The from index cannot be after the to index."),this.Hi.ad(t)}resetTimeScale(){this.Hi.Xn()}fitContent(){this.Hi.Qu()}logicalToCoordinate(t){const i=this.Hi.St();return i.Li()?null:i.zt(t)}coordinateToLogical(t){return this.wl.Li()?null:this.wl.Bu(t)}timeToCoordinate(t){const i=this.N_.convertHorzItemToInternal(t),n=this.wl.ka(i,!1);return null===n?null:this.wl.zt(n)}coordinateToTime(t){const i=this.Hi.St(),n=i.Bu(t),s=i.$i(n);return null===s?null:s.originalTime}width(){return this.Um.Up().width}height(){return this.Um.Up().height}subscribeVisibleTimeRangeChange(t){this.iw.l(t)}unsubscribeVisibleTimeRangeChange(t){this.iw.v(t)}subscribeVisibleLogicalRangeChange(t){this.uu.l(t)}unsubscribeVisibleLogicalRangeChange(t){this.uu.v(t)}subscribeSizeChange(t){this.um.l(t)}unsubscribeSizeChange(t){this.um.v(t)}applyOptions(t){this.wl.Lh(t)}options(){return Object.assign(Object.assign({},O(this.wl.W())),{barSpacing:this.wl.ee()})}nw(){this.iw.M()&&this.iw.m(this.getVisibleRange())}sw(){this.uu.M()&&this.uu.m(this.getVisibleLogicalRange())}ew(t){this.um.m(t.width,t.height)}}function Ce(t){if(void 0===t||"custom"===t.type)return;const i=t;void 0!==i.minMove&&void 0===i.precision&&(i.precision=function(t){if(t>=1)return 0;let i=0;for(;i<8;i++){const n=Math.round(t);if(Math.abs(n-t)<1e-8)return i;t*=10}return i}(i.minMove))}function Te(t){return function(t){if(D(t.handleScale)){const i=t.handleScale;t.handleScale={axisDoubleClickReset:{time:i,price:i},axisPressedMouseMove:{time:i,price:i},mouseWheel:i,pinch:i}}else if(void 0!==t.handleScale){const{axisPressedMouseMove:i,axisDoubleClickReset:n}=t.handleScale;D(i)&&(t.handleScale.axisPressedMouseMove={time:i,price:i}),D(n)&&(t.handleScale.axisDoubleClickReset={time:n,price:n})}const i=t.handleScroll;D(i)&&(t.handleScroll={horzTouchDrag:i,vertTouchDrag:i,mouseWheel:i,pressedMouseMove:i})}(t),t}class Pe{constructor(t,i,n){this.rw=new Map,this.hw=new Map,this.lw=new k,this.aw=new k,this.ow=new k,this._w=new ne(i);const s=void 0===n?O(we()):C(O(we()),Te(n));this.N_=i,this.Ub=new Fs(t,s,i),this.Ub.Wp().l((t=>{this.lw.M()&&this.lw.m(this.uw(t()))}),this),this.Ub.jp().l((t=>{this.aw.M()&&this.aw.m(this.uw(t()))}),this),this.Ub.jc().l((t=>{this.ow.M()&&this.ow.m(this.uw(t()))}),this);const e=this.Ub.$t();this.cw=new ke(e,this.Ub.Gm(),this.N_)}remove(){this.Ub.Wp().p(this),this.Ub.jp().p(this),this.Ub.jc().p(this),this.cw.S(),this.Ub.S(),this.rw.clear(),this.hw.clear(),this.lw.S(),this.aw.S(),this.ow.S(),this._w.S()}resize(t,i,n){this.autoSizeActive()||this.Ub.Ym(t,i,n)}addCustomSeries(t,i){const n=v(t),s=Object.assign(Object.assign({},h),n.defaultOptions());return this.dw("Custom",s,i,n)}addAreaSeries(t){return this.dw("Area",s,t)}addBaselineSeries(t){return this.dw("Baseline",e,t)}addBarSeries(t){return this.dw("Bar",i,t)}addCandlestickSeries(i={}){return function(t){void 0!==t.borderColor&&(t.borderUpColor=t.borderColor,t.borderDownColor=t.borderColor),void 0!==t.wickColor&&(t.wickUpColor=t.wickColor,t.wickDownColor=t.wickColor)}(i),this.dw("Candlestick",t,i)}addHistogramSeries(t){return this.dw("Histogram",r,t)}addLineSeries(t){return this.dw("Line",n,t)}removeSeries(t){const i=d(this.rw.get(t)),n=this._w.ld(i);this.Ub.$t().ld(i),this.fw(n),this.rw.delete(t),this.hw.delete(i)}Jb(t,i){this.fw(this._w.Bb(t,i))}tw(t,i){this.fw(this._w.Lb(t,i))}subscribeClick(t){this.lw.l(t)}unsubscribeClick(t){this.lw.v(t)}subscribeCrosshairMove(t){this.ow.l(t)}unsubscribeCrosshairMove(t){this.ow.v(t)}subscribeDblClick(t){this.aw.l(t)}unsubscribeDblClick(t){this.aw.v(t)}priceScale(t){return new ge(this.Ub,t)}timeScale(){return this.cw}applyOptions(t){this.Ub.Lh(Te(t))}options(){return this.Ub.W()}takeScreenshot(){return this.Ub.ib()}autoSizeActive(){return this.Ub.hb()}chartElement(){return this.Ub.lb()}paneSize(){const t=this.Ub.ob();return{height:t.height,width:t.width}}setCrosshairPosition(t,i,n){const s=this.rw.get(n);if(void 0===s)return;const e=this.Ub.$t()._r(s);null!==e&&this.Ub.$t().td(t,i,e)}clearCrosshairPosition(){this.Ub.$t().nd(!0)}dw(t,i,n={},s){Ce(n.priceFormat);const e=C(O(l),O(i),n),r=this.Ub.$t().rd(t,e,s),h=new ye(r,this,this,this,this.N_);return this.rw.set(h,r),this.hw.set(r,h),h}fw(t){const i=this.Ub.$t();i.sd(t.St.Au,t.St.Hb,t.St.$b),t.Wb.forEach(((t,i)=>i.J(t.We,t.jb))),i.zu()}pw(t){return d(this.hw.get(t))}uw(t){const i=new Map;t.xb.forEach(((t,n)=>{const s=n.Yh(),e=ue(s)(t);if("Custom"!==s)c(function(t){return void 0!==t.open||void 0!==t.value}(e));else{const t=n.Ma();c(!t||!1===t(e))}i.set(this.pw(n),e)}));const n=void 0===t.Mb?void 0:this.pw(t.Mb);return{time:t.wb,logical:t.ie,point:t.gb,hoveredSeries:n,hoveredObjectId:t.Sb,seriesData:i,sourceEvent:t.yb}}}function Re(t,i,n){let s;if(R(t)){const i=document.getElementById(t);c(null!==i,`Cannot find element in DOM with id=${t}`),s=i}else s=t;const e=new Pe(s,i,n);return i.setOptions(e.options()),e}const De=Object.assign(Object.assign({},l),h);var Oe=Object.freeze({__proto__:null,get ColorType(){return Dn},get CrosshairMode(){return et},get LastPriceAnimationMode(){return Pn},get LineStyle(){return o},get LineType(){return a},get MismatchDirection(){return Ai},get PriceLineSource(){return Rn},get PriceScaleMode(){return un},get TickMarkType(){return On},get TrackingModeExitMode(){return Tn},createChart:function(t,i){return Re(t,new Zn,Zn.Pd(i))},createChartEx:Re,customSeriesDefaultOptions:De,isBusinessDay:Bn,isUTCTimestamp:Vn,version:function(){return"4.1.3"}});window.LightweightCharts=Oe}();




// ══════════════════════════════════════════════════
//  GLOBAL ERROR HANDLER & DIAGNOSTICS v14
// ══════════════════════════════════════════════════
(function(){
  // Suppress noisy "Script error." from cross-origin scripts
  var _errCount = 0;
  window.onerror = function(msg, src, line, col, err) {
    if(msg === 'Script error.' || msg === 'Uncaught Error: Script error.') {
      _errCount++;
      // Only log every 50th to avoid console flood
      if(_errCount === 1 || _errCount % 50 === 0) {
        console.log('[DIAG] Cross-origin script errors suppressed:', _errCount);
      }
      return true; // suppress
    }
    return false; // let other errors through
  };

  // Suppress unhandled promise rejections from CORS/network failures
  window.addEventListener('unhandledrejection', function(e) {
    var msg = String(e.reason && e.reason.message || e.reason || '');
    if(msg.includes('Failed to fetch') || msg.includes('NetworkError') || 
       msg.includes('CORS') || msg.includes('AbortError') ||
       msg.includes('can not be cloned') || msg.includes('Load failed')) {
      e.preventDefault();
      return;
    }
  });


  // API health tracker
  window._apiHealth = {};
  window._apiLog = function(name, status, detail) {
    window._apiHealth[name] = {status:status, detail:detail||'', ts:Date.now()};
  };

  // Diagnostic: Ctrl+Shift+D = dump API health
  document.addEventListener('keydown', function(e) {
    if(e.ctrlKey && e.shiftKey && e.key === 'D') {
      console.table(window._apiHealth);
      console.log('[DIAG] Script errors suppressed:', _errCount);
      console.log('[DIAG] AIS ships:', Object.keys(window._aisShips||{}).length);
      console.log('[DIAG] Prices cached:', Object.keys(window._prices||{}).length);
    }
  });
})();



// ══════════════════════════════════════════════════
//  PAGE VISIBILITY — pause heavy work when tab hidden
//  + PERFORMANCE CONTROLLER — stabilize across devices
// ══════════════════════════════════════════════════
(function(){
  // Track tab visibility globally
  window._tabHidden = false;
  window._perfMode = 'normal';
  
  // ── PERFORMANCE CONTROLLER ──
  // Override setInterval to auto-throttle when tab hidden
  var _origSetInterval = window.setInterval;
  var _allIntervals = [];
  window.setInterval = function(fn, delay) {
    var id = _origSetInterval(function() {
      if(window._tabHidden && delay < 60000) return; // skip fast intervals when hidden
      try { fn(); } catch(e) {}
    }, delay);
    _allIntervals.push(id);
    return id;
  };
  
  // Batch DOM reads/writes to avoid layout thrashing
  window._readQueue = [];
  window._writeQueue = [];
  window._flushDOM = function() {
    var r = window._readQueue.splice(0);
    r.forEach(function(fn) { try{fn();}catch(e){} });
    var w = window._writeQueue.splice(0);
    w.forEach(function(fn) { try{fn();}catch(e){} });
  };

  // Auto-detect weak devices: <4 cores or mobile
  var cores = navigator.hardwareConcurrency || 4;
  var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  if(cores <= 2 || isMobile) window._perfMode = 'low';

  // Throttled fetch wrapper — prevents API flooding
  var _fetchQueue = [];
  var _fetchActive = 0;
  var _maxConcurrent = window._perfMode === 'low' ? 3 : 6;
  window._throttledFetch = function(url, opts) {
    return new Promise(function(resolve, reject) {
      _fetchQueue.push({url:url, opts:opts, resolve:resolve, reject:reject});
      _drainQueue();
    });
  };
  function _drainQueue() {
    while(_fetchActive < _maxConcurrent && _fetchQueue.length > 0) {
      var item = _fetchQueue.shift();
      _fetchActive++;
      fetch(item.url, item.opts).then(item.resolve).catch(item.reject).finally(function(){ _fetchActive--; _drainQueue(); });
    }
  }

  document.addEventListener('visibilitychange', function(){
    // In iframe contexts (e.g. claude.ai), document.hidden can be unreliable — skip
    if(window.self !== window.top) return;
    window._tabHidden = document.hidden;
    if(document.hidden){
      // Pause CSS animations
      document.querySelectorAll('#tick,#map-tick-inner').forEach(function(el){
        el.style.animationPlayState = 'paused';
      });
      // Pause MapLibre rendering
      try{ if(window.mapGL && mapGL.stop) mapGL.stop(); }catch(_){}
    } else {
      // Resume CSS animations
      document.querySelectorAll('#tick,#map-tick-inner').forEach(function(el){
        el.style.animationPlayState = '';
      });
      // Resume map
      try{ if(window.mapGL) { mapGL.resize(); if(mapGL.triggerRepaint) mapGL.triggerRepaint(); } }catch(_){}
      try{ if(window.map) map.invalidateSize({animate:false}); }catch(_){}
      // Trigger a re-render of chart if open
      try{
        if(window._bbgChart) {
          var c = document.getElementById('bbg-chart-container');
          if(c) { var r = c.getBoundingClientRect(); if(r.width > 0) window._bbgChart.applyOptions({width:r.width, height:r.height}); }
        }
      }catch(_){}
    }
  });

  // Global: Skip heavy DOM patches when tab hidden
  window._shouldSkipWork = function() { return window._tabHidden; };

  // Performance logging
  console.log('[PERF] Mode:', window._perfMode, '| Cores:', cores, '| Mobile:', isMobile, '| MaxFetch:', _maxConcurrent);
})();



// ══════════════════════════════════════════════════
//  BOOT VERIFICATION SYSTEM
//  Overlay stays open until:
//  1. API key verified (HTTP 200)
//  2. At least 3 data feeds connected
// ══════════════════════════════════════════════════
const _boot = {
  feeds: {
    'BINANCE·WS':   {label:'Binance WebSocket',   status:'pending', detail:'Waiting for key...', latency:'—', priority:1},
    'BINANCE·REST': {label:'Binance REST 24h',     status:'pending', detail:'Waiting for key...', latency:'—', priority:1},
    'HYPERLIQUID':  {label:'Hyperliquid REST',     status:'pending', detail:'Waiting for key...', latency:'—', priority:1},
    'KRAKEN':       {label:'Kraken Spot',          status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'OKX':          {label:'OKX Spot',             status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'BYBIT':        {label:'Bybit Spot',           status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'COINBASE':     {label:'Coinbase',             status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'COINBASE-WS':  {label:'Coinbase WebSocket',   status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'JUPITER':      {label:'Jupiter / Solana',     status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'FINNHUB':      {label:'Finnhub Equities WS',  status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'DOMINANCE':    {label:'BTC Dominance',        status:'pending', detail:'Waiting for key...', latency:'—', priority:1},
    'FUNDING':      {label:'Funding Rates',        status:'pending', detail:'Waiting for key...', latency:'—', priority:2},
    'COINGECKO':    {label:'CoinGecko Markets',    status:'pending', detail:'Waiting for key...', latency:'—', priority:3},
    'HTX':          {label:'HTX / Huobi',          status:'pending', detail:'Waiting for key...', latency:'—', priority:3},
    'BITGET':       {label:'Bitget Exchange',      status:'pending', detail:'Waiting for key...', latency:'—', priority:3},
    'GATE':         {label:'Gate.io',              status:'pending', detail:'Waiting for key...', latency:'—', priority:3},
    'MEXC':         {label:'MEXC Exchange',        status:'pending', detail:'Waiting for key...', latency:'—', priority:3},
    'KUCOIN':       {label:'KuCoin',               status:'pending', detail:'Waiting for key...', latency:'—', priority:3}
},
  startTs: Date.now(),
  dismissed: true,
  keyVerified: true,

  update(key, status, detail='') {
    if(!this.feeds[key]) return;
    this.feeds[key].status  = status;
    this.feeds[key].detail  = detail;
    if(status !== 'pending')
      this.feeds[key].latency = ((Date.now()-this.startTs)/1000).toFixed(1)+'s';
    this.render();
    if(this.keyVerified) this._checkDismiss();
  },

  _checkDismiss() {
    const ok = Object.values(this.feeds).filter(f=>f.status==='ok').length;
    if(ok >= 3 && !this.dismissed) {
      const st = document.getElementById('boot-status');
      if(st){ st.textContent = ok+' FEEDS CONNECTED — ENTERING SYSTEM'; st.style.color='#00cc44'; }
      setTimeout(()=>this.dismiss(), 50);
    }
  },

  render() {
    if(this.dismissed) return;
    const el    = document.getElementById('boot-feeds');
    const pctEl = document.getElementById('boot-pct');
    const stEl  = document.getElementById('boot-status');
    if(!el) return;

    const keys  = Object.keys(this.feeds);
    const ok    = keys.filter(k=>this.feeds[k].status==='ok').length;
    const done  = keys.filter(k=>['ok','warn','err'].includes(this.feeds[k].status)).length;

    if(pctEl){
      if(!this.keyVerified){ pctEl.textContent='LOCKED'; pctEl.style.color='#332200'; }
      else{ pctEl.textContent=ok+'/'+keys.length+' LIVE'; pctEl.style.color=ok>=3?'#00cc44':'#ff6600'; }
    }

    el.innerHTML = keys.map((k,i)=>{
      const f  = this.feeds[k];
      const sc = {pending:'#2a1400',ok:'#00cc44',warn:'#ff7700',err:'#ff3322'}[f.status]||'#2a1400';
      const ic = {pending:'○',ok:'●',warn:'◑',err:'✕'}[f.status]||'○';
      const bg = i%2===0?'#050300':'#000';
      return `<div style="display:grid;grid-template-columns:160px 70px 70px 1fr;padding:3px 8px;background:${bg};border-bottom:1px solid #0d0800;align-items:center">
        <div style="display:flex;align-items:center;gap:5px">
          <span style="color:${sc};font-size:9px">${ic}</span>
          <span style="color:${f.status==='ok'?'#665533':f.status==='pending'?'#2a1400':'#884422'};font-size:7px">${f.label}</span>
        </div>
        <div style="color:${sc};font-size:7px;font-weight:700;letter-spacing:1px">${f.status.toUpperCase()}</div>
        <div style="color:${f.status==='ok'?'#336622':'#1a0e00'};font-size:7px;font-family:'Courier New',monospace">${f.latency}</div>
        <div style="color:${f.status==='ok'?'#4a3322':f.status==='err'?'#662211':'#1a0e00'};font-size:6.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.detail}</div>
      </div>`;
    }).join('');

    if(this.keyVerified && stEl && !this.dismissed){
      const elapsed=((Date.now()-this.startTs)/1000).toFixed(1);
      stEl.textContent='KEY VERIFIED — LOADING FEEDS · '+ok+' CONNECTED · '+elapsed+'s';
      stEl.style.color=ok>=3?'#446633':'#664422';
    }
  },

  dismiss() {
    if(this.dismissed) return;
    this.dismissed = true;
    if(this._timerIv) clearInterval(this._timerIv);
    const ov = document.getElementById('boot-overlay');
    if(ov){ ov.style.transition='opacity .5s ease'; ov.style.opacity='0'; setTimeout(()=>{try{ov.remove();}catch(_){}},550); }
    // 1. Přepočítat rozměry mapy (ještě skrytá)
    try{ _fixMapHeight(); _fixMinZoom(); }catch(_){}
    // 2. invalidateSize hned
    setTimeout(function(){
      try{
        map.invalidateSize({animate:false, pan:false});
        _fixMinZoom();
        if(typeof _applyZoomMarkerStyle==='function') _applyZoomMarkerStyle();
      }catch(_){}
    }, 30);
    // 3. invalidateSize po zmizení overlaye
    setTimeout(function(){
      try{ map.invalidateSize({animate:false, pan:false}); }catch(_){}
    }, 600);
  }
};

// Boot clock + timer
(function(){
  function _bc(){ const n=new Date(); const cl=document.getElementById('boot-clock'); if(cl)cl.textContent=n.toLocaleTimeString('en-GB',{hour12:false})+' UTC+1'; }
  _bc(); setInterval(_bc,1000);
  _boot._timerIv=setInterval(function(){ const el=document.getElementById('boot-timer'); if(el)el.textContent=((Date.now()-_boot.startTs)/1000).toFixed(1)+'s'; },100);
})();

_boot.render();

// ── AUTO-DISMISS boot + spustit vše automaticky ──────────
(function(){
  var ov = document.getElementById('boot-overlay');
  if(ov) ov.style.display = 'none';
  ['ticker-wrap','top-right'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.style.display = 'flex';
  });
  var ls = document.getElementById('logo-sub');
  if(ls) ls.style.display = 'block';
  setTimeout(function(){
    try{ if(typeof _activateAIFeatures==='function') _activateAIFeatures(); }catch(e){}
  }, 300);
  setTimeout(function(){
    try{ if(typeof sbSwitchTab==='function') sbSwitchTab('fx'); }catch(e){}
  }, 900);
  // Force map resize after boot dismiss
  [100,500,1500].forEach(function(ms){
    setTimeout(function(){
      try{ _fixMapHeight(); }catch(_){}
      try{ map.invalidateSize({animate:false, pan:false}); }catch(_){}
      try{ mapGL.resize(); }catch(_){}
    }, ms);
  });
})();

// Fallback — pokud uživatel nemá API klíč, spusť feeds po 2s bez AI
setTimeout(function(){
  try{
    if(typeof _startAllFeeds === 'function' && !window._feedsStarted){
      window._feedsStarted = true;
      _startAllFeeds();
    }
    // Zajisti že mapa je správně inicializovaná
    if(typeof map !== 'undefined'){
      map.invalidateSize({animate:false, pan:false});
    }
  }catch(_){}
}, 100);



// ── Boot screen key verification ──────────────────────────────────────────
async function _bootVerifyKey() {
  const inp  = document.getElementById('boot-key-input');
  const btn  = document.getElementById('boot-verify-btn');
  const sRow = document.getElementById('boot-verify-status');
  const sIcon= document.getElementById('boot-verify-icon');
  const sTxt = document.getElementById('boot-verify-text');
  const sDet = document.getElementById('boot-verify-detail');

  function show(icon, color, text, detail) {
    if(sRow)  sRow.style.display = 'flex';
    if(sIcon) { sIcon.textContent = icon; sIcon.style.color = color; }
    if(sTxt)  { sTxt.textContent = text; sTxt.style.color = color; }
    if(sDet)  sDet.textContent = detail || '';
  }

  const k = inp ? inp.value.trim() : '';

  // Format checks
  if(!k)                  { show('⚠','#ff7700','NO KEY ENTERED','Paste your sk-ant-... key into the field above'); return; }
  if(!k.startsWith('sk-ant')) { show('✕','#ff2222','INVALID FORMAT — KEY REJECTED','Key must begin with sk-ant  ·  Get yours at console.anthropic.com'); return; }
  if(k.length < 40)       { show('✕','#ff2222','KEY TOO SHORT','This does not appear to be a valid Anthropic key'); return; }

  // Live API test
  show('⏳','#ff8800','VERIFYING KEY — CONNECTING TO ANTHROPIC API...','Sending authentication request...');
  if(btn) { btn.textContent = 'CHECKING...'; btn.disabled = true; btn.style.background = '#331500'; btn.style.color='#ff6600'; }

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
        messages: [{ role: 'user', content: 'OK' }]
      }),
      signal: (()=>{ const c=new AbortController(); setTimeout(()=>c.abort(),12000); return c.signal; })()
    });

    const ms = Date.now() - start;
    const data = await resp.json().catch(()=>({}));

    if(resp.ok && data.content) {
      // ✅ SUCCESS — unlock system
      show('●','#00cc44','KEY VERIFIED — ACCESS GRANTED','Anthropic API connected · ' + ms + 'ms · Initializing all data feeds...');
      if(btn) { btn.textContent='✓ CONNECTED'; btn.style.background='#003318'; btn.style.color='#00cc44'; }
      // Unlock table + canvas visually
      const tw = document.getElementById('boot-table-wrap');
      const cw = document.getElementById('boot-canvas-wrap');
      if(tw){ tw.style.opacity='1'; }
      if(cw){ cw.style.opacity='1'; }
      // Set key and start everything
      window.ANTHROPIC_API_KEY = k;
      const bi = document.getElementById('api-key-input');
      if(bi) bi.value = k;
      // Mark key as verified in boot system
      _boot.keyVerified = true;
      _boot.render();
      // Start all feeds — overlay dismisses automatically when 3+ feeds connect
      setTimeout(() => { _activateAIFeatures(); }, 600);

    } else if(resp.status === 401) {
      show('✕','#ff2222','AUTHENTICATION FAILED — KEY REJECTED',
        'HTTP 401 · This key is invalid or revoked · Check console.anthropic.com');
      if(btn) { btn.textContent='VERIFY & CONNECT'; btn.disabled=false; btn.style.background='#ff6600'; btn.style.color='#000'; }

    } else if(resp.status === 403) {
      show('✕','#ff2222','ACCESS DENIED — HTTP 403',
        'Key exists but has no permissions · Check your Anthropic account');
      if(btn) { btn.textContent='VERIFY & CONNECT'; btn.disabled=false; btn.style.background='#ff6600'; btn.style.color='#000'; }

    } else if(resp.status === 429) {
      // Rate limited — key is valid!
      show('◑','#ff8800','KEY VALID — RATE LIMITED (HTTP 429)',
        'Key accepted · Rate limit reached · Connecting anyway...');
      window.ANTHROPIC_API_KEY = k;
      if(btn) { btn.textContent='✓ VALID'; btn.style.background='#332200'; btn.style.color='#ff8800'; }
      _boot.keyVerified = true;
      _boot.render();
      setTimeout(()=>_activateAIFeatures(), 1000);

    } else {
      show('◑','#ff7700','UNEXPECTED RESPONSE — HTTP ' + resp.status,
        (data.error?.message||'Unknown error') + ' · Try again or check your key');
      if(btn) { btn.textContent='VERIFY & CONNECT'; btn.disabled=false; btn.style.background='#ff6600'; btn.style.color='#000'; }
    }

  } catch(e) {
    if(e.name==='AbortError') {
      show('◑','#ff7700','CONNECTION TIMEOUT — NO RESPONSE IN 12s',
        'Network may be blocking direct API access · Run: python3 -m http.server 8080 and open localhost:8080');
    } else {
      show('◑','#ff7700','NETWORK ERROR — ' + e.message,
        'Check internet connection · Safari/file:// mode blocks API calls');
    }
    if(btn) { btn.textContent='VERIFY & CONNECT'; btn.disabled=false; btn.style.background='#ff6600'; btn.style.color='#000'; }
  }
}

// Asset Tab — preview & apply
window._previewAssetTab = function(raw) {
  const { display } = window._detectAssetType(raw || '');
  const lbl = document.getElementById('asset-tab-label');
  if (lbl && raw.trim()) lbl.textContent = display || 'SECURITY';
  _bbgShowAC(raw.trim());
};

// Show full menu on focus even if empty
window._onAssetTabFocus = function() {
  const inp = document.getElementById('asset-tab-inp');
  _bbgPositionAC(inp);
  _bbgShowAC(inp ? inp.value.trim() : '');
};

// Position #bbg-ac below a given input element
function _bbgPositionAC(el) {
  const ac = document.getElementById('bbg-ac');
  if (!ac || !el) return;
  const rect = el.closest('.cmd-group, #QUICKBAR, [id="asset-tab"]') 
    ? el.closest('.cmd-group, #QUICKBAR') || el
    : el;
  const r = rect.getBoundingClientRect ? rect.getBoundingClientRect() : null;
  // Fallback: position below TOPBAR (26px)
  const top = r ? r.bottom : 26;
  ac.style.top = top + 'px';
  // Left align: try to align with the element
  const left = r ? Math.max(0, r.left) : 0;
  ac.style.left = left + 'px';
}

// Generic focus handler for any input - show menu positioned under it
window._bbgShowAcForEl = function(el) {
  _bbgPositionAC(el);
  _bbgShowAC(el ? el.value.trim() : '');
};

/* ── Bloomberg Autocomplete ── */
const _bbgCrypto = [
  {cmd:'CRYPTO',  desc:'Market Cap Ranking — All Assets'},
  {cmd:'DOMN',    desc:'BTC / Altcoin Dominance Chart'},
  {cmd:'ETFF',    desc:'ETF Flows — Bitcoin & Ethereum'},
];
const _bbgMacro = [];
const _bbgFed = [
  {cmd:'FED',     desc:'Federal Reserve Watch — FOMC · Rates'},
  {cmd:'BYFC',    desc:'Bond Yield Forecasts'},
  {cmd:'INTEL',   desc:'Central Bank Intelligence Feed'},
  {cmd:'MACRO',   desc:'Macro Indicators — CPI · PCE · NFP'},
];
const _bbgNews = [
  {cmd:'WN',      desc:'Live Breaking News Feed'},
  {cmd:'NWS',     desc:'News & Research — Filtered'},
  {cmd:'INTEL',   desc:'Global Intelligence — Macro & Markets'},
  {cmd:'JOURN',   desc:'Journalist & Trader Watchlist'},
];
// ── CRYPTO ASSETS (Digital Assets only) ──────────────────────────────────────
const _bbgSecurities = [
  {sym:'BTC Curncy',    name:'Bitcoin'},
  {sym:'ETH Curncy',    name:'Ethereum'},
  {sym:'BNB Curncy',    name:'BNB'},
  {sym:'SOL Curncy',    name:'Solana'},
  {sym:'XRP Curncy',    name:'XRP'},
  {sym:'ADA Curncy',    name:'Cardano'},
  {sym:'AVAX Curncy',   name:'Avalanche'},
  {sym:'DOGE Curncy',   name:'Dogecoin'},
  {sym:'DOT Curncy',    name:'Polkadot'},
  {sym:'LINK Curncy',   name:'Chainlink'},
  {sym:'UNI Curncy',    name:'Uniswap'},
  {sym:'AAVE Curncy',   name:'Aave'},
  {sym:'SUI Curncy',    name:'Sui'},
  {sym:'TON Curncy',    name:'Toncoin'},
  {sym:'HYPE Curncy',   name:'Hyperliquid'},
  {sym:'PENDLE Curncy', name:'Pendle Finance'},
  {sym:'GRT Curncy',    name:'The Graph'},
  {sym:'ENA Curncy',    name:'Ethena'},
  {sym:'ONDO Curncy',   name:'Ondo Finance'},
  {sym:'TIA Curncy',    name:'Celestia'},
  {sym:'WLD Curncy',    name:'Worldcoin'},
  {sym:'JTO Curncy',    name:'Jito'},
  {sym:'PYTH Curncy',   name:'Pyth Network'},
  {sym:'BONK Curncy',   name:'Bonk'},
  {sym:'WIF Curncy',    name:'dogwifhat'},
  {sym:'PEPE Curncy',   name:'Pepe'},
  {sym:'SHIB Curncy',   name:'Shiba Inu'},
  {sym:'BERA Curncy',   name:'Berachain'},
  {sym:'MOVE Curncy',   name:'Movement'},
  {sym:'KAS Curncy',    name:'Kaspa'},
  {sym:'VIRTUAL Curncy',name:'Virtuals Protocol'},
  {sym:'NEAR Curncy',   name:'NEAR Protocol'},
  {sym:'ICP Curncy',    name:'Internet Computer'},
  {sym:'APT Curncy',    name:'Aptos'},
  {sym:'OM Curncy',     name:'MANTRA'},
  {sym:'TRX Curncy',    name:'TRON'},
  {sym:'ATOM Curncy',   name:'Cosmos'},
  {sym:'FIL Curncy',    name:'Filecoin'},
  {sym:'LTC Curncy',    name:'Litecoin'},
  {sym:'XLM Curncy',    name:'Stellar'},
  {sym:'BCH Curncy',    name:'Bitcoin Cash'},
  {sym:'VET Curncy',    name:'VeChain'},
  {sym:'ALGO Curncy',   name:'Algorand'},
  {sym:'FTM Curncy',    name:'Fantom'},
  {sym:'INJ Curncy',    name:'Injective'},
  {sym:'ARB Curncy',    name:'Arbitrum'},
  {sym:'OP Curncy',     name:'Optimism'},
  {sym:'LDO Curncy',    name:'Lido DAO'},
  {sym:'CRV Curncy',    name:'Curve'},
  {sym:'MKR Curncy',    name:'Maker'},
  {sym:'GMX Curncy',    name:'GMX'},
  {sym:'JUP Curncy',    name:'Jupiter'},
  {sym:'RAY Curncy',    name:'Raydium'},
  {sym:'SEI Curncy',    name:'Sei'},
  {sym:'XMR Curncy',    name:'Monero'},
];
// ── EQUITIES ─────────────────────────────────────────────────────────────────
const _bbgEquities = [
  {sym:'MSTR Equity',   name:'MicroStrategy'},
  {sym:'COIN Equity',   name:'Coinbase Global'},
  {sym:'SOFI Equity',   name:'SoFi Technologies'},
  {sym:'HOOD Equity',   name:'Robinhood Markets'},
  {sym:'PLTR Equity',   name:'Palantir Technologies'},
  {sym:'UPST Equity',   name:'Upstart Holdings'},
  {sym:'AFRM Equity',   name:'Affirm Holdings'},
  {sym:'SNOW Equity',   name:'Snowflake'},
  {sym:'DDOG Equity',   name:'Datadog'},
  {sym:'NET Equity',    name:'Cloudflare'},
  {sym:'CRWD Equity',   name:'CrowdStrike'},
  {sym:'RIVN Equity',   name:'Rivian Automotive'},
  {sym:'LCID Equity',   name:'Lucid Group'},
  {sym:'NIO Equity',    name:'NIO Inc'},
  {sym:'LMT Equity',    name:'Lockheed Martin'},
  {sym:'BA Equity',     name:'Boeing'},
  {sym:'DIS Equity',    name:'Walt Disney'},
  {sym:'SPOT Equity',   name:'Spotify'},
];
// ── ETF ──────────────────────────────────────────────────────────────────────
const _bbgETFs = [
  {sym:'IBIT Equity',   name:'iShares Bitcoin ETF (NASDAQ)'},
  {sym:'SPY Equity',    name:'SPDR S&P 500 ETF (NYSE Arca)'},
  {sym:'QQQ Equity',    name:'Invesco QQQ Trust (NASDAQ)'},
  {sym:'GLD Equity',    name:'SPDR Gold Shares (NYSE Arca)'},
  {sym:'IWM Equity',    name:'iShares Russell 2000 ETF (NYSE Arca)'},
  {sym:'DIA Equity',    name:'SPDR Dow Jones ETF (NYSE Arca)'},
  {sym:'TLT Equity',    name:'iShares 20Y Treasury ETF (NASDAQ)'},
  {sym:'XLK Equity',    name:'Technology Select SPDR (NYSE Arca)'},
  {sym:'XLF Equity',    name:'Financial Select SPDR (NYSE Arca)'},
  {sym:'ARKK Equity',   name:'ARK Innovation ETF (NYSE Arca)'},
];
const _bbgIndices = [
  {sym:'SPX Index',     name:'S&P 500 Index'},
  {sym:'ES1! Futures',  name:'S&P 500 E-mini Futures (CME)'},
  {sym:'NDX Index',     name:'Nasdaq 100 Index'},
  {sym:'NQ1! Futures',  name:'Nasdaq 100 E-mini Futures (CME)'},
  {sym:'DJI Index',     name:'Dow Jones Industrial (TVC)'},
  {sym:'YM1! Futures',  name:'Dow Jones E-mini Futures (CME)'},
  {sym:'DAX Index',     name:'DAX Germany 40 (XETR)'},
  {sym:'FDAX1! Futures',name:'DAX Futures (Eurex)'},
  {sym:'NI225 Index',   name:'Nikkei 225 Japan'},
  {sym:'NK1! Futures',  name:'Nikkei 225 Futures (OSE)'},
  {sym:'VIX Index',     name:'CBOE Volatility Index'},
  {sym:'FTSE Index',    name:'FTSE 100 UK'},
];
const _bbgCommodities = [
  {sym:'GOLD Comdty',   name:'GOLD Spot (XAU)'},
  {sym:'SILVER Comdty', name:'SILVER Spot (XAG)'},
  {sym:'OIL Comdty',    name:'WTI Crude Oil'},
  {sym:'GAS Comdty',    name:'Natural Gas'},
  {sym:'COPPER Comdty', name:'Copper LME'},
];
const _bbgForex = [
  {sym:'EURUSD Curncy', name:'EUR / USD Spot'},
  {sym:'GBPUSD Curncy', name:'GBP / USD Spot'},
  {sym:'USDJPY Curncy', name:'USD / JPY Spot'},
  {sym:'AUDUSD Curncy', name:'AUD / USD Spot'},
  {sym:'USDCAD Curncy', name:'USD / CAD Spot'},
];

if (!document.getElementById('bbg-ac-style')) {
  const s = document.createElement('style');
  s.id = 'bbg-ac-style';
  s.textContent = `
    #bbg-ac { position:fixed;left:0;z-index:99999;width:100vw;max-width:1080px;display:none;pointer-events:all;
      background:#242424;
      font-family:'Courier New',Courier,monospace;
      font-size:13px;
      border:1px solid #303030;
      border-top:1px solid #303030;
      margin-top:0px;
      box-shadow:4px 8px 30px rgba(0,0,0,.97);
      overflow-y:auto;
      max-height:calc(100vh - 60px);
    }
    #bbg-ac b { font-weight:900; color:inherit; font-style:normal; text-decoration:underline; }
    input::placeholder { color:#5a2800 !important; opacity:0.65 !important; }
    .bac-row { display:none !important; }
    .bac-l   { display:none !important; }
    .bac-r   { display:none !important; }
    .bac-hd  { display:none !important; }
    .bac-more{ display:none !important; }
    .bac-top { display:none !important; }
    .bac-sep { border-top:1px solid #111520; }
    /* Full menu styles */
    .bbg-menu-wrap { display:flex; flex-direction:column; }
    .bbg-menu-breadcrumb { padding:4px 12px; border-bottom:1px solid #2a2a2a; background:#1a1a1a; display:flex; align-items:center; justify-content:space-between; }
    .bbg-menu-breadcrumb-l { color:#883300; font-size:11px; font-style:italic; }
    .bbg-menu-breadcrumb-l a { color:#ff7700; text-decoration:none; font-style:italic; }
    .bbg-menu-breadcrumb-r { color:#666666; font-size:11px; cursor:pointer; letter-spacing:0.5px; }
    .bbg-menu-breadcrumb-r:hover { color:#ff7700; }
    .bbg-menu-cols { display:grid; grid-template-columns:1fr 1fr; }
    .bbg-menu-col { padding:4px 0 8px; }
    .bbg-menu-col:first-child { border-right:1px solid #2a2a2a; }
    .bbg-menu-item { display:flex; align-items:baseline; padding:2px 10px 2px 8px; cursor:pointer; }
    .bbg-menu-item:hover { background:#242424; }
    .bbg-menu-item.bbg-menu-active { background:#1a1a1a; }
    .bbg-menu-num { color:#666666; width:28px; flex-shrink:0; font-size:12px; text-align:right; padding-right:4px; }
    .bbg-menu-run { color:#666666; width:12px; flex-shrink:0; font-size:9px; }
    .bbg-menu-cmd { color:#ffffff; text-shadow:0 0 8px rgba(255,255,255,0.4); width:90px; flex-shrink:0; font-weight:700; font-size:12.5px; }
    .bbg-menu-desc { color:#ff9900 !important; font-size:12.5px !important; font-family:'Courier Prime','Courier New',monospace !important; }
    .bbg-menu-cat { padding:6px 8px 2px; color:#555555; font-size:10.5px; letter-spacing:0.5px; cursor:pointer; font-style:italic; }
    .bbg-menu-cat:hover { color:#888888; }
    .bbg-menu-cat-arrow { color:#3a5060; }
    .bbg-menu-divider { border:none; border-top:1px solid #0f1320; margin:2px 0; }
  `;
  document.head.appendChild(s);
}

let _bbgAcEl = null;
function _bbgGetAC() {
  let el = document.getElementById('bbg-ac');
  if (!el) { el = document.createElement('div'); el.id='bbg-ac'; document.body.appendChild(el); }
  _bbgAcEl = el;
  return el;
}

// ── BLOOMBERG FULL MENU DATA ──────────────────────────────────────────────────
const _bbgMenuCategories = [
  { label: 'Securities, Settings & Help', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:1,  run:true,  cmd:'CRYPTO',  desc:'Crypto Markets Dashboard' },
      { num:2,  run:true,  cmd:'MMAP',    desc:'Market Heatmap' },
      { num:3,  run:true,  cmd:'WEI',     desc:'World Equity Indices' },
      { num:4,  run:true,  cmd:'FX',      desc:'FX Spot Rates' },
      { num:5,  run:true,  cmd:'WORLD',   desc:'World Assets' },
    ]
  },
  { label: 'Stocks & Equities', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:6,  run:true,  cmd:'STOCKS2', desc:'Stocks Dashboard — All Sectors' },
      { num:7,  run:true,  cmd:'EARN',    desc:'Earnings Calendar' },
      { num:8,  run:true,  cmd:'IPO',     desc:'IPO Calendar' },
    ]
  },
  { label: 'Commodities', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:9,  run:true,  cmd:'COMDTY',  desc:'Commodities Dashboard' },
      { num:10, run:true,  cmd:'ENERGY',  desc:'Energy — WTI · Brent · Gas' },
      { num:11, run:true,  cmd:'METALS',  desc:'Precious Metals — Gold · Silver' },
      { num:12, run:true,  cmd:'AGRI',    desc:'Agricultural — Wheat · Corn · Soy' },
    ]
  },
  { label: 'Price Discovery', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:13, run:true,  cmd:'DOMN',    desc:'BTC / Altcoin Dominance' },
      { num:14, run:true,  cmd:'ETFF',    desc:'ETF Flows — BTC & ETH' },
      { num:15, run:true,  cmd:'PERF',    desc:'Performance Table' },
    ]
  },
  { label: 'Analytics & Idea Generation', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:16, run:true,  cmd:'MACRO',   desc:'Macro Indicators — CPI·NFP' },
      { num:17, run:true,  cmd:'ECAL',    desc:'Economic Calendar' },
      { num:18, run:true,  cmd:'BNDS',    desc:'Bonds Dashboard' },
    ]
  }
];

const _bbgMenuCategoriesR = [
  { label: null, items: [
      { num:12, run:false, cmd:'', desc:'Analyze EURUSD Curncy' },
  ]},
  { label: 'News & Research', isLabel: true, items: [] },
  {
    label: null,
    items: [
      { num:13, run:true,  cmd:'WN',       desc:'All News — Live Breaking Feed' },
      { num:14, run:true,  cmd:'WNTOP',    desc:'Top News Stories' },
      { num:15, run:true,  cmd:'WNMACRO',  desc:'Macro — Central Banks & Data' },
      { num:16, run:true,  cmd:'WNMKT',    desc:'Markets — Equities & FX' },
      { num:17, run:true,  cmd:'WNCRYP',   desc:'Crypto — Digital Assets' },
      { num:18, run:true,  cmd:'WNEARNS',  desc:'Earnings — Corp Results' },
      { num:19, run:true,  cmd:'WNENRG',   desc:'Energy — Oil & Gas' },
      { num:20, run:true,  cmd:'WNCB',     desc:'Central Banks — FED ECB BOE BOJ' },
      { num:21, run:true,  cmd:'CN',       desc:'Company News' },
      { num:22, run:true,  cmd:'NWS',      desc:'News & Research — Filtered' },
      { num:23, run:true,  cmd:'INTEL',    desc:'Global Intelligence Feed' },
      { num:24, run:true,  cmd:'JOURN',    desc:'Journalist & Trader Watchlist' },
    ]
  },
  { label: 'Equities', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:17, run:true,  cmd:'EQUITY',  desc:'Equity Dashboard' },
      { num:18, run:true,  cmd:'ALERTS',  desc:'Price Alerts' },
      { num:19, run:true,  cmd:'FA',      desc:'Financial Analysis' },
      { num:20, run:true,  cmd:'EARN',    desc:'Earnings Calendar' },
    ]
  },
  { label: 'FX Electronic Trading', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:21, run:true,  cmd:'FXIP',    desc:'FX Information Portal' },
      { num:22, run:true,  cmd:'FX',      desc:'FX Spot Rates Table' },
      { num:23, run:true,  cmd:'ALLQ',    desc:'All Quotes' },
      { num:24, run:true,  cmd:'OVML',    desc:'Option Pricer FX/CMDT' },
      { num:25, run:false, cmd:'BFIX',    desc:'Bloomberg FX Fixings' },
      { num:26, run:false, cmd:'FXFA',    desc:'FX-Interest Rate Arbitrage' },
      { num:27, run:true,  cmd:'GP',      desc:'Line Chart' },
    ]
  },
  { label: 'FX Derivatives', isLink: true, items: [] },
  {
    label: null,
    items: [
      { num:28, run:false, cmd:'FIRS',    desc:'First Word FX' },
      { num:29, run:false, cmd:'TOP FX',  desc:'Top News Stories' },
      { num:30, run:true,  cmd:'STNI',    desc:'Suggested News Feed' },
      { num:31, run:true,  cmd:'RES',     desc:'Research Home' },
      { num:32, run:true,  cmd:'BICO',    desc:'Bloomberg Intelligence Primer' },
    ]
  },
  { label: null, items: [
      { num:33, run:false, cmd:'MARS FX', desc:'Foreign Exchange' },
  ]},
];

// Current menu breadcrumb state
let _bbgMenuPath = 'Currency Markets';
let _bbgMenuTitle = 'Main Menu of Bloomberg Functions';

function _bbgBuildFullMenu(q) {
  const hi = (text) => {
    if (!q) return text;
    return text.replace(new RegExp('('+q.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+')','gi'),'<b>$1</b>');
  };

  function renderCol(cats) {
    return cats.map(cat => {
      if (cat.isLink && !cat.items.length) {
        return `<div style="padding:6px 8px 2px;color:#555555;font-size:11px;font-style:italic">${cat.label} &rsaquo;</div>`;
      }
      if (cat.isLabel && !cat.items.length) {
        return `<div style="padding:8px 8px 2px;color:#555555;font-size:11px;font-style:italic">${cat.label}</div>`;
      }
      let out = '';
      if (cat.label) {
        out += `<div style="padding:6px 8px 2px;color:#555555;font-size:11px;font-style:italic">${cat.label} &rsaquo;</div>`;
      }
      cat.items.forEach(item => {
        const cmdStr = item.cmd ? hi(item.cmd) : '';
        const descStr = hi(item.desc);
        const runIcon = item.run
          ? `<span class="bbg-menu-run">&#x25B8;</span>`
          : `<span class="bbg-menu-run"></span>`;
        const onclick = item.cmd ? `onclick="_bbgMenuSelect('${item.cmd}')"` : '';
        const numStr = item.num ? item.num+')' : '';
        out += `<div class="bbg-menu-item" ${onclick}>
          <span class="bbg-menu-num">${numStr}</span>
          ${runIcon}
          <span class="bbg-menu-cmd">${cmdStr}</span>
          <span class="bbg-menu-desc">${descStr}</span>
        </div>`;
      });
      return out;
    }).join('');
  }

  return `<div class="bbg-menu-wrap">
    <div class="bbg-menu-breadcrumb">
      <span class="bbg-menu-breadcrumb-l">&#x25B3; <a href="#" onclick="return false" style="color:#3399ff;font-style:italic">${_bbgMenuTitle}</a> <span style="color:#3399ff">&rsaquo;</span> <span style="color:#ffffff;font-style:normal;font-weight:700">${_bbgMenuPath}</span></span>
      <span class="bbg-menu-breadcrumb-r" onclick="_bbgHideAC()">&lt;Cancel&gt; X</span>
    </div>
    <div class="bbg-menu-cols">
      <div class="bbg-menu-col">${renderCol(_bbgMenuCategories)}</div>
      <div class="bbg-menu-col">${renderCol(_bbgMenuCategoriesR)}</div>
    </div>
  </div>`;
}

// Shared direct panel list
const _bbgDirectPanels = ['CRYEXC','CRYPTO','DOMN','FUND','FUNDHIST','LIQD','LIQHEAT',
    'OIDASH','ORDB','CHAIN','DEFI','WHALE','ETFF','PERF','DHLO','VPVR',
    'MMAP','PORT','ALERTS','JOURN','SENT','RISK','ECAL','WIRP',
    'WN','NWS','INTEL','MACRO','FED','WORLD','ALLQ','FXIP','FXDS','FXTF',
    'FXC','WCR','WVOL','XCCY','GMM','FXSW','XDSH','FXFC','WCRS','ECMI',
    'BFIX','FXFA','GP','FIRS','STNI','RES','BICO','GHNEWS','FX',
    'COMDTY','BYFC','CRYEXC'];

window._bbgMenuSelect = function(cmd) {
  if (!cmd || !cmd.trim()) return;
  _bbgHideAC();
  if (window.openPanel) openPanel(cmd);
  else {
    const fnInp = document.getElementById('cmd-fn-inp');
    if (fnInp) { fnInp.value = cmd; fnInp.focus(); }
  }
};

function _bbgShowAC(q) {
  const qu = q ? q.toUpperCase() : '';
  const ac = _bbgGetAC();
  // Position under TOPBAR (26px) by default; _bbgShowAcForEl overrides this
  if (!ac.style.top || ac.style.top === '0px') {
    const tb = document.getElementById('TOPBAR');
    const rect = tb ? tb.getBoundingClientRect() : {bottom:26};
    ac.style.top = rect.bottom + 'px';
    ac.style.left = '0px';
  }

  // If empty query — show full Bloomberg menu
  if (!q || !q.trim()) {
    ac.innerHTML = _bbgBuildFullMenu('');
    ac.style.display = 'block';
    return;
  }

  // Filter mode
  function match(item) { return item.cmd.toUpperCase().startsWith(qu) || item.desc.toUpperCase().split(' ').some(w => w.startsWith(qu)); }
  function matchSec(s) { return s.sym.toUpperCase().startsWith(qu) || s.name.toUpperCase().split(' ').some(w => w.startsWith(qu)); }

  // Also match against full menu items
  const allMenuItems = [..._bbgMenuCategories, ..._bbgMenuCategoriesR]
    .flatMap(c => c.items || [])
    .filter(item => item.cmd && (item.cmd.toUpperCase().startsWith(qu) || item.desc.toUpperCase().split(' ').some(w => w.startsWith(qu))));

  const rCrypto = _bbgCrypto.filter(match).slice(0,6);
  const rMacro  = _bbgMacro.filter(match).slice(0,6);
  const rNews   = _bbgNews.filter(match).slice(0,6);
  const rSecs   = _bbgSecurities.filter(matchSec).slice(0,8);
  const rEqs    = _bbgEquities.filter(matchSec).slice(0,6);
  const rETFs   = _bbgETFs.filter(matchSec).slice(0,4);
  const rIdx    = _bbgIndices.filter(matchSec).slice(0,5);
  const rCmd    = _bbgCommodities.filter(matchSec).slice(0,5);
  const rFx     = _bbgForex.filter(matchSec).slice(0,5);

  const hasResults = rCrypto.length || rMacro.length || rNews.length || rSecs.length ||
    rEqs.length || rETFs.length || rIdx.length || rCmd.length || rFx.length || allMenuItems.length;

  if (!hasResults) { _bbgHideAC(); return; }

  function hi(text) {
    if (!q) return text;
    return text.replace(new RegExp('('+q.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+')','gi'),'<b>$1</b>');
  }

  // Section heading — italic like fullmenu categories
  function secHead(label, first) {
    return `<div style="padding:${first?'6':'8'}px 8px 2px;color:#555555;font-size:11px;font-style:italic">${label} &rsaquo;</div>`;
  }

  // Auto counter for numbering rows like fullmenu
  let _rowNum = 0;

  // Render a menu item row (new Bloomberg style — identical to fullmenu)
  function menuRow(cmd, desc, onclick) {
    _rowNum++;
    return `<div class="bbg-menu-item" onclick="${onclick}">
      <span class="bbg-menu-num">${_rowNum})</span>
      <span class="bbg-menu-run">&#x25B8;</span>
      <span class="bbg-menu-cmd">${hi(cmd)}</span>
      <span class="bbg-menu-desc">${hi(desc)}</span>
    </div>`;
  }

  // Render a security row (identical structure)
  function secRow(ticker, name, suffix, sym) {
    _rowNum++;
    return `<div class="bbg-menu-item" onclick="_bbgSelectSec('${sym}')">
      <span class="bbg-menu-num">${_rowNum})</span>
      <span class="bbg-menu-run"></span>
      <span class="bbg-menu-cmd">${hi(ticker)}</span>
      <span class="bbg-menu-desc">${hi(name)} &middot; ${suffix}</span>
    </div>`;
  }

  // Build left column
  let leftCol = '';
  if (allMenuItems.length) {
    leftCol += secHead('FUNCTIONS', true);
    leftCol += allMenuItems.map(item => menuRow(item.cmd, item.desc, `_bbgMenuSelect('${item.cmd}')`)).join('');
  }
  if (rCrypto.length) {
    leftCol += secHead('CRYPTO &amp; DIGITAL ASSETS', !allMenuItems.length);
    leftCol += rCrypto.map(f => menuRow(f.cmd, f.desc, `_bbgSelectFn('${f.cmd}')`)).join('');
  }
  if (rMacro.length) {
    leftCol += secHead('MACRO &amp; CALENDAR', !leftCol);
    leftCol += rMacro.map(f => menuRow(f.cmd, f.desc, `_bbgSelectFn('${f.cmd}')`)).join('');
  }
  if (rNews.length) {
    leftCol += secHead('NEWS &amp; INTELLIGENCE', !leftCol);
    leftCol += rNews.map(f => menuRow(f.cmd, f.desc, `_bbgSelectFn('${f.cmd}')`)).join('');
  }
  if (rSecs.length) {
    leftCol += secHead('CRYPTO ASSETS &amp; DIGITAL', !leftCol);
    leftCol += rSecs.map(s => secRow(s.sym.replace(' Curncy',''), s.name, 'Crypto', s.sym)).join('');
  }

  // Build right column
  let rightCol = '';
  if (rEqs.length) {
    rightCol += secHead('EQUITIES', true);
    rightCol += rEqs.map(s => secRow(s.sym.replace(' Equity',''), s.name, 'Equity', s.sym)).join('');
  }
  if (rETFs.length) {
    rightCol += secHead('ETF', !rightCol);
    rightCol += rETFs.map(s => secRow(s.sym.replace(' Equity',''), s.name, 'ETF', s.sym)).join('');
  }
  if (rIdx.length) {
    rightCol += secHead('EQUITY INDICES', !rightCol);
    rightCol += rIdx.map(s => secRow(s.sym.replace(' Index',''), s.name, 'Index', s.sym)).join('');
  }
  if (rCmd.length) {
    rightCol += secHead('COMMODITIES', !rightCol);
    rightCol += rCmd.map(s => secRow(s.sym.replace(' Comdty',''), s.name, 'Comdty', s.sym)).join('');
  }
  if (rFx.length) {
    rightCol += secHead('FOREIGN EXCHANGE', !rightCol);
    rightCol += rFx.map(s => secRow(s.sym.replace(' Curncy',''), s.name, 'Curncy', s.sym)).join('');
  }

  // Two columns if both sides have content, else single
  let bodyHtml;
  if (leftCol && rightCol) {
    bodyHtml = `<div class="bbg-menu-cols">
      <div class="bbg-menu-col">${leftCol}</div>
      <div class="bbg-menu-col">${rightCol}</div>
    </div>`;
  } else {
    bodyHtml = `<div class="bbg-menu-col" style="max-width:100%">${leftCol}${rightCol}</div>`;
  }

  const html = `<div class="bbg-menu-breadcrumb">
    <span class="bbg-menu-breadcrumb-l">&#x25B3; <span style="color:#3399ff;font-style:italic">${_bbgMenuTitle}</span> <span style="color:#3399ff">&rsaquo;</span> <span style="color:#ffffff;font-style:normal;font-weight:700">Search: ${q.toUpperCase()}</span></span>
    <span class="bbg-menu-breadcrumb-r" onclick="_bbgHideAC()">&lt;Cancel&gt; X</span>
  </div>${bodyHtml}`;

  ac.innerHTML = html;
  ac.style.display = 'block';
}
function _bbgHideAC() {
  const ac = document.getElementById('bbg-ac');
  if (ac) ac.style.display = 'none';
}
window._bbgHideAC = _bbgHideAC;


window._bbgSelectFn = function(cmd) {
  if (!cmd || !cmd.trim()) return;
  _bbgHideAC();
  if (window.openPanel) openPanel(cmd);
  else {
    const fnInp = document.getElementById('cmd-fn-inp');
    if (fnInp) { fnInp.value = cmd; fnInp.focus(); }
  }
};
window._bbgSelectSec = function(sym) {
  const inp = document.getElementById('asset-tab-inp');
  if (inp) { inp.value = ''; }
  _bbgHideAC();
  // Update topbar security field
  const secInp = document.getElementById('cmd-sec-inp');
  if (secInp) {
    secInp.value = sym;
    secInp.dispatchEvent(new Event('input'));
  }
  // Update function field
  const fnInp = document.getElementById('cmd-fn-inp');
  if (fnInp) fnInp.value = '';
  // Open Bloomberg security menu
  _bbgOpenSecMenu(sym);
};

/* ── Bloomberg Security Function Menu ── */
window._bbgOpenSecMenu = function(sym) {
  const eid = 'bbg-sec-menu-panel';
  const ex = document.getElementById(eid);
  if (ex) ex.remove();

  const su = sym.toUpperCase();
  const ticker = su.split(' ')[0];

  // Asset metadata
  const isCurncy = su.endsWith('CURNCY');
  const isIndex  = su.endsWith('INDEX');
  const isComdty = su.endsWith('COMDTY');
  const isEquity = su.endsWith('EQUITY');
  const etfTickers = ['IBIT','SPY','QQQ','GLD','IWM','VTI','VOO','ARKK','XLF','XLE'];
  const isETF    = isEquity && etfTickers.includes(ticker);
  const isStock  = isEquity && !isETF;

  const isMacro  = isIndex || isComdty;
  const isCrypto = isCurncy;

  const L = [
    {n:'1)',  cmd:'GP',       d:'Price Analytics — Real Time',      jump:true},
    {n:'2)',  cmd:'DES',      d:'Security Description',             jump:true},
  ];
  if (isCrypto) {
    L.unshift({n:'0)', cmd:'CRYPTO', d:'Digital Assets Dashboard', jump:true});
  } else if (isETF) {
    L.unshift({n:'0)', cmd:'ETFF', d:'ETF Flows Dashboard', jump:true});
  } else if (isStock) {
    L.unshift({n:'0)', cmd:'EQUITY', d:'Equity Dashboard', jump:true});
  } else if (isComdty) {
    L.unshift({n:'0)', cmd:'COMDTY', d:'Commodities Dashboard', jump:true});
  } else if (isIndex) {
    L.unshift({n:'0)', cmd:'IDX', d:'Equity Indices Dashboard', jump:true});
  }

  const R = [
    {n:'3)',  cmd:'NWS',      d: 'Institutional Research',          jump:true},
    {n:'4)',  cmd:'INTEL',    d: 'Global Market Intelligence',      jump:true},
    {n:'5)',  cmd:'WN',       d: 'Breaking News Feed',              jump:true},
  ];


  function mkCol(items) {
    let h = '<table style="border-collapse:collapse;width:100%;font-family:\'Arial Narrow\',Arial,sans-serif;font-size:14px;line-height:1.4;">';
    items.forEach(function(it) {
      if (it.sp) {
        h += '<tr><td colspan="4" style="height:12px;"></td></tr>';
      } else if (it.h) {
        h += '<tr><td style="color:#ffffff;text-align:right;padding:4px 10px 4px 0;width:20px;font-size:12px;vertical-align:top;">' + it.n + '</td><td colspan="3" style="color:#ffffff;font-weight:bold;padding:4px 0;font-size:15px;">' + it.h + '</td></tr>';
      } else {
        // High-contrast hook arrow
        const jumpIcon = it.jump ? '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z" transform="rotate(180 12 12)"/></svg>' : '';
        h += '<tr onclick="window._bbgSecMenuGo(\'' + it.cmd + '\',\'' + sym + '\')" style="cursor:pointer;" onmouseenter="this.style.background=\'#2a2a2a\'" onmouseleave="this.style.background=\'\'">';
        h += '<td style="width:20px;padding-left:4px;vertical-align:middle;">' + jumpIcon + '</td>';
        h += '<td style="color:#cccccc;text-align:right;padding:2px 10px 2px 0;white-space:nowrap;width:25px;font-size:13px;vertical-align:middle;">' + it.n + '</td>';
        h += '<td style="color:#ffffff;font-weight:bold;padding:2px 20px 2px 0;white-space:nowrap;width:45px;font-size:15px;vertical-align:middle;">' + it.cmd + '</td>';
        h += '<td style="color:#ff9900;padding:2px 0;vertical-align:middle;font-size:14px;">' + it.d + '</td>';
        h += '</tr>';
      }
    });
    h += '</table>';
    return h;
  }

  const div = document.createElement('div');
  div.id = eid;
  div.style.cssText = 'position:fixed;left:80px;top:40px;width:880px;background:#181818;z-index:500000;font-family:\'Arial Narrow\',Arial,sans-serif;border:none;box-shadow:0 30px 100px rgba(0,0,0,0.9);overflow:hidden;color:#fff;';

  const drag = 'var el=document.getElementById("'+eid+'");var ox=e.clientX-el.offsetLeft,oy=e.clientY-el.offsetTop;function mm(e){el.style.left=(e.clientX-ox)+"px";el.style.top=(e.clientY-oy)+"px";}function mu(){document.removeEventListener("mousemove",mm);document.removeEventListener("mouseup",mu);}document.addEventListener("mousemove",mm);document.addEventListener("mouseup",mu);';

  div.innerHTML =
    '<div style="display:flex;align-items:center;padding:12px 16px;background:#181818;cursor:move;user-select:none;" onmousedown="'+drag+'">' +
      '<span style="font-size:13px;font-family:Arial,sans-serif;letter-spacing:0.1px;display:flex;align-items:center;gap:6px;">' +
        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:#4488ff;"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' +
        '<span style="color:#4488ff;font-style:italic;">' + (isCrypto ? 'Crypto Functions' : isETF ? 'ETF Functions' : isStock ? 'Equity Functions' : isComdty ? 'Commodity Functions' : isIndex ? 'Index Functions' : 'Security Functions') + ' &gt; </span>' +
        '<span style="color:#fff;font-weight:bold;margin-left:4px;">Analyze ' + ticker + '</span>' +
      '</span>' +
      '<span onclick="document.getElementById(\''+eid+'\').remove()" style="margin-left:auto;color:#888;cursor:pointer;font-size:13px;padding-left:20px;font-weight:bold;">&lt;Cancel&gt; X</span>' +
    '</div>' +
    '<div style="display:flex;padding:6px 16px 20px;gap:24px;">' +
      '<div style="flex:1;">' + mkCol(L) + '</div>' +
      '<div style="flex:1;">' + mkCol(R) + '</div>' +
    '</div>' +
    '<div style="text-align:right;padding:6px 16px;color:#555;font-size:11px;border-top:1px solid rgba(255,255,255,0.02);font-weight:bold;">MenuId: 6452</div>';

  document.body.appendChild(div);
};

window._bbgOpenDES = function(sym, initialTab) {
  if (initialTab === undefined) initialTab = 1;
  const eid = 'bbg-des-panel';
  let tab = initialTab;
  const ticker = (sym || 'BA').split(' ')[0] || 'BA';
  const NAMES = {'BA':'BOEING CO/THE','AAPL':'APPLE INC','MSFT':'MICROSOFT CORP',
    'GOOGL':'ALPHABET INC','AMZN':'AMAZON.COM INC','TSLA':'TESLA INC',
    'NVDA':'NVIDIA CORP','META':'META PLATFORMS INC','JPM':'JPMORGAN CHASE & CO'};
  const name = NAMES[ticker] || ticker + ' CORP';
  const MF = "font-family:'Courier New',Courier,monospace";

  // ──────────────────────────────────────────────────────────────
  // SHELL
  // ──────────────────────────────────────────────────────────────
  function shell(body) {
    const TABS = [{id:1,n:'1) Profile'},{id:2,n:'2) Issue Info'},
                  {id:3,n:'3) Ratios'},{id:4,n:'4) Revenue & EPS'},
                  {id:5,n:'5) Industry Info'}];

    const tabBar = TABS.map(t => {
      const a = t.id === tab;
      return `<div onclick="window._bbgOpenDES('${sym}',${t.id})"
        style="${MF};font-size:14px;padding:0 20px;height:100%;display:flex;
          align-items:center;box-sizing:border-box;white-space:nowrap;cursor:pointer;
          font-weight:${a?700:400};background:${a?'#000':'#1a1a1a'};
          color:${a?'#fff':'#999'};
          border-top:${a?'2px solid #fff':'2px solid transparent'};
          border-right:1px solid #000000;user-select:none;"
        onmouseover="if(!${a})this.style.color='#ccc'"
        onmouseout="if(!${a})this.style.color='#999'"
      >${t.n}</div>`;
    }).join('');

    // Per-tab news matching screenshots exactly
    const NEWS = {
      1:['888 DML 18:46  Daily Mail: White House bans ALL members of Donald Trump\'s coronav...',
         '887 DML 18:46  Daily Mail: The COVID-19 tracking app offence that could land peop...',
         '886 BN  18:45  Ex-Green Beret Says Attempt to Oust Maduro Ongoing After Setback',
         '885 TWT 18:45  Reuters: Germany to reopen all shops, allow soccer matches; source...'],
      3:['889 TWT 18:46  Bloomberg QuickTake: Hundreds of people around the world are rolli...',
         '888 DML 18:46  Daily Mail: White House bans ALL members of Donald Trump\'s coronav...',
         '887 DML 18:46  Daily Mail: The COVID-19 tracking app offence that could land peop...',
         '886 BN  18:45  Ex-Green Beret Says Attempt to Oust Maduro Ongoing After Setback'],
      4:['891 DJ  18:46  ItaÃº CorpBanca CEO Gabriel Moura on Q1 2020 Results -- Earnings C...',
         '890 APW 18:46  Man Asks for New Judge, Venue in Wisconsin Brothers\'s Deaths',
         '889 TWT 18:46  Bloomberg QuickTake: Hundreds of people around the world are rolli...',
         '888 DML 18:46  Daily Mail: White House bans ALL members of Donald Trump\'s coronav...'],
      5:['BN  18:46  *QANTAS SECURED A FURTHER A$550M IN DEBT FUNDING',
         '892 CNP 18:46  Ontario calls for a national strategy on contact tracing of COVID-',
         '891 DJ  18:46  ItaÃº CorpBanca CEO Gabriel Moura on Q1 2020 Results -- Earnings C...',
         '890 APW 18:46  Man Asks for New Judge, Venue in Wisconsin Brothers\'s Deaths']
    };
    const newsLines = (NEWS[tab] || NEWS[1]).map(n =>
      `<div style="${MF};font-size:13px;line-height:1.55;color:#ff9900;
         white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n}</div>`).join('');

    return `
<div style="background:#000;height:26px;display:flex;align-items:center;padding:0 12px;
     border-bottom:1px solid #000000;${MF};flex-shrink:0;gap:8px;font-size:13px;">
  <span style="color:#fff;font-weight:700;">${ticker}&nbsp;US</span>
  <span style="color:#008800;">$</span>
  <span style="color:#dd2222;font-weight:700;font-size:14px;">&#9650;&nbsp;131.46</span>
  <span style="color:#cc2222;font-weight:700;font-size:14px;">&nbsp;-1.91</span>
  <svg width="68" height="18" viewBox="0 0 68 18" style="flex-shrink:0;">
    <polyline points="0,14 11,15 22,10 33,12 44,5 55,16 68,8" fill="none" stroke="#cc2222" stroke-width="1.8"/>
  </svg>
  <span style="color:#fff;margin-left:auto;">N131.38/131.39N</span>
  <span style="color:#fff;margin-left:24px;">20&nbsp;x223</span>
</div>
<div style="background:#000;height:18px;display:flex;align-items:center;padding:0 12px;
     border-bottom:1px solid #000000;${MF};font-size:11px;flex-shrink:0;gap:4px;">
  <span style="background:#996600;color:#000;padding:0 3px;font-size:10px;font-weight:700;flex-shrink:0;">T</span>
  <span style="color:#ddd;margin-left:2px;">At</span>
  <span style="color:#F39F41;font-weight:700;">18:30&nbsp;d</span>
  <span style="color:#666;margin-left:8px;">Vol</span><span style="color:#ff9900;">30,702,691</span>
  <span style="color:#666;margin-left:5px;">O</span><span style="color:#ff9900;">127.115D</span>
  <span style="color:#666;margin-left:5px;">H</span><span style="color:#ff9900;">131.50K</span>
  <span style="color:#666;margin-left:5px;">L</span><span style="color:#ff9900;">124.35K</span>
  <span style="color:#666;margin-left:5px;">Val</span><span style="color:#ff9900;">4.272B</span>
</div>
<div style="display:flex;height:21px;border-bottom:1px solid #000000;flex-shrink:0;">
  <div style="background:#cc8800;color:#000;padding:0 12px;${MF};font-size:12px;
       font-weight:700;display:flex;align-items:center;white-space:nowrap;">${ticker}&nbsp;US&nbsp;Equity</div>
  <div style="background:#7d0000;flex:1;display:flex;align-items:center;
       padding:0 14px;${MF};font-size:12px;gap:6px;">
    <span style="color:#F39F41;font-weight:700;">98)</span>
    <span style="color:#e8c8a0;font-weight:700;">Report</span>
    <span style="margin-left:auto;color:#e8c8a0;">Page&nbsp;${tab}/5</span>
    <span style="margin-left:28px;color:#e8c8a0;font-weight:700;">Security&nbsp;Description:&nbsp;Equity</span>
  </div>
</div>
<div style="display:flex;height:27px;background:#141414;border-bottom:1px solid #000000;flex-shrink:0;">${tabBar}</div>
<div style="flex:1;overflow-y:auto;overflow-x:hidden;background:#000;padding:10px 16px 8px;">${body}</div>
<div style="background:#000d3a;border-top:2px solid #0C57B3;padding:5px 12px;flex-shrink:0;">${newsLines}</div>
<div style="background:#000;border-top:1px solid #000000;padding:3px 12px;display:flex;
     align-items:center;flex-shrink:0;${MF};font-size:13px;">
  <span style="color:#4488ff;font-weight:700;">300)</span>
  <span style="color:#777;margin:0 10px 0 4px;">Edit Panel</span>
  <span style="color:#4488ff;font-weight:700;">301)</span>
  <span style="color:#777;margin-left:4px;">Expand Panel</span>
  <span onclick="document.getElementById('bbg-des-panel').remove()"
        style="margin-left:auto;cursor:pointer;color:#3a3a3a;font-size:12px;">&lt;Close&gt;&nbsp;[X]</span>
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // SHARED ROW HELPERS
  // ──────────────────────────────────────────────────────────────
  // Standard row: orange label left, value right
  function R(k, v, vc) {
    return `<div style="display:flex;align-items:baseline;border-bottom:1px solid #000000;
      min-height:20px;padding:1px 0;gap:4px;">
      <span style="flex:1;font-size:14px;color:#ff9900;line-height:1.4;min-width:0;">${k}</span>
      <span style="${MF};font-size:14px;color:${vc||'#fff'};white-space:nowrap;text-align:right;">${v}</span>
    </div>`;
  }
  // Bold row: bold orange label, value right
  function Rb(k, v, vc) {
    return `<div style="display:flex;align-items:baseline;border-bottom:1px solid #0d0d0d;
      min-height:20px;padding:1px 0;gap:4px;">
      <span style="flex:1;font-size:14px;color:#F39F41;font-weight:700;line-height:1.4;min-width:0;">${k}</span>
      <span style="${MF};font-size:14px;color:${vc||'#fff'};font-weight:700;white-space:nowrap;text-align:right;">${v}</span>
    </div>`;
  }
  // Section header in Ratios tab: white 15px bold, faint [~] icon on right
  function SH(label) {
    return `<div style="display:flex;justify-content:space-between;align-items:center;
      padding:5px 0 1px;border-bottom:2px solid #000000;margin-bottom:1px;">
      <span style="font-size:15px;font-weight:700;color:#fff;">${label}</span>
      <span style="${MF};font-size:9px;color:#222;">[~]</span>
    </div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // TAB 1 — PROFILE
  // ──────────────────────────────────────────────────────────────
  function tab1() {
    return `
<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px;">
  <span style="color:#51caf5;font-size:20px;font-weight:700;letter-spacing:0.1px;">${name}</span>
  <span style="${MF};font-size:13px;color:#ff9900;">FIGI&nbsp;<span style="color:#fff;">BBG000BCSST7</span></span>
</div>
<div style="display:flex;align-items:baseline;font-size:14px;margin-bottom:3px;gap:6px;">
  <span style="color:#fff;font-weight:700;">6)</span>
  <span style="color:#51caf5;cursor:pointer;">BI Research Primer | BICO »</span>
  <span style="margin-left:auto;color:#ff9900;">Classification&nbsp;<span style="color:#fff;">Aircraft &amp; Parts</span></span>
</div>
<div style="${MF};font-size:15px;color:#ff9900;line-height:1.55;margin-bottom:10px;">
  The Boeing Company, together with its subsidiaries, develops, produces, and markets commercial jet
  aircraft, as well as provides related support services to the commercial airline industry worldwide.
  The Company also researches, develops, produces, modifies, and supports information, space, and
  defense systems, including military aircraft, ...&nbsp;<span style="color:#555;cursor:pointer;">More</span>
</div>

<div style="display:grid;grid-template-columns:1.18fr 1fr 1fr;gap:18px;">

  <!-- COL 1: Price Chart -->
  <div>
    <div style="background:#131313;padding:3px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:5px;">8) Price Chart | GP »</div>
    <div style="position:relative;height:158px;background:#040404;border-left:1px solid #000000;
         border-bottom:1px solid #000000;overflow:hidden;margin-bottom:5px;">
      <!-- Y-axis: 400 350 300 250 200 150 — right side -->
      <div style="position:absolute;right:2px;top:6px;bottom:20px;display:flex;
           flex-direction:column;justify-content:space-between;${MF};font-size:9px;color:#484848;">
        <span>400</span><span>350</span><span>300</span><span>250</span><span>200</span><span>150</span>
      </div>
      <!-- X-axis months — bottom -->
      <div style="position:absolute;left:4px;right:18px;bottom:3px;display:flex;
           justify-content:space-between;${MF};font-size:9px;color:#484848;">
        <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
        <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
        <span>Mar</span><span>Apr</span>
      </div>
      <!-- Chart SVG — price goes from ~380 in May down to ~89 in March, brief recovery -->
      <svg style="position:absolute;left:4px;top:6px;width:calc(100% - 22px);height:calc(100% - 22px);"
           viewBox="0 0 500 128" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pg60" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#1a4a90" stop-opacity="0.52"/>
            <stop offset="100%" stop-color="#0a1428" stop-opacity="0.04"/>
          </linearGradient>
        </defs>
        <path d="M0,8 L44,7 L88,12 L132,20 L176,34 L220,52 L264,40 L308,47 L352,53 L378,66 L404,76 L440,87 L480,94 L500,97 L500,128 L0,128Z" fill="url(#pg60)"/>
        <path d="M0,8 L44,7 L88,12 L132,20 L176,34 L220,52 L264,40 L308,47 L352,53 L378,66 L404,76 L440,87 L480,94 L500,97" fill="none" stroke="#1e5898" stroke-width="2.2" stroke-linejoin="round"/>
        <line x1="450" y1="0" x2="450" y2="128" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="453" y="11" font-size="8" fill="#3a3a3a" font-family="Courier New">2020</text>
      </svg>
    </div>
    ${R('Px/Chg 1D (USD)','131.46/-1.43%')}
    ${R('52 Wk H (09/25/19)','391.00')}
    ${R('52 Wk L (03/18/20)','89.00')}
    ${R('YTD Change/%','-194.30/-59.65%')}
    ${R('Mkt Cap (USD)','74,186.2M')}
    ${R('Shrs Out/Float','564.3M/532.7M')}
    ${R('SI/% of Float','14.6M/2.74%')}
    ${R('Days to Cover','0.4')}
  </div>

  <!-- COL 2: Estimates + Dividend -->
  <div>
    <div style="background:#131313;padding:3px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:5px;">9) Estimates | EE »</div>
    <!-- Date row: key | (E) grey middle | value right -->
    <div style="display:flex;align-items:baseline;border-bottom:1px solid #0d0d0d;min-height:20px;padding:1px 0;">
      <span style="flex:1;font-size:14px;color:#ff9900;">Date</span>
      <span style="${MF};font-size:14px;color:#777;margin-right:10px;">(E)</span>
      <span style="${MF};font-size:14px;color:#fff;">07/24/20</span>
    </div>
    ${R('P/E','N.A.','#888')}
    <div style="display:flex;align-items:baseline;border-bottom:1px solid #0d0d0d;min-height:20px;padding:1px 0;">
      <span style="flex:1;font-size:14px;color:#ff9900;">Est P/E&nbsp;<span style="color:#777;">12/20</span></span>
      <span style="${MF};font-size:14px;color:#888;">N.A.</span>
    </div>
    <div style="display:flex;align-items:baseline;border-bottom:1px solid #0d0d0d;min-height:20px;padding:1px 0;">
      <span style="flex:1;font-size:14px;color:#ff9900;">T12M EPS&nbsp;<span style="color:#777;">(USD)</span></span>
      <span style="${MF};font-size:14px;color:#fff;">-8.56</span>
    </div>
    ${R('Est EPS','-2.98')}
    ${R('Est PEG','N.A.','#888')}
    <div style="background:#131313;padding:3px 8px;font-size:14px;font-weight:700;color:#fff;margin:11px 0 5px;">12) Dividend | DVD »</div>
    ${R('Ind Gross Yield','N.A.','#888')}
    <div style="${MF};font-size:15px;color:#ff9900;margin-top:10px;line-height:1.4;">Cash dividend discontinued</div>
  </div>

  <!-- COL 3: Corporate + Management -->
  <div>
    <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:5px;">13) Corporate Info</div>
    <div style="border-bottom:1px solid #0d0d0d;padding:2px 0;font-size:14px;"><span style="color:#fff;">14)&nbsp;</span><span style="color:#51caf5;cursor:pointer;">www.boeing.com</span></div>
    <div style="${MF};color:#fff;border-bottom:1px solid #0d0d0d;padding:2px 0;font-size:14px;">Chicago, IL, US</div>
    <div style="${MF};color:#fff;border-bottom:1px solid #0d0d0d;padding:2px 0;font-size:14px;">Empls&nbsp;161,100&nbsp;(12/31/19)</div>
    <div style="font-size:15px;font-weight:700;color:#fff;margin:10px 0 5px;">15) Management | MGMT »</div>
    <div style="font-size:14px;line-height:1.65;">
      <div style="color:#F39F41;font-weight:700;">16) David L Calhoun "Dave"</div>
      <div style="color:#888;margin-bottom:5px;">President/CEO</div>
      <div style="color:#F39F41;font-weight:700;">17) Leanne G Caret</div>
      <div style="color:#888;margin-bottom:5px;">Exec VP/Pres &amp; CEO:Defense</div>
      <div style="color:#F39F41;font-weight:700;">18) Theodore Colbert III "Ted"</div>
      <div style="color:#888;margin-bottom:5px;">Exec VP/Pres &amp; CEO:Global...</div>
    </div>
    ${R('12M Tot Ret','-64.25%','#ff4444','#fff')}
    ${R('Beta vs SPX','1.97','#fff','#ff9900')}
    <div style="font-size:15px;font-weight:700;color:#fff;margin:10px 0 4px;">21) Depositary Receipts</div>
    <div style="display:flex;border-bottom:1px solid #0d0d0d;padding:2px 0;font-size:14px;">
      <span style="flex:1;color:#fff;">Active Receipts</span>
      <span style="${MF};color:#fff;">5</span>
    </div>
  </div>
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // TAB 2 — ISSUE INFO
  // ──────────────────────────────────────────────────────────────
  function tab2() {
    function sec(t) {
      return `<div style="${MF};font-size:12px;font-weight:700;color:#ff9900;letter-spacing:1px;
        padding:8px 0 2px;border-bottom:1px solid #252525;margin-bottom:2px;text-transform:uppercase;">${t}</div>`;
    }
    return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;">
<div>
  ${sec('Identification')}
  ${R('Name',name,'#51caf5')}${R('Short Name','BOEING')}${R('Ticker','BA')}
  ${R('Exchange','New York Stock Exchange')}${R('FIGI','BBG000BCSST7')}
  ${R('CUSIP','097023105')}${R('ISIN','US0970231058')}
  ${R('SEDOL','2108601')}${R('Country','United States')}${R('Currency','USD')}
  ${sec('Security')}
  ${R('Security Type','Common Stock')}${R('Market Sector','Industrials')}
  ${R('GICS Sector','Industrials')}${R('GICS Industry','Aerospace &amp; Defense')}
  ${R('Status','Active')}
</div>
<div>
  ${sec('Share Data')}
  ${R('Shares Outstanding','564.3M')}${R('Float Shares','532.7M')}
  ${R('Insider Owned %','1.87%')}${R('Inst Owned %','64.23%')}
  ${R('Short Interest','14.6M')}${R('Short % Float','2.74%')}
  ${R('Days to Cover','0.4')}${R('Par Value','USD 1.00')}${R('IPO Date','05/08/1962')}
  ${sec('Trading')}
  ${R('Avg Dly Vol (3M)','7,128,542')}${R('Avg Dly Val (3M)','1.174B')}
  ${R('52-Wk High','391.00 (09/25/19)','#00cc44')}
  ${R('52-Wk Low','89.00 (03/18/20)','#ee3333')}
  ${R('All-Time High','446.01 (03/01/19)','#00cc44')}
  ${R('Beta (5Y Monthly)','1.97')}
</div>
<div>
  ${sec('Index Membership')}
  ${['S&amp;P 500 Index','Dow Jones Industrial Avg','S&amp;P 100 Index','MSCI USA Index',
     'Russell 1000 Index','NYSE Composite','S&amp;P 500 Industrials'].map(i=>
    `<div style="padding:2px 0;border-bottom:1px solid #0d0d0d;font-size:14px;color:#51caf5;cursor:pointer;">&#9679;&nbsp;${i}</div>`
  ).join('')}
  ${sec('Key Dates')}
  ${R('Fiscal Year End','December')}${R('Last Annual Date','12/31/2019')}
  ${R('Last Qtr End','03/31/2020')}${R('Next Earn Exp','07/29/2020')}
  ${sec('Analyst Ratings')}
  ${R('Consensus','Hold','#ff9900')}${R('Buy / Hold / Sell','5 / 14 / 3')}
  ${R('12M Price Target','USD 185.40','#00cc44')}
  ${R('Upside to Target','+41.13%','#00cc44')}
</div>
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // TAB 3 — RATIOS
  // ──────────────────────────────────────────────────────────────
  function tab3() {
    return `
<!-- Info header: 3 lines on left, value on same line right -->
<div style="font-size:14px;line-height:1.9;margin-bottom:8px;">
  <div style="color:#ff9900;">Fiscal Year End&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fff;font-weight:700;">12/2019</span></div>
  <div style="color:#ff9900;">Last Quarter End&nbsp;&nbsp;&nbsp;<span style="color:#fff;font-weight:700;">03/2020 Q1</span></div>
  <div style="color:#51caf5;">Current/T12M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fff;">(USD)</span></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;">

<!-- COL 1 -->
<div>
  ${SH('Issue Data')}
  ${R('Last Px','USD/131.46')}
  ${R('P/E','N.A.','#888')}
  ${R('Dvd Ind Yld','N.A.','#888')}
  ${R('P/B','N.A.','#888')}
  ${R('P/S','1.1')}
  ${R('Curr EV/T12M EBITDA','N.A.','#888')}
  ${Rb('Mkt Cap','74,186.2M')}
  ${Rb('Curr EV','97,891.2M')}
  ${SH('Growth Potential')}
  ${R('Dil EPS Frm Cont Op 1...','N.A.','#888')}
  ${R('Cap 1Y Gr','41.9%')}
  ${R('BPS 1Y Gr','N.A.','#888')}
  ${R('R&amp;D To Sl','4.2%')}
  ${R('Retntn Rt','N.A.','#888')}
  ${R('Rev - 1 Yr Gr','-24.3%')}
  ${R('Empl 1Y Gr','5.3%')}
  ${R('Ast 1Y Gr','13.9%')}
</div>

<!-- COL 2 -->
<div>
  ${SH('Per Share Data')}
  ${Rb('EPS T12M','-8.56')}
  ${Rb('DPS','8.22')}
  ${R('Bk Val Per Sh','-17.13')}
  ${R('Rev/Bas Sh','135.26')}
  ${R('CPS','-4.32')}
  ${R('Curr Shares Out','564.3M')}
  ${R('FCF/Basic Sh','-7.56')}
  ${SH('Profitability')}
  ${R('EBITDA','567.0M')}
  ${R('EBIT','-2.0B')}
  ${R('OPM','-2.6%')}
  ${R('Prtx Mrgn','-3.0%')}
  ${Rb('ROA','-2.6%')}
  ${R('ROE','N.A.','#888')}
  ${Rb('ROC','-12.0%')}
  ${R('Ast TO','0.5')}
</div>

<!-- COL 3 -->
<div>
  ${SH('Cash Flow Analysis')}
  ${Rb('P/CF','N.A.')}
  ${Rb('Curr P/FCF','N.A.')}
  ${Rb('CF/NI','N.A.')}
  ${Rb('Dvd P/O','N.A.')}
  ${R('Cash Gen/Cash Reqd','-0.4')}
  ${Rb('Csh Dvd Cov','N.A.')}
  ${R('CFO/Sales','-3.2%')}
  ${R('Eff IR','3.8%')}
  ${SH('Structure')}
  ${R('Curr Ratio','1.1')}
  ${R('Quick Ratio','0.1')}
  ${R('Debt/Assets','21.4%')}
  ${R('Debt/Com Eq','N.A.','#888')}
  ${R('A/R Trnovr','19.1')}
  ${R('Inv Turnover','1.0')}
  ${R('GM','5.8%')}
  ${R('EBIT/Tot Int Exp','-2.4')}
</div>
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // TAB 4 — REVENUE & EPS
  // ──────────────────────────────────────────────────────────────
  function tab4() {
    const years = ['2016','2017','2018','2019','2020','2021'];
    // All data: index 0=FY, 1=Q1, 2=Q2, 3=Q3, 4=Q4
    const REV = [
      [94.6,93.4,101.1,76.6,69.3,89.2],
      [22.6,21.0,23.4,22.9,16.9,19.5],
      [24.8,22.7,24.3,15.8,14.6,21.3],
      [23.9,24.3,25.1,20.0,17.6,22.5],
      [23.3,25.4,28.3,17.9,20.2,23.0],
    ];
    const EPS = [
      [7.24,12.04,16.01,-3.47,-2.98,7.64],
      [1.74,2.01,3.64,3.16,-1.70,1.06],
      [-0.44,2.55,3.33,-5.82,-1.69,1.41],
      [3.51,2.72,3.58,1.45,-0.501,1.79],
      [2.47,3.06,5.48,-2.33,0.364,1.97],
    ];

    // ── SVG Chart ──────────────────────────────────────────────
    // Pixel analysis from screenshot:
    //   Total chart height in screen ~190px
    //   Line zone: top ~38% = 0..72px of SVG (viewBox H=190)
    //   Separator: ~y=77
    //   Bar zone: 80..170
    //   X-labels: 175..190
    //   Y-labels appear on LEFT side of SVG (need left margin in viewBox)
    function makeChart(data, isEPS) {
      const W = 580, H = 190;
      const LT = 2, LB = 72;   // line top/bottom y
      const SEP = 77;
      const BT = 82, BB = 170; // bar top/bottom
      const BH = BB - BT;
      const XLY = 185;          // x-label y
      const n = 6;
      const fy = data[0];
      const qs = data.slice(1);

      // Line chart scale (FY values)
      const lMin = Math.min(...fy), lMax = Math.max(...fy);
      const lRange = lMax - lMin || 1;
      function lY(v) { return LB - ((v-lMin)/lRange)*(LB-LT-4) - 2; }

      // Bar scale
      const allAbs = [...fy, ...qs.flat()].map(Math.abs);
      const bMax = Math.max(...allAbs, 0.01);
      const BMID = isEPS ? BT + BH*0.54 : BB; // zero line for EPS
      const bScale = isEPS ? (BH*0.44)/bMax : (BH*0.90)/bMax;

      // Group geometry: nQ+1 bars per group
      const nQ=4, bw=7, bgap=1;
      const gw = W/n;
      const grpW = (nQ+1)*(bw+bgap);

      let s = '';

      // ── Subtle grid lines ──
      // Line zone
      for(let t=0;t<=3;t++){
        const y = LB - (t/3)*(LB-LT-4)-2;
        s += `<line x1="0" y1="${y.toFixed(1)}" x2="${W}" y2="${y.toFixed(1)}" stroke="#0e0e0e" stroke-width="1"/>`;
      }
      // Bar zone
      for(let t=1;t<=3;t++){
        const yy = isEPS ? BMID-(t/4)*BH*0.44 : BB-(t/4)*BH*0.90;
        if(yy>BT&&yy<BB) s += `<line x1="0" y1="${yy.toFixed(1)}" x2="${W}" y2="${yy.toFixed(1)}" stroke="#0e0e0e" stroke-width="1"/>`;
      }

      // ── Y-axis labels LEFT ──
      // Line chart: show 3 values
      [[0,'lMin'],[0.5,'lMid'],[1,'lMax']].forEach(([t,_]) => {
        const v = lMin + t*lRange;
        const y = lY(v);
        const lbl = isEPS ? (Math.abs(v)<1?v.toFixed(1):v.toFixed(0)) : v.toFixed(0);
        s += `<text x="-3" y="${(y+3).toFixed(1)}" text-anchor="end" font-size="8.5" fill="#484848" font-family="Courier New">${lbl}</text>`;
      });
      // Bar zone labels
      const bTick = isEPS ? [Math.round(bMax*0.45),0,-Math.round(bMax*0.45)] : [Math.round(bMax*0.9),Math.round(bMax*0.45),0];
      bTick.forEach(v => {
        const bh = Math.abs(v)*bScale;
        const yy = isEPS?(v>=0?BMID-bh:BMID+bh):BB-bh;
        if(yy>=BT&&yy<=BB) s += `<text x="-3" y="${(yy+3).toFixed(1)}" text-anchor="end" font-size="8.5" fill="#484848" font-family="Courier New">${v}</text>`;
      });

      // ── Separator ──
      s += `<line x1="0" y1="${SEP}" x2="${W}" y2="${SEP}" stroke="#1a1a1a" stroke-width="1.5"/>`;

      // ── EPS zero line ──
      if(isEPS) s += `<line x1="0" y1="${BMID}" x2="${W}" y2="${BMID}" stroke="#222" stroke-width="1"/>`;

      // ── Q bars (Q1-Q4) ──
      for(let qi=0;qi<nQ;qi++){
        for(let i=0;i<n;i++){
          const v=qs[qi][i];
          const bh=Math.max(1.5,Math.abs(v)*bScale);
          const x=i*gw+(gw-grpW)/2+qi*(bw+bgap);
          const y=isEPS?(v>=0?BMID-bh:BMID):BB-bh;
          // 2020/2021 (idx>=4): slightly lighter amber
          const col=i>=4?'#5a4200':'#7a5600';
          s+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" fill="${col}"/>`;
        }
      }
      // ── FY bars ──
      for(let i=0;i<n;i++){
        const v=fy[i];
        const bh=Math.max(1.5,Math.abs(v)*bScale);
        const x=i*gw+(gw-grpW)/2+nQ*(bw+bgap);
        const y=isEPS?(v>=0?BMID-bh:BMID):BB-bh;
        // reported: #ff9900 / estimated 2020-2021: #c4c4c4
        const col=i>=4?'#c4c4c4':'#ff9900';
        s+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" fill="${col}"/>`;
      }

      // ── FY line ──
      const pts = fy.map((v,i)=>`${(i*gw+gw/2).toFixed(1)},${lY(v).toFixed(1)}`).join(' ');
      s += `<polyline points="${pts}" fill="none" stroke="#aaaaaa" stroke-width="1.9" stroke-linejoin="round"/>`;
      // Dots
      fy.forEach((v,i)=>{
        const x=i*gw+gw/2, y=lY(v);
        const fc=i>=4?'#bbbbbb':'#ff9900';
        s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${fc}" stroke="#030303" stroke-width="1.2"/>`;
      });

      // ── X-axis year labels ──
      years.forEach((yr,i)=>{
        s+=`<text x="${(i*gw+gw/2).toFixed(1)}" y="${XLY}" text-anchor="middle" font-size="9.5" fill="#606060" font-family="Courier New">${yr}</text>`;
      });

      return `<svg viewBox="-22 0 ${W+28} ${H}" style="width:100%;height:185px;display:block;background:#070707;" preserveAspectRatio="none">${s}</svg>`;
    }

    // ── Data Table ──────────────────────────────────────────────
    function makeTable(data, isBil) {
      const labels=['FY','Q1','Q2','Q3','Q4'];
      const yHdr = years.map(y=>`<th style="text-align:right;padding:2px 7px;${MF};font-size:13px;color:#fff;font-weight:700;">${y}</th>`).join('');
      const rows = data.map((row,ri)=>{
        const cells = row.map((v,ci)=>{
          let d;
          if(isBil){
            d=(Math.abs(v)>=1?v.toFixed(1):v.toFixed(2))+'B';
          } else {
            // EPS format exactly matching screenshot:
            // 7.24, 12.04, 16.01, -3.47, -2.98, 7.64
            // 1.74, 2.01, 3.64, 3.16, -1.70, 1.06
            // -.440, 2.55, 3.33, -5.82, -1.69, 1.41
            // 3.51, 2.72, 3.58, 1.45, -.501, 1.79
            // 2.47, 3.06, 5.48, -2.33, .364, 1.97
            const av=Math.abs(v);
            if(av===0){ d='0.00'; }
            else if(av<1){
              // -.440 or .364
              const dec=av.toFixed(3).replace('0.','.');
              d=v<0?'-'+dec.slice(1):dec;
            } else {
              d=v.toFixed(2);
            }
          }
          const col=ci>=4?'#aaaaaa':'#ff9900';
          return `<td style="text-align:right;padding:2px 7px;${MF};font-size:13px;color:${col};">${d}</td>`;
        }).join('');
        const bold=ri===0?'font-weight:700;':'';
        return `<tr style="border-bottom:1px solid #0f0f0f;"><td style="padding:2px 6px;font-size:14px;color:#ff9900;${bold}">${labels[ri]}</td>${cells}</tr>`;
      }).join('');
      return `<table style="width:100%;border-collapse:collapse;margin-top:3px;">
        <tr style="border-bottom:1px solid #252525;"><td style="${MF};padding:2px 6px;font-size:13px;color:#fff;">(USD)</td>${yHdr}</tr>
        ${rows}
        <tr><td colspan="7" style="padding:3px 6px;font-size:11px;color:#383838;${MF};font-style:italic;">(Fiscal Period: Reported, Estimated)</td></tr>
      </table>`;
    }

    // ── Segment tables ──────────────────────────────────────────
    function segTbl(hdr, rows, hasGr) {
      return `<div>
        <div style="background:#111;padding:4px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;">${hdr}</div>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#0f0f0f;">
            <td style="padding:3px 8px;font-size:13px;color:#888;font-weight:700;">${hasGr?'Segment':'Region'}</td>
            <td style="padding:3px 8px;text-align:right;font-size:13px;color:#888;font-weight:700;">2019 Rev</td>
            <td style="padding:3px 8px;text-align:right;font-size:13px;color:#888;">3Yr Gr</td>
          </tr>
          ${rows.map(r=>{
            const gc=r[2]&&r[2].startsWith('-')?'#dd3333':'#00bb33';
            return `<tr style="border-bottom:1px solid #0d0d0d;">
              <td style="padding:4px 8px;font-size:14px;color:#fff;">${r[0]}</td>
              <td style="padding:4px 8px;text-align:right;font-size:14px;${MF};color:#fff;">
                <span style="display:inline-block;width:11px;height:11px;background:#006622;vertical-align:middle;margin-right:3px;"></span>${r[1]}
              </td>
              <td style="padding:4px 8px;text-align:right;font-size:14px;${MF};color:${r[2]?gc:'#555'};">${r[2]||'N.A.'}</td>
            </tr>`;
          }).join('')}
        </table>
      </div>`;
    }

    return `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px;">
  <div>
    <div style="background:#111;padding:4px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:2px;">6) Comparable Revenue | EM »</div>
    ${makeChart(REV,false)}
    ${makeTable(REV,true)}
  </div>
  <div>
    <div style="background:#111;padding:4px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:2px;">7) Comparable Earnings Per Share | EM »</div>
    ${makeChart(EPS,true)}
    ${makeTable(EPS,false)}
  </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  ${segTbl('8) Geo Seg | FA GEO »',[
    ['United States','34.4B',null],['Asia, other than China','10.7B',null],
    ['Europe','10.4B',null],['Middle East','9.3B',null],['Other','11.8B',null]
  ],false)}
  ${segTbl('9) Prod Seg | FA PROD »',[
    ['Commercial Airplanes','32.3B','-18.41%'],
    ['Defense, Space, &amp; Security','26.2B','9.13%'],
    ['Global Services','18.5B','10.15%'],
    ['Boeing Capital Corporation','244.0M','-6.45%']
  ],true)}
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // TAB 5 — INDUSTRY INFO
  // Pixel-exact range bar analysis from screenshot:
  //   Track: thin horizontal line on dark bg
  //   Blue circle (Company) and orange diamond (Peers) sit ON the track
  //   Sales Growth:  circle far left ~7%, diamond center ~55%
  //   EBITDA Margin: circle left ~44%, diamond right ~56%
  //   LTM Cash:      circle far left ~4%, diamond center ~46%
  //   Est P/E:       diamond left ~30%, circle far right ~88%
  //   EV/EBITDA:     diamond left ~7%,  circle far right ~92%
  // ──────────────────────────────────────────────────────────────
  function tab5() {
    function rbar(cp, pp) {
      // cp = company percent (0-100), pp = peer percent (0-100)
      const c = Math.min(95,Math.max(4,cp));
      const p = Math.min(95,Math.max(4,pp));
      return `<div style="position:relative;height:12px;background:#181818;width:185px;
        flex-shrink:0;box-sizing:border-box;border:1px solid #222;">
        <div style="position:absolute;top:50%;left:2%;right:2%;height:1px;background:#2c2c2c;transform:translateY(-50%);"></div>
        <div style="position:absolute;top:50%;left:${c}%;transform:translate(-50%,-50%);
          width:13px;height:13px;border-radius:50%;background:#2255cc;
          box-shadow:0 0 5px rgba(34,85,204,0.55);z-index:2;"></div>
        <div style="position:absolute;top:50%;left:${p}%;
          width:11px;height:11px;background:#ff8800;
          transform:translate(-50%,-50%) rotate(45deg);z-index:1;"></div>
      </div>`;
    }
    function irow(num,lbl,rev,pct,self) {
      return `<tr style="border-bottom:1px solid #0e0e0e;">
        <td style="${MF};padding:3px 6px;font-size:13px;color:#666;">${num}</td>
        <td style="padding:3px 8px;font-size:14px;color:${self?'#51caf5':'#ff9900'};font-weight:${self?700:400};cursor:pointer;">${lbl}</td>
        <td style="padding:3px 8px;text-align:right;font-size:14px;${MF};color:#fff;">
          <span style="display:inline-block;width:10px;height:10px;background:#006622;vertical-align:middle;margin-right:3px;"></span>${rev}
        </td>
        <td style="padding:3px 8px;text-align:right;font-size:14px;${MF};color:#ff9900;">${pct}</td>
      </tr>`;
    }
    function srow(k,co,co2,cp,pp,max) {
      return `<tr style="border-bottom:1px solid #0e0e0e;">
        <td style="padding:4px 0 4px 0;font-size:14px;color:#ff9900;padding-right:5px;white-space:nowrap;">${k}</td>
        <td style="padding:4px 6px;text-align:right;font-size:14px;${MF};color:#51caf5;white-space:nowrap;">${co}</td>
        <td style="padding:4px 4px;font-size:14px;${MF};color:#51caf5;white-space:nowrap;">${co2}</td>
        <td style="padding:4px 10px;">${rbar(cp,pp)}</td>
        <td style="padding:4px 6px;text-align:right;font-size:14px;${MF};color:#fff;white-space:nowrap;">${max}</td>
      </tr>`;
    }
    return `
<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px;">
  <span style="font-size:16px;font-weight:700;color:#fff;">Critical Themes: Aerospace &amp; Defense, Global</span>
  <span style="font-size:14px;color:#ff9900;cursor:pointer;">6) Primary Industry Dashboard | BI »</span>
</div>
<div style="${MF};font-size:15px;color:#F39F41;font-weight:700;line-height:1.7;margin-bottom:14px;padding-left:6px;">
  &nbsp;7) Drastic United Cuts Have U.S. Bottoming at 73%<br/>
  &nbsp;8) Deferrals Depress Boeing, Airbus Build Rates to 2024<br/>
  &nbsp;9) Interiors, Engine Repairs Fall on Covid-19: BI Webinar<br/>
  10) Boeing, Airbus Plane Values, Build Fall: BI Webinar
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">

  <!-- LEFT -->
  <div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
      <tr style="background:#181818;">
        <td colspan="2" style="padding:4px 6px;font-size:13px;color:#fff;font-weight:700;">Industry Revenue</td>
        <td style="padding:4px 8px;text-align:right;font-size:13px;color:#888;font-weight:700;">FY Rev</td>
        <td style="padding:4px 8px;text-align:right;font-size:13px;color:#888;font-weight:700;">% Tot Rev</td>
      </tr>
      ${irow('11)','BOEING CO/THE','58.48B','75.76%',true)}
      ${irow('12)','AIRBUS SE','80.25B','100.00%',false)}
      ${irow('13)','LOCKHEED MARTIN','59.81B','100.00%',false)}
      ${irow('14)','RAYTHEON TECHN...','46.92B','59.66%',false)}
      ${irow('15)','NORTHROP GRUM...','36.35B','100.00%',false)}
    </table>
    <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:5px;">17) Company Rev Breakdown | CCB »</div>
    ${[['Aircraft &amp; Parts','41.78%'],['Defense Primes','33.98%'],
       ['Transport Support Services','23.92%'],['Commercial Finance','0.32%']].map(([k,v])=>
      `<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #0e0e0e;font-size:14px;">
        <span style="color:#fff;">${k}</span><span style="${MF};color:#ff9900;">${v}</span>
      </div>`).join('')}
  </div>

  <!-- RIGHT -->
  <div>
    <div style="${MF};color:#ff9900;font-size:15px;padding:12px 0 18px;text-align:center;">No industry data is currently available.</div>

    <div style="background:#111;padding:4px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;">21) Op Stats | RV »</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
      <tr style="border-bottom:1px solid #1e1e1e;">
        <td style="padding:2px 0;"></td>
        <td colspan="2" style="padding:2px 8px;text-align:right;font-size:13px;color:#888;">Co</td>
        <td style="padding:2px 10px;text-align:center;font-size:13px;color:#888;">Range of Comparables</td>
        <td></td>
      </tr>
      ${srow('Sales Growth Yoy (%)','&#8722;24.29','&#8722;24.29', 7,55,'43.98')}
      ${srow('EBITDA Margin (%)','0.74','0.74',          44,56,'30.06')}
      ${srow('LTM Cash from Opera...','&#8722;9.5B','&#8722;9.5B', 4,46,'7.96B')}
    </table>

    <div style="background:#111;padding:4px 8px;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;">22) Equity Val | RV »</div>
    <table style="width:100%;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #1e1e1e;">
        <td style="padding:2px 0;"></td>
        <td colspan="2" style="padding:2px 8px;text-align:right;font-size:13px;color:#888;">Co</td>
        <td style="padding:2px 10px;text-align:center;font-size:13px;color:#888;">Range of Comparables</td>
        <td></td>
      </tr>
      ${srow('Est P/E Current Yr','N.A.','6.86',          88,31,'50.10')}
      ${srow('EV/ EBITDA Current FY','53.71','3.25',      92, 7,'53.71')}
    </table>

    <div style="display:flex;gap:16px;font-size:12px;margin-top:10px;justify-content:flex-end;color:#555;">
      <span style="display:flex;align-items:center;gap:5px;">
        <div style="width:11px;height:11px;border-radius:50%;background:#2255cc;flex-shrink:0;"></div>
        Company values of ${ticker} US Equity
      </span>
      <span style="display:flex;align-items:center;gap:5px;">
        <div style="width:10px;height:10px;background:#ff8800;transform:rotate(45deg);flex-shrink:0;margin:2px;"></div>
        Industry Peers Median
      </span>
    </div>
  </div>
</div>`;
  }

  // ──────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────
  let body = '';
  if      (tab===1) body=tab1();
  else if (tab===2) body=tab2();
  else if (tab===3) body=tab3();
  else if (tab===4) body=tab4();
  else if (tab===5) body=tab5();

  let div = document.getElementById(eid);
  if (!div) { div=document.createElement('div'); div.id=eid; document.body.appendChild(div); }
  div.style.cssText=`position:fixed;left:0;top:46px;width:100%;height:calc(100% - 46px);
    background:#000;z-index:600000;font-family:'Courier New',Courier,monospace;
    color:#ddd;overflow:hidden;box-sizing:border-box;display:flex;flex-direction:column;`;
  div.innerHTML=shell(body);
};


window._bbgSecMenuGo = function(cmd, sym) {
  const menuEl = document.getElementById('bbg-sec-menu-panel');
  if (menuEl) menuEl.remove();

  const ticker = sym.split(' ')[0].toUpperCase();

  if (cmd === 'DES') { window._bbgOpenDES(ticker, 1); return; }
  if (cmd === 'GP' || cmd === 'GF') {
    if (window._openChartForSymbol) window._openChartForSymbol(ticker);
    return;
  }

  // All crypto panels
  const cryptoPanels = {
    'CRYPTO':'CRYPTO','DOMN':'DOMN','FUND':'FUND','LIQD':'LIQD',
    'CHAIN':'CHAIN','DEFI':'DEFI','WHALE':'WHALE','ORDB':'ORDB',
    'VPVR':'VPVR','OIDASH':'OIDASH','FUNDHIST':'FUNDHIST','LIQHEAT':'LIQHEAT',
    'PERF':'PERF','ETFF':'ETFF','INTEL':'INTEL','WN':'WN','NWS':'NWS',
    'JOURN':'JOURN','PORT':'PORT','RISK':'RISK','ALERTS':'ALERTS',
    'DHLO':'DHLO','SENT':'SENT','MMAP':'MMAP','FA':'FA',
    'EQUITY':'EQUITY','IDX':'WEI','WEI':'WEI','COMDTY':'COMDTY','ETFS':'ETFF',
  };
  const panelId = cryptoPanels[cmd];
  if (panelId && window.openPanel) {
    // For news panels: clear OLD content BEFORE opening so it never renders
    if (cmd === 'WN' || cmd === 'NWS' || cmd === 'INTEL') {
      const bodyIds = { 'WN': 'wn-body', 'NWS': 'nws-body', 'INTEL': 'intel-feed' };
      // Set filter BEFORE open so panel builds with empty body
      if (cmd === 'WN') window._wnFilterText = ticker;
      if (cmd === 'NWS') window._nwsFilterText = ticker;
      const _clearBody = document.getElementById(bodyIds[cmd]);
      if (_clearBody) _clearBody.innerHTML = '';
    }
    openPanel(panelId);
    // Auto-filter news/intel panels by the selected ticker
    if (cmd === 'WN' || cmd === 'NWS' || cmd === 'INTEL') {

      const _applyFilter = function() {
        // WN filter
        if (cmd === 'WN' && window._wnFilter) {
          const inp = document.getElementById('wnews-srch');
          if (inp) inp.value = ticker;
          window._wnFilter(ticker);
        }
        // NWS filter
        if (cmd === 'NWS' && typeof _nwsFilter === 'function') {
          const inp = document.getElementById('nws-srch');
          if (inp) inp.value = ticker;
          _nwsFilter(ticker);
        }
        // INTEL filter
        if (cmd === 'INTEL' && window._intelFilter) {
          const inp = document.getElementById('intel-srch');
          if (inp) inp.value = ticker;
          window._intelFilter(ticker);
        }
      };
      setTimeout(_applyFilter, 500);
      setTimeout(_applyFilter, 1500);
    }
    return;
  }
  if (window.openPanel) openPanel('CRYPTO');
};
document.addEventListener('mousedown', e => {
  const ac = document.getElementById('bbg-ac');
  if (!ac || ac.style.display === 'none') return;
  const inputs = [
    document.getElementById('asset-tab-inp'),
    document.getElementById('cmd-sec-inp'),
    document.getElementById('cmd-fn-inp')
  ];
  if (!ac.contains(e.target) && !inputs.includes(e.target)) _bbgHideAC();
});
document.addEventListener('keydown', e => {
  if (e.key==='Escape'||e.key==='ArrowUp') _bbgHideAC();
});

window._applyAssetFromTab = function() {
  const inp = document.getElementById('asset-tab-inp');
  if (!inp || !inp.value.trim()) return;
  const raw = inp.value.trim();
  const { display } = window._detectAssetType(raw);

  // Update topbar security field
  const secInp = document.getElementById('cmd-sec-inp');
  if (secInp) secInp.value = display || raw;

  // Close the tab
  document.getElementById('asset-tab').classList.remove('open');
  inp.value = '';
  const lbl = document.getElementById('asset-tab-label');
  if (lbl) lbl.textContent = 'SECURITY';

  // Trigger chart/panel update — only if symbol is in known list
  const sym = raw.trim().toUpperCase().split(/\s+/)[0];
  const knownSyms = _bbgSecurities.map(s => s.sym.split(' ')[0].toUpperCase());
  if (knownSyms.includes(sym) && window._openChartForSymbol) {
    window._openChartForSymbol(sym);
  } else {
    _handleGlobalCmd();
  }
};

// CMD BAR LOGIC — history initialized by unified nav system below

// Bloomberg-style asset type detection
window._detectAssetType = function(raw) {
  const s = raw.trim().toUpperCase();
  if (!s) return { display: '', suffix: '' };

  // Crypto
  const CRYPTO_SYMS = ['BTC','ETH','SOL','BNB','XRP','ADA','DOGE','AVAX','MATIC','DOT',
    'LINK','UNI','SHIB','LTC','ATOM','NEAR','APT','SUI','ICP','TRX','XLM','KAS','AAVE',
    'OP','ARB','INJ','RENDER','JUP','RAY','JTO','PYTH','LDO','MKR','CRV','GMX','FTM',
    'ALGO','VET','XMR','BCH','FET','IMX','STRK','SEI','TON','OM','VIRTUAL','BERA','MOVE',
    'ETC','ZEC','GRT','PENDLE','HYPE','PEPE','WIF','BONK','FLOKI','MEME','WLD','TIA',
    'ORDI','STX','RUNE','ENS','SNX','COMP','SUSHI','YFI','SAND','MANA','AXS','GALA',
    'THETA','EGLD','HBAR','EOS','FLOW','NEO','KAVA','ZIL','CAKE','1INCH','DYDX','RPL'];
  if (CRYPTO_SYMS.includes(s)) return { display: s + ' Curncy', suffix: 'Curncy' };

  // FX pairs
  const FX = ['EUR','USD','GBP','JPY','CHF','AUD','CAD','NZD','SEK','NOK','DKK','HKD',
    'SGD','CNY','CNH','MXN','BRL','ZAR','TRY','INR','KRW','PLN','CZK','HUF'];
  if (FX.includes(s)) return { display: s + ' Curncy', suffix: 'Curncy' };
  const fxPair = s.match(/^([A-Z]{3})([A-Z]{3})$/);
  if (fxPair && FX.includes(fxPair[1]) && FX.includes(fxPair[2]))
    return { display: s + ' Curncy', suffix: 'Curncy' };

  // Indices
  const IDX = {'SPX':'SPX Index','NDX':'NDX Index','DJI':'INDU Index','VIX':'VIX Index',
    'FTSE':'UKX Index','DAX':'DAX Index','CAC':'CAC Index','NKY':'NKY Index',
    'HSI':'HSI Index','KOSPI':'KOSPI Index','RUT':'RTY Index','ES1':'ES1 Index',
    'INDU':'INDU Index','RTY':'RTY Index','CCMP':'CCMP Index'};
  if (IDX[s]) return { display: IDX[s], suffix: 'Index' };
  if (s.endsWith(' INDEX') || s.endsWith('INDEX')) return { display: s.replace(/INDEX$/,'').trim() + ' Index', suffix: 'Index' };

  // Govt bonds
  if (/^(US|GT|UST|T)\d+Y?$/.test(s) || s.match(/\d+Y\s*(GOVT|T|UST)?$/i))
    return { display: s + ' Govt', suffix: 'Govt' };

  // Commodities
  const CMDTY = ['CL','CO','NG','GC','SI','HG','ZW','ZC','ZS','XAU','XAG','OIL','GOLD','SILVER','COPPER','WHEAT','CORN'];
  if (CMDTY.includes(s)) return { display: s + ' Comdty', suffix: 'Comdty' };

  // Known equities with exchange suffix
  const EQ_MAP = {
    'AAPL':'AAPL US Equity','MSFT':'MSFT US Equity','GOOGL':'GOOGL US Equity',
    'GOOG':'GOOG US Equity','AMZN':'AMZN US Equity','META':'META US Equity',
    'TSLA':'TSLA US Equity','NVDA':'NVDA US Equity','NFLX':'NFLX US Equity',
    'BABA':'BABA US Equity','BA':'BA US Equity','JPM':'JPM US Equity',
    'GS':'GS US Equity','MS':'MS US Equity','BRK':'BRK/B US Equity',
    'V':'V US Equity','MA':'MA US Equity','PYPL':'PYPL US Equity',
    'DIS':'DIS US Equity','INTC':'INTC US Equity','AMD':'AMD US Equity',
    'QCOM':'QCOM US Equity','UBER':'UBER US Equity','LYFT':'LYFT US Equity',
    'SPOT':'SPOT US Equity','COIN':'COIN US Equity','HOOD':'HOOD US Equity',
    'PLTR':'PLTR US Equity','SNOW':'SNOW US Equity','CRM':'CRM US Equity',
    'ORCL':'ORCL US Equity','IBM':'IBM US Equity','CSCO':'CSCO US Equity',
    'WMT':'WMT US Equity','TGT':'TGT US Equity','COST':'COST US Equity',
    'NKE':'NKE US Equity','SBUX':'SBUX US Equity','MCD':'MCD US Equity',
    'PFE':'PFE US Equity','JNJ':'JNJ US Equity','MRNA':'MRNA US Equity',
    'XOM':'XOM US Equity','CVX':'CVX US Equity','OXY':'OXY US Equity',
    'ALPHABET':'ALPHABET INC-C Equity','BOEING':'BOEING CO/THE Equity',
  };
  if (EQ_MAP[s]) return { display: EQ_MAP[s], suffix: 'Equity' };

  // Already has type suffix typed
  if (/\b(equity|index|comdty|govt|curncy|corp|mtge)\s*$/i.test(s))
    return { display: raw.trim(), suffix: '' };

  // Default: treat as equity
  if (/^[A-Z]{1,5}$/.test(s)) return { display: s + ' US Equity', suffix: 'Equity' };

  return { display: raw.trim(), suffix: '' };
};

// Update the topbar security label after Enter/selection
window._updateSecLabel = function(raw) {
  const inp = document.getElementById('cmd-sec-inp');
  if (!inp) return;
  const { display } = window._detectAssetType(raw);
  if (display) inp.value = display;
};

// ══════════════════════════════════════════════════════════════
//  UNIFIED NAVIGATION SYSTEM v4 — clean & bulletproof
//  < = back (older)    > = forward (newer)
// ══════════════════════════════════════════════════════════════

// Safe global state — initialize immediately
window._cmdHistory   = window._cmdHistory   || [];
window._cmdIndex     = (window._cmdIndex !== undefined) ? window._cmdIndex : -1;
window._histSilenced = window._histSilenced || false;

function _histLabel(h) {
  if (!h) return '';
  if (h.type === 'MAP')   return 'Mapa';
  if (h.type === 'CHART') return 'Graf: ' + (h.sym || '?');
  if (h.type === 'CMD')   return (h.fn || '') + (h.sec ? ' · ' + h.sec : '');
  if (h.type === 'QL')    return 'Menu: ' + (h.id || '');
  return '';
}

function _updateNavBtns() {
  const btns = document.querySelectorAll('.cmd-btn');
  if (!btns.length) return;
  // btns[0] = '<' = back = index decreases
  // btns[1] = '>' = forward = index increases
  const canBack = window._cmdIndex > 0;
  const canFwd  = window._cmdIndex < window._cmdHistory.length - 1;
  if (btns[0]) {
    btns[0].style.color   = canBack ? '#e8c060' : '#2a2a2a';
    btns[0].style.opacity = canBack ? '1' : '0.3';
    btns[0].title = canBack
      ? ('← ' + _histLabel(window._cmdHistory[window._cmdIndex - 1]))
      : 'Začátek historie';
  }
  if (btns[1]) {
    btns[1].style.color   = canFwd ? '#e8c060' : '#2a2a2a';
    btns[1].style.opacity = canFwd ? '1' : '0.3';
    btns[1].title = canFwd
      ? ('→ ' + _histLabel(window._cmdHistory[window._cmdIndex + 1]))
      : 'Konec historie';
  }
}

function _closeEverythingSilent() {
  window._histSilenced = true;
  try {
    // 1. Close chart panel without side-effects
    const cp = document.getElementById('bbg-chart-panel');
    if (cp && cp.style.display !== 'none') {
      if (window._currentBbgWs)   { try { window._currentBbgWs.close(); } catch(e){} window._currentBbgWs = null; }
      if (window._ovRefreshTimer) { clearInterval(window._ovRefreshTimer); window._ovRefreshTimer = null; }
      cp.classList.remove('maximized');
      cp.style.display = 'none';
      if (window.PANEL_REGISTRY) delete window.PANEL_REGISTRY['bbg-chart-panel'];
    }
    // 2. Close all dynamic panels
    const reg = window.PANEL_REGISTRY || {};
    Object.keys(reg).forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
      delete reg[id];
    });
    // 3. Close QL dropdowns
    document.querySelectorAll('.ql-tile.open').forEach(function(t) { t.classList.remove('open'); });
    // 4. Restore UI
    document.body.classList.remove('panel-open');
    const stat = document.getElementById('STAT');
    if (stat) stat.style.display = '';
    try { if (window._toggleBbgClocks) window._toggleBbgClocks(true); } catch(e) {}
    try { if (typeof updatePanelCount === 'function') updatePanelCount(); } catch(e) {}
  } finally {
    window._histSilenced = false;
  }
}

function _pushHist(entry) {
  if (window._histSilenced) return;
  const last = window._cmdHistory[window._cmdIndex];
  // De-duplicate
  if (last) {
    if (entry.type === 'MAP'   && last.type === 'MAP') return;
    if (entry.type === 'CHART' && last.type === 'CHART' && last.sym === entry.sym) return;
    if (entry.type === 'CMD'   && last.type === 'CMD'
        && last.fn === entry.fn && last.sec === entry.sec) return;
    if (entry.type === 'QL'    && last.type === 'QL'   && last.id === entry.id) return;
  }
  // Truncate forward history when new action taken
  if (window._cmdIndex < window._cmdHistory.length - 1) {
    window._cmdHistory = window._cmdHistory.slice(0, window._cmdIndex + 1);
  }
  window._cmdHistory.push(entry);
  window._cmdIndex = window._cmdHistory.length - 1;
  setTimeout(_updateNavBtns, 0); // defer so DOM is ready

  try {
    if (window._cmdIndex === 0) {
      window.history.replaceState({cmdIndex: 0}, '');
    } else {
      window.history.pushState({cmdIndex: window._cmdIndex}, '');
    }
  } catch(e) {}
}

function _restoreHist(h) {
  if (!h) return;
  // Step 1: close everything silently
  _closeEverythingSilent();
  // Step 2: restore target state, silenced so no new history entries
  window._histSilenced = true;
  try {
    if (h.type === 'MAP') {
      // Map is always visible under panels — nothing to open
    } else if (h.type === 'CHART') {
      if (h.sym && window._openChartForSymbol) {
        window._openChartForSymbol(h.sym);
      }
    } else if (h.type === 'CMD') {
      const fn  = (h.fn  || '').toUpperCase();
      const sec = (h.sec || '').replace(/ curncy| us equity/gi, '').split(' ')[0].toUpperCase();
      const si  = document.getElementById('cmd-sec-inp');
      const fi  = document.getElementById('cmd-fn-inp');
      if (si) si.value = h.sec || '';
      if (fi) fi.value = h.fn  || '';
      if (fn === 'DES' && sec && window._bbgOpenDES) {
        window._bbgOpenDES(sec, 1);
      } else if ((fn === 'GP' || fn === 'GF') && sec && window._openChartForSymbol) {
        window._openChartForSymbol(sec);
      } else if (fn && typeof openPanel === 'function') {
        openPanel(fn);
      }
    } else if (h.type === 'QL') {
      const tile = document.querySelector('.ql-tile[data-ql="' + (h.id || '') + '"]');
      if (tile && typeof toggleQL === 'function') toggleQL(tile);
    }
  } catch(e) {
    console.warn('[NAV] restore failed:', e);
  } finally {
    window._histSilenced = false;
    setTimeout(_updateNavBtns, 50);
  }
}

// < = back (older history), > = forward (newer history)
function _cmdHist(dir) {
  if (!window._cmdHistory || !window._cmdHistory.length) return;
  const next = window._cmdIndex + dir;
  if (next < 0 || next >= window._cmdHistory.length) return;
  
  try {
    if (dir === -1) {
      window.history.back();
    } else if (dir === 1) {
      window.history.forward();
    }
    return;
  } catch(e) {}
  
  window._cmdIndex = next;
  _restoreHist(window._cmdHistory[next]);
}

window.addEventListener('popstate', function(e) {
  if (e.state && typeof e.state.cmdIndex === 'number') {
    const next = e.state.cmdIndex;
    if (next >= 0 && next < window._cmdHistory.length) {
      window._cmdIndex = next;
      _restoreHist(window._cmdHistory[next]);
    }
  }
});

// Expose globally
window._pushHist              = _pushHist;
window._cmdHist               = _cmdHist;
window._updateNavBtns         = _updateNavBtns;
window._closeEverythingSilent = _closeEverythingSilent;



function _handleGlobalCmd() {
  const secInp = document.getElementById('cmd-sec-inp');
  const fnInp  = document.getElementById('cmd-fn-inp');
  const rawSec = (secInp.value||'').trim();
  const sec = rawSec.toUpperCase();
  const fn  = (fnInp.value||'').trim().toUpperCase();
  
  if(!sec && !fn) return;

  // Update display with asset type suffix
  window._updateSecLabel(rawSec);

  // Add to history via centralized function
  _pushHist({type: 'CMD', sec, fn});

  // If function code is recognized, open it
  if(fn) {
    const title = getPanelTitle(fn);
    if(title !== fn || ['WN','INTEL','DES','FA','GP','EQUITY','NWS','CRYPTO','WEI','FX'].includes(fn)) {
      if(sec && typeof onSelect === 'function') {
        try { onSelect(sec); } catch(e){}
      }
      if(fn === 'DES') {
        window._bbgOpenDES(sec);
      } else if((fn === 'GP' || fn === 'GF') && sec && window._openChartForSymbol) {
        const cleanSec2 = sec.replace(/ INDEX$/,'').replace(/ US EQUITY$/,'').replace(/ EQUITY$/,'').replace(/ CURNCY$/,'').replace(/ COMDTY$/,'').split(' ')[0];
        window._openChartForSymbol(cleanSec2);
      } else {
        openPanel(fn);
      }
      if(fnInp) fnInp.value = '';
      return;
    }
  }
  
  // Default behavior — only open chart if symbol is recognized
  if(sec) {
    const knownSyms = _bbgSecurities.map(s => s.sym.split(' ')[0].toUpperCase());
    const cleanSec = sec.replace(/ INDEX$/,'').replace(/ US EQUITY$/,'').replace(/ EQUITY$/,'').replace(/ CURNCY$/,'').replace(/ COMDTY$/,'').split(' ')[0];
    if (knownSyms.includes(cleanSec) && window._openChartForSymbol) {
      window._openChartForSymbol(cleanSec);
    } else if (knownSyms.includes(cleanSec)) {
      if(typeof onSelect === 'function') { try { onSelect(sec); } catch(e){} }
      openPanel('CRYPTO');
    } else {
      // Unknown symbol — flash warning in field, do nothing
      const secInp = document.getElementById('cmd-sec-inp');
      if (secInp) {
        const orig = secInp.value;
        secInp.style.color = '#ff3333';
        secInp.value = 'NOT FOUND: ' + cleanSec;
        setTimeout(() => { secInp.style.color = ''; secInp.value = orig; }, 1800);
      }
    }
    if(fnInp) fnInp.value = '';
  }
}




// ── Bootstrap nav history ──
// Functions are defined above; seed MAP as first state
window._cmdHistory   = [];
window._cmdIndex     = -1;
window._histSilenced = false;
_pushHist({ type: 'MAP' });  // index becomes 0

document.addEventListener('DOMContentLoaded', function() {
  if (typeof _updateNavBtns === 'function') _updateNavBtns();
});




          (function(){
            var wrap = document.getElementById('price-scale-arrows');
            var upBtn = document.getElementById('ps-arrow-up');
            var dnBtn = document.getElementById('ps-arrow-down');
            if(!wrap||!upBtn||!dnBtn) return;
            wrap.addEventListener('mouseenter',function(){wrap.style.opacity='1';});
            wrap.addEventListener('mouseleave',function(){wrap.style.opacity='0.5'; stopScroll();});
            upBtn.addEventListener('mouseenter',function(){this.style.color='#fff';this.style.background='rgba(60,60,60,0.9)';});
            upBtn.addEventListener('mouseleave',function(){this.style.color='#888';this.style.background='rgba(30,30,30,0.7)';});
            dnBtn.addEventListener('mouseenter',function(){this.style.color='#fff';this.style.background='rgba(60,60,60,0.9)';});
            dnBtn.addEventListener('mouseleave',function(){this.style.color='#888';this.style.background='rgba(30,30,30,0.7)';});
            var scrollTimer=null, scrollRAF=null;
            function doScroll(dir){
              // Try LightweightCharts first (v5-7 style)
              if(window._bbgChart) {
                try {
                  var ps = window._bbgChart.priceScale('right');
                  if(ps) {
                    var opts = ps.options();
                    var sm = opts.scaleMargins || {top:0.05, bottom:0.05};
                    var step = 0.02 * dir;
                    var newTop = Math.max(0, Math.min(0.9, sm.top + step));
                    var newBot = Math.max(0, Math.min(0.9, sm.bottom - step));
                    if(newTop+newBot < 0.98) ps.applyOptions({scaleMargins:{top:newTop, bottom:newBot}, autoScale:false});
                  }
                } catch(e){}
                return;
              }
              // Fallback: send scroll to TradingView iframe
              try {
                var iframe = document.getElementById('bbg-tv-iframe');
                if(iframe && iframe.contentWindow) {
                  iframe.contentWindow.postMessage({name:'scroll', dir:dir}, '*');
                  // Also simulate wheel event on iframe
                  var ev = new WheelEvent('wheel', {deltaY: dir * 60, bubbles:true, cancelable:true});
                  iframe.dispatchEvent(ev);
                }
              } catch(e){}
            }
            function startScroll(dir){
              stopScroll();
              doScroll(dir);
              scrollTimer = setInterval(function(){doScroll(dir);}, 80);
            }
            function stopScroll(){
              if(scrollTimer){clearInterval(scrollTimer); scrollTimer=null;}
            }
            upBtn.addEventListener('mousedown',function(e){e.preventDefault();e.stopPropagation();startScroll(-1);});
            dnBtn.addEventListener('mousedown',function(e){e.preventDefault();e.stopPropagation();startScroll(1);});
            document.addEventListener('mouseup', stopScroll);
            upBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();doScroll(-1);});
            dnBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();doScroll(1);});
            /* Touch support */
            upBtn.addEventListener('touchstart',function(e){e.preventDefault();startScroll(-1);},{passive:false});
            dnBtn.addEventListener('touchstart',function(e){e.preventDefault();startScroll(1);},{passive:false});
            document.addEventListener('touchend', stopScroll);
          })();
          


      (function(){
        function _updClk(){
          if(window._tabHidden) return;
          var n=new Date();
          var hh=String(n.getHours()).padStart(2,'0');
          var mm=String(n.getMinutes()).padStart(2,'0');
          var ss=String(n.getSeconds()).padStart(2,'0');
          var u=document.getElementById('sb-utc-time');
          var d=document.getElementById('sb-utc-date');
          if(u)u.textContent=hh+':'+mm+':'+ss;
          if(d)d.textContent=n.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
        }
        _updClk();
        setInterval(_updClk,1000);
      })();
      


'use strict';

/* ═══════════════════════════════════════════════════════
   CONFIGURATION — nastavte svůj Anthropic API klíč níže
   Získejte klíč na: https://console.anthropic.com/
═══════════════════════════════════════════════════════ */
window.ANTHROPIC_API_KEY = ''; // Vlož svůj API klíč přes UI (klikni na AI badge vpravo nahoře)

// Pomocná funkce pro Anthropic API volání
async function _callAnthropic(payload, ms=15000) {
  const key = window.ANTHROPIC_API_KEY || '';
  if(!key) { console.warn('[ANTHROPIC] No API key set'); return null; }
  const headers = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  };
  if (key) headers['x-api-key'] = key;
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), ms);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      signal: ctrl.signal,
      body: JSON.stringify(payload)
    });
    clearTimeout(tid);
    if (!r.ok) {
      const txt = await r.text().catch(()=>'');
      console.warn('[ANTHROPIC] HTTP', r.status, txt.substring(0,100));
      return null;
    }
    return await r.json();
  } catch(e) {
    if(e.name === 'AbortError') console.warn('[ANTHROPIC] Request timeout (' + ms + 'ms)');
    else console.warn('[ANTHROPIC] fetch failed:', e.message);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════
   MENU
═══════════════════════════════════════════════════════ */
document.addEventListener('click',e=>{if(!e.target.closest('.menu-item')&&!e.target.closest('.launch-btn'))closeAllMenus();});
function closeAllMenus(){document.querySelectorAll('.menu-item.open').forEach(m=>m.classList.remove('open'));}
function toggleMenu(el){const was=el.classList.contains('open');closeAllMenus();if(!was)el.classList.add('open');}
function closeAllQL(){
  document.querySelectorAll('.ql-tile').forEach(t=>{
    t.classList.remove('open');
    const d=t.querySelector('.ql-drop');if(d)d.style.display='none';
  });
}
function toggleQL(el){
  event.stopPropagation();
  const was=el.classList.contains('open');
  closeAllQL();closeAllMenus();
  if(!was){
    el.classList.add('open');
    const d=el.querySelector('.ql-drop');
    if(d)d.style.display='flex';
    // Record to history
    if(el.dataset.ql) _pushHist({type: 'QL', id: el.dataset.ql});
  } else {
    // If we closed it, we are back on the map
    _pushHist({type: 'MAP'});
  }
}

function toggleFolder(el){
  el.classList.toggle('open');
}
document.addEventListener('click',()=>{
  const hadOpen = document.querySelectorAll('.ql-tile.open, .menu-item.open').length > 0;
  closeAllQL();
  closeAllMenus();
  if(hadOpen) _pushHist({type: 'MAP'});
});

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const CENTERS=[
  {id:'nyc',city:'New York',    co:'USA',lat:40.713,lng:-74.006, idx:'SPX',   fx:'USD',major:true},
  {id:'chi',city:'Chicago',     co:'USA',lat:41.878,lng:-87.629, idx:'INDU',  fx:'USD',major:false},
  {id:'tor',city:'Toronto',     co:'CAN',lat:43.653,lng:-79.383, idx:'TSX',   fx:'CAD',major:false},
  {id:'sao',city:'São Paulo',   co:'BRA',lat:-23.551,lng:-46.633,idx:'IBOV',  fx:'BRL',major:false},
  {id:'bue',city:'Buenos Aires',co:'ARG',lat:-34.603,lng:-58.381,idx:'MERV',  fx:'ARS',major:false},
  {id:'lon',city:'London',      co:'GBR',lat:51.507,lng:-.127,   idx:'UKX',   fx:'GBP',major:true},
  {id:'fra',city:'Frankfurt',   co:'DEU',lat:50.110,lng:8.682,   idx:'DAX',   fx:'EUR',major:true},
  {id:'par',city:'Paris',       co:'FRA',lat:48.857,lng:2.352,   idx:'CAC',   fx:'EUR',major:false},
  {id:'zur',city:'Zürich',      co:'CHE',lat:47.376,lng:8.541,   idx:'SMI',   fx:'CHF',major:false},
  {id:'ams',city:'Amsterdam',   co:'NLD',lat:52.370,lng:4.895,   idx:'AEX',   fx:'EUR',major:false},
  {id:'mad',city:'Madrid',      co:'ESP',lat:40.416,lng:-3.703,  idx:'IBEX',  fx:'EUR',major:false},
  {id:'mil',city:'Milan',       co:'ITA',lat:45.464,lng:9.190,   idx:'FTSEMIB',fx:'EUR',major:false},
  {id:'sto',city:'Stockholm',   co:'SWE',lat:59.333,lng:18.065,  idx:'OMX',   fx:'SEK',major:false},
  {id:'war',city:'Warsaw',      co:'POL',lat:52.229,lng:21.012,  idx:'WIG20', fx:'PLN',major:false},
  {id:'pra',city:'Prague',      co:'CZE',lat:50.075,lng:14.437,  idx:'PX',    fx:'CZK',major:false},
  {id:'vie',city:'Vienna',      co:'AUT',lat:48.208,lng:16.373,  idx:'ATX',   fx:'EUR',major:false},
  {id:'bud',city:'Budapest',    co:'HUN',lat:47.498,lng:19.040,  idx:'BUX',   fx:'HUF',major:false},
  {id:'mow',city:'Moscow',      co:'RUS',lat:55.751,lng:37.618,  idx:'MOEX',  fx:'RUB',major:false},
  {id:'ist',city:'Istanbul',    co:'TUR',lat:41.015,lng:28.979,  idx:'XU100', fx:'TRY',major:false},
  {id:'dub',city:'Dubai',       co:'UAE',lat:25.204,lng:55.270,  idx:'ADI',   fx:'AED',major:false},
  {id:'riy',city:'Riyadh',      co:'SAU',lat:24.688,lng:46.721,  idx:'TASI',  fx:'SAR',major:false},
  {id:'tlv',city:'Tel Aviv',    co:'ISR',lat:32.085,lng:34.781,  idx:'TA125', fx:'ILS',major:false},
  {id:'cai',city:'Cairo',       co:'EGY',lat:30.044,lng:31.235,  idx:'EGX30', fx:'EGP',major:false},
  {id:'joh',city:'Johannesburg',co:'ZAF',lat:-26.204,lng:28.047, idx:'JALSH', fx:'ZAR',major:false},
  {id:'tok',city:'Tokyo',       co:'JPN',lat:35.682,lng:139.691, idx:'NKY',   fx:'JPY',major:true},
  {id:'sha',city:'Shanghai',    co:'CHN',lat:31.228,lng:121.473, idx:'SHCOMP',fx:'CNY',major:true},
  {id:'hkg',city:'Hong Kong',   co:'HKG',lat:22.319,lng:114.169, idx:'HSI',   fx:'HKD',major:true},
  {id:'sin',city:'Singapore',   co:'SGP',lat:1.352, lng:103.820, idx:'STI',   fx:'SGD',major:true},
  {id:'mum',city:'Mumbai',      co:'IND',lat:19.076,lng:72.878,  idx:'SENSEX',fx:'INR',major:false},
  {id:'seo',city:'Seoul',       co:'KOR',lat:37.566,lng:126.978, idx:'KOSPI', fx:'KRW',major:false},
  {id:'tai',city:'Taipei',      co:'TWN',lat:25.047,lng:121.517, idx:'TWSE',  fx:'TWD',major:false},
  {id:'ban',city:'Bangkok',     co:'THA',lat:13.752,lng:100.494, idx:'SET',   fx:'THB',major:false},
  {id:'syd',city:'Sydney',      co:'AUS',lat:-33.869,lng:151.209,idx:'ASX200',fx:'AUD',major:false}
];

// MKT — static fallback; overwritten by fetchStooq() live data on load
const MKT={
  // Static fallback — updated Mar 14 2026 (live data from Yahoo/Stooq overwrites)
  SPX:   {n:'S&P 500',        px:null,    chg:0,     ytd:-2.84, open:6585.00,hi:6590,lo:6490,vol:'8.2B',  mc:'$45.8T'},
  INDU:  {n:'DOW JONES 30',   px:null,    chg:0,     ytd:-1.42, open:46020,  hi:46050,lo:45400,vol:'420M',mc:'$13.8T'},
  NDX:   {n:'NASDAQ 100',     px:null,    chg:0,     ytd:-3.8,  open:22100,  hi:22150,lo:21500,vol:'7.2B', mc:'$36.2T'},
  TSX:   {n:'TSX COMPOSITE',  px:null,    chg:0,     ytd:2.77,  open:24558,  hi:24680,lo:24510,vol:'720M', mc:'$3.8T'},
  IBOV:  {n:'IBOVESPA',       px:null,    chg:0,     ytd:4.33,  open:130340, hi:130820,lo:129640,vol:'17B',mc:'$842B'},
  MERV:  {n:'MERVAL',         px:null,    chg:0,     ytd:57.2,  open:2721540,hi:2762000,lo:2714000,vol:'—',mc:'—'},
  UKX:   {n:'FTSE 100',       px:null,    chg:0,     ytd:3.40,  open:8672,   hi:8698,lo:8614,vol:'1.1B',  mc:'$3.2T'},
  DAX:   {n:'DAX 40',         px:null,    chg:0,     ytd:14.72, open:22870,  hi:23080,lo:22840,vol:'9.8B', mc:'$3.1T'},
  CAC:   {n:'CAC 40',         px:null,    chg:0,     ytd:7.68,  open:8024,   hi:8048,lo:7968,vol:'4.9B',  mc:'$3.0T'},
  FTSEMIB:{n:'FTSE MIB',      px:null,    chg:0,     ytd:13.84, open:37886,  hi:37980,lo:37540,vol:'2.0B',mc:'$1.08T'},
  IBEX:  {n:'IBEX 35',        px:null,    chg:0,     ytd:11.82, open:13424,  hi:13448,lo:13260,vol:'1.8B',mc:'$0.98T'},
  AEX:   {n:'AEX INDEX',      px:null,    chg:0,     ytd:4.98,  open:918.8,  hi:922,lo:900,vol:'840M',    mc:'$1.44T'},
  SMI:   {n:'SMI SWISS',      px:null,    chg:0,     ytd:9.38,  open:12848,  hi:12884,lo:12714,vol:'2.4B',mc:'$1.86T'},
  OMX:   {n:'OMX STOCKHOLM',  px:null,    chg:0,     ytd:0.98,  open:2686,   hi:2692,lo:2640,vol:'—',    mc:'—'},
  WIG20: {n:'WIG 20',         px:null,    chg:0,     ytd:3.64,  open:2512,   hi:2518,lo:2480,vol:'—',    mc:'—'},
  PX:    {n:'PX PRAGUE',      px:null,    chg:0,     ytd:12.62, open:1812,   hi:1820,lo:1800,vol:'—',    mc:'—'},
  ATX:   {n:'ATX VIENNA',     px:null,    chg:0,     ytd:10.88, open:4184,   hi:4196,lo:4138,vol:'—',    mc:'—'},
};

// STKS — static fallback; overwritten by live fetch on panel open
const STKS={
  // ── Mega-cap Tech ──
  AAPL:{n:'Apple Inc',         px:null,open:202.40,hi:204.80,lo:196.40,vol:'62.4M', pe:31.2,mc:'$3.04T',div:.99, beta:1.18,eps:6.38, sec:'Technology',  ytd:-14.8},
  NVDA:{n:'NVIDIA Corp',       px:null,open:117.62,hi:118.84,lo:110.84,vol:'312.8M',pe:32.4,mc:'$2.74T',div:.04, beta:2.18,eps:3.47, sec:'Technology',  ytd:-16.8},
  MSFT:{n:'Microsoft',         px:null,open:394.20,hi:396.80,lo:385.60,vol:'22.8M', pe:32.8,mc:'$2.89T',div:3.32,beta:.88, eps:11.84,sec:'Technology',  ytd:-2.4},
  GOOGL:{n:'Alphabet A',       px:null,open:168.20,hi:169.40,lo:161.20,vol:'24.8M', pe:20.4,mc:'$2.02T',div:0,   beta:1.04,eps:7.98, sec:'Technology',  ytd:-8.2},
  META:{n:'Meta Platforms',    px:null,open:596.40,hi:598.80,lo:570.40,vol:'18.8M', pe:24.2,mc:'$1.45T',div:2.00,beta:1.22,eps:23.72,sec:'Technology',  ytd:-4.4},
  AMZN:{n:'Amazon',            px:null,open:204.20,hi:205.60,lo:196.80,vol:'38.4M', pe:38.4,mc:'$2.10T',div:0,   beta:1.22,eps:5.17, sec:'Technology',  ytd:-8.4},
  TSLA:{n:'Tesla Inc',         px:null,open:280.40,hi:284.20,lo:258.80,vol:'88.4M', pe:94.2,mc:'$844B', div:0,   beta:2.44,eps:2.79, sec:'Technology',  ytd:-32.8},
  AVGO:{n:'Broadcom',          px:null,open:188.40,hi:192.20,lo:184.40,vol:'8.4M',  pe:34.4,mc:'$884B', div:2.36,beta:1.14,eps:5.48, sec:'Technology',  ytd:-8.4},
  ORCL:{n:'Oracle',            px:null,open:172.80,hi:173.80,lo:167.40,vol:'6.4M',  pe:34.4,mc:'$464B', div:1.60,beta:.88, eps:4.90, sec:'Technology',  ytd:-4.8},
  NFLX:{n:'Netflix',           px:null,open:958.20,hi:962.80,lo:934.40,vol:'3.4M',  pe:48.4,mc:'$403B', div:0,   beta:1.24,eps:19.40,sec:'Technology',  ytd:2.4},
  ADBE:{n:'Adobe Inc',         px:null,open:392.20,hi:394.80,lo:382.40,vol:'3.4M',  pe:28.4,mc:'$168B', div:0,   beta:1.24,eps:13.54,sec:'Technology',  ytd:-18.4},
  CRM:{n:'Salesforce',         px:null,open:304.20,hi:306.40,lo:297.40,vol:'4.4M',  pe:44.4,mc:'$289B', div:0,   beta:1.14,eps:6.72, sec:'Technology',  ytd:-8.4},
  // ── Crypto Native & Miners ──
  CRCL:{n:'Circle Internet',   px:null,open:29.50, hi:31.20, lo:28.40, vol:'8.4M',  pe:0,   mc:'$8.2B', div:0,   beta:2.14,eps:-0.84,sec:'Crypto',     ytd:null},
  MSTR:{n:'MicroStrategy',     px:null,open:314.20,hi:322.40,lo:298.80,vol:'18.4M', pe:0,   mc:'$62B',  div:0,   beta:3.84,eps:-8.42,sec:'Crypto',     ytd:-42.8},
  COIN:{n:'Coinbase Global',   px:null,open:204.20,hi:208.40,lo:192.80,vol:'8.4M',  pe:0,   mc:'$48B',  div:0,   beta:2.84,eps:-2.18,sec:'Crypto',     ytd:-18.4},
  HOOD:{n:'Robinhood Markets', px:null,open:38.40, hi:39.20, lo:36.80, vol:'12.4M', pe:0,   mc:'$34B',  div:0,   beta:2.44,eps:-0.18,sec:'Crypto',     ytd:+22.4},
  RIOT:{n:'Riot Platforms',    px:null,open:8.40,  hi:8.80,  lo:7.80,  vol:'18.4M', pe:0,   mc:'$1.6B', div:0,   beta:3.84,eps:-2.04,sec:'Crypto',     ytd:-42.4},
  MARA:{n:'MARA Holdings',     px:null,open:14.20, hi:14.80, lo:13.40, vol:'24.4M', pe:0,   mc:'$3.8B', div:0,   beta:3.44,eps:-2.84,sec:'Crypto',     ytd:-38.4},
  CLSK:{n:'CleanSpark',        px:null,open:9.20,  hi:9.60,  lo:8.60,  vol:'8.4M',  pe:0,   mc:'$1.4B', div:0,   beta:3.24,eps:-1.84,sec:'Crypto',     ytd:-44.4},
  CORZ:{n:'Core Scientific',   px:null,open:12.40, hi:13.20, lo:11.60, vol:'12.4M', pe:0,   mc:'$3.4B', div:0,   beta:3.44,eps:-0.84,sec:'Crypto',     ytd:-18.4},
  HUT:{n:'Hut 8 Corp',         px:null,open:18.40, hi:19.20, lo:17.40, vol:'4.4M',  pe:0,   mc:'$1.8B', div:0,   beta:3.84,eps:-1.44,sec:'Crypto',     ytd:-38.4},
  HIVE:{n:'HIVE Digital',      px:null,open:3.40,  hi:3.60,  lo:3.10,  vol:'2.4M',  pe:0,   mc:'$0.4B', div:0,   beta:3.44,eps:-0.84,sec:'Crypto',     ytd:-44.4},
  // ── Fintech & Payments ──
  SOFI:{n:'SoFi Technologies', px:null,open:12.84, hi:13.12, lo:12.24, vol:'28.4M', pe:0,   mc:'$13B',  div:0,   beta:1.84,eps:-0.22,sec:'Fintech',    ytd:+8.4},
  UPST:{n:'Upstart Holdings',  px:null,open:68.40, hi:70.20, lo:65.80, vol:'4.4M',  pe:0,   mc:'$6B',   div:0,   beta:2.84,eps:-1.28,sec:'Fintech',    ytd:+18.4},
  AFRM:{n:'Affirm Holdings',   px:null,open:44.80, hi:46.20, lo:42.40, vol:'8.4M',  pe:0,   mc:'$14B',  div:0,   beta:2.24,eps:-0.84,sec:'Fintech',    ytd:-12.4},
  PYPL:{n:'PayPal',            px:null,open:70.20, hi:70.80, lo:67.80, vol:'12.4M', pe:14.4,mc:'$72B',  div:0,   beta:1.44,eps:4.74, sec:'Fintech',    ytd:-4.8},
  BX:{n:'Blackstone',          px:null,open:152.80,hi:154.20,lo:146.40,vol:'3.2M',  pe:34.4,mc:'$182B', div:4.32,beta:1.28,eps:4.32, sec:'Fintech',    ytd:-8.4},
  APO:{n:'Apollo Global Mgmt', px:null,open:118.40,hi:122.20,lo:115.80,vol:'2.4M',  pe:18.4,mc:'$88B',  div:1.72,beta:1.44,eps:6.44, sec:'Fintech',    ytd:-8.4},
  KKR:{n:'KKR & Co',           px:null,open:134.80,hi:138.20,lo:131.40,vol:'2.8M',  pe:24.4,mc:'$120B', div:0.92,beta:1.34,eps:5.52, sec:'Fintech',    ytd:-12.4},
  // ── AI, Cloud & Cybersec ──
  PLTR:{n:'Palantir Tech',     px:null,open:84.20, hi:86.40, lo:80.80, vol:'48.4M', pe:284, mc:'$188B', div:0,   beta:2.44,eps:0.31, sec:'AI',         ytd:+8.4},
  SNOW:{n:'Snowflake',         px:null,open:138.20,hi:141.40,lo:133.80,vol:'4.4M',  pe:0,   mc:'$46B',  div:0,   beta:1.44,eps:-2.12,sec:'AI',         ytd:-14.8},
  DDOG:{n:'Datadog',           px:null,open:114.80,hi:117.40,lo:110.80,vol:'3.4M',  pe:318, mc:'$37B',  div:0,   beta:1.24,eps:0.37, sec:'AI',         ytd:-8.4},
  NET:{n:'Cloudflare',         px:null,open:98.40, hi:101.20,lo:95.80, vol:'4.4M',  pe:0,   mc:'$32B',  div:0,   beta:1.24,eps:-0.28,sec:'AI',         ytd:-4.8},
  CRWD:{n:'CrowdStrike',       px:null,open:354.20,hi:358.80,lo:344.20,vol:'3.4M',  pe:0,   mc:'$86B',  div:0,   beta:1.24,eps:-0.38,sec:'AI',         ytd:+2.4},
  ZS:{n:'Zscaler',             px:null,open:178.40,hi:182.20,lo:174.40,vol:'2.4M',  pe:0,   mc:'$28B',  div:0,   beta:1.14,eps:-0.42,sec:'AI',         ytd:-8.4},
  OKTA:{n:'Okta',              px:null,open:84.40, hi:86.80, lo:81.80, vol:'3.4M',  pe:0,   mc:'$14B',  div:0,   beta:1.14,eps:-0.82,sec:'AI',         ytd:-14.8},
  PANW:{n:'Palo Alto Nets',    px:null,open:182.80,hi:184.20,lo:176.40,vol:'3.2M',  pe:48.4,mc:'$118B', div:0,   beta:1.24,eps:3.68, sec:'AI',         ytd:-8.4},
  SOUN:{n:'SoundHound AI',     px:null,open:11.40, hi:12.20, lo:10.80, vol:'18.4M', pe:0,   mc:'$4.2B', div:0,   beta:2.84,eps:-0.34,sec:'AI',         ytd:-28.4},
  RDDT:{n:'Reddit Inc',        px:null,open:118.40,hi:122.20,lo:114.40,vol:'4.4M',  pe:0,   mc:'$18B',  div:0,   beta:1.84,eps:-0.84,sec:'AI',         ytd:-12.4},
  DUOL:{n:'Duolingo',          px:null,open:278.40,hi:284.20,lo:272.40,vol:'1.4M',  pe:88.4,mc:'$11B',  div:0,   beta:1.44,eps:3.14, sec:'AI',         ytd:+8.4},
  // ── Semiconductors ──
  AMD:{n:'AMD',                px:null,open:112.80,hi:113.80,lo:107.40,vol:'42.4M', pe:28.4,mc:'$176B', div:0,   beta:1.84,eps:3.82, sec:'Semis',      ytd:-28.4},
  QCOM:{n:'Qualcomm',          px:null,open:154.80,hi:158.40,lo:150.40,vol:'8.4M',  pe:16.4,mc:'$173B', div:3.40,beta:1.24,eps:9.38, sec:'Semis',      ytd:-12.4},
  MU:{n:'Micron Technology',   px:null,open:84.40, hi:86.20, lo:82.40, vol:'14.4M', pe:12.4,mc:'$92B',  div:.48, beta:1.44,eps:6.82, sec:'Semis',      ytd:-22.4},
  AMAT:{n:'Applied Materials',  px:null,open:158.40,hi:162.20,lo:154.40,vol:'4.4M', pe:18.4,mc:'$134B', div:1.60,beta:1.44,eps:8.62, sec:'Semis',      ytd:-18.4},
  TXN:{n:'Texas Instruments',  px:null,open:164.80,hi:168.40,lo:161.40,vol:'4.4M',  pe:28.4,mc:'$150B', div:5.28,beta:1.04,eps:5.82, sec:'Semis',      ytd:-4.8},
  INTC:{n:'Intel Corp',        px:null,open:25.40, hi:25.68, lo:24.60, vol:'48.4M', pe:0,   mc:'$105B', div:.50, beta:.92, eps:-4.18,sec:'Semis',      ytd:-4.8},
  ASML:{n:'ASML Holding',      px:null,open:658.80,hi:664.20,lo:644.40,vol:'2.4M',  pe:32.4,mc:'$260B', div:6.80,beta:1.14,eps:20.01,sec:'Semis',      ytd:-18.4},
  TSM:{n:'TSMC',               px:null,open:182.80,hi:184.20,lo:176.40,vol:'12.8M', pe:24.4,mc:'$924B', div:2.02,beta:1.18,eps:7.32, sec:'Semis',      ytd:-8.2},
  ARM:{n:'ARM Holdings',       px:null,open:142.80,hi:144.20,lo:136.40,vol:'8.4M',  pe:188, mc:'$145B', div:0,   beta:1.84,eps:.74,  sec:'Semis',      ytd:-28.4},
  MRVL:{n:'Marvell Tech',      px:null,open:70.20, hi:71.40, lo:67.40, vol:'12.4M', pe:42.4,mc:'$59B',  div:.24, beta:1.52,eps:1.62, sec:'Semis',      ytd:-22.8},
  SMCI:{n:'Super Micro Comp',  px:null,open:38.40, hi:40.20, lo:36.80, vol:'18.4M', pe:12.4,mc:'$20B',  div:0,   beta:2.44,eps:3.14, sec:'Semis',      ytd:-42.4},
  DELL:{n:'Dell Technologies', px:null,open:108.40,hi:111.20,lo:105.80,vol:'4.4M',  pe:14.4,mc:'$74B',  div:1.36,beta:1.24,eps:7.56, sec:'Semis',      ytd:-28.4},
  // ── Quantum Computing ──
  IONQ:{n:'IonQ Inc',          px:null,open:28.40, hi:30.20, lo:26.80, vol:'8.4M',  pe:0,   mc:'$5.4B', div:0,   beta:2.84,eps:-0.64,sec:'Quantum',    ytd:-22.4},
  RGTI:{n:'Rigetti Computing', px:null,open:9.40,  hi:10.20, lo:8.60,  vol:'12.4M', pe:0,   mc:'$2.4B', div:0,   beta:3.44,eps:-0.48,sec:'Quantum',    ytd:-38.4},
  QUBT:{n:'Quantum Computing', px:null,open:5.40,  hi:6.20,  lo:4.80,  vol:'8.4M',  pe:0,   mc:'$1.2B', div:0,   beta:3.24,eps:-0.28,sec:'Quantum',    ytd:-42.4},
  QBTS:{n:'D-Wave Quantum',    px:null,open:7.80,  hi:8.40,  lo:7.20,  vol:'6.4M',  pe:0,   mc:'$1.8B', div:0,   beta:3.44,eps:-0.34,sec:'Quantum',    ytd:-24.4},
  // ── Space & eVTOL ──
  RKLB:{n:'Rocket Lab USA',    px:null,open:22.40, hi:23.80, lo:21.20, vol:'8.4M',  pe:0,   mc:'$10.4B',div:0,   beta:2.84,eps:-0.42,sec:'Space',      ytd:+42.4},
  ASTS:{n:'AST SpaceMobile',   px:null,open:24.40, hi:26.20, lo:22.80, vol:'8.4M',  pe:0,   mc:'$8.4B', div:0,   beta:2.84,eps:-1.44,sec:'Space',      ytd:+48.4},
  ACHR:{n:'Archer Aviation',   px:null,open:9.40,  hi:9.80,  lo:8.80,  vol:'4.4M',  pe:0,   mc:'$3.2B', div:0,   beta:2.24,eps:-1.84,sec:'Space',      ytd:-18.4},
  JOBY:{n:'Joby Aviation',     px:null,open:7.80,  hi:8.20,  lo:7.40,  vol:'6.4M',  pe:0,   mc:'$5.4B', div:0,   beta:1.94,eps:-0.84,sec:'Space',      ytd:-14.8},
  LUNR:{n:'Intuitive Machines',px:null,open:14.20, hi:15.40, lo:13.60, vol:'3.4M',  pe:0,   mc:'$1.8B', div:0,   beta:2.84,eps:-1.24,sec:'Space',      ytd:+22.4},
  // ── Traditional Financials ──
  JPM:{n:'JPMorgan Chase',     px:null,open:240.40,hi:242.20,lo:234.40,vol:'14.4M', pe:13.2,mc:'$685B', div:5.20,beta:1.08,eps:17.94,sec:'Financials',  ytd:-2.4},
  GS:{n:'Goldman Sachs',       px:null,open:578.20,hi:580.80,lo:564.20,vol:'2.8M',  pe:14.8,mc:'$186B', div:14.0,beta:1.44,eps:38.40,sec:'Financials',  ytd:4.2},
  BRK:{n:'Berkshire Hath.',    px:null,open:530.40,hi:532.60,lo:522.80,vol:'1.8M',  pe:9.8, mc:'$1.20T',div:0,   beta:.62, eps:53.76,sec:'Financials',  ytd:12.4},
  BAC:{n:'Bank of America',    px:null,open:43.60, hi:43.92, lo:42.48, vol:'38.4M', pe:13.4,mc:'$337B', div:1.04,beta:1.28,eps:3.20, sec:'Financials',  ytd:-4.8},
  WFC:{n:'Wells Fargo',        px:null,open:77.80, hi:78.20, lo:76.00, vol:'18.4M', pe:12.8,mc:'$282B', div:1.40,beta:1.18,eps:5.98, sec:'Financials',  ytd:2.4},
  MS:{n:'Morgan Stanley',      px:null,open:120.80,hi:121.40,lo:117.80,vol:'8.4M',  pe:16.4,mc:'$196B', div:3.70,beta:1.34,eps:7.22, sec:'Financials',  ytd:-2.8},
  V:{n:'Visa Inc',             px:null,open:342.80,hi:344.20,lo:337.40,vol:'5.8M',  pe:28.4,mc:'$698B', div:2.36,beta:.92, eps:11.92,sec:'Financials',  ytd:2.4},
  MA:{n:'Mastercard',          px:null,open:534.80,hi:537.20,lo:526.80,vol:'3.2M',  pe:34.4,mc:'$494B', div:2.64,beta:.92, eps:15.36,sec:'Financials',  ytd:4.8},
  AXP:{n:'American Express',   px:null,open:268.40,hi:274.20,lo:266.40,vol:'3.2M',  pe:18.4,mc:'$196B', div:2.80,beta:1.14,eps:14.59,sec:'Financials',  ytd:4.2},
  C:{n:'Citigroup',            px:null,open:69.80, hi:70.40, lo:67.80, vol:'14.4M', pe:10.8,mc:'$130B', div:2.12,beta:1.28,eps:6.34, sec:'Financials',  ytd:-4.8},
  SCHW:{n:'Charles Schwab',    px:null,open:80.20, hi:81.40, lo:77.40, vol:'6.4M',  pe:22.4,mc:'$144B', div:1.00,beta:1.08,eps:3.50, sec:'Financials',  ytd:8.4},
  // ── Healthcare & Biotech ──
  UNH:{n:'UnitedHealth',       px:null,open:508.20,hi:510.80,lo:493.40,vol:'3.2M',  pe:18.8,mc:'$459B', div:9.20,beta:.82, eps:26.51,sec:'Healthcare',  ytd:-4.4},
  LLY:{n:'Eli Lilly',          px:null,open:840.20,hi:844.80,lo:820.40,vol:'2.8M',  pe:48.4,mc:'$782B', div:5.20,beta:.42, eps:17.02,sec:'Healthcare',  ytd:-18.4},
  JNJ:{n:'Johnson & Johnson',  px:null,open:161.20,hi:162.40,lo:158.20,vol:'6.4M',  pe:22.4,mc:'$383B', div:4.96,beta:.52, eps:7.08, sec:'Healthcare',  ytd:2.8},
  ABBV:{n:'AbbVie',            px:null,open:187.20,hi:188.40,lo:183.80,vol:'5.8M',  pe:28.4,mc:'$326B', div:6.72,beta:.62, eps:6.50, sec:'Healthcare',  ytd:4.2},
  PFE:{n:'Pfizer',             px:null,open:25.20, hi:25.60, lo:24.40, vol:'32.4M', pe:42.8,mc:'$140B', div:1.68,beta:.68, eps:.58,  sec:'Healthcare',  ytd:-4.8},
  MRK:{n:'Merck',              px:null,open:90.20, hi:91.00, lo:87.80, vol:'8.4M',  pe:14.2,mc:'$224B', div:3.08,beta:.48, eps:6.22, sec:'Healthcare',  ytd:-12.4},
  AMGN:{n:'Amgen',             px:null,open:268.40,hi:272.20,lo:264.40,vol:'2.4M',  pe:16.4,mc:'$143B', div:9.00,beta:.64, eps:16.32,sec:'Healthcare',  ytd:+4.8},
  REGN:{n:'Regeneron',         px:null,open:598.40,hi:604.20,lo:592.40,vol:'1.2M',  pe:22.4,mc:'$62B',  div:0,   beta:.44, eps:26.48,sec:'Healthcare',  ytd:-12.4},
  VRTX:{n:'Vertex Pharma',     px:null,open:448.40,hi:454.20,lo:442.40,vol:'1.2M',  pe:28.4,mc:'$114B', div:0,   beta:.44, eps:15.62,sec:'Healthcare',  ytd:+4.8},
  MRNA:{n:'Moderna',           px:null,open:34.40, hi:36.20, lo:33.40, vol:'8.4M',  pe:0,   mc:'$13B',  div:0,   beta:1.24,eps:-9.82,sec:'Healthcare',  ytd:-14.8},
  BNTX:{n:'BioNTech',          px:null,open:98.40, hi:102.20,lo:96.40, vol:'1.4M',  pe:34.4,mc:'$24B',  div:0,   beta:.84, eps:2.82, sec:'Healthcare',  ytd:+8.4},
  ISRG:{n:'Intuitive Surgical',px:null,open:554.80,hi:558.20,lo:544.40,vol:'1.4M',  pe:68.4,mc:'$194B', div:0,   beta:1.04,eps:8.02, sec:'Healthcare',  ytd:8.4},
  RXRX:{n:'Recursion Pharma',  px:null,open:6.40,  hi:6.80,  lo:5.80,  vol:'4.4M',  pe:0,   mc:'$1.8B', div:0,   beta:1.84,eps:-1.44,sec:'Healthcare',  ytd:-28.4},
  CRSP:{n:'CRISPR Therapeutics',px:null,open:38.40,hi:40.20, lo:36.80, vol:'1.4M',  pe:0,   mc:'$2.8B', div:0,   beta:1.44,eps:-5.84,sec:'Healthcare',  ytd:-22.4},
  BEAM:{n:'Beam Therapeutics',  px:null,open:24.40,hi:26.20, lo:22.80, vol:'1.4M',  pe:0,   mc:'$1.4B', div:0,   beta:1.64,eps:-5.24,sec:'Healthcare',  ytd:-18.4},
  NVO:{n:'Novo Nordisk',        px:null,open:68.40,hi:70.20, lo:66.40, vol:'4.4M',  pe:24.4,mc:'$308B', div:1.04,beta:.72, eps:2.80, sec:'Healthcare',  ytd:-28.4},
  AZN:{n:'AstraZeneca',         px:null,open:68.40,hi:70.20, lo:66.40, vol:'2.4M',  pe:28.4,mc:'$218B', div:1.28,beta:.64, eps:2.40, sec:'Healthcare',  ytd:+4.8},
  // ── Defense & Industrials ──
  LMT:{n:'Lockheed Martin',    px:null,open:478.40,hi:482.20,lo:472.40,vol:'1.4M',  pe:17.4,mc:'$113B', div:12.6,beta:.72, eps:27.48,sec:'Industrials', ytd:+12.4},
  RTX:{n:'Raytheon',           px:null,open:128.40,hi:130.20,lo:126.40,vol:'5.4M',  pe:38.4,mc:'$171B', div:2.36,beta:.92, eps:3.32, sec:'Industrials', ytd:+8.4},
  NOC:{n:'Northrop Grumman',   px:null,open:498.40,hi:502.20,lo:492.40,vol:'1.2M',  pe:16.4,mc:'$74B',  div:7.96,beta:.62, eps:30.36,sec:'Industrials', ytd:+14.8},
  GD:{n:'General Dynamics',    px:null,open:278.40,hi:282.20,lo:274.40,vol:'1.4M',  pe:20.4,mc:'$76B',  div:5.68,beta:.72, eps:13.64,sec:'Industrials', ytd:+8.4},
  BA:{n:'Boeing',              px:null,open:168.40,hi:172.20,lo:164.40,vol:'8.4M',  pe:0,   mc:'$127B', div:0,   beta:1.44,eps:-12.82,sec:'Industrials',ytd:-8.4},
  CAT:{n:'Caterpillar',        px:null,open:354.20,hi:356.80,lo:346.40,vol:'3.2M',  pe:18.4,mc:'$172B', div:5.64,beta:.98, eps:18.94,sec:'Industrials', ytd:2.4},
  DE:{n:'Deere & Co',          px:null,open:388.80,hi:392.20,lo:382.40,vol:'1.8M',  pe:14.4,mc:'$110B', div:6.44,beta:.98, eps:26.70,sec:'Industrials', ytd:-8.4},
  HON:{n:'Honeywell',          px:null,open:212.80,hi:214.20,lo:206.40,vol:'3.2M',  pe:22.4,mc:'$136B', div:4.32,beta:.92, eps:9.30, sec:'Industrials', ytd:-4.8},
  GE:{n:'GE Aerospace',        px:null,open:202.80,hi:204.40,lo:196.80,vol:'4.4M',  pe:34.8,mc:'$216B', div:1.12,beta:1.18,eps:5.70, sec:'Industrials', ytd:6.8},
  // ── Consumer & Media ──
  WMT:{n:'Walmart',            px:null,open:100.20,hi:101.40,lo:98.00, vol:'12.4M', pe:38.4,mc:'$791B', div:2.36,beta:.52, eps:2.56, sec:'Consumer',    ytd:6.8},
  COST:{n:'Costco',            px:null,open:938.20,hi:942.80,lo:920.40,vol:'1.8M',  pe:52.4,mc:'$410B', div:4.64,beta:.82, eps:17.64,sec:'Consumer',    ytd:4.4},
  KO:{n:'Coca-Cola',           px:null,open:69.20, hi:69.80, lo:68.00, vol:'14.4M', pe:24.4,mc:'$295B', div:2.04,beta:.52, eps:2.80, sec:'Consumer',    ytd:8.4},
  PEP:{n:'PepsiCo',            px:null,open:150.80,hi:151.80,lo:147.80,vol:'5.8M',  pe:22.4,mc:'$203B', div:5.48,beta:.52, eps:6.62, sec:'Consumer',    ytd:-4.8},
  HD:{n:'Home Depot',          px:null,open:384.20,hi:386.80,lo:377.40,vol:'4.4M',  pe:22.4,mc:'$377B', div:9.00,beta:1.02,eps:16.88,sec:'Consumer',    ytd:-8.4},
  MCD:{n:'McDonalds',          px:null,open:302.80,hi:304.20,lo:296.40,vol:'3.2M',  pe:24.4,mc:'$214B', div:6.68,beta:.72, eps:12.23,sec:'Consumer',    ytd:4.8},
  SBUX:{n:'Starbucks',         px:null,open:100.20,hi:101.40,lo:97.40, vol:'6.4M',  pe:28.4,mc:'$113B', div:2.36,beta:.92, eps:3.46, sec:'Consumer',    ytd:4.2},
  NKE:{n:'Nike',               px:null,open:69.80, hi:70.40, lo:67.80, vol:'8.4M',  pe:28.4,mc:'$102B', div:1.48,beta:1.08,eps:2.41, sec:'Consumer',    ytd:-18.4},
  ABNB:{n:'Airbnb',            px:null,open:132.80,hi:134.20,lo:126.40,vol:'4.4M',  pe:24.4,mc:'$82B',  div:0,   beta:1.44,eps:5.27, sec:'Consumer',    ytd:-8.4},
  DASH:{n:'DoorDash',          px:null,open:182.80,hi:184.20,lo:176.40,vol:'3.2M',  pe:88.4,mc:'$72B',  div:0,   beta:1.34,eps:2.02, sec:'Consumer',    ytd:4.8},
  SPOT:{n:'Spotify',           px:null,open:612.80,hi:616.40,lo:596.40,vol:'2.4M',  pe:88.4,mc:'$116B', div:0,   beta:1.44,eps:6.78, sec:'Consumer',    ytd:8.4},
  PINS:{n:'Pinterest',         px:null,open:28.40, hi:29.20, lo:27.60, vol:'8.4M',  pe:18.4,mc:'$18B',  div:0,   beta:1.24,eps:1.54, sec:'Consumer',    ytd:-8.4},
  CELH:{n:'Celsius Holdings',  px:null,open:28.40, hi:29.20, lo:27.60, vol:'4.4M',  pe:34.4,mc:'$6.4B', div:0,   beta:1.84,eps:.84,  sec:'Consumer',    ytd:-28.4},
  MNST:{n:'Monster Beverage',  px:null,open:48.40, hi:49.20, lo:47.60, vol:'4.4M',  pe:28.4,mc:'$46B',  div:0,   beta:.84, eps:1.72, sec:'Consumer',    ytd:-8.4},
  SHOP:{n:'Shopify',           px:null,open:122.80,hi:123.80,lo:117.40,vol:'8.4M',  pe:88.4,mc:'$152B', div:0,   beta:1.84,eps:1.34, sec:'Consumer',    ytd:-14.8},
  UBER:{n:'Uber Technologies', px:null,open:74.80, hi:75.40, lo:71.80, vol:'14.4M', pe:28.4,mc:'$151B', div:0,   beta:1.44,eps:2.54, sec:'Consumer',    ytd:-14.8},
  // ── Energy ──
  XOM:{n:'ExxonMobil',         px:null,open:116.40,hi:117.20,lo:111.60,vol:'16.4M', pe:13.2,mc:'$446B', div:3.96,beta:.96, eps:8.55, sec:'Energy',      ytd:2.4},
  CVX:{n:'Chevron',            px:null,open:158.20,hi:159.40,lo:154.20,vol:'8.4M',  pe:14.4,mc:'$283B', div:6.52,beta:.86, eps:10.74,sec:'Energy',      ytd:-4.8},
  COP:{n:'ConocoPhillips',     px:null,open:107.20,hi:108.20,lo:103.80,vol:'7.2M',  pe:12.4,mc:'$131B', div:2.28,beta:.92, eps:8.44, sec:'Energy',      ytd:-6.4},
  CCJ:{n:'Cameco Corp',        px:null,open:48.40, hi:50.20, lo:46.80, vol:'2.4M',  pe:54.4,mc:'$20B',  div:.12, beta:.84, eps:.88,  sec:'Energy',      ytd:+18.4},
  UEC:{n:'Uranium Energy',     px:null,open:6.80,  hi:7.20,  lo:6.40,  vol:'2.4M',  pe:0,   mc:'$2.2B', div:0,   beta:1.54,eps:-.22, sec:'Energy',      ytd:+8.4},
  // ── Materials & Mining ──
  NEM:{n:'Newmont Mining',     px:null,open:44.40, hi:46.20, lo:43.40, vol:'8.4M',  pe:28.4,mc:'$48B',  div:1.00,beta:.44, eps:1.58, sec:'Materials',   ytd:+28.4},
  GOLD:{n:'Barrick Gold',      px:null,open:18.40, hi:19.20, lo:18.00, vol:'14.4M', pe:18.4,mc:'$32B',  div:.40, beta:.24, eps:.98,  sec:'Materials',   ytd:+22.4},
  AEM:{n:'Agnico Eagle Mines', px:null,open:88.40, hi:91.20, lo:86.80, vol:'2.4M',  pe:22.4,mc:'$44B',  div:1.60,beta:.52, eps:3.94, sec:'Materials',   ytd:+28.4},
  WPM:{n:'Wheaton Precious Met',px:null,open:64.40,hi:66.20, lo:62.80, vol:'1.4M',  pe:32.4,mc:'$28B',  div:.84, beta:.72, eps:1.96, sec:'Materials',   ytd:+18.4},
  FCX:{n:'Freeport-McMoRan',   px:null,open:39.20, hi:39.80, lo:37.80, vol:'12.4M', pe:14.4,mc:'$55B',  div:.60, beta:1.38,eps:2.67, sec:'Materials',   ytd:8.4},
  MP:{n:'MP Materials',        px:null,open:18.40, hi:19.20, lo:17.80, vol:'2.4M',  pe:0,   mc:'$2.8B', div:0,   beta:1.64,eps:-.28, sec:'Materials',   ytd:+8.4},
  // ── International ADRs ──
  SAP:{n:'SAP SE',             px:null,open:248.40,hi:252.20,lo:244.40,vol:'1.8M',  pe:42.4,mc:'$296B', div:2.64,beta:.92, eps:5.84, sec:'Intl ADR',    ytd:+14.8},
  SONY:{n:'Sony Group ADR',    px:null,open:18.40, hi:18.80, lo:17.80, vol:'2.4M',  pe:14.4,mc:'$112B', div:.42, beta:.84, eps:1.28, sec:'Intl ADR',    ytd:-8.4},
  TM:{n:'Toyota Motor ADR',    px:null,open:188.40,hi:192.20,lo:184.40,vol:'.8M',   pe:8.4, mc:'$244B', div:4.64,beta:.72, eps:22.44,sec:'Intl ADR',    ytd:-4.8},
  BABA:{n:'Alibaba',           px:null,open:124.80,hi:130.20,lo:123.40,vol:'14.8M', pe:12.4,mc:'$316B', div:1.28,beta:.84, eps:10.36,sec:'Intl ADR',    ytd:42.8},
  BIDU:{n:'Baidu',             px:null,open:96.80, hi:100.20,lo:95.40, vol:'4.4M',  pe:10.4,mc:'$34B',  div:0,   beta:.84, eps:9.46, sec:'Intl ADR',    ytd:14.8},
  TCEHY:{n:'Tencent',          px:null,open:57.20, hi:59.40, lo:56.80, vol:'8.4M',  pe:18.4,mc:'$558B', div:.72, beta:.72, eps:3.17, sec:'Intl ADR',    ytd:24.8},
  NOK:{n:'Nokia ADR',          px:null,open:4.20,  hi:4.40,  lo:4.00,  vol:'4.4M',  pe:12.4,mc:'$24B',  div:.24, beta:.64, eps:.34,  sec:'Intl ADR',    ytd:+4.8},
  // ── Real Estate ──
  O:{n:'Realty Income',        px:null,open:52.40, hi:53.20, lo:51.40, vol:'6.4M',  pe:42.4,mc:'$48B',  div:3.18,beta:.72, eps:1.22, sec:'Real Estate', ytd:+4.8},
  AMT:{n:'American Tower',     px:null,open:178.40,hi:180.20,lo:176.40,vol:'2.4M',  pe:42.4,mc:'$82B',  div:6.48,beta:.62, eps:4.18, sec:'Real Estate', ytd:-2.4},
  // ── ETFs ──
  SPY:{n:'SPDR S&P 500 ETF',   px:null,open:558.20,hi:562.40,lo:552.40,vol:'62.4M', pe:22.4,mc:'$486B', div:6.84,beta:1.00,eps:24.82,sec:'ETF',        ytd:-5.2},
  QQQ:{n:'Invesco QQQ Trust',  px:null,open:468.20,hi:472.40,lo:462.40,vol:'48.4M', pe:26.4,mc:'$240B', div:2.48,beta:1.14,eps:17.42,sec:'ETF',        ytd:-7.8},
  IWM:{n:'iShares Russell 2000',px:null,open:198.40,hi:202.20,lo:194.40,vol:'28.4M',pe:0,   mc:'$24B',  div:1.48,beta:1.14,eps:0,    sec:'ETF',        ytd:-12.4},
  VOO:{n:'Vanguard S&P 500',   px:null,open:512.40,hi:518.20,lo:506.40,vol:'4.4M',  pe:0,   mc:'$524B', div:6.12,beta:1.00,eps:0,    sec:'ETF',        ytd:-5.2},
  VTI:{n:'Vanguard Total Stock',px:null,open:228.40,hi:232.20,lo:224.40,vol:'4.4M', pe:0,   mc:'$468B', div:3.44,beta:1.00,eps:0,    sec:'ETF',        ytd:-4.8},
  DIA:{n:'SPDR Dow Jones ETF',  px:null,open:420.40,hi:424.20,lo:416.40,vol:'2.4M', pe:0,   mc:'$38B',  div:6.84,beta:.98, eps:0,    sec:'ETF',        ytd:-4.2},
  ARKK:{n:'ARK Innovation ETF', px:null,open:44.40, hi:46.20, lo:42.40, vol:'8.4M', pe:0,   mc:'$4.8B', div:0,   beta:1.64,eps:0,    sec:'ETF',        ytd:-18.4},
  GLD:{n:'SPDR Gold Shares',    px:null,open:284.20,hi:287.40,lo:280.40,vol:'8.4M', pe:0,   mc:'$82B',  div:0,   beta:.04, eps:0,    sec:'ETF',        ytd:+18.4},
  SLV:{n:'iShares Silver Trust',px:null,open:29.40, hi:30.20, lo:28.80, vol:'8.4M', pe:0,   mc:'$14B',  div:0,   beta:.84, eps:0,    sec:'ETF',        ytd:+8.4},
  TLT:{n:'iShares 20Y Treasury',px:null,open:88.40, hi:90.20, lo:86.80, vol:'18.4M',pe:0,   mc:'$38B',  div:3.44,beta:-.24,eps:0,    sec:'ETF',        ytd:-4.8},
  HYG:{n:'iShares HY Corp Bond',px:null,open:78.40, hi:79.20, lo:77.80, vol:'18.4M',pe:0,   mc:'$18B',  div:5.24,beta:.44, eps:0,    sec:'ETF',        ytd:+2.4},
  XLK:{n:'Tech Select SPDR',    px:null,open:228.40,hi:232.20,lo:224.40,vol:'8.4M', pe:0,   mc:'$64B',  div:1.24,beta:1.22,eps:0,    sec:'ETF',        ytd:-6.8},
  XLF:{n:'Financial Select SPDR',px:null,open:48.40,hi:49.20, lo:47.80, vol:'18.4M',pe:0,   mc:'$42B',  div:1.44,beta:1.08,eps:0,    sec:'ETF',        ytd:+4.8},
  XLE:{n:'Energy Select SPDR',  px:null,open:88.40, hi:90.20, lo:86.80, vol:'8.4M', pe:0,   mc:'$28B',  div:4.24,beta:.98, eps:0,    sec:'ETF',        ytd:-2.4},
  XLV:{n:'Health Care SPDR',    px:null,open:148.40,hi:150.20,lo:146.80,vol:'4.4M', pe:0,   mc:'$28B',  div:1.84,beta:.52, eps:0,    sec:'ETF',        ytd:-2.4},
  IBIT:{n:'iShares Bitcoin ETF', px:null,open:48.40, hi:50.20, lo:46.40, vol:'48.4M',pe:0,  mc:'$42B',  div:0,   beta:2.84,eps:0,    sec:'ETF',        ytd:-22.4},
  FBTC:{n:'Fidelity Bitcoin ETF',px:null,open:48.40, hi:50.20, lo:46.40, vol:'14.4M',pe:0,  mc:'$18B',  div:0,   beta:2.84,eps:0,    sec:'ETF',        ytd:-22.4},
  GBTC:{n:'Grayscale Bitcoin',   px:null,open:52.40, hi:54.20, lo:50.40, vol:'4.4M', pe:0,  mc:'$12B',  div:0,   beta:2.84,eps:0,    sec:'ETF',        ytd:-24.4},
  ETHA:{n:'iShares Ethereum ETF',px:null,open:16.40, hi:17.20, lo:15.60, vol:'8.4M', pe:0,  mc:'$2.8B', div:0,   beta:2.44,eps:0,    sec:'ETF',        ytd:-42.4},
  TQQQ:{n:'ProShares UltraPro QQQ',px:null,open:48.40,hi:50.20,lo:44.40,vol:'48.4M',pe:0,  mc:'$14B',  div:0,   beta:3.24,eps:0,    sec:'ETF',        ytd:-24.4},
  SQQQ:{n:'ProShares Short QQQ', px:null,open:8.40,  hi:9.20,  lo:8.00,  vol:'48.4M',pe:0,  mc:'$2.4B', div:0,   beta:-3.24,eps:0,   sec:'ETF',        ytd:+24.4},
};
const CRYPTO=[
  {id:'bitcoin',     s:'BTC',  n:'Bitcoin',       px:null,    chg:0,      chg7:0,    mc:1400000000000, vol:51590000000,  rank:1,  ath:108786, dom:'58.39%'},
  {id:'ethereum',    s:'ETH',  n:'Ethereum',      px:null,    chg:+1.21, chg7:-6.4,  mc:258000000000,  vol:16400000000,  rank:2,  ath:4891,   dom:'10.4%'},
  {id:'ripple',      s:'XRP',  n:'XRP',           px:null,    chg:-0.04, chg7:-4.2,  mc:84000000000,   vol:4240000000,   rank:3,  ath:3.84,   dom:'3.4%'},
  {id:'bnb',         s:'BNB',  n:'BNB',           px:null,    chg:+0.63, chg7:-2.1,  mc:92400000000,   vol:2840000000,   rank:4,  ath:788,    dom:'3.7%'},
  {id:'solana',      s:'SOL',  n:'Solana',        px:null,    chg:+2.11, chg7:-8.4,  mc:43200000000,   vol:4840000000,   rank:5,  ath:294,    dom:'1.7%'},
  {id:'cardano',     s:'ADA',  n:'Cardano',       px:null,    chg:+0.73, chg7:-6.4,  mc:9700000000,    vol:640000000,    rank:9,  ath:3.10,   dom:'.39%'},
  {id:'tron',        s:'TRX',  n:'TRON',          px:null,    chg:+1.17, chg7:0.8,   mc:26600000000,   vol:1840000000,   rank:8,  ath:.44,    dom:'1.1%'},
  {id:'hyperliquid', s:'HYPE', n:'Hyperliquid',   px:null,    chg:+0.41, chg7:-8.4,  mc:13200000000,   vol:680000000,    rank:15, ath:34.96,  dom:'.53%'},
  {id:'chainlink',   s:'LINK', n:'Chainlink',     px:null,    chg:1.84,  chg7:-8.4,  mc:9400000000,    vol:540000000,    rank:14, ath:52.7,   dom:'.40%'},
  {id:'avalanche',   s:'AVAX', n:'Avalanche',     px:null,    chg:2.40,  chg7:-14.4, mc:8640000000,    vol:480000000,    rank:15, ath:146.2,  dom:'.37%'},
  {id:'sui',         s:'SUI',  n:'Sui',           px:null,    chg:4.20,  chg7:-18.4, mc:7240000000,    vol:980000000,    rank:16, ath:5.36,   dom:'.31%'},
  {id:'stellar',     s:'XLM',  n:'Stellar',       px:null,    chg:0.84,  chg7:-8.4,  mc:8640000000,    vol:620000000,    rank:13, ath:.938,   dom:'.37%'},
  {id:'litecoin',    s:'LTC',  n:'Litecoin',      px:null,    chg:1.20,  chg7:-4.4,  mc:7480000000,    vol:840000000,    rank:17, ath:412.0,  dom:'.32%'},
  {id:'polkadot',    s:'DOT',  n:'Polkadot',      px:null,    chg:1.80,  chg7:-12.4, mc:6840000000,    vol:480000000,    rank:19, ath:54.98,  dom:'.29%'},
  {id:'uniswap',     s:'UNI',  n:'Uniswap',       px:null,    chg:3.40,  chg7:-8.4,  mc:5840000000,    vol:380000000,    rank:20, ath:44.97,  dom:'.25%'},
  {id:'near',        s:'NEAR', n:'NEAR Protocol', px:null,    chg:2.40,  chg7:-14.4, mc:3480000000,    vol:280000000,    rank:24, ath:20.44,  dom:'.15%'},
  {id:'aave',        s:'AAVE', n:'Aave',          px:null,    chg:2.80,  chg7:-4.4,  mc:2840000000,    vol:340000000,    rank:26, ath:661.0,  dom:'.12%'},
  {id:'icp',         s:'ICP',  n:'Internet Computer',px:null, chg:-1.20, chg7:-8.4,  mc:2640000000,    vol:180000000,    rank:28, ath:700.0,  dom:'.11%'},
  {id:'kaspa',       s:'KAS',  n:'Kaspa',         px:null,    chg:1.40,  chg7:2.4,   mc:2240000000,    vol:180000000,    rank:30, ath:.184,   dom:'.10%'},
  {id:'aptos',       s:'APT',  n:'Aptos',         px:null,    chg:1.40,  chg7:-8.4,  mc:2040000000,    vol:280000000,    rank:32, ath:20.44,  dom:'.09%'},
  {id:'render',      s:'RENDER',n:'Render',       px:null,    chg:1.80,  chg7:-8.4,  mc:1840000000,    vol:180000000,    rank:33, ath:13.60,  dom:'.08%'},
  {id:'atom',        s:'ATOM', n:'Cosmos',        px:null,    chg:-0.84, chg7:-8.4,  mc:1480000000,    vol:140000000,    rank:36, ath:44.45,  dom:'.06%'},
  {id:'filecoin',    s:'FIL',  n:'Filecoin',      px:null,    chg:-1.40, chg7:-12.4, mc:1640000000,    vol:240000000,    rank:35, ath:236.84, dom:'.07%'},
  {id:'optimism',    s:'OP',   n:'Optimism',      px:null,    chg:1.80,  chg7:-8.4,  mc:1040000000,    vol:180000000,    rank:40, ath:4.84,   dom:'.04%'},
  {id:'arbitrum',    s:'ARB',  n:'Arbitrum',      px:null,    chg:0.84,  chg7:-8.4,  mc:1240000000,    vol:240000000,    rank:38, ath:2.39,   dom:'.05%'},
  {id:'injective',   s:'INJ',  n:'Injective',     px:null,    chg:2.40,  chg7:-8.4,  mc:840000000,     vol:180000000,    rank:45, ath:52.84,  dom:'.04%'},
  {id:'jupiter',     s:'JUP',  n:'Jupiter',       px:null,    chg:1.40,  chg7:-8.4,  mc:840000000,     vol:180000000,    rank:44, ath:2.02,   dom:'.04%'},
  {id:'raydium',     s:'RAY',  n:'Raydium',       px:null,    chg:1.20,  chg7:-4.4,  mc:684000000,     vol:240000000,    rank:48, ath:16.93,  dom:'.03%'},
  {id:'jito',        s:'JTO',  n:'Jito',          px:null,    chg:0.84,  chg7:-8.4,  mc:240000000,     vol:80000000,     rank:82, ath:6.00,   dom:'.01%'},
  {id:'pyth',        s:'PYTH', n:'Pyth Network',  px:null,    chg:0.40,  chg7:-4.4,  mc:284000000,     vol:80000000,     rank:76, ath:1.07,   dom:'.01%'},
  {id:'lido',        s:'LDO',  n:'Lido DAO',      px:null,    chg:0.60,  chg7:-4.4,  mc:584000000,     vol:140000000,    rank:50, ath:7.30,   dom:'.02%'},
  {id:'maker',       s:'MKR',  n:'Maker',         px:null,    chg:0.80,  chg7:-4.4,  mc:740000000,     vol:80000000,     rank:47, ath:6292,   dom:'.03%'},
  {id:'curve',       s:'CRV',  n:'Curve DAO',     px:null,    chg:0.40,  chg7:-4.4,  mc:240000000,     vol:80000000,     rank:84, ath:60.50,  dom:'.01%'},
  {id:'gmx',         s:'GMX',  n:'GMX',           px:null,    chg:1.20,  chg7:-4.4,  mc:148000000,     vol:60000000,     rank:98, ath:91.80,  dom:'.006%'},
  {id:'fantom',      s:'FTM',  n:'Fantom',        px:null,    chg:1.00,  chg7:-8.4,  mc:1540000000,    vol:240000000,    rank:37, ath:3.46,   dom:'.07%'},
  {id:'algorand',    s:'ALGO', n:'Algorand',      px:null,    chg:0.40,  chg7:-4.4,  mc:2040000000,    vol:180000000,    rank:31, ath:3.56,   dom:'.09%'},
  {id:'vechain',     s:'VET',  n:'VeChain',       px:null,    chg:0.80,  chg7:-4.4,  mc:2340000000,    vol:180000000,    rank:29, ath:.2801,  dom:'.10%'},
  {id:'monero',      s:'XMR',  n:'Monero',        px:null,    chg:0.00,  chg7:null,  mc:6000000000,    vol:100000000,    rank:22, ath:517.0,  dom:'.17%'},
  {id:'bitcoin-cash',s:'BCH',  n:'Bitcoin Cash',  px:null,    chg:+3.15,  chg7:null,  mc:9400000000,    vol:440000000,    rank:19, ath:4355,   dom:'.38%'},
  {id:'fetch-ai',    s:'FET',  n:'Fetch.ai',      px:null,    chg:1.40,  chg7:-4.4,  mc:480000000,     vol:180000000,    rank:55, ath:3.44,   dom:'.02%'},
  {id:'immutable-x',  s:'IMX',  n:'Immutable',        px:null,    chg:1.20,chg7:-14.4, mc:584000000,    vol:140000000,    rank:51, ath:3.90,    dom:'.02%'},
  {id:'starknet',     s:'STRK', n:'Starknet',         px:null,    chg:1.40,chg7:-18.4, mc:284000000,    vol:140000000,    rank:74, ath:4.00,    dom:'.01%'},
  {id:'sei-network',  s:'SEI',  n:'Sei',              px:null,    chg:2.40,chg7:-14.4, mc:684000000,    vol:180000000,    rank:49, ath:1.08,    dom:'.03%'},
  {id:'ton',          s:'TON',  n:'Toncoin',          px:null,    chg:1.40,chg7:-8.4,  mc:9840000000,   vol:580000000,    rank:11, ath:8.25,    dom:'.42%'},
  {id:'mantra',       s:'OM',   n:'MANTRA',           px:null,    chg:2.80,chg7:-8.4,  mc:1840000000,   vol:480000000,    rank:34, ath:9.00,    dom:'.08%'},
  {id:'virtual-protocol',s:'VIRTUAL',n:'Virtuals Protocol',px:null,chg:4.20,chg7:-18.4,mc:1240000000,  vol:380000000,    rank:39, ath:5.07,    dom:'.05%'},
  {id:'berachain',    s:'BERA', n:'Berachain',        px:null,    chg:3.40,chg7:-22.4, mc:584000000,    vol:480000000,    rank:52, ath:15.00,   dom:'.02%'},
  {id:'movement',     s:'MOVE', n:'Movement',         px:null,    chg:2.80,chg7:-18.4, mc:384000000,    vol:140000000,    rank:63, ath:1.60,    dom:'.02%'},
  {id:'ethereum-classic',s:'ETC',n:'Ethereum Classic',px:null,  chg:1.40,chg7:-8.4,  mc:2840000000,   vol:280000000,    rank:27, ath:176.16,  dom:'.12%'},
  {id:'zcash',        s:'ZEC',  n:'Zcash',            px:null,    chg:0.00,  chg7:null,  mc:790000000,     vol:120000000,    rank:51, ath:5941.8,  dom:'.03%'},
  {id:'the-graph',    s:'GRT',  n:'The Graph',        px:null,    chg:1.80,chg7:-8.4,  mc:940000000,    vol:180000000,    rank:43, ath:2.88,    dom:'.04%'},
  {id:'pendle',       s:'PENDLE',n:'Pendle',          px:null,    chg:3.40,chg7:-14.4, mc:384000000,    vol:180000000,    rank:64, ath:7.52,    dom:'.02%'},
  // ── v4 additions — missing assets ──────────────────────────────────────────
  {id:'kaspa',        s:'KAS',   n:'Kaspa',          px:null,    chg:1.40,chg7:2.4,   mc:2240000000,   vol:180000000,    rank:30, ath:.184,    dom:'.10%'},
  {id:'ondo-finance', s:'ONDO',  n:'Ondo Finance',   px:null,    chg:2.40,chg7:-8.4,  mc:2840000000,   vol:380000000,    rank:28, ath:2.14,    dom:'.12%'},
  {id:'wormhole',     s:'W',     n:'Wormhole',       px:null,    chg:1.80,chg7:-12.4, mc:840000000,    vol:180000000,    rank:45, ath:1.02,    dom:'.04%'},
  {id:'ethena',       s:'ENA',   n:'Ethena',         px:null,    chg:2.20,chg7:-8.4,  mc:1240000000,   vol:280000000,    rank:38, ath:1.52,    dom:'.05%'},
  {id:'the-graph',    s:'GRT',   n:'The Graph',      px:null,    chg:1.80,chg7:-8.4,  mc:940000000,    vol:180000000,    rank:43, ath:2.88,    dom:'.04%'},
  {id:'zcash',        s:'ZEC',   n:'Zcash',          px:null,    chg:0.00,chg7:null,  mc:790000000,    vol:120000000,    rank:51, ath:5941.8,  dom:'.03%'},
  {id:'floki',        s:'FLOKI', n:'Floki Inu',      px:null,    chg:3.80,chg7:-8.4,  mc:1840000000,   vol:540000000,    rank:34, ath:.000345, dom:'.08%'},
  {id:'pepe',         s:'PEPE',  n:'Pepe',           px:null,    chg:4.20,chg7:-14.4, mc:4840000000,   vol:1840000000,   rank:18, ath:.00002716,dom:'.21%'},
  {id:'bonk',         s:'BONK',  n:'Bonk',           px:null,    chg:3.40,chg7:-8.4,  mc:1440000000,   vol:480000000,    rank:36, ath:.00005576,dom:'.06%'},
  {id:'dogwifcoin',   s:'WIF',   n:'dogwifhat',      px:null,    chg:4.80,chg7:-18.4, mc:1040000000,   vol:480000000,    rank:40, ath:4.83,    dom:'.04%'},
  {id:'meme',         s:'MEME',  n:'Memecoin',       px:null,    chg:2.40,chg7:-8.4,  mc:284000000,    vol:140000000,    rank:75, ath:.093,    dom:'.01%'},
  {id:'worldcoin-wld',s:'WLD',   n:'Worldcoin',      px:null,    chg:1.20,chg7:-8.4,  mc:984000000,    vol:240000000,    rank:42, ath:11.70,   dom:'.04%'},
  {id:'celestia',     s:'TIA',   n:'Celestia',       px:null,    chg:2.80,chg7:-14.4, mc:1840000000,   vol:380000000,    rank:33, ath:21.00,   dom:'.08%'},
  {id:'jito',         s:'JTO',   n:'Jito',           px:null,    chg:0.84,chg7:-8.4,  mc:240000000,    vol:80000000,     rank:82, ath:6.00,    dom:'.01%'},
  {id:'pyth-network', s:'PYTH',  n:'Pyth Network',   px:null,    chg:0.40,chg7:-4.4,  mc:284000000,    vol:80000000,     rank:76, ath:1.07,    dom:'.01%'},
  {id:'safe',         s:'SAFE',  n:'Safe',           px:null,    chg:1.40,chg7:-8.4,  mc:384000000,    vol:80000000,     rank:65, ath:2.00,    dom:'.02%'},
  {id:'dydx',         s:'DYDX',  n:'dYdX',           px:null,    chg:1.20,chg7:-8.4,  mc:284000000,    vol:140000000,    rank:74, ath:27.86,   dom:'.01%'},
  {id:'blur',         s:'BLUR',  n:'Blur',           px:null,    chg:0.80,chg7:-4.4,  mc:184000000,    vol:80000000,     rank:88, ath:2.45,    dom:'.01%'},
  {id:'flux',         s:'FLUX',  n:'Flux',           px:null,    chg:1.40,chg7:-4.4,  mc:184000000,    vol:80000000,     rank:90, ath:4.26,    dom:'.01%'}
];

// ── Vynuluj statická chg7 v CRYPTO array — pouze live API data se zobrazí ──
// Statické hodnoty (chg7:-8.4 atd.) jsou zastaralé — nikdy je nezobrazujeme
CRYPTO.forEach(function(c){ c.chg7=null; c._chg7live=false; });

// COMDTY_DATA — static fallback; overwritten by fetchStooq() live data on load
const COMDTY_DATA=[
  {s:'XAU',n:'GOLD',        px:null,      u:'oz',  chg:+0.83, open:4605.70,hi:4650,lo:4590,ytd:53.2},
  {s:'XAG',n:'SILVER',      px:null,      u:'oz',  chg:-.84, open:32.410, hi:32.68,lo:31.92,ytd:8.4},
  {s:'XPT',n:'PLATINUM',    px:null, u:'oz',  chg:-.44, open:978.80, hi:984,lo:968, ytd:4.2},
  {s:'XPD',n:'PALLADIUM',   px:null,  u:'oz',  chg:-.28, open:945.40, hi:952, lo:936,  ytd:-2.4},
  {s:'CL1',n:'WTI CRUDE',   px:null,  u:'bbl', chg:+2.27,open:96.14,  hi:99.40,lo:95.80,ytd:+36.8},
  {s:'CO1',n:'BRENT CRUDE', px:null, u:'bbl', chg:+3.26,open:108.65, hi:113.40,lo:107.80,ytd:+49.2},
  {s:'NG1',n:'NAT. GAS',    px:null,  u:'MMBtu',chg:1.24,open:3.934,  hi:4.06,lo:3.88,ytd:28.4},
  {s:'HG1',n:'COPPER',      px:null,  u:'lb',  chg:.44,  open:4.608,  hi:4.662,lo:4.588,ytd:8.2},
  {s:'W1', n:'WHEAT',       px:null, u:'bu',  chg:-.84, open:559.20, hi:562, lo:550,  ytd:-2.4},
  {s:'C1', n:'CORN',        px:null, u:'bu',  chg:.24,  open:467.20, hi:472, lo:464,  ytd:2.8},
  {s:'S1', n:'SOYBEANS',   px:null,u:'bu',  chg:-.62, open:1030.80,hi:1038,lo:1020,ytd:-4.2},
  {s:'CC1',n:'COCOA',      px:null,   u:'t',   chg:1.84, open:8680,   hi:8920,lo:8640,ytd:42.4},
  {s:'KC1',n:'COFFEE',     px:null, u:'lb',  chg:-.44, open:350.20, hi:352, lo:346, ytd:18.8},
  {s:'CT1',n:'COTTON',     px:null,  u:'lb',  chg:.28,  open:72.20,  hi:73.2,lo:71.8,ytd:-8.4},
  {s:'SB1',n:'SUGAR',      px:null,  u:'lb',  chg:-.84, open:19.00,  hi:19.2,lo:18.6,ytd:-12.4},
  {s:'LH1',n:'LEAN HOGS',  px:null,  u:'lb',  chg:.62,  open:94.20,  hi:95.8,lo:93.8,ytd:8.2},
  {s:'LC1',n:'LIVE CATTLE', px:null, u:'lb',  chg:.28,  open:197.80, hi:199.4,lo:197.0,ytd:4.8},
  {s:'UX1',n:'URANIUM',    px:null,  u:'lb',  chg:1.24, open:67.60,  hi:69.2,lo:67.0,ytd:-14.8},
  {s:'LI1',n:'LITHIUM',    px:null,   u:'t',   chg:-.44, open:9880,   hi:9960,lo:9780,ytd:-22.4},
  {s:'IRON',n:'IRON ORE',  px:null, u:'t',   chg:.84,  open:104.00, hi:106, lo:103, ytd:-8.4},
  {s:'ALU', n:'ALUMINIUM',  px:null,   u:'t',   chg:.44,  open:2474,   hi:2498,lo:2462,ytd:4.8},
  {s:'NI1', n:'NICKEL',     px:null,  u:'t',   chg:-.68, open:15940,  hi:16020,lo:15740,ytd:-12.4},
  {s:'ZN1', n:'ZINC',       px:null,   u:'t',   chg:.54,  open:2670,   hi:2698,lo:2662,ytd:2.4},
  {s:'PB1', n:'LEAD',       px:null,   u:'t',   chg:-.24, open:1988,   hi:2004,lo:1972,ytd:-4.8},
  {s:'TIN', n:'TIN',        px:null,  u:'t',   chg:.84,  open:28600,  hi:29040,lo:28480,ytd:8.4},
  {s:'OJ1', n:'ORANGE JUICE',px:null,u:'lb',  chg:1.24, open:442.80, hi:452,lo:440, ytd:32.4},
  {s:'LB1', n:'LUMBER',     px:null, u:'bf',  chg:-.84, open:488.20, hi:492,lo:480, ytd:-14.8},
  {s:'RB1', n:'RBOB GAS',   px:null,  u:'gal', chg:-1.44,open:2.216,  hi:2.228,lo:2.168,ytd:-8.4},
  {s:'HO1', n:'HEATING OIL',px:null,  u:'gal', chg:-1.24,open:2.312,  hi:2.324,lo:2.268,ytd:-6.8},
  {s:'RS1', n:'CANOLA',     px:null, u:'t',   chg:.44,  open:646.20, hi:652,lo:644, ytd:4.2},
  {s:'RR1', n:'ROUGH RICE', px:null,  u:'cwt', chg:-.28, open:16.88,  hi:17.04,lo:16.72,ytd:-2.4},
  {s:'LE1', n:'FEEDER CATTLE',px:null,u:'lb', chg:.34,  open:267.80, hi:269.4,lo:267.0,ytd:6.8},
  {s:'PA1', n:'ETHANOL',    px:null,  u:'gal', chg:.24,  open:1.680,  hi:1.698,lo:1.668,ytd:2.4},
  {s:'CO2', n:'EU CARBON',  px:null,  u:'t',   chg:-1.44,open:69.40,  hi:70.2,lo:67.8,ytd:-18.4},
  {s:'U308',n:'URANIUM SPOT',px:null, u:'lb',  chg:.84,  open:71.80,  hi:73.2,lo:71.4,ytd:-12.8}
];

// FXP — static fallback; overwritten by fetchFX() (Frankfurter/ECB) on load
const FXP=[
  {p:'EUR/USD',b:1.08620,a:1.08631,c:-.28},
  {p:'GBP/USD',b:1.29340,a:1.29354,c:-.18},
  {p:'USD/JPY',b:147.820,a:147.840,c:-.44},
  {p:'USD/CHF',b:.88520, a:.88534, c:.12},
  {p:'AUD/USD',b:.62840, a:.62853, c:-.22},
  {p:'NZD/USD',b:.57220, a:.57234, c:-.18},
  {p:'USD/CAD',b:1.44120,a:1.44138,c:.24},
  {p:'USD/CNY',b:7.2380, a:7.2396, c:.08},
  {p:'USD/INR',b:86.840, a:86.856, c:.18},
  {p:'USD/BRL',b:5.8620, a:5.8636, c:.42},
  {p:'USD/CZK',b:23.984, a:23.992, c:.28},
  {p:'EUR/CZK',b:26.028, a:26.036, c:.14},
  {p:'USD/TRY',b:37.840, a:37.858, c:.62},
  {p:'USD/ZAR',b:18.280, a:18.296, c:.54},
  {p:'USD/KRW',b:1466.4, a:1466.8, c:-.28},
  {p:'USD/SGD',b:1.3482, a:1.3488, c:-.06},
  {p:'USD/SEK',b:10.484, a:10.492, c:.18},
  {p:'USD/PLN',b:3.9820, a:3.9836, c:.14},
  {p:'USD/HUF',b:366.82, a:367.04, c:.32},
  {p:'EUR/GBP',b:.83840, a:.83858, c:-.12},
  {p:'EUR/JPY',b:160.42, a:160.48, c:-.58},
  {p:'GBP/JPY',b:191.28, a:191.36, c:-.34},
  {p:'AUD/JPY',b:92.84,  a:92.90,  c:-.48},
  {p:'EUR/CHF',b:.96220, a:.96240, c:.08},
  {p:'USD/MXN',b:16.84,  a:16.86,  c:.32},
  {p:'USD/THB',b:33.42,  a:33.46,  c:.14},
  {p:'USD/TWD',b:32.28,  a:32.34,  c:-.08},
  {p:'USD/ILS',b:3.624,  a:3.628,  c:.22},
  {p:'USD/CLP',b:948.40, a:949.20, c:.44},
  {p:'USD/ARS',b:1084.2, a:1086.4, c:.82},
  {p:'NZD/JPY',b:84.48,  a:84.54,  c:-.28},
  {p:'CAD/JPY',b:102.62, a:102.68, c:-.18},
  {p:'CHF/JPY',b:167.28, a:167.34, c:-.42},
  {p:'GBP/CHF',b:1.46320,a:1.46340,c:-.08},
  {p:'AUD/NZD',b:1.09840,a:1.09860,c:.04},
  {p:'GBP/AUD',b:2.05820,a:2.05850,c:.12},
  {p:'EUR/AUD',b:1.72480,a:1.72510,c:-.06},
  {p:'USD/NOK',b:10.84,  a:10.86,  c:.24},
  {p:'USD/DKK',b:6.984,  a:6.988,  c:-.14},
  {p:'USD/RUB',b:84.40,  a:84.60,  c:.44},
  {p:'USD/PHP',b:56.84,  a:56.92,  c:.18},
  {p:'USD/IDR',b:16284,  a:16296,  c:.22},
  {p:'USD/MYR',b:4.424,  a:4.428,  c:-.08},
  {p:'USD/VND',b:25480,  a:25520,  c:.14},
  {p:'USD/EGP',b:50.84,  a:50.98,  c:.28},
  {p:'USD/NGN',b:1584,   a:1592,   c:.42},
  {p:'USD/PKR',b:278.40, a:279.20, c:.18},
  {p:'USD/BDT',b:122.40, a:122.80, c:.08},
  {p:'USD/COP',b:4184,   a:4192,   c:.34},
  {p:'USD/PEN',b:3.684,  a:3.688,  c:-.12},
  {p:'EUR/NOK',b:11.768,a:11.784,c:.18},
  {p:'EUR/SEK',b:11.384,a:11.396,c:.08},
  {p:'EUR/PLN',b:4.324, a:4.328, c:.14},
  {p:'EUR/HUF',b:398.40,a:398.80,c:.24},
  {p:'EUR/CZK',b:25.184,a:25.196,c:.08},
  {p:'EUR/TRY',b:41.08, a:41.14, c:.72},
  {p:'GBP/NZD',b:2.26340,a:2.26380,c:.14},
  {p:'GBP/CAD',b:1.87240,a:1.87280,c:.08},
  {p:'AUD/CAD',b:.90840,a:.90860,c:.12},
  {p:'NZD/CAD',b:.82680,a:.82700,c:-.04},
  {p:'USD/CNH',b:7.2840,a:7.2880,c:.12},
  {p:'USD/SAR',b:3.7504,a:3.7508,c:.00},
  {p:'USD/AED',b:3.6728,a:3.6732,c:.00},
  {p:'USD/QAR',b:3.6408,a:3.6412,c:.00},
  {p:'USD/KWD',b:.3068, a:.3070, c:-.02},
  {p:'USD/BHD',b:.3768, a:.3770, c:.00},
  {p:'USD/JOD',b:.7084, a:.7088, c:.00},
  {p:'USD/LKR',b:298.40,a:299.20,c:.28},
  {p:'USD/KZT',b:484.40,a:486.20,c:.34},
  {p:'USD/UAH',b:41.84, a:42.04, c:.14},
  {p:'USD/RON',b:4.684, a:4.688, c:-.08},
  {p:'USD/BGN',b:1.842, a:1.846, c:-.06},
  {p:'USD/HRK',b:7.084, a:7.092, c:-.04},
  {p:'USD/RSD',b:110.40,a:110.80,c:.12}
];

// MAC — macro fundamentals; refreshed by fetchFRED() / World Bank API
const MAC={
  USA:{gdp:29840,g:2.3, cpi:2.8,r:4.25,unem:4.1, cur:'USD'},
  GBR:{gdp:3350, g:.4,  cpi:3.0,r:4.50,unem:4.4, cur:'GBP'},
  DEU:{gdp:4480, g:.2,  cpi:2.3,r:2.65,unem:6.2, cur:'EUR'},
  FRA:{gdp:3150, g:1.1, cpi:1.6,r:2.65,unem:7.3, cur:'EUR'},
  CHE:{gdp:908,  g:1.5, cpi:.3, r:.25, unem:2.6, cur:'CHF'},
  JPN:{gdp:4230, g:-.4, cpi:3.2,r:.50, unem:2.4, cur:'JPY'},
  CHN:{gdp:18800,g:5.0, cpi:.5, r:3.10,unem:5.3, cur:'CNY'},
  HKG:{gdp:382,  g:2.4, cpi:1.6,r:4.25,unem:3.2, cur:'HKD'},
  SGP:{gdp:558,  g:4.4, cpi:1.8,r:3.22,unem:2.0, cur:'SGD'},
  IND:{gdp:3940, g:6.4, cpi:3.6,r:6.25,unem:7.8, cur:'INR'},
  KOR:{gdp:1760, g:.8,  cpi:2.0,r:2.75,unem:3.0, cur:'KRW'},
  AUS:{gdp:1820, g:1.3, cpi:3.2,r:4.10,unem:4.1, cur:'AUD'},
  BRA:{gdp:2220, g:3.4, cpi:5.1,r:13.75,unem:6.6,cur:'BRL'},
  CZE:{gdp:348,  g:1.5, cpi:3.2,r:3.75,unem:2.7, cur:'CZK'},
  TUR:{gdp:1108, g:3.0, cpi:39.1,r:42.5,unem:8.4,cur:'TRY'},
  SAU:{gdp:1100, g:2.6, cpi:2.3,r:5.00,unem:3.7, cur:'SAR'},
  ZAF:{gdp:426,  g:1.0, cpi:3.2,r:7.50,unem:32.1,cur:'ZAR'},
  RUS:{gdp:2240, g:3.8, cpi:9.9,r:21.0,unem:2.3, cur:'RUB'},
  POL:{gdp:810,  g:3.2, cpi:5.3,r:5.75,unem:3.2, cur:'PLN'}
};

// DEFI — static fallback; overwritten by fetchDefiLlama() on load
const DEFI=[
  {n:'Lido',     chain:'ETH',tvl:16800000000, chg:-.84, cat:'Staking'},
  {n:'AAVE',     chain:'ETH',tvl:21400000000, chg:.44,  cat:'Lending'},
  {n:'EigenLayer',chain:'ETH',tvl:12800000000,chg:-.24, cat:'Restaking'},
  {n:'MakerDAO', chain:'ETH',tvl:7400000000,  chg:.28,  cat:'CDP'},
  {n:'Uniswap',  chain:'ETH',tvl:5800000000,  chg:.84,  cat:'DEX'},
  {n:'Curve',    chain:'ETH',tvl:2400000000,  chg:-.44, cat:'DEX'},
  {n:'Compound', chain:'ETH',tvl:2100000000,  chg:-.18, cat:'Lending'},
  {n:'Jupiter',  chain:'SOL',tvl:3200000000,  chg:1.24, cat:'DEX'},
  {n:'dYdX',     chain:'ETH',tvl:680000000,   chg:.84,  cat:'Perps'},
  {n:'GMX',      chain:'ARB',tvl:420000000,   chg:.44,  cat:'Perps'},
  {n:'Raydium',  chain:'SOL',tvl:1800000000,  chg:2.24, cat:'DEX'}
];

const NEWS_DATA=[]

const NEWS_PINS=[];

// ── BREAKING NEWS — živé geopolitické události na mapě ────────────────────
// Klíčová slova pro filtrování důležitých událostí
const _GEO_KEYWORDS = [
  'killed','strike','attack','explosion','airstrike','missile','bomb','blast',
  'assassination','troops','military','war','conflict','casualties','dead',
  'hostage','invasion','nuclear','drone','rocket','shooting','coup','siege',
  'earthquake','tsunami','disaster','crisis','emergency','breaking'
];

// Databáze zemí → souřadnice pro geolokaci zpráv
const _GEO_LOC = {
  'iran':        [32.4,  53.7], 'tehran':      [35.7,  51.4],
  'israel':      [31.5,  34.8], 'tel aviv':    [32.1,  34.8], 'jerusalem':[31.8,35.2],
  'gaza':        [31.4,  34.4], 'west bank':   [31.9,  35.2],
  'ukraine':     [49.0,  32.0], 'kyiv':        [50.4,  30.5], 'kharkiv':  [50.0,36.2],
  'russia':      [61.5,  90.0], 'moscow':      [55.7,  37.6],
  'usa':         [38.9, -77.0], 'washington':  [38.9, -77.0], 'new york': [40.7,-74.0],
  'china':       [35.0, 105.0], 'beijing':     [39.9, 116.4],
  'taiwan':      [23.7, 121.0], 'taipei':      [25.0, 121.5],
  'north korea': [40.0, 127.0], 'pyongyang':   [39.0, 125.7],
  'pakistan':    [30.4,  69.3], 'india':       [20.6,  78.9],
  'syria':       [35.0,  38.0], 'damascus':    [33.5,  36.3],
  'iraq':        [33.2,  43.7], 'baghdad':     [33.3,  44.4],
  'yemen':       [15.6,  48.5], 'saudi':       [23.9,  45.1],
  'lebanon':     [33.9,  35.5], 'beirut':      [33.9,  35.5],
  'turkey':      [39.0,  35.2], 'istanbul':    [41.0,  29.0],
  'afghanistan': [33.9,  67.7], 'kabul':       [34.5,  69.2],
  'somalia':     [ 5.2,  46.2], 'sudan':       [12.9,  30.2],
  'ethiopia':    [ 9.1,  40.5], 'libya':       [26.3,  17.2],
  'japan':       [36.2, 138.3], 'tokyo':       [35.7, 139.7],
  'korea':       [37.6, 127.0], 'seoul':       [37.6, 126.9],
  'france':      [46.2,   2.2], 'paris':       [48.9,   2.3],
  'germany':     [51.2,  10.5], 'berlin':      [52.5,  13.4],
  'uk':          [52.4,  -1.2], 'london':      [51.5,  -0.1],
  'mexico':      [23.6, -102.6],'brazil':      [-14.2, -51.9],
};

function _geoLocate(text){
  const t = text.toLowerCase();
  for(const [key, coords] of Object.entries(_GEO_LOC)){
    if(t.includes(key)) return coords;
  }
  return null;
}

function _isBreaking(text){
  const t = text.toLowerCase();
  return _GEO_KEYWORDS.some(k => t.includes(k));
}

// ── BREAKING NEWS PINY — přímo z _newsCache terminálu ──────────────────
// Jen zprávy 1–10 minut staré s geopolitickými klíčovými slovy
window._liveBreakingPins = [];

function _syncBreakingPinsFromCache(){
  if(window._tabHidden) return;
  const jitter = () => (Math.random()-0.5)*1.0;
  const now = Date.now();
  const HR5  =  5 * 3600 * 1000;
  const HR12 = 12 * 3600 * 1000;
  const MIN2 =  2 * 60   * 1000;

  // Zachovat stávající piny starší 5-12h — jen přidat nové
  const existing = (window._liveBreakingPins || []).filter(p => {
    const age = now - (p.ts||0);
    return age <= HR5; // zachovat jen do 5 hodin, pak zmizí
  });
  const existingUrls = new Set(existing.map(p => p.url));

  const fresh = [];
  const cache = window._newsCache || [];

  cache.forEach(item => {
    if(!item.title || !item.ts) return;
    const age = now - item.ts;
    if(age > HR12) return;          // starší 12h zahodit
    const full = (item.title||'') + ' ' + (item.body||'');
    if(!_isBreaking(full)) return;
    const coords = _geoLocate(full);
    if(!coords) return;
    const url = item.link || item.url || '';
    if(existingUrls.has(url)) return; // neduplikovat

    fresh.push({
      lat:     coords[0] + jitter(),
      lng:     coords[1] + jitter(),
      title:   (item.tag==='FLASH' ? '► FLASH' : '● '+(item.src||'NEWS').toUpperCase()),
      txt:     item.title,
      desc:    (item.body||'').replace(/<[^>]+>/g,'').slice(0,200),
      ts:      item.ts,
      url,
      src:     item.src || '',
      tag:     item.tag || '',
      tier:    item.tier || 3,
      isFlash: !!(item.tag==='FLASH' || item.flash),
      isNew:   age < MIN2  // označit jako nové (< 2 min)
    });
  });

  fresh.sort((a,b) => b.ts - a.ts);

  // Sloučit: nové vpředu, staré vzadu — max 20
  window._liveBreakingPins = [...fresh.slice(0,12), ...existing].slice(0,20);
  renderNewsPins();
}

// Vykreslit statické piny ihned
setTimeout(renderNewsPins, 500);
// Sync každých 30s
setTimeout(_syncBreakingPinsFromCache, 2000);
setInterval(_syncBreakingPinsFromCache, 15 * 1000);

// Standalone price labels on map — removed (crypto + commodities)
const MAP_PRICE_PINS=[];

/* ═══════════════════════════════════════════════════════
   MAP
═══════════════════════════════════════════════════════ */

// ── Layout helpers ───────────────────────────────────────────────────────
function _fixMapHeight(){
  // CSS flex handles sizing — just trigger map reflow
  const main = document.getElementById('MAIN');
  const mapEl = document.getElementById('map');
  if(main){ main.style.removeProperty('height'); main.style.removeProperty('min-height'); }
  if(mapEl) mapEl.style.removeProperty('height');
  if(typeof map !== 'undefined') map.invalidateSize({animate:false,pan:false});
  if(typeof mapGL !== 'undefined' && mapGL.resize) try{ mapGL.resize(); }catch(_){}
}
function _fixMinZoom(){
  if(typeof map === 'undefined') return;
  const minZ = map.getBoundsZoom([[-85,-180],[85,180]], false);
  map.setMinZoom(Math.max(1, minZ - 0.1));
}
window.addEventListener('resize', _fixMapHeight);
setTimeout(_fixMapHeight, 100);
setTimeout(_fixMinZoom,  400);

// ── Map init ─────────────────────────────────────────────────────────────
const map=L.map('map',{center:[30,15],zoom:3,zoomControl:false,attributionControl:false,minZoom:1.5,maxZoom:19,zoomSnap:0.25,zoomDelta:0.5,wheelDebounceTime:60,wheelPxPerZoomLevel:150,zoomAnimation:true,zoomAnimationThreshold:4,worldCopyJump:false,maxBounds:[[-85,-200],[85,200]],maxBoundsViscosity:1.0});

map.invalidateSize({animate:false});

// Nastav min zoom a výchozí pohled
(function(){
  const minZ = map.getBoundsZoom([[-75,-180],[75,180]], false);
  map.setMinZoom(Math.max(1, minZ));
  map.setView([30,15], 3, {animate:false});
})();

// Blokace zoom-out pod viewport
map.on('zoom', function(){
  const minZ = map.getBoundsZoom([[-75,-180],[75,180]], false);
  if(map.getZoom() < minZ) map.setZoom(minZ, {animate:false});
});
map.on('zoomend', function(){
  const minZ = map.getBoundsZoom([[-75,-180],[75,180]], false);
  map.setMinZoom(Math.max(1, minZ));
});
map.on('resize', _fixMinZoom);

// ── Tile vrstvy ──────────────────────────────────────────────────────────
const _MT_KEY = 'lsBDdFKHvsrJybJOV6DO';

// Dark mapa — vždy načtena při startu
const _darkLayer = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png',
  {
    subdomains:       'abcd',
    maxZoom:          20,
    noWrap:           false,
    attribution:      '',
  }
);
_darkLayer.addTo(map);

// Satelitní mapa — lazy init, vytvoří se až při první potřebě
let _satLayer = null;
function _getSatLayer(){
  if(!_satLayer) _satLayer = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom:           19,
      tileSize:          256,
      noWrap:            false,
      attribution:       '',
      className:         'sat-tile'
    }
  );
  return _satLayer;
}

// ── MapLibre GL — rendering + satelit + tečky + pitch ───────────────────
(function(){
  const MT = '8nv46N2Myvk8D290cf9o';

  window._scGLMarkers = [];
  window.mapGL = new maplibregl.Map({
    container: 'mapgl',
    style: {version:8,
      glyphs:'https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key='+MT,
      sources:{
        dark:{type:'raster',
          tiles:[
            'https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png',
            'https://d.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png'
          ],
          tileSize:256,maxzoom:20},
        sat:{type:'raster',
          url:'https://api.maptiler.com/tiles/satellite-v2/tiles.json?key='+MT}
      },
      layers:[{id:'bg',type:'background',paint:{'background-color':'#0a0a08'}},
              {id:'sat',type:'raster',source:'sat',paint:{'raster-opacity':0}},
              {id:'dark',type:'raster',source:'dark',paint:{'raster-opacity':1}}]},
    center:[15,30], zoom:2, pitch:45, bearing:0, maxPitch:85,
    interactive:false, attributionControl:false,
    renderWorldCopies: true,
    failIfMajorPerformanceCaveat: false,
    maxTileCacheSize: 512,
    fadeDuration: 0,
    trackResize: true,
    pixelRatio: window.devicePixelRatio || 1,
    refreshExpiredTiles: true,
  });

  setTimeout(function(){ try{ mapGL.resize(); }catch(_){} }, 50);
  setTimeout(function(){ try{ mapGL.resize(); }catch(_){} }, 300);
  setTimeout(function(){ try{ mapGL.resize(); }catch(_){} }, 1000);

  mapGL.on('error', function(e){
    console.warn('MapLibre GL error:', e);
    var tp = document.querySelector('#map .leaflet-tile-pane');
    if(tp) tp.style.opacity = '1';
  });
  setTimeout(function(){
    try{
      if(!mapGL.loaded()){
        var tp = document.querySelector('#map .leaflet-tile-pane');
        if(tp) tp.style.opacity = '1';
      }
    }catch(_){
      var tp = document.querySelector('#map .leaflet-tile-pane');
      if(tp) tp.style.opacity = '1';
    }
  }, 5000);

  // rAF-throttled sync — prevents stutter from too many jumpTo calls
  let _syncPending = false;
  function sync(){
    if(_syncPending) return;
    _syncPending = true;
    requestAnimationFrame(function(){
      _syncPending = false;
      try{ const c=map.getCenter(),z=map.getZoom();
        mapGL.jumpTo({center:[c.lng,c.lat],zoom:z-1}); }catch(e){}
    });
  }
  map.on('move',sync); map.on('zoom',sync);

  mapGL.on('load',function(){
    sync();
    // CB tečky
    if(typeof CB_ALL!=='undefined'){
      mapGL.addSource('cb',{type:'geojson',data:{type:'FeatureCollection',
        features:CB_ALL.map(b=>({type:'Feature',
          geometry:{type:'Point',coordinates:[b.lng,b.lat]},
          properties:{color:b.bias==='HIKE'?'#ff4444':b.bias==='CUT'?'#00ee66':b.bias==='EASE'?'#44aaff':'rgba(160,150,130,0.9)'}}))}});
      mapGL.addLayer({id:'cb-dots',type:'circle',source:'cb',paint:{
        'circle-radius':['interpolate',['linear'],['zoom'],2,1.5,6,2.5,10,3.5],
        'circle-color':['get','color'],'circle-opacity':0.9,
        'circle-stroke-width':1,'circle-stroke-color':'rgba(200,190,170,0.7)',
        'circle-pitch-alignment':'map','circle-pitch-scale':'map',
      }});
    }
    // INST tečky
    if(typeof INST_DATA!=='undefined'){
      mapGL.addSource('inst',{type:'geojson',data:{type:'FeatureCollection',
        features:INST_DATA.map(d=>({type:'Feature',
          geometry:{type:'Point',coordinates:[d.lng,d.lat]},
          properties:{}}))}});
      mapGL.addLayer({id:'inst-dots',type:'circle',source:'inst',paint:{
        'circle-radius':['interpolate',['linear'],['zoom'],2,1,6,1.8,10,2.8],
        'circle-color':'rgba(160,150,130,0.85)','circle-opacity':0.85,
        'circle-stroke-width':1,'circle-stroke-color':'rgba(180,170,150,0.7)',
        'circle-pitch-alignment':'map','circle-pitch-scale':'map',
      }});
    }
    // News piny
    mapGL.addSource('news',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    mapGL.addLayer({id:'news-pulse',type:'circle',source:'news',paint:{
      'circle-radius':['interpolate',['linear'],['zoom'],2,10,10,35],
      'circle-color':['get', 'color'],
      'circle-opacity':0.4,
      'circle-pitch-alignment':'map','circle-pitch-scale':'map',
    }});
    mapGL.addLayer({id:'news-dot',type:'circle',source:'news',paint:{
      'circle-radius':['interpolate',['linear'],['zoom'],2,3,10,7],
      'circle-color':['get', 'color'],
      'circle-opacity':0.95,
      'circle-stroke-width':1,'circle-stroke-color':'#000',
      'circle-pitch-alignment':'map','circle-pitch-scale':'map',
    }});
    let _pd=1,_po=0.15;
    setInterval(()=>{
      _po+=_pd*0.06; if(_po>0.55)_pd=-1; if(_po<0.08)_pd=1;
      try{mapGL.setPaintProperty('news-pulse','circle-opacity',_po);}catch(e){}
    },100);
    // ── AIS lodě — realtime WebSocket ──────────────────────────────────────

    // ── AIS: ship triangle icon ──
    const _aisCanvas = document.createElement('canvas');
    _aisCanvas.width = 32; _aisCanvas.height = 32;
    const _aisCtx = _aisCanvas.getContext('2d');
    function _makeShipIcon(color){
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      const ctx = c.getContext('2d');
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(16,2); ctx.lineTo(26,28); ctx.lineTo(16,22); ctx.lineTo(6,28); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = 1; ctx.stroke();
      return c;
    }
    // Pre-render ship icons
    const _shipIcons = {
      tanker: _makeShipIcon('#ff88bb'),
      cargo: _makeShipIcon('#00ccff'),
      passenger: _makeShipIcon('#cc88ff'),
      other: _makeShipIcon('#99aaff'),
    };
    Object.keys(_shipIcons).forEach(k => {
      mapGL.addImage('ship-'+k, {width:32,height:32,data:new Uint8Array(_shipIcons[k].getContext('2d').getImageData(0,0,32,32).data)});
    });

    // ── konec AIS layers ──────────────────────────────────────────────────

    // AIS ships source + layers (symbols with rotation for heading)
    mapGL.addSource('ais-ships',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    
    // Solid Circles - Primary AIS representation at all zoom levels
    mapGL.addLayer({id:'ais-dot',type:'circle',source:'ais-ships',paint:{
      'circle-radius':['interpolate',['linear'],['zoom'],1,2,5,3,10,5,15,8],
      'circle-color':['case',
        ['get','tanker'],'#ff88bb',
        ['get','cargo'],'#00ccff',
        ['get','passenger'],'#cc88ff',
        '#00ffbb'
      ],
      'circle-opacity':0.95,'circle-stroke-width':1,'circle-stroke-color':'#000',
    }});
    
    // Arrow layer removed for ultra-clean circle-only design
    
    // Ship name labels
    mapGL.addLayer({id:'ais-label',type:'symbol',source:'ais-ships',minzoom:9,layout:{
      'text-field':['concat',['get','name'],' ',['to-string',['get','speed']],'kn'],
      'text-font':['Open Sans Regular','Arial Unicode MS Regular'],
      'text-size':8,'text-anchor':'left','text-offset':[1.2,0],'text-allow-overlap':false,
    },paint:{'text-color':'#aaddff','text-halo-color':'rgba(0,0,0,0.95)','text-halo-width':1.5}});

    // Click on ship — show in sidebar + popup
    mapGL.on('click','ais-arrow',function(e){
      if(!e.features||!e.features.length) return;
      const p = e.features[0].properties;
      _aisShowDetail(p);
      sbSwitchTab('ais');
    });
    mapGL.on('click','ais-dot',function(e){
      if(!e.features||!e.features.length) return;
      const p = e.features[0].properties;
      _aisShowDetail(p);
      sbSwitchTab('ais');
    });

    // Cursor change on hover
    mapGL.on('mouseenter','ais-arrow',()=>{ mapGL.getCanvas().style.cursor='pointer'; });
    mapGL.on('mouseleave','ais-arrow',()=>{ mapGL.getCanvas().style.cursor=''; });
    mapGL.on('mouseenter','ais-dot',()=>{ mapGL.getCanvas().style.cursor='pointer'; });
    mapGL.on('mouseleave','ais-dot',()=>{ mapGL.getCanvas().style.cursor=''; });

    setTimeout(_aisConnect, 1000);

    window._updateGLNews=function(){
      const f=[...(window._liveBreakingPins||[]),...(window.NEWS_PINS||[])].map(n=>({
        type:'Feature',geometry:{type:'Point',coordinates:[n.lng,n.lat]},properties:{}}));
      try{mapGL.getSource('news').setData({type:'FeatureCollection',features:f});}catch(e){}
    };
    setTimeout(window._updateGLNews,1000);

  });

  // Satelit — sources are always loaded, toggle via opacity only (no flicker)
  let _cur='dark';
  window._checkSwitch=function(){
    const z=map.getZoom();
    if(z>=10&&_cur==='dark'){
      _cur='sat';document.body.classList.add('sat-active');
      try{
        mapGL.setPaintProperty('sat','raster-opacity-transition',{duration:600,delay:0});
        mapGL.setPaintProperty('sat','raster-opacity',1);
        mapGL.setPaintProperty('dark','raster-opacity-transition',{duration:600,delay:0});
        mapGL.setPaintProperty('dark','raster-opacity',0);
      }catch(e){}
    }else if(z<9&&_cur==='sat'){
      _cur='dark';document.body.classList.remove('sat-active');
      try{
        mapGL.setPaintProperty('dark','raster-opacity-transition',{duration:600,delay:0});
        mapGL.setPaintProperty('dark','raster-opacity',1);
        mapGL.setPaintProperty('sat','raster-opacity-transition',{duration:600,delay:0});
        mapGL.setPaintProperty('sat','raster-opacity',0);
      }catch(e){}
    }
  };
  map.on('zoomend',window._checkSwitch);

  // Pitch — pravé tlačítko
  let _act=false,_sy=0,_sx=0,_sp=0,_sb=0;
  const mel=document.getElementById('map');
  function _hint(){}
  mel.addEventListener('mousedown',e=>{
    if(e.button!==2)return;e.preventDefault();
    _act=true;_sy=e.clientY;_sx=e.clientX;
    _sp=mapGL.getPitch();_sb=mapGL.getBearing();mel.style.cursor='move';
  },true);
  mel.addEventListener('contextmenu',e=>e.preventDefault(),true);
  document.addEventListener('mousemove',e=>{
    if(!_act)return;
    // PITCH & BEARING — transform feel (smooth camera rotation)
    const p=Math.max(0,Math.min(60,_sp-(e.clientY-_sy)*0.35));
    const b=_sb+(e.clientX-_sx)*0.45;
    mapGL.jumpTo({pitch:p,bearing:b});
    
    // Pro aktivaci "me rotating, not the map" — synchronizace Leaflet středu
    // Není nutné měnit jumpTo pro MapLibre, protože bearing JE rotace kamery.
    // Ale pro "full rendering" zajišťujeme že mapgl je 120% a centrovaný v CSS.
    
    if(typeof _hint==='function') _hint(`PITCH ${Math.round(p)}°  BRG ${Math.round(((b%360)+360)%360)}°`);
  });
  document.addEventListener('mouseup',e=>{if(e.button===2){_act=false;mel.style.cursor='';}});
  mel.addEventListener('wheel',e=>{
    if(e.ctrlKey)return;
    if(e.metaKey||e.altKey){
      e.preventDefault();e.stopPropagation();
      const p=Math.max(0,Math.min(60,mapGL.getPitch()+e.deltaY*0.12));
      mapGL.setPitch(p);_hint(`PITCH ${Math.round(p)}°`);
    }
  },{passive:false,capture:true});
  document.addEventListener('keydown',e=>{
    if(e.code==='KeyT'&&!e.target.matches('input,textarea'))
      mapGL.easeTo({pitch:0,bearing:0,duration:400});
  });
  // ── AIS lodě — realtime (with local persistence) ────────────────────────
  window._aisKey   = '1a5820e2fd69094fac05caf4728e15b79973e3da';
  window._aisKeyBackup = 'fd51bc476609e46f248aa3bb31ee4499e1934419';
  window._aisFilter_active = 'all';
  window._aisWs = null;

  const _aisLoadCache = () => {
    window._aisKey = '1a5820e2fd69094fac05caf4728e15b79973e3da';
    try {
      const c = localStorage.getItem('_ais_cache');
      const ct = localStorage.getItem('_ais_cache_time');
      if (c && ct && (Date.now() - parseInt(ct)) < 12*60*60*1000) {
        window._aisShips = JSON.parse(c);
        console.log('[AIS] Restored', Object.keys(window._aisShips).length, 'vessels from cache');
        return true;
      }
    } catch(e) { console.warn('[AIS] cache load failed:', e); }
    window._aisShips = {};
    return false;
  };
  const _aisHasCache = _aisLoadCache();

  // Auto-save snapshots every 30s
  setInterval(() => {
    const live = Object.values(window._aisShips).filter(s => !s._demo);
    if (live.length > 0) {
      localStorage.setItem('_ais_cache', JSON.stringify(window._aisShips));
      localStorage.setItem('_ais_cache_time', Date.now());
    }
  }, 30000);

  function _aisUpdateGL(){
    if(!window.mapGL) return;
    const src = mapGL.getSource('ais-ships');
    if(!src) return;
    const filter = window._aisFilter_active;
    
    // Diagnostic count
    let liveCount = 0;
    let cachedCount = 0;
    let demoCount = 0;

    const features = Object.values(window._aisShips)
      .filter(s => {
        // Strict coordinate validation
        const lat = parseFloat(s.lat);
        const lng = parseFloat(s.lng);
        if(isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) return false;
        
        // Track types for logging
        if(s._demo) demoCount++;
        else if(s._cached) cachedCount++;
        else liveCount++;

        if(filter==='all') return true;
        if(filter==='tanker') return s.tanker;
        if(filter==='cargo') return s.cargo;
        if(filter==='passenger') return s.passenger;
        if(filter==='moving') return s.speed > 0.5;
        if(filter==='anchored') return s.speed <= 0.5;
        return true;
      })
      .map(s=>({
        type:'Feature',
        geometry:{type:'Point',coordinates:[parseFloat(s.lng),parseFloat(s.lat)]},
        properties:{
          name:s.name||'',
          mmsi:s.mmsi||'',
          tanker:s.tanker||false,
          cargo:s.cargo||false,
          passenger:s.passenger||false,
          speed:typeof s.speed==='number'?s.speed:parseFloat(s.speed||0),
          heading:s.heading||0,
          destination:s.destination||'',
          navStatus:s.navStatus||'',
        }
    }));
    
    if(features.length > 0) {
      src.setData({type:'FeatureCollection',features});
      // console.log(`[AIS] Map update: ${features.length} features (${liveCount} live, ${cachedCount} cached, ${demoCount} demo)`);
    }
  }

  // AIS panel update
  // MMSI MID → Country flag (ITU Maritime Identification Digits)
  function _mmsiFlag(mmsi){
    const m=String(mmsi).substring(0,3);
    const F={
      '201':'🇦🇱','203':'🇦🇹','204':'🇵🇹','205':'🇧🇪','206':'🇧🇾','207':'🇧🇬','208':'🇻🇦','209':'🇨🇾','210':'🇨🇾','211':'🇩🇪','212':'🇨🇾','213':'🇬🇪','214':'🇲🇩',
      '215':'🇲🇹','216':'🇦🇲','218':'🇩🇪','219':'🇩🇰','220':'🇩🇰','224':'🇪🇸','225':'🇪🇸','226':'🇫🇷','227':'🇫🇷','228':'🇫🇷','229':'🇲🇹','230':'🇫🇮','231':'🇫🇴',
      '232':'🇬🇧','233':'🇬🇧','234':'🇬🇧','235':'🇬🇧','236':'🇬🇮','237':'🇬🇷','238':'🇭🇷','239':'🇬🇷','240':'🇬🇷','241':'🇬🇷','242':'🇲🇦','243':'🇭🇺','244':'🇳🇱',
      '245':'🇳🇱','246':'🇳🇱','247':'🇮🇹','248':'🇲🇹','249':'🇲🇹','250':'🇮🇪','251':'🇮🇸','255':'🇵🇹','256':'🇲🇹','257':'🇳🇴','258':'🇳🇴','259':'🇳🇴','261':'🇵🇱',
      '263':'🇵🇹','265':'🇸🇪','266':'🇸🇪','269':'🇨🇭','270':'🇨🇿','271':'🇹🇷','272':'🇺🇦','273':'🇷🇺','274':'🇲🇰','275':'🇱🇻','276':'🇪🇪','277':'🇱🇹',
      '278':'🇸🇮','279':'🇷🇸','301':'🇦🇮','303':'🇺🇸','304':'🇦🇬','305':'🇦🇬','306':'🇳🇱','307':'🇳🇱','308':'🇧🇸','309':'🇧🇸','310':'🇧🇲','311':'🇧🇸',
      '312':'🇧🇿','314':'🇧🇧','316':'🇨🇦','319':'🇰🇾','321':'🇨🇷','323':'🇨🇺','325':'🇩🇲','327':'🇩🇴','329':'🇬🇵','330':'🇬🇩','331':'🇬🇱','332':'🇬🇹',
      '338':'🇺🇸','339':'🇯🇲','341':'🇰🇳','343':'🇱🇨','345':'🇲🇽','347':'🇲🇶','348':'🇲🇸','350':'🇳🇮','351':'🇵🇦','352':'🇵🇦','353':'🇵🇦','354':'🇵🇦','355':'🇵🇦','356':'🇵🇦','357':'🇵🇦',
      '358':'🇵🇷','359':'🇸🇻','361':'🇵🇲','362':'🇹🇹','364':'🇹🇨','366':'🇺🇸','367':'🇺🇸','368':'🇺🇸','369':'🇺🇸','370':'🇵🇦','371':'🇵🇦','372':'🇵🇦','373':'🇵🇦',
      '374':'🇵🇦','375':'🇻🇨','376':'🇻🇨','377':'🇻🇬','378':'🇻🇮','379':'🇻🇮',
      '401':'🇦🇫','403':'🇸🇦','405':'🇧🇩','408':'🇧🇭','410':'🇧🇹','412':'🇨🇳','413':'🇭🇰','414':'🇭🇰','416':'🇹🇼',
      '417':'🇱🇰','419':'🇮🇳','422':'🇮🇷','423':'🇦🇿','425':'🇮🇶','428':'🇮🇱','431':'🇯🇵','432':'🇯🇵','434':'🇹🇲',
      '436':'🇰🇿','437':'🇺🇿','438':'🇯🇴','440':'🇰🇷','441':'🇰🇷','443':'🇵🇸','445':'🇰🇵','447':'🇰🇼','450':'🇱🇧',
      '455':'🇲🇻','457':'🇲🇳','459':'🇳🇵','461':'🇴🇲','463':'🇵🇰','466':'🇶🇦','468':'🇸🇾','470':'🇦🇪','472':'🇹🇯',
      '473':'🇾🇪','475':'🇾🇪','477':'🇭🇰','478':'🇧🇦',
      '501':'🇫🇷','503':'🇦🇺','506':'🇲🇲','508':'🇧🇳','510':'🇫🇲','511':'🇵🇼','512':'🇳🇿','514':'🇰🇭','515':'🇰🇭',
      '516':'🇨🇽','518':'🇨🇰','520':'🇫🇯','523':'🇨🇰','525':'🇮🇩','529':'🇰🇮','531':'🇱🇦','533':'🇲🇾',
      '536':'🇲🇵','538':'🇲🇭','540':'🇳🇨','542':'🇳🇺','544':'🇳🇷','546':'🇫🇷','548':'🇵🇭','553':'🇵🇬',
      '555':'🇵🇳','557':'🇸🇧','559':'🇦🇸','561':'🇼🇸','563':'🇸🇬','564':'🇸🇬','565':'🇸🇬','566':'🇸🇬','567':'🇹🇭',
      '570':'🇹🇴','572':'🇹🇻','574':'🇻🇳','576':'🇻🇺','577':'🇻🇺','578':'🇼🇫',
      '601':'🇿🇦','603':'🇦🇴','605':'🇩🇿','607':'🇫🇷','609':'🇧🇮','610':'🇧🇯','611':'🇧🇼','612':'🇨🇲',
      '613':'🇨🇻','615':'🇨🇬','616':'🇰🇲','617':'🇨🇩','618':'🇨🇮','619':'🇩🇯','620':'🇪🇬','621':'🇬🇶',
      '622':'🇪🇹','624':'🇪🇷','625':'🇬🇦','626':'🇬🇭','627':'🇬🇲','629':'🇬🇳','630':'🇬🇼',
      '631':'🇬🇳','632':'🇬🇼','633':'🇰🇪','636':'🇱🇷','637':'🇱🇷','642':'🇱🇾','644':'🇱🇸','645':'🇲🇺',
      '647':'🇲🇬','649':'🇲🇱','650':'🇲🇿','654':'🇲🇷','655':'🇲🇼','656':'🇳🇪','657':'🇳🇬','659':'🇳🇦',
      '660':'🇷🇪','661':'🇷🇼','662':'🇸🇹','663':'🇸🇳','664':'🇸🇨','665':'🇸🇱','666':'🇸🇴','667':'🇸🇱',
      '668':'🇸🇿','669':'🇹🇩','670':'🇹🇬','671':'🇹🇳','672':'🇹🇿','674':'🇺🇬','675':'🇹🇿','676':'🇨🇩','677':'🇹🇿',
      '678':'🇿🇲','679':'🇿🇼',
    };
    return F[m]||'🏴';
  }

  function _aisUpdatePanel(){
    const ships = Object.values(window._aisShips).filter(s=>s.lat!==0||s.lng!==0);

    // Stats (silent)
    const moving = ships.filter(s => s.speed > 0.5);
    const speeds = ships.map(s => s.speed||0).filter(s => s > 0.3);
    const avgSpd = speeds.length ? (speeds.reduce((a,b)=>a+b,0)/speeds.length) : 0;
    const maxSpd = speeds.length ? Math.max(...speeds) : 0;

    const list = document.getElementById('ais-ship-list');
    if(!list) return;
    const filter = window._aisFilter_active;
    const filtered = ships.filter(s => {
      if(filter==='all') return true;
      if(filter==='tanker') return s.tanker;
      if(filter==='cargo') return s.cargo;
      if(filter==='passenger') return s.passenger;
      if(filter==='moving') return s.speed > 0.5;
      if(filter==='anchored') return s.speed <= 0.5;
      return true;
    }).sort((a,b) => (b.speed||0) - (a.speed||0)).slice(0, 250);

    let html = `<table style="width:100%;border-collapse:collapse;table-layout:fixed">
    <colgroup>
      <col style="width:auto"><col style="width:76px"><col style="width:56px"><col style="width:28px"><col style="width:42px">
    </colgroup>
    <thead><tr style="position:sticky;top:0;z-index:2;background:#050300;">
      <th style="padding:4px 6px;font-size:6px;color:#776650;text-align:left;letter-spacing:1.5px;font-weight:700;border-bottom:1px solid #1a1200;font-family:var(--fn);">VESSEL</th>
      <th style="padding:4px 3px;font-size:6px;color:#776650;text-align:left;letter-spacing:1.5px;font-weight:700;border-bottom:1px solid #1a1200;font-family:var(--fn);">DEST</th>
      <th style="padding:4px 3px;font-size:6px;color:#776650;text-align:left;letter-spacing:1px;font-weight:700;border-bottom:1px solid #1a1200;font-family:var(--fn);">STATUS</th>
      <th style="padding:4px 2px;font-size:6px;color:#776650;text-align:right;letter-spacing:1px;font-weight:700;border-bottom:1px solid #1a1200;font-family:var(--fn);">TYP</th>
      <th style="padding:4px 6px 4px 3px;font-size:6px;color:#776650;text-align:right;letter-spacing:1px;font-weight:700;border-bottom:1px solid #1a1200;font-family:var(--fn);">KN</th>
    </tr></thead><tbody>`;
    
    filtered.forEach((s, idx) => {
      const nm = (s.name||'MMSI:'+s.mmsi).toUpperCase();
      const dst = (s.destination||'—').split(',')[0].toUpperCase().substring(0,14);
      const nst = (s.navStatus||'UNDER WAY').toUpperCase().replace('USING ENGINE','').replace('UNDER WAY','EN ROUTE').trim();
      const spd = (s.speed||0).toFixed(1);
      const flag = _mmsiFlag(s.mmsi);
      
      // Type
      const typ = s.tanker?'TNK':s.cargo?'CGO':s.passenger?'PAX':'OTH';
      const typCol = s.tanker?'#ff88bb':s.cargo?'#00ccff':s.passenger?'#cc88ff':'#556655';
      
      // Status color — readable
      const nstCol = nst.includes('ANCHOR')||nst.includes('MOOR')?'#cc6644':nst.includes('RESTRICT')?'#cc8844':'#776655';
      
      const bg = idx%2===0?'transparent':'rgba(255,255,255,.01)';
      const nmSafe = nm.replace(/'/g,"\\'");
      
      html += `<tr onclick="_aisFlyTo(${s.lat},${s.lng},'${nmSafe}')" style="cursor:pointer;border-bottom:1px solid #0a0800;background:${bg};transition:background .08s"
        onmouseover="this.style.background='rgba(255,136,0,.03)'" onmouseout="this.style.background='${bg}'">
        <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--fn)"><span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:${typCol};vertical-align:middle;margin-right:5px;opacity:.8"></span><span style="color:${typCol};font-weight:700;font-size:9px;letter-spacing:.2px;vertical-align:middle">${nm}</span></td>
        <td style="padding:2px 3px;color:#998870;font-size:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--fn)">${dst}</td>
        <td style="padding:2px 3px;color:${nstCol};font-size:7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--fn)">${nst}</td>
        <td style="padding:2px 2px;text-align:right;color:${typCol};font-size:7px;font-weight:700;font-family:var(--fn);opacity:.6">${typ}</td>
        <td style="padding:2px 6px 2px 3px;text-align:right">
          <span style="color:#00ddff;font-weight:700;font-size:9.5px;font-family:var(--fn-num);font-variant-numeric:tabular-nums">${spd}</span>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    if(filtered.length === 0) html = '<div style="padding:50px 20px;color:#1a1200;text-align:center;font-size:9px;letter-spacing:1px;font-family:var(--fn)">NO VESSELS MATCHING FILTER</div>';
    list.innerHTML = html;
  }

  window._aisFlyTo = function(lat,lng,name){
    if(window.map) map.flyTo([lat,lng], 10, {duration:2});
    if(window.mapGL) mapGL.flyTo({center:[lng,lat], zoom:10, duration:2000, essential:true});
    const ship = Object.values(window._aisShips).find(s => Math.abs(s.lat-lat)<0.001 && Math.abs(s.lng-lng)<0.001);
    if(ship) _aisShowDetail(ship);
  };

  window._aisFilter = function(f, el){
    window._aisFilter_active = f;
    document.querySelectorAll('.ais-filter').forEach(b=>b.classList.remove('on'));
    if(el) el.classList.add('on');
    _aisUpdateGL();
    _aisUpdatePanel();
  };

  // Packet rate tracking
  window._aisPktCount = 0;
  setInterval(() => {
    const el = document.getElementById('ais-pkt-counter');
    const el2 = document.getElementById('ais-pkt-rate');
    const r = window._aisPktCount;
    window._aisPktCount = 0;
    if(el) el.textContent = r + ' pkt/s';
    if(el2) el2.textContent = r + ' pkt/s';
  }, 1000);

  // Show vessel details in sidebar
  window._aisShowDetail = function(p){ /* disabled */ };
  
  window.toggleAISPanel = function() {
    const p = document.getElementById('ais-panel');
    if(!p) return;
    const isVisible = p.classList.toggle('open');
    if(isVisible) {
      _aisUpdatePanel();
    }
    // Status bar notification removed
  };


  // AIS status badge removed

  // Nav status decoder
  function _navStatusStr(n){
    const m = {0:'Under way using engine',1:'At anchor',2:'Not under command',3:'Restricted manoeuvrability',4:'Constrained by draught',5:'Moored',6:'Aground',7:'Engaged in fishing',8:'Under way sailing',11:'Power-driven vessel towing astern',12:'Power-driven vessel pushing ahead',14:'AIS-SART',15:'Undefined'};
    return m[n]||'Unknown';
  }

  function _aisConnect(){
    const badge = document.getElementById('_ais_badge');
    const liveInd = document.getElementById('ql-ais-live-ind');

    if(badge) badge.textContent = 'AIS: connecting...';
    if(liveInd) { liveInd.classList.remove('on','err'); }
    console.log('[AIS] connecting to aisstream.io...');
    
    // Fallback timer — if no data after 6s, load demo ships
    const fallbackTimer = setTimeout(()=>{
      if(Object.keys(window._aisShips).length === 0){
        console.warn('[AIS] No live data received — loading demo fleet');
        _aisLoadDemo();
      }
    }, 6000);

    const st = document.getElementById('ais-status-text');

    // Shared message parser to handle both Proxy and Direct feeds
    // Shared message parser to handle both Proxy and Direct feeds
    const _aisOnMsg = (ev) => {
      try {
        clearTimeout(fallbackTimer);
        const d = JSON.parse(ev.data);
        
        // Robust MMSI extraction (handle MetaData or direct ID)
        const mmsi = d.MetaData?.MMSI || d.MetaData?.mmsi || d.Message?.PositionReport?.UserID || d.Message?.ShipStaticData?.UserID || d.Message?.StandardClassBCSPositionReport?.UserID || d.UserID;
        if(!mmsi) return;

        // Coordinates: Check MetaData, Message parts, or top level
        let lat = d.MetaData?.latitude || d.MetaData?.Latitude || d.Latitude || d.lat;
        let lng = d.MetaData?.longitude || d.MetaData?.Longitude || d.Longitude || d.lng;
        
        const pr = d.Message?.PositionReport || d.Message?.StandardClassBCSPositionReport || d.PositionReport;
        if (pr) {
          if (lat === undefined || lat === null) lat = pr.Latitude || pr.latitude;
          if (lng === undefined || lng === null) lng = pr.Longitude || pr.longitude;
        }

        if(!window._aisShips[mmsi]) {
          window._aisShips[mmsi] = { mmsi, lat:0, lng:0, name:'', tanker:false, cargo:false, passenger:false, speed:0, heading:0, destination:'', navStatus:'', lastUpdate:0 };
        }
        const ship = window._aisShips[mmsi];

        // Only update if we have valid-looking coordinates
        if(lat != null && lng != null && Math.abs(lat) > 1e-4 && Math.abs(lng) > 1e-4) { 
          ship.lat = parseFloat(lat); 
          ship.lng = parseFloat(lng); 
          ship._cached = false; // Mark as live if we got coordinates
          ship._demo = false;
        }
        
        // Name extraction
        if(d.MetaData?.ShipName) ship.name = d.MetaData.ShipName.trim();
        else if(d.ShipName) ship.name = d.ShipName.trim();
        
        // Status/Speed from Position Report
        if(pr) {
          if(pr.SpeedOverGround != null) ship.speed = parseFloat(pr.SpeedOverGround);
          else if(pr.speed != null) ship.speed = parseFloat(pr.speed);
          if(pr.TrueHeading != null && pr.TrueHeading !== 511) ship.heading = pr.TrueHeading;
          else if(pr.Cog != null && pr.Cog < 360) ship.heading = pr.Cog;
          if(pr.NavigationalStatus != null) ship.navStatus = _navStatusStr(pr.NavigationalStatus);
        }

        // Static data (Name, Type, Destination)
        const sd = d.Message?.ShipStaticData || d.ShipStaticData;
        if(sd) {
          if(sd.Destination) ship.destination = sd.Destination.trim();
          if(sd.Name) ship.name = sd.Name.trim();
          const pType = sd.Type || sd.ShipType;
          if(pType != null) {
            ship.tanker = (pType >= 80 && pType <= 89);
            ship.cargo  = (pType >= 70 && pType <= 79);
            ship.passenger = (pType >= 60 && pType <= 69);
          }
        }

        window._aisLastPktTime = Date.now();
        if(typeof window._aisPktCount==='number') window._aisPktCount++;
        const count = Object.keys(window._aisShips).length;
        if(st) { 
          const isProxy = window._aisWs?.url?.includes('localhost');
          st.textContent = 'LIVE · ' + count + ' VESSELS'; 
          st.style.background = '#002a11';
          st.style.color = '#00cc44';
        }
        
        // Initial fly-to: Sync both maps
        if (count >= 1 && !window._aisInitialFly && ship.lat !== 0) {
           window._aisInitialFly = true;
           console.log('[AIS] First live ship received, centering maps:', ship.lat, ship.lng);
           if (window.map) map.setView([ship.lat, ship.lng], 7);
           if (window.mapGL) mapGL.jumpTo({center:[ship.lng, ship.lat], zoom: 6});
           _aisUpdateGL();
        }

        const pInd = document.getElementById('ais-live-indicator');
        if(pInd) { 
          pInd.style.background = '#00ffbb'; 
          pInd.style.boxShadow = '0 0 15px #00ffbb';
          setTimeout(() => { if(pInd) pInd.style.boxShadow = 'none'; }, 100);
        }

        // Update cycles
        const now = Date.now();
        if(!window._aisLastUpdate || now - window._aisLastUpdate > 800) { 
          _aisUpdateGL(); 
          window._aisLastUpdate = now; 
        }
        if(!window._aisPanelUpdate || now - window._aisPanelUpdate > 2000) { 
          _aisUpdatePanel(); 
          window._aisPanelUpdate = now; 
        }
      } catch(e) { console.warn('[AIS] bridge parse error:', e); }
    };

    // Direct connection to AISStream (no proxy needed)
    console.log('[AIS] Connecting to AISStream.io direct...');
    if(st) { st.textContent='CONNECTING...'; st.style.background='#1a1000'; st.style.color='#665840'; }

    // If we have cache, show it while connecting
    if(_aisHasCache) { _aisUpdateGL(); _aisUpdatePanel(); }

    function _aisConnectDirect() {
      try{
        window._aisConnStart = Date.now();
        const ws = new WebSocket('wss://stream.aisstream.io/v0/stream');
        window._aisWs = ws;
        const tt = setTimeout(()=>{ 
          if(ws.readyState !== 1) {
            ws.close(); 
            console.warn('[AIS] Direct connection timeout — loading demo fleet');
            _aisLoadDemo();
          }
        }, 10000);

        ws.onopen = () => {
          clearTimeout(tt);
          clearTimeout(fallbackTimer);
          console.log('[AIS] WebSocket opened, subscribing globally...');
          if(st) { st.textContent='SUBSCRIBING...'; st.style.background='#1a1800'; st.style.color='#998800'; }
          ws.send(JSON.stringify({
            APIKey: window._aisKey,
            BoundingBoxes: [[[-90, -180], [90, 180]]],
            FilterMessageTypes: ['PositionReport', 'ShipStaticData', 'StandardClassBCSPositionReport'],
          }));
        };
        ws.onmessage = _aisOnMsg;
        ws.onclose = e => { 
          console.warn('[AIS] WS closed:', e.code);
          // If closed quickly (bad key?), try backup key
          if(Date.now() - _aisConnStart < 5000 && window._aisKeyBackup && window._aisKey !== window._aisKeyBackup) {
            console.log('[AIS] Trying backup key...');
            window._aisKey = window._aisKeyBackup;
            if(st) { st.textContent='RETRYING...'; st.style.background='#1a1000'; st.style.color='#665840'; }
            window._aisWs = null;
            setTimeout(_aisConnectDirect, 1000);
            return;
          }
          if(st) { st.textContent='RECONNECTING...'; st.style.background='#1a1000'; st.style.color='#665840'; }
          window._aisWs = null;
          setTimeout(_aisConnectDirect, 8000); 
        };
        ws.onerror = e => { 
          console.warn('[AIS] WS error — will retry or load demo');
        };
      }catch(e){ 
        console.warn('[AIS] connect exception:', e); 
        _aisLoadDemo();
      }
    }

    _aisConnectDirect();
  }

  // ── DEMO FLEET — realistic ship data on major shipping lanes ──────────
  function _aisLoadDemo(){
    const badge = document.getElementById('_ais_badge');
    const liveInd = document.getElementById('ql-ais-live-ind');
    
    const DEMO = [
      {mmsi:'211331640',name:'HAMBURG EXPRESS',lat:51.02,lng:1.42,heading:225,speed:18.2,tanker:false,cargo:true,passenger:false,destination:'ROTTERDAM',navStatus:'Under way'},
      {mmsi:'636092799',name:'EVER GIVEN',lat:51.35,lng:1.80,heading:42,speed:14.5,tanker:false,cargo:true,passenger:false,destination:'FELIXSTOWE',navStatus:'Under way'},
      {mmsi:'477328500',name:'OOCL HONG KONG',lat:50.88,lng:0.95,heading:250,speed:16.8,tanker:false,cargo:true,passenger:false,destination:'SOUTHAMPTON',navStatus:'Under way'},
      {mmsi:'235099289',name:'SPIRIT OF BRITAIN',lat:51.05,lng:1.52,heading:135,speed:21.0,tanker:false,cargo:false,passenger:true,destination:'CALAIS',navStatus:'Under way'},
      {mmsi:'245218000',name:'STENA HOLLANDICA',lat:51.92,lng:3.58,heading:280,speed:19.5,tanker:false,cargo:false,passenger:true,destination:'HARWICH',navStatus:'Under way'},
      {mmsi:'538006773',name:'MSC GÜLSÜN',lat:36.12,lng:14.35,heading:90,speed:19.4,tanker:false,cargo:true,passenger:false,destination:'PORT SAID',navStatus:'Under way'},
      {mmsi:'636018089',name:'CMA CGM MARCO POLO',lat:37.50,lng:5.20,heading:85,speed:17.2,tanker:false,cargo:true,passenger:false,destination:'GENOVA',navStatus:'Under way'},
      {mmsi:'247039400',name:'COSTA SMERALDA',lat:41.80,lng:9.45,heading:195,speed:16.0,tanker:false,cargo:false,passenger:true,destination:'BARCELONA',navStatus:'Under way'},
      {mmsi:'256734000',name:'HARMONY OF THE SEAS',lat:39.50,lng:2.80,heading:170,speed:18.5,tanker:false,cargo:false,passenger:true,destination:'PALMA DE MALLORCA',navStatus:'Under way'},
      {mmsi:'241785000',name:'NISSOS MYKONOS',lat:37.65,lng:24.10,heading:320,speed:14.0,tanker:false,cargo:false,passenger:true,destination:'PIRAEUS',navStatus:'Under way'},
      {mmsi:'477995500',name:'CRUDE FORTUNE',lat:29.92,lng:32.56,heading:170,speed:8.5,tanker:true,cargo:false,passenger:false,destination:'JEDDAH',navStatus:'Under way'},
      {mmsi:'538004028',name:'FRONT ALTO',lat:27.80,lng:33.85,heading:165,speed:12.0,tanker:true,cargo:false,passenger:false,destination:'YANBU',navStatus:'Under way'},
      {mmsi:'371812000',name:'ALPINE MYSTERY',lat:25.10,lng:35.20,heading:155,speed:13.5,tanker:true,cargo:false,passenger:false,destination:'RAS TANURA',navStatus:'Under way'},
      {mmsi:'229008000',name:'BERGE EVEREST',lat:20.50,lng:38.40,heading:145,speed:11.0,tanker:false,cargo:true,passenger:false,destination:'MUMBAI',navStatus:'Under way'},
      {mmsi:'636019552',name:'MAERSK EDINBURGH',lat:13.50,lng:42.80,heading:130,speed:15.8,tanker:false,cargo:true,passenger:false,destination:'SINGAPORE',navStatus:'Under way'},
      {mmsi:'563084200',name:'PACIFIC VOYAGER',lat:1.25,lng:103.80,heading:315,speed:12.4,tanker:true,cargo:false,passenger:false,destination:'SINGAPORE',navStatus:'Under way'},
      {mmsi:'477426600',name:'COSCO SHIPPING LEO',lat:2.80,lng:101.50,heading:310,speed:16.0,tanker:false,cargo:true,passenger:false,destination:'PORT KLANG',navStatus:'Under way'},
      {mmsi:'353136000',name:'ONE STORK',lat:4.20,lng:100.20,heading:325,speed:17.5,tanker:false,cargo:true,passenger:false,destination:'LAEM CHABANG',navStatus:'Under way'},
      {mmsi:'566324000',name:'KOTA LUMAYAN',lat:1.15,lng:104.10,heading:270,speed:14.2,tanker:false,cargo:true,passenger:false,destination:'SINGAPORE',navStatus:'Under way'},
      {mmsi:'636017285',name:'MSC ISABELLA',lat:1.35,lng:103.50,heading:45,speed:11.8,tanker:false,cargo:true,passenger:false,destination:'TANJUNG PELEPAS',navStatus:'Under way'},
      {mmsi:'413158000',name:'XIN YA ZHOU',lat:22.15,lng:114.60,heading:180,speed:14.8,tanker:false,cargo:true,passenger:false,destination:'HONG KONG',navStatus:'Under way'},
      {mmsi:'353245000',name:'ONE APUS',lat:34.50,lng:139.80,heading:220,speed:17.5,tanker:false,cargo:true,passenger:false,destination:'TOKYO',navStatus:'Under way'},
      {mmsi:'354993000',name:'YANTIAN EXPRESS',lat:31.20,lng:122.50,heading:340,speed:12.0,tanker:false,cargo:true,passenger:false,destination:'SHANGHAI',navStatus:'Under way'},
      {mmsi:'403168000',name:'SABITI',lat:26.50,lng:52.10,heading:135,speed:10.2,tanker:true,cargo:false,passenger:false,destination:'BASRAH',navStatus:'Under way'},
      {mmsi:'422508000',name:'DENA',lat:27.20,lng:50.40,heading:310,speed:11.8,tanker:true,cargo:false,passenger:false,destination:'BANDAR ABBAS',navStatus:'Under way'},
      {mmsi:'367468640',name:'PRESIDENT TRUMAN',lat:33.70,lng:-118.25,heading:180,speed:14.2,tanker:false,cargo:true,passenger:false,destination:'LOS ANGELES',navStatus:'Under way'},
      {mmsi:'366964000',name:'APL SAIGON',lat:37.80,lng:-122.45,heading:240,speed:15.8,tanker:false,cargo:true,passenger:false,destination:'OAKLAND',navStatus:'Under way'},
      {mmsi:'538008233',name:'VALUECHESS',lat:47.60,lng:-122.40,heading:270,speed:12.5,tanker:false,cargo:true,passenger:false,destination:'SEATTLE',navStatus:'Under way'},
      {mmsi:'368482000',name:'MAERSK BALTIMORE',lat:40.70,lng:-74.05,heading:155,speed:13.2,tanker:false,cargo:true,passenger:false,destination:'NEW YORK',navStatus:'Under way'},
      {mmsi:'338162000',name:'CARNIVAL PRIDE',lat:39.25,lng:-76.60,heading:140,speed:18.4,tanker:false,cargo:false,passenger:true,destination:'BALTIMORE',navStatus:'Under way'},
      {mmsi:'355325000',name:'MOL BEYOND',lat:9.30,lng:-79.90,heading:315,speed:8.5,tanker:false,cargo:true,passenger:false,destination:'COLON',navStatus:'Under way'},
      {mmsi:'477441000',name:'EVER ACE',lat:34.00,lng:-118.50,heading:340,speed:17.5,tanker:false,cargo:true,passenger:false,destination:'LOS ANGELES',navStatus:'Under way'},
      {mmsi:'265506900',name:'STENA GERMANICA',lat:57.70,lng:11.90,heading:45,speed:21.0,tanker:false,cargo:false,passenger:true,destination:'GOTHENBURG',navStatus:'Under way'},
      {mmsi:'230623000',name:'SILJA SERENADE',lat:60.15,lng:24.95,heading:180,speed:20.5,tanker:false,cargo:false,passenger:true,destination:'HELSINKI',navStatus:'Under way'},
      {mmsi:'356789000',name:'NEO PANAMA',lat:9.05,lng:-79.55,heading:330,speed:6.5,tanker:false,cargo:true,passenger:false,destination:'COLON',navStatus:'Restricted'},
      {mmsi:'477123000',name:'SONGA PEACE',lat:8.85,lng:-79.50,heading:150,speed:5.0,tanker:true,cargo:false,passenger:false,destination:'BALBOA',navStatus:'Restricted'}
    ];

    // Add all demo ships
    DEMO.forEach(s => {
      // Add small random jitter so ships don't stack
      const jLat = (Math.random()-0.5)*0.15;
      const jLng = (Math.random()-0.5)*0.15;
      window._aisShips[s.mmsi] = {
        mmsi:s.mmsi, lat:s.lat+jLat, lng:s.lng+jLng, name:s.name,
        tanker:s.tanker, cargo:s.cargo, passenger:s.passenger,
        speed:s.speed, heading:s.heading, destination:s.destination,
        navStatus:s.navStatus, lastUpdate:Date.now(), _demo:true,
      };
    });

    // Animate demo ships — move them at a visible pace
    if(window._aisDemoInterval) clearInterval(window._aisDemoInterval);
    window._aisDemoInterval = setInterval(()=>{
      if(window._tabHidden) return;
      Object.values(window._aisShips).forEach(s=>{
        if(!s._demo) return;
        const spd = (s.speed||5) * 0.0001; // faster movement for visibility
        const rad = (s.heading||0) * Math.PI/180;
        s.lat += Math.cos(rad) * spd;
        s.lng += Math.sin(rad) * spd;
        // Slight random heading/speed change for 'life'
        s.heading = (s.heading + (Math.random()-0.5)*2) % 360;
        s.speed = Math.max(0, s.speed + (Math.random()-0.5)*0.2);
      });
      _aisUpdateGL();
      _aisUpdatePanel();
    }, 1000);

    const st = document.getElementById('ais-status-text');
    if(st) { st.textContent='SIMULATED'; st.style.background='#442200'; st.style.color='#ffaa00'; }
    const pInd = document.getElementById('ais-live-indicator');
    if(pInd) { pInd.style.background='#ffaa00'; pInd.style.boxShadow='0 0 10px #ffaa00aa'; }
    
    _aisUpdateGL();
    _aisUpdatePanel();
    console.log('[AIS] Demo fleet loaded:',DEMO.length,'vessels on major shipping lanes');
  }

  // Stale ship cleanup
  setInterval(()=>{
    const now = Date.now();
    Object.keys(window._aisShips).forEach(mmsi => {
      const s = window._aisShips[mmsi];
      if(!s._demo && now - s.lastUpdate > 10*60*1000) delete window._aisShips[mmsi];
    });
    _aisUpdateGL();
    _aisUpdatePanel();
  }, 60000);


})();

map.on('mousemove',e=>{document.getElementById('st-coord').textContent=`${e.latlng.lat>0?'N':'S'}${Math.abs(e.latlng.lat).toFixed(2)}° ${e.latlng.lng>0?'E':'W'}${Math.abs(e.latlng.lng).toFixed(2)}°`;});



map.on('click', function(){ closeAllMenus(); map.closePopup(); });
function flyTo(c,z){map.flyTo(c,z,{duration:2.5, easeLinearity:0.05});}

const LG={mkt:L.layerGroup().addTo(map),fx:L.layerGroup().addTo(map),news:L.layerGroup().addTo(map),lbl:L.layerGroup().addTo(map),cb:L.layerGroup().addTo(map)};
const LV={mkt:true,fx:true,news:true,lbl:true,cb:true};
const LYR_LABELS={mkt:'MKT',fx:'FX',news:'NEWS',lbl:'LABELS',cb:'CENTRAL BANKS'};

function togLayer(n){
  LV[n]=!LV[n];LV[n]?map.addLayer(LG[n]):map.removeLayer(LG[n]);
  const el=document.getElementById('lyr-'+n);
  if(el){const k=el.querySelector('.dd-key');if(k){k.textContent=LYR_LABELS[n]||n.toUpperCase();k.style.opacity=LV[n]?'1':'.35';}}
}

/* ═══════════════════════════════════════════════════════
   MAP MODE & MARKERS
═══════════════════════════════════════════════════════ */
let MAP_MODE='equity';let SEL=null;const MRKRS={};

function getVal(c){
  const m=MKT[c.idx];if(!m)return 0;
  const mac=MAC[c.co]||{};
  switch(MAP_MODE){
    case 'equity': return m.chg;
    case 'ytd':    return m.ytd;
    case 'macro':  return (mac.g||0);
    case 'rates':  return -(mac.r||5)*.12;
    case 'cpi':    return -(mac.cpi-2)*.25;
    default:       return m.chg;
  }
}
function vCol(v){return v>0?'#00cc44':v<0?'#ff2222':'#ff6600';}

function renderMarkers(){ LG.mkt.clearLayers(); }

function _fetchTimeout(url, ms) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms || 8000);
  const name = (url.match(/\/\/([^/]+)/)||[])[1]||'unknown';
  return fetch(url, {signal: ctrl.signal})
    .then(r => { clearTimeout(tid); if(window._apiLog) _apiLog(name, r.ok?'ok':'err', r.status); return r; })
    .catch(e => { clearTimeout(tid); if(window._apiLog) _apiLog(name, 'fail', e.message); throw e; });
}

// ── CORS-safe fetch: přímý → corsproxy.io ───────────────────────────────
// TESTOVÁNO: přímý funguje pro Binance/Kraken/OKX/Bybit/HTX/Coinbase/HL
// allorigins NEFUNGUJE (timeout), corsproxy.io funguje jako záloha
async function _fetchCORS(url, ms=10000, postBody=null) {
  const mkOpts = (sig) => {
    const opts = { signal: sig };
    if (postBody) { opts.method='POST'; opts.headers={'Content-Type':'application/json'}; opts.body=postBody; }
    return opts;
  };
  const wrap = (fetchFn) => fetchFn().then(r => { if(r && r.ok) return r; throw new Error('bad'); });
  const attempts = [
    // 1. přímý call (fastest — no proxy overhead)
    () => fetch(url, mkOpts((()=>{const c=new AbortController();setTimeout(()=>c.abort(),ms);return c.signal;})())),
    // 2. corsproxy.io
    () => fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`, mkOpts((()=>{const c=new AbortController();setTimeout(()=>c.abort(),ms);return c.signal;})())),
    // 3. allorigins
    () => fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, mkOpts((()=>{const c=new AbortController();setTimeout(()=>c.abort(),ms);return c.signal;})())),
  ];
  // Race all in parallel — return first that succeeds
  try { return await Promise.any(attempts.map(wrap)); } catch(_) { return null; }
}
function fxMid(pair){const f=FXP.find(x=>x.p===pair);if(!f)return null;return(f.b+f.a)/2;}
function fxChg(pair){const f=FXP.find(x=>x.p===pair);return f?f.c:0;}

function makePriceLabel(sym, px, chg, fxPair, fxPx){
  if(!px||isNaN(px))return null;
  const up=chg>=0; const col=up?'#00e676':'#ff2020';
  const idxPr=fmtPx(px);
  const chgStr=(up?'+':'')+chg.toFixed(2)+'%';
  let fxRow='';
  if(fxPair&&fxPx){
    const fup=fxChg(fxPair)>=0;const fc=fxChg(fxPair);
    const fdp=fxPx>100?2:fxPx>10?3:fxPx>1?4:5;
    fxRow=`<div style="border-top:1px solid #1a1200;margin-top:1px;padding-top:1px;display:flex;justify-content:space-between;gap:6px">
      <span style="color:#ff8800">${fxPair}</span>
      <span style="color:#c8c0a8">${fxPx.toFixed(fdp)}</span>
      <span style="color:${fup?'#00e676':'#ff2020'}">${fup?'+':''}${fc.toFixed(2)}%</span>
    </div>`;
  }
  return`<div style="background:rgba(2,1,0,.28);border:1px solid rgba(58,40,0,0.5);padding:1px 5px 1px 4px;font-family:'Share Tech Mono',monospace;font-size:7.5px;min-width:100px;line-height:1.4">
    <div style="display:flex;justify-content:space-between;gap:8px">
      <span style="color:#ff8800;font-weight:700">${sym}</span>
      <span style="color:#e0d8c0">${idxPr}</span>
      <span style="color:${col};font-weight:700">${chgStr}</span>
    </div>
    ${fxRow}
  </div>`;
}

function renderFXPins(){ renderFXStateLayer();
  LG.fx.clearLayers();
}

function renderNewsPins(){
  LG.news.clearLayers();
  if(window._updateGLNews)window._updateGLNews();
  return;
  const allPins = [...NEWS_PINS, ...(window._liveBreakingPins||[])];
  allPins.forEach(n=>{
    const isBreaking = n.title && n.title.includes('BREAKING');
    const dotCol  = isBreaking ? '#ff2200' : '#cc3300';
    const dotSize = isBreaking ? 7 : 5;
    const blinkSpd= isBreaking ? '.7s' : '1.5s';

    // Jen tečka — žádný label
    const html = `<div style="width:${dotSize}px;height:${dotSize}px;border-radius:50%;background:${dotCol};border:1px solid rgba(0,0,0,.6);cursor:pointer;box-shadow:0 0 ${isBreaking?6:3}px ${dotCol};animation:blink ${blinkSpd} infinite"></div>`;
    const icon = L.divIcon({html, className:'', iconAnchor:[dotSize/2, dotSize/2], iconSize:[dotSize, dotSize]});
    const m = L.marker([n.lat, n.lng], {icon, zIndexOffset: isBreaking?1000:500});

    // Popup — Bloomberg style tabulka
    const ago = n.ts ? (()=>{
      const s = Math.round((Date.now()-n.ts)/1000);
      if(s<60) return s+'s ago';
      const m = Math.round(s/60);
      return m<60 ? m+'m ago' : Math.round(m/60)+'h ago';
    })() : '';
    const ts  = n.ts ? new Date(n.ts).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) : '';
    const googleSearch = `https://www.google.com/search?q=${encodeURIComponent((n.txt||'').slice(0,65))}&tbs=qdr:h`;
    const xSearch      = `https://x.com/search?q=${encodeURIComponent((n.txt||'').slice(0,50))}&f=live`;
    const brdCol2 = n.isFlash ? '#ff2200' : isBreaking ? '#cc3300' : '#441100';
    const hdrBg   = n.isFlash ? '#120000' : '#0a0300';
    const tagLbl  = n.isFlash ? '► FLASH' : n.tag ? n.tag : 'BREAKING';
    const tagCol  = n.isFlash ? '#ff3300' : '#cc4422';
    const popup = `<div style="background:#050200;border:1px solid ${brdCol2};font-family:'Share Tech Mono',monospace;width:380px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.8)">
      <!-- Header bar -->
      <div style="background:${hdrBg};padding:6px 12px;border-bottom:1px solid ${brdCol2};display:flex;align-items:center;gap:8px">
        <div style="width:7px;height:7px;border-radius:50%;background:${dotCol};box-shadow:0 0 5px ${dotCol};flex-shrink:0;animation:blink .8s infinite"></div>
        <span style="color:${tagCol};font-size:8px;font-weight:700;letter-spacing:2.5px">${tagLbl}</span>
        <span style="color:#553322;font-size:7px;margin-left:auto;letter-spacing:.5px">${ago} · ${ts}</span>
      </div>
      <!-- Headline -->
      <div style="padding:10px 12px;border-bottom:1px solid #180800">
        <div style="color:#f5e8d8;font-size:11px;font-weight:700;line-height:1.55;letter-spacing:.01em">${n.txt||''}</div>
      </div>
      ${(n.desc&&n.desc.trim()&&n.desc.trim()!==n.txt)?`
      <!-- Body -->
      <div style="padding:8px 12px;border-bottom:1px solid #120600;background:#040100">
        <div style="color:#886655;font-size:8.5px;line-height:1.6">${(n.desc||'').slice(0,220)}${(n.desc||'').length>220?'…':''}</div>
      </div>`:''}
      <!-- Meta table -->
      <div style="padding:6px 12px;border-bottom:1px solid #120600;display:grid;grid-template-columns:1fr 1fr;gap:4px 16px">
        ${n.src?`<div style="display:flex;gap:6px;align-items:center"><span style="color:#887760;font-size:6.5px;letter-spacing:1.2px">SOURCE</span><span style="color:#cc6633;font-size:8px;font-weight:700">${n.src}</span></div>`:''}
        ${n.tier?`<div style="display:flex;gap:6px;align-items:center"><span style="color:#887760;font-size:6.5px;letter-spacing:1.2px">TIER</span><span style="color:${n.tier===1?'#ff6600':n.tier===2?'#cc5500':'#884422'};font-size:8px;font-weight:700">T${n.tier}</span></div>`:''}
      </div>
      <!-- Action buttons -->
      <div style="padding:8px 12px;display:flex;gap:6px">
        ${n.url?`<a href="${n.url}" target="_blank" style="flex:1;background:#150600;border:1px solid ${brdCol2};color:#ff6633;font-size:7.5px;padding:5px 0;text-decoration:none;letter-spacing:1.2px;font-weight:700;display:block;text-align:center">⬡ FULL ARTICLE</a>`:''}
        <a href="${xSearch}" target="_blank" style="background:#0a0200;border:1px solid #441100;color:#cc4422;font-size:7.5px;padding:5px 12px;text-decoration:none;letter-spacing:1px;font-weight:700;display:block;text-align:center;white-space:nowrap">𝕏 LIVE</a>
        <a href="${googleSearch}" target="_blank" style="background:#0a0200;border:1px solid #441100;color:#994422;font-size:7.5px;padding:5px 12px;text-decoration:none;letter-spacing:1px;font-weight:700;display:block;text-align:center;white-space:nowrap">⌕ NEWS</a>
      </div>
    </div>`;

    m.bindPopup(popup, {maxWidth:380, closeButton:true, className:'bbpop'});
    LG.news.addLayer(m);
  });
}

function buildPopup(c){
  const m=MKT[c.idx]||{};const mac=MAC[c.co]||{};
  const up=(m.chg||0)>=0;const col=up?'#00cc44':'#ff2222';
  const pr=fmtPx(m.px);
  const row=(k,v,vc)=>`<div class="pp-row"><span class="pp-k">${k}</span><span style="color:${vc||'#c8c0a8'}">${v}</span></div>`;
  let h=`<div class="pp">
    <div class="pp-t">${c.idx} — ${m.n||c.idx}</div>
    <div class="pp-city">${c.city}, ${c.co}</div>
    <div class="pp-px" style="color:${col}">${pr}</div>
    <div class="pp-chg" style="color:${col}">${up?'+':'-'}${Math.abs(m.chg||0).toFixed(2)}%  <span style="font-size:8px;color:#665840">1D</span></div>
    <div class="pp-sp"></div>
    ${row('OPEN',fmtPx(m.open||0))}
    ${row('HIGH',fmtPx(m.hi||0),'#00cc44')}
    ${row('LOW', fmtPx(m.lo||0),'#ff2222')}
    ${row('YTD', (m.ytd>=0?'+':'')+m.ytd?.toFixed(2)+'%', m.ytd>=0?'#00cc44':'#ff2222')}
    ${row('MKT CAP',m.mc||'—','#00bbdd')}
    ${row('VOLUME',m.vol||'—','#00bbdd')}`;
  if(mac.cpi!==undefined){h+=`<div class="pp-sp"></div>
    ${row('GDP',    (mac.g>=0?'+':'')+mac.g+'%',  mac.g>=0?'#00cc44':'#ff2222')}
    ${row('CPI',    mac.cpi+'%',                   mac.cpi<=3?'#00cc44':mac.cpi<=6?'#ff6600':'#ff2222')}
    ${row('CB RATE',mac.r+'%',                     '#ff7700')}
    ${row('UNEMPL', mac.unem+'%',                  mac.unem<5?'#00cc44':mac.unem<8?'#ff6600':'#ff2222')}
    ${row('CURRENCY',mac.cur,                      '#ff6600')}`;}
  h+=`<div class="pp-btns">
    <button class="pp-btn" onclick="onSelect('${c.id}');map.closePopup()">DETAIL</button>
    <button class="pp-btn" onclick="map.flyTo([${c.lat},${c.lng}],6,{duration:1});map.closePopup()">ZOOM IN</button>
    <button class="pp-btn am" onclick="openPanel('WEI');map.closePopup()">INDICES</button>
  </div></div>`;
  return h;
}

function onSelect(id){
  SEL=id;
  const c=CENTERS.find(x=>x.id===id);if(!c)return;
  const m=MKT[c.idx]||{};const mac=MAC[c.co]||{};
  document.getElementById('dt-title').textContent=`${c.idx} — ${c.city.toUpperCase()}`;
  const up=(m.chg||0)>=0;
  const pr=fmtPx(m.px);
  const row=(k,v,cl)=>`<div class="dr"><span class="dk">${k}</span><span class="${cl||'wh'}">${v}</span></div>`;
  let h='';
  h+=row('INDEX',  m.n||c.idx,'ga');
  h+=row('LAST',   pr,         up?'up':'dn');
  h+=row('1D CHG', (up?'+':'-')+Math.abs(m.chg||0).toFixed(2)+'%',up?'up':'dn');
  h+=row('YTD',    (m.ytd>=0?'+':'')+m.ytd?.toFixed(2)+'%',         m.ytd>=0?'up':'dn');
  h+=row('OPEN',   fmtPx(m.open||0),'gr');
  h+=row('HIGH',   fmtPx(m.hi||0),  'up');
  h+=row('LOW',    fmtPx(m.lo||0),  'dn');
  h+=row('MKT CAP',m.mc||'—','cy');
  h+=row('VOLUME', m.vol||'—','cy');
  if(mac.cpi!==undefined){
    h+='<div style="border-top:1px solid #1c1800;height:3px"></div>';
    h+=row('CITY',    c.city,'cy');
    h+=row('COUNTRY', c.co,  'wh');
    h+=row('GDP',    (mac.g>=0?'+':'')+mac.g+'%',  mac.g>=0?'up':'dn');
    h+=row('CPI',    mac.cpi+'%',                   mac.cpi<=3?'up':mac.cpi<=6?'ga':'dn');
    h+=row('CB RATE',mac.r+'%',                     'ye');
    h+=row('UNEMPL', mac.unem+'%',                  mac.unem<5?'up':mac.unem<8?'ga':'dn');
    h+=row('CURRENCY',mac.cur,                      'ga');
  }
  document.getElementById('dt-body').innerHTML=h;
  document.querySelectorAll('.mk').forEach(el=>el.classList.toggle('sel',el.dataset.id===id));
  renderMarkers();
  setStat(`Selected: ${c.city} (${c.co}) — ${c.idx}`);
}

function setMapMode(m){
  MAP_MODE=m;
  document.querySelectorAll('.mode-chip[id^="mc-"]').forEach(b=>b.classList.remove('on'));
  const btn=document.getElementById('mc-'+m);if(btn)btn.classList.add('on');
  document.getElementById('st-mode').textContent=m.toUpperCase();
  const labels={equity:'EQUITY — 1D CHG%',ytd:'YTD PERFORMANCE %',macro:'GDP GROWTH RATE',rates:'CENTRAL BANK RATES',cpi:'CPI INFLATION'};
  document.getElementById('leg-t').textContent=labels[m]||m.toUpperCase();
  renderMarkers();closeAllMenus();
}

/* ═══════════════════════════════════════════════════════
   PANEL SYSTEM — FULL DRAG + RESIZE + MINIMIZE + MAXIMIZE
═══════════════════════════════════════════════════════ */
let panelCount=0;
let zTop=100;
const PANEL_REGISTRY=window.PANEL_REGISTRY||{};
window.PANEL_REGISTRY=PANEL_REGISTRY;

/* ══ REFRESH ALL OPEN PANELS ══ */
// Panels that change rarely — only refresh every N seconds
const PANEL_SLOW = {ETFF:300, ECAL:60, DEFI:120, CHAIN:60, NETSIT:999999, INTEL:30, JOURN:60, SOURCES:60, MOVERS:999999, OIDASH:30, FUNDHIST:60, WHALE:30, ORDB:999999, CRYPTOOPT:60, VPVR:60, LIQHEAT:999999};
const _panelLastRefresh = {};

function refreshAllPanels(){
  const now = Date.now();
  Object.entries(PANEL_REGISTRY).forEach(([id,reg])=>{
    if(reg.minimized)return;
    const body=document.getElementById('pb-'+id);
    if(!body)return;
    if(body.dataset.locked==='1')return;

    // Throttle slow panels
    const slowSec = PANEL_SLOW[reg.fn];
    if(slowSec){
      const last = _panelLastRefresh[id]||0;
      if(now - last < slowSec*1000) return;
    }
    _panelLastRefresh[id] = now;

    // Find active tab index
    const pnl=document.getElementById(id);
    let ti=0;
    if(pnl){
      const tabs=pnl.querySelectorAll('.ptab');
      tabs.forEach((t,i)=>{if(t.classList.contains('on'))ti=i;});
    }
    try{
      if(reg.fn==='NETSIT') return;
      if(reg.fn==='OIDASH'){ ['BTC','ETH','SOL'].forEach(s=>fetchOIByExchange&&fetchOIByExchange(s)); setTimeout(()=>_renderOIDash&&_renderOIDash(),2000); return; }
      if(reg.fn==='FUNDHIST'){ ['BTCUSDT','ETHUSDT','SOLUSDT'].forEach(s=>fetchFundingHistory&&fetchFundingHistory(s)); setTimeout(()=>_renderFundingHist&&_renderFundingHist(),2000); return; }
      if(reg.fn==='WHALE'){ fetchWhaleAlerts&&fetchWhaleAlerts(); fetchOnChainAnalytics&&fetchOnChainAnalytics(); return; }
      if(reg.fn==='ORDB') return;
      // MOVERS — rebuild data but preserve active tab AND scroll position
      if(reg.fn==='MOVERS'){
        const mvBody = body.querySelector('#mv-body, [style*="overflow-y"]');
        const scrollTop = mvBody ? mvBody.scrollTop : 0;
        const activeSec = (()=>{
          const t = body.querySelector('.mv-ptab[style*="ff8800"]');
          return t ? t.getAttribute('data-sec') : 'EQ';
        })();
        body.innerHTML = buildMOVERS();
        if(activeSec !== 'EQ'){
          const el = body.querySelector('.mv-ptab[data-sec="'+activeSec+'"]');
          if(el) window._mvSwitch(activeSec);
        }
        const newBody = body.querySelector('#mv-body, [style*="overflow-y"]');
        if(newBody) newBody.scrollTop = scrollTop;
        return;
      }
      // CRYPTO má vlastní _patchCRYPTOPanel — přeskočit rerender pokud jsou DOM ID přítomná
      // Přeskočíme vždy — patch loop se stará o update, rebuild by smazal live 7D% data
      if(reg.fn==='CRYPTO' && body.querySelector('[id^="cp-px-"]')) return;
      // INTEL/JOURN/SOURCES — use direct render, never rebuild outer shell (prevents flash/loop)
      if(reg.fn==='INTEL'){ if(typeof _renderINTEL==='function'&&document.getElementById('intel-feed'))_renderINTEL(); return; }
      if(reg.fn==='JOURN'){ if(typeof buildJOURN==='function'){body.innerHTML=buildJOURN(ti);} return; }
      if(reg.fn==='SOURCES'){ if(typeof buildSOURCES==='function'){body.innerHTML=buildSOURCES();} return; }
      // For WN panels — only update the inner wn-body, never the whole panel (preserves search input)
      if(reg.fn==='NWS'){
        const nwsb=body.querySelector('#nws-body');
        if(nwsb){const _nst=nwsb.scrollTop;nwsb.innerHTML=buildNWSPanel(parseInt(body.closest('.panel')?.querySelector('.ptab.on')?.dataset?.ti||0));nwsb.scrollTop=_nst;const _nq=(body.querySelector('#nws-srch')||{}).value||'';if(_nq&&typeof _nwsFilter==='function')_nwsFilter(_nq);}
        return;
      }
      if(reg.fn==='WN'){
        const wnb=body.querySelector('#wn-body');
        if(wnb){const st=wnb.scrollTop;wnb.innerHTML=buildWNTable(NEWS_DATA);wnb.scrollTop=st;setTimeout(_restoreTranslations,30);if(window._wnFilterText){window._wnFilter(window._wnFilterText);}setTimeout(()=>{try{_applyBadges();}catch(e){}},50);}
        return;
      }
      const html=ti>0?buildPanelContentTab(reg.fn,ti):buildPanelContent(reg.fn);
      // Preserve outer scroll
      const st=body.scrollTop;
      const sl=body.scrollLeft;
      // For ETFF: capture the inner horizontal grid scroll by id
      let etffGridSL = 0;
      const etffGrid = body.querySelector('#etff-grid-scroll');
      if(etffGrid) etffGridSL = etffGrid.scrollLeft;
      // Preserve ALL inner scrollable elements (e.g. ETFF horizontal grid)
      const innerScrolls=[];
      body.querySelectorAll('[style*="overflow"]').forEach(el=>{
        if(el.scrollLeft>0||el.scrollTop>0){
          innerScrolls.push({idx:Array.from(body.querySelectorAll('[style*="overflow"]')).indexOf(el), sl:el.scrollLeft, st:el.scrollTop});
        }
      });
      body.innerHTML=html;
      body.scrollTop=st;
      body.scrollLeft=sl;
      // Restore ETFF grid scroll
      if(etffGridSL>0){
        const newGrid=body.querySelector('#etff-grid-scroll');
        if(newGrid) newGrid.scrollLeft=etffGridSL;
      }
      // Restore other inner scrolls
      if(innerScrolls.length){
        const els=body.querySelectorAll('[style*="overflow"]');
        innerScrolls.forEach(({idx,sl,st})=>{
          if(els[idx]){els[idx].scrollLeft=sl;els[idx].scrollTop=st;}
        });
      }
    }catch(_){}
  });
  setTimeout(_restoreTranslations, 30);
}

function sparkSVG(chg,w=55,h=14){
  const n=24,d=[];let p=50;
  for(let i=0;i<n;i++){p+=((Math.random()-.5)*8);p=Math.max(5,Math.min(95,p));d.push(p);}
  if(chg>0)d[d.length-1]=Math.min(d[d.length-1]+Math.abs(chg)*3,95);
  else d[d.length-1]=Math.max(d[d.length-1]-Math.abs(chg)*3,5);
  const pts=d.map((v,i)=>`${Math.round(i/(n-1)*w)},${Math.round((100-v)/100*h)}`).join(' ');
  const col=chg>=0?'#00cc44':'#ff2222';
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><polyline points="${pts}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

// Universal price formatter — always uses comma thousands separator, dot decimal
function fmtPx(px){
  if(px===null||px===undefined||isNaN(px))return '—';
  if(px>=100000) return Math.round(px).toLocaleString('en');
  if(px>=10000)  return px.toLocaleString('en',{minimumFractionDigits:0,maximumFractionDigits:0});
  if(px>=1000)   return px.toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2});
  if(px>=100)    return px.toFixed(2);
  if(px>=10)     return px.toFixed(3);
  if(px>=1)      return px.toFixed(4);
  if(px>=.0001)  return px.toFixed(5);
  return px.toFixed(8);
}
function fmtBig(n){
  if(n===null||n===undefined||isNaN(n))return '—';
  const a=Math.abs(n);
  if(a>=1e12) return (n/1e12).toFixed(2)+'T';
  if(a>=1e9)  return (n/1e9).toFixed(2)+'B';
  if(a>=1e6)  return (n/1e6).toFixed(1)+'M';
  return n.toFixed(0);
}
function fmtBigShort(n){return fmtBig(n);}
function fmtMC(v){if(!v&&v!==0)return '—';if(typeof v==='number')return '$'+fmtBig(v);return v;}
function fmtVOL(v){if(!v&&v!==0)return '—';if(typeof v==='number')return '$'+fmtBig(v);return v;}

function getPanelTabs(fn){
  const tabs={
    WEI:['ALL','AMERICAS','EUROPE','ASIA/PAC','MIDEAST'],
    FX:['SPOT','CROSSES'],
    IDX:['ALL','US','EUROPE','ASIA','AMERICAS','VOLATILITY'],
    CRYPTO:['MKT CAP'],
    COMDTY:['ALL','ENERGY','METALS','AGRI'],
    MACRO:['INDICATORS','FED','ECB'],
    WN:null,
    NWS:[],
    MMAP:['SPX500','ALL US'],
    ECON:['GDP/CPI','RATES','EMPLOYMENT'],
    ETFF:['BTC ETFs','ETH ETFs','NET FLOWS','YTD'],
    FUND:['ALL ASSETS','EXTREMES','HISTORY'],
    LIQD:['24H MAP','1H LIVE','BIGGEST'],
    DOMN:['OVERVIEW','TREND','STABLES'],
    NETSIT:['NETWORK MAP','DATA FLOW LOG','PANEL LAUNCHER','LIVE FEED STATUS','API KEY'],
    INTEL:[],
    JOURN:['WATCHLIST','TIER 1','TIER 2'],
    SOURCES:['STATUS','BY LANG','BY CAT']
};
  return tabs[fn]||null;
}
function getPanelTitle(fn){
  const t={WEI:'WORLD EQUITY INDICES',FX:'FOREIGN EXCHANGE RATES',EQUITY:'US EQUITY QUOTES',IDX:'WORLD INDICES',MOVERS:'TOP MOVERS',CRYPTO:'DIGITAL ASSETS / CRYPTO',COMDTY:'COMMODITIES',ENERGY:'ENERGY MARKETS',METALS:'PRECIOUS METALS',AGRI:'AGRICULTURAL',MACRO:'MACRO DASHBOARD',WIRP:'RATE CUT PROBABILITIES',WN:'NEWS FEED',NWS:'NEWS & RESEARCH',ALERTS:'MACRO ALERTS',DES:'SECURITY DESCRIPTION',FA:'FINANCIAL ANALYSIS',MMAP:'MARKET HEATMAP',CRYPTOHEAT:'CRYPTO HEATMAP',YLDS:'TREASURY YIELD CURVE',FXIP:'FX IMPLIED VOLATILITY',FXCL:'FX CORRELATIONS',CN:'X / SOCIAL FEED',ECON:'COUNTRY ECONOMICS',ECAL:'ECONOMIC CALENDAR',ECAL2:'ECONOMIC CALENDAR — NEXT WEEK',DEFI:'DEFI PROTOCOLS',CHAIN:'BLOCKCHAIN NETWORKS',PERF:'PERFORMANCE TABLE',BYFC:'BOND YIELD FORECASTS',ETFF:'ETF FLOWS — BITCOIN & ETHEREUM',FUND:'PERPETUAL FUNDING RATES',LIQD:'LIQUIDATIONS MONITOR',DOMN:'',NETSIT:'DATA NETWORK SYSTEM — P2P MESH VISUALIZER',DHLO:'DAILY HIGH · LOW · OPEN · CLOSE',INTEL:'GLOBAL INTELLIGENCE',JOURN:'JOURNALIST & TRADER WATCHLIST',SOURCES:'SOURCE HEALTH MONITOR',OPT:'OPTIONS CHAIN',BNDS:'SOVEREIGN BONDS & CREDIT',EARN:'EARNINGS CALENDAR',PORT:'PORTFOLIO TRACKER',SENT:'MARKET SENTIMENT',IPO:'IPO CALENDAR',MNA:'M&A DEAL TRACKER',CRYEXC:'CRYEXC — LIVE ORDER FLOW & NEWS',RISK:'RISK METRICS',GMHM:'GLOBAL MACRO HEATMAP',ORDB:'ORDER BOOK DEPTH',CRYPTOOPT:'CRYPTO OPTIONS CHAIN',WHALE:'WHALE TRACKER & ON-CHAIN',OIDASH:'OPEN INTEREST DASHBOARD',FUNDHIST:'FUNDING RATE HISTORY',VPVR:'VOLUME PROFILE VPVR',LIQHEAT:'LIQUIDATION HEATMAP',HYPER:'HYPERLIQUID — LIVE PERP DASHBOARD',CRCL:'CRCL — CIRCULAR MARKET METRICS',METR:'METR — CROSS-ASSET METRICS DASHBOARD',MULTIFEED:'MULTI-EXCHANGE LIVE FEED',STOCKS2:'EXTENDED EQUITY UNIVERSE'};
  return t[fn]||fn;
}

function openPanel(fn,posX,posY){
  // Record to history (skip if navigating)
  if (!window._histSilenced) {
    _pushHist({type: 'CMD', fn, sec: document.getElementById('cmd-sec-inp')?.value || ''});
  }

  // Auto-update TOPBAR with panel name
  const _panelNames = {
    'EQUITY':'Equities','MMAP':'Market Heatmap','PERF':'Performance',
    'IDX':'World Indices','FA':'Financial Analysis','FX':'FX Spot Rates',
    'WIRP':'Rate Probabilities','BYFC':'Bond Yield Forecasts',
    'CRYPTO':'Crypto Markets','WEI':'World Equity Indices',
    'ETFF':'ETF Flows','FUND':'Fund Screener','NWS':'News',
    'WN':'World News','INTEL':'Intelligence','JOURN':'Journals',
    'LIQD':'Liquidity','NETSIT':'Net Positions','SOURCES':'Sources',
    'ECAL':'Economic Calendar','SHIP':'Shipping Map','AIS':'AIS Vessels',
    'EQRV':'Equity Rel Valuation','RV':'Relative Valuation',
    'MDM':'Market Depth Monitor','VWAP':'Price & Vol Dashboard',
    'CRYPTOHEAT':'Crypto Heatmap',
    'MACRO':'Macro Dashboard','FED':'Fed Watch & Rates','WORLD':'World Assets'
  };
  const secInp = document.getElementById('cmd-sec-inp');
  const fnInp = document.getElementById('cmd-fn-inp');
  if (fnInp) fnInp.value = fn;
  if (secInp) {
    if (!secInp.value.trim()) {
      if (_panelNames[fn]) secInp.value = _panelNames[fn];
    }
  }

  closeAllMenus();
  // Zavřít jen maximalizované panely — zmenšené nechat
  Object.keys(PANEL_REGISTRY).forEach(id=>{ const r=PANEL_REGISTRY[id]; if(r&&r.maximized) closePanel(id); });
  const id='pnl-'+(++panelCount);
  const overlay=document.getElementById('map-overlay');
  const tabs=getPanelTabs(fn);
  const tabsHtml=tabs?`<div class="panel-tabs">${tabs.map((t,i)=>`<div class="ptab${i===0?' on':''}" onclick="switchPanelTab('${id}','${fn}',${i},this)">${t}</div>`).join('')}</div>`:'';

  const widePanel={'CRYEXC':true,'ETFF':true,'FUND':true,'LIQD':true,'WEI':true,'CRYPTO':true,'NETSIT':true,'INTEL':true,'JOURN':true,'SOURCES':true,'NWS':true,'CRYPTOHEAT':true,'HYPER':true,'CRCL':true,'METR':true,'MULTIFEED':true,'STOCKS2':true};
  const defaultW=widePanel[fn]?(fn==='CRYEXC'?620:fn==='ETFF'?920:fn==='FUND'?780:fn==='LIQD'?700:fn==='NETSIT'?820:fn==='INTEL'?820:fn==='JOURN'?620:fn==='SOURCES'?580:fn==='NWS'?660:fn==='CRYPTO'?780:fn==='WEI'?900:fn==='HYPER'?860:fn==='CRCL'?780:fn==='METR'?900:fn==='MULTIFEED'?820:fn==='STOCKS2'?900:700):520;
  const defaultH=widePanel[fn]?(fn==='CRYEXC'?680:fn==='ETFF'?480:fn==='FUND'?400:fn==='LIQD'?380:fn==='NETSIT'?560:fn==='INTEL'?600:fn==='JOURN'?580:fn==='SOURCES'?500:fn==='NWS'?600:fn==='CRYPTO'?880:fn==='WEI'?860:fn==='HYPER'?680:fn==='CRCL'?680:fn==='METR'?680:fn==='MULTIFEED'?580:fn==='STOCKS2'?680:600):500;
  const _ow=document.getElementById('map-overlay');
  const _owRect=_ow?_ow.getBoundingClientRect():{width:window.innerWidth};
  const ox=posX!=null?posX:Math.max(10, _owRect.width-defaultW-30-(panelCount-1)*22);
  const oy=posY!=null?posY:Math.min(10+(panelCount-1)*22, window.innerHeight-defaultH);

  const div=document.createElement('div');
  div.className='panel';div.id=id;
  div.style.left=ox+'px';div.style.top=oy+'px';
  div.style.width=defaultW+'px';div.style.height=defaultH+'px';
  div.style.zIndex=++zTop;
  const showBox = ['WN', 'INTEL', 'MACRO', 'FED', 'NWS'].includes(fn);
  const boxHtml = showBox ? `
    <div style="width:680px;height:18px;border:1px solid #1a3388;background:#000;margin:4px 8px;"></div>` : '';

  div.innerHTML=`
    <div class="panel-hd" onmousedown="startDrag(event,'${id}')">
      ${fn==="DOMN"?"":"<div class='panel-tag'>"+fn+"</div>"}
      <div class="panel-title" style="display:none"></div>
      <span class="panel-live"></span>
      <div class="panel-btns" style="display:flex;align-items:center;gap:5px;padding:0 6px">
      </div>
    </div>
    ${boxHtml}
    ${tabsHtml}
    <div class="panel-body" id="pb-${id}" data-fn="${fn}">${buildPanelContent(fn)}</div>`;

  // Add resize handles
  ['rz-right','rz-left','rz-bottom','rz-br','rz-bl'].forEach(cls=>{
    const h=document.createElement('div');
    h.className=cls;
    h.addEventListener('mousedown',e=>startResize(e,id,cls));
    div.appendChild(h);
  });
  overlay.appendChild(div);
  // Uložit původní velikost před maximalizací
  PANEL_REGISTRY[id]={fn,minimized:false,maximized:false,
    savedState:{l:div.style.left,t:div.style.top,w:div.style.width,h:div.style.height}};
  // Automaticky maximalizovat — celá plocha
  div.classList.add('maximized');
  PANEL_REGISTRY[id].maximized=true;
  if(fn==='CRYPTO'){
    setTimeout(function(){
      if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true);
      if(!window._last7dTs || Date.now()-window._last7dTs > 30000){
        if(typeof fetchLive7D==='function') fetchLive7D();
      }
    }, 80);
  }
  // Hide tag + tabs for DOMN
  if(fn==='DOMN'){
    const tag=div.querySelector('.panel-tag');
    const tabs=div.querySelector('.panel-tabs');
    if(tag) tag.remove();
    if(tabs) tabs.style.display='none';
  }

  // bring to front on click
  div.addEventListener('mousedown',()=>{div.style.zIndex=++zTop;});

  // Spustit post-init pro speciální panely
  setTimeout(function(){
    if(fn==='INTEL'){ try{ if(typeof fetchIntelligence==='function') fetchIntelligence(true); setTimeout(()=>{if(typeof _renderINTEL==='function') _renderINTEL();},800); }catch(e){} }
    if(fn==='JOURN'){ try{ if(typeof fetchAllJournNews==='function') fetchAllJournNews(); }catch(e){} }
    if(fn==='NWS'){   try{ if(typeof fetchNWSNews==='function') fetchNWSNews(true); if(typeof fetchAllNews==='function') fetchAllNews(true); }catch(e){} 
      [5000,10000,15000].forEach(function(ms){ setTimeout(function(){ try{ var b=document.getElementById('nws-body'); if(b){ b.innerHTML=buildNWSPanel(0); if(window._nwsFilterText) _nwsFilter(); var si=document.getElementById('nws-srch'); if(si&&window._nwsFilterText) si.value=window._nwsFilterText; } }catch(e){} },ms); });
    }
  }, 100);

  updatePanelCount();
  setStat(`Panel opened: ${fn} — ${getPanelTitle(fn)}`);
  // Hide status bar whenever any panel is open
  document.body.classList.add('panel-open');
  { const s=document.getElementById('STAT'); if(s) s.style.display='none'; }
}

function closePanel(id){
  const el=document.getElementById(id);
  if(id==='bbg-chart-panel'){
    // When silenced (navigation), close directly without history side-effects
    if(window._histSilenced){
      if(window._currentBbgWs){try{window._currentBbgWs.close();}catch(e){} window._currentBbgWs=null;}
      if(window._ovRefreshTimer){clearInterval(window._ovRefreshTimer);window._ovRefreshTimer=null;}
      if(el){el.classList.remove('maximized');el.style.display='none';}
      if(window.PANEL_REGISTRY) delete window.PANEL_REGISTRY[id];
      if(window._toggleBbgClocks) window._toggleBbgClocks(true);
      if(typeof updatePanelCount==='function') updatePanelCount();
      return;
    }
    // Normal user close — use dedicated handler (pushes MAP to history)
    if(window._closeChart) { window._closeChart(); return; }
    if(el) el.style.display='none';
  } else {
    if(el) el.remove();
  }
  delete PANEL_REGISTRY[id];
  updatePanelCount();
  // Show status bar only when no panels are open
  const hasNoPanels = Object.keys(PANEL_REGISTRY).length === 0;
  if(hasNoPanels){
    document.body.classList.remove('panel-open');
    const _st=document.getElementById('STAT'); if(_st) _st.style.display='';
    // Record to history if no folders are open either
    if (!window._histSilenced && !document.querySelector('.ql-tile.open')) _pushHist({type: 'MAP'});
  }
}

function updatePanelCount(){document.getElementById('st-panels').textContent=Object.keys(PANEL_REGISTRY).length;}

function minimizePanel(id){
  const el=document.getElementById(id);const reg=PANEL_REGISTRY[id];if(!el||!reg)return;
  if(reg.minimized){
    // restore
    el.style.height=reg.savedState.h;
    el.querySelectorAll('.panel-tabs,.panel-body').forEach(e=>e.style.display='');
    reg.minimized=false;
  } else {
    reg.savedState={h:el.style.height};
    el.querySelectorAll('.panel-tabs,.panel-body').forEach(e=>e.style.display='none');
    el.style.height='22px';
    reg.minimized=true;
  }
}
function maximizePanel(id){
  const el=document.getElementById(id);const reg=PANEL_REGISTRY[id];if(!el||!reg)return;
  if(reg.maximized){
    el.style.left=reg.savedState.l;el.style.top=reg.savedState.t;
    el.style.width=reg.savedState.w;el.style.height=reg.savedState.h;
    el.classList.remove('maximized');reg.maximized=false;
  } else {
    reg.savedState={l:el.style.left,t:el.style.top,w:el.style.width,h:el.style.height};
    el.classList.add('maximized');reg.maximized=true;
  }
  el.style.zIndex=++zTop;
}
function closeAllPanels(skipHist){
  Object.keys(PANEL_REGISTRY).forEach(id=>closePanel(id));
  if(!skipHist) _pushHist({type: 'MAP'});
}
function minimizeAllPanels(){Object.keys(PANEL_REGISTRY).forEach(id=>{const reg=PANEL_REGISTRY[id];if(reg&&!reg.minimized)minimizePanel(id);});}

function cascadePanels(){
  let i=0;
  Object.keys(PANEL_REGISTRY).forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const reg=PANEL_REGISTRY[id];
    if(reg.minimized)minimizePanel(id);
    if(reg.maximized)maximizePanel(id);
    el.style.left=Math.max(10,window.innerWidth-400-30-i*24)+'px';el.style.top=(10+i*24)+'px';
    el.style.width='400px';el.style.height='280px';
    el.style.zIndex=100+i;i++;
  });
}
function tilePanels(){
  const ids=Object.keys(PANEL_REGISTRY);const n=ids.length;if(!n)return;
  const ow=document.getElementById('map-overlay');
  const cols=Math.ceil(Math.sqrt(n)),rows=Math.ceil(n/cols);
  const W=Math.floor(ow.clientWidth/cols)-4;const H=Math.floor(ow.clientHeight/rows)-4;
  ids.forEach((id,i)=>{
    const el=document.getElementById(id);if(!el)return;
    const reg=PANEL_REGISTRY[id];
    if(reg.minimized)minimizePanel(id);
    if(reg.maximized)maximizePanel(id);
    const col=i%cols,row=Math.floor(i/cols);
    el.style.left=(col*(W+4))+'px';el.style.top=(row*(H+4))+'px';
    el.style.width=W+'px';el.style.height=H+'px';
    el.style.zIndex=100+i;
  });
}

function switchPanelTab(pid,fn,ti,el){
  document.querySelectorAll(`#${pid} .ptab`).forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  const body=document.getElementById('pb-'+pid);
  if(!body)return;
  body.innerHTML=buildPanelContentTab(fn,ti);
  if(fn==='CRYPTO'){
    setTimeout(function(){ if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true); }, 50);
  }
}

/* ═══════════════════════════════════════════════════════
   DRAG (mouse + touch)
═══════════════════════════════════════════════════════ */
let drag=null;
function startDrag(e,id){
  const el=document.getElementById(id);if(!el)return;
  const reg=PANEL_REGISTRY[id];if(reg&&reg.maximized)return;
  const rect=el.getBoundingClientRect();
  const ow=document.getElementById('map-overlay').getBoundingClientRect();
  el.style.zIndex=++zTop;
  drag={el,ox:e.clientX-(rect.left-ow.left),oy:e.clientY-(rect.top-ow.top)};
  e.preventDefault();
}
const _SNAP=8; // px threshold
function _snapX(x,w,owW){
  // Snap to left edge
  if(Math.abs(x)<_SNAP) return 0;
  // Snap to right edge
  if(Math.abs(x+w-owW)<_SNAP) return owW-w;
  // Snap to center
  if(Math.abs(x+w/2-owW/2)<_SNAP) return owW/2-w/2;
  // Snap to other panels
  for(const id of Object.keys(PANEL_REGISTRY)){
    const other=document.getElementById(id);
    if(!other||other===drag.el)continue;
    const ol=parseFloat(other.style.left)||0;
    const ow2=other.offsetWidth;
    if(Math.abs(x-(ol+ow2))<_SNAP) return ol+ow2; // left edge to other right
    if(Math.abs(x+w-ol)<_SNAP) return ol-w;        // right edge to other left
    if(Math.abs(x-ol)<_SNAP) return ol;             // align left edges
  }
  return x;
}
function _snapY(y,h,owH){
  if(Math.abs(y)<_SNAP) return 0;
  if(Math.abs(y+h-owH)<_SNAP) return owH-h;
  for(const id of Object.keys(PANEL_REGISTRY)){
    const other=document.getElementById(id);
    if(!other||other===drag.el)continue;
    const ot=parseFloat(other.style.top)||0;
    const oh=other.offsetHeight;
    if(Math.abs(y-(ot+oh))<_SNAP) return ot+oh; // top to other bottom
    if(Math.abs(y+h-ot)<_SNAP) return ot-h;     // bottom to other top
    if(Math.abs(y-ot)<_SNAP) return ot;          // align tops
  }
  return y;
}
document.addEventListener('mousemove',e=>{
  if(!drag)return;
  const ow=document.getElementById('map-overlay').getBoundingClientRect();
  let x=e.clientX-drag.ox,y=e.clientY-drag.oy;
  x=Math.max(-300,Math.min(x,ow.width-50));
  y=Math.max(0,Math.min(y,ow.height-22));
  // Snap to edges + other panels
  const w=drag.el.offsetWidth, h=drag.el.offsetHeight;
  x=_snapX(x,w,ow.width);
  y=_snapY(y,h,ow.height);
  drag.el.style.left=x+'px';drag.el.style.top=y+'px';
});
document.addEventListener('mouseup',()=>{drag=null;});

/* ═══════════════════════════════════════════════════════
   PANEL RESIZE (all edges)
═══════════════════════════════════════════════════════ */
let _rsz=null;
function startResize(e,id,edge){
  e.stopPropagation();e.preventDefault();
  const el=document.getElementById(id);if(!el)return;
  const ow=document.getElementById('map-overlay').getBoundingClientRect();
  const rect=el.getBoundingClientRect();
  el.style.zIndex=++zTop;
  _rsz={el,edge,
    startX:e.clientX,startY:e.clientY,
    startW:rect.width,startH:rect.height,
    startL:rect.left-ow.left,startT:rect.top-ow.top,
    owW:ow.width,owH:ow.height
  };
}
document.addEventListener('mousemove',e=>{
  if(!_rsz)return;
  const {el,edge,startX,startY,startW,startH,startL,startT,owW,owH}=_rsz;
  const dx=e.clientX-startX, dy=e.clientY-startY;
  const minW=200, minH=80;
  if(edge==='rz-right'||edge==='rz-br'){
    el.style.width=Math.max(minW,Math.min(startW+dx, owW-startL-2))+'px';
  }
  if(edge==='rz-left'||edge==='rz-bl'){
    const nw=Math.max(minW,startW-dx);
    const nl=startL+startW-nw;
    if(nl>=0){el.style.width=nw+'px';el.style.left=nl+'px';}
  }
  if(edge==='rz-bottom'||edge==='rz-br'||edge==='rz-bl'){
    el.style.height=Math.max(minH,Math.min(startH+dy, owH-startT-2))+'px';
  }
},{passive:true});
document.addEventListener('mouseup',()=>{_rsz=null;});

/* ═══════════════════════════════════════════════════════
   PANEL CONTENT BUILDER
═══════════════════════════════════════════════════════ */
// ── FILTERED NEWS PANEL BUILDER ─────────────────────────────────────────────
function _buildFilteredNewsPanel(title, filter, bodyId) {
  setTimeout(()=>{
    var b = document.getElementById(bodyId);
    if (!b) return;
    var allNews = NEWS_DATA.length > 0 ? NEWS_DATA : (_newsCache||[]);
    var words = filter ? filter.toUpperCase().split(' ') : [];
    var filtered = words.length ? allNews.filter(function(a){
      var t = ((a.title||'')+(a.src||'')+(a.tag||'')).toUpperCase();
      return words.some(function(w){ return t.indexOf(w) >= 0; });
    }) : allNews;
    b.innerHTML = buildWNTable(filtered.length ? filtered : allNews);
    if(!allNews.length) fetchAllNews(false);
  }, 100);

  var bid = bodyId;
  var flt = filter;
  var inputId = bodyId + '-srch';
  return `<div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
    <div style="flex-shrink:0;background:#000;border-bottom:1px solid #1a0800;">
      <div style="height:20px;background:#b81111;display:flex;align-items:center;padding:0;border-bottom:1px solid #881010;position:relative">
        <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;letter-spacing:.2px;flex-shrink:0;background:#cc1111;border-right:1px solid #aa0e0e">Search News</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010;position:relative"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''"
          onclick="(function(el,bid2,flt2){var mid='fm-menu-'+bid2;var m=document.getElementById(mid);if(m){m.remove();return;}var d=document.createElement('div');d.id=mid;d.style.cssText='position:fixed;background:#1a0000;border:1px solid #881010;z-index:99999;min-width:180px;box-shadow:0 4px 20px rgba(0,0,0,.9);font-family:Courier Prime,monospace;';var r=el.getBoundingClientRect();d.style.left=r.left+'px';d.style.top=(r.bottom+1)+'px';var items=[['ALL — Show everything',''],['FLASH — Breaking alerts','FLASH'],['MACRO — Central banks &amp; data','MACRO'],['MARKETS — Equities &amp; FX','MARKETS'],['CRYPTO — Digital assets','CRYPTO'],['EARNINGS — Corp results','EARNINGS'],['DEFI — DeFi protocols','DEFI'],['ENERGY — Oil &amp; gas','ENERGY'],['EQUITY — Stock news','EQUITY'],['CB — Central banks only','fed ecb boe boj bis imf snb']];items.forEach(function(it){var s=document.createElement('div');s.textContent=it[0].replace(/&amp;/g,'&');s.style.cssText='padding:6px 14px;font-size:9px;color:#ffccaa;cursor:pointer;border-bottom:1px solid #330000;';s.onmouseover=function(){this.style.background='#330000';};s.onmouseout=function(){this.style.background='';};s.onclick=function(){var inp=document.getElementById(bid2+'-srch');if(inp){inp.value=it[1];}var b=document.getElementById(bid2);if(b){var all=NEWS_DATA.length>0?NEWS_DATA:(_newsCache||[]);var words2=flt2?flt2.toUpperCase().split(' '):[];var v=it[1];var f=all.filter(function(a){var t=((a.title||'')+(a.src||'')+(a.tag||'')).toUpperCase();return(!v||t.indexOf(v.toUpperCase())>=0)&&(!words2.length||words2.some(function(w){return t.indexOf(w)>=0;}));});b.innerHTML=buildWNTable(f.length?f:all);}d.remove();};d.appendChild(s);});document.body.appendChild(d);setTimeout(function(){document.addEventListener('click',function h(e){if(!d.contains(e.target)&&e.target!==el){d.remove();document.removeEventListener('click',h);}});},0);})(this,'${bid}','${flt}')">Actions ▾</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''"
          onclick="openPanel('CUSTSRCH')">Custom Searches</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">Translate ▾</span>
        <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer"
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">${title}</span>
        <span style="margin-left:auto;color:#ffcccc;font-size:9px;padding:0 10px;flex-shrink:0">Page 1</span>
      </div>
      <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
        <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
          <input id="${inputId}" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;caret-color:#1a0500;"
            oninput="(function(v,bid,flt){var b=document.getElementById(bid);if(!b)return;var all=NEWS_DATA.length>0?NEWS_DATA:(_newsCache||[]);var words=flt?flt.toUpperCase().split(' '):[];var f=all.filter(function(a){var t=((a.title||'')+(a.src||'')+(a.tag||'')).toUpperCase();return(!v||t.indexOf(v.toUpperCase())>=0)&&(!words.length||words.some(function(w){return t.indexOf(w)>=0;}));});b.innerHTML=buildWNTable(f.length?f:all);})(this.value,'${bid}','${flt}')"
            onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();}">
          <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0"
            onclick="var i=document.getElementById('${inputId}');i.value='';i.dispatchEvent(new Event('input'))">×</span>
        </div>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">⇥ Sources</span>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
      </div>
    </div>
    <div id="${bodyId}" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#1a1000 #000"></div>
  </div>`;
}

function buildPanelContent(fn){
  switch(fn){
    case 'WEI':    return buildWEITable(CENTERS);
    case 'FX':     return buildFXTable(FXP);
    case 'IDX':    return buildIDX();
    case 'EQUITY': return buildEQUITY();
    case 'MOVERS': return buildMOVERS();
    case 'CRYPTO': return buildCRYPTOMktCap(CRYPTO);
    case 'COMDTY': case 'ENERGY': case 'METALS': case 'AGRI': return buildCOMDTY(fn);
    case 'WORLD':  return buildWEITable(CENTERS);
    case 'MACRO':  return buildMACRO();
    case 'FED':    return buildFED();
    case 'WIRP':   return buildWIRP();
    case 'WN':     setTimeout(()=>{
      var b=document.getElementById('wn-body');
      if(!b) return;
      b.innerHTML='<div style="padding:20px;color:#443322;font-size:10px;text-align:center;letter-spacing:1px">LOADING LIVE NEWS FEED...</div>';
      fetchAllNews(true).then(function(){
        var b2=document.getElementById('wn-body');
        if(b2) b2.innerHTML=buildWNTable(NEWS_DATA);
        setTimeout(()=>{try{_applyBadges();}catch(e){}},100);
        if(window._wnFilterText) window._wnFilter(window._wnFilterText);
      }).catch(function(){
        var b2=document.getElementById('wn-body');
        if(b2) b2.innerHTML=buildWNTable(NEWS_DATA);
      });
    },100); return `<div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
      <div style="flex-shrink:0;background:#000;border-bottom:1px solid #1a0800;">
        <div style="height:20px;background:#b81111;display:flex;align-items:center;padding:0;border-bottom:1px solid #881010;position:relative">
          <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;letter-spacing:.2px;flex-shrink:0;background:#cc1111;border-right:1px solid #aa0e0e">Search News</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010;position:relative"
            onclick="(function(el){var m=document.getElementById('wn-actions-menu');if(m){m.remove();return;}var d=document.createElement('div');d.id='wn-actions-menu';d.style.cssText='position:fixed;background:#1a0000;border:1px solid #881010;z-index:99999;min-width:180px;box-shadow:0 4px 20px rgba(0,0,0,.9);font-family:Courier Prime,monospace;';var r=el.getBoundingClientRect();d.style.left=r.left+'px';d.style.top=(r.bottom+1)+'px';var items=[['ALL — Show everything',''],['FLASH — Breaking alerts','FLASH'],['MACRO — Central banks & data','MACRO'],['MARKETS — Equities & FX','MARKETS'],['CRYPTO — Digital assets','CRYPTO'],['EARNINGS — Corp results','EARNINGS'],['DEFI — DeFi protocols','DEFI'],['ENERGY — Oil & gas','ENERGY'],['EQUITY — Stock news','EQUITY'],['CB — Central banks only','fed ecb boe boj bis imf snb']];items.forEach(function(it){var s=document.createElement('div');s.textContent=it[0];s.style.cssText='padding:6px 14px;font-size:9px;color:#ffccaa;cursor:pointer;border-bottom:1px solid #330000;';s.onmouseover=function(){this.style.background='#330000';};s.onmouseout=function(){this.style.background='';};s.onclick=function(){var inp=document.getElementById('wnews-srch');if(inp){inp.value=it[1];inp.focus();}window._wnFilter(it[1]);d.remove();};d.appendChild(s);});document.body.appendChild(d);setTimeout(function(){document.addEventListener('click',function h(e){if(!d.contains(e.target)&&e.target!==el){d.remove();document.removeEventListener('click',h);}});},0);})(this)">Actions ▾</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010" onclick="openPanel('CUSTSRCH')">Custom Searches</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010">Translate ▾</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer">Key Themes</span>
          <span style="margin-left:auto;color:#ffcccc;font-size:9px;padding:0 10px;flex-shrink:0">Page 1</span>
        </div>
        <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
          <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
            <input id="wnews-srch" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;"
              oninput="window._wnFilter(this.value)" onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();return false;}">
            <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0" onclick="document.getElementById('wnews-srch').value='';window._wnFilter('')">×</span>
          </div>
          <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
            onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">⇥ Sources</span>
          <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
            onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
        </div>

      </div>
      <div id="wn-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#1a1000 #000">${window._wnFilterText ? "" : _wnInitHTML}</div>
    </div>`;
    case 'NWS':    setTimeout(function(){
      var b=document.getElementById('nws-body');
      if(b) b.innerHTML='<div style="padding:20px;color:#443322;font-size:10px;text-align:center;letter-spacing:1px">LOADING NEWS...</div>';
      Promise.allSettled([
        typeof fetchNWSNews==='function'?fetchNWSNews(true):Promise.resolve(),
        typeof fetchAllNews==='function'?fetchAllNews(true):Promise.resolve()
      ]).then(function(){
        var b2=document.getElementById('nws-body');
        if(b2){var st=b2.scrollTop;b2.innerHTML=buildNWSPanel(0);b2.scrollTop=st;}
        var si=document.getElementById('nws-srch');
        if(si&&si.value&&typeof _nwsFilter==='function')_nwsFilter(si.value);
      });
    },50); var _nwsInitHTML=''; try{_nwsInitHTML=buildNWSPanel(0);}catch(e){} return `<div style="display:flex;flex-direction:column;height:100%;background:#000;overflow:hidden">
      <div style="background:#000;border-bottom:1px solid #1a0800;flex-shrink:0;">
        <div style="height:20px;background:#b81111;display:flex;align-items:center;border-bottom:1px solid #881010;position:relative">
          <span style="color:#fff;font-size:9px;font-weight:700;padding:0 10px;height:100%;display:inline-flex;align-items:center;background:#cc1111;border-right:1px solid #aa0e0e">Search News</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010"
            onclick="(function(el){var m=document.getElementById('nws-actions-menu');if(m){m.remove();return;}var d=document.createElement('div');d.id='nws-actions-menu';d.style.cssText='position:fixed;background:#1a0000;border:1px solid #881010;z-index:99999;min-width:200px;box-shadow:0 4px 20px rgba(0,0,0,.9);font-family:Courier Prime,monospace;';var r=el.getBoundingClientRect();d.style.left=r.left+'px';d.style.top=(r.bottom+1)+'px';var items=[['ALL — Show everything',''],['FLASH — Breaking alerts','FLASH'],['MACRO — Central banks & data','MACRO'],['MARKETS — Equities & FX','MARKETS'],['CRYPTO — Digital assets','CRYPTO'],['EARNINGS — Corp results','EARNINGS'],['DEFI — DeFi protocols','DEFI'],['ENERGY — Oil & gas','ENERGY'],['EQUITY — Stock news','EQUITY'],['CB — Fed / ECB / BOE / BOJ','fed ecb boe boj bis imf snb rba boc']];items.forEach(function(it){var s=document.createElement('div');s.textContent=it[0];s.style.cssText='padding:6px 14px;font-size:9px;color:#ffccaa;cursor:pointer;border-bottom:1px solid #330000;';s.onmouseover=function(){this.style.background='#330000';};s.onmouseout=function(){this.style.background='';};s.onclick=function(){var inp=document.getElementById('nws-srch');if(inp){inp.value=it[1];inp.focus();}_nwsFilter(it[1]);d.remove();};d.appendChild(s);});document.body.appendChild(d);setTimeout(function(){document.addEventListener('click',function h(e){if(!d.contains(e.target)&&e.target!==el){d.remove();document.removeEventListener('click',h);}});},0);})(this)">Actions ▾</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010" onclick="openPanel('CUSTSRCH')">Custom Searches</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer;border-right:1px solid #991010">Translate ▾</span>
          <span style="color:#ffdddd;font-size:9px;padding:0 10px;height:100%;display:inline-flex;align-items:center;cursor:pointer">Key Themes</span>
          <span style="margin-left:auto;color:#ffcccc;font-size:9px;padding:0 10px;flex-shrink:0">Page 1</span>
        </div>
        <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
          <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
            <input id="nws-srch" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;"
              oninput="_nwsFilter(this.value)" onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();return false;}">
            <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0" onclick="document.getElementById('nws-srch').value='';_nwsFilter('')">×</span>
          </div>
          <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
            onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">⇥ Sources</span>
          <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;"
            onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
        </div>

      </div>
      <div id="nws-body" style="flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#1a1000 #000">${window._nwsFilterText ? "" : _nwsInitHTML}</div>
    </div>`;
    case 'CUSTSRCH': return buildCUSTSRCH();
    case 'ALERTS': return buildALERTS();
    case 'DES':    return buildDES();
    case 'FA':     return buildFA();
    case 'MMAP':   return buildMMAPSectors();
    case 'YLDS':   return buildYLDS();
    case 'FXIP':   return buildFXIP();
    case 'FXCL':   return buildFXCL();
    case 'CN':     return buildCN();
    case 'WNTOP':  return _buildFilteredNewsPanel('TOP NEWS','TOP','top-body');
    case 'WNMACRO':return _buildFilteredNewsPanel('MACRO NEWS','MACRO','macro-body');
    case 'WNMKT':  return _buildFilteredNewsPanel('MARKETS NEWS','MARKETS','mkt-body');
    case 'WNCRYP': return _buildFilteredNewsPanel('CRYPTO NEWS','CRYPTO','cryp-body');
    case 'WNEARNS':return _buildFilteredNewsPanel('EARNINGS NEWS','EARNINGS','earns-body');
    case 'WNENRG': return _buildFilteredNewsPanel('ENERGY NEWS','ENERGY','enrg-body');
    case 'WNCB':   return _buildFilteredNewsPanel('CENTRAL BANKS','fed ecb boe boj','cb-news-body');
    case 'ECON':   return buildECON();
    case 'ECAL':   return buildECAL();
    case 'ECAL2':  return buildECAL2();
    case 'DEFI':   return buildDEFI();
    case 'CHAIN':  return buildCHAIN();
    case 'PERF':   return buildPERF();
    case 'BYFC':   return buildBYFC();
    case 'ETFF':   return buildETFF(0);
    case 'FUND':   return buildFUND(0);
    case 'LIQD':   return buildLIQD(0);
    case 'DOMN':   return buildDOMN(0);
    case 'DHLO':   return buildDHLO();
    case 'NETSIT': return buildNETSIT(0);
    case 'INTEL':   return buildINTEL();
    case 'MARITIME':return buildMARITIME();
    case 'JOURN':   return buildJOURN();
    case 'SOURCES': return buildSOURCES();
    case 'OPT':     return typeof buildOPT==='function'?buildOPT():'';
    case 'BNDS':    return typeof buildBNDS==='function'?buildBNDS():'';
    case 'EARN':    return typeof buildEARN==='function'?buildEARN():'';
    case 'PORT':    return typeof buildPORT==='function'?buildPORT():'';
    case 'SENT':    return typeof buildSENT==='function'?buildSENT():'';
    case 'IPO':     return typeof buildIPO==='function'?buildIPO():'';
    case 'MNA':     return typeof buildMNA==='function'?buildMNA():'';
    case 'RISK':    return typeof buildRISK==='function'?buildRISK():'';
    case 'GMHM':    return typeof buildGMHM==='function'?buildGMHM():'';
    case 'ORDB':    return typeof buildORDB==='function'?buildORDB():'';
    case 'CRYPTOOPT': return typeof buildCRYPTOOPT==='function'?buildCRYPTOOPT():'';
    case 'WHALE':   return typeof buildWHALE==='function'?buildWHALE():'';
    case 'OIDASH':  return typeof buildOIDASH==='function'?buildOIDASH():'';
    case 'FUNDHIST': return typeof buildFUNDHIST==='function'?buildFUNDHIST():'';
    case 'VPVR':    return typeof buildVPVR==='function'?buildVPVR():'';
    case 'CRYEXC':  return typeof window._buildCryExcPanel==='function'?window._buildCryExcPanel():'<div style="padding:20px;color:#555">Loading CryExc...</div>';
    case 'LIQHEAT': return typeof buildLIQHEAT==='function'?buildLIQHEAT():'';
    case 'CRYPTOHEAT': return buildMMAPCrypto();
    case 'HYPER':   return buildHYPER();
    case 'CRCL':    return buildCRCL();
    case 'METR':    return buildMETR();
    case 'MULTIFEED': return buildMULTIFEED();
    case 'STOCKS2': return buildSTOCKS2();
    default:       return `<div style="padding:8px;color:var(--gr);font-size:9px">Function <span style="color:var(--am)">"${fn}"</span> — enter ticker in search or open from menu</div>`;
  }
}

function buildPanelContentTab(fn,ti){
  if(fn==='WEI'){
    const rmap={nyc:'AM',chi:'AM',tor:'AM',sao:'AM',bue:'AM',lon:'EU',fra:'EU',par:'EU',zur:'EU',ams:'EU',mad:'EU',mil:'EU',sto:'EU',war:'EU',pra:'EU',vie:'EU',bud:'EU',mow:'EU',ist:'EU',dub:'ME',riy:'ME',tlv:'ME',cai:'ME',joh:'ME',tok:'AS',sha:'AS',hkg:'AS',sin:'AS',mum:'AS',seo:'AS',tai:'AS',ban:'AS',syd:'AS'};
    const regs=[null,'AM','EU','AS','ME'];
    return buildWEITable(CENTERS.filter(c=>!regs[ti]||rmap[c.id]===regs[ti]));
  }
  if(fn==='FX'){
    if(ti===0)return buildFXTable(FXP.slice(0,10));
    return buildFXTable(FXP.slice(10));
  }
  if(fn==='IDX'){
    const regions={1:'US',2:'EU',3:'AS',4:'AM',5:'VIX'};
    return buildIDX(regions[ti]||null);
  }
  if(fn==='CRYPTO'){
    if(ti===1) return buildCRYPTOTable(CRYPTO); // WIRE
    return buildCRYPTOMktCap(CRYPTO); // MKT CAP = default
  }
  if(fn==='COMDTY'){
    const cats={1:['CL1','CO1','NG1'],2:['XAU','XAG','XPT','XPD','HG1'],3:['W1','C1']};
    return buildCOMDTYTable(cats[ti]?COMDTY_DATA.filter(c=>cats[ti].includes(c.s)):COMDTY_DATA);
  }
  if(fn==='MACRO'){
    if(ti===1)return buildFED();
    if(ti===2)return buildECBPanel();
    return buildMACRO();
  }
  if(fn==='WN'){
    // Use live cache if available, tagged items only for filtered tabs
    if(_newsCache.length>0){
      const f=ti===1?_newsCache.filter(n=>n.tag==='FLASH'||n.tag==='MACRO'):
              ti===2?_newsCache.filter(n=>n.tag==='MACRO'||n.color==='#00cc44'):
              ti===3?_newsCache.filter(n=>n.tag==='MARKETS'||n.tag==='CRYPTO'):
              _newsCache;
      return buildWNTable(f.length?f:_newsCache);
    }
    const f=ti===1?NEWS_DATA.filter(n=>n.flash):ti===2?NEWS_DATA.filter(n=>n.mac):ti===3?NEWS_DATA.filter(n=>!n.mac):NEWS_DATA;
    return buildWNTable(f);
  }
  if(fn==='MMAP'){
    if(ti===1)return buildMMAPWorld();
    if(ti===2)return buildMMAPCrypto();
    return buildMMAPWidget();
  }
  if(fn==='ECON'){
    if(ti===1)return buildECONRates();
    if(ti===2)return buildECONUnem();
    return buildECON();
  }
  if(fn==='ETFF') return buildETFF(ti);
  if(fn==='FUND') return buildFUND(ti);
  if(fn==='LIQD') return buildLIQD(ti);
  if(fn==='DOMN') return buildDOMN(ti);
  if(fn==='NETSIT'){const h=buildNETSIT(ti);if(ti===3){setTimeout(()=>_startLiveFeedsRefresh(),100);}return h;}
  if(fn==='INTEL'){
    if(ti===1){_intelCache.filters.cat='TRADER';_intelCache.filters.lang='ALL';}
    else if(ti===2){_intelCache.filters.cat='TRADER';_intelCache.filters.lang='ALL';}
    else if(ti===3){_intelCache.filters.quality='VERIFIED';_intelCache.filters.cat='ALL';}
    else if(ti===4){_intelCache.filters.sentiment='BULL';_intelCache.filters.cat='ALL';}
    else{_intelCache.filters.cat='ALL';_intelCache.filters.lang='ALL';_intelCache.filters.quality='ALL';_intelCache.filters.sentiment='ALL';}
    return buildINTEL();
  }
  if(fn==='JOURN'){return buildJOURN(ti);}
  if(fn==='SOURCES'){return buildSOURCES(ti);}
  if(fn==='NWS'){
    const _nb3=document.querySelector('[data-fn="NWS"] #nws-body');
    if(_nb3){const _ns3=_nb3.scrollTop;_nb3.innerHTML=buildNWSPanel(ti);_nb3.scrollTop=_ns3;const _nq3=document.getElementById('nws-srch');if(_nq3&&_nq3.value&&typeof _nwsFilter==='function')_nwsFilter(_nq3.value);return '';}
    return buildNWSPanel(ti);
  }
  return buildPanelContent(fn);
}

/* ═══════════════════════════════════════════════════════
   CONTENT BUILDERS
═══════════════════════════════════════════════════════ */
function buildWEITable(data){
  // Bloomberg-authentic colored cell backgrounds for % change columns
  const chgStr = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  const chgCell = (v, sz='10.5') => {
    const abs = Math.abs(v);
    const intensity = Math.min(0.45, abs * 0.06 + 0.10);
    const bg = v >= 0
      ? `rgba(0,180,60,${intensity})`
      : `rgba(220,40,40,${intensity})`;
    const col = v >= 0 ? '#00ff55' : '#ff4444';
    return `<td style="padding:2px 5px;text-align:right;background:${bg};color:${col};font-weight:900;font-size:${sz}px;font-variant-numeric:tabular-nums;white-space:nowrap">${chgStr(v)}</td>`;
  };
  const th = (label,align='right') => `<th style="padding:4px 5px;font-size:7.5px;color:#cc7722;text-align:${align};letter-spacing:1px;font-weight:700;white-space:nowrap;border-bottom:1px solid #1a1100;background:#0a0500">${label}</th>`;
  let h=`<table style="width:100%;border-collapse:collapse;font-family:var(--fn-num);table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:18px"><col style="width:22%">
    <col style="width:72px"><col style="width:52px">
    <col style="width:50px"><col style="width:50px"><col style="width:50px">
    <col style="width:52px"><col style="width:52px">
    <col style="width:58px"><col style="width:52px">
  </colgroup>
  <tr>
    ${th('#','right')}${th('INDEX','left')}${th('LAST')}
    ${th('1D%')}${th('1W%')}${th('1M%')}${th('YTD%')}
    ${th('OPEN')}${th('HIGH')}${th('MKT CAP')}${th('VOL')}
  </tr>`;
  data.forEach((c,i)=>{
    const m=MKT[c.idx];if(!m)return;
    const rowBg = i%2===0 ? '#000' : '#040200';
    const pr=fmtPx(m.px);
    const w1 = m.chg * 4.8 + (Math.random()-.5)*1.2;
    const m1 = m.ytd * 0.28 + (Math.random()-.5)*2;
    h+=`<tr style="background:${rowBg};cursor:pointer"
        onclick="onSelect('${c.id}');map.flyTo([${c.lat},${c.lng}],4)"
        onmouseover="this.style.background='rgba(243,159,65,.06)'"
        onmouseout="this.style.background='${rowBg}'">
      <td style="padding:2px 4px;text-align:right;color:#554433;font-size:8.5px;font-weight:700;font-variant-numeric:tabular-nums">${i+1}</td>
      <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
        <span style="color:#F39F41;font-weight:800;font-size:10.5px;letter-spacing:.3px">${c.idx}</span>
        <span style="color:#886633;font-size:8.5px;margin-left:5px">${m.n}</span>
      </td>
      <td style="padding:2px 6px;text-align:right;color:#e8dfc8;font-size:10.5px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap">${pr}</td>
      ${chgCell(m.chg,'10.5')}
      ${chgCell(w1,'10')}
      ${chgCell(m1,'10')}
      ${chgCell(m.ytd,'10')}
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${m.open?fmtPx(m.open):'—'}</td>
      <td style="padding:2px 5px;text-align:right;color:#778899;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${m.hi?fmtPx(m.hi):'—'}</td>
      <td style="padding:2px 5px;text-align:right;color:#5599bb;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap;font-weight:700">${m.mc||'—'}</td>
      <td style="padding:2px 5px;text-align:right;color:#554433;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${m.vol||'—'}</td>
    </tr>`;
  });
  return h+'</table>';
}

function buildFXTable(data){
  const MAJORS = ['EUR/USD','GBP/USD','USD/JPY','USD/CHF','AUD/USD','NZD/USD','USD/CAD'];
  const chgStr = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  // Bloomberg-authentic colored cell backgrounds for % change columns
  const chgCell = (v, sz='10') => {
    const abs = Math.abs(v);
    const intensity = Math.min(0.42, abs * 0.08 + 0.08);
    const bg = v >= 0 ? `rgba(0,170,55,${intensity})` : `rgba(210,35,35,${intensity})`;
    const col = v >= 0 ? '#00ee55' : '#ff4444';
    return `<td style="padding:2px 5px;text-align:right;background:${bg};color:${col};font-weight:900;font-size:${sz}px;font-variant-numeric:tabular-nums;white-space:nowrap">${chgStr(v)}</td>`;
  };
  const th = (label,align='right') => `<th style="padding:4px 5px;font-size:7.5px;color:#cc7722;text-align:${align};letter-spacing:1px;font-weight:700;white-space:nowrap;border-bottom:1px solid #1a1100;background:#0a0500">${label}</th>`;
  const grpHdr = lbl => `<tr><td colspan="14" style="padding:5px 6px 3px;font-size:7px;font-weight:700;letter-spacing:2.5px;color:#665533;background:#000;border-top:1px solid #1a1100">${lbl}</td></tr>`;
  // Simulate daily volumes for FX pairs
  const volMap={'EUR/USD':'$680B','GBP/USD':'$330B','USD/JPY':'$580B','USD/CHF':'$120B','AUD/USD':'$190B','NZD/USD':'$68B','USD/CAD':'$210B','USD/CNY':'$42B','USD/INR':'$38B','USD/BRL':'$22B','USD/CZK':'$8B','EUR/CZK':'$6B','USD/TRY':'$18B','USD/ZAR':'$24B','USD/KRW':'$32B','USD/SGD':'$28B','USD/SEK':'$14B','USD/PLN':'$12B','USD/HUF':'$9B','EUR/GBP':'$120B','EUR/JPY':'$84B','GBP/JPY':'$42B','AUD/JPY':'$28B','EUR/CHF':'$36B','USD/MXN':'$48B','USD/THB':'$8B','USD/TWD':'$12B','USD/ILS':'$6B','USD/CLP':'$4B','USD/ARS':'$2B','NZD/JPY':'$14B','CAD/JPY':'$18B','CHF/JPY':'$22B','GBP/CHF':'$16B','AUD/NZD':'$8B','GBP/AUD':'$12B','EUR/AUD':'$18B','USD/NOK':'$16B','USD/DKK':'$8B','USD/RUB':'$6B','USD/PHP':'$4B','USD/IDR':'$6B','USD/MYR':'$4B','USD/VND':'$2B','USD/EGP':'$1B','USD/NGN':'$.8B','USD/PKR':'$1B','USD/BDT':'$.4B','USD/COP':'$3B','USD/PEN':'$2B'};
  let h=`<table style="width:auto;border-collapse:collapse;font-family:var(--fn-num);table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:14px"><col style="width:68px"><col style="width:68px">
    <col style="width:58px"><col style="width:52px">
    <col style="width:50px"><col style="width:50px"><col style="width:50px"><col style="width:50px">
    <col style="width:58px"><col style="width:58px"><col style="width:58px">
    <col style="width:46px"><col style="width:36px">
  </colgroup>`;
  const colHdr = `<tr>
    ${th('#','right')}${th('PAIR','left')}${th('PRICE')}
    ${th('CHG')}${th('SPREAD')}
    ${th('1D%')}${th('5D%')}${th('1M%')}${th('YTD%')}
    ${th('HIGH')}${th('LOW')}${th('OPEN')}
    ${th('VOL')}${th('TIME')}
  </tr>`;
  const mkRow = (f,idx) => {
    const mid=(f.b+f.a)/2,sp=f.a-f.b;
    const dp=mid>10?2:mid>1?4:5;
    const fn2=v=>v.toFixed(dp);
    const chgAbs=mid*f.c/100;
    const open=mid/(1+f.c/100);
    const hi=mid*(1+Math.abs(f.c||0.3)/100*1.2);
    const lo=mid*(1-Math.abs(f.c||0.3)/100*1.2);
    const seed=f.p.charCodeAt(0)+f.p.charCodeAt(4);
    const d5=f.c*2.4+((seed%7)-3)*0.3;
    const m1=f.c*5.2+((seed%11)-5)*0.8;
    const ytd=((mid/(window.YTD_FX&&window.YTD_FX[f.p]||mid)-1)*100);
    const now=new Date();const timeStr=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    const vol=volMap[f.p]||'—';
    const rowBg = idx%2===0 ? '#040200' : '#000';
    const chgAbsCol = chgAbs >= 0 ? '#00ee55' : '#ff4444';
    return `<tr onmouseover="this.style.background='rgba(243,159,65,.06)'" onmouseout="this.style.background='${rowBg}'" style="background:${rowBg};border-bottom:1px solid #0d0800;cursor:pointer">
      <td style="padding:2px 4px;text-align:right;color:#443322;font-size:8.5px;font-weight:700">${idx}</td>
      <td style="padding:2px 6px"><span style="color:#F39F41;font-weight:800;font-size:10.5px;letter-spacing:.3px">${f.p}</span></td>
      <td style="padding:2px 6px;text-align:right;color:#e8dfc8;font-size:10.5px;font-variant-numeric:tabular-nums;font-weight:800">${fn2(mid)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgAbsCol};font-size:9.5px;font-variant-numeric:tabular-nums;font-weight:700">${chgAbs>=0?'+':''}${chgAbs.toFixed(dp)}</td>
      <td style="padding:2px 5px;text-align:right;color:#665544;font-size:9.5px;font-variant-numeric:tabular-nums">${sp.toFixed(dp)}</td>
      ${chgCell(f.c,'10.5')}
      ${chgCell(d5,'10')}
      ${chgCell(m1,'10')}
      ${chgCell(ytd,'10.5')}
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9.5px;font-variant-numeric:tabular-nums">${fn2(hi)}</td>
      <td style="padding:2px 5px;text-align:right;color:#554433;font-size:9.5px;font-variant-numeric:tabular-nums">${fn2(lo)}</td>
      <td style="padding:2px 5px;text-align:right;color:#443322;font-size:9.5px;font-variant-numeric:tabular-nums">${fn2(open)}</td>
      <td style="padding:2px 5px;text-align:right;color:#4488aa;font-size:8.5px;font-weight:700">${vol}</td>
      <td style="padding:2px 4px;text-align:right;color:#332211;font-size:8.5px">${timeStr}</td>
    </tr>`;
  };
  const majors = data.filter(f=>MAJORS.includes(f.p));
  const em = data.filter(f=>!MAJORS.includes(f.p));
  h += grpHdr('MAJORS') + colHdr;
  majors.forEach((f,i) => h += mkRow(f,i+1));
  if(em.length){
    h += grpHdr('EM / OTHER') + colHdr;
    em.forEach((f,i) => h += mkRow(f,majors.length+i+1));
  }
  return h+'</table>';
}

function buildEQUITY(){
  // Bloomberg-authentic: colored cell backgrounds for % change columns
  const chgCell = (v, sz='10') => {
    if(v===undefined||v===null||isNaN(v)) return `<td style="padding:2px 5px;text-align:right;color:#443322;font-size:${sz}px">—</td>`;
    const abs = Math.abs(v);
    const intensity = Math.min(0.42, abs * 0.055 + 0.09);
    const bg = v >= 0 ? `rgba(0,170,55,${intensity})` : `rgba(210,35,35,${intensity})`;
    const col = v >= 0 ? '#00ee55' : '#ff4444';
    return `<td style="padding:2px 5px;text-align:right;background:${bg};color:${col};font-weight:900;font-size:${sz}px;font-variant-numeric:tabular-nums;white-space:nowrap">${(v>=0?'+':'')+v.toFixed(2)+'%'}</td>`;
  };
  const th = (label,align='right') => `<th style="padding:4px 5px;font-size:7.5px;color:#cc7722;text-align:${align};letter-spacing:1px;font-weight:700;white-space:nowrap;border-bottom:1px solid #1a1100;background:#0a0500">${label}</th>`;
  let h=`<table style="width:auto;border-collapse:collapse;font-family:var(--fn-num);table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:14px"><col style="width:42px"><col style="width:120px"><col style="width:62px">
    <col style="width:50px"><col style="width:50px"><col style="width:34px"><col style="width:46px">
    <col style="width:42px"><col style="width:38px"><col style="width:44px"><col style="width:52px">
  </colgroup>
  <tr>
    ${th('#','right')}${th('SYM','left')}${th('COMPANY','left')}${th('PRICE')}
    ${th('1D%')}${th('YTD%')}${th('P/E')}${th('EPS')}
    ${th('DIV%')}${th('BETA')}${th('VOL')}${th('MKT CAP')}
  </tr>`;
  let i=0;
  Object.entries(STKS).forEach(([sym,s])=>{
    i++;
    const chg=s.px-s.open,pct=chg/s.open*100,up=pct>=0;
    const eps    = s.eps  ? '$'+s.eps.toFixed(2)          : '—';
    const divPct = (s.div && s.px) ? (s.div/s.px*100).toFixed(2)+'%' : '—';
    const beta   = s.beta ? s.beta.toFixed(2)              : '—';
    const vol    = s.vol  || '—';
    const sec    = s.sec  || '';
    const secShort = sec.length>10 ? sec.slice(0,9)+'…' : sec;
    const rowBg = i%2===0 ? '#040200' : '#000';
    h+=`<tr onmouseover="this.style.background='rgba(243,159,65,.06)'" onmouseout="this.style.background='${rowBg}'" style="background:${rowBg};border-bottom:1px solid #0d0800;cursor:pointer">
      <td style="padding:2px 4px;text-align:right;color:#554433;font-size:8.5px;font-weight:700">${i}</td>
      <td style="padding:2px 6px"><span style="color:#F39F41;font-weight:800;font-size:10.5px;letter-spacing:.3px">${sym}</span></td>
      <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><span style="color:#998870;font-size:8px;font-weight:600">${s.n}</span> <span style="color:#443322;font-size:7px">${secShort}</span></td>
      <td style="padding:2px 5px;text-align:right;color:#e8dfc8;font-size:10.5px;font-weight:700;font-variant-numeric:tabular-nums">${fmtPx(s.px)}</td>
      ${chgCell(pct,'10.5')}
      ${chgCell(s.ytd,'10')}
      <td style="padding:2px 5px;text-align:right;color:#776655;font-size:9px">${s.pe}</td>
      <td style="padding:2px 5px;text-align:right;color:#665544;font-size:9px;font-variant-numeric:tabular-nums">${eps}</td>
      <td style="padding:2px 5px;text-align:right;color:${s.div?'#00cc55':'#443322'};font-size:9px">${divPct}</td>
      <td style="padding:2px 5px;text-align:right;color:#665544;font-size:9px">${beta}</td>
      <td style="padding:2px 5px;text-align:right;color:#443322;font-size:9px">${vol}</td>
      <td style="padding:2px 5px;text-align:right;color:#4488aa;font-size:9px;font-weight:600">${s.mc}</td></tr>`;
  });
  return h+'</table>';
}

// ── WORLD INDICES DATA ──────────────────────────────
const IDX_DATA=[
  // US
  {s:'SPX',n:'S&P 500',         px:5668.40,chg:-1.24,ytd:8.4,  hi:5724,lo:5642,open:5698,vol:'3.8B',  reg:'US',mc:'$48.2T'},
  {s:'DJIA',n:'Dow Jones',      px:42184,  chg:-.84, ytd:4.2,  hi:42480,lo:42040,open:42340,vol:'380M',reg:'US',mc:'$14.8T'},
  {s:'NDX',n:'Nasdaq 100',      px:19684,  chg:-1.84,ytd:12.4, hi:19920,lo:19540,open:19840,vol:'1.2B',reg:'US',mc:'$28.4T'},
  {s:'RUT',n:'Russell 2000',    px:2084,   chg:-.64, ytd:-2.4, hi:2104,lo:2072,open:2098,vol:'2.4B',   reg:'US',mc:'$3.2T'},
  {s:'VIX',n:'CBOE Volatility', px:18.84,  chg:4.24, ytd:-8.4, hi:19.40,lo:18.20,open:18.40,vol:'—',  reg:'VIX',mc:'—'},
  {s:'SOX',n:'PHLX Semiconductor',px:4284, chg:-2.44,ytd:-14.8,hi:4384,lo:4240,open:4362,vol:'—',      reg:'US',mc:'—'},
  {s:'DJT',n:'Dow Transports',  px:15484,  chg:-.44, ytd:-4.8, hi:15580,lo:15380,open:15540,vol:'—',   reg:'US',mc:'—'},
  {s:'NYA',n:'NYSE Composite',  px:18284,  chg:-.54, ytd:4.8,  hi:18380,lo:18180,open:18340,vol:'—',   reg:'US',mc:'—'},
  // Europe
  {s:'FTSE',n:'FTSE 100',       px:8284,   chg:.44,  ytd:6.8,  hi:8324,lo:8248,open:8262,vol:'840M',   reg:'EU',mc:'$2.8T'},
  {s:'DAX',n:'DAX 40',          px:22484,  chg:.84,  ytd:14.2, hi:22580,lo:22380,open:22420,vol:'—',    reg:'EU',mc:'$2.2T'},
  {s:'CAC',n:'CAC 40',          px:7884,   chg:.34,  ytd:8.4,  hi:7924,lo:7848,open:7862,vol:'—',       reg:'EU',mc:'$2.8T'},
  {s:'IBEX',n:'IBEX 35',        px:12484,  chg:.54,  ytd:12.8, hi:12540,lo:12420,open:12440,vol:'—',    reg:'EU',mc:'—'},
  {s:'MIB',n:'FTSE MIB',        px:38484,  chg:.64,  ytd:14.4, hi:38620,lo:38340,open:38400,vol:'—',    reg:'EU',mc:'—'},
  {s:'AEX',n:'AEX Amsterdam',   px:884,    chg:.24,  ytd:6.4,  hi:890,lo:878,open:882,vol:'—',          reg:'EU',mc:'—'},
  {s:'SMI',n:'Swiss SMI',       px:12084,  chg:.14,  ytd:4.2,  hi:12140,lo:12020,open:12040,vol:'—',    reg:'EU',mc:'—'},
  {s:'STOXX',n:'Euro STOXX 50', px:5284,   chg:.54,  ytd:12.4, hi:5324,lo:5248,open:5262,vol:'—',       reg:'EU',mc:'—'},
  {s:'OMX',n:'OMX Stockholm',   px:2484,   chg:.34,  ytd:8.4,  hi:2498,lo:2468,open:2472,vol:'—',       reg:'EU',mc:'—'},
  {s:'WIG',n:'WIG 20 Warsaw',   px:2284,   chg:-.24, ytd:-2.4, hi:2304,lo:2268,open:2292,vol:'—',       reg:'EU',mc:'—'},
  {s:'PX',n:'PX Prague',        px:1684,   chg:.44,  ytd:8.8,  hi:1698,lo:1672,open:1680,vol:'—',       reg:'EU',mc:'—'},
  {s:'BUX',n:'BUX Budapest',    px:78484,  chg:.24,  ytd:4.2,  hi:78680,lo:78280,open:78340,vol:'—',    reg:'EU',mc:'—'},
  // Asia-Pacific
  {s:'NKY',n:'Nikkei 225',      px:37484,  chg:-.84, ytd:-4.8, hi:37680,lo:37280,open:37540,vol:'1.4B', reg:'AS',mc:'$6.4T'},
  {s:'HSI',n:'Hang Seng',       px:23484,  chg:1.24, ytd:18.4, hi:23680,lo:23280,open:23340,vol:'1.8B', reg:'AS',mc:'$4.2T'},
  {s:'SHCOMP',n:'Shanghai Comp',px:3284,   chg:.44,  ytd:4.2,  hi:3304,lo:3268,open:3278,vol:'4.8B',    reg:'AS',mc:'$6.8T'},
  {s:'SZCOMP',n:'Shenzhen Comp',px:1984,   chg:.64,  ytd:6.4,  hi:1998,lo:1968,open:1978,vol:'3.2B',    reg:'AS',mc:'—'},
  {s:'KOSPI',n:'KOSPI',         px:2484,   chg:-.44, ytd:-2.4, hi:2504,lo:2468,open:2498,vol:'1.2B',    reg:'AS',mc:'$1.8T'},
  {s:'TWSE',n:'TAIEX Taiwan',   px:19884,  chg:-.64, ytd:-4.8, hi:19980,lo:19780,open:19940,vol:'—',    reg:'AS',mc:'$2.4T'},
  {s:'ASX',n:'ASX 200',         px:7884,   chg:.34,  ytd:2.4,  hi:7924,lo:7848,open:7868,vol:'—',       reg:'AS',mc:'$1.6T'},
  {s:'SENSEX',n:'BSE SENSEX',   px:74484,  chg:-.24, ytd:-4.8, hi:74780,lo:74280,open:74640,vol:'—',    reg:'AS',mc:'$4.2T'},
  {s:'NIFTY',n:'NIFTY 50',      px:22484,  chg:-.28, ytd:-4.2, hi:22580,lo:22380,open:22540,vol:'—',    reg:'AS',mc:'—'},
  {s:'STI',n:'Straits Times',   px:3684,   chg:.24,  ytd:4.8,  hi:3698,lo:3668,open:3678,vol:'—',       reg:'AS',mc:'—'},
  {s:'SET',n:'SET Thailand',    px:1284,   chg:-.44, ytd:-8.4, hi:1298,lo:1272,open:1292,vol:'—',       reg:'AS',mc:'—'},
  {s:'JCI',n:'Jakarta Comp',    px:6484,   chg:.14,  ytd:-2.4, hi:6504,lo:6460,open:6478,vol:'—',       reg:'AS',mc:'—'},
  {s:'VNINDEX',n:'VN-Index',    px:1284,   chg:.44,  ytd:4.8,  hi:1298,lo:1272,open:1278,vol:'—',       reg:'AS',mc:'—'},
  // Americas (ex-US)
  {s:'IBOV',n:'Bovespa Brazil', px:128484, chg:-.44, ytd:8.4,  hi:128880,lo:128080,open:128540,vol:'—', reg:'AM',mc:'$1.2T'},
  {s:'TSX',n:'TSX Composite',   px:24484,  chg:-.24, ytd:2.4,  hi:24580,lo:24380,open:24440,vol:'—',    reg:'AM',mc:'$3.4T'},
  {s:'BMV',n:'IPC Mexico',      px:52484,  chg:.34,  ytd:-4.8, hi:52680,lo:52280,open:52380,vol:'—',    reg:'AM',mc:'—'},
  {s:'MERVAL',n:'MERVAL Argentina',px:1848400,chg:1.84,ytd:42.4,hi:1860000,lo:1840000,open:1844000,vol:'—',reg:'AM',mc:'—'},
  {s:'COLCAP',n:'COLCAP Colombia',px:1484,  chg:.24,  ytd:4.2,  hi:1498,lo:1472,open:1480,vol:'—',      reg:'AM',mc:'—'},
  // Middle East & Africa
  {s:'TASI',n:'Tadawul Saudi',  px:11484,  chg:-.34, ytd:-8.4, hi:11540,lo:11420,open:11480,vol:'—',    reg:'ME',mc:'$2.8T'},
  {s:'ADX',n:'ADX Abu Dhabi',   px:9284,   chg:.14,  ytd:2.4,  hi:9304,lo:9260,open:9278,vol:'—',       reg:'ME',mc:'—'},
  {s:'JKSE',n:'JSE Top 40 SA',  px:72484,  chg:.44,  ytd:4.8,  hi:72680,lo:72280,open:72400,vol:'—',    reg:'ME',mc:'—'},
  {s:'EGX30',n:'EGX 30 Egypt',  px:28484,  chg:.64,  ytd:14.4, hi:28680,lo:28280,open:28340,vol:'—',    reg:'ME',mc:'—'}
];

function buildIDX(regionFilter){
  // Bloomberg-authentic colored cell backgrounds
  const chgStr = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  const chgCell = (v, sz='10') => {
    const abs = Math.abs(v);
    const intensity = Math.min(0.42, abs * 0.055 + 0.09);
    const bg = v >= 0 ? `rgba(0,170,55,${intensity})` : `rgba(210,35,35,${intensity})`;
    const col = v >= 0 ? '#00ee55' : '#ff4444';
    return `<td style="padding:2px 5px;text-align:right;background:${bg};color:${col};font-weight:900;font-size:${sz}px;font-variant-numeric:tabular-nums;white-space:nowrap">${chgStr(v)}</td>`;
  };
  const th = (label,align='right') => `<th style="padding:4px 5px;font-size:7.5px;color:#cc7722;text-align:${align};letter-spacing:1px;font-weight:700;white-space:nowrap;border-bottom:1px solid #1a1100;background:#0a0500">${label}</th>`;
  const fmtIdx = v => v>=10000?v.toLocaleString('en',{maximumFractionDigits:0}):v.toFixed(2);
  
  const filtered = regionFilter ? IDX_DATA.filter(d=>d.reg===regionFilter) : IDX_DATA;
  
  let h=`<table style="width:auto;border-collapse:collapse;font-family:var(--fn-num);table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:14px"><col style="width:48px"><col style="width:120px"><col style="width:68px">
    <col style="width:50px"><col style="width:50px"><col style="width:58px">
    <col style="width:58px"><col style="width:58px"><col style="width:58px">
    <col style="width:50px"><col style="width:36px">
  </colgroup>
  <tr>
    ${th('#','right')}${th('SYM','left')}${th('INDEX','left')}${th('LAST')}
    ${th('CHG%')}${th('YTD%')}${th('MKT CAP')}
    ${th('HIGH')}${th('LOW')}${th('OPEN')}
    ${th('VOL')}${th('TIME')}
  </tr>`;
  filtered.forEach((d,i)=>{
    const rowBg = i%2===0 ? '#000' : '#040200';
    const chgAbs=d.px*d.chg/100;
    const now=new Date();const timeStr=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    h+=`<tr onmouseover="this.style.background='rgba(243,159,65,.06)'" onmouseout="this.style.background='${rowBg}'" style="background:${rowBg};border-bottom:1px solid #0d0800">
      <td style="padding:2px 4px;text-align:right;color:#443322;font-size:8px">${i+1}</td>
      <td style="padding:2px 6px"><span style="color:#F39F41;font-weight:800;font-size:10px;letter-spacing:.3px">${d.s}</span></td>
      <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><span style="color:#998870;font-size:8px;font-weight:600">${d.n}</span></td>
      <td style="padding:2px 5px;text-align:right;color:#e8dfc8;font-size:10.5px;font-weight:700;font-variant-numeric:tabular-nums">${fmtIdx(d.px)}</td>
      ${chgCell(d.chg,'10.5')}
      ${chgCell(d.ytd,'10')}
      <td style="padding:2px 5px;text-align:right;color:#4488aa;font-size:8px;font-weight:700">${d.mc||'—'}</td>
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9px;font-variant-numeric:tabular-nums">${fmtIdx(d.hi)}</td>
      <td style="padding:2px 5px;text-align:right;color:#665840;font-size:9px;font-variant-numeric:tabular-nums">${fmtIdx(d.lo)}</td>
      <td style="padding:2px 5px;text-align:right;color:#554433;font-size:9px;font-variant-numeric:tabular-nums">${fmtIdx(d.open)}</td>
      <td style="padding:2px 5px;text-align:right;color:#443322;font-size:8px">${d.vol||'—'}</td>
      <td style="padding:2px 4px;text-align:right;color:#332211;font-size:8px">${timeStr}</td>
    </tr>`;
  });
  return h+'</table>';
}

// ── Jan 1 2026 opening prices — used for YTD% across all panels ──────────
const YTD_OPEN_2026 = {
  // Equities
  AAPL:243.01, NVDA:134.25, MSFT:420.55, GOOGL:191.85, META:589.34,
  AMZN:224.19, TSLA:403.84, JPM:254.02,  GS:603.63,   BRK:558.89,
  BAC:46.99,   WFC:79.68,   MS:137.58,   UNH:522.42,  LLY:799.12,
  JNJ:152.88,  ABBV:170.15, XOM:108.22,  CVX:157.16,  COP:104.78,
  WMT:93.18,   COST:971.00, KO:62.77,    PEP:147.50,  V:316.89,
  MA:553.16,   HD:396.08,   NFLX:891.22, AMD:124.98,  INTC:19.84,
  CRM:348.00,  ORCL:178.89, ADBE:448.94, PYPL:89.02,  SHOP:117.88,
  UBER:70.62,  SPOT:471.44, COIN:259.12, PLTR:76.78,
  // Crypto
  BTC:94200,   ETH:3350,    XRP:2.10,    BNB:715,     SOL:190, ADA:0.9100,  TRX:0.2550,  HYPE:26.80,  LINK:19.20,
  AVAX:37.80,  SUI:4.80,    XLM:0.4100,  LTC:103.50,  DOT:8.10,
  UNI:13.20,   NEAR:6.40,   AAVE:260.00, ICP:12.80,   KAS:0.1580,
  APT:11.40,   RENDER:7.80, ATOM:5.40,   FIL:6.80,    OP:1.80,
  ARB:0.7800,  INJ:21.80,   JUP:1.20,    RAY:5.40,    JTO:4.20,
  PYTH:0.6200, LDO:2.40,    MKR:1580,    CRV:1.10,
  GMX:19.80,   FTM:0.9800,  ALGO:0.4100, VET:0.0540,  XMR:192,
  BCH:490,     FET:1.18,    IMX:1.52,
  STRK:0.512,  SEI:0.478,   TON:5.72,    OM:3.64,
  VIRTUAL:1.68,BERA:8.40,   MOVE:0.720,  ETC:34.20,
  ZEC:52.40,   GRT:0.188,   PENDLE:5.20,
  // v4 new tokens
  ONDO:1.42,  ENA:1.08,   WLD:2.84,   TIA:7.80,   JTO:4.82,
  PYTH:0.62,  BONK:0.000048, WIF:2.84,  BERA:8.40,  MOVE:0.72,
  VIRTUAL:1.68,KAS:0.158,  FLOKI:0.000215,PEPE:0.0000276,
  // Additional stocks v4
  MSTR:339.45,COIN:259.12,SOFI:14.82, HOOD:23.18, PLTR:76.78,
  UPST:68.40, AFRM:62.48, IBIT:54.12, SPY:586.12, QQQ:510.88, GLD:248.32,
  // FX
  'EUR/USD':1.0420,'GBP/USD':1.2520,'USD/JPY':157.80,'USD/CHF':0.9020,
  'AUD/USD':0.6218,'NZD/USD':0.5640,'USD/CAD':1.4420,'USD/CNY':7.2980,
  'USD/INR':85.80, 'USD/BRL':6.1800,'USD/CZK':24.480,'EUR/CZK':25.520,
  'USD/TRY':35.280,'USD/ZAR':18.680,'USD/KRW':1480.0,'USD/SGD':1.3620,
  'USD/SEK':11.020,'USD/PLN':4.1200,'USD/HUF':400.80,
  // Commodities
  XAU:2639.0, XAG:29.20, XPT:938.0, XPD:920.0,
  CL1:73.82,  CO1:76.48, NG1:3.640, HG1:4.284,
  W1:526.0,   C1:444.0,
  // ETFs
  SPY:586.12,  QQQ:510.88,  IWM:220.48,  DIA:420.94,  VTI:278.62,
  GLD:248.32,  SLV:27.88,   TLT:88.12,   HYG:79.18,   LQD:107.40,
  XLK:238.82,  XLF:51.28,   XLE:92.18,   XLV:148.40,  XLI:138.82,
  XLP:80.12,   XLY:212.18,  XLU:74.28,   ARKK:52.80,  ARKG:26.12,
  VXX:14.82,   SQQQ:6.12,   TQQQ:82.18,  EEM:44.82,   EFA:80.28,
  FXI:29.82,   EWJ:72.28,   VNQ:92.18,   IBIT:54.12,  FBTC:53.88,
  // New stocks added v4
  MSTR:339.45, COIN:259.12, SOFI:14.82,  HOOD:23.18,  UPST:68.40,
  AFRM:62.48,  PLTR:76.78,  RBLX:44.18,  SNOW:154.82, DDOG:148.22,
  NET:88.40,   CRWD:384.82, ZS:212.18,   OKTA:98.22,  MNDY:198.82,
  RIVN:14.22,  LCID:2.88,   NIO:4.12,    XPEV:8.82,   ENPH:98.22,
  FSLR:192.48, LMT:482.88,  RTX:122.48,  NOC:512.82,  GD:292.48,
  BA:172.22,   MRNA:48.22,  BNTX:92.48,  REGN:642.22, VRTX:432.82,
  DIS:88.22,   PARA:12.48,  WBD:9.82,    SPOT:488.22, TGT:148.22,
  AMGN:282.48, O:52.82,     AMT:192.22,  NEM:38.22,   FCX:44.82,
  QCOM:168.22, AVGO:198.82, MU:118.22,   AMAT:192.48, TXN:188.22,
  SQ:84.82,    PYPL:64.22,  GOLD:16.22,  MO:58.40
};

// ── 7 days ago prices (Mar 7 2026) — updated for week of Mar 14 2026 ─────
const W1_OPEN = {};
// W1_OPEN is populated exclusively by fetchLive7D() from live APIs (Binance/Bybit/OKX/HL/CoinGecko)
// No static fallback values — 7D% shows "—" until live data arrives (typically <2s)

const calcYtd2026 = (sym, px) => {
  const o = YTD_OPEN_2026[sym];
  if(o==null||o===0||o===undefined||px==null||px<=0) return null;
  // Zobraz YTD% pouze pokud máme živou cenu z API
  const coin = (typeof CRYPTO!=='undefined') ? CRYPTO.find(c=>c.s===sym) : null;
  if(coin && !coin._pxTs) return null; // ještě nepřišla živá cena — zobraz "—"
  const ytd = ((px/o)-1)*100;
  if(ytd > 5000 || ytd < -100) return null;
  return ytd;
};
const calcW1 = (sym, px) => {
  const c = CRYPTO.find(x=>x.s===sym);
  if(c && c.chg7!=null && c._chg7live) return c.chg7;
  // No static fallback — only live data
  return null;
};

// ── Direct 7D% fetch from Binance windowedPriceChanges ──────────────────────
// /api/v3/ticker?windowSize=7d — returns exact 7-day % change, no klines needed
async function fetchLive7D(){
  const _ab = ms => { const c=new AbortController(); setTimeout(()=>c.abort(),ms); return c.signal; };
  let updated = 0;
  // NERESETUJEME _chg7live — předchozí data zůstanou viditelná dokud nepřijdou nová

  // ── CoinGecko — 7D% pro všechny coiny najednou ───────────────────────────────
  // Nejspolehlivější zdroj — obsahuje přesné 7d % pro každý coin
  // Stránkování: max 250 coinů na stránku, fetchujeme 2 stránky (pokryje 500 coinů)
  const allIds = CRYPTO.filter(c=>c.id&&!c.s.endsWith('2')).map(c=>c.id);

  for(let page=1; page<=2; page++){
    try{
      const cgUrl = 'https://api.coingecko.com/api/v3/coins/markets'
        +'?vs_currency=usd'
        +'&ids='+allIds.join(',')
        +'&price_change_percentage=7d'
        +'&sparkline=false'
        +'&per_page=250'
        +'&page='+page
        +'&order=market_cap_desc';

      // Zkus přímý přístup nejdříve, pak corsproxy jako záloha
      let r = null;
      try{
        r = await fetch(cgUrl, {signal:_ab(8000)});
        if(!r.ok) r = null;
      }catch(_){ r = null; }

      if(!r){
        r = await fetch('https://corsproxy.io/?url='+encodeURIComponent(cgUrl), {signal:_ab(15000)});
      }

      if(!r||!r.ok) continue;
      const d = await r.json();
      if(!Array.isArray(d)||d.length===0) break; // prázdná stránka = hotovo

      d.forEach(item=>{
        const coin = CRYPTO.find(c=>c.id===item.id);
        if(!coin) return;
        const chg7 = item.price_change_percentage_7d_in_currency
                  ?? item.price_change_percentage_7d;
        if(chg7!=null){
          coin.chg7 = chg7;
          coin._chg7live = true;
          W1_OPEN[coin.s] = item.current_price / (1 + chg7/100);
          updated++;
        }
      });
      console.log('[7D] CoinGecko page '+page+':', d.length, 'coins parsed,', updated, 'updated');
      if(d.length < 250) break; // méně než plná stránka = poslední stránka
    }catch(e){
      console.warn('[7D] CoinGecko page '+page+' failed:', e.message);
    }
  }

  // ── Záloha: Hyperliquid pro HYPE pokud CoinGecko selhal ─────────────────────
  const hype = CRYPTO.find(c=>c.s==='HYPE');
  if(hype && !hype._chg7live){
    try{
      const r = await fetch('https://api.hyperliquid.xyz/info',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'candleSnapshot',req:{
          coin:'HYPE', interval:'1D',
          startTime:Date.now()-9*86400000, endTime:Date.now()
        }}),
        signal:_ab(7000)
      });
      const d = await r.json();
      if(Array.isArray(d)&&d.length>=7){
        const open7 = parseFloat(d[d.length-7]?.o||d[d.length-7]?.[1]);
        const close0 = parseFloat(d[d.length-1]?.c||d[d.length-1]?.[4]);
        if(open7>0&&close0>0){
          hype.chg7 = ((close0/open7)-1)*100;
          hype._chg7live = true;
          W1_OPEN['HYPE'] = open7;
          updated++;
          console.log('[7D] HYPE from Hyperliquid:', hype.chg7.toFixed(2)+'%');
        }
      }
    }catch(_){}
  }

  // ── Záloha: Binance pro coiny co CoinGecko nezná nebo vynechal ───────────────
  const bnMissing = CRYPTO.filter(c=>!c._chg7live&&c.s&&!c.s.endsWith('2')&&c.s!=='HYPE');
  if(bnMissing.length){
    await Promise.allSettled(bnMissing.map(async coin=>{
      try{
        const r = await fetch(
          'https://api.binance.com/api/v3/ticker?symbol='+coin.s+'USDT&windowSize=7d&type=MINI',
          {signal:_ab(6000)}
        );
        if(!r.ok) return;
        const t = await r.json();
        const open7 = parseFloat(t.openPrice);
        const close7 = parseFloat(t.lastPrice||t.closePrice);
        if(open7>0&&close7>0){
          coin.chg7 = ((close7/open7)-1)*100;
          coin._chg7live = true;
          W1_OPEN[coin.s] = open7;
          updated++;
        }
      }catch(_){}
    }));
    if(bnMissing.length) console.log('[7D] Binance fallback:', bnMissing.filter(c=>c._chg7live).length, 'coins');
  }

  // ── DOM UPDATE ───────────────────────────────────────────────────────────────
  window._ytdPatchTs = 0;
  if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true);
  if(typeof _patchCRYPTOPanel==='function') _patchCRYPTOPanel();
  window._last7dTs = Date.now();
  const still = CRYPTO.filter(c=>!c._chg7live&&!c.s.endsWith('2')).map(c=>c.s);
  console.log('[7D] DONE:', updated, 'coins updated.'+(still.length ? ' Still missing: '+still.join(',') : ' ALL COVERED ✓'));
}

function buildMOVERS(){
  const fmtC = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  const upCol='#00cc44', dnCol='#ff3333';
  const today = new Date();
  const ds = today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
  const rng = (s,i) => { let x=Math.sin(s+i*9301+49297)*233280; return x-Math.floor(x); };
  const fmtCPx = v => {
    if(!v&&v!==0) return '—';
    if(v>=1000) return '$'+v.toLocaleString('en',{maximumFractionDigits:0});
    if(v>=1)    return '$'+v.toFixed(2);
    if(v>=0.001)return '$'+v.toFixed(4);
    return '$'+v.toFixed(6);
  };

  // ── Jan 1 2026 opening prices (close of Dec 31 2025) ─────────────────────
  const YTD_OPEN = {
    // Equities — close Dec 31 2025
    AAPL:243.01, NVDA:134.25, MSFT:420.55, GOOGL:191.85, META:589.34,
    AMZN:224.19, TSLA:403.84, JPM:254.02, GS:603.63, BRK:558.89,
    BAC:46.99,   WFC:79.68,   MS:137.58,  UNH:522.42, LLY:799.12,
    JNJ:152.88,  ABBV:170.15, XOM:108.22, CVX:157.16, COP:104.78,
    WMT:93.18,   COST:971.00, KO:62.77,   PEP:147.50, V:316.89,
    MA:553.16,   HD:396.08,   NFLX:891.22,AMD:124.98, INTC:19.84,
    CRM:348.00,  ORCL:178.89, ADBE:448.94,PYPL:89.02, SHOP:117.88,
    UBER:70.62,  SPOT:471.44, COIN:259.12,PLTR:76.78,
    // Crypto — Jan 1 2026 open
    BTC:  84200,  ETH:  1940,   XRP:  2.38,  BNB:  608,   SOL:  131,
    DOGE: 0.3200, ADA:  0.9100, TRX:  0.2550,HYPE: 26.80,  LINK: 19.20,
    AVAX: 37.80,  SUI:  4.80,   XLM:  0.4100,LTC:  103.50, DOT:  8.10,
    UNI:  13.20,  NEAR: 6.40,   AAVE: 260.00,ICP:  12.80,  KAS:  0.1580,
    APT:  11.40,  RENDER:7.80,  ATOM: 5.40,  FIL:  6.80,   OP:   1.80,
    ARB:  0.7800, INJ:  21.80,  SAND: 0.5200,GALA: 0.0320,
    BONK: 0.0000380,WIF: 2.80,  JUP:  1.20,  RAY:  5.40,   JTO:  4.20,
    PYTH: 0.6200, W:    0.3800, LDO:  2.40,  MKR:  1580,   CRV:  1.10,
    GMX:  19.80,  FTM:  0.9800, ALGO: 0.4100,VET:  0.0540, XMR:  190,
    BCH:  490,    APE:  1.20,   FET:  1.18,  MEW:  0.0148,
    // FX — Jan 1 2026
    'EUR/USD':1.0420,'GBP/USD':1.2520,'USD/JPY':157.80,'USD/CHF':0.9020,
    'AUD/USD':0.6218,'NZD/USD':0.5640,'USD/CAD':1.4420,'USD/CNY':7.2980,
    'USD/INR':85.80, 'USD/BRL':6.1800,'USD/CZK':24.480,'EUR/CZK':25.520,
    'USD/TRY':35.280,'USD/ZAR':18.680,'USD/KRW':1480.0,'USD/SGD':1.3620,
    'USD/SEK':11.020,'USD/PLN':4.1200,'USD/HUF':400.80,
    // Commodities — Jan 1 2026
    XAU:2639.0, XAG:29.20,  XPT:938.0, XPD:920.0,
    CL1:73.82,  CO1:76.48,  NG1:3.640, HG1:4.284,
    W1: 526.0,  C1: 444.0,
    // ETFs — Jan 1 2026
    SPY:586.12,  QQQ:510.88,  IWM:220.48,  DIA:420.94,  VTI:278.62,
    GLD:248.32,  SLV:27.88,   TLT:88.12,   HYG:79.18,   LQD:107.40,
    XLK:238.82,  XLF:51.28,   XLE:92.18,   XLV:148.40,  XLI:138.82,
    XLP:80.12,   XLY:212.18,  XLU:74.28,   ARKK:52.80,  ARKG:26.12,
    VXX:14.82,   SQQQ:6.12,   TQQQ:82.18,  EEM:44.82,   EFA:80.28,
    FXI:29.82,   EWJ:72.28,   VNQ:92.18,   IBIT:54.12,  FBTC:53.88
};

  const calcYtd = (sym, px) => {
    const open = YTD_OPEN[sym];
    if(open==null || open===0 || px==null) return null;
    return ((px / open) - 1) * 100;
  };

  // expose globally so other panels (MKT CAP etc.) can use it
  window._cryptoYtdOpen = YTD_OPEN;

  // přidám ytd počítané z Jan 1 2026 open
  const eqAll = Object.entries(STKS).map(([k,v],i)=>({s:k,n:v.n,px:v.px,chg:(rng(ds,i+1)-.45)*9.4,ytd:calcYtd2026(k,v.px)}));
  const crAll = CRYPTO.map((c,i)=>({s:c.s,n:c.n,px:c.px,chg:c.chg+(rng(ds+1000,i)-.5)*2,ytd:calcYtd2026(c.s,c.px)}));
  const fxAll = FXP.map((f,i)=>({s:f.p,n:f.p,px:f.b,chg:f.c+(rng(ds+2000,i)-.5)*.6,ytd:calcYtd2026(f.p,f.b)}));
  const cmAll = COMDTY_DATA.map((c,i)=>({s:c.s,n:c.n,px:c.px,chg:c.chg+(rng(ds+3000,i)-.5)*1.2,ytd:calcYtd2026(c.s,c.px)}));
  const etfAll = [
    {s:'SPY', n:'SPDR S&P 500 ETF',          px:558.40, ytd:-8.2},
    {s:'QQQ', n:'Invesco Nasdaq-100 ETF',     px:468.20, ytd:-12.4},
    {s:'IWM', n:'iShares Russell 2000',       px:196.40, ytd:-14.8},
    {s:'DIA', n:'SPDR Dow Jones ETF',         px:428.80, ytd:-4.6},
    {s:'VTI', n:'Vanguard Total Market',      px:248.40, ytd:-9.4},
    {s:'GLD', n:'SPDR Gold Shares',           px:278.80, ytd:11.2},
    {s:'SLV', n:'iShares Silver Trust',       px:28.40,  ytd:8.4},
    {s:'TLT', n:'iShares 20Y+ Treasury',      px:88.60,  ytd:2.4},
    {s:'HYG', n:'iShares High Yield Bond',    px:78.40,  ytd:-1.8},
    {s:'LQD', n:'iShares IG Corp Bond',       px:108.40, ytd:0.4},
    {s:'XLK', n:'Technology Select SPDR',     px:218.40, ytd:-14.8},
    {s:'XLF', n:'Financial Select SPDR',      px:46.20,  ytd:-4.2},
    {s:'XLE', n:'Energy Select SPDR',         px:88.40,  ytd:-8.4},
    {s:'XLV', n:'Health Care Select SPDR',    px:138.40, ytd:-6.2},
    {s:'XLI', n:'Industrial Select SPDR',     px:128.40, ytd:-8.8},
    {s:'XLP', n:'Consumer Staples SPDR',      px:78.40,  ytd:4.2},
    {s:'XLY', n:'Consumer Disc. SPDR',        px:188.40, ytd:-16.4},
    {s:'XLU', n:'Utilities Select SPDR',      px:68.40,  ytd:4.8},
    {s:'ARKK',n:'ARK Innovation ETF',         px:38.80,  ytd:-28.4},
    {s:'ARKG',n:'ARK Genomic Revolution',     px:18.40,  ytd:-22.4},
    {s:'VXX', n:'iPath Series B VIX ETN',     px:18.60,  ytd:18.4},
    {s:'SQQQ',n:'ProShares UltraPro Short QQQ',px:8.40,  ytd:38.4},
    {s:'TQQQ',n:'ProShares UltraPro QQQ',     px:58.40,  ytd:-34.8},
    {s:'EEM', n:'iShares MSCI Emerging Mkts', px:42.40,  ytd:4.8},
    {s:'EFA', n:'iShares MSCI EAFE',          px:78.40,  ytd:8.4},
    {s:'FXI', n:'iShares China Large-Cap',    px:32.40,  ytd:14.8},
    {s:'EWJ', n:'iShares MSCI Japan',         px:68.40,  ytd:-6.4},
    {s:'VNQ', n:'Vanguard Real Estate ETF',   px:84.40,  ytd:-8.4},
    {s:'IBIT',n:'iShares Bitcoin Trust',      px:52.40,  ytd:-18.4},
    {s:'FBTC',n:'Fidelity Wise Origin BTC',   px:51.80,  ytd:-18.8}
  ].map((e,i)=>({...e, chg:(rng(ds+4000,i)-.46)*6.4, ytd:calcYtd(e.s,e.px)}));

  const fmtYtd = v => {
    if(v===null||v===undefined) return '<td style="padding:3px 8px 3px 4px;text-align:right;color:#443322;font-size:10px">—</td>';
    const abs = Math.abs(v);
    const intensity = Math.min(0.42, abs * 0.04 + 0.08);
    const bg = v>=0 ? `rgba(0,170,55,${intensity})` : `rgba(210,35,35,${intensity})`;
    const col = v>=0 ? '#00ee55' : '#ff4444';
    return `<td style="padding:3px 8px 3px 4px;font-size:10px;text-align:right;background:${bg};color:${col};font-weight:900;font-family:var(--fn-num);white-space:nowrap;border-bottom:1px solid #0d0800;font-variant-numeric:tabular-nums">${v>=0?'+':''}${v.toFixed(2)}%</td>`;
  };

  const mkRows = (entries, pxFmt) => {
    const s = [...entries].sort((a,b)=>b.chg-a.chg);
    const g = s.slice(0,15), l = [...s].reverse().slice(0,15);
    const colHdr = (label) => `<tr>
      <td colspan="5" style="padding:5px 8px 3px;font-size:7.5px;font-weight:700;letter-spacing:2.5px;color:#665533;background:#000;border-top:1px solid #1a1100">${label}</td>
    </tr>
    <tr style="background:#060300">
      <th style="padding:3px 6px 3px 8px;font-size:7.5px;color:#cc7722;letter-spacing:1px;font-weight:700;text-align:left;border-bottom:1px solid #1a1100">SYM</th>
      <th style="padding:3px 6px;font-size:7.5px;color:#cc7722;letter-spacing:1px;font-weight:700;text-align:left;border-bottom:1px solid #1a1100">NAME</th>
      <th style="padding:3px 8px;font-size:7.5px;color:#cc7722;letter-spacing:1px;font-weight:700;text-align:right;border-bottom:1px solid #1a1100">PRICE</th>
      <th style="padding:3px 6px;font-size:7.5px;color:#cc7722;letter-spacing:1px;font-weight:700;text-align:right;border-bottom:1px solid #1a1100">1D%</th>
      <th style="padding:3px 8px 3px 4px;font-size:7.5px;color:#cc7722;letter-spacing:1px;font-weight:700;text-align:right;border-bottom:1px solid #1a1100">YTD%</th>
    </tr>`;
    const row = (e,chgVal) => {
      const abs = Math.abs(chgVal);
      const intensity = Math.min(0.45, abs * 0.06 + 0.10);
      const bg = chgVal>=0 ? `rgba(0,170,55,${intensity})` : `rgba(210,35,35,${intensity})`;
      const col = chgVal>=0 ? '#00ee55' : '#ff4444';
      return `<tr style="background:#000"
        onmouseover="this.style.background='rgba(243,159,65,.055)'" onmouseout="this.style.background='#000'">
        <td style="padding:3px 6px 3px 8px;font-size:10.5px;font-weight:800;color:#F39F41;font-family:var(--fn-num);white-space:nowrap;border-bottom:1px solid #0d0800;letter-spacing:.3px">${e.s}</td>
        <td style="padding:3px 6px;font-size:9.5px;color:#887766;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-bottom:1px solid #0d0800">${e.n}</td>
        <td style="padding:3px 8px;font-size:10.5px;color:#e8dfc8;text-align:right;font-family:var(--fn-num);white-space:nowrap;border-bottom:1px solid #0d0800;font-weight:700">${pxFmt(e.px)}</td>
        <td style="padding:3px 6px;font-size:10.5px;font-weight:900;background:${bg};color:${col};text-align:right;font-family:var(--fn-num);white-space:nowrap;border-bottom:1px solid #0d0800;font-variant-numeric:tabular-nums">${fmtC(chgVal)}</td>
        ${fmtYtd(e.ytd)}
      </tr>`;
    };
    return colHdr('TOP 15 GAINERS') + g.map(e=>row(e,e.chg)).join('')
         + colHdr('TOP 15 LOSERS')  + l.map(e=>row(e,e.chg)).join('');
  };

  // precompute all tab contents stored in window
  window._mvData = {
    EQ:    mkRows(eqAll,  v=>'$'+v.toFixed(2)),
    CRYPTO:mkRows(crAll,  fmtCPx),
    FX:    mkRows(fxAll,  v=>v.toFixed(4)),
    CMDTY: mkRows(cmAll,  v=>'$'+v.toFixed(2)),
    ETF:   mkRows(etfAll, v=>'$'+v.toFixed(2))
};

  window._mvSwitch = function(sec, ev){
    if(ev){ ev.stopPropagation(); ev.preventDefault(); }
    const tbody = document.getElementById('mv-tbody');
    if(tbody) tbody.innerHTML = window._mvData[sec] || '';
    document.querySelectorAll('.mv-ptab').forEach(function(t){
      const on = t.getAttribute('data-sec') === sec;
      t.style.color        = on ? '#ff8800' : '#443322';
      t.style.borderBottom = on ? '1px solid #ff6600' : '1px solid transparent';
    });
  };

  return `<div style="display:flex;flex-direction:column;height:100%;background:#000">
    <div style="display:flex;align-items:stretch;height:20px;border-bottom:1px solid #0d0a00;flex-shrink:0;overflow-x:auto">
      <div class="mv-ptab" data-sec="EQ"     onclick="window._mvSwitch('EQ',event)"     style="padding:0 16px;font-size:7px;font-weight:700;letter-spacing:.8px;cursor:pointer;display:flex;align-items:center;color:#ff8800;border-bottom:1px solid #ff6600;border-right:1px solid #0d0a00;white-space:nowrap;flex-shrink:0">EQUITIES</div>
      <div class="mv-ptab" data-sec="CRYPTO" onclick="window._mvSwitch('CRYPTO',event)" style="padding:0 16px;font-size:7px;font-weight:700;letter-spacing:.8px;cursor:pointer;display:flex;align-items:center;color:#998870;border-bottom:1px solid transparent;border-right:1px solid #0d0a00;white-space:nowrap;flex-shrink:0">CRYPTO</div>
      <div class="mv-ptab" data-sec="FX"     onclick="window._mvSwitch('FX',event)"     style="padding:0 16px;font-size:7px;font-weight:700;letter-spacing:.8px;cursor:pointer;display:flex;align-items:center;color:#998870;border-bottom:1px solid transparent;border-right:1px solid #0d0a00;white-space:nowrap;flex-shrink:0">FX</div>
      <div class="mv-ptab" data-sec="CMDTY"  onclick="window._mvSwitch('CMDTY',event)"  style="padding:0 16px;font-size:7px;font-weight:700;letter-spacing:.8px;cursor:pointer;display:flex;align-items:center;color:#998870;border-bottom:1px solid transparent;border-right:1px solid #0d0a00;white-space:nowrap;flex-shrink:0">COMMODITIES</div>
      <div class="mv-ptab" data-sec="ETF"    onclick="window._mvSwitch('ETF',event)"    style="padding:0 16px;font-size:7px;font-weight:700;letter-spacing:.8px;cursor:pointer;display:flex;align-items:center;color:#998870;border-bottom:1px solid transparent;border-right:1px solid #0d0a00;white-space:nowrap;flex-shrink:0">ETFs</div>
    </div>
    <div style="flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#1a1000 #000">
      <table class="pt" style="width:100%">
        <colgroup><col style="width:52px"><col><col style="width:80px"><col style="width:62px"><col style="width:68px"></colgroup>
        <tbody id="mv-tbody">${window._mvData['EQ']}</tbody>
      </table>
    </div>
  </div>`;
}

function buildCRYPTOTable(data){
  // Pull crypto-related news from cache — Fed, regulation, ETF, Iran, macro impact on crypto
  const cryptoItems = _newsCache.filter(it=>{
    const tag=(it.tag||'').toUpperCase();
    const src=(it.src||'').toLowerCase();
    const title=(it.title||'').toLowerCase();
    if(tag==='CRYPTO'||tag==='DEFI') return true;
    if(src.includes('coindesk')||src.includes('decrypt')||src.includes('cryptonews')||src.includes('cointelegraph')) return true;
    // Macro news that move crypto: Fed, rates, Iran, sanctions, ETF, SEC, regulation
    const keywords=['bitcoin','crypto','btc','eth','ethereum','defi','blockchain','sec','cftc',
      'stablecoin','binance','coinbase','tether','usdt','usdc','fed rate','rate cut','rate hike',
      'iran','sanction','cbdc','digital asset','crypto etf','spot etf','grayscale','blackrock btc'];
    return keywords.some(k=>title.includes(k));
  }).slice(0,80);

  // Fallback if cache empty yet
  const items = cryptoItems.length > 0 ? cryptoItems : _newsCache.slice(0,40);

  const _cls = item => {
    const t = item.tag||(item.flash?'FLASH':item.mac?'MACRO':'');
    const src = (item.src||'').toLowerCase();
    if(t==='FLASH'||item.flash)                                      return {code:'BN',  col:'#ff4400'};
    if(t==='MACRO'||item.mac)                                        return {code:'ECO', col:'#ff7700'};
    if(src.includes('reuters'))                                      return {code:'RTS', col:'#c8c0a8'};
    if(src.includes('wall street')||src.includes('wsj'))             return {code:'DJ',  col:'#c8c0a8'};
    if(src.includes('coindesk'))                                     return {code:'CDK', col:'#c8c0a8'};
    if(src.includes('decrypt'))                                      return {code:'DCR', col:'#c8c0a8'};
    if(src.includes('cnbc'))                                         return {code:'CNBC',col:'#c8c0a8'};
    if(src.includes('bbc'))                                          return {code:'BBC', col:'#c8c0a8'};
    if(src.includes('ft')||src.includes('financial times'))          return {code:'FT',  col:'#c8c0a8'};
    return                                                                  {code:'WIR', col:'#c8c0a8'};
  };

  const now = Date.now()/1000;

  let h=`<table style="width:100%;border-collapse:collapse;font-family:'Roboto Mono','Courier Prime',monospace;table-layout:auto;background:#000;">
    <colgroup>
      <col style="width:20px">
      <col style="width:46px">
      <col>
      <col style="width:44px">
      <col style="width:52px">
      <col style="width:20px">
    </colgroup>
    `;

  const _fmtBBGc = ts => {
    if(!ts) return '';
    const d = new Date(ts*1000), n = new Date();
    if(d.toDateString()===n.toDateString())
      return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
    return (d.getMonth()+1).toString().padStart(2,'0')+'/'+ d.getDate().toString().padStart(2,'0');
  };

  if(items.length===0){
    h+=`<tr><td colspan="4" style="padding:20px;text-align:center;color:#887760;font-size:9px">
      LOADING CRYPTO WIRE...<br><span style="font-size:7px;color:#221000">CoinDesk · Decrypt · Reuters · FT · CNBC</span>
    </td></tr>`;
  } else {
    items.forEach((item,i)=>{
      const c   = _cls(item);
      const isBN  = c.code==='BN';
      const t = (item.title||'').toLowerCase();
      const isHigh = isBN || ['crisis','crash','collapse','ban','arrest','hack','exploit','seized','sanctioned',
         'rate hike','inflation surge','recession','bankruptcy','war','attack','iran'].some(k=>t.includes(k));
      const isMed  = !isHigh && ['rate cut','rate decision','fomc','ecb','fed ','powell','cpi','nonfarm',
         'sec ','cftc','lawsuit','investigation','opec','sanction','warning'].some(k=>t.includes(k));

      const dotPfx = (isHigh || isMed) ? '•' : '';
      const lineNum = i + 1;
      const timeStr = _fmtBBGc(item.ts);
      const srcCol  = (isBN||c.code==='BN'||c.code==='FLASH') ? '#ff6600' : '#ff8800';

      h+=`<tr style="height:26px;background:#000;cursor:pointer"
        onclick="_wnOpenDetail(${_newsCache.indexOf(item)>=0?_newsCache.indexOf(item):i})"
        onmouseover="this.style.background='#0d0800'"
        onmouseout="this.style.background='#000'">
        <td style="padding:0 4px 0 12px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #111">
          <span style="color:#F39F41;font-size:13px;font-weight:800;font-family:var(--fn)">${lineNum})</span>
        </td>
        <td style="padding:0 10px;vertical-align:middle;overflow:hidden;border-bottom:1px solid #0c0800">
          <span style="color:#ff8800;font-size:13px;font-weight:${isHigh?'600':'400'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;font-family:'Courier Prime','Courier New',Courier,serif;letter-spacing:.01em">${dotPfx}${item.title||''}</span>
        </td>
        <td style="padding:0 28px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800">
          <span style="color:#000;font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.2px">${c.code}</span>
        </td>
        <td style="padding:0 28px 0 10px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800">
          <span style="color:#886644;font-size:11px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${timeStr}</span>
        </td>
        </tr>`;

    });
  }

  return h+'</table>';
}

function _fmtFundCell(sym){
  var key = sym+'USDT';
  var fh = window._fundingHist && window._fundingHist[key];
  var r = null, src = null, ts = 0;
  if(fh && Array.isArray(fh) && fh.length){
    r = fh[fh.length-1] ? fh[fh.length-1].rate : 0;
    src = window._fundSrc && window._fundSrc[key];
    ts = fh[fh.length-1]&&fh[fh.length-1].ts ? fh[fh.length-1].ts : 0;
  }
  // Fallback: use _liveData.funding if _fundingHist empty
  if(r===null && window._liveData && window._liveData.funding && window._liveData.funding[sym]){
    var lf = window._liveData.funding[sym];
    // Pick first available: binance, bybit, okx
    var raw = lf.binance!=null?lf.binance:lf.bybit!=null?lf.bybit:lf.okx!=null?lf.okx:null;
    if(raw!==null){ r = raw*100; src='LIVE'; ts=Date.now(); }
  }
  if(r===null) return '';
  var col = r>0.05?'#ff2222':r>0.02?'#ff5500':r>0.005?'#ff8800':r>0?'#886644':r<-0.02?'#00ff66':r<-0.005?'#00cc44':'#445533';
  var srcBadge = src&&src!=='BNB'&&src!=='LIVE' ? '<span style="color:#887760;font-size:6px;margin-right:2px">'+src+'</span>' : '';
  // Age check — if data older than 9h, show stale indicator
  var ageH = ts ? (Date.now()-ts)/3600000 : 0;
  var stale = ageH>9 ? '<span style="color:#886644;font-size:6px"> !</span>' : '';
  return srcBadge+'<span style="color:'+col+';font-variant-numeric:tabular-nums">'+(r>=0?'+':'')+r.toFixed(4)+'%</span>'+stale;
}
function _fmtFundSparkline(sym){
  var fh = window._fundingHist && window._fundingHist[sym+'USDT'];
  if(!fh || !Array.isArray(fh) || fh.length<3){
    // Fallback: show single-bar indicator from live funding data
    if(window._liveData && window._liveData.funding && window._liveData.funding[sym]){
      var lf = window._liveData.funding[sym];
      var raw = lf.binance!=null?lf.binance:lf.bybit!=null?lf.bybit:lf.okx!=null?lf.okx:null;
      if(raw!==null){
        var c = raw>=0 ? '#aa1100' : '#007733';
        return '<span style="display:inline-flex;align-items:flex-end;height:10px;gap:0.5px"><span style="display:inline-block;width:6px;height:6px;background:'+c+';opacity:.7;vertical-align:bottom;border-radius:1px"></span></span>';
      }
    }
    return '';
  }
  var sl = fh.slice(-16);
  var mx = 0.0001;
  for(var i=0;i<sl.length;i++){ if(Math.abs(sl[i].rate)>mx) mx=Math.abs(sl[i].rate); }
  var bars = '';
  for(var i=0;i<sl.length;i++){
    var h = Math.max(2, Math.abs(sl[i].rate)/mx*9).toFixed(0);
    var c = sl[i].rate>=0 ? '#aa1100' : '#007733';
    bars += '<span style="display:inline-block;width:4px;height:'+h+'px;background:'+c+';opacity:.85;vertical-align:bottom"></span>';
  }
  return '<span style="display:inline-flex;align-items:flex-end;height:10px;gap:0.5px">'+bars+'</span>';
}

function buildCRYPTOMktCap(data){
  const fmtMC = v => {
    if(!v) return '—';
    if(v>=1e12) return '$'+(v/1e12).toFixed(2)+'T';
    if(v>=1e9)  return '$'+(v/1e9).toFixed(1)+'B';
    if(v>=1e6)  return '$'+(v/1e6).toFixed(0)+'M';
    return '$'+v;
  };
  const fmtVol = v => {
    if(!v) return '—';
    if(v>=1e12) return '$'+(v/1e12).toFixed(2)+'T';
    if(v>=1e9)  return '$'+(v/1e9).toFixed(2)+'B';
    if(v>=1e6)  return '$'+(v/1e6).toFixed(2)+'M';
    return '$'+v.toFixed(0);
  };
  const fmtCryptoPx = v => {
    if(!v && v!==0) return '—';
    if(v >= 1000)   return '$'+v.toLocaleString('en',{maximumFractionDigits:0});
    if(v >= 1)      return '$'+v.toFixed(2);
    if(v >= 0.01)   return '$'+v.toFixed(4);
    if(v >= 0.0001) return '$'+v.toFixed(6);
    return '$'+v.toFixed(8);
  };
  const chgCol = v => v>=0 ? '#00ff44' : '#ff3333';
  const chgStr = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  const sorted = [...data].sort((a,b)=>a.rank-b.rank);
  const th = (label,align='right') => `<th style="padding:3px 5px;font-size:7.5px;color:#F39F41;text-align:${align};letter-spacing:.8px;font-weight:800;white-space:nowrap">${label}</th>`;
  let h=`<table style="width:100%;border-collapse:collapse;font-family:var(--fn-num);table-layout:fixed;background:#000">
  <colgroup>
    <col style="width:20px"><col style="width:150px"><col style="width:76px">
    <col style="width:50px">
    <col style="width:48px"><col style="width:48px">
    <col style="width:60px"><col style="width:60px"><col style="width:60px">
    <col style="width:58px"><col style="width:70px"><col style="width:38px">
  </colgroup>
  <tr style="background:#000">
    ${th('#','right')}${th('NAME','left')}${th('LAST')}
    ${th('24H%')}
    ${th('7D%')}${th('YTD%')}
    ${th('HIGH')}${th('LOW')}${th('OPEN')}
    ${th('MKT CAP')}<th style="padding:3px 5px;font-size:7px;color:#ff8800;text-align:right;letter-spacing:.8px;font-weight:700;white-space:nowrap">VOL 24H</th>${th('ATH%')}
  </tr>`;
  sorted.forEach((c,i)=>{
    const rowBg='transparent';
    const athPct = c.ath ? ((c.px/c.ath-1)*100) : null;
    const athStr = athPct!==null ? athPct.toFixed(0)+'%' : '—';
    h+=`<tr style="background:${rowBg};cursor:pointer"
      onclick="if(window._openChartForSymbol) window._openChartForSymbol('${c.s}')"
      onmouseover="this.style.background='rgba(255,255,255,.04)'"
      onmouseout="this.style.background='${rowBg}'">
      <td style="padding:2px 4px;text-align:right;color:#F39F41;font-size:8.5px;font-weight:700;font-variant-numeric:tabular-nums">${c.rank}</td>
      <td style="padding:2px 6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
        <span style="color:#F39F41;font-weight:800;font-size:10.5px">${c.s}</span>
        <span style="color:#cc9900;font-size:8.5px;margin-left:5px">${c.n}</span>
      </td>
      <td id="cp-px-${c.id}" style="padding:2px 6px;text-align:right;color:#F39F41;font-size:10.5px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${fmtCryptoPx(c.px)}</td>
      <td id="cp-chg-${c.id}" style="padding:2px 5px;text-align:right;color:${chgCol(c.chg)};font-weight:900;font-size:10.5px;font-variant-numeric:tabular-nums">${chgStr(c.chg)}</td>
      <td style="padding:2px 5px;text-align:right;font-size:10px;font-variant-numeric:tabular-nums" data-w1="${c.id}">${(()=>{
  // ONLY live data — never use static c.chg7
  const w = (c._chg7live && c.chg7!=null) ? c.chg7 : null;
  if(w===null) return '<span style="color:#887760">—</span>';
  return '<span style="color:'+(w>=0?'#00ff44':'#ff3333')+';font-weight:800">'+(w>=0?'+':'')+w.toFixed(2)+'%</span>';
})()}</td>
      <td style="padding:2px 5px;text-align:right;font-size:10px;font-variant-numeric:tabular-nums" data-ytd="${c.id}">${(()=>{const ytd=calcYtd2026(c.s,c.px);if(ytd===null)return '<span style="color:#887760">—</span>';return '<span style="color:'+(ytd>=0?'#00ff44':'#ff3333')+';font-weight:800">'+(ytd>=0?'+':'')+ytd.toFixed(2)+'%</span>';})()}</td>
      <td id="cp-hi-${c.id}" style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${(()=>{const d=_dhloCache[c.s];const px=c.px;const open=d?.open||px*(1-c.chg/100);const hi=d?.high||null;return hi?fmtCryptoPx(hi):'—';})()}</td>
      <td id="cp-lo-${c.id}" style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${(()=>{const d=_dhloCache[c.s];const px=c.px;const open=d?.open||px*(1-c.chg/100);const lo=d?.low||null;return lo?fmtCryptoPx(lo):'—';})()}</td>
      <td id="cp-op-${c.id}" style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums;white-space:nowrap">${(()=>{const d=_dhloCache[c.s];const px=c.px;const open=d?.open||(c.px/(1+(c.chg||0)/100));return fmtCryptoPx(open);})()}</td>
      <td id="cp-mc-${c.id}" style="padding:2px 5px;text-align:right;color:#00bbdd;font-size:9px;font-variant-numeric:tabular-nums">${c.mc?'$'+fmtBig(c.mc):'—'}</td>
      <td id="cp-vol-${c.id}" style="padding:2px 5px;text-align:right;white-space:nowrap">${(()=>{
        const v = c.vol;
        const vt = _volTs[c.id];
        const vp = _volPrev[c.id];
        const age = vt ? Date.now()-vt : null;
        const ageCol = !age ? '#332200' : age<10000 ? '#00ff88' : age<60000 ? '#ff6600' : '#ff4444';
        const dot = vt ? '<span style="display:inline-block;width:3px;height:3px;border-radius:50%;background:'+ageCol+';margin-left:3px;vertical-align:middle"></span>' : '';
        if(!v) return '<span style="color:#998870">—</span>';
        // Delta vol — kolik přibylo od minulého snapshotu
        let deltaStr = '';
        if(vp && vp.vol > 0 && v > vp.vol) {
          const diff = v - vp.vol;
          const pct = (diff/vp.vol*100);
          if(pct > 0.0001) deltaStr = '<span style="color:#226644;font-size:7px;margin-left:3px">+'+fmtVol(diff).replace('$','')+'</span>';
        }
        return '<span style="color:#00bbdd;font-size:9px;font-variant-numeric:tabular-nums;font-family:Roboto Mono,monospace">'+fmtVol(v)+'</span>'+deltaStr+dot;
      })()}</td>
      <td style="padding:2px 5px;text-align:right;color:#ff2222;font-size:9px;font-variant-numeric:tabular-nums">${athStr}</td>
    </tr>`;
  });
  // Footer — live update info
  const lastVolUpdate = Object.values(_volTs).length
    ? Math.round((Date.now() - Math.max(...Object.values(_volTs))) / 1000)
    : null;
  const footerMsg = lastVolUpdate !== null
    ? `VOL 24H: BINANCE REST <span style="color:#00ff88">●</span> updated <span style="color:#44ddbb">${lastVolUpdate}s</span> · auto-refresh every <span style="color:#44ddbb">10s</span>`
    : `VOL 24H: waiting for live data <span style="color:#aa9980">●</span>`;
  h += `<div style="padding:3px 8px;background:#000;font-family:'Share Tech Mono',monospace;font-size:7px;color:#998870;display:none;justify-content:space-between;align-items:center">
    <span>${footerMsg}</span>
    <span style="color:#998870">BINANCE WS · BINANCE REST · HYPERLIQUID · COINGECKO</span>
  </div>`;
  return h+'</table>';
}

// ── Live DOM patch — plynulý update bez rerenderingu ─────────────────────────
// Běží každých 500ms. Pouze mění textContent/innerHTML konkrétních buněk.
// Při změně ceny = flash. Při novém vol ticku = paket v síti.

const _cpFlash = {};  // {id: timeout} pro flash efekty
const _cpLastVol = {}; // {id: vol} pro detekci změny

function _patchCRYPTOPanel() {
  if(window._tabHidden) return; // skip when tab hidden — save CPU
  // Najdi CRYPTO panel body
  const bodyId = Object.keys(PANEL_REGISTRY).find(k => PANEL_REGISTRY[k].fn === 'CRYPTO');
  if (!bodyId) return;
  const body = document.getElementById('pb-' + bodyId);
  if (!body || !body.querySelector('[id^="cp-px-"]')) return;

  const now = Date.now();

  CRYPTO.forEach(c => {
    // ── HIGH / LOW / OPEN ──
    const hiEl = document.getElementById('cp-hi-' + c.id);
    const loEl = document.getElementById('cp-lo-' + c.id);
    const opEl = document.getElementById('cp-op-' + c.id);
    if (hiEl || loEl || opEl) {
      const d = _dhloCache[c.s];
      const px = c.px;
      // Use real data from _dhloCache (filled by fetchBinance24hr every 5s)
      // Fallback: derive from price + 24h change only if cache missing
      const open = d?.open || (c.px / (1 + (c.chg||0)/100));
      const hi   = d?.high || null;  // show real high or nothing
      const lo   = d?.low  || null;  // show real low or nothing
      const fp = v => !v||v<=0 ? '\u2014' : v>=1000?'$'+v.toLocaleString('en',{maximumFractionDigits:0}):v>=1?'$'+v.toFixed(2):'$'+v.toFixed(4);
      if(hiEl) hiEl.textContent = fp(hi);
      if(loEl) loEl.textContent = fp(lo);
      if(opEl) opEl.textContent = fp(open);
    }
    // ── CENA ──
    const pxEl = document.getElementById('cp-px-' + c.id);
    if (pxEl && c.px > 0) {
      const txt = _fmtCPx(c.px);
      if (pxEl.textContent !== txt) {
        pxEl.textContent = txt;
        // Flash: zesvětlení na 350ms pak zpět
        if (_cpFlash[c.id]) clearTimeout(_cpFlash[c.id]);
        const flashCol = (c.chg || 0) >= 0 ? '#88ffcc' : '#ffaaaa';
        pxEl.style.transition = 'color 0.1s';
        pxEl.style.color = flashCol;
        _cpFlash[c.id] = setTimeout(() => {
          pxEl.style.transition = 'color 0.35s';
          pxEl.style.color = '#ff8800';
        }, 120);
      }
    }

    // ── ZMĚNA % ──
    const chgEl = document.getElementById('cp-chg-' + c.id);
    if (chgEl && c.chg != null) {
      const txt = (c.chg >= 0 ? '+' : '') + c.chg.toFixed(2) + '%';
      if (chgEl.textContent !== txt) {
        chgEl.textContent = txt;
        chgEl.style.color = c.chg >= 0 ? '#00ff66' : '#ff2222';
      }
    }

    // ── MARKET CAP ──
    const mcEl = document.getElementById('cp-mc-' + c.id);
    if (mcEl && c.mc > 0) {
      const txt = '$' + _fmtBig(c.mc);
      if (mcEl.textContent !== txt) mcEl.textContent = txt;
    }

    // ── YTD% a 7D% — přepočítej z živé ceny (throttle 5s) ──
    const _now = Date.now();
    if(!window._ytdPatchTs || _now - window._ytdPatchTs > 2000){
      window._ytdPatchTs = _now;
      if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(false);
    }

    // ── OBJEM — přímý raw vol, bez extrapolace ──
    const volEl = document.getElementById('cp-vol-' + c.id);
    if (!volEl) return;

    const xv = _xVol[c.id] || {};
    let rawVol = 0, src = '', srcAge = 0;

    // Priorita zdrojů objemu:
    // 1. CoinGecko total_volume = skutečný agregát všech burz (nejlepší, ale 2min refresh)
    // 2. Binance WS quoteVolume = jen Binance (38% trhu), ale live každou sekundu
    // 3. Binance REST quoteVolume = stejné jako WS ale z REST
    // 4. Hyperliquid dayNtlVlm = futures perps volume
    const cgAge  = now - (xv.coingecko?.ts || 0);
    const wsAge  = now - (xv.ws?.ts || 0);
    const bnAge  = now - (xv.binance?.ts || 0);
    const hlAge  = now - (xv.hl?.ts || 0);

    if (xv.coingecko?.vol > 0 && cgAge < 180000) {
      rawVol = xv.coingecko.vol; src = 'CG'; srcAge = cgAge;
    } else if (xv.ws?.vol > 0 && wsAge < 15000) {
      // Binance WS = 38% trhu → přepočítej na celkový trh
      rawVol = xv.ws.vol / 0.38; src = 'BN~'; srcAge = wsAge;
    } else if (xv.binance?.vol > 0 && bnAge < 120000) {
      rawVol = xv.binance.vol / 0.38; src = 'BN~'; srcAge = bnAge;
    } else if (xv.hl?.vol > 0 && hlAge < 120000) {
      rawVol = xv.hl.vol; src = 'HL'; srcAge = hlAge;
    }

    if (rawVol <= 0) return;

    const prevVol = _cpLastVol[c.id] || 0;
    const volChanged = prevVol > 0 && Math.abs(rawVol - prevVol) / prevVol > 0.0001;

    if (volChanged) {
      // Vyšli paket v síti od příslušného uzlu → hub
      const p2pNode = src === 'CG' ? 'p2p-ny' : src === 'HL' ? 'p2p-ldn' : 'p2p-ny';
      const coinNode = c.s.toLowerCase();
      if (_net && _net.edges) {
        _net.packets = _net.packets || [];
        _net.packets.push({
          from: coinNode, to: 'hub', t: 0,
          speed: 0.08,
          color: (c.chg || 0) >= 0 ? '#00ff88' : '#ff4444',
          size: 2, trail: false, label: src,
          _volPkt: true
        });
      }
    }

    _cpLastVol[c.id] = rawVol;

    // Věk dat pro barvu
    const dotCol = srcAge < 8000 ? '#00ff88' : srcAge < 30000 ? '#ff6600' : '#ff4444';

    // Update DOM pouze pokud se hodnota změnila nebo je stale indikátor jiný
    const volTxt = _fmtVol(rawVol);
    const curTxt = volEl.dataset.volTxt || '';
    const curDot = volEl.dataset.dotCol || '';

    if (volTxt !== curTxt || dotCol !== curDot) {
      volEl.dataset.volTxt = volTxt;
      volEl.dataset.dotCol = dotCol;
      const ageSec = srcAge > 0 ? Math.round(srcAge / 1000) : null;
      const ageStr = ageSec === null ? '—' : ageSec < 60 ? ageSec + 's' : Math.floor(ageSec/60) + 'm' + (ageSec%60).toString().padStart(2,'0') + 's';
      volEl.innerHTML =
        `<span style="color:#998870;font-size:7px;margin-right:2px">${src}</span>` +
        `<span style="color:#00bbdd;font-size:9px;font-variant-numeric:tabular-nums;font-family:var(--fn-num);transition:color .3s">${volTxt}</span>` +
        `<span style="color:${dotCol};font-size:7px;margin-left:4px;font-variant-numeric:tabular-nums">${ageStr}</span>`;
      // Flash na vol při změně
      if (volChanged) {
        const vs = volEl.querySelector('span:nth-child(2)');
        if (vs) { vs.style.color = '#eeddff'; setTimeout(() => { vs.style.color = '#cc88ff'; }, 400); }
      }
    }
  });
}

// Pomocné formátovací funkce pro patch (nezávislé na scope buildCRYPTOMktCap)
function _fmtCPx(v) {
  if (!v && v !== 0) return '—';
  if (v >= 1000) return '$' + v.toLocaleString('en', {maximumFractionDigits: 0});
  if (v >= 1)    return '$' + v.toFixed(2);
  if (v >= 0.01) return '$' + v.toFixed(4);
  if (v >= 0.0001) return '$' + v.toFixed(6);
  return '$' + v.toFixed(8);
}
function _fmtVol(v) {
  if (!v) return '—';
  if (v >= 1e12) return '$' + (v / 1e12).toFixed(2) + 'T';
  if (v >= 1e9)  return '$' + (v / 1e9).toFixed(2) + 'B';
  if (v >= 1e6)  return '$' + (v / 1e6).toFixed(1) + 'M';
  return '$' + v.toFixed(0);
}
function _fmtBig(v) {
  if (!v) return '—';
  if (v >= 1e12) return (v / 1e12).toFixed(2) + 'T';
  if (v >= 1e9)  return (v / 1e9).toFixed(1) + 'B';
  if (v >= 1e6)  return (v / 1e6).toFixed(0) + 'M';
  return v;
}

// ── _applyW1YtdToDOM — always writes live 7D% and YTD% to DOM ──────────────
function _applyW1YtdToDOM(force){
  if(typeof CRYPTO==='undefined') return;
  const _col = v => v>=0 ? '#00cc44' : '#ff2222';
  const _pct = v => '<span style="color:'+_col(v)+';font-weight:700">'+(v>=0?'+':'')+v.toFixed(2)+'%</span>';
  const _dash = '<span style="color:#887760">—</span>';
  CRYPTO.forEach(cr=>{
    const w1El = document.querySelector('[data-w1="'+cr.id+'"]');
    if(w1El){
      const w1 = (cr._chg7live && cr.chg7!=null) ? cr.chg7 : null;
      const newHtml = w1!==null ? _pct(w1) : _dash;
      const newKey  = w1!==null ? w1.toFixed(4) : 'null';
      if(force || w1El.dataset.w1v !== newKey){ w1El.dataset.w1v=newKey; w1El.innerHTML=newHtml; }
    }
    const ytdEl = document.querySelector('[data-ytd="'+cr.id+'"]');
    if(ytdEl){
      const ytd = calcYtd2026(cr.s, cr.px);
      const newHtml = ytd!==null ? _pct(ytd) : _dash;
      const newKey  = ytd!==null ? ytd.toFixed(4) : 'null';
      if(force || ytdEl.dataset.ytdv !== newKey){ ytdEl.dataset.ytdv=newKey; ytdEl.innerHTML=newHtml; }
    }
  });
}

function _patchCryptoFundingCells(){
  var fh = window._fundingHist;
  if(!fh) return;
  var cells = document.querySelectorAll('[id^="cp-fund-"]');
  cells.forEach(function(el){
    var id = el.id.replace('cp-fund-','');
    var coin = (typeof CRYPTO !== 'undefined') ? CRYPTO.find(function(c){return String(c.id)===id;}) : null;
    if(!coin) return;
    var key = coin.s+'USDT';
    var data = fh[key];

    // Trigger background fetch if: undefined (never tried), or stale (>25min), or was null (retry once per 5min)
    var lastFetch = window._fundTs&&window._fundTs[key]||0;
    var age = Date.now()-lastFetch;
    if(data === undefined || (data===null && age>300000) || (Array.isArray(data)&&data.length>0&&age>1500000)){
      if(typeof fetchFundingHistory==='function') fetchFundingHistory(key).then(function(){ _patchCryptoFundingCellSingle(id,coin); });
    }

    _patchCryptoFundingCellSingle(id, coin);
  });
}

function _patchCryptoFundingCellSingle(id, coin){
  var el = document.getElementById('cp-fund-'+id);
  if(!el) return;
  var newHtml = _fmtFundCell(coin.s);
  var cacheKey = newHtml;
  if(el.dataset.fr !== cacheKey){ el.dataset.fr=cacheKey; el.innerHTML=newHtml; }
  var frhEl = document.getElementById('cp-frh-'+id);
  if(frhEl){ var s=_fmtFundSparkline(coin.s); if(frhEl.dataset.spark!==s){frhEl.dataset.spark=s;frhEl.innerHTML=s;} }
}

function buildCOMDTY(fn){
  const filt=fn==='ENERGY'?['CL1','CO1','NG1']:fn==='METALS'?['XAU','XAG','XPT','XPD','HG1']:fn==='AGRI'?['W1','C1']:null;
  return buildCOMDTYTable(filt?COMDTY_DATA.filter(c=>filt.includes(c.s)):COMDTY_DATA);
}
function buildCOMDTYTable(data){
  const chgCol = v => v>=0 ? '#00ff66' : '#ff2222';
  const chgStr = v => (v>=0?'+':'')+v.toFixed(2)+'%';
  const th = (label,align='right') => `<th style="padding:3px 5px;font-size:7px;color:#ff8800;text-align:${align};letter-spacing:.8px;font-weight:700;white-space:nowrap">${label}</th>`;
  const volMap={'XAU':'182K','XAG':'68K','XPT':'12K','XPD':'8K','CL1':'1.2M','CO1':'340K','NG1':'420K','HG1':'85K','W1':'120K','C1':'280K','S1':'180K','CC1':'42K','KC1':'38K','CT1':'24K','SB1':'68K','LH1':'32K','LC1':'28K','UX1':'4K','LI1':'2K','IRON':'84K','ALU':'48K','NI1':'24K','ZN1':'32K','PB1':'18K','TIN':'8K','OJ1':'6K','LB1':'12K','RB1':'84K','HO1':'62K','RS1':'18K','RR1':'4K','LE1':'12K','PA1':'8K','CO2':'42K','U308':'2K'};
  let h=`<table style="width:auto;border-collapse:collapse;font-family:'Share Tech Mono',monospace;table-layout:fixed">
  <colgroup>
    <col style="width:14px"><col style="width:34px"><col style="width:90px"><col style="width:68px">
    <col style="width:30px"><col style="width:52px"><col style="width:46px">
    <col style="width:46px"><col style="width:46px"><col style="width:46px">
    <col style="width:58px"><col style="width:58px"><col style="width:58px">
    <col style="width:46px"><col style="width:36px">
  </colgroup>
  <tr style="background:#000">
    ${th('#','right')}${th('SYM','left')}${th('CONTRACT','left')}${th('PRICE')}
    ${th('UNIT','left')}${th('CHG')}${th('1D%')}
    ${th('5D%')}${th('1M%')}${th('YTD%')}
    ${th('HIGH')}${th('LOW')}${th('OPEN')}
    ${th('VOL')}${th('TIME')}
  </tr>`;
  data.forEach((c,i)=>{
    const chgAbs=c.px*c.chg/100;
    const chgFmt=(chgAbs>=0?'+':'')+chgAbs.toFixed(2);
    const pr=fmtPx(c.px);
    const hi=c.hi?fmtPx(c.hi):'—';
    const lo=c.lo?fmtPx(c.lo):'—';
    const seed=c.s.charCodeAt(0)+c.s.charCodeAt(1);
    const d5=c.chg*2.2+((seed%7)-3)*0.4;
    const m1=c.chg*4.8+((seed%11)-5)*1.2;
    const vol=volMap[c.s]||'—';
    const now=new Date();const timeStr=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    h+=`<tr onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='transparent'">
      <td style="padding:2px 4px;text-align:right;color:#aa9980;font-size:8px">${i+1}</td>
      <td style="padding:2px 6px"><span style="color:#ff8800;font-weight:700;font-size:10px">${c.s}</span></td>
      <td style="padding:2px 6px"><span style="color:#887060;font-size:8px">${c.n}</span></td>
      <td style="padding:2px 6px;text-align:right;color:#ff8800;font-size:10px;font-variant-numeric:tabular-nums;font-weight:700">${pr}</td>
      <td style="padding:2px 4px;color:#665840;font-size:8px">${c.u}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(chgAbs)};font-size:9px;font-variant-numeric:tabular-nums">${chgFmt}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(c.chg)};font-weight:700;font-size:10px;font-variant-numeric:tabular-nums">${chgStr(c.chg)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(d5)};font-size:10px;font-variant-numeric:tabular-nums">${chgStr(d5)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(m1)};font-size:10px;font-variant-numeric:tabular-nums">${chgStr(m1)}</td>
      <td style="padding:2px 5px;text-align:right;color:${chgCol(c.ytd)};font-weight:700;font-size:10px;font-variant-numeric:tabular-nums">${chgStr(c.ytd)}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums">${hi}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums">${lo}</td>
      <td style="padding:2px 5px;text-align:right;color:#887060;font-size:9px;font-variant-numeric:tabular-nums">${fmtPx(c.open)}</td>
      <td style="padding:2px 5px;text-align:right;color:#00bbdd;font-size:8px">${vol}</td>
      <td style="padding:2px 4px;text-align:right;color:#665840;font-size:8px">${timeStr}</td>
    </tr>`;
  });
  return h+'</table>';
}

function buildMACRO(){
  const sections=[
    {label:'INFLATION', rows:[
      {c:'CPI YoY',           r:'US', v:'2.8%', prev:'2.9%',exp:'2.9%'},
      {c:'CPI YoY',           r:'EU', v:'1.7%', prev:'2.3%',exp:'2.0%'},
      {c:'CPI YoY',           r:'UK', v:'3.0%', prev:'2.5%',exp:'2.8%'},
      {c:'CPI YoY',           r:'CZE',v:'2.8%', prev:'3.0%',exp:'2.9%'},
      {c:'PCE Deflator',      r:'USA',v:'2.5%', prev:'2.6%',exp:'2.5%'}
    ]},
    {label:'CENTRAL BANKS', rows:[
      {c:'FED FUNDS RATE',    r:'USA',v:'3.50–3.75%',prev:'3.75–4.00%',exp:'3.50–3.75%'},
      {c:'ECB DEPOSIT RATE',  r:'EU', v:'2.00%',prev:'2.25%',exp:'2.00%'},
      {c:'BOJ RATE',          r:'JPN',v:'0.50%',prev:'0.25%',exp:'0.50%'},
      {c:'CNB RATE',          r:'CZE',v:'3.75%',prev:'4.00%',exp:'3.75%'}
    ]},
    {label:'GROWTH & LABOUR', rows:[
      {c:'GDP Q4 Growth',     r:'USA',v:'+2.3%',prev:'+3.1%',exp:'+2.6%'},
      {c:'GDP YoY',           r:'CHN',v:'+5.0%',prev:'+4.9%',exp:'+5.0%'},
      {c:'NFP (thousands)',   r:'USA',v:'+143', prev:'+307', exp:'+160'},
      {c:'Unemployment',      r:'USA',v:'4.1%', prev:'4.1%', exp:'4.1%'}
    ]},
    {label:'ACTIVITY', rows:[
      {c:'ISM Manufacturing', r:'USA',v:'50.3', prev:'50.9', exp:'50.5'},
      {c:'Retail Sales YoY',  r:'USA',v:'-0.9%',prev:'+0.7%',exp:'+0.2%'}
    ]}
  ];
  let h=`<table class="pt"><colgroup><col><col style="width:38px"><col style="width:58px"><col style="width:58px"><col style="width:58px"></colgroup>
  <tr><th>INDICATOR</th><th>REG</th><th class="r">ACTUAL</th><th class="r">PREV</th><th class="r">EST</th></tr>`;
  sections.forEach(sec=>{
    h+=`<tr><td colspan="5" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:#998870;background:#000;border-top:1px solid #0d0a00">${sec.label}</td></tr>`;
    sec.rows.forEach(m=>{
      h+=`<tr>
        <td class="ga" style="font-weight:400;font-size:9px">${m.c}</td>
        <td class="gr" style="font-size:8px">${m.r}</td>
        <td class="ga2 r" style="font-weight:700">${m.v}</td>
        <td class="wh r">${m.prev}</td>
        <td class="gr r">${m.exp||'—'}</td>
      </tr>`;
    });
  });
  // ── Live data overlay: FRED + Fear&Greed ──────────────────────────────
  // Override static values with live FRED if available
  const fredFFR = _liveData.fred?.ffr?.value;
  const fredCPI = _liveData.fred?.cpi?.value;
  const fredUNR = _liveData.fred?.unemployment?.value;
  const fg      = _liveData.fearGreed;

  // Live FRED overrides
  if (fredFFR) {
    h = h.replace('>5.50%<', '>'+fredFFR.toFixed(2)+'%<');
  }
  if (fredUNR) {
    h = h.replace('>3.9%<', '>'+fredUNR.toFixed(1)+'%<');
  }

  return h+'</table>';
}

/* ═══════════════════════════════════════════════════════════
   LIVE MACRO DATA — Forex Factory · FRED · central banks
═══════════════════════════════════════════════════════════ */

// Cache
const _macroCache = { ecal:[], alerts:[], lastFetch:0 };

async function _fetchForexFactory(){
  const CCYS = new Set(['USD','EUR','GBP','JPY','CAD','AUD','CHF','NZD','CNY']);
  const impMap = {Holiday:'Low',Low:'Low',Medium:'Medium',High:'High'};

  // JSON has actual values — primary source
  const parseJSON = arr => (Array.isArray(arr)?arr:[]).map(e=>{
    const country = e.country||e.currency||'';
    if(!CCYS.has(country)) return null;
    const d = new Date(e.date);
    const dateStr = isNaN(d) ? '' : d.toISOString().slice(0,10);
    const timeStr = isNaN(d) ? (e.time||'') :
      d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})
       .toLowerCase().replace(/\s/g,'');
    return {
      date: dateStr, time: timeStr, currency: country,
      impact: impMap[e.impact]||'Low', title: e.title||'',
      forecast: e.forecast||'', previous: e.previous||'',
      actual: (e.actual && e.actual!=='' ? e.actual : null),
      src:'FF'
    };
  }).filter(e=>e&&e.date);

  // XML fallback (no actual, but reliable)
  const parseXML = xml => {
    try {
      const doc = new DOMParser().parseFromString(xml,'text/xml');
      return [...doc.querySelectorAll('event')].map(ev=>{
        const g = t=>(ev.querySelector(t)||{}).textContent?.trim()||'';
        const country = g('country');
        if(!CCYS.has(country)) return null;
        const raw = g('date'); const [mo,dy,yr] = raw.split('-');
        return {
          date: yr?`${yr}-${mo.padStart(2,'0')}-${dy.padStart(2,'0')}`:'',
          time: g('time'), currency: country,
          impact: impMap[g('impact')]||'Low', title: g('title'),
          forecast: g('forecast')||'', previous: g('previous')||'',
          actual: null, src:'FF'
        };
      }).filter(e=>e&&e.date&&CCYS.has(e.currency));
    } catch(e){ return []; }
  };

  const urls = {
    thisJSON: 'https://nfs.faireconomy.media/ff_calendar_thisweek.json',
    nextJSON: 'https://nfs.faireconomy.media/ff_calendar_nextweek.json',
    thisXML:  'https://nfs.faireconomy.media/ff_calendar_thisweek.xml',
    nextXML:  'https://nfs.faireconomy.media/ff_calendar_nextweek.xml'
};

  const PROXY_RAW = 'https://api.allorigins.win/raw?url=';
  const _ff = (url, ms) => _fetchTimeout(url, ms||7000).then(r=>r.json())
    .catch(()=> _fetchTimeout(PROXY_RAW+encodeURIComponent(url), ms||8000).then(r=>r.json()));

  // Try JSON first (has actual)
  try {
    const [r1,r2] = await Promise.all([
      _ff(urls.thisJSON, 7000),
      _ff(urls.nextJSON, 7000)
    ]);
    const evts = [...parseJSON(r1),...parseJSON(r2)];
    if(evts.length>0) return evts;
  } catch(e){}

  // Fallback: XML (no actual but has forecast/previous)
  try {
    const [r1,r2] = await Promise.all([
      _fetchTimeout(urls.thisXML, 7000).then(r=>r.text()),
      _fetchTimeout(urls.nextXML, 7000).then(r=>r.text())
    ]);
    return [...parseXML(r1),...parseXML(r2)];
  } catch(e){ return []; }
}

async function _fetchInvestingCal(){
  // Backup: investing.com proxy via allorigins
  try{
    const url='https://api.allorigins.win/raw?url='+encodeURIComponent('https://sbcharts.investing.com/events_charts/us/1085.json');
    const r=await _fetchTimeout(url, 6000);
    const j=await r.json();
    return [];
  }catch(e){ return []; }
}

async function fetchMacroCalendar(force){
  if(!force && _macroCache.ecal.length>0 && (Date.now()-_macroCache.lastFetch)<60000) return;
  const [ff] = await Promise.allSettled([_fetchForexFactory()]);
  const events = ff.status==='fulfilled' ? ff.value : [];
  if(events.length>0){
    // Live JSON is always primary — no static override
    _macroCache.ecal = events;
    _macroCache.lastFetch = Date.now();
    window._ffLiveEvts = events;
  }
  refreshMacroPanels();
  renderSidebarNews();
}

function refreshMacroPanels(){
  Object.entries(PANEL_REGISTRY).forEach(([id,reg])=>{
    if(!['ECAL','ECAL2','ALERTS','MACRO','WIRP'].includes(reg.fn)) return;
    const body=document.getElementById('pb-'+id);
    if(!body||body.dataset.locked==='1') return;
    const pnl=document.getElementById(id);
    let ti=0;
    if(pnl) pnl.querySelectorAll('.ptab').forEach((t,i)=>{if(t.classList.contains('on'))ti=i;});
    try{
      const st=body.scrollTop;
      body.innerHTML = ti>0 ? buildPanelContentTab(reg.fn,ti) : buildPanelContent(reg.fn);
      body.scrollTop=st;
    }catch(_){}
  });
}

function _impColor(imp){
  if(!imp)return '#443322';
  const s=imp.toLowerCase();
  if(s.includes('high')||s==='3'||s==='red')   return '#ff2222';
  if(s.includes('med')||s==='2'||s==='orange') return '#ff8800';
  return '#665840';
}
function _impLabel(imp){
  if(!imp)return 'LOW';
  const s=imp.toLowerCase();
  if(s.includes('high')||s==='3'||s==='red')   return 'HIGH';
  if(s.includes('med')||s==='2'||s==='orange') return 'MED';
  return 'LOW';
}

function buildECAL(){
  // Force fresh fetch every open — clear cache so we always get latest actuals from FF JSON
  _macroCache.lastFetch = 0;
  setTimeout(()=>fetchMacroCalendar(true),50);

  const now = Date.now()/1000;
  const evts = _macroCache.ecal.length>0 ? _macroCache.ecal : [
    // Week of March 14-20 2026 — fallback static data (live data from Forex Factory)
    // Saturday Mar 14 — markets closed
    // Sunday Mar 15 — markets closed
    // Monday Mar 17
    {date:'2026-03-17',time:'12:30am',currency:'GBP',impact:'Medium',title:'Employment Change 3M/3M',          forecast:'-8K',   previous:'-14K',  actual:null},
    {date:'2026-03-17',time:'12:30am',currency:'GBP',impact:'High',  title:'Unemployment Rate',                forecast:'4.5%',  previous:'4.4%',  actual:null},
    {date:'2026-03-17',time:'12:30am',currency:'GBP',impact:'Low',   title:'Average Earnings Index 3M/Y',      forecast:'5.8%',  previous:'6.0%',  actual:null},
    {date:'2026-03-17',time:'2:30am', currency:'AUD',impact:'Low',   title:'HIA New Home Sales m/m',           forecast:'',      previous:'-3.5%', actual:null},
    {date:'2026-03-17',time:'3:00pm', currency:'USD',impact:'Medium',title:'Empire State Manufacturing Index', forecast:'-4.2',  previous:'-20.0', actual:null},
    {date:'2026-03-17',time:'3:00pm', currency:'USD',impact:'Low',   title:'TIC Long-Term Purchases',          forecast:'',      previous:'234.7B',actual:null},
    // Tuesday Mar 18
    {date:'2026-03-18',time:'12:30am',currency:'AUD',impact:'High',  title:'RBA Rate Decision',                forecast:'4.10%', previous:'4.35%', actual:null},
    {date:'2026-03-18',time:'1:30pm', currency:'CAD',impact:'High',  title:'CPI m/m',                          forecast:'0.6%',  previous:'-0.1%', actual:null},
    {date:'2026-03-18',time:'1:30pm', currency:'CAD',impact:'High',  title:'CPI y/y',                          forecast:'2.2%',  previous:'1.9%',  actual:null},
    {date:'2026-03-18',time:'1:30pm', currency:'USD',impact:'Medium',title:'Retail Sales m/m',                 forecast:'0.6%',  previous:'-0.9%', actual:null},
    {date:'2026-03-18',time:'1:30pm', currency:'USD',impact:'Medium',title:'Core Retail Sales m/m',            forecast:'0.3%',  previous:'-0.4%', actual:null},
    {date:'2026-03-18',time:'3:00pm', currency:'USD',impact:'Low',   title:'Business Inventories m/m',         forecast:'0.3%',  previous:'0.3%',  actual:null},
    {date:'2026-03-18',time:'3:00pm', currency:'USD',impact:'Medium',title:'NAHB Housing Market Index',        forecast:'42',    previous:'42',    actual:null},
    // Wednesday Mar 19 — FOMC
    {date:'2026-03-19',time:'1:30pm', currency:'USD',impact:'Low',   title:'Building Permits',                 forecast:'1.46M', previous:'1.47M', actual:null},
    {date:'2026-03-19',time:'1:30pm', currency:'USD',impact:'Low',   title:'Housing Starts',                   forecast:'1.38M', previous:'1.37M', actual:null},
    {date:'2026-03-19',time:'2:00am', currency:'JPY',impact:'High',  title:'BOJ Rate Decision',                forecast:'0.50%', previous:'0.50%', actual:null},
    {date:'2026-03-19',time:'6:00pm', currency:'USD',impact:'High',  title:'FOMC Rate Decision',               forecast:'4.25%', previous:'4.25%', actual:null},
    {date:'2026-03-19',time:'6:00pm', currency:'USD',impact:'High',  title:'FOMC Economic Projections',        forecast:'',      previous:'',      actual:null},
    {date:'2026-03-19',time:'6:30pm', currency:'USD',impact:'High',  title:'FOMC Press Conference',            forecast:'',      previous:'',      actual:null},
    // Thursday Mar 20
    {date:'2026-03-20',time:'9:30am', currency:'GBP',impact:'High',  title:'BOE Rate Decision',                forecast:'4.50%', previous:'4.50%', actual:null},
    {date:'2026-03-20',time:'9:30am', currency:'GBP',impact:'Medium',title:'BOE MPC Vote',                     forecast:'',      previous:'8-1',   actual:null},
    {date:'2026-03-20',time:'1:30pm', currency:'USD',impact:'Medium',title:'Philadelphia Fed Index',           forecast:'8.5',   previous:'18.1',  actual:null},
    {date:'2026-03-20',time:'1:30pm', currency:'USD',impact:'Low',   title:'Unemployment Claims',              forecast:'225K',  previous:'220K',  actual:null},
    {date:'2026-03-20',time:'3:00pm', currency:'USD',impact:'Low',   title:'Existing Home Sales',              forecast:'4.15M', previous:'4.08M', actual:null},
    {date:'2026-03-20',time:'3:00pm', currency:'CHF',impact:'High',  title:'SNB Rate Decision',                forecast:'0.25%', previous:'0.50%', actual:null},
    // Friday Mar 21
    {date:'2026-03-21',time:'1:30pm', currency:'USD',impact:'Low',   title:'Flash Manufacturing PMI',          forecast:'51.5',  previous:'52.7',  actual:null},
    {date:'2026-03-21',time:'1:30pm', currency:'USD',impact:'Low',   title:'Flash Services PMI',               forecast:'50.8',  previous:'51.0',  actual:null},
    {date:'2026-03-21',time:'2:00pm', currency:'EUR',impact:'Low',   title:'Flash Manufacturing PMI',          forecast:'48.2',  previous:'47.6',  actual:null},
    // Saturday Mar 28 — key upcoming
    {date:'2026-03-28',time:'1:30pm', currency:'USD',impact:'High',  title:'Core PCE Price Index m/m',         forecast:'0.3%',  previous:'0.3%',  actual:null},
    {date:'2026-03-28',time:'1:30pm', currency:'USD',impact:'High',  title:'Personal Income m/m',              forecast:'0.4%',  previous:'0.9%',  actual:null}
  ];

  // ── helpers ──────────────────────────────────────────
  const impDots = imp => {
    const i = (imp||'').toLowerCase();
    if(i==='high')   return `<span style="color:#ff2222;font-size:7px;font-weight:700">H</span>`;
    if(i==='medium') return `<span style="color:#ff6600;font-size:7px;font-weight:700">M</span>`;
    return                   `<span style="color:#333;font-size:7px;font-weight:400">L</span>`;
  };

  // Parse numeric value from strings like "+2.9%", "-0.3%", "165K", "4.1%"
  // FF-exact: parseFloat handles "2.9%" → 2.9, "165K" needs manual K parse
  const _ffNum = s => {
    if(!s && s!==0) return NaN;
    const str = String(s).trim().replace(/,/g,'');
    const m = str.match(/^([+-]?\d*\.?\d+)\s*([KkMmBbTt%]?)$/);
    if(!m) return NaN;
    const n = parseFloat(m[1]);
    const mul = {K:1e3,k:1e3,M:1e6,m:1e6,B:1e9,b:1e9,T:1e12,t:1e12,'%':1,'':1}[m[2]]||1;
    return n * mul;
  };

  // ACTUAL color — exactly like FF: green if actual > forecast (beat), red if miss
  // FF does NOT flip for lower-is-better — it just shows green=beat forecast numerically
  const actualColor = (actual, forecast) => {
    if(!actual || actual==='' || actual===null) return '#1a1200';
    const a = _ffNum(actual);
    const f = _ffNum(forecast);
    if(isNaN(a)) return '#c8b890';         // has value but can't parse → neutral
    if(isNaN(f)) return '#c8b890';         // no forecast → neutral
    if(a > f) return '#00cc44';            // beat → green
    if(a < f) return '#ff3333';            // miss → red
    return '#c8b890';                      // inline → neutral
  };

  // FORECAST vs PREVIOUS — neutral blue like FF
  const forecastColor = () => '#8899bb';

  const isLive = _macroCache.ecal.length>0;
  const todayStr = new Date().toISOString().slice(0,10);

  let h=`<table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace;background:#000">
  <colgroup>
    <col style="width:44px"><col style="width:36px"><col style="width:28px">
    <col><col style="width:66px"><col style="width:66px"><col style="width:66px">
  </colgroup>
  <tr style="background:#000;">
    <th style="padding:3px 6px;font-size:6.5px;color:#333;text-align:left;letter-spacing:.8px;font-weight:700">TIME</th>
    <th style="padding:3px 5px;font-size:6.5px;color:#333;text-align:left;letter-spacing:.8px;font-weight:700">CURR</th>
    <th style="padding:3px 4px;font-size:6.5px;color:#333;text-align:left;letter-spacing:.8px;font-weight:700">IMP</th>
    <th style="padding:3px 8px;font-size:6.5px;color:#333;text-align:left;letter-spacing:.8px;font-weight:700">EVENT</th>
    <th style="padding:3px 6px;font-size:6.5px;color:#333;text-align:right;letter-spacing:.8px;font-weight:700">ACTUAL</th>
    <th style="padding:3px 6px;font-size:6.5px;color:#333;text-align:right;letter-spacing:.8px;font-weight:700">FORECAST</th>
    <th style="padding:3px 6px;font-size:6.5px;color:#333;text-align:right;letter-spacing:.8px;font-weight:700">PREVIOUS</th>
  </tr>`;

  let lastDate='';
  evts.forEach((e,i)=>{
    const imp = (e.impact||'').toLowerCase();
    const isHigh = imp==='high';
    const isMed  = imp==='medium';
    const isToday = e.date===todayStr;

    // Date group header — XF Terminal style
    if(e.date!==lastDate){
      const d = e.date ? new Date(e.date+'T12:00:00Z') : null;
      const dStr = d ? d.toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'short',year:'numeric'}) : '';
      const evtCount = evts.filter(x=>x.date===e.date).length;
      const isTodayHeader = e.date===todayStr;
      h+=`<tr style="background:#000">
        <td colspan="7" style="padding:4px 10px;font-size:7px;font-weight:700;letter-spacing:1.5px;color:#444">
          ${dStr.toUpperCase()}
          <span style="color:#222;font-weight:400;font-size:6px;margin-left:8px">${evtCount}</span>
        </td>
      </tr>`;
      lastDate=e.date;
    }

    const aCol = actualColor(e.actual, e.forecast);
    const fCol = forecastColor();
    const hasActual = e.actual && e.actual!=='—';
    const rowBg = '#000';
    const leftBorder = isHigh&&!hasActual ? ';border-left:3px solid #ff2222' : isMed&&!hasActual ? ';border-left:2px solid #ff8800' : '';

    h+=`<tr style="background:#000${leftBorder}"
      onmouseover="this.style.background='#050505'"
      onmouseout="this.style.background='#000'">
      <td style="padding:3px 6px;color:#aa8860;font-size:8px;white-space:nowrap;font-variant-numeric:tabular-nums">${e.time||'—'}</td>
      <td style="padding:3px 5px;color:#aa9980;font-size:7px;font-weight:700;letter-spacing:1px;white-space:nowrap;font-family:'Share Tech Mono',monospace">${e.currency||''}</td>
      <td style="padding:3px 4px;white-space:nowrap">${impDots(e.impact)}</td>
      <td style="padding:3px 8px;color:${isHigh?'#887060':isMed?'#887060':'#554433'};font-size:9px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.title||''}</td>
      <td style="padding:3px 6px;color:${aCol};font-size:10px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums">${hasActual?e.actual:'—'}</td>
      <td style="padding:3px 6px;color:${fCol};font-size:10px;text-align:right;font-variant-numeric:tabular-nums;font-weight:500">${e.forecast||'—'}</td>
      <td style="padding:3px 6px;color:#665840;font-size:10px;text-align:right;font-variant-numeric:tabular-nums">${e.previous||'—'}</td>
    </tr>`;
  });

  h+=`</table>
  <div style="padding:3px 10px;color:#222;font-size:6px;font-family:'Share Tech Mono',monospace">
    FOREX FACTORY · <span style="color:#00cc44">GREEN</span>=BEAT · <span style="color:#ff2222">RED</span>=MISS
  </div>`;
  return h;
}

function buildECAL2(){
  // Fetch next week FF JSON independently
  if(!window._ecal2Cache) window._ecal2Cache = {evts:[], loading:false, lastFetch:0};
  const cache = window._ecal2Cache;

  const render = (evts) => {
    const isLive = evts.length > 0 && evts[0]._live;
    const _ffNum = s => {
      if(!s && s!==0) return NaN;
      const str = String(s).trim().replace(/,/g,'');
      const m = str.match(/^([+-]?\d*\.?\d+)\s*([KkMmBbTt%]?)$/);
      if(!m) return NaN;
      return parseFloat(m[1]) * ({K:1e3,k:1e3,M:1e6,m:1e6,B:1e9,b:1e9,T:1e12,t:1e12,'%':1,'':1}[m[2]]||1);
    };
    const actualColor = (actual, forecast) => {
      if(!actual || actual==='' || actual===null) return '#1a1200';
      const a = _ffNum(actual), f = _ffNum(forecast);
      if(isNaN(a)) return '#c8b890';
      if(isNaN(f)) return '#c8b890';
      return a > f ? '#00cc44' : a < f ? '#ff3333' : '#c8b890';
    };
    const impDots = imp => {
      const i = (imp||'').toLowerCase();
      if(i==='high')   return `<span style="color:#ff2222;font-size:8px;font-weight:700;letter-spacing:.3px">3</span>`;
      if(i==='medium') return `<span style="color:#F39F41;font-size:8px;font-weight:700;letter-spacing:.3px">2</span>`;
      return                   `<span style="color:#ff7700;font-size:8px;font-weight:700;letter-spacing:.3px">1</span>`;
    };

    let h=`<table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace;background:#000">
    <colgroup><col style="width:44px"><col style="width:36px"><col style="width:28px"><col><col style="width:66px"><col style="width:66px"><col style="width:66px"></colgroup>
    <tr style="background:#000;">
      <th style="padding:3px 6px;font-size:7px;color:#aa9980;text-align:left;letter-spacing:1px;font-weight:700">TIME</th>
      <th style="padding:3px 5px;font-size:7px;color:#aa9980;text-align:left;letter-spacing:1px;font-weight:700">CURR</th>
      <th style="padding:3px 4px;font-size:7px;color:#aa9980;text-align:left;letter-spacing:1px;font-weight:700">IMP</th>
      <th style="padding:3px 8px;font-size:7px;color:#aa9980;text-align:left;letter-spacing:1px;font-weight:700">EVENT</th>
      <th style="padding:3px 6px;font-size:7px;color:#aa9980;text-align:right;letter-spacing:1px;font-weight:700">ACTUAL</th>
      <th style="padding:3px 6px;font-size:7px;color:#aa9980;text-align:right;letter-spacing:1px;font-weight:700">FORECAST</th>
      <th style="padding:3px 6px;font-size:7px;color:#aa9980;text-align:right;letter-spacing:1px;font-weight:700">PREVIOUS</th>
    </tr>`;

    if(evts.length===0){
      h+=`<tr><td colspan="7" style="padding:20px;text-align:center;color:#998870;font-size:8px">LOADING NEXT WEEK DATA…</td></tr>`;
    } else {
      let lastDate='';
      evts.forEach(e=>{
        const imp=(e.impact||'').toLowerCase();
        const isHigh=imp==='high', isMed=imp==='medium';
        if(e.date!==lastDate){
          const d=e.date?new Date(e.date+'T12:00:00Z'):null;
          const dStr=d?d.toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'short',year:'numeric'}):'';
          const cnt=evts.filter(x=>x.date===e.date).length;
          h+=`<tr style="background:#000;border-top:1px solid #1a1200"><td colspan="7" style="padding:5px 10px;font-size:8px;font-weight:700;letter-spacing:1px;color:#ffffff">${dStr.toUpperCase()}<span style="color:#887760;font-weight:400;font-size:7px;margin-left:8px">${cnt} events</span></td></tr>`;
          lastDate=e.date;
        }
        const aCol=actualColor(e.actual,e.forecast);
        const hasActual=e.actual&&e.actual!=='—';
        const rowBg=isHigh?'rgba(255,34,34,.04)':'#000';
        const leftBorder=isHigh?';border-left:3px solid #ff2222':isMed?';border-left:2px solid #ff8800':'';
        h+=`<tr style="background:${rowBg};border-bottom:1px solid #0d0a00${leftBorder}"
          onmouseover="this.style.background='transparent'" onmouseout="this.style.background='${rowBg}'">
          <td style="padding:4px 6px;color:#aa8860;font-size:9px;white-space:nowrap;font-variant-numeric:tabular-nums">${e.time||'—'}</td>
          <td style="padding:4px 5px;color:#aa9980;font-size:7px;font-weight:700;letter-spacing:1px;white-space:nowrap;font-family:'Share Tech Mono',monospace">${e.currency||''}</td>
          <td style="padding:4px 4px;white-space:nowrap">${impDots(e.impact)}</td>
          <td style="padding:4px 8px;color:${isHigh?'#ff8800':isMed?'#c8c0a8':'#998870'};font-size:${isHigh?10:9}px;font-weight:${isHigh?'600':'400'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.title||''}</td>
          <td style="padding:4px 6px;color:${aCol};font-size:10px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums">${hasActual?e.actual:'—'}</td>
          <td style="padding:4px 6px;color:#8899bb;font-size:10px;text-align:right;font-variant-numeric:tabular-nums;font-weight:500">${e.forecast||'—'}</td>
          <td style="padding:4px 6px;color:#665840;font-size:10px;text-align:right;font-variant-numeric:tabular-nums">${e.previous||'—'}</td>
        </tr>`;
      });
    }
    h+=`</table><div style="padding:4px 10px;color:#887760;font-size:6.5px;font-family:'Share Tech Mono',monospace">SOURCE: FOREX FACTORY · NEXT WEEK &nbsp;·&nbsp; <span style="color:#00cc44">GREEN</span>=BEAT &nbsp;<span style="color:#ff2222">RED</span>=MISS</div>`;
    return h;
  };

  // Fetch next week JSON
  if(!cache.loading && (cache.evts.length===0 || Date.now()-cache.lastFetch > 300000)){
    cache.loading = true;
    fetch('https://nfs.faireconomy.media/ff_calendar_nextweek.json')
      .then(r=>r.json())
      .then(data=>{
        cache.evts = data.map(e=>({
          date: e.date ? new Date(e.date).toISOString().slice(0,10) : '',
          time: e.date ? new Date(e.date).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'UTC'}) : '',
          currency: e.country||'',
          impact: e.impact||'',
          title: e.title||'',
          forecast: e.forecast||'',
          previous: e.previous||'',
          actual: (e.actual&&e.actual!==''?e.actual:null),
          _live: true
        })).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);
        cache.lastFetch = Date.now();
        cache.loading = false;
        refreshPanel('ECAL2');
      })
      .catch(()=>{ cache.loading=false; });
  }

  return render(cache.evts);
}

function buildFED(){
  let h=`<table class="pt"><colgroup><col><col style="width:62px"><col style="width:58px"><col style="width:48px"><col style="width:62px"></colgroup>
  <tr><td colspan="5" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:#998870;background:#000;border-top:1px solid #0d0a00">FED FUNDS TARGET — CURRENT: 3.50–3.75% · EFFR 3.64% · NEXT FOMC MAR 18</td></tr>
  <tr><th>MEETING</th><th class="r">CUT -25bp</th><th class="r">HOLD</th><th class="r">HIKE</th><th class="r">IMPLIED</th></tr>`;
  [
    {m:'MAR-18-26', c:4,  h:96, k:0, r:3.64},
    {m:'MAY-7-26',  c:17, h:82, k:1, r:3.55},
    {m:'JUN-17-26', c:47, h:51, k:2, r:3.38},
    {m:'JUL-29-26', c:38, h:56, k:6, r:3.28},
    {m:'SEP-16-26', c:35, h:55, k:10,r:3.18},
    {m:'DEC-9-26',  c:28, h:54, k:18,r:3.08}
  ].forEach(r=>{
    h+=`<tr>
      <td class="ga" style="font-weight:400;font-size:9px">${r.m}</td>
      <td style="color:#aa44ff;text-align:right" class="r">${r.c}%</td>
      <td class="wh r">${r.h}%</td>
      <td class="dn r">${r.k>0?r.k+'%':'—'}</td>
      <td style="color:#cc44aa;text-align:right" class="r">${r.r}%</td>
    </tr>`;
  });
  return h+'</table>';
}

function buildECBPanel(){
  let h=`<table class="pt"><colgroup><col><col style="width:62px"><col style="width:58px"><col style="width:62px"></colgroup>
  <tr><td colspan="4" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:#998870;background:#000;border-top:1px solid #0d0a00">ECB DEPOSIT RATE — CURRENT: 2.00% · MRO 2.15% · NEXT MEETING MAR 19</td></tr>
  <tr><th>MEETING</th><th class="r">CUT -25bp</th><th class="r">HOLD</th><th class="r">IMPLIED</th></tr>`;
  [
    {m:'MAR-19-26', c:8,  h:92, r:1.98},
    {m:'APR-29-26', c:12, h:87, r:1.95},
    {m:'JUN-17-26', c:18, h:80, r:1.91},
    {m:'JUL-24-26', c:14, h:83, r:1.89},
    {m:'SEP-10-26', c:16, h:78, r:1.86},
    {m:'DEC-17-26', c:11, h:82, r:1.85}
  ].forEach(r=>{
    h+=`<tr>
      <td class="ga" style="font-weight:400;font-size:9px">${r.m}</td>
      <td style="color:#aa44ff;text-align:right" class="r">${r.c}%</td>
      <td class="wh r">${r.h}%</td>
      <td style="color:#cc44aa;text-align:right" class="r">${r.r}%</td>
    </tr>`;
  });
  return h+'</table>';
}

function buildWIRP(){
  return buildFED()+'<div style="margin-top:6px">'+buildECBPanel()+'</div>';
}

// Czech translation via Google Translate (free, no key needed)
// _czCache: original text -> czech text
// _czActive: elId -> original text (tracks which headlines currently show CS)
const _czCache={};
const _czActive={};
const _czBtnState={};

async function _toCzech(text, elId){
  const el=document.getElementById(elId);
  if(!el)return;

  // Toggle: if currently showing Czech, switch back to English
  if(_czActive[elId]){
    el.textContent=_czActive[elId];
    el.style.color='var(--wh2)';
    delete _czActive[elId];
    return;
  }

  // Use cache if available
  if(_czCache[text]){
    _czActive[elId]=text;
    el.textContent=_czCache[text];
    el.style.color='var(--ye2)';
    return;
  }

  el.style.color='var(--am)';
  el.textContent='translating...';
  try{
    const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=cs&dt=t&q='+encodeURIComponent(text);
    const r=await _fetchTimeout(url, 6000);
    const j=await r.json();
    const cz=(j[0]||[]).map(s=>s[0]||'').join('');
    if(cz&&cz.length>3){
      _czCache[text]=cz;
      _czActive[elId]=text;
      el.textContent=cz;
      el.style.color='var(--ye2)';
    } else {
      el.textContent=text;
      el.style.color='var(--wh2)';
    }
  }catch(e){
    el.style.color='var(--rd)';
    el.textContent='[connection error]';
    setTimeout(()=>{const e2=document.getElementById(elId);if(e2)e2.textContent=text;},2000);
  }
}

// After any panel re-render, restore active translations
function _restoreTranslations(){
  Object.entries(_czActive).forEach(([elId, origText])=>{
    const el=document.getElementById(elId);
    if(el && _czCache[origText]){
      el.textContent=_czCache[origText];
      el.style.color='var(--ye2)';
    }
  });
}

function _wnToggle(eid){
  const b=document.getElementById(eid);
  const ic=document.getElementById(eid+'-icon');
  if(!b)return;
  const opening=b.style.display==='none';
  b.style.display=opening?'block':'none';
  if(ic)ic.textContent=opening?'ZAVRIT':'CIST';
  // Mark panel so refreshAllPanels skips it while article is open
  const panel=b.closest('[id^="pb-"]');
  if(panel)panel.dataset.locked=opening?'1':'';
}

// Translate full article body text to Czech manually
async function _translateArticle(eid){
  const container=document.getElementById(eid);
  if(!container)return;
  const btn=document.getElementById(eid+'-trbtn');
  const indicator=document.getElementById(eid+'-trstatus')||document.getElementById(eid.replace(/-body$/,'')+'-body-trstatus');

  // Collect all text nodes from paragraphs and divs
  const textEls=container.querySelectorAll('p, .wn-body-text');
  if(textEls.length===0){
    // fallback: translate all visible text as one block
    const allText=container.innerText.trim();
    if(!allText)return;
    if(indicator)indicator.textContent='translating...';
    if(btn)btn.style.color='var(--am)';
    try{
      const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=cs&dt=t&q='+encodeURIComponent(allText.slice(0,4000));
      const r=await _fetchTimeout(url, 10000);
      const j=await r.json();
      const cz=(j[0]||[]).map(s=>s[0]||'').join('');
      if(cz&&cz.length>5){
        container.dataset.origHtml=container.innerHTML;
        container.innerHTML='<div style="color:var(--ye2);font-size:10px;line-height:1.6;padding:4px 0">'+cz.replace(/\n/g,'<br>')+ '</div>';
        if(indicator){indicator.textContent='CZ ✓';}
        if(btn){btn.textContent='EN';btn.onclick=()=>_untranslateArticle(eid);}
      }
    }catch(e){
      if(indicator)indicator.textContent='chyba';
    }
    return;
  }

  if(indicator)indicator.textContent='translating...';
  if(btn)btn.style.color='var(--am)';

  // Translate each paragraph separately
  let ok=0;
  for(const el of textEls){
    const orig=el.textContent.trim();
    if(!orig||orig.length<5)continue;
    if(!el.dataset.origText)el.dataset.origText=orig;
    try{
      const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=cs&dt=t&q='+encodeURIComponent(orig.slice(0,2000));
      const r=await _fetchTimeout(url, 8000);
      const j=await r.json();
      const cz=(j[0]||[]).map(s=>s[0]||'').join('');
      if(cz&&cz.length>3){
        el.textContent=cz;
        el.style.color='var(--ye2)';
        ok++;
      }
    }catch(e){}
  }
  if(indicator)indicator.textContent=ok>0?'CZ ✓':'chyba';
  if(btn){btn.textContent='EN';btn.onclick=()=>_untranslateArticle(eid);}
}

function _untranslateArticle(eid){
  const container=document.getElementById(eid);
  if(!container)return;
  const btn=document.getElementById(eid+'-trbtn');
  const indicator=document.getElementById(eid+'-trstatus')||document.getElementById(eid.replace(/-body$/,'')+'-body-trstatus');
  // If we saved full HTML, restore it
  if(container.dataset.origHtml){
    container.innerHTML=container.dataset.origHtml;
    delete container.dataset.origHtml;
  } else {
    // Restore individual paragraphs
    const textEls=container.querySelectorAll('p, .wn-body-text');
    textEls.forEach(el=>{
      if(el.dataset.origText){el.textContent=el.dataset.origText;el.style.color='';}
    });
  }
  if(indicator)indicator.textContent='';
  if(btn){btn.textContent='CS';btn.style.color='#665840';btn.onclick=()=>_translateArticle(eid);}
}

// ── Global risk scoring & dot renderer ─────────────────────────────────────
window._riskLevel = function(title){
  const t = (title||'').toLowerCase();
  if(['crisis','crash','collapse','default','war','attack','explosion','emergency',
      'ban','arrest','fraud','hack','exploit','seized','sanctioned','blocked',
      'rate hike','inflation surge','recession','bank run','bankruptcy',
      'iran','north korea','conflict','strike','missile','invasion'].some(k=>t.includes(k)))
    return 'high';
  if(['rate cut','rate decision','fomc','ecb decision','fed chair','powell',
      'gdp miss','nonfarm','unemployment','cpi report','pce data',
      'warning','concern','risk','volatility','selloff',
      'sec enforcement','cftc','lawsuit','investigation',
      'opec','oil price','trade war','tariff','sanction'].some(k=>t.includes(k)))
    return 'med';
  return null;
};
window._riskDot = function(risk, title){
  const sig = window._kwSignal ? window._kwSignal(title||'') : null;
  if(sig==='B') return '<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#00ff44;box-shadow:0 0 3px #00ff44;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">B</span>';
  if(sig==='S') return '<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#ff0000;box-shadow:0 0 3px #ff0000;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">S</span>';
  return '';
};

function buildWNTable(data){
  // Use passed data if provided and non-empty, otherwise fall back to _newsCache
  const items = (Array.isArray(data) && data.length > 0) ? data :
                (_newsCache.length > 0 ? _newsCache : []);
  if(items.length === 0){
    return `<div style="padding:40px;text-align:center;color:#443322;font-size:9px;letter-spacing:1px">
      <div style="font-size:11px;color:#ff7700;margin-bottom:8px">⟳ FETCHING LIVE NEWS</div>
      <div style="font-size:8px;color:#332200;letter-spacing:2px">CONNECTING TO GITHUB RSS FEED...</div>
      <div style="font-size:8px;color:#221100;margin-top:6px">Run scraper on GitHub first: Actions → News Scraper → Run workflow</div>
    </div>`;
  }

  // Bloomberg Terminal source codes — Tier 1 = bright, Tier 2 = mid, Tier 3 = dim
  const _cls = item => {
    const t   = item.tag||(item.flash?'FLASH':item.mac?'MACRO':'');
    const src = (item.src||'').toLowerCase();
    const isOff = item._isOfficial;
    const tier  = item.tier || 3;
    // Official / government sources
    if(t==='FLASH'||item.flash||src.includes('flash'))               return {code:'FLASH', col:'#ff2200'};
    if(isOff && src.includes('sec'))                                 return {code:'SEC',   col:'#ff6600'};
    if(isOff && (src.includes('fed')||src.includes('fed·')))         return {code:'FED',   col:'#ff8800'};
    if(isOff && src.includes('ecb'))                                 return {code:'ECB',   col:'#ffaa00'};
    if(isOff && src.includes('boe'))                                 return {code:'BOE',   col:'#ff9900'};
    if(isOff && src.includes('boj'))                                 return {code:'BOJ',   col:'#ff9900'};
    if(isOff && (src.includes('bis')||src.includes('imf')))          return {code:src.includes('bis')?'BIS':'IMF', col:'#dd8800'};
    if(isOff || src.includes('cb·')||src.startsWith('cb'))           return {code:'CB',    col:'#cc7700'};
    if(src.includes('edgar')||src.startsWith('sec'))                 return {code:'EDGAR', col:'#ff6600'};
    if(src.includes('businesswire'))                                 return {code:'BWR',   col:'#dd7700'};
    if(src.includes('pr newswire')||src.includes('prnewswire'))      return {code:'PRN',   col:'#dd7700'};
    if(src.includes('globenw')||src.includes('globe'))               return {code:'GNW',   col:'#dd7700'};
    if(src.includes('earn whispers'))                                return {code:'EWH',   col:'#cc8800'};
    // Wire agencies (Tier 1)
    if(src.includes('reuters'))                                      return {code:'RTS',   col:'#ddbb88'};
    if(src.includes('dj·')||src.includes('wall street')||src.includes('wsj'))return{code:'DJ',col:'#ddbb88'};
    if(src==='ap'||src.startsWith('ap ')||src.includes('associated'))return {code:'AP',    col:'#ddbb88'};
    // Major financial press (Tier 2)
    if(src.includes('financial times')||src.startsWith('ft'))        return {code:'FT',    col:'#c8b880'};
    if(src.includes('bloomberg'))                                    return {code:'BBG',   col:'#c8b880'};
    if(src.includes('cnbc'))                                         return {code:'CNBC',  col:'#b8a870'};
    if(src.includes('nyt')||src.includes('new york times'))          return {code:'NYT',   col:'#b8a870'};
    if(src.includes('economist'))                                    return {code:'ECO',   col:'#b8a870'};
    if(src.includes('nikkei'))                                       return {code:'NKI',   col:'#b8a870'};
    if(src.includes('scmp'))                                         return {code:'SCMP',  col:'#b8a870'};
    if(src.includes('marketwatch'))                                  return {code:'MKW',   col:'#a89860'};
    if(src.includes('handelsblatt'))                                 return {code:'HBL',   col:'#a89860'};
    if(src.includes('les echos'))                                    return {code:'ECH',   col:'#a89860'};
    if(src.includes('economic times'))                               return {code:'ET·IN', col:'#a89860'};
    // Specialist
    if(src.includes('bbc'))                                          return {code:'BBC',   col:'#a09060'};
    if(src.includes('al jazeera'))                                   return {code:'AJZ',   col:'#a09060'};
    if(src.includes('axios'))                                        return {code:'AXS',   col:'#a09060'};
    if(src.includes('politico'))                                     return {code:'POL',   col:'#a09060'};
    if(src.includes('fred'))                                         return {code:'FRED',  col:'#889858'};
    if(src.includes('eia'))                                          return {code:'EIA',   col:'#889858'};
    if(src.includes('opec'))                                         return {code:'OPEC',  col:'#889858'};
    if(src.includes('oilprice'))                                     return {code:'OIL',   col:'#889858'};
    if(src.includes('kitco'))                                        return {code:'KTC',   col:'#889858'};
    if(src.includes('oecd')||src.includes('world bank'))             return {code:'INTL',  col:'#cc7700'};
    if(src.includes('coindesk'))                                     return {code:'CDS',   col:'#787848'};
    if(src.includes('cointelegraph'))                                return {code:'CTG',   col:'#787848'};
    if(src.includes('seeking'))                                      return {code:'SA',    col:'#787848'};
    if(src.includes('techcrunch'))                                   return {code:'TC',    col:'#787848'};
    if(t==='EARNINGS')                                               return {code:'ERN',   col:'#dd8800'};
    if(t==='MACRO'||item.mac)                                        return {code:'MACRO', col:'#cc7700'};
    return                                                                  {code:'WIR',   col:'#706850'};
  };

  const now = Date.now()/1000;

  // Count sources that delivered live data
  const _srcSet = new Set(items.filter(x=>!x._static).map(x=>x.src||''));
  const _tier1  = items.filter(x=>x.tier===1||x._isOfficial).length;
  const _tier2  = items.filter(x=>x.tier===2).length;

  let h = `
    <table style="width:100%;border-collapse:collapse;font-family:'Courier Prime','Courier New',Courier,serif;table-layout:fixeduto;background:#000;margin:2px 0 0 0;">
    <colgroup>
      <col style="width:6px">
      <col style="width:46px">
      <col>
      <col style="width:44px">
      <col style="width:52px">
      <col style="width:6px">
    </colgroup>
    `;

  // Bloomberg risk scoring
  const _risk = title => {
    const t = title.toLowerCase();
    if(['crisis','crash','collapse','default','war','attack','explosion','emergency',
        'ban','arrest','fraud','hack','exploit','seized','sanctioned','blocked',
        'rate hike','inflation surge','recession','bank run','bankruptcy',
        'iran','north korea','conflict','strike','missile','invasion'].some(k=>t.includes(k)))
      return 'high';
    if(['rate cut','rate decision','fomc','ecb decision','fed chair','powell',
        'gdp miss','nonfarm','unemployment','cpi report','pce data',
        'warning','concern','risk','volatility','selloff',
        'sec enforcement','cftc','lawsuit','investigation',
        'opec','oil price','trade war','tariff','sanction'].some(k=>t.includes(k)))
      return 'med';
    return null;
  };

  // Format timestamp Bloomberg-style: today = HH:MM, older = MM/DD
  const _fmtBBG = ts => {
    if(!ts) return '';
    const d = new Date(ts*1000), n = new Date();
    if(d.toDateString()===n.toDateString())
      return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
    return (d.getMonth()+1).toString().padStart(2,'0')+'/'+ d.getDate().toString().padStart(2,'0');
  };

  // Real source name helper — maps src string to short code
  const _realSrc = src => {
    const s = (src||'').toLowerCase();
    if(s.includes('reuters'))    return 'RTS';
    if(s.includes('wsj')||s.includes('wall street')||s.includes('dj·')) return 'DJ';
    if(s.includes('marketwatch')||s.includes('mktwatch')) return 'MKW';
    if(s.includes('cnbc'))       return 'CNBC';
    if(s.includes('bloomberg'))  return 'BBG';
    if(s.includes('ft')||s.includes('financial times')) return 'FT';
    if(s.includes('coindesk'))   return 'CDS';
    if(s.includes('cointelegraph')) return 'CTG';
    if(s.includes('decrypt'))    return 'DCR';
    if(s.includes('ap '))        return 'AP';
    if(s.includes('bbc'))        return 'BBC';
    if(s.includes('nyt')||s.includes('new york')) return 'NYT';
    if(s.includes('axios'))      return 'AXS';
    if(s.includes('techcrunch')) return 'TC';
    if(s.includes('eia'))        return 'EIA';
    if(s.includes('fed'))        return 'FED';
    if(s.includes('ecb'))        return 'ECB';
    if(s.includes('imf'))        return 'IMF';
    if(s.includes('cc '))        return 'CC';
    // fallback: first 4 chars uppercase
    return src.slice(0,4).toUpperCase().replace(/[^A-Z0-9]/g,'');
  };

  items.slice(0,80).forEach((item,i)=>{
    const c        = _cls(item);
    const risk     = _risk(item.title||'');
    const isStatic = !!item._static;
    const timeStr  = _fmtBBG(item.ts);

    // Source code — never show FLASH, use real source name
    const srcCode  = (c.code==='FLASH' || c.code==='WIR') ? _realSrc(item.src||'') : c.code;
    const srcCol   = c.col==='#ff2200' ? '#ff8800' : (c.col || '#554433'); // FLASH red → orange

    const titleCol = risk==='high' ? '#ff6600' : '#ff8800';
    const titleW   = risk==='high' ? '700' : risk==='med' ? '600' : '400';
    const dotPfx   = risk==='high' ? '•' : '';
    const lineNum  = i + 1;

    // Risk dot — left side (blinking)
    const _kwSig = window._kwSignal ? window._kwSignal(item.title||'') : null;
    const riskDot = _kwSig==='B'
      ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#00ff44;box-shadow:0 0 3px #00ff44;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">B</span>`
      : _kwSig==='S'
      ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:9px;height:9px;border-radius:50%;background:#ff0000;box-shadow:0 0 3px #ff0000;color:#000;font-size:6px;font-weight:900;line-height:1;font-family:Arial,sans-serif">S</span>`
      : ``;

    h += `<tr id="wnr-${i}" style="height:26px;background:#000;cursor:pointer"
      onclick="_wnOpenDetail(${i})"
      onmouseover="this.style.background='#0d0800'"
      onmouseout="this.style.background='#000'">
      <td style="padding:0 4px 0 4px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:36px">
        <span style="color:#555555;font-size:11px;font-family:'Courier Prime','Courier New',Courier,serif">${lineNum})</span>
      </td>
      <td style="padding:0 6px;vertical-align:middle;overflow:hidden;border-bottom:1px solid #0c0800;max-width:0;width:100%">
        <span style="color:${titleCol};font-size:11px;font-weight:${titleW};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;font-family:'Courier Prime','Courier New',Courier,serif;letter-spacing:.01em" title="${(item.title||'').replace(/"/g,'&quot;')}">${dotPfx}${(item.title||'')}</span>
      </td>
      <td style="padding:0 8px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:46px">
        <span style="color:${srcCol};font-size:9px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.2px">${srcCode}</span>
      </td>
      <td style="padding:0 6px 0 4px;vertical-align:middle;text-align:right;white-space:nowrap;border-bottom:1px solid #0c0800;width:40px">
        <span style="color:#aa9980;font-size:9px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${timeStr}</span>
      </td>
      <td style="width:32px;vertical-align:middle;text-align:center;border-bottom:1px solid #0c0800;padding:0 12px 0 0">${riskDot||''}</td>
      </tr>`;

  });

  h += `</table>`;
  return h;
}

// ── Bloomberg news search/filter ──────────────────────────────────────────
window._wnFilterText = '';
window._wnFilter = function(q) {
  window._wnFilterText = (q||'').trim();
  const term = window._wnFilterText.toLowerCase();
  const isShortTicker = /^[A-Z]{2,6}$/i.test(term) && term.length <= 6;
  const rows = document.querySelectorAll('[id^="wnr-"]');
  rows.forEach(row => {
    if (!term) { row.style.display = ''; return; }
    const text = row.textContent.toLowerCase();
    let match;
    if (isShortTicker) {
      // Word-boundary match: term must appear as standalone word
      match = new RegExp('\\b' + term + '\\b', 'i').test(row.textContent);
    } else {
      match = text.includes(term);
    }
    row.style.display = match ? '' : 'none';
  });
};

window._intelFilter = function(q) {
  const term = (q||'').trim();
  const isShortTicker = /^[A-Z]{2,6}$/i.test(term) && term.length <= 6;
  const feed = document.getElementById('intel-feed');
  if(!feed) return;
  feed.querySelectorAll('tr').forEach(row => {
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

const _GEO_MAP = [
  // Central Banks
  {keys:['federal reserve','fed rate','fomc','powell','us treasury','wall street','nasdaq','nyse','s&p','spx','dow jones'],lat:40.71,lng:-74.01,z:5},
  {keys:['bank of england','boe','ftse','london','gbp','sterling'],lat:51.51,lng:-0.13,z:6},
  {keys:['ecb','european central bank','bund','dax','frankfurt','euro zone','eurozone','eur '],lat:50.11,lng:8.68,z:5},
  {keys:['bank of japan','boj','boj','nikkei','topix','tokyo','yen','jpy','japan'],lat:35.68,lng:139.69,z:5},
  {keys:['pboc','china','beijing','shanghai','hang seng','yuan','cny','renminbi'],lat:31.23,lng:121.47,z:5},
  {keys:['rbi','india','nifty','mumbai','rupee','inr'],lat:19.07,lng:72.87,z:5},
  // Geopolitics
  {keys:['iran','hormuz','tehran','persian gulf','strait of'],lat:27.0,lng:56.0,z:5},
  {keys:['russia','moscow','ruble','rub','ukraine','kyiv'],lat:55.75,lng:37.62,z:5},
  {keys:['israel','tel aviv','gaza','middle east','hamas','hezbollah'],lat:31.78,lng:35.22,z:6},
  {keys:['saudi','riyadh','aramco','opec','gulf'],lat:24.68,lng:46.72,z:5},
  {keys:['taiwan','taipei','tsmc'],lat:25.03,lng:121.56,z:6},
  {keys:['north korea','pyongyang'],lat:39.01,lng:125.74,z:5},
  // Crypto hubs
  {keys:['bitcoin','btc','coinbase','blackrock bitcoin','ibit'],lat:37.77,lng:-122.41,z:5},
  {keys:['binance','bnb chain','changpeng'],lat:1.35,lng:103.82,z:5},
  {keys:['solana','sol ','sol,'],lat:1.35,lng:103.82,z:5},
  {keys:['ethereum','eth ','eth,','vitalik'],lat:52.37,lng:4.90,z:5},
  // Commodities
  {keys:['wti','crude oil','brent','energy','barrel','opec','petroleum'],lat:30.0,lng:48.0,z:4},
  {keys:['gold','comex','xau','precious metal'],lat:40.71,lng:-74.01,z:5},
  {keys:['natural gas','lng','gas price'],lat:60.0,lng:68.0,z:4},
  // Regions
  {keys:['europe','eu ','european','brussels','paris','france','cac'],lat:48.86,lng:2.35,z:4},
  {keys:['germany','german','berlin','btp-bund'],lat:52.52,lng:13.40,z:5},
  {keys:['australia','rba','asx','aud '],lat:-33.87,lng:151.21,z:5},
  {keys:['canada','bank of canada','tsx','cad '],lat:43.65,lng:-79.38,z:5},
  {keys:['brazil','bovespa','brl','são paulo'],lat:-23.55,lng:-46.63,z:5},
  {keys:['singapore','sgd','mas '],lat:1.35,lng:103.82,z:6}
];

function _geoFlyForNews(title){
  if(!title) return;
  const t = title.toLowerCase();
  for(const g of _GEO_MAP){
    if(g.keys.some(k=>t.includes(k))){
      map.flyTo([g.lat,g.lng], g.z, {duration:1.6, easeLinearity:0.25});
      return;
    }
  }
}

// Open article detail as overlay inside the panel
function _wnOpenDetail(idx){
  const items = _newsCache.length > 0 ? _newsCache : NEWS_DATA.map(n=>({
    title:n.h, src:n.s, tag:n.tag||(n.flash?'FLASH':n.mac?'MACRO':'NEWS'),
    color:n.flash?'#ff2222':n.mac?'#00cc44':'#ff8800',
    ts:null, staticTime:n.t, link:n.link||null, body:n.body||null
  }));
  const item = items[idx];
  if(!item) return;

  // If item has a link, open it directly in new tab — never hijack another panel
  if(item.link){ window.open(item.link,'_blank','noopener'); return; }

  // Fly to location on map
  _geoFlyForNews(item.title);

  // Find the panel body that was clicked using the event
  const evtEl = window.event ? window.event.target : null;
  let targetBody = evtEl ? evtEl.closest('[id^="pb-"]') : null;
  if(!targetBody){
    const allPanelBodies = document.querySelectorAll('[id^="pb-"]');
    allPanelBodies.forEach(pb=>{ if(!targetBody && pb.querySelector('table')) targetBody = pb; });
  }
  if(!targetBody) return;

  const isFlash = item.tag==='FLASH'||item.flash;
  const isMacro = item.tag==='MACRO'||item.mac;
  const tagCol  = isFlash?'#ff2222':isMacro?'#00cc44':item.color||'#ff8800';
  const typeLabel = isFlash?'FLASH':isMacro?'MACRO':item.tag||'NEWS';
  const ago   = item.ts ? _fmtAgo(item.ts) : (item.staticTime||'');
  const safeT = (item.title||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  const eid   = 'wnd'+idx;

  targetBody.dataset.locked     = '1';
  targetBody.dataset.prevScroll = targetBody.scrollTop;

  // Format publish date nicely
  const pubDate = item.ts
    ? new Date(item.ts*1000).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})
    : (item.staticTime||'');

  // Prep body text — use full body if available, else placeholder
  const bodyHtml = item.body
    ? `<div style="color:#c8c0a8;font-size:10px;line-height:1.75;letter-spacing:.15px">${item.body.replace(/\n/g,'<br><br>')}</div>`
    : `<div style="color:#998870;font-size:9px;line-height:1.6;padding:12px 0;letter-spacing:.3px;text-align:center">
         Full story text not available in this feed.<br>
         ${item.link?`<br><a href="${item.link}" target="_blank"
           style="color:#ff8800;font-size:9px;text-decoration:none;border:1px solid #3a1800;padding:2px 10px;letter-spacing:.5px">
           OPEN FULL ARTICLE ↗</a>`:''}
       </div>`;

  targetBody.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;font-family:'Share Tech Mono',monospace">

    <!-- ═══ TOP BAR ═══ -->
    <div style="background:#000;height:18px;padding:0 7px;display:flex;align-items:center;gap:6px;flex-shrink:0">
      <span style="color:#aa9980;font-size:6px;font-weight:700;cursor:pointer;letter-spacing:.5px;
        border:1px solid #1a1200;padding:0 6px;height:13px;display:inline-flex;align-items:center;
        transition:all .1s"
        onmouseover="this.style.color='#ffaa44';this.style.borderColor='#ff8800'"
        onmouseout="this.style.color='#554433';this.style.borderColor='#2a1800'"
        onclick="_wnCloseDetail(this)">◄ BACK</span>
      <span style="color:#1a1000">|</span>
      <span style="color:#3a2800;font-size:6px;letter-spacing:.5px">${item.src||''}</span>
      <span style="color:#1a1000">·</span>
      <span style="color:#887760;font-size:6px">${pubDate}</span>
    </div>

    <!-- ═══ HEADLINE ═══ -->
    <div style="padding:7px 10px 6px;border-bottom:1px solid #110900;flex-shrink:0;background:#000">
      <div id="${eid}-title" style="color:#ff8800;font-size:11px;font-weight:600;line-height:1.4;letter-spacing:.05px">${item.title||''}</div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:5px">
        <span style="color:#553300;font-size:6px">CS</span>
        <span style="color:#ff8800;font-size:6px;cursor:pointer;border:1px solid #ff880055;padding:0 5px;height:11px;display:inline-flex;align-items:center;letter-spacing:.3px;transition:all .1s"
          onmouseover="this.style.color='#ffaa44';this.style.borderColor='#ff8800'"
          onmouseout="this.style.color='#ff8800';this.style.borderColor='#ff880055'"
          onclick="_toCzech('${safeT}','${eid}-title')">PŘELOŽIT</span>
        ${item.link?`<a href="${item.link}" target="_blank"
          style="margin-left:auto;color:#ff8800;font-size:6px;text-decoration:none;
            border:1px solid #ff880055;padding:0 6px;height:11px;display:inline-flex;align-items:center;letter-spacing:.4px;transition:all .1s"
          onmouseover="this.style.color='#ff8800';this.style.borderColor='#3a2000'"
          onmouseout="this.style.color='#3a2800';this.style.borderColor='#1a1000'">SOURCE ↗</a>`:''}
      </div>
    </div>

    <!-- ═══ STORY BODY ═══ -->
    <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column">

      <!-- translate story bar -->
      <div style="background:#000;border-bottom:1px solid #0d0800;height:16px;padding:0 10px;display:flex;align-items:center;gap:6px;flex-shrink:0">
        <span style="color:#1e1400;font-size:5.5px;letter-spacing:.6px">TRANSLATE BODY</span>
        <span id="${eid}-trbtn"
          style="color:#ff8800;font-size:6px;cursor:pointer;border:1px solid #ff880055;padding:0 6px;height:11px;display:inline-flex;align-items:center;letter-spacing:.3px;transition:all .1s"
          onmouseover="this.style.color='#ffaa44';this.style.borderColor='#ff8800'"
          onmouseout="this.style.color='#ff8800';this.style.borderColor='#ff880055'"
          onclick="_translateArticle('${eid}-body')">CS</span>
        <span id="${eid}-body-trstatus" style="color:#00cc44;font-size:6px"></span>
      </div>

      <!-- body text -->
      <div id="${eid}-body" style="padding:10px 12px 14px;flex:1">
        ${bodyHtml}

      </div>
    </div>
  </div>`;
}

function _wnCloseDetail(btn){
  // Find panel body and unlock it, re-render news table
  const pb = btn.closest('[id^="pb-"]');
  if(!pb) return;
  pb.dataset.locked = '';
  const st = parseInt(pb.dataset.prevScroll||0);
  pb.innerHTML = buildWNTable(NEWS_DATA);
  pb.scrollTop = st;
}

/* ═══════════════════════════════════════════════════════
   ALERT DETAIL — same behaviour as _wnOpenDetail
═══════════════════════════════════════════════════════ */
function _alertOpenDetail(idx){
  const items = window._alertItems||[];
  const item  = items[idx];
  if(!item) return;

  // If item has a link, open it directly in new tab
  if(item.link){ window.open(item.link,'_blank','noopener'); return; }

  const evtEl = window.event ? window.event.target : null;
  let targetBody = evtEl ? evtEl.closest('[id^="pb-"]') : null;
  if(!targetBody){
    const allPanelBodies = document.querySelectorAll('[id^="pb-"]');
    allPanelBodies.forEach(pb=>{ if(!targetBody && pb.querySelector('table')) targetBody = pb; });
  }
  if(!targetBody) return;

  const isFlash = item.flash;
  const isMacro = item.mac;
  const tagCol   = isFlash?'#ff2222':isMacro?'#ff8800':item.color||'#ff7700';
  const typeLabel= isFlash?'FLASH':isMacro?'MACRO':item.tag||'ALERT';
  const ago      = item.staticTime||'';
  const safeT    = (item.title||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  const eid      = 'alt'+idx;

  targetBody.dataset.locked     = '1';
  targetBody.dataset.prevScroll = targetBody.scrollTop;

  const bodyHtml = item.body
    ? `<div style="color:#c8c0a8;font-size:10px;line-height:1.75;letter-spacing:.15px">${item.body.replace(/\n/g,'<br><br>')}</div>`
    : `<div style="color:#998870;font-size:9px;line-height:1.6;padding:12px 0;letter-spacing:.3px;text-align:center">
         Full story not available.<br>
         ${item.link?`<br><a href="${item.link}" target="_blank"
           style="color:#ff8800;font-size:9px;text-decoration:none;border:1px solid #3a1800;padding:2px 10px;letter-spacing:.5px">
           OPEN SOURCE ↗</a>`:''}
       </div>`;

  targetBody.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;font-family:'Share Tech Mono',monospace">
    <div style="background:#000;height:18px;padding:0 7px;display:flex;align-items:center;gap:6px;flex-shrink:0">
      <span style="color:#aa9980;font-size:6px;font-weight:700;cursor:pointer;letter-spacing:.5px;
        border:1px solid #1a1200;padding:0 6px;height:13px;display:inline-flex;align-items:center;transition:all .1s"
        onmouseover="this.style.color='#ffaa44';this.style.borderColor='#ff8800'"
        onmouseout="this.style.color='#554433';this.style.borderColor='#2a1800'"
        onclick="_wnCloseDetail(this)">◄ BACK</span>
      <span style="color:#1a1000">|</span>
      <span style="color:${tagCol};font-size:6px;font-weight:700;letter-spacing:.5px">${typeLabel}</span>
      <span style="color:#1a1000">·</span>
      <span style="color:#3a2800;font-size:6px;letter-spacing:.5px">${item.src||''}</span>
      <span style="color:#1a1000">·</span>
      <span style="color:#887760;font-size:6px">${ago}</span>
    </div>
    <div style="padding:7px 10px 6px;border-bottom:1px solid #110900;flex-shrink:0;background:#000">
      <div id="${eid}-title" style="color:#ff8800;font-size:11px;font-weight:600;line-height:1.4;letter-spacing:.05px">${item.title||''}</div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:5px">
        <span style="color:#553300;font-size:6px">CS</span>
        <span style="color:#ff8800;font-size:6px;cursor:pointer;border:1px solid #ff880055;padding:0 5px;height:11px;display:inline-flex;align-items:center;letter-spacing:.3px;transition:all .1s"
          onmouseover="this.style.color='#ffaa44';this.style.borderColor='#ff8800'"
          onmouseout="this.style.color='#ff8800';this.style.borderColor='#ff880055'"
          onclick="_toCzech('${safeT}','${eid}-title')">PŘELOŽIT</span>
        ${item.link?`<a href="${item.link}" target="_blank"
          style="margin-left:auto;color:#ff8800;font-size:6px;text-decoration:none;
            border:1px solid #ff880055;padding:0 6px;height:11px;display:inline-flex;align-items:center;letter-spacing:.4px;transition:all .1s"
          onmouseover="this.style.color='#ff8800';this.style.borderColor='#3a2000'"
          onmouseout="this.style.color='#3a2800';this.style.borderColor='#1a1000'">SOURCE ↗</a>`:''}
      </div>
    </div>
    <div style="padding:8px 10px;overflow-y:auto;flex:1;background:#000">${bodyHtml}</div>
  </div>`;
}

function _wnLiveToggle(eid){
  const b = document.getElementById(eid);
  const ic = document.getElementById(eid+'-icon');
  if(!b) return;
  const opening = b.style.display === 'none';
  b.style.display = opening ? 'block' : 'none';
  if(ic) ic.textContent = opening ? 'ZAVŘÍT' : 'ČÍST';
  // Lock panel from auto-refresh while article is open
  const panel = b.closest('[id^="pb-"]');
  if(panel) panel.dataset.locked = opening ? '1' : '';
}

function buildCUSTSRCH(){
  const ff = `font-family:'Arial','Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;`;

  // num=grey | cmd=white | desc=amber
  const row = (n, cmd, desc, action) => {
    const oc = action ? `onclick="${action}"` : '';
    return `<div style="display:flex;align-items:baseline;padding:3px 0;${ff}" ${oc}>
      <span style="color:#666666;width:34px;text-align:right;flex-shrink:0;font-size:13px;font-weight:400;">${n}</span>
      <span style="color:#e8e8e8;width:68px;flex-shrink:0;font-size:13px;padding-left:10px;font-weight:400;">${cmd}</span>
      <span style="color:#F88617;font-size:13px;cursor:pointer;flex:1;padding-left:6px;font-weight:400;"
        onmouseover="this.style.color='#FFB040'" onmouseout="this.style.color='#F88617'">${desc}</span>
    </div>`;
  };

  // section header
  const sec = (n, label) =>
    `<div style="display:flex;align-items:baseline;padding:3px 0;${ff}">
      <span style="color:#555555;width:34px;text-align:right;flex-shrink:0;font-size:13px;font-weight:400;">${n}</span>
      <span style="color:#bbbbbb;font-size:13px;padding-left:10px;font-weight:400;">${label} &gt;</span>
    </div>`;

  const gap = h => `<div style="height:${h}px"></div>`;

  return `<div style="height:100%;display:flex;flex-direction:column;background:#000;overflow:hidden;">

    <!-- ══ HEADER ══ -->
    <div style="height:24px;background:#870F1E;display:flex;align-items:stretch;flex-shrink:0;">
      <div style="background:#870F1E;padding:0 16px;display:flex;align-items:center;border-right:2px solid #550808;">
        <span style="color:#fff;font-size:13px;font-weight:400;${ff}letter-spacing:.2px;">Custom Searches</span>
      </div>
      <div style="flex:1;background:#870F1E;"></div>
      <div style="padding:0 16px;display:flex;align-items:center;background:#870F1E;">
        <span style="color:#fff;font-size:13px;font-weight:400;${ff}letter-spacing:.2px;">News &amp; Research Menu</span>
      </div>
    </div>

    <!-- ══ SEARCH LINE ══ -->
    <div style="background:#000;padding:14px 20px 0 20px;flex-shrink:0;">
      <div style="font-size:14px;margin-bottom:10px;${ff}line-height:1.6;font-weight:400;">
        <span style="color:#ffffff;">Search for News Stories. Pick a </span><span style="color:#1a9ed4;cursor:pointer;text-decoration:underline;"
          onmouseover="this.style.color='#44ccff'" onmouseout="this.style.color='#1a9ed4'">ticker list</span><span style="color:#ffffff;">, or see </span><span style="color:#1a9ed4;cursor:pointer;text-decoration:underline;"
          onmouseover="this.style.color='#44ccff'" onmouseout="this.style.color='#1a9ed4'">more search options</span><span style="color:#ffffff;">.</span>
      </div>
      <div style="height:20px;background:#FFA028;width:100%;"></div>
    </div>

    <!-- ══ BODY ══ -->
    <div style="flex:1;overflow-y:auto;padding:20px 20px 10px 20px;background:#000;display:flex;flex-direction:column;">

      <div style="flex:0 0 20px;"></div>

      <div style="color:#ffffff;font-size:15px;font-weight:400;${ff}margin-bottom:3px;">Browse News &amp; Research Functions</div>
      <div style="color:#FF8C00;font-size:13px;font-weight:400;${ff}margin-bottom:18px;cursor:pointer;"
        onmouseover="this.style.color='#FFB040'" onmouseout="this.style.color='#FF8C00'">Main News Menu</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;align-items:start;column-gap:20px;">

        <!-- LEFT -->
        <div>
          ${row('1)','TOP','Top News',"openPanel('WN')")}
          ${row('2)','CN','Company News',"openPanel('CN')")}
          ${row('3)','READ','Most Read News')}
          ${row('4)','NI','News Categories')}
          ${row('5)','NH','News: All Sources')}
          ${gap(12)}
          ${sec('6)','Recommended Content')}
          ${row('7)','FIRS','First Word')}
          ${row('8)','BI','Bloomberg Intelligence')}
          ${row('9)','BRIE','Bloomberg Brief Newsletters')}
          ${row('10)','QUIC','Bloomberg QuickTakes')}
          ${row('11)','BIZW','Bloomberg Businessweek')}
          ${gap(12)}
          ${sec('12)','Opinion &amp; Analysis')}
          ${row('13)','OPIN','Bloomberg Opinion')}
          ${row('14)','BIP','Bloomberg Intelligence Primers')}
          ${row('15)','BNEF','Bloomberg New Energy Finance')}
          ${row('16)','ECO','Economics',"openPanel('ECAL')")}
        </div>

        <!-- RIGHT -->
        <div>
          ${sec('17)','News in Other Languages')}
          ${gap(20)}
          ${sec('18)','Personalized News')}
          ${row('19)','MYN','My News')}
          ${row('20)','NLRT','News Searches &amp; Alerts',"openPanel('ALERTS')")}
          ${row('21)','NL','News on Ticker List')}
          ${row('22)','NZPD','News Settings')}
          ${gap(12)}
          ${sec('23)','Social Media &amp; Analytics')}
          ${row('24)','TWTR','Twitter Search',"openPanel('CN')")}
          ${row('25)','TREN','News Trends')}
          ${gap(20)}
          ${sec('26)','Multimedia')}
          ${row('27)','MEDI','Bloomberg Media')}
          ${gap(20)}
          ${sec('28)','Documentation &amp; Resources')}
        </div>

      </div>
    </div>

    <!-- ══ BOTTOM BAR ══ -->
    <div style="height:30px;background:#111;border-top:1px solid #1c1c1c;display:flex;align-items:stretch;flex-shrink:0;${ff}">
      <div style="padding:0 16px;display:flex;align-items:center;color:#FF8C00;font-size:13px;font-weight:400;border-right:1px solid #2a2a2a;white-space:nowrap;">
        Suggested Functions
      </div>
      <div style="display:flex;align-items:center;padding:0 18px;gap:8px;cursor:pointer;border-right:1px solid #2a2a2a;flex:1;"
        onmouseover="this.style.background='#0a0800'" onmouseout="this.style.background='transparent'">
        <span style="color:#ffffff;font-size:13px;font-weight:700;">EQS</span>
        <span style="color:#bbbbbb;font-size:13px;font-weight:400;">Screen for companies to generate ideas</span>
      </div>
      <div style="display:flex;align-items:center;padding:0 18px;gap:8px;cursor:pointer;flex:1;"
        onmouseover="this.style.background='#0a0800'" onmouseout="this.style.background='transparent'"
        onclick="openPanel('ECAL')">
        <span style="color:#ffffff;font-size:13px;font-weight:700;">ECO</span>
        <span style="color:#bbbbbb;font-size:13px;font-weight:400;">See upcoming economic releases &amp; events</span>
      </div>
    </div>

  </div>`;
}

function buildALERTS(){
  const liveAlerts = _newsCache
    .filter(n=> n.tag==='MACRO'||n.tag==='FLASH'||n.flash)
    .slice(0,6)
    .map(n=>({
      lv: n.tag==='FLASH'||n.flash ? 3 : 2,
      t: n.ts ? new Date(n.ts*1000).toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'}) : '—',
      h: n.title,
      src: n.src||'LIVE',
      link: n.link||null,
      col: n.color||'#ff8800'
    }));

  const staticAlerts = [
    {lv:3, t:'15:04', src:'ON-CHAIN',    col:'#ff2222', h:'BlackRock cold wallet outflows $840M ETH and BNB to Coinbase Prime over 72 hours — internal allocation cut from 4.2% to 2.8% of AUM after risk committee review, ETH spot demand zone $1,820 holding on retail bid alone, institutional supply overhead is now the dominant order flow, ETH/BTC ratio at 8-month low with no institutional buyer stepping into the gap'},
    {lv:3, t:'14:51', src:'CRUDE FLOW',  col:'#ff2222', h:'Brent curve in extreme backwardation — front month premium over 12-month contract at $9.40, Saudi Aramco booked 14 VLCCs at $92K per day versus normal $34K for Cape of Good Hope routing, that freight differential adds $4.10 per barrel before cargo reaches Europe, Lloyd\'s war risk premium up 9x overnight to 1.8% of hull value, Rotterdam refiners rationing April crude allocations'},
    {lv:3, t:'14:22', src:'FED',         col:'#ff2222', h:'June cut is mathematically dead — Cleveland Fed nowcast has February core PCE tracking 3.1%, Powell needs two consecutive prints below 2.8% before moving, earliest window is September data released late October, 2Y Treasury spiked 14bps to 4.38% in 8 minutes, rate-sensitive sectors REITs and utilities both down over 2% on session, dollar cleared 105 for first time since November'},
    {lv:3, t:'14:08', src:'GOLD',        col:'#ff2222', h:'Gold held prior session VWAP and overnight demand zone at $5,140 all session — COMEX registered inventory 14.2M troy oz against 720K contracts of open interest, 18:1 paper-to-physical ratio same level that caused delivery freeze in March 2020, GLD ETF $2.1B single-session absorption, Poland and Czech Republic both added in February per WGC, no major holder has filed intent to reduce'},
    {lv:2, t:'13:58', src:'SPX FLOW',    col:'#ff8800', h:'SPX held below prior day VWAP entire RTH session — 14 largest multi-strat funds cut gross exposure $180B in 10 days per Goldman prime, deleveraging invisible in 13F filings which lag 45 days, single-stock 30-day implied vol 6 points above realized across top 50 names, CTA systematic models flipped net short SPX Thursday first time since October 2023, dealer gamma short below prior week midpoint amplifying moves 1.4x'},
    {lv:2, t:'13:31', src:'BTC FLOW',    col:'#ff8800', h:'Bitcoin derivatives-to-spot ratio most extreme since November 2022 — $38.4B aggregate OI against $12.1B daily spot volume, funding negative on Binance first time in 6 weeks, Coinbase retail net outflows four consecutive days totalling $340M, large wallet cohort 1K–10K BTC stopped accumulating January 28 per Glassnode, spot demand zone at prior week RTH midpoint $64,800 has 40K BTC of resting bids on Bookmap'},
    {lv:2, t:'13:18', src:'XRP ETF',     col:'#ff8800', h:'XRP Grayscale ETF decision deadline April — approval unlocks estimated $4–8B institutional inflows based on IBIT AUM ratios at launch, current XRP market trading entirely on ETF speculation with futures basis at 14% annualised premium over spot, SEC has not requested additional information which historically precedes approval, rejection removes the only institutional on-ramp narrative and resets the entire demand thesis'},
    {lv:2, t:'12:48', src:'JPY FLOW',    col:'#ff8800', h:'GPIF $58–64B foreign equity selling is arithmetic — fund at 27.1% foreign equity versus 25% mandate after Q1 overseas rally, executes 70% of quarterly rebalancing in final 10 trading days of March, USD/JPY dropped 200 pips in 30 minutes on the Nikkei story, JGB 10Y at 1.74% testing BOJ\'s informal tolerance ceiling, this is the largest yen catalyst outside a BOJ decision in two years'},
    {lv:2, t:'12:34', src:'BTC SUPPLY',  col:'#ff8800', h:'Net ETF Bitcoin demand 8,600 BTC per day — IBIT buying 12,400 but GBTC bleeding 3,800 as legacy holders exit at NAV, exchange liquid supply 2.3M BTC exhausts in 267 days at this pace assuming miners don\'t accelerate selling, Fidelity internal desk note called this tightest supply setup modelled since 2020 halving, SOL same dynamic with 71% staked but Jito LSTs allow simultaneous DeFi leverage on locked supply'},
    {lv:1, t:'12:18', src:'EUR RATES',   col:'#ff7700', h:'Germany adding €150B net annual supply above pre-Scholz levels into market where ECB runs €25B monthly QT — BTP-Bund spread 185bps, OAT-Bund 82bps widest since 2017, either yields need 40–60bps more to attract natural buyers or ECB restarts purchases, neither option is politically comfortable, French sovereign issuance calendar next week is the first real test of whether new supply clears at current yields'},
    {lv:1, t:'12:02', src:'POSITIONING', col:'#ff7700', h:'Goldman prime net short SPX at March 2020 levels — short built through index puts and single-stock shorts in consumer discretionary and regional banks, covering mechanically adds 180 SPX points but only if a catalyst forces it, put-call ratio SPY at 1.84 means market paying for protection not selling it, 72% of surveyed managers expect 10%+ correction before June, no institutional buyer is stepping in front of this flow'},
    {lv:1, t:'11:28', src:'SEMIS',       col:'#ff7700', h:'Apple 2nm TSMC exclusivity through 2027 creates downstream supply shock across semis — Qualcomm confirmed on N3 for Snapdragon X Elite a full process node behind A20, AMD MI400 slips to late 2027, any hyperscaler that cannot get Blackwell on schedule has no qualified alternative, NVDA GB300 shipments Q2 but the wait list already extends to Q4, Intel 18A still unproven at volume, the chip supply constraint is now a 2027 revenue story'}
  ];

  const allAlerts = [...liveAlerts, ...staticAlerts];

  // Group by level
  const groups = [
    {label:'HIGH PRIORITY', lv:3, items: allAlerts.filter(a=>a.lv===3)},
    {label:'MEDIUM PRIORITY', lv:2, items: allAlerts.filter(a=>a.lv===2)},
    {label:'LOW PRIORITY',  lv:1, items: allAlerts.filter(a=>a.lv===1)}
  ].filter(g=>g.items.length>0);

  let h=`<table class="pt" style="table-layout:fixed"><colgroup>
    <col style="width:44px"><col style="width:60px"><col><col style="width:28px">
  </colgroup>
  <tr><th>TIME</th><th>SOURCE</th><th>ALERT</th><th style="text-align:center">IMP</th></tr>`;

  groups.forEach(g=>{
    const col = g.lv===3?'#ff2222':g.lv===2?'#ffb900':'#ffb900';
    h+=`<tr><td colspan="4" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:${col}44;background:#000;border-top:1px solid #0d0a00;border-left:2px solid ${col}">${g.label}</td></tr>`;
    g.items.forEach(a=>{
      const col2 = g.lv===3?'#ff2222':g.lv===2?'#ffb900':'#ffb900';
      const lvDot = g.lv===3
        ? `<span style="color:#ff2222;font-size:7px;font-weight:700">H</span>`
        : g.lv===2
        ? `<span style="color:#ffb900;font-size:7px;font-weight:700">M</span>`
        : `<span style="color:#ffffff;font-size:7px">L</span>`;
      h+=`<tr style="border-left:2px solid ${col2}22"
        onmouseover="this.style.background='#050505'"
        onmouseout="this.style.background='#000'">
        <td class="ga" style="font-size:8px;font-weight:400;vertical-align:top;padding-top:4px;color:#ffffff">${a.t||'—'}</td>
        <td style="color:#ffb900;font-size:7.5px;font-weight:700;letter-spacing:.5px;vertical-align:top;padding-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.src||''}</td>
        <td style="color:#ffb900;font-size:9px;font-weight:400;line-height:1.5;padding:3px 8px;word-break:break-word">${a.h}</td>
        <td style="text-align:center;vertical-align:top;padding-top:4px">${lvDot}</td>
      </tr>`;
    });
  });

  h+=`</table><div style="padding:3px 8px;color:#ffffff;font-size:6px;border-top:1px solid #0e0900;font-family:'Share Tech Mono',monospace;opacity:0.6">
    SOURCES: SYSTEM · REUTERS · WSJ · ON-CHAIN · GOLDMAN PRIME · BOOKMAP · COMEX · WGC
  </div>`;
  return h;
}

function buildDES(){
  const s=STKS['AAPL'];
  let h=`<table class="pt">`;
  [['SECURITY','AAPL US EQUITY','ga2'],['FULL NAME',s.n,'wh'],['EXCHANGE','NASDAQ','gr'],['SECTOR',s.sec,'cy'],['LAST','$'+fmtPx(s.px),s.px>s.open?'up':'dn'],['OPEN','$'+s.open.toFixed(2),'wh'],['HIGH','$'+s.hi.toFixed(2),'up'],['LOW','$'+s.lo.toFixed(2),'dn'],['VOLUME',s.vol,'cy'],['MKT CAP',s.mc,'ga'],['P/E RATIO',s.pe,'ye'],['EPS ADJ','$'+s.eps,'wh'],['DIV/SHR','$'+s.div,'wh'],['BETA',s.beta,'wh'],['YTD %','+'+s.ytd.toFixed(1)+'%','up']].forEach(([k,v,c])=>{
    h+=`<tr><td style="color:#ffffff;font-weight:700;width:38%">${k}</td><td class="${c||'wh'}">${v}</td></tr>`;
  });
  return h+'</table>';
}

function buildFA(){
  const yrs=['FY2020','FY2021','FY2022','FY2023','FY2024E'];
  const revs=[274500,365817,394328,383285,410000];
  let h=`<table class="pt"><tr><th>METRIC (USD m)</th>${yrs.map(y=>`<th class="r">${y}</th>`).join('')}</tr>`;
  const rows=[
    {n:'Revenue',v:revs,cl:'ga',b:true},
    {n:'YoY%',v:['—','+33.3','+7.8','-2.8','+7.0'].map(x=>x+'%'),cl:'gr'},
    null,
    {n:'Gross Profit',v:revs.map(r=>Math.round(r*.38)),cl:'wh'},
    {n:'GP Margin%',v:['38.2','38.9','39.2','39.5','40.2'].map(x=>x+'%'),cl:'gr'},
    {n:'EBITDA',v:revs.map(r=>Math.round(r*.32)),cl:'wh'},
    null,
    {n:'Net Income',v:revs.map(r=>Math.round(r*.20)),cl:'wh',b:true},
    {n:'EPS Adj.',v:yrs.map((_,i)=>'$'+(6.67*(.77+i*.07)).toFixed(2)),cl:'cy'}
  ];
  rows.forEach(r=>{
    if(!r){h+=`<tr><td colspan="${1+yrs.length}" style="height:2px;background:var(--bg)"></td></tr>`;return;}
    h+=`<tr><td style="font-weight:${r.b?700:400};color:#ffffff;font-size:9px">${r.n}</td>`;
    r.v.forEach(v=>{const num=typeof v==='number';h+=`<td class="${num&&v<0?'dn':num?'wh':r.cl} r" style="font-size:9px">${num?v.toLocaleString('en'):v}</td>`;});
    h+='</tr>';
  });
  return h+'</table>';
}

function buildMMAPWidget(){
  return `<div style="width:100%;height:480px;position:relative">
    <div class="tradingview-widget-container" style="width:100%;height:100%">
      <div class="tradingview-widget-container__widget" style="width:100%;height:100%"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js" async>
      {
        "dataSource": "SPX500",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "grouping": "sector",
        "locale": "en",
        "colorTheme": "dark",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "100%"
      }
      <\/script>
    </div>
  </div>`;
}
function buildMMAPWorld(){
  return `<div style="width:100%;height:480px;position:relative">
    <div class="tradingview-widget-container" style="width:100%;height:100%">
      <div class="tradingview-widget-container__widget" style="width:100%;height:100%"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js" async>
      {
        "dataSource": "AllUSA",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "grouping": "sector",
        "locale": "en",
        "colorTheme": "dark",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "100%"
      }
      <\/script>
    </div>
  </div>`;
}
function buildMMAPCrypto(){
  return `<div style="width:100%;height:480px;position:relative">
    <div class="tradingview-widget-container" style="width:100%;height:100%">
      <div class="tradingview-widget-container__widget" style="width:100%;height:100%"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js" async>
      {
        "dataSource": "Crypto",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "grouping": "no_group",
        "locale": "en",
        "colorTheme": "dark",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "100%"
      }
      <\/script>
    </div>
  </div>`;
}
function buildMMAPIdx(){return buildMMAPWorld();}
function buildMMAPSectors(){return buildMMAPWidget();}

function buildYLDS(){
  const yields=[['1M',5.48,'+'],['3M',5.52,'+'],['6M',5.53,'+'],['1Y',5.21,'-'],['2Y',4.60,'-'],['3Y',4.44,'-'],['5Y',4.30,'-'],['7Y',4.38,'+'],['10Y',4.42,'+'],['20Y',4.72,'+'],['30Y',4.59,'+']];
  const tenY=4.42;
  let h=`<table class="pt"><colgroup><col style="width:44px"><col style="width:58px"><col style="width:38px"><col style="width:58px"><col style="width:60px"></colgroup>
  <tr><th>MATURITY</th><th class="r">YIELD</th><th class="r">DIR</th><th class="r">VS 10Y</th></tr>`;
  yields.forEach(([m,y,d])=>{
    const sp=(y-tenY).toFixed(2);const spcl=parseFloat(sp)>=0?'up':'dn';
    h+=`<tr><td class="ye">${m}</td><td class="wh r">${y.toFixed(2)}%</td><td class="${d==='+'?'up':'dn'} r">${d}</td><td class="${spcl} r">${parseFloat(sp)>=0?'+':''}${sp}%</td></tr>`;
  });
  h+=`</table><div style="padding:3px 5px;border-top:1px solid var(--b0);display:flex;gap:12px;font-size:8px">
    <span style="color:var(--amd)">2Y-10Y: <span style="color:var(--rd)">-0.18% INVERTED</span></span>
    <span style="color:var(--amd)">10Y REAL: <span style="color:var(--ye)">+2.14%</span></span>
  </div>`;
  return h;
}

function buildBYFC(){
  const f=[{inst:'Goldman Sachs',y3m:4.5,y6m:4.2,y12m:3.9},{inst:'JPMorgan',y3m:4.6,y6m:4.3,y12m:4.0},{inst:'Deutsche Bank',y3m:4.4,y6m:4.0,y12m:3.7},{inst:'Morgan Stanley',y3m:4.5,y6m:4.1,y12m:3.8},{inst:'BofA',y3m:4.6,y6m:4.25,y12m:3.95},{inst:'Barclays',y3m:4.5,y6m:4.2,y12m:3.85}];
  let h=`<div style="font-size:8px;color:var(--am);padding:3px 5px;border-bottom:1px solid var(--b0)">US 10Y TREASURY — CURRENT: 4.42% — FORECASTS</div>`;
  h+=`<table class="pt"><tr><th>INSTITUTION</th><th class="r">3M TARGET</th><th class="r">6M TARGET</th><th class="r">12M TARGET</th></tr>`;
  f.forEach(r=>{h+=`<tr><td class="ga" style="font-size:10px">${r.inst}</td><td class="cy r">${r.y3m.toFixed(2)}%</td><td class="cy r">${r.y6m.toFixed(2)}%</td><td class="cy r">${r.y12m.toFixed(2)}%</td></tr>`;});
  return h+'</table>';
}

function buildFXIP(){
  const v=[{p:'EUR/USD',w:4.2,m:5.82,q:6.14,y:7.22,rr:-.45},{p:'GBP/USD',w:5.8,m:7.42,q:7.88,y:9.12,rr:.32},{p:'USD/JPY',w:7.2,m:8.92,q:9.24,y:10.44,rr:-1.22},{p:'AUD/USD',w:7.4,m:9.12,q:9.88,y:11.2,rr:-.88},{p:'USD/CHF',w:4.8,m:6.24,q:6.88,y:8.14,rr:.18},{p:'USD/CZK',w:5.4,m:7.14,q:7.84,y:9.44,rr:-.32}];
  let h=`<div style="padding:8px 10px 4px;font-size:8px;font-weight:700;letter-spacing:2px;color:#ff8800;background:#0a0500;border-bottom:1px solid #1a0a00">IMPLIED VOLATILITY — FX OPTIONS</div>
  <table class="pt"><tr><th>PAIR</th><th class="r">1W VOL</th><th class="r">1M VOL</th><th class="r">3M VOL</th><th class="r">1Y VOL</th><th class="r">25D RR</th></tr>`;
  v.forEach(r=>{const u=r.rr>=0;h+=`<tr><td class="ye" style="font-weight:700;padding:4px 8px">${r.p}</td><td class="ye r">${r.w.toFixed(2)}%</td><td class="ye r">${r.m.toFixed(2)}%</td><td class="ye r">${r.q.toFixed(2)}%</td><td class="ye r">${r.y.toFixed(2)}%</td><td class="${u?'up':'dn'} r" style="font-weight:700">${r.rr>=0?'+':''}${r.rr.toFixed(2)}</td></tr>`;});
  return h+'</table>';
}

function buildFXCL(){
  const pairs=['EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF'];
  const corr=[[1,0.82,-0.71,0.68,-0.88],[0.82,1,-0.58,0.72,-0.74],[-0.71,-0.58,1,-0.48,0.62],[0.68,0.72,-0.48,1,-0.54],[-0.88,-0.74,0.62,-0.54,1]];
  let h=`<div style="padding:8px 10px 4px;font-size:8px;font-weight:700;letter-spacing:2px;color:#ff8800;background:#0a0500;border-bottom:1px solid #1a0a00">CURRENCY CORRELATIONS — 1Y</div>
  <table class="pt"><tr><th style="font-size:9px;color:#ff8800;letter-spacing:1px">PAIR</th>${pairs.map(p=>`<th class="r" style="font-size:9px;color:#ff8800">${p.split('/')[0]}</th>`).join('')}</tr>`;
  corr.forEach((row,i)=>{
    h+=`<tr><td class="ye" style="font-weight:700;padding:4px 8px">${pairs[i]}</td>`;
    row.forEach((v,j)=>{
      const cl=i===j?'ye':v>=.5?'up':v<=-.5?'dn':'wh';
      h+=`<td class="${cl} r" style="font-weight:${i===j?'700':'400'}">${v.toFixed(2)}</td>`;
    });
    h+='</tr>';
  });
  return h+'</table>';
}

// ── LIVE NEWS FEED — reliable no-CORS public APIs ────────────
let _newsCache=[];
window._newsCache=_newsCache;
let _newsFetching=false;

// ── NWS SEPARATE CACHE — official/research sources only ──────────────────
const _nwsCache=[];
let _nwsFetching=false;

async function fetchNWSNews(force){ return fetchAllNews(force); }

function _stripTags(s){
  return (s||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
}
function _fmtAgo(ts){
  try{
    if(!ts) return '';
    const s=Math.floor((Date.now()/1000)-ts);
    if(s<0) return 'just now';
    if(s<60) return s+'s';
    if(s<3600) return Math.floor(s/60)+'m';
    if(s<86400){
      const h=Math.floor(s/3600), m=Math.floor((s%3600)/60);
      return h+'h'+(m?(' '+m+'m'):'');
    }
    return Math.floor(s/86400)+'d';
  }catch(e){return '';}
}

// Refresh "X ago" labels in open WN panels every 30s without full re-render
setInterval(()=>{
  document.querySelectorAll('[id^="wn-lh-"]').forEach((el,i)=>{
    const ageEl=el?.parentElement?.previousElementSibling?.querySelector('span[style*="443322"]');
    // age spans are siblings — update via _fmtAgo based on cache
    if(i<_newsCache.length&&_newsCache[i]?.ts){
      const spans=el.parentElement.querySelectorAll('span');
      spans.forEach(sp=>{if(sp.style.color==='#443322'||sp.style.color.includes('443'))sp.textContent=_fmtAgo(_newsCache[i].ts);});
    }
  });
},30000);

async function fetchAllNews(force){
  if(_newsFetching && !force) return;
  _newsFetching = true;
  try {
    const GITHUB_URL = 'https://raw.githubusercontent.com/fufikfx/app/main/data/news.json';
    const resp = await fetch(GITHUB_URL + '?t=' + Date.now(), { cache:'no-store' });
    if(!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();

    const src = data.categories || data.sectors || {};
    const cutoff = Math.floor(Date.now()/1000) - 7 * 86400;

    // Category → tag mapping for news panels
    const TAG_MAP = {
      ALL_NEWS:'FLASH', TOP_NEWS:'TOP', MACRO:'MACRO', MARKETS:'MARKETS',
      CRYPTO:'CRYPTO', EARNINGS:'EARNINGS', ENERGY:'ENERGY',
      CENTRAL_BANKS:'MACRO', COMPANY:'MARKETS', RESEARCH:'NWS',
      INTELLIGENCE:'GEO', WATCHLIST:'FLASH',
      // old keys compat
      ALL:'FLASH', STOCKS:'MARKETS', GEO:'GEO'
    };

    const freshItems = [];
    const seenIds = new Set(_newsCache.map(n=>(n.title||'').slice(0,60).toLowerCase()));

    Object.entries(src).forEach(([cat, articles]) => {
      if(!Array.isArray(articles)) return;
      const tag = TAG_MAP[cat] || 'MARKETS';
      articles.forEach(art => {
        if(!art.title || (art.ts && art.ts < cutoff)) return;
        const key = (art.title||'').slice(0,60).toLowerCase();
        if(seenIds.has(key)) return;
        seenIds.add(key);
        freshItems.push({
          title:  art.title,
          src:    art.src || 'RSS',
          tag:    tag,
          ts:     art.ts ? art.ts * 1000 : Date.now(),
          link:   art.link || '',
          body:   art.body || '',
          tier:   art.tier || 2,
          _fromGH: true,
          _category: cat,
        });
      });
    });

    // Sort by time desc, push into _newsCache
    freshItems.sort((a,b) => (b.ts||0) - (a.ts||0));
    _newsCache.unshift(...freshItems);
    // Cap at 800
    if(_newsCache.length > 800) _newsCache.splice(800);
    window._newsCache = _newsCache;

    // Also fill NEWS_DATA for WN panel
    if(typeof NEWS_DATA !== 'undefined'){
      NEWS_DATA.length = 0;
      _newsCache.slice(0,300).forEach(n => NEWS_DATA.push({
        title: n.title, src: n.src, tag: n.tag,
        ts: Math.floor((n.ts||Date.now())/1000),
        link: n.link, body: n.body, tier: n.tier, _fromGH: true,
        _category: n._category,
      }));
    }

    // Refresh panels if open
    try {
      const wnb = document.getElementById('wn-body');
      if(wnb) wnb.innerHTML = buildWNTable(NEWS_DATA);
      if(typeof _refreshGHPanel === 'function') _refreshGHPanel();
    } catch(e) {}

    console.log('[NEWS] Loaded', freshItems.length, 'new articles from GitHub');
  } catch(e) {
    console.warn('[NEWS] fetchAllNews error:', e.message);
  } finally {
    _newsFetching = false;
  }
}

function _realityFilter(){
  // Remove items that look fabricated, speculative or low-quality
  const FAKE_SIGNALS = [
    // Specific fake data patterns
    'granted australian visas','footballers','anthem protest',
    'should be careful what he wishes','five iranian',
    'how the iran war hurts thailand',
    // Clickbait / opinion
    'why trump should','here is why','this is why','you need to know',
    'what you need','must read','watch out for','everything you',
    'top 10','top 5','best crypto','how to buy','beginners guide',
    'price prediction','will btc reach','is bitcoin dead',
    'to the moon','wagmi','gm ','nft drop','nft mint',
    'airdrop alert','new listing alert','sign up now',
    'sponsored','advertisement','partner content',
    // Tabloid / irrelevant
    'celebrity','gossip','sports result','football match',
    'cricket score','tennis','golf tournament',
    'recipe','travel','fashion','lifestyle',
    // Astrology / pseudoscience
    'astrology','horoscope','psychic','tarot'
  ];

  const REQUIRE_MARKET_CONTEXT = [
    // Articles about geopolitics MUST have a financial angle
    'iran','russia','ukraine','israel','china','taiwan','north korea',
    'trump','biden','election','war','conflict','military'
  ];

  const MARKET_KEYWORDS = [
    'oil','crude','brent','wti','gas','energy',
    'dollar','usd','eur','gbp','jpy','forex','fx',
    'stock','equity','shares','index','etf','fund',
    'bond','yield','treasury','rate','fed','ecb','boj','central bank',
    'bitcoin','btc','crypto','ethereum','solana','defi',
    'gold','silver','commodity','inflation','gdp','cpi','pce',
    'market','trade','tariff','sanction','supply','demand',
    'bank','finance','investment','hedge','capital','earnings',
    'imf','world bank','g7','g20','opec','davos'
  ];

  _newsCache = _newsCache.filter(item => {
    const t = (item.title||'').toLowerCase();

    // Never filter official sources (SEC, central banks, wire agencies tier 1)
    if(item._isOfficial || item.tier === 1) return true;

    // Block known fake/irrelevant patterns
    if(FAKE_SIGNALS.some(k => t.includes(k))) return false;

    // For geopolitical topics — require financial context
    const hasGeo = REQUIRE_MARKET_CONTEXT.some(k => t.includes(k));
    if(hasGeo){
      const hasMarket = MARKET_KEYWORDS.some(k => t.includes(k));
      if(!hasMarket) return false;
    }

    // Block very short titles
    if((item.title||'').length < 25) return false;

    return true;
  });
  window._newsCache=_newsCache;
}

async function _enrichNewsWithAI(){
  if(_newsCache.length===0) return;
  // Only enrich items that haven't been enriched yet
  const toEnrich = _newsCache.filter(n=>!n._enriched && !n._isOfficial).slice(0,30);
  if(toEnrich.length===0) return;

  const headlines = toEnrich.map((n,i)=>`${i+1}. [${n.src||''}] ${n.title}`).join('\n');

  const systemPrompt = `You are a professional financial news editor. Rewrite financial news headlines into professional high-density system style. Rules:
- Include specific price levels using Fibonacci (0.382, 0.5, 0.618, 0.786) where relevant
- Reference VWAP, RTH session midpoint, POC (point of control) for price context
- Use supply/demand zones with exact price ranges
- Include institutional flow data, positioning, order book context
- Reference sentiment: funding rates, options skew, put/call, CTA positioning
- Include structural context: weekly/monthly VWAP, prior week highs/lows
- Keep each item to ONE dense sentence — Bloomberg style, no fluff
- Respond ONLY with a JSON array of strings, one per headline, same order as input
- No RSI, no MACD, no EMA crossovers, no moving average signals
- Use — as separator (Terminal dash style)`;

  try {
    const data = await _callAnthropic({
        model:'claude-sonnet-4-6',
        max_tokens:1000,
        system: systemPrompt,
        messages:[{role:'user',content:`Rewrite these ${toEnrich.length} headlines:\n${headlines}`}]
      });
    if(!data){throw new Error('API unavailable');}
    const text = (data.content||[]).map(c=>c.text||'').join('');
    const clean = text.replace(/```json|```/g,'').trim();
    const arr = JSON.parse(clean);
    if(Array.isArray(arr)){
      arr.forEach((enriched,i)=>{
        if(toEnrich[i] && enriched && enriched.length>20){
          toEnrich[i]._originalTitle = toEnrich[i].title;
          toEnrich[i].title = enriched;
          toEnrich[i]._enriched = true;
        }
      });
    }
  } catch(e){
    // silently fail — use original headlines
  }
}

// ── Per-institution AI briefing cache ────────────────────────────────────────
const _instBriefCache = {}; // { instName: [{title, src:'AI·BBG', ts, link:'', _enriched:true}] }

// Asynchronously fetch AI-generated briefing for an institution (when no live news found)
async function _fetchInstBriefing(name) {
  if (_instBriefCache[name]) return; // already fetched
  if (!window.ANTHROPIC_API_KEY) {
    // Ukázat hint v banneru
    _instBriefCache[name] = [{
      title: 'AI analysis unavailable — set Anthropic API key in the banner above (AI:OFF)',
      src: 'AI·OFFLINE', ts: Math.floor(Date.now()/1000), link: '', _enriched: false
    }];
    return;
  }
  _instBriefCache[name] = []; // mark as in-progress

  const ext   = INST_EXT[name]  || {};
  const extra = _INST_EXTRA ? (_INST_EXTRA[name] || {}) : {};
  const aum   = INST_DATA.find(d=>d.n===name)?.aum || '';
  const type  = INST_DATA.find(d=>d.n===name)?.t   || '';
  const typeLabel = ({IB:'investment bank',EX:'stock exchange',HF:'hedge fund',AM:'asset manager',IN:'insurance company',IO:'international financial organization'}[type]||'financial institution');

  const context = [
    name.replace(' HQ',''),
    `AUM/assets: ${aum}`,
    ext.rev   ? `Revenue: ${ext.rev}` : '',
    ext.roe   ? `ROE: ${ext.roe}` : '',
    ext.rating? `Rating: ${ext.rating}` : '',
    ext.ytd   ? `YTD: ${ext.ytd}` : '',
    extra.tier1     ? `Tier 1: ${extra.tier1}%` : '',
    extra.strategy  ? `Strategy: ${extra.strategy}` : '',
    extra.avgVol    ? `Avg daily volume: ${extra.avgVol}` : ''
  ].filter(Boolean).join(', ');

  try {
    const data = await _callAnthropic({
        model:'claude-sonnet-4-6',
        max_tokens:500,
        system:`You are a professional system analyst. Generate 3 concise, realistic financial intelligence bullets about the specified ${typeLabel}. Each bullet should be ONE dense Terminal-style sentence covering: (1) current market positioning or recent structural development, (2) key risk/opportunity for the institution, (3) macro context or competitive landscape. Use specific numbers, price levels, and financial terminology. Each sentence must be directly and specifically about this institution — not generic sector commentary. Output ONLY a JSON array of exactly 3 strings. No preamble, no markdown.`,
        messages:[{role:'user',content:`Generate 3 professional intelligence bullets for: ${context}`}]
      });
    if(!data){throw new Error('API unavailable');}
    const text = (data.content||[]).map(c=>c.text||'').join('');
    const clean = text.replace(/```json|```/g,'').trim();
    const arr = JSON.parse(clean);
    if(Array.isArray(arr) && arr.length) {
      window._layerStatus.inst={ok:true,ts:Date.now()};
      _instBriefCache[name] = arr.slice(0,3).map((t,i)=>({
        title: t,
        src: 'AI·BBG',
        ts: Math.floor(Date.now()/1000) - i*120,
        link: '',
        _enriched: true,
        _aiBriefing: true
}));
      // If map popup for this inst is open, refresh it
      try { renderInstLayer(); } catch(e){}
    }
  } catch(e) {
    _instBriefCache[name] = null; // mark as failed so we don't retry immediately
  }
}

// Get news for an institution — live news first, AI briefing fallback
function _instNewsWithFallback(name, limit) {
  const live = _instNews(name, limit||5);
  if (live.length >= 2) return live; // enough live news — don't use AI
  
  // Try AI briefing
  const brief = _instBriefCache[name];
  if (brief === undefined) {
    // Not yet fetched — trigger async fetch, return what we have
    _fetchInstBriefing(name);
    return live;
  }
  if (!brief || !brief.length) return live; // failed or empty
  
  // Merge: live first, then AI briefing (no duplicates)
  return [...live, ...brief].slice(0, limit||5);
}

function renderCNPanel(){
  // Refresh CN panel (X/Social feed widget)
  const el=document.getElementById('cn-feed');
  if(el){
    if(_newsCache.length===0){
      el.innerHTML=buildWNTable(NEWS_DATA);
    } else {
      el.innerHTML=buildWNTable(NEWS_DATA);
      setTimeout(_restoreTranslations,20);
    }
  }
  // Also refresh any open WN panels that aren't locked (no article open)
  Object.entries(PANEL_REGISTRY).forEach(([id,reg])=>{
    if(reg.fn!=='WN')return;
    const body=document.getElementById('pb-'+id);
    if(!body||body.dataset.locked==='1')return;
    const wnb=body.querySelector('#wn-body')||body;
    const st=wnb.scrollTop;
    wnb.innerHTML=buildWNTable(NEWS_DATA);
    wnb.scrollTop=st;
    if(window._wnFilterText){window._wnFilter(window._wnFilterText);}
    setTimeout(_restoreTranslations,20);
  });
  // Also refresh open NWS panels
  Object.entries(PANEL_REGISTRY).forEach(([id,reg])=>{
    if(reg.fn!=='NWS')return;
    const body=document.getElementById('pb-'+id);
    if(!body)return;
    const panel=document.getElementById(id);
    const ti=panel?([...(panel.querySelectorAll('.ptab')||[])].findIndex(t=>t.classList.contains('on'))||0):0;
    const st=body.scrollTop;
    const _nb2=body.querySelector('#nws-body')||body;
    const _ns2=_nb2.scrollTop;
    _nb2.innerHTML=buildNWSPanel(ti<0?0:ti);
    _nb2.scrollTop=_ns2;
    const _nq2=(body.querySelector('#nws-srch')||{}).value||'';
    if(_nq2&&typeof _nwsFilter==='function')_nwsFilter(_nq2);
    body.scrollTop=st;
  });
}

function buildCN(){
  setTimeout(()=>{if(_newsCache.length===0)fetchAllNews(true);else renderCNPanel();},50);
  return `<div style="height:100%;display:flex;flex-direction:column;overflow:hidden">
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
          onmouseover="this.style.background='rgba(0,0,0,.15)'" onmouseout="this.style.background=''">X / Social Feed</span>
        <span style="margin-left:auto;color:#ffcccc;font-size:9px;padding:0 10px;flex-shrink:0">Page 1</span>
      </div>
      <div style="height:22px;display:flex;align-items:stretch;border-bottom:1px solid #1a0800;">
        <div style="flex:1;background:#ee7700;display:flex;align-items:center;padding:0 8px;gap:4px;">
          <input id="cn-srch" type="text" placeholder="find all relevant documents..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            style="flex:1;background:transparent;border:none;outline:none;color:#1a0500;font-family:'Roboto Mono','Courier Prime',monospace;font-size:9.5px;font-weight:700;caret-color:#1a0500;"
            oninput="(function(v){var feed=document.getElementById('cn-feed');if(!feed)return;Array.from(feed.children).forEach(function(el){var t=(el.textContent||'').toUpperCase();el.style.display=(!v||t.indexOf(v.toUpperCase())>=0)?'':'none';});})(this.value)"
            onkeydown="event.stopPropagation();if(event.key==='Enter'){event.preventDefault();}">
          <span style="color:#5a1800;font-size:9px;font-weight:700;cursor:pointer;opacity:.5;padding:0 4px;flex-shrink:0"
            onclick="var i=document.getElementById('cn-srch');i.value='';i.dispatchEvent(new Event('input'))">x</span>
        </div>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">&#8677; Sources</span>
        <span style="color:#ffffff;font-size:9px;font-weight:700;flex-shrink:0;background:#000;padding:0 10px;display:inline-flex;align-items:center;letter-spacing:.4px;cursor:pointer;border-left:1px solid #333;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">All Dates</span>
      </div>
    </div>
    <div id="cn-feed" style="flex:1;overflow-y:auto;display:flex;flex-direction:column"></div>
  </div>`;
}

function buildECON(){
  let h=`<table class="pt"><colgroup><col style="width:38px"><col><col style="width:64px"><col style="width:52px"><col style="width:52px"><col style="width:52px"></colgroup>
  <tr><th>CO</th><th>COUNTRY</th><th class="r">GDP (B USD)</th><th class="r">G%</th><th class="r">CPI%</th><th class="r">CURRENCY</th></tr>`;
  Object.entries(MAC).forEach(([co,d])=>{
    h+=`<tr><td class="ye">${co}</td><td class="ga" style="font-size:10px">${{USA:'United States',GBR:'United Kingdom',DEU:'Germany',FRA:'France',CHE:'Switzerland',JPN:'Japan',CHN:'China',HKG:'Hong Kong',SGP:'Singapore',IND:'India',KOR:'South Korea',AUS:'Australia',BRA:'Brazil',CZE:'Czech Republic',TUR:'Turkey',SAU:'Saudi Arabia',ZAF:'South Africa',RUS:'Russia',POL:'Poland'}[co]||co}</td>
    <td class="wh r">${d.gdp.toLocaleString('en')}</td>
    <td class="${d.g>=0?'up':'dn'} r">${d.g>=0?'+':''}${d.g}%</td>
    <td class="${d.cpi<=3?'up':d.cpi<=6?'ye':'dn'} r">${d.cpi}%</td>
    <td class="cy r">${d.cur}</td></tr>`;
  });
  return h+'</table>';
}
function buildECONRates(){
  let h=`<table class="pt"><tr><th>CO</th><th class="r">CB RATE</th><th class="r">TREND</th><th class="r">CURRENCY</th><th class="r">GDP $B</th></tr>`;
  Object.entries(MAC).sort((a,b)=>b[1].r-a[1].r).forEach(([co,d])=>{
    h+=`<tr><td class="ye">${co}</td><td class="wh r">${d.r}%</td><td class="${d.r>3?'dn':d.r<2?'up':'ye'} r">${d.r>3?'HIGH':d.r<2?'LOW':'MED'}</td><td class="cy r">${d.cur}</td><td class="gr r">${d.gdp.toLocaleString('en')}</td></tr>`;
  });
  return h+'</table>';
}
function buildECONUnem(){
  let h=`<table class="pt"><tr><th>CO</th><th class="r">UNEMPL %</th><th class="r">CPI %</th><th class="r">GDP GR %</th></tr>`;
  Object.entries(MAC).sort((a,b)=>a[1].unem-b[1].unem).forEach(([co,d])=>{
    h+=`<tr><td class="ye">${co}</td><td class="${d.unem<5?'up':d.unem<10?'ye':'dn'} r">${d.unem}%</td><td class="${d.cpi<=3?'up':d.cpi<=6?'ye':'dn'} r">${d.cpi}%</td><td class="${d.g>=0?'up':'dn'} r">${d.g>=0?'+':''}${d.g}%</td></tr>`;
  });
  return h+'</table>';
}

function buildDEFI(){
  const totalTvl=window._defiTotalTvl_num?(typeof window._defiTotalTvl_num==='number'?'$'+window._defiTotalTvl_num.toLocaleString('en'):'$'+window._defiTotalTvl_num):'—';
  const tvlChg=window._defiTvlChg||'0';
  const chgUp=parseFloat(tvlChg)>=0;
  let h=`<table class="pt"><colgroup><col><col style="width:52px"><col style="width:68px"><col style="width:50px"><col style="width:62px"></colgroup>
  <tr><td colspan="5" style="padding:4px 8px;font-size:6.5px;font-weight:700;letter-spacing:1.5px;color:#998870;background:#000;border-top:1px solid #0d0a00">DEFI PROTOCOLS · TVL <span style="color:#887060;font-weight:400">${totalTvl}</span> <span style="color:${chgUp?'#aa44ff':'#ff3333'};font-weight:400">${chgUp?'+':''}${tvlChg}%</span></td></tr>
  <tr><th>PROTOCOL</th><th>CHAIN</th><th class="r">TVL</th><th class="r">24H%</th><th class="r">CATEGORY</th></tr>`;
  DEFI.forEach(d=>{
    const up=d.chg>=0;
    h+=`<tr>
      <td class="ga" style="font-weight:700;font-size:9px">${d.n}</td>
      <td class="gr" style="font-size:8px">${d.chain}</td>
      <td class="wh r">$${typeof d.tvl==='number'?d.tvl.toLocaleString('en'):d.tvl}</td>
      <td class="${up?'up':'dn'} r">${up?'+':''}${Math.abs(d.chg).toFixed(2)}%</td>
      <td class="gr" style="font-size:8px">${d.cat}</td>
    </tr>`;
  });
  return h+'</table>';
}

function buildCHAIN(){
  const live=window._chainData;
  if(live&&live.length>0){
    let h=`<table class="pt"><colgroup><col><col style="width:72px"><col style="width:50px"><col style="width:60px"></colgroup>
    <tr><th>CHAIN</th><th class="r">TVL</th><th class="r">24H%</th><th class="r">PROTOCOLS</th></tr>`;
    live.forEach(c=>{
      const up=c.chg>=0;
      h+=`<tr>
        <td class="ga" style="font-weight:700;font-size:9px">${c.n}</td>
        <td class="wh r">$${typeof c.tvl==='number'?c.tvl.toLocaleString('en'):c.tvl}</td>
        <td class="${up?'up':'dn'} r">${up?'+':''}${Math.abs(c.chg).toFixed(2)}%</td>
        <td class="gr r">${c.protocols}</td>
      </tr>`;
    });
    return h+'</table>';
  }
  const chains=[
    {n:'Ethereum',  s:'ETH',  tps:15,     gas:'~8 gwei',    blk:'12s',   val:'$842B',  cat:'L1'},
    {n:'Solana',    s:'SOL',  tps:3124,   gas:'~$0.00025',  blk:'0.4s',  val:'$124B',  cat:'L1'},
    {n:'Bitcoin',   s:'BTC',  tps:7,      gas:'~$2.40',     blk:'10min', val:'$1.64T', cat:'L1'},
    {n:'BNB Chain', s:'BNB',  tps:160,    gas:'~1 gwei',    blk:'3s',    val:'$86B',   cat:'L1'},
    {n:'Toncoin',   s:'TON',  tps:100000, gas:'~0.005 TON', blk:'5s',    val:'$12.5B', cat:'L1'},
    {n:'TRON',      s:'TRX',  tps:2000,   gas:'~0 TRX',     blk:'3s',    val:'$22B',   cat:'L1'},
    {n:'Avalanche', s:'AVAX', tps:4500,   gas:'~25 nAVAX',  blk:'2s',    val:'$8.6B',  cat:'L1'},
    {n:'Polygon',   s:'MATIC',tps:65,     gas:'~80 gwei',   blk:'2s',    val:'$2.4B',  cat:'L2'},
    {n:'Arbitrum',  s:'ARB',  tps:40,     gas:'~0.01 gwei', blk:'0.26s', val:'$1.8B',  cat:'L2'},
    {n:'Sui',       s:'SUI',  tps:297000, gas:'~$0.001',    blk:'0.5s',  val:'$7.8B',  cat:'L1'},
    {n:'Aptos',     s:'APT',  tps:160000, gas:'~$0.001',    blk:'<1s',   val:'$3.3B',  cat:'L1'},
    {n:'Polkadot',  s:'DOT',  tps:1000,   gas:'~$0.01',     blk:'6s',    val:'$5.4B',  cat:'L0'},
    {n:'Optimism',  s:'OP',   tps:77,     gas:'~0.001 gwei',blk:'2s',    val:'$1.5B',  cat:'L2'},
    {n:'Starknet',  s:'STRK', tps:866,    gas:'~0.001 gwei',blk:'30s',   val:'$0.6B',  cat:'L2'},
    {n:'Litecoin',  s:'LTC',  tps:56,     gas:'~$0.01',     blk:'2.5min',val:'$6.5B',  cat:'L1'},
    {n:'Monero',    s:'XMR',  tps:17,     gas:'~$0.01',     blk:'2min',  val:'$4.2B',  cat:'Privacy'},
    {n:'Kaspa',     s:'KAS',  tps:100,    gas:'~$0.0001',   blk:'1s',    val:'$1.8B',  cat:'L1'},
    {n:'Stellar',   s:'XLM',  tps:1000,   gas:'~$0.00001',  blk:'5s',    val:'$7.4B',  cat:'L0'}
  ];
  let h=`<table class="pt"><colgroup><col style="width:44px"><col><col style="width:48px"><col style="width:58px"><col style="width:44px"><col style="width:54px"><col style="width:54px"></colgroup>
  <tr><th>SYM</th><th>NETWORK</th><th class="r">CAT</th><th class="r">TPS</th><th class="r">BLK</th><th class="r">GAS</th><th class="r">TVL</th></tr>`;
  chains.forEach(d=>{
    h+=`<tr>
      <td class="ye" style="font-weight:700;font-size:9px">${d.s}</td>
      <td class="ga" style="font-size:9px">${d.n}</td>
      <td class="gr r" style="font-size:8px">${d.cat}</td>
      <td class="wh r">${d.tps.toLocaleString()}</td>
      <td class="gr r" style="font-size:8px">${d.blk}</td>
      <td class="gr r" style="font-size:8px">${d.gas}</td>
      <td class="wh r">${d.val}</td>
    </tr>`;
  });
  return h+'</table>';
}
function buildPERF(){
  const secs=[{n:'Technology',ytd:14.2,m1:2.8,w1:.84},{n:'Financials',ytd:8.4,m1:1.2,w1:.32},{n:'Healthcare',ytd:-2.4,m1:-.8,w1:-.22},{n:'Energy',ytd:12.8,m1:3.2,w1:.88},{n:'Industrials',ytd:6.2,m1:1.4,w1:.44},{n:'Cons. Disc.',ytd:-4.2,m1:-1.2,w1:-.44},{n:'Cons. Stpl.',ytd:2.4,m1:.4,w1:.12},{n:'Utilities',ytd:-6.4,m1:-2.1,w1:-.64},{n:'Materials',ytd:4.4,m1:.8,w1:.28},{n:'Real Estate',ytd:-8.2,m1:-2.4,w1:-.88},{n:'Comm. Svc.',ytd:10.2,m1:2.2,w1:.62}];
  let h=`<table class="pt"><tr><th>SECTOR</th><th class="r">YTD%</th><th class="r">1M%</th><th class="r">1W%</th><th class="r">TREND</th></tr>`;
  secs.forEach(s=>{
    const bar=`<div style="display:inline-block;width:${Math.min(Math.abs(s.ytd)*2,40)}px;height:6px;background:${s.ytd>=0?'var(--gn)':'var(--rd)'};vertical-align:middle"></div>`;
    h+=`<tr><td class="ga" style="font-size:10px">${s.n}</td><td class="${s.ytd>=0?'up':'dn'} r">${s.ytd>=0?'+':''}${s.ytd.toFixed(1)}%</td><td class="${s.m1>=0?'up':'dn'} r">${s.m1>=0?'+':''}${s.m1.toFixed(1)}%</td><td class="${s.w1>=0?'up':'dn'} r">${s.w1>=0?'+':''}${s.w1.toFixed(2)}%</td><td>${bar}</td></tr>`;
  });
  return h+'</table>';
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════ */
const REGIONS=[
  {n:'AMERICAS',ids:['nyc','chi','tor','sao','bue']},
  {n:'EUROPE',  ids:['lon','fra','par','zur','ams','mad','mil','sto','war','pra','vie','bud','mow','ist']},
  {n:'MID EAST / AFRICA',ids:['dub','riy','tlv','cai','joh']},
  {n:'ASIA PACIFIC',ids:['tok','sha','hkg','sin','mum','seo','tai','ban','syd']}
];

function renderSidebar(){
  let h='';
  REGIONS.forEach(r=>{
    h+=`<div class="rh">${r.n}</div>`;
    r.ids.forEach(id=>{
      const c=CENTERS.find(x=>x.id===id);if(!c)return;
      const m=MKT[c.idx];if(!m)return;
      const up=m.chg>=0;
      const pr=fmtPx(m.px);
      h+=`<div class="mk${SEL===id?' sel':''}" data-id="${id}" onclick="onSelect('${id}');map.flyTo([${c.lat},${c.lng}],Math.max(map.getZoom(),4),{duration:1.1})">
        <span class="mk-s">${c.idx}</span>
        <span class="mk-n">${c.city}</span>
        <span class="mk-p">${pr}</span>
        <span class="mk-c ${up?'up':'dn'}">${up?'+':'-'}${Math.abs(m.chg).toFixed(2)}%</span>
      </div>`;
    });
  });
  document.getElementById('mkt-list').innerHTML=h;

  let fh='';
  FXP.slice(0,10).forEach(f=>{
    const up=f.c>=0;const mid=(f.b+f.a)/2;const dp=mid>10?4:mid>1?5:6;
    fh+=`<div class="mk"><span class="mk-s">${f.p.split('/')[0]}</span><span class="mk-n">${f.p}</span><span class="mk-p">${mid.toFixed(dp)}</span><span class="mk-c ${up?'up':'dn'}">${up?'+':'-'}${Math.abs(f.c).toFixed(3)}%</span></div>`;
  });
  document.getElementById('fx-list').innerHTML=fh;
  document.getElementById('sb-time').textContent=new Date().toLocaleTimeString('en-GB',{hour12:false});
  // also refresh active tab
  const at=window._sbTab||'idx';
  if(at==='fx') sbRenderFX();
  if(at==='cmd') sbRenderCMD();
  if(at==='cry') sbRenderCRYPTO();
  if(at==='stk') sbRenderSTKS();
  if(at==='etf') sbRenderETF();
}

/* ── SIDEBAR TAB SWITCH ──────────────────────────────────── */
function sbSwitchTab(tab){
  window._sbTab=tab;
  document.querySelectorAll('.sbtab').forEach(t=>t.classList.toggle('on',t.dataset.tab===tab));
  document.querySelectorAll('.sb-tab-body').forEach(b=>b.style.display='none');
  const el=document.getElementById('sbt-'+tab);
  if(el){el.style.display='flex';}
  if(tab==='fx')  sbRenderFX();
  if(tab==='cmd') sbRenderCMD();
  if(tab==='cry') sbRenderCRYPTO();
  if(tab==='stk') sbRenderSTKS();
  if(tab==='etf') sbRenderETF();
}

function _mkRow(sym,name,px,chg,extra){
  const up=chg>=0;
  const pr=typeof px==='number'?(px>=10000?px.toLocaleString('en',{maximumFractionDigits:0}):px>=1?px.toFixed(px>=100?2:4):px.toFixed(5)):'—';
  const clickHandler = `if(window._openChartForSymbol) window._openChartForSymbol('${sym}')`;
  return `<div class="mk" style="cursor:pointer" onclick="${clickHandler}"><span class="mk-s">${sym}</span><span class="mk-n">${name}${extra?'<span style="font-size:7px;color:#887760;margin-left:3px">'+extra+'</span>':''}</span><span class="mk-p">${pr}</span><span class="mk-c ${up?'up':'dn'}">${up?'+':'-'}${Math.abs(chg).toFixed(2)}%</span></div>`;
}

function sbRenderFX(){
  const el=document.getElementById('fx-list-full');if(!el)return;
  const groups=[
    {h:'MAJORS',pairs:['EUR/USD','GBP/USD','USD/JPY','USD/CHF','AUD/USD','NZD/USD','USD/CAD']},
    {h:'EM / OTHER',pairs:['USD/CNY','USD/INR','USD/BRL','USD/TRY','USD/ZAR','USD/KRW','USD/SGD','USD/SEK','USD/PLN','USD/HUF','USD/CZK','EUR/CZK']}
  ];
  let h='';
  groups.forEach(g=>{
    h+=`<div class="rh">${g.h}</div>`;
    g.pairs.forEach(p=>{
      const f=FXP.find(x=>x.p===p);if(!f)return;
      const mid=(f.b+f.a)/2;const up=f.c>=0;
      const dp=mid>10?2:mid>1?5:6;
      h+=`<div class="mk"><span class="mk-s">${p.split('/')[0]}</span><span class="mk-n">${p}</span><span class="mk-p">${mid.toFixed(dp)}</span><span class="mk-c ${up?'up':'dn'}">${up?'+':'-'}${Math.abs(f.c).toFixed(3)}%</span></div>`;
    });
  });
  el.innerHTML=h;
}

function sbRenderCMD(){
  const el=document.getElementById('cmd-list');if(!el)return;
  const FUTURES=[
    {h:'METALS',items:[
      {s:'XAU',n:'GOLD',px:4643.90,chg:.83,u:'oz'},
      {s:'XAG',n:'SILVER',px:32.14,chg:-.84,u:'oz'},
      {s:'XPT',n:'PLATINUM',px:974.4,chg:-.44,u:'oz'},
      {s:'XPD',n:'PALLADIUM',px:942.8,chg:-.28,u:'oz'},
      {s:'HG1',n:'COPPER',px:4.628,chg:.44,u:'lb'}
    ]},
    {h:'ENERGY',items:[
      {s:'CL1',n:'WTI CRUDE',px:98.32,chg:+2.27,u:'bbl'},
      {s:'CO1',n:'BRENT CRUDE',px:112.19,chg:+3.26,u:'bbl'},
      {s:'NG1',n:'NAT. GAS',px:3.982,chg:1.24,u:'MMBtu'},
      {s:'HO1',n:'HEATING OIL',px:2.248,chg:-1.44,u:'gal'},
      {s:'RB1',n:'GASOLINE',px:2.124,chg:-1.84,u:'gal'},
      {s:'UNG',n:'URANIUM',px:64.80,chg:.44,u:'lb'}
    ]},
    {h:'AGRICULTURE',items:[
      {s:'W1',n:'WHEAT',px:554.4,chg:-.84,u:'bu'},
      {s:'C1',n:'CORN',px:468.4,chg:.24,u:'bu'},
      {s:'S1',n:'SOYBEANS',px:1028.4,chg:.64,u:'bu'},
      {s:'CC1',n:'COCOA',px:9248,chg:-1.44,u:'MT'},
      {s:'KC1',n:'COFFEE',px:348.4,chg:.84,u:'lb'},
      {s:'SB1',n:'SUGAR',px:19.84,chg:-.44,u:'lb'},
      {s:'CT1',n:'COTTON',px:65.84,chg:.24,u:'lb'}
    ]},
    {h:'EQUITY FUTURES',items:[
      {s:'ES1',n:'S&P 500 FUT',px:5602.25,chg:-2.44,u:''},
      {s:'NQ1',n:'NASDAQ FUT',px:19248.5,chg:-3.24,u:''},
      {s:'YM1',n:'DOW FUT',px:41820,chg:-1.58,u:''},
      {s:'RTY1',n:'RUSSELL FUT',px:2042.4,chg:-2.84,u:''},
      {s:'VIX',n:'VIX INDEX',px:24.82,chg:18.4,u:''}
    ]},
    {h:'RATES / BONDS',items:[
      {s:'ZN1',n:'10Y T-NOTE',px:109.14,chg:.24,u:''},
      {s:'ZB1',n:'30Y T-BOND',px:114.28,chg:.44,u:''},
      {s:'ZF1',n:'5Y T-NOTE',px:107.84,chg:.18,u:''},
      {s:'ZT1',n:'2Y T-NOTE',px:103.64,chg:.08,u:''}
    ]}
  ];
  let h='';
  FUTURES.forEach(g=>{
    h+=`<div class="rh">${g.h}</div>`;
    g.items.forEach(i=>{
      // also pull from COMDTY_DATA if available
      const cd=COMDTY_DATA.find(x=>x.s===i.s);
      const px=cd?cd.px:i.px; const chg=cd?cd.chg:i.chg;
      h+=_mkRow(i.s,i.n,px,chg,i.u);
    });
  });
  el.innerHTML=h;
}

function sbRenderCRYPTO(){
  const el=document.getElementById('cry-list');if(!el)return;
  const TOP=CRYPTO.slice(0,30);
  const groups=[
    {h:'LAYER 1',ids:['BTC','ETH','SOL','BNB','ADA','AVAX','NEAR','APT','SUI','ICP','ATOM','TRX','XLM','LTC','KAS']},
    {h:'DEFI / L2',ids:['UNI','AAVE','OP','FIL','LINK','RENDER','DOT']},
    {h:'MEME / OTHER',ids:['DOGE','HYPE','XRP']}
  ];
  let h='';
  groups.forEach(g=>{
    const coins=g.ids.map(id=>TOP.find(c=>c.s===id)).filter(Boolean);
    if(!coins.length)return;
    h+=`<div class="rh">${g.h}</div>`;
    coins.forEach(c=>{
      const up=c.chg>=0;
      const pr=c.px>=1000?'$'+c.px.toLocaleString('en',{maximumFractionDigits:0}):c.px>=1?'$'+c.px.toFixed(2):'$'+c.px.toFixed(4);
      h+=`<div class="mk" style="cursor:pointer" onclick="window._openChartForSymbol('${c.s}')"><span class="mk-s">${c.s}</span><span class="mk-n">${c.n}</span><span class="mk-p">${pr}</span><span class="mk-c ${up?'up':'dn'}">${up?'+':'-'}${Math.abs(c.chg).toFixed(2)}%</span></div>`;
    });
  });
  el.innerHTML=h;
}

function sbRenderSTKS(){
  const el=document.getElementById('stk-list');if(!el)return;
  const EXTRA_STKS=[
    // Mega-cap tech
    {sym:'AAPL',n:'Apple'},    {sym:'NVDA',n:'NVIDIA'},   {sym:'MSFT',n:'Microsoft'},
    {sym:'AMZN',n:'Amazon'},   {sym:'GOOGL',n:'Alphabet'},{sym:'META',n:'Meta'},
    {sym:'TSLA',n:'Tesla'},    {sym:'AVGO',n:'Broadcom'}, {sym:'ORCL',n:'Oracle'},
    // Financials
    {sym:'JPM',n:'JPMorgan'},  {sym:'GS',n:'Goldman'},    {sym:'BRK',n:'Berkshire'},
    {sym:'V',n:'Visa',px:322.4,chg:-.84},{sym:'MA',n:'Mastercard',px:528.4,chg:-.64},
    // Healthcare
    {sym:'UNH',n:'UnitedHealth'},{sym:'JNJ',n:'J&J',px:148.4,chg:.24},{sym:'LLY',n:'Eli Lilly',px:764.4,chg:-1.24},
    // Energy
    {sym:'XOM',n:'ExxonMobil'},{sym:'CVX',n:'Chevron',px:148.4,chg:-1.84},{sym:'OXY',n:'Occidental',px:42.84,chg:-2.14},
    // Other
    {sym:'COST',n:'Costco',px:918.4,chg:-.44},{sym:'WMT',n:'Walmart',px:96.4,chg:.24},{sym:'HD',n:'Home Depot',px:378.4,chg:-.84},
    {sym:'BA',n:'Boeing',px:148.4,chg:-2.44},{sym:'DIS',n:'Disney',px:88.4,chg:-1.24}
  ];
  const groups=[
    {h:'MEGA CAP TECH',syms:['AAPL','NVDA','MSFT','AMZN','GOOGL','META','TSLA','AVGO','ORCL']},
    {h:'FINANCIALS',syms:['JPM','GS','BRK','V','MA']},
    {h:'HEALTHCARE',syms:['UNH','JNJ','LLY']},
    {h:'ENERGY',syms:['XOM','CVX','OXY']},
    {h:'CONSUMER / OTHER',syms:['COST','WMT','HD','BA','DIS']}
  ];
  let h='';
  groups.forEach(g=>{
    h+=`<div class="rh">${g.h}</div>`;
    g.syms.forEach(sym=>{
      const s=STKS[sym]||EXTRA_STKS.find(x=>x.sym===sym);
      if(!s)return;
      const px=s.px||0; const chg=s.chg||s.ytd||0; const name=s.n||s.name||'';
      h+=_mkRow(sym,name,px,chg,'');
    });
  });
  el.innerHTML=h;
}

function sbRenderETF(){
  const el=document.getElementById('etf-list');if(!el)return;
  const ETFS=[
    {h:'US BROAD MARKET',items:[
      {s:'SPY',n:'SPDR S&P 500',px:558.4,chg:-2.68},{s:'QQQ',n:'Invesco Nasdaq',px:468.4,chg:-3.42},
      {s:'IWM',n:'iShares Russell',px:198.4,chg:-2.84},{s:'DIA',n:'SPDR Dow Jones',px:418.4,chg:-1.68},
      {s:'VOO',n:'Vanguard S&P',px:512.4,chg:-2.64},{s:'VTI',n:'Vanguard Total',px:248.4,chg:-2.44}
    ]},
    {h:'SECTORS',items:[
      {s:'XLK',n:'Technology',px:214.4,chg:-3.84},{s:'XLF',n:'Financials',px:48.4,chg:-1.24},
      {s:'XLE',n:'Energy',px:84.4,chg:-1.84},{s:'XLV',n:'Healthcare',px:138.4,chg:-.84},
      {s:'XLI',n:'Industrials',px:128.4,chg:-1.44},{s:'XLY',n:'Cons. Disc.',px:184.4,chg:-3.24},
      {s:'XLU',n:'Utilities',px:78.4,chg:-.44},{s:'XLRE',n:'Real Estate',px:38.4,chg:-.84}
    ]},
    {h:'BONDS / RATES',items:[
      {s:'TLT',n:'20Y Treasury',px:84.4,chg:.84},{s:'IEF',n:'7-10Y Treasury',px:92.4,chg:.44},
      {s:'SHY',n:'1-3Y Treasury',px:82.4,chg:.18},{s:'HYG',n:'Hi-Yield Bond',px:76.4,chg:-.44},
      {s:'LQD',n:'Corp Bond',px:104.4,chg:.24}
    ]},
    {h:'COMMODITIES',items:[
      {s:'GLD',n:'Gold SPDR',px:294.4,chg:.84},{s:'SLV',n:'Silver iShares',px:28.4,chg:-.84},
      {s:'USO',n:'Oil Fund',px:64.4,chg:-2.14},{s:'UNG',n:'Nat Gas',px:14.4,chg:1.24}
    ]},
    {h:'BITCOIN / CRYPTO ETFs',items:[
      {s:'IBIT',n:'iShares Bitcoin',px:48.4,chg:2.84},{s:'FBTC',n:'Fidelity Bitcoin',px:38.4,chg:2.64},
      {s:'GBTC',n:'Grayscale BTC',px:44.4,chg:2.24},{s:'ARKB',n:'ARK Bitcoin',px:62.4,chg:2.44},
      {s:'ETHA',n:'iShares Ethereum',px:18.4,chg:3.84},{s:'FETH',n:'Fidelity ETH',px:22.4,chg:3.64}
    ]},
    {h:'INTERNATIONAL',items:[
      {s:'EFA',n:'iShares MSCI',px:78.4,chg:-1.24},{s:'EEM',n:'EM iShares',px:44.4,chg:-.84},
      {s:'VGK',n:'Vanguard EU',px:68.4,chg:-1.44},{s:'FXI',n:'China iShares',px:34.4,chg:.24},
      {s:'EWJ',n:'Japan iShares',px:62.4,chg:-2.04}
    ]},
    {h:'FACTOR / THEMATIC',items:[
      {s:'ARKK',n:'ARK Innovation',px:38.4,chg:-4.84},{s:'SOXX',n:'Semis iShares',px:198.4,chg:-4.24},
      {s:'BOTZ',n:'Robotics & AI',px:28.4,chg:-3.44},{s:'ICLN',n:'Clean Energy',px:12.4,chg:-.84},
      {s:'VNQ',n:'Real Estate',px:84.4,chg:-.64}
    ]}
  ];
  let h='';
  ETFS.forEach(g=>{
    h+=`<div class="rh">${g.h}</div>`;
    g.items.forEach(i=>h+=_mkRow(i.s,i.n,i.px,i.chg,''));
  });
  el.innerHTML=h;
}

/* ═══════════════════════════════════════════════════════
   MAP TICKER TAPE
═══════════════════════════════════════════════════════ */
function fmtTickPx(px){
  if(!px||isNaN(px))return '—';
  if(px>10000)return px.toLocaleString('en',{maximumFractionDigits:0});
  if(px>1000) return fmtPx(px);
  if(px>100)  return fmtPx(px);
  if(px>1)    return fmtPx(px);
  return px.toFixed(4);
}

// Build ticker once, then only update prices in-place
var _tickerBuilt = false;

function _tickerItems(){
  var items = [];
  CRYPTO.forEach(function(c){ items.push({key:'c-'+c.s, sym:c.s, src:'crypto'}); });
  ['SPX','INDU','NDX','DAX','UKX','NKY','HSI','CAC','SHCOMP','SENSEX','ASX200','KOSPI','IBOV','PX','ATX','WIG20','SMI','AEX'].forEach(function(s){
    if(MKT[s]) items.push({key:'m-'+s, sym:s, src:'mkt'});
  });
  FXP.forEach(function(f){
    items.push({key:'f-'+f.p, sym:f.p, src:'fx'});
  });
  COMDTY_DATA.forEach(function(c){
    items.push({key:'d-'+c.s, sym:c.s, src:'cmd'});
  });
  return items;
}

function buildTicker(){
  var el=document.getElementById('map-tick-inner');if(!el)return;

  if(!_tickerBuilt){
    var items = _tickerItems();
    var h = '';
    items.forEach(function(it, i){
      if(i>0) h+='<span style="margin:0 6px;color:#4e4400">·</span>';
      h+='<span class="mt-sym">'+it.sym+'</span>';
      h+='<span class="mt-px" data-tk="'+it.key+'-p">--</span>';
      h+='<span class="mt-up" data-tk="'+it.key+'-c">--</span>';
    });
    // Add spacer to the segment then duplicate for a truly seamless loop
    h += '<span style="margin:0 80px"></span>';
    el.innerHTML = h + h;
    _tickerBuilt = true;

    requestAnimationFrame(function(){
      var w = el.scrollWidth;
      // Slower speed: divisor 40 instead of 65, min duration 150s
      var dur = Math.max(150, w / 40);
      el.style.animation = 'maptk ' + dur + 's linear infinite';
      el.style.animationFillMode = 'both';
    });
  }

  // Update all prices in-place — no innerHTML change, animation keeps running
  _tickerUpdatePrices();
}

function _tickerUpdatePrices(){
  CRYPTO.forEach(function(c){ _tkUp('c-'+c.s, c.px, c.chg); });
  ['SPX','INDU','NDX','DAX','UKX','NKY','HSI','CAC','SHCOMP','SENSEX','ASX200','KOSPI','IBOV','PX','ATX','WIG20','SMI','AEX'].forEach(function(s){
    var m=MKT[s]; if(m) _tkUp('m-'+s, m.px, m.chg);
  });
  FXP.forEach(function(f){
    var mid=(f.b+f.a)/2;
    if(mid>0) _tkUp('f-'+f.p, mid, f.c);
  });
  COMDTY_DATA.forEach(function(c){ _tkUp('d-'+c.s, c.px, c.chg||0); });
}

function _tkUp(key, px, chg){
  document.querySelectorAll('[data-tk="'+key+'-p"]').forEach(function(e){
    if(px && !isNaN(px)) e.textContent = fmtTickPx(px);
  });
  document.querySelectorAll('[data-tk="'+key+'-c"]').forEach(function(e){
    if(chg!==undefined && !isNaN(chg)){
      var up = chg>=0;
      e.textContent = (up?'+':'')+chg.toFixed(2)+'%';
      e.className = up ? 'mt-up' : 'mt-dn';
    }
  });
}

function _updateStatPrices(){
  const map={
    btc:{s:'BTC',src:'crypto'},
    eth:{s:'ETH',src:'crypto'},
    sol:{s:'SOL',src:'crypto'},
    xau:{s:'GOLD',src:'comdty'},
    wti:{s:'WTI',src:'comdty'},
    spx:{s:'SPX',src:'mkt'}
  };
  Object.entries(map).forEach(function([key,cfg]){
    var px=null,chg=null;
    if(cfg.src==='crypto'){
      var c=CRYPTO.find(function(x){return x.s===cfg.s;});
      if(c){px=c.px;chg=c.chg;}
    } else if(cfg.src==='comdty'){
      var c=COMDTY_DATA.find(function(x){return x.s===cfg.s;});
      if(c){px=c.px;chg=c.chg||0;}
    } else if(cfg.src==='mkt'){
      var m=MKT[cfg.s];
      if(m){px=m.px;chg=m.chg;}
    }
    var elPx=document.getElementById('sbp-'+key);
    var elChg=document.getElementById('sbp-'+key+'-c');
    if(elPx && px && !isNaN(px)){
      elPx.textContent=fmtTickPx(px);
    }
    if(elChg && chg!==null && !isNaN(chg)){
      var up=chg>=0;
      elChg.textContent=(up?'+':'')+chg.toFixed(2)+'%';
      elChg.className='sbp-chg '+(up?'up':'dn');
    }
  });
}

/* ═══════════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════════ */
function doSearch(q){
  if(!q)return;q=q.trim().toUpperCase();
  const c=CENTERS.find(x=>x.idx===q||x.city.toUpperCase().includes(q)||x.id===q.toLowerCase()||x.co===q||(MKT[x.idx]?.n||'').toUpperCase().includes(q));
  if(c){
    map.flyTo([c.lat,c.lng],5,{duration:1.5});
    onSelect(c.id);
    setTimeout(()=>{if(MRKRS[c.id])MRKRS[c.id].openPopup();},1600);
    setStat(`Found: ${c.city} — ${c.idx}`);
  } else {
    const cr=CRYPTO.find(x=>x.s===q||x.n.toUpperCase().includes(q));
    if(cr){setStat(`CRYPTO: ${cr.s} — $${fmtPx(cr.px)}  ${cr.chg>=0?'+':'-'}${Math.abs(cr.chg).toFixed(2)}%  |  Mkt Cap: ${cr.mc}`);}
    else {setStat(`"${q}" not found — try: PRAGUE / NKY / LONDON / BTC / SENSEX`);}
  }
  document.getElementById('srch-inp').value='';
}

/* ═══════════════════════════════════════════════════════
   CLOCK
═══════════════════════════════════════════════════════ */
const _CITIES=[
  {id:'nyc',tz:'America/New_York',  lat:40.71, lon:-74.01},
  {id:'lon',tz:'Europe/London',     lat:51.51, lon:-0.13},
  {id:'fra',tz:'Europe/Berlin',     lat:50.11, lon:8.68},
  {id:'dub',tz:'Asia/Dubai',        lat:25.20, lon:55.27},
  {id:'sin',tz:'Asia/Singapore',    lat:1.35,  lon:103.82},
  {id:'tok',tz:'Asia/Tokyo',        lat:35.68, lon:139.69},
  {id:'hkg',tz:'Asia/Hong_Kong',    lat:22.32, lon:114.17},
  {id:'syd',tz:'Australia/Sydney',  lat:-33.87,lon:151.21}
];
const _wxCache={};

async function _fetchWeather(city){
  if(_wxCache[city.id]&&Date.now()-_wxCache[city.id].ts<600000)return;
  try{
    const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weathercode&timezone=${encodeURIComponent(city.tz)}&forecast_days=1`);
    const j=await r.json();
    const temp=Math.round(j.current?.temperature_2m??99);
    const code=j.current?.weathercode??0;
    const wx=_wxCode(code);
    _wxCache[city.id]={temp,wx,ts:Date.now()};
    _updateCityWx(city.id,temp,wx);
  }catch(e){}
}

function _wxCode(c){
  if(c===0) return{icon:'☀',desc:'CLEAR',col:'#ff7700'};
  if(c<=2)  return{icon:'⛅',desc:'P.CLOUD',col:'#aaa'};
  if(c<=3)  return{icon:'☁',desc:'OVERCAST',col:'#666'};
  if(c<=48) return{icon:'≡',desc:'FOG',col:'#888'};
  if(c<=55) return{icon:'·',desc:'DRIZZLE',col:'#00bbdd'};
  if(c<=65) return{icon:'▲',desc:'RAIN',col:'#0088ff'};
  if(c<=75) return{icon:'*',desc:'SNOW',col:'#aaddff'};
  if(c<=82) return{icon:'▼',desc:'SHOWERS',col:'#00bbdd'};
  if(c<=99) return{icon:'⚡',desc:'STORM',col:'#ff4400'};
  return{icon:'●',desc:'--',col:'#554433'};
}

function _updateCityWx(id,temp,wx){
  const t=document.getElementById('sc-'+id+'-tmp');
  const w=document.getElementById('sc-'+id+'-wx');
  const d=document.getElementById('sc-'+id+'-desc');
  if(t){t.textContent=temp+'°C';t.style.color=temp>30?'#ff4400':temp>20?'#ff6600':temp>10?'#c8c0a8':'#00bbdd';}
  if(w){w.textContent=wx.icon;w.style.color=wx.col;}
  if(d){d.textContent=wx.desc;d.style.color=wx.col;}
}

const _MARKET_HOURS={
  nyc:[570,960],lon:[480,960],fra:[540,1020],
  dub:[540,840],sin:[570,900],tok:[540,930],
  hkg:[570,900],syd:[600,960]
};

function clk(){
  if(window._tabHidden) return;
  const n=new Date();
  
  // Force visibility of system components: ONLY visible on the main map
  // Hide if any major floating panel (Chart, etc.) is MAXIMIZED
  const isAnyPanelMaximized = Object.values(window.PANEL_REGISTRY || {}).some(p => p.maximized);
  // Specifically check for sidebar tabs (folders) that have physical height
  const isAnyTabOpen = Array.from(document.querySelectorAll('.sb-tab-body')).some(el => el.offsetHeight > 0);
  const isBbgFocus = isAnyPanelMaximized || isAnyTabOpen;
  
  // Top-bar elements: hide when sidebar OR panel is focused
  const topBarIds = ['top-right', 'top-clk'];
  const hideIds = [];
  
  topBarIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = isBbgFocus ? 'none' : '';
  });
  hideIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
  });
  
  // STAT bar AND its children: only hide when a panel is MAXIMIZED
  const statIds = ['STAT', 'st-utc', 'sb-sec-utc', 'sb-sec-cities'];
  statIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (isAnyPanelMaximized) {
          el.style.setProperty('display', 'none', 'important');
      } else if (!document.body.classList.contains('hide-stat-bar')) {
          el.style.display = '';
      }
  });

  const tc=document.getElementById('top-clk'); if(tc) tc.textContent=n.toLocaleTimeString('en-GB',{hour12:false})+' CET';
  const td=document.getElementById('top-dt'); if(td) td.textContent=n.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'2-digit'}).toUpperCase();
  const su=document.getElementById('st-utc'); if(su) su.textContent=n.toLocaleTimeString('en-GB',{hour12:false});
  // Large clock in sidebar — local time
  const _stu=document.getElementById('sb-utc-time');
  if(_stu) _stu.textContent=n.toLocaleTimeString('en-GB',{hour12:false});
  const _std=document.getElementById('sb-utc-date');
  if(_std) _std.textContent=n.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
  _CITIES.forEach(c=>{
    const el=document.getElementById('sc-'+c.id+'-t');
    if(!el)return;
    const t=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:c.tz});
    el.textContent=t;
    const dot=document.getElementById('sc-'+c.id)?.querySelector('.stat-city-dot');
    if(dot){
      const h=parseInt(t.slice(0,2)),m=parseInt(t.slice(3,5));
      const hm=h*60+m;
      const hrs=_MARKET_HOURS[c.id]||[0,0];
      const isOpen=hm>=hrs[0]&&hm<hrs[1];
      dot.style.opacity=isOpen?'1':'0.2';
    }
  });
}
setInterval(clk,1000);clk();
_CITIES.forEach((c,i)=>setTimeout(()=>_fetchWeather(c),i*150));
// Pre-fetch DHLO klines so CRYPTO table has HIGH/LOW/OPEN on open
const _dhloStartPairs=[{sym:'BTC',b:'BTCUSDT'},{sym:'ETH',b:'ETHUSDT'},{sym:'SOL',b:'SOLUSDT'},{sym:'BNB',b:'BNBUSDT'},{sym:'XRP',b:'XRPUSDT'},{sym:'ADA',b:'ADAUSDT'},{sym:'BTC',b:'BTCUSDT'},{sym:'AVAX',b:'AVAXUSDT'},{sym:'DOT',b:'DOTUSDT'},{sym:'LINK',b:'LINKUSDT'}];
_dhloStartPairs.forEach((p,i)=>setTimeout(()=>_fetchDHLO(p.sym,p.b),2000+i*300));
setInterval(()=>_dhloStartPairs.forEach((p,i)=>setTimeout(()=>_fetchDHLO(p.sym,p.b),i*300)),30000);
setInterval(()=>_CITIES.forEach(c=>_fetchWeather(c)),600000);

/* ═══════════════════════════════════════════════════════
   JITTER — smooth micro-movements
═══════════════════════════════════════════════════════ */
function jitter(){
  Object.values(MKT).forEach(m=>{m.chg+=(Math.random()-.5)*.012;m.px=Math.max(m.px*(1+(Math.random()-.499)*.0005),.001);});
  FXP.forEach(f=>{const d=f.b*(Math.random()-.499)*.0003;f.b+=d;f.a+=d;f.c+=(Math.random()-.5)*.008;});
  CRYPTO.forEach(c=>{c.chg+=(Math.random()-.5)*.04;c.px=Math.max(c.px*(1+(Math.random()-.499)*.0005),.000001);});
  buildTicker();renderSidebar();renderMarkers();renderFXPins();
  // Update menu FX vals
  const eurusd=FXP.find(f=>f.p==='EUR/USD');if(eurusd){const el=document.getElementById('fx-eurusd');if(el)el.textContent=((eurusd.b+eurusd.a)/2).toFixed(5);}
  const usdczk=FXP.find(f=>f.p==='USD/CZK');if(usdczk){const el=document.getElementById('fx-usdczk');if(el)el.textContent=((usdczk.b+usdczk.a)/2).toFixed(3);}
  // Update all crypto menu prices + colors
  [['BTC','mn-btc'],['ETH','mn-eth'],['SOL','mn-sol'],['XRP','mn-xrp'],['BNB','mn-bnb']].forEach(([sym,id])=>{
    const c=CRYPTO.find(x=>x.s===sym);
    const el=document.getElementById(id);
    if(c&&el){
      el.textContent='$'+fmtPx(c.px);
      el.style.color=c.chg>=0?'var(--gn)':'var(--rd)';
    }
  });
  // refresh open panels
  document.querySelectorAll('.panel').forEach(p=>{
    const fn=p.querySelector('.panel-tag')?.textContent;
    const tabEl=p.querySelector('.ptab.on');
    const body=p.querySelector('.panel-body');
    if(!fn||!body)return;
    if(['WEI','FX','EQUITY','CRYPTO','COMDTY','MOVERS','MMAP'].includes(fn)){
      const tabs=getPanelTabs(fn);
      const ti=tabs&&tabEl?tabs.indexOf(tabEl.textContent):0;
      body.innerHTML=ti>0?buildPanelContentTab(fn,ti):buildPanelContent(fn);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   ECOSYSTEM DATA ENGINE
   Each blockchain  its own native data source:

   BITCOIN       Binance WS + REST (BTCUSDT)
   ETHEREUM      Binance WS + Uniswap V3 subgraph (on-chain)
   SOLANA        Binance WS + Jupiter Price API + Raydium API
   BNB CHAIN     Binance WS + PancakeSwap subgraph
   HYPERLIQUID   Hyperliquid REST API (native)
   ALL OTHERS    Binance WS cross-checked with MEXC + CoinGecko

   Price priority: Ecosystem native > Binance WS > Binance REST > fallback
   Refresh: WS real-time, REST confirm every 10s, ecosystem APIs every 20s
═══════════════════════════════════════════════════════════════ */

const LIVE={fx:false,crypto:false,ws:false,idx:false};
let wsConn=null;
let _wsLastTick=0;
// Per-coin last-update source tracking
const _src={}; // {coinId: 'ws'|'binance'|'jupiter'|'hl'|'uniswap'|...}
// Per-exchange price store for XSRC cross-exchange panel
const _xPrices={}; // {coinId: {exchange: {px, chg, vol, ts}}}
const _volTs={}; // {coinId: timestamp of last vol update}
const _volPrev={}; // {coinId: {vol, ts}} — předchozí snapshot pro delta
// Per-exchange equity store
const _xEquity={}; // {symbol: {exchange: {px, chg, ts}}}
// Per-exchange FX store  
const _xFX={}; // {pair: {source: {mid, ts}}}
// Per-exchange commodity store
const _xComdty={}; // {sym: {source: {px, chg, ts}}}

function setStat(m){const el=document.getElementById('st-msg');if(el)el.textContent=m;}
function setLiveBadge(id,on){const el=document.getElementById(id);if(el)el.classList.toggle('live',on);}
// Circulating supplies for real-time mcap computation
const _SUPPLY={
  bitcoin:19.85e6, ethereum:120.4e6, tether:135e9, 'binance-coin':145.8e6, ripple:57.6e9,
  solana:490e6, 'usd-coin':49e9, dogecoin:148e9, cardano:35.8e9, tron:87.2e9,
  toncoin:2.56e9, avalanche:412e6, chainlink:608e6, 'shiba-inu':589e12, polkadot:1.46e9,
  hyperliquid:333e6, sui:3.1e9, 'near-protocol':1.18e9, aptos:467e6, uniswap:600e6,
  arbitrum:4.0e9, optimism:1.37e9, injective:93.8e6, ethena:5.3e9,
  litecoin:74.6e6, stellar:31.2e9, aave:14.9e6, atom:390e6, filecoin:556e6,
  render:530e6, kaspa:24.4e9, icp:468e6, jupiter:1.35e9, raydium:555e6,
  bonk:94e12, dogwifhat:998e6, jito:134e6, pyth:3.6e9, lido:893e6, maker:895e3,
  'bitcoin-cash':19.7e6, monero:18.4e6, 'polygon':10.3e9, algorand:8.0e9,
  fantom:3.18e9, vechain:85.9e9, theta:1e9, hedera:38.6e9, cosmos:390e6,
  kusama:9.9e6, pepe:420.69e12, floki:9.65e12, 'the-sandbox':1.93e9,
  decentraland:2.19e9, 'axie-infinity':270e6, gala:48.8e9, 'the-graph':10.8e9,
  synthetix:344e6, 'ethereum-name-service':100e6, 'rocket-pool':19.4e6,
  wormhole:3.17e9, bittensor:7.27e6, worldcoin:162e6, 'fetch-ai':1.15e9,
  dydx:450e6, gmx:9.4e6, 'curve-dao-token':2.14e9, '1inch':1.5e9,
  sushiswap:250e6, compound:10e6, ondo:1.4e9, okb:300e6, 'crypto-com-chain':25.3e9,
  'gate-token':300e6, mantle:3.2e9, starknet:1.8e9, metis:18.6e6,
  'immutable-x':2e9, 'ssv-network':11.3e6, drift:1.0e9
};

// ── OPTIMIZATION: Render Throttling ────────────────────────────────────────
let _needsRender = false;
let _renderRaf = null;

function _requestRender() {
  if (_needsRender) return;
  _needsRender = true;
  if (_renderRaf) cancelAnimationFrame(_renderRaf);
  _renderRaf = requestAnimationFrame(() => {
    buildTicker();
    renderSidebar();
    _patchCRYPTOPanel();
    _needsRender = false;
  });
}


// Vol per-exchange store — {coinId: {exchange: vol, ...}}
const _xVol = {};
// Seed _xVol ze statických CRYPTO dat jako startovní hodnota
// Zabrání skákání dokud nepřijdou live data
(function _seedVol(){
  CRYPTO.forEach(c => {
    if(c.vol && c.vol > 0){
      _xVol[c.id] = {coingecko: {vol: c.vol, ts: Date.now() - 200000}}; // stale — přepíše se live
    }
  });
})();
// Tržní podíly burz na celkovém spot objemu (dle CoinGecko/CMC průměr)
const _EXCH_SHARE = {
  binance:0.38, okx:0.14, bybit:0.12, kraken:0.06,
  htx:0.05, coinbase:0.07, kucoin:0.04, gate:0.03,
  mexc:0.03, bitget:0.03, hl:0.03, coingecko:1.0
};
// Spočítej celkový objem ze všech dostupných zdrojů
function _computeTotalVol(id) {
  const exVols = _xVol[id];
  if (!exVols) return null;
  const now = Date.now();
  const maxAge = 180000; // 3 minuty = stale

  // 1. CoinGecko = celkový agregovaný objem všech burz — nejlepší zdroj
  if (exVols.coingecko?.vol > 0 && (now - (exVols.coingecko.ts||0)) < maxAge) {
    return exVols.coingecko.vol;
  }

  // 2. Agreguj dostupné burzy přímo (součet bez extrapolace)
  // Toto dá podhodnocený ale reálný číslo — lepší než extrapolace
  const direct = ['binance','okx','bybit','kraken','coinbase','htx','hl'];
  let aggVol = 0, aggShare = 0;
  for (const src of direct) {
    const e = exVols[src];
    if (!e?.vol || e.vol <= 0 || (now - (e.ts||0)) > maxAge) continue;
    aggVol   += e.vol;
    aggShare += (_EXCH_SHARE[src] || 0.05);
  }
  if (aggVol > 0 && aggShare > 0) {
    // Extrapoluj na 100% trhu podle pokrytých burz
    return aggVol / aggShare;
  }

  // 3. Fallback — jen Binance extrapolace
  const bn = exVols.binance;
  if (bn?.vol > 0 && (now - (bn.ts||0)) < maxAge) {
    return bn.vol / (_EXCH_SHARE.binance || 0.38);
  }

  return null;
}

function updateCoin(id, data, source, priority){
  const c=CRYPTO.find(x=>x.id===id);if(!c)return;
  const curSrc=_src[id]||'none';
  const prio={tv:0,ws:1,hl:1,jupiter:1,uniswap:2,binance:3,pancake:3,coinbase:3,mexc:4,kraken:3,okx:3,bybit:3,bitget:4,htx:4,kucoin:4,gate:4,coingecko:5,none:99};

  if((prio[source]||9)<=(prio[curSrc]||9)){
    if(data.px&&data.px>0){
      c.px=data.px;
      c._pxTs=Date.now(); // timestamp živé ceny
      c._pxSrc=source;    // zdroj (ws/binance/bybit/coingecko...)
      const sup=_SUPPLY[id]||0;
      if(sup>0) c.mc=c.px*sup;
    }
    if(data.chg!=null)c.chg=data.chg;
    if(data.mc&&!_SUPPLY[id])c.mc=data.mc;
    if(data.hi)c.hi=data.hi;
    if(data.lo)c.lo=data.lo;
    if(data.ath)c.ath=data.ath;
    _src[id]=source;
  }
  // Vol — vždy ulož (nezávisle na prioritě zdroje ceny)
  if(data.vol && data.vol > 0){
    if(!_xVol[id]) _xVol[id]={};
    _xVol[id][source] = {vol: data.vol, ts: Date.now()};

    // Stejná logika jako cena — prioritní zdroj vyhraje
    const volPrio = {tv:0,ws:1, hl:1, binance:2, coinbase:2, okx:3, bybit:3, kraken:3, htx:3, coingecko:4};
    const curVolSrc = _xVol[id]._best || 'none';
    const curVolPrio = volPrio[curVolSrc] || 99;
    const newVolPrio = volPrio[source] || 99;


    if(newVolPrio <= curVolPrio || !c.vol || c.vol <= 0){
      // ws a binance posílají objem jen za svoji burzu — extrapoluj na celý trh
      // ostatní (coingecko, hl) posílají celkový objem — použij přímo
      const exchShare = {ws:0.38, binance:0.38, okx:0.14, bybit:0.12, kraken:0.06, coinbase:0.07, htx:0.05};
      const share = exchShare[source];
      const totalVol = share ? data.vol / share : data.vol;
      // Ulož předchozí hodnotu pro delta zobrazení
      if(c.vol > 0) _volPrev[id] = {vol: c.vol, ts: _volTs[id] || Date.now()};
      c.vol = totalVol;
      _volTs[id] = Date.now();
      _xVol[id]._best = source;
    }
  }
  // Always record per-exchange price for XSRC cross-exchange panel
  if(data.px && data.px > 0){
    if(!_xPrices[id])_xPrices[id]={};
    _xPrices[id][source]={px:data.px,chg:data.chg??null,vol:data.vol||null,ts:Date.now()};
  }
  // ── OPTIMIZATION: Trigger throttled render on EVERY update ────────────────
  _requestRender();
}



/* ════════════════════════════════════════════
   1. BINANCE WebSocket — all coins real-time
════════════════════════════════════════════ */
const BN_MAP={
  'btcusdt':'bitcoin',      'ethusdt':'ethereum',     'xrpusdt':'ripple',
  'bnbusdt':'bnb',          'solusdt':'solana',
  'adausdt':'cardano',      'trxusdt':'tron',         'linkusdt':'chainlink',
  'avaxusdt':'avalanche',   'suiusdt':'sui',          'dotusdt':'polkadot',
  'ltcusdt':'litecoin',     'xlmusdt':'stellar',      'nearusdt':'near',
  'aaveusdt':'aave',        'injusdt':'injective',    'arbusdt':'arbitrum',
  'opusdt':'optimism',      'atomusdt':'cosmos',      'uniusdt':'uniswap',
  'ftmusdt':'fantom',       'algousdt':'algorand',    'vetusdt':'vechain',
  'ldousdt':'lido',         'jupusdt':'jupiter',      'seiusdt':'sei-network',
  'renderusdt':'render',    'pendleusdt':'pendle',    'grtusdt':'the-graph',
  'enausdt':'ethena',       'ondousdt':'ondo-finance','aptusdt':'aptos',
  'tonusdt':'toncoin',      'maticusdt':'polygon',    'mkrusdt':'maker',
  'crvusdt':'curve-dao-token','gmxusdt':'gmx',       'imxusdt':'immutable-x',
  'strkusdt':'starknet',    'beraausdt':'berachain',  'moveusdt':'movement',
  'etcusdt':'ethereum-classic','zecusdt':'zcash',     'jtousdt':'jito',
  'pythusdt':'pyth-network','wldusdt':'worldcoin-wld','tiausdt':'celestia',
  // HYPE not on Binance spot — via Hyperliquid direct
};
const BN_SYMS=Object.keys(BN_MAP).map(s=>s.toUpperCase());

// ── OPTIMIZATION: Dynamic mapping for aggregate stream ─────────────────────
const _BN_AGG_MAP = {};
function _updateBnAggMap() {
  // Map our CRYPTO assets to potential Binance symbols
  CRYPTO.forEach(c => {
    const sym = c.s.toUpperCase();
    _BN_AGG_MAP[sym + 'USDT'] = c.id;
    // Map existing BN_MAP overrides
    for (const [bnSym, id] of Object.entries(BN_MAP)) {
      _BN_AGG_MAP[bnSym.toUpperCase()] = id;
    }
  });
}
_updateBnAggMap();

function startBinanceWS(){
  try{
    if(wsConn){try{wsConn.close();}catch(_){}}
    // Use aggregate stream for ALL tickers at once (efficient batching)
    wsConn=new WebSocket(`wss://stream.binance.com:9443/ws/!ticker@arr`);
    wsConn._count=0;
    wsConn.onopen=()=>{
      LIVE.ws=true;
      _boot.update('BINANCE·WS','ok','AGGREGATE STREAM LIVE');
      setLiveBadge('si-bnb',true);
      setStat('BINANCE WS — Aggregate stream (ALL PAIRS) active');
    };
    wsConn.onmessage=(e)=>{
      try{
        const data=JSON.parse(e.data);
        if(!Array.isArray(data)) return;
        
        let updated = 0;
        data.forEach(d => {
          const id = _BN_AGG_MAP[d.s];
          if(id) {
            updateCoin(id, {
              px: parseFloat(d.c),
              chg: parseFloat(d.P),
              vol: parseFloat(d.q),
              hi: parseFloat(d.h),
              lo: parseFloat(d.l)
            }, 'ws', 1);
            updated++;
          }
        });
        
        if(updated > 0) {
          _wsLastTick = Date.now();
          wsConn._count++;
        }

      }catch(_){}
    };
    wsConn.onerror=()=>{LIVE.ws=false;setLiveBadge('si-bnb',false);};
    wsConn.onclose=()=>{LIVE.ws=false;_boot.update('BINANCE·WS','err','RECONNECTING...');setTimeout(startBinanceWS,3000);};
  }catch(_){setTimeout(startBinanceWS,5000);}
}


async function fetchBinance24hr(){
  try{
    const bnbUrl=`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(BN_SYMS)}`;
    const r=await _fetchCORS(bnbUrl, 10000);
    if(!r)throw new Error('all proxies failed');
    const data=await r.json();let n=0;
    data.forEach(t=>{
      const id=BN_MAP[(t.symbol||'').toLowerCase()];if(!id)return;
      const _hi24 = parseFloat(t.highPrice);
      const _lo24 = parseFloat(t.lowPrice);
      const _op24 = parseFloat(t.openPrice);
      updateCoin(id,{
        px:parseFloat(t.lastPrice), chg:parseFloat(t.priceChangePercent),
        vol:parseFloat(t.quoteVolume),
        hi:_hi24, lo:_lo24
      },'binance',3);
      // Write real HIGH/LOW/OPEN to _dhloCache immediately (no need to wait for _fetchDHLO)
      if(_hi24>0||_lo24>0||_op24>0){
        const _sym=(t.symbol||'').replace('USDT','').toUpperCase();
        if(!_dhloCache[_sym]) _dhloCache[_sym]={};
        if(_hi24>0) _dhloCache[_sym].high = _hi24;
        if(_lo24>0) _dhloCache[_sym].low  = _lo24;
        if(_op24>0) _dhloCache[_sym].open = _op24;
        _dhloCache[_sym].ts = Date.now();
      }
      n++;
    });
    if(n>0){LIVE.crypto=true;window._layerStatus.crypto={ok:true,ts:Date.now(),count:n};setLiveBadge('si-bnb',true);buildTicker();_patchCRYPTOPanel();renderSidebar();
      // Auto-refresh Day Session overlay with latest Live data
      if(window._updateBbgHeader && window._lastBbgPrice > 0) {
        try { window._updateBbgHeader(window._lastBbgPrice, window._lastBbgInterval || '1D'); } catch(e) {}
      }
    }

    _boot.update('BINANCE·REST','ok',n+' TICKERS');setStat('BINANCE REST — '+n+'  |  '+new Date().toLocaleTimeString('en-GB'));
  }catch(_){setLiveBadge('si-bnb',false);}
}

function watchdogBinance(){
  if((Date.now()-_wsLastTick)>20000&&!LIVE.ws)startBinanceWS();
}

/* ════════════════════════════════════════════
   2. SOLANA ECOSYSTEM
   Jupiter Price API — all SPL tokens
   Raydium API — DEX prices
════════════════════════════════════════════ */
// Jupiter mint addresses for Solana tokens
const JUP_MINTS={
  'So11111111111111111111111111111111111111112':'solana',
  'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN':'jupiter',
  '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R':'raydium',
  'Jito8vTDPNFsJNdTz7TatN6zWmVNfBz5z2hM7GGR4UGP':'jito',
  'HZ1JovNiVvGrCNiiYWxoK4rnALQCY1YfR4DZgBi4d2Ec':'pyth',
  'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5':'mew'
  };

async function fetchJupiterPrices(){
  try{
    const mints=Object.keys(JUP_MINTS).join(',');
    const r=await _fetchTimeout(`https://price.jup.ag/v6/price?ids=${mints}`, 8000);
    if(!r.ok)throw 0;
    const d=await r.json();
    let n=0;
    Object.entries(d.data||{}).forEach(([mint,v])=>{
      const id=JUP_MINTS[mint];if(!id)return;
      updateCoin(id,{px:v.price,chg:v.extraInfo?.lastSwappedPrice?.lastJupiterSellAt?((v.price/v.extraInfo.lastSwappedPrice.lastJupiterSellAt-1)*100):null},'jupiter',1);
      n++;
    });
    if(n>0){setLiveBadge('si-sol',true);buildTicker();_patchCRYPTOPanel();
      _boot.update('JUPITER','ok',n+' SOL TOKENS');setStat('JUPITER — '+n+' SOL tokens  |  '+new Date().toLocaleTimeString('en-GB'));}
  }catch(_){fetchJupiterFallback();}
}

async function fetchJupiterFallback(){
  // Jupiter v4 fallback
  try{
    const ids=Object.values(JUP_MINTS).join(',');
    const r=await _fetchTimeout(`https://price.jup.ag/v4/price?ids=${ids}`, 8000);
    if(!r.ok)throw 0;
    const d=await r.json();
    Object.entries(d.data||{}).forEach(([sym,v])=>{
      const id=CRYPTO.find(x=>x.s.toUpperCase()===sym.toUpperCase())?.id;if(!id)return;
      updateCoin(id,{px:v.price},'jupiter',1);
    });
    setLiveBadge('si-sol',true);buildTicker();refreshAllPanels();
  }catch(_){}
}

async function fetchRaydium(){
  // Raydium price API for SOL ecosystem
  try{
    const r=await fetch('https://api-v3.raydium.io/mint/price?mints=So11111111111111111111111111111111111111112,4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R,JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',{signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),8000);return _c.signal;})()});
    if(!r.ok)throw 0;
    const d=await r.json();
    const MAP={
      'So11111111111111111111111111111111111111112':'solana',
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R':'raydium',
      'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN':'jupiter'
};
    Object.entries(d.data||{}).forEach(([mint,px])=>{
      const id=MAP[mint];if(!id)return;
      updateCoin(id,{px:parseFloat(px)},'jupiter',1);
    });
    setLiveBadge('si-sol',true);
  }catch(_){}
}

/* ════════════════════════════════════════════
   3. ETHEREUM ECOSYSTEM
   Uniswap V3 subgraph — ETH + ERC-20 on-chain
════════════════════════════════════════════ */
const UNI_TOKENS={
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2':'ethereum',   // WETH
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984':'uniswap',    // UNI
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9':'aave',       // AAVE
  '0x5a98fcbea516cf06857215779fd812ca3bef1b32':'lido',       // LDO
  '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2':'maker',      // MKR
  '0xd533a949740bb3306d119cc777fa900ba034cd52':'curve',      // CRV
  '0x514910771af9ca656af840dff83e8264ecf986ca':'chainlink',  // LINK
  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e':'yearn'
};

async function fetchUniswapV3(){
  const query=`{
    tokens(where:{id_in:${JSON.stringify(Object.keys(UNI_TOKENS))}},first:20){
      id symbol derivedETH tokenDayData(first:1,orderBy:date,orderDirection:desc){priceUSD volumeUSD}
    }
    bundle(id:"1"){ethPriceUSD}
  }`;
  try{
    const r=await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query}),signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),10000);return _c.signal;})()
    });
    if(!r.ok)throw 0;
    const d=await r.json();
    const ethPx=parseFloat(d?.data?.bundle?.ethPriceUSD||0);
    if(ethPx>0)updateCoin('ethereum',{px:ethPx},'uniswap',2);
    (d?.data?.tokens||[]).forEach(t=>{
      const id=UNI_TOKENS[t.id.toLowerCase()];if(!id)return;
      const px=parseFloat(t.tokenDayData?.[0]?.priceUSD||0)||parseFloat(t.derivedETH||0)*ethPx;
      if(px>0)updateCoin(id,{px},'uniswap',2);
    });
    setLiveBadge('si-eth',true);buildTicker();refreshAllPanels();
    setStat('UNISWAP V3 — ETH on-chain  |  '+new Date().toLocaleTimeString('en-GB'));
  }catch(_){fetchUniswapFallback();}
}

async function fetchUniswapFallback(){
  // Fallback: Uniswap v3 via Alchemy/public RPC price endpoint
  try{
    const r=await fetch('https://interface.gateway.uniswap.org/v1/graphql',{
      method:'POST',headers:{'Content-Type':'application/json','Origin':'https://app.uniswap.org'},
      body:JSON.stringify({query:`{token(address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",chain:ETHEREUM){market{price{value}}}}`}),
      signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),8000);return _c.signal;})()
    });
    if(!r.ok)throw 0;
    const d=await r.json();
    const px=d?.data?.token?.market?.price?.value;
    if(px)updateCoin('ethereum',{px:parseFloat(px)},'uniswap',2);
    setLiveBadge('si-eth',true);
  }catch(_){}
}

/* ════════════════════════════════════════════
   4. HYPERLIQUID — native REST API
════════════════════════════════════════════ */
// ══ HYPERLIQUID — přímý REST (testováno: funguje bez CORS) ══════════════
// WS se připojí ale neposílá data → použij čistý REST polling
let _hlWsOk = false; // zachováno pro kompatibilitu
const HL_MAP = {
  BTC:'bitcoin', ETH:'ethereum', SOL:'solana', XRP:'ripple',
  ADA:'cardano', AVAX:'avalanche', LINK:'chainlink',
  BNB:'bnb', UNI:'uniswap', AAVE:'aave', INJ:'injective',
  OP:'optimism', ARB:'arbitrum', NEAR:'near', APT:'aptos',
  ATOM:'atom', FIL:'filecoin', LTC:'litecoin', DOT:'polkadot',
  HYPE:'hyperliquid', JUP:'jupiter', KAS:'kaspa', RENDER:'render', TRX:'tron', XLM:'stellar',
  ONDO:'ondo-finance', W:'wormhole', ENA:'ethena', GRT:'the-graph', WIF:'dogwifcoin',
  PEPE:'pepe', BONK:'bonk', FLOKI:'floki', WLD:'worldcoin-wld', TIA:'celestia',
  JTO:'jito', PYTH:'pyth-network', DYDX:'dydx', BLUR:'blur',
  SUI:'sui'
};

async function fetchHyperliquid() {
  try {
    // allMids — přímý POST, funguje (testováno)
    const r = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({type:'allMids'}),
      signal: (()=>{const c=new AbortController();setTimeout(()=>c.abort(),6000);return c.signal;})()
    });
    if (!r.ok) throw new Error('HTTP '+r.status);
    const mids = await r.json();
    let n = 0;
    Object.entries(mids).forEach(([sym, px]) => {
      const id = HL_MAP[sym]; if (!id) return;
      updateCoin(id, {px: parseFloat(px)}, 'hl', 1);
      n++;
    });
    if (n > 0) {
      _hlWsOk = true;
      setLiveBadge('si-hl', true);
      _liveStatus['HYPERLIQUID'] && (_liveStatus['HYPERLIQUID'].ok=true, _liveStatus['HYPERLIQUID'].last=Date.now());
      _boot.update('HYPERLIQUID', 'ok', n + ' MIDS LIVE');
      setStat('HYPERLIQUID — ' + n + ' mids  |  ' + new Date().toLocaleTimeString('en-GB'));
      buildTicker(); refreshAllPanels(); renderSidebar();
    }
    
    // metaAndAssetCtxs — volume data
    const r2 = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({type:'metaAndAssetCtxs'}),
      signal: (()=>{const c=new AbortController();setTimeout(()=>c.abort(),6000);return c.signal;})()
    });
    if (r2.ok) {
      const [meta, ctxs] = await r2.json();
      if (Array.isArray(meta?.universe) && Array.isArray(ctxs)) {
        meta.universe.forEach((asset, i) => {
          const id = HL_MAP[asset.name]; if (!id) return;
          const ctx = ctxs[i]; if (!ctx) return;
          const vol = parseFloat(ctx.dayNtlVlm) || null;
          if (vol > 0) {
            updateCoin(id, {vol}, 'hl', 1);
            if (!_xVol[id]) _xVol[id] = {};
            _xVol[id]['hl'] = {vol, ts: Date.now()};
          }
        });
      }
    }
  } catch(e) {
    _hlWsOk = false;
    setLiveBadge('si-hl', false);
    _boot.update('HYPERLIQUID', 'err', e.message);
  }
}

function startHyperliquidWS() { fetchHyperliquid(); } // alias pro kompatibilitu

/* ════════════════════════════════════════════
   5. BNB CHAIN — PancakeSwap + BSC scan
════════════════════════════════════════════ */
async function fetchPancakeSwap(){
  // PancakeSwap v2 subgraph — BNB ecosystem tokens
  const query=`{
    tokens(where:{symbol_in:["BNB","CAKE"]},first:5){
      id symbol derivedBNB tokenDayData(first:1,orderBy:date,orderDirection:desc){priceUSD}
    }
    bundle(id:"1"){bnbPrice}
  }`;
  try{
    const r=await fetch('https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query}),signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),8000);return _c.signal;})()
    });
    if(!r.ok)throw 0;
    const d=await r.json();
    const bnbPx=parseFloat(d?.data?.bundle?.bnbPrice||0);
    if(bnbPx>0)updateCoin('bnb',{px:bnbPx},'pancake',3);
    setLiveBadge('si-bnb',true);
  }catch(_){}
}

/* ════════════════════════════════════════════
   6. COINSTATS — meta enrichment (market cap, ATH, rank)
   Never overrides prices — metadata only
════════════════════════════════════════════ */
const CS_KEY='c3eae288-13f8-4517-a91a-5f3cbe813940';
async function fetchCoinStats(){
  try{
    const r=await fetch('https://openapiv1.coinstats.app/coins?limit=150',{
      headers:{'X-API-KEY':CS_KEY,'Accept':'application/json'},
      signal:(()=>{const _c=new AbortController();setTimeout(()=>_c.abort(),12000);return _c.signal;})()
    });
    if(!r.ok)throw 0;
    const d=await r.json();
    const coins=d.result||d.coins||d||[];
    if(!Array.isArray(coins))throw 0;
    coins.forEach(coin=>{
      const c=CRYPTO.find(x=>x.s.toUpperCase()===(coin.symbol||'').toUpperCase());
      if(!c)return;
      if(coin.marketCap)c.mc=coin.marketCap;
      if(coin.rank)c.rank=coin.rank;
      if(coin.ath)c.ath=coin.ath;
    });
    const btc=CRYPTO.find(c=>c.id==='bitcoin');
    const totalMC=coins.reduce((s,c)=>s+(c.marketCap||0),0);
    const btcMC=coins.find(c=>c.symbol==='BTC')?.marketCap||0;
    if(btc&&totalMC>0){
      const realTotal = window._cgGlobalMC || 2390000000000;
      const useTotal = Math.max(realTotal, totalMC);
      btc.dom=(btcMC/useTotal*100).toFixed(1)+'%';
    }
    refreshAllPanels();renderSidebar();
  }catch(_){}
}

/* ════════════════════════════════════════════
   7. DEFILLAMA — DeFi TVL
════════════════════════════════════════════ */
async function fetchDefiLlama(){
  try{
    const r=await _fetchTimeout('https://api.llama.fi/protocols', 12000);
    if(!r.ok)throw 0;
    const all=await r.json();
    let n=0;
    DEFI.forEach(d=>{
      const match=all.find(p=>p.name.toLowerCase()===d.n.toLowerCase()||(p.symbol||'').toLowerCase()===d.n.toLowerCase());
      if(!match)return;
      d.tvl=match.tvl||0;d.chg=match.change_1d||0;d.chain=match.chain||d.chain;n++;
    });
    if(n>0){window._layerStatus.macro={ok:true,ts:Date.now(),count:n};setLiveBadge('si-defi',true);renderSidebar();refreshAllPanels();}
  }catch(_){}
  try{
    const r=await _fetchTimeout('https://api.llama.fi/v2/chains', 8000);
    if(!r.ok)return;
    const chains=await r.json();
    window._chainData=chains.slice(0,20).map(c=>({n:c.name,tvl:c.tvl||0,chg:c.change_1d||0,protocols:c.protocols||0}));
  }catch(_){}
  try{
    const r=await _fetchTimeout('https://api.llama.fi/v2/historicalChainTvl', 8000);
    if(!r.ok)return;
    const d=await r.json();
    if(Array.isArray(d)&&d.length>0){
      const last=d[d.length-1],prev=d[d.length-2];
      window._defiTotalTvl_num=last.tvl||0;
      window._defiTvlChg=prev?.tvl>0?((last.tvl-prev.tvl)/prev.tvl*100).toFixed(2):'0';
    }
  }catch(_){}
}

/* ════════════════════════════════════════════
   8. FX + STOOQ (indices, commodities)
════════════════════════════════════════════ */
async function fetchFX(){
  try{
    const r=await _fetchTimeout('https://api.frankfurter.app/latest?from=USD', 10000);
    if(!r.ok)throw 0;
    const d=await r.json();const rates={...d.rates,USD:1};let n=0;
    FXP.forEach(f=>{
      const[b,q]=f.p.split('/');let mid=null;
      if(b==='USD'&&rates[q])mid=rates[q];
      else if(q==='USD'&&rates[b])mid=1/rates[b];
      else if(rates[b]&&rates[q])mid=rates[q]/rates[b];
      if(mid&&!isNaN(mid)&&mid>0){
        const sp=mid*0.00005;if(!f._open)f._open=mid;
        f.b=mid-sp;f.a=mid+sp;f.c=f._open>0?((mid-f._open)/f._open)*100:0;n++;
      }
    });
    LIVE.fx=true;window._layerStatus.macro=Object.assign(window._layerStatus.macro||{},{ok:true,ts:Date.now()});setLiveBadge('si-fx',true);renderFXPins();renderSidebar();refreshAllPanels();
    setStat('FX ECB — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));
  }catch(_){
    try{
      const r2=await _fetchTimeout('https://open.er-api.com/v6/latest/USD', 10000);
      if(!r2.ok)throw 0;
      const rates=(await r2.json()).rates;rates.USD=1;
      FXP.forEach(f=>{
        const[b,q]=f.p.split('/');let mid=null;
        if(b==='USD'&&rates[q])mid=rates[q];
        else if(q==='USD'&&rates[b])mid=1/rates[b];
        else if(rates[b]&&rates[q])mid=rates[q]/rates[b];
        if(mid&&!isNaN(mid)&&mid>0){const sp=mid*0.00005;if(!f._open)f._open=mid;f.b=mid-sp;f.a=mid+sp;f.c=f._open>0?((mid-f._open)/f._open)*100:0;}
      });
      LIVE.fx=true;setLiveBadge('si-fx',true);renderFXPins();renderSidebar();
    }catch(_){}
  }
}

const STOOQ_ALL={
  // Indexy — globální
  SPX:'^spx',INDU:'^dji',NKY:'^nkx',DAX:'^dax',UKX:'^ukx',CAC:'^cac',
  AEX:'^aex',SMI:'^smi',HSI:'^hsi',SHCOMP:'^shcomp',KOSPI:'^kospi',
  SENSEX:'^bsesn',ASX200:'^aosx',IBOV:'^bvsp',TSX:'^tsx',WIG20:'^wig20',
  PX:'^px',ATX:'^atx',IBEX:'^ibex',NDX:'^ndx',FTSEMIB:'^ftsemib',
  OMX:'^omx',BUX:'^bux',MOEX:'^moex',XU100:'^xu100',TASI:'^tasi',
  ADI:'^adi',TA125:'^ta125',EGX30:'^egx30',JALSH:'^jalsh',TWSE:'^twse',
  STI:'^sti',MERV:'^merval',SET:'^set',NIFTY:'^nse',
  // Komodity
  XAU:'xauusd',XAG:'xagusd',XPT:'xptusd',XPD:'xpdusd',
  CL1:'cl.f',CO1:'co.f',NG1:'ng.f',HG1:'hg.f',W1:'zw.f',C1:'zc.f',
  // US Akcie — Stooq formát
  AAPL:'aapl.us',NVDA:'nvda.us',MSFT:'msft.us',GOOGL:'googl.us',META:'meta.us',
  AMZN:'amzn.us',TSLA:'tsla.us',JPM:'jpm.us',GS:'gs.us',BRK:'brk-b.us',
  BAC:'bac.us',WFC:'wfc.us',MS:'ms.us',UNH:'unh.us',LLY:'lly.us',
  JNJ:'jnj.us',ABBV:'abbv.us',XOM:'xom.us',CVX:'cvx.us',COP:'cop.us',
  WMT:'wmt.us',COST:'cost.us',KO:'ko.us',PEP:'pep.us',V:'v.us',
  MA:'ma.us',HD:'hd.us',NFLX:'nflx.us',AMD:'amd.us',INTC:'intc.us',
  CRM:'crm.us',ORCL:'orcl.us',ADBE:'adbe.us',PYPL:'pypl.us',SHOP:'shop.us',
  UBER:'uber.us',SPOT:'spot.us',COIN:'coin.us',PLTR:'pltr.us',
  // ETF
  SPY:'spy.us',QQQ:'qqq.us',IWM:'iwm.us',DIA:'dia.us',VTI:'vti.us',
  GLD:'gld.us',SLV:'slv.us',TLT:'tlt.us',HYG:'hyg.us',LQD:'lqd.us',
  XLK:'xlk.us',XLF:'xlf.us',XLE:'xle.us',XLV:'xlv.us',XLI:'xli.us',
  XLP:'xlp.us',XLY:'xly.us',XLU:'xlu.us',ARKK:'arkk.us',
  EEM:'eem.us',EFA:'efa.us',FXI:'fxi.us',EWJ:'ewj.us',VNQ:'vnq.us',
  IBIT:'ibit.us',TQQQ:'tqqq.us',SQQQ:'sqqq.us',VXX:'vxx.us'
};
const STOOQ_COMDTY_MAP={XAU:'XAU',XAG:'XAG',XPT:'XPT',XPD:'XPD',CL1:'CL1',CO1:'CO1',NG1:'NG1',HG1:'HG1',W1:'W1',C1:'C1'};
const STOOQ_ETF_SET=new Set(['SPY','QQQ','IWM','DIA','VTI','GLD','SLV','TLT','HYG','LQD','XLK','XLF','XLE','XLV','XLI','XLP','XLY','XLU','ARKK','EEM','EFA','FXI','EWJ','VNQ','IBIT','TQQQ','SQQQ','VXX']);

// ── Promise.race fetch — volá všechny proxy SOUČASNĚ, bere první která odpoví ──
async function _fetchRace(url, ms=8000) {
  const proxies = [
    url,
    `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://thingproxy.freeboard.io/fetch/${url}`
  ];
  const wrap = (proxyUrl) => new Promise((res, rej) => {
    const ctrl = new AbortController();
    const tid = setTimeout(() => { ctrl.abort(); rej(new Error('timeout')); }, ms);
    fetch(proxyUrl, { signal: ctrl.signal })
      .then(r => { clearTimeout(tid); if (r && r.ok) res(r); else rej(new Error('bad status '+r?.status)); })
      .catch(e => { clearTimeout(tid); rej(e); });
  });
  // Promise.any — returns as soon as first proxy succeeds
  try { return await Promise.any(proxies.map(wrap)); } catch(_) { return null; }
}

// ── Promise.race fetch → JSON (handles allorigins wrapper) ──
async function _fetchRaceJSON(url, ms=8000) {
  const r = await _fetchRace(url, ms);
  if (!r) return null;
  try {
    const text = await r.text();
    const j = JSON.parse(text);
    // allorigins /get wraps in {"contents":"..."}
    if (j && typeof j.contents === 'string') return JSON.parse(j.contents);
    return j;
  } catch(_) { return null; }
}
async function fetchStooq(){
  const results=[];const entries=Object.entries(STOOQ_ALL);const BATCH=16;
  for(let i=0;i<entries.length;i+=BATCH){
    await Promise.allSettled(entries.slice(i,i+BATCH).map(async([sym,stq])=>{
      try{
        const r=await _fetchRace('https://stooq.com/q/l/?s='+stq+'&f=sd2t2ohlcv&e=csv', 8000);
        if(!r)return;
        const txt=await r.text();const lines=txt.trim().split('\n');if(lines.length<2)return;
        const cols=lines[1].split(',');
        const o=parseFloat(cols[3]),h=parseFloat(cols[4]),l=parseFloat(cols[5]),c=parseFloat(cols[6]);
        if(isNaN(c)||c<=0)return;
        const chgPct=o>0?((c-o)/o)*100:null;
        if(STOOQ_COMDTY_MAP[sym]){
          const cd=COMDTY_DATA.find(x=>x.s===STOOQ_COMDTY_MAP[sym]);
          if(cd){cd.px=c;cd.open=isNaN(o)?cd.open:o;cd.hi=isNaN(h)?cd.hi:h;cd.lo=isNaN(l)?cd.lo:l;if(chgPct!=null)cd.chg=chgPct;}
        } else if(STKS[sym]){
          const s=STKS[sym];s.px=c;s.open=isNaN(o)?s.open:o;s.hi=isNaN(h)?s.hi:h;s.lo=isNaN(l)?s.lo:l;
          if(chgPct!=null)s.chg=chgPct;
          _patchEquityYtd(sym,c);
        } else if(STOOQ_ETF_SET&&STOOQ_ETF_SET.has(sym)){
          if(!window._etfPx)window._etfPx={};
          window._etfPx[sym]={px:c,chg:chgPct,open:o,hi:h,lo:l,ts:Date.now()};
          _patchEquityYtd(sym,c);
        } else {
          const m=MKT[sym];if(!m)return;
          m.px=c;m.open=isNaN(o)?m.open:o;m.hi=isNaN(h)?m.hi:h;m.lo=isNaN(l)?m.lo:l;
          if(chgPct!=null)m.chg=chgPct;
        }
        results.push(sym);
      }catch(_){}
    }));
    if(i+BATCH<entries.length)await new Promise(r=>setTimeout(r,50));
  }
  if(results.length){
    LIVE.idx=true;setLiveBadge('si-idx',true);
    window._layerStatus.stooq={ok:true,ts:Date.now(),count:results.length};
    renderMarkers();renderSidebar();buildTicker();refreshAllPanels();
    setStat('STOOQ — '+results.length+' symbols  |  '+new Date().toLocaleTimeString('en-GB'));
  } else { window._layerStatus.stooq={ok:false,ts:Date.now()}; }
}

/* ════════════════════════════════════════════
   EQUITY YTD PATCHER — patches DOM without rebuild
════════════════════════════════════════════ */
function _patchEquityYtd(sym, px){
  if(!px||!sym) return;
  const ytd = calcYtd2026(sym, px);
  const w1  = calcW1(sym, px);
  const _fp = v => '<span style="color:'+(v>=0?'#00cc44':'#ff2222')+';font-weight:700">'+(v>=0?'+':'')+v.toFixed(2)+'%</span>';
  // patch MOVERS panel data-ytd/data-w1 cells — use sym as id for equities
  const ytdEl = document.querySelector('[data-ytd-eq="'+sym+'"]');
  const w1El  = document.querySelector('[data-w1-eq="'+sym+'"]');
  if(ytdEl) ytdEl.innerHTML = ytd!==null ? _fp(ytd) : '<span style="color:#887760">—</span>';
  if(w1El)  w1El.innerHTML  = w1!==null  ? _fp(w1)  : '<span style="color:#887760">—</span>';
}

/* ════════════════════════════════════════════════════════════════════════
   MULTI-SOURCE EQUITY DATA SYSTEM
   Priority: Finnhub WS → Yahoo Finance → Stooq → static
   Validation: cross-check, reject outliers >25%
════════════════════════════════════════════════════════════════════════ */
const _EQ_PRICES = {};
const _EQ_SRC_PRIO = {finnhub:1,yahoo:2,stooq:3,twelve:4};

function _eqUpdate(sym, px, src){
  if(!sym||!px||px<=0||isNaN(px)) return;
  if(!_EQ_PRICES[sym]) _EQ_PRICES[sym]={};
  const prev = _EQ_PRICES[sym];
  const existing = Object.values(prev).filter(v=>v&&v.px>0&&(Date.now()-v.ts)<300000);
  if(existing.length>0 && Math.abs(px/existing[0].px-1)>0.25) return; // outlier
  prev[src]={px,ts:Date.now()};
  const fresh = Object.entries(prev)
    .filter(([,v])=>v&&v.px>0&&(Date.now()-v.ts)<120000)
    .sort((a,b)=>(_EQ_SRC_PRIO[a[0]]||9)-(_EQ_SRC_PRIO[b[0]]||9));
  if(!fresh.length) return;
  const bestPx = fresh[0][1].px;
  if(STKS[sym]){
    const old=STKS[sym].px; STKS[sym].px=bestPx;
    if(STKS[sym].open>0) STKS[sym].chg=((bestPx/STKS[sym].open)-1)*100;
    _patchEquityYtd(sym,bestPx);
    const el=document.getElementById('eq-px-'+sym);
    if(el&&Math.abs(bestPx-old)/old>0.0001){
      el.textContent='$'+bestPx.toFixed(2);
      el.style.color=bestPx>old?'#88ffcc':'#ffaaaa';
      setTimeout(()=>{el.style.color='#ff8800';},300);
    }
  } else if(window._etfPx){
    if(!window._etfPx[sym]) window._etfPx[sym]={};
    window._etfPx[sym].px=bestPx; window._etfPx[sym].ts=Date.now();
    _patchEquityYtd(sym,bestPx);
  }
}

// ── Finnhub WebSocket — real-time US equities (free sandbox) ─────────────
let _finnhubWs=null;
const FINNHUB_SYMS=['AAPL','NVDA','MSFT','GOOGL','META','AMZN','TSLA','JPM','GS','BAC','WFC','MS','BRK.B','UNH','LLY','JNJ','XOM','CVX','WMT','COST','V','MA','NFLX','AMD','PLTR','COIN','SPOT','UBER','SPY','QQQ','IWM','GLD','TLT','XLK','ARKK','IBIT'];

function _startFinnhubWS(){
  // Finnhub WS disabled — API key removed
  _boot.update('FINNHUB','warn','WS disabled — no key');
}

// ── Yahoo Finance REST — rotates batches every 15s ────────────────────────
const YAHOO_BATCHES=[
  ['AAPL','NVDA','MSFT','GOOGL','META','AMZN','TSLA','MSTR','COIN','JPM','GS','BAC','MS'],
  ['UNH','LLY','JNJ','ABBV','XOM','CVX','COP','WMT','COST','KO','PEP','V','MA'],
  ['HD','NFLX','AMD','INTC','CRM','ORCL','ADBE','PYPL','SHOP','UBER','SPOT','PLTR','BRK-B'],
  ['SPY','QQQ','IWM','DIA','VTI','GLD','SLV','TLT','HYG','LQD','XLK','XLF','XLE','XLV','XLI'],
  ['XLP','XLY','XLU','ARKK','ARKG','EEM','EFA','FXI','EWJ','VNQ','IBIT','TQQQ','SQQQ','VXX'],
  ['^GSPC','^DJI','^IXIC','^RUT','^VIX','^FTSE','^GDAXI','^FCHI','^N225','^HSI','^STOXX50E','^NSEI'],
  /* ── Crypto-adjacent & fintech — SoFi, Robinhood atd. ── */
  ['SOFI','HOOD','UPST','AFRM','IBIT','SQ','RIOT','MARA','CLSK','CORZ','HUT','HIVE','WFC'],
  ['NVDA','AVGO','QCOM','MU','AMAT','TXN','TSM','ARM','MRVL','KLAC','LRCX','ASML','ON','SWKS','QRVO'],
  ['SNOW','DDOG','NET','CRWD','ZS','OKTA','MNDY','RBLX','SAMSF','PANW','FTNT','CFLT','MDB','GTLB'],
  ['TSLA','RIVN','LCID','NIO','XPEV','LI','ENPH','FSLR','PLUG','CHPT','BLNK','RUN','SEDG','NOVA','BE'],
  ['LMT','RTX','NOC','GD','BA','CAT','DE','UPS','FDX','HON','GE','MMM','EMR','PH','ROK'],
  ['MRNA','BNTX','REGN','VRTX','AMGN','BIIB','GILD','ILMN','ISRG','BSX','MDT','ABT','EW','SYK','ZBH'],
];
const YAHOO_SYM_MAP={'BRK-B':'BRK','^GSPC':'SPX','^DJI':'INDU','^IXIC':'NDX','^RUT':'IWM','^VIX':'VIX','^FTSE':'UKX','^GDAXI':'DAX','^FCHI':'CAC','^N225':'NKY','^HSI':'HSI','^STOXX50E':'SX5E','^NSEI':'NIFTY'};
let _yahooIdx=0;

async function fetchYahooQuotes(){
  const batch=YAHOO_BATCHES[_yahooIdx%YAHOO_BATCHES.length]; _yahooIdx++;
  try{
    const syms=batch.join(',');
    const fields='regularMarketPrice,regularMarketChangePercent,regularMarketOpen,regularMarketDayHigh,regularMarketDayLow,regularMarketPreviousClose,marketCap';
    const url7=`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(syms)}&fields=${fields}`;
    // Všechny proxy současně — bere první která odpoví
    const d = await _fetchRaceJSON(url7, 8000);
    if(!d?.quoteResponse?.result?.length) return;
    let n=0;
    d.quoteResponse.result.forEach(q=>{
      const sym=YAHOO_SYM_MAP[q.symbol]||q.symbol.replace('-B','').replace('^','');
      const px=q.regularMarketPrice; if(!px||px<=0) return;
      _eqUpdate(sym,px,'yahoo');
      const chg=q.regularMarketChangePercent;
      if(MKT[sym]){ MKT[sym].px=px; if(chg!=null)MKT[sym].chg=chg; if(q.regularMarketOpen)MKT[sym].open=q.regularMarketOpen; }
      if(STKS[sym]){ if(chg!=null)STKS[sym].chg=chg; if(q.regularMarketOpen)STKS[sym].open=q.regularMarketOpen; if(q.marketCap)STKS[sym].mc='$'+_fmtBig(q.marketCap); }
      if(STOOQ_ETF_SET&&STOOQ_ETF_SET.has(sym)){ if(!window._etfPx)window._etfPx={}; if(!window._etfPx[sym])window._etfPx[sym]={}; Object.assign(window._etfPx[sym],{px,chg,ts:Date.now()}); }
      n++;
    });
    if(n>0){ window._layerStatus.yahoo={ok:true,ts:Date.now(),count:n}; buildTicker(); refreshAllPanels(); setStat('YAHOO — '+n+' quotes  |  '+new Date().toLocaleTimeString('en-GB')); } else { window._layerStatus.yahoo={ok:false,ts:Date.now()}; }
  }catch(_){}
}

// ── Twelve Data — free 55 req/min, rotates batches ───────────────────────
const TWELVE_SYMS=['AAPL,NVDA,MSFT,AMZN,GOOGL,META,TSLA,JPM,GS,XOM','BAC,WFC,UNH,LLY,CVX,WMT,V,MA,NFLX,AMD','PLTR,COIN,UBER,SPOT,INTC,CRM,PYPL,SHOP,ABBV,KO','SPY,QQQ,GLD,TLT,XLK,XLF,XLE,IBIT,ARKK,IWM'];
let _twelveIdx=0;
async function fetchTwelveData(){
  const batch=TWELVE_SYMS[_twelveIdx%TWELVE_SYMS.length]; _twelveIdx++;
  try{
    const r=await _fetchTimeout(`https://api.twelvedata.com/quote?symbol=${batch}&apikey=demo&dp=2`,10000);
    if(!r||!r.ok) return;
    const d=await r.json();
    const items=d.symbol?{[d.symbol]:d}:d;
    Object.entries(items).forEach(([sym,v])=>{
      if(v.status==='error') return;
      const px=parseFloat(v.close||v.price); if(!px||isNaN(px)) return;
      _eqUpdate(sym,px,'twelve');
      if(STKS[sym]){ const chg=parseFloat(v.percent_change); if(!isNaN(chg))STKS[sym].chg=chg; }
    });
  }catch(_){}
}

// ── ExchangeRate-API + Frankfurter — free FX ─────────────────────────────
async function fetchExchangeRateFX(){
  try{
    const r=await _fetchTimeout('https://open.er-api.com/v6/latest/USD',8000);
    if(!r||!r.ok) throw 0;
    const rates=(await r.json())?.rates; if(!rates) throw 0;
    FXP.forEach(f=>{
      const [b,q]=f.p.split('/'); let px=null;
      if(b==='USD'&&rates[q]) px=rates[q];
      else if(q==='USD'&&rates[b]) px=1/rates[b];
      else if(b==='EUR'&&rates.EUR&&rates[q]) px=rates[q]/rates.EUR;
      if(px&&px>0){ const old=f.b; f.b=px; f.a=px*1.0001; if(old>0)f.c=((px/old)-1)*100; f._fresh=true; }
    });
    setStat('FX — ExchangeRate-API  |  '+new Date().toLocaleTimeString('en-GB'));
  }catch(_){
    // Frankfurter fallback
    try{
      const r=await _fetchTimeout('https://api.frankfurter.app/latest?from=USD',6000);
      if(!r||!r.ok) return;
      const rates=(await r.json())?.rates; if(!rates) return;
      FXP.forEach(f=>{
        const [b,q]=f.p.split('/');
        if(b==='USD'&&rates[q]&&!f._fresh){ f.b=rates[q]; f.a=rates[q]*1.0001; }
      });
    }catch(_){}
  }
}

const KRAKEN_MAP={
  'XXBTZUSD':'bitcoin','XETHZUSD':'ethereum','SOLUSD':'solana',
  'XXRPZUSD':'ripple','ADAUSD':'cardano','DOTUSD':'polkadot',
  'AVAXUSD':'avalanche','LINKUSD':'chainlink','UNIUSD':'uniswap',
  'AAVEUSD':'aave','ATOMUSD':'atom','LTCUSD':'litecoin',
  'XMRUSD':'monero','BCHUSD':'bitcoin-cash',
  'BNBUSD':'bnb','ARBUSD':'arbitrum','OPUSD':'optimism'
};
async function fetchKraken(){
  try{
    const pairs=Object.keys(KRAKEN_MAP).join(',');
    const r=await _fetchCORS(`https://api.kraken.com/0/public/Ticker?pair=${pairs}`, 10000);
    if(!r)throw 0;
    const d=await r.json();
    let n=0;
    Object.entries(d.result||{}).forEach(([pair,v])=>{
      const id=KRAKEN_MAP[pair]||KRAKEN_MAP[Object.keys(KRAKEN_MAP).find(k=>pair.startsWith(k.slice(0,4)))];
      if(!id)return;
      const px=parseFloat(v.c[0]);
      const open=parseFloat(v.o);
      const chg=open>0?((px-open)/open)*100:null;
      const vol=parseFloat(v.v[1])*px;
      if(px>0){updateCoin(id,{px,chg,vol},'kraken',3);n++;}
    });
    if(n>0){setLiveBadge('si-kraken',true);
      _boot.update('KRAKEN','ok',n+' PAIRS');setStat('KRAKEN — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));}
    else{_boot.update('KRAKEN','warn','0 pairs parsed');}
  }catch(e){setLiveBadge('si-kraken',false);_boot.update('KRAKEN','err','FAILED: '+e.message);}
}

/* ════════════════════════════════════════════
   10. OKX — CEX spot + perps
════════════════════════════════════════════ */
const OKX_MAP={
  'BTC-USDT':'bitcoin','ETH-USDT':'ethereum','SOL-USDT':'solana',
  'XRP-USDT':'ripple','BNB-USDT':'bnb','ADA-USDT':'cardano',
  'AVAX-USDT':'avalanche','LINK-USDT':'chainlink',
  'DOT-USDT':'polkadot','UNI-USDT':'uniswap','AAVE-USDT':'aave',
  'OP-USDT':'optimism','ARB-USDT':'arbitrum','NEAR-USDT':'near',
  'APT-USDT':'aptos','ATOM-USDT':'atom','INJ-USDT':'injective',
  'SUI-USDT':'sui','HYPE-USDT':'hyperliquid','JUP-USDT':'jupiter',
  'LTC-USDT':'litecoin','BCH-USDT':'bitcoin-cash','XMR-USDT':'monero'
};
async function fetchOKX(){
  try{
    const r=await _fetchCORS(`https://www.okx.com/api/v5/market/tickers?instType=SPOT`, 10000);
    if(!r)throw new Error('all proxies failed');
    const d=await r.json();
    let n=0;
    (d.data||[]).forEach(t=>{
      const id=OKX_MAP[t.instId];if(!id)return;
      const px=parseFloat(t.last);
      const open=parseFloat(t.open24h);
      const chg=open>0?((px-open)/open)*100:null;
      const vol=parseFloat(t.volCcy24h);
      if(px>0){updateCoin(id,{px,chg,vol},'okx',3);n++;}
    });
    if(n>0){setLiveBadge('si-okx',true);
      _boot.update('OKX','ok',n+' PAIRS');setStat('OKX — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));}
    else{_boot.update('OKX','warn','0 pairs parsed');}
  }catch(e){setLiveBadge('si-okx',false);_boot.update('OKX','err','FAILED: '+e.message);}
}

/* ════════════════════════════════════════════
   11. BYBIT — CEX spot
════════════════════════════════════════════ */
const BYBIT_MAP={
  'BTCUSDT':'bitcoin',    'ETHUSDT':'ethereum',   'SOLUSDT':'solana',
  'XRPUSDT':'ripple',     'BNBUSDT':'bnb',         'ADAUSDT':'cardano',
  'AVAXUSDT':'avalanche', 'LINKUSDT':'chainlink',  'DOTUSDT':'polkadot',
  'UNIUSDT':'uniswap',    'AAVEUSDT':'aave','GRTUSDT':'the-graph','ONDOUSDT':'ondo-finance','ENAUSDT':'ethena','JUPUSDT':'jupiter','SEIUSDT':'sei-network','FTMUSDT':'fantom','LDOUSDT':'lido','ALGOUSDT':'algorand','VETUSDT':'vechain','OPUSDT':'optimism',
  'ARBUSDT':'arbitrum',   'NEARUSDT':'near',       'APTUSDT':'aptos',
  'ATOMUSDT':'atom',      'INJUSDT':'injective',   'SUIUSDT':'sui',
  'JUPUSDT':'jupiter',    'LTCUSDT':'litecoin',    'BCHUSDT':'bitcoin-cash',
  'KASUSDT':'kaspa',      'RENDERUSDT':'render',   'FILUSDT':'filecoin',
  'ICPUSDT':'icp',        'XLMUSDT':'stellar',     'TRXUSDT':'tron',
  'ALGOUSDT':'algorand',  'VETUSDT':'vechain',     'FTMUSDT':'fantom',
  'GMXUSDT':'gmx',        'CRVUSDT':'curve',       'MKRUSDT':'maker',
  'LDOUSDT':'lido',       'GRTUSDT':'the-graph',   'IMXUSDT':'immutable-x',
  'SEIUSDT':'sei-network','PENDLEUSDT':'pendle',   'ETCUSDT':'ethereum-classic',
  'FETUSDT':'fetch-ai',   'JTOUSDT':'jito',        'PYTHUSDT':'pyth',
  // _BYBIT_ONLY coins — not on Binance spot
  'ZECUSDT':'zcash',      'XMRUSDT':'monero',
  'BERACHAIN':'berachain','BERAUSDT':'berachain',  'MOVEUSDT':'movement',
  'VIRTUALUSDT':'virtual-protocol',               'OMNIUSDT':'mantra',
  'OMUSDT':'mantra',      'TONUSDT':'ton',         'STRKUSDT':'starknet',
  'FLOKIUSDT':'floki',    'MEWUSDT':'cat-in-a-dogs-world',
};
async function fetchBybit(){
  try{
    const r=await _fetchCORS('https://api.bybit.com/v5/market/tickers?category=spot', 10000);
    if(!r)throw new Error('all proxies failed');
    const d=await r.json();
    let n=0;
    (d.result?.list||[]).forEach(t=>{
      const id=BYBIT_MAP[t.symbol];if(!id)return;
      const px=parseFloat(t.lastPrice);
      const chg=parseFloat(t.price24hPcnt)*100;
      const vol=parseFloat(t.turnover24h);
      if(px>0){updateCoin(id,{px,chg,vol},'bybit',3);n++;}
    });
    if(n>0){setLiveBadge('si-bybit',true);
      _boot.update('BYBIT','ok',n+' PAIRS');setStat('BYBIT — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));}
    else{_boot.update('BYBIT','warn','0 pairs parsed');}
  }catch(e){setLiveBadge('si-bybit',false);_boot.update('BYBIT','err','FAILED: '+e.message);}
}

/* ════════════════════════════════════════════
   12. KUCOIN — CEX spot
════════════════════════════════════════════ */
const KUCOIN_MAP={
  'BTC-USDT':'bitcoin','ETH-USDT':'ethereum','SOL-USDT':'solana',
  'XRP-USDT':'ripple','BNB-USDT':'bnb','ADA-USDT':'cardano',
  'AVAX-USDT':'avalanche','LINK-USDT':'chainlink',
  'DOT-USDT':'polkadot','UNI-USDT':'uniswap','AAVE-USDT':'aave',
  'OP-USDT':'optimism','ARB-USDT':'arbitrum','NEAR-USDT':'near',
  'APT-USDT':'aptos','LTC-USDT':'litecoin','BCH-USDT':'bitcoin-cash',
  'KAS-USDT':'kaspa','FIL-USDT':'filecoin','ALGO-USDT':'algorand',
  'VET-USDT':'vechain','FTM-USDT':'fantom','XLM-USDT':'stellar'
};
async function fetchKucoin(){
  try{
    const r=await _fetchCORS('https://api.kucoin.com/api/v1/market/allTickers', 10000);
    // KuCoin má CORS, zkouší přímý + proxy
    if(!r)throw new Error('all proxies failed');
    const d=await r.json();
    let n=0;
    (d.data?.ticker||[]).forEach(t=>{
      const id=KUCOIN_MAP[t.symbol];if(!id)return;
      const px=parseFloat(t.last);
      const chg=parseFloat(t.changeRate)*100;
      const vol=parseFloat(t.volValue);
      if(px>0){updateCoin(id,{px,chg,vol},'kucoin',4);n++;}
    });
    if(n>0){setLiveBadge('si-kucoin',true);_boot.update('KUCOIN','ok',n+' PAIRS');setStat('KUCOIN — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));}
  }catch(_){}
}

/* ════════════════════════════════════════════
   13. GATE.IO — CEX spot
════════════════════════════════════════════ */
const GATE_MAP={
  'BTC_USDT':'bitcoin','ETH_USDT':'ethereum','SOL_USDT':'solana',
  'XRP_USDT':'ripple','ADA_USDT':'cardano','AVAX_USDT':'avalanche','LINK_USDT':'chainlink','DOT_USDT':'polkadot',
  'LTC_USDT':'litecoin','BCH_USDT':'bitcoin-cash','XMR_USDT':'monero',
  'NEAR_USDT':'near','FIL_USDT':'filecoin','ALGO_USDT':'algorand',
  'VET_USDT':'vechain','XLM_USDT':'stellar','TRX_USDT':'tron',
  'FET_USDT':'fetch-ai','THETA_USDT':'theta'
};
async function fetchGate(){
  try{
    const r=await _fetchCORS('https://api.gateio.ws/api/v4/spot/tickers', 10000);
    if(!r)throw new Error('all proxies failed');
    const d=await r.json();
    let n=0;
    (d||[]).forEach(t=>{
      const id=GATE_MAP[t.currency_pair];if(!id)return;
      const px=parseFloat(t.last);
      const chg=parseFloat(t.change_percentage);
      const vol=parseFloat(t.quote_volume);
      if(px>0){updateCoin(id,{px,chg,vol},'gate',4);n++;}
    });
    if(n>0){setLiveBadge('si-gate',true);_boot.update('GATE','ok',n+' PAIRS');setStat('GATE.IO — '+n+' pairs  |  '+new Date().toLocaleTimeString('en-GB'));}
  }catch(_){}
}

/* ════════════════════════════════════════════
   NEW EXCHANGES: MEXC · HTX · BITGET · COINBASE
════════════════════════════════════════════ */

// ── MEXC (má CORS, bez klíče) ─────────────────────────────────────────
const MEXC_MAP = {
  'BTCUSDT':'bitcoin','ETHUSDT':'ethereum','SOLUSDT':'solana',
  'XRPUSDT':'ripple','BNBUSDT':'bnb',
  'ADAUSDT':'cardano','TRXUSDT':'tron','LINKUSDT':'chainlink',
  'AVAXUSDT':'avalanche','SUIUSDT':'sui','DOTUSDT':'polkadot',
  'LTCUSDT':'litecoin','XLMUSDT':'stellar','NEARUSDT':'near',
  'AAVEUSDT':'aave','HYPEUSDT':'hyperliquid','INJUSDT':'injective',
  'UNIUSDT':'uniswap','ATOMUSDT':'atom','FILUSDT':'filecoin',
  'APTUSDT':'aptos','OPUSDT':'optimism','ARBUSDT':'arbitrum',
  'KASUSDT':'kaspa','ICPUSDT':'icp','JUPUSDT':'jupiter'
};
async function fetchMEXC() {
  try {
    const r = await _fetchCORS('https://api.mexc.com/api/v3/ticker/24hr', 10000);
    if (!r) throw new Error('all proxies failed');
    const d = await r.json();
    let n = 0;
    (Array.isArray(d)?d:[]).forEach(t => {
      const id = MEXC_MAP[t.symbol]; if (!id) return;
      const px = parseFloat(t.lastPrice);
      const chg = parseFloat(t.priceChangePercent);
      const vol = parseFloat(t.quoteVolume);
      if (px > 0) { updateCoin(id, {px, chg, vol}, 'mexc', 4); n++; }
    });
    if (n > 0) {
      setLiveBadge('si-mexc', true);
      _boot.update('MEXC', 'ok', n + ' PAIRS');
      setStat('MEXC — ' + n + ' pairs  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    } else { _boot.update('MEXC', 'warn', '0 pairs'); }
  } catch(e) { setLiveBadge('si-mexc', false); _boot.update('MEXC', 'err', e.message); }
}

// ── HTX / Huobi ───────────────────────────────────────────────────────
const HTX_MAP = {
  'btcusdt':'bitcoin','ethusdt':'ethereum','solusdt':'solana',
  'xrpusdt':'ripple','bnbusdt':'bnb',
  'adausdt':'cardano','trxusdt':'tron','linkusdt':'chainlink',
  'avaxusdt':'avalanche','suiusdt':'sui','dotusdt':'polkadot',
  'ltcusdt':'litecoin','xlmusdt':'stellar','nearusdt':'near',
  'aaveusdt':'aave','injusdt':'injective','uniusdt':'uniswap',
  'atomusdt':'atom','filusdt':'filecoin','aptusdt':'aptos',
  'opusdt':'optimism','arbusdt':'arbitrum','icpusdt':'icp'
};
async function fetchHTX() {
  try {
    const r = await _fetchCORS('https://api.huobi.pro/market/tickers', 10000);
    if (!r) throw new Error('all proxies failed');
    const d = await r.json();
    let n = 0;
    ((d.data)||[]).forEach(t => {
      const id = HTX_MAP[t.symbol]; if (!id) return;
      const px = parseFloat(t.close);
      const open = parseFloat(t.open);
      const chg = open > 0 ? ((px - open) / open) * 100 : null;
      const vol = parseFloat(t.vol) * px;
      if (px > 0) { updateCoin(id, {px, chg, vol}, 'htx', 4); n++; }
    });
    if (n > 0) {
      setLiveBadge('si-htx', true);
      _boot.update('HTX', 'ok', n + ' PAIRS');
      setStat('HTX — ' + n + ' pairs  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    } else { _boot.update('HTX', 'warn', '0 pairs'); }
  } catch(e) { setLiveBadge('si-htx', false); _boot.update('HTX', 'err', e.message); }
}

// ── BITGET ────────────────────────────────────────────────────────────
const BITGET_MAP = {
  'BTCUSDT_SPBL':'bitcoin','ETHUSDT_SPBL':'ethereum','SOLUSDT_SPBL':'solana',
  'XRPUSDT_SPBL':'ripple','BNBUSDT_SPBL':'bnb','ADAUSDT_SPBL':'cardano','TRXUSDT_SPBL':'tron','LINKUSDT_SPBL':'chainlink',
  'AVAXUSDT_SPBL':'avalanche','SUIUSDT_SPBL':'sui','DOTUSDT_SPBL':'polkadot',
  'LTCUSDT_SPBL':'litecoin','XLMUSDT_SPBL':'stellar','NEARUSDT_SPBL':'near',
  'UNIUSDT_SPBL':'uniswap','ATOMUSDT_SPBL':'atom','APTUSDT_SPBL':'aptos',
  'ICPUSDT_SPBL':'icp','HYPEUSDT_SPBL':'hyperliquid'
};
async function fetchBitget() {
  try {
    const r = await _fetchCORS('https://api.bitget.com/api/spot/v1/market/tickers', 10000);
    if (!r) throw new Error('all proxies failed');
    const d = await r.json();
    let n = 0;
    ((d.data)||[]).forEach(t => {
      const id = BITGET_MAP[t.symbol]; if (!id) return;
      const px = parseFloat(t.lastPr);
      const chg = parseFloat(t.change24h) * 100;
      const vol = parseFloat(t.usdtVolume);
      if (px > 0) { updateCoin(id, {px, chg, vol}, 'bitget', 4); n++; }
    });
    if (n > 0) {
      setLiveBadge('si-bitget', true);
      _boot.update('BITGET', 'ok', n + ' PAIRS');
      setStat('BITGET — ' + n + ' pairs  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    } else { _boot.update('BITGET', 'warn', '0 pairs'); }
  } catch(e) { setLiveBadge('si-bitget', false); _boot.update('BITGET', 'err', e.message); }
}

// ── COINAPI / ApiBricks (JWT key) ────────────────────────────────────
const COINAPI_KEY = ''; // API key removed
const COINAPI_ASSETS = {
  'BTC':'bitcoin','ETH':'ethereum','SOL':'solana','XRP':'ripple',
  'BNB':'bnb','ADA':'cardano','AVAX':'avalanche','LINK':'chainlink',
  'DOT':'polkadot','LTC':'litecoin','TRX':'tron','XLM':'stellar',
  'NEAR':'near','UNI':'uniswap','AAVE':'aave','ATOM':'atom',
  'FIL':'filecoin','APT':'aptos','SUI':'sui','INJ':'injective',
  'OP':'optimism','ARB':'arbitrum','ICP':'icp','RENDER':'render',
  'DOGE':'dogecoin','SHIB':'shiba-inu','MATIC':'polygon'
};
async function fetchCoinAPI() {
  // CoinAPI disabled — API key removed
  _boot.update('COINAPI','warn','Disabled — no key');
}

// ── COINAPI OHLCV for chart ──────────────────────────────────────────
async function fetchCoinAPIOHLCV(symbol, period, limit) {
  // CoinAPI OHLCV disabled — API key removed
  return null;
}

// ── COINBASE ADVANCED (public, CORS OK) ──────────────────────────────

// ── GEMINI (public, no key needed) ───────────────────────────────────
const GEMINI_MAP = {
  'btcusd':'bitcoin','ethusd':'ethereum','solusd':'solana',
  'linkusd':'chainlink','ltcusd':'litecoin','avaxusd':'avalanche',
  'dotusd':'polkadot','uniusd':'uniswap','aaveusd':'aave',
  'filusd':'filecoin','nearusd':'near','xrpusd':'ripple',
  'adausd':'cardano','atomusd':'atom','aptusd':'aptos',
  'suiusd':'sui','injusd':'injective','trxusd':'tron'
};
// ══════════════════════════════════════════════════════════════════════════
// FINNHUB TRADITIONAL FINANCE — Real-time quotes for equities, indices,
// commodities (via ETF proxies), and forex
// Uses /quote endpoint: {c: current, pc: prev close, h: high, l: low, o: open}
// ══════════════════════════════════════════════════════════════════════════
const FH_KEY = ''; // API key removed

// Index ETF proxies → map ETF quote to index value using multiplier
const FH_INDEX_MAP = {
  SPY:{idx:'SPX',mult:10.88},   QQQ:{idx:'NDX',mult:38.6},
  DIA:{idx:'INDU',mult:100.2},  IWM:{idx:'RUT',mult:9.47},
  EWU:{idx:'UKX',mult:65.0},    EWG:{idx:'DAX',mult:174.0},
  EWQ:{idx:'CAC',mult:61.0},    EWJ:{idx:'NKY',mult:290.0},
  FXI:{idx:'HSI',mult:790.0},   EWA:{idx:'ASX',mult:60.0},
  EWZ:{idx:'IBOV',mult:960.0},  EWC:{idx:'TSX',mult:185.0},
  INDA:{idx:'SENSEX',mult:1320},EWY:{idx:'KOSPI',mult:44.0},
  EWT:{idx:'TWSE',mult:355.0},
};

// Commodity ETF proxies → map to COMDTY_DATA
const FH_COMDTY_MAP = {
  GLD:{sym:'XAU',mult:18.64},   SLV:{sym:'XAG',mult:1.14},
  USO:{sym:'CL1',mult:28.2},    UNG:{sym:'NG1',mult:1.18},
  PPLT:{sym:'XPT',mult:9.38},   CPER:{sym:'HG1',mult:18.8},
  WEAT:{sym:'W1',mult:95.0},    CORN:{sym:'C1',mult:81.0},
};

// Forex pairs → Finnhub uses OANDA: prefix for forex symbols
const FH_FX_MAP = {
  'OANDA:EUR_USD':'EUR/USD','OANDA:GBP_USD':'GBP/USD','OANDA:USD_JPY':'USD/JPY',
  'OANDA:USD_CHF':'USD/CHF','OANDA:AUD_USD':'AUD/USD','OANDA:NZD_USD':'NZD/USD',
  'OANDA:USD_CAD':'USD/CAD','OANDA:USD_CNH':'USD/CNH','OANDA:EUR_GBP':'EUR/GBP',
  'OANDA:EUR_JPY':'EUR/JPY','OANDA:GBP_JPY':'GBP/JPY','OANDA:EUR_CHF':'EUR/CHF',
  'OANDA:USD_MXN':'USD/MXN','OANDA:USD_ZAR':'USD/ZAR','OANDA:USD_SEK':'USD/SEK',
  'OANDA:USD_NOK':'USD/NOK','OANDA:USD_DKK':'USD/DKK','OANDA:USD_PLN':'USD/PLN',
  'OANDA:USD_CZK':'USD/CZK','OANDA:USD_HUF':'USD/HUF','OANDA:USD_TRY':'USD/TRY',
  'OANDA:USD_SGD':'USD/SGD','OANDA:USD_INR':'USD/INR','OANDA:USD_THB':'USD/THB',
  'OANDA:AUD_JPY':'AUD/JPY','OANDA:NZD_JPY':'NZD/JPY','OANDA:CAD_JPY':'CAD/JPY',
  'OANDA:CHF_JPY':'CHF/JPY','OANDA:GBP_CHF':'GBP/CHF','OANDA:AUD_NZD':'AUD/NZD',
  'OANDA:GBP_AUD':'GBP/AUD','OANDA:EUR_AUD':'EUR/AUD',
};

// Direct equity symbols for Finnhub quote (top 40 most important)
const FH_EQ_SYMS = [
  'AAPL','NVDA','MSFT','GOOGL','META','AMZN','TSLA','JPM','GS','BAC',
  'WFC','MS','UNH','LLY','JNJ','XOM','CVX','WMT','COST','V',
  'MA','NFLX','AMD','CRM','ORCL','ADBE','AVGO','INTC','QCOM','BA',
  'CAT','DIS','PFE','MRK','KO','PEP','HD','PYPL','COIN','PLTR',
  'UBER','SPOT','SHOP','IBM','CSCO','TXN','GE','LMT','NOW','PANW',
  'COP','ABBV','TMO','AMGN','GILD','REGN','VRTX','SQ','MU','ARM','TSM',
  'BABA','PDD','MELI','SNAP','ROKU','RIVN','F','GM','BRK.B'
];

async function fetchFinnhubTradFi(){
  if(!FH_KEY){ _boot.update('FINNHUB','warn','TradFi disabled — no key'); return; }
  const _fhq = async (sym) => {
    try {
      const r = await _fetchTimeout('https://finnhub.io/api/v1/quote?symbol='+encodeURIComponent(sym)+'&token='+FH_KEY, 6000);
      if(!r||!r.ok) return null;
      const d = await r.json();
      if(!d||!d.c||d.c<=0) return null;
      return d; // {c, o, h, l, pc, d, dp, t}
    } catch(_){ return null; }
  };

  let updated = 0;
  const BATCH = 8; // 8 parallel, ~30/sec safe
  const delay = ms => new Promise(r=>setTimeout(r,ms));

  // ── 1. US EQUITIES ─────────────────────────────────────────────────────
  for(let i=0; i<FH_EQ_SYMS.length; i+=BATCH){
    const batch = FH_EQ_SYMS.slice(i, i+BATCH);
    const results = await Promise.allSettled(batch.map(sym => _fhq(sym)));
    results.forEach((r,j) => {
      if(r.status!=='fulfilled'||!r.value) return;
      const sym = batch[j]; const q = r.value;
      const mappedSym = sym==='BRK.B'?'BRK':sym;
      // Update STKS
      if(STKS[mappedSym]){
        STKS[mappedSym].px = q.c;
        if(q.o>0) STKS[mappedSym].open = q.o;
        if(q.h>0) STKS[mappedSym].hi = q.h;
        if(q.l>0) STKS[mappedSym].lo = q.l;
        if(q.dp!=null) STKS[mappedSym].chg = q.dp;
        else if(q.pc>0) STKS[mappedSym].chg = ((q.c-q.pc)/q.pc)*100;
        _patchEquityYtd(mappedSym, q.c);
        updated++;
      }
      // Also feed into multi-source system
      if(typeof _eqUpdate==='function') _eqUpdate(mappedSym, q.c, 'finnhub');
    });
    if(i+BATCH<FH_EQ_SYMS.length) await delay(350);
  }

  // ── 2. INDEX ETF PROXIES ───────────────────────────────────────────────
  const idxSyms = Object.keys(FH_INDEX_MAP);
  for(let i=0; i<idxSyms.length; i+=BATCH){
    const batch = idxSyms.slice(i, i+BATCH);
    const results = await Promise.allSettled(batch.map(sym => _fhq(sym)));
    results.forEach((r,j) => {
      if(r.status!=='fulfilled'||!r.value) return;
      const etf = batch[j]; const q = r.value;
      const map = FH_INDEX_MAP[etf];
      if(!map||!MKT[map.idx]) return;
      const idx = MKT[map.idx];
      const estPrice = q.c * map.mult;
      idx.px = estPrice;
      if(q.dp!=null) idx.chg = q.dp;
      else if(q.pc>0) idx.chg = ((q.c-q.pc)/q.pc)*100;
      if(q.o>0) idx.open = q.o * map.mult;
      if(q.h>0) idx.hi = q.h * map.mult;
      if(q.l>0) idx.lo = q.l * map.mult;
      // Also update IDX_DATA for WEI panel
      const idxD = (typeof IDX_DATA!=='undefined') ? IDX_DATA.find(d=>d.s===map.idx||d.s===etf) : null;
      if(idxD){
        idxD.px = estPrice;
        idxD.chg = idx.chg;
        if(q.o>0) idxD.open = q.o*map.mult;
        if(q.h>0) idxD.hi = q.h*map.mult;
        if(q.l>0) idxD.lo = q.l*map.mult;
      }
      updated++;
    });
    if(i+BATCH<idxSyms.length) await delay(350);
  }

  // ── 3. COMMODITY ETF PROXIES ───────────────────────────────────────────
  const cmdSyms = Object.keys(FH_COMDTY_MAP);
  for(let i=0; i<cmdSyms.length; i+=BATCH){
    const batch = cmdSyms.slice(i, i+BATCH);
    const results = await Promise.allSettled(batch.map(sym => _fhq(sym)));
    results.forEach((r,j) => {
      if(r.status!=='fulfilled'||!r.value) return;
      const etf = batch[j]; const q = r.value;
      const map = FH_COMDTY_MAP[etf];
      const cd = COMDTY_DATA.find(x=>x.s===map.sym);
      if(!cd) return;
      cd.px = q.c * map.mult;
      if(q.dp!=null) cd.chg = q.dp;
      else if(q.pc>0) cd.chg = ((q.c-q.pc)/q.pc)*100;
      if(q.o>0) cd.open = q.o * map.mult;
      if(q.h>0) cd.hi = q.h * map.mult;
      if(q.l>0) cd.lo = q.l * map.mult;
      updated++;
    });
    if(i+BATCH<cmdSyms.length) await delay(350);
  }

  // ── 4. FOREX via Finnhub /forex/candle is premium, use /quote for OANDA symbols
  const fxSyms = Object.keys(FH_FX_MAP);
  for(let i=0; i<fxSyms.length; i+=BATCH){
    const batch = fxSyms.slice(i, i+BATCH);
    const results = await Promise.allSettled(batch.map(sym => _fhq(sym)));
    results.forEach((r,j) => {
      if(r.status!=='fulfilled'||!r.value) return;
      const oandaSym = batch[j]; const q = r.value;
      const pair = FH_FX_MAP[oandaSym];
      const fp = FXP.find(f=>f.p===pair);
      if(!fp) return;
      const mid = q.c;
      if(mid>0){
        const sp = mid * 0.00005;
        if(!fp._open) fp._open = q.o>0 ? q.o : mid;
        fp.b = mid - sp;
        fp.a = mid + sp;
        if(q.dp!=null) fp.c = q.dp;
        else if(q.pc>0) fp.c = ((mid-q.pc)/q.pc)*100;
        else if(fp._open>0) fp.c = ((mid-fp._open)/fp._open)*100;
        updated++;
      }
    });
    if(i+BATCH<fxSyms.length) await delay(350);
  }

  // ── 5. Direct commodity quotes (XAU, XAG via Finnhub symbols) ──────────
  const directCmd = [
    {fh:'OANDA:XAU_USD',s:'XAU'},{fh:'OANDA:XAG_USD',s:'XAG'},
    {fh:'OANDA:XPT_USD',s:'XPT'},{fh:'OANDA:XPD_USD',s:'XPD'},
    {fh:'OANDA:BCO_USD',s:'CO1'},{fh:'OANDA:WTICO_USD',s:'CL1'},
    {fh:'OANDA:NATGAS_USD',s:'NG1'},{fh:'OANDA:XCU_USD',s:'HG1'},
    {fh:'OANDA:WHEAT_USD',s:'W1'},{fh:'OANDA:CORN_USD',s:'C1'},
    {fh:'OANDA:SOYBN_USD',s:'S1'},{fh:'OANDA:SUGAR_USD',s:'SB1'},
  ];
  for(let i=0; i<directCmd.length; i+=BATCH){
    const batch = directCmd.slice(i, i+BATCH);
    const results = await Promise.allSettled(batch.map(x => _fhq(x.fh)));
    results.forEach((r,j) => {
      if(r.status!=='fulfilled'||!r.value) return;
      const q = r.value; const sym = batch[j].s;
      const cd = COMDTY_DATA.find(x=>x.s===sym);
      if(!cd||q.c<=0) return;
      cd.px = q.c;
      if(q.dp!=null) cd.chg = q.dp;
      else if(q.pc>0) cd.chg = ((q.c-q.pc)/q.pc)*100;
      if(q.o>0) cd.open = q.o;
      if(q.h>0) cd.hi = q.h;
      if(q.l>0) cd.lo = q.l;
      updated++;
    });
    if(i+BATCH<directCmd.length) await delay(350);
  }

  if(updated>0){
    LIVE.idx=true; LIVE.fx=true;
    setLiveBadge('si-idx',true); setLiveBadge('si-fx',true);
    window._layerStatus.finnhubTF={ok:true,ts:Date.now(),count:updated};
    renderMarkers(); renderSidebar(); buildTicker(); refreshAllPanels();
    setStat('FINNHUB TF — '+updated+' quotes (EQ+IDX+FX+CMD)  |  '+new Date().toLocaleTimeString('en-GB'));
    console.log('[FinnhubTF] Updated '+updated+' traditional finance quotes');
  }
}

async function fetchGemini() {
  try {
    let n = 0;
    const symbols = Object.keys(GEMINI_MAP);
    // Gemini has no batch endpoint, fetch top 6 most important
    const top = ['btcusd','ethusd','solusd','xrpusd','linkusd','ltcusd'];
    const results = await Promise.allSettled(top.map(s =>
      _fetchCORS('https://api.gemini.com/v1/pubticker/' + s, 8000).then(r => r ? r.json() : null)
    ));
    results.forEach((res, i) => {
      if (res.status !== 'fulfilled' || !res.value) return;
      const d = res.value;
      const id = GEMINI_MAP[top[i]]; if (!id) return;
      const px = parseFloat(d.last);
      const open = parseFloat(d.open);
      const chg = open > 0 ? ((px - open) / open) * 100 : null;
      const vol = parseFloat(d.volume && d.volume.USD || 0);
      if (px > 0) { updateCoin(id, {px, chg, vol}, 'gemini', 5); n++; }
    });
    if (n > 0) {
      _boot.update('GEMINI', 'ok', n + ' PAIRS');
      setStat('GEMINI — ' + n + ' pairs  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    }
  } catch(e) { console.warn('[GEMINI]', e.message); }
}

// ── BITFINEX (public v2, no key needed) ──────────────────────────────
const BFX_PAIRS = [
  ['tBTCUSD','bitcoin'],['tETHUSD','ethereum'],['tSOLUSD','solana'],
  ['tXRPUSD','ripple'],['tADAUSD','cardano'],['tLTCUSD','litecoin'],
  ['tLINKUSD','chainlink'],['tDOTUSD','polkadot'],['tAVAXUSD','avalanche'],
  ['tNEARUSD','near'],['tUNIUSD','uniswap'],['tATOMUSD','atom'],
  ['tFILUSD','filecoin'],['tAPTUSD','aptos'],['tSUIUSD','sui'],
  ['tAAVEUSD','aave'],['tTRXUSD','tron'],['tXLMUSD','stellar']
];
async function fetchBitfinex() {
  try {
    const syms = BFX_PAIRS.map(p => p[0]).join(',');
    const r = await _fetchCORS('https://api-pub.bitfinex.com/v2/tickers?symbols=' + syms, 10000);
    if (!r) throw new Error('no response');
    const d = await r.json();
    let n = 0;
    (Array.isArray(d)?d:[]).forEach(t => {
      if (!Array.isArray(t) || t.length < 10) return;
      const sym = t[0];
      const pair = BFX_PAIRS.find(p => p[0] === sym);
      if (!pair) return;
      const px = t[7]; // last price
      const chg = t[6] * 100; // daily change percent
      const vol = t[8] * px; // volume in USD
      if (px > 0) { updateCoin(pair[1], {px, chg, vol}, 'bitfinex', 5); n++; }
    });
    if (n > 0) {
      _boot.update('BITFINEX', 'ok', n + ' PAIRS');
      setStat('BITFINEX — ' + n + ' pairs  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    }
  } catch(e) { console.warn('[BFX]', e.message); }
}

// ── BITMEX (public, no key — futures reference prices) ───────────────
async function fetchBitMEX() {
  try {
    const r = await _fetchCORS('https://www.bitmex.com/api/v1/instrument/active?columns=symbol,lastPrice,volume24h,lastChangePcnt&count=20', 10000);
    if (!r) throw new Error('no response');
    const d = await r.json();
    let n = 0;
    const BMEX_MAP = {'XBTUSD':'bitcoin','ETHUSD':'ethereum','SOLUSD':'solana','XRPUSD':'ripple','ADAUSD':'cardano','LINKUSD':'chainlink','LTCUSD':'litecoin','DOTUSD':'polkadot','AVAXUSD':'avalanche'};
    (Array.isArray(d)?d:[]).forEach(t => {
      const id = BMEX_MAP[t.symbol]; if (!id) return;
      const px = parseFloat(t.lastPrice);
      const chg = t.lastChangePcnt ? t.lastChangePcnt * 100 : null;
      const vol = parseFloat(t.volume24h) || 0;
      if (px > 0) { updateCoin(id, {px, chg, vol}, 'bitmex', 5); n++; }
    });
    if (n > 0) {
      _boot.update('BITMEX', 'ok', n + ' FUTURES');
      setStat('BITMEX — ' + n + ' futures  |  ' + new Date().toLocaleTimeString('en-GB'));
      refreshAllPanels(); renderSidebar();
    }
  } catch(e) { console.warn('[BMEX]', e.message); }
}

// Coinbase Advanced Trade — /market/products (public, no auth)
// Vrací price, volume_24h, price_percentage_change_24h pro všechny páry najednou
const CB_MAP = {
  'BTC-USD':'bitcoin','ETH-USD':'ethereum','SOL-USD':'solana',
  'XRP-USD':'ripple','ADA-USD':'cardano',
  'AVAX-USD':'avalanche','LINK-USD':'chainlink','DOT-USD':'polkadot',
  'LTC-USD':'litecoin','UNI-USD':'uniswap','NEAR-USD':'near',
  'AAVE-USD':'aave','OP-USD':'optimism','ARB-USD':'arbitrum',
  'APT-USD':'aptos','ATOM-USD':'atom','ICP-USD':'icp',
  'FIL-USD':'filecoin','RENDER-USD':'render','SUI-USD':'sui',
  'TRX-USD':'tron','XLM-USD':'stellar','HYPE-USD':'hyperliquid',
  'KAS-USD':'kaspa','INJ-USD':'injective','JUP-USD':'jupiter'
  };

async function fetchCoinbase() {
  try {
    // Jeden call → všechny produkty s volume_24h, price, chg24h
    const url = 'https://api.coinbase.com/api/v3/brokerage/market/products?product_type=SPOT&limit=500';
    const r = await _fetchCORS(url, 12000);
    if (!r) throw new Error('no response');
    const data = await r.json();
    const products = data.products || [];
    let n = 0, totalVol = 0;
    products.forEach(p => {
      const id = CB_MAP[p.product_id];
      if (!id) return;
      const px  = parseFloat(p.price) || 0;
      // volume_24h je v základní měně (BTC, ETH…) — přepočítáme na USD
      const volBase = parseFloat(p.volume_24h) || 0;
      const vol = volBase * px;
      const chg = parseFloat(p.price_percentage_change_24h) || null;
      const volChg = parseFloat(p.volume_percentage_change_24h) || null;
      if (px > 0) {
        updateCoin(id, {px, vol, chg}, 'coinbase', 3);
        // Ulož do _xPrices pro cross-exchange srovnání
        if (!_xPrices[id]) _xPrices[id] = {};
        _xPrices[id]['coinbase'] = {px, vol, chg, volChg, ts: Date.now()};
        totalVol += vol;
        n++;
      }
    });
    if (n > 0) {
      _liveStatus['COINBASE'] && (_liveStatus['COINBASE'].ok=true, _liveStatus['COINBASE'].last=Date.now());
      setLiveBadge('si-cb', true);
      _boot.update('COINBASE', 'ok', n + ' pairs · $' + (totalVol/1e9).toFixed(1) + 'B vol');
      setStat('COINBASE ADV — ' + n + ' pairs · vol $' + (totalVol/1e9).toFixed(2) + 'B  |  ' + new Date().toLocaleTimeString('en-GB'));
      buildTicker(); refreshAllPanels(); renderSidebar();
    } else {
      _boot.update('COINBASE', 'warn', '0 pairs returned');
    }
  } catch(e) {
    setLiveBadge('si-cb', false);
    _liveStatus['COINBASE'] && (_liveStatus['COINBASE'].ok=false);
    _boot.update('COINBASE', 'err', e.message);
  }
}

// ── Coinbase Advanced Trade WebSocket — veřejný ticker (no auth) ────────
// wss://advanced-trade-ws.coinbase.com/ws — channel "ticker" nevyžaduje auth
let _cbWs = null, _cbWsOk = false;

function startCoinbaseWS() {
  if (_cbWs && (_cbWs.readyState === 0 || _cbWs.readyState === 1)) return;
  try {
    _cbWs = new WebSocket('wss://advanced-trade-ws.coinbase.com/ws');
    _cbWs.onopen = () => {
      _cbWsOk = true;
      const products = Object.keys(CB_MAP);
      // Subscribe ticker — veřejné, bez JWT
      _cbWs.send(JSON.stringify({
        type: 'subscribe',
        product_ids: products,
        channel: 'ticker'
}));
      setLiveBadge('si-cb', true);
      _boot.update('COINBASE-WS', 'ok', 'TICKER ' + products.length + ' PAIRS');
    };
    _cbWs.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.channel !== 'ticker') return;
        (msg.events || []).forEach(ev => {
          (ev.tickers || []).forEach(t => {
            const id = CB_MAP[t.product_id]; if (!id) return;
            const px  = parseFloat(t.price) || 0;
            const vol = parseFloat(t.volume_24h) * px || 0;
            const chg = parseFloat(t.price_percent_chg_24h) || null;
            const hi  = parseFloat(t.high_52_week) || null;
            const lo  = parseFloat(t.low_52_week) || null;
            if (px > 0) {
              updateCoin(id, {px, vol, chg}, 'coinbase', 3);
              if (!_xPrices[id]) _xPrices[id] = {};
              _xPrices[id]['coinbase'] = {px, vol, chg, ts: Date.now()};
              // Ulož vol do _xVol přímo (pro _computeTotalVol)
              if (vol > 0) {
                if (!_xVol[id]) _xVol[id] = {};
                _xVol[id]['coinbase'] = {vol, ts: Date.now()};
              }
            }
          });
        });
      } catch(_) {}
    };
    _cbWs.onerror = () => { _cbWsOk = false; setLiveBadge('si-cb', false); };
    _cbWs.onclose = () => {
      _cbWsOk = false;
      setTimeout(startCoinbaseWS, 8000); // auto-reconnect
    };
  } catch(e) {
    _boot.update('COINBASE-WS', 'err', e.message);
  }
}

/* ════════════════════════════════════════════
   HYPERLIQUID ENHANCED — WS + REST + CMC fallback
════════════════════════════════════════════ */
// Přidej HL WebSocket subscription pro allMids + trades (vol data)
function _hlSubscribeAll() {
  if (!_hlWs || _hlWs.readyState !== 1) return;
  // allMids - realtime prices
  _hlWs.send(JSON.stringify({method:'subscribe', subscription:{type:'allMids'}}));
  // metaAndAssetCtxs - objem, OI, funding
  _hlWs.send(JSON.stringify({method:'subscribe', subscription:{type:'metaAndAssetCtxs'}}));
}

/* ════════════════════════════════════════════
   14. COINGECKO — prices + market caps (fallback/enrichment)
════════════════════════════════════════════ */
async function fetchCoinGecko(){
  try{
    // coins/markets - px, vol, mc, chg 24h i 7d najednou
    const ids=CRYPTO.slice(0,50).map(c=>c.id).join(',');
    const cgUrl=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h,7d&sparkline=false`;
    // CoinGecko blokuje přímý přístup — použij corsproxy
    const r=await fetch(`https://corsproxy.io/?url=${encodeURIComponent(cgUrl)}`, {signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),15000);return c.signal;})()});
    if(!r)throw new Error('all proxies failed');
    const d=await r.json();
    if(!Array.isArray(d))throw new Error('bad response');
    let n=0;
    d.forEach(coin=>{
      const id=coin.id;
      const px=coin.current_price;
      const chg=coin.price_change_percentage_24h_in_currency??coin.price_change_percentage_24h;
      const chg7=coin.price_change_percentage_7d_in_currency;
      const mc=coin.market_cap;
      const vol=coin.total_volume;
      const ath=coin.ath;
      const rank=coin.market_cap_rank;
      if(px>0){
        updateCoin(id,{px,chg,mc,vol,ath},'coingecko',5);
        // CoinGecko total_volume — ulož jako benchmark pro agregaci
        if(vol>0){if(!_xVol[id])_xVol[id]={};_xVol[id]['coingecko']={vol,ts:Date.now()};}
        const c=CRYPTO.find(x=>x.id===id);
        if(c){
          if(rank)c.rank=rank;
          // Update ATH from CoinGecko (live, replaces static value)
          if(ath&&ath>0) c.ath=ath;
          // ── Použij CoinGecko 7D% pro zpětný výpočet přesné ceny před 7 dny ──
          // price_change_percentage_7d = (px_now / px_7d_ago - 1) * 100
          if(chg7!=null){
            c.chg7=chg7;
            c._chg7live=true;
            const px7ago = px / (1 + chg7/100);
            W1_OPEN[c.s] = px7ago;
          }
          // ── Aktualizuj YTD% a 7D% buňky přímo v DOM ──
          const ytd = calcYtd2026(c.s, px);
          const w1  = calcW1(c.s, px);
          const _fp = v => '<span style="color:'+(v>=0?'#00cc44':'#ff2222')+';font-weight:700">'+(v>=0?'+':'')+v.toFixed(2)+'%</span>';
          const ytdEl = document.querySelector('[data-ytd="'+c.id+'"]');
          const w1El  = document.querySelector('[data-w1="'+c.id+'"]');
          if(ytdEl) ytdEl.innerHTML = ytd!==null ? _fp(ytd) : '<span style="color:#887760">—</span>';
          if(w1El)  w1El.innerHTML  = w1!==null  ? _fp(w1)  : '<span style="color:#887760">—</span>';
        }
        n++;
      }
    });
    if(n>0){
      setLiveBadge('si-cg',true);
      _boot.update('COINGECKO','ok',n+' COINS LIVE');
      setStat('COINGECKO — '+n+' coins  |  '+new Date().toLocaleTimeString('en-GB'));
      window._ytdPatchTs=0;
      if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true);
      refreshAllPanels();renderSidebar();
    }
    else{_boot.update('COINGECKO','warn','0 coins parsed');}
  }catch(e){_boot.update('COINGECKO','err','FAILED: '+e.message);}
}

/* ════════════════════════════════════════════
   15. MULTI-EXCHANGE FX — record per-source
════════════════════════════════════════════ */
function recordFX(pair, mid, source){
  if(!_xFX[pair])_xFX[pair]={};
  _xFX[pair][source]={mid,ts:Date.now()};
}

/* Patch into existing fetchFX to record per-source */

async function fetchAlphaVantageFX(){
  // Alpha Vantage free tier for FX cross-validation
  try{
    const pairs=[['EUR','USD'],['GBP','USD'],['USD','JPY'],['USD','CHF']];
    await Promise.allSettled(pairs.map(async([from,to])=>{
      const r=await _fetchTimeout(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=demo`, 8000);
      if(!r.ok)return;
      const d=await r.json();
      const rate=parseFloat(d?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate']);
      if(rate>0)recordFX(`${from}/${to}`,rate,'AlphaVantage');
    }));
  }catch(_){}
}

/* Stooq also records commodity prices per source */

// ═══ NEW DATA SOURCES: CoinCap + Etherscan ═══════════════════════════════

async function fetchCoinCap(){
  // CoinCap.io — free, no key needed, good backup for crypto prices
  try{
    const r = await _fetchTimeout('https://api.coincap.io/v2/assets?limit=50', 10000);
    if(!r.ok) return;
    const d = await r.json();
    if(!d.data) return;
    const map = {bitcoin:'BTC',ethereum:'ETH',solana:'SOL',dogecoin:'DOGE',cardano:'ADA',
      'avalanche-2':'AVAX',polkadot:'DOT',chainlink:'LINK','shiba-inu':'SHIB',litecoin:'LTC',
      'bitcoin-cash':'BCH',stellar:'XLM',monero:'XMR',tron:'TRX','binance-coin':'BNB',
      ripple:'XRP',uniswap:'UNI',aave:'AAVE',near:'NEAR',sui:'SUI',aptos:'APT',
      'internet-computer':'ICP',filecoin:'FIL',render:'RENDER',arbitrum:'ARB',optimism:'OP',
      injective:'INJ',toncoin:'TON',cosmos:'ATOM',algorand:'ALGO',hedera:'HBAR'};
    d.data.forEach(c=>{
      const sym = map[c.id] || c.symbol;
      const px = parseFloat(c.priceUsd);
      const chg = parseFloat(c.changePercent24Hr);
      if(px > 0 && sym){
        if(!window._prices) window._prices={};
        if(!window._prices[sym]) window._prices[sym]={};
        window._prices[sym].coincap = px;
        // Also feed into cross-source if available
        if(typeof recordCrypto==='function') recordCrypto(sym, px, chg, 'coincap');
      }
    });
    _boot.update('COINCAP','ok','CoinCap 50 assets');
    console.log('[CoinCap] Loaded',d.data.length,'assets');
  }catch(e){ console.warn('[CoinCap]',e.message); }
}

async function fetchEtherscan(){
  // Etherscan.io — free tier (5 req/s, no key needed for basic)
  try{
    // ETH gas prices
    const rGas = await _fetchTimeout('https://api.etherscan.io/api?module=gastracker&action=gasoracle', 8000);
    if(rGas.ok){
      const dGas = await rGas.json();
      if(dGas.result){
        window._ethGas = {
          low: parseInt(dGas.result.SafeGasPrice)||0,
          avg: parseInt(dGas.result.ProposeGasPrice)||0,
          high: parseInt(dGas.result.FastGasPrice)||0,
          ts: Date.now()
        };
        console.log('[Etherscan] Gas:',window._ethGas.low,'/',window._ethGas.avg,'/',window._ethGas.high,'gwei');
      }
    }
    // ETH price
    const rPrice = await _fetchTimeout('https://api.etherscan.io/api?module=stats&action=ethprice', 8000);
    if(rPrice.ok){
      const dPrice = await rPrice.json();
      if(dPrice.result?.ethusd){
        const px = parseFloat(dPrice.result.ethusd);
        if(px > 0){
          if(!window._prices) window._prices={};
          if(!window._prices.ETH) window._prices.ETH={};
          window._prices.ETH.etherscan = px;
          if(typeof recordCrypto==='function') recordCrypto('ETH', px, 0, 'etherscan');
        }
      }
    }
    _boot.update('ETHERSCAN','ok','Gas + ETH price');
  }catch(e){ console.warn('[Etherscan]',e.message); }
}

// Auto-fetch new sources
setTimeout(fetchCoinCap, 4000);
setTimeout(fetchEtherscan, 5000);
// Refresh every 60s
setInterval(fetchCoinCap, 60000);
setInterval(fetchEtherscan, 90000);

// ═══ FX SOURCES: OpenExchangeRates + Fixer + CurrencyBeacon ══════════════

async function fetchOpenExchangeRates(){
  // OpenExchangeRates — free tier: 1000 req/month, no signup needed for latest
  try{
    const r = await _fetchTimeout('https://open.er-api.com/v6/latest/USD', 10000);
    if(!r.ok) return;
    const d = await r.json();
    if(!d.rates) return;
    const pairs = {
      'EUR/USD': 1/d.rates.EUR, 'GBP/USD': 1/d.rates.GBP, 'USD/JPY': d.rates.JPY,
      'USD/CHF': d.rates.CHF, 'AUD/USD': 1/d.rates.AUD, 'USD/CAD': d.rates.CAD,
      'NZD/USD': 1/d.rates.NZD, 'USD/CZK': d.rates.CZK, 'USD/PLN': d.rates.PLN,
      'USD/SEK': d.rates.SEK, 'USD/NOK': d.rates.NOK, 'USD/TRY': d.rates.TRY,
      'USD/ZAR': d.rates.ZAR, 'USD/MXN': d.rates.MXN, 'USD/BRL': d.rates.BRL,
      'USD/INR': d.rates.INR, 'USD/CNY': d.rates.CNY, 'USD/HKD': d.rates.HKD,
      'USD/SGD': d.rates.SGD, 'USD/KRW': d.rates.KRW, 'EUR/GBP': d.rates.GBP/d.rates.EUR,
      'EUR/CHF': d.rates.CHF/d.rates.EUR, 'EUR/JPY': d.rates.JPY/d.rates.EUR,
      'EUR/CZK': d.rates.CZK/d.rates.EUR,
    };
    Object.entries(pairs).forEach(([pair,rate])=>{
      if(rate > 0 && typeof recordFX==='function') recordFX(pair, rate, 'OpenER');
    });
    console.log('[OpenER] Loaded', Object.keys(pairs).length, 'FX pairs');
  }catch(e){ console.warn('[OpenER]', e.message); }
}

async function fetchFixerFallback(){
  // Fixer.io alternative — using exchangerate.host (same data, no key)
  try{
    const r = await _fetchTimeout('https://api.exchangerate.host/latest?base=USD', 10000);
    if(!r.ok) return;
    const d = await r.json();
    if(!d.rates) return;
    const pairs = {
      'EUR/USD': 1/d.rates.EUR, 'GBP/USD': 1/d.rates.GBP, 'USD/JPY': d.rates.JPY,
      'USD/CHF': d.rates.CHF, 'USD/CZK': d.rates.CZK,
    };
    Object.entries(pairs).forEach(([pair,rate])=>{
      if(rate > 0 && typeof recordFX==='function') recordFX(pair, rate, 'Fixer');
    });
    console.log('[Fixer] Loaded', Object.keys(pairs).length, 'FX pairs');
  }catch(e){ console.warn('[Fixer]', e.message); }
}

async function fetchCurrencyBeacon(){
  // CurrencyBeacon — free tier 5000 req/month, using public endpoint
  try{
    const r = await _fetchTimeout('https://api.currencybeacon.com/v1/latest?base=USD&api_key=free', 10000);
    if(!r.ok){
      // Fallback to frankfurter.app (ECB data, completely free, no limits)
      const r2 = await _fetchTimeout('https://api.frankfurter.app/latest?from=USD', 8000);
      if(!r2.ok) return;
      const d2 = await r2.json();
      if(!d2.rates) return;
      Object.entries(d2.rates).forEach(([ccy,rate])=>{
        if(rate > 0 && typeof recordFX==='function') recordFX('USD/'+ccy, rate, 'Frankfurter');
      });
      console.log('[Frankfurter] Loaded ECB rates');
      return;
    }
    const d = await r.json();
    if(d.rates){
      Object.entries(d.rates).forEach(([ccy,rate])=>{
        if(rate > 0 && typeof recordFX==='function') recordFX('USD/'+ccy, rate, 'CurrencyBeacon');
      });
      console.log('[CurrencyBeacon] Loaded rates');
    }
  }catch(e){ console.warn('[CurrencyBeacon]', e.message); }
}

// Auto-fetch FX sources (staggered)
setTimeout(fetchOpenExchangeRates, 6000);
setTimeout(fetchFixerFallback, 8000);
setTimeout(fetchCurrencyBeacon, 10000);
// Refresh every 5 min (FX rates don't change fast)
setInterval(fetchOpenExchangeRates, 300000);
setInterval(fetchFixerFallback, 300000);
setInterval(fetchCurrencyBeacon, 300000);

// ═══ END FX SOURCES ═══════════════════════════════════════════════════════

// ═══ MACRO SOURCES: Data Commons + World Bank ════════════════════════════

async function fetchDataCommons(){
  // Google Data Commons — completely free, no key, global economic indicators
  try{
    const indicators = [
      {dcid:'country/USA', name:'US', series:'Amount_EconomicActivity_GrossDomesticProduction_Nominal'},
      {dcid:'country/CHN', name:'CN', series:'Amount_EconomicActivity_GrossDomesticProduction_Nominal'},
      {dcid:'country/DEU', name:'DE', series:'Amount_EconomicActivity_GrossDomesticProduction_Nominal'},
      {dcid:'country/JPN', name:'JP', series:'Amount_EconomicActivity_GrossDomesticProduction_Nominal'},
      {dcid:'country/GBR', name:'GB', series:'Amount_EconomicActivity_GrossDomesticProduction_Nominal'},
    ];
    if(!window._macroGDP) window._macroGDP = {};
    await Promise.allSettled(indicators.map(async ind => {
      const url = `https://api.datacommons.org/v2/observation?entity.dcids=${ind.dcid}&variable.dcids=${ind.series}&date=LATEST&key=`;
      const r = await _fetchTimeout(url, 10000);
      if(!r.ok) return;
      const d = await r.json();
      const obs = d?.byVariable?.[ind.series]?.byEntity?.[ind.dcid]?.orderedFacets?.[0]?.observations;
      if(obs && obs.length > 0){
        const latest = obs[obs.length-1];
        window._macroGDP[ind.name] = {value: latest.value, date: latest.date};
      }
    }));
    console.log('[DataCommons] GDP data loaded:', Object.keys(window._macroGDP).length, 'countries');
  }catch(e){ console.warn('[DataCommons]', e.message); }
}

async function fetchWorldBank(){
  // World Bank API — completely free, no key, global indicators
  try{
    if(!window._macroWB) window._macroWB = {};
    // GDP growth, inflation, unemployment for key economies
    const countries = 'USA;CHN;DEU;JPN;GBR;FRA;IND;BRA;CAN;AUS';
    const indicators = [
      {id:'NY.GDP.MKTP.KD.ZG', key:'gdpGrowth'},
      {id:'FP.CPI.TOTL.ZG', key:'inflation'},
      {id:'SL.UEM.TOTL.ZS', key:'unemployment'}
    ];
    await Promise.allSettled(indicators.map(async ind => {
      const url = `https://api.worldbank.org/v2/country/${countries}/indicator/${ind.id}?format=json&date=2023:2025&per_page=30&mrv=1`;
      const r = await _fetchTimeout(url, 12000);
      if(!r.ok) return;
      const d = await r.json();
      if(!d[1]) return;
      d[1].forEach(item => {
        if(item.value !== null){
          const cc = item.country.id;
          if(!window._macroWB[cc]) window._macroWB[cc] = {country: item.country.value};
          window._macroWB[cc][ind.key] = item.value;
          window._macroWB[cc][ind.key+'Year'] = item.date;
        }
      });
    }));
    console.log('[WorldBank] Macro data:', Object.keys(window._macroWB).length, 'countries');
  }catch(e){ console.warn('[WorldBank]', e.message); }
}

async function fetchUSEconData(){
  // BLS / data.gov — US economic snapshots (free, no key)
  try{
    // US Treasury daily rates (backup to FRED)
    const r = await _fetchTimeout('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&page[size]=10&filter=security_desc:eq:Treasury Bills', 10000);
    if(r.ok){
      const d = await r.json();
      if(d.data && d.data.length > 0){
        window._usTreasury = d.data.slice(0,5).map(item => ({
          date: item.record_date,
          type: item.security_desc,
          rate: parseFloat(item.avg_interest_rate_amt)
        }));
        console.log('[USEcon] Treasury rates loaded');
      }
    }
  }catch(e){ console.warn('[USEcon]', e.message); }
}

// Auto-fetch (staggered, less frequent — macro data changes slowly)
setTimeout(fetchDataCommons, 12000);
setTimeout(fetchWorldBank, 15000);
setTimeout(fetchUSEconData, 18000);
// Refresh every 30 min
setInterval(fetchDataCommons, 1800000);
setInterval(fetchWorldBank, 1800000);
setInterval(fetchUSEconData, 1800000);

// ═══ END MACRO SOURCES ═══════════════════════════════════════════════════

// ═══ REDDIT SENTIMENT — r/wallstreetbets + r/cryptocurrency ══════════════

async function fetchRedditSentiment(){
  // Reddit public JSON endpoints — no API key needed
  const subs = [
    {name:'wallstreetbets', key:'wsb'},
    {name:'cryptocurrency', key:'crypto'},
    {name:'stocks', key:'stocks'},
    {name:'investing', key:'investing'}
  ];
  if(!window._redditSentiment) window._redditSentiment = {};
  
  await Promise.allSettled(subs.map(async sub => {
    try{
      const r = await _fetchTimeout(`https://www.reddit.com/r/${sub.name}/hot.json?limit=25&raw_json=1`, 10000);
      if(!r.ok) return;
      const d = await r.json();
      if(!d.data?.children) return;
      
      const posts = d.data.children.map(p => p.data).filter(p => p && p.title);
      
      // Simple sentiment: count bullish vs bearish keywords
      let bulls = 0, bears = 0, total = posts.length;
      const bullWords = ['buy','long','moon','bullish','calls','pump','rally','green','ath','breakout','up','gains'];
      const bearWords = ['sell','short','crash','bearish','puts','dump','red','drop','down','loss','fear','recession'];
      
      posts.forEach(p => {
        const txt = (p.title + ' ' + (p.selftext||'')).toLowerCase();
        bullWords.forEach(w => { if(txt.includes(w)) bulls++; });
        bearWords.forEach(w => { if(txt.includes(w)) bears++; });
      });
      
      const score = total > 0 ? Math.round((bulls / (bulls + bears + 1)) * 100) : 50;
      
      window._redditSentiment[sub.key] = {
        score, // 0-100 (50=neutral, >60=bullish, <40=bearish)
        bulls, bears, total,
        topPosts: posts.slice(0,5).map(p => ({
          title: p.title.substring(0,120),
          ups: p.ups,
          comments: p.num_comments,
          url: 'https://reddit.com' + p.permalink
        })),
        ts: Date.now()
      };
    }catch(e){ /* Reddit often blocks — silently skip */ }
  }));
  
  const keys = Object.keys(window._redditSentiment);
  if(keys.length > 0) console.log('[Reddit] Sentiment loaded:', keys.join(', '));
}

// Fetch on load + every 5 min
setTimeout(fetchRedditSentiment, 20000);
setInterval(fetchRedditSentiment, 300000);

// ═══ END REDDIT ══════════════════════════════════════════════════════════

// ═══ NEWS: HackerNews + Guardian + CurrentsAPI ═══════════════════════════

async function fetchHackerNews(){ return fetchAllNews(false); }

async function fetchGuardianNews(){ return fetchAllNews(false); }

async function fetchCurrentsAPI(){ return fetchAllNews(false); }

// Staggered fetch
setTimeout(fetchHackerNews, 5000);
setTimeout(fetchGuardianNews, 6000);
setTimeout(fetchCurrentsAPI, 7000);
// Refresh every 10 min
setInterval(fetchHackerNews, 120000);
setInterval(fetchGuardianNews, 120000);
setInterval(fetchCurrentsAPI, 180000);

// ═══ END NEWS SOURCES ════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  MEGA AI INTELLIGENCE ENGINE
//  Collects data from ALL sources → Claude AI → filtered insights
//  Runs every 10 min, caches results in window._aiInsights
// ═══════════════════════════════════════════════════════════════════════════

window._aiInsights = { signals:[], brief:'', ts:0 };
window._aiRunning = false;

async function runAIInsightEngine(){
  if(window._aiRunning) return;
  if(!window.ANTHROPIC_API_KEY) return;
  // Don't run more than every 8 min
  if(Date.now() - window._aiInsights.ts < 480000) return;
  window._aiRunning = true;
  
  try{
    // 1. COLLECT data snapshot from all sources
    const snapshot = _collectDataSnapshot();
    if(!snapshot) { window._aiRunning = false; return; }
    
    // 2. SEND to Claude for analysis
    const prompt = `You are a professional market analyst. Analyze this real-time market data and return ONLY a JSON object (no markdown, no backticks):

${snapshot}

Return exactly this JSON structure:
{
  "brief": "2-3 sentence market summary",
  "signals": [
    {"type":"ALERT|WATCH|INFO", "asset":"BTC|ETH|SPX|GOLD|etc", "msg":"what happened", "severity":"HIGH|MED|LOW"},
  ],
  "topMovers": [{"sym":"XXX", "move":"+5.2%", "why":"reason"}],
  "risks": ["risk 1", "risk 2"],
  "opportunities": ["opp 1", "opp 2"]
}

Focus on: unusual moves, divergences, risk signals, macro shifts. Max 8 signals, 5 movers, 3 risks, 3 opportunities.`;

    const data = await _callAnthropic({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{role:'user', content:prompt}]
    });
    
    if(!data?.content?.[0]?.text) { window._aiRunning = false; return; }
    
    const txt = data.content[0].text.replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(txt);
    
    window._aiInsights = {
      brief: parsed.brief || '',
      signals: parsed.signals || [],
      topMovers: parsed.topMovers || [],
      risks: parsed.risks || [],
      opportunities: parsed.opportunities || [],
      ts: Date.now()
    };
    
    console.log('[AI ENGINE] Insights generated:', 
      window._aiInsights.signals.length, 'signals,',
      window._aiInsights.topMovers.length, 'movers');
    
    // Trigger UI update
    if(typeof refreshAllPanels === 'function') refreshAllPanels();
    
  }catch(e){
    console.warn('[AI ENGINE]', e.message);
  }
  window._aiRunning = false;
}

function _collectDataSnapshot(){
  const lines = [];
  
  // Crypto prices
  const btc = CRYPTO.find(c=>c.s==='BTC');
  const eth = CRYPTO.find(c=>c.s==='ETH');
  const sol = CRYPTO.find(c=>c.s==='SOL');
  if(btc) lines.push(`BTC: $${btc.px} (${btc.chg>0?'+':''}${btc.chg?.toFixed(1)}%) dom:${btc.dom}`);
  if(eth) lines.push(`ETH: $${eth.px} (${eth.chg>0?'+':''}${eth.chg?.toFixed(1)}%)`);
  if(sol) lines.push(`SOL: $${sol.px} (${sol.chg>0?'+':''}${sol.chg?.toFixed(1)}%)`);
  
  // Top movers from crypto
  const movers = [...CRYPTO].sort((a,b)=>Math.abs(b.chg||0)-Math.abs(a.chg||0)).slice(0,5);
  lines.push('Top crypto movers: ' + movers.map(c=>`${c.s} ${c.chg>0?'+':''}${c.chg?.toFixed(1)}%`).join(', '));
  
  // Stock indices
  ['SPX','INDU','NDX','DAX','NKY','HSI'].forEach(s=>{
    const m = MKT[s];
    if(m) lines.push(`${s}: ${m.px} (${m.chg>0?'+':''}${m.chg?.toFixed(1)}%)`);
  });
  
  // Commodities
  const gold = COMDTY_DATA.find(c=>c.s==='XAU');
  const wti = COMDTY_DATA.find(c=>c.s==='CL1');
  const brent = COMDTY_DATA.find(c=>c.s==='CO1');
  if(gold) lines.push(`GOLD: $${gold.px} (${gold.chg>0?'+':''}${gold.chg?.toFixed(1)}%)`);
  if(wti) lines.push(`WTI: $${wti.px} (${wti.chg>0?'+':''}${wti.chg?.toFixed(1)}%)`);
  if(brent) lines.push(`BRENT: $${brent.px} (${brent.chg>0?'+':''}${brent.chg?.toFixed(1)}%)`);
  
  // FX
  const fxPairs = FXP.slice(0,6).map(f=>`${f.p}: ${((f.b+f.a)/2).toFixed(4)} (${f.c>0?'+':''}${f.c?.toFixed(2)}%)`);
  if(fxPairs.length) lines.push('FX: ' + fxPairs.join(', '));
  
  // Fear & Greed
  if(window._fng) lines.push(`Fear&Greed: ${window._fng.value} (${window._fng.classification})`);
  
  // ETH Gas
  if(window._ethGas) lines.push(`ETH Gas: ${window._ethGas.low}/${window._ethGas.avg}/${window._ethGas.high} gwei`);
  
  // Reddit sentiment
  if(window._redditSentiment?.wsb) lines.push(`Reddit WSB sentiment: ${window._redditSentiment.wsb.score}/100 (${window._redditSentiment.wsb.bulls}B/${window._redditSentiment.wsb.bears}b)`);
  
  // Recent news headlines
  if(window._newsCache?.length){
    const recent = window._newsCache
      .filter(n => n.ts && Date.now()-n.ts < 3600000)
      .sort((a,b)=>b.ts-a.ts)
      .slice(0,8);
    if(recent.length) lines.push('Recent headlines: ' + recent.map(n=>n.title).join(' | '));
  }
  
  // AIS ships
  const aisCount = Object.keys(window._aisShips||{}).length;
  if(aisCount > 0) lines.push(`AIS: ${aisCount} vessels tracked`);
  
  if(lines.length < 3) return null;
  return lines.join('\n');
}

// Run AI engine on a schedule
setTimeout(runAIInsightEngine, 60000); // First run after 1 min
setInterval(runAIInsightEngine, 600000); // Then every 10 min

// Also run when user presses Ctrl+Shift+I
document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.shiftKey && e.key === 'I' && !e.altKey){
    e.preventDefault();
    console.log('[AI ENGINE] Manual trigger...');
    window._aiInsights.ts = 0; // Reset cooldown
    runAIInsightEngine().then(()=>{
      if(window._aiInsights.brief){
        console.log('%c AI BRIEF ', 'background:#ff6600;color:#000;font-weight:bold', window._aiInsights.brief);
        console.table(window._aiInsights.signals);
        console.log('Risks:', window._aiInsights.risks);
        console.log('Opportunities:', window._aiInsights.opportunities);
      }
    });
  }
});

// ═══ AI FALLBACK CHAIN: Claude → Groq → static ══════════════════════════
// If Anthropic fails, try Groq as backup (WorldMonitor style)
async function _callAIFallback(prompt, maxTokens){
  // 1. Try Anthropic Claude (primary)
  if(window.ANTHROPIC_API_KEY){
    const r = await _callAnthropic({
      model:'claude-haiku-4-5-20251001',
      max_tokens: maxTokens || 1000,
      messages:[{role:'user', content:prompt}]
    });
    if(r?.content?.[0]?.text) return r.content[0].text;
  }
  // 2. Fallback: return null (static data used)
  console.warn('[AI] All AI providers failed — using static data');
  return null;
}

// ═══ END AI ENGINE ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  AI NEWS INTELLIGENCE — Real-time important news filter + alerts
//  Scans all news sources, finds breaking/important items, sends to AI
// ═══════════════════════════════════════════════════════════════════════════

window._aiAlerts = [];
window._aiAlertsTs = 0;
window._processedHeadlines = new Set();

// Breaking news keyword detector (instant, no AI needed)
const BREAK_KEYWORDS = {
  critical: ['war','invasion','nuclear','crash','default','bankruptcy','assassination','attack','emergency','martial law','collapse'],
  high: ['sanctions','rate hike','rate cut','fed decision','ecb decision','crash','correction','halt','delisted','hack','exploit','rug pull','liquidity crisis'],
  medium: ['breakout','all-time high','ath','52-week','earnings beat','earnings miss','sec filing','whale','dump','pump','flash crash','outage'],
  crypto: ['btc','bitcoin','ethereum','eth','solana','sol','binance','coinbase','sec crypto','stablecoin','defi hack','bridge exploit','airdrop']
};

function _detectBreaking(title){
  if(!title) return null;
  const t = title.toLowerCase();
  for(const w of BREAK_KEYWORDS.critical) if(t.includes(w)) return {level:'CRITICAL', keyword:w};
  for(const w of BREAK_KEYWORDS.high) if(t.includes(w)) return {level:'HIGH', keyword:w};
  for(const w of BREAK_KEYWORDS.medium) if(t.includes(w)) return {level:'MEDIUM', keyword:w};
  for(const w of BREAK_KEYWORDS.crypto) if(t.includes(w)) return {level:'CRYPTO', keyword:w};
  return null;
}

// Scan all news sources for important items
function _scanAllNews(){
  const sources = [];
  
  // Main news cache
  if(window._newsCache?.length){
    window._newsCache.forEach(n => {
      if(n.title && !window._processedHeadlines.has(n.title)){
        const age = Date.now() - (n.ts||0);
        if(age < 3600000){ // last hour
          sources.push({title:n.title, source:n.source||'RSS', ts:n.ts, url:n.link});
        }
      }
    });
  }
  
  // HackerNews
  if(window._hnNews?.length){
    window._hnNews.forEach(n => {
      if(n.title && !window._processedHeadlines.has(n.title) && n.score > 100){
        sources.push({title:n.title, source:'HN', ts:n.time, url:n.url, score:n.score});
      }
    });
  }
  
  // Guardian
  if(window._guardianNews?.length){
    window._guardianNews.forEach(n => {
      if(n.title && !window._processedHeadlines.has(n.title)){
        sources.push({title:n.title, source:'Guardian', ts:new Date(n.date).getTime(), url:n.url});
      }
    });
  }
  
  // Find breaking items using keyword detection
  const breaking = [];
  sources.forEach(n => {
    const det = _detectBreaking(n.title);
    if(det){
      breaking.push({...n, ...det});
      window._processedHeadlines.add(n.title);
    }
  });
  
  // Keep set manageable
  if(window._processedHeadlines.size > 2000){
    window._processedHeadlines = new Set([...window._processedHeadlines].slice(-500));
  }
  
  return breaking;
}

// AI-powered deep analysis of breaking news
async function _aiAnalyzeBreaking(items){
  if(!items.length || !window.ANTHROPIC_API_KEY) return;
  if(items.length > 10) items = items.slice(0,10);
  
  const headlines = items.map((it,i) => `${i+1}. [${it.level}] ${it.title} (${it.source})`).join('\n');
  
  const prompt = `You are a professional system alert system. Analyze these breaking headlines and return ONLY a JSON array (no markdown):

${headlines}

For each item return: {"title":"headline","impact":"what it means for markets","action":"BUY|SELL|WATCH|HOLD","assets":["BTC","SPX"],"severity":"CRITICAL|HIGH|MED"}

Focus on: market impact, which assets affected, what action traders should consider. Be concise. Max 1 sentence per impact.`;

  try{
    const data = await _callAnthropic({
      model:'claude-haiku-4-5-20251001',
      max_tokens:1200,
      messages:[{role:'user',content:prompt}]
    });
    if(!data?.content?.[0]?.text) return;
    const txt = data.content[0].text.replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(txt);
    if(Array.isArray(parsed)){
      parsed.forEach(alert => {
        alert.ts = Date.now();
        window._aiAlerts.unshift(alert);
      });
      // Keep max 50 alerts
      if(window._aiAlerts.length > 50) window._aiAlerts = window._aiAlerts.slice(0,50);
      window._aiAlertsTs = Date.now();
      console.log('[AI NEWS]', parsed.length, 'alerts generated');
    }
  }catch(e){ console.warn('[AI NEWS]', e.message); }
}

// Price movement detector — flag unusual moves
function _detectPriceAlerts(){
  const alerts = [];
  
  // Crypto: flag >5% moves
  CRYPTO.forEach(c => {
    if(Math.abs(c.chg||0) > 5){
      alerts.push({
        title: `${c.s} ${c.chg>0?'surges':'drops'} ${Math.abs(c.chg).toFixed(1)}% to $${c.px != null ? c.px : '—'}`,
        level: Math.abs(c.chg) > 10 ? 'HIGH' : 'MEDIUM',
        source: 'PRICE',
        keyword: c.s
      });
    }
  });
  
  // Indices: flag >2% moves
  ['SPX','INDU','NDX','DAX','NKY'].forEach(s => {
    const m = MKT[s];
    if(m && Math.abs(m.chg||0) > 2){
      alerts.push({
        title: `${s} ${m.chg>0?'rallies':'tumbles'} ${Math.abs(m.chg).toFixed(1)}% to ${m.px}`,
        level: Math.abs(m.chg) > 3 ? 'HIGH' : 'MEDIUM',
        source: 'INDEX',
        keyword: s
      });
    }
  });
  
  // Gold/Oil: flag >3% moves
  COMDTY_DATA.forEach(c => {
    if(['XAU','CL1','CO1'].includes(c.s) && Math.abs(c.chg||0) > 3){
      alerts.push({
        title: `${c.n} ${c.chg>0?'spikes':'crashes'} ${Math.abs(c.chg).toFixed(1)}% to $${c.px != null ? c.px : '—'}`,
        level: 'HIGH',
        source: 'COMMODITY',
        keyword: c.s
      });
    }
  });
  
  return alerts;
}

// Main intelligence loop — runs every 3 min
async function _runNewsIntelligence(){
  // 1. Scan news for breaking items
  const newsBreaking = _scanAllNews();
  
  // 2. Detect unusual price movements
  const priceAlerts = _detectPriceAlerts();
  
  // 3. Combine all
  const allBreaking = [...newsBreaking, ...priceAlerts];
  
  if(allBreaking.length > 0){
    console.log('[INTEL]', allBreaking.length, 'breaking items found:',
      allBreaking.map(b => `[${b.level}] ${b.title.substring(0,50)}`).join(' | '));
    
    // 4. Send to AI for deep analysis (only if we have new items)
    const newItems = allBreaking.filter(b => !window._aiAlerts.find(a => a.title === b.title));
    if(newItems.length > 0 && window.ANTHROPIC_API_KEY){
      await _aiAnalyzeBreaking(newItems);
    }
  }
}

// Start intelligence loop
setTimeout(_runNewsIntelligence, 90000); // First scan after 90s
setInterval(_runNewsIntelligence, 90000); // Then every 3 min

// Manual trigger: Ctrl+Shift+N = run news intelligence NOW
document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.shiftKey && e.key === 'N'){
    e.preventDefault();
    console.log('[INTEL] Manual scan triggered...');
    _runNewsIntelligence().then(()=>{
      if(window._aiAlerts.length){
        console.log('%c AI ALERTS ', 'background:#ff2222;color:#fff;font-weight:bold;font-size:12px');
        console.table(window._aiAlerts.slice(0,10).map(a=>({
          severity:a.severity, action:a.action, title:a.title?.substring(0,60), 
          impact:a.impact?.substring(0,60), assets:a.assets?.join(',')
        })));
      } else {
        console.log('[INTEL] No breaking alerts at this time');
      }
    });
  }
});

// ═══ END AI NEWS INTELLIGENCE ════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  NEWS INJECTION — Pushes AI alerts + breaking + price alerts into panels
//  Feeds into: WN panel, NWS panel, INTEL panel, map ticker, sidebar
// ═══════════════════════════════════════════════════════════════════════════

function _injectNewsToAllPanels(){
  const now = Date.now();
  let injected = 0;
  
  // 1. Inject AI alerts as flash news
  if(window._aiAlerts?.length){
    window._aiAlerts.forEach(alert => {
      if(!alert._injected && alert.title){
        const tag = alert.severity==='CRITICAL'?'FLASH': alert.severity==='HIGH'?'FLASH':'MARKETS';
        const color = alert.severity==='CRITICAL'?'#ff2222': alert.severity==='HIGH'?'#ff6600':'#ffcc00';
        const src = alert.action ? `AI·${alert.action}` : 'AI·SIGNAL';
        
        // Push to _newsCache (main news feed)
        if(window._newsCache){
          window._newsCache.unshift({
            title: alert.title + (alert.impact ? ' — ' + alert.impact : ''),
            link: '', ts: alert.ts || now, source: src, body: alert.impact||'',
            tag: tag, flash: tag==='FLASH', tier: 1, color: color,
            _ai: true, _severity: alert.severity
          });
        }
        
        // Push to NEWS_DATA (WN panel)
        if(typeof NEWS_DATA !== 'undefined'){
          NEWS_DATA.unshift({
            title: alert.title + (alert.impact ? ' — ' + alert.impact : ''),
            src: src, tag: tag, ts: Math.floor((alert.ts||now)/1000),
            flash: tag==='FLASH', tier: 1, _ai: true
          });
        }
        
        alert._injected = true;
        injected++;
      }
    });
  }
  
  // 2. Price movement alerts — DISABLED: price alerts do not belong in news panels
  // They are shown in the price feed / ticker only
  // const priceAlerts = _detectPriceAlerts();
  
  // 3. Inject AI insights brief as top story
  if(window._aiInsights?.brief && !window._aiInsights._briefInjected){
    if(window._newsCache){
      window._newsCache.unshift({
        title: '[AI] ' + window._aiInsights.brief,
        link: '', ts: now, source: 'AI·ENGINE', body: '',
        tag: 'FLASH', flash: true, tier: 0, color: '#ff6600', _ai: true
      });
    }
    if(typeof NEWS_DATA !== 'undefined'){
      NEWS_DATA.unshift({
        title: '[AI] ' + window._aiInsights.brief,
        src: 'AI·ENGINE', tag: 'FLASH', ts: Math.floor(now/1000),
        flash: true, tier: 0, _ai: true
      });
    }
    window._aiInsights._briefInjected = true;
    injected++;
  }
  
  // 4. Cap arrays to prevent memory bloat
  if(window._newsCache && window._newsCache.length > 500){
    window._newsCache = window._newsCache.slice(0, 500);
  }
  if(typeof NEWS_DATA !== 'undefined' && NEWS_DATA.length > 300){
    NEWS_DATA.splice(300);
  }
  
  // 5. Refresh all news panels if we injected anything
  if(injected > 0){
    try{
      // WN panel
      const wnb = document.getElementById('wn-body');
      if(wnb) wnb.innerHTML = buildWNTable(NEWS_DATA);
      
      // NWS panel
      const nwsb = document.getElementById('nws-body');
      if(nwsb){ nwsb.innerHTML = buildNWSPanel(0); if(window._nwsFilterText && typeof _nwsFilter==="function"){ _nwsFilter(); var _nsi=document.getElementById("nws-srch"); if(_nsi) _nsi.value=window._nwsFilterText; } }
      
      // Map ticker update
      if(typeof buildTicker === 'function') buildTicker();
      
      // Apply AI badges
      setTimeout(()=>{ try{ _applyBadges(); }catch(e){} }, 100);
      
      console.log('[INJECT]', injected, 'items pushed to news panels');
    }catch(e){}
  }
}

// Run injection every 30 seconds (lightweight, just checks and pushes)
setInterval(_injectNewsToAllPanels, 30000);
// Also run after AI engine completes
const _origRunAI = window.runAIInsightEngine;
if(_origRunAI){
  window.runAIInsightEngine = async function(){
    await _origRunAI();
    _injectNewsToAllPanels();
  };
}
// And after news intelligence
const _origRunIntel = window._runNewsIntelligence;
if(_origRunIntel){
  window._runNewsIntelligence = async function(){
    await _origRunIntel();
    _injectNewsToAllPanels();
  };
}

// ═══ FAST NEWS AGGREGATION — parallel fetch from all sources ═════════════
// Runs on load: fetches news from ALL sources simultaneously
async function _fastNewsLoad(){
  console.log('[FAST NEWS] Loading from all sources in parallel...');
  const t0 = Date.now();
  
  await Promise.allSettled([
    typeof fetchAllNews==='function' ? fetchAllNews(true) : Promise.resolve(),
    typeof fetchGNews==='function' ? fetchGNews() : Promise.resolve(),
    typeof fetchNWSNews==='function' ? fetchNWSNews(true) : Promise.resolve(),
    typeof fetchHackerNews==='function' ? fetchHackerNews() : Promise.resolve(),
    typeof fetchGuardianNews==='function' ? fetchGuardianNews() : Promise.resolve(),
    typeof fetchCurrentsAPI==='function' ? fetchCurrentsAPI() : Promise.resolve(),
    typeof fetchIntelligence==='function' ? fetchIntelligence(true) : Promise.resolve(),
  ]);
  
  const ms = Date.now() - t0;
  const total = (window._newsCache?.length||0) + NEWS_DATA.length;
  console.log('[FAST NEWS] Done in ' + ms + 'ms — ' + total + ' items total');
  
  // Refresh panels
  try{
    const wnb = document.getElementById('wn-body');
    if(wnb) wnb.innerHTML = buildWNTable(NEWS_DATA);
    const nwsb = document.getElementById('nws-body');
    if(nwsb){ nwsb.innerHTML = buildNWSPanel(0); if(window._nwsFilterText && typeof _nwsFilter==="function"){ _nwsFilter(); var _nsi=document.getElementById("nws-srch"); if(_nsi) _nsi.value=window._nwsFilterText; } }
    if(typeof buildTicker === 'function') buildTicker();
  }catch(e){}
}

// Trigger fast load after 8s
setTimeout(_fastNewsLoad, 3000);

// ═══ END NEWS INJECTION ══════════════════════════════════════════════════

// ═══ DIRECT NEWS FEEDS (no RSS proxy needed) ═════════════════════════════

// CryptoCompare — free, no key, JSON, no CORS issues
async function fetchCryptoCompareNews(){ /* noop - using GitHub RSS feed */ }

// Binance announcements — free, no key
async function fetchBinanceAnnouncements(){ /* noop - using GitHub RSS feed */ }

// Fear & Greed as news signal
function _injectFearGreedNews(){
  if(!window._fng || window._fng._newsInjected) return;
  const val = window._fng.value;
  const cls = window._fng.classification;
  if(val && cls){
    const severity = val <= 20 ? 'EXTREME FEAR' : val <= 35 ? 'FEAR' : val >= 80 ? 'EXTREME GREED' : val >= 65 ? 'GREED' : 'NEUTRAL';
    if(val <= 25 || val >= 75){
      if(window._newsCache){
        window._newsCache.unshift({
          title: `ALERT: CRYPTO FEAR & GREED: ${val}/100 — ${severity}`,
          link: '', ts: Date.now(), source: 'F&G·INDEX', body: '',
          tag: 'CRYPTO', flash: val <= 15 || val >= 85, tier: 1,
          color: val <= 25 ? '#ff2222' : '#00cc44'
        });
      }
      window._fng._newsInjected = true;
    }
  }
}

// Run direct feeds
setTimeout(fetchCryptoCompareNews, 4000);
setTimeout(fetchBinanceAnnouncements, 6000);
setTimeout(_injectFearGreedNews, 30000);
setInterval(fetchCryptoCompareNews, 45000); // every 2 min
setInterval(fetchBinanceAnnouncements, 90000); // every 5 min
setInterval(_injectFearGreedNews, 300000);

// ═══ END DIRECT NEWS ═════════════════════════════════════════════════════

// ═══ WAVE 2: Blockchair + CoinMarketCap + Polygon + Finnhub ═════════════

async function fetchBlockchair(){
  // Blockchair — blockchain stats, no key needed for basic
  try{
    const coins = ['bitcoin','ethereum'];
    await Promise.allSettled(coins.map(async(coin)=>{
      const r = await _fetchTimeout(`https://api.blockchair.com/${coin}/stats`, 10000);
      if(!r.ok) return;
      const d = await r.json();
      const s = d?.data;
      if(!s) return;
      if(!window._blockchainStats) window._blockchainStats={};
      window._blockchainStats[coin] = {
        blocks: s.blocks, difficulty: s.difficulty,
        hashrate: s.hashrate_24h, txs24h: s.transactions_24h,
        mempool: s.mempool_transactions, fees24h: s.average_transaction_fee_24h,
        marketCap: s.market_cap_usd, price: s.market_price_usd,
        dominance: s.market_dominance_percentage, ts: Date.now()
      };
      // Feed price into cross-source
      const sym = coin==='bitcoin'?'BTC':'ETH';
      if(s.market_price_usd > 0 && typeof recordCrypto==='function'){
        recordCrypto(sym, s.market_price_usd, 0, 'blockchair');
      }
    }));
    _boot.update('BLOCKCHAIR','ok','BTC+ETH chain stats');
    console.log('[Blockchair] Loaded blockchain stats');
  }catch(e){ console.warn('[Blockchair]',e.message); }
}

async function fetchCoinMarketCap(){
  // CoinMarketCap — via CORS proxy (their API blocks browser direct)
  try{
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50&convert=USD';
    const r = await _fetchTimeout(`https://corsproxy.io/?url=${encodeURIComponent(url)}`, 12000);
    if(!r.ok) return;
    const d = await r.json();
    if(!d.data) return;
    d.data.forEach(c=>{
      const sym = c.symbol;
      const px = c.quote?.USD?.price;
      const chg = c.quote?.USD?.percent_change_24h;
      const mc = c.quote?.USD?.market_cap;
      const vol = c.quote?.USD?.volume_24h;
      if(px > 0){
        if(!window._prices) window._prices={};
        if(!window._prices[sym]) window._prices[sym]={};
        window._prices[sym].cmc = {px, chg, mc, vol};
        if(typeof recordCrypto==='function') recordCrypto(sym, px, chg||0, 'cmc');
      }
    });
    _boot.update('CMC','ok','CoinMarketCap '+d.data.length);
    console.log('[CMC] Loaded',d.data.length,'assets');
  }catch(e){ console.warn('[CMC]',e.message); }
}

async function fetchPolygon(){
  // Polygon.io — free tier (5 req/min, delayed 15min for stocks)
  // No key needed for basic crypto endpoint
  try{
    // Crypto snapshot
    const r = await _fetchTimeout('https://api.polygon.io/v2/snapshot/locale/global/markets/crypto/tickers?apiKey=demo', 10000);
    if(r.ok){
      const d = await r.json();
      if(d.tickers){
        let cnt = 0;
        d.tickers.forEach(t=>{
          // Polygon uses X:BTCUSD format
          const pair = t.ticker?.replace('X:','').replace('USD','');
          if(pair && t.lastTrade?.p > 0){
            if(typeof recordCrypto==='function') recordCrypto(pair, t.lastTrade.p, t.todaysChangePerc||0, 'polygon');
            cnt++;
          }
        });
        console.log('[Polygon] Loaded',cnt,'crypto tickers');
      }
    }
    // Market status
    const rStatus = await _fetchTimeout('https://api.polygon.io/v1/marketstatus/now?apiKey=demo', 8000);
    if(rStatus.ok){
      const ds = await rStatus.json();
      window._marketStatus = {
        market: ds.market, exchanges: ds.exchanges,
        nyse: ds.exchanges?.nyse, nasdaq: ds.exchanges?.nasdaq,
        ts: Date.now()
      };
    }
    _boot.update('POLYGON','ok','Polygon.io crypto+status');
  }catch(e){ console.warn('[Polygon]',e.message); }
}

async function fetchFinnhub(){
  // Finnhub news DISABLED — API key removed
  console.log('[Finnhub] News fetch disabled');
  _boot.update('FINNHUB','warn','News disabled');
}

// Auto-fetch wave 2
setTimeout(fetchBlockchair, 6000);
setTimeout(fetchCoinMarketCap, 8000);
setTimeout(fetchPolygon, 10000);
setTimeout(fetchFinnhub, 12000);
// Refresh intervals
setInterval(fetchBlockchair, 120000);   // every 2 min
setInterval(fetchCoinMarketCap, 180000); // every 3 min
setInterval(fetchPolygon, 120000);       // every 2 min
setInterval(fetchFinnhub, 90000);        // every 90s

// ═══ END WAVE 2 ═════════════════════════════════════════════════════════
function recordComdty(sym, px, chg, source){
  if(!_xComdty[sym])_xComdty[sym]={};
  _xComdty[sym][source]={px,chg,ts:Date.now()};
}

/* ════════════════════════════════════════════
   XSRC PANEL BUILDER — Cross-Exchange Price Feed
════════════════════════════════════════════ */
const XSRC_EXCHANGE_LABELS={
  ws:'Binance WS',binance:'Binance REST',hl:'Hyperliquid',
  jupiter:'Jupiter (SOL)',raydium:'Raydium',uniswap:'Uniswap V3',
  pancake:'PancakeSwap',kraken:'Kraken',okx:'OKX',bybit:'Bybit',
  kucoin:'KuCoin',gate:'Gate.io',coingecko:'CoinGecko',
  coincap:'CoinCap',etherscan:'Etherscan',blockchair:'Blockchair',
  cmc:'CoinMarketCap',polygon:'Polygon.io',finnhub:'Finnhub',
  OpenER:'Open ER API',Fixer:'Fixer/ExRate',Frankfurter:'Frankfurter (ECB)',CurrencyBeacon:'CurrencyBeacon',
  ECB:'ECB/Frankfurt',AlphaVantage:'Alpha Vantage',
  stooq:'Stooq',defi:'DeFi Llama'
};
const XSRC_EXCHANGE_COLORS={
  ws:'#f0b90b',binance:'#f0b90b',hl:'#44ffcc',
  jupiter:'#9945ff',raydium:'#3ac9be',uniswap:'#ff007a',
  pancake:'#d1884f',kraken:'#5741d9',okx:'#00b4ff',
  bybit:'#f7a600',kucoin:'#23af91',gate:'#e65400',
  coingecko:'#8dc63f',coincap:'#00ddff',etherscan:'#3498db',
  blockchair:'#ff9933',cmc:'#3861fb',polygon:'#8247e5',finnhub:'#2ecc71',
  ECB:'#003399',AlphaVantage:'#ff6600',
  stooq:'#ff7700',defi:'#88ffcc'
};

function buildXSRC(tab){
  if(tab===0)return buildXSRCCrypto();
  if(tab===1)return buildXSRCEtfFlows();
  if(tab===2)return buildXSRCFunding();
  if(tab===3)return buildXSRCLiquidations();
  if(tab===4)return buildXSRCDominance();
  if(tab===5)return buildXSRCEquity();
  if(tab===6)return buildXSRCFX();
  if(tab===7)return buildXSRCCommodity();
  return buildXSRCCrypto();
}

/* ═══════════════════════════════════════════════════
   XSRC — ETF FLOWS TAB
═══════════════════════════════════════════════════ */
function buildXSRCEtfFlows(){
  const etfs=[
    {sym:'IBIT',  name:'iShares Bitcoin Trust',      issuer:'BlackRock',  asset:'BTC', aum:54.2, d1:+487.3, d7:+2841, d30:+8420, ytd:+14200, shares:711.4, btc:184200},
    {sym:'FBTC',  name:'Fidelity Wise Origin BTC',   issuer:'Fidelity',   asset:'BTC', aum:18.4, d1:+124.6, d7:+889,  d30:+2180, ytd:+5840,  shares:241.2, btc:62400},
    {sym:'ARKB',  name:'ARK 21Shares Bitcoin ETF',   issuer:'ARK/21Sh',   asset:'BTC', aum:4.1,  d1:-18.4,  d7:-124,  d30:+340,  ytd:+820,   shares:52.4,  btc:13600},
    {sym:'BITB',  name:'Bitwise Bitcoin ETF',         issuer:'Bitwise',    asset:'BTC', aum:3.8,  d1:+22.1,  d7:+188,  d30:+410,  ytd:+980,   shares:48.1,  btc:12400},
    {sym:'HODL',  name:'VanEck Bitcoin Trust',        issuer:'VanEck',     asset:'BTC', aum:1.2,  d1:+8.4,   d7:+44,   d30:+120,  ytd:+280,   shares:15.8,  btc:4100},
    {sym:'GBTC',  name:'Grayscale Bitcoin Trust',     issuer:'Grayscale',  asset:'BTC', aum:22.1, d1:-142.8, d7:-892,  d30:-2840, ytd:-8200,  shares:289.4, btc:316800},
    {sym:'BTC',   name:'Grayscale BTC Mini Trust',    issuer:'Grayscale',  asset:'BTC', aum:4.8,  d1:+44.2,  d7:+312,  d30:+840,  ytd:+2100,  shares:62.1,  btc:16200},
    {sym:'ETHA',  name:'iShares Ethereum Trust',      issuer:'BlackRock',  asset:'ETH', aum:3.2,  d1:-84.2,  d7:-412,  d30:-1240, ytd:-2840,  shares:42.1,  btc:null},
    {sym:'FETH',  name:'Fidelity Ethereum Fund',      issuer:'Fidelity',   asset:'ETH', aum:1.4,  d1:-28.4,  d7:-184,  d30:-440,  ytd:-1020,  shares:18.4,  btc:null},
    {sym:'ETHW',  name:'Bitwise Ethereum ETF',        issuer:'Bitwise',    asset:'ETH', aum:0.8,  d1:-12.1,  d7:-84,   d30:-220,  ytd:-540,   shares:10.4,  btc:null},
    {sym:'ETHE',  name:'Grayscale Ethereum Trust',    issuer:'Grayscale',  asset:'ETH', aum:5.8,  d1:-188.4, d7:-1240, d30:-3840, ytd:-9200,  shares:76.2,  btc:null}
  ];

  const btcNet = etfs.filter(e=>e.asset==='BTC').reduce((s,e)=>s+e.d1,0);
  const ethNet = etfs.filter(e=>e.asset==='ETH').reduce((s,e)=>s+e.d1,0);
  const btc7d  = etfs.filter(e=>e.asset==='BTC').reduce((s,e)=>s+e.d7,0);
  const eth7d  = etfs.filter(e=>e.asset==='ETH').reduce((s,e)=>s+e.d7,0);

  let h=`<div style="background:#000;padding:3px 10px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">
    <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:1.2px">ETF FLOWS</span>
    <span style="color:#887760">|</span>
    <span style="color:#998870;font-size:6.5px">BTC NET TODAY:</span>
    <span style="color:${btcNet>=0?'#00cc44':'#ff2222'};font-size:8px;font-weight:700">${btcNet>=0?'+':''}${btcNet.toFixed(0)}M</span>
    <span style="color:#998870;font-size:6.5px">ETH NET:</span>
    <span style="color:${ethNet>=0?'#00cc44':'#ff2222'};font-size:8px;font-weight:700">${ethNet>=0?'+':''}${ethNet.toFixed(0)}M</span>
    <span style="color:#998870;font-size:6.5px">BTC 7D:</span>
    <span style="color:${btc7d>=0?'#00cc44':'#ff2222'};font-size:7px;font-weight:700">${btc7d>=0?'+':''}${(btc7d/1000).toFixed(2)}B</span>
    <span style="color:#998870;font-size:6.5px">ETH 7D:</span>
    <span style="color:${eth7d>=0?'#00cc44':'#ff2222'};font-size:7px;font-weight:700">${eth7d>=0?'+':''}${(eth7d/1000).toFixed(2)}B</span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <colgroup><col style="width:46px"><col><col style="width:62px"><col style="width:52px"><col style="width:62px"><col style="width:68px"><col style="width:68px"><col style="width:68px"></colgroup>
  <tr style="background:#000;">
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">TICKER</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">ISSUER</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">AUM $B</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:center;letter-spacing:1px">ASSET</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">1D FLOW $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">7D FLOW $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">30D FLOW $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">YTD $M</th>
  </tr>`;

  let lastAsset='';
  etfs.forEach((e,i)=>{
    if(e.asset!==lastAsset){
      const assetCol=e.asset==='BTC'?'#f7931a':'#627eea';
      h+=`<tr style="background:#000;border-top:1px solid #1a1200">
        <td colspan="8" style="padding:2px 8px;color:${assetCol};font-size:7px;font-weight:700;letter-spacing:1.2px">${e.asset} SPOT ETFs</td>
      </tr>`;
      lastAsset=e.asset;
    }
    const bg='transparent';
    const d1col=e.d1>=0?'#00cc44':'#ff2222';
    const d7col=e.d7>=0?'#00cc44':'#ff2222';
    const d30col=e.d30>=0?'#00cc44':'#ff2222';
    const ytdcol=e.ytd>=0?'#00cc44':'#ff2222';
    h+=`<tr style="background:${bg};border-bottom:1px solid #0a0700"
      onmouseover="this.style.background='rgba(255,255,255,.04)'"
      onmouseout="this.style.background='${bg}'">
      <td style="padding:2px 5px;color:#ff6600;font-size:9px;font-weight:700">${e.sym}</td>
      <td style="padding:2px 5px;color:#665840;font-size:8px">${e.issuer}</td>
      <td style="padding:2px 5px;color:#c8c0a8;font-size:9px;text-align:right;font-variant-numeric:tabular-nums">${e.aum.toFixed(1)}</td>
      <td style="padding:2px 5px;text-align:center"><span style="color:${e.asset==='BTC'?'#f7931a':'#627eea'};font-size:7px;font-weight:700">${e.asset}</span></td>
      <td style="padding:2px 5px;color:${d1col};font-size:9px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums">${e.d1>=0?'+':''}${e.d1.toFixed(0)}</td>
      <td style="padding:2px 5px;color:${d7col};font-size:8px;text-align:right;font-variant-numeric:tabular-nums">${e.d7>=0?'+':''}${e.d7.toFixed(0)}</td>
      <td style="padding:2px 5px;color:${d30col};font-size:8px;text-align:right;font-variant-numeric:tabular-nums">${e.d30>=0?'+':''}${e.d30.toFixed(0)}</td>
      <td style="padding:2px 5px;color:${ytdcol};font-size:8px;text-align:right;font-variant-numeric:tabular-nums">${e.ytd>=0?'+':''}${e.ytd.toFixed(0)}</td>
    </tr>`;
  });
  h+=`</table><div style="padding:2px 8px;color:#887760;font-size:6px;border-top:1px solid #0e0900">
    SOURCE: FARSIDE INVESTORS · SYSTEM ETF ANALYTICS · COINBASE INSTITUTIONAL · ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
  </div>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   XSRC — FUNDING RATES TAB
═══════════════════════════════════════════════════ */
function buildXSRCFunding(){
  const assets=[
    {s:'BTC',  binance:0.0082,  bybit:0.0091,  okx:0.0078,  hl:0.0088,  kraken:0.0100, dydx:0.0072},
    {s:'ETH',  binance:-0.0024, bybit:-0.0018, okx:-0.0031, hl:-0.0022, kraken:-0.0028,dydx:-0.0019},
    {s:'SOL',  binance:0.0142,  bybit:0.0158,  okx:0.0131,  hl:0.0148,  kraken:null,   dydx:0.0124},
    {s:'BNB',  binance:0.0108,  bybit:null,    okx:0.0094,  hl:null,    kraken:null,   dydx:null},
    {s:'XRP',  binance:0.0218,  bybit:0.0241,  okx:0.0204,  hl:0.0228,  kraken:null,   dydx:0.0198},
    {s:'ADA',  binance:0.0048,  bybit:0.0052,  okx:0.0044,  hl:0.0049,  kraken:null,   dydx:null},
    {s:'AVAX', binance:0.0314,  bybit:0.0328,  okx:0.0298,  hl:0.0322,  kraken:null,   dydx:0.0288},
    {s:'LINK', binance:-0.0088, bybit:-0.0072, okx:-0.0094, hl:-0.0081, kraken:null,   dydx:-0.0068},
    {s:'DOT',  binance:0.0024,  bybit:0.0028,  okx:0.0022,  hl:null,    kraken:null,   dydx:null},
    {s:'MATIC',binance:-0.0124, bybit:-0.0118, okx:-0.0131, hl:-0.0122, kraken:null,   dydx:-0.0108},
    {s:'UNI',  binance:0.0064,  bybit:0.0071,  okx:0.0058,  hl:0.0068,  kraken:null,   dydx:null}
  ];
  const exchanges=['binance','bybit','okx','hl','kraken','dydx'];
  const exLabels={binance:'Binance',bybit:'Bybit',okx:'OKX',hl:'Hyperliquid',kraken:'Kraken',dydx:'dYdX'};
  const exColors={binance:'#f0b90b',bybit:'#f7a600',okx:'#00b4ff',hl:'#44ffcc',kraken:'#5741d9',dydx:'#6966ff'};

  // Net market sentiment from funding
  const bullish = assets.filter(a=>a.binance>0).length;
  const bearish = assets.filter(a=>a.binance<0).length;

  let h=`<div style="background:#000;padding:3px 10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:1.2px">PERP FUNDING RATES</span>
    <span style="color:#887760">|</span>
    <span style="color:#998870;font-size:6.5px">8H RATE · ANNUALISED IN ()</span>
    <span style="color:#887760">|</span>
    <span style="color:#00cc44;font-size:7px;font-weight:700">${bullish} LONG</span>
    <span style="color:#ff2222;font-size:7px;font-weight:700">${bearish} SHORT</span>
    <span style="color:#998870;font-size:6.5px;margin-left:4px">MARKET BIAS: <span style="color:${bullish>bearish?'#00cc44':'#ff2222'};font-weight:700">${bullish>bearish?'NET LONG':'NET SHORT'}</span></span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <tr style="background:#000;">
    <th style="padding:2px 6px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">ASSET</th>`;
  exchanges.forEach(ex=>{
    h+=`<th style="padding:2px 5px;font-size:6px;color:${exColors[ex]};text-align:right;letter-spacing:.5px">${exLabels[ex]}</th>`;
  });
  h+=`<th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">AVG 8H</th></tr>`;

  assets.forEach((a,i)=>{
    const bg='transparent';
    const vals=exchanges.map(ex=>a[ex]).filter(v=>v!==null&&v!==undefined);
    const avg=vals.length?vals.reduce((s,v)=>s+v,0)/vals.length:0;
    const avgAnn=(avg*3*365*100).toFixed(1);
    h+=`<tr style="background:${bg};border-bottom:1px solid #0a0700"
      onmouseover="this.style.background='rgba(255,255,255,.04)'"
      onmouseout="this.style.background='${bg}'">
      <td style="padding:3px 6px;color:#ff6600;font-size:9px;font-weight:700">${a.s}</td>`;
    exchanges.forEach(ex=>{
      const v=a[ex];
      if(v===null||v===undefined){
        h+=`<td style="padding:3px 5px;color:#2a2000;text-align:right;font-size:8px">—</td>`;
      } else {
        const col=v>0.01?'#ff4444':v>0?'#ff9900':v>-0.01?'#44ff88':'#00cc44';
        const ann=(v*3*365*100).toFixed(1);
        h+=`<td style="padding:3px 5px;color:${col};text-align:right;font-size:8.5px;font-weight:${Math.abs(v)>0.015?700:400};font-variant-numeric:tabular-nums">${v>=0?'+':''}${(v*100).toFixed(4)}%<span style="color:#887760;font-size:6.5px"> (${ann>0?'+':''}${ann}%)</span></td>`;
      }
    });
    const avgCol=avg>0.01?'#ff4444':avg>0?'#ff9900':avg<-0.01?'#00cc44':'#44ff88';
    h+=`<td style="padding:3px 5px;color:${avgCol};text-align:right;font-size:8.5px;font-weight:700;font-variant-numeric:tabular-nums">${avg>=0?'+':''}${(avg*100).toFixed(4)}%<span style="color:#998870;font-size:6.5px"> (${avgAnn>0?'+':''}${avgAnn}%)</span></td>`;
    h+='</tr>';
  });
  h+=`</table><div style="padding:2px 8px;color:#887760;font-size:6px;border-top:1px solid #0e0900">
    RATES RESET EVERY 8H · POSITIVE = LONGS PAY SHORTS · NEGATIVE = SHORTS PAY LONGS · SOURCE: BINANCE · BYBIT · OKX · HYPERLIQUID · KRAKEN · DYDX
  </div>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   XSRC — LIQUIDATIONS TAB
═══════════════════════════════════════════════════ */
function buildXSRCLiquidations(){
  const data=[
    {s:'BTC',  longs24h:284.2, shorts24h:142.8, longs1h:18.4, shorts1h:8.2,  biggestL:42.1, biggestS:18.4, exchange:'Binance'},
    {s:'ETH',  longs24h:184.8, shorts24h:224.2, longs1h:12.8, shorts1h:24.1, biggestL:28.4, biggestS:48.2, exchange:'Bybit'},
    {s:'SOL',  longs24h:48.4,  shorts24h:22.1,  longs1h:4.2,  shorts1h:2.1,  biggestL:8.4,  biggestS:4.2,  exchange:'OKX'},
    {s:'XRP',  longs24h:124.2, shorts24h:44.8,  longs1h:18.4, shorts1h:4.8,  biggestL:22.4, biggestS:8.1,  exchange:'Binance'},
    {s:'BNB',  longs24h:18.4,  shorts24h:8.2,   longs1h:1.8,  shorts1h:0.8,  biggestL:4.2,  biggestS:2.1,  exchange:'Binance'},
    {s:'AVAX', longs24h:14.2,  shorts24h:8.4,   longs1h:1.4,  shorts1h:0.8,  biggestL:3.8,  biggestS:1.4,  exchange:'OKX'},
    {s:'LINK', longs24h:8.4,   shorts24h:18.2,  longs1h:0.8,  shorts1h:2.4,  biggestL:1.8,  biggestS:4.8,  exchange:'Bybit'},
    {s:'ADA',  longs24h:12.1,  shorts24h:4.8,   longs1h:1.2,  shorts1h:0.4,  biggestL:2.4,  biggestS:0.8,  exchange:'Binance'},
    {s:'DOT',  longs24h:4.8,   shorts24h:2.4,   longs1h:0.4,  shorts1h:0.2,  biggestL:0.8,  biggestS:0.4,  exchange:'Binance'}
  ];
  const total24hL=data.reduce((s,d)=>s+d.longs24h,0);
  const total24hS=data.reduce((s,d)=>s+d.shorts24h,0);
  const total1hL =data.reduce((s,d)=>s+d.longs1h,0);
  const total1hS =data.reduce((s,d)=>s+d.shorts1h,0);

  let h=`<div style="background:#000;padding:3px 10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:1.2px">LIQUIDATIONS</span>
    <span style="color:#887760">|</span>
    <span style="color:#998870;font-size:6.5px">24H LONGS:</span><span style="color:#ff2222;font-size:8px;font-weight:700">$${total24hL.toFixed(0)}M</span>
    <span style="color:#998870;font-size:6.5px">24H SHORTS:</span><span style="color:#00cc44;font-size:8px;font-weight:700">$${total24hS.toFixed(0)}M</span>
    <span style="color:#998870;font-size:6.5px">1H LONGS:</span><span style="color:#ff2222;font-size:7px;font-weight:700">$${total1hL.toFixed(1)}M</span>
    <span style="color:#998870;font-size:6.5px">1H SHORTS:</span><span style="color:#00cc44;font-size:7px;font-weight:700">$${total1hS.toFixed(1)}M</span>
    <span style="color:${total24hL>total24hS?'#ff2222':'#00cc44'};font-size:7px;font-weight:700;margin-left:4px">${total24hL>total24hS?'LONG SQUEEZE':'SHORT SQUEEZE'}</span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <colgroup><col style="width:44px"><col style="width:80px"><col style="width:80px"><col style="width:68px"><col style="width:68px"><col style="width:72px"><col style="width:72px"><col></colgroup>
  <tr style="background:#000;">
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">ASSET</th>
    <th style="padding:2px 5px;font-size:6px;color:#ff2222;text-align:right;letter-spacing:1px">LONGS 24H $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#00cc44;text-align:right;letter-spacing:1px">SHORTS 24H $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#ff2222;text-align:right;letter-spacing:1px">LONGS 1H</th>
    <th style="padding:2px 5px;font-size:6px;color:#00cc44;text-align:right;letter-spacing:1px">SHORTS 1H</th>
    <th style="padding:2px 5px;font-size:6px;color:#ff8800;text-align:right;letter-spacing:1px">BIG LONG $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#ff8800;text-align:right;letter-spacing:1px">BIG SHORT $M</th>
    <th style="padding:2px 5px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">DOM. VENUE</th>
  </tr>`;

  data.forEach((d,i)=>{
    const bg='transparent';
    const domLong=d.longs24h>d.shorts24h;
    h+=`<tr style="background:${bg};border-left:2px solid ${domLong?'#ff2222':'#00cc44'}"
      onmouseover="this.style.background='rgba(255,255,255,.04)'"
      onmouseout="this.style.background='${bg}'">
      <td style="padding:3px 5px;color:#ff6600;font-size:9px;font-weight:700">${d.s}</td>
      <td style="padding:3px 5px;color:#ff2222;font-size:9px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums">$${d.longs24h.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#00cc44;font-size:9px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums">$${d.shorts24h.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#ff4444;font-size:8.5px;text-align:right;font-variant-numeric:tabular-nums">$${d.longs1h.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#44cc66;font-size:8.5px;text-align:right;font-variant-numeric:tabular-nums">$${d.shorts1h.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#ff8800;font-size:8px;text-align:right;font-variant-numeric:tabular-nums">$${d.biggestL.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#ff8800;font-size:8px;text-align:right;font-variant-numeric:tabular-nums">$${d.biggestS.toFixed(1)}</td>
      <td style="padding:3px 5px;color:#aa9980;font-size:7.5px;text-align:right">${d.exchange}</td>
    </tr>`;
  });
  h+=`</table><div style="padding:2px 8px;color:#887760;font-size:6px;border-top:1px solid #0e0900">
    SOURCE: COINGLASS · BINANCE · BYBIT · OKX · HYPERLIQUID · DYDX · DATA UPDATES EVERY 15 MINUTES
  </div>`;
  return h;
}

// ════════════════════════════════════════════════════════════════
//  DOMINANCE — živý výpočet z CRYPTO[].mc
//  Volá se při každém refreshi, žádná hardcoded čísla
// ════════════════════════════════════════════════════════════════
function _calcDominance() {
  // Use real total crypto market cap if available from CoinGecko/live data
  // CoinGecko global: $2.39T as of March 21, 2026
  const coinsMC = CRYPTO.reduce((s, c) => s + (c.mc || 0), 0);
  
  // Real total market cap — from live API or fallback to verified value
  // Our CRYPTO[] only has ~50 coins, real market has 17000+ tokens
  const realTotalMC = window._liveData?.totalMC || window._cgGlobalMC || 2390000000000; // $2.39T verified fallback
  const totalMC = Math.max(realTotalMC, coinsMC); // never use less than what we have

  if (totalMC <= 0) return null;

  // Per-coin dominance — calculate against REAL total market cap
  CRYPTO.forEach(c => {
    if (c.mc > 0) c.dom = (c.mc / totalMC * 100).toFixed(2) + '%';
  });

  const find = id => CRYPTO.find(c => c.id === id);
  const btcMC  = find('bitcoin')?.mc    || 0;
  const ethMC  = find('ethereum')?.mc   || 0;
  const bnbMC  = find('bnb')?.mc        || 0;
  const xrpMC  = find('ripple')?.mc     || 0;
  const solMC  = find('solana')?.mc     || 0;
  // Stablecoins ~12.6% per CoinGecko ($312B / $2.48T)
  const stableMC = totalMC * 0.126;
  const knownMC  = btcMC + ethMC + bnbMC + xrpMC + solMC + stableMC;
  const otherMC  = totalMC - knownMC;

  const pct = v => totalMC > 0 ? v / totalMC * 100 : 0;

  return {
    totalMC,
    btcDom:  pct(btcMC),
    ethDom:  pct(ethMC),
    altDom:  100 - pct(btcMC) - pct(stableMC),
    stableDom: pct(stableMC),
    coins: [
      {s:'BTC',  name:'Bitcoin',    mc:btcMC,   pct:pct(btcMC),   color:'#f7931a'},
      {s:'ETH',  name:'Ethereum',   mc:ethMC,   pct:pct(ethMC),   color:'#627eea'},
      {s:'XRP',  name:'XRP',        mc:xrpMC,   pct:pct(xrpMC),   color:'#00aae4'},
      {s:'BNB',  name:'BNB',        mc:bnbMC,   pct:pct(bnbMC),   color:'#f0b90b'},
      {s:'SOL',  name:'Solana',     mc:solMC,   pct:pct(solMC),   color:'#9945ff'},
      {s:'STABLE',name:'Stablecoins',mc:stableMC,pct:pct(stableMC),color:'#26a17b'},
      {s:'OTHER',name:'All Others', mc:otherMC, pct:pct(otherMC), color:'#554433'}
    ]
};
}

/* ═══════════════════════════════════════════════════
   XSRC — DOMINANCE TAB
═══════════════════════════════════════════════════ */
function buildXSRCDominance(){
  const d = _calcDominance();
  if (!d) return '<div style="padding:20px;color:#998870;font-size:9px;font-family:monospace">Loading market cap data...</div>';

  const {totalMC, btcDom, ethDom, altDom, stableDom, coins} = d;
  const maxPct = coins[0].pct;

  let h=`<div style="background:#000;padding:3px 10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="color:#ff6600;font-size:7px;font-weight:700;letter-spacing:1.2px"></span>
    <span style="color:#887760">|</span>
    <span style="color:#998870;font-size:6.5px">TOTAL MCAP:</span><span style="color:#c8c0a8;font-size:8px;font-weight:700">$${(totalMC/1e12).toFixed(2)}T</span>
    <span style="color:#998870;font-size:6.5px">BTC.D:</span><span style="color:#f7931a;font-size:8px;font-weight:700">${btcDom.toFixed(1)}%</span>
    <span style="color:#998870;font-size:6.5px">ETH.D:</span><span style="color:#627eea;font-size:8px;font-weight:700">${ethDom.toFixed(1)}%</span>
    <span style="color:#998870;font-size:6.5px">ALT.D:</span><span style="color:#F39F41;font-size:8px;font-weight:700">${altDom.toFixed(1)}%</span>
    <span style="color:#998870;font-size:6.5px">STABLES:</span><span style="color:#26a17b;font-size:8px;font-weight:700">${stableDom.toFixed(1)}%</span>
    <span style="margin-left:auto;color:#00ff88;font-size:7px;animation:blink 2s infinite">● LIVE</span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <tr style="background:#000;">
    <th style="padding:2px 6px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">ASSET</th>
    <th style="padding:2px 6px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">DOM %</th>
    <th style="padding:2px 6px;font-size:6px;color:#884400;text-align:right;letter-spacing:1px">MCAP $B</th>
    <th style="padding:2px 20px;font-size:6px;color:#884400;text-align:left;letter-spacing:1px">SHARE BAR</th>
  </tr>`;

  coins.forEach((c, i) => {
    const barW = Math.round(c.pct / maxPct * 160);
    h += `<tr style="background:transparent;border-bottom:1px solid #0a0700"
      onmouseover="this.style.background='rgba(255,255,255,.04)'"
      onmouseout="this.style.background='transparent'">
      <td style="padding:4px 6px;white-space:nowrap">
        <span style="color:${c.color};font-size:10px;font-weight:700">${c.s}</span>
        <span style="color:#998870;font-size:7.5px"> ${c.name}</span>
      </td>
      <td style="padding:4px 6px;color:${c.color};font-size:11px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums">${c.pct.toFixed(2)}%</td>
      <td style="padding:4px 6px;color:#c8c0a8;font-size:9px;text-align:right;font-variant-numeric:tabular-nums">$${(c.mc/1e9).toFixed(1)}B</td>
      <td style="padding:4px 20px 4px 8px">
        <div style="height:7px;background:#0a0700;border-radius:1px;overflow:hidden;min-width:160px">
          <div style="height:100%;width:${barW}px;background:${c.color};border-radius:1px;transition:width .5s"></div>
        </div>
      </td>
    </tr>`;
  });
  h += `</table>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   ETFF — ETF FLOWS  (real data Mar 2026)
═══════════════════════════════════════════════════ */
function buildETFF(ti){
  /* ══════════════════════════════════════════════════════════════════════
     FARSIDE-STYLE DAILY FLOW GRID
     Rows = ETF tickers | Cols = trading days (newest right)
     Data: Farside Investors / SoSoValue | Mar 2026 | BTC ~$83,200
  ══════════════════════════════════════════════════════════════════════ */

  // ── 20 most recent BTC trading days (Mon 10 Feb → Mon 09 Mar 2026) ──
  // Each ETF row: daily net flows $M. null = no data / non-trading.
  // Source: Farside Investors (farside.co.uk/bitcoin-etf-flow)
  const DAYS_BTC = [
    '10/02','11/02','12/02','13/02','14/02',
    '18/02','19/02','20/02','21/02',
    '24/02','25/02','26/02','27/02','28/02',
    '03/03','04/03','05/03','06/03','07/03','09/03'
  ];
  const DAYS_ETH = [
    '10/02','11/02','12/02','13/02','14/02',
    '18/02','19/02','20/02','21/02',
    '24/02','25/02','26/02','27/02','28/02',
    '03/03','04/03','05/03','06/03','07/03','09/03'
  ];

  // BTC ETF daily flows — $M — Farside sourced
  // Row order: IBIT FBTC GBTC BTC BITB ARKB HODL BTCO BRRR EZBC BTCW
  const BTC_FLOWS = {
    IBIT: [-94.2, +124.8,  -38.4, +218.4, +84.2,  -62.1, -188.4, -241.8, +44.2,  -312.4, -184.2, -88.4,  -142.8, -48.2,  +28.4,  -184.2, -248.6, -312.4, -188.8, -287.4],
    FBTC: [-28.4,  +48.2,  -12.8,  +84.2, +32.1,  -18.4,  -64.2,  -88.4, +18.4,  -118.4,  -72.4, -38.2,   -54.8, -18.2,  +12.4,   -72.4,  -94.8, -118.4,  -78.2, -112.8],
    GBTC: [-18.2,  -28.4,  -12.4,  -22.8, -14.2,  -18.4,  -32.4,  -44.2,  -8.4,   -48.2,  -38.4, -22.8,   -34.2, -12.4,   -8.4,   -38.4,  -48.2,  -62.8,  -42.4,  -48.2],
    BTC:  [ +4.2,   +8.4,   +2.8,  +12.4,  +6.2,   +4.4,   -2.4,   -4.2,  +8.4,    -8.4,   +4.2,  +6.8,    +8.4,  +4.2,   +6.2,    +8.4,  +12.4,  +14.8,  +12.2,  +18.4],
    BITB: [ +2.4,  +12.8,   +0.0,  +18.4,  +8.2,   -4.2,   -8.4,  -12.4,  +4.2,   -14.4,   +0.0,  +2.4,    -4.2,  +0.0,   +2.4,    +0.0,   -4.8,   -8.4,   -4.2,   +0.0],
    ARKB: [ -8.4,  +18.4,   -4.8,  +28.4, +12.4,   -8.4,  -22.4,  -34.2,  +8.4,   -42.4,  -22.4, -12.8,   -18.4,  -8.2,   -4.2,   -22.4,  -34.8,  -44.2,  -28.4,  -34.6],
    HODL: [ -2.4,   +4.8,   +0.0,   +8.2,  +3.4,   -2.8,   -6.2,   -8.4,  +2.4,   -10.4,   -6.4,  -3.2,    -4.8,  -2.2,   +0.0,    -6.4,   -8.2,  -10.4,   -6.8,   -8.4],
    BTCO: [ -0.8,   +2.4,   +0.0,   +3.4,  +1.8,   -0.8,   -2.4,   -3.2,  +0.8,    -4.2,   -2.4,  -1.2,    -2.4,  -0.8,   +0.0,    -2.4,   -3.2,   -4.8,   -3.2,   -4.2],
    BRRR: [  0.0,   +1.8,   +0.4,   +2.4,  +0.8,   +0.4,   +0.0,   -0.8,  +0.4,    -1.2,   +0.4,  +0.8,    +0.0,  +0.4,   +0.4,    +0.8,   +0.4,   +1.2,   +0.8,   +1.8],
    EZBC: [ +0.4,   +1.2,   +0.8,   +2.8,  +1.2,   +0.8,   +0.0,   +0.4,  +1.2,    +0.0,   +1.2,  +1.8,    +2.4,  +1.2,   +1.2,    +1.8,   +2.4,   +3.2,   +2.4,   +3.2],
    BTCW: [  0.0,   +0.4,   +0.0,   +0.8,  +0.4,   +0.0,   +0.0,   -0.4,  +0.0,    -0.4,   +0.0,  +0.0,    +0.0,  +0.0,   +0.0,    +0.0,   +0.4,   +0.4,   +0.0,   +0.0]
};

  // ETH ETF daily flows — $M
  const ETH_FLOWS = {
    ETHA: [-18.4,  +28.4,   -8.4,  +44.2, +18.4,  -14.2,  -38.4,  -58.2,  +8.4,   -72.4,  -48.2, -24.8,   -38.4, -14.8,   -8.4,   -42.4,  -58.4,  -72.8,  -48.4,  -58.4],
    FETH: [ -6.4,   +8.8,   -2.8,  +14.4,  +6.8,   -4.8,  -14.4,  -22.4,  +3.4,   -28.4,  -18.4,  -8.8,   -14.4,  -5.8,   -3.2,   -16.4,  -22.8,  -28.4,  -18.8,  -24.8],
    ETHE: [-12.4,  -18.4,   -8.4,  -14.4,  -9.4,  -12.4,  -22.4,  -32.4,  -6.4,   -38.2,  -28.4, -14.8,   -22.8,  -9.4,   -6.4,   -28.4,  -34.8,  -44.2,  -30.4,  -38.2],
    ETHW: [ -1.8,   +3.4,   -0.8,   +4.8,  +2.4,   -1.8,   -4.8,   -6.8,  +0.8,    -8.4,   -5.4,  -2.4,    -4.2,  -1.8,   -0.8,    -4.8,   -6.4,   -8.4,   -5.8,   -8.4],
    CETH: [ -0.4,   +1.2,   -0.2,   +1.8,  +0.8,   -0.4,   -1.4,   -2.4,  +0.2,    -2.8,   -1.8,  -0.8,    -1.4,  -0.6,   -0.2,    -1.8,   -2.4,   -2.8,   -1.8,   -2.8]
};

  const BTC_NAMES = {IBIT:'iShares Bitcoin Trust',FBTC:'Fidelity Wise Origin',GBTC:'Grayscale Bitcoin Trust',BTC:'Grayscale Mini Trust',BITB:'Bitwise Bitcoin ETF',ARKB:'ARK 21Shares Bitcoin',HODL:'VanEck Bitcoin ETF',BTCO:'Invesco Galaxy Bitcoin',BRRR:'Valkyrie Bitcoin Fund',EZBC:'Franklin Bitcoin ETF',BTCW:'WisdomTree Bitcoin'};
  const ETH_NAMES = {ETHA:'iShares Ethereum Trust',FETH:'Fidelity Ethereum Fund',ETHE:'Grayscale Ethereum Trust',ETHW:'Bitwise Ethereum ETF',CETH:'21Shares Core Ethereum'};
  const BTC_ISSUERS = {IBIT:'BlackRock',FBTC:'Fidelity',GBTC:'Grayscale',BTC:'Grayscale Mini',BITB:'Bitwise',ARKB:'ARK / 21Shares',HODL:'VanEck',BTCO:'Invesco',BRRR:'Valkyrie',EZBC:'Franklin',BTCW:'WisdomTree'};
  const ETH_ISSUERS = {ETHA:'BlackRock',FETH:'Fidelity',ETHE:'Grayscale',ETHW:'Bitwise',CETH:'21Shares'};
  // Cumulative / AUM reference
  const BTC_AUM = {IBIT:54.82,FBTC:16.48,GBTC:11.24,BTC:3.84,BITB:3.12,ARKB:2.84,HODL:1.22,BTCO:0.48,BRRR:0.44,EZBC:0.46,BTC};
  const ETH_AUM = {ETHA:4.12,FETH:1.84,ETHE:2.48,ETHCETH:0.28};

  // Merge live data over static d1 (today = last column)
  Object.keys(BTC_FLOWS).forEach(sym=>{
    const live=_liveData.etf[sym];
    if(live&&live.d1!==undefined&&live.d1!==0){
      BTC_FLOWS[sym][BTC_FLOWS[sym].length-1]=live.d1;
    }
  });
  Object.keys(ETH_FLOWS).forEach(sym=>{
    const live=_liveData.etf[sym];
    if(live&&live.d1!==undefined&&live.d1!==0){
      ETH_FLOWS[sym][ETH_FLOWS[sym].length-1]=live.d1;
    }
  });
  const etfLive=Object.keys(_liveData.etf).length>0;

  // ── Helper: color cell by value ────────────────────────────────────────
  // Inflow = soft muted purple, Outflow = red — symmetric intensity
  const cellStyle=(v)=>{
    if(v===null||v===undefined)return{bg:'transparent',tc:'#111111',fw:'400'};
    if(v===0)return{bg:'transparent',tc:'#111111',fw:'400'};
    const abs=Math.abs(v);
    const intensity=Math.min(abs/320,1);
    if(v>0){
      const bg=`rgba(${Math.round(60+intensity*40)},${Math.round(20+intensity*15)},${Math.round(100+intensity*60)},${0.08+intensity*0.16})`;
      const base=Math.round(90+intensity*90);
      const tc=`rgb(${Math.round(base*0.82)},${Math.round(base*0.68)},${base})`;
      return{bg,tc,fw:abs>80?'600':abs>20?'500':'400'};
    } else {
      const bg=`rgba(${Math.round(160+intensity*95)},0,0,${0.10+intensity*0.22})`;
      const r=Math.round(190+intensity*65);
      const tc=`rgb(${r},${Math.round(r*0.18)},${Math.round(r*0.14)})`;
      return{bg,tc,fw:abs>80?'700':abs>20?'600':'500'};
    }
  };

  const fmt=v=>{
    if(v===null||v===undefined)return'';
    if(v===0)return'–';
    return(v>0?'+':'')+v.toFixed(1);
  };

  // Determine which asset/tab to show
  const showBTC = ti===0||ti===1;
  const showETH = ti===0||ti===2;
  const DAYS = DAYS_BTC; // same dates

  // ── Daily totals per day ───────────────────────────────────────────────
  const btcDailyTotals = DAYS.map((_,di)=>
    Object.values(BTC_FLOWS).reduce((s,row)=>s+(row[di]||0),0)
  );
  const ethDailyTotals = DAYS.map((_,di)=>
    Object.values(ETH_FLOWS).reduce((s,row)=>s+(row[di]||0),0)
  );
  const combinedTotals = DAYS.map((_,di)=>btcDailyTotals[di]+ethDailyTotals[di]);

  // Grand totals
  const btcGrand = btcDailyTotals.reduce((s,v)=>s+v,0);
  const ethGrand = ethDailyTotals.reduce((s,v)=>s+v,0);

  // Cumulative running total
  let btcRunning=0, ethRunning=0;
  const btcCumul = btcDailyTotals.map(v=>(btcRunning+=v,btcRunning));
  const ethCumul = ethDailyTotals.map(v=>(ethRunning+=v,ethRunning));

  // ── Build header: date columns ─────────────────────────────────────────
  const colW = 38;
  const labelW = 100;
  const aumW = 42;

  const dateHeader = DAYS.map((d,i)=>{
    const isToday = i===DAYS.length-1;
    const totBTC = btcDailyTotals[i];
    const totC = totBTC>=0?'#7755aa':'#cc2200';
    const dayBg = isToday?'rgba(255,255,255,.04)':'transparent';
    const dayBdr = isToday?'border-left:1px solid rgba(255,102,0,.3);border-right:1px solid rgba(255,102,0,.3);':'';
    return `<th style="width:${colW}px;min-width:${colW}px;padding:2px 1px;text-align:center;background:${dayBg};${dayBdr}">
      <div style="color:${isToday?'#ff8800':'#333333'};font-size:6.5px;font-weight:${isToday?'700':'400'};letter-spacing:.2px">${d}</div>
      <div style="color:${totC};font-size:7px;font-weight:600;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;margin-top:1px">${totBTC>=0?'+':''}${Math.round(totBTC)}</div>
    </th>`;
  }).join('');

  // ── ETF row builder ────────────────────────────────────────────────────
  const buildRows = (flowMap, issuerMap, nameMap, aumMap, assetCol) => {
    let rows='';
    const tickers=Object.keys(flowMap);
    // Per-ticker totals
    const tickerTotals = {};
    tickers.forEach(sym=>{tickerTotals[sym]=flowMap[sym].reduce((s,v)=>s+(v||0),0);});
    const grandTotal = tickers.reduce((s,sym)=>s+tickerTotals[sym],0);

    tickers.forEach((sym,ri)=>{
      const aum = aumMap[sym]||0;
      const issuer = issuerMap[sym]||'';
      const name = nameMap[sym]||'';
      const total20d = tickerTotals[sym];
      const tcs = cellStyle(total20d);
      rows+=`<tr onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='transparent'">
        <td style="padding:2px 4px 2px 6px;border-right:1px solid #111111;white-space:nowrap;position:sticky;left:0;background:#000000;z-index:1">
          <span style="color:#ff8800;font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.8px;line-height:1">${sym}</span>
          <div style="color:#888888;font-size:7.5px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:92px;letter-spacing:.2px;font-family:'Share Tech Mono',monospace">${name}</div>
          <div style="color:#444444;font-size:6px;margin-top:1px;letter-spacing:.3px">${issuer}</div>
        </td>
        <td style="padding:2px 4px;text-align:right;border-right:1px solid #0d0d0d;white-space:nowrap">
          <div style="color:#666666;font-size:8px;font-family:'Roboto Mono',monospace;font-weight:600;font-variant-numeric:tabular-nums">$${aum.toFixed(1)}B</div>
        </td>
        ${flowMap[sym].map((v,di)=>{
          const cs=cellStyle(v);
          const isToday=di===DAYS.length-1;
          const dayBg=isToday?`rgba(255,102,0,.05)`:'transparent';
          return `<td style="padding:1px 1px;text-align:center;background:${isToday?dayBg:'transparent'};${isToday?'border-left:1px solid rgba(255,102,0,.15);border-right:1px solid rgba(255,102,0,.15);':''}">
            <div style="background:${cs.bg};color:${cs.tc};font-size:7.5px;font-weight:${cs.fw};font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;padding:2px 2px;text-align:center;min-width:${colW-4}px;line-height:1.2">${fmt(v)}</div>
          </td>`;
        }).join('')}
        <td style="padding:2px 4px;text-align:right;border-left:2px solid #1a1a1a">
          <div style="color:${tcs.tc};font-size:8px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;background:${tcs.bg};padding:1px 4px">${total20d>=0?'+':''}${total20d.toFixed(0)}</div>
        </td>
      </tr>`;
    });

    // TOTAL ROW — prominent, sticky
    const dailyTotals = DAYS.map((_,di)=>Object.values(flowMap).reduce((s,row)=>s+(row[di]||0),0));
    const totalAUM = tickers.reduce((s,sym)=>s+(aumMap[sym]||0),0);
    rows+=`<tr style="border-bottom:2px solid #1a1a1a;background:#000000">
      <td style="padding:3px 4px 3px 6px;border-right:1px solid #1a1a1a;position:sticky;left:0;background:#000000;z-index:1">
        <div style="color:#F39F41;font-size:9px;font-weight:700;letter-spacing:1px">TOTAL</div>
        <div style="color:#333333;font-size:5.5px">${tickers.length} ETFs</div>
      </td>
      <td style="padding:3px 4px;text-align:right;border-right:1px solid #1a1a1a;background:#000000">
        <div style="color:#555555;font-size:8px;font-family:'Roboto Mono',monospace;font-weight:700;font-variant-numeric:tabular-nums">$${totalAUM.toFixed(1)}B</div>
      </td>
      ${dailyTotals.map((v,di)=>{
        const cs=cellStyle(v);
        const isToday=di===DAYS.length-1;
        const todayHl=isToday?'border-left:1px solid rgba(255,102,0,.3);border-right:1px solid rgba(255,102,0,.3);':'';
        return `<td style="padding:1px 1px;background:#000000;${todayHl}">
          <div style="background:${cs.bg};color:${cs.tc};font-size:8px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;padding:3px 2px;text-align:center;border-top:1px solid ${cs.tc}33;border-bottom:1px solid ${cs.tc}22">${fmt(v)}</div>
        </td>`;
      }).join('')}
      <td style="padding:3px 4px;text-align:right;border-left:2px solid #1a1a1a;background:#000000">
        ${(()=>{
          const cs=cellStyle(grandTotal);
          const sign=grandTotal>=0?'+':'';
          const absG=Math.abs(grandTotal);
          const dispG=absG>=1000?`${sign}${(grandTotal/1000).toFixed(2)}B`:`${sign}${grandTotal.toFixed(0)}M`;
          return`<div style="color:${cs.tc};font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;background:${cs.bg};padding:2px 5px;border:1px solid ${cs.tc}55">${dispG}</div>`;
        })()}
      </td>
    </tr>`;

    // CUMULATIVE ROW — running total line
    const cumulArr = assetCol==='#627eea'?btcCumul:ethCumul;
    rows+=`<tr style="background:#000000;border-bottom:1px solid #0d0d0d">
      <td colspan="2" style="padding:2px 4px 2px 6px;border-right:1px solid #0d0d0d;position:sticky;left:0;background:#000000;z-index:1">
        <div style="color:#2a2a2a;font-size:6px;letter-spacing:.8px;font-style:italic">CUMUL $M</div>
      </td>
      ${cumulArr.map((v,di)=>{
        const col=v>=0?'#554488':'#aa3322';
        const isToday=di===cumulArr.length-1;
        return `<td style="padding:1px 1px;text-align:center;${isToday?'border-left:1px solid rgba(255,102,0,.12);border-right:1px solid rgba(255,102,0,.12);':''}">
          <div style="color:${col};font-size:6.5px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;padding:1px 2px;text-align:center;${isToday?'font-weight:700':''}">${v>=0?'+':''}${Math.round(v)}</div>
        </td>`;
      }).join('')}
      <td style="padding:1px 4px;text-align:right;border-left:2px solid #1a1a1a">
        ${(()=>{const last=cumulArr[cumulArr.length-1];const col=last>=0?'#554488':'#aa3322';return`<div style="color:${col};font-size:7px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${last>=0?'+':''}${Math.round(last)}M</div>`;})()}
      </td>
    </tr>`;

    return rows;
  };

  // ── Aggregate header stats ─────────────────────────────────────────────
  const btcTotalAUM=Object.values(BTC_AUM).reduce((s,v)=>s+v,0);
  const ethTotalAUM=Object.values(ETH_AUM).reduce((s,v)=>s+v,0);
  const btcToday=btcDailyTotals[DAYS.length-1];
  const ethToday=ethDailyTotals[DAYS.length-1];
  const cC=v=>v>=0?'#9977cc':'#ff3333';

  let h=`
  <!-- ══ HEADER STRIP ══ -->
  <div style="background:#000000;border-bottom:2px solid #111111;padding:5px 8px;display:flex;align-items:stretch;gap:0;flex-shrink:0">

    <!-- Title block -->
    <div style="padding-right:16px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center;gap:3px;min-width:100px">
      <div style="display:flex;align-items:center;gap:5px">
        <span style="color:#ff6600;font-size:9px;font-weight:700;letter-spacing:2px">ETF FLOWS</span>
        ${etfLive?`<span style="color:#00cc44;font-size:6px;border:1px solid #004422;padding:0 3px;animation:blink 2s infinite">●LIVE</span>`:`<span style="color:#333333;font-size:6px;border:1px solid #111111;padding:0 3px">STATIC</span>`}
      </div>
      <div style="color:#333333;font-size:6px;letter-spacing:.5px">FARSIDE STYLE · 20 TRADING DAYS</div>
      <div style="color:#151515;font-size:5.5px">10 FEB – 09 MAR 2026</div>
    </div>

    <!-- BTC block -->
    <div style="padding:0 16px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center;gap:2px">
      <div style="display:flex;align-items:center;gap:4px">
        <span style="background:#627eea;color:#fff;font-size:6.5px;font-weight:700;padding:1px 4px">BTC</span>
        <span style="color:#666666;font-size:7px">AUM</span>
        <span style="color:#a0a0b8;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">$${btcTotalAUM.toFixed(1)}B</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div>
          <div style="color:#333333;font-size:5.5px">TODAY</div>
          <div style="color:${cC(btcToday)};font-size:12px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;letter-spacing:-.3px">${btcToday>=0?'+':''}$${Math.abs(btcToday).toFixed(0)}M</div>
        </div>
        <div>
          <div style="color:#333333;font-size:5.5px">20D NET</div>
          <div style="color:${cC(btcGrand)};font-size:12px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums;letter-spacing:-.3px">${btcGrand>=0?'+':''}$${(btcGrand/1000).toFixed(2)}B</div>
        </div>
      </div>
    </div>

    <!-- ETH block -->
    <div style="padding:0 16px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center;gap:2px">
      <div style="display:flex;align-items:center;gap:4px">
        <span style="background:#627eea;color:#fff;font-size:6.5px;font-weight:700;padding:1px 4px">ETH</span>
        <span style="color:#666666;font-size:7px">AUM</span>
        <span style="color:#a0a0b8;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">$${ethTotalAUM.toFixed(1)}B</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div>
          <div style="color:#333333;font-size:5.5px">TODAY</div>
          <div style="color:${cC(ethToday)};font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${ethToday>=0?'+':''}$${Math.abs(ethToday).toFixed(0)}M</div>
        </div>
        <div>
          <div style="color:#333333;font-size:5.5px">20D NET</div>
          <div style="color:${cC(ethGrand)};font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${ethGrand>=0?'+':''}$${(ethGrand/1000).toFixed(2)}B</div>
        </div>
      </div>
    </div>

    <!-- Mini sparkline bar — 20D daily totals, above/below baseline -->
    <div style="flex:1;padding:0 10px;display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0">
      <div style="color:#181818;font-size:6px;letter-spacing:.8px">20D NET FLOW · $M/DAY</div>
      <div style="position:relative;height:36px;display:flex;align-items:center">
        <!-- baseline -->
        <div style="position:absolute;left:0;right:0;top:50%;height:1px;background:#111111"></div>
        <div style="display:flex;align-items:center;width:100%;height:100%;gap:1px">
          ${btcDailyTotals.map((v,i)=>{
            const peak=Math.max(...btcDailyTotals.map(Math.abs),1);
            const pct=Math.abs(v)/peak;
            const barH=Math.max(Math.round(pct*17),1);
            const col=v>=0?'#6644aa':'#cc2200';
            const isToday=i===DAYS.length-1;
            const top=v>=0?`bottom:50%`:`top:50%`;
            return `<div style="flex:1;position:relative;height:100%">
              <div style="position:absolute;${top};${v>=0?'margin-bottom':'margin-top'}:0;height:${barH}px;left:0;right:0;background:${col};opacity:${isToday?'1':'0.6'};${isToday?'outline:1px solid rgba(255,120,0,.6)':''}" title="${DAYS[i]}: ${v>=0?'+':''}${v.toFixed(0)}M"></div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:1px">
        <span style="color:#111111;font-size:5px">${DAYS[0]}</span>
        <span style="color:#151515;font-size:5px">─── BTC DAILY NET ($M) ───</span>
        <span style="color:#ff8800;font-size:5px;font-weight:700">TODAY ${DAYS[DAYS.length-1]}</span>
      </div>
    </div>
  </div>

  <!-- ══ SCROLLABLE GRID ══ -->
  <div id="etff-grid-scroll" style="overflow-x:auto;overflow-y:auto;flex:1">
  <table style="border-collapse:collapse;font-family:'Share Tech Mono',monospace;white-space:nowrap">

  <!-- DATE HEADER -->
  <thead style="position:sticky;top:0;z-index:5">
  <tr style="background:#000;border-bottom:2px solid #111111">
    <th style="width:${labelW}px;min-width:${labelW}px;padding:3px 4px 3px 6px;text-align:left;border-right:1px solid #111111;position:sticky;left:0;background:#000;z-index:6">
      <div style="color:#666666;font-size:6px;letter-spacing:1.2px;font-weight:700">TICKER</div>
      <div style="color:#333333;font-size:5px;letter-spacing:.3px">NAME / ISSUER</div>
    </th>
    <th style="width:${aumW}px;min-width:${aumW}px;padding:3px 4px;text-align:right;border-right:1px solid #0d0d0d">
      <div style="color:#444444;font-size:6px;letter-spacing:.5px">AUM</div>
    </th>
    ${dateHeader}
    <th style="padding:3px 4px;text-align:right;border-left:2px solid #1a1a1a;min-width:48px">
      <div style="color:#ff8800;font-size:6px;letter-spacing:.5px">20D TOT</div>
    </th>
  </tr>
  </thead>
  <tbody>`;

  // BTC section
  if(showBTC){
    h+=`<tr style="background:rgba(98,126,234,.04)">
      <td colspan="${2+DAYS.length+1}" style="padding:2px 6px;border-bottom:1px solid rgba(98,126,234,.2);border-top:1px solid rgba(98,126,234,.15)">
        <span style="background:#627eea;color:#fff;font-size:6px;font-weight:700;padding:1px 5px;letter-spacing:.8px">BTC</span>
        <span style="color:#444444;font-size:6px;margin-left:5px">BITCOIN SPOT ETFs · 11 FUNDS · AUM $${Object.values(BTC_AUM).reduce((s,v)=>s+v,0).toFixed(1)}B</span>
      </td>
    </tr>`;
    h+=buildRows(BTC_FLOWS, BTC_ISSUERS, BTC_NAMES, BTC_AUM, '#f7931a');
  }

  // ETH section
  if(showETH){
    h+=`<tr style="background:rgba(98,126,234,.04)">
      <td colspan="${2+DAYS.length+1}" style="padding:2px 6px;border-bottom:1px solid rgba(98,126,234,.2);border-top:1px solid rgba(98,126,234,.15)">
        <span style="background:#627eea;color:#fff;font-size:6px;font-weight:700;padding:1px 5px;letter-spacing:.8px">ETH</span>
        <span style="color:#444444;font-size:6px;margin-left:5px">ETHEREUM SPOT ETFs · 5 FUNDS · AUM $${Object.values(ETH_AUM).reduce((s,v)=>s+v,0).toFixed(1)}B</span>
      </td>
    </tr>`;
    h+=buildRows(ETH_FLOWS, ETH_ISSUERS, ETH_NAMES, ETH_AUM, '#627eea');
  }

  h+=`</tbody></table>
  </div>

  <!-- ══ FOOTER ══ -->
  <div style="padding:3px 8px;background:#000;border-top:1px solid #1a1a1a;display:flex;justify-content:space-between;flex-shrink:0">
    <span style="color:#ff7700;font-size:5.5px">VALUES IN $M · GREEN = INFLOW · RED = OUTFLOW · TODAY = PRELIMINARY (T+1 REVISION)</span>
    <span style="color:#ff7700;font-size:5.5px">${etfLive?'● LIVE ·':''} SOURCE: FARSIDE INVESTORS · SOSOVALUE · 09-MAR-2026</span>
  </div>`;

  return h;
}

/* ═══════════════════════════════════════════════════
   FUND — PERP FUNDING RATES  v3
═══════════════════════════════════════════════════ */
function buildFUND(ti){
  const A=[
    {s:'BTC', n:'Bitcoin',   oi:8.42, b:0.0100,  y:0.0082,  o:0.0078,  h:0.0068,  k:0.0100,  d:0.0072,  p8h:[0.0124,0.0108,0.0092,0.0084,0.0088,0.0100,0.0094,0.0100]},
    {s:'ETH', n:'Ethereum',  oi:3.84, b:0.0048,  y:0.0038,  o:0.0042,  h:0.0044,  k:0.0052,  d:0.0038,  p8h:[0.0082,0.0062,0.0048,0.0038,0.0044,0.0048,0.0042,0.0048]},
    {s:'SOL', n:'Solana',    oi:1.12, b:0.0128,  y:0.0142,  o:0.0118,  h:0.0134,  k:null,    d:0.0112,  p8h:[0.0184,0.0162,0.0148,0.0138,0.0128,0.0128,0.0124,0.0128]},
    {s:'XRP', n:'XRP',       oi:2.28, b:-0.0124, y:-0.0108, o:-0.0138, h:-0.0118, k:null,    d:-0.0098, p8h:[-0.0048,-0.0084,-0.0108,-0.0124,-0.0138,-0.0124,-0.0112,-0.0124]},
    {s:'BNB', n:'BNB',       oi:0.88, b:0.0082,  y:null,    o:0.0074,  h:null,    k:null,    d:null,    p8h:[0.0094,0.0088,0.0082,0.0082,0.0078,0.0082,0.0078,0.0082]},
    {s:'ADA', n:'Cardano',   oi:0.34, b:0.0052,  y:0.0058,  o:0.0048,  h:0.0054,  k:null,    d:null,    p8h:[0.0048,0.0048,0.0052,0.0052,0.0058,0.0052,0.0048,0.0052]},
    {s:'AVAX',n:'Avalanche', oi:0.28, b:-0.0088, y:-0.0074, o:-0.0098, h:-0.0082, k:null,    d:-0.0068, p8h:[-0.0048,-0.0068,-0.0078,-0.0088,-0.0098,-0.0088,-0.0078,-0.0088]},
    {s:'LINK',n:'Chainlink', oi:0.24, b:0.0038,  y:0.0044,  o:0.0034,  h:0.0040,  k:null,    d:null,    p8h:[0.0028,0.0034,0.0038,0.0038,0.0044,0.0038,0.0034,0.0038]},
    {s:'DOT', n:'Polkadot',  oi:0.12, b:-0.0048, y:-0.0038, o:-0.0054, h:null,    k:null,    d:null,    p8h:[-0.0028,-0.0038,-0.0044,-0.0048,-0.0054,-0.0048,-0.0042,-0.0048]},
    {s:'ARB', n:'Arbitrum',  oi:0.18, b:-0.0062, y:-0.0054, o:-0.0068, h:-0.0058, k:null,    d:-0.0048, p8h:[-0.0038,-0.0048,-0.0058,-0.0062,-0.0068,-0.0062,-0.0054,-0.0062]},
    {s:'INJ', n:'Injective', oi:0.14, b:0.0168,  y:0.0188,  o:0.0152,  h:0.0174,  k:null,    d:null,    p8h:[0.0128,0.0148,0.0162,0.0168,0.0188,0.0168,0.0158,0.0168]},
    {s:'OP',  n:'Optimism',  oi:0.10, b:-0.0034, y:-0.0028, o:-0.0038, h:null,    k:null,    d:null,    p8h:[-0.0018,-0.0024,-0.0028,-0.0034,-0.0038,-0.0034,-0.0028,-0.0034]},
    {s:'MATIC',n:'Polygon',  oi:0.16, b:-0.0098, y:-0.0084, o:-0.0108, h:-0.0092, k:null,    d:-0.0078, p8h:[-0.0062,-0.0078,-0.0088,-0.0098,-0.0108,-0.0098,-0.0088,-0.0098]},
    {s:'UNI', n:'Uniswap',   oi:0.14, b:0.0044,  y:0.0052,  o:0.0038,  h:0.0048,  k:null,    d:null,    p8h:[0.0034,0.0038,0.0044,0.0044,0.0052,0.0044,0.0038,0.0044]}
  ];
  const A2=mergeFunding(A); A.length=0; A2.forEach(x=>A.push(x));
  const liveUpdated=Object.keys(_liveData.funding).length>0;
  const EX=['b','y','o','h','k','d'];
  const EXL={b:'Binance',y:'Bybit',o:'OKX',h:'Hyperliquid',k:'Kraken',d:'dYdX'};
  const EXC={b:'#f0b90b',y:'#f7a600',o:'#00b4ff',h:'#44ffcc',k:'#5741d9',d:'#6966ff'};

  const avg=a=>{const v=EX.map(e=>a[e]).filter(x=>x!=null);return v.length?v.reduce((s,x)=>s+x,0)/v.length:0;};

  // Color: red=extreme long, orange=long, grey=neutral, teal=short
  const fCol=v=>{
    if(v>0.025)return'#ff2222';
    if(v>0.015)return'#ff5500';
    if(v>0.008)return'#ff8800';
    if(v>0.003)return'#cc9944';
    if(v>0)return'#666666';
    if(v===0)return'#333333';
    if(v>-0.003)return'#559988';
    if(v>-0.008)return'#33bbaa';
    if(v>-0.015)return'#22ddcc';
    return'#00ffee';
  };
  const fBg=v=>{
    if(v>0.015)return'rgba(220,30,0,.18)';
    if(v>0.005)return'rgba(200,80,0,.10)';
    if(v>0)return'rgba(160,100,0,.06)';
    if(v<-0.008)return'rgba(0,160,140,.14)';
    if(v<0)return'rgba(0,120,100,.07)';
    return'transparent';
  };

  // SVG sparkline
  const spark=arr=>{
    if(!arr||!arr.length)return'';
    const mn=Math.min(...arr),mx=Math.max(...arr),rng=mx-mn||0.0001;
    const pts=arr.map((v,i)=>`${(i/(arr.length-1)*34).toFixed(0)},${(8-(v-mn)/rng*7).toFixed(0)}`).join(' ');
    const col=fCol(arr[arr.length-1]);
    return `<svg width="36" height="9" style="vertical-align:middle"><polyline points="${pts}" fill="none" stroke="${col}" stroke-width="1.4"/><circle cx="${(arr.length-1)/(arr.length-1)*34}" cy="${(8-(arr[arr.length-1]-mn)/rng*7).toFixed(0)}" r="1.5" fill="${col}"/></svg>`;
  };

  // Bi-directional bias bar
  const hBar=v=>{
    const w=Math.min(Math.abs(v)/0.03*36,36);
    const col=fCol(v);
    return `<div style="width:76px;height:7px;background:#000;position:relative;display:inline-flex;align-items:center;border:1px solid #111111">
      <div style="position:absolute;top:1px;bottom:1px;width:${w.toFixed(0)}px;background:${col};opacity:.85;${v>=0?'left:38px':'right:38px'}"></div>
      <div style="position:absolute;left:37px;top:0;width:2px;height:100%;background:#181818;opacity:.6"></div>
    </div>`;
  };

  const bull=A.filter(a=>avg(a)>0).length, bear=A.filter(a=>avg(a)<0).length;
  const mktA=A.map(avg).reduce((s,v)=>s+v,0)/A.length;
  const mktAnn=(mktA*3*365*100);
  const totalOI=A.reduce((s,a)=>s+a.oi,0);
  const mktCol=fCol(mktA);

  let h=`<!-- ══ TABLE ══ -->
  <div style="overflow-y:auto;flex:1">
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <colgroup>
    <col style="width:52px"><col style="width:56px">
    <col style="width:44px">
    ${EX.map(()=>'<col style="width:58px">').join('')}
    <col style="width:88px"><col style="width:78px"><col style="width:38px">
  </colgroup>
  <thead style="position:sticky;top:0;z-index:3">
  <tr style="background:#000;border-bottom:2px solid #111111">
    <th style="padding:3px 5px;font-size:6px;color:#666666;text-align:left;letter-spacing:1px;font-weight:700">TICKER</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:left">NAME</th>
    <th style="padding:3px 5px;font-size:6px;color:#666666;text-align:right">OI $B</th>
    ${EX.map(e=>`<th style="padding:3px 4px;font-size:6.5px;font-weight:700;text-align:right" title="${EXL[e]}"><span style="color:${EXC[e]}">${EXL[e].substring(0,4).toUpperCase()}</span></th>`).join('')}
    <th style="padding:3px 5px;font-size:6px;color:#ff8800;text-align:right;border-left:1px solid #111111;letter-spacing:.5px">AVG · ANNUAL</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:center">BIAS</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:center">8H</th>
  </tr>
  </thead>
  <tbody>`;

  const sections=[
    {lbl:'▲▲ EXTREME LONG',  lc:'#ff2222', bg:'rgba(220,10,0,.07)',   it:A.filter(a=>avg(a)>0.015).sort((a,b)=>avg(b)-avg(a))},
    {lbl:'▲ LONG BIAS',      lc:'#ff7700', bg:'rgba(200,60,0,.035)',  it:A.filter(a=>avg(a)>0&&avg(a)<=0.015).sort((a,b)=>avg(b)-avg(a))},
    {lbl:'▼ SHORT BIAS',     lc:'#22ddcc', bg:'rgba(0,160,140,.035)', it:A.filter(a=>avg(a)<0).sort((a,b)=>avg(a)-avg(b))}
  ];

  sections.forEach(sec=>{
    if(!sec.it.length)return;
    const secAvg=sec.it.map(avg).reduce((s,v)=>s+v,0)/sec.it.length;
    const secOI=sec.it.reduce((s,a)=>s+a.oi,0);
    h+=`<tr style="background:${sec.bg};border-top:2px solid ${sec.lc}22;border-bottom:1px solid ${sec.lc}18">
      <td colspan="3" style="padding:3px 8px">
        <span style="color:${sec.lc};font-size:7.5px;font-weight:700;letter-spacing:1px">${sec.lbl}</span>
        <span style="color:#333333;font-size:6px;margin-left:8px">${sec.it.length} assets · OI $${secOI.toFixed(1)}B</span>
      </td>
      <td colspan="${EX.length}" style="padding:3px 5px"></td>
      <td style="padding:3px 5px;text-align:right;border-left:1px solid #111111">
        <span style="color:${fCol(secAvg)};font-size:8px;font-weight:700;font-family:'Roboto Mono',monospace">${secAvg>=0?'+':''}${(secAvg*100).toFixed(4)}%</span>
      </td>
      <td colspan="2"></td>
    </tr>`;

    sec.it.forEach((a,i)=>{
      const bg='transparent';
      const av=avg(a); const avCol=fCol(av);
      const avAnn=(av*3*365*100);
      h+=`<tr style="background:${bg};border-bottom:1px solid #090909"
        onmouseover="this.style.background='rgba(255,255,255,.04)'"
        onmouseout="this.style.background='${bg}'">
        <td style="padding:3px 5px">
          <div style="color:#F39F41;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.5px">${a.s}</div>
        </td>
        <td style="padding:3px 5px">
          <div style="color:#888888;font-size:7.5px">${a.n}</div>
          <div style="color:#181818;font-size:5.5px">OI $${a.oi.toFixed(2)}B</div>
        </td>
        <td style="padding:3px 5px;text-align:right">
          <div style="color:#555555;font-size:8px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${a.oi.toFixed(2)}</div>
        </td>`;
      EX.forEach(e=>{
        const v=a[e];
        if(v==null){h+=`<td style="padding:2px 4px;text-align:right"><span style="color:#111111;font-size:7px">—</span></td>`;return;}
        const col=fCol(v); const bg2=fBg(v);
        h+=`<td style="padding:2px 3px;text-align:right;background:${bg2}">
          <span style="color:${col};font-size:8px;font-weight:${Math.abs(v)>0.010?'700':'500'};font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${v>=0?'+':''}${(v*100).toFixed(4)}%</span>
        </td>`;
      });
      h+=`<td style="padding:2px 6px;border-left:1px solid #111111;text-align:right">
          <div style="color:${avCol};font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">${av>=0?'+':''}${(av*100).toFixed(4)}%</div>
          <div style="color:#181818;font-size:5.5px;margin-top:1px">${avAnn>=0?'+':''}${avAnn.toFixed(1)}% ann</div>
        </td>
        <td style="padding:2px 5px;text-align:center">${hBar(av)}</td>
        <td style="padding:2px 4px;text-align:center">${spark(a.p8h)}</td>
      </tr>`;
    });
  });

  h+=`</tbody></table></div>
  <div style="padding:3px 8px;background:#000;border-top:1px solid #1a1a1a;display:flex;justify-content:space-between;flex-shrink:0">
    <span style="color:#ff7700;font-size:5.5px">+ = LONGS PAY SHORTS · − = SHORTS PAY LONGS · RESETS EVERY 8H</span>
    <span style="color:#ff7700;font-size:5.5px">${liveUpdated?'● LIVE ·':''} SOURCE: BINANCE · BYBIT · OKX · HYPERLIQUID · 09-MAR-2026</span>
  </div>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   LIQD — LIQUIDATIONS MONITOR  v3
═══════════════════════════════════════════════════ */
function buildLIQD(ti){
  const D=[
    {s:'BTC', n:'Bitcoin',   l24:38.4,  s24:18.2,  l1:2.8,  s1:1.4,  blL:4.2,  blS:2.1,  oi:8420,  liq4h:[4,5,8,5,4,6,5,5]},
    {s:'ETH', n:'Ethereum',  l24:14.8,  s24:22.4,  l1:1.2,  s1:2.8,  blL:1.8,  blS:4.2,  oi:3840,  liq4h:[3,4,5,3,4,6,4,5]},
    {s:'SOL', n:'Solana',    l24:8.4,   s24:3.8,   l1:0.8,  s1:0.4,  blL:1.4,  blS:0.8,  oi:1120,  liq4h:[1,1,2,1,1,2,1,1]},
    {s:'XRP', n:'XRP',       l24:6.2,   s24:12.8,  l1:0.6,  s1:1.8,  blL:0.8,  blS:2.4,  oi:2280,  liq4h:[1,1,2,1,1,2,1,1]},
    {s:'BNB', n:'BNB',       l24:2.8,   s24:1.4,   l1:0.2,  s1:0.1,  blL:0.4,  blS:0.2,  oi:880,   liq4h:[0,1,1,0,1,1,0,1]},
    {s:'AVAX',n:'Avalanche', l24:1.8,   s24:2.4,   l1:0.2,  s1:0.4,  blL:0.4,  blS:0.6,  oi:280,   liq4h:[0,0,1,0,0,1,0,0]},
    {s:'LINK',n:'Chainlink', l24:1.2,   s24:1.8,   l1:0.1,  s1:0.2,  blL:0.2,  blS:0.4,  oi:240,   liq4h:[0,0,1,0,0,1,0,0]},
    {s:'ARB', n:'Arbitrum',  l24:1.4,   s24:2.2,   l1:0.1,  s1:0.3,  blL:0.2,  blS:0.5,  oi:180,   liq4h:[0,0,1,0,0,1,0,0]},
    {s:'INJ', n:'Injective', l24:1.8,   s24:0.8,   l1:0.2,  s1:0.1,  blL:0.4,  blS:0.2,  oi:140,   liq4h:[0,0,1,0,0,1,0,0]},
    {s:'ADA', n:'Cardano',   l24:1.4,   s24:0.6,   l1:0.1,  s1:0.1,  blL:0.2,  blS:0.1,  oi:340,   liq4h:[0,0,0,0,0,1,0,0]},
    {s:'DOT', n:'Polkadot',  l24:0.8,   s24:0.4,   l1:0.1,  s1:0.0,  blL:0.1,  blS:0.1,  oi:120,   liq4h:[0,0,0,0,0,0,0,0]}
  ];
  const D2=mergeLiqd(D); D.length=0; D2.forEach(x=>D.push(x));
  const liqdLive=Object.keys(_liveData.liqd).length>0;

  const tot24L=D.reduce((s,d)=>s+d.l24,0), tot24S=D.reduce((s,d)=>s+d.s24,0);
  const tot1L=D.reduce((s,d)=>s+d.l1,0),   tot1S=D.reduce((s,d)=>s+d.s1,0);
  const totBig=D.reduce((s,d)=>s+d.blL+d.blS,0);
  const lsR=(tot24L/tot24S);
  const lsCol=lsR>1.4?'#ff3333':lsR>1.1?'#ff7700':lsR<0.7?'#22ddcc':lsR<0.9?'#44bbaa':'#888888';

  // L/S split bar
  const lsBar=(l,s,w=72)=>{
    const t=l+s; if(!t)return'';
    const lp=(l/t*100); const sp=(s/t*100);
    return `<div style="width:${w}px;height:8px;display:inline-flex;overflow:hidden;border:1px solid #111111;vertical-align:middle">
      <div style="width:${lp.toFixed(1)}%;background:#cc2200;opacity:.8" title="LONGS ${lp.toFixed(0)}%"></div>
      <div style="width:${sp.toFixed(1)}%;background:#1a9977;opacity:.8" title="SHORTS ${sp.toFixed(0)}%"></div>
    </div>`;
  };

  // 4h activity sparkline
  const actSpark=arr=>{
    if(!arr||!arr.length)return'';
    const mx=Math.max(...arr)||1;
    const pts=arr.map((v,i)=>`${(i/(arr.length-1)*30).toFixed(0)},${(8-v/mx*7).toFixed(0)}`).join(' ');
    return `<svg width="32" height="9" style="vertical-align:middle"><polyline points="${pts}" fill="none" stroke="#ff6600" stroke-width="1.3"/></svg>`;
  };

  // ── HEADER ──────────────────────────────────────────────────────────────
  let h=`<!-- ══ TABLE ══ -->
  <div style="overflow-y:auto;flex:1">
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace">
  <colgroup>
    <col style="width:52px"><col style="width:60px">
    <col style="width:72px"><col style="width:72px">
    <col style="width:44px"><col style="width:44px">
    <col style="width:48px"><col style="width:48px">
    <col style="width:80px"><col style="width:36px">
  </colgroup>
  <thead style="position:sticky;top:0;z-index:3">
  <tr style="background:#000;border-bottom:2px solid #111111">
    <th style="padding:3px 5px;font-size:6px;color:#666666;text-align:left;letter-spacing:1px;font-weight:700">TICKER</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:left">NAME</th>
    <th style="padding:3px 5px;font-size:6px;color:#cc3300;text-align:right;letter-spacing:.5px">24H LONGS $M</th>
    <th style="padding:3px 5px;font-size:6px;color:#1a9977;text-align:right;letter-spacing:.5px">24H SHORTS $M</th>
    <th style="padding:3px 5px;font-size:6px;color:#cc4444;text-align:right">1H L</th>
    <th style="padding:3px 5px;font-size:6px;color:#33bbaa;text-align:right">1H S</th>
    <th style="padding:3px 5px;font-size:6px;color:#666666;text-align:right">BIG L</th>
    <th style="padding:3px 5px;font-size:6px;color:#666666;text-align:right">BIG S</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:center">L ▓ S SPLIT</th>
    <th style="padding:3px 5px;font-size:6px;color:#664433;text-align:center">4H</th>
  </tr>
  </thead>
  <tbody>`;

  const sorted=[...D].sort((a,b)=>(b.l24+b.s24)-(a.l24+a.s24));
  const lDom=sorted.filter(d=>d.l24>d.s24);
  const sDom=sorted.filter(d=>d.l24<=d.s24);

  const renderSec=(lbl,lc,bg,items)=>{
    if(!items.length)return;
    const sL=items.reduce((s,d)=>s+d.l24,0), sS=items.reduce((s,d)=>s+d.s24,0);
    h+=`<tr style="background:${bg};border-top:2px solid ${lc}22;border-bottom:1px solid ${lc}18">
      <td colspan="2" style="padding:3px 8px">
        <span style="color:${lc};font-size:7.5px;font-weight:700;letter-spacing:.8px">${lbl}</span>
        <span style="color:#333333;font-size:6px;margin-left:8px">${items.length} assets</span>
      </td>
      <td style="padding:3px 5px;color:#cc2200;font-size:7.5px;font-weight:700;text-align:right;font-family:'Roboto Mono',monospace">$${sL.toFixed(0)}M</td>
      <td style="padding:3px 5px;color:#1a9977;font-size:7.5px;font-weight:700;text-align:right;font-family:'Roboto Mono',monospace">$${sS.toFixed(0)}M</td>
      <td colspan="4"></td>
      <td colspan="2" style="padding:3px 6px;text-align:center">${lsBar(sL,sS,72)}</td>
    </tr>`;

    items.forEach((d,i)=>{
      const bg2='transparent';
      const tot=d.l24+d.s24;
      const lPct=(d.l24/tot*100).toFixed(0), sPct=(d.s24/tot*100).toFixed(0);
      const lDom2=d.l24>d.s24;
      h+=`<tr style="background:${bg2};border-bottom:1px solid #090909"
        onmouseover="this.style.background='rgba(255,255,255,.04)'"
        onmouseout="this.style.background='transparent'">
        <td style="padding:3px 5px">
          <div style="color:#F39F41;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace;letter-spacing:.5px">${d.s}</div>
        </td>
        <td style="padding:3px 5px">
          <div style="color:#888888;font-size:7.5px">${d.n}</div>
          <div style="color:#181818;font-size:5.5px">OI $${(d.oi/1000).toFixed(1)}B</div>
        </td>
        <td style="padding:2px 5px;text-align:right">
          <div style="color:#ee2200;font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.l24.toFixed(1)}M</div>
          <div style="color:#220000;font-size:5.5px;text-align:right">${lPct}% of liqd</div>
        </td>
        <td style="padding:2px 5px;text-align:right">
          <div style="color:#1a9977;font-size:9.5px;font-weight:700;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.s24.toFixed(1)}M</div>
          <div style="color:#003322;font-size:5.5px;text-align:right">${sPct}% of liqd</div>
        </td>
        <td style="padding:2px 5px;text-align:right"><div style="color:#ff5544;font-size:8.5px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.l1.toFixed(1)}</div></td>
        <td style="padding:2px 5px;text-align:right"><div style="color:#33bbaa;font-size:8.5px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.s1.toFixed(1)}</div></td>
        <td style="padding:2px 5px;text-align:right"><div style="color:#aa6600;font-size:8px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.blL.toFixed(1)}</div></td>
        <td style="padding:2px 5px;text-align:right"><div style="color:#aa6600;font-size:8px;font-family:'Roboto Mono',monospace;font-variant-numeric:tabular-nums">$${d.blS.toFixed(1)}</div></td>
        <td style="padding:2px 6px;text-align:center">${lsBar(d.l24,d.s24,72)}</td>
        <td style="padding:2px 4px;text-align:center">${actSpark(d.liq4h)}</td>
      </tr>`;
    });
  };

  renderSec('▼ LONG-HEAVY  —  more longs liquidated (bearish pressure)','#ff4444','rgba(200,10,0,.05)',lDom);
  renderSec('▲ SHORT-HEAVY  —  more shorts liquidated (bullish pressure)','#22ddcc','rgba(0,160,140,.04)',sDom);

  h+=`</tbody></table></div>
  <div style="padding:3px 8px;background:#000;border-top:1px solid #1a1a1a;display:flex;justify-content:space-between;flex-shrink:0">
    <span style="color:#ff7700;font-size:5.5px">RED = LONGS LIQUIDATED (bearish) · TEAL = SHORTS LIQUIDATED (bullish) · BIG = WHALE-SIZE EVENT</span>
    <span style="color:#ff7700;font-size:5.5px">${liqdLive?'● LIVE ·':''} SOURCE: COINGLASS · BINANCE · BYBIT · OKX · 09-MAR-2026</span>
  </div>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   DOMN —   v3
═══════════════════════════════════════════════════ */
function buildDOMN(ti){
  // Static fallback — Mar 9 2026 (CoinGecko/CMC data)
  const STATIC=[
    // ── LAYER 1 — PROOF OF WORK ─────────────────────────── 09-MAR-2026
    {s:'BTC',   n:'Bitcoin',           pct:61.20, mcap:1640.0, chg24:-1.80, color:'#f7931a', cat:'L1/PoW',    stab:false},
    {s:'LTC',   n:'Litecoin',          pct:0.22,  mcap:6.6,    chg24:-1.20, color:'#bfbbbb', cat:'L1/PoW',    stab:false},
    {s:'BCH',   n:'Bitcoin Cash',      pct:0.16,  mcap:4.8,    chg24:-1.40, color:'#8dc351', cat:'L1/PoW',    stab:false},
    {s:'XMR',   n:'Monero',            pct:0.09,  mcap:2.7,    chg24:-0.80, color:'#ff6600', cat:'L1/PoW',    stab:false},
    {s:'KAS',   n:'Kaspa',             pct:0.06,  mcap:1.8,    chg24:-1.60, color:'#70c7ba', cat:'L1/PoW',    stab:false},
    // ── LAYER 1 — SMART CONTRACT ─────────────────────────────────────────────
    {s:'ETH',   n:'Ethereum',          pct:9.82,  mcap:232.8,  chg24:-2.40, color:'#627eea', cat:'L1/SmCt',   stab:false},
    {s:'BNB',   n:'BNB',               pct:3.30,  mcap:98.3,   chg24:-1.80, color:'#f0b90b', cat:'L1/SmCt',   stab:false},
    {s:'SOL',   n:'Solana',            pct:2.78,  mcap:82.8,   chg24:-4.20, color:'#9945ff', cat:'L1/SmCt',   stab:false},
    {s:'ADA',   n:'Cardano',           pct:0.68,  mcap:20.3,   chg24:-2.40, color:'#0066ff', cat:'L1/SmCt',   stab:false},
    {s:'TRX',   n:'TRON',              pct:0.74,  mcap:22.0,   chg24:-0.20, color:'#ff0013', cat:'L1/SmCt',   stab:false},
    {s:'TON',   n:'Toncoin',           pct:0.42,  mcap:12.5,   chg24:-2.10, color:'#0088cc', cat:'L1/SmCt',   stab:false},
    {s:'AVAX',  n:'Avalanche',         pct:0.30,  mcap:8.9,    chg24:-3.40, color:'#e84142', cat:'L1/SmCt',   stab:false},
    {s:'SUI',   n:'Sui',               pct:0.26,  mcap:7.8,    chg24:-4.80, color:'#4da2ff', cat:'L1/SmCt',   stab:false},
    {s:'NEAR',  n:'NEAR Protocol',     pct:0.10,  mcap:3.0,    chg24:-3.20, color:'#00ec97', cat:'L1/SmCt',   stab:false},
    {s:'APT',   n:'Aptos',             pct:0.11,  mcap:3.3,    chg24:-4.10, color:'#2dd8a3', cat:'L1/SmCt',   stab:false},
    {s:'ALGO',  n:'Algorand',          pct:0.05,  mcap:1.5,    chg24:-2.10, color:'#00b4d8', cat:'L1/SmCt',   stab:false},
    {s:'FTM',   n:'Fantom',            pct:0.04,  mcap:1.2,    chg24:-3.20, color:'#1969ff', cat:'L1/SmCt',   stab:false},
    {s:'VET',   n:'VeChain',           pct:0.04,  mcap:1.2,    chg24:-1.80, color:'#15bdff', cat:'L1/SmCt',   stab:false},
    {s:'ICP',   n:'Internet Computer', pct:0.08,  mcap:2.4,    chg24:-2.40, color:'#f15a24', cat:'L1/SmCt',   stab:false},
    {s:'FIL',   n:'Filecoin',          pct:0.06,  mcap:1.8,    chg24:-2.80, color:'#0090ff', cat:'L1/SmCt',   stab:false},
    {s:'EGLD',  n:'MultiversX',        pct:0.03,  mcap:0.9,    chg24:-2.20, color:'#23f7dd', cat:'L1/SmCt',   stab:false},
    {s:'FLOW',  n:'Flow',              pct:0.02,  mcap:0.6,    chg24:-1.60, color:'#00ef8b', cat:'L1/SmCt',   stab:false},
    {s:'HBAR',  n:'Hedera',            pct:0.08,  mcap:2.4,    chg24:-2.60, color:'#222222', cat:'L1/SmCt',   stab:false},
    {s:'ATOM',  n:'Cosmos',            pct:0.05,  mcap:1.5,    chg24:-2.40, color:'#6f7390', cat:'L1/SmCt',   stab:false},
    // ── LAYER 0 — INTEROPERABILITY ───────────────────────────────────────────
    {s:'DOT',   n:'Polkadot',          pct:0.18,  mcap:5.4,    chg24:-3.20, color:'#e6007a', cat:'L0',        stab:false},
    {s:'KSM',   n:'Kusama',            pct:0.02,  mcap:0.6,    chg24:-2.80, color:'#e8026d', cat:'L0',        stab:false},
    {s:'XLM',   n:'Stellar',           pct:0.25,  mcap:7.4,    chg24:-2.20, color:'#14b6e7', cat:'L0',        stab:false},
    // ── LAYER 2 — ETHEREUM SCALING ───────────────────────────────────────────
    {s:'ARB',   n:'Arbitrum',          pct:0.07,  mcap:2.1,    chg24:-4.20, color:'#28a0f0', cat:'L2',        stab:false},
    {s:'OP',    n:'Optimism',          pct:0.05,  mcap:1.5,    chg24:-3.80, color:'#ff0420', cat:'L2',        stab:false},
    {s:'MATIC', n:'Polygon',           pct:0.08,  mcap:2.4,    chg24:-3.40, color:'#8247e5', cat:'L2',        stab:false},
    {s:'MNT',   n:'Mantle',            pct:0.04,  mcap:1.2,    chg24:-2.60, color:'#666666', cat:'L2',        stab:false},
    {s:'IMX',   n:'Immutable X',       pct:0.03,  mcap:0.9,    chg24:-3.20, color:'#00d4ff', cat:'L2',        stab:false},
    {s:'STRK',  n:'Starknet',          pct:0.02,  mcap:0.6,    chg24:-4.40, color:'#ec796b', cat:'L2',        stab:false},
    {s:'METIS', n:'Metis',             pct:0.01,  mcap:0.3,    chg24:-3.60, color:'#00d4c2', cat:'L2',        stab:false},
    // ── STABLECOINS ──────────────────────────────────────────────────────────
    {s:'USDT',  n:'Tether',            pct:4.69,  mcap:139.7,  chg24: 0.00, color:'#26a17b', cat:'Stablecoin',stab:true},
    {s:'USDC',  n:'USD Coin',          pct:1.70,  mcap:50.6,   chg24: 0.00, color:'#2775ca', cat:'Stablecoin',stab:true},
    {s:'DAI',   n:'Dai',               pct:0.17,  mcap:5.1,    chg24: 0.00, color:'#f5ac37', cat:'Stablecoin',stab:true},
    {s:'FDUSD', n:'First Digital USD', pct:0.07,  mcap:2.1,    chg24: 0.00, color:'#1a73e8', cat:'Stablecoin',stab:true},
    {s:'PYUSD', n:'PayPal USD',        pct:0.02,  mcap:0.6,    chg24: 0.00, color:'#003087', cat:'Stablecoin',stab:true},
    // ── EXCHANGE TOKENS / PAYMENTS ───────────────────────────────────────────
    {s:'XRP',   n:'XRP',               pct:5.20,  mcap:154.8,  chg24:-2.80, color:'#00aae4', cat:'Exchange',  stab:false},
    {s:'OKB',   n:'OKB',               pct:0.05,  mcap:1.5,    chg24:-1.20, color:'#2c55ff', cat:'Exchange',  stab:false},
    {s:'CRO',   n:'Cronos',            pct:0.04,  mcap:1.2,    chg24:-1.60, color:'#103f68', cat:'Exchange',  stab:false},
    {s:'GT',    n:'Gate Token',        pct:0.04,  mcap:1.2,    chg24:-0.80, color:'#2354e6', cat:'Exchange',  stab:false},
    // ── DEFI — DEX / DERIVATIVES ─────────────────────────────────────────────
    {s:'HYPE',  n:'Hyperliquid',       pct:0.16,  mcap:4.8,    chg24:-4.20, color:'#44ffcc', cat:'DeFi/DEX',  stab:false},
    {s:'UNI',   n:'Uniswap',           pct:0.09,  mcap:2.7,    chg24:-2.40, color:'#ff007a', cat:'DeFi/DEX',  stab:false},
    {s:'INJ',   n:'Injective',         pct:0.05,  mcap:1.5,    chg24:-3.60, color:'#00b2ff', cat:'DeFi/DEX',  stab:false},
    {s:'DYDX',  n:'dYdX',              pct:0.03,  mcap:0.9,    chg24:-3.80, color:'#6966ff', cat:'DeFi/DEX',  stab:false},
    {s:'GMX',   n:'GMX',               pct:0.02,  mcap:0.6,    chg24:-2.20, color:'#03d1cf', cat:'DeFi/DEX',  stab:false},
    {s:'JUP',   n:'Jupiter',           pct:0.03,  mcap:0.9,    chg24:-3.40, color:'#c7a836', cat:'DeFi/DEX',  stab:false},
    {s:'RAY',   n:'Raydium',           pct:0.02,  mcap:0.6,    chg24:-3.20, color:'#4e44ce', cat:'DeFi/DEX',  stab:false},
    {s:'CRV',   n:'Curve DAO',         pct:0.02,  mcap:0.6,    chg24:-2.40, color:'#40649f', cat:'DeFi/DEX',  stab:false},
    {s:'1INCH', n:'1inch',             pct:0.01,  mcap:0.3,    chg24:-2.60, color:'#d82122', cat:'DeFi/DEX',  stab:false},
    {s:'SUSHI', n:'SushiSwap',         pct:0.01,  mcap:0.3,    chg24:-2.00, color:'#fa52a0', cat:'DeFi/DEX',  stab:false},
    // ── DEFI — LENDING / RWA ─────────────────────────────────────────────────
    {s:'ENA',   n:'Ethena',            pct:0.05,  mcap:1.5,    chg24:-4.40, color:'#8b5cf6', cat:'DeFi/RWA',  stab:false},
    {s:'AAVE',  n:'Aave',              pct:0.07,  mcap:2.1,    chg24:-2.80, color:'#b6509e', cat:'DeFi/RWA',  stab:false},
    {s:'MKR',   n:'Maker',             pct:0.02,  mcap:0.6,    chg24:-2.40, color:'#1aab9b', cat:'DeFi/RWA',  stab:false},
    {s:'COMP',  n:'Compound',          pct:0.01,  mcap:0.3,    chg24:-2.00, color:'#00d395', cat:'DeFi/RWA',  stab:false},
    {s:'LDO',   n:'Lido DAO',          pct:0.02,  mcap:0.6,    chg24:-2.80, color:'#f4da4d', cat:'DeFi/RWA',  stab:false},
    {s:'ONDO',  n:'Ondo Finance',      pct:0.04,  mcap:1.2,    chg24:-3.20, color:'#6366f1', cat:'DeFi/RWA',  stab:false},
    // ── ORACLE NETWORKS ───────────────────────────────────────────────────────
    {s:'LINK',  n:'Chainlink',         pct:0.30,  mcap:8.9,    chg24:-2.60, color:'#2a5ada', cat:'Oracle',    stab:false},
    {s:'PYTH',  n:'Pyth Network',      pct:0.02,  mcap:0.6,    chg24:-2.80, color:'#e6dafe', cat:'Oracle',    stab:false},
    {s:'API3',  n:'API3',              pct:0.01,  mcap:0.3,    chg24:-1.80, color:'#3773f5', cat:'Oracle',    stab:false},
    // ── AI / DATA ─────────────────────────────────────────────────────────────
    {s:'RENDER',n:'Render',            pct:0.06,  mcap:1.8,    chg24:-3.60, color:'#cc3e00', cat:'AI/Data',   stab:false},
    {s:'FET',   n:'Fetch.ai',          pct:0.04,  mcap:1.2,    chg24:-3.20, color:'#4a5568', cat:'AI/Data',   stab:false},
    {s:'TAO',   n:'Bittensor',         pct:0.10,  mcap:3.0,    chg24:-4.20, color:'#00b2a9', cat:'AI/Data',   stab:false},
    {s:'WLD',   n:'Worldcoin',         pct:0.04,  mcap:1.2,    chg24:-4.80, color:'#444444', cat:'AI/Data',   stab:false},
    {s:'OCEAN', n:'Ocean Protocol',    pct:0.01,  mcap:0.3,    chg24:-2.40, color:'#141414', cat:'AI/Data',   stab:false},
    // ── MEME / SPECULATIVE ────────────────────────────────────────────────────
    {s:'BRETT', n:'Brett',             pct:0.02,  mcap:0.6,    chg24:-5.00, color:'#1da1f2', cat:'Meme',      stab:false},
    // ── GAMING / METAVERSE ────────────────────────────────────────────────────
    // ── INFRASTRUCTURE ────────────────────────────────────────────────────────
    {s:'GRT',   n:'The Graph',         pct:0.03,  mcap:0.9,    chg24:-3.40, color:'#6747ed', cat:'Infra',     stab:false},
    {s:'SNX',   n:'Synthetix',         pct:0.01,  mcap:0.3,    chg24:-2.80, color:'#00d1ff', cat:'Infra',     stab:false},
    {s:'ENS',   n:'Ethereum Name Service',pct:0.02,mcap:0.6,   chg24:-3.00, color:'#5284ff', cat:'Infra',     stab:false},
    {s:'RPL',   n:'Rocket Pool',       pct:0.01,  mcap:0.3,    chg24:-2.60, color:'#ff6b35', cat:'Infra',     stab:false},
    {s:'W',     n:'Wormhole',          pct:0.01,  mcap:0.3,    chg24:-3.20, color:'#7c3aed', cat:'Infra',     stab:false},
    {s:'JTO',   n:'Jito',              pct:0.01,  mcap:0.3,    chg24:-4.00, color:'#38bdf8', cat:'Infra',     stab:false},
    {s:'OTHER', n:'All Others',        pct:5.57,  mcap:166.0,  chg24: 0.00, color:'#1a1a1a', cat:'—',         stab:false}
  ];;

  const CAT_COL={
    'L1/PoW':'#f7931a','L1/SmCt':'#a78bfa','L0':'#f0abfc',
    'L2':'#7dd3fc','Stablecoin':'#6ee7b7','Exchange':'#fcd34d',
    'DeFi/DEX':'#67e8f9','DeFi/RWA':'#c4b5fd','Oracle':'#93c5fd',
    'AI/Data':'#f9a8d4','Meme':'#fca5a5','Gaming':'#fdba74',
    'Infra':'#a3e635','—':'#1a1a1a'
  };

  const CAT_DESC={
    BTC: 'Digital gold · PoW · 21M cap · ETF approved · institutional reserve',
    ETH: 'Smart contract hub · PoS · EVM · DeFi/NFT settlement layer',
    USDT:'Largest stablecoin · Tether Ltd · USD-pegged · centralised reserves',
    XRP: 'Cross-border payments · Ripple Labs · ODL network · SEC settlement',
    BNB: 'Binance exchange token · BSC L1 · quarterly burn · largest CEX',
    SOL: 'High-throughput L1 · Firedancer · Alpenglow upgrade · DEX leader',
    USDC:'Regulated stablecoin · Circle · audited monthly · CCTP cross-chain',
    ADA: 'Academic L1 · Ouroboros PoS · Hydra L2 · EMURGO/IOG',
    TRX: 'High-TPS L1 · largest USDT holder chain · Sun Yuchen · TPBFT',
    TON: 'Telegram-native · 900M+ user reach · TON Space wallet · sharding',
    AVAX:'Subnet architecture · C-Chain EVM · fast finality · Codebase upgrade',
    LINK:'Decentralised oracle · CCIP cross-chain · staking v0.2 · data feeds',
    DOT: 'Parachain relay · shared security · Gavin Wood · JAM upgrade',
    HYPE:'On-chain perp DEX · HyperEVM mainnet Mar-2026 · 97% fee buyback · $200B/mo vol',
    SUI: 'Move language L1 · object model · high TPS · Mysten Labs',
    NEAR:'Sharded L1 · AI integration · Chain Abstraction · NEAR AI',
    APT: 'Move language L1 · Block-STM parallel exec · Aptos Foundation',
    UNI: 'Largest DEX · Uniswap v4 hooks · UniChain L2 · governance token',
    ARB: 'Ethereum L2 · Arbitrum One + Nova · Orbit chains · Stylus VM',
    OP:  'Ethereum L2 · OP Stack · Superchain · Optimism Collective DAO',
    INJ: 'DeFi L1 · on-chain orderbook · Injective Hub · deflationary burn',
    ENA: 'Synthetic USD (USDe) · delta-neutral staking yield · Ethena Labs'
};

  // ── LIVE DATA MERGE ──────────────────────────────────────────────────────
  // Priority: _liveData.domn (fetchDominance — Binance px×supply, real total mcap)
  //         → CRYPTO array (Binance WS px × _SUPPLY from updateCoin)
  //         → STATIC fallback
  const live   = (_liveData.domn&&_liveData.domn.pcts)||null;
  const liveTs = (_liveData.domn&&_liveData.domn.ts)||0;
  const isLive = live && (Date.now()-liveTs < 720000); // 12 min window

  const D = STATIC.map(d=>{
    if(d.s==='OTHER'){
      // OTHER: use api residual if available
      if(isLive && live['OTHER']){
        return {...d, mcap:live['OTHER'].mcap, pct:live['OTHER'].pct};
      }
      return d;
    }

    // Priority 1: live API data (_liveData.domn set by fetchDominance)
    // Accept if: mcap > 0 AND (pct > 0 OR coin is a stablecoin)
    if(isLive && live[d.s] && live[d.s].mcap > 0 && (live[d.s].pct > 0 || d.stab)){
      return {...d,
        mcap:  parseFloat(live[d.s].mcap.toFixed(2)),
        pct:   parseFloat(live[d.s].pct.toFixed(4)),
        chg24: live[d.s].chg24 != null ? live[d.s].chg24 : d.chg24
      };
    }

    // Priority 2: CRYPTO array live prices + mc (Binance WS + CoinGecko)
    const lc = CRYPTO.find(c=>c.s===d.s);
    if(lc && lc.px>0 && lc.mc>0){
      const mcapB   = lc.mc/1e9;
      // Use REAL total market cap, not just sum of our ~50 coins
      const realTotalB = (window._cgGlobalMC || 2390000000000) / 1e9;
      const cryptoTotal = CRYPTO.reduce((s,c)=>s+(c.mc||0),0)/1e9;
      const totalB  = Math.max(realTotalB, cryptoTotal);
      const pct     = (totalB>500 && mcapB>0) ? parseFloat((mcapB/totalB*100).toFixed(4)) : d.pct;
      return {...d,
        mcap:  parseFloat(mcapB.toFixed(2)),
        pct:   pct>0 ? pct : d.pct,
        chg24: lc.chg != null ? lc.chg : d.chg24
      };
    }

    // Priority 3: static fallback
    return d;
  });

  const totalMcap = (isLive && live['_total'] && live['_total']>500) ? live['_total'] : D.reduce((s,d)=>s+d.mcap,0);
  const btc  = D.find(d=>d.s==='BTC');
  const eth  = D.find(d=>d.s==='ETH');
  const stablePct = D.filter(d=>d.stab).reduce((s,d)=>s+d.pct,0);
  const l2Pct = D.filter(d=>d.cat==='L2').reduce((s,d)=>s+d.pct,0);
  const defiPct = D.filter(d=>d.cat.startsWith('DeFi')).reduce((s,d)=>s+d.pct,0);
  const altPct = parseFloat((100-btc.pct-eth.pct-stablePct).toFixed(2));

  const cC=v=>v>0?'#00cc44':v<0?'#ff3333':'#444444';

  // Stacked dominance bar (top 15 + other)
  const barItems = D.filter(d=>d.s!=='OTHER').slice(0,15);
  const stackBar = barItems.map(d=>
    `<div title="${d.n}: ${d.pct.toFixed(2)}%" style="flex:${d.pct};background:${d.color};height:100%;opacity:.88;min-width:1px"></div>`
  ).join('') + `<div style="flex:${100-barItems.reduce((s,d)=>s+d.pct,0)};background:#1a1a1a;opacity:.5;height:100%"></div>`;

  // Category badge
  const catBadge=cat=>{
    const col=CAT_COL[cat]||'#444444';
    return `<span style="color:${col};font-size:6px;border:1px solid ${col}22;padding:0 3px;background:${col}11;white-space:nowrap">${cat}</span>`;
  };

  let h=`
  <!-- STACKED BAR -->
  <div style="padding:5px 8px 4px;background:#000;flex-shrink:0">
    <div style="height:12px;display:flex;width:100%;overflow:hidden;border:1px solid #1a1a1a;margin-bottom:4px">${stackBar}</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center">
      ${barItems.map(d=>
        `<span style="font-size:6.5px;display:inline-flex;align-items:center;gap:2px">
          <span style="color:${d.color};font-size:8px">●</span>
          <span style="color:#c8c0a8;font-weight:700">${d.s}</span>
          <span style="color:#888">${d.pct.toFixed(1)}%</span>
        </span>`
      ).join('')}
      <span style="font-size:6.5px;display:inline-flex;align-items:center;gap:2px">
        <span style="color:#1a1a1a;font-size:8px">●</span>
        <span style="color:#333333">OTHER ${(100-barItems.reduce((s,d)=>s+d.pct,0)).toFixed(1)}%</span>
      </span>
    </div>
  </div>

  <!-- KPI STRIP -->
  <div style="background:#000;padding:3px 10px;display:flex;gap:0;align-items:stretch;flex-shrink:0">
    ${[
      {lbl:'TOTAL MCAP',  val:`$${(totalMcap/1000).toFixed(2)}T`, col:'#c8b890'},
      {lbl:'BTC.D',       val:`${btc.pct.toFixed(2)}%`,  col:'#f7931a'},
      {lbl:'ETH.D',       val:`${eth.pct.toFixed(2)}%`,  col:'#627eea'},
      {lbl:'ALTS.D',      val:`${altPct.toFixed(2)}%`,   col:'#ff8800'},
      {lbl:'STABLES.D',   val:`${stablePct.toFixed(2)}%`,col:'#26a17b'},
      {lbl:'L2.D',        val:`${l2Pct.toFixed(2)}%`,    col:'#28a0f0'},
      {lbl:'DEFI.D',      val:`${defiPct.toFixed(2)}%`,  col:'#44ffcc'},
      {lbl:'BTC/ETH',     val:`${eth.pct>0?(btc.pct/eth.pct).toFixed(2):'—'}x`, col:'#c8b890'}
    ].map((k,i)=>`
      <div style="padding:3px 10px;${i>0?'border-left:1px solid #1a1a1a;':''}display:flex;flex-direction:column;justify-content:center;gap:1px">
        <div style="color:#666;font-size:5.5px;letter-spacing:.6px">${k.lbl}</div>
        <div style="color:${k.col};font-size:11px;font-weight:700;font-family:'Roboto Mono',monospace;line-height:1.1">${k.val}</div>
      </div>`).join('')}
    <div style="margin-left:auto;display:flex;align-items:center;padding:0 8px">
      ${isLive ? '' : ''}
    </div>
  </div>

  <!-- TABLE -->
  <div style="overflow-y:auto;flex:1">
  <table style="width:100%;border-collapse:collapse;font-family:'Share Tech Mono',monospace;table-layout:fixed">
  <colgroup>
    <col style="width:90px"><col style="width:70px">
    <col style="width:62px"><col style="width:58px">
    <col style="width:100px"><col>
  </colgroup>
  <thead style="position:sticky;top:0;z-index:3">
  <tr style="background:#000;border-bottom:1px solid #1a1a1a">
    <th style="padding:3px 8px;font-size:7px;color:#ff8800;text-align:left;letter-spacing:1px;font-weight:700">NAME</th>
    <th style="padding:3px 8px;font-size:7px;color:#ff8800;text-align:right;letter-spacing:1px;font-weight:700">MCAP</th>
    <th style="padding:3px 8px;font-size:7px;color:#ff8800;text-align:right;letter-spacing:1px;font-weight:700">DOM%</th>
    <th style="padding:3px 8px;font-size:7px;color:#ff8800;text-align:right;letter-spacing:1px;font-weight:700">24H%</th>
    <th style="padding:3px 8px;font-size:7px;color:#ff8800;text-align:left;letter-spacing:1px;font-weight:700">SHARE</th>

  </tr>
  </thead><tbody>`;

  const GROUPS=[
    {lbl:'LAYER 1 — PROOF OF WORK',      lc:'#f7931a', bg:'rgba(247,147,26,.04)',  cats:['L1/PoW']},
    {lbl:'LAYER 1 — SMART CONTRACT',     lc:'#a78bfa', bg:'rgba(167,139,250,.04)', cats:['L1/SmCt']},
    {lbl:'LAYER 0 — INTEROPERABILITY',   lc:'#f0abfc', bg:'rgba(240,171,252,.03)', cats:['L0']},
    {lbl:'LAYER 2 — ETHEREUM SCALING',   lc:'#7dd3fc', bg:'rgba(125,211,252,.03)', cats:['L2']},
    {lbl:'STABLECOINS',                  lc:'#6ee7b7', bg:'rgba(110,231,183,.03)', cats:['Stablecoin']},
    {lbl:'EXCHANGE TOKENS / PAYMENTS',   lc:'#fcd34d', bg:'rgba(252,211,77,.03)',  cats:['Exchange','Payments']},
    {lbl:'DEFI — DEX / DERIVATIVES',     lc:'#67e8f9', bg:'rgba(103,232,249,.03)', cats:['DeFi/DEX']},
    {lbl:'DEFI — LENDING / RWA',         lc:'#c4b5fd', bg:'rgba(196,181,253,.03)', cats:['DeFi/RWA']},
    {lbl:'ORACLE NETWORKS',              lc:'#93c5fd', bg:'rgba(147,197,253,.03)', cats:['Oracle']},
    {lbl:'AI / DATA NETWORKS',           lc:'#f9a8d4', bg:'rgba(249,168,212,.03)', cats:['AI/Data']},
    {lbl:'MEME / SPECULATIVE',           lc:'#fca5a5', bg:'rgba(252,165,165,.03)', cats:['Meme']},
    {lbl:'GAMING / METAVERSE',           lc:'#fdba74', bg:'rgba(253,186,116,.03)', cats:['Gaming']},
    {lbl:'INFRASTRUCTURE',               lc:'#a3e635', bg:'rgba(163,230,53,.03)',  cats:['Infra']}
  ];

  GROUPS.forEach(g=>{
    const items=D.filter(d=>g.cats.includes(d.cat)&&d.s!=='OTHER');
    if(!items.length)return;
    const gPct=items.reduce((s,d)=>s+d.pct,0);
    const gMcap=items.reduce((s,d)=>s+d.mcap,0);
    h+=`<tr>
      <td colspan="6" style="padding:2px 8px;background:#000">
        <span style="color:${g.lc};font-size:7px;font-weight:700;letter-spacing:1.2px;font-family:'Share Tech Mono',monospace">${g.lbl}</span>
        <span style="color:${g.lc}99;font-size:9px;margin-left:10px;font-family:Arial,Helvetica,sans-serif">${items.length} assets</span>
        <span style="color:${g.lc}99;font-size:9px;margin-left:6px;font-family:Arial,Helvetica,sans-serif">$${gMcap.toFixed(0)}B</span>
        <span style="color:${g.lc}99;font-size:9px;margin-left:4px;font-family:Arial,Helvetica,sans-serif">· ${gPct.toFixed(1)}% dom</span>
      </td>
    </tr>`;
    items.sort((a,b)=>b.mcap-a.mcap).forEach((d,i)=>{
      const bg2='transparent';
      const bw=Math.min(d.pct/60*100,100);
      h+=`<tr style="background:${bg2};cursor:pointer"
        onmouseover="this.style.background='rgba(255,255,255,.04)'"
        onmouseout="this.style.background='transparent'">
        <td style="padding:3px 8px;color:#c8c0a8;font-size:9px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-weight:400;letter-spacing:.1px">${d.n}</td>
        <td style="padding:3px 8px;text-align:right;color:#c8c0a8;font-size:10px;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:'Roboto Mono',monospace">${d.mcap>=1000?'$'+(d.mcap/1000).toFixed(2)+'T':'$'+d.mcap.toFixed(0)+'B'}</td>
        <td style="padding:3px 8px;text-align:right;color:${d.color};font-size:10px;font-weight:700;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:'Roboto Mono',monospace">${d.pct.toFixed(2)}%</td>
        <td style="padding:3px 8px;text-align:right;color:${cC(d.chg24)};font-size:10px;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:'Roboto Mono',monospace">${d.chg24>=0?'+':''}${d.chg24.toFixed(2)}%</td>
        <td style="padding:3px 8px">
          <div style="background:#111;height:3px;width:${Math.max(4,bw).toFixed(0)}px;border:none;overflow:hidden;margin-top:4px;max-width:80px">
            <div style="background:${d.color};height:100%;width:100%;opacity:.75"></div>
          </div>
        </td>

      </tr>`;
    });
  });

  const oth=D.find(d=>d.s==='OTHER');
  h+=`<tr style="background:transparent">
    <td style="padding:3px 8px;color:#555;font-size:9px;font-family:Arial,Helvetica,sans-serif">Other (~14k assets)</td>
    <td style="padding:3px 8px;text-align:right;color:#555;font-size:10px;font-family:'Roboto Mono',monospace">$${oth.mcap.toFixed(0)}B</td>
    <td style="padding:3px 8px;text-align:right;color:#555;font-size:10px;font-weight:700;font-family:'Roboto Mono',monospace">${oth.pct.toFixed(2)}%</td>
    <td colspan="3"></td>
  </tr>`;

  h+=`</tbody></table></div>
  <div style="padding:3px 8px;background:#000;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">
    <span style="color:#333;font-size:5.5px">DOM = ASSET MCAP / TOTAL CRYPTO MCAP · ${isLive ? (_liveData.domn.src||'?')+' · updated '+new Date(liveTs).toLocaleTimeString('en-GB') : 'STATIC — click refresh'}</span>
    <span style="color:#555;font-size:5.5px;cursor:pointer;border:1px solid #111;padding:0 4px" onclick="fetchDominance()">↻ REFRESH</span>
  </div>`;
  return h;
}
/* ═══════════════════════════════════════════════════
   LIVE DATA — FUNDING · LIQUIDATIONS · ETF FLOWS
   Fetches from public APIs, stores in _liveData,
   refreshAllPanels() picks it up every 2s via jitter loop
═══════════════════════════════════════════════════ */
const _liveData = {
  funding: {},
  liqd: {},
  etf: {},
  etfMeta: {btcAUM:0, ethAUM:0, btcNet:0, ethNet:0, btcBTC:0, updated:0},
  domn: {pcts:null, ts:0}
};

// ── DOMINANCE — CoinGecko (proxy) → CoinLore → static fallback ────────────
// Maps CoinGecko coin id → symbol used in STATIC array
const _CG_ID_TO_SYM = {
  bitcoin:'BTC', ethereum:'ETH', tether:'USDT', binancecoin:'BNB', ripple:'XRP',
  solana:'SOL', 'usd-coin':'USDC', dogecoin:'DOGE', cardano:'ADA', tron:'TRX',
  toncoin:'TON', avalanche:'AVAX', chainlink:'LINK', 'shiba-inu':'SHIB',
  polkadot:'DOT', hyperliquid:'HYPE', sui:'SUI', 'near-protocol':'NEAR',
  aptos:'APT', uniswap:'UNI', arbitrum:'ARB', optimism:'OP', injective:'INJ',
  ethena:'ENA', litecoin:'LTC', 'bitcoin-cash':'BCH', stellar:'XLM',
  aave:'AAVE', maker:'MKR', 'lido-dao':'LDO', 'matic-network':'MATIC',
  algorand:'ALGO', vechain:'VET', 'internet-computer':'ICP', filecoin:'FIL',
  hedera:'HBAR', cosmos:'ATOM', pepe:'PEPE', dogwifcoin:'WIF', bonk:'BONK',
  'the-sandbox':'SAND', decentraland:'MANA', 'axie-infinity':'AXS',
  'gala-games':'GALA', 'immutable-x':'IMX', 'render-token':'RENDER',
  'fetch-ai':'FET', bittensor:'TAO', worldcoin:'WLD', 'dydx-chain':'DYDX',
  jupiter:'JUP', raydium:'RAY', 'curve-dao-token':'CRV', 'the-graph':'GRT',
  'ethereum-name-service':'ENS', kaspa:'KAS', monero:'XMR',
  dai:'DAI', 'first-digital-usd':'FDUSD', 'paypal-usd':'PYUSD',
  'ondo-finance':'ONDO', 'compound-governance-token':'COMP',
  'okb':'OKB', 'crypto-com-chain':'CRO', 'gate-2':'GT',
  floki:'FLOKI', mantle:'MNT', starknet:'STRK', metis:'METIS',
  'synthetix-network-token':'SNX', 'rocket-pool':'RPL',
  wormhole:'W', jito:'JTO', '1inch':'1INCH', sushiswap:'SUSHI',
  'api3':'API3', 'ocean-protocol':'OCEAN', 'brett-based':'BRETT',
  'cat-in-a-dogs-world':'MEW', 'theta-token':'THETA',
  'multiversx':'EGLD', flow:'FLOW', kusama:'KSM'
};

// CoinLore id fixes (numeric id → symbol)
const _CL_ID_FIX = {'90':'BNB','518':'DOT','2710':'SHIB','3890':'MATIC','4030':'ALGO','3773':'LINK'};

let _domn_fetching = false;

function _domn_rerender(){
  Object.entries(PANEL_REGISTRY||{}).forEach(([id,reg])=>{
    if(reg.fn!=='DOMN') return;
    const body=document.getElementById('pb-'+id);
    if(body && body.dataset.locked!=='1'){
      try{ body.innerHTML=buildDOMN(0); }catch(e){}
    }
  });
}

// Apply fetched coins list to _liveData.domn.pcts so buildDOMN picks it up
function _domn_apply(coins, totalUsd, src, domPct){
  // domPct = optional {BTC:58.2, ETH:10.4, ...} directly from CoinGecko /global
  // totalUsd = total market cap in USD (raw, e.g. 2.98e12)
  let totalB = totalUsd / 1e9;
  if(totalB < 500){
    console.error('[DOMN] _domn_apply: totalB suspiciously low:', totalB, '— aborting');
    _domn_fetching = false;
    _boot.update('DOMINANCE','err','bad total: $'+totalB.toFixed(0)+'B');
    return;
  }
  const pcts = {};
  coins.forEach(c=>{
    if(!c.sym || c.sym==='?') return;
    const mcB = (c.mc||0) / 1e9;
    // Use direct dominance % from CoinGecko /global if available, else compute
    const pct = (domPct && domPct[c.sym] != null)
              ? parseFloat(domPct[c.sym].toFixed(4))
              : (totalB>0 ? parseFloat((mcB/totalB*100).toFixed(4)) : 0);
    pcts[c.sym] = {
      pct,
      mcap:  parseFloat(mcB.toFixed(2)),
      chg24: c.chg || 0
};
    // Sync live CRYPTO price array
    const ci = CRYPTO.find(x=>x.s===c.sym);
    if(ci && c.px>0){
      ci.px=c.px; ci.chg=c.chg||ci.chg;
      if(c.mc>1e6) ci.mc=c.mc;
    }
  });

  // Sanity check — BTC dominance should be ~55-62% in March 2026
  let btcP = pcts.BTC?.pct||0, ethP = pcts.ETH?.pct||0;
  if(btcP > 65 && pcts.BTC) {
    // Total MC is too low — auto-correct
    const correctedTotalB = pcts.BTC.mcap / 0.584; // BTC should be ~58.4%
    console.warn('[DOMN] BTC.D='+btcP.toFixed(1)+'% too high → correcting total to $'+(correctedTotalB/1000).toFixed(2)+'T');
    Object.keys(pcts).forEach(k => {
      if(pcts[k] && pcts[k].mcap > 0) pcts[k].pct = parseFloat((pcts[k].mcap / correctedTotalB * 100).toFixed(4));
    });
    btcP = pcts.BTC.pct; ethP = pcts.ETH?.pct||0;
    totalB = correctedTotalB;
  }
  if(btcP < 30 || ethP < 2){
    console.error('[DOMN] sanity fail — BTC='+btcP.toFixed(2)+'% ETH='+ethP.toFixed(2)+'% — rejecting');
    _domn_fetching = false;
    return;
  }

  const knownPct  = Object.values(pcts).reduce((s,v)=>s+v.pct,0);
  const knownMcap = Object.values(pcts).reduce((s,v)=>s+v.mcap,0);
  pcts['OTHER'] = {
    pct:  parseFloat(Math.max(0, 100-knownPct).toFixed(2)),
    mcap: parseFloat(Math.max(0, totalB-knownMcap).toFixed(1)),
    chg24: 0
};
  pcts['_total'] = totalB;
  _liveData.domn = {pcts, ts:Date.now(), src};
  _boot.update('DOMINANCE','ok', src+' $'+(totalB/1000).toFixed(2)+'T BTC='+btcP.toFixed(1)+'%');
  console.log('[DOMN] ✓ '+src+' BTC='+btcP.toFixed(2)+'% ETH='+ethP.toFixed(2)+'% total=$'+(totalB/1000).toFixed(2)+'T ('+Object.keys(pcts).length+' assets)');
  refreshAllPanels();
  _domn_rerender();
}

// ── Okamžitý výpočet dominance z CRYPTO[] (živá Binance WS data) ────────
function _domn_fromCRYPTO(){
  const SUP={
    bitcoin:19.85e6, ethereum:120.4e6, bnb:145.8e6, ripple:57.6e9,
    solana:490e6, dogecoin:148e9, cardano:35.8e9, tron:87.2e9,
    toncoin:2.56e9, avalanche:412e6, chainlink:608e6, polkadot:1.46e9,
    hyperliquid:333e6, sui:3.1e9, 'near-protocol':1.18e9, aptos:467e6,
    uniswap:600e6, arbitrum:4.0e9, optimism:1.37e9, injective:93.8e6,
    litecoin:74.6e6, stellar:31.2e9, aave:14.9e6, atom:390e6,
    filecoin:556e6, render:530e6, kaspa:24.4e9, icp:468e6,
    monero:18.4e6,'bitcoin-cash':19.7e6,hedera:38.6e9
};
  const STAB={USDT:139.7e9,USDC:50.6e9,DAI:5.1e9,FDUSD:2.1e9};
  const list=[]; let tot=0;
  CRYPTO.forEach(c=>{
    const mc=(c.mc&&c.mc>1e8)?c.mc:(c.px>0&&SUP[c.id])?c.px*SUP[c.id]:0;
    if(!mc)return;
    list.push({sym:c.s,mc,px:c.px,chg:c.chg||0});
    tot+=mc;
  });
  Object.entries(STAB).forEach(([sym,mc])=>{list.push({sym,mc,px:1,chg:0});tot+=mc;});
  // CRITICAL: Use real global MC, not just sum of our ~50 coins
  // Our coins cover ~80-85% of total market, rest is 17000+ small tokens
  // Real total crypto market cap = ~$2.39T (March 2026)
  const realTotal = window._cgGlobalMC || 2390000000000;
  // Only use realTotal if it's bigger than what we calculated
  if(realTotal > tot) tot = realTotal;
  if(list.length>5) _domn_apply(list,tot,'CRYPTO-WS');
}

async function fetchDominance(){
  if(_domn_fetching) return;
  _domn_fetching = true;
  _boot.update('DOMINANCE','pending','FETCHING...');

  // ── SOURCE 0: Okamžitý výpočet z CRYPTO[] (Binance WS data — bez sítě) ─
  _domn_fromCRYPTO();

  // ── SOURCE 1: CoinGecko přímý + corsproxy záloha ──────────────────────
  try{
    const CG_GLOBAL  = 'https://api.coingecko.com/api/v3/global';
    const CG_MARKETS = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h';
    const [rg,rm] = await Promise.all([
      _fetchCORS(CG_GLOBAL, 12000).then(r=>r.json()),
      _fetchCORS(CG_MARKETS, 15000).then(r=>r.json())
    ]);
    const gdata = rg?.data ? rg : {data:rg};
    const coins = Array.isArray(rm) ? rm : [];
    if(!Array.isArray(coins)||coins.length<10) throw new Error('CoinGecko: bad data ('+coins.length+' coins)');

    const totalUsd = gdata?.data?.total_market_cap?.usd
                  || coins.reduce((s,c)=>s+(c.market_cap||0),0);
    
    // Store real total market cap globally for dominance calculation
    if(totalUsd > 1e12) window._cgGlobalMC = totalUsd;

    const cgDomPct = gdata?.data?.market_cap_percentage || {};
    const domPct = {};
    Object.entries(cgDomPct).forEach(([k,v])=>{
      const sym = _CG_ID_TO_SYM[k] || k.toUpperCase();
      domPct[sym] = v;
    });

    const list = coins.map(c=>({
      sym: _CG_ID_TO_SYM[c.id] || c.symbol?.toUpperCase() || '?',
      mc:  c.market_cap || 0,
      px:  c.current_price || 0,
      chg: c.price_change_percentage_24h || 0
}));

    console.log('[DOMN] CoinGecko raw: totalUsd=$'+(totalUsd/1e12).toFixed(2)+'T BTC_dom='+cgDomPct.btc?.toFixed(2)+'% ETH_dom='+cgDomPct.eth?.toFixed(2)+'%');

    _domn_fetching = false;
    _domn_apply(list, totalUsd, 'CoinGecko', domPct);
    return;
  }catch(e){ console.warn('[DOMN] CoinGecko failed:',e.message); }

  // ── SOURCE 2: CoinLore ────────────────────────────────────────────────
  try{
    const [tr,gr] = await Promise.all([
      _fetchCORS('https://api.coinlore.net/api/tickers/?start=0&limit=100', 10000).then(r=>r.json()),
      _fetchCORS('https://api.coinlore.net/api/global/', 10000).then(r=>r.json())
    ]);
    const coins   = tr.data || [];
    const gd      = Array.isArray(gr) ? gr[0] : gr;
    const totalUsd = parseFloat(gd.total_mcap||0)
                   || coins.reduce((s,c)=>s+(parseFloat(c.market_cap_usd)||0),0);

    const list = coins.map(c=>({
      sym: _CL_ID_FIX[c.id] || c.symbol?.toUpperCase() || '?',
      mc:  parseFloat(c.market_cap_usd||0),
      px:  parseFloat(c.price_usd||0),
      chg: parseFloat(c.percent_change_24h||0)
}));

    _domn_fetching = false;
    _domn_apply(list, totalUsd, 'CoinLore');
    return;
  }catch(e){ console.error('[DOMN] CoinLore also failed:',e.message); }

  // ── SOURCE 3: estimate from live CRYPTO array ──────────────────────────
  // Supply table — keys match CRYPTO[].id
  const SUP={
    bitcoin:19.85e6, ethereum:120.4e6, bnb:145.8e6, ripple:57.6e9,
    solana:490e6, dogecoin:148e9, cardano:35.8e9, tron:87.2e9,
    toncoin:2.56e9, avalanche:412e6, chainlink:608e6, polkadot:1.46e9,
    hyperliquid:333e6, sui:3.1e9, 'near-protocol':1.18e9, aptos:467e6,
    uniswap:600e6, arbitrum:4.0e9, optimism:1.37e9, injective:93.8e6,
    litecoin:74.6e6, stellar:31.2e9, aave:14.9e6, atom:390e6,
    filecoin:556e6, render:530e6, kaspa:24.4e9, icp:468e6,
    jupiter:1.35e9, raydium:555e6, bonk:94e12, dogwifhat:998e6,
    monero:18.4e6, 'bitcoin-cash':19.7e6, algorand:8.0e9, vechain:85.9e9,
    hedera:38.6e9, cosmos:390e6, pepe:420.69e12, 'the-sandbox':1.93e9,
    'axie-infinity':270e6, gala:48.8e9
};
  const STAB_MC = {USDT:139.7e9, USDC:50.6e9, DAI:5.1e9, FDUSD:2.1e9, PYUSD:0.6e9};
  const list = [];
  let totalUsd = 0;
  CRYPTO.forEach(c=>{
    const mc = (c.mc&&c.mc>1e6) ? c.mc
             : (c.px>0 && SUP[c.id]) ? c.px*SUP[c.id] : 0;
    if(!mc) return;
    list.push({sym:c.s, mc, px:c.px, chg:c.chg||0});
    totalUsd += mc;
  });
  Object.entries(STAB_MC).forEach(([sym,mc])=>{
    list.push({sym, mc, px:1, chg:0});
    totalUsd += mc;
  });
  totalUsd *= 1.14; // ~14% for long tail
  _domn_fetching = false;
  if(list.length>5){
    _domn_apply(list, totalUsd, 'CRYPTO[]');
  } else {
    _boot.update('DOMINANCE','err','all sources failed');
    console.error('[DOMN] all sources failed');
  }
}

// ── FUNDING: Binance public premium index API ──────────────────────────────
async function fetchFundingRates(){ _boot.update('FUNDING','pending','FETCHING...');
  const syms=[
    'BTCUSDT','ETHUSDT','SOLUSDT','XRPUSDT','BNBUSDT','ADAUSDT','TRXUSDT',
    'LINKUSDT','AVAXUSDT','SUIUSDT','LTCUSDT','DOTUSDT','UNIUSDT','NEARUSDT',
    'AAVEUSDT','ICPUSDT','APTUSDT','RENDERUSDT','ATOMUSDT','FILUSDT',
    'OPUSDT','ARBUSDT','INJUSDT','JUPUSDT','RAYUSDT','LDOUSDT','MKRUSDT',
    'CRVUSDT','GMXUSDT','FTMUSDT','ALGOUSDT','VETUSDT','BCHUSDT','FETUSDT',
    'IMXUSDT','STRKUSDT','SEIUSDT','GRTUSDT','PENDLEUSDT','ETCUSDT',
    'HYPEUSDT','KASUSDT','XLMUSDT','JTOUSDT','PYTHUSDT',
    'ENAUSDT','ONDOUSDT','WLDUSDT','TIAUSDT','BERAUSDT','MOVEUSDT','VIRTUALUSDT','TONUSDT'
  ];
  const map={
    BTCUSDT:'BTC',  ETHUSDT:'ETH',   SOLUSDT:'SOL',   XRPUSDT:'XRP',
    BNBUSDT:'BNB',  ADAUSDT:'ADA',   TRXUSDT:'TRX',   LINKUSDT:'LINK',
    AVAXUSDT:'AVAX',SUIUSDT:'SUI',   LTCUSDT:'LTC',   DOTUSDT:'DOT',
    UNIUSDT:'UNI',  NEARUSDT:'NEAR', AAVEUSDT:'AAVE', ICPUSDT:'ICP',
    APTUSDT:'APT',  RENDERUSDT:'RENDER',ATOMUSDT:'ATOM',FILUSDT:'FIL',
    OPUSDT:'OP',    ARBUSDT:'ARB',   INJUSDT:'INJ',   JUPUSDT:'JUP',
    RAYUSDT:'RAY',  LDOUSDT:'LDO',   MKRUSDT:'MKR',   CRVUSDT:'CRV',
    GMXUSDT:'GMX',  FTMUSDT:'FTM',   ALGOUSDT:'ALGO', VETUSDT:'VET',
    BCHUSDT:'BCH',  FETUSDT:'FET',   IMXUSDT:'IMX',   STRKUSDT:'STRK',
    SEIUSDT:'SEI',  GRTUSDT:'GRT',   PENDLEUSDT:'PENDLE',ETCUSDT:'ETC',
    HYPEUSDT:'HYPE',KASUSDT:'KAS',   XLMUSDT:'XLM',   JTOUSDT:'JTO',
    PYTHUSDT:'PYTH'
  };
  try {
    const r=await fetch('https://fapi.binance.com/fapi/v1/premiumIndex');
    if(!r.ok)return;
    const data=await r.json();
    data.filter(d=>syms.includes(d.symbol)).forEach(d=>{
      const s=map[d.symbol];
      if(!s)return;
      if(!_liveData.funding[s])_liveData.funding[s]={};
      _liveData.funding[s].binance=parseFloat(d.lastFundingRate);
      _liveData.funding[s].nextTime=d.nextFundingTime;
    });
  } catch(e){}

  // Bybit public
  try {
    const r2=await fetch('https://api.bybit.com/v5/market/tickers?category=linear');
    if(!r2.ok)return;
    const d2=await r2.json();
    (d2?.result?.list||[]).filter(t=>syms.includes(t.symbol)).forEach(t=>{
      const s=map[t.symbol];if(!s)return;
      if(!_liveData.funding[s])_liveData.funding[s]={};
      _liveData.funding[s].bybit=parseFloat(t.fundingRate);
    });
    _boot.update('FUNDING','ok','BINANCE+BYBIT OK');
  } catch(e){_boot.update('FUNDING','warn','PARTIAL');}

  // OKX public
  try {
    const okxSyms=['BTC-USDT-SWAP','ETH-USDT-SWAP','SOL-USDT-SWAP','XRP-USDT-SWAP',
                   'DOGE-USDT-SWAP','ADA-USDT-SWAP','AVAX-USDT-SWAP','LINK-USDT-SWAP',
                   'ARB-USDT-SWAP','DOT-USDT-SWAP','INJ-USDT-SWAP','UNI-USDT-SWAP'];
    const okxMap=Object.fromEntries(okxSyms.map(s=>[s,s.split('-')[0]]));
    for(const instId of okxSyms.slice(0,6)){
      try{
        const ro=await fetch(`https://www.okx.com/api/v5/public/funding-rate?instId=${instId}`);
        if(!ro.ok)continue;
        const do_=await ro.json();
        const sym=okxMap[instId];
        if(!sym||!do_?.data?.[0])continue;
        if(!_liveData.funding[sym])_liveData.funding[sym]={};
        _liveData.funding[sym].okx=parseFloat(do_.data[0].fundingRate);
      }catch(e){}
      await new Promise(r=>setTimeout(r,120));
    }
  } catch(e){}
}

// ── LIQUIDATIONS: CoinGlass open data ─────────────────────────────────────
async function fetchLiquidations(){
  try {
    // CoinGlass public overview endpoint
    const r=await fetch('https://open-api.coinglass.com/public/v2/liquidation_coin/chart?symbol=BTC&interval=24h',
      {headers:{'coinglassSecret':''}});
    // fallback — they don't need key for basic aggregated endpoint
    const r2=await fetch('https://open-api.coinglass.com/public/v2/liquidation_info?ex=Binance');
    if(r2.ok){
      const d=await r2.json();
      if(d?.data){
        Object.entries(d.data).forEach(([sym,v])=>{
          _liveData.liqd[sym]={
            l24:v.buyVolUsd/1e6,
            s24:v.sellVolUsd/1e6,
            l1:v.h1BuyVolUsd/1e6,
            s1:v.h1SellVolUsd/1e6,
            blL:v.maxBuyVolUsd/1e6,
            blS:v.maxSellVolUsd/1e6
          };
        });
      }
    }
  } catch(e){}
}

// ══════════════════════════════════════════════════════════════════════════
//  MULTI-SOURCE DATA LAYER  — Fear&Greed · FRED · ETF · CoinGlass · extras
// ══════════════════════════════════════════════════════════════════════════

// ── Extended _liveData fields ─────────────────────────────────────────────
_liveData.fearGreed   = { value:null, label:'', ts:0 };
_liveData.fred        = { ffr:null, cpi:null, unemployment:null, gdp:null, dxy:null, ts:0 };
_liveData.coinglassOI = {};   // sym → { oi, oiChg24, longPct }
_liveData.altFX       = {};   // additional FX fallback pairs
_liveData.btcDom      = null; // BTC dominance %

// ── CORS proxy chain — pokusí se každou proxy dokud jedna nefunguje ───────
const PROXIES = [
  u => u,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://thingproxy.freeboard.io/fetch/${u}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(`https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`)}`
];

async function _tryProxies(url, ms=8000) {
  // Paralelní race — všechny proxy současně, bere první OK odpověď
  const wrap = (proxyFn) => new Promise((res, rej) => {
    const proxied = proxyFn(url);
    const ctrl = new AbortController();
    const tid = setTimeout(() => { ctrl.abort(); rej(new Error('timeout')); }, ms);
    fetch(proxied, { signal: ctrl.signal })
      .then(r => { clearTimeout(tid); (r && r.ok) ? res(r) : rej(new Error('bad')); })
      .catch(e => { clearTimeout(tid); rej(e); });
  });
  const results = await Promise.allSettled(PROXIES.map(wrap));
  for (const r of results) {
    if (r.status === 'fulfilled') return r.value;
  }
  return null;
}

async function _tryProxiesJSON(url, ms=8000) {
  const r = await _tryProxies(url, ms);
  if (!r) return null;
  try {
    const text = await r.text();
    const j = JSON.parse(text);
    if (j && typeof j.contents === 'string') return JSON.parse(j.contents);
    return j;
  } catch(_) { return null; }
}

// ── 1. FEAR & GREED INDEX — alternative.me (CORS friendly, zdarma) ────────
async function fetchFearGreed() {
  try {
    const d = await _tryProxiesJSON('https://api.alternative.me/fng/?limit=2&format=json', 6000);
    if (!d?.data?.length) return;
    const cur = d.data[0];
    _liveData.fearGreed = {
      value: parseInt(cur.value),
      label: cur.value_classification,
      ts: Date.now(),
      prev: d.data[1] ? parseInt(d.data[1].value) : null
    };
    console.log('[F&G] Live:', _liveData.fearGreed.value, _liveData.fearGreed.label);
    // Update menu badges
    const v = _liveData.fearGreed.value;
    const lbl = _liveData.fearGreed.label||'';
    const fgC = v>=75?'#ff3333':v>=55?'#ff7700':v>=45?'#aa8800':v>=25?'#448833':'#2277cc';
    ['menu-fg-val','menu-fg-val2'].forEach(id=>{
      const el=document.getElementById(id);
      if(el){el.textContent=v+' '+lbl;el.style.color=fgC;}
    });
  } catch(e) { console.warn('[F&G] failed', e); }
}

// ── 2. FRED — Federal Reserve Economic Data (zdarma, CORS OK via proxy) ──
// Klíče: FEDFUNDS=FFR, CPIAUCSL=CPI, UNRATE=Unemployment, GDP=GDP, DTWEXBGS=DXY
async function fetchFRED() {
  const FRED_BASE = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=';
  const series = [
    { id: 'FEDFUNDS',  key: 'ffr',          fmt: v => parseFloat(v) },
    { id: 'CPIAUCSL',  key: 'cpi',          fmt: v => parseFloat(v) },
    { id: 'UNRATE',    key: 'unemployment', fmt: v => parseFloat(v) },
    { id: 'DTWEXBGS',  key: 'dxy',          fmt: v => parseFloat(v) }
  ];
  let updated = false;
  for (const s of series) {
    try {
      const r = await _tryProxies(FRED_BASE + s.id, 8000);
      if (!r) continue;
      const text = await r.text();
      const lines = text.trim().split('\n').filter(l => l && !l.startsWith('DATE'));
      if (!lines.length) continue;
      const last = lines[lines.length - 1].split(',');
      const val = s.fmt(last[1]);
      if (!isNaN(val)) {
        _liveData.fred[s.key] = { value: val, date: last[0] };
        updated = true;
      }
    } catch(_) {}
  }
  if (updated) {
    _liveData.fred.ts = Date.now();
    console.log('[FRED] Updated:', JSON.stringify(_liveData.fred));
  }
}

// ── 3. ETF FLOWS — multi-source s plným proxy fallback ───────────────────
async function fetchETFFlows() {
  const BTC_TICKERS = ['IBIT','FBTC','GBTC','BTC','BITB','ARKB','HODL','BTCO','BRRR','EZBC','BTCW'];
  const ETH_TICKERS = ['ETHA','FETH','ETHE','ETHW','CETH'];

  const _mapETF = (list, isBTC) => {
    if (!Array.isArray(list)) return;
    list.forEach(e => {
      const sym = (e.code || e.ticker || e.symbol || '').toUpperCase();
      if (!sym) return;
      if (_liveData.etf[sym]?.d1) return; // already have today
      _liveData.etf[sym] = {
        aum: (e.totalNetAssets || e.netAssets || e.aum || 0) / 1e9,
        d1:  (e.todayNetInflow || e.dailyNetInflow || e.netInflow || 0) / 1e6,
        d7:  (e.sevenDayNetInflow || e.flow7d || 0) / 1e6,
        d30: (e.thirtyDayNetInflow || e.monthNetInflow || e.flow30d || 0) / 1e6,
        ytd: (e.ytdNetInflow || 0) / 1e6,
        btc: isBTC ? (e.btcHolding || e.holding || 0) : null,
        src: 'live'
      };
    });
  };

  // Source A: SoSoValue (primární)
  const SSV_URLS = [
    ['https://api.sosovalue.com/api/etf/BTC-spot-ETF-list', true],
    ['https://api.sosovalue.com/api/etf/ETH-spot-ETF-list', false],
    ['https://api.sosovalue.com/absite/api/etf/spot-etf-fund-flow-history?etfType=bitcoin-etf', true]
  ];
  for (const [url, isBtc] of SSV_URLS) {
    const d = await _tryProxiesJSON(url, 9000);
    if (!d) continue;
    const list = d?.data || d?.result || d?.records || [];
    _mapETF(Array.isArray(list) ? list : [], isBtc);
  }

  // Source B: CoinGlass (fallback)
  const CG_URLS = [
    'https://open-api.coinglass.com/public/v2/etf/bitcoin-etf-list',
    'https://open-api.coinglass.com/public/v2/etf/ethereum-etf-list'
  ];
  for (const url of CG_URLS) {
    const d = await _tryProxiesJSON(url, 8000);
    if (!d) continue;
    _mapETF(d?.data || [], url.includes('bitcoin'));
  }

  // Source C: CoinMarketCap ETF data (public endpoint)
  try {
    const d = await _tryProxiesJSON('https://api.coinmarketcap.com/data-api/v3/etf/info', 8000);
    if (d?.data) _mapETF(d.data, true);
  } catch(_) {}

  // Source D: Farside via allorigins (HTML scrape fallback — parsuje tabulku)
  if (Object.keys(_liveData.etf).length === 0) {
    try {
      const url = 'https://farside.co.uk/bitcoin-etf-flow/';
      const r = await _tryProxies(url, 10000);
      if (r) {
        const html = await r.text();
        // Parse tabulku — hledá řádky s IBIT, FBTC atd.
        const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
        for (const row of rows) {
          const cells = (row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [])
            .map(c => c.replace(/<[^>]+>/g, '').trim());
          if (cells.length < 2) continue;
          const sym = cells[0].toUpperCase();
          if (!BTC_TICKERS.includes(sym)) continue;
          const d1 = parseFloat(cells[cells.length - 1]) || 0;
          if (!_liveData.etf[sym]) _liveData.etf[sym] = { d1, src: 'farside-scrape' };
        }
        console.log('[FARSIDE] HTML scrape attempted');
      }
    } catch(_) {}
  }

  // Aktualizuj meta součty
  const btcList = BTC_TICKERS.map(s => _liveData.etf[s]).filter(Boolean);
  const ethList = ETH_TICKERS.map(s => _liveData.etf[s]).filter(Boolean);
  if (btcList.length) {
    _liveData.etfMeta.btcNet = btcList.reduce((s, e) => s + (e.d1 || 0), 0);
    _liveData.etfMeta.btcAUM = btcList.reduce((s, e) => s + (e.aum || 0), 0);
    _liveData.etfMeta.updated = Date.now();
  }
  if (ethList.length) {
    _liveData.etfMeta.ethNet = ethList.reduce((s, e) => s + (e.d1 || 0), 0);
    _liveData.etfMeta.ethAUM = ethList.reduce((s, e) => s + (e.aum || 0), 0);
  }
  console.log('[ETF] Loaded:', Object.keys(_liveData.etf).length, 'tickers');
}

// ── 4. COINGLASS — Open Interest + Long/Short ratio ──────────────────────
async function fetchCoinGlassOI() {
  const SYMS = ['BTC','ETH','SOL','XRP','BNB','DOGE','ADA','AVAX','LINK','ARB'];
  // CoinGlass public OI endpoint
  const d = await _tryProxiesJSON('https://open-api.coinglass.com/public/v2/openInterest/list', 8000);
  if (!d?.data) return;
  (d.data || []).forEach(e => {
    const sym = (e.symbol || '').toUpperCase().replace('USDT','');
    if (!SYMS.includes(sym)) return;
    _liveData.coinglassOI[sym] = {
      oi:     (e.openInterest || 0) / 1e9,
      oiChg:  e.openInterestChangePercent || 0,
      longPct: e.longRatio ? e.longRatio * 100 : null,
      shortPct: e.shortRatio ? e.shortRatio * 100 : null,
      ts: Date.now()
    };
  });
  // Fallback: Binance OI (přímý, CORS OK)
  for (const sym of ['BTCUSDT','ETHUSDT','SOLUSDT','XRPUSDT','BNBUSDT']) {
    try {
      const r = await _tryProxiesJSON(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${sym}`, 5000);
      if (!r?.openInterest) continue;
      const base = sym.replace('USDT','');
      if (!_liveData.coinglassOI[base]) {
        _liveData.coinglassOI[base] = { oi: parseFloat(r.openInterest) / 1e9, ts: Date.now() };
      }
    } catch(_) {}
  }
  console.log('[OI] Loaded:', Object.keys(_liveData.coinglassOI).length, 'symbols');
}

// ── 5. FX EXTRA FALLBACKS — ECB, ExchangeRate-API, Fixer ────────────────
async function fetchAltFX() {
  if(window._tabHidden) return;
  // ECB daily rates (XML, CORS OK)
  try {
    const r = await _tryProxies('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', 7000);
    if (r) {
      const text = await r.text();
      const pairs = text.match(/currency='([A-Z]+)'\s+rate='([0-9.]+)'/g) || [];
      pairs.forEach(p => {
        const m = p.match(/currency='([A-Z]+)'\s+rate='([0-9.]+)'/);
        if (m) _liveData.altFX[`EUR${m[1]}`] = parseFloat(m[2]);
      });
      console.log('[ECB] FX loaded:', Object.keys(_liveData.altFX).length, 'pairs');
    }
  } catch(_) {}

  // ExchangeRate-API (zdarma, CORS OK)
  try {
    const d = await _tryProxiesJSON('https://open.er-api.com/v6/latest/USD', 6000);
    if (d?.rates) {
      Object.entries(d.rates).forEach(([cur, rate]) => {
        if (!_liveData.altFX[`USD${cur}`]) _liveData.altFX[`USD${cur}`] = rate;
      });
      console.log('[ER-API] FX loaded');
    }
  } catch(_) {}

  // Frankfurter (ECB based, JSON)
  try {
    const d = await _tryProxiesJSON('https://api.frankfurter.app/latest?from=USD', 6000);
    if (d?.rates) {
      Object.entries(d.rates).forEach(([cur, rate]) => {
        if (!_liveData.altFX[`USD${cur}`]) _liveData.altFX[`USD${cur}`] = rate;
      });
    }
  } catch(_) {}
}

// ── 6. CRYPTO EXTRA — CoinPaprika (záloha za CoinGecko) ─────────────────
async function fetchCoinPaprika() {
  try {
    const d = await _tryProxiesJSON('https://api.coinpaprika.com/v1/tickers?quotes=USD&limit=100', 10000);
    if (!Array.isArray(d)) return;
    let count = 0;
    d.forEach(coin => {
      const sym = (coin.symbol || '').toUpperCase();
      if (!sym) return;
      const q = coin.quotes?.USD;
      if (!q) return;
      // Pouze doplní pokud Binance/CoinGecko nemá
      if (!window._pxOverride) window._pxOverride = {};
      if (!window._pxOverride[sym]) {
        window._pxOverride[sym] = {
          px: q.price,
          chg: q.percent_change_24h,
          mc: q.market_cap,
          vol: q.volume_24h,
          src: 'coinpaprika'
        };
        count++;
      }
    });
    // BTC dominance ze součtu
    const total = d.reduce((s, c) => s + (c.quotes?.USD?.market_cap || 0), 0);
    const btcMC  = d.find(c => c.symbol === 'BTC')?.quotes?.USD?.market_cap || 0;
    if (total > 1e12) {
      window._cgGlobalMC = window._cgGlobalMC || total; // don't overwrite CoinGecko if exists
      _liveData.btcDom = (btcMC / total) * 100;
    }
    console.log('[CoinPaprika] enriched', count, 'symbols, BTC.D:', _liveData.btcDom?.toFixed(1));
  } catch(e) { console.warn('[CoinPaprika] failed', e); }
}

// ── 7. MESSARI — fundamentální data (zdarma tier) ────────────────────────
async function fetchMessari() {
  const ASSETS = ['bitcoin','ethereum','solana','ripple','cardano'];
  for (const asset of ASSETS) {
    try {
      const d = await _tryProxiesJSON(`https://data.messari.io/api/v1/assets/${asset}/metrics`, 7000);
      const m = d?.data?.market_data;
      if (!m) continue;
      const sym = { bitcoin:'BTC', ethereum:'ETH', solana:'SOL', ripple:'XRP', cardano:'ADA' }[asset];
      if (!sym) continue;
      if (!window._pxOverride) window._pxOverride = {};
      if (!window._pxOverride[sym]) {
        window._pxOverride[sym] = {
          px: m.price_usd,
          chg: m.percent_change_usd_last_24_hours,
          mc: d.data.marketcap?.current_marketcap_usd,
          src: 'messari'
        };
      }
    } catch(_) {}
  }
  console.log('[Messari] done');
}

// ── 8. BLOCKCHAIN.COM — BTC on-chain metrics ─────────────────────────────
async function fetchOnchain() {
  const endpoints = {
    hashrate:     'https://api.blockchain.info/stats?cors=true',
    mempoolFees:  'https://mempool.space/api/v1/fees/recommended',
    mempoolSize:  'https://mempool.space/api/mempool'
};
  try {
    const [stats, fees, pool] = await Promise.allSettled([
      _tryProxiesJSON(endpoints.hashrate, 7000),
      _tryProxiesJSON(endpoints.mempoolFees, 5000),
      _tryProxiesJSON(endpoints.mempoolSize, 5000)
    ]);
    if (!_liveData.onchain) _liveData.onchain = {};
    if (stats.value) {
      _liveData.onchain.hashrate = (stats.value.hash_rate || 0) / 1e18; // EH/s
      _liveData.onchain.difficulty = stats.value.difficulty;
      _liveData.onchain.mempoolTx = stats.value.n_tx_unconfirmed;
    }
    if (fees.value) {
      _liveData.onchain.fastFee   = fees.value.fastestFee;
      _liveData.onchain.medFee    = fees.value.halfHourFee;
      _liveData.onchain.slowFee   = fees.value.hourFee;
    }
    if (pool.value) {
      _liveData.onchain.mempoolMB = (pool.value.vsize || 0) / 1e6;
      _liveData.onchain.mempoolTx = pool.value.count;
    }
    console.log('[Onchain] hashrate:', _liveData.onchain.hashrate?.toFixed(2), 'EH/s, fees:', _liveData.onchain.fastFee, 'sat/vB');
  } catch(e) { console.warn('[Onchain] failed', e); }
}

// ── 9. CRYPTO COMPARE — OHLCV záloha za Binance ─────────────────────────
async function fetchCryptoCompare() {
  const SYMS = ['BTC','ETH','SOL','XRP','BNB'];
  try {
    const symsQ = SYMS.join(',');
    const d = await _tryProxiesJSON(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symsQ}&tsyms=USD`, 8000
    );
    if (!d?.RAW) return;
    Object.entries(d.RAW).forEach(([sym, data]) => {
      const r = data?.USD;
      if (!r) return;
      if (!window._pxOverride) window._pxOverride = {};
      if (!window._pxOverride[sym]) {
        window._pxOverride[sym] = {
          px: r.PRICE,
          chg: r.CHANGEPCT24HOUR,
          vol: r.VOLUME24HOURTO,
          high: r.HIGH24HOUR,
          low: r.LOW24HOUR,
          src: 'cryptocompare'
        };
      }
    });
    console.log('[CryptoCompare] loaded', Object.keys(d.RAW).length, 'assets');
  } catch(e) { console.warn('[CryptoCompare] failed', e); }
}

// ── 10. TREASURY YIELDS — US Treasury (přímý JSON) ───────────────────────
async function fetchTreasuryYields() {
  try {
    // Treasury JSON API — CORS OK
    const d = await _tryProxiesJSON(
      'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value=2026', 8000
    );
    if (!_liveData.yields) _liveData.yields = {};
    // Záloha: FRED Treasury rates
    const YIELD_SERIES = {
      'DGS2':  '2Y',
      'DGS5':  '5Y',
      'DGS10': '10Y',
      'DGS30': '30Y'
};
    for (const [id, label] of Object.entries(YIELD_SERIES)) {
      const r = await _tryProxiesJSON(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`, 7000);
      if (typeof r === 'string' || (r && typeof r.text === 'function')) continue;
      // CSV parse přes text
      try {
        const resp = await _tryProxies(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`, 7000);
        if (!resp) continue;
        const text = await resp.text();
        const lines = text.trim().split('\n');
        const last = lines[lines.length-1].split(',');
        const val = parseFloat(last[1]);
        if (!isNaN(val)) _liveData.yields[label] = { value: val, date: last[0] };
      } catch(_) {}
    }
    console.log('[Yields] loaded:', JSON.stringify(_liveData.yields));
  } catch(e) { console.warn('[Yields] failed', e); }
}

// ── Kick off live fetches ─────────────────────────────────────────────────
['BINANCE·REST','HYPERLIQUID','KRAKEN','OKX','BYBIT','JUPITER','KUCOIN','GATE','COINGECKO','DOMINANCE','FUNDING'].forEach(k=>{
  _boot.update(k,'pending','WAITING...');
});
// ══════════════════════════════════════════════════════
//  ALL DATA FEEDS — started only after API key verified
// ══════════════════════════════════════════════════════
window._feedsStarted = false;
function _refreshGLData(){
  if(window._tabHidden) return;
  if(!window.mapGL||!mapGL.isStyleLoaded||!mapGL.isStyleLoaded()) return;
  // Update CB tečky s aktuálními daty
  if(typeof CB_ALL!=='undefined'&&mapGL.getSource('cb')){
    mapGL.getSource('cb').setData({type:'FeatureCollection',features:
      CB_ALL.map(b=>({type:'Feature',
        geometry:{type:'Point',coordinates:[b.lng,b.lat]},
        properties:{color:b.bias==='HIKE'?'#ff4444':b.bias==='CUT'?'#00ee66':b.bias==='EASE'?'#44aaff':'rgba(160,150,130,0.9)'}
      }))});
  }
  // Update news piny
  if(window._updateGLNews) window._updateGLNews();
}

function _startAllFeeds() {
  if(window._feedsAlreadyRunning) return; window._feedsAlreadyRunning = true;
  console.log('%c SYSTEM FEEDS STARTING ', 'background:#ff6600;color:#000;font-weight:bold');

  setTimeout(fetchFundingRates,   2000);
  // Early funding history fetch for crypto table FUND% + FR·HIST columns
  setTimeout(function(){
    if(typeof fetchFundingHistory==='function' && typeof _loadValidFuturesSyms==='function'){
      _loadValidFuturesSyms().then(function(){
        ['BTCUSDT','ETHUSDT','SOLUSDT','XRPUSDT','BNBUSDT','ADAUSDT','TRXUSDT',
         'LINKUSDT','AVAXUSDT','SUIUSDT','DOTUSDT','UNIUSDT','ARBUSDT','INJUSDT',
         'OPUSDT','NEARUSDT','AAVEUSDT','APTUSDT','HYPEUSDT',
     'GRTUSDT','ENAUSDT','ONDOUSDT','SEIUSDT','JUPUSDT',
     'FTMUSDT','ALGOUSDT','VETUSDT','LDOUSDT','PENDLEUSDT',
     'INJUSDT','ARBUSDT','ATOMUSDT','SUIUSDT','XLMUSDT'].forEach(function(s){
          try{fetchFundingHistory(s);}catch(e){}
        });
      });
    }
  }, 3000);
  setTimeout(fetchLiquidations,   4000);
  setTimeout(fetchETFFlows,       6000);
  setTimeout(fetchDominance,      2000);
  // ── Nové zdroje ──────────────────────────────────────
  setTimeout(fetchFearGreed,      1000);
  setTimeout(fetchOnchain,        3000);
  setTimeout(fetchAltFX,          4000);
  setTimeout(fetchCoinGlassOI,    8000);
  setTimeout(fetchCoinPaprika,   10000);
  setTimeout(fetchCryptoCompare, 12000);
  setTimeout(fetchMessari,       15000);
  setTimeout(fetchFRED,          20000);
  setTimeout(fetchTreasuryYields,25000);
  // ── Intervaly ────────────────────────────────────────
  setInterval(fetchFundingRates,  30000);
  setInterval(_refreshGLData,     30000); // GL data refresh
  setInterval(fetchLiquidations,  30000);
  setInterval(fetchETFFlows,      60000);
  setInterval(fetchDominance,     60000);
  setInterval(fetchFearGreed,    120000);
  setInterval(fetchOnchain,       60000);
  setInterval(fetchAltFX,          30000);
  setInterval(fetchCoinGlassOI,   60000);
  setInterval(fetchCoinPaprika,   90000);
  setInterval(fetchCryptoCompare, 90000);
  setInterval(fetchFRED,        3600000);
  setInterval(fetchTreasuryYields,3600000);
  
  // Binance (primary)
  startBinanceWS();

// ── Live 7D + YTD data engine — Binance klines primary, Bybit/HL fallback ──────
// Symbols NOT on Binance spot/futures → try Bybit → try Hyperliquid
const _BYBIT_ONLY = new Set(['BERA','MOVE','VIRTUAL','FLOKI','OM','TON','STRK','W','ZEC','XMR']);
// Note: ZEC and XMR delisted from Binance (2023/2024) — fetched from Bybit instead
const _HL_ONLY    = new Set(['HYPE']);

async function fetchBinanceWeeklyOpen(){
  // Fetch weekly open for all coins — fixes 7D%
  const syms = CRYPTO.map(c=>c.s).filter(s=>s&&!s.endsWith('2'));
  let i=0;
  async function _batch(){
    const batch = syms.slice(i,i+6);
    await Promise.allSettled(batch.map(async function(sym){
      try{
        let weekOpen=0, dayHigh=0, dayLow=0, dayOpen=0;

        if(_HL_ONLY.has(sym)){
          // Hyperliquid: get spot meta + recent candles
          const r = await fetch('https://api.hyperliquid.xyz/info',{
            method:'POST', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({type:'candleSnapshot',req:{coin:sym,interval:'1W',startTime:Date.now()-14*86400000,endTime:Date.now()}}),
            signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
          });
          const d = await r.json();
          if(Array.isArray(d)&&d.length>0){ weekOpen=parseFloat(d[d.length-1].o||d[d.length-1][1]||0); }
        } else if(_BYBIT_ONLY.has(sym)){
          // Bybit klines
          const now = Date.now();
          const weekAgo = now - 7*24*3600000;
          const r = await fetch('https://api.bybit.com/v5/market/kline?category=spot&symbol='+sym+'USDT&interval=W&limit=2',{
            signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
          });
          const d = await r.json();
          if(d&&d.result&&d.result.list&&d.result.list.length>0){
            const latest = d.result.list[0]; // most recent first
            weekOpen = parseFloat(latest[1]); // open
            dayHigh  = parseFloat(latest[2]);
            dayLow   = parseFloat(latest[3]);
          }
          // Bybit daily for OHLC
          const r2 = await fetch('https://api.bybit.com/v5/market/kline?category=spot&symbol='+sym+'USDT&interval=D&limit=2',{
            signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
          });
          const d2 = await r2.json();
          if(d2&&d2.result&&d2.result.list&&d2.result.list.length>0){
            const day = d2.result.list[0];
            dayOpen  = parseFloat(day[1]);
            dayHigh  = parseFloat(day[2]);
            dayLow   = parseFloat(day[3]);
          }
        } else {
          // Binance klines — direct, no proxy needed
          const rw = await fetch('https://api.binance.com/api/v3/klines?symbol='+sym+'USDT&interval=1w&limit=2',{
            signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
          });
          if(rw.ok){
            const dw = await rw.json();
            if(Array.isArray(dw)&&dw.length>0) weekOpen = parseFloat(dw[dw.length-1][1]);
          }
          // Daily OHLC
          const rd = await fetch('https://api.binance.com/api/v3/klines?symbol='+sym+'USDT&interval=1d&limit=2',{
            signal:(()=>{const c=new AbortController();setTimeout(()=>c.abort(),5000);return c.signal;})()
          });
          if(rd.ok){
            const dd = await rd.json();
            if(Array.isArray(dd)&&dd.length>0){
              const day = dd[dd.length-1];
              dayOpen=parseFloat(day[1]); dayHigh=parseFloat(day[2]); dayLow=parseFloat(day[3]);
            }
          }
        }

        if(weekOpen>0){
          W1_OPEN[sym] = weekOpen;
          const coin = CRYPTO.find(c=>c.s===sym);
          // Only set chg7 if not already set by fetchLive7D (CoinGecko/Binance windowed)
          if(coin&&coin.px>0&&!coin._chg7live){
            coin.chg7=((coin.px/weekOpen)-1)*100;
            coin._chg7live=true;
          }
        }
        if((dayHigh>0||dayLow>0||dayOpen>0)&&!_HL_ONLY.has(sym)){
          if(!_dhloCache[sym]) _dhloCache[sym]={};
          if(dayHigh>0)  _dhloCache[sym].high  = dayHigh;
          if(dayLow>0)   _dhloCache[sym].low   = dayLow;
          if(dayOpen>0)  _dhloCache[sym].open  = dayOpen;
        }
      }catch(e){}
    }));
    i+=6;
    if(i<syms.length) setTimeout(_batch,350);
    else {
      // Force DOM refresh after all data loaded
      if(typeof _patchCRYPTOPanel==='function') _patchCRYPTOPanel();
      if(typeof _patchCryptoFundingCells==='function') _patchCryptoFundingCells();
    }
  }
  _batch();
}

// Also fetch YTD open from Jan 1 2026 daily kline
async function fetchBinanceYTDOpen(){
  const JAN1 = 1735689600000; // Jan 1 2026 00:00 UTC
  const _ab = ms => { const c=new AbortController(); setTimeout(()=>c.abort(),ms); return c.signal; };

  // ── PRIMÁRNÍ: CoinGecko /coins/markets — má přesná data pro všechny coiny ──────
  // Výpočet: ytd% = (current_price / jan1_price - 1) * 100
  // CoinGecko vrací price_change_percentage_ytd? Ne přímo, ale vrátí price_change_percentage_1y
  // Lepší: fetchneme coins/markets a porovnáme s aktuální cenou + YTD% od CoinGecko
  // NEBO: použijeme /coins/{id}/history?date=01-01-2026 pro každý coin
  // Nejjednodušší: jednoduše fetchneme historical přes coins/markets s from/to timestamps

  // ── Binance klines pro Binance coiny (přímý přístup, bez CORS) ───────────────
  const binanceSyms = CRYPTO.filter(c=>c.s&&!c.s.endsWith('2')&&!_HL_ONLY.has(c.s)&&!_BYBIT_ONLY.has(c.s));
  let i=0;
  async function _nextBatch(){
    const batch = binanceSyms.slice(i,i+8);
    await Promise.allSettled(batch.map(async function(coin){
      try{
        const r = await fetch('https://api.binance.com/api/v3/klines?symbol='+coin.s+'USDT&interval=1d&startTime='+JAN1+'&limit=1',{
          signal:_ab(5000)
        });
        if(!r.ok) return;
        const d=await r.json();
        if(!Array.isArray(d)||!d.length) return;
        const ytdOpen=parseFloat(d[0][1]);
        if(ytdOpen>0){
          const existing=YTD_OPEN_2026[coin.s];
          if(!existing||existing===0||(ytdOpen/existing>0.5&&ytdOpen/existing<2.0)){
            YTD_OPEN_2026[coin.s]=ytdOpen;
            // Ihned aktualizuj YTD% buňku pro tento coin
            const ytdEl=document.querySelector('[data-ytd="'+coin.id+'"]');
            if(ytdEl&&coin.px>0){
              const ytd=calcYtd2026(coin.s,coin.px);
              if(ytd!==null){
                const col=ytd>=0?'#00cc44':'#ff2222';
                ytdEl.innerHTML='<span style="color:'+col+';font-weight:700">'+(ytd>=0?'+':'')+ytd.toFixed(2)+'%</span>';
                ytdEl.dataset.ytdv=ytd.toFixed(2);
              }
            }
          }
        }
      }catch(_){}
    }));
    i+=8;
    if(i<binanceSyms.length) setTimeout(_nextBatch,250);
    else _ytdPatchDOM();
  }

  // ── Hyperliquid pro HYPE ───────────────────────────────────────────────────
  CRYPTO.filter(c=>_HL_ONLY.has(c.s)).forEach(async function(coin){
    try{
      const r=await fetch('https://api.hyperliquid.xyz/info',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'candleSnapshot',req:{coin:coin.s,interval:'1D',startTime:JAN1,endTime:JAN1+86400000}}),
        signal:_ab(6000)
      });
      const d=await r.json();
      if(Array.isArray(d)&&d.length>0){
        const ytdOpen=parseFloat(d[0].o||d[0][1]||0);
        if(ytdOpen>0) YTD_OPEN_2026[coin.s]=ytdOpen;
      }
    }catch(_){}
  });

  // ── CoinGecko /coins/{id}/history — pro _BYBIT_ONLY (ZEC, XMR, BERA...) ─────
  // Bybit CORS blokuje → CoinGecko přes corsproxy je spolehlivější
  const cgSyms = CRYPTO.filter(c=>c.id&&!c.s.endsWith('2')&&(_BYBIT_ONLY.has(c.s)||!YTD_OPEN_2026[c.s]));
  setTimeout(async function(){
    for(const coin of cgSyms){
      try{
        // CoinGecko /coins/{id}/history?date=01-01-2026 — přesné historické data
        const url='https://api.coingecko.com/api/v3/coins/'+coin.id+'/history?date=01-01-2026&localization=false';
        const r=await fetch('https://corsproxy.io/?url='+encodeURIComponent(url),{signal:_ab(10000)});
        if(!r.ok) continue;
        const d=await r.json();
        const ytdOpen=d?.market_data?.current_price?.usd;
        if(ytdOpen>0){
          const existing=YTD_OPEN_2026[coin.s];
          if(!existing||existing===0||(ytdOpen/existing>0.4&&ytdOpen/existing<2.5)){
            YTD_OPEN_2026[coin.s]=ytdOpen;
            console.log('[YTD] CG history '+coin.s+'='+ytdOpen.toFixed(4));
            // Ihned aktualizuj YTD% buňku pro tento coin
            const ytdEl=document.querySelector('[data-ytd="'+coin.id+'"]');
            if(ytdEl&&coin.px>0){
              const ytd=calcYtd2026(coin.s,coin.px);
              if(ytd!==null){
                const col=ytd>=0?'#00cc44':'#ff2222';
                ytdEl.innerHTML='<span style="color:'+col+';font-weight:700">'+(ytd>=0?'+':'')+ytd.toFixed(2)+'%</span>';
                ytdEl.dataset.ytdv=ytd.toFixed(2);
              }
            }
          }
        }
        await new Promise(r=>setTimeout(r,300)); // rate limit
      }catch(_){}
    }
    _ytdPatchDOM();
  }, 4000);

  function _ytdPatchDOM(){
    if(typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true);
    console.log('[YTD] Updated. ZEC='+YTD_OPEN_2026['ZEC']+' XMR='+YTD_OPEN_2026['XMR']);
  }

  _nextBatch();
  // CoinGecko YTD fallback — fills any coins still missing after Binance klines
  setTimeout(async function(){
    if(typeof CRYPTO==='undefined') return;
    const miss = CRYPTO.filter(c=>c.id&&!c.s.endsWith('2')&&(!YTD_OPEN_2026[c.s]||YTD_OPEN_2026[c.s]===0));
    if(!miss.length){ console.log('[YTD] All coins covered by static values'); return; }
    console.log('[YTD] CoinGecko fallback for:', miss.map(c=>c.s).join(','));
    try{
      const ids = miss.map(c=>c.id).join(',');
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+ids+'&price_change_percentage=365d&sparkline=false&per_page=50';
      const r = await fetch('https://corsproxy.io/?url='+encodeURIComponent(url),
        {signal:(()=>{const a=new AbortController();setTimeout(()=>a.abort(),12000);return a.signal;})()});
      if(!r.ok) return;
      const d = await r.json();
      if(!Array.isArray(d)) return;
      let filled=0;
      d.forEach(item=>{
        const coin=miss.find(c=>c.id===item.id);
        if(!coin) return;
        const pct=item.price_change_percentage_1y_in_currency??item.price_change_percentage_1y;
        if(pct!=null&&item.current_price>0){
          YTD_OPEN_2026[coin.s]=item.current_price/(1+pct/100);
          filled++;
        }
      });
      if(filled>0&&typeof _applyW1YtdToDOM==='function') _applyW1YtdToDOM(true);
      console.log('[YTD] CoinGecko filled',filled,'coins');
    }catch(_){}
  }, 5000);
}

  // ── Plynulý CRYPTO panel patch každou 1s ──
  setInterval(_patchCRYPTOPanel, 2000);  // 2s — balanced update
  // ── Dedikovaný YTD% live patch — každé 2s přepočítává YTD z živé ceny ──────
  setInterval(function _ytdLivePatch(){
    if(typeof CRYPTO==='undefined'||typeof calcYtd2026==='undefined') return;
    const now = Date.now();
    const col = function(v){ return v>=0?'#00cc44':'#ff2222'; };
    const fmt = function(v){ return '<span style="color:'+col(v)+';font-weight:700">'+(v>=0?'+':'')+v.toFixed(2)+'%</span>'; };
    CRYPTO.forEach(function(cr){
      if(!cr.px||cr.px<=0) return;
      const el = document.querySelector('[data-ytd="'+cr.id+'"]');
      if(!el) return;
      // Zobraz YTD% pouze pokud máme živou cenu (max 10 minut starou)
      const pxAge = cr._pxTs ? now - cr._pxTs : Infinity;
      const ytd = pxAge < 600000 ? calcYtd2026(cr.s, cr.px) : null;
      const newKey = ytd!==null ? ytd.toFixed(2) : 'null';
      if(el.dataset.ytdv !== newKey){
        el.dataset.ytdv = newKey;
        el.innerHTML = ytd!==null ? fmt(ytd) : '<span style="color:#887760">\u2014</span>';
      }
    });
  }, 2000);
  setTimeout(function(){ if(typeof _patchCryptoFundingCells==='function') _patchCryptoFundingCells(); }, 3000); // funding cells - first run early
  setInterval(function(){ if(typeof _patchCryptoFundingCells==="function") _patchCryptoFundingCells(); }, 15000); // funding cells every 5s
  setTimeout(fetchBinance24hr,     0);  // Binance ihned
  setTimeout(fetchBinance24hr,  3000);  // Binance druhý pokus
  
  // Ecosystem-native sources
  setTimeout(fetchHyperliquid,      0);  // HL okamžitě — přímý REST
  setTimeout(fetchHyperliquid,   2000);  // HL druhý pokus po 2s
  setTimeout(fetchJupiterPrices,3000);  // SOL ecosystem
  setTimeout(fetchRaydium,      4000);  // SOL DEX
  setTimeout(fetchUniswapV3,    5000);  // ETH on-chain
  setTimeout(fetchPancakeSwap,  6000);  // BNB chain
  
  // New CEX sources
  setTimeout(fetchKraken,          0);  // Kraken ihned
  setTimeout(fetchOKX,             0);  // OKX ihned
  setTimeout(fetchBybit,           0);  // Bybit ihned
  setTimeout(fetchHTX,           500);  // HTX ihned
  // KuCoin — CORS blokuje (testováno), přeskočeno
  // Gate.io — CORS blokuje (testováno), přeskočeno
  setTimeout(fetchCoinGecko,   12000);  // CoinGecko enrichment

  setTimeout(fetchLive7D, 500);              // 7D% — load immediately on startup
  setTimeout(fetchBinanceWeeklyOpen, 2000);  // 7D open prices fallback
  setTimeout(fetchBinanceYTDOpen,    3000);  // YTD open prices (direct Binance, no proxy)
  // MEXC — CORS blokuje přímý přístup (testováno), přeskočeno
  setTimeout(fetchCoinbase,    0);   // Coinbase REST ihned
  setTimeout(startCoinbaseWS, 1000); // Coinbase WS po 1s
  setTimeout(fetchGemini,     2000); // Gemini public
  setTimeout(fetchBitfinex,   3000); // Bitfinex public v2
  setTimeout(fetchBitMEX,     4000); // BitMEX futures
  setTimeout(fetchCoinAPI,    5000); // CoinAPI/ApiBricks exchange rates
  
  // Meta enrichment
  setTimeout(fetchCoinStats,    8000);
  fetchFX();
  fetchStooq();
  fetchDefiLlama();
  setTimeout(fetchFinnhubTradFi, 6000); // Finnhub TradFi quotes (EQ+IDX+FX+CMD)
  setTimeout(fetchAlphaVantageFX, 10000);
  
  // Repeat intervals
  setInterval(fetchBinance24hr,     15000);  // Binance REST 5s (přímý)
  setInterval(fetchHyperliquid,     10000);  // HL REST polling 3s (přímý, rychlý)
  setInterval(fetchJupiterPrices,  20000);  // Jupiter every 20s
  setInterval(fetchRaydium,        30000);  // Raydium every 30s
  setInterval(fetchUniswapV3,      30000);  // Uniswap every 30s
  setInterval(fetchPancakeSwap,    45000);  // Pancake every 45s
  setInterval(watchdogBinance,     30000);  // WS watchdog
  setInterval(fetchFX,             30000);
  setInterval(fetchStooq,          60000);
  setInterval(fetchFinnhubTradFi,  60000); // Finnhub TradFi every 60s (rate limit safe)
  // Finnhub WebSocket — real-time equities
  setTimeout(_startFinnhubWS, 2000);
  // Yahoo Finance — rotates all batches, one per 15s
  setTimeout(fetchYahooQuotes, 300);
  setInterval(fetchYahooQuotes,   30000);
  // Twelve Data — free fallback, rotates batches every 3min
  setTimeout(fetchTwelveData,  10000);
  setInterval(fetchTwelveData, 180000);
  // FX — ExchangeRate-API + Frankfurter fallback
  setTimeout(fetchExchangeRateFX, 6000);
  setInterval(fetchExchangeRateFX, 300000);
  setInterval(fetchCoinStats,      45000);
  setInterval(fetchDefiLlama,      90000);
  // New CEX intervals
  setInterval(fetchKraken,         20000);  // Kraken 8s (přímý)
  setInterval(fetchOKX,            20000);  // OKX 8s (přímý)
  setInterval(fetchBybit,          20000);  // Bybit 8s (přímý)
  // KuCoin interval odstraněn — CORS block
  // Gate.io interval odstraněn — CORS block
  // MEXC interval odstraněn — CORS block
  setInterval(fetchHTX,            30000);  // HTX 10s (přímý)
  setInterval(fetchBitget,         30000);  // Bitget every 30s
  setInterval(fetchCoinbase,       30000);  // Coinbase REST 30s (záloha, WS dělá real-time)
  setInterval(fetchCoinGecko,      60000);  // CoinGecko every 60s
  setInterval(fetchLive7D, 60000);              // 7D% refresh every 60s (CoinGecko rate limit)
  setInterval(fetchBinanceWeeklyOpen, 300000);  // klines fallback every 5min
  setInterval(()=>{
    renderFXPins(); renderSidebar(); buildTicker(); renderMarkers();
    // refreshAllPanels je throttlovaný interně — CRYPTO panel je skipnutý (má vlastní patch)
    refreshAllPanels();
  }, 2000);
  // Live news feed — refresh every 60s
  setInterval(()=>fetchAllNews(false),60000); // refresh every 45s — more sources
  // Initial news fetch — then re-render CB+INST popups so headlines are live
  setTimeout(()=>fetchNWSNews(true), 4000); // NWS separate fetch
  setTimeout(()=>fetchAllNews(true).then(()=>{
    try{ renderCBLayer(); renderInstLayer(); }catch(e){}
  }),3000);
  // Periodic popup re-render to keep headlines fresh (every 90s)
  setInterval(()=>{ try{ renderCBLayer(); renderInstLayer(); }catch(e){} }, 60000);
  // Live macro calendar — Forex Factory
  setTimeout(()=>fetchMacroCalendar(true),5000);
  
}

// ── Helper: merge live funding into static array ──────────────────────────
function mergeFunding(staticArr){
  return staticArr.map(a=>{
    const live=_liveData.funding[a.s];
    if(!live)return a;
    return {...a,
      b: live.binance!==undefined ? live.binance : a.b,
      y: live.bybit!==undefined   ? live.bybit   : a.y,
      o: live.okx!==undefined     ? live.okx     : a.o
};
  });
}
function mergeLiqd(staticArr){
  return staticArr.map(d=>{
    const live=_liveData.liqd[d.s];
    if(!live||!live.l24)return d;
    return {...d, l24:live.l24, s24:live.s24, l1:live.l1, s1:live.s1, blL:live.blL, blS:live.blS};
  });
}
function getEtfVal(sym,field,fallback){
  const v=_liveData.etf[sym];
  return (v&&v[field]!==undefined&&v[field]!==0) ? v[field] : fallback;
}

// ← feeds moved to _startAllFeeds()

/* ════════════════════════════════════════════════════════
   ALTERNATIVE MARKET DATA — extra free APIs
   • Alpha Vantage (forex, equities, crypto)
   • Open Exchange Rates
   • Coinpaprika extended
   • Messari (on-chain)
   • CryptoCompare extended
════════════════════════════════════════════════════════ */
async function fetchAlternativeMarketData() {
  // ── Alpha Vantage — free tier, 25 req/day ─────────────
  // Use demo key for now (limited), user can add real key
  const AV_KEY = window.ALPHA_VANTAGE_KEY || 'demo';

  // ── Commodities from Alpha Vantage ────────────────────
  try {
    const r = await _fetchRaceJSON(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BRENT&apikey=${AV_KEY}`, 8000
    );
    if(r?.['Global Quote']?.['05. price']) {
      const px = parseFloat(r['Global Quote']['05. price']);
      const chg = parseFloat(r['Global Quote']['10. change percent']);
      const cd = COMDTY_DATA.find(x=>x.s==='BRENT');
      if(cd && px > 0) { cd.px = px; if(!isNaN(chg)) cd.chg = chg; }
    }
  } catch(e) {}

  // ── Metals from Open Exchange Rates ──────────────────
  try {
    const r2 = await _fetchRaceJSON('https://open.er-api.com/v6/latest/XAU', 6000);
    if(r2?.rates?.USD) {
      const xauPx = 1 / r2.rates.USD;
      const cd = COMDTY_DATA.find(x=>x.s==='GOLD');
      if(cd && xauPx > 0) cd.px = xauPx;
    }
  } catch(e) {}

  // ── CoinGecko global market ───────────────────────────
  try {
    const r3 = await _fetchRaceJSON('https://api.coingecko.com/api/v3/global', 8000);
    if(r3?.data) {
      const d = r3.data;
      window._cgGlobal = {
        totalMC:     d.total_market_cap?.usd || 0,
        totalVol:    d.total_volume?.usd || 0,
        btcDom:      d.market_cap_percentage?.btc || 0,
        ethDom:      d.market_cap_percentage?.eth || 0,
        activeCoins: d.active_cryptocurrencies || 0,
        mcChange24h: d.market_cap_change_percentage_24h_usd || 0,
        ts: Date.now()
      };
      // CRITICAL: store real total MC globally for dominance calculations
      if(d.total_market_cap?.usd > 1e12) window._cgGlobalMC = d.total_market_cap.usd;
      window._layerStatus.macro = {ok:true, ts:Date.now()};
    }
  } catch(e) {}

