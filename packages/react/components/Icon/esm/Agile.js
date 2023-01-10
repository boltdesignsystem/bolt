import * as React from 'react';
import getIconClasses from '../lib';

function SvgAgile(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M7.4 25.1H1c-.6 0-1 .4-1 1s.4 1 1 1h6.4c.6 0 1-.4 1-1s-.4-1-1-1zM31.9 26c-.1-.2-.1-.2-.2-.3l-.6-.7-1.9-1.9-2.2-2.2c-.4-.3-.8-.3-1.2 0s-.5 1-.2 1.4l.7.7 2 2 .3.3h-11c-3 0-6-1.2-8.1-3.4-.3-.4-.6-.7-.9-1.1-1.6-2-2.4-4.5-2.4-7.1 0-1.5.3-2.9.8-4.3C8.8 5 13 2.1 17.7 2.1c6.4 0 11.5 5.1 11.5 11.5 0 .7-.1 1.4-.2 2.1-.1.6-.3 1.3-.5 1.9-.2.4-.4.7-.5 1.1l1.5 1.4c.1 0 .2-.1.2-.2.6-1.2 1.1-2.4 1.3-3.7.2-.9.3-1.7.3-2.6C31.2 6.2 25.2.2 17.7.1c-1.1 0-2.2.1-3.3.4-4.2 1.1-7.7 4.1-9.3 8.2-1.9 4.9-.8 10.3 2.8 14.1L9.1 24c2.4 2 5.5 3.1 8.6 3.1h11l-2.3 2.2-.8.8c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l4.7-4.7c.1-.1.2-.2.3-.5 0-.1 0-.2-.1-.3z" />
      </g>
    </svg>
  );
}

export default SvgAgile;
