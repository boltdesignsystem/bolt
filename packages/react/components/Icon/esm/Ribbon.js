import * as React from 'react';
import getIconClasses from '../lib';

function SvgRibbon(props) {
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
        d="M25.3 24.3c-.5-.1-1 .2-1.2.6l-1.3 3.5-2.8-5.1c2.3-.8 4.3-2.3 5.7-4.3l3.4 6.2zM16 22c-5.5 0-9.9-4.4-9.9-9.9s4.4-9.9 9.9-9.9 9.9 4.4 9.9 9.9S21.5 22 16 22zm-6.9 6.4l-1.3-3.5c-.2-.5-.7-.8-1.2-.6l-3.6.8L6.4 19c1.4 1.9 3.3 3.4 5.6 4.2zm22.7-2.3l-5-9.2c.7-1.6 1.1-3.3 1.1-5C27.9 5.3 22.6 0 16 0 9.4.1 4.1 5.4 4.1 12c0 1.7.4 3.5 1.1 5.1l-5 9.1c-.2.3-.1.7.1 1s.6.5 1 .4l5-1.1L8 31.3c.1.4.4.7.8.7h.1c.4 0 .7-.2.9-.5l4.1-7.7c.7.2 1.4.2 2.1.2s1.3-.1 2-.2l4.2 7.7c.2.3.5.5.9.5h.1c.4 0 .8-.3.9-.7l1.7-4.8 5 1.1c.4.1.8-.1 1-.4.1-.3.2-.7 0-1.1z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgRibbon;
