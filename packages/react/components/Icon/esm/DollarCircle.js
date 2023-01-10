import * as React from 'react';
import getIconClasses from '../lib';

function SvgDollarCircle(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 29.1C8.8 29.1 2.9 23.2 2.9 16S8.8 2.9 16 2.9 29.1 8.8 29.1 16c0 7.2-5.9 13.1-13.1 13.1zM16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z" />
        <path d="M20.8 18.3c0 1.9-1.5 3.6-3.4 3.7v2.2h-2.7V22c-1.8-.2-3.3-1.7-3.4-3.5h2.3c.1.9 1.2 1.6 2.5 1.6s2.2-.8 2.2-1.5-.6-1.2-2.1-1.5l-1.5-.3c-2.2-.5-3.2-1.6-3.2-3.4s1.4-3.2 3.1-3.5V7.8h2.7v2.3c1.7.2 3.1 1.7 3.2 3.4h-2.3c-.2-1-1.1-1.7-2.2-1.6-1.2 0-2.1.5-2.1 1.5 0 .7.5 1.2 2 1.5l1.4.3c2.4.4 3.5 1.4 3.5 3.1z" />
      </g>
    </svg>
  );
}

export default SvgDollarCircle;
