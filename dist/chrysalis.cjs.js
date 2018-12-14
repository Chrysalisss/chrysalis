/**
 * Chrysalis v0.10.4-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];return{nodeName:e,attributes:t||{},children:n}}Object.defineProperty(exports,"__esModule",{value:!0});var x0$1=function e(t){if("object"!=typeof t)return document.createTextNode(t);var n=document.createElement(t.nodeName);return Object.keys(t.attributes).map(function(e){n.setAttribute(e,t.attributes[e])}),t.children.forEach(function(t){return n.appendChild(e(t))}),n},render=function(e,t){t.appendChild(x0$1(e))},x3=function(e,t){var n="object"!=typeof e;return typeof e!=typeof t||e.nodeName!==t.nodeName||n&&e!==t},updateElement=function e(t,n,r,i){if(void 0===i&&(i=0),r)if(n){if(x3(n,r))t.replaceChild(x0(n),t.childNodes[i]);else if(n.nodeName){x2(t.childNodes[i],n.attributes,r.attributes);for(var o=n.children.length,d=r.children.length,c=0;c<o||c<d;c++)e(t.childNodes[i],n.children[c],r.children[c],c)}}else t.removeChild(t.childNodes[i]);else t.appendChild(x0(n))},x2=function(e,t,n){void 0===n&&(n={});var r=Object.assign({},t,n);Object.keys(r).forEach(function(r){x1(e,r,t[r],n[r])})},x1=function(e,t,n,r){n?r&&n===r||e.setAttribute(t,n):e.removeAttribute(t)};exports.h=h,exports.render=render,exports.updateElement=updateElement;
