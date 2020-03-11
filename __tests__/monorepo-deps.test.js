const { join, resolve } = require('path');
const fs = require('fs-extra');
const globby = require('globby');
const {
  getPkgPathFromName,
  getPkgDependents,
  getPkgDependencies,
  getPkgList,
  getPkgFiles,
  getFilesPkgSync,
  getFilesChanged,
  findTwigFilesUsedInFile,
  getFilesPkg,
  getTwigFilePath,
} = require('@bolt/testing-utils');

/**
 * @param {string} pkgName
 * @param {string[]} deps
 */
function pkgToHaveDependenciesOn(pkgName, deps) {
  const listedDeps = getPkgDependencies(pkgName);
  const missingDeps = [];
  deps.forEach(dep => {
    if (!listedDeps.some(d => d === dep)) {
      if (dep !== pkgName) {
        if (dep !== '@bolt/global') {
          missingDeps.push(dep);
        }
      }
    }
  });

  const pass = missingDeps.length === 0;

  return pass
    ? {
        pass,
        message: () => `${pkgName} has all dependencies listed correctly`,
      }
    : {
        pass,
        message: () =>
          `${pkgName} is missing these dependencies in package.json: ${missingDeps.join(
            ', ',
          )}`,
      };
}

expect.extend({ pkgToHaveDependenciesOn });

/** @type {BoltPkg[]} */
const boltPkgs = getPkgList();

describe('Bolt Components declare dependencies in package.json if used in Twig files', () => {
  const excludedPkgs = [
    '@bolt/generator-bolt',
    '@bolt/components-editor',
    '@bolt/uikit-workshop',
  ];

  boltPkgs
    .filter(boltPkg => !excludedPkgs.includes(boltPkg.name))
    .forEach(
      /** @type {BoltPkg} */
      boltPkg => {
        test(`pkg: ${boltPkg.name}`, async () => {
          const twigFilePaths = await globby(
            [join(boltPkg.location, '**/*.twig')],
            {
              gitignore: true,
              ignore: [
                '**/__tests__/**',
                '**/__demos__/**',
                '**/node_modules/**',
                '**/vendor/**',
              ],
            },
          );

          if (twigFilePaths.length === 0) {
            expect(true).toBe(true);
          } else {
            /** @type {Set<string>} */
            const twigDeps = new Set();
            /** @type {Set<string>} */
            const twigDepPkgs = new Set();

            await Promise.all(
              twigFilePaths.map(async twigFilePath => {
                const theseTwigDeps = await findTwigFilesUsedInFile(
                  twigFilePath,
                );
                theseTwigDeps.forEach(x => twigDeps.add(x));
              }),
            );

            await Promise.all(
              [...twigDeps].map(twigDep => {
                return getTwigFilePath(twigDep)
                  .then(getFilesPkg)
                  .then(pkgName => twigDepPkgs.add(pkgName));
              }),
            );

            twigDepPkgs.delete(boltPkg.name);

            expect(boltPkg.name).pkgToHaveDependenciesOn([...twigDepPkgs]);
          }
        }, 240000);
      },
    );
});
