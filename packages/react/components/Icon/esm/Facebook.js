import * as React from 'react';
import getIconClasses from '../lib';

function SvgFacebook(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M24.3.2v5.1h-3c-2.4 0-2.8 1.1-2.8 2.8v3.6h5.6l-.7 5.7h-4.9V32h-5.9V17.4H7.7v-5.7h4.9V7.5c0-4.9 3-7.5 7.3-7.5 1.5 0 3 .1 4.4.2z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgFacebook;
