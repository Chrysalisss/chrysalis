const jsdom = require('jsdom')
const assert = require('assert')
const { h, start } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window

describe('start()', () => {
  const container = document.querySelector('#app')

  it('simple page', () => {
    global.App = () => {
      return (
        <div class="greeting">
          <h1>みなさん、こんにちは</h1>
          <span style="color: green">Hello World!</span>
        </div>
      )
    }

    start(container)

    const result =
      '<div class="greeting"><h1>みなさん、こんにちは</h1><span style="color: green;">Hello World!</span></div>'

    assert.equal(container.innerHTML, result)
  })
})
