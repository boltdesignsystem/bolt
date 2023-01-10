import * as React from 'react';
import getIconClasses from '../lib';

function SvgMapPinSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 0C8.6 0 2.7 6 2.7 13.3c.1 2.6.8 5.1 2 7.3 1.2 2.1 2.6 4.1 4.3 5.8 1.9 2 4 3.8 6.2 5.3.5.3 1 .3 1.5 0 2.2-1.6 4.3-3.4 6.2-5.3 1.7-1.7 3.1-3.7 4.3-5.8 1.3-2.2 2-4.7 2-7.3C29.3 6 23.4 0 16 0zm0 18.7c-2.9 0-5.3-2.4-5.3-5.3S13.1 8 16 8s5.3 2.4 5.3 5.3-2.4 5.4-5.3 5.4z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgMapPinSolid;
