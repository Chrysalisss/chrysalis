const { h, render } = Chrysalis

const app = document.getElementById('app')

const Counter = {
  state: {
    count: 0
  },

  up() {
    this.setState({ count: this.state.count + 1 })
  },

  down() {
    this.setState({ count: this.state.count - 1 })
  },

  reset() {
    this.setState({ count: 0 })
  },

  destroy() {
    this.destroy()
  },

  render({ count }) {
    return h(
      'div',
      null,
      h('h1', null, count),
      h('button', { onclick: () => this.up() }, 'up'),
      h('button', { onclick: () => this.down() }, 'down'),
      h('button', { onclick: () => this.reset() }, 'reset'),
      h('button', { onclick: () => this.destroy() }, 'destroy')
    )
  }
}

render(h(Counter, null), app)
