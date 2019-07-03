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
const rootPkg = require(join(__dirname, '../package.json'));
const assert = require('assert');
const chalk = require('chalk');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

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

function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}

/** @type {BoltPkg[]} */
const boltPkgs = getPkgList();

describe('check the config for monorepo packages', () => {
  /**
   * Array of object containing the package.json of each monorepo package
   * @var {Object[]}
   */
  let pkgs = [];

  beforeAll(async () => {
    const dirs = rootPkg.workspaces.packages.map(pkg => `${pkg}/package.json`);
    const pkgDirs = await globby(dirs);

    pkgs = await Promise.all(
      pkgDirs.map(async pkgPath => {
        const fileString = await fs.readFile(pkgPath);
        const pkg = JSON.parse(fileString);
        pkg.pkgPath = process.cwd() + '/' + pkgPath;
        return pkg;
      }),
    );
  });

  /**
   * Monorepo check to confirm components being published have the `publishConfig` config properly set in their package.json file.
   * This is necessary to ensure the Lerna publish to NPM doesn't unexpectedly fail mid-way due to this config option missing.
   */
  test('non-private @bolt packages have the required publishConfig', async () => {
    pkgs.forEach(pkg => {
      if (!pkg.private && pkg.private !== true && pkg.name.includes('@bolt')) {
        assert.ok(
          pkg.publishConfig !== 'undefined',
          `Please add a publishConfig to ${
            pkg.name
          }'s package.json file in ${chalk.underline(
            pkg.pkgPath,
          )} . Check out the Bolt Design System docs section on Adding a New Component for more info: https://boltdesignsystem.com/docs/guides/adding-a-new-component.`,
        );

        assert.strictEqual(
          pkg.publishConfig.access,
          'public',
          `Please set ${
            pkg.name
          }'s publishConfig.access to "public" in ${chalk.underline(
            pkg.pkgPath,
          )} . Check out the Bolt Design System docs section on Adding a New Component for more info: https://boltdesignsystem.com/docs/guides/adding-a-new-component.`,
        );
      }
    });
  });

  test('non-private @bolt packages do not use devDependencies', async () => {
    pkgs.forEach(pkg => {
      if (!pkg.private && pkg.name.includes('@bolt')) {
        expect(
          pkg.devDependencies,
          `Please move any of ${
            pkg.name
          }'s devDependeencies defined in ${chalk.underline(
            pkg.pkgPath,
          )} to dependeencies to avoid potential install issues downstream.`,
        ).toBeUndefined();
      }
    });
  });

  test('non-private @bolt packages do not use peerDependencies', async () => {
    pkgs.forEach(pkg => {
      if (!pkg.private && pkg.name.includes('@bolt')) {
        expect(
          pkg.peerDependencies,
          `Please move any of ${
            pkg.name
          }'s peerDependencies defined in ${chalk.underline(
            pkg.pkgPath,
          )} to dependeencies to avoid potential install issues downstream.`,
        ).toBeUndefined();
      }
    });
  });

  test('`@bolt` dependencies are symlinked to the packages folder', async () => {
    const baseDir = resolve(__dirname, '../node_modules/@bolt');
    readdir(baseDir)
      .then(dirNames =>
        Promise.all(
          dirNames.map(dirName => {
            const item = {
              path: join(baseDir, dirName),
            };
            return new Promise((resolve, reject) => {
              lstat(item.path)
                .then(stats => {
                  item.stats = stats;
                  resolve(item);
                })
                .catch(reject);
            });
          }),
        ),
      )
      .then(items => {
        items.forEach(item => {
          if (!item.path.includes('fast-sass-loader')) {
            expect(
              item.stats.isSymbolicLink(),
              `Error 🛑: the ${chalk.red.underline(
                item.path,
              )} package installed to the root "node_modules/@bolt/" folder isn't symlinked to the packages folder! \n\n In the Bolt monorepo we require all Bolt packages to be a symbolic link pointing back to the local package's code to ensure packages are configured and working correctly + use up to date dependencies. A Bolt package requiring ${
                item.path
              } package likely needs to have it's package.json updated to use a more up to date version of this Bolt particular dependency.`,
            ).toBe(true);
          }
        });
      });
  });

  describe('Bolt Components declare dependencies in package.json if used in Twig files', () => {
    const excludedPkgs = ['generator-bolt'];

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
                ignore: ['**/__tests__/**'],
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
          });
        },
      );
  });
});
