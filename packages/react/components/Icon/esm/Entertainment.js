import * as React from 'react';
import getIconClasses from '../lib';

function SvgEntertainment(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M24.5 27h-17c-.6 0-1 .4-1 1s.4 1 1 1h17c.6 0 1-.4 1-1s-.4-1-1-1M2 6c0-.5.4-1 .9-1H29c.5 0 1 .4 1 .9V23H2zm28-3H2C.9 3 0 3.9 0 5v19c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </g>
    </svg>
  );
}

export default SvgEntertainment;
