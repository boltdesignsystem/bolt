import * as React from 'react';
import getIconClasses from '../lib';

function SvgChevronRight(props) {
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
        d="M12.4 5.4c-.6-.6-1.6-.6-2.2 0s-.6 1.6 0 2.3l8.4 8.3-8.3 8.3c-.6.6-.6 1.6 0 2.2.3.3.7.5 1 .5.4 0 .8-.2 1.1-.5l9.4-9.4c.6-.6.6-1.6 0-2.2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgChevronRight;
