import * as React from 'react';
import getIconClasses from '../lib';

function SvgSpeedDial(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 30a14 14 0 1114-14 14 14 0 01-14 14zm0-30a16 16 0 1016 16A16 16 0 0016 0zm0 6A10 10 0 006 16h2a8 8 0 0116 0h2A10 10 0 0016 6zm-2 19h2v-2h-2zm6.5-10.9a1 1 0 00-1.4.4L15.5 21H15a3 3 0 103 3 2.79 2.79 0 00-.8-2l3.6-6.5a1 1 0 00-.3-1.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgSpeedDial;
