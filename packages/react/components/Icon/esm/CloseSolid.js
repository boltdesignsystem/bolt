import * as React from 'react';
import getIconClasses from '../lib';

function SvgCloseSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm5.1 19.1c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0l-3-3.1-3.1 3.1c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l3.1-3.1-3.1-3.1c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l3.1 3.1 3.1-3.1c.6-.6 1.5-.6 2.1 0s.6 1.5 0 2.1L18.1 16z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgCloseSolid;
