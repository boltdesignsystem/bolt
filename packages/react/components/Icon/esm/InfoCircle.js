import * as React from 'react';
import getIconClasses from '../lib';

function SvgInfoCircle(props) {
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
        <path d="M16 14.5c-.8 0-1.5.7-1.5 1.5v5.8c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V16c0-.8-.7-1.5-1.5-1.5M16 8.7c-.4 0-.8.2-1 .4s-.4.6-.4 1 .2.8.4 1c.3.3.6.4 1 .4s.8-.2 1-.4c.3-.3.4-.6.4-1s-.2-.8-.4-1-.6-.4-1-.4" />
      </g>
    </svg>
  );
}

export default SvgInfoCircle;
