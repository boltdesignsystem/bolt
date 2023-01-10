import * as React from 'react';
import getIconClasses from '../lib';

function SvgCustomerOnboarding(props) {
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
        d="M5.4 9.6c0-4.1 3.3-7.5 7.5-7.5s7.5 3.3 7.5 7.5-3.3 7.5-7.5 7.5-7.5-3.3-7.5-7.5m12.1 8.3c4.6-2.6 6.3-8.4 3.7-13s-8.4-6.3-13-3.7c-3 1.7-4.9 4.9-4.9 8.4s1.9 6.6 4.9 8.3C3.3 19.9.1 24.6.1 29.8V32h2.1v-2.1C2.2 24 7 19.2 12.8 19.3c2.7 0 5.3 1.1 7.3 2.9l.1-.9h2c-1.2-1.4-2.9-2.6-4.7-3.4m13.4 7.7h-3.2v-3.2c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v3.2h-3.2c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h3.2V31c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-3.2h3.2c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCustomerOnboarding;
