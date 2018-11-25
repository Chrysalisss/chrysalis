const render = (node = null, parent = null) => {
  const mount = parent ? el => parent.appendChild(el) : el => el
  if (typeof node === 'string' || typeof node === 'number') {
    return mount(document.createTextNode(node))
  }

  if (typeof node === 'boolean' || node === null) {
    return mount(document.createTextNode(''))
  }

  if (typeof node === 'object' && typeof node.type === 'function') {
    return Component.render(node, parent)
  }

  if (typeof node === 'object' && typeof node.type === 'string') {
    const dom = mount(document.createElement(node.type))
    for (const child of [
      /* flatten */
    ].concat(...node.children)) {
      render(child, dom)
    }
    for (const prop in node.props) {
      setAttribute(dom, prop, node.props[prop])
    }
    return dom
  }

  if (Array.isArray(node)) {
    // hm...
  }
}

export { render }
