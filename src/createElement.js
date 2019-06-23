import updateAttrs from './updateAttributes'
import { elements } from './render'
import { merge, isTextNode } from './utill'
import patch from './patch'

function getNode(node) {
  for (let i = 0; i <= elements.length; i++) {
    if (elements[i] === node) {
      return i
    }
  }
}

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
      const index = getNode(component._element)

      patch(
        elements[index - 1], 
        elements[index], 
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
