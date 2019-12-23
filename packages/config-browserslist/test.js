const browserslist = require('browserslist');
const config = require('./legacy');
const browsers = browserslist(config);

describe('Test the Bolt Browserslist Config', () => {
  test('Config successfully resolves a list of browsers', async () => {
    expect(browsers.length).toBeGreaterThan(0);

    console.log('Bolt is currently supporting the following browsers:');
    console.log(browsers.join('\n'));
  });

  test('Browserslist config includes IE 11 support', async () => {
    expect(browsers).toContain('ie 11');
  });
});
