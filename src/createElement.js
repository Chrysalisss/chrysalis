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
  CHILDREN
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
  // Fragment support
  // set up config: "pragmaFrag": "''"
  // <><h1>Hello!</h1></> will compile to
  // h('', null, h('h1', null, Hello!))
  if (node.name == '') {
    node = node.childNodes[0]
  }

  if (isTextNode(node)) {
    return doc.createTextNode(node)
  }

  if (node.name[RENDER]) {
    if (node.name[ONCREATE]) {
      hooks.push(node.name[ONCREATE])
    }

    node[PROPS][CHILDREN] = node.childNodes

    createComponent(node.name, node[PROPS])

    node.name[ONINIT] && node.name[ONINIT]()

    return node.name.$el
  }

  const element = (isSVG = isSVG || node.name == 'svg')
    ? doc.createElementNS('http://www.w3.org/2000/svg', node.name)
    : doc.createElement(node.name)

  updateProps(element, node[PROPS], EMPTY_OBJ, isSVG)

  // check the benchmark jsben.ch/y3SpC
  for (let i = 0, len = node.childNodes[LENGTH]; i < len; i++) {
    element.appendChild(createElement(node.childNodes[i], hooks, isSVG))
  }

  return element
}

export default createElement
