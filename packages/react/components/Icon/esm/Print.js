import * as React from 'react';
import getIconClasses from '../lib';

function SvgPrint(props) {
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
        d="M29.1 21.8c0 .8-.7 1.5-1.5 1.5h-1.5v-4.4c0-.8-.7-1.5-1.5-1.5H7.3c-.8 0-1.5.7-1.5 1.5v4.4H4.4c-.8 0-1.5-.7-1.5-1.5v-7.3c0-.8.7-1.5 1.5-1.5h23.3c.8 0 1.5.7 1.5 1.5v7.3zM8.7 29.1h14.5v-8.7H8.7zm0-18.9h14.5V2.9H8.7zm18.9 0h-1.5V1.5c0-.8-.7-1.5-1.5-1.5H7.3c-.8 0-1.5.7-1.5 1.5v8.7H4.4c-2.4 0-4.4 2-4.4 4.4v7.3c0 2.4 2 4.4 4.4 4.4h1.5v4.4c0 .8.7 1.5 1.5 1.5h17.5c.8 0 1.5-.7 1.5-1.5v-4.4h1.5c2.4 0 4.4-2 4.4-4.4v-7.3c-.3-2.5-2.3-4.4-4.7-4.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgPrint;
