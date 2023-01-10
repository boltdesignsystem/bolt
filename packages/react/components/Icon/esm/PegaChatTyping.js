import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaChatTyping(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M16 0C7.5 0 .5 6.4.5 14.2c0 4.6 2.3 8.6 6 11.2V32l5.7-4c1.2.3 2.5.4 3.8.4 8.6 0 15.5-6.4 15.5-14.2S24.6 0 16 0zm0 26.5c-1.5 0-2.9-.2-4.3-.6l-3.1 1.9v-3.2c-3.7-2.2-6.2-6-6.2-10.3C2.4 7.4 8.5 1.9 16 1.9s13.6 5.5 13.6 12.3S23.5 26.5 16 26.5z" />
        <path d="M10.5 12.3c-1 0-1.7.7-1.7 1.7s.7 1.7 1.6 1.7c1 0 1.7-.7 1.7-1.7s-.6-1.7-1.6-1.7zM16.2 12.3c-1 0-1.7.7-1.7 1.7s.7 1.7 1.6 1.7c1 0 1.7-.7 1.7-1.7s-.6-1.7-1.6-1.7zM21.9 12.3c-1 0-1.7.7-1.7 1.7s.7 1.7 1.6 1.7c1 0 1.7-.7 1.7-1.7.1-1-.6-1.7-1.6-1.7z" />
      </g>
    </svg>
  );
}

export default SvgPegaChatTyping;
