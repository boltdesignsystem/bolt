import * as React from 'react';
import getIconClasses from '../lib';

function SvgArrowLeft(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M.1 16.7c0-.2-.1-.4-.1-.6v-.2c0-.2.1-.4.1-.6.1-.2.2-.3.3-.5l.1-.1L11.2 4.1c.7-.7 1.8-.7 2.5 0s.7 1.8 0 2.5l-7.6 7.6h24.2c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8H6l7.6 7.6c.7.7.7 1.8 0 2.5-.3.3-.8.5-1.3.5s-.9-.2-1.3-.5L.5 17.3l-.1-.1c-.1-.2-.2-.4-.3-.5z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgArrowLeft;
