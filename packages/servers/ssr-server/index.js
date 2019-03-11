const path = require('path');
const express = require('express');
const fs = require('fs');
const { fileExists } = require('@bolt/build-tools/utils/general');
const { getConfig } = require('@bolt/build-tools/utils/config-store.js');
const prettier = require('prettier');
const { render } = require('./renderer');
const { template } = require('./libs/template');

const port = process.env.PORT || 4445;
const app = express();
let connections = []; // keep track of # of open connections
let webpackStatsGenerated;

let server = ''; // express server instance
let config;
let webpackConfig;
let manifestPath;
let html;

async function renderToString(htmlToRender) {
  html = htmlToRender;
  config = config || (await getConfig());
  return new Promise(async (resolve, reject) => {
    // is the server already running? if so, use that instead of spinning up a new server
    await setupServer();
    await setupWebpack();

    webpackStatsGenerated = await JSON.parse(fs.readFileSync(manifestPath));
    // return await ssrRenderHTML(htmlToRender, webpackStatsGenerated, config, port);
    const results = await ssrRenderHTML(
      htmlToRender,
      port,
      webpackStatsGenerated,
    );

    return resolve(results);
  });
}

async function setupWebpack() {
  config = config || (await getConfig());

  return new Promise(async (resolve, reject) => {
    manifestPath =
      manifestPath ||
      path.join(config.buildDir, 'bolt-webpack-manifest.server.json');

    // return early if we already have what we need to do a build
    if (await fileExists(manifestPath)) {
      resolve(
        (webpackStatsGenerated = JSON.parse(fs.readFileSync(manifestPath))),
      );
    } else {
      const createWebpackConfig = require('@bolt/build-tools/create-webpack-config');
      const webpack = require('webpack');

      webpackConfig = await createWebpackConfig(config);

      // strip out Sass files + other duplicate / not as necessary package files for server-side rendering (speeds up compile times)
      webpackConfig[0].entry['bolt-global'] = webpackConfig[0].entry[
        'bolt-global'
      ].filter(
        item =>
          !item.includes('.scss') &&
          !item.includes('critical-fonts') &&
          !item.includes('bolt-critical-css') &&
          !item.includes('bolt-critical-vars') &&
          !item.includes('bolt-smooth-scroll') &&
          !item.includes('bolt-sticky') &&
          !item.includes('bolt-placeholder') &&
          !item.includes('bolt-li') &&
          !item.includes('packages/core') &&
          !item.includes('bolt-dropdown') &&
          !item.includes('global/styles/index.js') &&
          !item.includes('bolt-copy-to-clipboard') &&
          !item.includes('bolt-icons') &&
          !item.includes('bolt-video'),
      );

      await webpack(webpackConfig, async (err, webpackStats) => {
        // @todo: handle webpack errors
        // if (err || webpackStats.hasErrors()) {}

        // after the build completes, pass along the webpack manifest data like we do for builds already having been cached
        resolve(
          (webpackStatsGenerated = JSON.parse(fs.readFileSync(manifestPath))),
        );
      });
    }
  });
}

async function ssrRenderHTML(htmlToRender, port, webpackStatsGenerated) {
  return new Promise(async (resolve, reject) => {
    const htmlResult = await render(htmlToRender, port, webpackStatsGenerated);

    // const renderedHTML = prettier.format(htmlResult, {
    //   singleQuote: true,
    //   trailingComma: 'es5',
    //   bracketSpacing: true,
    //   jsxBracketSameLine: true,
    //   parser: 'html',
    // });
    return resolve(htmlResult);
  });
}

// listen for when we need to auto-shut down + track open server connections
async function setupServer() {
  return new Promise(async (resolve, reject) => {
    config = config || (await getConfig());
    config.components.individual = [];
    config.prod = true;
    config.enableCache = true;
    config.mode = 'server';
    config.env = 'pwa';
    config.sourceMaps = false;
    config.copy = [];
    config.webpackDevServer = false;
    config.buildDir = path.join(config.wwwDir, 'build-ssr');
    config.dataDir = path.join(config.wwwDir, 'build-ssr', 'data');

    app.use(express.static(path.relative(process.cwd(), config.wwwDir)));

    // generate a fresh webpack build + pass along asset data to dynamic HTML template rendered
    server = await app.listen(port);

    app.get('/ssr', function(req, res) {
      res.send(template(html || '', port, webpackStatsGenerated || []));
    });

    // handle cleaning up + shutting down the server instance
    process.on('SIGTERM', shutDownSSRServer);
    process.on('SIGINT', shutDownSSRServer);

    server.on('connection', connection => {
      connections.push(connection);
      connection.on(
        'close',
        // eslint-disable-next-line no-return-assign
        () => (connections = connections.filter(curr => curr !== connection)),
      );
    });

    resolve();
  });
}

async function shutDownSSRServer() {
  return new Promise(async (resolve, reject) => {
    if (!server) {
      process.exit(0);
    }
    // console.log('Received kill signal, shutting down gracefully');
    resolve(await server.close());

    setTimeout(() => {
      console.error(
        'Could not close connections in time, forcefully shutting down',
      );
      process.exit(1);
    }, 20000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 20000);
  });
}

module.exports = {
  shutDownSSRServer,
  renderToString,
};
