import * as React from 'react';
import getIconClasses from '../lib';

function SvgEye(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M25.8 20.5c-3 3.2-6.3 4.9-9.8 4.9s-6.8-1.6-9.8-4.9c-1.7-1.8-2.8-3.6-3.3-4.5.5-.9 1.7-2.7 3.3-4.5 3-3.2 6.3-4.9 9.8-4.9s6.8 1.6 9.8 4.9c1.7 1.8 2.8 3.6 3.3 4.5-.5.9-1.6 2.7-3.3 4.5m6.1-5.1c-.1-.1-1.4-2.9-4-5.6C24.3 6 20.2 4 16 4S7.7 6 4.2 9.8c-2.6 2.8-4 5.5-4 5.6-.2.4-.2.8 0 1.2.1.1 1.4 2.9 4 5.6C7.7 26 11.8 28 16 28s8.3-2 11.8-5.8c2.6-2.8 4-5.5 4-5.6.2-.4.2-.8.1-1.2" />
        <path d="M16 18.7c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7m0-8c-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3 5.3-2.4 5.3-5.3-2.4-5.3-5.3-5.3" />
      </g>
    </svg>
  );
}

export default SvgEye;
