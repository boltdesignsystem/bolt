const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('merge').recursive;

module.exports = (options) => {
  const commonConfig = require('./webpack.config');
  
  const devCliConfig = merge(commonConfig({
    // sassDataExportPath: `${process.cwd()}/dist/`
  }));
  
  devCliConfig.entry = {};

  devCliConfig.output = {
    filename: '[name].js',
    path: `${process.cwd()}/dist/`
  }

  devCliConfig.plugins = devCliConfig.plugins.concat(
    new CleanWebpackPlugin([!process.env.cli && devCliConfig.output.path ? devCliConfig.output.path : ''], {
      verbose: true,
      root: process.cwd() // set root context to wherever webpack is getting run (globally or at the component level)
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );

  return devCliConfig;
};