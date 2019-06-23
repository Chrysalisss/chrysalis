function merge(a, b) {
  for (let i in b) a[i] = b[i]

  return a
}

function isTextNode(node) {
	return typeof node != 'object'
}

function getKey(node) {
  if (node && (node = node.props)) {
    return node.key
  }
}

function removeElement(parent, element) {
  parent.removeChild(element)
}

export { merge, getKey, removeElement, isTextNode }
