import * as React from 'react';
import getIconClasses from '../lib';

function SvgClockCircle(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3 10h-3c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1v5h2c.6 0 1 .4 1 1s-.4 1-1 1z" />
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 30C8.3 30 2 23.7 2 16S8.3 2 16 2s14 6.3 14 14-6.3 14-14 14z" />
      </g>
    </svg>
  );
}

export default SvgClockCircle;
