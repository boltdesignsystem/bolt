import * as React from 'react';
import getIconClasses from '../lib';

function SvgTextAlignLeft(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M1.6 14.4H24c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6M1.6 8h28.8c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H1.6C.7 4.8 0 5.5 0 6.4S.7 8 1.6 8M30.4 17.6H1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h28.8c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6M24 24H1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6H24c.9 0 1.6-.7 1.6-1.6S24.9 24 24 24" />
      </g>
    </svg>
  );
}

export default SvgTextAlignLeft;
