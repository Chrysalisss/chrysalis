const { h, render } = Chrysalis

const app = document.getElementById('app')

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
    return h('div', null, 'Seconds: ', seconds)
  }
}

render(h(Timer, null), app)
