import updateProps from './updateProps'
import patch from './patch'

import { 
  merge, 
  isTextNode, 
  doc, 
  EMPTY_OBJ, 
  clone, 
  removeElement, 
  FUNCTION,
  ONUPDATE,
  ONCREATE,
  ONINIT,
  SHOULDUPDATE,
  RENDER,
  FORCEUPDATE,
  STATE,
  PROPS,
  PARENT_NODE,
  LENGTH,
  CHILDREN,
  isArray
} from './helpers/index'

function createComponent(component, hooks) {
  const vnode = component[RENDER](component[STATE], component[PROPS])

  merge(component, {
    setState(state, newProps) {
      if (typeof state == FUNCTION) {
        state = state(component[STATE], component[PROPS])
      }

      const newState = clone(component[STATE], state)

      let currentState, currentProps
      if (component[ONUPDATE]) {
        currentState = clone(EMPTY_OBJ, component[STATE])
        currentProps = clone(EMPTY_OBJ, component[PROPS])
      }

      if (component[SHOULDUPDATE]) {
        if (component[SHOULDUPDATE](newState, newProps)) {
          component[PROPS] = newProps
          component[STATE] = newState
          component[FORCEUPDATE](currentState, currentProps, true)
        }
      } else {
        component[STATE] = newState
        component[FORCEUPDATE](currentState, currentProps, true)
      }
    },
    forceUpdate(prevState, prevProps, fromSetState) {
      patch(
        component.$el[PARENT_NODE],
        component.$el,
        component._vnode,
        (component._vnode = component[RENDER](component[STATE], component[PROPS]))
      )

      fromSetState && component[ONUPDATE] && component[ONUPDATE](prevState, prevProps)
    },
    destroy() {
      removeElement(component.$el[PARENT_NODE], component.$el, component)
    },
    _vnode: vnode,
    $el: createElement(vnode, hooks)
  })

  component[ONINIT] && component[ONINIT]()

  return component.$el
}

function createElement(node, hooks, isSVG) {
  function appendChild(element, children, index) {
    // check the benchmark jsben.ch/y3SpC
    for (var i = index, len = children[LENGTH]; i < len; i++) {
      element.appendChild(createElement(children[i], hooks, isSVG))
    }
  }

  if (isArray(node)) {
    const element = createElement(node[0])

    appendChild(element, node, 1)

    return element
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  if (node[RENDER]) {
    if (node[ONCREATE]) {
      hooks.push(node[ONCREATE].bind(node))
    }

    return createComponent(node, hooks)
  }

  const element = (isSVG = isSVG || node.name == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.name)
    : doc.createElement(node.name)

  updateProps(element, node[PROPS], EMPTY_OBJ, isSVG)

  appendChild(element, node.childNodes, 0)

  return element
}

export default createElement
