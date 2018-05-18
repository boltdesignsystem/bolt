// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  testPathIgnorePatterns: [
    'sandbox',
    'brightcove-player.test.js',
    'apps/drupal-lab',
    'packages/themify',
  ],
  // Notify not working correctly; we want to only get a notification when tests fail, and then get ONE success notificaiton after it passes
  // notify: true,
  // notifyMode: 'failure-success',
};
