import * as React from 'react';
import getIconClasses from '../lib';

function SvgAddSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm5.8 17.5h-4.4v4.4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-4.4H10c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h4.4v-4.4c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v4.4h4.4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgAddSolid;
