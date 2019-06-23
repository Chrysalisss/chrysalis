import patch from './patch'

let ROOT_ELEMENT, element, oldNode

function render(node, container, callback) {
  ROOT_ELEMENT = container

  element = patch(container, element, oldNode, (oldNode = node))

  if (callback) {
    callback()
  }
}

export { render, ROOT_ELEMENT }
