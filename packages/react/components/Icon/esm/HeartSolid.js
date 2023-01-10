import * as React from 'react';
import getIconClasses from '../lib';

function SvgHeartSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 30.7l-2.3-2.1C5.4 21.1 0 16.2 0 10.1c0-4.9 3.9-8.8 8.8-8.8 2.8 0 5.5 1.3 7.2 3.3 1.7-2 4.4-3.3 7.2-3.3 4.9 0 8.8 3.9 8.8 8.8 0 6-5.4 11-13.7 18.5z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgHeartSolid;
