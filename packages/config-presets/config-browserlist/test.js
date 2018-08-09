const browserslist = require('browserslist');
const config = require('./index');

describe('Test the Bolt Browserslist Config', () => {
  test('Config successfully resolves a list of browsers', async () => {
    const browsers = browserslist(config);
    expect(browsers.length).toBeGreaterThan(0);

    console.log('Bolt is currently supporting the following browsers:');
    console.log(browsers.join('\n'));
  });
});
