/**
 * Chrysalis v0.12.0-β
 * Casper Søkol, 2019
 * Distributed under the MIT license
 */

!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t((e.Chrysalis = {}))
})(this, function(e) {
  function t(e, t, n) {
    for (var o in (function(e, t) {
      var n = {}
      for (var o in e) n[o] = e[o]
      for (var o in t) n[o] = t[o]
      return n
    })(t, n))
      t[o]
        ? t[o] != n[o] && ('class' == o ? e.setAttribute('class', t[o]) : (e[o] = t[o]))
        : 'class' == o
        ? e.removeAttribute('class')
        : ((e[o] = null), delete e[o])
  }
  function n(e, o) {
    if ('object' != typeof e) return document.createTextNode(e)
    var r = (o = o || 'svg' == e.e)
      ? document.createElementNS('http://www.w3.org/2000/svg', e.e)
      : document.createElement(e.e)
    for (var i in (t(r, e.t, {}), e.n)) r.appendChild(n(e.n[i], o))
    return r
  }
  var o, r
  function i(e, i) {
    ;(o = e),
      (function e(r, i, f, l, c) {
        var a,
          s,
          d = f || o
        if (null == i) d.appendChild(n(r, c))
        else if (null == r) d.removeChild(d.childNodes[l || 0])
        else if (typeof (a = r) != typeof (s = i) || a.e !== s.e || ('object' != typeof s && s !== a))
          d.replaceChild(n(r, c), d.childNodes[l || 0])
        else if (r.e) {
          t(d.childNodes[l || 0], r.t, i.t)
          for (var u = Math.max(r.n.length, i.n.length), p = -1; ++p < u; )
            e(r.n[p], i.n[p], d.childNodes[l || 0], p, (c = c || 'svg' == r.e))
        }
      })(App(), r, e),
      (r = App()),
      i && i()
  }
  ;(e.h = function(e, t) {
    for (var n = [], o = arguments.length - 2; o-- > 0; ) n[o] = arguments[o + 2]
    return 'function' == typeof e ? e(t) : (Array.isArray(n[0]) && (n = n[0]), { e: e, t: t || {}, n: n })
  }),
    (e.start = i),
    (e.setState = function(e) {
      e && e(), i(o)
    }),
    Object.defineProperty(e, '__esModule', { value: !0 })
})
