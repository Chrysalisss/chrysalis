/**
 * Chrysalis v0.9.6-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Chrysalis = {})));
}(this, (function (exports) {
  const createElement$1 = (nodeName, attributes, ...children) => {
    if (!attributes) attributes = {}; // e.g. null -> {}

    return {
      nodeName,
      attributes,
      children
    }
  };

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

  const render = (vnode, parentNode) => {
    let $el;
    const $children = vnode.children || [];

    if (typeof vnode === 'string' || 'number' || 'boolean' || 'undefined') {
      $el = document.createTextNode(vnode);
    }

    if (typeof vnode === 'function') {
      render(vnode(), parentNode);
    }

    if (typeof vnode.nodeName === 'string') {
      $el = document.createElement(vnode.nodeName);

      for (let key in vnode.attributes) {
        $el.setAttribute(key, vnode.attributes[key]);
      }
    }

    $children.forEach(child => {
      $el.appendChild(render(child, vnode.nodeName));
    });

    parentNode.appendChild($el);
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

  exports.h = createElement$1;
  exports.render = render;
  exports.updateElement = updateElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
