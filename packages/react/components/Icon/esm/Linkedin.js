import * as React from 'react';
import getIconClasses from '../lib';

function SvgLinkedin(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M7.3 10.7v20.6H.4V10.7zm.4-6.4c0 2-1.6 3.6-3.5 3.6h-.3C1.9 8 .1 6.5 0 4.5S1.3.8 3.3.7h.5C5.8.5 7.5 2 7.7 4zM32 19.5v11.8h-6.9v-11c0-2.8-1-4.7-3.5-4.7-1.6 0-3 1-3.5 2.5-.2.5-.2 1.1-.2 1.7v11.5H11c.1-18.7 0-20.6 0-20.6h6.9v3h-.1c1.3-2.2 3.7-3.6 6.2-3.5 4.6 0 8 3 8 9.3z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgLinkedin;
