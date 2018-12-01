// Create element (hyperScrip)
const h = (nodeName, attributes, ...children) => {

  return {
    nodeName,
    attributes: attributes || {},
    children
  }
}

export default h
