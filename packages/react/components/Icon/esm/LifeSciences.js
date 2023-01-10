import * as React from 'react';
import getIconClasses from '../lib';

function SvgLifeSciences(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M7.2 24.8h10.9v-2H8.8c1.2-1.2 2.5-2.3 3.8-3.3l-1.2-1.6C7.3 21 3 25.1 3 32h2c0-.5 0-1.1.1-1.6v.1h16v-2H5.5c.4-1.3 1-2.6 1.7-3.7M24.7 7.3H14.1v2H23c-1.2 1.2-2.4 2.2-3.8 3.2l1.2 1.6C24.7 11.1 29 7 29 0h-2c0 .5 0 1.1-.1 1.6H11.1v2h15.4c-.4 1.3-1 2.6-1.8 3.7" />
        <path d="M16.6 15.2C10.6 11.2 5 7.5 5 0H3c0 8.5 6.3 12.8 12.4 16.8S27 24.5 27 32h2c0-8.5-6.3-12.8-12.4-16.8" />
      </g>
    </svg>
  );
}

export default SvgLifeSciences;
