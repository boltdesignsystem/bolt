const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const ManifestPlugin = require('webpack-manifest-plugin');
const fs = require('fs');
const deepmerge = require('deepmerge');
const resolve = require('resolve');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const npmSass = require('npm-sass');
const { getConfig } = require('./utils/config-store');
const SassDocPlugin = require('./plugins/sassdoc-webpack-plugin');

const {
  getBoltManifest,
  mapComponentNameToTwigNamespace,
} = require('./utils/manifest');
const log = require('./utils/log');

// Store set of webpack configs used in multiple builds
let webpackConfigs = [];

async function createWebpackConfig(buildConfig) {
  const config = buildConfig;

  // The publicPath config sets the client-side base path for all built / asynchronously loaded assets. By default the loader script will automatically figure out the relative path to load your components, but uses publicPath as a fallback. It's recommended to have it start with a `/`. Note: this ONLY sets the base path the browser requests -- it does not set where files are saved during build. To change where files are saved at build time, use the buildDir config.
  // Must start and end with `/`
  // conditional is temp workaround for when servers are disabled via absence of `config.wwwDir`
  const publicPath = config.publicPath
    ? config.publicPath
    : config.wwwDir
      ? `/${path.relative(config.wwwDir, config.buildDir)}/`
      : config.buildDir; // @todo Ensure ends with `/` or we can get `distfonts/` instead of `dist/fonts/`

  // @TODO: move this setting to .boltrc config
  const sassExportData = require('@bolt/sass-export-data')({
    path: path.resolve(process.cwd(), config.dataDir),
  });

  // map out Twig namespaces with the NPM package name
  const npmToTwigNamespaceMap = await mapComponentNameToTwigNamespace();

  // filename suffix to tack on based on lang being compiled for
  let langSuffix = `${config.lang ? '-' + config.lang : ''}`;

  let themifyOptions = {
    watchForChanges: config.watch === true ? true : false,
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
        config.buildDir,
        `data/${themifyOptions.fallback.jsonDataExport}.json`,
      ),
      cssPath: path.resolve(
        process.cwd(),
        config.buildDir,
        `${themifyOptions.fallback.filename}.css`,
      ),
    },
  });

  // Default global Sass data defined
  let globalSassData = [
    `$bolt-namespace: ${config.namespace};`,
    `$bolt-css-vars-json-data-export: ${
      themifyOptions.fallback.jsonDataExport
    };`,
    // output $bolt-lang variable in Sass even if not specified so things fall back accordingly.
    `${
      config.lang && config.lang.length > 1
        ? `$bolt-lang: ${config.lang};`
        : '$bolt-lang: null;'
    }`,
  ];

  // Default global JS data defined
  let globalJsData = {
    'process.env.NODE_ENV': config.prod
      ? JSON.stringify('production')
      : JSON.stringify('development'),
    bolt: {
      namespace: JSON.stringify(config.namespace),
      themingFallbackCSS: JSON.stringify(
        publicPath + themifyOptions.fallback.filename + '.css',
      ),
      config: {
        prod: config.prod ? true : false,
        lang: config.lang,
      },
    },
  };

  // Merge together global Sass data overrides specified in a .boltrc config
  if (config.globalData.scss && config.globalData.scss.length !== 0) {
    const overrideItems = [];
    config.globalData.scss.forEach(item => {
      try {
        const file = fs.readFileSync(item, 'utf8');
        file
          .split('\n')
          .filter(x => x)
          .forEach(x => overrideItems.push(x));
      } catch (err) {
        log.errorAndExit(`Could not find ${item}`, err);
      }
    });

    globalSassData = [...globalSassData, ...overrideItems];
  }

  // Merge together any global JS data overrides
  if (config.globalData.js && config.globalData.js.length !== 0) {
    const overrideJsItems = [];
    config.globalData.js.forEach(item => {
      try {
        const overrideFile = require(path.resolve(process.cwd(), item));
        overrideJsItems.push(overrideFile);
      } catch (err) {
        log.errorAndExit(`Could not find ${item} file`, err);
      }
    });

    globalJsData = deepmerge(globalJsData, ...overrideJsItems);
  }

  /**
   * Build WebPack config's `entry` object
   * @link https://webpack.js.org/configuration/entry-context/#entry
   * @returns {object} entry - WebPack config `entry`
   */
  async function buildWebpackEntry() {
    const { components } = await getBoltManifest();
    const entry = {};
    const globalEntryName = 'bolt-global';

    if (components.global) {
      entry[globalEntryName] = [];

      components.global.forEach(component => {
        if (component.assets.style) {
          entry[globalEntryName].push(component.assets.style);
        }

        if (component.assets.main) {
          entry[globalEntryName].push(component.assets.main);
        }
      });
    }
    if (components.individual) {
      components.individual.forEach(component => {
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
    const pn =
      (typeof name === 'string' && name.toLowerCase()) || name || 'none';

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

  const scssLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: config.sourceMaps,
        modules: false, // needed for JS referencing classNames directly, such as critical fonts
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: config.sourceMaps,
        plugins: () => [
          require('@bolt/postcss-themify')(themifyOptions),
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
        level: config.prod ? 2 : 0,
        format: config.prod ? false : 'beautify',
        inline: ['remote'],
        format: 'beautify',
      },
    },
    {
      loader: 'resolve-url-loader',
    },

    // @todo: conditionally toggle sass-loader vs fast-sass-loader based on --debug flag when sourcemaps are needed
    {
      loader: 'sass-loader',
      options: {
        sourceMap: config.sourceMaps,
        importer: [globImporter(), npmSass.importer],
        functions: sassExportData,
        precision: 3,
        data: globalSassData.join('\n'),
      },
    },
    // @todo: re-evaluate options similar to fast-sass-loader, but w/ importer support
    // {
    //   loader: '@bolt/fast-sass-loader',
    //   options: {
    //     sourceMap: true,
    //     functions: sassExportData,
    //     outputStyle: 'expanded',
    //     precision: 3,
    //     data: globalSassData.join('\n'),
    //   },
    // },
  ];

  // THIS IS IT!! The object that gets passed in as WebPack's config object.
  const webpackConfig = {
    entry: await buildWebpackEntry(),
    // watchOptions: {
    //   ignored: [
    //     path.resolve(process.cwd(), config.buildDir) + '**/*',
    //     path.resolve(process.cwd(), config.wwwDir) + '**/*',
    //     'node_modules',
    //   ],
    // },
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      filename: `[name]${langSuffix}.js`,
      chunkFilename: `[name]-bundle${langSuffix}-[chunkhash].js`,
      publicPath,
    },
    cache: true,
    resolve: {
      mainFields: ['esnext', 'jsnext:main', 'browser', 'module', 'main'],
      extensions: ['.js', '.jsx', '.mjs', '.json', '.svg', '.scss'],
      unsafeCache: true,
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          oneOf: [
            {
              issuer: /\.js$/,
              use: [scssLoaders].reduce((acc, val) => acc.concat(val), []),
            },
            {
              // no issuer here as it has a bug when its an entry point - https://github.com/webpack/webpack/issues/5906
              use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                scssLoaders,
              ].reduce((acc, val) => acc.concat(val), []),
            },
          ],
        },
        {
          test: /\.(js|mjs)$/,
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
          loader: 'url-loader',
          options: {
            limit: 500,
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
        {
          test: [/\.yml$/, /\.yaml$/],
          use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
        },
      ],
    },
    mode: config.prod ? 'production' : 'development',
    optimization: {
      mergeDuplicateChunks: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name]${langSuffix}.css`,
        chunkFilename: `[id]${langSuffix}.css`,
      }),
      // @todo This needs to be in `config.dataDir`
      new ManifestPlugin({
        fileName: `bolt-webpack-manifest${langSuffix}.json`,
        publicPath,
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Manifest',
        },
      }),
      new webpack.DefinePlugin(globalJsData),
      new webpack.NamedModulesPlugin(),
      new CopyWebpackPlugin(config.copy ? config.copy : []),
      new SassDocPlugin(
        {
          src: `${path.dirname(resolve.sync('@bolt/core'))}/styles/`,
          dest: path.resolve(
            process.cwd(),
            `${config.buildDir}/data/sassdoc.bolt.json`,
          ),
        },
        {
          outputPath: config.buildDir,
        },
      ),
    ],
  };

  if (config.prod) {
    // Optimize JS - https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    // Config recommendation based off of https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1#f548
    webpackConfig.plugins.push(
      new UglifyJsPlugin({
        sourceMap: config.sourceMaps,
        parallel: true,
        cache: true,
        uglifyOptions: {
          cache: true,
          compress: true,

          mangle: true,
        },
      }),
    );

    // https://webpack.js.org/plugins/module-concatenation-plugin/
    webpackConfig.plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin(),
    );

    // Optimize CSS - https://github.com/NMFR/optimize-css-assets-webpack-plugin
    webpackConfig.plugins.push(
      new OptimizeCssAssetsPlugin({
        canPrint: config.verbosity > 2,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              mergeLonghand: false, // don't merge longhand values -- required for CSS Vars theming, etc.
              zindex: false, // don't alter `z-index` values
              mergeRules: false, // this MUST be disabled - otherwise certain selectors (ex. ::slotted(*), which IE 11 can't parse) break
            },
          ],
        },
      }),
    );

    // @todo Evaluate best source map approach for production
    webpackConfig.devtool = config.sourceMaps === false ? '' : 'hidden-source-map';
  } else {
    // not prod
    // @todo fix source maps
    webpackConfig.devtool = config.sourceMaps === false ? '' : 'cheap-module-eval-source-map';
  }

  if (config.wwwDir) {
    webpackConfig.devServer = {
      contentBase: [
        path.resolve(process.cwd(), config.wwwDir),
        // @TODO: add Pattern Lab Styleguidekit Assets Default dist path here
      ],
      compress: true,
      clientLogLevel: 'none',
      port: config.proxyPort,
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
      watchOptions: {
        aggregateTimeout: 200,
        //    ignored: /(annotations|fonts|bower_components|dist\/styleguide|node_modules|styleguide|images|fonts|assets)/
        // Poll using interval (in ms, accepts boolean too)
      },
    };
  }

  return webpackConfig;
}

// Helper function to associate each unique language in the build config with a separate Webpack build instance (making filenames, etc unique);
async function assignLangToWebpackConfig(config, lang) {
  let langSpecificConfig = config;

  if (lang) {
    langSpecificConfig.lang = lang; // Make sure only ONE language config is set per Webpack build instance.
  }

  let langSpecificWebpackConfig = await createWebpackConfig(langSpecificConfig);

  if (langSpecificConfig.webpackStats) {
    langSpecificWebpackConfig.profile = true;
    langSpecificWebpackConfig.parallelism = 1;
  }

  webpackConfigs.push(langSpecificWebpackConfig);
}

module.exports = async function() {
  const config = await getConfig();

  return new Promise(async (resolve, reject) => {
    const langs = config.lang;
    const promises = [];

    // update the array of Webpack configs so each config is assigned to only one language (used in the filename's suffix when bundling language-tailed CSS and JS)
    if (langs && langs.length > 1) {
      for (const lang of langs) {
        /* eslint-disable no-await-in-loop */
        promises.push(await assignLangToWebpackConfig(config, lang));
      }
    } else {
      promises.push(await assignLangToWebpackConfig(config, null));
    }

    await Promise.all(promises).then(() => {
      return resolve(webpackConfigs);
    });
  });
};
