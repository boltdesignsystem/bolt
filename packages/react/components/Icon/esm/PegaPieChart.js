import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPieChart(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M27.77 16.19h-12V4.34a.94.94 0 00-.94-.94 13.73 13.73 0 1013.88 13.73.94.94 0 00-.94-.94zM14.85 29a11.85 11.85 0 01-.93-23.67v11.8a.94.94 0 00.93.94h12a12 12 0 01-12 10.93z" />
        <path d="M18.08 1.14v12.79H31A12.86 12.86 0 0018.08 1.14z" />
      </g>
    </svg>
  );
}

export default SvgPegaPieChart;
