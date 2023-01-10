import * as React from 'react';
import getIconClasses from '../lib';

function SvgMapPin(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16.1 0C8.8 0 2.8 6 2.8 13.3c0 2.4.7 4.8 2 7.3 1 1.9 2.5 3.9 4.3 5.8 3.1 3.2 6.1 5.3 6.2 5.4.2.2.5.2.7.2s.5-.1.7-.2c.1-.1 3.2-2.1 6.2-5.4 1.8-1.9 3.3-3.9 4.3-5.8 1.3-2.5 2-4.9 2-7.3C29.4 6 23.4 0 16.1 0zm0 29c-2.5-1.9-10.7-8.5-10.7-15.7 0-5.9 4.8-10.6 10.7-10.6s10.7 4.8 10.7 10.7c0 7.1-8.2 13.7-10.7 15.6z" />
        <path d="M16.1 8c-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3 5.3-2.4 5.3-5.3S19 8 16.1 8zm0 8c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7z" />
      </g>
    </svg>
  );
}

export default SvgMapPin;
