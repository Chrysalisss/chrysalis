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

const renderNode = vnode => {
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
    $el.appendChild(renderNode(child))
  })

  return $el
}

const render = (vnode, parentNode) => {
  parentNode.appendChild(renderNode(vnode))
}

export default render
