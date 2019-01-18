import { render, ROOT_ELEMENT } from './render'

function setState(fn) {
  if (fn) {
    fn()
  }
  render(ROOT_ELEMENT)
}

export default setState
