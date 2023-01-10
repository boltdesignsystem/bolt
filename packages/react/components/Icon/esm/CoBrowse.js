import * as React from 'react';
import getIconClasses from '../lib';

function SvgCoBrowse(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M30 12H8v-2a2 2 0 012-2h18a2 2 0 012 2zm0 16a2 2 0 01-2 2H10a2 2 0 01-2-2V14h22zM28 6H10a4 4 0 00-4 4v18a4 4 0 004 4h18a4 4 0 004-4V10a4 4 0 00-4-4zM4 2h18a2 2 0 012 2h2a4 4 0 00-4-4H4a4 4 0 00-4 4v18a4 4 0 004 4v-2a2 2 0 01-2-2V8h2V6H2V4a2 2 0 012-2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCoBrowse;
