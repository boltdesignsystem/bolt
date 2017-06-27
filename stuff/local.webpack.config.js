const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './source/scripts');
const staticsPath = path.join(__dirname, './public');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    //   filename: 'vendor.bundle.js'
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ];

  // if (isProd) {
  //   plugins.push(
  //     new webpack.LoaderOptionsPlugin({
  //       minimize: true,
  //       debug: false
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({
  //       compress: {
  //         warnings: false,
  //         screw_ie8: true,
  //         conditionals: true,
  //         unused: true,
  //         comparisons: true,
  //         sequences: true,
  //         dead_code: true,
  //         evaluate: true,
  //         if_return: true,
  //         join_vars: true
  //       },
  //       output: {
  //         comments: false
  //       }
  //     })
  //   );
  // } else {
  //   // plugins.push(
  //   //   new webpack.HotModuleReplacementPlugin()
  //   // );
  //   
  //   plugins.push(
  //     new webpack.LoaderOptionsPlugin({
  //       minimize: true,
  //       debug: false
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({
  //       compress: {
  //         warnings: false,
  //         screw_ie8: true,
  //         conditionals: true,
  //         unused: true,
  //         comparisons: true,
  //         sequences: true,
  //         dead_code: true,
  //         evaluate: true,
  //         if_return: true,
  //         join_vars: true
  //       },
  //       output: {
  //         comments: false
  //       }
  //     })
  //   );
  // }

  return {
    devtool: 'eval',
    // context: sourcePath,
    // entry: {
    //   app2: './app2.js'
    //   // critical: './critical.js'
    // },
    output: {
      path: staticsPath,
      filename: '[name].built.js'
      // publicPath: '/scripts/',
      // chunkFilename: '[chunkhash].bundle.js'
    },
    module: {
      rules: [
        // {
        //   test: /\.html$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'file-loader',
        //     query: {
        //       name: '[name].[ext]'
        //     },
        //   },
        // },
        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   use: [
        //     'style-loader',
        //     'css-loader'
        //   ]
        // },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
          query: {  
            'presets': [['env', { 
                // "modules": false,
                'targets': {
                    'browsers': ['> 1%', 'last 4 versions', 'ie 9', 'ie >= 10']
                }
            }]]
          }
        }
      ]
    },
    // resolve: {
    //   extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    //   modules: [
    //     path.resolve(__dirname, 'node_modules'),
    //     sourcePath
    //   ]
    // },

    plugins,

    performance: {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning'
    },

    stats: {
      colors: {
        green: '\u001b[32m'
      }
    }

    // devServer: {
    //   contentBase: './source/scripts',
    //   historyApiFallback: true,
    //   port: 3000,
    //   compress: isProd,
    //   inline: !isProd,
    //   hot: !isProd,
    //   stats: {
    //     assets: true,
    //     children: false,
    //     chunks: false,
    //     hash: false,
    //     modules: false,
    //     publicPath: false,
    //     timings: true,
    //     version: false,
    //     warnings: true,
    //     colors: {
    //       green: '\u001b[32m'
    //     }
    //   }
    // }
  };
};