// based on deathmood`s code
const changed = (oldNode, newNode) => {
  const notObject = typeof oldNode !== 'object'
  return (
    typeof oldNode !== typeof newNode || oldNode.nodeName !== newNode.nodeName || (notObject && oldNode !== newNode)
  )
}

const updateElement = (parentNode, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parentNode.appendChild(createVnode(newNode))
  } else if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index])
  } else if (changed(newNode, oldNode)) {
    parentNode.replaceChild(createVnode(newNode), parentNode.childNodes[index])
  } else if (newNode.nodeName) {
    updateAttributes(parentNode.childNodes[index], newNode.attributes, oldNode.attributes)

    const length = Math.max(newNode.children.length, oldNode.children.length)

    for (let i = 0; i < length; i++) {
      updateElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
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
