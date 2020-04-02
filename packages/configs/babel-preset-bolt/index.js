module.exports = function(api, opts = {}) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          targets: {
            esmodules: true,
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
      '@babel/plugin-syntax-jsx' /* [1] */,
      [
        '@babel/plugin-transform-react-jsx' /* [1] */,
        {
          pragma: 'h',
          pragmaFrag: 'Fragment',
          throwIfNamespace: false,
        },
      ],
    ],
  };
};
