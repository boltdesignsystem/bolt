import * as React from 'react';
import getIconClasses from '../lib';

function SvgPresentation(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M28 4.4V21c0 .2-.2.4-.4.4H4.4c-.2-.1-.4-.2-.4-.4V4.4c0-.2.2-.4.4-.4h23.2c.2 0 .4.2.4.4m2.7-3.1H1.3C.6 1.3 0 1.9 0 2.7S.6 4 1.3 4v17.3c0 1.5 1.3 2.7 2.9 2.7h8.1l-2.8 4.7c-.2.3-.2.7-.1 1s.3.6.6.8c.6.4 1.4.1 1.8-.5l3.6-6h1.2l3.6 6c.2.4.7.6 1.2.6.2 0 .4-.1.7-.2.3-.2.5-.5.6-.8s0-.7-.1-1L19.7 24h8.1c1.6 0 2.9-1.2 2.9-2.7V4.1 4c.7 0 1.3-.6 1.3-1.3s-.6-1.4-1.3-1.4" />
        <path d="M25.3 6.7c-.4 0-.7.1-.9.4l-5.9 7.1L13 9.8h-.1c-.5-.5-1.3-.5-1.8 0l-5.4 5.4c-.5.5-.5 1.3 0 1.8.3.3.6.4.9.4s.7-.1.9-.4l4.5-4.5 5.6 4.5c.3.3.6.4.9.4.4 0 .7-.1 1-.5L26.2 9c.5-.5.5-1.4 0-1.9-.2-.3-.5-.4-.9-.4" />
      </g>
    </svg>
  );
}

export default SvgPresentation;
