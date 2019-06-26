import updateProps from './updateProps'
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

      merge(component.state, state)

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
    node.props.children = node.children
    
    createComponent(node.type, node.props)

    return node.type._element
  }

  const element = (isSVG = isSVG || node.type == 'svg')
    ? document.createElementNS('http://www.w3.org/2000/svg', node.type)
    : document.createElement(node.type)

  updateProps(element, node.props, {})

  // check the benchmark jsben.ch/y3SpC
  for (let i = 0, len = node.children.length; i < len; i++) {
    element.appendChild(
      createElement(
        Array.isArray(node.children[i]) ? node.children[i][0] : node.children[i], 
        isSVG
      )
    )
  }

  return element
}

export default createElement
