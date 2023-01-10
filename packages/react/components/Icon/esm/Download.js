import * as React from 'react';
import getIconClasses from '../lib';

function SvgDownload(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M28.1 28.6H3.9c-.9 0-1.7.8-1.7 1.7S3 32 3.9 32h24.3c.9 0 1.7-.8 1.7-1.7-.1-.9-.8-1.7-1.8-1.7M15 25.5c.2.3.6.5 1 .5s.8-.2 1-.5l9.1-10.9c.3-.4.4-.9.1-1.3-.2-.4-.7-.7-1.2-.7h-4.4V0h-9.1v12.7H6.9c-.5 0-.9.3-1.2.7-.1.2-.1.3-.1.5 0 .3.1.5.3.7z" />
      </g>
    </svg>
  );
}

export default SvgDownload;
