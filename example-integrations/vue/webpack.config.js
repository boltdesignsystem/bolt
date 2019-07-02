const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlPwaPlugin = require('@vue/cli-plugin-pwa/lib/HtmlPwaPlugin');
const PreloadPlugin = require('@vue/preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  importer: [npmSass.importer],
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
        require('@bolt/build-tools/plugins/postcss-themify')(
          themifyOptions,
        ),
        postcssDiscardDuplicates,
        autoprefixer({
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
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      // 'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    },
    extensions: ['.js', '.jsx', '.vue', '.json'],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          // {
          //   loader: 'cache-loader',
          // },
          {
            loader: 'vue-loader',
            options: {
              transformAssetUrls: {
                video: ['src', 'poster'],
                source: 'src',
                img: ['src', 'srcset', 'data-src', 'data-srcset'],
                'bolt-image': ['src', 'srcset', 'data-src', 'data-srcset'],
                image: 'xlink:href',
              },
              compilerOptions: {
                preserveWhitespace: false,
              },
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
          // {
          //   loader: 'cache-loader',
          // },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: ['.js', '.jsx', '.vue'],
              // cache: true,
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
