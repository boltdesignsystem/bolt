import * as React from 'react';
import getIconClasses from '../lib';

function SvgEmail(props) {
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
        d="M27.6 26.2H4.4c-.8 0-1.5-.7-1.5-1.5V10.1l12.3 8.6c.3.2.5.3.8.3s.6-.1.8-.3l12.3-8.6v14.7c0 .7-.7 1.4-1.5 1.4zM4.4 5.8h23.3c.6 0 1.1.3 1.3.8l-13 9.1L3.1 6.6c.2-.5.7-.8 1.3-.8zM32 7.2c0-2.4-2-4.3-4.4-4.3H4.4C2 2.9 0 4.8 0 7.2v17.4C0 27 2 29 4.4 29h23.3c2.4 0 4.4-2 4.4-4.4V7.2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgEmail;
