export class Component {
    constructor(props) {
        this.props = props || {};
        this.state = null;
    }

    static render(node, parent=null) {
        let props = Object.assign({}, node.props, {children: node.children})

        if (Component.isPrototypeOf(node.type)) {
            const instance = new (node.type)(props)
            instance.componentWillMount()
            instance.base = render(instance.render(), parent)
            instance.base.__gooactInstance = instance
            instance.base.__gooactKey = node.props.key
            instance.componentDidMount()
            return instance.base
        } else {
            return render(node.type(props), parent)
        }
    }

    static patch(dom, node, parent=dom.parentNode) {
        let props = Object.assign({}, node.props, {children: node.children})

        if (dom.__gooactInstance && dom.__gooactInstance.constructor == node.type) {
            dom.__gooactInstance.componentWillReceiveProps(props);
            dom.__gooactInstance.props = props;
            return patch(dom, dom.__gooactInstance.render(), parent)
        } 

        if (Component.isPrototypeOf(node.type)) {
            let ndom = Component.render(node, parent)
            return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom)
        } 

        if (!Component.isPrototypeOf(node.type)) {
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