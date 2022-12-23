// webpack.config.js
const path = require('path');
const argv = require('yargs').argv;
const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('patternlab');

// Plugins/loaders
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const autoprefixer = require('autoprefixer');
const selectorImporter = require('node-sass-selector-importer');

// @todo: wire these two ocnfigs up to use cosmicconfig!
const defaultConfig = {
  rootDir: process.cwd(),
  buildDir: './dist',
  prod: argv.watch ? false : true, // or false for local dev
  sourceMaps: true,
  watch: argv.watch ? true : false,
  publicPath: './styleguide/',
  copy: [{ from: './src/images/**', to: 'images/[name][ext]' }],
  noViewAll: false,
};

module.exports = function(apiConfig) {
  return new Promise(async resolve => {
    let customConfig = defaultConfig;
    let configToSearchFor;

    if (argv.patternlabrc) {
      configToSearchFor = await explorer.loadSync(argv.patternlabrc);
    } else {
      configToSearchFor = await explorer.searchSync();
    }

    if (configToSearchFor) {
      if (configToSearchFor.config) {
        customConfig = configToSearchFor.config;
      }
    }

    // Allow external flags for modifying PL's prod mode, on top of the .patternlabrc config file
    const config = Object.assign({}, defaultConfig, customConfig, apiConfig);

    // organize the series of plugins to run our Sass through as an external array -- this is necessary since we need to add additional loaders when compiling Sass to standalone CSS files vs compiling Sass and returning an inline-able <style> block of CSS (which we need to do both)
    const scssLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: config.sourceMaps,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer],
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            sourceMap: config.sourceMaps,
            outputStyle: 'expanded',
            importer: [selectorImporter()],
          },
        },
      },
    ];

    const webpackConfig = {
      stats: 'errors-warnings',
      performance: {
        hints: false,
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        },
        mainFields: ['esnext', 'jsnext:main', 'browser', 'module', 'main'],
      },
      entry: {
        'js/patternlab-pattern': path.join(
          __dirname,
          './src/scripts/patternlab-pattern.js',
        ),
        'js/patternlab-viewer': path.join(
          __dirname,
          './src/scripts/patternlab-viewer.js',
        ),
        'css/pattern-lab': path.join(__dirname, './src/sass/pattern-lab.scss'),
      },
      output: {
        // @todo: do we need this to be configurable?
        // path: path.resolve(config.rootDir, `${config.buildDir}/styleguide`),
        path: path.resolve(process.cwd(), `${config.buildDir}/styleguide`),
        publicPath: `${config.publicPath}`,
        filename: '[name].js',
        chunkFilename: `js/[name]-chunk-[chunkhash].js`,
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: require('@bolt/browserslist-config'),
                      },
                    },
                  ],
                ],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
                  '@babel/plugin-syntax-jsx',
                  [
                    '@babel/plugin-transform-react-jsx',
                    {
                      pragma: 'h',
                      pragmaFrag: 'Fragment',
                      throwIfNamespace: false,
                    },
                  ],
                ],
              },
            },
          },
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  interpolate: true,
                  minimize: config.prod ? true : false,
                  minifyCSS: false,
                  minifyJS: config.prod ? true : false,
                  // super important -- this prevents the embedded iframe srcdoc HTML from breaking!
                  preventAttributesEscaping: true,
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              { loader: 'svg-sprite-loader', options: {} },
              'svg-transform-loader',
              'svgo-loader',
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.scss$/,
            oneOf: [
              {
                resourceQuery: /external/, // foo.scss?external
                use: [
                  {
                    loader: 'style-loader',
                    options: { injectType: 'lazySingletonStyleTag' },
                  },
                  scssLoaders,
                ].reduce((acc, val) => acc.concat(val), []),
              },
              {
                // if .scss files are included by JS or HTML files, inline and don't spit out a file
                issuer: /(\.js$|\.html$)/,
                use: [scssLoaders].reduce((acc, val) => acc.concat(val), []),
              },
              {
                // otherwise extract the result and write out a .css file per usual
                use: [MiniCssExtractPlugin.loader, scssLoaders].reduce(
                  (acc, val) => acc.concat(val),
                  [],
                ),
              },
            ],
          },
        ],
      },
      cache: true,
      mode: config.prod ? 'production' : 'development',
      optimization: {
        minimize: config.prod,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        nodeEnv: 'production',
        mergeDuplicateChunks: true,
        concatenateModules: true,
        chunkIds: 'named',
        splitChunks: {
          chunks: 'async',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'async',
              reuseExistingChunk: true,
            },
          },
        },
      },
      plugins: [
        new WebpackBar(),
        new CopyPlugin({ patterns: config.copy }),
        // clear out the buildDir on every fresh Webpack build
        new CleanWebpackPlugin(
          config.watch
            ? []
            : [
                `${config.buildDir}/index.html`,
                `${config.buildDir}/styleguide/css`,
                `${config.buildDir}/styleguide/js`,
              ],
          {
            allowExternal: true,
            verbose: false,

            // perform clean just before files are emitted to the output dir
            beforeEmit: false,
          },
        ),
        new HtmlWebpackPlugin({
          filename: '../index.html',
          template: path.resolve(__dirname, 'src/html/index.html'),
          inject: false,
        }),
        new MiniCssExtractPlugin({
          filename: `[name].css`,
          chunkFilename: `[id].css`,
        }),
      ],
    };

    return resolve(webpackConfig);
  });
};
