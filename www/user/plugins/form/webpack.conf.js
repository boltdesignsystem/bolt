var webpack = require('webpack'),
    path    = require('path'),
    exec    = require('child_process').execSync,
    pwd     = exec('pwd').toString();

module.exports = {
  entry: {
    app: './app/main.js'
  },
  externals: {
    jquery: 'jQuery',
    'grav-form': 'GravForm'
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/,  loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015'] } }
    ]
  }
};
