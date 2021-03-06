import { ONREMOVE, ONDESTROY } from './hooks'
import { PROPS } from './constants'

function merge(a, b) {
  for (let i in b) a[i] = b[i]

  return a
}

function isNew(a, b) {
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
  if (node && (node = node[PROPS])) {
    return node.key
  }
}

function removeElement(parent, element, node) {
  node[ONREMOVE] && node[ONREMOVE]()

  parent.removeChild(element)

  node[ONDESTROY] && node[ONDESTROY]()
}

function clone(a, b) {
  var out = {}

  for (var k in a) out[k] = a[k]
  for (var k in b) out[k] = b[k]

  return out
}

export { merge, getKey, removeElement, isTextNode, isNew, clone }
