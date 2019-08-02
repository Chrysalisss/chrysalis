/**
 * Chrysalis v1.0.5-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.Chrysalis={})}(this,function(e){var n,r,t="className",o="class",f=document,i=null,a={},s="function",c="render",u="string",l="state",v="p",p="parentNode",d="oncreate",y="ondestroy",h="onremove",g="onupdate",m="oninit",x="shouldUpdate",$="forceUpdate";function b(e){return typeof e==u}function w(e){if(e&&(e=e.p))return e.key}function A(e,n,r){r[h]&&r[h](),e.removeChild(n),r[y]&&r[y]()}function C(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r}function L(e){this.events[e.type](e)}function N(e,n,r,f){for(var c in C(n,r)){var l=n[c],v=r[c];if("key"==(c=f?c==t?o:c:c==o?t:c));else if("style"==c)if(typeof l==u)e[c].cssText=l;else for(var p in typeof v==u&&(v=e[c].cssText=""),p(l,v))(l||a)[p]==(v||a)[p]||e[c].setProperty("-"==p[0]&&"-"==p[1]?p:p.replace(/[A-Z]/g,"-$&"),l&&p in l?"number"==typeof l[p]?l[p]+"px":l[p]:"");else"o"==c[0]&&"n"==c[1]?((e.events||(e.events={}))[c=c.slice(2).toLowerCase()]=l)?v||e.addEventListener(c,L):e.removeEventListener(c,L):"ref"==c?typeof l==s?l(e):l.current=e:"dangerouslySetInnerHTML"==c?e.innerHTML=l.__html:!f&&"list"!=c&&c in e?e[c]=l==i?"":l:l==i||!1===l?e.removeAttribute(c):e.setAttribute(c,l)}}function T(e,n,r){if(""==e.n&&(e=e.c[0]),b(e))return f.createTextNode(e);if(e.n[c])return e.n[d]&&n.push(e.n[d]),e[v].c=e.c,function(e,n){e[v]=n;var r=e[c](e[l],e[v]);!function(e,n){for(var r in n)e[r]=n[r]}(e,{setState:function(n,r){typeof n==s&&(n=n(e[l],e[v]));var t,o,f=C(e[l],n);e[g]&&(t=C(a,e[l]),o=C(a,e[v])),e[x]?e[x](f,r)&&(e[v]=r,e[l]=f,e[$](t,o,!0)):(e[v]=r,e[l]=f,e[$](t,o,!0))},forceUpdate:function(n,r,t){E(e.$el[p],e.$el,e.u,e.u=e[c](e[l],e[v])),t&&e[g]&&e[g](n,r)},destroy:function(){A(e.$el[p],e.$el,e)},u:r,$el:T(r)})}(e.n,e[v]),e.n[m]&&e.n[m](),e.n.$el;var t=(r=r||"svg"==e.n)?f.createElementNS("http://www.w3.org/2000/svg",e.n):f.createElement(e.n);N(t,e[v],a,r);for(var o=0,i=e.c.length;o<i;o++)t.appendChild(T(e.c[o],n,r));return t}function E(e,n,r,t,o){var f=[];if(t===r);else if(r!=i&&b(r)&&b(t)&&r!=t)n.data=t;else if(r==i)n=e.insertBefore(T(t,f,o),n);else if(t.n[c]){if(function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0}(r[v],t[v])){var s,u=r.n;u[g]&&(s=C(u[v],t[v])),u.setState(a,s)}}else if(t.n&&t.n===r.n){o=o||"svg"==t.n,N(n,r[v],t[v],o);for(var l=t.c.length,p=r.c.length,d={},y=[],h={},m=0;m<p;m++){var x=n.childNodes[m];y[m]=x;var $=r.c[m],L=w($);i!=L&&(d[L]=[x,$])}for(var S=0,_=0;_<l;){var k=y[S],M=r.c[S],U=t.c[_],j=w(M);if(h[j])S++;else{var B=w(U),H=d[B]||[];i==B?(i==j&&(E(n,k,M,U,o),_++),S++):(j===B?(E(n,H[0],H[1],U,o),S++):H[0]?(n.insertBefore(H[0],k),E(n,H[0],H[1],U,o)):E(n,k,i,U,o),_++,h[B]=U)}}for(;S<p;){var P=r.c[S],I=w(P);i==I&&A(n,y[S],P),S++}for(var O in d){var R=d[O],Z=R[1];h[Z.p.key]||A(n,R[0],Z)}}else if(t!==r){var q=n;e.replaceChild(n=T(t,f,o),q)}for(;f.length;)f.pop()();return n}e.h=function(e,n){for(var r,t=[],o=[],f=arguments.length;f-- >2;)t.push(arguments[f]);for(;t.length>0;)if(Array.isArray(r=t.pop()))for(var a=r.length;a-- >0;)t.push(r[a]);else!1===r||!0===r||r==i||o.push(r);return n=n||{},typeof e==s?(n.c=o,e(n)):{n:e,p:n,c:o}},e.render=function(e,t,o){n=E(t,n,r,r=e),o&&o()},e.createRef=function(){return{}},Object.defineProperty(e,"__esModule",{value:!0})});
