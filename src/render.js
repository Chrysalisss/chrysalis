const render = (nodeName, attributes, children) => {
  const $el = document.createElement(nodeName)
  const $children = children || []

  for (let key in attributes) {
    $el.setAttribute(key, attributes[key])
  }

  // recursive function to render childs
  $children.forEach(child => {
    el.appendChild(renderNode(child))
  })

  return $el
}

export default render
