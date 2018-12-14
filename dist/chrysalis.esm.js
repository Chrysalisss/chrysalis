/**
 * Chrysalis v0.10.4-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

function h(e,t){for(var n=[],i=arguments.length-2;i-- >0;)n[i]=arguments[i+2];return{nodeName:e,attributes:t||{},children:n}}var x0$1=function e(t){if("object"!=typeof t)return document.createTextNode(t);var n=document.createElement(t.nodeName);return Object.keys(t.attributes).map(function(e){n.setAttribute(e,t.attributes[e])}),t.children.forEach(function(t){return n.appendChild(e(t))}),n},render=function(e,t){t.appendChild(x0$1(e))},x3=function(e,t){var n="object"!=typeof e;return typeof e!=typeof t||e.nodeName!==t.nodeName||n&&e!==t},updateElement=function e(t,n,i,r){if(void 0===r&&(r=0),i)if(n){if(x3(n,i))t.replaceChild(x0(n),t.childNodes[r]);else if(n.nodeName){x2(t.childNodes[r],n.attributes,i.attributes);for(var o=n.children.length,d=i.children.length,c=0;c<o||c<d;c++)e(t.childNodes[r],n.children[c],i.children[c],c)}}else t.removeChild(t.childNodes[r]);else t.appendChild(x0(n))},x2=function(e,t,n){void 0===n&&(n={});var i=Object.assign({},t,n);Object.keys(i).forEach(function(i){x1(e,i,t[i],n[i])})},x1=function(e,t,n,i){n?i&&n===i||e.setAttribute(t,n):e.removeAttribute(t)};export{h,render,updateElement};
