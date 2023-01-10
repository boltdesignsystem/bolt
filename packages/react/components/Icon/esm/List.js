import * as React from 'react';
import getIconClasses from '../lib';

function SvgList(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M0 0h8v8H0zM0 24h8v8H0zM0 12h8v8H0zM12 26h20v4H12zM12 2h20v4H12zM12 14h20v4H12z" />
      </g>
    </svg>
  );
}

export default SvgList;
