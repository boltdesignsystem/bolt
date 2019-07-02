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
      '@x/button.twig',
      '@x/button/button.twig',
      '@x/icon/icon.twig',
      'button.twig',
      '@x/button.twig',
    ]);
  });

  test('getTwigFilePath', async () => {
    const filePath = await dm.getTwigFilePath(
      '@bolt-components-button/button.twig',
    );

    expect(filePath).toBe(
      join(repoRoot, 'packages/components/bolt-button/src/button.twig'),
    );
  });
});
