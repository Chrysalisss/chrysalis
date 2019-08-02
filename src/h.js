/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * facebook.github.io/jsx
 * github.com/hyperhype/hyperscript
 * css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
 */

import { NULL, FUNCTION, LENGTH, EMPTY_OBJ } from './helpers/index'

function h(name, props) {
  for (var node, rest = [], children = [], args = arguments, i = args[LENGTH]; i-- > 2; ) {
    rest.push(args[i])
  }

  while (rest[LENGTH] > 0) {
    if (Array.isArray((node = rest.pop()))) {
      for (let i = node[LENGTH]; i-- > 0; ) {
        rest.push(node[i])
      }
    } else if (node === false || node === true || node == NULL) {
    } else {
      children.push(node)
    }
  }

  props = props || EMPTY_OBJ

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
