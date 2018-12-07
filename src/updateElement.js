// based on deathmood`s code
const changed = (oldNode, newNode) => {
  const typeChanged = typeof oldNode !== typeof newNode
  const nodeNameChanged = oldNode.nodeName !== newNode.nodeName
  const notEqual = typeof oldNode === 'string' && oldNode !== newNode
  const attributesChanged = oldNode.type !== newNode.type || (oldNode.attributes && oldNode.attributes.forceUpdate)

  return typeChanged || notEqual || attributesChanged || nodeNameChanged
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

    const newLength = newNode.children.length
    const oldLength = oldNode.children.length

    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

const updateAttributes = ($target, newAttrs, oldAttrs = {}) => {
  const attrs = Object.assign({}, newAttrs, oldAttrs)
  Object.keys(attrs).forEach(name => {
    updateAttribute($target, name, newAttrs[name], oldAttrs[name])
  })
}

const updateAttribute = ($target, name, newValue, oldValue) => {
  if (!newValue) {
    $target.removeAttribute(name)
  } else if (!oldValue || newValue !== oldValue) {
    $target.setAttribute(name, newValue)
  }
}

export default updateElement
