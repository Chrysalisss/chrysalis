const patch = (dom, node, paren = dom.parentNode) => {
    let replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el)

    if (typeof node == 'object' && typeof node.type == 'function') {
        return Component.patch(dom, node, parent)
    } 

    if (typeof node != 'object' && dom instanceof Text) {
        return dom.textContent != node ? replace(render(node, parent)) : dom
    } 

    if (typeof node == 'object' && dom instanceof Text) {
        return replace(render(node, parent))
    } 

    if (typeof node == 'object' && dom.nodeName != node.type.toUpperCase()) {
        return replace(render(node, parent))
    } 

    if (typeof node == 'object' && dom.nodeName == node.type.toUpperCase()) {
        let pool = {}
        let active = document.activeElement;
        [].concat(...dom.childNodes).map((child, index) => {
            let key = child.__gooactKey || `__index_${index}`
            pool[key] = child
        });
        [].concat(...node.children).map((child, index) => {
            let key = child.props && child.props.key || `__index_${index}`
            dom.appendChild(pool[key] ? patch(pool[key], child) : render(child, dom))
            delete pool[key];
        });
        for (let key in pool) {
            let instance = pool[key].__gooactInstance
            if (instance) instance.componentWillUnmount()
            pool[key].remove()
        }
        for (let attr of dom.attributes) dom.removeAttribute(attr.name)
        for (let prop in node.props) setAttribute(dom, prop, node.props[prop])
        active.focus()

        return dom
    }
}

export { patch }