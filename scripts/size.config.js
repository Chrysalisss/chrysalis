import toReplace from './replace'

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify-es'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

const config = {
  input: 'src/Chrysalis.js',
  output: {
    name: 'Chrysalis',
    file: 'dist/chrysalis.esm.js',
    format: 'es'
  },
  moduleName: 'Chrysalis',
  plugins: [
    resolve(),
    babel(),
    uglify(),
    replace(toReplace)
  ]
}

export default config
