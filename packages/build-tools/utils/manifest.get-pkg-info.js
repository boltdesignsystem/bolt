/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');
const $RefParser = require('json-schema-ref-parser');
const { ensureFileExists } = require('./general');
const { getDataFile } = require('./yaml');
const { validateSchemaSchema } = require('./schemas');
const { getConfig } = require('./config-store');
let config; // cached Bolt config

// don't automatically include these Bolt packages as extra (undeclared) dependencies
const missingBoltPkgsWhitelist = [
  '@bolt/core',
  '@bolt/core-v3.x',
  '@bolt/polyfills',
  '@bolt/element',
  '@bolt/lazy-queue',
  '@bolt/components-icons',
];

/**
 * Get information about a components assets
 * @param {string|object} pkgName - Name of a component i.e. `@bolt/button`
 * OR object - see `config.schema.yml` under `definitions.components.items`
 * @returns {{name, basicName: string | * | void}} - Asset info + an array of missing dependencies (if any)
 */
async function getPkgInfo(pkgName) {
  const missingBoltPkgs = [];
  config = config || (await getConfig());
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
    return {
      processedPkg: info,
      missingPkgs: missingBoltPkgs,
    };
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
      const matchedName = pkg.name.match(scopedRegex())[0];
      const pkgNamePrefix = matchedName.split('/')[0].replace('@', '');
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

    config.components.individual = config.components.individual || [];
    config.components.global = config.components.global || [];

    // combine pkg.dependencies and pkg.peerDependencies
    let deps = {};
    if (pkg.dependencies) {
      deps = { ...deps, ...pkg.dependencies };
    }
    if (pkg.peerDependencies) {
      deps = { ...deps, ...pkg.peerDependencies };
    }

    if (Object.keys(deps).length > 0) {
      for (const dependency in deps) {
        if (
          dependency.includes('@bolt/') &&
          !missingBoltPkgs.includes(dependency) &&
          missingBoltPkgsWhitelist.indexOf(dependency) === -1 &&
          !config.components.global.includes(dependency) &&
          !config.components.individual.includes(dependency)
        ) {
          missingBoltPkgs.push(dependency);
        }

        // @todo: remove with v3.0
        if (dependency.includes('bolt')) {
          info.deps.push(dependency);
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
    return {
      processedPkg: info,
      missingPkgs: missingBoltPkgs,
    };
  }
}

module.exports = getPkgInfo;
