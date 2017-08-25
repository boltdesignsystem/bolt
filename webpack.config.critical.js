

module.exports = (options) => {
  const webpack = require('webpack');
  const path = require('path');
  const merge = require('merge').recursive;

  const oldConfig = require('./webpack.config');
  const newConfig = {
    entry: {
      // 'patternlab-pattern': `${__dirname}/src/scripts/patternlab-pattern.js`,
      // 'patternlab-viewer': `${__dirname}/src/scripts/patternlab-viewer.js`,
      'bolt-critical-path': `${__dirname}/packages/bolt-ui/bolt-critical-path.js`,
    },
    output: {
      path: `${__dirname}/sandbox/styleguide/source/_includes/critical-path`,
      filename: '[name].min.js',
      publicPath: '${__dirname}/bolt-website/scripts/'
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: true,
          // compress: {
          //   warnings: false,
          //   screw_ie8: true,
          //   conditionals: true,
          //   unused: true,
          //   comparisons: true,
          //   sequences: true,
          //   dead_code: true,
          //   evaluate: true,
          //   if_return: true,
          //   join_vars: true,
          // },
        output: {
          comments: false,
        },
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ]
  };

  const config = merge(oldConfig, newConfig);
  console.log(config);

  return config;
};
