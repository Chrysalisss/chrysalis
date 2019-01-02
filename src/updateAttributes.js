import merge from './utill'

function updateAttributes($element, newAttrs, oldAttrs) {
  // putting attributes together and iterating
  Object.keys(merge(newAttrs, oldAttrs)).map(name => {
    if (name == 'class') {
      // TBD
    }

    if (!newAttrs[name]) {
      $element.removeAttribute(name)
    } else if (!oldAttrs[name] || newAttrs[name] !== oldAttrs[name]) {
      $element.setAttribute(name, newAttrs[name])
    }
  })
}

export default updateAttributes