const { join } = require('path');
const tu = require('../test-utils');

const repoRoot = join(__dirname, '../../../..');

describe('test-utils', () => {
  test('getPkgPathFromName', () => {
    const path = tu.getPkgPathFromName('@bolt/components-band');
    expect(path).toBe(join(repoRoot, 'packages/components/bolt-band'));
  });

  test('getPkgDependencies', () => {
    const deps = tu.getPkgDependencies('@bolt/components-band');
    const expected = [
      '@bolt/core-v3.x',
      '@bolt/components-grid',
      '@bolt/components-background',
      '@bolt/components-background-shapes',
      '@bolt/element',
      '@bolt/polyfills',
    ].sort();
    expect(deps.sort()).toEqual(expected);
  });

  test('getPkgDependents', () => {
    const dependents = tu.getPkgDependents('@bolt/components-grid');
    expect(dependents).toEqual([
      '@bolt/components-band',
      '@bolt/blueprints',
      '@bolt/components-page-footer',
    ]);
  });

  test('getFilesPkgSync', () => {
    const pkgName = tu.getFilesPkgSync(
      join(repoRoot, 'packages/components/bolt-band/src/band.js'),
    );
    expect(pkgName).toEqual('@bolt/components-band');
  });

  test('getPkgFiles', () => {
    const files = tu.getPkgFiles('@bolt/testing-helpers');
    const pkgPath = tu.getPkgPathFromName('@bolt/testing-helpers');
    ['index.js', 'is-connected.js', 'CHANGELOG.md', 'package.json']
      .map(file => join(pkgPath, file))
      .forEach(file => {
        expect(files).toContain(file);
      });
  });

  test('getPkgList', () => {
    const pkgs = tu.getPkgList();
    expect(pkgs.length).toBeGreaterThan(1);
    const [pkg] = pkgs;
    expect(pkg).toMatchObject({
      name: expect.any(String),
      version: expect.any(String),
      location: expect.any(String),
    });
  });

  test.skip('getFilesChanged', () => {
    const files = tu.getFilesChanged({
      from: 'v2.4.4',
      base: 'v2.4.3',
    });

    const expected = [
      '.boltrc.js',
      'CHANGELOG.md',
      'docs-site/.boltrc.js',
      'docs-site/.incache',
      'docs-site/CHANGELOG.md',
      'docs-site/config/config.yml',
      'docs-site/package.json',
      'lerna.json',
      'package.json',
      'packages/api/CHANGELOG.md',
      'packages/api/package.json',
      'packages/build-tools/CHANGELOG.md',
      'packages/build-tools/package.json',
      'packages/components/bolt-action-blocks/CHANGELOG.md',
      'packages/components/bolt-action-blocks/package.json',
      'packages/components/bolt-action-blocks/src/action-block.twig',
      'packages/core-php/composer.json',
      'packages/core-php/composer.lock',
      'packages/core-php/package.json',
      'packages/core-php/readme.md',
      'packages/core-php/src/TwigExtensions/BoltCore.php',
      'packages/core-php/src/TwigExtensions/BoltCoreCompat.php',
      'packages/core-php/src/TwigExtensions/BoltExtras.php',
      'packages/core-php/src/TwigFunctions.php',
      'packages/core-php/src/Utils.php',
      'packages/drupal-modules/bolt_connect/bolt_connect.info.yml',
      'packages/drupal-modules/bolt_connect/composer.json',
      'packages/twig-renderer/CHANGELOG.md',
      'packages/twig-renderer/SetupTwigRenderer.php',
      'packages/twig-renderer/package.json',
      'yarn.lock',
    ].map(x => join(repoRoot, x));

    expect(files.sort()).toStrictEqual(expected.sort());
  });

  test.skip('getFilesChanged', () => {
    const pkgs = tu
      .getPkgsChanged({
        from: 'v2.4.4',
        base: 'v2.4.3',
      })
      .map(p => p.name);

    const expected = [
      '@bolt/components-action-blocks',
      '@bolt/core-v3.x-php',
      '@bolt/twig-renderer',
    ];

    expect(pkgs.sort()).toStrictEqual(expected.sort());
  });
});
