import * as React from 'react';
import getIconClasses from '../lib';

function SvgEyeOff(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M13.5 6.9c.8-.2 1.6-.3 2.5-.3 3.5 0 6.8 1.6 9.8 4.9 1.7 1.8 2.8 3.6 3.3 4.5-.7 1.2-1.5 2.4-2.4 3.4-.5.6-.4 1.4.2 1.9.3.2.6.3.9.3.4 0 .8-.2 1-.5 1.2-1.4 2.2-2.9 3.1-4.5.2-.4.2-.8 0-1.2-.1-.1-1.4-2.9-4-5.6C24.3 6 20.2 4 16 4c-1.1 0-2.1.1-3.1.4-.7.2-1.2.9-1 1.6s.9 1.1 1.6.9zM16 25.3c-3.5 0-6.8-1.6-9.8-4.9-1.7-1.8-2.8-3.6-3.3-4.5 1.3-2.3 3.1-4.3 5.1-6l3.4 3.4c-.5.8-.8 1.8-.8 2.8 0 2.9 2.4 5.3 5.3 5.3 1 0 2-.3 2.8-.8l3.1 3.1c-1.7 1-3.7 1.6-5.8 1.6zm-2.6-10l3.4 3.4c-.3.1-.5.1-.8.1-1.5 0-2.7-1.2-2.7-2.7-.1-.3 0-.6.1-.8zm17.5 13.8l-6-6.1-22-21.9C2.4.6 1.5.6 1 1.1S.5 2.5 1 3l5 5c-2.4 2.1-4.4 4.5-5.9 7.4-.2.4-.2.8 0 1.2.1.1 1.4 2.9 4.1 5.6C7.7 26 11.8 28 16 28c2.8 0 5.4-.8 7.7-2.3L29 31c.3.3.6.4.9.4s.7-.1.9-.4c.7-.6.7-1.4.1-1.9z" />
      </g>
    </svg>
  );
}

export default SvgEyeOff;
