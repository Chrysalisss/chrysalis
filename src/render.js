import updateAttrs from './updateAttributes'
import updateElement from './updateElement'

function createVnode(vnode, isSVG) {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
  }

  const $element = (isSVG = isSVG || vnode.nodeName == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
    : document.createElement(vnode.nodeName)

  // props (not attributes) by this time are already applied to the vnode
  updateAttrs($element, vnode.props, {})

  for (let p in vnode.children) {
    $element.appendChild(createVnode(vnode.children[p], isSVG))
  }

  return $element
}

let ROOT_ELEMENT, oldNode

function render(vnode, parentNode, callback) {
  ROOT_ELEMENT = parentNode

  updateElement(vnode, oldNode, parentNode)
  oldNode = vnode

  if (callback !== undefined) {
    callback()
  }
}

export { render, createVnode, ROOT_ELEMENT }
