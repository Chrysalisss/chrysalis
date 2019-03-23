function merge(a, b) {
  for (let i in b) a[i] = b[i]

  return a
}

export default merge
