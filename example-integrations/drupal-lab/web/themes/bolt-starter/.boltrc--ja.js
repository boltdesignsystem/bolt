// Older method for generating a Japanese language-specific version of the build
const config = require('./.boltrc.js');
const updatedConfig =  Object.assign(config, {
  lang: 'ja',
  buildDir: './dist--ja',
  dataDir: './dist--ja/data',
  wwwDir: './dist--ja',
  publicPath: '/themes/bolt-starter/dist--ja/',
});

module.exports = updatedConfig;
