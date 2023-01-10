import * as React from 'react';
import getIconClasses from '../lib';

function SvgTransportation(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        clipRule="evenodd"
        d="M12 6h8V4h-8zm16 2H4V3c0-.5.4-1 .9-1H27c.5 0 1 .4 1 .9V3zm0 11v1H4V10h24zm-2 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3.4 0H9.4c.3-.6.6-1.3.6-2s-.2-1.4-.6-2h13.1c-.3.6-.6 1.3-.6 2 .1.7.3 1.4.7 2zM6 26c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM28 0H4C2.9 0 2 .9 2 2v22c0 1.4.7 2.7 2 3.4V31c0 .5.4 1 .9 1H5c.5 0 1-.4 1-.9V28h20v3c0 .6.4 1 1 1s1-.4 1-1v-3.6c1.2-.7 2-2 2-3.4V2c0-1.1-.9-2-2-2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgTransportation;
