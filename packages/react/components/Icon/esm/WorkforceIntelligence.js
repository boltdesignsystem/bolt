import * as React from 'react';
import getIconClasses from '../lib';

function SvgWorkforceIntelligence(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M30 18h-4.7l2 2H30v3c0 .7-.3 1-1 1H3c-.7 0-1-.3-1-1v-3h7.7c-.7-.6-1.4-1.2-1.9-2H2V3c0-.7.3-1 1-1h26c.7 0 1 .3 1 1zM12 30h8v-4h-8zM31.4.6C31.1.2 30.5 0 30 0H2C1.5 0 .9.2.6.6.2 1 0 1.5 0 2v22c0 .5.2 1.1.6 1.4.4.4.9.6 1.4.6h8v4H8v2h16v-2h-2v-4h8c.5 0 1.1-.2 1.4-.6.4-.4.6-.9.6-1.4V2c0-.5-.2-1.1-.6-1.4z" />
        <path d="M15.5 18c-3 0-5.5-2.5-5.5-5.5S12.5 7 15.5 7 21 9.5 21 12.5 18.7 18 15.7 18h-.2m6-.9c1-1.3 1.6-2.9 1.6-4.6C23 8.4 19.6 5 15.5 5S8 8.3 8 12.5c0 4.1 3.3 7.5 7.5 7.5 1.7 0 3.3-.6 4.7-1.6l4.2 4.2c.2.2.4.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4z" />
      </g>
    </svg>
  );
}

export default SvgWorkforceIntelligence;
