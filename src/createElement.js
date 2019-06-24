import updateAttrs from './updateAttributes'
import { merge, isTextNode } from './utill'
import patch from './patch'

function createComponent(component, props) {
  if (typeof component.state === 'function') {
    component.state = component.state(props)
  }

  merge(component, {
    setState(state) {
      if (typeof state === 'function') {
        state = state(component.state)
      }

      for (let key in state) {
        component.state[key] = state[key]
      }

      component._update()
    },
    _update() {    
      patch(
        component._element.previousElementSibling, 
        component._element, 
        component._vnode, 
        (component._vnode = component.render())
      )
    },
    _vnode: component.render(),
    _element: createElement(component.render())
  })
}

function createElement(node, isSVG) {
  if (isTextNode(node)) {
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
