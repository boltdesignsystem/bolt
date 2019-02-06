const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const path = require('path');

describe.skip('image file output', () => {
  test('dummy test', () => {
    expect(true).toEqual(true);
  });

  // @todo Build out snapshot testing with Jest for images

  // test('x', async () => {
  //   const plFilePath = path.resolve(__dirname, '../../../../www/pattern-lab/patterns/02-components-image-10-image-size-variations/02-components-image-10-image-size-variations.markup-only.html');
  //   const plFile = await readFile(plFilePath, 'utf8');
  //   expect(plFile).toMatchSnapshot();
  // });
  //
  // test('y', async () => {
  //   const plFilePath = path.resolve(__dirname, '../../../../www/pattern-lab/patterns/02-components-image-15-image-source-variations/02-components-image-15-image-source-variations.markup-only.html');
  //   const plFile = await readFile(plFilePath, 'utf8');
  //   expect(plFile).toMatchSnapshot();
  // });
});
