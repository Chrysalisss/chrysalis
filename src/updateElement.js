// based on deathmood`s code
const vdomChanged = (newNode, oldNode) => {
  const typeChanges = typeof newNode !== typeof oldNode
  const nodetypeChanged = node1.type !== node2.type

  return typeChanges || nodetypeChanged
}

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
}

const updateAttributes = ($target, name, value) => {
  const attributes = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attributes).forEach(name => {
    updateAttribute($target, name, newAttrs[name], oldAttrs[name]);
  });
}

const updateAttribute = ($target, name, newVal, oldVal) => {
  if (!newVal) {
    removeAttributes($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setAttribute($target, name, newVal);
  }
}

function setAttribute($target, name, value) {
  if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanAttribute($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeAttribute($target, name, value) {
  if (name === 'className') {
    $target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanAttribute($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setAttribute($target, attrs) {
  Object.keys(attrs).forEach(name => {
    setAttrs($target, name, attrs[name]);
  });
}

const setBooleanAttribute = ($target, name, value) => {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

const removeBooleanAttribute = ($target, name) => {
  $target.removeAttribute(name);
  $target[name] = false;
}

export default updateElement