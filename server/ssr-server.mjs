import path from 'path';
import express from 'express';
import webpack from 'webpack';
import createWebpackConfig from '@bolt/build-tools/create-webpack-config';
import * as configStore from '@bolt/build-tools/utils/config-store.js';
import prettier from 'prettier';
import highlight from 'cli-highlight';
import { renderPage } from './ssr-server.puppeteer';
import { template } from './ssr-server.template';
const getConfig = configStore.default.getConfig;

const htmlToRender = process.argv[2] || '';
const port = process.env.PORT || 4445;
const app = express();
let connections = []; // keep track of # of open connections

let server; // express server instance

getConfig().then(async boltConfig => {
  let config = boltConfig;

  config.components.individual = [];
  config.prod = true;
  config.enableCache = true;
  config.mode = 'server';
  config.env = 'pwa';
  config.sourceMaps = false;

  const webpackConfig = await createWebpackConfig(config);

  // strip out Sass files from Webpack Entry to speed up compile times
  webpackConfig[0].entry['bolt-global'] = webpackConfig[0].entry[
    'bolt-global'
  ].filter(item => !item.includes('.scss'));

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
