/**
 * Chrysalis v0.11.0-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Chrysalis={})}(this,function(e){function t(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}function n(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign(t,n)).map(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})}function o(e,t){if("object"!=typeof e)return document.createTextNode(e);var i=(t=t||"svg"==e.F)?document.createElementNS("http://www.w3.org/2000/svg",e.F):document.createElement(e.F);return n(i,e.G),e.H.map(function(e){return i.appendChild(o(e,t))}),i}function i(e,t,n){t.appendChild(o(e)),void 0!==n&&n()}function d(e,t,i,r,f){if(i||e.appendChild(o(t,f)),t)if(typeof t!=typeof i||t.F!==i.F||"object"!=typeof i&&i!==t)e.replaceChild(o(t,f),e.childNodes[r||0]);else{n(e.childNodes[r||0],t.G,i.G);for(var c=Math.max(t.H.length,i.H.length),u=-1;++u<c;)d(e.childNodes[r||0],t.H[u],i.H[u],u,f=f||"svg"==t.F)}else e.removeChild(e.childNodes[r||0])}e.h=t,e.render=i,e.updateElement=d,Object.defineProperty(e,"__esModule",{value:!0})});
