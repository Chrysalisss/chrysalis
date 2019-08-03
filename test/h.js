const jsdom = require('jsdom')
const assert = require('assert')

const { JSDOM } = jsdom
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>')

global.document = window.document
global.window = window

const { h, createRef } = require('../dist/chrysalis.umd')

describe('h()', () => {
  it('#1', () => {
    const element = h('div', null)
    const result = {
      name: 'div',
      props: {},
      childNodes: []
    }
    assert.deepEqual(element, result)
  })

  it('#2', () => {
    const element = <div id="main"/>
    const result = {
      name: 'div',
      props: { id: 'main' },
      childNodes: []
    }
    assert.deepEqual(element, result)
  })

  it('#3', () => {
    const element = <div>Hello, world!</div>
    const result = {
      name: 'div',
      props: {},
      childNodes: ['Hello, world!']
    }
    assert.deepEqual(element, result)
  })

  it('#4', () => {
    const element = <div />
    const result = {
      name: 'div',
      props: {},
      childNodes: []
    }
    assert.deepEqual(element, result)
  })

  it('#5', () => {
    const element = <span>23</span>
    const result = {
      name: 'span',
      props: {},
      childNodes: [23]
    }
    assert.deepEqual(element, result)
  })

  it('#6', () => {
    const element = h('span', {}, 1 + 17)
    const result = {
      name: 'span',
      props: {},
      childNodes: [18]
    }
    assert.deepEqual(element, result)
  })

  it('#7', () => {
    const element = <span>{null}</span>
    const result = {
      name: 'span',
      props: {},
      childNodes: []
    }
    assert.deepEqual(element, result)
  })

  it('#8', () => {
    const element = <span>{undefined}</span>
    const result = {
      name: 'span',
      props: {},
      childNodes: []
    }
    assert.deepEqual(element, result)
  })

  it('#9', () => {
    const element = <span style={{ color: 'red', fontSize: '24px'}}>Hello, world!</span>
    const result = {
      name: 'span',
      props: { style: { color: 'red', fontSize: '24px'} },
      childNodes: ['Hello, world!']
    }
    assert.deepEqual(element, result)
  })

  it('#10', () => {
    const element = <h1 title="greeting">Hello, world!</h1>
    const result = {
      name: 'h1',
      props: { title: 'greeting' },
      childNodes: ['Hello, world!']
    }
    assert.deepEqual(element, result)
  })

  it('#11', () => {
    const styles = { color: 'red' }
    const element = <div style={styles}><span style={styles}>Hello, wold!</span></div>
    const result = {
      name: 'div',
      props: { style: { color: 'red' } },
      childNodes: [
        {
          name: 'span',
          props: { style: { color: 'red' } },
          childNodes: ['Hello, wold!']
        }
      ]
    }
    assert.deepEqual(element, result)
  })

  it('#12', () => {
    const element = <div style={{ color: 'red' }}><span>Hello, wold!</span></div>
    const result = {
      name: 'div',
      props: { style: { color: 'red' } },
      childNodes: [
        {
          name: 'span',
          props: {},
          childNodes: ['Hello, wold!']
        }
      ]
    }
    assert.deepEqual(element, result)
  })
})
