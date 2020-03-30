const browserslist = require('browserslist');
const browsers = browserslist();

describe('Test the Bolt Browserslist Config', () => {
  test('Config successfully resolves a list of browsers', async () => {
    expect(browsers.length).toBeGreaterThan(0);

    console.log('Bolt is currently supporting the following browsers:');
    console.log(browsers.join('\n'));
  });

  test('Browserslist config does not include IE 11 support', async () => {
    expect(browsers).not.toContain('ie 11');
  });
});
