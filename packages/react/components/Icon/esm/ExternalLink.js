import * as React from 'react';
import getIconClasses from '../lib';

function SvgExternalLink(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M25.6 16c-.9 0-1.6.7-1.6 1.6v9.6c0 .9-.7 1.6-1.6 1.6H4.8c-.9 0-1.6-.7-1.6-1.6V9.6c0-.9.7-1.6 1.6-1.6h9.6c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H4.8C2.1 4.8 0 6.9 0 9.6v17.6C0 29.8 2.1 32 4.8 32h17.6c2.6 0 4.8-2.1 4.8-4.8v-9.6c0-.9-.7-1.6-1.6-1.6" />
        <path d="M32 1.5c0-.2 0-.4-.1-.5-.1-.2-.2-.3-.2-.4s-.1-.1-.1-.1c-.1-.1-.3-.2-.4-.2-.4-.2-.5-.3-.7-.3h-9.7c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.7L11.7 18.1c-.6.6-.6 1.6 0 2.3.3.3.7.5 1.1.5s.8-.2 1.1-.5L28.8 5.5v5.7c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6z" />
      </g>
    </svg>
  );
}

export default SvgExternalLink;
