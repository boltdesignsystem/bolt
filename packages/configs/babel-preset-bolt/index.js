module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: require('@bolt/browserslist-config'),
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-syntax-jsx',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
        throwIfNamespace: false,
      },
    ],
  ],
};
