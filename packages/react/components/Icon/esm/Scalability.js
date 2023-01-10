import * as React from 'react';
import getIconClasses from '../lib';

function SvgScalability(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 27v-1h2v1h6v-3h3V8h-3V5H8v3H5v6h1v2H5v8h3v3zm8-27h8v8h-3v16h3v8h-8v-3H8v3H0v-8h3V8H0V0h8v3h16zm2 5v1h4V2h-4zM2 2v4h4V2zm24 27v1h4v-4h-4zM2 26v4h4v-4zm6-12h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgScalability;
