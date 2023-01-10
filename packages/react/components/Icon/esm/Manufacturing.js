import * as React from 'react';
import getIconClasses from '../lib';

function SvgManufacturing(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M24 0v4h-4V0h-2v4h-4V0h-2v4H8V0H6v4H4v2H0v2h4v4H0v2h4v4H0v2h4v4H0v2h4v2h2v4h2v-4h4v4h2v-4h4v4h2v-4h4v4h2v-4h2v-2h4v-2h-4v-4h4v-2h-4v-4h4v-2h-4V8h4V6h-4V4h-2V0zM6 24V6h20v20H6z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgManufacturing;
