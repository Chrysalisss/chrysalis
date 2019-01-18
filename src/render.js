import updateElement from './updateElement'

// define a root element for app
let ROOT_ELEMENT

// vnode representation of current DOM
let currentNode

function start(parentNode, callback) {
  ROOT_ELEMENT = parentNode

  updateElement(App(), currentNode, parentNode)

  currentNode = App()

  if (callback != undefined) {
    callback()
  }
}

export { start, ROOT_ELEMENT }
