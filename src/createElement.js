import updateProps from './updateProps'
import patch from './patch'

import { 
  merge, 
  isTextNode, 
  doc, 
  EMPTY_OBJ, 
  clone, 
  removeElement, 
  FUNCTION 
} from './helpers/index'

function createComponent(component, props) {
  component.props = props

  const vnode = component.render(component.state, component.props)

  merge(component, {
    setState(state, newProps) {
      if (typeof state == FUNCTION) {
        state = state(component.state, component.props)
      }

      const newState = clone(component.state, state)

      let currentState, currentProps
      if (component.onupdate) {
        currentState = clone(EMPTY_OBJ, component.state)
        currentProps = clone(EMPTY_OBJ, component.props)
      }

      if (component.shouldUpdate) {
        if (component.shouldUpdate(newState, newProps)) {
          component.props = newProps
          component.state = newState
          component.forceUpdate(currentState, currentProps, true)
        }
      } else {
        component.props = newProps
        component.state = newState
        component.forceUpdate(currentState, currentProps, true)
      }
    },
    forceUpdate(prevState, prevProps, fromSetState) {
      patch(
        component.$root,
        component.$el,
        component._vnode,
        (component._vnode = component.render(component.state, component.props))
      )

      fromSetState && component.onupdate && component.onupdate(prevState, prevProps)
    },
    destroy() {
      removeElement(component.$root, component.$el, component)
    },
    _vnode: vnode,
    $el: createElement(vnode)
  })

  component.$root = component.$el.previousElementSibling
}

function createElement(node, hooks, isSVG) {
  // Fragment support
  // set up config: "pragmaFrag": "''"
  // <><h1>Hello!</h1></> will compile to
  // h('', null, h('h1', null, Hello!))
  if (node.name == '') {
    node = node.children[0]
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  if (node.name.render) {
    if (node.name.oncreate) {
      hooks.push(node.name.oncreate)
    }

    node.props.children = node.children

    createComponent(node.name, node.props)

    node.name.oninit && node.name.oninit()

    return node.name.$el
  }

  const element = (isSVG = isSVG || node.name == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.name)
    : doc.createElement(node.name)

  updateProps(element, node.props, EMPTY_OBJ, isSVG)

  // check the benchmark jsben.ch/y3SpC
  for (let i = 0, len = node.children.length; i < len; i++) {
    element.appendChild(createElement(node.children[i], hooks, isSVG))
  }

  return element
}

export default createElement
