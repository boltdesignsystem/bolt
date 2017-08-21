const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./webpack.config');

module.exports = (options) => {
  const releaseConfig = Object.create(commonConfig(options));
  releaseConfig.devtool = 'sourcemap';
  releaseConfig.plugins = releaseConfig.plugins.concat(
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
  );
  releaseConfig.performance = {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  };

  return releaseConfig;
};
