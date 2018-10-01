(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Chrysalis = factory());
}(this, (function () { 'use strict';

  function createElement(type, props, ...children) {
    if (props === null) props = {};

    return {
    	type, 
    	props, 
    	children
    }
  }

  var Chrysalis = {
  	createElement
  };

  return Chrysalis;

})));
