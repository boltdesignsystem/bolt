const changeKeys = require('changecase-objects');

const { boltColors } = require('../settings-colors');
const { BaseTheme } = require('./BoltBaseTheme');
const { CreateTheme, ExportTheme } = require('./BoltTheme');

const {
  Lighten,
  Darken,
  TextContrast,
  CheckContrast,
} = require('./BoltThemeUtils');

// Theme default values (outside of what gets automatically calculated -- like text colors on these, etc)
const LightThemeDefaults = {
  background: boltColors.gray.xlight,
  primary: boltColors.indigo.light,
  secondary: boltColors.white.base,
  heading: boltColors.indigo.base,
  link: boltColors.indigo.light,
};

// Note xlight + xdark both automatically inherit the main light / dark theme values unless otherwise specified
const xLightThemeDefaults = Object.assign({}, LightThemeDefaults, {
  background: boltColors.white.base,
});

const DarkThemeDefaults = {
  background: boltColors.indigo.base,
  primary: boltColors.yellow.base,
  secondary: boltColors.white.base,
  link: boltColors.white.base,
};

const xDarkThemeDefaults = Object.assign({}, DarkThemeDefaults, {
  background: boltColors.indigo.xdark,
});

// Automatically merge together the default color values ^ with the self-referencing theme values coming from our BaseTheme.
const LightTheme = CreateTheme(LightThemeDefaults);
const xLightTheme = CreateTheme(xLightThemeDefaults);
const DarkTheme = CreateTheme(DarkThemeDefaults);
const xDarkTheme = CreateTheme(xDarkThemeDefaults);

const boltThemes = {
  xlight: ExportTheme(xLightTheme),
  light: ExportTheme(LightTheme),
  dark: ExportTheme(DarkTheme),
  xdark: ExportTheme(xDarkTheme),
};

module.exports = {
  boltThemes,
};
