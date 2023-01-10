import * as React from 'react';
import getIconClasses from '../lib';

function SvgTruck(props) {
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
        d="M30 20l-.8-4H22v2.1c.3-.1.7-.1 1-.1 1.6 0 3.1.7 4 2zm-8-6h6.8l-.8-4h-6zm4 9c0-1.7-1.4-3-3-3-.8 0-1.5.3-2.1.9-1.3 1-1.6 2.9-.6 4.2s2.9 1.6 4.2.6l.6-.6c.6-.5.9-1.3.9-2.1zm-16 0c0-.8-.3-1.6-.9-2.1-1.1-1.2-2.9-1.2-4.1-.1l-.1.1C3.7 22 3.7 23.8 4.8 25l.1.1c1.1 1.2 2.9 1.2 4.1.1l.1-.1c.6-.5.9-1.3.9-2.1zm10-4V7c0-.3-.1-.5-.3-.7S19.3 6 19 6H3c-.3 0-.5.1-.7.3S2 6.7 2 7v12c0 .7.3 1 1 1 .9-1.3 2.4-2 4-2s3.1.7 4 2h8c.3-.4.6-.7 1-1zm12 2c0 .3-.1.5-.3.7s-.4.3-.7.3h-3.1c.1.3.1.7.1 1 0 1.3-.5 2.6-1.5 3.5-.9 1-2.2 1.5-3.5 1.5s-2.6-.5-3.5-1.5c-1-.9-1.5-2.2-1.5-3.5v-.2h-6v.2c0 1.3-.5 2.6-1.5 3.5-.9 1-2.2 1.5-3.5 1.5s-2.6-.5-3.5-1.5C2.5 25.6 2 24.3 2 23v-.2c-.5 0-1-.2-1.4-.6s-.6-.9-.6-1.5V6.1c0-.6.2-1.1.6-1.5S1.5 4 2 4h18c.5 0 1 .2 1.4.6s.6.9.6 1.5V8h7c.7 0 1 .3 1 1z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgTruck;
