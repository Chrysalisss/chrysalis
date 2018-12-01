/**
 *
 * VNode:
 * @param {string | number | boolean | undefined} createTextNode()
 * @param {object} typical hyperScript like structure, createElement() -> appendChild()
 * @param {function} functional component, VNode()
 *
 * VNode.name:
 * @param {string} createTextNode()
 *
 */

const createVNode = vnode => {
  let $el
  const $children = vnode.children || []

  if (typeof vnode === 'string' || 'number' || 'boolean') {
    $el = document.createTextNode(vnode)
  }

  if (typeof vnode.nodeName === 'string') {
    $el = document.createElement(vnode.nodeName)

    for (let key in vnode.attributes) {
      $el.setAttribute(key, vnode.attributes[key])
    }
  }

  $children.forEach(child => {
    $el.appendChild(createVNode(child))
  })

  return $el
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVNode(vnode))
}

export default render
