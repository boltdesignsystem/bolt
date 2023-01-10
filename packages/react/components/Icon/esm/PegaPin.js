import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPin(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M24.4 17.7l-2.2-4-.7-8.3 2.2-3.9c.2-.3.2-.7 0-1-.3-.3-.6-.5-1-.5H9.3c-.4 0-.7.2-.9.5s-.2.7 0 1l2.2 3.9-.8 8.3-2.3 4c-.3.5-.1 1.1.4 1.4.1.1.3.1.4.1H15V31c0 .6.5 1 1 1 .6 0 1-.5 1-1V19.2h6.5c.6 0 1-.5 1-1.1 0-.1 0-.3-.1-.4zm-14.1-.5l1.5-2.7c.1-.1.1-.3.1-.4l.8-8.9c0-.2 0-.4-.1-.5L11 2h10l-1.5 2.7c-.1.2-.2.4-.1.6l.8 8.8c0 .1.1.3.1.4l1.5 2.7z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaPin;
