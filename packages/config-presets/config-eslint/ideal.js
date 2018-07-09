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
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
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
};
