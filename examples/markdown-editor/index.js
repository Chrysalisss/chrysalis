const { h, render, createRef } = Chrysalis
const md = window.markdownit()

const app = document.getElementById('app')

const MarkdownEditor = {
  state: {
    value: 'Hello, **world**!',
    times: 0
  },

  inputRef: createRef(),

  setMarkdown() {
    this.inputRef.current.innerHTML = md.render(this.state.value)
  },

  oncreate() {
    this.setMarkdown()
  },

  onupdate() {
    this.state.times++

    console.log(
      'Text has been succesfully updated ',
      this.state.times,
      ' times'
    )
  },

  handleChange(e) {
    this.setState({ value: e.target.value })

    this.setMarkdown()
  },

  render() {
    return h(
      'div',
      null,
      h('h3', null, 'Input'),
      h('textarea', {
        oninput: e => this.handleChange(e),
        defaultValue: this.state.value
      }),
      h('h3', null, 'Output'),
      h('div', { ref: this.inputRef })
    )
  }
}

render(h(MarkdownEditor, null), app)
