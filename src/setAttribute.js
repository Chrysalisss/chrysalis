const setAttribute = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase()
        dom.__gooactHandlers = dom.__gooactHandlers || {}
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType])
        dom.__gooactHandlers[eventType] = value
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType])
    } 

    if (key == 'checked' || key == 'value' || key == 'className') {
        dom[key] = value
    } 

    if (key == 'style' && typeof value == 'object') {
        Object.assign(dom.style, value)
    } 

    if (key == 'ref' && typeof value == 'function') {
        value(dom)
    } 

    if (key == 'key') {
        dom.__gooactKey = value
    } 

    if (typeof value != 'object' && typeof value != 'function') {
        dom.setAttribute(key, value)
    }
}

export { setAttribute }