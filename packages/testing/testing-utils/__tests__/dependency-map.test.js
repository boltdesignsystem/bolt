const { join } = require('path');
const dm = require('../dependency-map');

const repoRoot = join(__dirname, '../../../..');

describe('dependency mapper', () => {
  test('findTwigFilesUsedInFile', async () => {
    const results = await dm.findTwigFilesUsedInFile(
      join(__dirname, 'fixtures/card/card.twig'),
    );

    expect(results).toStrictEqual([
      '@x/foo.twig',
      '@x/foo/foo.twig',
      '@x/bar/bar.twig',
      'foo.twig',
    ]);
  });

  test('findTwigFilesUsedInString', () => {
    const twigString = `
<div class="card">
  <h2>{{ title }}</h2>
  <footer>
    {% include "@x/foo.twig" %}
    <div>{% include "@x/foo.twig" %}</div>
    {% include '@x/foo/foo.twig' %}
    {% include '@x/bar/bar.twig' %}
    {% include "foo.twig" %}
    {% include "@x/foo.twig" with {
      text: "Hi",
    } %}
  </footer>
</div>
    `;

    const results = dm.findTwigFilesUsedInString(twigString);

    expect(results).toStrictEqual([
      '@x/foo.twig',
      '@x/foo/foo.twig',
      '@x/bar/bar.twig',
      'foo.twig',
    ]);
  });

  test('getTwigFilePath', async () => {
    const filePath = await dm.getTwigFilePath(
      '@bolt-components-menu/menu.twig',
    );

    expect(filePath).toBe(
      join(repoRoot, 'packages/components/bolt-menu/src/menu.twig'),
    );
  });

  test('getFilesPkg', async () => {
    const pkgName = await dm.getFilesPkg(
      join(repoRoot, 'packages/components/bolt-band/src/band.js'),
    );
    expect(pkgName).toEqual('@bolt/components-band');
  });
});
