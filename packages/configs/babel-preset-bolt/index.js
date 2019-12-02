const preset = function(api, opts = {}) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          debug: false,
          corejs: 3,
          useBuiltIns: 'entry',
        },
      ],
    ],
    plugins: [
      /**
       * 1. Helps with our Web Component Preact renderer
       */
      '@babel/plugin-syntax-jsx' /* [1] */,
      [
        '@babel/plugin-transform-react-jsx' /* [1] */,
        {
          pragma: 'h',
          pragmaFrag: 'Fragment',
          throwIfNamespace: false,
        },
      ],

      ['@babel/plugin-proposal-decorators', { legacy: true }],

      // ex. class { handleThing = () => { } }
      ['@babel/plugin-proposal-class-properties', { loose: true }],

      // Allows us to dynamically import JS via Webpack. ex. import('button.standalone.js')
      '@babel/plugin-syntax-dynamic-import' /* [2] */,

      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};

module.exports = preset;
