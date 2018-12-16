/**
 * Chrysalis v0.10.5-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];return{nodeName:e,attributes:t||{},children:n}}Object.defineProperty(exports,"__esModule",{value:!0});var x0=function e(t){if("object"!=typeof t)return document.createTextNode(t);var n=document.createElement(t.nodeName);return Object.keys(t.attributes).map(function(e){n.setAttribute(e,t.attributes[e])}),t.children.forEach(function(t){return n.appendChild(e(t))}),n},render=function(e,t){t.appendChild(x0(e))},updateElement=function e(t,n,r,o){if(void 0===o&&(o=0),r||t.appendChild(x0(n)),n||t.removeChild(t.childNodes[o]),x3(n,r))t.replaceChild(x0(n),t.childNodes[o]);else if(n.nodeName){x2(t.childNodes[o],n.attributes,r.attributes);for(var d=Math.max(n.children.length,r.children.length),i=-1;++i<d;)e(t.childNodes[o],n.children[i],r.children[i],i)}},x3=function(e,t){var n="object"!=typeof t;return typeof t!=typeof e||t.nodeName!==e.nodeName||n&&t!==e},x2=function(e,t,n){void 0===n&&(n={});var r=Object.assign({},t,n);Object.keys(r).forEach(function(r){x1(e,r,t[r],n[r])})},x1=function(e,t,n,r){n?r&&n===r||e.setAttribute(t,n):e.removeAttribute(t)};exports.h=h,exports.render=render,exports.updateElement=updateElement;
