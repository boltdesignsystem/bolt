// ------------------------------------
// SETTINGS - COLORS
// ------------------------------------

const boltColorDefault = 'base';

const boltBrandColors = {
  indigo: {
    xdark: 'hsl(233, 71%, 8%)',
    dark: 'hsl(233, 47%, 16%)',
    base: 'hsl(233, 47%, 23%)',
    light: 'hsl(233, 33%, 49%)',
    xlight: 'hsl(233, 73%, 81%)',
  },
  yellow: {
    xdark: 'hsl(43, 100%, 20%)',
    dark: 'hsl(43, 82%, 50%)',
    base: 'hsl(43, 100%, 65%)',
    light: 'hsl(43, 100%, 80%)',
    xlight: 'hsl(43, 100%, 90%)',
  },

  teal: {
    xdark: 'hsl(180, 100%, 10%)',
    dark: 'hsl(180, 82%, 22%)',
    base: 'hsl(180, 100%, 30%)',
    light: 'hsl(180, 45%, 64%)',
    xlight: 'hsl(180, 48%, 81%)',
  },

  orange: {
    xdark: 'hsl(15, 100%, 20%)',
    dark: 'hsl(15, 82%, 39%)',
    base: 'hsl(15, 82%, 50%)',
    light: 'hsl(15, 100%, 70%)',
    xlight: 'hsl(15, 100%, 85%)',
  },

  gray: {
    xdark: 'hsl(233, 6%, 19%)',
    dark: 'hsl(233, 5.3%, 38%)',
    base: 'hsl(233, 5.7%, 57.6%)',
    light: 'hsl(233, 20%, 90%)',
    xlight: 'hsl(233, 23%, 97%)',
  },

  black: {
    base: 'hsl(225, 8%, 9%)',
  },

  white: {
    base: 'hsl(0, 0%, 100%)',
  },
};

const boltStatusColors = {
  blue: {
    dark: 'hsl(201, 100%, 25%)',
    base: 'hsl(201, 100%, 35%)',
    light: 'hsl(201, 100%, 92%)',
  },

  success: {
    dark: 'rgb(37, 41%, 25%)',
    base: 'hsl(123, 41%, 35%)',
    light: 'hsl(123, 41%, 90%)',
  },

  error: {
    dark: 'hsl(6, 76%, 35%)',
    base: 'hsl(6, 76%, 40%)',
    light: 'hsl(6, 80%, 90%)',
  },

  warning: {
    dark: 'hsl(51, 80%, 45%)',
    base: 'hsl(51, 80%, 55%)',
    light: 'hsl(51, 80%, 90%)',
  },
};

var boltSocialColors = {
  social: {
    facebook: 'hsl(222, 46%, 42%)',
    twitter: 'hsl(196, 100%, 46%)',
    linkedin: 'hsl(201, 96%, 36%)',
  },
};

const boltColors = Object.assign(
  {},
  boltBrandColors,
  boltStatusColors,
  boltSocialColors,
);

module.exports = {
  boltBrandColors,
  boltStatusColors,
  boltSocialColors,
  boltColors,
  boltColorDefault,
};
