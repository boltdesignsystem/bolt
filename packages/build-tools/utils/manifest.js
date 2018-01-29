const { getPkgInfo } = require('./assets');
const log = require('./log');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const path = require('path');
const config = require('./config-store').getConfig();

let boltManifest = {
  name: 'Bolt Manifest',
  components: {
    global: {
      src: [],
      dist: {},
    },
    individual: {
      src: [],
      dist: {},
    },
  },
};

function buildBoltManifest() {
  if (config.components.global) {
    const globalSrc = config.components.global.map(getPkgInfo);
    boltManifest.components.global.src = globalSrc;
  }
  if (config.components.individual) {
    const individualSrc = config.components.individual.map(getPkgInfo);
    boltManifest.components.individual.src = individualSrc;
  }

  return boltManifest;
}

function getBoltManifest() {
  return boltManifest;
}

async function writeBoltManifest() {
  const filePath = path.resolve(config.dataDir, './bolt-full-manifest.json');
  try {
    await writeFile(filePath, JSON.stringify(boltManifest, null, '  '));
  } catch(error) {
    log.errorAndExit('Could not write bolt manifest', error);
  }
}

module.exports = {
  buildBoltManifest,
  getBoltManifest,
  writeBoltManifest,
};
