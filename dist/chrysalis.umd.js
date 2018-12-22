/**
 * Chrysalis v0.10.6-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Chrysalis={})}(this,function(e){function t(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}var n=function(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign({},t,n)).forEach(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})},o=function e(t,o){if("object"!=typeof t)return document.createTextNode(t);var d=o?document.createElementNS("http://www.w3.org/2000/svg",node.F):document.createElement(t.F);return n(d,t.G),t.H.map(function(t){return d.appendChild(e(t,o))}),d},d=function(e,t){t.appendChild(o(e))},i=function e(t,d,i,r){var c=d,f=i,u="object"!=typeof f;if(void 0===r&&e(t,c,f,"svg"===c.F),f||t.appendChild(o(c,r)),c||t.removeChild(t.childNodes[0]),typeof c!=typeof f||c.F!==f.F||u&&f!==c)t.replaceChild(o(c),t.childNodes[0]);else{n(t.childNodes[0],c.G,f.G);for(var l=Math.max(c.H.length,f.H.length),p=-1;++p<l;)nElement(t.childNodes[0],c.H[p],f.H[p],p,r)}};e.h=t,e.render=d,e.updateElement=i,Object.defineProperty(e,"__esModule",{value:!0})});
