import merge from './utill'

function updateAttrs($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  for (let name in merge(newAttrs, oldAttrs)) {
    if (!newAttrs[name]) {
      $element.removeAttribute(name)
    } else if (!oldAttrs[name] || newAttrs[name] !== oldAttrs[name]) {
      $element.setAttribute(name, newAttrs[name])
    }
  }
}

export default updateAttrs
