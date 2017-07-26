/* global describe, it, before */
/* eslint-disable import/no-extraneous-dependencies, func-names */
const chai = require('chai');
const join = require('path').join;
const execSync = require('child_process').execSync;

const assert = chai.assert;
chai.use(require('chai-fs'));

describe('Sass Basics', function () {
  this.timeout(5000);
  let output = '';
  before(() => {
    try {
      output = execSync('gulp compile', {
        cwd: join(__dirname, 'basics'),
        encoding: 'utf8',
      });
      // console.log(output);
    } catch (e) {
      console.error('Could not run gulp command beforehand.', e);
    }
  });
  it('Compiles Sass to CSS', () => {
    assert.directoryDeepEqual(join(__dirname, './basics/dest'), join(__dirname, './basics/expected'), `Directories do not match. Gulp output below: \n\n${output}`);
  });
});
