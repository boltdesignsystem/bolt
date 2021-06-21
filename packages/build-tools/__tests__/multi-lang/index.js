const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');
const prettierConfig = { semi: false, parser: 'css' };

const buildDir = require('./.boltrc.multi-lang.js').buildDir;

describe('Tests to confirm that the latest upcoming release of the @bolt/build-tools is compiling as expected', () => {
  test('Check that Bolt Build Tools is generating JSON data from Sass files', async () => {
    const dataFileExists = async function() {
      try {
        await fs.promises.access(
          path.resolve(
            process.cwd(),
            `${buildDir}/data/colors/brand.bolt.json`,
          ),
        );
        return true;
      } catch (error) {
        return false;
      }
    };

    expect(await dataFileExists()).toBe(true);
  });

  test('Check JSON data for colors was generated and outputted by the @bolt/build-tools', async () => {
    const getColorData = async function() {
      try {
        await fs.promises.access(
          path.resolve(
            process.cwd(),
            `${buildDir}/data/colors/brand.bolt.json`,
          ),
        );
        const colorData = JSON.parse(
          fs.readFileSync(
            path.resolve(
              process.cwd(),
              `${buildDir}/data/colors/brand.bolt.json`,
            ),
          ),
        );
        return colorData;
      } catch (error) {
        return false;
      }
    };

    const colorData = await getColorData();

    expect(colorData).toMatchSnapshot();

    expect(colorData.navy.xdark).toBe('rgb(9, 23, 52)');
    expect(colorData.yellow.base).toBe('rgb(255, 200, 54)');
  });
});
