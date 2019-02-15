;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : factory((global.Chrysalis = {}))
})(this, function(exports) {
  'use strict'

  /**
   * JSX/hyperscript notation
   * Creates a virtual DOM node
   *
   * @see https://facebook.github.io/jsx & https://github.com/hyperhype/hyperscript
   */
  function h(nodeName, props) {
    var children = []
    var len = arguments.length - 2

    while (len-- > 0) {
      children[len] = arguments[len + 2]
    } // nodeName is a function -> it`s a component

    if (typeof nodeName === 'function') {
      return nodeName(props)
    }

    if (Array.isArray(children[0])) {
      children = children[0]
    }

    return {
      nodeName: nodeName,
      props: props || {},
      children: children
    }
  }

  function merge(a, b) {
    var src = {}

    for (var i in a) {
      src[i] = a[i]
    }

    for (var i in b) {
      src[i] = b[i]
    }

    return src
  }

  function updateAttrs($element, newAttrs, oldAttrs) {
    // putting attributes together and iterating
    for (var name in merge(newAttrs, oldAttrs)) {
      if (!newAttrs[name]) {
        if (name == 'class') {
          $element.removeAttribute('class')
        } else {
          $element[name] = null
          delete $element[name]
        }
      } else if (newAttrs[name] != oldAttrs[name]) {
        if (name == 'class') {
          $element.setAttribute('class', newAttrs[name])
        } else {
          $element[name] = newAttrs[name]
        }
      }
    }
  }

  function createVnode(vnode, isSVG) {
    if (typeof vnode !== 'object') {
      return document.createTextNode(vnode)
    }

    var element = (isSVG = isSVG || vnode.nodeName == 'svg')
      ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
      : document.createElement(vnode.nodeName) // props (not attributes) by this time are already applied to the vnode

    updateAttrs(element, vnode.props, {})

    for (var child in vnode.children) {
      element.appendChild(createVnode(vnode.children[child], isSVG))
    }

    return element
  }

  /**
   * Comparison algorithm DOM and Virtual DOM
   * Lead time ~O(n^3)
   */

  function updateElement(newNode, oldNode, element, index, isSVG) {
    var parentNode = element || ROOT_ELEMENT

    if (oldNode == null) {
      parentNode.appendChild(createVnode(newNode, isSVG))
    } else if (newNode == null) {
      parentNode.removeChild(parentNode.childNodes[index || 0])
    } else if (notSameNode(newNode, oldNode)) {
      parentNode.replaceChild(createVnode(newNode, isSVG), parentNode.childNodes[index || 0])
    } else if (newNode.nodeName) {
      updateAttrs(parentNode.childNodes[index || 0], newNode.props, oldNode.props)
      var length = Math.max(newNode.children.length, oldNode.children.length)

      for (var i = -1; ++i < length; ) {
        updateElement(
          newNode.children[i],
          oldNode.children[i],
          parentNode.childNodes[index || 0],
          i,
          (isSVG = isSVG || newNode.nodeName == 'svg')
        )
      }
    }
  }
  /**
   * Node change detection algo
   * Based on Snabbdom`s algorithm
   */

  function notSameNode(a, b) {
    return typeof a !== typeof b || a.nodeName !== b.nodeName || (typeof b !== 'object' && b !== a)
  }

  var ROOT_ELEMENT // vnode representation of current DOM

  var currentNode

  function start(parentNode, callback) {
    ROOT_ELEMENT = parentNode
    updateElement(App(), currentNode, parentNode)
    currentNode = App()

    if (callback) {
      callback()
    }
  }

  function setState(fn) {
    if (fn) {
      fn()
    }

    start(ROOT_ELEMENT)
  }

  exports.h = h
  exports.start = start
  exports.setState = setState

  Object.defineProperty(exports, '__esModule', { value: true })
})
