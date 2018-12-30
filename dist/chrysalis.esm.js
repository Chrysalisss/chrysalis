/**
 * Chrysalis v0.11.0-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}function C(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign(t,n)).map(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})}function B(e,t){if("object"!=typeof e)return document.createTextNode(e);var n=(t=t||"svg"==e.F)?document.createElementNS("http://www.w3.org/2000/svg",e.F):document.createElement(e.F);return C(n,e.G),e.H.map(function(e){return n.appendChild(B(e,t))}),n}function render(e,t,n){t.appendChild(B(e)),void 0!==n&&n()}function updateElement(e,t,n,o,d){if(n||e.appendChild(B(t,d)),t)if(typeof t!=typeof n||t.F!==n.F||"object"!=typeof n&&n!==t)e.replaceChild(B(t,d),e.childNodes[o||0]);else{C(e.childNodes[o||0],t.G,n.G);for(var i=Math.max(t.H.length,n.H.length),r=-1;++r<i;)updateElement(e.childNodes[o||0],t.H[r],n.H[r],r,d=d||"svg"==t.F)}else e.removeChild(e.childNodes[o||0])}export{h,render,updateElement};
