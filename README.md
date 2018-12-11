![](/chrysalis.svg)

<p align="center">A lightweight JS-library for building fast, modern &amp; scalable applications</p>

<p align="center">
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://img.shields.io/npm/v/chrysalis.js.svg?style=flat-square" alt="npm"></a>
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://flat.badgen.net/npm/dm/chrysalis.js" alt="npm"></a>
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://img.shields.io/david/Chrysalisss/chrysalis.svg?style=flat-square" alt="none dependencies"></a>
	<a href="https://github.com/standard/standard"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Code style"></a>
	<a href="https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Chrysalisss/chrysalis.svg?style=flat-square" alt="License"></a>
</p>

### Why use?

- Lightweight (575b min & gzip)
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

**attributes** — object with node attributes. If there are no attributes you must specify null

**children** (optional) — array|string with node children or with text node 

```javascript
import { h } from 'chrysalis.js'

h1('p', { style: 'color: red' }, 'Hello, 世界!')

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

const element = <h1>Hello, 世界!</h1>

render(element, docment.getElementById('app'))
```

### Updating the rendered element

```updateElement(parentNode, newNode, oldNode)```

**parent** — object, parent node for newNode/oldNode

**newNode** — object, new Virtual node

**oldNode** (optional) — object, old Virtual node

```javascript
import { h, render, updateElement } from 'chrysalis.js'

const app = docment.getElementById('app')

const element = <h1 style="color: green">Hello, 世界!</h1>
const element2 = <h1>Hello, World!</h1>

render(element, app)
updateElemnent(app, element2, element)
```

### Creating component 

You can easily create functional stateless components

```javascript
import { h, render } from 'chrysalis.js'

const element = name => <h1 style="color: green">Hello, { name }!</h1>

render(element('世界'), docment.getElementById('app'))
```

# License
Released under the [MIT](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE) License.