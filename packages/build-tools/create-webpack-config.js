const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin-patch');
const TerserPlugin = require('terser-webpack-plugin');
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
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackProgress } = require('@bolt/build-utils/webpack-helpers');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {
  webpackStats,
  statsPreset,
} = require('@bolt/build-utils/webpack-verbosity');

const babelConfig = require('@bolt/babel-preset-bolt');

const {
  getBoltManifest,
  mapComponentNameToTwigNamespace,
} = require('@bolt/build-utils/manifest');
const log = require('@bolt/build-utils/log');

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
    path: config.dataDir,
  });

  // map out Twig namespaces with the NPM package name

  // filename suffix to tack on based on lang being compiled for
  let langSuffix = `${config.lang ? '-' + config.lang : ''}`;

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
      entry[globalEntryName] = ['@bolt/core-v3.x/styles/main.scss'];

      if (config.env !== 'drupal') {
        entry['brightcove'] = ['@bolt/components-video/brightcove.scss'];
      }

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

  function getSassLoaders() {
    // Default global Sass data defined
    let globalSassData = [
      `$bolt-namespace: ${config.namespace};`,
      // output $bolt-lang variable in Sass even if not specified so things fall back accordingly.
      `${config.lang ? `$bolt-lang: ${config.lang};` : '$bolt-lang: null;'}`,
    ];

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

    return [
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
          level: config.prod ? 1 : 0,
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
          prependData: globalSassData.join('\n'),
          sassOptions: {
            outputStyle: 'nested',
            importer: [npmSass.importer],
            functions: sassExportData,
            precision: 3,
          },
        },
      },
    ];
  }

  let sharedWebpackConfig = {
    target: 'web',
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.mjs',
        '.json',
        '.svg',
        '.scss',
        '.ts',
        '.tsx',
        '.jpg',
      ],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      },
    },
    module: {
      rules: [
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
            {
              issuer: /\.scss$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                  },
                },
                {
                  loader: 'svgo-loader',
                  options: {
                    plugins: require('./svgo-plugins'),
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    babelrc: false,
                    presets: [babelConfig],
                  },
                },
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
                    plugins: require('./svgo-plugins'),
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.(cur|png|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: [/\.yml$/, /\.yaml$/],
          use: ['json-loader', 'yaml-loader'],
        },
        {
          test: [/\.html$/],
          loader: 'raw-loader', // file as string
        },
      ],
    },
    mode: config.prod ? 'production' : 'development',
    optimization: {
      sideEffects: true,
      usedExports: true,
      minimizer: config.prod
        ? [
            new TerserPlugin({
              test: /\.m?js(\?.*)?$/i,
              sourceMap: config.sourceMaps,
              cache: true,
              parallel: true,
              terserOptions: {
                safari10: true,
              },
            }),
          ]
        : [],
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          id: '__SVG_SPRITE_NODE__',
          style: 'position: absolute; width: 0; height: 0',
        },
      }),
      new webpack.ProgressPlugin(boltWebpackProgress), // Ties together the Bolt custom Webpack messages + % complete
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };

  if (config.prod) {
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    sharedWebpackConfig.plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin(),
    );

    // Optimize CSS - https://github.com/NMFR/optimize-css-assets-webpack-plugin
    sharedWebpackConfig.plugins.push(
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
              reduceTransforms: false, // this will convert translate3d(0,0,0) to tranlateZ(0) which breaks animation transitions
            },
          ],
        },
      }),
    );

    // @todo evaluate best source map approach for production builds -- particularly source-map vs hidden-source-map
    sharedWebpackConfig.devtool =
      config.sourceMaps === false ? '' : 'hidden-source-map';
  } else {
    // not prod
    // @todo fix source maps
    sharedWebpackConfig.devtool =
      config.sourceMaps === false ? '' : 'eval-source-map';
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
    sharedWebpackConfig = merge(sharedWebpackConfig, config.configureWebpack);
  }

  // Generate global JS data based on if the build is for ES Module-supporting browsers or not
  function getGlobalJSData() {
    let globalJsData = {
      'process.env.NODE_ENV': config.prod
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      bolt: {
        publicPath: JSON.stringify(publicPath),
        mode: JSON.stringify(config.mode),
        isClient: config.mode === 'client',
        isServer: config.mode === 'server',
        namespace: JSON.stringify(config.namespace),
        config: {
          prod: config.prod,
          lang: JSON.stringify(config.lang),
          env: JSON.stringify(config.env),
        },
      },
    };

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

    return globalJsData;
  }

  const webpackConfig = merge(sharedWebpackConfig, {
    entry: await buildWebpackEntry(true),
    resolve: {
      mainFields: ['esnext', 'jsnext:main', 'browser', 'module', 'main'],
    },
    output: {
      futureEmitAssets: true,
      path: path.resolve(process.cwd(), config.buildDir),
      // @todo: switch this to output .client.js and .server.js file prefixes when we hit Bolt v3.0
      filename: `[name]${langSuffix}${
        config.mode !== 'client' ? `.${config.mode}` : ''
      }.js`,
      chunkFilename: `[name]-bundle${langSuffix}-[chunkhash].js`,
      publicPath,
    },
    plugins: [
      new webpack.DefinePlugin(getGlobalJSData(true)),
      new CopyWebpackPlugin(config.copy ? config.copy : []),
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
          name: 'Bolt Modern Manifest',
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|mjs)$/,
          // Exclude `node_modules` except `@bolt`. When this webpack config is used outside
          // of the monorepo `node_modules/@bolt/*` dependencies must use babel-loader.
          exclude: /node_modules\/(?!(@bolt)\/).*/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [babelConfig],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          oneOf: [
            {
              issuer: /\.js$/,
              use: [getSassLoaders(true)].reduce(
                (acc, val) => acc.concat(val),
                [],
              ),
            },
            {
              // no issuer here as it has a bug when its an entry point - https://github.com/webpack/webpack/issues/5906
              use: [
                // 'css-hot-loader',
                MiniCssExtractPlugin.loader,
                getSassLoaders(true),
              ].reduce((acc, val) => acc.concat(val), []),
            },
          ],
        },
      ],
    },
  });

  // cache mode significantly speeds up subsequent build times
  if (config.enableCache) {
    webpackConfig.plugins.push(
      new HardSourceWebpackPlugin({
        info: {
          level: 'warn',
        },
        cacheDirectory: path.join(process.cwd(), `./cache/webpack`),
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

  let outputConfig = [];

  outputConfig.push(webpackConfig);

  return outputConfig;
}

// Helper function to associate each unique language in the build config with a separate Webpack build instance (making filenames, etc unique);
async function assignLangToWebpackConfig(config, lang) {
  let langSpecificConfig = config;

  if (lang) {
    langSpecificConfig.lang = lang; // Make sure only ONE language config is set per Webpack build instance.
  }

  let langSpecificWebpackConfigs = await createWebpackConfig(
    langSpecificConfig,
  );

  langSpecificWebpackConfigs.forEach(langSpecificWebpackConfig => {
    webpackConfigs.push(langSpecificWebpackConfig);
  });
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
        promises.push(await assignLangToWebpackConfig(config, lang));
      }
    } else if (langs === 'en') {
      promises.push(await assignLangToWebpackConfig(config, null));
    } else {
      promises.push(await assignLangToWebpackConfig(config, config.lang));
    }

    await Promise.all(promises).then(() => {
      return resolve(webpackConfigs);
    });
  });
};
