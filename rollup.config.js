import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';

const plugins = [
  eslint({ exclude: '**/lib/**' }),
  resolve(),
  babel({
    exclude: '**/node_modules/**',
    presets: ['es2015-rollup', 'stage-2'],
    babelrc: false,
  }),
];

const flagifyInput = 'packages/flagify/src/index.js';
const vueInput = 'packages/vue-flagify/src/index.js';
const flagifyOutput = 'packages/flagify/lib/flagify';
const vueOutput = 'packages/vue-flagify/lib/vue-flagify';
const flagifyName = 'flagify';
const vueName = 'VueFlagify';

export default [
  {
    input: flagifyInput,
    output: {
      name: flagifyName,
      format: 'umd',
      file: `${flagifyOutput}.min.js`,
      sourcemap: true,
    },
    plugins: [...plugins, uglify()],
  },
  {
    input: flagifyInput,
    output: {
      format: 'es',
      file: `${flagifyOutput}.esm.js`,
    },
    plugins,
  },
  {
    input: flagifyInput,
    output: {
      name: flagifyName,
      format: 'umd',
      file: `${flagifyOutput}.js`,
    },
    plugins,
  },
  {
    input: vueInput,
    output: {
      name: vueName,
      format: 'umd',
      file: `${vueOutput}.min.js`,
      sourcemap: true,
    },
    plugins: [...plugins, uglify()],
  },
  {
    input: vueInput,
    output: {
      format: 'es',
      file: `${vueOutput}.esm.js`,
    },
    plugins,
  },
  {
    input: vueInput,
    output: {
      name: vueName,
      format: 'umd',
      file: `${vueOutput}.js`,
    },
    plugins,
  },
];
