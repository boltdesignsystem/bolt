const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const fs = require('fs-extra');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');
const ConcatPlugin = require('webpack-concat-plugin');

const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const ENV = isDev ? 'development' : 'production';
const outputPath = isDev ? path.resolve('src') : path.resolve('./dist');


const BROWSERS = process.env.BROWSERS === 'module' ? ['last 2 Chrome versions', 'Safari 10'] : ['last 2 versions', 'not ie <= 11'];
const IS_MODULE_BUILD = BROWSERS[0].includes('Chrome');
const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

const sassDataExport = `${process.cwd()}/dist/data`;
if (!fs.existsSync(sassDataExport)) {
  fs.mkdirp(sassDataExport);
}


/**
  * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: [{
    from: path.resolve('./node_modules/@webcomponents/custom-elements/src/native-shim.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: path.resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }, {
      from: path.resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: path.resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: path.resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: path.resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    to: path.join(outputPath, 'vendor'),
    flatten: true
  }],
  copyOthers: [{
    from: 'assets/**',
    context: path.resolve('./src'),
    to: outputPath
  }, {
    from: path.resolve('./src/index.html'),
    to: outputPath,
    flatten: true
  }, {
    from: path.resolve('./src/manifest.json'),
    to: outputPath,
    flatten: true
  }]
};
module.exports.copyStatics = copyStatics;






module.exports = (options) => {
  

  // const pkg = require('./package.json');
  
  const workingDir = process.cwd();


  // const styleRules = [
  //   {
  //     loader: 'postcss-loader',
  //     options: {
  //       plugins: function () {
  //         return [
  //           require('autoprefixer')
  //         ];
  //       }
  //     }
  //   },
  //   {
  //     loader: 'clean-css-loader',
  //     options: {
  //       skipWarn: true,
  //       compatibility: 'ie9',
  //       level: 2,
  //       inline: ['remote']
  //     }
  //   },
  //   {
  //     loader: 'sass-loader',
  //     options: {
  //       importer: require('npm-sass').importer,
  //       functions: exportJson(sassDataExport, 'export_data'),
  //       outputStyle: 'compressed',
  //       precision: 2
  //     }
  //   }
  // ];



    
    
  /**
 * Plugin configuration
 */
  const plugins = [
    new webpack.IgnorePlugin(/vertx/), // needed to ignore vertx dependency in webcomponentsjs-lite
    // new CopyWebpackPlugin(copyStatics.copyWebcomponents),
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
      h: 'preact'
      // 'window.customElements': '@webcomponents/custom-elements'
    }),

    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: false,
    //   compress: true,
    //   // compress: {
    //   //   warnings: false,
    //   //   screw_ie8: true,
    //   //   conditionals: true,
    //   //   unused: true,
    //   //   comparisons: true,
    //   //   sequences: true,
    //   //   dead_code: true,
    //   //   evaluate: true,
    //   //   if_return: true,
    //   //   join_vars: true,
    //   // },
    //   output: {
    //     comments: false,
    //   },
    //   exclude: /\.native-shim\.js/i
    // })
  ];
  //  : [
  //     new WorkboxPlugin({
  //       globDirectory: outputPath,
  //       globPatterns: ['**/*.{html,js,css}'],
  //       swDest: path.join(outputPath, 'sw.js')
  //     }),
  //     new ExtractTextPlugin({
  //       filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
  //       disable: false,
  //       allChunks: true
  //     }),
  //     new webpack.ProvidePlugin({
  //       h: 'preact'
  //     }),
      
      
  //   ];


  //   
  //     exclude: /node_modules/,
  //       loader: 'babel-loader',
  //         options: {
  //     presets: [
  //       ['es2015', { modules: false }]
  //     ]
  //   }
  // }

  

  const config = {
    // entry: './src/index.js',
    entry: {
      './src/components/bolt-critical-fonts/dist/critical-fonts': './src/components/bolt-critical-fonts/src/critical-fonts',
      './src/components/bolt-icon/dist/icon': [
        './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
        './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
        './src/components/bolt-icon/src/icon'
      ],
      // './dist/scripts/bolt-icon': [
      //   './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      //   './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      //   './src/components/bolt-icon/src/icon'
      // ],

      './dist/scripts/bolt-app': [
        './src/scripts/bolt-app'
      ],
      './dist/scripts/bolt-critical-path': './src/scripts/bolt-critical-path',
      // './dist/scripts/bolt-webcomponents-loader': [
      //   // '@webcomponents/custom-elements/src/native-shim.js',
      //   // '@webcomponents/webcomponentsjs/webcomponents-loader.js',
      //   // '@webcomponents/custom-elements',
      //   // './src/scripts/bolt-app'
      //   // './src/_patterns/02-components/bolt-critical-fonts/src/critical-fonts',
      //   './src/scripts/bolt-webcomponents-loader'
      // ]
      // './dist/scripts/bolt-app.polyfilled': './src/scripts/bolt-app.polyfilled'
      // './dist/scripts/index': './src/index',
      // './dist/scripts/index.es6': './src/index.es6'
    },

    // output: {
    //   path: outputPath,
    //   filename: IS_MODULE_BUILD ? 'module.bundle.js' : 'bundle.js'
    // },
    output: {
      path: `${process.cwd()}`,
      filename: '[name].min.js',
      // publicPath: `${process.cwd()}/dist/scripts/`
    },
    devtool: 'cheap-module-source-map',
    // devtool: 'cheap-source-map',
    resolve: {
      alias: {
        // modules: path.resolve(__dirname, 'src/scripts/modules/'),
        // 'critical-path': path.resolve(__dirname, 'src/scripts/critical-path/'),
        styles: path.resolve(__dirname, 'src/styles'),
      },
      extensions: ['.js', '.jsx', '.json', '.svg', '.scss']
    },
    
    
    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /\.es6.js$/,
          exclude: /(node_modules|node_modules\/\@webcomponents\/webcomponentsjs|bower_components)/,
          use: {
            loader: 'babel-loader',
            // options: {
            //   babelrc: true,
              
            //   // presets: [
            //   //   ["es2015", { "modules": false }],
            //   //   ['env', {
            //   //     targets: {
            //   //       browsers: [
            //   //         'last 3 versions',
            //   //         'not ie < 9'
            //   //       ]
            //   //     },
            //   //     debug: true
            //   //   }]
            //   // ]
            // }
            options: {
              babelrc: false,
              plugins: [
                [
                  'jsx-pragmatic',
                  {
                    module: 'preact',
                    export: 'h',
                    import: 'h'
                  }
                ],
                [
                  'transform-react-jsx',
                  {
                    pragma: 'h'
                  }
                ],
                ['module-resolver',
                  {
                    root: [
                      './src'
                    ],
                    alias: {
                      h: 'preact'
                    }
                  }
                ],
                'transform-class-properties',
                // 'transform-custom-element-classes',
                // 'transform-es2015-classes',
                'transform-object-assign',
                'transform-object-rest-spread',
                // 'inline-react-svg'
              ],
              
              presets: [
                ['env', {
                  targets: {
                    browsers: [
                      'last 3 versions',
                      'not ie < 9'
                    ]
                  },
                  debug: false
                }],
                'stage-0'
            ]
                // 'es2015',
                // 'react',
              // ]
            }



            // "plugins": [
            //   [
            //     "jsx-pragmatic",
            //     {
            //       "module": "preact",
            //       "export": "h",
            //       "import": "h"
            //     }
            //   ],
            //   [
            //     "transform-react-jsx",
            //     {
            //       "pragma": "h"
            //     }
            //   ],
            //   [
            //     "module-resolver",
            //     {
            //       "root": [
            //         "./src"
            //       ],
            //       "alias": {
            //         "h": "preact"
            //       }
            //     }
            //   ],
              // "transform-custom-element-classes",
            // ]
          }
        },
        // {
        //   test: /\.es6.js$/,
        //   // We need to transpile Polymer itself and other ES6 code
        //   // exclude: /(node_modules)/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       babelrc: false,
        //       presets: [[
        //         'env',
        //         {
        //           targets: { browsers: ['last 2 Chrome versions', 'Safari 10'] },
        //           debug: true
        //         }
        //       ]]
        //     }
        //   }
        // },
        // {
        //   test: /\.(js|jsx)$/,
        //   enforce: 'pre',
        //   exclude: /node_modules/,
        // },
        {
          test: /\.scss$/,
          exclude: /\.scoped.scss$/,
          use: [
            {
              loader: 'css-loader',
              // options: {
              //   sourceMap: true,
              //   modules: true,
              //   importLoaders: true,
              //   localIdentName: '[name]__[local]___[hash:base64:5]'
              // }
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
    plugins, // array of plugins defined higher up in the file
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

  return config;
};
