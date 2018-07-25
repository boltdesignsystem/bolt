const {
  boltColors,
  boltBrandColors,
  boltStatusColors,
  boltSocialColors,
  boltColorDefault,
} = require('./01-settings/settings-colors');
const { boltThemes } = require('./01-settings/settings-themes');

module.exports = {
  'bolt-brand-colors': boltBrandColors,
  'bolt-status-colors': boltStatusColors,
  'bolt-social-colors': boltSocialColors,
  'bolt-colors': boltColors,

  // base color value used by default globally
  'bolt-color-default': boltColorDefault,

  'bolt-themes': boltThemes,

  boltThemes,
  boltBrandColors,
  boltStatusColors,
  boltSocialColors,
  boltColors,
  boltColorDefault,
};
