import * as React from 'react';
import getIconClasses from '../lib';

function SvgMolecule(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M29 12.5L25.8 7 29 1.5c.3-.5.1-1.1-.3-1.3-.3-.2-.6-.2-.8-.2-.2.1-.5.2-.6.5L24.1 6h-5.8L15.1.5c-.3-.4-.9-.6-1.3-.4-.2.1-.4.3-.4.6-.1.2 0 .5.1.7L16.6 7l-2.9 5H7.9L4.7 6.5c-.2-.2-.4-.4-.6-.4-.3-.1-.5-.1-.8 0-.4.3-.6.9-.3 1.4L6.2 13 3 18.5c-.2.3-.2.7 0 1L6.2 25 3 30.6c-.3.5-.1 1.1.3 1.3.5.2 1 .1 1.3-.4L7.9 26h5.8l3.2 5.5.3.3c.1.1.2.1.3.1h.4c.1 0 .2-.1.3-.1.2-.1.4-.3.5-.6s0-.5-.1-.7L15.4 25l2.9-5.1h5.8l3.2 5.6c.2.5.8.7 1.3.5s.7-.8.5-1.3c0-.1-.1-.1-.1-.1L25.8 19l3.2-5.5c.1-.3.1-.7 0-1zM16.6 19l-2.9 5.1H7.9l-3-5.1 2.9-5.1h5.8zM27 13l-2.9 5.1h-5.8l-2.9-5L18.3 8h5.8z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgMolecule;
