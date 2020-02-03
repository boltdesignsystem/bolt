import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: ['index.js'],
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: false,
  },
  plugins: [
    babel({
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        [
          '@babel/plugin-proposal-decorators',
          {
            decoratorsBeforeExport: true,
          },
        ],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
    terser(),
  ],
};
