const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin-patch');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const ManifestPlugin = require('webpack-manifest-plugin');
const fs = require('fs');
const deepmerge = require('deepmerge');
const resolve = require('resolve');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const npmSass = require('npm-sass');
const merge = require('webpack-merge');
const SassDocPlugin = require('@bolt/sassdoc-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackProgress } = require('@bolt/build-utils/webpack-helpers');
const {
  webpackStats,
  statsPreset,
} = require('@bolt/build-utils/webpack-verbosity');

const {
  getBoltManifest,
  mapComponentNameToTwigNamespace,
} = require('@bolt/build-utils/manifest');
const log = require('@bolt/build-utils/log');

// Store set of webpack configs used in multiple builds
let webpackConfigs = [];

async function createWebpackConfig(buildConfig, isModern) {
  const config = buildConfig;
  const fullBuildConfig = await getConfig();

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
    path: config.dataDir,
  });

  // map out Twig namespaces with the NPM package name
  const npmToTwigNamespaceMap = await mapComponentNameToTwigNamespace();

  // filename suffix to tack on based on lang being compiled for
  let langSuffix = `${config.lang ? '-' + config.lang : ''}`;

  let themifyOptions = {
    watchForChanges:
      config.watch === true && config.mode !== 'server' ? true : false,
    classPrefix: 't-bolt-',
    screwIE11: config.mode === 'server' ? true : false,
    fallback: {
      filename: 'bolt-css-vars-fallback',
      jsonDataExport: 'theming-css-vars',
    },
  };

  themifyOptions = deepmerge(themifyOptions, {
    fallback: {
      jsonPath: path.resolve(
        config.buildDir,
        `data/${themifyOptions.fallback.jsonDataExport}.json`,
      ),
      cssPath: path.resolve(
        config.buildDir,
        `${themifyOptions.fallback.filename}.css`,
      ),
    },
  });

  // Default global Sass data defined
  let globalSassData = [
    `$bolt-namespace: ${config.namespace};`,
    `$bolt-css-vars-json-data-export: ${themifyOptions.fallback.jsonDataExport};`,
    // output $bolt-lang variable in Sass even if not specified so things fall back accordingly.
    `${config.lang ? `$bolt-lang: ${config.lang};` : '$bolt-lang: null;'}`,
  ];

  // Default global JS data defined
  let globalJsData = {
    'process.env.NODE_ENV': config.prod
      ? JSON.stringify('production')
      : JSON.stringify('development'),
    bolt: {
      mode: JSON.stringify(config.mode),
      isClient: config.mode === 'client' ? true : false,
      isServer: config.mode === 'server' ? true : false,
      namespace: JSON.stringify(config.namespace),
      themingFallbackCSS: JSON.stringify(
        publicPath + themifyOptions.fallback.filename + '.css',
      ),
      config: {
        prod: config.prod ? true : false,
        lang: JSON.stringify(config.lang),
        env: JSON.stringify(config.env),
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
      entry[globalEntryName] = [
        '@bolt/core/styles/index.scss',
        '@bolt/global/styles/index.scss',
        '@bolt/global/styles/index.utils.scss',
      ];

      components.global.forEach(component => {
        if (component.assets.style) {
          entry[globalEntryName].push(component.assets.style);
        }

        if (component.assets.module !== undefined && isModern === true) {
          entry[globalEntryName].push(component.assets.module);
        } else if (component.assets.main) {
          entry[globalEntryName].push(component.assets.main);
        }
      });

      const useHotMiddleware =
        Array.isArray(fullBuildConfig.lang) && fullBuildConfig.lang.length > 1
          ? false
          : true;

      if (!config.prod && config.webpackDevServer && useHotMiddleware) {
        entry[globalEntryName].push(
          `webpack-hot-middleware/client?name=${config.lang}&noInfo=true&quiet=true&logLevel=silent&reload=true`,
        );
      }
    }
    if (components.individual) {
      components.individual.forEach(component => {
        const files = [];
        files.push('@bolt/core/styles/index.with-json-export.scss');

        if (component.assets.style) {
          files.push(component.assets.style);
        }

        if (component.assets.module !== undefined && isModern === true) {
          files.push(component.assets.module);
        } else if (component.assets.main) {
          files.push(component.assets.main);
        }

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
      },
    },
    {
      loader: 'resolve-url-loader',
    },

    {
      loader: 'sass-loader',
      options: {
        sourceMap: config.sourceMaps,
        importer: [npmSass.importer],
        functions: sassExportData,
        precision: 3,
        data: globalSassData.join('\n'),
      },
    },
  ];

  let webpackConfig = {
    target: 'web',
    entry: await buildWebpackEntry(),
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      // @todo: switch this to output .client.js and .server.js file prefixes when we hit Bolt v3.0
      filename: `[name]${langSuffix}${
        config.mode !== 'client' ? `.${config.mode}` : ''
      }.${isModern ? 'mjs' : 'js'}`,
      chunkFilename: `[name]-bundle${langSuffix}-[chunkhash].${
        isModern ? 'mjs' : 'js'
      }`,
      publicPath,
    },
    resolve: {
      mainFields: ['esnext', 'jsnext:main', 'browser', 'module', 'main'],
      extensions: [
        '.js',
        '.jsx',
        '.mjs',
        '.json',
        '.svg',
        '.scss',
        '.ts',
        '.tsx',
      ],
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.scss$/,
          oneOf: [
            {
              issuer: /(\.js|\.mjs)$/,
              use: [scssLoaders].reduce((acc, val) => acc.concat(val), []),
            },
            {
              // no issuer here as it has a bug when its an entry point - https://github.com/webpack/webpack/issues/5906
              use: [
                // 'css-hot-loader',
                MiniCssExtractPlugin.loader,
                scssLoaders,
              ].reduce((acc, val) => acc.concat(val), []),
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: isModern
            ? /node_modules/
            : /(node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                `@bolt/babel-preset-bolt${isModern ? '/index.modern.js' : ''}`,
              ],
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
          test: /\.(cur|svg)$/,
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
    // optimization: {
    //   mergeDuplicateChunks: true,
    // },
    optimization: {
      minimizer: config.prod ? [new TerserPlugin()] : [],
    },
    plugins: [
      new webpack.ProgressPlugin(boltWebpackProgress), // Ties together the Bolt custom Webpack messages + % complete
      new WriteFilePlugin(),
      new MiniCssExtractPlugin({
        filename: `[name]${langSuffix}.css`,
        chunkFilename: `[id]${langSuffix}.css`,
      }),
      // @todo This needs to be in `config.dataDir`
      new ManifestPlugin({
        fileName: `bolt-webpack-manifest${langSuffix}${
          config.mode === 'client' ? '' : `.${config.mode}`
        }.json`,
        publicPath,
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Manifest',
        },
      }),
      new webpack.DefinePlugin(globalJsData),
      new webpack.NamedModulesPlugin(),
      new CopyWebpackPlugin(config.copy ? config.copy : []),
    ],
  };

  if (config.mode !== 'server') {
    webpackConfig.plugins.push(
      new SassDocPlugin(
        {
          src: `${path.dirname(resolve.sync('@bolt/core'))}/styles/`,
          dest: path.resolve(`${config.dataDir}/sassdoc.bolt.json`),
        },
        {
          outputPath: config.buildDir,
        },
      ),
    );
  }

  if (!config.prod && config.webpackDevServer) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    );
  }

  // Enable new experimental cache mode to significantly speed up the initial build times
  // if (config.enableCache && !config.prod) {
  if (config.enableCache) {
    webpackConfig.plugins.push(
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
    );
  }

  if (config.prod) {
    // Optimize JS - https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    // Config recommendation based off of https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1#f548

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

    // @todo evaluate best source map approach for production builds -- particularly source-map vs hidden-source-map
    webpackConfig.devtool =
      config.sourceMaps === false ? '' : 'hidden-source-map';
  } else {
    // not prod
    // @todo fix source maps
    webpackConfig.devtool =
      config.sourceMaps === false ? '' : 'eval-source-map';
  }

  if (config.wwwDir) {
    webpackConfig.devServer = {
      logLevel: 'silent',
      log: false,
      overlayWarnings: true,
      overlay: true,
      quiet: true,
      clientLogLevel: 'none',
      stats: statsPreset(webpackStats[config.verbosity]),
      hot: config.prod ? false : true,
      noInfo: true, // webpackTasks.watch handles output info related to success & failure
      publicPath,
    };
  }

  // Simple Configuration
  // The easiest way to tweak the Bolt webpack config is by providing an object to the configureWebpack option in the `.boltrc.js` config:

  // // .boltrc.js
  // module.exports = {
  //   configureWebpack: {
  //     plugins: [
  //       new MyAwesomeWebpackPlugin()
  //     ]
  //   }
  // }
  // The object will be merged into the final webpack config using webpack-merge.

  if (config.configureWebpack) {
    webpackConfig = merge(webpackConfig, config.configureWebpack);
  }

  return webpackConfig;
}

// Helper function to associate each unique language in the build config with a separate Webpack build instance (making filenames, etc unique);
async function assignLangToWebpackConfig(config, lang, isModern) {
  let langSpecificConfig = config;

  if (lang) {
    langSpecificConfig.lang = lang; // Make sure only ONE language config is set per Webpack build instance.
  }

  let langSpecificWebpackConfig = await createWebpackConfig(
    langSpecificConfig,
    isModern,
  );

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
    if (Array.isArray(langs)) {
      for (const lang of langs) {
        /* eslint-disable no-await-in-loop */
        promises.push(
          await assignLangToWebpackConfig(config, lang, true),
          await assignLangToWebpackConfig(config, lang, false),
        );
      }
    } else if (langs === 'en') {
      promises.push(
        await assignLangToWebpackConfig(config, null, true),
        await assignLangToWebpackConfig(config, null, false),
      );
    } else {
      promises.push(
        await assignLangToWebpackConfig(config, config.lang, true),
        await assignLangToWebpackConfig(config, config.lang, false),
      );
    }

    await Promise.all(promises).then(() => {
      return resolve(webpackConfigs);
    });
  });
};
