// Older method for generating a Japanese language-specific version of the build
const config = require('./.boltrc.js');
const updatedConfig = Object.assign(config, {
  lang: 'ja',
  buildDir: './dist--ja',
  dataDir: './dist--ja/data',
  wwwDir: './dist--ja',
  publicPath: '/themes/bolt-starter/dist--ja/',
  globalData: {
    scss: [
      './fix-missing-ja-spacing-value.patch.scss', // @todo: remove after Bolt hotfix for JA spacing scale released
    ],
  },
});

module.exports = updatedConfig;
