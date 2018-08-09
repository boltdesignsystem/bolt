const preset = function(api, opts = {}) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>0.25%', 'ie 11', 'not op_mini all'], // https://jamie.build/last-2-versions
          },
          modules: false,
          debug: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-export-default-from',
      '@babel/plugin-proposal-export-default-from',

      '@babel/plugin-syntax-export-namespace-from',
      '@babel/plugin-proposal-export-namespace-from',

      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true,
        },
      ],

      '@babel/plugin-transform-async-to-generator',
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
