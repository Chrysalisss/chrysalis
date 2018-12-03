/**
 * Chrysalis v0.9.11-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

Object.defineProperty(exports, '__esModule', { value: true });

var _arguments = arguments;

// Create element (hyperScript notation)
var h$1 = function h(nodeName, attributes) {
  var children = [];
  var len = _arguments.length - 2;

  while (len-- > 0) {
    children[len] = _arguments[len + 2];
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

var updateElement = function updateElement($parent, newNode, oldNode, index) {
  if (index === void 0) {
    index = 0;
  }

  if (!oldNode) {
    $parent.appendChild(h(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(h(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateAttributes($parent.childNodes[index], newNode.attributes, oldNode.attributes);
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;

    for (var i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
};

var updateAttributes = function updateAttributes($target, name, value) {
  var attributes = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attributes).forEach(function (name) {
    updateAttribute($target, name, newAttrs[name], oldAttrs[name]);
  });
};

var updateAttribute = function updateAttribute($target, name, newVal, oldVal) {
  if (!newVal) {
    removeAttributes($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setAttribute($target, name, newVal);
  }
};

function setAttribute($target, name, value) {
  if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanAttribute($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

var setBooleanAttribute = function setBooleanAttribute($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
};

exports.h = h$1;
exports.render = render;
exports.updateElement = updateElement;
