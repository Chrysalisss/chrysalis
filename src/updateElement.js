import { createVnode } from './render'

const updateElement = (parentNode, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode))
  }

  if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index])
  }

  if (changed(newNode, oldNode)) {
    parentNode.replaceChild(createVnode(newNode), parentNode.childNodes[index])
  } else if (newNode.nodeName) {
    updateAttributes(parentNode.childNodes[index], newNode.attributes, oldNode.attributes)

    const length = Math.max(newNode.children.length, oldNode.children.length)
    let i = -1
    while (++i < length) {
      updateElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

const changed = (newNode, oldNode) => {
  const notObject = typeof oldNode !== 'object'
  return (
    typeof oldNode !== typeof newNode || oldNode.nodeName !== newNode.nodeName || (notObject && oldNode !== newNode)
  )
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
