import * as React from 'react';
import getIconClasses from '../lib';

function SvgCopyToClipboard(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M26.2 27.6c0 .8-.7 1.5-1.5 1.5H7.3c-.8 0-1.5-.7-1.5-1.5V7.3c0-.8.7-1.5 1.5-1.5h1.5c0 1.6 1.3 2.9 2.9 2.9h8.7c1.6 0 2.9-1.3 2.9-2.9h1.5c.8 0 1.5.7 1.5 1.5v20.3zM11.6 2.9h8.7v2.9h-8.7V4.3zm13.1 0h-1.5C23.3 1.3 22 0 20.4 0h-8.7c-1.7 0-3 1.3-3 2.9H7.3c-2.4 0-4.4 2-4.4 4.4v20.4c0 2.4 2 4.4 4.4 4.4h17.5c2.4 0 4.4-2 4.4-4.4V7.3c-.1-2.4-2.1-4.4-4.5-4.4z" />
        <path d="M17.5 17.5v-2.9c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v2.9h-2.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h2.9v2.9c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.9h2.9c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" />
      </g>
    </svg>
  );
}

export default SvgCopyToClipboard;
