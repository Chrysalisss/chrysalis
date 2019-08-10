/**
 * Chrysalis v1.0.8-beta
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

Object.defineProperty(exports,"__esModule",{value:!0});var element,oldNode,doc=document,NULL=null,EMPTY_OBJ={},FUNCTION="function",RENDER="render",STRING="string",STATE="state",PROPS="props",PARENT_NODE="parentNode",LENGTH="length",CHILDREN="children",isArray=Array.isArray,ONCREATE="oncreate",ONDESTROY="ondestroy",ONREMOVE="onremove",ONUPDATE="onupdate",ONINIT="oninit",SHOULDUPDATE="shouldUpdate",FORCEUPDATE="forceUpdate";function i(e,t){for(var r in t)e[r]=t[r];return e}function isNew(e,t){for(var r in e)if(e[r]!==t[r])return!0;for(var r in t)if(e[r]!==t[r])return!0}function isTextNode(e){return"object"!=typeof e}function getKey(e){if(e&&(e=e[PROPS]))return e.key}function f(e,t,r){r[ONREMOVE]&&r[ONREMOVE](),e.removeChild(t),r[ONDESTROY]&&r[ONDESTROY]()}function clone(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r}function h(e,t){for(var r,n=[],o=[],E=arguments,a=E[LENGTH];a-- >2;)n.push(E[a]);for(;n[LENGTH]>0;)if(isArray(r=n.pop()))for(var i=r[LENGTH];i-- >0;)n.push(r[i]);else!1===r||!0===r||r==NULL||o.push(r);return t=t||{},typeof e==FUNCTION?(o[LENGTH]&&(t[CHILDREN]=o),e(t)):{n:e,props:t,t:o}}function eventProxy(e){this.events[e.type](e)}function updateProps(e,t,r,n){for(var o in clone(t,r)){var E=t[o],a=r[o];if("key"==o||o==CHILDREN);else if("style"==o)if(typeof value==STRING)e[o].cssText=E;else for(var i in typeof a==STRING&&(a=e[o].cssText=""),i(E,a))(E||EMPTY_OBJ)[i]==(a||EMPTY_OBJ)[i]||e[o].setProperty("-"==i[0]&&"-"==i[1]?i:i.replace(/[A-Z]/g,"-$&"),E&&i in E?"number"==typeof E[i]?E[i]+"px":E[i]:"");else"o"==o[0]&&"n"==o[1]?((e.events||(e.events={}))[o=o.substr(2).toLowerCase()]=E)?a||e.addEventListener(o,eventProxy):e.removeEventListener(o,eventProxy):"ref"==o?typeof E==FUNCTION?E(e):E.current=e:"dangerouslySetInnerHTML"==o?e.innerHTML=E.__html:!n&&"list"!=o&&o in e?e[o]=E==NULL?"":E:E==NULL||!1===E?e.removeAttribute(o):e.setAttribute(o,E)}}function createComponent(e,t,r){var n=i({},e);n[PROPS]=t;var o=n[RENDER](n[STATE],n[PROPS]);return i(n,{setState:function(e,t){typeof e==FUNCTION&&(e=e(n[STATE],n[PROPS]));var r,o,E=clone(n[STATE],e);n[ONUPDATE]&&(r=clone(EMPTY_OBJ,n[STATE]),o=clone(EMPTY_OBJ,n[PROPS])),n[SHOULDUPDATE]?n[SHOULDUPDATE](E,t)&&(n[PROPS]=t,n[STATE]=E,n[FORCEUPDATE](r,o,!0)):(n[STATE]=E,n[FORCEUPDATE](r,o,!0))},forceUpdate:function(e,t,r){patch(n.$el[PARENT_NODE],n.$el,n.u,n.u=n[RENDER](n[STATE],n[PROPS])),r&&n[ONUPDATE]&&n[ONUPDATE](e,t)},destroy:function(){f(n.$el[PARENT_NODE],n.$el,n)},u:o,$el:createElement(o,r)}),n[ONINIT]&&n[ONINIT](),n.$el}function createElement(e,t,r){function n(e,n,o){for(var E=o,a=n[LENGTH];E<a;E++)e.appendChild(createElement(n[E],t,r))}if(isArray(e)){var o=createElement(e[0]);return n(o,e,1),o}if(isTextNode(e))return doc.createTextNode(e);var E=e.n;if(E[RENDER])return E[ONCREATE]&&t.push(E[ONCREATE].bind(E)),e.t[LENGTH]&&(e[PROPS][CHILDREN]=e.t),createComponent(E,e[PROPS],t);var a=(r=r||"svg"==E)?doc.createElementNS("http://www.w3.org/2000/svg",E):doc.createElement(E);return updateProps(a,e[PROPS],EMPTY_OBJ,r),n(a,e.t,0),a}function patch(e,t,r,n,o){var E=[];if(n===r);else if(r!=NULL&&isTextNode(r)&&isTextNode(n)&&r!=n)t.data=n;else if(r==NULL)t=e.insertBefore(createElement(n,E,o),t);else if(n.n[RENDER]){if(isNew(r[PROPS],n[PROPS])){var a,i=r.n;i[ONUPDATE]&&(a=clone(i[PROPS],n[PROPS])),i.setState(EMPTY_OBJ,a)}}else if(n.n&&n.n===r.n){o=o||"svg"==n.n,updateProps(t,r[PROPS],n[PROPS],o);for(var N=n.t[LENGTH],T=r.t[LENGTH],s={},P=[],c={},O=0;O<T;O++){var u=t.t[O];P[O]=u;var l=r.t[O],p=getKey(l);NULL!=p&&(s[p]=[u,l])}for(var R=0,v=0;v<N;){var d=P[R],L=r.t[R],S=n.t[v],A=getKey(L);if(c[A])R++;else{var U=getKey(S),y=s[U]||[];NULL==U?(NULL==A&&(patch(t,d,L,S,o),v++),R++):(A===U?(patch(t,y[0],y[1],S,o),R++):y[0]?(t.insertBefore(y[0],d),patch(t,y[0],y[1],S,o)):patch(t,d,NULL,S,o),v++,c[U]=S)}}for(;R<T;){var D=r.t[R],h=getKey(D);NULL==h&&f(t,P[R],D),R++}for(var m in s){var C=s[m],H=C[1];c[H[PROPS].key]||f(t,C[0],H)}}else if(n!==r){var I=t;e.replaceChild(t=createElement(n,E,o),I)}for(;E[LENGTH];)E.pop()();return t}function render(e,t,r){element=patch(t,element,oldNode,oldNode=e),r&&r()}function createRef(){return{}}function Fragment(e){return e.children}exports.h=h,exports.render=render,exports.createRef=createRef,exports.Fragment=Fragment;
