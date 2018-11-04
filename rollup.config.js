import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';

const { BUILD_MODE } = process.env;
const plugins = [
  eslint({ exclude: '**/lib/**' }),
  resolve(),
  babel({
    exclude: '**/node_modules/**',
    presets: ['es2015-rollup', 'stage-2'],
    babelrc: false,
  }),
];

let input;
let output;
let name;

switch (BUILD_MODE) {
  case 'basic':
    input = 'packages/flagify/src/index.js';
    output = 'packages/flagify/lib/flagify';
    name = 'flagify';
    break;
  case 'vue':
    input = 'packages/vue-flagify/src/index.js';
    output = 'packages/vue-flagify/lib/vue-flagify';
    name = 'VueFlagify';
    break;
  default:
    break;
}

export default [
  {
    input,
    output: {
      name,
      format: 'umd',
      file: `${output}.min.js`,
      sourcemap: true,
    },
    plugins: [...plugins, uglify()],
  },
  {
    input,
    output: {
      format: 'es',
      file: `${output}.esm.js`,
    },
    plugins,
  },
  {
    input,
    output: {
      name,
      format: 'umd',
      file: `${output}.js`,
    },
    plugins,
  },
];
