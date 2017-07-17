module.exports = {
  patternLab: {
    enabled: true,
    configFile: 'sandbox/pattern-library/config/config.yml',
    twigNamespaces: {
      addToDrupalThemeFile: true,
      sets: [
        {
          namespace: 'bolt',
          paths: ['node_modules/@bolt', 'packages/bolt-ui-toolkit'],
        },
        {
          namespace: 'atoms',
          paths: ['sandbox/pattern-library/source/_patterns/00-atoms'],
        }, {
          namespace: 'molecules',
          paths: ['sandbox/pattern-library/source/_patterns/01-molecules'],
        }, {
          namespace: 'organisms',
          paths: ['sandbox/pattern-library/source/_patterns/02-organisms'],
        }, {
          namespace: 'templates',
          paths: ['sandbox/pattern-library/source/_patterns/03-templates'],
        }, {
          namespace: 'pages',
          paths: ['sandbox/pattern-library/source/_patterns/04-pages'],
        },
      ],
    },
  }
};