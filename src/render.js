import updateElement from './updateElement'

// define a root element for app
let ROOT_ELEMENT

// vnode representation of current DOM
let currentNode

function render(vnode, parentNode, callback) {
  ROOT_ELEMENT = parentNode

  updateElement(vnode, currentNode, parentNode)

  currentNode = vnode

  if (callback != undefined) {
    callback()
  }
}

export { render, ROOT_ELEMENT }
