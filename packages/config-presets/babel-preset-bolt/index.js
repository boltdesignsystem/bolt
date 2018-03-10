const preset = function (api, opts = {}) {
  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current',
          browsers: [
            'last 3 versions',
            'ie 11',
          ],
        },
        modules: false,
        debug: false,
      }],
    ],
    plugins: [
    /**
     * 1. Helps with our Web Component Preact renderer
     */
      [
        '@babel/plugin-transform-react-jsx', /* [1] */
        {
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          throwIfNamespace: false,
          useBuiltIns: false,
        },
      ],
      '@babel/plugin-syntax-jsx', /* [1] */

      '@babel/plugin-syntax-decorators', // ex. @define
      '@babel/plugin-proposal-decorators',

      // ex. class { handleThing = () => { } }
      '@babel/plugin-proposal-class-properties',


      // Allows us to dynamically import JS via Webpack. ex. import('button.standalone.js')
      '@babel/plugin-syntax-dynamic-import', /* [2] */


      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};

module.exports = preset;
