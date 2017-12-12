module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb-base',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'singlequote', { avoidEscape: true }],
    'max-len': [
      2,
      120,
    ],
  },
};
