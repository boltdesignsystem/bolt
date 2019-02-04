// https://facebook.github.io/jest/docs/en/configuration.html
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
    'packages/components/bolt-video/__tests__/bolt-video.e2e.js',
    'packages/components/bolt-figure/__tests__/figure-data.js',
  ],
  testEnvironment: 'node',
  globalSetup: './jest-global-setup.js',
  snapshotSerializers: ['jest-serializer-html'],
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
