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

- Lightweight (~600B min & gzip), zero dependencies
- Fast due to Virtual DOM inside 
- Flexible
- IE6 support (no polyfills required)

# Install

You can start develop with [Chrysalis Starter Kit](https://github.com/Chrysalisss/Chrysalis-starter-kit)

via [npm](https://www.npmjs.com/package/chrysalis.js)
```bash
npm install chrysalis.js
```

via [CDN](https://unpkg.com/chrysalis.js@0.14.0/dist/chrysalis.umd.js)
```HTML
<script src="https://unpkg.com/chrysalis.js@0.14.0/dist/chrysalis.umd.js">
```
# Let's create the first application!

### Import Chrysalis

```javascript
import { h, start, setState } from 'chrysalis.js'
```

```h(nodeName, attributes, ...children)``` — creating elements

```start(parentNode, callback)``` — run the application

```setState(fn)``` — control under the app state

### Using JSX

Highly recommended to use [JSX
](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) for for easier creation of elements

#### Set up the jsx-pragma

Use ```.babelrc``` config file

**Babel 7**
```javascript
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h" 
    }]
  ]
}
```

**Babel 6**
```javascript
{
  "plugins": [
    ["transform-react-jsx", { "pragma":"h" }]
  ]
}
```

### Getting Started

First, declare the App function (the name should be strictly like this) and run the application

```javascript
import { h, start } from 'chrysalis.js'

// define a root element for our app
const container = document.getElementById('app')

const App = () => {
  return (
    // code will be here
  )
}

start(container)
```

### Creating Simple Elements

Well, now we create simple elements

```javascript
import { h, start } from 'chrysalis.js'

const container = document.getElementById('app')

const App = () => {
  return (
    <div>
      <h1>Hello, 世界!</h1>
    </div>
  )
}

start(container)
```

### First Component

But how best to organize an application if there are a lot of elements? Simple — separate them into components.

```javascript
import { h, start } from 'chrysalis.js'

const container = document.getElementById('app')

// You must start component names with a capital letter
const Greeting = () => <h1>Hello, 世界!</h1>

const App = () => {
  return (
    <div>
      <Greeting />
    </div>
  )
}

start(container)
```

To make the components reusable, you can use props

```javascript
import { h, start } from 'chrysalis.js'

const container = document.getElementById('app')

const Hello = ({ toWhat }) => <h1>Hello, { toWhat }!</h1>

const App = () => {
  return (
    <div>
      <Hello toWhat="World" />
    </div>
  )
}

start(container)
```

Of course, you can put each component in a separate file

**main.js**
```javascript
import { h, start } from 'chrysalis.js'
import Hello from './Hello'

const container = document.getElementById('app')

const App = () => {
  return (
    <div>
      <Hello toWhat="World" />
    </div>
  )
}

start(container)
```

**Hello.js**
```javascript
import { h } from 'chrysalis.js'

const Hello = ({ toWhat }) => {
  return <h1>Hello, { toWhat }!</h1>
}

export default Hello
```

#### Component children

You can use childs for your components like in example

If your component requires props and childs:

**main.js**
```javascript
import { h, start } from 'chrysalis.js'
import Hello from './Hello'

const container = document.getElementById('app')

const App = () => {
  return (
    <div>
      <Hello $class="World">Greeting page!</Hello>
    </div>
  )
}

start(container)
```

**Hello.js**
```javascript
import { h } from 'chrysalis.js'

const Hello = (props, children) => {
  return <h1 class={props.$class}>{ children }</h1>
}

export default Hello
```

If your component requires only childs

**main.js**
```javascript
import { h, start } from 'chrysalis.js'
import Hello from './Hello'

const container = document.getElementById('app')

const App = () => {
  return (
    <div>
      <Hello $class="header">Greeting page!</Hello>
    </div>
  )
}

start(container)
```

**Hello.js**
```javascript
import { h } from 'chrysalis.js'

const Hello = (props, children) => {
  return <h1 class={props.$class}>{ children }</h1>
}

export default Hello
```

#### Component children

You can use childs for your components like in example

If your component requires props and childs:

**main.js**
```javascript
import { h, start } from 'chrysalis.js'
import Hello from './Hello'

const container = document.getElementById('app')

const App = () => {
  return (
    <div>
      <Hello>Greeting page!</Hello>
    </div>
  )
}

start(container)
```

**Hello.js**
```javascript
import { h } from 'chrysalis.js'

const Hello = children => {
  return <h1>{ children }</h1>
}

export default Hello
```

### Add Interactivity

We'll use ```setState()``` to monitor the state and create a timer

```javascript
import { h, start, setState } from 'chrysalis.js'

const container = document.getElementById('app')

let time = new Date()

const App = () => {
  return (
    <div>
      <h1>Time is {time.toLocaleTimeString()}</h1>
    </div>
  )
}

// update every 1000ms
setInterval(() => setState(() => time = new Date()), 1000)

start(container)
```

### Add More Interactivity!

Let`s create a simple counter!

```javascript
import { h, start, setState } from 'chrysalis.js'

const state = {
  count: 0 // default value for counter
}

// methods for counter
const methods = {
  up: () => setState(() => state.count++),
  down: () => setState(() => state.count--)
}

const App = () => {
  return (
    <div>
      <h1>This is simple counter</h1>
      <p>{state.count}</p>
      <button onclick={() => methods.up()}>add</button>
      <button onclick={() => methods.down()}>minus</button>
    </div>
  )
}

start(document.body)
```

# TODO
In order of priority

- ~~setState method (soon)~~
- Statefull components with lifecycle methods
- readable docs
- Key attribute
- Fragments
- Router 
- Full JSX support
- State manager
- ~~Official site~~

# License
Released under the [MIT](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE) License.
