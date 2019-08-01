/**
 * Chrysalis v1.0.4-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

Object.defineProperty(exports,"__esModule",{value:!0});var element,oldNode,className="className",CLASS="class",doc=document,NULL=null,EMPTY_OBJ={},FUNCTION="function";function i(e,t){for(var r in t)e[r]=t[r];return e}function isNew(e,t){for(var r in e)if(e[r]!==t[r])return!0;for(var r in t)if(e[r]!==t[r])return!0}function isTextNode(e){return"object"!=typeof e}function getKey(e){if(e&&(e=e.p))return e.key}function f$1(e,t,r){r.onremove&&r.onremove(),e.removeChild(t),r.ondestroy&&r.ondestroy()}function clone(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r}function h(e,t){for(var r,n=[],o=[],a=arguments.length;a-- >2;)n.push(arguments[a]);for(;n.length>0;)if(Array.isArray(r=n.pop()))for(var c=r.length;c-- >0;)n.push(r[c]);else!1===r||!0===r||r==NULL||o.push(r);return t=t||{},typeof e==FUNCTION?(t.c=o,e(t)):{n:e,p:t,c:o}}function eventProxy(e){return e.currentTarget.events[e.type](e)}function updateProps(e,t,r,n){for(var o in clone(t,r)){var a=t[o],c=r[o];if("key"==(o=n?o==className?CLASS:o:o==CLASS?className:o));else if("style"==o)for(var i in i(a,c))(a||EMPTY_OBJ)[i]==(c||EMPTY_OBJ)[i]||e.style.setProperty("-"==i[0]&&"-"==i[1]?i:i.replace(/[A-Z]/g,"-$&"),a&&i in a?"number"==typeof a[i]?a[i]+"px":a[i]:"");else"o"===o[0]&&"n"===o[1]?((e.events||(e.events={}))[o=o.slice(2).toLowerCase()]=a)?c||e.addEventListener(o,eventProxy):e.removeEventListener(o,eventProxy):"ref"==o?typeof a==FUNCTION?a(e):a.current=e:"dangerouslySetInnerHTML"==o?e.innerHTML=a.__html:!n&&"list"!=o&&o in e?e[o]=a==NULL?"":a:a==NULL||!1===a?e.removeAttribute(o):e.setAttribute(o,a)}}function createComponent(e,t){e.p=t;var r=e.render(e.state,e.p);i(e,{setState:function(t,r){"function"==typeof t&&(t=t(e.state,e.p));var n,o,a=clone(e.state,t);e.update&&(n=clone(EMPTY_OBJ,e.state),o=clone(EMPTY_OBJ,e.p)),e.shouldUpdate?e.shouldUpdate(a,r)&&(e.p=r,e.state=a,e.forceUpdate(n,o)):(e.p=r,e.state=a,e.forceUpdate(n,o))},forceUpdate:function(t,r){patch(e.$root,e.$el,e.u,e.u=e.render(e.state,e.p)),e.onupdate&&e.onupdate(t,r)},destroy:function(){f(e.$root,e.$el,e)},u:r,$el:createElement(r)}),e.$root=e.$el.previousElementSibling}function createElement(e,t,r){if(""==e.n&&(e=e.c[0]),isTextNode(e))return doc.createTextNode(e);if(e.n.render)return e.n.oncreate&&t.push(e.n.oncreate),e.p.c=e.c,createComponent(e.n,e.p),e.n.oninit&&e.n.oninit(),e.n.$el;var n=(r=r||"svg"==e.n)?doc.createElementNS("http://www.w3.org/2000/svg",e.n):doc.createElement(e.n);updateProps(n,e.p,EMPTY_OBJ,r);for(var o=0,a=e.c.length;o<a;o++)n.appendChild(createElement(e.c[o],t,r));return n}function patch(e,t,r,n,o){var a=[];if(n===r);else if(r!=NULL&&isTextNode(r)&&isTextNode(n)&&r!=n)t.data=n;else if(r==NULL)t=e.insertBefore(createElement(n,a,o),t);else if(n.n.render){if(isNew(r.p,n.p)){var c,i=r.n;i.onupdate&&(c=clone(i.p,n.p)),i.setState(EMPTY_OBJ,c)}}else if(n.n&&n.n===r.n){o=o||"svg"==n.n,updateProps(t,r.p,n.p,o);for(var s=n.c.length,f=r.c.length,p={},l=[],u={},d=0;d<f;d++){var v=t.childNodes[d];l[d]=v;var N=r.c[d],L=getKey(N);NULL!=L&&(p[L]=[v,N])}for(var h=0,y=0;y<s;){var m=l[h],g=r.c[h],U=n.c[y],T=getKey(g);if(u[T])h++;else{var E=getKey(U),P=p[E]||[];NULL==E?(NULL==T&&(patch(t,m,g,U,o),y++),h++):(T===E?(patch(t,P[0],P[1],U,o),h++):P[0]?(t.insertBefore(P[0],m),patch(t,P[0],P[1],U,o)):patch(t,m,NULL,U,o),y++,u[E]=U)}}for(;h<f;){var x=r.c[h],C=getKey(x);NULL==C&&f$1(t,l[h],x),h++}for(var $ in p){var O=p[$],S=O[1];u[S.p.key]||f$1(t,O[0],S)}}else if(n!==r){var _=t;e.replaceChild(t=createElement(n,a,o),_)}for(;a.length;)a.pop()();return t}function render(e,t,r){element=patch(t,element,oldNode,oldNode=e),r&&r()}function createRef(){return{}}exports.h=h,exports.render=render,exports.createRef=createRef;
