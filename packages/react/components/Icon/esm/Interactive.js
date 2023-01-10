import * as React from 'react';
import getIconClasses from '../lib';

function SvgInteractive(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M6.4 6.6c0-.6-.5-1.1-1.1-1.1H1.1C.5 5.6 0 6 0 6.6s.5 1.1 1.1 1.1h4.3c.5 0 1-.5 1-1.1M32 6.6c0-.3-.1-.5-.3-.7v-.1h-.1l-.1-.1-4.2-4.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.5 2.5H18.2c-.1-2.3-2-4.2-4.4-4.2s-4.4 2-4.4 4.4v10.6l-.3-.2c-1.4-1.4-3.9-1.4-5.4 0-.7.7-1.1 1.7-1.1 2.7s.4 2 1 2.6l6.9 9c.3.3.7.5 1.1.5.3 0 .6-.1.8-.3.6-.5.7-1.3.2-1.9l-7.1-9.1c-.2-.2-.3-.5-.3-.8s.1-.6.3-.8c.4-.4 1.2-.4 1.6 0l2.6 2.6c.4.4 1 .5 1.5.3s.8-.7.8-1.2V5.7c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v8.8c0 .6.4 1.1.9 1.3l6 2c2 .7 3.3 2.5 3.3 4.6v7.1c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-7.1c0-3.2-2.1-6.1-5.1-7.1L18 13.6V7.7h10.2l-2.5 2.5c-.4.4-.4 1 0 1.4s1 .4 1.4 0l4.2-4.2.1-.1h.1v-.1c.4 0 .5-.3.5-.6 0 .1 0 .1 0 0z" />
      </g>
    </svg>
  );
}

export default SvgInteractive;
