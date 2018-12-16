const jsdom = require('jsdom')
const assert = require('assert')
const { h, render, updateElement } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window
global.navigator = { userAgent: 'node.js' }

// updateElement(parentNode, newNode, oldNode)

describe('updateElement()', () => {
  const app = document.querySelector('#app')

  const deleteNodes = () => {
    while (app.firstChild) {
      app.removeChild(app.firstChild)
    }
  }

  it('<div>Hello, world!</div>', () => {
    const element1 = h('div', null, 'kek')
    const element2 = h('div', null, 'Hello, world!')

    render(element1, app)
    updateElement(app, element2, element1)

    const result = '<div>Hello, world!</div>'

    assert.strictEqual(app.innerHTML, result)

    deleteNodes()
  })
})
