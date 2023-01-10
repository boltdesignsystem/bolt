import * as React from 'react';
import getIconClasses from '../lib';

function SvgCheckCircle(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 29.1C8.8 29.1 2.9 23.2 2.9 16S8.8 2.9 16 2.9 29.1 8.8 29.1 16 23.2 29.1 16 29.1z" />
        <path d="M21.5 10l-8 7.9-3.1-3c-.5-.5-1.3-.5-1.8 0s-.5 1.3 0 1.8l4 4c.3.3.7.3 1 .3s.6-.1.8-.3l9-9c.2-.2.4-.6.4-.9s-.1-.7-.4-1c-.6-.2-1.4-.2-1.9.2z" />
      </g>
    </svg>
  );
}

export default SvgCheckCircle;
