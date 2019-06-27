function merge(a, b) {
  for (let i in b) a[i] = b[i]

  return a
}

function shouldUpdate(a, b) {
  for (var i in a) {
    if (a[i] !== b[i]) return true
  }

  for (var i in b) {
    if (a[i] !== b[i]) return true
  }
}

const isArray = Array.isArray

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

export { merge, getKey, removeElement, isTextNode, isArray, shouldUpdate }
