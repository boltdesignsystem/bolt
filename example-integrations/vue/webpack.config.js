const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlPwaPlugin = require('@vue/cli-plugin-pwa/lib/HtmlPwaPlugin');
const PreloadPlugin = require('@vue/preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const globImporter = require('node-sass-glob-importer');
const npmSass = require('npm-sass');
const path = require('path');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const deepmerge = require('deepmerge');
const autoprefixer = require('autoprefixer');

let globalSassData = [
  `$bolt-namespace: 'bolt';`,
  `$bolt-css-vars-json-data-export: 'theming-css-vars';`,
  '$bolt-lang: null;',
];

let globalJsData = {
  'process.env': {
    NODE_ENV: '"development"',
    BASE_URL: '"/"',
  },
  bolt: {
    namespace: '"bolt"',
  },
};

const sassExportData = require('@bolt/sass-export-data')({
  path: path.resolve(process.cwd(), 'dist'),
});

const sassLoaderOptions = {
  sourceMap: false,
  importer: [globImporter(), npmSass.importer],
  functions: sassExportData,
  precision: 3,
  data: globalSassData.join('\n'),
};

const scssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      // modules: true,
      localIdentName: '[name]_[local]_[hash:base64:5]',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
      plugins: () => [
        require('../../packages/build-tools/plugins/postcss-themify')(
          themifyOptions,
        ),
        postcssDiscardDuplicates,
        autoprefixer({
          browsers: require('@bolt/config-browserlist'),
          grid: true,
        }),
      ],
    },
  },
  {
    loader: 'clean-css-loader',
    options: {
      inline: ['remote'],
      // level: config.prod ? 2 : 0,
      level: 0,
      // format: config.prod ? false : 'beautify',
      format: 'beautify',
    },
  },
  {
    loader: 'resolve-url-loader',
  },

  // @todo: conditionally toggle sass-loader vs fast-sass-loader based on --debug flag when sourcemaps are needed
  {
    loader: 'sass-loader',
    options: sassLoaderOptions,
  },
];

let themifyOptions = {
  // watchForChanges: config.prod ? false : true,
  classPrefix: 't-bolt-',
  screwIE11: false,
  fallback: {
    filename: 'bolt-css-vars-fallback',
    jsonDataExport: 'theming-css-vars',
  },
};

themifyOptions = deepmerge(themifyOptions, {
  fallback: {
    jsonPath: path.resolve(
      process.cwd(),
      'dist',
      `${themifyOptions.fallback.jsonDataExport}.json`,
    ),
    cssPath: path.resolve(
      process.cwd(),
      'dist',
      `${themifyOptions.fallback.filename}.css`,
    ),
  },
});

module.exports = {
  mode: 'development',
  context: 'vue-example',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': './src',
      vue$: './dist/vue.runtime.esm.js',
    },
    extensions: ['.js', '.jsx', '.vue', '.json'],
    modules: ['node_modules', './node_modules/@vue/cli-service/node_modules'],
  },
  resolveLoader: {
    modules: [
      'node_modules',
      './node_modules',
      './node_modules/@vue/cli-service/node_modules',
    ],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: './node_modules/.cache/vue-loader',
              cacheIdentifier: '67c7be48',
            },
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
              cacheDirectory: './node_modules/.cache/vue-loader',
              cacheIdentifier: '67c7be48',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              ...scssLoaders,
            ],
          },
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              ...scssLoaders,
            ],
          },
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              ...scssLoaders,
            ],
          },
          {
            use: scssLoaders,
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: './node_modules/.cache/babel-loader',
              cacheIdentifier: '97f03d5e',
            },
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [/node_modules/, './node_modules/@vue/cli-service/lib'],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: ['.js', '.jsx', '.vue'],
              cache: true,
              cacheIdentifier: '6b9eb7c0',
              emitWarning: true,
              emitError: false,
            },
          },
        ],
      },
      {
        test: [/\.yml$/, /\.yaml$/],
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[id].css`,
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(globalJsData),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      templateParameters: {
        BASE_URL: '/',
      },
      template: './public/index.html',
    }),
    new HtmlPwaPlugin({
      name: 'vue-example',
    }),
    new PreloadPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [/\.map$/, /hot-update\.js$/],
    }),
    new PreloadPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: './dist',
        ignore: ['index.html', '.DS_Store'],
      },
    ]),
  ],
  entry: {
    app: ['./src/main.js'],
  },
};
