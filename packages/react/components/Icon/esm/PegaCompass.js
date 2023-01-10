import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaCompass(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 1.11A14.89 14.89 0 1031 16 15 15 0 0016 1.11zM16 29a13 13 0 1113.13-13A13.09 13.09 0 0116 29z" />
        <path d="M22.15 8.57l-9.23 3.81a1 1 0 00-.56.55l-3.85 9.15a1 1 0 00.21 1.13 1 1 0 00.73.3.92.92 0 00.4-.08l9.23-3.8a1 1 0 00.56-.56l3.86-9.15a1 1 0 00-1.35-1.35zm-4.24 9.31l-3.8-3.77 6.53-2.69z" />
      </g>
    </svg>
  );
}

export default SvgPegaCompass;
