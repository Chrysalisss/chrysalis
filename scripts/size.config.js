import toReplace from './replace'

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/Chrysalis.js',
  output: {
    name: 'Chrysalis',
    file: 'dist/chrysalis.esm.js',
    format: 'es'
  },
  moduleName: 'Chrysalis',
  plugins: [resolve(), babel(), terser(), replace(toReplace)]
}

export default config
