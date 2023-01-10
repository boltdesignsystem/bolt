import * as React from 'react';
import getIconClasses from '../lib';

function SvgIntegration(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M30 12H8v-2a2 2 0 012-2h18a2 2 0 012 2zm0 16a2 2 0 01-2 2H10a2 2 0 01-2-2V14h22zM28 6H10a4 4 0 00-4 4v18a4 4 0 004 4h18a4 4 0 004-4V10a4 4 0 00-4-4zM4 2a2 2 0 00-2 2v2h2v2H2v14a2 2 0 002 2v2a4 4 0 01-4-4V4a4 4 0 014-4h18a4 4 0 014 4h-2a2 2 0 00-2-2zm20.5 19v2h-4v4h-2v-4h-4v-2h4v-4h2v4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgIntegration;
