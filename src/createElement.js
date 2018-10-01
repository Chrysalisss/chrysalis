export default function createElement(type, props, ...children) {
  if (props === null) props = {}

  return {
  	type, 
  	props, 
  	children
  }
}
