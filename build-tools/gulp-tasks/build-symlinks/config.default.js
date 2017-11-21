module.exports = {
  symlinkPrefix: 'bolt-',
  defaultPatternName: 'default',
  defaultPatternType: '00-bolt',
  defaultPatternSubtype: 'components',
  defaultTwigPath: '',
  patternsFolder: '_patterns',
  packageFolders: [
    // `./node_modules/${npmNamespace}/${symlinkPrefix}*`,
    'src/**/*',
    'build-tools/**/*',
    'packages/**/*',
    '!src/**/node_modules/**/*',
    '!build-tools/**/node_modules/**/*',
    '!packages/**/node_modules/**/*',
    // '!./src/_twig-components/**/*',
    // '!./src/**/node_modules/**/*',
    // './packages/bolt-toolkit-core/**/*',
    // './packages/bolt-toolkit-ui/**/*',
    // './packages/bolt-toolkit-ui/components/*',
    // '!./packages/**/node_modules/**/*',
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
  ]
};
