const vdomChanged = (newNode, oldNode) => {
  const typeChanges = typeof newNode !== typeof oldNode
  const nodetypeChanged = node1.type !== node2.type

  return typeChanges || nodetypeChanged
}

const updateElement = ($parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode))
  }

  if (!newNode) {
    $parent.removeChild($parent.childNodes[index])
  }

  if (vdomChanged(newNode, oldNode)) {
    // oldNode != newNode -> replace childs
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  }

  if (newNode.type) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

export default updateElement
