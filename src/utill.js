function merge(a, b) {
  const src = {}

  for (var i in a) src[i] = a[i]
  for (var i in b) src[i] = b[i]

  return src
}

export default merge
