/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * https://facebook.github.io/jsx
 * https://github.com/hyperhype/hyperscript
 */
import { 
  isArray, 
  NULL, 
  EMPTY_OBJ,
  EMPTY_ARR,
  FUNCTION 
} from './constants'

function h(type, props) {
  for (var node, rest = EMPTY_ARR, children = EMPTY_ARR, i = arguments.length; i-- > 2; ) {
    rest.push(arguments[i])
  }

  while (rest.length > 0) {
    if (isArray((node = rest.pop()))) {
      for (let i = node.length; i-- > 0; ) {
        rest.push(node[i])
      }
    } else if (node === false || node === true || node == NULL) {
    } else {
      children.push(node)
    }
  }

  props = props || EMPTY_OBJ

  if (typeof type == FUNCTION) {
    props.children = children
    return type(props)
  }

  return {
    type,
    props,
    children
  }
}

export default h
