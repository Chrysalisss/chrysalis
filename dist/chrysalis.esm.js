/**
 * Chrysalis v0.10.6-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}var C=function(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign({},t,n)).forEach(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})},B=function e(t,n){if("object"!=typeof t)return document.createTextNode(t);var o=n?document.createElementNS("http://www.w3.org/2000/svg",node.F):document.createElement(t.F);return C(o,t.G),t.H.map(function(t){return o.appendChild(e(t,n))}),o},render=function(e,t){t.appendChild(B(e))},updateElement=function e(t,n,o,r){var d=n,c=o,i="object"!=typeof c;if(void 0===r&&e(t,d,c,"svg"===d.F),c||t.appendChild(B(d,r)),d||t.removeChild(t.childNodes[0]),typeof d!=typeof c||d.F!==c.F||i&&c!==d)t.replaceChild(B(d),t.childNodes[0]);else{C(t.childNodes[0],d.G,c.G);for(var a=Math.max(d.H.length,c.H.length),f=-1;++f<a;)nElement(t.childNodes[0],d.H[f],c.H[f],f,r)}};export{h,render,updateElement};
