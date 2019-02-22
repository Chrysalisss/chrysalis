/**
 * JSX/hyperscript notation
 * Creates a virtual DOM node
 *
 * @see https://facebook.github.io/jsx & https://github.com/hyperhype/hyperscript
 */

function h(nodeName, props) {
  let children = []
  let len = arguments.length - 2
  while (len-- > 0) children[len] = arguments[len + 2]

  if (Array.isArray(children[0])) {
    children = children[0]
  }

  // nodeName is a function -> it`s a component
  if (typeof nodeName === 'function') {
    return nodeName(props, children)
  }

  return {
    nodeName,
    props: props || {},
    children
  }
}

export default h
