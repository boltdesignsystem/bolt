import * as React from 'react';
import getIconClasses from '../lib';

function SvgRoboAuto(props) {
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
        d="M19.9 14.9h2v-2h-2zm0-4h-2v6h6v-6zm-9.9 4h2v-2h-2zm4 2v-6H8v6zm-3 6h9.9v-2H11zm17 0c0 1.6-1.4 2.9-3 3H7c-.8 0-1.5-.3-2.1-.9S4 23.6 4 22.9v-14c0-.8.3-1.5.9-2.1C5.5 6.3 6.2 6 7 6h18c.8 0 1.5.3 2.1.9.6.5.9 1.3.9 2zM12 30h8v-2h-8zm19.6-19.3c-.2-.2-.4-.3-.7-.3h-1V8.9c0-1.3-.5-2.6-1.5-3.5-.9-1-2.2-1.5-3.5-1.5h-8V2h1c.3 0 .5-.1.7-.3s.3-.4.3-.7-.1-.5-.3-.7-.4-.3-.7-.3h-4.1c-.3 0-.5.1-.7.3-.1.2-.2.4-.2.7s.1.5.3.7.4.3.7.3h1v2H7c-1.3 0-2.6.5-3.5 1.5C2.5 6.4 2 7.6 2 8.9v1H1c-.7 0-1 .3-1 1v8c0 .7.3 1 1 1h1v3c0 1.3.5 2.6 1.5 3.5.9 1 2.2 1.5 3.5 1.5h3V32h11.9v-4.2H25c1.3 0 2.6-.5 3.5-1.5 1-.9 1.5-2.2 1.5-3.5v-3h1c.3 0 .5-.1.7-.3s.3-.4.3-.7v-7.6c-.1-.1-.3-.3-.4-.5z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgRoboAuto;
