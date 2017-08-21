const webpack = require('webpack');
const path = require('path');

module.exports = (options) => {
  const config = {
    resolve: {
      alias: {
        modules: path.resolve(__dirname, 'src/scripts/modules/'),
        'critical-path': path.resolve(__dirname, 'src/scripts/critical-path/'),
        libs: path.resolve(__dirname, 'src/scripts/libs/'),
        jquery: "jquery/dist/jquery.js"
      }
      // extensions: ['.js', '.jsx', '.json', '.svg']
    },
    entry: {
      'patternlab-pattern': `${__dirname}/src/scripts/patternlab-pattern.js`,
      'patternlab-viewer': `${__dirname}/src/scripts/patternlab-viewer.js`,
      'critical-path': `${__dirname}/src/scripts/critical-path.js`,
    },
    output: {
      path: `${__dirname}/dist/styleguide/js`,
      filename: '[name].min.js',
      publicPath: '${__dirname}/dist/styleguide/js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
          options: {
            presets: [
              [ 'es2015', { modules: false } ]
            ]
          }
        }
      ]
    },
    devtool: 'cheap-source-map',
    performance: {
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  };

  return config;
};
