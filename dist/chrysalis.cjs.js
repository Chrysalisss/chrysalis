'use strict';

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

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var render$1 = function render() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var mount = parent ? function (el) {
    return parent.appendChild(el);
  } : function (el) {
    return el;
  };

  if (typeof node == 'string' || typeof node == 'number') {
    return mount(document.createTextNode(node));
  }

  if (typeof node == 'boolean' || node === null) {
    return mount(document.createTextNode(''));
  }

  if (_typeof(node) == 'object' && typeof node.type == 'function') {
    return Component.render(node, parent);
  }

  if (_typeof(node) == 'object' && typeof node.type == 'string') {
    var dom = mount(document.createElement(node.type));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (_ref = [
        /* flatten */
      ]).concat.apply(_ref, _toConsumableArray(node.children))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref;

        var child = _step.value;
        render(child, dom);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    for (var prop in node.props) {
      setAttribute(dom, prop, node.props[prop]);
    }

    return dom;
  }
};

var setAttribute$1 = function setAttribute(dom, key, value) {
  if (typeof value == 'function' && key.startsWith('on')) {
    var eventType = key.slice(2).toLowerCase();
    dom.__gooactHandlers = dom.__gooactHandlers || {};
    dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
    dom.__gooactHandlers[eventType] = value;
    dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
  }

  if (key == 'checked' || key == 'value' || key == 'className') {
    dom[key] = value;
  }

  if (key == 'style' && _typeof(value) == 'object') {
    Object.assign(dom.style, value);
  }

  if (key == 'ref' && typeof value == 'function') {
    value(dom);
  }

  if (key == 'key') {
    dom.__gooactKey = value;
  }

  if (_typeof(value) != 'object' && typeof value != 'function') {
    dom.setAttribute(key, value);
  }
};

var patch = function patch(dom, node) {
  var paren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dom.parentNode;
  var replace = parent ? function (el) {
    return parent.replaceChild(el, dom) && el;
  } : function (el) {
    return el;
  };

  if (_typeof(node) == 'object' && typeof node.type == 'function') {
    return Component.patch(dom, node, parent);
  }

  if (_typeof(node) != 'object' && dom instanceof Text) {
    return dom.textContent != node ? replace(render(node, parent)) : dom;
  }

  if (_typeof(node) == 'object' && dom instanceof Text) {
    return replace(render(node, parent));
  }

  if (_typeof(node) == 'object' && dom.nodeName != node.type.toUpperCase()) {
    return replace(render(node, parent));
  }

  if (_typeof(node) == 'object' && dom.nodeName == node.type.toUpperCase()) {
    var _ref, _ref2;

    var pool = {};
    var active = document.activeElement;

    (_ref = []).concat.apply(_ref, _toConsumableArray(dom.childNodes)).map(function (child, index) {
      var key = child.__gooactKey || "__index_".concat(index);
      pool[key] = child;
    });

    (_ref2 = []).concat.apply(_ref2, _toConsumableArray(node.children)).map(function (child, index) {
      var key = child.props && child.props.key || "__index_".concat(index);
      dom.appendChild(pool[key] ? patch(pool[key], child) : render(child, dom));
      delete pool[key];
    });

    for (var key in pool) {
      var instance = pool[key].__gooactInstance;
      if (instance) instance.componentWillUnmount();
      pool[key].remove();
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = dom.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var attr = _step.value;
        dom.removeAttribute(attr.name);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    for (var prop in node.props) {
      setAttribute(dom, prop, node.props[prop]);
    }

    active.focus();
    return dom;
  }
};

var Chrysalis = {
  createElement: createElement,
  render: render$1,
  setAttribute: setAttribute$1,
  patch: patch
};

module.exports = Chrysalis;
