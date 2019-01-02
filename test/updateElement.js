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

  it('<h1>Hello, world!</h1>', () => {
    const element1 = <h1>Hello</h1>
    const element2 = <h1>Hello, world!</h1>

    render(element1, app)
    updateElement(element2, element1)

    const result = '<h1>Hello, world!</h1>'

    assert.strictEqual(app.innerHTML, result)

    deleteNodes()
  })

  it('<h1 style="color: purple">Hello, world!</h1>', () => {
    const element1 = <h1>Hello</h1>
    const element2 = <h1 style="color: purple">Hello, world!</h1>

    render(element1, app)
    updateElement(element2, element1)

    const result = '<h1 style="color: purple">Hello, world!</h1>'

    assert.strictEqual(app.innerHTML, result)

    deleteNodes()
  })

  it('<div style="color: purple">Hello, world!</div>', () => {
    const element1 = <h1>Hello</h1>
    const element2 = <div style="color: purple">Hello, world!</div>

    render(element1, app)
    updateElement(element2, element1)

    const result = '<div style="color: purple">Hello, world!</div>'

    assert.strictEqual(app.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1>Hey!</h1></div>', () => {
    const element1 = <div />
    const element2 = (
      <div>
        <h1>Hey!</h1>
      </div>
    )

    render(element1, app)
    updateElement(element2, element1)

    const result = '<div><h1>Hey!</h1></div>'

    assert.strictEqual(app.innerHTML, result)

    deleteNodes()
  })
})
