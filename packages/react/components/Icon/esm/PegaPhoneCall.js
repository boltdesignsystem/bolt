import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPhoneCall(props) {
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
        d="M28.3 23.6l-4.5-3.9c-.7-.7-1.4-.4-1.8 0l-2 2c-1.6 1.1-10.7-8-9.6-9.5l2-2.1c.4-.4.6-1.2 0-1.8L8.6 4.1s-.9-.6-1.8-.2c-.7.4-3.7 2.8-2.8 7.9.9 5.7 10.9 15.7 16.5 16.5 5.1.8 7.4-2 7.9-2.9.4-.8-.1-1.8-.1-1.8z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgPegaPhoneCall;
