# Chrysalis
![](/chrysalis.svg)
A lightweight JS-library for building fast, modern &amp; scalable applications

### Why use?

- Lighweight (688b min & gzip)
- Fast due to Virtual DOM inside 
- Flexible
- IE9 support

# Install

via [npm](https://www.npmjs.com/package/chrysalis.js)
```bash
npm install chrysalis.js
```
# Usage
### Creating virtual node

To create an virtual node you need to use hyperScript like function 

```h(nodeName, attributes, ...children)```

**nodeName** — string, node tag name 

**attributes** (optional) — object with node attributes

**children** (optional) — array|string with node children 

```javascript
import { h } from 'chrysalis.js'

h('p', { style: 'color: red' }, 'Hello, 世界!')

// {
//   nodeName: 'p',
//   attributes: { style: 'color: red' },
//   children: ['Hello, 世界!']
// }
```

You can also create elements with [JSX](https://jsx.github.io/)

- Install [babel-plugin-transform-react-jsx
](https://www.npmjs.com/package/babel-plugin-transform-react-jsx)
- Configurate .babelrc (or other config file)

```javascript
// .babelrc:
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h" 
    }]
  ]
}
```

### Rendering an element into the DOM

```render(VNode, parentNode)``` 

**nodeName** — string|function, Virtual node

**parentNode** — object, parent node


```javascript
import { h, render } from 'chrysalis.js'

const element = h('p', { style: 'color: red' }, 'Hello, 世界!')

render(element, docment.getElementById('app'))
```


### Updating the rendered element

```updateElement(parent, newNode, oldNode)```

**parent** — object, parent node for newNode/oldNode

**newNode** (optional) — object, new Virtual node

**oldNode** (optional) — object, old Virtual node

### Creating component 

You can easily create functional stateless components

```javascript
import { h, render, updateElement } from 'chrysalis.js'

const element = name => h('p', { style: 'color: red' }, `Hello, ${ name }!`)

render(element('世界'), docment.getElementById('app'))
```

# License
Released under the [MIT](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE) License.