import * as React from 'react';
import getIconClasses from '../lib';

function SvgMenu(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M30.4 14.4H1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h28.8c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6M1.6 6.4h28.8c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6H1.6C.7 3.2 0 3.9 0 4.8s.7 1.6 1.6 1.6M30.4 25.6H1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h28.8c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6" />
      </g>
    </svg>
  );
}

export default SvgMenu;
