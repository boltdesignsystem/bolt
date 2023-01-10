import * as React from 'react';
import getIconClasses from '../lib';

function SvgTwitter(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M32 6.1c-.9 1.3-2 2.5-3.3 3.4v.9C28.7 19 22.1 29 10.1 29 6.5 29 3 28 0 26.1c.5.1 1.1.1 1.6.1 3 0 5.8-1 8.1-2.8-2.8-.1-5.3-1.9-6.1-4.6.4.1.8.1 1.2.1.6 0 1.2-.1 1.7-.2-3.1-.6-5.3-3.3-5.3-6.4v-.1c.9.5 1.9.8 3 .8-2.9-1.9-3.7-5.8-2-8.8 3.3 4.1 8.3 6.6 13.5 6.9-.1-.5-.2-1-.2-1.5C15.7 6 18.6 3 22.1 3c1.8 0 3.6.7 4.8 2.1 1.5-.3 2.9-.8 4.2-1.6-.5 1.5-1.5 2.8-2.9 3.6 1.3-.1 2.6-.5 3.8-1z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgTwitter;
