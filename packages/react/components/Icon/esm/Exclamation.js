import * as React from 'react';
import getIconClasses from '../lib';

function SvgExclamation(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M14.3 23.5l-1.5-16V0h6.4v7.4l-1.5 16h-3.4zM16 32c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2S17.8 32 16 32z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgExclamation;
