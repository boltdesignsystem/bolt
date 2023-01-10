import * as React from 'react';
import getIconClasses from '../lib';

function SvgBriefcase(props) {
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
        d="M28 29H4c-1.1 0-2-.9-2-2V15h28v12c0 1.1-.9 2-2 2zM4 7h24c1.1 0 2 .9 2 2v4H2V9c0-1.1.9-2 2-2zm8-3c0-.5.4-1 .9-1H19c.5 0 1 .4 1 .9V5h-8zm16 1h-6V2c0-.5-.4-1-.9-1H11c-.5 0-1 .4-1 .9V5H4C1.8 5 0 6.8 0 9v18c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V9c0-2.2-1.8-4-4-4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgBriefcase;
