const events = require('../../utils/events');

async function generate() {
  delete require.cache[require.resolve('./bolt-status-board')];
  require('./bolt-status-board').generateStatusBoard();
  // require('./bolt-vrt-urls').generateVrtUrls(); @todo: re-enable once we exclude JSON file outputted from re-generating PL
  // require('./bolt-pkg-versions').generatePackageData(); @todo: ignore data from PL watches before we enable this -- super large file size!
}

async function watch() {
  events.on('pl:precompiled', async () => {
    await generate();
  });
}

module.exports = {
  generate,
  watch,
};
