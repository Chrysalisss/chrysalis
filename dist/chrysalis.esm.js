/**
 * Chrysalis v0.15.0-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

function e(e,n){for(var r=[],t=arguments.length-2;t-- >0;)r[t]=arguments[t+2];return Array.isArray(r[0])&&(r=r[0]),"function"==typeof e?e(n||r,r):{e:e,t:n||{},n:r}}function n(e){if(e&&(e=e.t))return e.key}function r(e,n){e.removeChild(n)}function t(){return{}}var o,l,f,i={};function u(e,n,r){for(var t in function(e,n){for(var r in n)e[r]=n[r];return e}(n,r))n[t]?n[t]!=r[t]&&("ref"==t?"string"==typeof n[t]?i[n[t]]=e:"function"==typeof n[t]?n[t](element):n[t].current=e:"dangerouslySetInnerHTML"==t?e.innerHTML=n[t].__html:"class"==t?e.setAttribute("class",n[t]):e[t]=n[t]):"class"==t?e.removeAttribute("class"):(e[t]=null,delete e[t])}function a(e,n){if("object"!=typeof e)return document.createTextNode(e);var r=(n=n||"svg"==e.e)?document.createElementNS("http://www.w3.org/2000/svg",e.e):document.createElement(e.e);for(var t in u(r,e.t,{}),e.n)r.appendChild(a(e.n[t],n));return r}function c(e,t){o=e,l=function e(t,o,l,f,i){if(f===l);else if(null==l)o=t.insertBefore(a(f,i),o);else if(f.e&&f.e===l.e){u(o,l.t,f.t),i=i||"svg"==f.e;for(var c=f.n.length,s=l.n.length,v={},d=[],p={},g=0;g<s;g++){var h=o.childNodes[g];d[g]=h;var m=l.n[g],y=n(m);null!=y&&(v[y]=[h,m])}for(var A=0,w=0;w<c;){var b=d[A],C=l.n[A],N=f.n[w],T=n(C);if(p[T])A++;else{var k=n(N),x=v[k]||[];null==k?(null==T&&(e(o,b,C,N,i),w++),A++):(T===k?(e(o,x[0],x[1],N,i),A++):x[0]?(o.insertBefore(x[0],b),e(o,x[0],x[1],N,i)):e(o,b,null,N,i),w++,p[k]=N)}}for(;A<s;){var B=l.n[A];null==n(B)&&r(o,d[A]),A++}for(var E in v){var H=v[E],L=H[1];p[L.t.key]||r(o,H[0])}}else if(f!==l){var M=o;t.replaceChild(o=a(f,i),M)}return o}(e,l,f,f=App()),t&&t()}function s(e){e&&e(),c(o)}export{e as h,c as start,s as setState,t as createRef,i as refs};
