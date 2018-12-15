const jsdom = require('jsdom')
const assert = require('assert')
const { h, render, updateElement } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body></body></html>')

global.document = window.document
global.window = window
global.navigator = { userAgent: 'node.js' }

// updateElement(parentNode, newNode, oldNode)

describe('updateElement()', () => {
  const body = document.querySelector('body')

  const deleteNodes = () => {
    while (body.firstChild) {
      body.removeChild(body.firstChild)
    }
  }

  it('<div>Hello, world!</div>', () => {
    const element1 = h('div', null)
    const element2 = h('div', null, 'Hello, world!')

    render(element1, body)
    updateElement(body, element2, element1)

    const result = '<div>Hello, world!</div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })

})
