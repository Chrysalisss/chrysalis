import updateAttrs from './updateAttributes'

function createElement(node, isSVG) {
  if (typeof node !== 'object') {
    return document.createTextNode(node)
  }

  if (node.type.render) {
    createComponent(node.type, node.props)

    return node.type._element
  }

  const element = (isSVG = isSVG || node.type == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', node.type)
    : document.createElement(node.type)

  updateAttrs(element, node.props, {})

  for (let child in node.children) {
    element.appendChild(createElement(node.children[child], isSVG))
  }

  return element
}

export default createElement
