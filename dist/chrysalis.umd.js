(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Chrysalis = factory());
}(this, (function () { 'use strict';

  var createElement = function createElement(type, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    if (props === null) props = {};
    return {
      type: type,
      props: props,
      children: children
    };
  };

  var Chrysalis = {
    createElement: createElement
  };

  return Chrysalis;

})));
