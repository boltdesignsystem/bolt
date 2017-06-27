

const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./webpack.config');

module.exports = (options) => {
  const releaseConfig = Object.create(commonConfig(options));
  releaseConfig.devtool = 'sourcemap';
  releaseConfig.plugins = releaseConfig.plugins.concat(
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: false,
        comparisons: true,
        sequences: true,
        dead_code: false,
        evaluate: true,
        if_return: false,
        join_vars: true
      },
      output: {
        comments: false
      },
      mangle: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
  releaseConfig.performance = {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  };

  return releaseConfig;
};
