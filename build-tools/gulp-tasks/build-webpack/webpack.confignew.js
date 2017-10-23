




/**
 * Plugin configuration
 */
const plugins = isDev ? [
  new CopyWebpackPlugin(copyStatics.copyWebcomponents),
  new ExtractTextPlugin({
    filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
    disable: false,
    allChunks: true
  }),
  new webpack.DefinePlugin({'process.env': processEnv}),
  // new WorkboxPlugin({
  //   globDirectory: outputPath,
  //   globPatterns: ['**/*.{html,js,css}'],
  //   swDest: join(outputPath, 'sw.js')
  // }),
  new webpack.ProvidePlugin({
    h: 'preact'
  }),
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
  new webpack.ProvidePlugin({
    h: 'preact'
  }),
  new CopyWebpackPlugin(
    [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  ),
  // new CleanWebpackPlugin([outputPath], {verbose: true}),
  new webpack.DefinePlugin({'process.env': processEnv})
];


const styleRules = [
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
            babelrc: true,
            // presets: [[
            //   'env',
            //   {
            //     targets: {browsers: BROWSERS},
            //     debug: true
            //   }
            // ]],
            // plugins: [
            //   ['transform-react-jsx', { pragma: 'h' }],
            //   'transform-class-properties',
            //   'transform-custom-element-classes',
            //   'transform-es2015-classes'
            // ]
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
          },
          [].concat(...styleRules)

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
            [].concat(...styleRules)
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
  // plugins,
  // devServer: {
  //   contentBase: resolve(outputPath),
  //   compress: true,
  //   overlay: {
  //     errors: true
  //   },
  //   port: 3000,
  //   host: '0.0.0.0',
  //   disableHostCheck: true
  // }
};
