import { createVnode, applyAttributes } from './render'

const updateElement = (parentNode, newNode, oldNode, isSVG) => {
  const index = 0

  if (isSVG === undefined) {
    const isSVG = newNode.nodeName === 'svg' ? true : false

    updateElement(parentNode, newNode, oldNode, isSVG)
  }

  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode, isSVG))
  }

  if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index])
  }

  /**
   * Detect DOM change
   *
   * Based on Snabbdom algorithm
   */

  if (
    typeof newNode !== typeof oldNode ||
    newNode.nodeName !== oldNode.nodeName ||
    (typeof oldNode !== 'object' && oldNode !== newNode)
  ) {
    parentNode.replaceChild(createVnode(newNode), parentNode.childNodes[index])
  } else {
    applyAttributes(parentNode.childNodes[index], newNode.props, oldNode.props)

    const length = Math.max(newNode.children.length, oldNode.children.length)
    let i = -1
    while (++i < length) {
      nElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i, isSVG)
    }
  }
}

export default updateElement
