/**
 * Chrysalis v0.12.0-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

function h(e, t) {
  for (var r = [], n = arguments.length - 2; n-- > 0; ) r[n] = arguments[n + 2]
  return 'function' == typeof e ? e(t) : (Array.isArray(r[0]) && (r = r[0]), { e: e, t: t || {}, n: r })
}
function merge(e, t) {
  var r = {}
  for (var n in e) r[n] = e[n]
  for (var n in t) r[n] = t[n]
  return r
}
function updateAttrs(e, t, r) {
  for (var n in merge(t, r))
    t[n]
      ? t[n] != r[n] && ('class' == n ? e.setAttribute('class', t[n]) : (e[n] = t[n]))
      : 'class' == n
      ? e.removeAttribute('class')
      : ((e[n] = null), delete e[n])
}
function createVnode(e, t) {
  if ('object' != typeof e) return document.createTextNode(e)
  var r = (t = t || 'svg' == e.e)
    ? document.createElementNS('http://www.w3.org/2000/svg', e.e)
    : document.createElement(e.e)
  for (var n in (updateAttrs(r, e.t, {}), e.n)) r.appendChild(createVnode(e.n[n], t))
  return r
}
function updateElement(e, t, r, n, o) {
  var a = r || ROOT_ELEMENT
  if (null == t) a.appendChild(createVnode(e, o))
  else if (null == e) a.removeChild(a.childNodes[n || 0])
  else if (notSameNode(e, t)) a.replaceChild(createVnode(e, o), a.childNodes[n || 0])
  else if (e.e) {
    updateAttrs(a.childNodes[n || 0], e.t, t.t)
    for (var d = Math.max(e.n.length, t.n.length), s = -1; ++s < d; )
      updateElement(e.n[s], t.n[s], a.childNodes[n || 0], s, (o = o || 'svg' == e.e))
  }
}
function notSameNode(e, t) {
  return typeof e != typeof t || e.e !== t.e || ('object' != typeof t && t !== e)
}
var ROOT_ELEMENT, currentNode
function start(e, t) {
  ;(ROOT_ELEMENT = e), updateElement(App(), currentNode, e), (currentNode = App()), t && t()
}
function setState(e) {
  e && e(), start(ROOT_ELEMENT)
}
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.h = h),
  (exports.start = start),
  (exports.setState = setState)
