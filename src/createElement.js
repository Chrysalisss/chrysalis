import updateProps from './updateProps'
import patch from './patch'

import { merge, isTextNode, doc, EMPTY_OBJ, clone } from './helpers/index'

function createComponent(component, props) {
  component.props = props

  const vnode = component.render(component.state, component.props)

  merge(component, {
    setState(state, newProps) {
      if (typeof state === 'function') {
        state = state(component.state, component.props)
      }

      const newState = clone(component.state, state)

      if (component.shouldUpdate) {
        if (component.shouldUpdate(newState, newProps)) {
          component.props = newProps
          component.state = newState
          component.forceUpdate()
        }
      } else {
        component.props = newProps
        component.state = newState
        component.forceUpdate()
      }
    },
    forceUpdate() {
      patch(
        component._base,
        component._element,
        component._vnode,
        (component._vnode = component.render(component.state, component.props))
      )
    },
    destroy() {
      removeElement(component._base, component._element, component)
    },
    _vnode: vnode,
    _element: createElement(vnode)
  })

  component._base = component._element.previousElementSibling
}

function createElement(node, hooks, isSVG) {
  // Fragment support
  // set up config: "pragmaFrag": "''"
  // <><h1>Hello!</h1></> will compile to
  // h('', null, h('h1', null, Hello!))
  if (node.type == '') {
    node = node.children[0]
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  if (node.type.render) {
    if (node.type.oncreate) {
      hooks.push(node.type.oncreate)
    }

    node.props.children = node.children

    createComponent(node.type, node.props)

    node.type.oninit && node.type.oninit()

    return node.type._element
  }

  const element = (isSVG = isSVG || node.type == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.type)
    : doc.createElement(node.type)

  updateProps(element, node.props, EMPTY_OBJ, isSVG)

  // check the benchmark jsben.ch/y3SpC
  for (let i = 0, len = node.children.length; i < len; i++) {
    element.appendChild(createElement(node.children[i], hooks, isSVG))
  }

  return element
}

export default createElement
