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

function createComponent(component, props) {
  component[PROPS] = props

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
        component[PROPS] = newProps
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
    $el: createElement(vnode)
  })
}

function createElement(node, hooks, isSVG) {
  function appendChild(element, children) {
    // check the benchmark jsben.ch/y3SpC
    for (var i = 0, len = children[LENGTH]; i < len; i++) {
      element.appendChild(createElement(children[i], hooks, isSVG))
    }
  }

  if (isArray(node)) {
    const element = createElement(node[0])

    appendChild(element, node)

    return element
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  const name = node.name

  if (name[RENDER]) {
    if (name[ONCREATE]) {
      hooks.push(name[ONCREATE].bind(name))
    }

    !name.childNodes && (name[PROPS][CHILDREN] = node.childNodes)

    createComponent(name, node[PROPS])

    name[ONINIT] && name[ONINIT]()

    return name.$el
  }

  const element = (isSVG = isSVG || name == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', name)
    : doc.createElement(name)

  node[PROPS] && updateProps(element, node[PROPS], EMPTY_OBJ, isSVG)

  appendChild(element, node.childNodes)

  return element
}

export default createElement
