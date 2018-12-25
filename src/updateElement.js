/**
 * Comparison algorithm DOM and Virtual DOM
 * Lead time ~O(n^3)
 */

import { createVnode, applyAttributes } from './render'

const updateElement = (parentNode, newNode, oldNode, index = 0, isSVG) => {
  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode, isSVG))
  }
  if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index])
  } else if (
    /**
     * Detect DOM change
     *
     * Based on Snabbdom algorithm
     */
    typeof newNode !== typeof oldNode ||
    newNode.nodeName !== oldNode.nodeName ||
    (typeof oldNode !== 'object' && oldNode !== newNode)
  ) {
    parentNode.replaceChild(createVnode(newNode, isSVG), parentNode.childNodes[index])
  } else {
    applyAttributes(parentNode.childNodes[index], newNode.props, oldNode.props)

    const length = Math.max(newNode.children.length, oldNode.children.length)
    let i = -1
    while (++i < length) {
      updateElement(
        parentNode.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i,
        (isSVG = isSVG || newNode.nodeName == 'svg')
      )
    }
  }
}

export default updateElement
