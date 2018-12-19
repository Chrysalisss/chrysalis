const createVnode = vnode => {
  if (typeof vnode != 'object') {
    return document.createTextNode(vnode)
  }

  const $element = document.createElement(vnode.nodeName)

  // props by this time are already applied to the vnode
  Object.keys(vnode.props).map(attr => {
    $element.setAttribute(attr, vnode.props[attr])
  })

  vnode.children.map(child => $element.appendChild(createVnode(child)))

  return $element
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVnode(vnode))
}

export { render, createVnode }
