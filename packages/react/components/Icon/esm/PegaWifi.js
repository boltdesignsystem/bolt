import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaWifi(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 22.34A2.68 2.68 0 1018.69 25 2.68 2.68 0 0016 22.34zM9.53 18.58a.93.93 0 000 1.32.94.94 0 001.33 0 7.3 7.3 0 0110.29 0 .93.93 0 00.66.27.9.9 0 00.66-.28.92.92 0 000-1.32 9.19 9.19 0 00-12.94.01z" />
        <path d="M5.4 14.47a.93.93 0 000 1.32.9.9 0 00.66.28.93.93 0 00.66-.27 13.18 13.18 0 0118.55 0 .94.94 0 101.33-1.33 15.07 15.07 0 00-21.2 0z" />
        <path d="M30.73 10.36a20.94 20.94 0 00-29.46 0 .94.94 0 000 1.33.92.92 0 001.32 0 19.07 19.07 0 0126.82 0 .94.94 0 001.32 0 .94.94 0 000-1.33z" />
      </g>
    </svg>
  );
}

export default SvgPegaWifi;
