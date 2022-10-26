const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

// Plugins/loaders
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');

// Helpers/config
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackProgress } = require('@bolt/build-utils/webpack-helpers');
const { getBoltManifest } = require('@bolt/build-utils/manifest');
const npmSass = require('npm-sass'); // @todo: Remove when we switch to Dart sass
const sassExportData = require('@bolt/sass-export-data'); // @todo: Solve this problem without node-sass
const babelConfig = require('@bolt/babel-preset-bolt');
const log = require('@bolt/build-utils/log');

const { ThemeRegistry } = require('@pega_bolt_theme/theme-util');

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
          // needed for JS referencing classNames directly, such as critical fonts
          // @todo: see if we still need this now that critical css has been removed
          modules: false,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: config.sourceMaps,
          postcssOptions: {
            plugins: [
              postcssDiscardDuplicates,
              // @todo: Consider switching to postcss-preset-env which polyfills modern CSS
              autoprefixer,
            ],
          },
        },
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        // Note: intentionally not upgrading sass-loader yet. Compile time was
        // ~1.5x slower after trial upgrade. Wait until we switch to Dart.
        loader: 'sass-loader',
        options: {
          sourceMap: config.sourceMaps,
          prependData: globalSassData.join('\n'),
          sassOptions: {
            outputStyle: 'nested',
            importer: [npmSass.importer],
            functions: sassExportData({
              path: config.dataDir,
            }),
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
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              issuer: /\.scss$/,
              // @see: https://dev.to/smelukov/webpack-5-asset-modules-2o3h
              type: 'asset/resource',
              use: [
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
                  options: babelConfig,
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
          type: 'asset/resource',
        },
        {
          test: [/\.yml$/, /\.yaml$/],
          use: ['json-loader', 'yaml-loader'],
        },
        {
          test: [/\.html$/],
          type: 'asset/source',
        },
      ],
    },
    mode: config.prod ? 'production' : 'development',
    cache: config.enableCache,
    optimization: {
      sideEffects: true,
      usedExports: true,
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
      new webpack.NoEmitOnErrorsPlugin(), // ?
    ],
  };

  if (config.prod) {
    sharedWebpackConfig.devtool =
      config.sourceMaps === false ? false : 'hidden-source-map';
    sharedWebpackConfig.optimization.minimize = true;
    sharedWebpackConfig.optimization.minimizer = [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              mergeLonghand: false, // don't merge longhand values -- required for CSS Vars theming, etc.
              zindex: false, // don't alter `z-index` values
              mergeRules: false, // this MUST be disabled - otherwise certain selectors (ex. ::slotted(*), which IE 11 can't parse) break
              reduceTransforms: false, // this will convert translate3d(0,0,0) to tranlateZ(0) which breaks animation transitions
              calc: false, // don't optimize calc, can change calculations in unexpected ways, especially when CSS vars are involved
            },
          ],
        },
      }),
    ];
  } else {
    // not prod
    // @todo fix source maps
    sharedWebpackConfig.devtool =
      config.sourceMaps === false ? false : 'eval-source-map';
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
      // CopyWebpackPlugin throws an error if you don't pass it a configuration object
      config.copy
        ? new CopyWebpackPlugin({ patterns: config.copy })
        : undefined,
      new MiniCssExtractPlugin({
        filename: `[name]${langSuffix}.css`,
        chunkFilename: `[id]${langSuffix}.css`,
      }),
      // @todo This needs to be in `config.dataDir`
      new WebpackManifestPlugin({
        fileName: `bolt-webpack-manifest${langSuffix}${
          config.mode === 'client' ? '' : `.${config.mode}`
        }.json`,
        publicPath,
        writeToFileEmit: true,
        seed: {
          name: 'Bolt Modern Manifest',
        },
      }),
    ].filter(item => item !== undefined),
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
              options: babelConfig,
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
              use: [MiniCssExtractPlugin.loader, getSassLoaders(true)].reduce(
                (acc, val) => acc.concat(val),
                [],
              ),
            },
          ],
        },
      ],
    },
  });

  let outputConfig = [];

  if (config.env === 'drupal') {
    const themes = new ThemeRegistry(config.subThemeDir);
    const themeNames = await themes.getThemeNames();
    const themeRegExp = new RegExp('^(' + themeNames.join('|') + ')-');
    const disablePlugins = ['ManifestPlugin'];

    // Remove any empty entries (for example one that just has a Twig template)
    for (const i in webpackConfig.entry) {
      if (!webpackConfig.entry[i].length) {
        delete webpackConfig.entry[i];
      }
    }

    const entries = {};
    for (const name in webpackConfig.entry) {
      // Replace "-" with "/", e.g. `@pega_bolt_theme-components-wysiwyg` => `@pega_bolt_theme/components-wysiwyg`
      // Replace "@" with "", e.g. `@pega_bolt_theme/components-wysiwyg` => `pega_bolt_theme/components-wysiwyg`
      const updatedName = name.replace(themeRegExp, '$1/').replace(/@/g, '');
      entries[updatedName] = webpackConfig.entry[name];
    }
    webpackConfig.entry = entries;

    webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
      return !disablePlugins.includes(plugin.constructor.name);
    });
  }

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
