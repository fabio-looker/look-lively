(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{33:function(e,t,n){(t=n(34)(!1)).push([e.i,"body {\n\tbackground-color: #fff;\n\tmargin: 0 40px;\n}\n.table-wrap {\n\theight:640px;\n\toverflow-y: auto;\n}\ntable {\n\tborder-collapse: collapse;\n\ttable-layout: fixed;\n}\nthead tr th {\n\tposition: sticky;\n\ttop: 0;\n\tbackground-color: #fff;\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.5);\n}\n\ntbody {\n}\ntr {\n  border-bottom: 1px solid #ccc;\n}\nth, td {\n\ttext-align: left;\n\tpadding: 4px;\n}\n.status {\n\tmargin: 1em;\n\tmax-width: 600px;\n\tpadding: 6px 20px;\n\tborder: 1px solid #CCC;\n\tbackground-color: #EEE;\n\tcolor:#666;\n\tborder-radius: 6px;\n\tbox-shadow: 4px 4px 4px rgba(0,0,0,0.5)\n}",""]),e.exports=t},34:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(l=r,i=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),"/*# ".concat(s," */")),a=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([o]).join("\n")}var l,i,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var i=0;i<e.length;i++){var s=[].concat(e[i]);r&&o[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},35:function(e,t,n){var r={"./formatter-ad-hoc-01.js":[36,2],"./formatter-big-complex-default.js":[37,3],"./formatter-none.js":[38,4],"./formatter-percent-n.js":[39,5]};function o(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],o=t[0];return n.e(t[1]).then((function(){return n(o)}))}o.keys=function(){return Object.keys(r)},o.id=35,e.exports=o},40:function(e,t,n){"use strict";n.r(t);var r={};function o(e,t){for(var n=[],r=[],o=arguments.length;o-- >2;)n.push(arguments[o]);for(;n.length;){var a=n.pop();if(a&&a.pop)for(o=a.length;o--;)n.push(a[o]);else null!=a&&!0!==a&&!1!==a&&r.push(a)}return"function"==typeof e?e(t||{},r):{nodeName:e,attributes:t||{},children:r,key:t&&t.key}}function a(e,t,n,r){var o,a=[].map,l=r&&r.children[0]||null,i=l&&function e(t){return{nodeName:t.nodeName.toLowerCase(),attributes:{},children:a.call(t.childNodes,(function(t){return 3===t.nodeType?t.nodeValue:e(t)}))}}(l),s=[],c=!0,u=h(e),f=function e(t,n,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var a=o(e);return"function"==typeof a&&(a=a(y(t,u),r)),a&&a!==(n=y(t,u))&&!a.then&&m(u=v(t,h(n,a),u)),a}}(o,r[o]):e(t.concat(o),n[o]=h(n[o]),r[o]=h(r[o]));return r}([],u,h(t));return m(),f;function d(e){return"function"==typeof e?d(e(u,f)):null!=e?e:""}function p(){o=!o;var e=d(n);for(r&&!o&&(l=function e(t,n,r,o,a){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var l=function e(t,n){var r="string"==typeof t||"number"==typeof t?document.createTextNode(t):(n=n||"svg"===t.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",t.nodeName):document.createElement(t.nodeName),o=t.attributes;if(o){o.oncreate&&s.push((function(){o.oncreate(r)}));for(var a=0;a<t.children.length;a++)r.appendChild(e(t.children[a]=d(t.children[a]),n));for(var l in o)w(r,l,o[l],null,n)}return r}(o,a);t.insertBefore(l,n),null!=r&&x(t,n,r),n=l}else if(null==r.nodeName)n.nodeValue=o;else{!function(e,t,n,r){for(var o in h(t,n))n[o]!==("value"===o||"checked"===o?e[o]:t[o])&&w(e,o,n[o],t[o],r);var a=c?n.oncreate:n.onupdate;a&&s.push((function(){a(e,t)}))}(n,r.attributes,o.attributes,a=a||"svg"===o.nodeName);for(var i={},u={},f=[],p=r.children,m=o.children,v=0;v<p.length;v++){f[v]=n.childNodes[v],null!=(g=b(p[v]))&&(i[g]=[f[v],p[v]])}v=0;for(var y=0;y<m.length;){var g=b(p[v]),S=b(m[y]=d(m[y]));if(u[g])v++;else if(null==S||S!==b(p[v+1]))if(null==S||c)null==g&&(e(n,f[v],p[v],m[y],a),y++),v++;else{var _=i[S]||[];g===S?(e(n,_[0],_[1],m[y],a),v++):_[0]?e(n,n.insertBefore(_[0],f[v]),_[1],m[y],a):e(n,f[v],null,m[y],a),u[S]=m[y],y++}else null==g&&x(n,f[v],p[v]),v++}for(;v<p.length;)null==b(p[v])&&x(n,f[v],p[v]),v++;for(var v in i)u[v]||x(n,i[v][0],i[v][1])}return n}(r,l,i,i=e)),c=!1;s.length;)s.pop()()}function m(){o||(o=!0,setTimeout(p))}function h(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n}function v(e,t,n){var r={};return e.length?(r[e[0]]=e.length>1?v(e.slice(1),t,n[e[0]]):t,h(n,r)):t}function y(e,t){for(var n=0;n<e.length;)t=t[e[n++]];return t}function b(e){return e?e.key:null}function g(e){return e.currentTarget.events[e.type](e)}function w(e,t,n,r,o){if("key"===t);else if("style"===t)if("string"==typeof n)e.style.cssText=n;else for(var a in"string"==typeof r&&(r=e.style.cssText=""),h(r,n)){var l=null==n||null==n[a]?"":n[a];"-"===a[0]?e.style.setProperty(a,l):e.style[a]=l}else"o"===t[0]&&"n"===t[1]?(t=t.slice(2),e.events?r||(r=e.events[t]):e.events={},e.events[t]=n,n?r||e.addEventListener(t,g):e.removeEventListener(t,g)):t in e&&"list"!==t&&"type"!==t&&"draggable"!==t&&"spellcheck"!==t&&"translate"!==t&&!o?e[t]=null==n?"":n:null!=n&&!1!==n&&e.setAttribute(t,n),null!=n&&!1!==n||e.removeAttribute(t)}function x(e,t,n){function r(){e.removeChild(function e(t,n){var r=n.attributes;if(r){for(var o=0;o<n.children.length;o++)e(t.childNodes[o],n.children[o]);r.ondestroy&&r.ondestroy(t)}return t}(t,n))}var o=n.attributes&&n.attributes.onremove;o?o(t,r):r()}}n.r(r),n.d(r,"h",(function(){return o})),n.d(r,"app",(function(){return a}));var l=n(33),i=n.n(l);function s(e){switch(!0){case!e:case!e.value_format&&!e.value_format_name&&!e.html:return"formatter-none";case!(!e.value_format_name||!e.value_format_name.match(/^percent_[0-9]$/)):return"formatter-percent-n";case!(!e.value_format||!e.value_format.match(/^#,##0.0%$/)):return"formatter-ad-hoc-01";default:return"formatter-big-complex-default"}}n.d(t,"default",(function(){return f}));const c=e=>e,u=(e,t,n)=>n.indexOf(e)===t;function f(e,t,{host:o,looker:a,document:l,global:f}){!function(e){const t=e.createElement("style");t.appendChild(e.createTextNode(i.a.toString())),e.head.appendChild(t)}(l);const d=function({hyperapp:e,host:t,looker:r,document:o}){const a=function(e){const{h:t}=e,[n,r,o,a,l,i,s,u,f]="main,h1,div,table,tr,th,td,thead,tbody".split(",").map(e=>(n,r)=>t(e,n,r)),d={},p=[];return(e,t)=>{const m=(h=0,v=e.scroll.dataRowsOffset-2*e.scroll.rowsInAScreen,h>v?h:v);var h,v;const y=function(e,t){return e<t?e:t}(e.scroll.dataRowsOffset+2*e.scroll.rowsInAScreen,e.data.length);return n(d,[r(d,"Turbo Query"),...e.queryState||e.dataState?[o({class:"status"},[o(d,e.queryState?`Query: ${e.queryState}`:""),o(d,e.dataState?`Data:  ${e.dataState}`:"")])]:p,o({class:"table-wrap",onscroll:t.scroll.checkScroll},[a(d,[u(d,[l(d,p.concat(i(d,"#")).concat(e.query.fields.map(t=>i(d,(e.fields[t]||d).label||t))))]),f(d,p.concat(l({style:{height:e.scroll.tableRowHeightPixels*m+"px"}},p)).concat(e.data.slice(m,y).map((t,n)=>l({style:{height:e.scroll.tableRowHeightPixels+"px"}},p.concat(s(d,m+n+1)).concat(t.map((t,n)=>s(d,(e.curriedFormatterSequence[n]||c)(t))))))).concat(l({style:{height:(e.scroll.tableRowHeightPixels*(e.data.length-y)||0)+"px"}},p)))])])])}}(e),l={state:e=>e=>e,set:e=>t=>e},i={...l,fields:l,query:l,formats:l,formatters:l,resolveQueryDefinition:e=>async(t,n)=>{n.set({queryState:"Fetching query definition..."});const o=await e;if(!o)return n.set({queryState:"No query available"});if(!o.ok)return n.set({queryState:"Query definition error in API response"});const a=o.value;if(!a.fields)return n.set({queryState:`Unexpected query definition: ${JSON.stringify(a).slice(0,50)}...`});n.set({query:a});const l=a.model,i=a.view;if(!l||!i)return void console.warn("No model/view in query, with which to fetch field labels");const c=await r.lookml_model_explore(l,i,"fields(dimensions(name,label,label_short,label_from_parameter,view_label,value_format),measures(name,label,label_short,label_from_parameter,view_label,value_format))");if(!c.ok||!c.value)return n.set({queryState:`Failed to fetch explore definition for ${l}/${i}`});const f=c.value;if(!f.fields)return n.set({queryState:`Failed to find field definitions found for ${l}/${i}`});const d=[].concat(f.fields.dimensions||[]).concat(f.fields.measures||[]).map(e=>({...e,label:t.fields[e.name]&&t.fields[e.name].label||e.label_from_parameter&&`${e} (pending label_from_parameter)`||e.label_short||e.label||e.replace(/_/g," ").replace(/[^|_][a-z]/g,e=>e.toUpperCase()),formatterId:s(e)})),p=Object.fromEntries(d.map(e=>[e.name,e]));n.fields.set(p),n.set({queryState:""}),d.map(e=>e.formatterId).filter(u).forEach(e=>n.resolveFormatter(e))},resolveQueryData:e=>async(t,n)=>{if(!e)return void n.set({dataState:"No data available"});const r=await e;if(!r.ok)return void n.set({dataState:"Data error in API response"});const[o,...a]=r.value.split("\n").filter((e,t,n)=>t<n.length-1||""!==e).map(e=>e.split(","));n.set({labelSequence:o}),n.mergeLabels(),n.set({data:a,dataState:""})},resolveFormatter:e=>async(t,r)=>{let o=t.formatters[e];if(!o){if(o=await n(35)(`./${e}.js`).then(e=>e.default),!o)return;r.formatters.set({[e]:o})}let a=r.formatters.state();if(t.query.fields){const e=t.query.fields.map(e=>{const n=t.fields[e]||t.dynamic_fields[e]||O,r=n.formatterId||"",o=a[r];return o?o(n):c});r.set({curriedFormatterSequence:e})}},mergeLabels:()=>async(e,t)=>{},scroll:{...l,checkScroll:e=>async(t,n)=>{const r=e.target,o=Math.floor(r.scrollTop/t.tableRowHeightPixels),a=Math.ceil((r.scrollTop+r.offsetHeight)/t.tableRowHeightPixels),l=Math.floor((o+a)/2);return a>t.dataRowsOffset+t.rowsInAScreen?n.set({dataRowsOffset:l}):o<t.dataRowsOffset-t.rowsInAScreen?n.set({dataRowsOffset:l}):void 0}}};return e.app({fields:{},dynamic_fields:{},queryState:"Loading...",dataState:"Loading...",query:{fields:[],dynamic_fields:[]},data:[],labelSequence:[],formatters:{},curriedFormatterSequence:[],scroll:{tableRowHeightPixels:27,dataRowsOffset:0,rowsInAScreen:24}},i,a,o.body)}({hyperapp:r,host:o,looker:a,document:l});f.app=d,d.resolveQueryDefinition(e),d.resolveQueryData(t)}}}]);