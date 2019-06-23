import patch from './patch'

let ROOT_ELEMENT, element, oldNode, elements

function render(node, container, callback) {
  ROOT_ELEMENT = container

  element = patch(container, element, oldNode, (oldNode = node))

  if (callback) {
    callback()
  }

  elements = ROOT_ELEMENT.querySelectorAll('*')
}

export { render, ROOT_ELEMENT, elements }
