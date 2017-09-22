const path = require('path');
const expect = require('chai').expect;
const SassyTest = require('sassy-test');

const packageName = '@bolt/settings-colors';

const testFile = path.join(__dirname, 'compile-test.scss');
const testOutputFile = path.join(__dirname, 'compile-test.css');

const sassyTest = new SassyTest({
  includePaths: [
    path.join(__dirname, 'node_modules')
  ],
  importer: require('npm-sass').importer,
  outFile: `${testOutputFile}`
  // Since our fixtures are in test/fixtures, we don't need to override
  // the default value by setting the "fixtures" path here.
  // fixtures: path.join(__dirname, 'fixtures'),
});

describe(`@import ${packageName}`, () => {
  it('should compile without any errors.', (done) => {
    sassyTest.render({
      file: `${testFile}`,
      outFile: `${testOutputFile}`,
      includePaths: [
        path.join(__dirname, 'node_modules')
      ],
      importer: require('npm-sass').importer
    }, (error, result) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should convert the sourcemap into an object if souremaps enabled.', (done) => {
    sassyTest.render({
      file: `${testFile}`,
      sourceMap: true,
      outFile: `${testOutputFile}`,
      includePaths: [
        path.join(__dirname, 'node_modules')
      ],
      importer: require('npm-sass').importer
    }, (error, result) => {
      expect(error).to.not.exist;
      expect(result.map).to.be.an('object');
      done();
    });
  });
});
