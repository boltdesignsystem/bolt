/* global describe, it, before */
/* eslint-disable import/no-extraneous-dependencies, func-names */
const chai = require('chai');
const join = require('path').join;
const execSync = require('child_process').execSync;
const fs = require('fs');

const assert = chai.assert;
chai.use(require('chai-fs'));

describe('Sass Export Data', function () {
  this.timeout(5000);
  let output = '';
  before(() => {
    try {
      output = execSync('npm run test:compile', {
        cwd: __dirname,
        encoding: 'utf8',
      });
      // console.log(output);
    } catch (e) {
      console.error('Could not run command beforehand.', e);
    }
  });

  fs.readdirSync(join(__dirname, './basics/expected'))
    .filter(file => file.endsWith('json'))
    .forEach((file) => {
      it(`Creates JSON from Sass Vars in ${file}`, () => {
        assert.deepEqual(
          JSON.parse(
            fs.readFileSync(
              join(__dirname, './basics/dest/', file),
              'utf8'
            )
          ),
          JSON.parse(
            fs.readFileSync(
              join(__dirname, './basics/expected/', file),
              'utf8'
            )
          ),
          `JSON files do not match.\n\n${output}`
        );
      });
    });
});
