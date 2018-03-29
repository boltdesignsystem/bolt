#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

const readPkgUp = require('read-pkg-up');
const readPkg = require('read-pkg');
const findPkg = require('find-pkg');
const { forEach } = require('p-iteration');
const assert = require('assert');

/**
 * Monorepo symlink checker for internal `@bolt` packages
 * Ensures every directory in `../node_modules/@bolt/` is a symbolic link, if not then, a package is being pulled from npm instead of the local repo - which causes problems.
 */
function checkMonorepoSymlinks() {
  const baseDir = path.resolve(__dirname, '../node_modules/@bolt');
  readdir(baseDir)
    .then(dirNames => Promise.all(dirNames.map((dirName) => {
      const item = {
        path: path.join(baseDir, dirName),
      };
      return new Promise((resolve, reject) => {
        lstat(item.path)
          .then((stats) => {
            item.stats = stats;
            resolve(item);
          })
          .catch(reject);
      });
    })))
    .then((items) => {
      items.forEach((item) => {
        if (!item.stats.isSymbolicLink()) {
          console.log('🛑 Error: Everything in "node_modules/@bolt/" should be a symbolic link to ensure the monorepo is set up correctly. You most likely have a version mismatch between this and something that is using it.');
          console.log(item.path);
          process.exit(1);
        } else {
          // console.log(`Looks good: ${item.path}`);
        }
      });
    })
    .catch((error) => {
      console.log('🛑 uh oh!', error);
      process.exit(1);
    });
  console.log('✅  Monorepo check that `@bolt` packages are symlinked looks good!');
}

checkMonorepoSymlinks();


/**
 * Monorepo check to confirm components being published have the `publishConfig` config properly set in their package.json file.
 * This is necessary to ensure the Lerna publish to NPM doesn't unexpectedly fail mid-way due to this config option missing.
 */
async function checkComponentPublicConfig(pkg, pkgPath) {
  if (!pkg.private && pkg.private !== true) {
    await assert.notEqual(typeof pkg.publishConfig, 'undefined',
      `Please add a publishConfig to ${pkg.name}'s package.json, located at ${pkgPath}. Check out the Bolt Design System docs section on Adding a New Component for more info: https://bolt-design-system.com/docs/guides/adding-a-new-component.`);

    await assert.equal(pkg.publishConfig.access, 'public',
      `Please set publishConfig.access to "public" in ${pkg.name}'s package.json, located ${pkgPath}. Check out the Bolt Design System docs section on Adding a New Component for more info: https://bolt-design-system.com/docs/guides/adding-a-new-component.`);
  }
}


/**
 * Find the package.json files for Lerna-managed packages for running checks against.
 */
async function getComponentPackageConfigs() {
  const rootPkg = await readPkgUp();
  const pkgs = rootPkg.pkg.workspaces;
  (await forEach(pkgs, async (pkg) => {
    const pkgPath = await findPkg(pkg);
    const pkgInfo = await readPkg(pkgPath);

    try {
      await checkComponentPublicConfig(pkgInfo, pkgPath);
    } catch (error) {
      console.log('🛑  Uh oh! Test for publishConfig config failed!', error);
      process.exit(1);
    }
  }));
  console.log('✅  Monorepo check that Bolt packages have a `publishConfig` config looks good!');
}

getComponentPackageConfigs();
