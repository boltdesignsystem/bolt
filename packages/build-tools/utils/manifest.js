/* eslint-disable no-await-in-loop */
const { promisify } = require('util');
const resolve = require('resolve');
const fs = require('fs');
const path = require('path');
const $RefParser = require('json-schema-ref-parser');
const log = require('./log');
const { ensureFileExists } = require('./general');
const writeFile = promisify(fs.writeFile);
const { getDataFile } = require('./yaml');
const { validateSchemaSchema } = require('./schemas');
const { getConfig } = require('./config-store');

// recursively flatten heavily nested arrays
function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}

// utility function to help with removing duplicate objects (like shared dependencies)
function removeDuplicateObjectsFromArray(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
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

/**
 * Get information about a components assets
 * @param {string|object} pkgName - Name of a component i.e. `@bolt/button`
 * OR object - see `config.schema.yml` under `definitions.components.items`
 * @returns {{name, basicName: string | * | void}} - Asset info
 */
async function getPkgInfo(pkgName) {
  if (typeof pkgName === 'object') {
    const info = {
      name: pkgName.name,
      basicName: pkgName.name,
      assets: {},
    };
    if (pkgName.scss) {
      info.assets.style = pkgName.scss;
      info.dir = path.dirname(pkgName.scss);
      ensureFileExists(pkgName.scss);
    }
    if (pkgName.js) {
      info.assets.main = pkgName.js;
      // yeah I know we're overwriting `dir`... got to have something though... and it's only used by PL to watch Twig
      info.dir = path.dirname(pkgName.js);
      ensureFileExists(pkgName.js);
    }
    return info;
  }

  if (pkgName.endsWith('.scss') || pkgName.endsWith('.js')) {
    const pathInfo = path.parse(pkgName);
    const name = pathInfo.name + pathInfo.ext.replace('.', '-');
    const info = {
      name,
      basicName: name,
      dir: path.dirname(pkgName),
      assets: {},
    };
    if (pkgName.endsWith('.scss')) {
      info.assets.style = pkgName;
    }
    if (pkgName.endsWith('.js')) {
      info.assets.main = pkgName;
    }
    ensureFileExists(pkgName);
    return info;
  } else {
    // package name
    const pkgJsonPath = require.resolve(`${pkgName}/package.json`);
    const dir = path.dirname(pkgJsonPath);
    const pkg = require(pkgJsonPath);

    // automatically convert scoped package names into Twig namespaces

    // match NPM scoped package names
    // borrowed from https://github.com/sindresorhus/scoped-regex
    const regex = '@[a-z\\d][\\w-.]+/[a-z\\d][\\w-.]*';
    const scopedRegex = options =>
      options && options.exact
        ? new RegExp(`^${regex}$`, 'i')
        : new RegExp(regex, 'gi');

    /**
     * Strip out @ signs and the first dash in the package name.
     *
     * For example:
     * @bolt/ -> bolt-
     * @pegawww/ -> pegawww-
     */
    let normalizedPkgName;
    if (pkg.name.match(scopedRegex())) {
      const matchedName = pkg.name
      .match(scopedRegex())[0];
      const pkgNamePrefix = matchedName.split('/')[0]
      .replace('@', '');
      const pkgNameSuffix = matchedName.split('/')[1];
      normalizedPkgName = `${pkgNamePrefix}-${pkgNameSuffix}`;
    } else {
      normalizedPkgName = pkg.name.replace('@bolt/', 'bolt-');
    }

    const info = {
      name: pkg.name,
      basicName: normalizedPkgName,
      dir,
      assets: {},
      deps: [],
    };

    if (pkg.peerDependencies) {
      for (dependencyPackageName in pkg.peerDependencies) {
        if (dependencyPackageName.includes('bolt')) {
          info.deps.push(dependencyPackageName);
        }
      }
    }

    if (pkg.dependencies) {
      for (dependencyPackageName in pkg.dependencies) {
        if (dependencyPackageName.includes('bolt')) {
          info.deps.push(dependencyPackageName);
        }
      }
    }

    info.twigNamespace = `@${info.basicName}`;
    if (pkg.style) {
      info.assets.style = path.join(dir, pkg.style);
      ensureFileExists(info.assets.style);
    }
    if (pkg.main) {
      info.assets.main = path.join(dir, pkg.main);
      ensureFileExists(info.assets.main);
    }
    if (pkg.schema) {
      if (typeof pkg.schema === 'object') {
        if (info.schema === undefined) {
          info.schema = [];
        }

        const schemas = pkg.schema;

        for (const schemaPath of schemas) {
          let schema;
          const schemaFilePath = path.join(dir, schemaPath);
          // eslint-disable-next-line
          if (schemaFilePath.endsWith('.js')) {
            schema = require(schemaFilePath);
          } else {
            schema = await getDataFile(schemaFilePath);
          }
          validateSchemaSchema(
            schema,
            `Schema not valid for: ${schemaFilePath}`,
          );
          const schemaMachineName = schema.title
            .replace(/ /g, '-')
            .toLowerCase();

          const dereferencedSchema = await $RefParser.dereference(schema);
          info.schema[schemaMachineName] = dereferencedSchema;
        }
      } else {
        let schema;
        const schemaFilePath = path.join(dir, pkg.schema);
        if (schemaFilePath.endsWith('.js')) {
          schema = require(schemaFilePath);
        } else {
          schema = await getDataFile(schemaFilePath);
        }
        validateSchemaSchema(schema, `Schema not valid for: ${schemaFilePath}`);
        const dereferencedSchema = await $RefParser.dereference(schema);
        info.schema = dereferencedSchema;
      }
    }
    // @todo Allow verbosity settings
    // console.log(assets);
    return info;
  }
}

// loop through package-specific dependencies to merge and dedupe
async function aggregateBoltDependencies(data) {
  let componentDependencies = [];
  let componentsWithoutDeps = data;

  componentsWithoutDeps.forEach(item => {
    if (item.deps) {
      componentDependencies.push([...item.deps]);
    }
  });

  componentDependencies = flattenDeep(componentDependencies);

  componentDependencies = componentDependencies.filter(function(x, i, a) {
    if (x !== '@bolt/build-tools' && a.indexOf(x) === i) {
      return x;
    }
  });

  let globalDepsSrc = await Promise.all(componentDependencies.map(getPkgInfo));

  componentsWithoutDeps = componentsWithoutDeps.concat(globalDepsSrc);

  var uniqueComponentsWithDeps = removeDuplicateObjectsFromArray(
    componentsWithoutDeps,
    'name',
  );

  return uniqueComponentsWithDeps;
}

async function buildBoltManifest() {
  const config = await getConfig();
  try {
    if (config.components.global) {
      let globalSrc = await Promise.all(
        config.components.global.map(getPkgInfo),
      );

      const globalSrcPlusDeps = await aggregateBoltDependencies(globalSrc);

      boltManifest.components.global = globalSrcPlusDeps;
    }
    if (config.components.individual) {
      const individualSrc = await Promise.all(
        config.components.individual.map(getPkgInfo),
      );
      boltManifest.components.individual = individualSrc;
    }
  } catch (err) {
    log.errorAndExit('Error building Bolt Manifest', err);
  }

  return boltManifest;
}

async function getBoltManifest() {
  const boltManifest = await buildBoltManifest();
  return boltManifest;
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
};
