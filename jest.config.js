// https://facebook.github.io/jest/docs/en/configuration.html
const globby = require('globby');
const testFilesToIgnore = globby.sync([
  'packages/components/**/*.e2e.js',
  'packages/components/**/*.no2e.js', // workaround to disable a few e2e tests
  'packages/**/*.data.js',
  'packages/generators/**/*.test.js',
]);

module.exports = {
  moduleDirectories: ['node_modules', 'packages/testing/testing-jest'],
  testPathIgnorePatterns: [
    'node_modules',
    'vendor',
    'docs-site',
    'brightcove-player.test.js',
    'packages/uikit-workshop',
    // 'packages/testing/testing-utils/__tests__',
    'packages/build-tools/plugins/sass-export-data/tests',
    'packages/build-tools/__tests__/*',
    'packages/components/bolt-button/__tests__/button-wc.test.js',
    'packages/patternlab-node',
    ...testFilesToIgnore,
  ],
  testEnvironment:
    './packages/testing/testing-jest/jest-environment-puppeteer-basichtml.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lit-html|@bolt|@open-wc)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    'packages/(?!(elements|layouts|components|core|analytics|config|testing|generators|experimental)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    './scripts/monorepo.test.js',
  ],
  globalSetup: './packages/testing/testing-jest/jest-global-setup.js',
  globalTeardown: './packages/testing/testing-jest/jest-global-teardown.js',
  setupFilesAfterEnv: ['jest-dom/extend-expect', 'jest-expect-message'],
  snapshotSerializers: ['jest-serializer-html'],
  reporters: [
    'default',
    './packages/testing/testing-jest/jest-reporter-vrt.js',
  ],
  testTimeout: 120000,
  // slowTestThreshold: 30000, // Uncomment to debug slow tests once we upgrade to Jest v26
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
