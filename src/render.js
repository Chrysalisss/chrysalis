/**
 * 
 * VNode: 
 * @param {string | number | boolean | undefined | null} createTextNode()
 * @param {object} typical hyperScript like structure, createElement() -> appendChild()
 * @param {function} functional component, VNode()
 *
 * VNode.name: 
 * @param {string} createTextNode()
 *
 */

const render = (vnode, parentNode) => {
  let $el
  const $children = vnode.children || []

  if (typeof vnode === 'string' || 'number' || 'boolean' || 'undefined' || null) {
    return document.createTextNode(vnode)
  }

  if (typeof vnode === 'function') {
    render(vnode(), parentNode)
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
