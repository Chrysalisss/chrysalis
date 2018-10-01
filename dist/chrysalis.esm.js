function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (props === null) props = {};
  return {
    type: type,
    props: props,
    children: children
  };
}

var Chrysalis = {
  createElement: createElement
};

export default Chrysalis;
