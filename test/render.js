const jsdom = require('jsdom')
const assert = require('assert')
const { h, render } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window
global.navigator = { userAgent: 'node.js' }

describe('render()', () => {
  const app = document.querySelector('#app')

  const deleteNodes = () => {
    while (app.firstChild) {
      app.removeChild(app.firstChild)
    }
  }

  it('<div></div>', () => {
    const element = <div></div>
    render(element, app)

    const result = '<div></div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div>Hello, world!</div>', () => {
    const element = <div>Hello, world!</div>
    render(element, app)

    const result = '<div>Hello, world!</div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div class="greeting">Hello, world!</div>', () => {
    const element = <div class="greeting">Hello, world!</div>
    render(element, app)

    const result = '<div class="greeting">Hello, world!</div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div class="greeting" style="color: red">Hello, world!</div>', () => {
    const element = <div class="greeting" style="color: red">Hello, world!</div>
    render(element, app)

    const result = '<div class="greeting" style="color: red">Hello, world!</div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1>Hello, world!</h1></div>', () => {
    const element = <div><h1>Hello, world!</h1></div>
    render(element, app)

    const result = '<div><h1>Hello, world!</h1></div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1 class="greeting" style="color: red">Hello, world!</h1></div>', () => {
    const element = <div><h1 class="greeting" style="color: red">Hello, world!</h1></div>
    render(element, app)

    const result = '<div><h1 class="greeting" style="color: red">Hello, world!</h1></div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1 class="greeting" style="color: red">6</h1></div>', () => {
    const element = <div><h1 class="greeting" style="color: red">6</h1></div>
    render(element, app)

    const result = '<div><h1 class="greeting" style="color: red">6</h1></div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1 style="color: red">undefined</h1></div>', () => {
    const element = <div><h1 style="color: red">undefined</h1></div>
    render(element, app)

    const result = '<div><h1 style="color: red">undefined</h1></div>'

    assert.equal(app.innerHTML, result)

    deleteNodes()
  })
})
