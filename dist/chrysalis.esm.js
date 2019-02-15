/**
 * Chrysalis v0.12.0-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

function e(e,t){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];return"function"==typeof e?e(t):(Array.isArray(n[0])&&(n=n[0]),{e:e,t:t||{},n:n})}function t(e,t,n){for(var r in function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n}(t,n))t[r]?t[r]!=n[r]&&("class"==r?e.setAttribute("class",t[r]):e[r]=t[r]):"class"==r?e.removeAttribute("class"):(e[r]=null,delete e[r])}function n(e,r){if("object"!=typeof e)return document.createTextNode(e);var o=(r=r||"svg"==e.e)?document.createElementNS("http://www.w3.org/2000/svg",e.e):document.createElement(e.e);for(var i in t(o,e.t,{}),e.n)o.appendChild(n(e.n[i],r));return o}var r,o;function i(e,i){r=e,function e(o,i,l,c,a){var f,s,u=l||r;if(null==i)u.appendChild(n(o,a));else if(null==o)u.removeChild(u.childNodes[c||0]);else if(typeof(f=o)!=typeof(s=i)||f.e!==s.e||"object"!=typeof s&&s!==f)u.replaceChild(n(o,a),u.childNodes[c||0]);else if(o.e){t(u.childNodes[c||0],o.t,i.t);for(var d=Math.max(o.n.length,i.n.length),p=-1;++p<d;)e(o.n[p],i.n[p],u.childNodes[c||0],p,a=a||"svg"==o.e)}}(App(),o,e),o=App(),i&&i()}function l(e){e&&e(),i(r)}export{e as h,i as start,l as setState};
