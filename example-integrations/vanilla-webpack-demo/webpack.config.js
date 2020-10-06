const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const postCSSLoaderPlugins = [
  require('@bolt/postcss-themify')({
    watchForChanges: false,
    // watchForChanges: config.watch && config.mode !== 'server',
    classPrefix: 't-bolt-',
    screwIE11: true,
    fallback: {
      filename: 'bolt-css-vars-fallback',
      jsonPath: path.resolve(`./dist/theming-css-vars.bolt.json`),
      cssPath: path.resolve(`./dist/bolt-css-vars-fallback.css`),
    },
  }),
  autoprefixer({
    grid: true,
  }),
];

const sassLoaderOptions = {
  prependData: `
    $bolt-namespace: 'bolt';
    $bolt-css-vars-json-data-export: 'theming-css-vars.bolt';
    $bolt-lang: null;
  `,
  sassOptions: {
    outputStyle: 'nested',
    importer: [require('npm-sass').importer],
    functions: require('@bolt/sass-export-data')({
      path: './dist',
    }),
  },
};

module.exports = {
  // entry: {
  //   main: ['./index.scss', './index.js'],
  // },
  entry: ['./index.scss', './index.js'],
  output: {
    path: path.resolve(process.cwd(), './dist'),
  },
  resolve: {
    // extensions: ['.js', '.mjs'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
        cache: true,
        parallel: true,
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          // {
          //   issuer: /\.scss$/,
          //   use: [
          //     {
          //       loader: 'file-loader',
          //       options: {
          //         name: '[name].[ext]',
          //       },
          //     },
          //     {
          //       loader: 'svgo-loader',
          //       // options: {
          //       //   plugins: require('./svgo-plugins'),
          //       // },
          //     },
          //   ],
          // },
          {
            use: [
              {
                loader: 'svg-sprite-loader',
                options: {
                  spriteFilename: svgPath =>
                    `bolt-svg-sprite${svgPath.substr(-4)}`,
                },
              },
              {
                loader: '@bolt/file-passthrough-loader',
                options: {
                  name: 'icons/[name].[ext]',
                },
              },
              '@bolt/svg-transform-loader',
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [
                    // {
                    //   cleanupAttrs: true,
                    // },
                    // {
                    //   removeDoctype: true,
                    // },
                    // {
                    //   removeXMLProcInst: true,
                    // },
                    // {
                    //   removeComments: true,
                    // },
                    // {
                    //   removeMetadata: true,
                    // },
                    // {
                    //   removeTitle: true,
                    // },
                    // {
                    //   removeDesc: true,
                    // },
                    // {
                    //   removeUselessDefs: true,
                    // },
                    // {
                    //   removeEditorsNSData: true,
                    // },
                    // {
                    //   removeEmptyAttrs: true,
                    // },
                    // {
                    //   removeHiddenElems: true,
                    // },
                    // {
                    //   removeEmptyText: true,
                    // },
                    // {
                    //   removeEmptyContainers: true,
                    // },
                    {
                      removeViewBox: false,
                    },
                    // {
                    //   cleanupEnableBackground: true,
                    // },
                    // {
                    //   convertStyleToAttrs: true,
                    // },
                    // {
                    //   convertColors: true,
                    // },
                    // {
                    //   convertPathData: {
                    //     applyTransforms: true,
                    //     applyTransformsStroked: true,
                    //     makeArcs: {
                    //       threshold: 2.5, // coefficient of rounding error
                    //       tolerance: 0.5, // percentage of radius
                    //     },
                    //     straightCurves: true,
                    //     lineShorthands: true,
                    //     curveSmoothShorthands: true,
                    //     floatPrecision: 1,
                    //     transformPrecision: 1,
                    //     removeUseless: true,
                    //     collapseRepeated: true,
                    //     utilizeAbsolute: true,
                    //     leadingZero: true,
                    //     negativeExtraSpace: true,
                    //     noSpaceAfterFlags: true,
                    //     forceAbsolutePath: false,
                    //   },
                    // },
                    // {
                    //   convertTransform: {
                    //     convertToShorts: true,
                    //     floatPrecision: 1,
                    //     transformPrecision: 1,
                    //     matrixToTransform: true,
                    //     shortTranslate: true,
                    //     shortScale: true,
                    //     shortRotate: true,
                    //     removeUseless: true,
                    //     collapseIntoOne: true,
                    //     leadingZero: true,
                    //     negativeExtraSpace: false,
                    //   },
                    // },
                    // {
                    //   removeUnknownsAndDefaults: true,
                    // },
                    // {
                    //   removeNonInheritableGroupAttrs: true,
                    // },
                    // {
                    //   removeUselessStrokeAndFill: true,
                    // },
                    // {
                    //   removeUnusedNS: true,
                    // },
                    // {
                    //   cleanupIDs: true,
                    // },
                    // {
                    //   cleanupNumericValues: {
                    //     floatPrecision: 1,
                    //     leadingZero: true,
                    //     defaultPx: true,
                    //     convertToPx: true,
                    //   },
                    // },
                    // {
                    //   moveElemsAttrsToGroup: true,
                    // },
                    // {
                    //   moveGroupAttrsToElems: true,
                    // },
                    // {
                    //   removeRasterImages: false,
                    // },
                    // {
                    //   mergePaths: {
                    //     collapseRepeated: true,
                    //     force: true,
                    //     leadingZero: true,
                    //     negativeExtraSpace: true,
                    //     noSpaceAfterFlags: true,
                    //   },
                    // },
                    // {
                    //   convertShapeToPath: true,
                    // },
                    // {
                    //   sortAttrs: true,
                    // },
                    {
                      removeDimensions: true,
                    },
                  ],
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
            issuer: /\.js$/,
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => postCSSLoaderPlugins,
                },
              },
              {
                loader: 'clean-css-loader',
                options: {
                  level: 2,
                },
              },
              {
                loader: 'sass-loader',
                options: sassLoaderOptions,
              },
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => postCSSLoaderPlugins,
                },
              },
              {
                loader: 'sass-loader',
                options: sassLoaderOptions,
              },
            ],
          },
        ],
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  corejs: 3,
                  useBuiltIns: 'entry',
                  targets: {
                    browsers: [
                      'last 2 Chrome versions',
                      'last 2 Safari versions',
                      'last 2 iOS versions',
                      'last 2 Edge versions',
                      'Firefox ESR',
                    ],
                  },
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  decoratorsBeforeExport: true,
                },
              ],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-syntax-jsx' /* [1] */,
              [
                '@babel/plugin-transform-react-jsx' /* [1] */,
                {
                  pragma: 'h',
                  pragmaFrag: 'Fragment',
                  throwIfNamespace: false,
                  useBuiltIns: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(
          path.dirname(require.resolve(`@bolt/components-typeahead`)),
          '__demos__/typeahead.data.json',
        ),
        to: path.join(__dirname, './dist/build/data'),
      },
    ]),
    new webpack.DefinePlugin({
      bolt: {
        isClient: true,
        isServer: false,
        namespace: JSON.stringify('bolt'),
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!**/*.bolt.json'],
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
      module: /\.js$/,
    }),
  ],
};
