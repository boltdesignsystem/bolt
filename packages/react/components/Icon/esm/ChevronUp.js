import * as React from 'react';
import getIconClasses from '../lib';

function SvgChevronUp(props) {
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
        d="M5.4 19.6c-.6.6-.6 1.6 0 2.2s1.6.6 2.2 0l8.3-8.3 8.3 8.3c.6.6 1.6.6 2.2 0 .3-.3.5-.7.5-1.1s-.2-.8-.5-1.1l-9.3-9.4c-.6-.6-1.6-.6-2.2 0z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgChevronUp;
