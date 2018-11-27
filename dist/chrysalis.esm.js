/**
 * Chrysalis v0.9.2-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

var render = function render(vnode, parentNode) {
  var $el;
  var $children = vnode.children || [];

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  if (typeof vnode.nodeName === 'string') {
    $el = document.createElement(vnode.nodeName);

    for (var key in vnode.attributes) {
      $el.setAttribute(key, vnode.attributes[key]);
    }
  }

  $children.forEach(function (child) {
    $el.appendChild(render(child, vnode.nodeName));
  });
  parentNode.appendChild($el);
};

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var vdomChanged = function vdomChanged(newNode, oldNode) {
  var typeChanges = _typeof(newNode) !== _typeof(oldNode);

  var nodetypeChanged = node1.type !== node2.type;
  return typeChanges || nodetypeChanged;
};

var updateElement = function updateElement($parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

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

export { createElement, render, updateElement };
