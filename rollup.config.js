// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

// config
export default {
  entry: 'src/index.js',
  dest: 'dist/chrysalis.min.js',
  format: 'umd',
  plugins: [
    /*uglify()*/
    /*eslint({
      include: [
        'src/**',
      ]
    }),*/
    resolve({
      module: true,
      jsnext: true, 
      browser: true,
      extensions: [ '.mjs', '.js', '.jsx', '.json' ]
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
