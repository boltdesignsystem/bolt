const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('merge').recursive;

module.exports = (options) => {
  const commonConfig = require('./webpack.config');
  const releaseConfig = Object.create(commonConfig({
    devtool: 'sourcemap'
  }));
  

  releaseConfig.plugins = releaseConfig.plugins.concat(
    new CleanWebpackPlugin([!process.env.cli && releaseConfig.output.path ? releaseConfig.output.path : ''], {
      verbose: true,
      root: process.cwd() // set root context to wherever webpack is getting run (globally or at the component level)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin(),
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
