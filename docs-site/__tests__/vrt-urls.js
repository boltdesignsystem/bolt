const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');
const { getConfig } = require('@bolt/build-utils/config-store');

async function getVrtUrlsPath() {
  const config = await getConfig();

  return path.resolve(
    path.join(config.wwwDir, 'build/data/vrt-urls.bolt.json'),
  );
}

describe('Bolt VRT URLs', () => {
  test('VRT URL file exists and matches snapshot', async () => {
    const vrtUrlsPath = await getVrtUrlsPath();

    expect(
      fs.existsSync(vrtUrlsPath),
      'You may not have built Pattern Lab yet. Try running `yarn start` or `yarn build` to generate the missing file.',
    ).toBe(true);

    const results = fs.readFileSync(vrtUrlsPath, 'utf8');
    const formattedJSON = prettier.format(results, {
      parser: 'json',
    });

    expect(
      formattedJSON,
      'If changes are expected, run `yarn test:vrt-urls -u` from the project root to update snapshot. Then, inform the QA team of these changes.',
    ).toMatchSnapshot();
  });
});
