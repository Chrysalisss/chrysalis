  ![](/chrysalis.svg)

<h2 align="center">Creatе UI quickly and easily</h2>
<p align="center">A lightweight JS-library for building fast, modern &amp; scalable applications</p>
<p align="center">
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://img.shields.io/npm/v/chrysalis.js.svg?style=flat-square" alt="npm"></a>
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://flat.badgen.net/npm/dm/chrysalis.js" alt="npm"></a>
	<a href="https://www.npmjs.com/package/chrysalis.js"><img src="https://img.shields.io/david/Chrysalisss/chrysalis.svg?style=flat-square" alt="none dependencies"></a>
	<a href="https://github.com/standard/standard"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Code style"></a>
	<a href="https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Chrysalisss/chrysalis.svg?style=flat-square" alt="License"></a>
</p>

## Why use?

- :lollipop: Just 1kb runtime
- :zap: Fast due to Virtual DOM inside 
- :hammer: Declarative and intuitive API
- :hibiscus: Component-based (without class-syntax)
- :candy: Learns in 15 minutes

## Installation 

### Starter kit

Get [Chrysalis Starter Kit](https://github.com/Chrysalisss/Chrysalis-starter-kit) (with webpack, babel, prettier and other helpful tools inside), if you don`t want to setup the development environment

Install the Chrysalis and then import what you need

### Dev environment
You can easily set up the development environment with [NPM](https://www.npmjs.com/package/chrysalis.js) (or with [Yarn](https://yarnpkg.com/package/chrysalis.js))
```bash
npm install chrysalis.js
```

```js
import { h, render } from 'chrysalis.js'  
```
You need install the [babel plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) for transform JSX, that provide more readable syntax for VDOM elements.

```js
// setup the .babelrc
{
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "h",
        "pragmaFrag": "Fragment"
      }
    ]
  ]
}
```

### Browser
You can use Chrysalis directly in the browser via [CDN](https://unpkg.com/chrysalis.js)  

```js
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/chrysalis.js'

  // ...
</script>
```
## Timer example
### Chrysalis (20 SLOC)
```js
import { h, render } from 'chrysalis.js'
  
const Timer = {
  state: { seconds: 0 },
  
  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }))
  },  
  
  oncreate() {
    this.interval = setInterval(() => this.tick(), 1000)
  },
  
  onremove() {
    clearInterval(this.interval)
  },

  render({ seconds }) {
    return (
      <div>
        Seconds: {seconds}
      </div>      
    )
  }
}

render(<Timer />, document.getElementById('app'))
```
<details><summary><strong>React (26 SLOC)</strong></summary><br>
  
```js
import React from 'react'
import ReactDOM from 'react-dom'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { seconds: 0 }
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById('app'))
```

</details>

<details><summary><strong>Vue (22 SLOC)</strong></summary><br>
  
```vue
<template>
  <div>
    Seconds: {{ seconds }}
  </div>
</template>

<script>
  export default {
    data() {
      return { seconds: 0 }
    },

    methods: {
      tick: function() {
        this.seconds++
      }
    },

    mounted() {
      this.interval = setInterval(() => this.tick(), 1000)
    },

    beforeDestroy() {
      clearInterval(this.interval)
    }
  }
</script>
```

</details>

Other examples you can find [here](https://github.com/Chrysalisss/chrysalis/tree/master/examples)

## Get Involved
PRs are welcome!

- just fork it;
- create branch for feature/bug fixing;
- commit changes;
- push to the branch;
- create a pull request!

## License
**Chrysalis** created with :heart: by [heavy](https://github.com/j-heavy) · Released under the [MIT License](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE).

> [j-heavy.github.io](https://j-heavy.github.io) · GitHub [@j-heavy](https://github.com/j-heavy)
