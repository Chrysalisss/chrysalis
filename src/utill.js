function merge(a, b) {
  const src = {}

  Object.keys(a).map(p => (src[p] = a[p]))
  Object.keys(b).map(p => (src[p] = b[p]))

  return src
}

export default merge
