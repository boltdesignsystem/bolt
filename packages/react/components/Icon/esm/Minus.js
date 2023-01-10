import * as React from 'react';
import getIconClasses from '../lib';

function SvgMinus(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        clipRule="evenodd"
        d="M2.9 13.9c-1.1 0-2 .9-2 2.1s.9 2.1 2 2.1h26.2c1.1 0 2-.9 2-2.1s-.9-2.1-2-2.1z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgMinus;
