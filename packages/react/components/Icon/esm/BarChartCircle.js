import * as React from 'react';
import getIconClasses from '../lib';

function SvgBarChartCircle(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 30.1C8.2 30.1 1.9 23.8 1.9 16S8.2 1.9 16 1.9 30.1 8.2 30.1 16 23.8 30.1 16 30.1z" />
        <path d="M15 12.2h2v8.1h-2zM21 6.4h2v13.9h-2zM9 16.4h2v3.9H9zM7 22.1h18v1.6H7z" />
      </g>
    </svg>
  );
}

export default SvgBarChartCircle;
