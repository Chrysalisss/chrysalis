/**
 * Chrysalis v0.10.7-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Chrysalis={})}(this,function(e){function t(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];return"function"==typeof e?e(t):{F:e,G:t||{},H:n}}var n=function(e,t,n){void 0===n&&(n={}),Object.keys(Object.assign({},t,n)).map(function(o){t[o]?n[o]&&t[o]===n[o]||e.setAttribute(o,t[o]):e.removeAttribute(o)})},o=function e(t,o){if("object"!=typeof t)return document.createTextNode(t);var i=!("svg"!==t.F&&!o),d=i?document.createElementNS("http://www.w3.org/2000/svg",t.F):document.createElement(t.F);return n(d,t.G),t.H.map(function(t){return d.appendChild(e(t,i))}),d},i=function(e,t){t.appendChild(o(e))},d=function e(t,i,d,r){if(d||t.appendChild(o(i,r)),i||t.removeChild(t.childNodes[0]),typeof i!=typeof d||i.F!==d.F||"object"!=typeof d&&d!==i)t.replaceChild(o(i,r),t.childNodes[0]);else{n(t.childNodes[0],i.G,d.G);for(var c=Math.max(i.H.length,d.H.length),f=-1;++f<c;)e(t.childNodes[0],i.H[f],d.H[f],f,r)}};e.h=t,e.render=i,e.updateElement=d,Object.defineProperty(e,"__esModule",{value:!0})});
