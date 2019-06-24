import { merge } from './utill'
import { refs } from './refs'

function updateProps(element, newProps, oldProps) {
  // putting props together and iterating
  for (let name in merge(newProps, oldProps)) {
    if (!newProps[name]) {
      if (name == 'class') {
        element.removeAttribute('class')
      } else {
        element[name] = null
        delete element[name]
      }
    } else if (newProps[name] != oldProps[name]) {
      if (name == 'ref') {
        if (typeof newProps[name] == 'string') {
          refs[newProps[name]] = element
        } else if (typeof newProps[name] == 'function') {
          newProps[name](element)
        } else {
          newProps[name].current = element
        }
      } else if (name == 'dangerouslySetInnerHTML') {
        element.innerHTML = newProps[name].__html
      } else if (name == 'class') {
        element.setAttribute('class', newProps[name])
      } else {
        element[name] = newProps[name]
      }
    }
  }
}

export default updateProps
