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
    '!**/package.json',
    './bolt-website/bolt-manifest.json'
    // 'packages/bolt-toolkit-*/**/*.twig'
  ]
};
