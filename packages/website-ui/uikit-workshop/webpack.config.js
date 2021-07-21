// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin-patch');
const TerserPlugin = require('terser-webpack-plugin');
const NoEmitPlugin = require('no-emit-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CriticalCssPlugin = require('critical-css-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const selectorImporter = require('node-sass-selector-importer');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('@bolt/prerender-spa-plugin');
const path = require('path');
const Renderer = require('@bolt/uikit-prerenderer');
const puppeteer = require('puppeteer');
const argv = require('yargs').argv;
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');

const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('patternlab');

// @todo: wire these two ocnfigs up to use cosmicconfig!
const defaultConfig = {
  rootDir: process.cwd(),
  buildDir: './dist',
  prod: argv.watch ? false : true, // or false for local dev
  sourceMaps: true,
  watch: argv.watch ? true : false,
  publicPath: './styleguide/',
  copy: [{ from: './src/images/**', to: 'images', flatten: true }],
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

    function getBabelConfig() {
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  // NOTE: I'm not using the `esmodules` target due to this issue:
                  // https://github.com/babel/babel/issues/8809
                  'last 2 Chrome versions',
                  'last 2 Safari versions',
                  'last 2 iOS versions',
                  'last 2 Edge versions',
                  'Firefox ESR',
                  'Edge 18',
                ],
              },
              useBuiltIns: 'entry',
              corejs: 3,
              modules: false,
              debug: false,
            },
          ],
        ],
        plugins: [
          '@babel/plugin-proposal-optional-chaining',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
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
      };
    }

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
          sourceMap: config.sourceMaps,
          plugins: () => [autoprefixer()],
        },
      },
      {
        loader: 'clean-css-loader',
        options: {
          compatibility: 'ie9',
          level: 1, // @todo: test bumping this up to 2
          inline: ['remote'],
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
              options: getBabelConfig(true),
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
        occurrenceOrder: true,
        namedChunks: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        nodeEnv: 'production',
        mergeDuplicateChunks: true,
        concatenateModules: true,
        splitChunks: {
          chunks: 'async',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'async',
              reuseExistingChunk: true,
            },
          },
        },
        minimizer: config.prod
          ? [
              new TerserPlugin({
                test: /\.m?js(\?.*)?$/i,
                sourceMap: config.prod ? false : config.sourceMaps,
                terserOptions: {
                  safari10: true,
                },
              }),
            ]
          : [],
      },
      plugins: [
        new WebpackBar(),
        new CopyPlugin(config.copy),
        new NoEmitPlugin(['css/pattern-lab.js']),
        new HardSourceWebpackPlugin({
          info: {
            level: 'warn',
          },
          // Clean up large, old caches automatically.
          cachePrune: {
            // Caches younger than `maxAge` are not considered for deletion. They must
            // be at least this (default: 2 days) old in milliseconds.
            maxAge: 2 * 24 * 60 * 60 * 1000,
            // All caches together must be larger than `sizeThreshold` before any
            // caches will be deleted. Together they must be at least 300MB in size
            sizeThreshold: 300 * 1024 * 1024,
          },
        }),
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
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          // staticDir: path.join(__dirname, 'dist'),
          staticDir: path.resolve(process.cwd(), `${config.buildDir}/`),
          // Required - Routes to render.
          routes: ['/'],
          postProcess(context) {
            context.html = context.html.replace(
              /<script\s[^>]*charset=\"utf-8\"[^>]*><\/script>/gi,
              '',
            );
            return context;
          },
          renderer: new Renderer({
            // Optional - The name of the property to add to the window object with the contents of `inject`.
            injectProperty: '__PRERENDER_INJECTED',
            // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
            inject: {
              foo: 'bar',
            },
          }),
        }),
        new HtmlWebpackPlugin({
          filename: '../index.html',
          template: path.resolve(__dirname, 'src/html/index.html'),
          inject: false,
        }),
        new MiniCssExtractPlugin({
          filename: `[name].css`,
          chunkFilename: `[id].css`,
          allChunks: true,
        }),
      ],
    };

    // if (localChrome) {
    //   const browserPromise = puppeteer.launch({
    //     executablePath: localChrome,
    //     ignoreHTTPSErrors: true,
    //     args: ['--disable-setuid-sandbox', '--no-sandbox'],
    //     // not required to specify here, but saves Penthouse some work if you will
    //     // re-use the same viewport for most penthouse calls.
    //     defaultViewport: {
    //       width: 1300,
    //       height: 900,
    //     },
    //   });

    //   modernConfig.plugins.push(
    //     new CriticalCssPlugin({
    //       base: path.resolve(__dirname, config.buildDir),
    //       src: 'index.html',
    //       dest: 'index.html',
    //       inline: true,
    //       minify: true,
    //       extract: false,
    //       width: 1300,
    //       height: 900,
    //       penthouse: {
    //         keepLargerMediaQueries: true,

    //         // @todo: troubleshoot why forceInclude works w/ Penthouse directly but not w/ Critical
    //         forceInclude: [
    //           'pl-logo',
    //           '.pl-c-logo',
    //           '.pl-c-logo__img',
    //           '.pl-c-body--theme-light',
    //           '.pl-c-body--theme-sidebar',
    //           '.pl-c-body--theme-sidebar .pl-c-viewport',
    //           '.pl-c-body--theme-density-compact',
    //         ],
    //         timeout: 30000, // ms; abort critical CSS generation after this timeout
    //         maxEmbeddedBase64Length: 1000,
    //         renderWaitTime: 1000,
    //         blockJSRequests: false,
    //         puppeteer: {
    //           executablePath: localChrome,
    //           getBrowser: () => browserPromise
    //         }
    //       },
    //     })
    //   );
    // }

    return resolve(webpackConfig);
  });
};
