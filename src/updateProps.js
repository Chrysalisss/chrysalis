import { merge, className, NULL } from './utill'
import { refs } from './refs'

function updateProps(element, newProps, oldProps, isSVG) {
  for (let name in merge(newProps, oldProps)) {

    let newValue = newProps[name]
    let oldValue = oldProps[name]

    name = isSVG 
      ? (name == className ? 'class' : name) 
      : (name == 'class' ? className : name)

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
      element[name] = newValue == NULL ? '' : newValue 
    } else if (newValue == NULL || newValue === false) {
      element.removeAttribute(name)
    } else {
      element.setAttribute(name, newValue)
    }
  }
}

export default updateProps
