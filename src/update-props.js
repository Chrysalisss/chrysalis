import {
  merge,
  clone,
  NULL,
  EMPTY_OBJ,
  FUNCTION,
  STRING,
  CHILDREN
} from './helpers/index'

function eventProxy(event) {
  this.events[event.type](event)
}

function updateProps(element, newProps, oldProps, isSVG) {
  for (let name in clone(newProps, oldProps)) {
    let newValue = newProps[name]
    let oldValue = oldProps[name]

    if (name == 'key' || name == CHILDREN) {
    } else if (name == 'style') {
      // see jsperf.com/style-vs-csstext-vs-setattribute
      if (typeof newValue == STRING) {
        element[name].cssText = newValue
      } else {
        if (typeof oldValue == STRING) oldValue = element[name].cssText = ''
        for (let i in merge(newValue, oldValue)) {
          if ((newValue || EMPTY_OBJ)[i] == (oldValue || EMPTY_OBJ)[i]) {
          } else {
            element[name].setProperty(
              // convert camelCase (if need) to kebab-case
              i[0] == '-' && i[1] == '-' ? i : i.replace(/[A-Z]/g, '-$&'),
              newValue && i in newValue
                ? typeof newValue[i] == 'number'
                  ? newValue[i] + 'px'
                  : newValue[i]
                : ''
            )
          }
        }
      }
      // see jsperf.com/charat-vs-substr-vs-substring-xii/2
    } else if (name[0] == 'o' && name[1] == 'n') {
      if (
        !((element.events || (element.events = {}))[
          // benchmark:
          // www.measurethat.net/Benchmarks/Show/2335/1/slice-vs-substr-vs-substring-with-no-end-index
          (name = name.substr(2).toLowerCase())
        ] = newValue)
      ) {
        element.removeEventListener(name, eventProxy)
      } else if (!oldValue) {
        element.addEventListener(name, eventProxy)
      }
    } else if (name == 'ref') {
      if (typeof newValue == FUNCTION) {
        newValue(element)
      } else {
        newValue.current = element
      }
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
