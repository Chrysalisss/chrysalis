import { render, ROOT_ELEMENT } from './render'

function setState(fn) {
  fn()
  render(ROOT_ELEMENT)
}

export default setState
