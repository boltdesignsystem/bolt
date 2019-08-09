const shell = require('shelljs');
const helpers = require('yeoman-test');
var path = require('path');

describe('Yeoman component generator', () => {
  test('test the NPM script works', async () => {
    const result = shell.exec('yarn run cc -N Test -D Test description');

    console.log(result);
    expect(result.code).toBe(1);
    expect(result.stderr).toBe(null);

    // return (
    //   helpers
    //     .run(path.join(__dirname, '../../component'))
    //     // .inDir(path.join(__dirname, 'tmp'))
    //     // .withArguments(['-N']); // Mock the arguments
    //     .withPrompts({
    //       componentName: 'Test',
    //       name: 'Test',
    //       description: 'Test desc',
    //     })
    //     .withLocalConfig({ name: 'test' })
    // );

    // .withOptions({ name: 'Test' }) // Mock options passed in
    // .withArguments(['name-x']) // Mock the arguments
    // .withPrompts({ coffee: false }) // Mock the prompt answers
    // .withLocalConfig({ lang: 'en' }) // Mock the local config
    // .then(function() {
    //   // assert something about the generator
    // });
  });
});
