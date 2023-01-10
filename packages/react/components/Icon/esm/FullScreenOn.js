import * as React from 'react';
import getIconClasses from '../lib';

function SvgFullScreenOn(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M32 1.5c0-.2 0-.4-.1-.5-.1-.2-.2-.3-.2-.4s-.1-.1-.1-.1c-.1-.1-.3-.2-.4-.2-.4-.2-.5-.3-.7-.3h-9.7c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.7L18 11.7c-.6.6-.6 1.6 0 2.3.3.3.7.5 1.1.5s.8-.2 1.1-.5l8.5-8.5v5.7c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zM11.7 18.1l-8.5 8.5v-5.7c0-.9-.7-1.6-1.6-1.6S0 19.9 0 20.8v9.6c0 .2 0 .4.1.6.1.1.1.3.2.4l.1.1c.1.1.2.2.4.2.2.1.4.1.6.1H11c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H5.5l8.5-8.5c.6-.6.6-1.6 0-2.3-.7-.4-1.7-.4-2.3.3z" />
      </g>
    </svg>
  );
}

export default SvgFullScreenOn;
