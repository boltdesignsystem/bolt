import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaDisability(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M23.61 24.49A10.71 10.71 0 119.37 9.13a.94.94 0 10-1-1.61A12.63 12.63 0 0014.81 31a12.58 12.58 0 0010.35-5.45.94.94 0 00-1.55-1.06z" />
        <path d="M29.48 21.1a.94.94 0 00-1.33 0l-1 1-4.37-4.39a.91.91 0 00-.66-.28h-6.37v-4.5h6.07a.94.94 0 000-1.88h-6.07V8.87a4 4 0 10-1.87 0v9.51a.94.94 0 00.93.94h6.92l4.76 4.78a.93.93 0 001.33 0l1.66-1.67a.94.94 0 000-1.33zM12.7 5a2.11 2.11 0 112.11 2.12A2.13 2.13 0 0112.7 5z" />
      </g>
    </svg>
  );
}

export default SvgPegaDisability;
