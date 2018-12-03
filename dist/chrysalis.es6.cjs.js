/**
 * Chrysalis v0.10.1-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

Object.defineProperty(exports, '__esModule', { value: true });

// Create element (hyperScript notation)
const h = (nodeName, attributes, ...children) => {
  return {
    nodeName,
    attributes: attributes || {},
    children
  }
};

const createVNode = vnode => {
  if (typeof vnode !== 'object') {
    return document.createTextNode(vnode)
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
const changed = (node1, node2) => {
  const typeChanged = typeof node1 !== typeof node2;
  const notEqual = typeof node1 === 'string' && node1 !== node2;
  const attributesChanged = node1.type !== node2.type || (node1.attributes && node1.attributes.forceUpdate);

  return typeChanged || notEqual || attributesChanged
};

const updateElement = ($parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateAttributes($parent.childNodes[index], newNode.attributes, oldNode.attributes);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
};

const updateAttribute = ($target, name, newValue, oldValue) => {
  if (!newValue) {
    $target.removeAttribute(name);
  } else if (!oldValue || newValue !== oldValue) {
    $target.setAttribute(name, newValue);
  }
};

const updateAttributes = ($target, newAttributes, oldAttributes = {}) => {
  const attributes = Object.assign({}, newAttributes, oldAttributes);
  for (name in attributes) {
    updateAttribute($target, name, newAttributes[name], oldAttributes[name]);
  }
};

exports.h = h;
exports.render = render;
exports.updateElement = updateElement;
