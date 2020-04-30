import updateProps from './update-props'
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
  isArray,
  PUSH,
  CHILD_NODES
} from './helpers/index'

function createComponent(component, hooks, parent) {
  component[ONINIT] && component[ONINIT](component[PROPS])

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
    destroy() {
      removeElement(component.$el[PARENT_NODE], component.$el, component)
    },
    _vnode: vnode,
    $el: createElement(vnode, hooks, parent)
  })

  component[FORCEUPDATE] = function(prevState, prevProps, fromSetState) {
    patch(
      component.$el[PARENT_NODE],
      component.$el,
      component._vnode,
      (component._vnode = component[RENDER](component[STATE], component[PROPS]))
    )

    fromSetState &&
      component[ONUPDATE] &&
      component[ONUPDATE](prevState, prevProps)
  }

  return component.$el
}

function createElement(node, hooks, parent, isSVG) {
  function appendChild(element, children) {
    // check the benchmark jsben.ch/y3SpC
    for (var i = 0, len = children[LENGTH]; i < len; i++) {
      element.appendChild(createElement(children[i], hooks, element, isSVG))
    }
  }

  if (isArray(node)) {
    appendChild(parent, node)

    return parent[CHILD_NODES][0]
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  if (node[RENDER]) {
    if (node[ONCREATE]) {
      hooks[PUSH](node[ONCREATE].bind(node))
    }

    return createComponent(node, hooks, parent)
  }

  const element = (isSVG = isSVG || node.name == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.name)
    : doc.createElement(node.name)

  updateProps(element, node[PROPS], EMPTY_OBJ, isSVG)

  appendChild(element, node[CHILD_NODES])

  return element
}

export default createElement
