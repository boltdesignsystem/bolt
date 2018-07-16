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
    // 'linebreak-style': ['error', 'unix'], // use prettier's linebreak rules over eslint

    // quotes: ['warn', 'single'], // a few situations exist where eslint's mandatory single quote rule needs to be trumped by prettier's smarter "most of the time use single quotes" rules
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
