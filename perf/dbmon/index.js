const { h, render } = Chrysalis
const target = document.getElementById('dbmon')

const Main = ({ data }) =>
  h(
    'div',
    {},
    h(
      'table',
      { className: 'table table-striped latest-data' },
      h(
        'tbody',
        {},
        data.map(({ dbname, lastSample }) =>
          h(
            'tr',
            {},
            h('td', { className: 'dbname' }, dbname),
            h(
              'td',
              { className: 'query-count' },
              h('span', { className: lastSample.countClassName }, lastSample.nbQueries)
            ),
            lastSample.topFiveQueries.map(({ query, formatElapsed, elapsedClassName }) =>
              h(
                'td',
                { className: elapsedClassName },
                formatElapsed,
                h(
                  'div',
                  { className: 'popover left' },
                  h('div', { className: 'popover-content' }, query),
                  h('div', { className: 'arrow' })
                )
              )
            )
          )
        )
      )
    )
  )

perfMonitor.startFPSMonitor()
perfMonitor.startMemMonitor()
perfMonitor.initProfiler('render')

requestAnimationFrame(function update() {
  const data = ENV.generateData().toArray()
  perfMonitor.startProfile('render')

  render(h(Main, { data: data }), target)

  perfMonitor.endProfile('render')
  requestAnimationFrame(update)
})
