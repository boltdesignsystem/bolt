'use strict';

const execa = require('execa');
var semverValid = require('semver').valid;
var regex = /tag:\s*(.+?)[,)]/gi;

async function gitSemverTags() {
  const { stdout } = await execa.shell('git tag');
  const tags = [];
  const splitData = stdout.split('\n');

  splitData.forEach(function(tag) {
    if (tag.startsWith('v')) {
      if (semverValid(tag)) {
        tags.push(tag);
      }
    }
  });

  return tags;
}

module.exports = {
  gitSemverTags,
};
