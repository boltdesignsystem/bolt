const preset = function(api, opts = {}) {
  return {
    presets: [
      ['env', {
        targets: {
          node: 'current',
          browsers: [
            'last 3 versions',
            'not ie < 9'
          ]
        },
        modules: false,
        debug: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy', // ex. @define

      'transform-class-properties', // ex. class { handleThing = () => { } }

      // import('button.standalone.js')
      'syntax-dynamic-import',

      // critical for preact rendering
      [
        'transform-react-jsx',
        {
          pragma: 'h'
        }
      ],

      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        'transform-object-assign',
        {
          async: true
        }
      ],

      [
        'transform-object-rest-spread',
        {
          useBuiltIns: true
        }
      ],

      // @TODO: only include this when being run on a NODE environment
      // [
      //   require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
      //   { loose: true }
      // ],

      // @TODO: only include this when being run on a NODE environment
      // [
      //   'transform-es2015-modules-commonjs',
      //   { loose: true }
      // ],

      // @TODO: only include this when being run on a NODE environment
      // 'dynamic-import-node'
    ]
  };
};

// @TODO: refactor -- block below is the general approach I've seen other babel presets take to conditionally
// include plugins in certain environments

// if (process.env.NODE_ENV === 'ssr') {
//   preset.plugins.push.apply(preset.plugins, [
//     require.resolve('babel-plugin-dynamic-import-node'),
//     // We always include this plugin regardless of environment
//     // because of a Babel bug that breaks object rest/spread without it:
//     // https://github.com/babel/babel/issues/4851
//     // require.resolve('babel-plugin-transform-es2015-parameters'),
//     // // Jest needs this to work properly with import/export syntax
//     // [
//     //   require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
//     //   { loose: true }
//     // ]
//   ]);
// }

module.exports = preset;
