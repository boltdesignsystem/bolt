import * as React from 'react';
import getIconClasses from '../lib';

function SvgPlatform(props) {
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
        d="M16 2L0 10l16 8 16-8zM4 9.8L16 4l12 5.8L16 16zM27.5 16L16 22 4.5 16H0l16 8 16-8zm0 6L16 28 4.5 22H0l16 8 16-8z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgPlatform;
