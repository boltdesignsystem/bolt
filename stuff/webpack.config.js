
const webpack = require('webpack');
const path = require('path');
import PathOverridePlugin from 'path-override-webpack-plugin';

module.exports = (options) => {
  const config = {
    resolve: {
      modules: [
        'node_modules',
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'source/images')
      ],
      extensions: ['.js', '.jsx', '.json', '.svg']
    },
    entry: {
      app: `${__dirname}/source/scripts/app.js`,
      critical: `${__dirname}/source/scripts/critical.js`
    },
    output: {
      path: path.join(__dirname, './public/scripts'),
      filename: '[name].built.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: require.resolve('eslint-loader'),
          query: {
            configFile: path.join(__dirname, '.eslintrc')
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /critical\.js/,
          loader: require.resolve('babel-loader'),
        }
      ]
    },
    devtool: 'cheap-source-map',
    performance: {
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    },
    plugins: [
    ]
  };

  return config;
};
