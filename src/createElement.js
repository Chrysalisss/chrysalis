const createElement = (nodeName, attributes, ...children) => {
  if (!attributes) attributes = {} // e.g. null -> {}

  return {
    nodeName,
    attributes,
    children
  }
}

export { createElement }
