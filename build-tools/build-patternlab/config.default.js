module.exports = {
  configFile: 'pattern-lab/config/config.yml',
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md'
  ],
  extraWatches: [
    '!**/package.json'
    // 'packages/bolt-toolkit-*/**/*.twig'
  ]
};
