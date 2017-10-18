const {resolve, join} = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const path = require('path');
// const ManifestPlugin = require('webpack-manifest-plugin');
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

const pkg = require('./package.json');

/**
 * === ENV configuration
 */
const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const ENV = isDev ? 'development' : 'production';
const BROWSERS = process.env.BROWSERS === 'module' ? ['last 2 Chrome versions', 'Safari 10'] : ['last 2 versions', 'not ie <= 11'];
const IS_MODULE_BUILD = BROWSERS[0].includes('Chrome');
const outputPath = isDev ? resolve('src') : resolve('dist');
const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};


/**
 * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: [{
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    to: join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'),
    to: join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'),
    to: join(outputPath, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    to: join(outputPath, 'vendor'),
    flatten: true
  }],
  copyOthers: [{
    from: 'assets/**',
    context: resolve('./src'),
    to: outputPath
  }, {
    from: resolve('./src/index.html'),
    to: outputPath,
    flatten: true
  }, {
    from: resolve('./src/manifest.json'),
    to: outputPath,
    flatten: true
  }]
};

/**
 * Plugin configuration
 */
const plugins = isDev ? [
  //new CopyWebpackPlugin(copyStatics.copyWebcomponents),
  new ExtractTextPlugin({
    filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
    disable: false,
    allChunks: true
  }),
  new webpack.DefinePlugin({'process.env': processEnv}),
  new WorkboxPlugin({
    globDirectory: outputPath,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: join(outputPath, 'sw.js')
  })
] : [
  new WorkboxPlugin({
    globDirectory: outputPath,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: join(outputPath, 'sw.js')
  }),
  new ExtractTextPlugin({
    filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
    disable: false,
    allChunks: true
  }),
  // new CopyWebpackPlugin(
  //   [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  // ),
  new CleanWebpackPlugin([outputPath], {verbose: true}),
  new webpack.DefinePlugin({'process.env': processEnv})
];

/**
 * === Webpack configuration
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: IS_MODULE_BUILD ? 'module.bundle.js' : 'bundle.js'
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
            babelrc: false,
            presets: [[
              'env',
              {
                targets: {browsers: BROWSERS},
                debug: true
              }
            ]],
            plugins: [
              ['transform-react-jsx', { pragma: 'h' }],
              'transform-class-properties',
              'transform-custom-element-classes',
              'transform-es2015-classes'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /\.scoped.scss$/,
        // use: ['to-string-loader', 'css-loader', 'sass-loader']
        use: [
          {
            loader: 'to-string-loader',
          },
          {
            loader: 'css-loader',
            // options: {
            //   sourceMap: true,
            //   // modules: true,
            //   // importLoaders: true,
            //   // localIdentName: '[name]__[local]___[hash:base64:5]'
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
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
          
        // })
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
        test: /\.svg$/,
        use: [
          'desvg-loader/preact', // 👈 Add loader (use 'desvg/preact' for Preact)
          'svg-loader' // 👈 svg-loader must precede desvg-loader
        ]
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
  plugins,
  devServer: {
    contentBase: resolve(outputPath),
    compress: true,
    overlay: {
      errors: true
    },
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
