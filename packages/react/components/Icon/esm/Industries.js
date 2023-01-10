import * as React from 'react';
import getIconClasses from '../lib';

function SvgIndustries(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M8 0v6H0v26h32V6h-8V0zm2 6V2h12v28h-2v-6h-8v6h-2zm14 24h6V8h-6zM2 30h6V8H2zm12 0h4v-4h-4zM12 8h8V6h-8zm14 6h2v-2h-2zm-14 0h8v-2h-8zm-8 0h2v-2H4zm22 6h2v-2h-2zm-14 0h8v-2h-8zm-8 0h2v-2H4zm22 6h2v-2h-2zM4 26h2v-2H4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgIndustries;
