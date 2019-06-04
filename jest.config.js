// https://facebook.github.io/jest/docs/en/configuration.html
const globby = require('globby');
const testFilesToIgnore = globby.sync([
  'packages/components/**/*.e2e.js',
  'packages/**/*.data.js',
]);

console.log(testFilesToIgnore);

module.exports = {
  moduleDirectories: ['node_modules', 'packages/config/jest'],
  testPathIgnorePatterns: [
    'node_modules',
    'vendor',
    'docs-site',
    'brightcove-player.test.js',
    'example-integrations',
    'packages/uikit-workshop',
    'packages/build-tools/plugins/sass-export-data/tests',
    'packages/components/bolt-button/__tests__/button-wc.test.js',
    'packages/patternlab-node',
    './packages/generators',
    ...testFilesToIgnore,
  ],
  testEnvironment:
    './packages/config/jest/jest-environment-puppeteer-basichtml.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lit-html|@bolt|@open-wc)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    'packages/(?!(components|core|analytics|config|testing-helpers|generators)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    './scripts/monorepo.test.js',
  ],
  globalSetup: './packages/config/jest/jest-global-setup.js',
  globalTeardown: './packages/config/jest/jest-global-teardown.js',
  setupFilesAfterEnv: [
    './packages/config/jest/jest-setup-files-after-env.js',
    'jest-expect-message',
  ],
  snapshotSerializers: ['jest-serializer-html'],
  reporters: ['default', './packages/config/jest/jest-reporter-vrt.js'],
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
