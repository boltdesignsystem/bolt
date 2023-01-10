import * as React from 'react';
import getIconClasses from '../lib';

function SvgVideo(props) {
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
        d="M29.2 20.2l-6-4.3 6-4.3zM19.5 23c0 .8-.6 1.4-1.4 1.4H4.2c-.8 0-1.4-.6-1.4-1.4V9.1c0-.8.6-1.4 1.4-1.4h13.9c.8 0 1.4.6 1.4 1.4zM31.2 7.8c-.5-.2-1-.2-1.4.1l-7.5 5.4V9c0-2.3-1.9-4.2-4.2-4.2H4.2C1.9 4.8 0 6.7 0 9v14c0 2.3 1.9 4.2 4.2 4.2h13.9c2.3 0 4.2-1.9 4.2-4.2v-4.3l7.5 5.4c.2.2.5.3.8.3.2 0 .4-.1.6-.2.5-.2.8-.7.8-1.2V9c0-.5-.3-1-.8-1.2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgVideo;
