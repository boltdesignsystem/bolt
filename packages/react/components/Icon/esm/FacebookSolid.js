import * as React from 'react';
import getIconClasses from '../lib';

function SvgFacebookSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M26 0c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6h-3.9V19.6h4.2l.6-4.8h-4.8v-3.1c0-1.4.4-2.3 2.4-2.3H27V5c-1.2-.1-2.5-.2-3.7-.2-3.7 0-6.2 2.2-6.2 6.4v3.6h-4.2v4.9h4.2V32H6c-3.3 0-6-2.7-6-6V6c0-3.3 2.7-6 6-6z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgFacebookSolid;
