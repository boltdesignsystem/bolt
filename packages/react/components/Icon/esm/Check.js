import * as React from 'react';
import getIconClasses from '../lib';

function SvgCheck(props) {
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
        d="M29 5L10.7 23.3 3 15.6c-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5L9.4 27c.3.3.8.5 1.3.5s.9-.2 1.3-.5L31.5 7.5c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCheck;
