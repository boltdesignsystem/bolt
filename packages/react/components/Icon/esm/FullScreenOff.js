import * as React from 'react';
import getIconClasses from '../lib';

function SvgFullScreenOff(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M31.5.5c-.6-.6-1.6-.6-2.3 0L20.7 9V3.2c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v9.7c0 .2 0 .3.1.5s.2.3.2.4.1.1.1.1c.1.1.3.2.4.2.2.1.3.1.5.1h9.6c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H23l8.5-8.5c.6-.4.6-1.4 0-2zM14.3 18.6c-.1-.2-.1-.3-.2-.4l-.1-.1c-.1-.1-.2-.2-.3-.2-.2-.1-.4-.1-.6-.1H3.2c-.9 0-1.6.7-1.6 1.6S2.3 21 3.2 21h5.7L.4 29.5c-.6.6-.6 1.6 0 2.3.4 0 .8.2 1.2.2s.8-.2 1.1-.5l8.5-8.5v5.7c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-9.6c0-.1 0-.3-.1-.5z" />
      </g>
    </svg>
  );
}

export default SvgFullScreenOff;
