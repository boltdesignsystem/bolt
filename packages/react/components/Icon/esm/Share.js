import * as React from 'react';
import getIconClasses from '../lib';

function SvgShare(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M24.5 19.2c-2 0-3.9 1-5.1 2.6l-5.7-3.3c.1-.5.2-.9.2-1.4 0-.6-.1-1.3-.3-1.9l6.8-4c1.1 1 2.6 1.6 4.1 1.6 3.5 0 6.4-2.9 6.4-6.4S28.1 0 24.5 0s-6.4 2.9-6.4 6.4c0 .4 0 .8.1 1.2L11 11.7c-2.9-2-6.9-1.1-8.9 1.8S1 20.4 3.9 22.4c1 .7 2.3 1.1 3.5 1.1 1.4 0 2.8-.5 4-1.4l6.7 3.9c.2 3.5 3.2 6.2 6.8 6s6.2-3.2 6-6.8c-.2-3.3-3-6-6.4-6zm0-14.9c1.2 0 2.1 1 2.1 2.1s-1 2.1-2.1 2.1c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1zm-17 14.9c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-1 2.1-2.1 2.1zm17 8.5c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1.1 1.2-.9 2.1-2.1 2.1z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgShare;
