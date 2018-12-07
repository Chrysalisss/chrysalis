import { rollup } from 'rollup';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';
import license from 'rollup-plugin-license';
import babel from 'rollup-plugin-babel';

const header = `Chrysalis v0.10.3-β 
Casper Søkol, <%= moment().format('YYYY') %>
Distributed under the MIT license`

// config
const config = [
  {
    input: 'src/Chrysalis.js', // es5 + min
    output: [
      { name: 'Chrysalis', file: 'dist/chrysalis.umd.min.js', format: 'umd' },
      { name: 'Chrysalis', file: 'dist/chrysalis.esm.min.js', format: 'esm'}
    ],
    moduleName: 'Chrysalis',
    plugins: [ resolve(), babel(), uglify(), license({ banner: header }) ]
  },
  {
    input: 'src/Chrysalis.js', // es6 + min
    output: [
      { name: 'Chrysalis', file: 'dist/chrysalis.es6.umd.min.js', format: 'umd' },
      { name: 'Chrysalis', file: 'dist/chrysalis.es6.esm.min.js', format: 'esm'}
    ],
    moduleName: 'Chrysalis',
    plugins: [ resolve(), uglify(), license({ banner: header }) ]
  },
  {
    input: 'src/Chrysalis.js', // es5
    output: [
      { name: 'Chrysalis', file: 'dist/chrysalis.umd.js', format: 'umd' },
      { name: 'Chrysalis', file: 'dist/chrysalis.cjs.js', format: 'cjs'},
      { name: 'Chrysalis', file: 'dist/chrysalis.esm.js', format: 'es' }
    ],
    moduleName: 'Chrysalis',
    plugins: [ resolve(), commonjs(), babel(), license({ banner: header }) ]
  },
  {
    input: 'src/Chrysalis.js', // es6
    output: [
      { name: 'Chrysalis', file: 'dist/chrysalis.es6.umd.js', format: 'umd' },
      { name: 'Chrysalis', file: 'dist/chrysalis.es6.cjs.js', format: 'cjs'},
      { name: 'Chrysalis', file: 'dist/chrysalis.es6.esm.js', format: 'es' }
    ],
    moduleName: 'Chrysalis',
    plugins: [ resolve(), commonjs(), license({ banner: header }) ]
  }
]

export default config