/**
 * Virtual DOM patching algorithm
 * Lead time ~O(n^3)
 *
 * Licensed under the MIT License
 *
 * Based on Vue, Elm and picodom
 * Big thanks to Evan You, Evan Czaplicki, Jorge Bucaran
 * whose created this awesome libraries
 *
 * github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js
 * github.com/elm/virtual-dom
 * github.com/jorgebucaran/superfine
 *
 * Optimizations techniques
 * (elm-lang.org/blog/blazing-fast-html-round-two#methodology):
 * Prefer arrays over dictionary objects
 * Do not allocate
 * Never look anything up
 *
 * This algo supports keys
 */

import createElement from './createElement'
import updateAttrs from './updateAttributes'
import { removeElement, getKey } from './utill'

function patch(parent, element, oldNode, node) {
  if (oldNode == null) {
    element = parent.insertBefore(createElement(node), element)
  } else if (node.nodeName && node.nodeName === oldNode.nodeName) {
    updateAttrs(element, oldNode.props, node.props)

    const len = node.children.length
    const oldLen = oldNode.children.length
    const reusableChildren = {}
    const oldElements = []
    const newKeys = {}

    for (var i = 0; i < oldLen; i++) {
      const oldElement = element.childNodes[i]
      oldElements[i] = oldElement

      const oldChild = oldNode.children[i]
      const oldKey = getKey(oldChild)

      if (null != oldKey) {
        reusableChildren[oldKey] = [oldElement, oldChild]
      }
    }

    let i = 0
    let j = 0

    while (j < len) {
      const oldElement = oldElements[i]
      const oldChild = oldNode.children[i]
      const newChild = node.children[j]

      let oldKey = getKey(oldChild)

      if (newKeys[oldKey]) {
        i++
        continue
      }

      const newKey = getKey(newChild)

      const reusableChild = reusableChildren[newKey] || []

      if (null == newKey) {
        if (null == oldKey) {
          patch(element, oldElement, oldChild, newChild)
          j++
        }
        i++
      } else {
        if (oldKey === newKey) {
          patch(element, reusableChild[0], reusableChild[1], newChild)
          i++
        } else if (reusableChild[0]) {
          element.insertBefore(reusableChild[0], oldElement)
          patch(element, reusableChild[0], reusableChild[1], newChild)
        } else {
          patch(element, oldElement, null, newChild)
        }

        j++
        newKeys[newKey] = newChild
      }
    }

    while (i < oldLen) {
      const oldChild = oldNode.children[i]
      const oldKey = getKey(oldChild)

      if (null == oldKey) {
        removeElement(element, oldElements[i], oldChild)
      }

      i++
    }

    for (let i in reusableChildren) {
      const reusableChild = reusableChildren[i]
      const reusableNode = reusableChild[1]

      if (!newKeys[reusableNode.props.key]) {
        removeElement(element, reusableChild[0], reusableNode)
      }
    }
  } else if (node !== oldNode) {
    const i = element
    parent.replaceChild((element = createElement(node)), i)
  }

  return element
}

export default patch
