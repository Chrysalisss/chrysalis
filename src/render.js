function applyAttributes($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  Object.keys(Object.assign(newAttrs, oldAttrs)).map(name => {
    if (!newAttrs[name]) {
      $element.removeAttribute(name)
    } else if (!oldAttrs[name] || newAttrs[name] !== oldAttrs[name]) {
      $element.setAttribute(name, newAttrs[name])
    }
  })
}

function createVnode(vnode, isSVG) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  const $element = (isSVG = isSVG || vnode.nodeName == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
    : document.createElement(vnode.nodeName)

  // props (not attributes) by this time are already applied to the vnode
  applyAttributes($element, vnode.props, {})

  vnode.children.map(child => $element.appendChild(createVnode(child, isSVG)))

  return $element
}

function render(vnode, parentNode, callback) {
  parentNode.appendChild(createVnode(vnode))
  if (callback !== undefined) {
    callback()
  }
}

export { render, createVnode, applyAttributes }
