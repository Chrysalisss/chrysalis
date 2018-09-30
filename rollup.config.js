// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// config
export default {
  entry: 'src/index.js',
  dest: 'dist/chrysalis.min.js',
  format: 'umd',
  plugins: [
    /*uglify()*/,
    commonjs(),
    /*eslint({
      include: [
        'src/**',
      ]
    }),*/
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
