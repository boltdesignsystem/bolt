import * as React from 'react';
import getIconClasses from '../lib';

function SvgCheckSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.5 12.1L14.7 21c-.6.6-1.6.6-2.2 0l-4-4c-.6-.6-.6-1.6 0-2.2.6-.6 1.6-.6 2.2 0l2.9 2.8 7.9-7.7c.3-.3.7-.5 1.1-.5s.8.2 1.1.5c.6.5.6 1.5.1 2.1-.2 0-.2 0-.3.1z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgCheckSolid;
