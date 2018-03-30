const path = require('path');
const fs = require('fs-extra');
const globby = require('globby');
const rootPkg = require(path.join(__dirname, '../package.json'));
const assert = require('assert');

describe('monorepo', async () => {
  /**
   * Array of object containing the package.json of each monorepo package
   * @var {Object[]}
   */
  let pkgs = [];

  beforeAll(async () => {
    const pkgDirs = await globby(rootPkg.workspaces);
    const pkgPaths = pkgDirs.map(pkgDir => path.join(pkgDir, 'package.json'));
    pkgs = await Promise.all(pkgPaths.map(async (pkgPath) => {
      const fileString = await fs.readFile(pkgPath);
      const pkg = JSON.parse(fileString);
      return pkg;
    }));
  });

  /**
   * Monorepo check to confirm components being published have the `publishConfig` config properly set in their package.json file.
   * This is necessary to ensure the Lerna publish to NPM doesn't unexpectedly fail mid-way due to this config option missing.
   */
  test('Check Component Public Config', async () => {
    pkgs.forEach((pkg) => {
      if (!pkg.private && pkg.private !== true) {
        assert.ok(pkg.publishConfig !== 'undefined', `Please add a publishConfig to ${pkg.name}'s package.json. Check out the Bolt Design System docs section on Adding a New Component for more info: https://bolt-design-system.com/docs/guides/adding-a-new-component.`);

        assert.strictEqual(pkg.publishConfig.access, 'public', `Please set publishConfig.access to "public" in ${pkg.name}'s package.json. Check out the Bolt Design System docs section on Adding a New Component for more info: https://bolt-design-system.com/docs/guides/adding-a-new-component.`)
      }
    });
  });
});
