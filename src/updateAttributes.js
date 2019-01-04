import merge from './utill'

function updateAttrs($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  for (let name in merge(newAttrs, oldAttrs)) {
    if (!newAttrs[name]) {
      if (name === 'class') {
        $el.removeAttribute('class')
      } else {
        $el[name] = null
        delete $el[name]
      }
    } else if (newAttrs[name] !== oldAttrs[name]) {
      if (name === 'class') {
        $el.setAttribute('class', newAttrs[name])
      } else {
        $el[name] = newAttrs[name]
      }
    }
  }
}

export default updateAttrs
