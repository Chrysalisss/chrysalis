const createVnode = (vnode, isSVG) => {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  const $element = isSVG
    ? document.createElementNS('http://www.w3.org/2000/svg', node.nodeName)
    : document.createElement(vnode.nodeName)

  // props (not attributes) by this time are already applied to the vnode
  Object.keys(vnode.props).map(attr => {
    $element.setAttribute(attr, vnode.props[attr])
  })

  vnode.children.map(child => $element.appendChild(createVnode(child, isSVG)))

  return $element
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVnode(vnode))
}

export { render, createVnode }
