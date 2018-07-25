const {
  Lighten,
  Darken,
  TextContrast,
  CheckContrast,
  Rgba,
} = require('./BoltThemeUtils');

const { boltColors } = require('../settings-colors/index.js');

const ThemeDefaults = {
  primary: null,
  secondary: boltColors.white.base,
  // heading: boltColors.black.base,
  // text: TextContrast(this.background),
  border: Rgba(this.headline, 0.3),
  link: null,
};

// Setup default theming system values + self-referenced values
const BaseTheme = {
  get heading() {
    return TextContrast(this.background);
  },

  get text() {
    return TextContrast(this.background);
  },

  get border() {
    return Rgba(this.headline, 0.3);
  },

  get textOnPrimary() {
    return TextContrast(this.primary);
  },

  get primaryLight() {
    return Lighten(this.primary, 0.15);
  },
  get textOnPrimaryLight() {
    return TextContrast(this.primaryLight);
  },

  get primaryXlight() {
    return Lighten(this.primary, 0.25);
  },
  get textOnPrimaryXlight() {
    return TextContrast(this.primaryXlight);
  },

  get primaryDark() {
    return Darken(this.primary, 0.15);
  },
  get textOnPrimaryDark() {
    return TextContrast(this.primaryDark);
  },

  get primaryXdark() {
    return Darken(this.primary, 0.25);
  },
  get textOnPrimaryXdark() {
    return TextContrast(this.primaryXdark);
  },

  get textOnSecondary() {
    return TextContrast(this.secondary);
  },

  get secondaryDark() {
    return Darken(this.secondary, 0.05);
  },
  get textOnSecondaryDark() {
    return TextContrast(this.secondaryDark);
  },

  get secondaryXdark() {
    return Darken(this.secondary, 0.15);
  },

  get textOnSecondaryXdark() {
    return TextContrast(this.secondaryXdark);
  },

  get disabled() {
    return boltColors.gray.light;
  },
  get textOnDisabled() {
    return boltColors.gray.base;
  },
};

module.exports = {
  BaseTheme,
  ThemeDefaults,
};
