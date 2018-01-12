const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const npmSass = require('npm-sass');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const ManifestPlugin = require('webpack-manifest-plugin');
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');
const assets = require('./utils/assets');
const sassExportData = require('@theme-tools/sass-export-data')({
  path: path.resolve(process.cwd(), './src/_data'),
});

function createConfig(userConfig) {
  return {
    entry: assets.buildWebpackEntry(userConfig.components),
    output: {
      path: path.resolve(process.cwd(), userConfig.dist),
      filename: "[name].js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".svg", ".scss"]
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  modules: false, // re-enable if/when using css-modules. was adding duplicate output of CSS to JS output
                  importLoaders: true,
                  localIdentName: "[local]"
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: [
                    postcssDiscardDuplicates,
                    autoprefixer,
                  ],
                }
              },
              {
                loader: "clean-css-loader",
                options: {
                  skipWarn: true,
                  compatibility: "ie9",
                  level: process.env.NODE_ENV === "production" ? 2 : 0,
                  inline: ["remote"],
                  format: 'beautify',
                }
              },
              {
                loader: "sass-loader",
                options: {
                  importer: [
                    sassImportGlobbing,
                    npmSass.importer,
                  ],
                  functions: sassExportData,
                  outputStyle: "expanded",
                  precision: 2
                }
              }
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: /(node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@bolt/babel-preset-bolt'],
            }
          }
        },
      ],
    },
    plugins: [
      // Ignore generated output if generated output is on a dependency chain (causes endless loop)
      new webpack.WatchIgnorePlugin([
        /dist\/styleguide/,
        /dist\/annotations/,
        /styleguide/
      ]),
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        deepChildren: true,
        children: true,
        minChunks: Infinity,
        async: true
      }),
      new webpack.IgnorePlugin(/vertx/), // needed to ignore vertx dependency in webcomponentsjs-lite
      new ExtractTextPlugin({
        filename: "[name].css",
        // disable: false,
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development'),
      }),
      new webpack.ProvidePlugin({
        h: 'preact',
        Promise: 'es6-promise'
      }),
      // new BrowserSyncPlugin(
      //   // BrowserSync options
      //   {
      //     // browse to http://localhost:3000/ during development
      //     host: 'localhost',
      //     port: 3000,
      //     // proxy the Webpack Dev Server endpoint
      //     // (which should be serving on http://localhost:3100/)
      //     // through BrowserSync
      //     proxy: 'http://localhost:8080/'
      //   },
      //   // plugin options
      //   {
      //     // prevent BrowserSync from reloading the page
      //     // and let Webpack Dev Server take care of this
      //     reload: false,
      //     name: 'bolt-server'
      //   }
      // )
      // https://github.com/1337programming/webpack-shell-plugin/pull/46
      // new WebpackShellPlugin({
      //   onBeforeBuild: ['php -d memory_limit=4048M core/console --generate'],
      //   dev: true
      // }),
      // new EventHooksPlugin({
      // new HtmlWebpackPlugin({
      // // excludeAssets: [/.*/]
      // }),
      // new HtmlWebpackExcludeAssetsPlugin()
    ],
    devServer: {
      contentBase: path.resolve('dist'),
      compress: true,
      port: 8080,
      overlay: {
        errors: true
      },
      host: '0.0.0.0',
      disableHostCheck: true,
      hot: true,
      inline: true,
      watchContentBase: true,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 500,
        ignored: /(annotations|fonts|bower_components|dist\/styleguide|node_modules|styleguide|images|fonts|assets)/
      }
    }
  };
}

module.exports = createConfig;
