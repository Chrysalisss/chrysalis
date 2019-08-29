const jsdom = require('jsdom')
const assert = require('assert')

const { JSDOM } = jsdom
const { window } = new JSDOM(
  '<!doctype html><html><body><div id="app"></div></body></html>'
)

global.document = window.document
global.window = window

const { h, render } = require('../dist/chrysalis.umd')

describe('start()', () => {
  const container = document.querySelector('#app')

  it('#1', () => {
    const element = (
      <div class="greeting" style={{ 'line-height': 19 }}>
        <h1 style={{ fontSize: '24px' }}>みなさん、こんにちは</h1>
      </div>
    )

    render(element, container)

    const result =
      '<div class="greeting" style="line-height: 19px;"><h1 style="font-size: 24px;">みなさん、こんにちは</h1></div>'

    assert.equal(container.innerHTML, result)
  })

  it('#2', () => {
    const element = (
      <div class="greeting" style={{ 'line-height': 19 }}>
        <h1 style={{ fontSize: '24px' }}>みなさん、こんにちは</h1>
      </div>
    )

    render(element, container, () => console.log('cb is works!'))

    const result =
      '<div class="greeting" style="line-height: 19px;"><h1 style="font-size: 24px;">みなさん、こんにちは</h1></div>'

    assert.equal(container.innerHTML, result)
  })

  it('#3', () => {
    const Component = ({ greeting }) => (
      <div class={greeting} style={{ 'line-height': 19 }}>
        <h1 style={{ fontSize: '24px' }}>みなさん、こんにちは</h1>
      </div>
    )

    const App = () => <Component greeting="greeting" />

    render(<App />, container)

    const result =
      '<div class="greeting" style="line-height: 19px;"><h1 style="font-size: 24px;">みなさん、こんにちは</h1></div>'

    assert.equal(container.innerHTML, result)
  })

  it('#4', () => {
    const Component = ({ greeting, children }) => (
      <div class={greeting} style={{ 'line-height': 19 }}>
        {children}
      </div>
    )

    const App = () => (
      <Component greeting="greeting">
        <h1 style={{ fontSize: '24px' }}>みなさん、こんにちは</h1>
      </Component>
    )

    render(<App />, container)

    const result =
      '<div class="greeting" style="line-height: 19px;"><h1 style="font-size: 24px;">みなさん、こんにちは</h1></div>'

    assert.equal(container.innerHTML, result)
  })
})
