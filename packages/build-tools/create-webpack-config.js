const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const npmSass = require('npm-sass');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const ManifestPlugin = require('webpack-manifest-plugin');
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');
const assets = require('./utils/assets');

function createConfig(config) {
  // @TODO: move this setting to .boltrc config
  const sassExportData = require('@theme-tools/sass-export-data')({
    path: path.resolve(process.cwd(), config.dataDir),
  });

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
    const pn = (typeof name === "string") && name.toLowerCase() || name || "none";

    switch (pn) {
      case 'none':
        return {
          all: false
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
          colors: true
        }
    }
  }


  // This workaround has been disabled for now as setting `modules: false` on `css-loader` fixes it; see https://github.com/bolt-design-system/bolt/pull/410
  // Workaround for getting classes with `\@` to compile correctly
  // CSS Classes like `.u-hide\@large` were getting compiled like `.u-hide-large`.
  // Due to this bug: https://github.com/webpack-contrib/css-loader/issues/578
  // Workaround: using the `string-replace-loader` to change `\@` to our `workaroundAtValue` before passing to `css-loader`, then turning it back afterwards.
  // const workaroundAtValue = '-theAtSymbol-';

  const scssLoaders = [
//     {
//       loader: 'string-replace-loader',
//       query: {
//         search: workaroundAtValue,
//         replace: String.raw`\\@`, // needed to ensure `\` comes through
//       },
//     },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: false,
        importLoaders: true,
        localIdentName: '[local]',
      }
    },
//     {
//       loader: 'string-replace-loader',
//       query: {
//         search: '\\@',
//         replace: workaroundAtValue,
//       },
//     },
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          postcssDiscardDuplicates,
          autoprefixer,
        ],
      }
    },
    {
      loader: "clean-css-loader",
      options: {
        skipWarn: true,
        compatibility: "ie9",
        level: config.prod ? 2 : 0,
        inline: ["remote"],
        format: 'beautify',
      }
    },
    {
      loader: "sass-loader",
      options: {
        importer: [
          sassImportGlobbing,
          npmSass.importer,
        ],
        functions: sassExportData,
        outputStyle: "expanded",
        precision: 2
      }
    }
  ];

  // The publicPath config sets the client-side base path for all built / asynchronously loaded assets. By default the loader script will automatically figure out the relative path to load your components, but uses publicPath as a fallback. It's recommended to have it start with a `/`. Note: this ONLY sets the base path the browser requests -- it does not set where files are saved during build. To change where files are saved at build time, use the buildDir config.
  // Must start and end with `/`
  // conditional is temp workaround for when servers are disabled via absence of `config.wwwDir`
  const publicPath = config.wwwDir
    ? `/${path.relative(config.wwwDir, config.buildDir)}/`
    : config.buildDir;

  // THIS IS IT!! The object that gets passed in as WebPack's config object.
  const webpackConfig = {
    entry: assets.buildWebpackEntry(config.components),
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      filename: "[name].js",
      publicPath: publicPath,
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".svg", ".scss"]
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          oneOf: [
            {
              issuer: /\.js$/,
              use: scssLoaders,
            },
            {
              // no issuer here as it has a bug when its an entry point - https://github.com/webpack/webpack/issues/5906
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: scssLoaders,
              })
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@bolt/babel-preset-bolt'],
            }
          }
        },
      ],
    },
    plugins: [
      // Ignore generated output if generated output is on a dependency chain (causes endless loop)
      new webpack.WatchIgnorePlugin([
        /dist\/styleguide/,
        /dist\/annotations/,
        /styleguide/,
        path.join(__dirname, 'node_modules')
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        deepChildren: true,
        children: true,
        minChunks: Infinity,
        async: true
      }),
      new webpack.IgnorePlugin(/vertx/), // needed to ignore vertx dependency in webcomponentsjs-lite
      new ExtractTextPlugin({
        filename: "[name].css",
        // disable: false,
        allChunks: true
      }),
      // @todo This needs to be in `config.dataDir`
      new ManifestPlugin({
        fileName: 'bolt-webpack-manifest.json',
        publicPath: publicPath,
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Manifest'
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ProvidePlugin({
        h: 'preact',
        Promise: 'es6-promise'
      }),
      // Show build progress
      // Disabling for now as it messes up spinners
      // @todo consider bringing it back
      // new webpack.ProgressPlugin({ profile: false }),
    ],
  };

  if (config.prod) {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));

    // Optimize JS - https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    webpackConfig.plugins.push(new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
    }));

    // Optimize CSS - https://github.com/NMFR/optimize-css-assets-webpack-plugin
    webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
      canPrint: config.verbosity > 2,
    }));

    // @todo Evaluate best source map approach for production
    webpackConfig.devtool = 'hidden-source-map';
  } else {// not prod
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
       errors: true
     },
     hot: true,
     inline: true,
     noInfo: true, // webpackTasks.watch handles output info related to success & failure
     publicPath: publicPath,
     watchContentBase: true,
     historyApiFallback: true,
     watchOptions: {
       aggregateTimeout: 500,
       // ignored: /(annotations|fonts|bower_components|dist\/styleguide|node_modules|styleguide|images|fonts|assets)/
       // Poll using interval (in ms, accepts boolean too)
       poll: true,
     }
   }
 }

  return webpackConfig;
}

module.exports = createConfig;
