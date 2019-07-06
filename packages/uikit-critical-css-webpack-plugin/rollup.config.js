import babel from 'rollup-plugin-babel';

export default {
  input: 'index',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
