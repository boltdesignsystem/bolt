const themes = require('./01-settings/settings-themes/_settings-themes');
const colors = require('./01-settings/settings-colors/_settings-colors');

module.exports = {
  'themes': themes,
  'colors': colors.boltColors,
  'status-colors': colors.boltStatusColors,
  'brand-colors': colors.boltBrandColors,
  'social-colors': colors.boltSocialColors,
}
