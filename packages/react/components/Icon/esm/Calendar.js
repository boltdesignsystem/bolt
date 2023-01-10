import * as React from 'react';
import getIconClasses from '../lib';

function SvgCalendar(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M3.9 29h24.2V12.3H3.9zM28.1 2.5h-1.4V0h-3v2.5H8.3V0h-3v2.5H3.9c-1.7 0-3 1.4-3 3V29c0 1.7 1.4 3 3 3h24.2c1.7 0 3-1.4 3-3V5.5c0-1.7-1.3-3-3-3z" />
        <path d="M7.4 18.4h17.3v-3H7.4zM7.4 24.9H21v-3H7.4z" />
      </g>
    </svg>
  );
}

export default SvgCalendar;
