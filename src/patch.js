/**
 * Virtual DOM patching algorithm
 * Lead time ~O(n^3)
 *
 * Licensed under the MIT License
 *
 * Based on Vue, Elm & Superfine
 * Big thanks to Evan You, Evan Czaplicki, Jorge Bucaran
 * whose created this awesome libraries
 *
 * github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js
 * github.com/elm/virtual-dom
 * github.com/jorgebucaran/superfine
 *
 * See Elm`s optimizations techniques:
 * elm-lang.org/blog/blazing-fast-html-round-two
 *
 * This algo supports keys
 */

import createElement from './createElement'
import updateProps from './updateProps'

import {
  NULL, 
  removeElement, 
  getKey, 
  isTextNode, 
  isNew, 
  clone, 
  EMPTY_OBJ, 
  ONUPDATE,
  RENDER,
  PROPS
} from './helpers/index'

function patch(parent, element, oldNode, node, isSVG) {
  const hooks = []

  if (node === oldNode) {
  } else if (oldNode != NULL && isTextNode(oldNode) && isTextNode(node) && oldNode != node) {
    element.data = node
  } else if (oldNode == NULL) {
    element = parent.insertBefore(createElement(node, hooks, isSVG), element)
  } else if (node.name[RENDER]) {
    if (isNew(oldNode[PROPS], node[PROPS])) {
      const component = oldNode.name

      let newProps
      if (component[ONUPDATE]) {
        newProps = clone(component[PROPS], node[PROPS])
      }

      component.setState(EMPTY_OBJ, newProps)
    }
  } else if (node.name && node.name === oldNode.name) {
    isSVG = isSVG || node.name == 'svg'

    updateProps(element, oldNode[PROPS], node[PROPS], isSVG)

    const len = node.children.length
    const oldLen = oldNode.children.length
    const cachedNodes = {}
    const oldElements = []
    const newKeys = {}

    for (let i = 0; i < oldLen; i++) {
      const oldElement = element.childNodes[i]
      oldElements[i] = oldElement

      const oldChild = oldNode.children[i]
      const oldKey = getKey(oldChild)

      if (NULL != oldKey) {
        cachedNodes[oldKey] = [oldElement, oldChild]
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

      const cachedNode = cachedNodes[newKey] || []

      if (NULL == newKey) {
        if (NULL == oldKey) {
          patch(element, oldElement, oldChild, newChild, isSVG)
          j++
        }
        i++
      } else {
        if (oldKey === newKey) {
          patch(element, cachedNode[0], cachedNode[1], newChild, isSVG)
          i++
        } else if (cachedNode[0]) {
          element.insertBefore(cachedNode[0], oldElement)
          patch(element, cachedNode[0], cachedNode[1], newChild, isSVG)
        } else {
          patch(element, oldElement, NULL, newChild, isSVG)
        }

        j++
        newKeys[newKey] = newChild
      }
    }

    while (i < oldLen) {
      const oldChild = oldNode.children[i]
      const oldKey = getKey(oldChild)

      if (NULL == oldKey) {
        removeElement(element, oldElements[i], oldChild)
      }

      i++
    }

    for (let i in cachedNodes) {
      const cachedNode = cachedNodes[i]
      const reusableNode = cachedNode[1]

      if (!newKeys[reusableNode.props.key]) {
        removeElement(element, cachedNode[0], reusableNode)
      }
    }
  } else if (node !== oldNode) {
    const i = element
    parent.replaceChild((element = createElement(node, hooks, isSVG)), i)
  }

  while (hooks.length) hooks.pop()()

  return element
}

export default patch
