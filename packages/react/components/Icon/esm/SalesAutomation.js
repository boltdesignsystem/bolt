import * as React from 'react';
import getIconClasses from '../lib';

function SvgSalesAutomation(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        clipRule="evenodd"
        d="M30 2.1H2V6h28zm0-2c.5 0 1.1.2 1.4.6s.5.9.6 1.4V6c0 .5-.2 1.1-.6 1.4-.4.4-.9.6-1.4.6H2C1.5 8 .9 7.8.6 7.4.2 7 0 6.5 0 6V2.1c0-.5.2-1 .6-1.4S1.5.1 2 .1zm-4 14H6V18h20zm0-2c.5 0 1.1.2 1.4.6s.5.9.6 1.4V18c0 .5-.2 1.1-.6 1.4s-.9.5-1.4.6H6c-.5 0-1.1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4v-3.9c0-.5.2-1 .6-1.4s.9-.6 1.4-.6zM22 26H10v3.9h12zm0-2c.5 0 1.1.2 1.4.6s.5.9.6 1.4v3.9c0 1.1-.9 2-2 2H10c-.5 0-1.1-.2-1.4-.6s-.5-.8-.6-1.3v-3.9c0-.5.2-1.1.6-1.4s.9-.5 1.4-.6z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgSalesAutomation;
