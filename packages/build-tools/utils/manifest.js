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

/**
 * Get all directories for components in Bolt Manifest
 * @param relativeFrom {string} - If present, the path will be relative from this, else it will be absolute.
 * @returns {Array<String>} {dirs} - List of all component/package paths in Bolt Manifest
 */
function getAllDirs(relativeFrom) {
  const dirs = [];
  const {global, individual} = getBoltManifest().components;
  [global, individual].forEach((componentList) => {
    componentList.src.forEach((component) => {
      dirs.push(relativeFrom
        ? path.relative(relativeFrom, component.dir)
        : component.dir
      );
    });
  });
  return dirs;
}

async function writeBoltManifest() {
  const filePath = path.resolve(config.dataDir, './bolt-full-manifest.json');
  try {
    await writeFile(filePath, JSON.stringify(boltManifest, null, '  '));
  } catch(error) {
    log.errorAndExit('Could not write bolt manifest', error);
  }
}

/**
 * Builds & writes info file for Twig Namespaces
 * Creates `bolt-twig-namespaces.json` in `config.dataDir` from the Bolt Manifest. That is pulled in by [Twig Namespace plugin](https://packagist.org/packages/evanlovely/plugin-twig-namespaces) in the PL config file.
 * @param relativeFrom {string} - If present, the path will be relative from this, else it will be absolute.
 * @param extraNamespaces {object} - Extra namespaces to add to file in [this format](https://packagist.org/packages/evanlovely/plugin-twig-namespaces)
 * @async
 * @returns {Promise<void>}
 */
async function writeTwigNamespaceFile(relativeFrom, extraNamespaces = {}) {
  const namespaces = {};
  const allDirs = [];
  const {global, individual} = getBoltManifest().components;

  [global, individual].forEach((componentList) => {
    componentList.src.forEach((component) => {
      const dir = relativeFrom
        ? path.relative(relativeFrom, component.dir)
        : component.dir;

      namespaces[component.basicName] = {
        recursive: true,
        paths: [dir],
      };

      allDirs.push(dir);
    });
  });

  const namespaceConfigFile = Object.assign({
    // Can hit anything with `@bolt`
    bolt: {
      recursive: true,
      paths: [
        config.srcDir,
        ...allDirs,
      ],
    },
    'bolt-data': {
      recursive: true,
      paths: [
        config.dataDir,
      ],
    },
  }, namespaces, extraNamespaces);

  await writeFile(
    path.join(config.dataDir, 'bolt-twig-namespaces.json'),
    JSON.stringify(namespaceConfigFile, null, '  ')
  );
}


module.exports = {
  buildBoltManifest,
  getBoltManifest,
  writeBoltManifest,
  writeTwigNamespaceFile,
  getAllDirs,
};
