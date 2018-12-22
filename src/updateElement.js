import { createVnode, applyAttributes } from './render'

const updateElement = (parentNode, newNode, oldNode, isSVG) => {
  const a = newNode
  const b = oldNode

  const notObject = typeof b !== 'object'

  const index = 0
  
  if (isSVG === undefined) {
    const isSVG = a.nodeName === 'svg' ? true : false

    updateElement(parentNode, a, b, isSVG)
  }

  if (!b) {
    parentNode.appendChild(createVnode(a, isSVG))
  }

  if (!a) {
    parentNode.removeChild(parentNode.childNodes[index])
  }

  /**
   * Detect dom change
   *
   * Based on Snabbdom algorithm
   */

  if (typeof a !== typeof b || a.nodeName !== b.nodeName || (notObject && b !== a)) {
    parentNode.replaceChild(createVnode(a), parentNode.childNodes[index])
  } else {
    applyAttributes(parentNode.childNodes[index], a.props, b.props)

    const length = Math.max(a.children.length, b.children.length)
    let i = -1
    while (++i < length) {
      nElement(parentNode.childNodes[index], a.children[i], b.children[i], i, isSVG)
    }
  }
}

export default updateElement
