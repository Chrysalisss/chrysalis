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

})