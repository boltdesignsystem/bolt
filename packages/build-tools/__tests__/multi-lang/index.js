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

    expect(colorData.indigo.xdark).toBe('rgb(6, 9, 35)');
    expect(colorData.yellow.base).toBe('rgb(255, 204, 77)');
  });

  test('Check that the Japanese-specific CSS bundle was generated and contains the correct font', async () => {
    const getCSSData = async function() {
      try {
        const cssData = fs
          .readFileSync(
            path.resolve(process.cwd(), `${buildDir}/bolt-global-ja.css`),
          )
          .toString();
        return cssData;
      } catch (error) {
        return false;
      }
    };

    const cssFile = await getCSSData();
    const prettyCss = await prettier.format(cssFile, prettierConfig);

    expect(prettyCss).toMatchSnapshot();

    const japaneseFontRule =
      'font-family:-apple-system,BlinkMacSystemFont,ヒラギノ角ゴ ProN,Hiragino Kaku Gothic ProN,游ゴシック,游ゴシック体,YuGothic,Yu Gothic,メイリオ,Meiryo,ＭＳ ゴシック,MS Gothic,HiraKakuProN-W3,TakaoExゴシック,TakaoExGothic,MotoyaLCedar,Droid Sans Japanese,sans-serif;';

    const englishFontFamilyRule =
      'font-family:"Open Sans","Helvetica Neue",sans-serif;font-family:var(--bolt-font-family-heading)';

    expect(cssFile).toEqual(expect.stringContaining(japaneseFontRule));
    expect(cssFile).toEqual(expect.not.stringContaining(englishFontFamilyRule));
  });

  test('Check that the Japanese-specific bolt-global-ja.css file built contains the correct utility class styles for the older u-bolt-margin-bottom syntax.', async () => {
    const getCSSData = async function() {
      try {
        const cssData = fs
          .readFileSync(
            path.resolve(process.cwd(), `${buildDir}/bolt-global-ja.css`),
          )
          .toString();
        return cssData;
      } catch (error) {
        return false;
      }
    };

    const cssFile = await getCSSData();
    expect(cssFile).toEqual(
      expect.stringContaining(
        '.u-bolt-margin-bottom{margin-bottom:1.155rem!important}',
      ),
    );
  });

  test('Check that the default English-specific bolt-global.css file built contains the correct utility class styles for the older u-bolt-margin-bottom syntax.', async () => {
    const getCSSData = async function() {
      try {
        const cssData = fs
          .readFileSync(
            path.resolve(process.cwd(), `${buildDir}/bolt-global-en.css`),
          )
          .toString();
        return cssData;
      } catch (error) {
        return false;
      }
    };

    const cssFile = await getCSSData();
    expect(cssFile).toEqual(
      expect.stringContaining(
        '.u-bolt-margin-bottom{margin-bottom:1.65rem!important}',
      ),
    );

    const prettyCss = await prettier.format(cssFile, prettierConfig);
    expect(prettyCss).toMatchSnapshot();
  });
});
