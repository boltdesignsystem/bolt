import * as React from 'react';
import getIconClasses from '../lib';

function SvgUser(props) {
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
        d="M26.2 24.2c-1.4-2.3-3.6-4.1-6.2-5 1.9-1.3 3.1-3.4 3.1-5.8 0-3.9-3.2-7.1-7.1-7.1s-7.1 3.2-7.1 7.1c0 2.4 1.2 4.6 3.1 5.8-2.6.9-4.8 2.7-6.2 5C4 21.9 2.9 19.1 2.9 16 2.9 8.8 8.8 2.9 16 2.9S29.1 8.8 29.1 16c0 3.1-1.1 5.9-2.9 8.2M11.8 13.3c0-2.3 1.9-4.2 4.2-4.2s4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2-4.2-1.9-4.2-4.2M16 29.1c-3.1 0-5.9-1-8.1-2.8 1.5-2.9 4.6-4.9 8.1-4.9s6.6 2 8.1 4.9c-2.2 1.7-5 2.8-8.1 2.8M16 0C7.2 0 0 7.2 0 16c0 4.3 1.7 8.2 4.5 11.1.7.8 1.6 1.5 2.5 2.1C9.5 31 12.7 32 16 32s6.5-1 9-2.8c.9-.6 1.8-1.3 2.5-2.1C30.3 24.2 32 20.3 32 16c0-8.8-7.2-16-16-16"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgUser;
