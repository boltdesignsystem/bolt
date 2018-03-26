const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const npmSass = require('npm-sass');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const ManifestPlugin = require('webpack-manifest-plugin');
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');
const { getBoltManifest } = require('./utils/manifest');
const fs = require('fs-extra');

function createConfig(config) {
  // @TODO: move this setting to .boltrc config
  const sassExportData = require('@theme-tools/sass-export-data')({
    path: path.resolve(process.cwd(), config.dataDir),
  });

  /**
   * Build WebPack config's `entry` object
   * @link https://webpack.js.org/configuration/entry-context/#entry
   * @returns {object} entry - WebPack config `entry`
   */
  function buildWebpackEntry() {
    const { components } = getBoltManifest();
    const entry = {};
    if (components.global) {
      entry['bolt-global'] = [];
      components.global.forEach((component) => {
        if (component.assets.style) entry['bolt-global'].push(component.assets.style);
        if (component.assets.main) entry['bolt-global'].push(component.assets.main);
      });
    }
    if (components.individual) {
      components.individual.forEach((component) => {
        const files = [];
        if (component.assets.style) files.push(component.assets.style);
        if (component.assets.main) files.push(component.assets.main);
        if (files) {
          entry[component.basicName] = files;
        }
      });
    }
    if (config.verbosity > 4) {
      log.info('WebPack `entry`:');
      console.log(entry);
    }
    return entry;
  }

  // Map out the global config verbosity setting to the 6 preset levels of Webpack stats: https://webpack.js.org/configuration/stats/#stats + https://github.com/webpack/webpack/blob/b059e07cf90db871fe9497f5c14b9383fc71d2ad/lib/Stats.js#L906

  const webpackStats = {
    0: 'none', // Output nothing
    1: 'errors-only', // only output when errors happen
    2: 'minimal', // only output when errors or new compilation happen
    3: 'normal', // standard output
    4: 'detailed',
    5: 'verbose', // output everything
  };

  function statsPreset(name) {
    /**
     * Accepted values: none, errors-only, minimal, normal, detailed,
     * verbose. Any other falsy value will behave as 'none', truthy
     * values as 'normal'
     */
    const pn = (typeof name === 'string') && name.toLowerCase() || name || 'none';

    switch (pn) {
      case 'none':
        return {
          all: false,
        };
      case 'verbose':
        return {
          entrypoints: true,
          modules: false,
          colors: true,
          chunks: true,
          chunkModules: true,
          chunkOrigins: true,
          depth: true,
          env: true,
          reasons: true,
          usedExports: true,
          providedExports: true,
          optimizationBailout: true,
          errorDetails: true,
          publicPath: true,
          exclude: () => false,
          maxModules: Infinity,
        };
      case 'detailed':
        return {
          entrypoints: true,
          chunks: true,
          colors: true,
          chunkModules: false,
          chunkOrigins: true,
          depth: true,
          usedExports: true,
          providedExports: true,
          optimizationBailout: true,
          errorDetails: true,
          publicPath: true,
          exclude: () => false,
          maxModules: Infinity,
        };
      case 'minimal':
        return {
          all: false,
          colors: true,
          modules: true,
          maxModules: 0,
          errors: true,
          warnings: true,
        };
      case 'errors-only':
        return {
          all: false,
          colors: true,
          errors: true,
          moduleTrace: true,
        };
      default:
        return {
          colors: true,
        };
    }
  }


  // Output CSS module data as JSON.
  // @todo: enable when ready for CSS Modules
  // function getJSONFromCssModules(cssFileName, json) {
  //   const cssName = path.basename(cssFileName, '.css');
  //   const jsonFileName = path.resolve(process.cwd(), config.buildDir, `${cssName}.json`);
  //   fs.writeFileSync(jsonFileName, JSON.stringify(json));
  // }

  /** This workaround has been disabled for now as setting
    * `modules: false` on `css-loader` fixes it; see https://github.com/bolt-design-system/bolt/pull/410
    * Workaround for getting classes with `\@` to compile correctly
    * CSS Classes like `.u-hide\@large` were getting compiled like `.u-hide-large`.
    * Due to this bug: https://github.com/webpack-contrib/css-loader/issues/578
    * Workaround: using the `string-replace-loader` to
    * change `\@` to our `workaroundAtValue` before
    * passing to `css-loader`, then turning it back
    * afterwards.
    */
  const workaroundAtValue = '-theSlashSymbol-';

  const scssLoaders = [
    {
      loader: 'string-replace-loader',
      query: {
        search: workaroundAtValue,
        replace: String.raw`\\`, // needed to ensure `\` comes through
        flags: 'g',
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: false, // needed for JS referencing classNames directly, such as critical fonts
        importLoaders: 5,
      },
    },
    {
      loader: 'string-replace-loader',
      query: {
        search: /\\/,
        replace: workaroundAtValue,
        flags: 'g',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [
          postcssDiscardDuplicates,
          autoprefixer,
        ],
      },
    },
    {
      loader: 'clean-css-loader',
      options: {
        skipWarn: true,
        compatibility: 'ie9',
        level: config.prod ? 1 : 0,
        inline: ['remote'],
        format: 'beautify',
      },
    },
    {
      loader: 'resolve-url-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        importer: [
          sassImportGlobbing,
          npmSass.importer,
        ],
        functions: sassExportData,
        outputStyle: 'expanded',
        precision: 2,
      },
    },
  ];

  // The publicPath config sets the client-side base path for all built / asynchronously loaded assets. By default the loader script will automatically figure out the relative path to load your components, but uses publicPath as a fallback. It's recommended to have it start with a `/`. Note: this ONLY sets the base path the browser requests -- it does not set where files are saved during build. To change where files are saved at build time, use the buildDir config.
  // Must start and end with `/`
  // conditional is temp workaround for when servers are disabled via absence of `config.wwwDir`
  const publicPath = config.wwwDir
    ? `/${path.relative(config.wwwDir, config.buildDir)}/`
    : config.buildDir; // @todo Ensure ends with `/` or we can get `distfonts/` instead of `dist/fonts/`

  // THIS IS IT!! The object that gets passed in as WebPack's config object.
  const webpackConfig = {
    entry: buildWebpackEntry(),
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      filename: '[name].js',
      publicPath,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.svg', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          oneOf: [
            {
              issuer: /\.js$/,
              use: [
                scssLoaders,
              ].reduce((acc, val) => acc.concat(val), []),
            },
            {
              // no issuer here as it has a bug when its an entry point - https://github.com/webpack/webpack/issues/5906
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                scssLoaders,
              ].reduce((acc, val) => acc.concat(val), []),
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: ['@bolt/babel-preset-bolt'],
            },
          },
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },
    mode: 'development',
    // optimization: {
    //   splitChunks: {
    //     // chunks: 'all',
    //     cacheGroups: {
    //       js: {
    //         test: /\.js$/,
    //         // name: 'commons',
    //         chunks: 'all',
    //         minChunks: 2,
    //         // test: /node_modules/,
    //         // enforce: true,
    //       },
    //       css: {
    //         test: /\.s?css$/,
    //         chunks: 'all',
    //         minChunks: 2,
    //         // enforce: true,
    //       },
    //     },
    //   },
    // },
    plugins: [
      // Ignore generated output if generated output is on a dependency chain (causes endless loop)
      new webpack.WatchIgnorePlugin([
        /dist\/styleguide/,
        /dist\/annotations/,
        /styleguide/,
        path.join(__dirname, 'node_modules'),
      ]),
      new webpack.IgnorePlugin(/vertx/), // needed to ignore vertx dependency in webcomponentsjs-lite
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      // @todo This needs to be in `config.dataDir`
      new ManifestPlugin({
        fileName: 'bolt-webpack-manifest.json',
        publicPath,
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Manifest',
        },
      }),
      new webpack.ProvidePlugin({
        Promise: 'es6-promise',
      }),
      // Show build progress
      // Disabling for now as it messes up spinners
      // @todo consider bringing it back
      // new webpack.ProgressPlugin({ profile: false }),
    ],
  };

  if (!config.prod) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
    );
  }

  if (config.prod) {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));

    // Optimize JS - https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    // Config recommendation based off of https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1#f548
    webpackConfig.plugins.push(new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        cache: true,
        compress: true,

        mangle: true,
      },
    }));

    // https://webpack.js.org/plugins/module-concatenation-plugin/
    webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    // Optimize CSS - https://github.com/NMFR/optimize-css-assets-webpack-plugin
    webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
      canPrint: config.verbosity > 2,
    }));

    // @todo Evaluate best source map approach for production
    webpackConfig.devtool = 'hidden-source-map';
  } else { // not prod
    // @todo fix source maps
    webpackConfig.devtool = 'cheap-module-eval-source-map';
  }


  if (config.wwwDir) {
    webpackConfig.devServer = {
      contentBase: [
        path.resolve(process.cwd(), config.wwwDir),
      // @TODO: add Pattern Lab Styleguidekit Assets Default dist path here
      ],
      compress: true,
      clientLogLevel: 'none',
      port: 8080,
      stats: statsPreset(webpackStats[config.verbosity]),
      overlay: {
        errors: true,
      },
      hot: !!config.prod,
      inline: true,
      noInfo: true, // webpackTasks.watch handles output info related to success & failure
      publicPath,
      watchContentBase: true,
      historyApiFallback: true,
    };
  }

  return webpackConfig;
}

module.exports = createConfig;
