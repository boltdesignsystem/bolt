const buildIns = [
  {
    value: 'none',
    name: 'None',
  },
  {
    value: 'fade-in',
    name: 'Fade In',
  },
  {
    value: 'fade-in-slide-up',
    name: 'Fade In, Slide Up',
  },
  {
    value: 'fade-in-slide-down',
    name: 'Fade In, Slide Down',
  },
  {
    value: 'fade-in-slide-left',
    name: 'Fade In, Slide Left',
  },
  {
    value: 'fade-in-slide-right',
    name: 'Fade In, Slide Right',
  },
];

const idles = [
  {
    value: 'pulse',
    name: 'Pulse',
  },
  {
    value: 'spin',
    name: 'Spin',
  },
  {
    value: 'heart-beat',
    name: 'Heart Beat',
  },
];

const buildOuts = [
  {
    value: 'fade-out',
    name: 'Fade Out',
  },
  {
    value: 'fade-out-slide-up',
    name: 'Fade Out, Slide Up',
  },
  {
    value: 'fade-out-slide-down',
    name: 'Fade Out, Slide Down',
  },
  {
    value: 'fade-out-slide-left',
    name: 'Fade Out, Slide Left',
  },
  {
    value: 'fade-out-slide-right',
    name: 'Fade Out, Slide Right',
  },
];

const easings = [
  {
    value: 'ease',
    name: 'Ease',
  },
  {
    value: 'ease-in',
    name: 'Ease In',
  },
  {
    value: 'ease-out',
    name: 'Ease Out',
  },
  {
    value: 'ease-in-out',
    name: 'Ease In Out',
  },
  {
    value: 'linear',
    name: 'Linear',
  },
];

const animationNames = {
  buildIns,
  idles,
  buildOuts,
};

module.exports = {
  animationNames,
  easings,
};
