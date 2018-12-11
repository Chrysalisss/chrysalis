const assert = require('assert');
const { h } = require('../dist/chrysalis.umd')

describe("h()", () =>  {

  it("h('div', null)", () => {
        const element = h('div', null)
        const result = {
          nodeName: 'div',
          attributes: {},
          children: []
        }
        assert.deepEqual(element, result);
    })

  it("h('div', {})", () => {
      const element = h('div', {})
      const result = {
        nodeName: 'div',
        attributes: {},
        children: []
      }
      assert.deepEqual(element, result);
  })

  it("h('div', null, 'Hello, world!')", () => {
    const element = h('div', null, 'Hello, world!')
    const result = {
      nodeName: 'div',
      attributes: {},
      children: ['Hello, world!']
    }
    assert.deepEqual(element, result);
  })

  it("h('div', {}, 'Hello, world!')", () => {
    const element = h('div', {}, 'Hello, world!')
    const result = {
      nodeName: 'div',
      attributes: {},
      children: ['Hello, world!']
    }
    assert.deepEqual(element, result);
  })

  it("h('span', null, 23)", () => {
    const element = h('span', null, 23)
    const result = {
      nodeName: 'span',
      attributes: {},
      children: [23]
    }
    assert.deepEqual(element, result);
  })

  it("h('span', null, 1 + 17)", () => {
    const element = h('span', null, 1 + 17)
    const result = {
      nodeName: 'span',
      attributes: {},
      children: [18]
    }
    assert.deepEqual(element, result);
  })

  it("h('span', null, null)", () => {
    const element = h('span', null, null)
    const result = {
      nodeName: 'span',
      attributes: {},
      children: [null]
    }
    assert.deepEqual(element, result);
  })

  it("h('span', null, undefined)", () => {
    const element = h('span', null, undefined)
    const result = {
      nodeName: 'span',
      attributes: {},
      children: [undefined]
    }
    assert.deepEqual(element, result);
  })

  it("h('span', { style: 'color: red' }, 'Hello, wold!')", () => {
    const element = h('span', { style: 'color: red' }, 'Hello, wold!')
    const result = {
      nodeName: 'span',
      attributes: { style: "color: red" },
      children: ['Hello, wold!']
    }
    assert.deepEqual(element, result);
  })

  it("h('h1', { style: 'color: red', title: 'greeting' }, 'Hello, wold!')", () => {
    const element = h('h1', { style: 'color: red', title: 'greeting' }, 'Hello, wold!')
    const result = {
      nodeName: 'h1',
      attributes: { style: "color: red", title: 'greeting' },
      children: ['Hello, wold!']
    }
    assert.deepEqual(element, result);
  })

  it("h('div', { style: 'color: red' }, h('span', { style: 'color: red' }, 'Hello, wold!'))", () => {
    const element = h('span', { style: 'color: red' }, h('span', { style: 'color: red' }, 'Hello, wold!'))
    const result = {
      nodeName: 'span',
      attributes: { style: "color: red" },
      children: [{
        nodeName: 'span',
        attributes: { style: "color: red" },
        children: ['Hello, wold!']
      }]
    }
    assert.deepEqual(element, result);
  })

  it("h('div', { style: 'color: red' }, h('span', null, 'Hello, wold!'))", () => {
    const element = h('span', { style: 'color: red' }, h('span', null, 'Hello, wold!'))
    const result = {
      nodeName: 'span',
      attributes: { style: "color: red" },
      children: [{
        nodeName: 'span',
        attributes: {},
        children: ['Hello, wold!']
      }]
    }
    assert.deepEqual(element, result);
  })
})