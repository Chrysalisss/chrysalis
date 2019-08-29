import pkg from '../package.json'

import toReplace from './replace'

import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

const header = `Chrysalis v${pkg.version} 
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
    terser(),
    replace(toReplace),
    license({ banner: header })
  ]
}

export default config
