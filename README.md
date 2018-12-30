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

- Lightweight (~550B min & gzip)
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

To create an virtual node you need to use hyperscript like function 

```h(nodeName, attributes, ...children)```

**nodeName** — string|function, name of node or component 

**attributes** — object|null, node attributes, if there are no attributes you must specify null

**children** (optional) — array|string|boolean|number, children for node 

```javascript
import { h } from 'chrysalis.js'

h1('p', { style: 'color: red' }, 'Hello, 世界!')

// {
//   nodeName: 'p',
//   attributes: { style: 'color: red' },
//   children: ['Hello, 世界!']
// }
```


### Using JSX
You can also create elements with [JSX](https://facebook.github.io/jsx/)

- Install [babel-plugin-transform-react-jsx
](https://www.npmjs.com/package/babel-plugin-transform-react-jsx)
- Configurate .babelrc (or other config file)

```javascript
// .babelrc (v7):
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h" 
    }]
  ]
}
```

### Rendering an element into the DOM

```render(VNode, parentNode, callback)``` 

**nodeName** — string|function, virtual node

**parentNode** — object, parent node

**callback** (optional) — function, callback function

```javascript
import { h, render } from 'chrysalis.js'

const element = <h1>Hello, 世界!</h1>

render(element, docment.getElementById('app'))
```

### Updating the rendered element

```updateElement(parentNode, newNode, oldNode)```

**parentNode** — object, parent node for newNode/oldNode

**newNode** (optional) — object, new virtual node

**oldNode** (optional) — object, old virtual node

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

> You must start component names with a capital letter

```javascript
import { h, render } from 'chrysalis.js'

const Time = () => <p>Time is {new Date().toLocaleTimeString()}.</p>

// creating componant with props
const Greeting = ({ toWhat }) => {
  return (
    <div>
      <h1>Hello, {toWhat}!</h1>
      <Time />
    </div>
  )
} 

render(<Greeting toWaht="World" />, docment.getElementById('app'))
```

# TODO

In order of priority

- [] Statefull components with lifecycle methods
- [] Key attribute
- [] Router 
- [] Full JSX support
- [] State manager
- [] Official site


# License
Released under the [MIT](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE) License.