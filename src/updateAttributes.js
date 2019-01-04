import merge from './utill'

function updateAttrs($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  for (let name in merge(newAttrs, oldAttrs)) {
    if (!newAttrs[name]) {
      if (name === 'class') {
        $element.removeAttribute('class')
      } else {
        $element[name] = null
        delete $element[name]
      }
    } else if (newAttrs[name] !== oldAttrs[name]) {
      if (name === 'class') {
        $element.setAttribute('class', newAttrs[name])
      } else {
        $element[name] = newAttrs[name]
      }
    }
  }
}

export default updateAttrs
