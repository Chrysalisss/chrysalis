import updateAttrs from './updateAttributes'

function createElement(vnode, isSVG) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  if (vnode.type.render) {
    createComponent(vnode.type, vnode.props)

    return vnode.type._element
  }

  const element = (isSVG = isSVG || vnode.type == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type)
    : document.createElement(vnode.type)

  // props (not attributes) by this time are already applied to the vnode
  updateAttrs(element, vnode.props, {})

  for (let child in vnode.children) {
    element.appendChild(createElement(vnode.children[child], isSVG))
  }

  return element
}

export default createElement
