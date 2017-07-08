var path = require('path'),
    webpack = require('webpack');

module.exports = {
  context: __dirname + "/../../source/scripts",
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  entry: {
    app: [
      './app.js'
    ]
  },
  output: {
    path: path.resolve('public'),
    publicPath: '/scripts/',
    filename: '[name].built.js',
    chunkFilename: '[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
       compress: {
         properties: true,
         dead_code: true,
         unused: true,
         warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(bower_components|critical)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};