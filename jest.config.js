// https://facebook.github.io/jest/docs/en/configuration.html
const globby = require('globby');
const testFilesToIgnore = globby.sync([
  'packages/components/**/*.e2e.js',
  'packages/components/**/*.no2e.js', // workaround to disable a few e2e tests
  'packages/**/*.data.js',
]);

module.exports = {
  moduleDirectories: ['node_modules', 'packages/testing/testing-jest'],
  testPathIgnorePatterns: [
    'node_modules',
    'vendor',
    'docs-site',
    'brightcove-player.test.js',
    'example-integrations',
    'packages/uikit-workshop',
    // 'packages/testing/testing-utils/__tests__',
    'packages/build-tools/plugins/sass-export-data/tests',
    'packages/build-tools/__tests__/*',
    'packages/components/bolt-button/__tests__/button-wc.test.js',
    'example-integrations/drupal-lab/web/themes/bolt-starter/__tests__/index.js', // tested separately after the Drupal Lab build
    'packages/patternlab-node',
    './packages/generators',
    ...testFilesToIgnore,
  ],
  testEnvironment:
    './packages/testing/testing-jest/jest-environment-puppeteer-basichtml.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lit-html|@bolt|@open-wc)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    'packages/(?!(components|core|analytics|config|testing|generators|experimental)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    './scripts/monorepo.test.js',
  ],
  globalSetup: './packages/testing/testing-jest/jest-global-setup.js',
  globalTeardown: './packages/testing/testing-jest/jest-global-teardown.js',
  setupFilesAfterEnv: [
    './packages/testing/testing-jest/jest-setup-files-after-env.js',
    'jest-expect-message',
  ],
  snapshotSerializers: ['jest-serializer-html'],
  reporters: [
    'default',
    './packages/testing/testing-jest/jest-reporter-vrt.js',
  ],
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
