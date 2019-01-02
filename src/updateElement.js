/**
 * Comparison algorithm DOM and Virtual DOM
 * Lead time ~O(n^3)
 */

import { createVnode } from './render'
import _a from './updateAttributes'

function updateElement(parentNode, newNode, oldNode, index, isSVG) {
  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode, isSVG))
  }
  
  if (!newNode) {
    while (parentNode.childNodes.length != parentNode.childNodes.length - index) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }
  
  if (
    /**
     * Detect DOM change
     *
     * Based on Snabbdom algorithm
     */
    typeof newNode !== typeof oldNode ||
    newNode.nodeName !== oldNode.nodeName ||
    (typeof oldNode !== 'object' && oldNode !== newNode)
  ) {
    parentNode.replaceChild(createVnode(newNode, isSVG), parentNode.childNodes[index || 0])
  } else {
    _a(parentNode.childNodes[index || 0], newNode.props, oldNode.props)

    const length = Math.max(newNode.children.length, oldNode.children.length)

    for (let i = -1; ++i < length; ) {
      updateElement(
        parentNode.childNodes[index || 0],
        newNode.children[i],
        oldNode.children[i],
        i,
        (isSVG = isSVG || newNode.nodeName == 'svg')
      )
    }
  }
}

export default updateElement
