import * as React from 'react';
import getIconClasses from '../lib';

function SvgSupport(props) {
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
        d="M23.7 18c.4-1.3.4-2.7 0-4h6.1c.1.7.2 1.3.2 2s-.1 1.3-.2 2zM20 29.4v-6.5c1.2-.7 2.2-1.7 2.9-2.9h6.5c-1.3 4.5-4.9 8.1-9.4 9.4zm-2 .4c-.7.1-1.3.2-2 .2s-1.3-.1-2-.2v-6.1c1.3.4 2.7.4 4 0zm-6-.4c-4.5-1.3-8.1-4.9-9.4-9.4h6.5c.7 1.2 1.7 2.2 2.9 2.9zM2 16c0-.7.1-1.3.2-2h6.1c-.4 1.3-.4 2.7 0 4H2.2c-.1-.7-.2-1.3-.2-2zM12 2.6v6.5c-1.2.7-2.2 1.7-2.9 2.9H2.6C3.9 7.5 7.5 3.9 12 2.6zm2-.4c.7-.1 1.3-.2 2-.2s1.3.1 2 .2v6.1c-1.3-.4-2.7-.4-4 0zM22 16c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zM20 2.6c4.5 1.3 8.1 4.9 9.4 9.4h-6.5c-.7-1.2-1.7-2.2-2.9-2.9zM16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgSupport;
