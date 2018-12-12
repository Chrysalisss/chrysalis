const jsdom = require('jsdom')
const assert = require('assert')
const { h, render } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body></body></html>')

global.document = window.document
global.window = window

describe('render()', () => {
  const element = h('div', null, 'Hello, world!')

  it('<div>Hello, world!</div>', () => {
    const body = document.querySelector('body')
    render(element, body)

    const result = '<div>Hello, world!</div>'

    assert.deepEqual(global.document.body.innerHTML, result)
  })
})
