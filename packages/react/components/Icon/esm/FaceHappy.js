import * as React from 'react';
import getIconClasses from '../lib';

function SvgFaceHappy(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M15.9 21.2c-1.7 0-3.2-.8-4.3-2.1l-1.5 1.1c1.3 1.9 3.5 2.9 5.7 2.9s4.4-1.1 5.7-2.9L20 19.1c-.9 1.3-2.4 2.1-4.1 2.1zM12 12.8c0-1.1-.8-1.9-1.9-1.9s-1.9.8-1.9 1.9.8 1.9 1.9 1.9 1.9-1 1.9-1.9zM21.3 10.9c-1.1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9-.8-1.9-1.9-1.9z" />
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 30.1C8.3 30.1 1.9 23.7 1.9 16S8.3 1.9 16 1.9 30.1 8.3 30.1 16 23.7 30.1 16 30.1z" />
      </g>
    </svg>
  );
}

export default SvgFaceHappy;
