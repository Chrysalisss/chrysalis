/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * facebook.github.io/jsx
 * github.com/hyperhype/hyperscript
 * css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
 */

import { NULL, FUNCTION } from './helpers/index'

function h(name, props) {
  for (var node, rest = [], children = [], i = arguments.length; i-- > 2; ) {
    rest.push(arguments[i])
  }

  while (rest.length > 0) {
    if (Array.isArray((node = rest.pop()))) {
      for (let i = node.length; i-- > 0; ) {
        rest.push(node[i])
      }
    } else if (node === false || node === true || node == NULL) {
    } else {
      children.push(node)
    }
  }

  props = props || {}

  if (typeof name == FUNCTION) {
    props.children = children
    return name(props)
  }

  return {
    name,
    props,
    children
  }
}

export default h
