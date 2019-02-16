/**
 * Comparison algorithm DOM and Virtual DOM
 * Lead time ~O(n^3)
 */

import { ROOT_ELEMENT } from './start'
import createVnode from './createVnode'
import updateAttrs from './updateAttributes'

function updateElement(newNode, oldNode, element, index, isSVG) {
  const parentNode = element || ROOT_ELEMENT

  if (oldNode == null) {
    parentNode.appendChild(createVnode(newNode, isSVG))
  } else if (newNode == null) {
    parentNode.removeChild(parentNode.childNodes[index || 0])
  } else if (notSameNode(newNode, oldNode)) {
    parentNode.replaceChild(createVnode(newNode, isSVG), parentNode.childNodes[index || 0])
  } else if (newNode.nodeName) {
    updateAttrs(parentNode.childNodes[index || 0], newNode.props, oldNode.props)

    const length = Math.max(newNode.children.length, oldNode.children.length)

    for (let i = -1; ++i < length; ) {
      updateElement(
        newNode.children[i],
        oldNode.children[i],
        parentNode.childNodes[index || 0],
        i,
        (isSVG = isSVG || newNode.nodeName == 'svg')
      )
    }
  }
}

/**
 * Node change detection algo
 * Based on Snabbdom`s algorithm
 */

function notSameNode(a, b) {
  return typeof a !== typeof b || a.nodeName !== b.nodeName || (typeof b !== 'object' && b !== a)
}
export default updateElement
