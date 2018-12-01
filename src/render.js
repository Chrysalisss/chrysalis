const createVNode = vnode => {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode);
  }
  const $el = document.createElement(vnode.nodeName);
  for (let key in vnode.attributes) {
    $el.setAttribute(key, vnode.attributes[key])
  }
  vnode.children.map(createVNode).forEach($el.appendChild.bind($el));

  return $el
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVNode(vnode))
}

export default render
