const jsdom = require('jsdom')
const assert = require('assert')
const { h, render } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body></body></html>')

global.document = window.document
global.window = window

describe('render()', () => {
  const body = document.querySelector('body')

  const deleteNodes = () => {
    while (body.firstChild) {
      body.removeChild(body.firstChild)
    }
  }

  it('<div>Hello, world!</div>', () => {
    const element = h('div', null, 'Hello, world!')
    render(element, body)

    const result = '<div>Hello, world!</div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })

  it('<div class="greeting">Hello, world!</div>', () => {
    const element = h('div', { class: 'greeting' }, 'Hello, world!')
    render(element, body)

    const result = '<div class="greeting">Hello, world!</div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })

  it('<div class="greeting" style="color: red">Hello, world!</div>', () => {
    const element = h('div', { class: 'greeting', style: 'color: red' }, 'Hello, world!')
    render(element, body)

    const result = '<div class="greeting" style="color: red">Hello, world!</div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1>Hello, world!</h1></div>', () => {
    const element = h('div', null, h('h1', null, 'Hello, world!'))
    render(element, body)

    const result = '<div><h1>Hello, world!</h1></div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })

  it('<div><h1 class="greeting" style="color: red">Hello, world!</h1></div>', () => {
    const element = h('div', null, h('h1', { class: 'greeting', style: 'color: red' }, 'Hello, world!'))
    render(element, body)

    const result = '<div><h1 class="greeting" style="color: red">Hello, world!</h1></div>'

    assert.equal(global.document.body.innerHTML, result)

    deleteNodes()
  })
})
