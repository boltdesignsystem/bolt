module.exports = {
  configFile: 'pattern-lab/config/config.yml',
  manifestFile: 'bolt-manifest.yml',
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md'
  ],
  extraWatches: [
    '!**/package.json',
    '!**/dist/**/*',
    './bolt-website/bolt-manifest.json'
    // 'packages/bolt-toolkit-*/**/*.twig'
  ]
};
