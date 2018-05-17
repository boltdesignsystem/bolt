/* ------------------------------------ *\
  SETTINGS - COLORS
\* ------------------------------------ */

// $bolt-color-default: 'base';

const boltBrandColors = {
  'indigo-xdark':   'hsl(233, 71%, 8%)',
  'indigo-dark':    'hsl(233, 47%, 16%)',
  'indigo': 'hsl(233, 47%, 23%)',
  'indigo-light':   'hsl(233, 33%, 49%)',
  'indigo-xlight':  'hsl(233, 73%, 81%)',

  'yellow-xdark':   'hsl(43, 100%, 20%)',
  'yellow-dark':    'hsl(43, 82%, 50%)',
  'yellow': 'hsl(43, 100%, 65%)',
  'yellow-light':   'hsl(43, 100%, 80%)',
  'yellow-xlight':  'hsl(43, 100%, 90%)',

  'teal-xdark':   'hsl(180, 100%, 10%)',
  'teal-dark': 'hsl(180, 82%, 22%)',
  'teal': 'hsl(180, 100%, 30%)',
  'teal-light': 'hsl(180, 45%, 64%)',
  'teal-xlight': 'hsl(180, 48%, 81%)',

  'orange-xdark': 'hsl(15, 100%, 20%)',
  'orange-dark': 'hsl(15, 82%, 39%)',
  'orange': 'hsl(15, 82%, 50%)',
  'orange-light': 'hsl(15, 100%, 70%)',
  'orange-xlight': 'hsl(15, 100%, 85%)',

  'gray-xdark': 'hsl(233, 6%, 19%)',
  'gray-dark': 'hsl(233, 5.3%, 38%)',
  'gray': 'hsl(233, 5.7%, 57.6%)',
  'gray-light': 'hsl(233, 20%, 90%)',
  'gray-xlight': 'hsl(233, 23%, 97%)',

  'black': 'hsl(225, 8%, 9%)',
  'white': 'hsl(0, 0%, 100%)',
};


const boltStatusColors = {
  'blue-dark': 'hsl(201, 100%, 25%)',
  'blue': 'hsl(201, 100%, 35%)',
  'blue-light': 'hsl(201, 100%, 92%)',

  'success-dark': 'rgb(37, 41%, 25%)',
  'success': 'hsl(123, 41%, 35%)',
  'success-light': 'hsl(123, 41%, 90%)',

  'error-dark': 'hsl(6, 76%, 35%)',
  'error': 'hsl(6, 76%, 40%)',
  'error-light': 'hsl(6, 80%, 90%)',

  'warning-dark': 'hsl(51, 80%, 45%)',
  'warning': 'hsl(51, 80%, 55%)',
  'warning-light': 'hsl(51, 80%, 90%)',
};


const boltSocialColors = {
  'facebook': 'hsl(222, 46%, 42%)',
  'twitter': 'hsl(196, 100%, 46%)',
  'linkedin': 'hsl(201, 96%, 36%)',
};

const boltColors = Object.assign(boltBrandColors, boltStatusColors, boltSocialColors);

module.exports = {
  boltColors,
  boltBrandColors,
  boltStatusColors,
  boltSocialColors,
};

// $bolt-brand-colors: (

// );








// $bolt-colors: map-merge(map-merge($bolt-brand-colors, $bolt-status-colors), $bolt-social-colors);

// @include export-data('colors/all.bolt.json', $bolt-colors);
// @include export-data('colors/status.bolt.json', $bolt-status-colors);
// @include export-data('colors/brand.bolt.json', $bolt-brand-colors);
// @include export-data('colors/social.bolt.json', $bolt-social-colors);

