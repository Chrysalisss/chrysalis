import pkg from './package.json'

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify-es'
import license from 'rollup-plugin-license'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

const header = `Chrysalis v${pkg.version}-β 
Casper Søkol, <%= moment().format('YYYY') %>
Distributed under the MIT license`

const config = {
  input: 'src/Chrysalis.js',
  output: [
    { name: 'Chrysalis', file: 'dist/chrysalis.umd.js', format: 'umd' },
    { name: 'Chrysalis', file: 'dist/chrysalis.cjs.js', format: 'cjs' },
    { name: 'Chrysalis', file: 'dist/chrysalis.esm.js', format: 'es' }
  ],
  moduleName: 'Chrysalis',
  plugins: [
    resolve(),
    babel(),
    uglify(),
    replace({
      createVnode$1: 'A',
      createVnode: 'B',
      updateAttribute: 'C',
      updateAttributes: 'D',
      changed: 'E',
      nodeName: 'F',
      props: 'G',
      children: 'H'
    }),
    license({ banner: header })
  ]
}

export default config
