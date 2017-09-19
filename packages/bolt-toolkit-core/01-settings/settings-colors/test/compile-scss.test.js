

const path = require('path');
const expect = require('chai').expect;
const SassyTest = require('sassy-test');

const testFile = 'test-sass-import.scss';
const testOutputFile = 'test-sass-import.css';
const packageName = '@bolt/settings-colors';

const sassyTest = new SassyTest({
  includePaths: [
    path.join(__dirname, 'node_modules')
  ],
  importer: require('npm-sass').importer,
  outFile: `test/${testOutputFile}`
  // Since our fixtures are in test/fixtures, we don't need to override
  // the default value by setting the "fixtures" path here.
  // fixtures: path.join(__dirname, 'fixtures'),
});


// it('should warn in another situation', function(done) {
//   // Sassy Test's renderFixture() can also test if your module produces an
//   // intentional warning message with Sass' @warn directive.
//   sassyTest.renderFixture('my-modules-warn', {}, function(error, result) {
//     // If the Sass in test/fixtures/my-modules-warn/input.scss triggers a
//     // @warn in your module, you should expect the result object to exist
//     // and to contain the warn message from your module.
//     expect(error).to.not.exist;
//     // Sassy Test adds two new arrays to node-sass' result object:
//     // result.warn and result.debug are arrays of strings.
//     expect(result.warn[0]).to.equal('Some helpful warning from your module.');
//     done();
//   });
// });


describe(`@import ${packageName}`, () => {
  it('should compile without any errors.', (done) => {
    sassyTest.render({
      file: `test/${testFile}`,
      outFile: `test/${testOutputFile}`,
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
      file: `test/${testFile}`,
      sourceMap: true,
      outFile: 'test/compile-test.css',
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
// });
//
//
// describe('@import "@bolt/settings-colors"', function() {
//    before(function(done) {
//      this.sassyTest = new SassyTest({
//        fixtures: path.join(__dirname, 'fixtures'),
//        includePaths: [path.join(__dirname, 'fixtures/my-sass-library')]
//      });
//      done();
//    });
//
//    it('should be able to @import the `@bolt/settings-colors` partial.', function(done) {
//      this.sassyTest.render({
//        data: '@import "@bolt/settings-colors; $debug: true;";\n.test {\n  content: $bolt-brand-colors;\n}'
//      }, function(error, result) {
//        expect(result.css).to.equal('.test {\n  content: "a variable from fixtures/_init.scss"; }\n');
//        done();
//      });
//    });

//
//
// describe('@import "mymodule";', function() {
//   describe('@function my-modules-function()', function() {
//     it('should test an aspect of this function', function(done) {
//       // Sassy Test's renderFixture() will run a comparison test between the
//       // rendered input.scss and the output.css found in the fixtures
//       // sub-directory specified in its first parameter, in this case:
//       // test/fixtures/my-modules-function
//       sassyTest.renderFixture('my-modules-function', {}, function(error, result) {
//         // If we expect the comparison test to succeed, we just need to test
//         // that no error occurred and then done(), but we can run other tests
//         // here if we desire.
//         expect(error).to.not.exist;
//         done();
//       });
//     });
//
//     it('should throw an error in this situation', function(done) {
//       // Sassy Test's renderFixture() can also test if your module produces an
//       // intentional error with Sass' @error directive.
//       sassyTest.renderFixture('my-modules-error', {}, function(error, result) {
//         // If the Sass in test/fixtures/my-modules-error/input.scss triggers an
//         // @error in your module, you should expect the error object to exist
//         // and to contain the error message from your module.
//         expect(error).to.exist;
//         expect(error.message).to.equal('Some helpful error message from your module.');
//         done();
//       });
//     });
//
//     it('should report an error if it cannot find output.css', function() {
//       sassyTest.renderFixture('renderFixture/missingOutput', {}).catch(function(error) {
//           expect(error).to.not.exist;
//       }).then(function(result) {
//         expect(result.expectedOutputFileError).to.exist;
//         expect(result.expectedOutputFileError.code).to.equal('ENOENT');
//       });
//     });

//
//   });
// });
