const path = require('path');
const fs = require('fs');
const http2 = require('http2');
const { fileExists } = require('@bolt/build-utils/general');
const { getConfig } = require('@bolt/build-utils/config-store.js');
const prettier = require('prettier');
const { JsDomRenderBackend } = require('./libs/render/backend/jsdom');
const {
  WebComponentRenderer,
} = require('./libs/render/renderer/WebComponentRenderer');

async function run() {
  let config = await getConfig();

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

  const webpackStatsGenerated = await setupWebpack(config);

  console.log('starting renderer...');
  const rendererBackend = new JsDomRenderBackend(config, webpackStatsGenerated);

  const renderer = new WebComponentRenderer(rendererBackend, [
    'bolt-button',
    'bolt-text',
    'bolt-icon',
  ]);
  await renderer.start();
  console.log('renderer ready...');

  const options = {};
  const server = http2.createServer(options);

  server.on('stream', (stream, headers) => {
    if (headers[':path'] !== '/') {
      stream.respond({ ':status': 404 });
      stream.end();
    } else if (headers[':method'].toLowerCase() !== 'post') {
      stream.respond({ ':status': 405 });
      stream.end();
    } else {
      const chunks = [];
      stream.on('data', chunk => {
        chunks.push(chunk);
      });
      stream.on('end', async () => {
        try {
          const rendered = await renderer.render(chunks.join());

          const prettierHtml = prettier.format(rendered, {
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: true,
            jsxBracketSameLine: true,
            parser: 'html',
          });

          stream.respond({ ':status': 200 });
          stream.end(prettierHtml);
        } catch (e) {
          console.log(e);
          stream.respond({ ':status': 500 });
          stream.end();
        }
      });
    }
  });

  server.listen(80);

  console.log('listening on port 80...');
  console.log('');
  console.log('Test the server by running:');
  console.log('');
  console.log(
    'curl http://localhost -v --http2-prior-knowledge -X POST -d "<bolt-button>hello world</bolt-button><bolt-icon name=\'close\'></bolt-icon>"',
  );
}

async function setupWebpack(config) {
  console.log('compiling webpack...');

  let webpackConfig, manifestPath, webpackStatsGenerated;

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

  console.log('webpack ready...');
  return webpackStatsGenerated;
}

run();
