// Build a separate directory for japanese assets
const config = require('./.boltrc.js');
config.buildDir = './dist--ja/';
config.dataDir = './dist--ja/data';
config.wwwDir = './dist--ja';
config.publicPath = '/themes/custom/pegawww_theme/dist--ja/';

module.exports = config;
