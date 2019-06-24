import patch from './patch'

let element, oldNode

function render(node, container, callback) {
  element = patch(container, element, oldNode, (oldNode = node))

  if (callback) {
    callback()
  }
}

export { render }
