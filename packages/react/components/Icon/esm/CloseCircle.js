import * as React from 'react';
import getIconClasses from '../lib';

function SvgCloseCircle(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M16 29.1C8.8 29.1 2.9 23.2 2.9 16S8.8 2.9 16 2.9 29.1 8.8 29.1 16 23.2 29.1 16 29.1M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0" />
        <path d="M21.1 19.1l-3-3.1 3.1-3.1c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0L16 13.9l-3.1-3.1c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l3.1 3.1-3.1 3.1c-.6.6-.6 1.5 0 2.1s1.5.6 2.1 0l3.1-3.1 3.1 3.1c.6.6 1.5.6 2.1 0 .5-.6.5-1.5-.1-2.1" />
      </g>
    </svg>
  );
}

export default SvgCloseCircle;
