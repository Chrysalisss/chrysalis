import _a from './updateAttributes'

function createVnode(vnode, isSVG) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  const $element = (isSVG = isSVG || vnode.nodeName == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
    : document.createElement(vnode.nodeName)

  // props (not attributes) by this time are already applied to the vnode
  _a($element, vnode.props, {})

  vnode.children.map(child => $element.appendChild(createVnode(child, isSVG)))
  
  return $element
}

function render(vnode, parentNode, callback) {
  parentNode.appendChild(createVnode(vnode))
  if (callback !== undefined) {
    callback()
  }
}

export { render, createVnode }
