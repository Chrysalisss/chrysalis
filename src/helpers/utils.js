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

function isTextNode(node) {
  return typeof node != 'object'
}

function getKey(node) {
  if (node && (node = node.props)) {
    return node.key
  }
}

function removeElement(parent, element, node) {
  node.onremove && node.onremove()

  parent.removeChild(element)

  node.ondestroy && node.ondestroy()
}

export {
 merge, 
 getKey, 
 removeElement, 
 isTextNode, 
 shouldUpdate,
}
