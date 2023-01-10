import * as React from 'react';
import getIconClasses from '../lib';

function SvgFlagSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M27.4 1.8l-.9.3c-1.3.7-2.7 1-4.2 1-.4 0-.9 0-1.4-.2-1.1-.1-2.1-.3-3.1-.8-1.1-.5-2.1-1.1-3.3-1.5-1.5-.6-3.2-.7-5-.5C8 .3 6.5.7 5 1.2c-.6.2-1.2.6-1.6 1.2-.4.7-.5 1.4-.5 2.2v13l.1 6.7v6.3c0 .2 0 .4.1.6.3.7 1.2 1 1.9.7.6-.3.9-.7.9-1.4V18.6c-.1-.3.1-.5.3-.6 1-.5 1.9-.9 3-1 1.2-.1 2.5-.1 3.7.1s2.2.8 3.3 1.3c.6.4 1.3.6 1.9.9 1 .4 2.2.5 3.3.6.9.1 1.9 0 2.8-.1 1.4-.2 2.8-.6 4.1-1.3.6-.3.9-.7.9-1.4V3.3c-.2-.7-1-1.6-1.8-1.5z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgFlagSolid;
