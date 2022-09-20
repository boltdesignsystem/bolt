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
    '@babel/preset-react',
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
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
