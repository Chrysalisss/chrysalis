import { start, ROOT_ELEMENT } from './start'

function setState(fn) {
  if (fn) {
    fn()
  }

  start(ROOT_ELEMENT)
}

export default setState
