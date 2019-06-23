import createElement from './createElement'
import { ROOT_ELEMENT } from './start'

const elements = ROOT_ELEMENT.querySelectorAll('*')

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

  const initComponent = {
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

      patch(elements[index - 1], elements[index], component._vnode, (component._vnode = component.render()))      
    },
    _vnode: component.render(),
    _element: createElement(component.render())
  }
}