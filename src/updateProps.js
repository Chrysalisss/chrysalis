import { merge } from './utill'
import { refs } from './refs'

function updateProps(element, newProps, oldProps, isSVG) {
  for (let name in merge(newProps, oldProps)) {

    let newValue = newProps[name]
    let oldValue = oldProps[name]

    name = isSVG 
      ? (name == 'className' ? 'class' : name) 
      : (name == 'class' ? 'className' : name)

    if (name == 'key') {   
    } else if (name == 'style') {
      for (let i in merge(newValue, oldValue)) {
        if ((newValue || {})[i] == (oldValue || {})[i]) {
          
        } else {
          element.style.setProperty(
            (i[0] == '-' && i[1] == '-') ? i : i.replace(/[A-Z]/g, '-$&'),
            (newValue && (i in newValue))
            ? (typeof newValue[i] == 'number')
              ? newValue[i] + 'px'
              : newValue[i]
              : ''
          )
        }
      }
    } else if (name[0] == 'o' && name[1] == 'n') {
      name = name.slice(2).toLowerCase()
      console.log(element, newValue, name)
      if (newValue) {
        element.addEventListener(name, newValue)
      } else {
        element.removeEventListener(name)
      }
    } else if (name == 'ref') {
      if (typeof newValue == 'string') {
        refs[newValue] = element
      } else if (typeof newValue == 'function') {
         newValue(element)
      } else {
        newValue.current = element
      }
    } else if (name == 'dangerouslySetInnerHTML') {
      element.innerHTML =  newValue.__html 
    } else if (!isSVG && name != 'list' && name in element) {
      element[name] = newValue == null ? '' : newValue 
    } else if (newValue == null || value === false) {
      element.removeAttribute(name)
    } else {
      element.setAttribute(name, newValue)
    }
  }
}

export default updateProps
