import * as React from 'react';
import getIconClasses from '../lib';

function SvgClose(props) {
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
        d="M18.6 16l9.8-9.8c.7-.7.7-1.9 0-2.6s-1.9-.7-2.6 0L16 13.4 6.2 3.5c-.7-.7-1.9-.7-2.6 0s-.7 1.9 0 2.6l9.8 9.8-9.8 9.8c-.7.7-.7 1.9 0 2.6.3.5.8.7 1.3.7s1-.2 1.3-.6l9.8-9.8 9.8 9.8c.3.3.8.6 1.3.6s1-.2 1.3-.6c.7-.7.7-1.9 0-2.6z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgClose;
