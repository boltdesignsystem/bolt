import * as React from 'react';
import getIconClasses from '../lib';

function SvgFilter(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M31.9 2.3c-.2-.5-.8-.8-1.3-.8H1.5c-.6 0-1.1.3-1.3.8S0 3.4.3 3.9l11.3 13.3v9c0 .6.3 1.1.8 1.3l5.8 2.9c.2.1.4.2.7.2s.5-.1.8-.2c.4-.3.7-.7.7-1.2v-12L31.7 3.8c.3-.4.4-1 .2-1.5zM17.8 15.7c-.2.3-.3.6-.3.9v10.1l-2.9-1.5v-8.6c0-.3-.1-.7-.3-.9L4.6 4.4h22.8z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgFilter;
