module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: require('@bolt/browserslist-config'),
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [['@babel/plugin-proposal-decorators', { version: 'legacy' }]],
};
