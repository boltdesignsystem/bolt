import * as React from 'react';
import getIconClasses from '../lib';

function SvgReply(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M12.4 9.8V2.7L0 15.1l12.4 12.4v-7.3c8.9 0 15.1 2.8 19.6 9.1-1.8-8.9-7.1-17.7-19.6-19.5z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgReply;
