/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * https://facebook.github.io/jsx
 * https://github.com/hyperhype/hyperscript
 */

function h(type, props) {
  let children = []
  let len = arguments.length - 2

  while (len-- > 0) children[len] = arguments[len + 2]

  if (Array.isArray(children[0])) {
    children = children[0]
  }

  // type is a function -> it`s a component
  if (typeof type === 'function') {
    return type(props || children, children)
  }

  return {
    type,
    props: props || {},
    children
  }
}

export default h
