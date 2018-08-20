const preset = function(api, opts = {}) {
  return {
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: false }],

      /**
       * 1. Helps with our Web Component Preact renderer
       */
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

      // Allows us to dynamically import JS via Webpack. ex. import('button.standalone.js')
      '@babel/plugin-syntax-dynamic-import' /* [2] */,
    ],
  };
};

module.exports = preset;
