// Create element (hyperScript notation)
function h(nodeName, attributes) {
  var children = []
  let len = arguments.length - 2
  while (len-- > 0) children[len] = arguments[len + 2]

  return {
    nodeName,
    attributes: attributes || {},
    children
  }
}

export default h
