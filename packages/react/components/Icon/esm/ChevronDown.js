import * as React from 'react';
import getIconClasses from '../lib';

function SvgChevronDown(props) {
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
        d="M26.6 12.4c.6-.6.6-1.6 0-2.2s-1.6-.6-2.2 0L16 18.5l-8.3-8.4c-.6-.6-1.6-.6-2.2 0-.3.4-.5.8-.5 1.2s.2.8.5 1.1l9.4 9.4c.6.6 1.6.6 2.2 0z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgChevronDown;
