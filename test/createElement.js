const assert = require('assert')
const { h } = require('../dist/chrysalis.umd')

describe('hyperscript', () => {
  it('#1', () => {
    const element = h('div', null)
    const result = {
      nodeName: 'div',
      props: {},
      children: []
    }
    assert.deepEqual(element, result)
  })

  it('#2', () => {
    const element = h('div', {})
    const result = {
      nodeName: 'div',
      props: {},
      children: []
    }
    assert.deepEqual(element, result)
  })

  it('#3', () => {
    const element = h('div', null, 'Hello, world!')
    const result = {
      nodeName: 'div',
      props: {},
      children: ['Hello, world!']
    }
    assert.deepEqual(element, result)
  })

  it('#4', () => {
    const element = h('div', {}, 'Hello, world!')
    const result = {
      nodeName: 'div',
      props: {},
      children: ['Hello, world!']
    }
    assert.deepEqual(element, result)
  })

  it('#5', () => {
    const element = h('span', null, 23)
    const result = {
      nodeName: 'span',
      props: {},
      children: [23]
    }
    assert.deepEqual(element, result)
  })

  it('#6', () => {
    const element = h('span', null, 1 + 17)
    const result = {
      nodeName: 'span',
      props: {},
      children: [18]
    }
    assert.deepEqual(element, result)
  })

  it('#7', () => {
    const element = h('span', null, null)
    const result = {
      nodeName: 'span',
      props: {},
      children: [null]
    }
    assert.deepEqual(element, result)
  })

  it('#8', () => {
    const element = h('span', null, undefined)
    const result = {
      nodeName: 'span',
      props: {},
      children: [undefined]
    }
    assert.deepEqual(element, result)
  })

  it('#9', () => {
    const element = h('span', { style: 'color: red' }, 'Hello, wold!')
    const result = {
      nodeName: 'span',
      props: { style: 'color: red' },
      children: ['Hello, wold!']
    }
    assert.deepEqual(element, result)
  })

  it('#10', () => {
    const element = h('h1', { style: 'color: red', title: 'greeting' }, 'Hello, wold!')
    const result = {
      nodeName: 'h1',
      props: { style: 'color: red', title: 'greeting' },
      children: ['Hello, wold!']
    }
    assert.deepEqual(element, result)
  })

  it('#11', () => {
    const element = h('span', { style: 'color: red' }, h('span', { style: 'color: red' }, 'Hello, wold!'))
    const result = {
      nodeName: 'span',
      props: { style: 'color: red' },
      children: [
        {
          nodeName: 'span',
          props: { style: 'color: red' },
          children: ['Hello, wold!']
        }
      ]
    }
    assert.deepEqual(element, result)
  })

  it('#12', () => {
    const element = h('span', { style: 'color: red' }, h('span', null, 'Hello, wold!'))
    const result = {
      nodeName: 'span',
      props: { style: 'color: red' },
      children: [
        {
          nodeName: 'span',
          props: {},
          children: ['Hello, wold!']
        }
      ]
    }
    assert.deepEqual(element, result)
  })
})
