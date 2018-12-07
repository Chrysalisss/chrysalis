const createVnode = vnode => {
  if (typeof vnode != 'object') {
    return document.createTextNode(vnode)
  }

  const $el = document.createElement(vnode.nodeName)

  for (let attr in vnode.attributes) {
    $el.setAttribute(attr, vnode.attributes[attr])
  }

  vnode.children.forEach(child => $el.appendChild(createVnode(child)))

  return $el
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVnode(vnode))
}

export default render
