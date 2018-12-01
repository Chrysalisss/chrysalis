/**
 * Chrysalis v0.9.9-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

Object.defineProperty(exports, '__esModule', { value: true });

// Create element (hyperScript notation)
const h$1 = (nodeName, attributes) => {
	let children = [];
	let len = arguments.length - 2;
  while (len-- > 0) {
  	children[len] = arguments[len + 2];
  }

  return {
    nodeName,
    attributes: attributes || {},
    children
  }
};

const createVNode = vnode => {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode);
  }
  const $el = document.createElement(vnode.nodeName);
  for (let key in vnode.attributes) {
    $el.setAttribute(key, vnode.attributes[key]);
  }
  vnode.children.map(createVNode).forEach($el.appendChild.bind($el));

  return $el
};

const render = (vnode, parentNode) => {
  parentNode.appendChild(createVNode(vnode));
};

// based on deathmood`s code

const updateElement = ($parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    $parent.appendChild(h(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(h(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateAttributes($parent.childNodes[index], newNode.attributes, oldNode.attributes);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
};

const updateAttributes = ($target, name, value) => {
  const attributes = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attributes).forEach(name => {
    updateAttribute($target, name, newAttrs[name], oldAttrs[name]);
  });
};

const updateAttribute = ($target, name, newVal, oldVal) => {
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

const setBooleanAttribute = ($target, name, value) => {
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
