/**
 * Chrysalis v0.10.3-β
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

  var createVnode$1 = function createVnode(vnode) {
    if (typeof vnode != 'object') {
      return document.createTextNode(vnode);
    }

    var $el = document.createElement(vnode.nodeName);
    Object.keys(vnode.attributes).map(function (attr) {
      $el.setAttribute(attr, vnode.attributes[attr]);
    });
    vnode.children.forEach(function (child) {
      return $el.appendChild(createVnode(child));
    });
    return $el;
  };

  var render = function render(vnode, parentNode) {
    parentNode.appendChild(createVnode$1(vnode));
  };

  // based on deathmood`s code
  var changed = function changed(oldNode, newNode) {
    var typeChanged = typeof oldNode !== typeof newNode;
    var nodeNameChanged = oldNode.nodeName !== newNode.nodeName;
    var notEqual = typeof oldNode === 'string' && oldNode !== newNode;
    var attributesChanged = oldNode.type !== newNode.type || oldNode.attributes && oldNode.attributes.forceUpdate;
    return typeChanged || notEqual || attributesChanged || nodeNameChanged;
  };

  var updateElement = function updateElement(parentNode, newNode, oldNode, index) {
    if (index === void 0) {
      index = 0;
    }

    if (!oldNode) {
      parentNode.appendChild(createVnode(newNode));
    } else if (!newNode) {
      parentNode.removeChild(parentNode.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
      parentNode.replaceChild(createVnode(newNode), parentNode.childNodes[index]);
    } else if (newNode.nodeName) {
      updateAttributes(parentNode.childNodes[index], newNode.attributes, oldNode.attributes);
      var newLength = newNode.children.length;
      var oldLength = oldNode.children.length;

      for (var i = 0; i < newLength || i < oldLength; i++) {
        updateElement(parentNode.childNodes[index], newNode.children[i], oldNode.children[i], i);
      }
    }
  };

  var updateAttributes = function updateAttributes($target, newAttrs, oldAttrs) {
    if (oldAttrs === void 0) {
      oldAttrs = {};
    }

    var attrs = Object.assign({}, newAttrs, oldAttrs);
    Object.keys(attrs).forEach(function (name) {
      updateAttribute($target, name, newAttrs[name], oldAttrs[name]);
    });
  };

  var updateAttribute = function updateAttribute($target, name, newValue, oldValue) {
    if (!newValue) {
      $target.removeAttribute(name);
    } else if (!oldValue || newValue !== oldValue) {
      $target.setAttribute(name, newValue);
    }
  };

  exports.h = h;
  exports.render = render;
  exports.updateElement = updateElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
