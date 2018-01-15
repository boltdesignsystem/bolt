#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

/**
 * Monorepo symlink checker for internal `@bolt` packages
 * Ensures every directory in `../node_modules/@bolt/` is a symbolic link, if not then, a package is being pulled from npm instead of the local repo - which causes problems.
 */
function checkMonorepoSymlinks() {
  const baseDir = path.resolve(__dirname, '../node_modules/@bolt');
  readdir(baseDir)
    .then((dirNames) => {
      return Promise.all(dirNames.map((dirName) => {
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
      }))
    })
    .then((items) => {
      items.forEach((item) => {
        if (!item.stats.isSymbolicLink()) {
          console.log('Error: Everything in "node_modules/@bolt/" should be a symbolic link to ensure the monorepo is set up correctly. You most likely have a version mismatch between this and something that is using it.');
          console.log(item.path);
          process.exit(1);
        } else {
          // console.log(`Looks good: ${item.path}`);
        }
      });
    })
    .catch((error) => {
      console.log('uh oh!', error);
      process.exit(1)
    });
}

checkMonorepoSymlinks();
