import * as React from 'react';
import getIconClasses from '../lib';

function SvgAdd(props) {
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
        d="M18 13.9V2.1C18 .9 17.1 0 16 0s-2 .9-2 2.1v11.8H2.9c-1.1 0-2 .9-2 2.1s.9 2.1 2 2.1H14v11.8c0 1.2.9 2.1 2 2.1s2-.9 2-2.1V18.1h11.1c1.1 0 2-.9 2-2.1s-.9-2.1-2-2.1z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgAdd;
