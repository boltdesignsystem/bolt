import * as React from 'react';
import getIconClasses from '../lib';

function SvgLockSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M25.5 13.1h-.9V8.7c0-4.8-4-8.7-8.7-8.7S7.1 3.8 7.1 8.5v4.4h-.4c-1.6 0-2.9 1.3-2.9 2.9V29c0 1.6 1.3 2.9 2.9 2.9h18.6c1.6 0 2.9-1.3 2.9-2.9V15.9c.2-1.5-1.1-2.8-2.7-2.8zm-4.1 0H10.2V8.7c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgLockSolid;
