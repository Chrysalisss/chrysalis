// Rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';
import license from 'rollup-plugin-license';
import { eslint } from "rollup-plugin-eslint";

import { rollup } from 'rollup';

import babel from 'rollup-plugin-babel';

const header = `Chrysalis v0.9.0-β
Casper Søkol, <%= moment().format('YYYY') %>
Distributed under the MIT license`

// config
export default [
  {
    input: 'src/Chrysalis.js',
    output: [
      { name: 'Chrysalis', file: 'dist/chrysalis.umd.js', format: 'umd' },
      { name: 'Chrysalis', file: 'dist/chrysalis.cjs.js', format: 'cjs'},
      { name: 'Chrysalis', file: 'dist/chrysalis.esm.js', format: 'es' }
    ],
    moduleName: 'Chrysalis',
    plugins: [
      resolve(), 
      commonjs(),
      babel(),
      /*eslint(),*/
      uglify(),
      license({ banner: header })
    ]
  }
];