  ![](/chrysalis.svg)

<h1 align="center">Creatе UI quickly and easily</h1>
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

Get [Chrysalis Starter Kit](https://github.com/Chrysalisss/Chrysalis-starter-kit), if you do not want to setup the environment (Webpack inside)

Install the Chrysalis and then import what you need

### For dev environment
via [NPM](https://www.npmjs.com/package/chrysalis.js)
```bash
npm install chrysalis.js
```
```js
import { h, render } from 'chrysalis.js'  
```
Optionally you can install the babel plugin for transform [JSX](https://www.npmjs.com/package/babel-plugin-transform-react-jsx), that provide more readable syntax for VDOM elements.
```js
// setup the .babelrc
{
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "h"
      }
    ]
  ]
}
```

### For browser
via [CDN](https://unpkg.com/chrysalis.js@0.14.0/dist/chrysalis.umd.js)  
```HTML
<script src="https://unpkg.com/chrysalis.js">
```
```js
const { h, render } = Chrysalis
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
### React (26 SLOC)
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
### Vue (22 SLOC)
``vue
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
# License
Released under the [MIT](https://github.com/Chrysalisss/chrysalis/blob/master/LICENSE) License.
