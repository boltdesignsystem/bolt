import path from 'path';
import express from 'express';
import fs from 'fs';
import * as utils from '@bolt/build-tools/utils/general';
import * as configStore from '@bolt/build-tools/utils/config-store.js';
import prettier from 'prettier';
// import highlight from 'cli-highlight';
import { renderPage } from './libs/puppeteer';
import { template } from './libs/template';
const getConfig = configStore.default.getConfig;

const htmlToRender = process.argv[2] || '';

const port = process.env.PORT || 4445;
const app = express();
let connections = []; // keep track of # of open connections

let server; // express server instance

async function init() {
  const config = await getConfig();
  config.components.individual = [];
  config.prod = false;
  config.enableCache = true;
  config.mode = 'server';
  config.env = 'pwa';
  config.sourceMaps = false;
  config.copy = [];
  config.webpackDevServer = false;

  let webpackConfig;

  app.use(express.static(path.relative(process.cwd(), config.wwwDir)));

  // generate a fresh webpack build + pass along asset data to dynamic HTML template rendered
  server = await app.listen(port);
  await setupServer();

  const manifestPath = path.join(
    config.buildDir,
    'bolt-webpack-manifest.server.json',
  );

  // if we already have a build cached on the filesystem
  if (await utils.default.fileExists(manifestPath)) {
    const webpackStatsGenerated = JSON.parse(fs.readFileSync(manifestPath));
    await ssrRenderHTML(htmlToRender, webpackStatsGenerated, config, port);
  } else {
    Promise.all([
      import('webpack'),
      import('@bolt/build-tools/create-webpack-config'),
    ]).then(async modules => {
      const webpack = modules[0].default;
      const createWebpackConfig = modules[1].default;

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
        const webpackStatsGenerated = JSON.parse(fs.readFileSync(manifestPath));
        await ssrRenderHTML(htmlToRender, webpackStatsGenerated, config, port);
      });
    });
  }
}

async function ssrRenderHTML(
  htmlToRender,
  webpackStatsGenerated,
  config,
  port,
) {
  app.get('/ssr', function(req, res) {
    res.send(template.render(htmlToRender, webpackStatsGenerated, config));
  });

  const htmlResult = await renderPage(port);

  const renderedHTML = prettier.format(htmlResult, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'html',
  });

  console.log(renderedHTML);

  await shutDownSSRServer();
}

// listen for when we need to auto-shut down + track open server connections
async function setupServer() {
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
}

export function shutDownSSRServer() {
  // console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    // console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

init();
