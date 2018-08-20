const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const npmSass = require('npm-sass');
const autoprefixer = require('autoprefixer');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const globImporter = require('node-sass-glob-importer');
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const deepmerge = require('deepmerge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TwigPhpLoader = require('twig-php-loader');
const md5 = require('md5');
const { getConfig } = require('./utils/config-store');
const { addAsset, getManifest } = require('./utils/assets');

const {
  getBoltManifest,
  createComponentsManifest,
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
  const sassExportData = require('@theme-tools/sass-export-data')({
    path: path.resolve(process.cwd(), config.dataDir),
  });

  // map out Twig namespaces with the NPM package name
  const npmToTwigNamespaceMap = await mapComponentNameToTwigNamespace();

  // filename suffix to tack on based on lang being compiled for
  let langSuffix = `${config.lang ? '-' + config.lang : ''}`;

  // Default global Sass data defined
  let globalSassData = [
    `$bolt-namespace: ${config.namespace};`,

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

  const configurePlugins = () => {
    const plugins = [
      // new webpack.IgnorePlugin(/prop-types$/),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: `[name]${langSuffix}.css`,
        chunkFilename: `[id]${langSuffix}.css`,
        // allChunks: true,
      }),
      new webpack.DefinePlugin(globalJsData),
      // Give dynamically `import()`-ed scripts a deterministic name for better
      // long-term caching. Solution adapted from:
      // https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
      new webpack.NamedChunksPlugin(chunk => {
        const hashChunk = () => {
          return md5(
            Array.from(chunk.modulesIterable, m => {
              return m.identifier();
            }).join(),
          ).slice(0, 10);
        };
        return chunk.name ? chunk.name : hashChunk();
      }),

      new ManifestPlugin({
        seed: getManifest(langSuffix),
        publicPath,
        writeToFileEmit: true,
        fileName: `webpack-manifest${langSuffix}.json`,
        // fileName: config.manifestFileName,
        generate: (seed, files) => {
          return files.reduce(async (manifest, opts) => {
            // Needed until this issue is resolved:
            // https://github.com/danethurber/webpack-manifest-plugin/issues/159
            const unhashedName = path
              .basename(opts.path)
              .replace(/[_\.\-][0-9a-f]{10}/, '');

            await addAsset(unhashedName, opts.path, langSuffix);

            const manifestData = await getManifest(langSuffix);

            writeFile(
              `${path.resolve(
                process.cwd(),
                config.buildDir,
              )}/bolt-webpack-manifest${langSuffix}.json`,
              JSON.stringify(manifestData),
            );

            return manifestData;
          }, seed);
        },
      }),
    ];

    /**
     * In non-drupal environments. during local dev server (ie. not on Travis -- for now till Docker container is up and running),
     * compile the Pattern Lab UI HTML via the new Twig PHP rendering service.
     */
    if (config.env !== 'drupal' && !config.prod && config.devServer === true) {
      plugins.push(
        new HtmlWebpackPlugin({
          title: 'Custom template',
          filename: '../index.html',
          inject: false, // disabling for now -- not yet needed in PL build (but at least is working!)
          cache: false,
          // Load a custom template (lodash by default see the FAQ for details)
          template: path.resolve(
            process.cwd(),
            '../../packages/uikit-workshop/src/html-twig/index.twig',
          ),
        }),
        new TwigPhpLoader(), // handles compiling Twig templates when Webpack-specific contextual data is needed (ex. automatically injecting assets in your entry config)
      );

      // webpackConfig.module.rules.push({
      //   test: /\.twig$/,
      //   loader: TwigPhpLoader.loader,
      //   options: {
      //     port: config.port, // port the PHP rendering service is running on -- dynamically set when @bolt/build-tools boots up
      //     namespaces: npmToTwigNamespaceMap, // @todo: further refactor so this loader doesn't need to map out the namespace to the NPM package location

      //     // this determines whether Twig templates get rendered immediately vs wait for the HtmlWebpackPlugin to
      //     // generate data on the assets available before rendering. Defaults to false.
      //     includeContext: false,
      //   },
      // });
    }

    if (config.prod) {
      // Optimize JS - https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
      // Config recommendation based off of https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1#f548
      // plugins.push(
      //   new UglifyJsPlugin({
      //     sourceMap: true,
      //     parallel: true,
      //     cache: true,
      //     uglifyOptions: {
      //       cache: true,
      //       compress: true,
      //       mangle: true,
      //     },
      //   }),
      // );

      // https://webpack.js.org/plugins/module-concatenation-plugin/
      plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

      // Optimize CSS - https://github.com/NMFR/optimize-css-assets-webpack-plugin
      plugins.push(
        new OptimizeCssAssetsPlugin({
          canPrint: config.verbosity > 2,
          cssProcessorOptions: {
            // passes to `cssnano`
            zindex: false, // don't alter `z-index` values
            mergeRules: false, // this MUST be disabled - otherwise certain selectors (ex. ::slotted(*), which IE 11 can't parse) break
          },
        }),
      );

      // @todo Evaluate best source map approach for production
      // webpackConfig.devtool = 'hidden-source-map';
    }
    // else {
    // not prod
    // @todo fix source maps
    // webpackConfig.devtool = 'cheap-module-eval-source-map';
    // webpackConfig.devtool = 'eval';
    // }

    return plugins;
  };

  const configureBabelLoader = (browserlist, legacy = false) => {
    return {
      test: /\.js$/,
      type: legacy ? 'javascript/auto' : 'javascript/esm',
      exclude: legacy
        ? /node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js/
        : /node_modules/,
      // exclude: /node_modules\/clipboard\/dist\/clipboard\.js/,
      // exclude: /(node_modules\/\@webcomponents\/webcomponentsjs\/custom-elements-es5-adapter\.js)/,
      use: {
        loader: 'babel-loader',
        options: {
          // cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: browserlist,
                },
                // useBuiltIns: 'usage',
                useBuiltIns: false,
                modules: false,
                debug: true,
              },
            ],
            ['@bolt/babel-preset-bolt'],
          ],
        },
      },
    };
  };

  /**
   * Build WebPack config's `entry` object
   * @link https://webpack.js.org/configuration/entry-context/#entry
   * @returns {object} entry - WebPack config `entry`
   */
  async function buildWebpackEntry(legacy = true) {
    const { components } = await getBoltManifest();
    const entry = {};
    const globalEntryName = `bolt-global${legacy ? '-legacy' : ''}`;

    // console.log(globalEntryName);

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
        sourceMap: true,
        modules: false, // needed for JS referencing classNames directly, such as critical fonts
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [
          postcssDiscardDuplicates,
          autoprefixer({
            browsers: require('@bolt/config-browserlist').default,
          }),
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
        importer: [globImporter(), npmSass.importer],
        functions: sassExportData,
        outputStyle: 'expanded',
        precision: 3,
        data: globalSassData.join('\n'),
      },
    },
  ];

  const sharedModuleRules = () => {
    const rules = [
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
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              scssLoaders,
            ].reduce((acc, val) => acc.concat(val), []),
          },
        ],
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
      {
        test: [/\.yml$/, /\.yaml$/],
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
    ];

    if (config.env !== 'drupal' && !config.prod && config.devServer === true) {
      rules.push({
        test: /\.twig$/,
        loader: TwigPhpLoader.loader,
        options: {
          port: config.port, // port the PHP rendering service is running on -- dynamically set when @bolt/build-tools boots up
          namespaces: npmToTwigNamespaceMap, // @todo: further refactor so this loader doesn't need to map out the namespace to the NPM package location

          // this determines whether Twig templates get rendered immediately vs wait for the HtmlWebpackPlugin to
          // generate data on the assets available before rendering. Defaults to false.
          includeContext: false,
        },
      });
    }

    return rules;
  };

  const baseConfig = {
    mode: config.prod ? 'production' : 'development',
    cache: true,
    // devtool: '#source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.svg', '.scss'],
      unsafeCache: true,
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
    },
    optimization: {
      mergeDuplicateChunks: true,
      // runtimeChunk: 'single',
      minimizer: [
        // new TerserPlugin({
        //   terserOptions: {
        //     ecma: undefined,
        //     warnings: false,
        //     parse: {},
        //     compress: {},
        //     mangle: true, // Note `mangle.properties` is `false` by default.
        //     module: false,
        //     output: null,
        //     toplevel: false,
        //     nameCache: null,
        //     ie8: false,
        //     keep_classnames: undefined,
        //     keep_fnames: false,
        //     safari10: false
        //   }
        // })
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            compress: true,
            // mangle: {
            //   properties: /(^_|_$)/,
            // },
            mangle: true,
            safari10: true,
          },
        }),
      ],
    },
  };

  if (config.wwwDir) {
    baseConfig.devServer = {
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

  const modernConfig = Object.assign({}, baseConfig, {
    entry: await buildWebpackEntry(false),
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      publicPath,
      filename: `[name]${langSuffix}.mjs`,
      chunkFilename: `[name]-bundle${langSuffix}-[chunkhash:10].mjs`,
    },
    plugins: configurePlugins(),
    module: {
      rules: [
        configureBabelLoader(require('@bolt/config-browserlist').modern, false),
        sharedModuleRules(),
      ].reduce((acc, val) => acc.concat(val), []),
    },
  });

  const legacyConfig = Object.assign({}, baseConfig, {
    entry: await buildWebpackEntry(true),
    output: {
      path: path.resolve(process.cwd(), config.buildDir),
      publicPath,
      filename: `[name]${langSuffix}.es5.js`,
      chunkFilename: `[name]-bundle${langSuffix}-[chunkhash:10].es5.js`,
    },
    plugins: configurePlugins(),
    module: {
      rules: [
        configureBabelLoader(require('@bolt/config-browserlist').legacy, true),
        sharedModuleRules(),
      ].reduce((acc, val) => acc.concat(val), []),
    },
  });

  return [modernConfig, legacyConfig];
  // return legacyConfig;
}

// Helper function to associate each unique language in the build config with a separate Webpack build instance (making filenames, etc unique);
async function assignLangToWebpackConfig(config, lang) {
  let langSpecificConfig = config;

  if (lang) {
    langSpecificConfig.lang = lang; // Make sure only ONE language config is set per Webpack build instance.
  }

  let langSpecificWebpackConfig = await createWebpackConfig(langSpecificConfig);

  // if (langSpecificConfig.webpackStats) {
  //   langSpecificWebpackConfig.profile = true;
  //   langSpecificWebpackConfig.parallelism = 1;
  // }

  webpackConfigs.push(langSpecificWebpackConfig[0]);
  webpackConfigs.push(langSpecificWebpackConfig[1]);
  // webpackConfigs.push(langSpecificWebpackConfig);
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
