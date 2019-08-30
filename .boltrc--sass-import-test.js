const path = require('path');
const resolve = require('resolve');
const argv = require('yargs').argv;

const config = require('./.boltrc.js');

const newConfig = Object.assign(config, {
  buildDir: './www--sass-import-test/build',
  dataDir: './www--sass-import-test/build/data',
  wwwDir: './www--sass-import-test',
  components: {
    global: [
      resolve.sync('./sass-import-test.scss'),
    ],
    individual: [],
  },
});

newConfig.copy = [
  {
    from: path.join(__dirname, 'public/index.html'),
    to: path.join(
      __dirname,
      newConfig.wwwDir,
    ),
    flatten: true,
  }
];

module.exports = newConfig;