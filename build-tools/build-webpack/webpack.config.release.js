

module.exports = (options) => {
  const webpack = require('webpack');
  const path = require('path');
  const commonConfig = require('./webpack.config');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  const releaseConfig = Object.create(commonConfig(options));
  releaseConfig.devtool = 'sourcemap';

  releaseConfig.output = {
    path: `${process.cwd()}/src/_patterns/02-components/bolt-critical-fonts/dist`,
    filename: '[name].min.js',
    // publicPath: `${process.cwd()}/bolt-website/scripts/`
  }

  releaseConfig.plugins = releaseConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
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
