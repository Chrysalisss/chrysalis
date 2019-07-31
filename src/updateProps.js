import { refs } from './refs'

import { clone, className, NULL, EMPTY_OBJ, CLASS, FUNCTION } from './helpers/index'

function eventProxy(event) {
  return event.currentTarget.events[event.type](event)
}

function updateProps(element, newProps, oldProps, isSVG) {
  for (let name in clone(newProps, oldProps)) {
    let newValue = newProps[name]
    let oldValue = oldProps[name]

    name = isSVG ? (name == className ? CLASS : name) : name == CLASS ? className : name

    if (name == 'key') {
    } else if (name == 'style') {
      for (let i in merge(newValue, oldValue)) {
        if ((newValue || EMPTY_OBJ)[i] == (oldValue || EMPTY_OBJ)[i]) {
        } else {
          element.style.setProperty(
            i[0] == '-' && i[1] == '-' ? i : i.replace(/[A-Z]/g, '-$&'),
            newValue && i in newValue
              ? typeof newValue[i] == 'number'
                ? newValue[i] + 'px'
                : newValue[i]
              : ''
          )
        }
      }
    } else if (name[0] === 'o' && name[1] === 'n') {
      if (
        !((element.events || (element.events = {}))[
          (name = name.slice(2).toLowerCase())
        ] = newValue)
      ) {
        element.removeEventListener(name, eventProxy)
      } else if (!oldValue) {
        element.addEventListener(name, eventProxy)
      }
    } else if (name == 'ref') {
      if (typeof newValue == 'string') {
        refs[newValue] = element
      } else if (typeof newValue == FUNCTION) {
        newValue(element)
      } else {
        newValue.current = element
      }
    } else if (name == 'dangerouslySetInnerHTML') {
      element.innerHTML = newValue.__html
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
