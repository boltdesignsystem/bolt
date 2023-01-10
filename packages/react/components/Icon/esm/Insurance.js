import * as React from 'react';
import getIconClasses from '../lib';

function SvgInsurance(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M2 16a14 14 0 0128 0zM16 0A16 16 0 000 16v2h14v8a6 6 0 0012 0h-2a4 4 0 01-8 0v-8h16v-2A16 16 0 0016 0z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgInsurance;
