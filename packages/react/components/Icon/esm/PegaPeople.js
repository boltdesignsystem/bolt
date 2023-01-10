import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPeople(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M28.89 13.4a4.22 4.22 0 001.45-3.18 4.28 4.28 0 10-7.09 3.19 5.88 5.88 0 00-2.93 3.82 8.78 8.78 0 00-1.12-.64 5.46 5.46 0 10-6.49 0 7.5 7.5 0 00-1 .58 5.92 5.92 0 00-2.92-3.76 4.24 4.24 0 001.46-3.19 4.28 4.28 0 10-8.55 0 4.22 4.22 0 001.41 3.18A5.93 5.93 0 000 18.61v1.18a.91.91 0 101.81 0v-1.18a4.12 4.12 0 018.19-.48.79.79 0 00.14.37 7.66 7.66 0 00-1.91 5.06v1.59a.91.91 0 101.81 0v-1.59a5.89 5.89 0 0111.77 0v1.59a.91.91 0 101.81 0v-1.59a7.67 7.67 0 00-1.84-5 .93.93 0 00.16-.41 4.12 4.12 0 018.22.44v1.18a.91.91 0 101.81 0v-1.16a5.93 5.93 0 00-3.08-5.21zM3.47 10.22a2.47 2.47 0 112.46 2.46 2.47 2.47 0 01-2.46-2.46zm8.84 2A3.65 3.65 0 1116 15.87a3.65 3.65 0 01-3.69-3.65zm11.29-2a2.47 2.47 0 112.47 2.46 2.48 2.48 0 01-2.47-2.46z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaPeople;
