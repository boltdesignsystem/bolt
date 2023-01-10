import * as React from 'react';
import getIconClasses from '../lib';

function SvgUpload(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M28.1 28.6H3.8c-.9 0-1.7.8-1.7 1.7S2.9 32 3.8 32h24.3c.9 0 1.7-.8 1.7-1.7s-.7-1.7-1.7-1.7M6.9 13.3h4.4V26h9.2V13.3h4.6c.5 0 .9-.3 1.2-.7.1-.2.1-.3.1-.5 0-.3-.1-.5-.3-.7L17 .5c-.2-.3-.6-.5-1-.5s-.8.2-1 .5L5.9 11.3c-.3.4-.4.9-.1 1.3.2.4.6.7 1.1.7" />
      </g>
    </svg>
  );
}

export default SvgUpload;
