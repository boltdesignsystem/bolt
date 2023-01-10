import * as React from 'react';
import getIconClasses from '../lib';

function SvgFinancial(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M5 30h22V2H5zM27 0H5C3.9 0 3 .9 3 2v28c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
        <path d="M9 10.7h14v-5H9zm-2 2h18v-9H7zM9 18.3h2v-2H9zM13 18.3h2v-2h-2zM17 18.3h2v-2h-2zM21 18.3h2v-2h-2zM9 22.3h2v-2H9zM13 22.3h2v-2h-2zM17 22.3h2v-2h-2zM21 22.3h2v-2h-2zM9 26.3h2v-2H9zM13 26.3h2v-2h-2zM17 26.3h2v-2h-2zM21 26.3h2v-2h-2z" />
      </g>
    </svg>
  );
}

export default SvgFinancial;
