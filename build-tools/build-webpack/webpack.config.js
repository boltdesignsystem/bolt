

module.exports = (options) => {
  const webpack = require('webpack');
  const path = require('path');
  const ManifestPlugin = require('webpack-manifest-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const exportJson = require('node-sass-export');
  const npmSass = require('npm-sass');

  // const extractSass = new ExtractTextPlugin({
  //   filename: '[name].[contenthash].css'
  //   // disable: process.env.NODE_ENV === "development"
  // });

  const sassDataExport = `${process.cwd()}/bolt-website/data`;

  const config = {
    resolve: {
      alias: {
        // modules: path.resolve(__dirname, 'src/scripts/modules/'),
        // 'critical-path': path.resolve(__dirname, 'src/scripts/critical-path/'),
        styles: path.resolve(__dirname, 'src/styles'),
        // jquery: 'jquery/dist/jquery.js'
      },
      extensions: ['.js', '.jsx', '.json', '.svg', '.scss']
    },
    entry: {
      // 'patternlab-pattern': `${__dirname}/src/scripts/patternlab-pattern.js`,
      // 'patternlab-viewer': `${__dirname}/src/scripts/patternlab-viewer.js`,
      'bolt-critical-path': `${process.cwd()}/src/scripts/bolt-critical-path`,
      'bolt-critical-fonts': './src/styles/bolt-critical-fonts'
    },
    output: {
      path: `${process.cwd()}/bolt-website/`,
      filename: 'scripts/[name].min.js',
      publicPath: `${process.cwd()}/bolt-website/scripts/`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
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
                loader: 'sass-loader',
                options: {
                  importer: require('npm-sass').importer,
                  functions: exportJson(sassDataExport, 'export_data'),
                  outputStyle: 'expanded',
                  precision: 2
                }
              }
            ]
          })
          // use: [{
          //   loader: 'style-loader'
          // }, {
          //   loader: "css-loader"
          // }, {
          //   loader: "sass-loader",
          //   options: {
          //     // includePaths: [
          //     //   'node_modules',
          //     //   'pattern-lab/node_modules'
          //     // ],
              
          //   }
          // }]
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
              ['es2015', { modules: false }]
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
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'styles/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
        disable: false,
        allChunks: true
      }),
      // new ExtractTextPlugin({ 
      //   filename: 'bolt.css',
      //   publicPath: '/'
      // }),
      new ManifestPlugin({
        fileName: 'bolt-manifest.json',
        // basePath: '/scripts/',
        publicPath: '/',
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Manifest'
        }
      })
      // extractSass
      // new ExtractTextPlugin({
      //   filename: './../css/[name].css',
      // })
    ]
  };

  return config;
};
