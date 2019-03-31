import patch from './patch'

let ROOT_ELEMENT, element, oldNode

function start(parentNode, callback) {
  ROOT_ELEMENT = parentNode

  element = patch(parentNode, element, oldNode, (oldNode = App()))

  if (callback) {
    callback()
  }
}

export { start, ROOT_ELEMENT }
