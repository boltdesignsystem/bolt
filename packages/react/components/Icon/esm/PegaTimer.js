import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaTimer(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M21.43 11.19l-5.34 5.48-3-3.35a.93.93 0 10-1.39 1.25L14.78 18l-.55.57a.94.94 0 00.67 1.6.93.93 0 00.67-.29l.47-.48.41.46a1 1 0 00.7.31.92.92 0 00.63-.25.94.94 0 00.07-1.32l-.5-.55 5.42-5.57a.94.94 0 00-1.34-1.31z" />
        <path d="M25.41 8.91l1.05-1.37a1 1 0 00.19-.71.93.93 0 00-.38-.62L25 5.29a.93.93 0 00-1.29.18l-1 1.28a12.86 12.86 0 00-5.8-1.87v-2h2.19a.94.94 0 100-1.87h-6.23a.94.94 0 100 1.87h2.19v2A13.07 13.07 0 1029 17.92a13.13 13.13 0 00-3.59-9.01zM16 29.13a11.21 11.21 0 1111.12-11.21A11.18 11.18 0 0116 29.13z" />
      </g>
    </svg>
  );
}

export default SvgPegaTimer;
