/**
 * Chrysalis v0.9.8-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Chrysalis = {})));
}(this, (function (exports) {
  var createElement$1 = function createElement(nodeName, attributes) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    if (!attributes) attributes = {}; // e.g. null -> {}

    return {
      nodeName: nodeName,
      attributes: attributes,
      children: children
    };
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
  var renderNode = function renderNode(vnode) {
    var $el;
    var $children = vnode.children || [];

    if (typeof vnode === 'string' || 'number' || 'boolean') {
      $el = document.createTextNode(vnode);
    }

    if (typeof vnode.nodeName === 'string') {
      $el = document.createElement(vnode.nodeName);

      for (var key in vnode.attributes) {
        $el.setAttribute(key, vnode.attributes[key]);
      }
    }

    $children.forEach(function (child) {
      $el.appendChild(renderNode(child));
    });
    return $el;
  };

  var render = function render(vnode, parentNode) {
    parentNode.appendChild(renderNode(vnode));
  };

  var vdomChanged = function vdomChanged(newNode, oldNode) {
    var typeChanges = typeof newNode !== typeof oldNode;
    var nodetypeChanged = node1.type !== node2.type;
    return typeChanges || nodetypeChanged;
  };

  var updateElement = function updateElement($parent, newNode, oldNode, index) {
    if (index === void 0) {
      index = 0;
    }

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
      var newLength = newNode.children.length;
      var oldLength = oldNode.children.length;

      for (var i = 0; i < newLength || i < oldLength; i++) {
        updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
      }
    }
  };

  exports.h = createElement$1;
  exports.render = render;
  exports.updateElement = updateElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
