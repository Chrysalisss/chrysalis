/**
 * Chrysalis v0.10.1-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Chrysalis = {})));
}(this, (function (exports) {
  // Create element (hyperScript notation)
  var h = function h(nodeName, attributes) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return {
      nodeName: nodeName,
      attributes: attributes || {},
      children: children
    };
  };

  var createVNode = function createVNode(vnode) {
    if (typeof vnode !== 'object') {
      return document.createTextNode(vnode);
    }

    var $el = document.createElement(vnode.nodeName);

    for (var key in vnode.attributes) {
      $el.setAttribute(key, vnode.attributes[key]);
    }

    vnode.children.map(createVNode).forEach($el.appendChild.bind($el));
    return $el;
  };

  var render = function render(vnode, parentNode) {
    parentNode.appendChild(createVNode(vnode));
  };

  // based on deathmood`s code
  var changed = function changed(node1, node2) {
    var typeChanged = typeof node1 !== typeof node2;
    var notEqual = typeof node1 === 'string' && node1 !== node2;
    var attributesChanged = node1.type !== node2.type || node1.attributes && node1.attributes.forceUpdate;
    return typeChanged || notEqual || attributesChanged;
  };

  var updateElement = function updateElement($parent, newNode, oldNode, index) {
    if (index === void 0) {
      index = 0;
    }

    if (!oldNode) {
      $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
      $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
      updateAttributes($parent.childNodes[index], newNode.attributes, oldNode.attributes);
      var newLength = newNode.children.length;
      var oldLength = oldNode.children.length;

      for (var i = 0; i < newLength || i < oldLength; i++) {
        updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
      }
    }
  };

  var updateAttribute = function updateAttribute($target, name, newValue, oldValue) {
    if (!newValue) {
      $target.removeAttribute(name);
    } else if (!oldValue || newValue !== oldValue) {
      $target.setAttribute(name, newValue);
    }
  };

  var updateAttributes = function updateAttributes($target, newAttributes, oldAttributes) {
    if (oldAttributes === void 0) {
      oldAttributes = {};
    }

    var attributes = Object.assign({}, newAttributes, oldAttributes);

    for (name in attributes) {
      updateAttribute($target, name, newAttributes[name], oldAttributes[name]);
    }
  };

  exports.h = h;
  exports.render = render;
  exports.updateElement = updateElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
