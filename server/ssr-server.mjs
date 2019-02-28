import path from 'path';
import express from 'express';
import webpack from 'webpack';
import createWebpackConfig from '@bolt/build-tools/create-webpack-config';
import * as configStore from '@bolt/build-tools/utils/config-store.js';
import { renderPage } from './ssr-server.puppeteer';
import { template } from './ssr-server.template';
const getConfig = configStore.default.getConfig;

const htmlToRender = process.argv[2] || '';
const port = process.env.PORT || 4444;
const app = express();
let connections = []; // keep track of # of open connections

let server; // express server instance

getConfig().then(async boltConfig => {
  let config = boltConfig;

  config.components.individual = [];
  // config.components.global = ['@bolt/components-button'];
  config.prod = true;
  config.enableCache = true;
  config.mode = 'server';
  config.sourceMaps = false;

  // config.components.global = config.components.global.filter(
  //   item =>
  //     !item.includes('bolt-icons') &&
  //     !item.includes('bolt-critical') &&
  //     !item.includes('packages/core/index.js'),
  // );

  const webpackConfig = await createWebpackConfig(config);

  webpackConfig[0].entry['bolt-global'] = webpackConfig[0].entry[
    'bolt-global'
  ].filter(
    item => !item.includes('.scss'),
    // !item.includes('bolt-critical') &&
    // !item.includes('bolt-icons') &&
    // !item.includes('bolt-video') &&
    // !item.includes('packages/core/index.js') &&
    // !item.includes('packages/global/styles/index.js'),
  );

  const staticDir = path.join(process.cwd(), config.wwwDir);

  app.use(express.static(staticDir));

  // generate a fresh webpack build + pass along asset data to dynamic HTML template rendered
  server = await app.listen(port);
  await setupServer();

  // console.log(`Express listening on http://localhost:${port}`);
  await webpack(webpackConfig, async (err, webpackStats) => {
    // @todo: handle webpack errors
    // if (err || webpackStats.hasErrors()) {}
    const webpackStatsGenerated = webpackStats.toJson().children[0]
      .assetsByChunkName;

    app.get('/ssr', function(req, res) {
      res.send(template.render(htmlToRender, webpackStatsGenerated, config));
    });

    await renderPage(port);
  });
});

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
