// Rollip plugins
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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
      babel()
    ]
  },
  {
    input: 'src/Chrysalis.js',
    output: [
      { file: 'dist/chrysalis.cjs.js', format: 'cjs', name: 'Chrysalis'},
      { file: 'dist/chrysalis.esm.js', format: 'es', name: 'Chrysalis' }
    ]
  }
];