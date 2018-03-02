module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb-base',
  ].map(require.resolve),
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
    quotes: [2, 'single', { avoidEscape: true }],
    'max-len': [
      2,
      120,
    ],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
