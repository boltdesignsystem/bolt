module.exports = {
  symlinkPrefix: 'bolt-',
  defaultPatternName: 'default',
  defaultPatternType: '00-bolt',
  defaultPatternSubtype: 'components',
  defaultTwigPath: 'src/twig',
  patternsFolder: '_patterns',
  packageFolders: [
    // `./node_modules/${npmNamespace}/${symlinkPrefix}*`,
    './packages/bolt-ui/**/*',
    './packages/bolt-core/**/*',
    '!./packages/**/node_modules/**/*',
    // './packages/elements-*',
    // './packages/objects-*',
    // './packages/settings-*',
    // './packages/components-*',
    // './packages/templates-*',
    // './packages/pages-*'
  ],
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md'
  ],
  extraWatches: [
    './packages/**/*.twig',
    './packages/**/*.json',
    './packages/**/*.md',
    './packages/**/*.yaml',
    './packages/**/*.yml'
  ]
};
