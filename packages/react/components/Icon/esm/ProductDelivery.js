import * as React from 'react';
import getIconClasses from '../lib';

function SvgProductDelivery(props) {
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
        d="M15 19.3v10.1L5 24.3V14.2zm11.9-5.1v10.1l-10 5.1V19.3zm2 10.8v.2c0 .1-.1.1-.1.2s-.1.1-.1.2-.1.1-.2.1l-.1.1-12 6.1c-.1.1-.3.1-.4.1s-.3 0-.4-.1l-12-6.1-.1-.1c-.1 0-.1-.1-.2-.1-.1-.1-.1-.1-.1-.2s-.1-.1-.1-.2V12.6c0-.1 0-.2.1-.3v-.1c0-.1.1-.2.2-.3l.2-.2 8.7-5c.4-.3 1-.2 1.2.2 0 0 .1.1.1.2.3.5.1 1.1-.3 1.4h-.1l-7.1 4.1 9.9 5 9.9-5-7-4c-.5-.3-.6-.9-.4-1.4s.8-.7 1.2-.4h.1l8.6 4.9c.1 0 .2.1.2.2.1.1.1.2.2.3v.1c0 .1.1.2.1.3zM13.3 5.2c-.4.3-1.1.2-1.4-.2s-.3-.8 0-1.2L15.3.3c.1-.1.2-.2.3-.2 0-.1.1-.1.3-.1h.1c.1 0 .3 0 .4.1.1 0 .2.1.2.2h.1l3.4 3.5c.4.4.4 1 0 1.4s-1 .4-1.4 0L17 3.4v7.7c0 .5-.4 1-.9 1H16c-.6 0-1-.4-1-1V3.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgProductDelivery;
