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

    // I don't know why this was orginally set to true. It may or may not be safe to set to false (the default).
    // Until then, @see https://github.com/rails/webpacker/issues/3008
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],

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
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
