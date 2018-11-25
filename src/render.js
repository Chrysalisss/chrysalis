const render = (vnode, parentNode) => {
  let $el
  const $children = vnode.children || []

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  if (typeof vnode.nodeName === 'string') {
    $el = document.createElement(vnode.nodeName)

    for (let key in vnode.attributes) {
      $el.setAttribute(key, vnode.attributes[key])
    }
  }

  $children.forEach(child => {
    $el.appendChild(render(child, vnode.nodeName))
  })

  parentNode.appendChild($el)
}

export default render
