const createVnode = vnode => {
  if (typeof vnode != 'object') {
    return document.createTextNode(vnode)
  }

  const $element = document.createElement(vnode.nodeName)

  Object.keys(vnode.attributes).map(attr => {
    $element.setAttribute(attr, vnode.attributes[attr])
  })

  vnode.children.forEach(child => $element.appendChild(createVnode(child)))

  return $element
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVnode(vnode))
}

export default render
