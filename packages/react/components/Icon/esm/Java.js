import * as React from 'react';
import getIconClasses from '../lib';

function SvgJava(props) {
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
        d="M23.5 24.6c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l6.8-6.8-6.8-6.8c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l.2.2 7.5 7.5c.4.4.4 1 0 1.4l-7.5 7.5c-.2.2-.4.3-.7.3zm-15 0c-.3 0-.5-.1-.7-.3L.3 16.8c-.4-.4-.4-1 0-1.4l7.5-7.5c.3-.4 1-.5 1.4-.2s.5 1 .2 1.4c-.1.1-.1.2-.2.2l-6.8 6.8 6.8 6.8c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3zm2.3 3.5c-.1 0-.3 0-.4-.1-.5-.2-.7-.8-.5-1.3L20.2 4.3c.3-.5.9-.6 1.4-.3.3.2.5.7.4 1.1L11.7 27.5c-.1.4-.5.7-.9.6z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgJava;
