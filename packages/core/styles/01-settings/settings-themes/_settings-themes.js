const colors = require('../settings-colors/_settings-colors').boltColors;
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const chromatism = require('chromatism');

const config = getConfig();


const lightTheme = {
  'background-light': `${chromatism.convert(colors['white']).hex}`,
  'background': `${chromatism.convert(colors['gray-xlight']).hex}`,
  'background-dark': `${chromatism.convert(colors['gray-light']).hex}`,

  'primary-xlight': `${chromatism.convert(colors['gray-xlight']).hex}`,
  'primary-light': `${chromatism.convert(colors['gray-light']).hex}`,
  'primary': `${chromatism.convert(colors['gray']).hex}`,
  'primary-dark': `${chromatism.convert(colors['gray-dark']).hex}`,
  'primary-xdark': `${chromatism.convert(colors['gray-xdark']).hex}`,

  'accent-xlight': `${chromatism.convert(colors['indigo-xlight']).hex}`,
  'accent-light': `${chromatism.convert(colors['indigo-light']).hex}`,
  'accent': `${chromatism.convert(colors['indigo']).hex}`,
  'accent-dark': `${chromatism.convert(colors['indigo-dark']).hex}`,
  'accent-xdark': `${chromatism.convert(colors['indigo-xdark']).hex}`,

  'text': `${chromatism.convert(colors['black']).hex}`,
  'border': `${chromatism.convert(colors['indigo']).hex}`,

  'secondary': `${chromatism.convert(colors['white']).hex}`,

  'heading': `${chromatism.convert(colors['indigo']).hex}`,
  'heading-link': `${chromatism.convert(colors['indigo-light']).hex}`,
  'link': `${chromatism.convert(colors['indigo-light']).hex}`,

  // 'contrast-filter': 'none',
};

const darkTheme = {
  'background-dark': `${chromatism.convert(colors['indigo-dark']).hex}`,
  'background': `${chromatism.convert(colors['indigo']).hex}`,
  'background-light': `${chromatism.convert(colors['indigo-light']).hex}`,

  'primary-xlight': `${chromatism.convert(colors['indigo-xlight']).hex}`,
  'primary-light': `${chromatism.convert(colors['indigo-light']).hex}`,
  'primary': `${chromatism.convert(colors['indigo']).hex}`,
  'primary-dark': `${chromatism.convert(colors['indigo-dark']).hex}`,
  'primary-xdark': `${chromatism.convert(colors['indigo-xdark']).hex}`,

  'accent-xlight': `${chromatism.convert(colors['yellow-xlight']).hex}`,
  'accent-light': `${chromatism.convert(colors['yellow-light']).hex}`,
  'accent': `${chromatism.convert(colors['yellow']).hex}`,
  'accent-dark': `${chromatism.convert(colors['yellow-dark']).hex}`,
  'accent-xdark': `${chromatism.convert(colors['yellow-xdark']).hex}`,

  'text': `${chromatism.convert(colors['white']).hex}`,
  'border': `${chromatism.convert(colors['white']).hex}`,

  'secondary': `${chromatism.convert(colors['white']).hex}`,
  'heading': `${chromatism.convert(colors['white']).hex}`,

  'heading-link': `${chromatism.convert(colors['white']).hex}`,
  'link': `${chromatism.convert(colors['yellow']).hex}`,

  // 'contrast-filter': 'grayscale(100%) invert(100%) brightness(150%)',
};

const xLightTheme = Object.assign({}, lightTheme, {
  'background-light': `${chromatism.convert(colors['white']).hex}`,
  'background': `${chromatism.convert(colors['white']).hex}`,
  'background-dark': `${chromatism.convert(colors['gray-xlight']).hex}`,
});

const xDarkTheme = Object.assign({}, darkTheme, {
  'background-dark': `${chromatism.convert(colors['indigo-xdark']).hex}`,
  'background': `${chromatism.convert(colors['indigo-dark']).hex}`,
  'background-light': `${chromatism.convert(colors['indigo']).hex}`,
});

const themes = {
  palette : {
    xlight: xLightTheme,
    light: lightTheme,
    dark: darkTheme,
    xdark: xDarkTheme,
  },
};

module.exports = themes;
