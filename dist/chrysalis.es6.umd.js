/**
 * Chrysalis v0.9.0-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Chrysalis = factory());
}(this, (function () { 'use strict';

  const createElement$1 = (nodeName, attributes, ...children) => {
    if (!attributes) attributes = {}; // e.g. null -> {}

    return {
      nodeName,
      attributes,
      children
    }
  };

  const render = (nodeName, attributes, children) => {
    const $el = document.createElement(nodeName);
    const $children = children || [];

    for (let key in attributes) {
      $el.setAttribute(key, attributes[key]);
    }

    // recursive function to render childs
    $children.forEach(child => {
      el.appendChild(renderNode(child));
    });

    return $el
  };

  const vdomChanged = (newNode, oldNode) => {
    const typeChanges = typeof newNode !== typeof oldNode;
    const nodetypeChanged = node1.type !== node2.type;

    return typeChanges || nodetypeChanged
  };

  const updateElement = ($parent, newNode, oldNode, index = 0) => {
    if (!oldNode) {
      $parent.appendChild(createElement(newNode));
    }

    if (!newNode) {
      $parent.removeChild($parent.childNodes[index]);
    }

    if (vdomChanged(newNode, oldNode)) {
      // oldNode != newNode -> replace childs
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    }

    if (newNode.type) {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
      }
    }
  };

  var Chrysalis = {
    createElement: createElement$1,
    render,
    updateElement
  };

  return Chrysalis;

})));
