module.exports = (options) => {
  const webpack = require('webpack');
  const path = require('path');
  const ManifestPlugin = require('webpack-manifest-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const exportJson = require('node-sass-export');
  const npmSass = require('npm-sass');
  const fs = require('fs-extra');

  // const extractSass = new ExtractTextPlugin({
  //   filename: '[name].[contenthash].css'
  //   // disable: process.env.NODE_ENV === "development"
  // });
  const sassDataExport = `${process.cwd()}/bolt-website/data`;
  if (!fs.existsSync(sassDataExport)) {
    fs.mkdirp(sassDataExport);
  }

  const workingDir = process.cwd();

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
      './src/_patterns/02-components/bolt-critical-fonts/dist/critical-fonts': './src/_patterns/02-components/bolt-critical-fonts/src/critical-fonts',
      './bolt-website/scripts/bolt-app': './src/scripts/bolt-app',
      // 'bolt-app': `${process.cwd()}/src/scripts/bolt-app`,
      // 'patternlab-pattern': `${__dirname}/src/scripts/patternlab-pattern.js`,
      // 'patternlab-viewer': `${__dirname}/src/scripts/patternlab-viewer.js`,
      // 'bolt-critical-fonts-css': `${process.cwd()}/src/_patterns/02-components/bolt-critical-fonts/src/critical-fonts.scss`
    },
    output: {
      path: `${process.cwd()}`,
      filename: '[name].js',
      // publicPath: `${process.cwd()}/bolt-website/scripts/`
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
                  functions: exportJson(sassDataExport, 'export_data'),
                  outputStyle: 'compressed',
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
        filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
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
