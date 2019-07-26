import patch from './patch'

let element, oldNode

function render(node, container, callback) {
  element = patch(container, element, oldNode, (oldNode = node))

  callback && callback()
}

export { render }
