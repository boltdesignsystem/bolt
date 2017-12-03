module.exports = {
  symlinkPrefix: 'bolt-',
  defaultPatternName: 'default',
  defaultPatternType: '00-bolt',
  defaultPatternSubtype: 'components',
  defaultTwigPath: '',
  patternsFolder: '_patterns',
  packageFolders: [
    'src/**/*',
    '!src/**/node_modules/**/*',
    'build-tools/**/*',
    '!build-tools/**/node_modules/**/*',
    'packages/**/*',
    '!packages/**/node_modules/**/*'
  ],
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md'
  ]
};
