function getBabelConfig({ isModern = false }) {
  const browsers = isModern
    ? [
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'last 2 iOS versions',
        'last 2 Edge versions',
        'Firefox ESR',
      ]
    : ['IE 11'];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers,
          },
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-jsx' /* [1] */,
      [
        '@babel/plugin-transform-react-jsx' /* [1] */,
        {
          pragma: 'h',
          pragmaFrag: '"span"',
          throwIfNamespace: false,
          useBuiltIns: false,
        },
      ],
      [
        '@babel/proposal-decorators',
        {
          legacy: true,
          // decoratorsBeforeExport: true
        },
      ],
      ['@babel/plugin-proposal-class-properties', { loose: true }],

      '@babel/plugin-syntax-dynamic-import',
      // '@babel/plugin-proposal-class-properties',
    ],
  };
}

module.exports = {
  getBabelConfig,
};
