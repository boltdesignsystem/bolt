import * as React from 'react';
import getIconClasses from '../lib';

function SvgMore(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M19.2 16c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2M6.4 16c0 1.8-1.4 3.2-3.2 3.2S0 17.8 0 16s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2M32 16c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2S32 14.2 32 16" />
      </g>
    </svg>
  );
}

export default SvgMore;
