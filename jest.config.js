// https://facebook.github.io/jest/docs/en/configuration.html
const globby = require('globby');
const testFilesToIgnore = globby.sync([
  './packages/components/**/*/__tests__/*.e2e.js',
  './packages/components/**/*/__tests__/**/*.data.js',
  './packages/analytics/**/*/__tests__/**/*.data.js',
]);

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
    ...testFilesToIgnore,
  ],
  testEnvironment: './jest-environment-puppeteer-basichtml.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lit-html|@bolt|@open-wc)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    'packages/(?!(components|core|analytics)/)', // add any additional packages in node_modules that need to be transpiled for Jest
    './scripts/monorepo.test.js',
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
