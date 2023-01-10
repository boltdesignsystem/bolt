import * as React from 'react';
import getIconClasses from '../lib';

function SvgBarChart(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M14.5 27.6h2.9V4.4h-2.9zm3-26.1h-2.9c-1.6 0-2.9 1.3-2.9 2.9v23.3c0 1.6 1.3 2.9 2.9 2.9h2.9c1.6 0 2.9-1.3 2.9-2.9V4.4c0-1.6-1.3-2.9-2.9-2.9zM26.2 27.6h2.9v-16h-2.9zm2.9-18.9h-2.9c-1.6 0-2.9 1.3-2.9 2.9v16c0 1.6 1.3 2.9 2.9 2.9h2.9c1.6 0 2.9-1.3 2.9-2.9v-16c0-1.6-1.3-2.9-2.9-2.9zM2.9 27.6h2.9v-8.7H2.9zM5.8 16H2.9C1.3 16 0 17.3 0 18.9v8.7c0 1.6 1.3 2.9 2.9 2.9h2.9c1.6 0 2.9-1.3 2.9-2.9v-8.7c0-1.6-1.3-2.9-2.9-2.9z" />
      </g>
    </svg>
  );
}

export default SvgBarChart;
