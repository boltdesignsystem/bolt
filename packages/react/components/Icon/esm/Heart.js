import * as React from 'react';
import getIconClasses from '../lib';

function SvgHeart(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M23.2 4.6c3.2 0 5.6 2.4 5.6 5.6 0 4.6-5 9.1-12.6 16.2H16l-.2-.2C7.8 19 2.7 14.3 3.2 9.4c.2-1.1.6-2.2 1.4-3 2.6-2.7 6.7-2.1 9 .5L15.5 9c.3.3.8.3 1.1 0l1.9-2.2c1.2-1.4 2.9-2.2 4.7-2.2m0-3.2c-2.7 0-5.4 1.3-7.2 3.4-1.8-2.1-4.5-3.4-7.2-3.4-5 0-8.8 3.8-8.8 8.8 0 6.1 5.4 11 13.8 18.4l2.2 2.1 2.2-2.1C26.4 21 32 16.1 32 10.2c0-5-3.8-8.8-8.8-8.8z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgHeart;
