import updateAttrs from './updateAttributes'

function createVnode(vnode, isSVG) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  const element = (isSVG = isSVG || vnode.nodeName == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
    : document.createElement(vnode.nodeName)

  // props (not attributes) by this time are already applied to the vnode
  updateAttrs(element, vnode.props, {})

  for (let child in vnode.children) {
    element.appendChild(createVnode(vnode.children[child], isSVG))
  }

  return element
}

export default createVnode
