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
  ],
  patternLab: {
    enabled: true,
    configFile: '.pattern-lab/config/config.yml',
    twigNamespaces: {
      addToDrupalThemeFile: true,
      sets: [
        {
          namespace: 'bolt',
          paths: [
            '.pattern-lab/source/_patterns'
          ]
        }
      ]
    },
  },
  browserSync: {
    enabled: true,
    serverName: 'bolt-server'
  }
};
