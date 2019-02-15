// https://facebook.github.io/jest/docs/en/configuration.html
const globby = require('globby');
const path = require('path');
const nightwatchTestsToIgnore = globby.sync(
  './packages/components/**/*/__tests__/*.e2e.js',
);

module.exports = {
  testPathIgnorePatterns: [
    'sandbox',
    'docs-site',
    'brightcove-player.test.js',
    'example-integrations/drupal-lab',
    'packages/uikit-workshop',
    'packages/build-tools/plugins/sass-export-data/tests',
    'packages/components/bolt-button/__tests__/button-wc.test.js',
    'packages/patternlab-node',
    ...nightwatchTestsToIgnore,
  ],
  testEnvironment: './jest-environment-puppeteer-basichtml.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lit-html|@bolt|@open-wc)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    './packages/build-tools',
    './packages/uikit-workshop',
    './packages/core-php',
    './packages/config-presets',
    './scripts/monorepo.test.js',
    './packages/twig-renderer',
  ],
  globalSetup: './jest-global-setup.js',
  globalTeardown: './jest-global-teardown.js',
  setupFilesAfterEnv: ['./jest-setup-files-after-env.js'],
  snapshotSerializers: ['jest-serializer-html'],
  reporters: ['default', '<rootDir>/scripts/report-jest-screenshots.js'],
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
