/**
 * Chrysalis v0.10.7-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}Object.defineProperty(exports,"__esModule",{value:!0});var C=function(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign({},t,n)).map(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})},B=function e(t,n){if("object"!=typeof t)return document.createTextNode(t);var o=!("svg"!==t.F&&!n),r=o?document.createElementNS("http://www.w3.org/2000/svg",t.F):document.createElement(t.F);return C(r,t.G),t.H.map(function(t){return r.appendChild(e(t,o))}),r},render=function(e,t){t.appendChild(B(e))},updateElement=function e(t,n,o,r){if(o||t.appendChild(B(n,r)),n||t.removeChild(t.childNodes[0]),typeof n!=typeof o||n.F!==o.F||"object"!=typeof o&&o!==n)t.replaceChild(B(n,r),t.childNodes[0]);else{C(t.childNodes[0],n.G,o.G);for(var d=Math.max(n.H.length,o.H.length),c=-1;++c<d;)e(t.childNodes[0],n.H[c],o.H[c],c,r)}};exports.h=h,exports.render=render,exports.updateElement=updateElement;
