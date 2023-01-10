import * as React from 'react';
import getIconClasses from '../lib';

function SvgRetail(props) {
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
        d="M29 29c0 .5-.4 1-.9 1H17V11.4l6 2.6c1.1 0 2-.9 2-2V7h3c.5 0 1 .4 1 .9V8zM23 4.4V11c0 .5-.4 1-.9 1H22l-4.4-2.2zM9.6 2.3l-.1-.1c.1-.1.3-.2.5-.2h12c.2 0 .4.1.5.2-.1 0-.1.1-.2.1L16 8.6zM15 30H4c-.5 0-1-.4-1-.9V8c0-.5.4-1 .9-1H7v5c0 1.1.9 2 2 2l6-2.6zM9 4.4l5.4 5.4L10 12c-.5 0-1-.4-1-.9V11zM29 5h-4V2c0-1.1-.9-2-2-2H9C7.9 0 7 .9 7 2v3H3c-1.1 0-2 .9-2 2v23c0 1.1.9 2 2 2h26c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM19 20h8v-2h-8z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgRetail;
