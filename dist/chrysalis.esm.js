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

export default Chrysalis;
