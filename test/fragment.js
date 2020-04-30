const jsdom = require('jsdom')
const assert = require('assert')

const { JSDOM } = jsdom
const { window } = new JSDOM(
  '<!doctype html><html><body><div id="app"></div></body></html>'
)

global.document = window.document
global.window = window

const { h, render } = require('../dist/chrysalis.umd')

describe('fragments', () => {
  const container = document.querySelector('#app')

  it('#1', () => {
    const element = [<h1>Hello</h1>]

    render(element, container)

    const result = '<h1>Hello</h1>'

    assert.equal(container.innerHTML, result)
  })

  it('#2', () => {
    const element = [<h1>Hello</h1>, <h1>World</h1>]

    render(element, container)

    const result = '<h1>Hello</h1><h1>World</h1>'

    assert.equal(container.innerHTML, result)
  })
})
