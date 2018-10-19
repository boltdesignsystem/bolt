const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createWebpackConfig = require('../create-webpack-config');
const { getConfig } = require('../utils/config-store');
const { boltWebpackMessages } = require('../utils/webpack-helpers');
const chalk = require('chalk');

let boltBuildConfig;

async function compile(customWebpackConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

compile.description = 'Compile Webpack';
compile.displayName = 'webpack:compile';

async function watch(customConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));

    compiler.watch({
      // https://webpack.js.org/configuration/watch/#watchoptions
      aggregateTimeout: 300,
    });
  });
}

watch.description = 'Watch & fast re-compile Webpack';
watch.displayName = 'webpack:watch';

async function server(customWebpackConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));

    // Add Hot Module Reloading scripts to Webpack entrypoint
    if (webpackConfig[0].devServer.hot) {
      webpackConfig[0].entry['bolt-global'].unshift(
        `webpack-dev-server/client?http://localhost:${
          webpackConfig[0].devServer.port
        }/`,
        'webpack/hot/dev-server',
      );
    }

    const server = new WebpackDevServer(compiler, webpackConfig[0].devServer);

    server.listen(boltBuildConfig.port, '0.0.0.0', err => {
      const localLabel = chalk.bold('Local: ');
      const localAddress = chalk.magenta(
        `http://localhost:${boltBuildConfig.port}/${boltBuildConfig.startPath}`,
      );

      const externalLabel = chalk.bold('External: ');
      const externalAddress = chalk.magenta(
        `http://${boltBuildConfig.ip}:${boltBuildConfig.port}/${boltBuildConfig.startPath}`,
      );

      const lineBreak = chalk.gray(
        '--------------------------------------------',
      );

      console.log(`\n${lineBreak}`);
      console.log(`${localLabel}${localAddress}`);
      console.log(`${externalLabel}${externalAddress}`);
      console.log(`${lineBreak}`);

      if (err) {
        reject(err);
      }
    });
  });
}
server.description = 'Webpack Dev Server';
server.displayName = 'webpack:server';

module.exports = {
  compile,
  watch,
  server,
};
