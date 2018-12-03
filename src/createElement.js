// Create element (hyperScript notation)
const h = (nodeName, attributes, ...children) => {
  return {
    nodeName,
    attributes: attributes || {},
    children
  }
}

export default h
