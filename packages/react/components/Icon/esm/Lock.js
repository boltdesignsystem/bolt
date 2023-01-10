import * as React from 'react';
import getIconClasses from '../lib';

function SvgLock(props) {
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
        d="M27.6 27.6c0 .8-.7 1.5-1.5 1.5H5.8c-.8 0-1.5-.7-1.5-1.5V17.5c.1-.8.7-1.5 1.5-1.5h20.4c.8 0 1.5.7 1.5 1.5v10.1zM10.2 8.7c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8v4.4H10.2zm16 4.4h-1.5V8.7C24.7 3.9 20.8 0 16 0S7.3 3.9 7.3 8.7v4.4H5.8c-2.4 0-4.4 2-4.4 4.4v10.2c0 2.4 2 4.4 4.4 4.4h20.4c2.4 0 4.4-2 4.4-4.4V17.5c-.1-2.5-2-4.4-4.4-4.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgLock;
