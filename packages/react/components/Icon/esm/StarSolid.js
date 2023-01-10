import * as React from 'react';
import getIconClasses from '../lib';

function SvgStarSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M22.1 19.6l9.9-7.2H19.8L16 .8l-3.8 11.6H0l9.9 7.2-3.8 11.6L16 24l9.9 7.2z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgStarSolid;
