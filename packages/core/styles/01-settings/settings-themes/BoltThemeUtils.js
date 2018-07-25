const hexToRgba = require('hex-to-rgba');
const Color = require('color');
const { boltColors } = require('../settings-colors');

// console.log(boltColors);

function Lighten(color, amount) {
  return Color(color)
    .lighten(amount)
    .hex();
}

function Darken(color, amount) {
  return Color(color)
    .darken(amount)
    .hex();
}

function TextContrast(
  container,
  darkColor = boltColors.black.base,
  lightColor = boltColors.white.base,
) {
  const containerColor = Color(container);

  if (containerColor.isLight()) {
    return Color(darkColor).hex();
  } else {
    return Color(lightColor).hex();
  }
}

function CheckContrast(color) {
  if (Color(color).isLight()) {
    return 'dark';
  } else {
    return 'light';
  }
}

function Rgba(color, percent) {
  const originalColor = Color(color).hex();
  return hexToRgba(originalColor, percent);
}

module.exports = {
  Lighten,
  Darken,
  TextContrast,
  CheckContrast,
  Rgba,
};
