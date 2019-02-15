const jsdom = require('jsdom')
const assert = require('assert')
const { h, start } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window

describe('start()', () => {
  const container = document.querySelector('#app')

  const deleteNodes = () => {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  it('<div><span>Hello World!</span></div>', () => {
    global.App = () => {
      return (
        <div>
          <span>Hello World!</span>
        </div>
      )
    }

    start(container)

    const result = '<div><span>Hello World!</span></div>'

    assert.equal(container.innerHTML, result)

    deleteNodes()
  })
})
