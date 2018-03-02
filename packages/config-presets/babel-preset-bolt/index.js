const preset = function(api, opts = {}) {
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
      // '@babel/preset-stage-3',
    ],
    plugins: [
      '@babel/plugin-syntax-decorators', // ex. @define
      '@babel/plugin-proposal-decorators',

      // ex. `export Communications from './icons/communications';` - used in @bolt/components-icons
      '@babel/plugin-syntax-export-default-from',
      '@babel/plugin-proposal-export-default-from',

      // Allows us to dynamically import JS via Webpack. ex. import('button.standalone.js')
      '@babel/plugin-syntax-dynamic-import', /* [2] */

      // ex. class { handleThing = () => { } }
      [
        '@babel/plugin-proposal-class-properties',
        { loose: false },
      ],

      '@babel/plugin-syntax-jsx',

      // critical for preact rendering
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: '\"span\"',
          throwIfNamespace: false,
          useBuiltIns: false,
        },
      ],

      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};

module.exports = preset;
