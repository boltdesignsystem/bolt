const { resolve } = require('path');
const capitalize = require('lodash.capitalize');
const merge = require('webpack-merge');

const webpack = require('webpack');

const npmSass = require('npm-sass');

// plugins
/**
 * This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
 * https://github.com/ampedandwired/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// webpack config helpers
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const context = resolve(__dirname);

module.exports = (env) => {
  const { ifProd, ifNotProd, ifTest, ifDev, ifSite } = getIfUtils(env, ['prod', 'test', 'dev', 'site']);
  const { ifProdOrSite, ifDevOrSite } = getCustomIfUtils({ ifDev, ifProd, ifSite });

  const packagePath = resolve(context, './packages', env.element || '');

  const baseConfig = {
    // The base directory, an absolute path, for resolving entry points and loaders from configuration.
    context,
    // The point or points to enter the application.
    entry: getEntryPointConfig(packagePath, {
      isTest: ifTest(),
      isProd: ifProd(),
    }),
    output: {
      filename: ifProd('[name].min.js', '[name].js'),
      path: getPathConfig(env.element, {
        isSite: ifSite(),
        isTest: ifTest(),
      }),
      // Include comments with information about the modules.
      pathinfo: ifNotProd()
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },

    // Allow connection from any IP, so that it is accessible from VMs/external devices
    devServer: {
      host: '0.0.0.0',
      port: ifTest(8090, false)
    },

    /**
     * Developer tool to enhance debugging
     *
     * See: https://webpack.js.org/configuration/devtool/#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    module: {
      rules: [

        // Typescript
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['awesome-typescript-loader']
        },
        // CSS
        {
          // Do not transform vendor's CSS with CSS-modules
          // The point is that they remain in global scope.
          test: /\.css$/,
          include: /node_modules/,
          // @TODO replace with "use", we need to use legacy "loader" instead of "use" to make ExtractTextPlugin@2-beta.4 work
          loader:
            [
              'style-loader',
              {
                loader: 'css-loader',
                query: { sourceMap: true }
              }
            ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'to-string-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                importer: npmSass.importer
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.md$/,
          use: [
            'html-loader',
            'markdown-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: ['file-loader']
        },
        {
          test: /\.gif|\.jpg$/,
          use: ['url-loader']
        },

      ]
    },

    /**
     * Since Loaders only execute transforms on a per-file basis,
     * Plugins are most commonly used (but not limited to) performing actions and custom functionality on "compilations"
     * or "chunks" of your bundled modules (and so much more).
     * In order to use a plugin, you just need to require() it and add it to the plugins array.
     * Since most plugins are customizable via options, you need to create an instance of it by calling it with new.
     */
    plugins: removeEmpty([

      // Set NODE_ENV to enable production react version
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: ifProd('"production"', '"development"') }
      }),

      new webpack.LoaderOptionsPlugin({
        // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
        // These options are simply moved into a new plugin, LoaderOptionsPlugin, for separation of concerns reasons.
        // Default webpack build options saves a couple of kBs
        minimize: ifProdOrSite(),
        debug: ifDev(),
        quiet: ifProdOrSite(),

      }),

      // Uglify bundles
      ifProdOrSite(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        output: { comments: false }
      })),

      ifSite(new FaviconsWebpackPlugin('./assets/blaze-elements-logo.svg')),

      /**
       * Use the HtmlWebpackPlugin plugin to make index.html a template so css and js can dynamically be added to the page.
       * This will also take care of moving the index.html file to the build directory using the index.html in src as a template.
       * https://github.com/ampedandwired/html-webpack-plugin
       */
      ifDevOrSite(new HtmlWebpackPlugin({
        template: resolve(context, isBoltMainPackage(env.element) ? 'index.html' : 'index.package.html'),
        packages: getPackagesForBuild(env.element, require('./package.json').packages),
        excludeChunks: ['index', 'index-with-dependencies'], // Exclude 'index' & 'index-with-dependencies' as it is included in 'main.demo'
        inject: 'head',
        chunksSortMode: buildChunksSort(['polyfills', 'styles', 'index', 'index-with-dependencies', 'main.demo', 'test-helpers', 'test'])
      }))

    ]),
    performance: {
      hints: ifProd() && 'warning'
    }
  };

  const withDependenciesConfig = merge(
    baseConfig,
    {
      output: {
        filename: ifProd('index-with-dependencies.min.js', 'index-with-dependencies.js')
      }
    }
  );

  const withoutDependenciesConfig = merge(
    baseConfig,
    {
      output: {
        filename: ifProd('index.min.js', 'index.js')
      },
      externals: {
        skatejs: 'skatejs'
      }
    }
  );

  return ifProd(
    [withDependenciesConfig, withoutDependenciesConfig],
    baseConfig
  );

  function getCustomIfUtils({ ifDev, ifProd, ifSite } = {}) {
    return {
      ifProdOrSite(value, alternate) {
        return getByEnvValue(ifProd() || ifSite(), value, alternate);
      },
      ifDevOrSite(value, alternate) {
        return getByEnvValue(ifDev() || ifSite(), value, alternate);
      }
    };

    function getByEnvValue(envValue, value, alternate) {
      return isUndefined(value) ? envValue : propIf(envValue, value, alternate);
    }

    function isUndefined(val) {
      return typeof val === 'undefined';
    }

    function getValue(val) {
      return JSON.parse(val);
    }

    function propIf(add, value, alternate) {
      return getValue(add) ? value : alternate;
    }
  }
};

function getEntryPointConfig(basePath, { isTest, isProd } = {}) {
  if (isTest) {
    return {
      test: resolve(basePath, 'index.test.ts'),
      'test-helpers': resolve(context, 'test-helpers.ts')
    };
  }

  if (isProd) {
    return {
      index: resolve(basePath, 'index.ts')
    };
  }

  return {
    'main.demo': resolve(basePath, 'index.demo.tsx'),
    polyfills: resolve(context, 'polyfills.ts'),
    styles: resolve(context, 'styles.ts')
  };
}

/**
 * Build sort function for chunksSortMode from array
 */
function buildChunksSort(order) {
  return (a, b) => order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
}

function getPackagesForBuild(element, allPackages) {
  if (isBoltMainPackage(element)) {
    return allPackages;
  }

  return element;
}

function isBoltMainPackage(packageName) {
  return packageName === 'bolt-components';
}

function getPathConfig(packageName, { isSite, isTest } = {}) {
  if (isSite) {
    return resolve(context, 'tmp', 'site');
  }

  if (isTest) {
    return resolve(context, 'tmp', 'tests');
  }

  return resolve(context, 'packages', packageName, 'dist');
}
