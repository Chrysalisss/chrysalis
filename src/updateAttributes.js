import merge from './utill'
import { refs } from './refs'

function updateAttrs($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  for (let name in merge(newAttrs, oldAttrs)) {
    if (!newAttrs[name]) {
      if (name == 'class') {
        $element.removeAttribute('class')
      } else {
        $element[name] = null
        delete $element[name]
      }
    } else if (newAttrs[name] != oldAttrs[name]) {
      if (name == 'ref') {
        if (typeof newAttrs[name] == 'string') {
          refs[newAttrs[name]] = $element
        }
        if (typeof newAttrs[name] == 'function') {
          newAttrs[name](element)
        } else {
          newAttrs[name].current = $element
        }
      } else if (name == 'dangerouslySetInnerHTML') {
        $element.innerHTML = newAttrs[name].__html
      } else if (name == 'class') {
        $element.setAttribute('class', newAttrs[name])
      } else {
        $element[name] = newAttrs[name]
      }
    }
  }
}

export default updateAttrs
