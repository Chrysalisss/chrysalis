import { createVnode } from './render'

const updateElement = (parentNode, newNode, oldNode, isSVG) => {
  const index = 0

  if (newNode === oldNode) return

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
  
  if (changed(newNode, oldNode)) {
    parentNode.replaceChild(createVnode(newNode), parentNode.childNodes[index])
  } else if (newNode.nodeName) {
    updateAttributes(parentNode.childNodes[index], newNode.props, oldNode.props)

    const length = Math.max(newNode.children.length, oldNode.children.length)
    let i = -1
    while (++i < length) {
      updateElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i, isSVG)
    }
  }
}

// node change detection based on Snabbdom algorithm
const changed = (a, b) => {
  const notObject = typeof b !== 'object'
  return typeof a !== typeof b || a.nodeName !== b.nodeName || (notObject && b !== a)
}

const updateAttributes = ($element, newAttrs, oldAttrs = {}) => {
  const attrs = Object.assign({}, newAttrs, oldAttrs)
  Object.keys(attrs).forEach(name => {
    updateAttribute($element, name, newAttrs[name], oldAttrs[name])
  })
}

const updateAttribute = ($element, name, newValue, oldValue) => {
  if (!newValue) {
    $element.removeAttribute(name)
  } else if (!oldValue || newValue !== oldValue) {
    $element.setAttribute(name, newValue)
  }
}

export default updateElement
