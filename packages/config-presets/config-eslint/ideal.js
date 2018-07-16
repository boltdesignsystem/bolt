module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier'],
  extends: ['eslint-config-airbnb-base'].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {

    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    'prettier/prettier': 'warn',
    'eol-last': ['warn', 'always'],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['react', 'preact-compat'],
          ['react-dom', 'preact-compat'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
