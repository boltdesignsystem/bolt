import * as React from 'react';
import getIconClasses from '../lib';

function SvgCloud(props) {
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
        d="M23 26H9c-3.9 0-7-3.1-7-7s3.1-7 7-7h.1c.5-3.4 3.4-6 6.9-6 3.1 0 5.8 2 6.7 5 4.1.1 7.4 3.6 7.3 7.7-.1 3.9-3.1 7-7 7.3m1.1-16.9c-2.2-4.5-7.6-6.3-12-4.2-2.1 1-3.8 2.9-4.6 5.2C3.2 10.9 0 14.6 0 19c0 5 4 9 9 9h14c5.3-.3 9.3-4.8 9-10.1-.3-4.4-3.5-8.1-7.9-8.8"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCloud;
