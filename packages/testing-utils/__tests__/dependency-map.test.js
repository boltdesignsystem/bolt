const { join } = require('path');
const dm = require('../dependency-map');

const repoRoot = join(__dirname, '../../../..');

describe('dependency mapper', () => {
  test('findTwigFilesUsedInFile', async () => {
    const results = await dm.findTwigFilesUsedInFile(
      join(__dirname, 'fixtures/card/card.twig'),
    );

    expect(results).toStrictEqual([
      '@x/button.twig',
      '@x/button/button.twig',
      '@x/icon/icon.twig',
      'button.twig',
    ]);
  });

  test('findTwigFilesUsedInString', () => {
    const twigString = `
<div class="card">
  <h2>{{ title }}</h2>
  <footer>
    {% include "@x/button.twig" %}
    <div>{% include "@x/button.twig" %}</div>
    {% include '@x/button/button.twig' %}
    {% include '@x/icon/icon.twig' %}
    {% include "button.twig" %}
    {% include "@x/button.twig" with {
      text: "Hi",
    } %}
  </footer>
</div>
    `;

    const results = dm.findTwigFilesUsedInString(twigString);

    expect(results).toStrictEqual([
      '@x/button.twig',
      '@x/button/button.twig',
      '@x/icon/icon.twig',
      'button.twig',
    ]);
  });

  test('getTwigFilePath', async () => {
    const filePath = await dm.getTwigFilePath(
      '@bolt-components-button/button.twig',
    );

    expect(filePath).toBe(
      join(repoRoot, 'packages/components-button/src/button.twig'),
    );
  });

  test('getFilesPkg', async () => {
    const pkgName = await dm.getFilesPkg(
      join(repoRoot, 'packages/components-band/src/band.js'),
    );
    expect(pkgName).toEqual('@bolt/components-band');
  });
});
