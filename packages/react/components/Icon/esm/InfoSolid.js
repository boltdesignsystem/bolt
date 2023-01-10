import * as React from 'react';
import getIconClasses from '../lib';

function SvgInfoSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm1.5 21.8c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V16c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5zM17 11.2c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1 1.5-.6 2.1 0 .6 1.5 0 2.1z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgInfoSolid;
