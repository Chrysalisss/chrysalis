// Rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';
import license from 'rollup-plugin-license';
import { eslint } from "rollup-plugin-eslint";

import { rollup } from 'rollup';

import babel from 'rollup-plugin-babel';

//config
export default [
  // browser-friendly UMD build
  {
    input: 'src/Chrysalis.js',
    output: {
      name: 'Chrysalis',
      file: 'dist/chrysalis.umd.js',
      format: 'umd'
    },
    moduleName: 'Chrysalis',
    plugins: [
      resolve(), 
      commonjs(),
      babel(),
      uglify(),
      eslint(),
      license({
        banner: `Chrysalis v0.9.0
                Casper Søkol, <%= moment().format('YYYY') %>
                Distributed under the MIT license`
      })
    ]
  },
  {
    input: 'src/Chrysalis.js',
    output: [
      { file: 'dist/chrysalis.cjs.js', format: 'cjs', name: 'Chrysalis'},
      { file: 'dist/chrysalis.esm.js', format: 'es', name: 'Chrysalis' }
    ],
    plugins: [
      resolve(), 
      commonjs(),
      babel(),
      uglify(),
      eslint(),
      license({
        banner: `Chrysalis v0.9.0
                Casper Søkol, <%= moment().format('YYYY') %>
                Distributed under the MIT license`
      })
    ]
  }
];