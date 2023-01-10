const breakpoints = {
  xxsmall: 320,
  xsmall: 400,
  small: 600,
  medium: 800,
  large: 1000,
  xlarge: 1200,
  xxlarge: 1400,
  xxxlarge: 1600,
  xxxxlarge: 1920,
};

const mq = (bp, max) => {
  if (!Object.keys(breakpoints).includes(bp)) return;
  if (max) {
    return `@media (max-width: ${breakpoints[bp] - 1}px)`;
  } else {
    return `@media (min-width: ${breakpoints[bp]}px)`;
  }
};

export default mq;
