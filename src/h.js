/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * https://facebook.github.io/jsx
 * https://github.com/hyperhype/hyperscript
 */
import { isArray } from './utill'

function h(type, props) {
  for (let node, rest = [], children = [], i = arguments.length; i-- > 2) {
    rest.push(arguments[i])
  }

  while (rest.length > 0) {
    if (isArray((node = rest.pop()))) {
      for (let i = node.length; i-- > 0; ) {
        rest.push(node[i])
      }
    } else if (node === false || node === true || node == null) {
    } else {
      children.push(node)
    }
  }

  props = props || {}

  if (typeof type == 'function') {
    props.children = children
    return type(props)
  }

  return {
    type,
    props: props,
    children
  }
}

export default h
