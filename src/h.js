/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * facebook.github.io/jsx
 * github.com/hyperhype/hyperscript
 * css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
 */

import { NULL, FUNCTION, LENGTH, CHILDREN, isArray } from './helpers/index'

function h(name, props) {
  for (var node, rest = [], childNodes = [], args = arguments, i = args[LENGTH]; i-- > 2; ) {
    rest.push(args[i])
  }

  while (rest[LENGTH] > 0) {
    if (isArray((node = rest.pop()))) {
      for (let i = node[LENGTH]; i-- > 0; ) {
        rest.push(node[i])
      }
    } else if (node === false || node === true || node == NULL) {
    } else {
      childNodes.push(node)
    }
  }

  props = props || {}

  if (typeof name == FUNCTION) {
    !childNodes && (props[CHILDREN] = childNodes)
    return name(props)
  }

  return {
    name,
    props,
    childNodes
  }
}

export default h
