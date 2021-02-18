module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        ignoreBrowserslistConfig: true,
        modules: false,
        debug: false,
        corejs: 3,
        useBuiltIns: 'entry',
        targets: {
          browsers: require('@bolt/browserslist-config'),
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-jsx',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
        throwIfNamespace: false,
        useBuiltIns: false,
      },
    ],
  ],
};
