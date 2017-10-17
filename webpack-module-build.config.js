const {resolve} = require('path');
const webpack = require('webpack');

const pkg = require('./package.json');

/**
 * === ENV configuration
 */
const ENV = process.env.NODE_ENV;
const outputPath = resolve('dist');
const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

/**
 * Plugin configuration
 */
const plugins = [new webpack.DefinePlugin({'process.env': processEnv})];

/**
 * === Webpack configuration
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'module.bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        // We need to transpile Polymer itself and other ES6 code
        // exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              'env',
              {
                targets: {browsers: ['last 2 Chrome versions', 'Safari 10']},
                debug: true
              }
            ]]
          }
        }
      },
      {
        test: /\.html$/,
        use: ['text-loader']
      },
      {
        test: /\.postcss$/,
        use: ['text-loader', 'postcss-loader']
      }
    ]
  },
  plugins
};
