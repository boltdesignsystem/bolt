const gitTags = require('git-tags');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const path = require('path');
const semverSort = require('semver-sort');
const semver = require('semver');

async function init() {
  gitTags.get(async function(err, tags) {
    if (err) throw err;
    let cleanSemverTags = [];

    for (const [i, v] of process.argv.entries()) {
      let tagValue = '';
      if (i > 1) {
        if (!v.includes('v')) {
          tagValue = 'v' + v;
        } else {
          tagValue = v;
        }
      }
      tags.push(tagValue);
    }

    for (const tag of tags) {
      if (semver.valid(tag) && semver.lt('v5.0.0', tag)) {
        cleanSemverTags.push(tag);
      }
    }
    tags = await semverSort.desc(cleanSemverTags);

    await writeFile(
      path.resolve('./www/build/data', './tags.bolt.json'),
      JSON.stringify(tags),
    );
  });
}

init();
