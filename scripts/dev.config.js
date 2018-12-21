import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const config = {
  input: 'src/Chrysalis.js',
  output: {
    name: 'Chrysalis',
    file: 'dist/chrysalis.umd.js',
    format: 'umd'
  },
  moduleName: 'Chrysalis',
  plugins: [resolve(), babel()]
}

export default config
