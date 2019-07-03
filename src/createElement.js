import updateProps from './updateProps'
import patch from './patch'
import { merge, isTextNode } from './utill'

import { 
  isArray, 
  doc, 
  EMPTY_OBJ
} from './constants'

function createComponent(component, props) {
  component.props = props

  if (typeof component.state === 'function') {
    component.initialState = component.state
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
    return doc.createTextNode(node)
  }

  if (node.type.render) {
    node.props.children = node.children
    
    createComponent(node.type, node.props)

    return node.type._element
  }

  const element = (isSVG = isSVG || node.type == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.type)
    : doc.createElement(node.type)

  updateProps(element, node.props, EMPTY_OBJ, isSVG)

  // check the benchmark jsben.ch/y3SpC
  for (let i = 0, len = node.children.length; i < len; i++) {
    element.appendChild(
      createElement(
        isArray(node.children[i]) ? node.children[i][0] : node.children[i], 
        isSVG
      )
    )
  }

  return element
}

export default createElement
