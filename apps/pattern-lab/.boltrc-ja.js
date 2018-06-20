const config = require('./.boltrc');
const deepmerge = require('deepmerge');

const configJa = {
  lang: 'ja',
  globalData: {
    'scss': [
      './settings.lang-ja.scss',
    ],
  },
}
const mergedConfig = deepmerge(config, configJa);

module.exports = mergedConfig;
