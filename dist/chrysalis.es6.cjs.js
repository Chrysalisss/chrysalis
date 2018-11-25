/**
 * Chrysalis v0.9.0-β
 * Casper Søkol, 2018
 * Distributed under the MIT license
 */

'use strict';

const createElement = (type, props, ...children) => {
  if (props === null) props = {};

  return {
  	type, 
  	props, 
  	children
  }
};

const render$1 = (node = null, parent = null) => {
  const mount = parent ? (el => parent.appendChild(el)) : (el => el);
  if (typeof node == 'string' || typeof node == 'number') {
		return mount(document.createTextNode(node))
  } 

  if (typeof node == 'boolean' || node === null) {
		return mount(document.createTextNode(''))
	} 

	if (typeof node == 'object' && typeof node.type == 'function') {
		return Component.render(node, parent)
	}

	if (typeof node == 'object' && typeof node.type == 'string') {
	  const dom = mount(document.createElement(node.type));
		for (let child of [/* flatten */].concat(...node.children)) {
			render$1(child, dom);
		}
		for (let prop in node.props) {
			setAttribute(dom, prop, node.props[prop]);
		}
		return dom;
	}
};

const setAttribute$1 = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        dom.__gooactHandlers = dom.__gooactHandlers || {};
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
        dom.__gooactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
    } 

    if (key == 'checked' || key == 'value' || key == 'className') {
        dom[key] = value;
    } 

    if (key == 'style' && typeof value == 'object') {
        Object.assign(dom.style, value);
    } 

    if (key == 'ref' && typeof value == 'function') {
        value(dom);
    } 

    if (key == 'key') {
        dom.__gooactKey = value;
    } 

    if (typeof value != 'object' && typeof value != 'function') {
        dom.setAttribute(key, value);
    }
};

const patch$1 = (dom, node, paren = dom.parentNode) => {
    let replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el);

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
        let pool = {};
        let active = document.activeElement;
        [].concat(...dom.childNodes).map((child, index) => {
            let key = child.__gooactKey || `__index_${index}`;
            pool[key] = child;
        });
        [].concat(...node.children).map((child, index) => {
            let key = child.props && child.props.key || `__index_${index}`;
            dom.appendChild(pool[key] ? patch$1(pool[key], child) : render(child, dom));
            delete pool[key];
        });
        for (let key in pool) {
            let instance = pool[key].__gooactInstance;
            if (instance) instance.componentWillUnmount();
            pool[key].remove();
        }
        for (let attr of dom.attributes) dom.removeAttribute(attr.name);
        for (let prop in node.props) setAttribute(dom, prop, node.props[prop]);
        active.focus();

        return dom
    }
};

class Component$1 {
    constructor(props) {
        this.props = props || {};
        this.state = null;
    }

    static render(node, parent = null) {
        let props = Object.assign({}, node.props, {children: node.children});

        if (Component$1.isPrototypeOf(node.type)) {
            const instance = new (node.type)(props);
            instance.componentWillMount();
            instance.base = render(instance.render(), parent);
            instance.base.__gooactInstance = instance;
            instance.base.__gooactKey = node.props.key;
            instance.componentDidMount();
            return instance.base
        } else {
            return render(node.type(props), parent)
        }
    }

    static patch(dom, node, parent = dom.parentNode) {
        let props = Object.assign({}, node.props, {children: node.children});

        if (dom.__gooactInstance && dom.__gooactInstance.constructor == node.type) {
            dom.__gooactInstance.componentWillReceiveProps(props);
            dom.__gooactInstance.props = props;
            return patch(dom, dom.__gooactInstance.render(), parent)
        } 

        if (Component$1.isPrototypeOf(node.type)) {
            let ndom = Component$1.render(node, parent);
            return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom)
        } 

        if (!Component$1.isPrototypeOf(node.type)) {
            return patch(dom, node.type(props), parent)
        }
    }

    setState(nextState) {
        if (this.base && this.shouldComponentUpdate(this.props, nextState)) {
            const prevState = this.state;
            this.componentWillUpdate(this.props, nextState);
            this.state = nextState;
            patch(this.base, this.render());
            this.componentDidUpdate(this.props, prevState);
        } else {
            this.state = nextState;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state;
    }

    componentWillReceiveProps(nextProps) {
        return undefined;
    }

    componentWillUpdate(nextProps, nextState) {
        return undefined;
    }

    componentDidUpdate(prevProps, prevState) {
        return undefined;
    }

    componentWillMount() {
        return undefined;
    }

    componentDidMount() {
        return undefined;
    }

    componentWillUnmount() {
        return undefined;
    }
}

var Chrysalis = {
	createElement,
	render: render$1,
	setAttribute: setAttribute$1,
	patch: patch$1,
	Component: Component$1
};

module.exports = Chrysalis;
