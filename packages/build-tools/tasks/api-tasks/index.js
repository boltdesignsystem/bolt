const chokidar = require('chokidar');
const path = require('path');
const events = require('@bolt/build-utils/events');
const { getConfig } = require('@bolt/build-utils/config-store');
let config;

async function generate() {
  delete require.cache[require.resolve('./bolt-status-board')];
  await require('./bolt-status-board').generateStatusBoard();
  // require('./bolt-vrt-urls').generateVrtUrls(); @todo: re-enable once we exclude JSON file outputted from re-generating PL
  // require('./bolt-pkg-versions').generatePackageData(); @todo: ignore data from PL watches before we enable this -- super large file size!
}

async function watch() {
  config = config || getConfig();

  // auto-regenerate when pattern lab data emitted
  events.on('build-tasks/pattern-lab:compiled-data', async () => {
    await generate();
  });

  const watchedFiles = [path.join(__dirname, '**/*.js')];

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignored: ['**/node_modules/**', '**/vendor/**'],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', async (event, path) => {
    if (config.verbosity > 3) {
      console.log('Pattern Lab watch event: ', event, path);
    }
    await generate();
  });
}

module.exports = {
  generate,
  watch,
};
