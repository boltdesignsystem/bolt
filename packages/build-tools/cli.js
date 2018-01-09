#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const webpack = require('webpack');
const createWebpackConfig = require('./create-webpack-config');

const packageJson = require('./package.json');

program
  .version(packageJson.version)
  .option('-C, --config-file <path>', 'Pass in a specific config file instead of default of ".boltrc.js/json".')
  .option('-W, --watch', 'Watch and rebuild')
  .option('--verbosity <amount>', 'How much output do you want? 0, 1, 2', parseInt);

// program
//   .command('build')
//   .description('Build it')
//   .action(() => {
//     console.log('Building it...');
//   });

program.parse(process.argv);

if (program.verbosity > 1) {
  if (program.watch) {
    console.log('Running in watch mode.');
  }
}

// process.env.BOLT_VERBOSITY = program.verbosity;

// defaults to `.boltrc` so either `.boltrc.js` or `.boltrc.json` works
const configFilePath = path.resolve(process.cwd(), program.configFile || '.boltrc');
const config = require(configFilePath);

const webpackConfig = createWebpackConfig(config);

if (program.watch) {
  webpack(webpackConfig).watch({
    // https://webpack.js.org/configuration/watch/#watchoptions
    aggregateTimeout: 300,
  }, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }

    // Stats config options: https://webpack.js.org/configuration/stats/
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true,   // Shows colors in the console
      modules: false, // Hides built modules making output less verbose
      version: false,
    }));

    // core.events.emit('reload');
  });
} else { // end watch, begin non-watch build
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }

    // Stats config options: https://webpack.js.org/configuration/stats/
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true,   // Shows colors in the console
      modules: false, // Hides built modules making output less verbose
    }));
  });
}
// console.log(config);
