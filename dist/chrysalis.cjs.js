/**
 * Chrysalis v0.15.0-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

function h(e,t){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];return Array.isArray(r[0])&&(r=r[0]),"function"==typeof e?e(t||r,r):{e:e,t:t||{},n:r}}function merge(e,t){for(var r in t)e[r]=t[r];return e}function getKey(e){if(e&&(e=e.t))return e.key}function removeElement(e,t){e.removeChild(t)}function createRef(){return{}}Object.defineProperty(exports,"__esModule",{value:!0});var ROOT_ELEMENT,element$1,oldNode,refs={};function updateAttrs(e,t,r){for(var n in merge(t,r))t[n]?t[n]!=r[n]&&("ref"==n?"string"==typeof t[n]?refs[t[n]]=e:"function"==typeof t[n]?t[n](element):t[n].current=e:"dangerouslySetInnerHTML"==n?e.innerHTML=t[n].__html:"class"==n?e.setAttribute("class",t[n]):e[n]=t[n]):"class"==n?e.removeAttribute("class"):(e[n]=null,delete e[n])}function createElement(e,t){if("object"!=typeof e)return document.createTextNode(e);var r=(t=t||"svg"==e.e)?document.createElementNS("http://www.w3.org/2000/svg",e.e):document.createElement(e.e);for(var n in updateAttrs(r,e.t,{}),e.n)r.appendChild(createElement(e.n[n],t));return r}function patch(e,t,r,n,o){if(n===r);else if(null==r)t=e.insertBefore(createElement(n,o),t);else if(n.e&&n.e===r.e){updateAttrs(t,r.t,n.t),o=o||"svg"==n.e;for(var a=n.n.length,l=r.n.length,s={},f=[],c={},u=0;u<l;u++){var i=t.childNodes[u];f[u]=i;var p=r.n[u],v=getKey(p);null!=v&&(s[v]=[i,p])}for(var m=0,d=0;d<a;){var h=f[m],E=r.n[m],g=n.n[d],y=getKey(E);if(c[y])m++;else{var N=getKey(g),T=s[N]||[];null==N?(null==y&&(patch(t,h,E,g,o),d++),m++):(y===N?(patch(t,T[0],T[1],g,o),m++):T[0]?(t.insertBefore(T[0],h),patch(t,T[0],T[1],g,o)):patch(t,h,null,g,o),d++,c[N]=g)}}for(;m<l;){var A=r.n[m];null==getKey(A)&&removeElement(t,f[m],A),m++}for(var x in s){var O=s[x],_=O[1];c[_.t.key]||removeElement(t,O[0],_)}}else if(n!==r){var M=t;e.replaceChild(t=createElement(n,o),M)}return t}function start(e,t){ROOT_ELEMENT=e,element$1=patch(e,element$1,oldNode,oldNode=App()),t&&t()}function setState(e){e&&e(),start(ROOT_ELEMENT)}exports.h=h,exports.start=start,exports.setState=setState,exports.createRef=createRef,exports.refs=refs;
