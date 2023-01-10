import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPatterns(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M31.73 8a.89.89 0 000-1.28L25.31.29a.93.93 0 00-1.31 0l-6.13 6.16h-4.34a6.8 6.8 0 10-7.64 7.64v4.28h-5a.9.9 0 00-.91.9v11.79a.91.91 0 00.93.94h11.78a.91.91 0 00.91-.91V19.27a.9.9 0 00-.91-.9h-5v-4.28a6.81 6.81 0 005.82-5.83h4.34l5.89 5.89v4.28a6.8 6.8 0 101.82 0v-4.28zM11.79 30.16h-10v-10h10zm-5-17.82a5 5 0 115-5 5 5 0 01-4.99 5zM24.67 2.21l5.15 5.14-5.15 5.15-5.15-5.15zm5 23a5 5 0 11-5.07-5h.16a5 5 0 014.9 4.96z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaPatterns;
