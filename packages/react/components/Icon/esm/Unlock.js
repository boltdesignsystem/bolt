import * as React from 'react';
import getIconClasses from '../lib';

function SvgUnlock(props) {
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
        d="M27.6 27.6c0 .8-.7 1.5-1.5 1.5H5.8c-.8 0-1.5-.7-1.5-1.5V17.5c.1-.8.7-1.5 1.5-1.5h20.4c.8 0 1.5.7 1.5 1.5v10.1zm-1.4-14.5h-16V8.7c0-3.2 2.6-5.8 5.8-5.8 2.7 0 5.1 1.9 5.7 4.6.2.8.9 1.3 1.7 1.1s1.3-.9 1.1-1.7C23.7 2.9 20.1 0 16 0c-4.8 0-8.7 3.9-8.7 8.7v4.4H5.8c-2.4 0-4.4 2-4.4 4.4v10.2c0 2.4 2 4.4 4.4 4.4h20.4c2.4 0 4.4-2 4.4-4.4V17.5c-.1-2.4-2-4.4-4.4-4.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgUnlock;
