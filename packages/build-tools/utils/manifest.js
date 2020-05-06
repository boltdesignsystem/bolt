/* eslint-disable no-await-in-loop */
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('./log');
const writeFile = promisify(fs.writeFile);
const { getConfig } = require('./config-store');
let config; // cached Bolt config

const { aggregateBoltDependencies } = require('./manifest.deprecated');
const getPkgInfo = require('./manifest.get-pkg-info');

// utility function to help with removing duplicate objects (like shared dependencies, extra Sass files included more than once, etc)
function deduplicateObjectsInArray(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

let boltManifest = {
  name: 'Bolt Manifest',
  version: '', // retrieved below
  components: {
    global: [],
    globalDeps: [], // global Bolt dependencies aggregated from package.json
    individual: [],
  },
};

// getting `boltManifest.version`
// ideally we want the version from `lerna.json` as that's always the highest, but sometimes that file is not located at `../../../lerna.json` - like when this is compiling in a Drupal Site (Drupal Lab doesn't count), in that case we'll just fall back on the version from this package.
try {
  boltManifest.version = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../lerna.json'), 'utf8'),
  ).version;
} catch (error) {
  boltManifest.version = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'),
  ).version;
}

// let missingBoltPkgs = [];

let explicitBoltDependencies = [];

async function buildBoltManifest() {
  config = config || (await getConfig());
  let missingBoltPkgs = [];
  try {
    if (config.components.global) {
      // process through Bolt packages explicitly listed in the user's .boltrc config
      explicitBoltDependencies = await Promise.all(
        config.components.global.map(async item => {
          const { processedPkg, missingPkgs } = await getPkgInfo(item);
          missingBoltPkgs = [...missingBoltPkgs, ...missingPkgs];
          return processedPkg;
        }),
      );

      // combine both sets of explicit and implicit dependencies and deduplicate
      boltManifest.components.global = deduplicateObjectsInArray(
        [...explicitBoltDependencies],
        'name',
      );
    }
    if (config.components.individual) {
      const explicitIndividualBoltDependencies = await Promise.all(
        config.components.individual.map(async item => {
          const { processedPkg, missingPkgs } = await getPkgInfo(item);
          missingBoltPkgs = [...missingBoltPkgs, ...missingPkgs];
          return processedPkg;
        }),
      );

      boltManifest.components.individual = deduplicateObjectsInArray(
        [...explicitIndividualBoltDependencies],
        'name',
      );
    }

    // @todo: remove with v3.0 and warn that the config being used has issues
    if (missingBoltPkgs.length > 0) {
      boltManifest.components.global = await aggregateBoltDependencies(
        explicitBoltDependencies,
      );
    }

    if (missingBoltPkgs.length > 0 && !hasWarnedAboutMissingPkgs) {
      missingBoltPkgs.flatMap(function callback(item) {
        return item.name;
      });

      console.warn(
        chalk.keyword('orange')(
          `\nWarning! Some of the components being compiled have Bolt dependencies and/or peerDependencies that appear to be missing from your build configuration. \n\nTo prep for the upcoming Bolt v3.0 release, you'll need to add these packages to the `,
        ) +
          chalk.keyword('white')(`components: { global: [] } `) +
          chalk.keyword('orange')(`section in your `) +
          chalk.keyword('white')(`${config.configFileUsed} `) +
          chalk.keyword('orange')(
            `file to ensure that Twig namespaces are properly registered, any related Sass and JS code is compiled and loaded, and to have the fastest front-end web performance.\n`,
          ),
      );

      console.warn(missingBoltPkgs);

      console.log('\n');

      hasWarnedAboutMissingPkgs = true;
    }
  } catch (err) {
    log.errorAndExit('Error building Bolt Manifest', err);
  }

  return boltManifest;
}

let hasWarnedAboutMissingPkgs = false;
async function getBoltManifest() {
  return await buildBoltManifest();
}

/**
 * Get all directories for components in Bolt Manifest
 * @param relativeFrom {string} - If present, the path will be relative from this, else it will be absolute.
 * @returns {Array<String>} {dirs} - List of all component/package paths in Bolt Manifest
 */
async function getAllDirs(relativeFrom) {
  const dirs = [];
  const manifest = await getBoltManifest();
  [manifest.components.global, manifest.components.individual].forEach(
    componentList => {
      componentList.forEach(component => {
        dirs.push(
          relativeFrom
            ? path.relative(relativeFrom, component.dir)
            : component.dir,
        );
      });
    },
  );

  return dirs;
}

/**
 * Similar to createComponentsManifest, this function provides an object of Twig namespaces that map 1:1 with the
 * cooresponding NPM package name.
 */
async function mapComponentNameToTwigNamespace() {
  const twigNamespaces = {};
  const manifest = await getBoltManifest();
  const allComponents = [
    ...manifest.components.global,
    ...manifest.components.individual,
  ];
  allComponents.forEach(component => {
    if (component.twigNamespace) {
      twigNamespaces[component.twigNamespace] = component.name;
    }
  });
  return twigNamespaces;
}

async function createComponentsManifest() {
  const components = {};
  const manifest = await getBoltManifest();
  const allComponents = [
    ...manifest.components.global,
    ...manifest.components.individual,
  ];
  allComponents.forEach(component => {
    if (component.twigNamespace) {
      components[component.twigNamespace] = component;
    }
  });
  return components;
}

async function writeBoltManifest() {
  const config = await getConfig();
  try {
    await writeFile(
      path.resolve(config.dataDir, './full-manifest.bolt.json'),
      JSON.stringify(await getBoltManifest()),
    );
    await writeFile(
      path.resolve(config.dataDir, './components.bolt.json'),
      JSON.stringify(await createComponentsManifest()),
    );
    await writeFile(
      path.resolve(config.dataDir, './config.bolt.json'),
      JSON.stringify(config),
    );
  } catch (error) {
    log.errorAndExit('Could not write bolt manifest files', error);
  }
}

/**
 * Builds config for Twig Namespaces
 * @param relativeFrom {string} - If present, the path will be relative from this, else it will be absolute.
 * @param extraNamespaces {object} - Extra namespaces to add to file in [this format](https://packagist.org/packages/evanlovely/plugin-twig-namespaces)
 * @async
 * @see writeTwigNamespaceFile
 * @returns {Promise<object>}
 */
async function getTwigNamespaceConfig(relativeFrom, extraNamespaces = {}) {
  const config = await getConfig();
  const namespaces = {};
  const allDirs = [];
  const manifest = await getBoltManifest();
  const global = manifest.components.global;
  const individual = manifest.components.individual;

  [global, individual].forEach(componentList => {
    componentList.forEach(component => {
      if (!component.twigNamespace) {
        return;
      }

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

  const namespaceConfigFile = Object.assign(
    {
      // Can hit anything with `@bolt`
      bolt: {
        recursive: true,
        paths: [...allDirs],
      },
      'bolt-data': {
        recursive: true,
        paths: [config.dataDir],
      },
      'bolt-assets': {
        recursive: true,
        paths: [config.buildDir],
      },
    },
    namespaces,
  );

  // `extraNamespaces` serves two purposes:
  // 1. To add extra namespaces that have not been declared
  // 2. To add extra paths to previously declared namespaces
  //    Assuming we've already declared the `foo` namespaces to look in `~/my-dir1`
  //    Then someone uses `extraNamespaces` to declare that `foo` will look in `~/my-dir2`
  //    This will not overwrite it, but *prepend* to the paths, resulting in a namespace setting like this:
  //    'foo': {
  //      paths: ['~/my-dir2', '~/my-dir1']
  //    }
  //    This causes the folder declared in `extraNamespaces` to be looked in first for templates, before our default;
  //    allowing end user developers to selectively overwrite some templates.
  if (extraNamespaces) {
    Object.keys(extraNamespaces).forEach(namespace => {
      const settings = extraNamespaces[namespace];
      if (
        namespaceConfigFile[namespace] &&
        settings.paths !== undefined // make sure the paths config is defined before trying to merge
      ) {
        // merging the two, making sure the paths from `extraNamespaces` go first
        namespaceConfigFile[namespace].paths = [
          ...settings.paths,
          ...namespaceConfigFile[namespace].paths,
        ];

        // don't add a new namespace key if the paths config option wasn't defined. prevents PHP errors if a namespace key was defined but no paths specified.
      } else if (settings.paths !== undefined) {
        namespaceConfigFile[namespace] = settings;
      }
    });
  }

  return namespaceConfigFile;
}

/**
 * Write Twig Namespace File
 * Creates `bolt-twig-namespaces.json` in `config.dataDir` from the Bolt Manifest. That is pulled in by [Twig Namespace plugin](https://packagist.org/packages/evanlovely/plugin-twig-namespaces) in the PL config file.
 * @see getTwigNamespaceConfig;
 * @return {Promise<void>}
 */
async function writeTwigNamespaceFile() {
  const config = await getConfig();
  const namespaceConfigFile = await getTwigNamespaceConfig(
    process.cwd(),
    config.extraTwigNamespaces,
  );
  await writeFile(
    path.join(config.dataDir, 'twig-namespaces.bolt.json'),
    JSON.stringify(namespaceConfigFile, null, '  '),
  );
}

module.exports = {
  buildBoltManifest,
  getBoltManifest,
  writeBoltManifest,
  writeTwigNamespaceFile,
  getTwigNamespaceConfig,
  mapComponentNameToTwigNamespace,
  getAllDirs,
  getPkgInfo,
};
