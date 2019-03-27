const jsdom = require('jsdom')
const assert = require('assert')
const { h, start, setState, refs, createRef } = require('../dist/chrysalis.umd')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window

describe('start()', () => {
  const container = document.querySelector('#app')

  it('#1', () => {
    const state = {
      title: 'みなさん、こんにちは',
      style: 'color: green'
    }

    global.App = () => {
      return (
        <div class="greeting">
          <h1>{state.title}</h1>
          <span style={state.style}>Hello World!</span>
        </div>
      )
    }

    start(container)

    const result =
      '<div class="greeting"><h1>みなさん、こんにちは</h1><span style="color: green;">Hello World!</span></div>'

    assert.equal(container.innerHTML, result)
  })

  it('#2', () => {
    const Hello = ({ toWhat }) => {
      return (
        <div style="color: red">
          <h1>Hello, {toWhat}!</h1>
        </div>
      )
    }

    const state = {
      name: 'Patrick'
    }

    global.App = () => {
      return (
        <div class="greeting">
          <Hello toWhat={state.name} />
        </div>
      )
    }

    start(container)

    const result = '<div class="greeting"><div style="color: red;"><h1>Hello, Patrick!</h1></div></div>'

    assert.equal(container.innerHTML, result)
  })

  it('#3', () => {
    const state = {
      time: new Date()
    }

    global.App = () => {
      return (
        <div class="greeting" ref="main">
          <h1>Time is {state.time.toLocaleTimeString()}</h1>
        </div>
      )
    }

    setInterval(() => setState(() => (state.time = new Date())), 1000)

    start(container)

    const result = `<div class="greeting"><h1>Time is ${state.time.toLocaleTimeString()}</h1></div>`

    assert.equal(container.innerHTML, result)
  })

  it('#4', () => {
    const state = {
      count: 0
    }

    const methods = {
      up: () => setState(() => state.count++),
      down: () => setState(() => state.count--)
    }

    const main = createRef()

    global.App = () => {
      return (
        <div class="greeting" ref={main}>
          <h1>This is simple counter</h1>
          <p>{state.count}</p>
          <button onclick={() => methods.up()}>add</button>
          <button onclick={() => methods.down()}>minus</button>
        </div>
      )
    }

    start(container)

    const result = `<div class="greeting"><h1>This is simple counter</h1><p>0</p><button>add</button><button>minus</button></div>`

    assert.equal(container.innerHTML, result)
  })
})
