import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaChat(props) {
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
        d="M.5 14.246c0 4.6 2.3 8.6 6 11.2v6.6l5.7-4c1.2.3 2.5.4 3.8.4 8.6 0 15.5-6.4 15.5-14.2 0-7.9-6.9-14.2-15.5-14.2-8.5 0-15.5 6.3-15.5 14.2zm8.1 10.3c-3.7-2.2-6.2-6-6.2-10.3 0-6.9 6.1-12.4 13.6-12.4s13.6 5.5 13.6 12.3-6.1 12.3-13.6 12.3c-1.5 0-2.9-.2-4.3-.6l-3.1 1.9z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgPegaChat;
