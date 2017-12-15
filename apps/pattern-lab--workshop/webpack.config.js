const { resolve, join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const fs = require('fs-extra');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const config = {
  entry: {
    'bolt': './src/styles/bolt'
  },
  data: './src/_data'
}

const sassExportData = require('@theme-tools/sass-export-data')({
  path: config.data
});


module.exports = {
  entry: config.entry,
  output: {
    path: `${process.cwd()}/dist/assets`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.svg', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: false, // re-enable if/when using css-modules. was adding duplicate output of CSS to JS output
                importLoaders: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'clean-css-loader',
              options: {
                skipWarn: true,
                compatibility: 'ie9',
                level: process.env.NODE_ENV === 'production' ? 2 : 0,
                inline: ['remote']
              }
            },
            {
              loader: 'sass-loader',
              options: {
                importer: require('npm-sass').importer,
                functions: sassExportData,
                outputStyle: 'expanded',
                precision: 2
              }
            }
          ]
        })
      }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [[
      //         'env'
      //       ]]
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
      filename: '[name].css',
      // disable: false,
      allChunks: true
    }),
    // new HtmlWebpackPlugin({
    // // excludeAssets: [/.*/]
    // }),
    // new HtmlWebpackExcludeAssetsPlugin()
  ]
};