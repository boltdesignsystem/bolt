import * as React from 'react';
import getIconClasses from '../lib';

function SvgYoutubeSolid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M12.7 20.1l8.6-4.5-8.6-4.5zM16 4.7c6.7 0 11.2.3 11.2.3 1.2 0 2.4.5 3.2 1.4.7.9 1.2 2 1.3 3.2.2 1.7.3 3.4.3 5.2v2.4c0 1.7-.1 3.5-.3 5.2-.1 1.2-.5 2.3-1.3 3.2-.9.8-2 1.3-3.2 1.3 0 0-4.5.3-11.2.3-8.3 0-10.9-.2-10.9-.2-1.3 0-2.6-.5-3.5-1.4-.7-.9-1.2-2-1.3-3.2-.2-1.7-.3-3.5-.3-5.2v-2.4c0-1.7.1-3.5.3-5.2.1-1.2.5-2.3 1.3-3.2S3.6 5 4.8 5c0 0 4.5-.3 11.2-.3z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgYoutubeSolid;
