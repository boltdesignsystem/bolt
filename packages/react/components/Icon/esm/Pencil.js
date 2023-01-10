import * as React from 'react';
import getIconClasses from '../lib';

function SvgPencil(props) {
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
        d="M26.6 9.2l-3.8-3.8c2.1-2.1 3.6-4 5.7-1.9s.2 3.6-1.9 5.7zm-18.1 18c-2.1 2.1-5.7 1.9-5.7 1.9s-.2-3.6 1.9-5.7L17 11.1l3.8 3.8zm16.2-16.1L22.8 13 19 9.2l1.9-1.9zm5.7-9.5c-3.1-3.1-6.3-1.3-9.5 1.9l-18 18C-.3 24.7 0 32 0 32s7.3.3 10.4-2.8l18-18c3.2-3.2 5.1-6.4 2-9.6z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgPencil;
