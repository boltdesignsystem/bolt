const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const fs = require('fs-extra');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');
const ConcatPlugin = require('webpack-concat-plugin');
const { CommonsChunkPlugin/*, UglifyJsPlugin*/ } = webpack.optimize;
const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const ENV = isDev ? 'development' : 'production';
const outputPath = isDev ? path.resolve('src') : path.resolve('./dist');
const merge = require('merge').recursive;


// const IS_MODULE_BUILD = BROWSERS[0].includes('Chrome');
const processEnv = {
  NODE_ENV: JSON.stringify(ENV)
  // appVersion: JSON.stringify(pkg.version)
};


const sassDataExportPath = `${process.cwd()}/dist`;
const defaultConfig = {
  entry: {
    'critical-fonts':
      './src/_patterns/02-components/bolt-critical-fonts/src/critical-fonts',
    'bolt': './packages/bolt',
    'bolt-critical-path': './packages/bolt/bolt-critical-path'
  },
  output: {
    path: `${process.cwd()}/dist/scripts/`,
    filename: '[name].min.js',
    publicPath: `/scripts/`,
    chunkFilename: `[name]-chunk.min.js`,
    libraryTarget: 'umd'
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'cheap-source-map',
  resolve: {
    // Help webpack find local Bolt code in the src folder
    mainFields: ['module:dev', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx', '.json', '.svg', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/@skatejs\/renderer-lit-html\/dist\/node\/index\.js|native-shim\.js|node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js|\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js|custom-elements-es5-adapter\.js|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@bolt/babel-preset-bolt'],
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /\.scoped.scss$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')];
              }
            }
          },
          {
            loader: 'clean-css-loader',
            options: {
              skipWarn: true,
              compatibility: 'ie9',
              level: 2,
              inline: ['remote']
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importer: require('npm-sass').importer,
              functions: exportJson(sassDataExportPath, 'export_data'),
              outputStyle: 'compressed',
              precision: 2
            }
          }
        ]
      },
      {
        test: /\.scoped.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [require('autoprefixer')];
                }
              }
            },
            {
              loader: 'clean-css-loader',
              options: {
                skipWarn: true,
                compatibility: 'ie9',
                level: 2,
                inline: ['remote']
              }
            },
            {
              loader: 'sass-loader',
              options: {
                importer: require('npm-sass').importer,
                functions: exportJson(sassDataExportPath, 'export_data'),
                outputStyle: 'compressed',
                precision: 2
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: ['text-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  performance: {
    maxAssetSize: 1500000,
    maxEntrypointSize: 1500000
  },
  plugins: [
    new CommonsChunkPlugin({
      deepChildren: true,
      children: true,
      minChunks: Infinity,
      async: true
    }),
    new webpack.IgnorePlugin(/vertx/), // needed to ignore vertx dependency in webcomponentsjs-lite
    new ExtractTextPlugin({
      filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
    }),
    new ManifestPlugin({
      fileName: 'bolt-manifest.json',
      // basePath: '/scripts/',
      publicPath: '/',
      writeToFileEmit: true,
      seed: {
        name: 'Bolt Manifest'
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({ 'process.env': processEnv }),
    new webpack.ProvidePlugin({
      h: 'preact',
      Promise: 'es6-promise'
    })
  ],
  devServer: {
    contentBase: path.resolve(outputPath),
    compress: true,
    overlay: {
      errors: true
    },
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};






module.exports = (userConfig) => {
  // Merge together the default webpack config + any overrides passed in
  const config = merge(defaultConfig, userConfig, {});

  // if (!fs.existsSync(config.sassDataExportPath)) {
  //   fs.mkdirp(config.sassDataExportPath);
  // }

  return config;
};
