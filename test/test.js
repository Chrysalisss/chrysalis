const assert = require('assert');
const { h } = require('../dist/chrysalis.umd')

describe('Basic Mocha String Test', () =>  {

 it('empty div', () => {
        const element = h('div', null)
        const result = {
          nodeName: 'div',
          attributes: {},
          children: []
        }
        assert.deepEqual(element, result);
    })
})