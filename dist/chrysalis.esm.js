/**
 * Chrysalis v1.0.5-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

var e,n,r="className",t="class",o=document,f=null,i={},a="function",s="render",c="string",u="state",l="p",v="parentNode",p="oncreate",d="ondestroy",h="onremove",y="onupdate",g="oninit",m="shouldUpdate",$="forceUpdate";function w(e){return typeof e==c}function x(e){if(e&&(e=e.p))return e.key}function A(e,n,r){r[h]&&r[h](),e.removeChild(n),r[d]&&r[d]()}function L(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r}function N(e,n){for(var r,t=[],o=[],i=arguments.length;i-- >2;)t.push(arguments[i]);for(;t.length>0;)if(Array.isArray(r=t.pop()))for(var s=r.length;s-- >0;)t.push(r[s]);else!1===r||!0===r||r==f||o.push(r);return n=n||{},typeof e==a?(n.c=o,e(n)):{n:e,p:n,c:o}}function T(e){this.events[e.type](e)}function C(e,n,o,s){for(var u in L(n,o)){var l=n[u],v=o[u];if("key"==(u=s?u==r?t:u:u==t?r:u));else if("style"==u)if(typeof l==c)e[u].cssText=l;else for(var p in typeof v==c&&(v=e[u].cssText=""),p(l,v))(l||i)[p]==(v||i)[p]||e[u].setProperty("-"==p[0]&&"-"==p[1]?p:p.replace(/[A-Z]/g,"-$&"),l&&p in l?"number"==typeof l[p]?l[p]+"px":l[p]:"");else"o"==u[0]&&"n"==u[1]?((e.events||(e.events={}))[u=u.slice(2).toLowerCase()]=l)?v||e.addEventListener(u,T):e.removeEventListener(u,T):"ref"==u?typeof l==a?l(e):l.current=e:"dangerouslySetInnerHTML"==u?e.innerHTML=l.__html:!s&&"list"!=u&&u in e?e[u]=l==f?"":l:l==f||!1===l?e.removeAttribute(u):e.setAttribute(u,l)}}function E(e,n,r){if(""==e.n&&(e=e.c[0]),w(e))return o.createTextNode(e);if(e.n[s])return e.n[p]&&n.push(e.n[p]),e[l].c=e.c,function(e,n){e[l]=n;var r=e[s](e[u],e[l]);!function(e,n){for(var r in n)e[r]=n[r]}(e,{setState:function(n,r){typeof n==a&&(n=n(e[u],e[l]));var t,o,f=L(e[u],n);e[y]&&(t=L(i,e[u]),o=L(i,e[l])),e[m]?e[m](f,r)&&(e[l]=r,e[u]=f,e[$](t,o,!0)):(e[l]=r,e[u]=f,e[$](t,o,!0))},forceUpdate:function(n,r,t){S(e.$el[v],e.$el,e.u,e.u=e[s](e[u],e[l])),t&&e[y]&&e[y](n,r)},destroy:function(){A(e.$el[v],e.$el,e)},u:r,$el:E(r)})}(e.n,e[l]),e.n[g]&&e.n[g](),e.n.$el;var t=(r=r||"svg"==e.n)?o.createElementNS("http://www.w3.org/2000/svg",e.n):o.createElement(e.n);C(t,e[l],i,r);for(var f=0,c=e.c.length;f<c;f++)t.appendChild(E(e.c[f],n,r));return t}function S(e,n,r,t,o){var a=[];if(t===r);else if(r!=f&&w(r)&&w(t)&&r!=t)n.data=t;else if(r==f)n=e.insertBefore(E(t,a,o),n);else if(t.n[s]){if(function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0}(r[l],t[l])){var c,u=r.n;u[y]&&(c=L(u[l],t[l])),u.setState(i,c)}}else if(t.n&&t.n===r.n){o=o||"svg"==t.n,C(n,r[l],t[l],o);for(var v=t.c.length,p=r.c.length,d={},h=[],g={},m=0;m<p;m++){var $=n.childNodes[m];h[m]=$;var N=r.c[m],T=x(N);f!=T&&(d[T]=[$,N])}for(var b=0,k=0;k<v;){var U=h[b],B=r.c[b],H=t.c[k],M=x(B);if(g[M])b++;else{var _=x(H),I=d[_]||[];f==_?(f==M&&(S(n,U,B,H,o),k++),b++):(M===_?(S(n,I[0],I[1],H,o),b++):I[0]?(n.insertBefore(I[0],U),S(n,I[0],I[1],H,o)):S(n,U,f,H,o),k++,g[_]=H)}}for(;b<p;){var P=r.c[b],Z=x(P);f==Z&&A(n,h[b],P),b++}for(var j in d){var q=d[j],z=q[1];g[z.p.key]||A(n,q[0],z)}}else if(t!==r){var D=n;e.replaceChild(n=E(t,a,o),D)}for(;a.length;)a.pop()();return n}function b(r,t,o){e=S(t,e,n,n=r),o&&o()}function k(){return{}}export{N as h,b as render,k as createRef};
