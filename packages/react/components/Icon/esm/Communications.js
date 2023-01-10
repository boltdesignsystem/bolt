import * as React from 'react';
import getIconClasses from '../lib';

function SvgCommunications(props) {
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
        d="M16 14.7c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3m0-7.4c-5.7 0-10.4 4.6-10.4 10.3 0 2.9 1.2 5.7 3.4 7.7l1-1.8c-1.5-1.5-2.4-3.6-2.4-5.8 0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4c0 2.2-.9 4.3-2.4 5.8l1 1.8c4.2-3.8 4.6-10.4.7-14.6-2-2.2-4.8-3.4-7.7-3.4m16 10.4c0 4.9-2.2 9.6-6.1 12.6l-1-1.8c3.3-2.6 5.1-6.6 5.1-10.8 0-7.7-6.3-14-14-14S2 10 2 17.7c0 4.2 1.9 8.2 5.1 10.8l-1 1.8C-.8 24.8-2 14.8 3.4 7.8S19-.3 25.9 5.1c3.8 3.1 6.1 7.7 6.1 12.6"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCommunications;
