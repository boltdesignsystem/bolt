const webpack = require('webpack');
const createWebpackConfig = require('../create-webpack-config');

module.exports = (config) => {
  const webpackConfig = createWebpackConfig(config);

  function compile(done) {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        done(err);
      }

      // Stats config options: https://webpack.js.org/configuration/stats/
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
        modules: false, // Hides built modules making output less verbose
      }));

      let error = null;
      if (stats.hasErrors()) {
        error = new Error('Webpack Compile Failed.');
        error.showStack = false;
      }
      // @todo Consider consolidating error reporting approach
      done(error);
    });
  }
  compile.description = 'Compile Webpack';
  compile.displayName = 'webpack:compile';

  function watch(done) {
    webpack(webpackConfig).watch({
      // https://webpack.js.org/configuration/watch/#watchoptions
      aggregateTimeout: 300,
    }, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        done(err);
      }

      // Stats config options: https://webpack.js.org/configuration/stats/
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
        modules: false, // Hides built modules making output less verbose
        version: false,
      }));

      // @todo Consider triggering reload here.
    });
  }
  watch.description = 'Watch & fast re-compile Webpack';
  watch.displayName = 'webpack:watch';

  return {
    compile,
    watch,
  };
};
