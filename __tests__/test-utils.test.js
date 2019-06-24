const { join } = require('path');
const tu = require('../scripts/utils/test-utils');

const repoRoot = join(__dirname, '..');

describe('test-utils', () => {
  test('getPkgNameFromPath', () => {
    const name = tu.getPkgNameFromPath(
      join(repoRoot, 'packages/components/bolt-band'),
    );
    expect(name).toBe('@bolt/components-band');
  });

  test('getPkgPathFromName', () => {
    const path = tu.getPkgPathFromName('@bolt/components-band');
    expect(path).toBe(join(repoRoot, 'packages/components/bolt-band'));
  });

  test('getPkgDependencies', () => {
    const deps = tu.getPkgDependencies('@bolt/components-band');
    const expected = ['@bolt/core', '@bolt/components-grid'].sort();
    expect(deps.sort()).toEqual(expected);
  });

  test('getPkgDependents', () => {
    const dependents = tu.getPkgDependents('@bolt/components-grid');
    expect(dependents).toEqual(['@bolt/components-band']);
  });

  test('getFilesPkg', () => {
    const pkgName = tu.getFilesPkg(
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
});
