import * as React from 'react';
import getIconClasses from '../lib';

function SvgCube(props) {
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
        d="M15 2.6v9.9c0 .6.4 1 1 1s1-.4 1-1V2.6l11.7 5.8L16 14.8 3.3 8.5zm2 13.9L29.9 10v11.8L20.1 17c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4c.1.1.3.2.5.3l9.5 4.7-11.7 6zm-3.5.8c-.2-.4-.7-.7-1.1-.5-.1 0-.1 0-.2.1l-10.1 5V10.1L15 16.5v12.8L3.3 23.5l9.8-4.9c.4-.2.7-.7.5-1.1 0-.1-.1-.2-.1-.2zm18.4-8.8c0-.1 0-.2-.1-.3v-.1c0-.1-.1-.2-.2-.2v-.1c-.1-.1-.2-.1-.2-.2L16.4.1c-.1-.1-.2-.1-.4-.1s-.3 0-.4.1L.6 7.6c-.1 0-.2.1-.2.2v.1c-.1 0-.2 0-.2.1v.1c0 .1-.1.2-.1.3V24c0 .1.1.1.1.2v.1c.1.1.1.1.2.1l14.9 7.5c.2.1.5.1.7.1s.3 0 .4-.1l15.2-7.5c.1 0 .1-.1.2-.1v-.1c.1-.1.1-.1.1-.2v-.5z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCube;
