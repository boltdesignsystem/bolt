import * as React from 'react';
import getIconClasses from '../lib';

function SvgEnergy(props) {
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
        d="M6.8 14.9h5.9c.3 0 .6.1.8.4.2.2.3.5.2.8L12 28.4 25.2 17h-5.9c-.3 0-.6-.1-.8-.4-.2-.2-.3-.5-.2-.8L20 3.6zM10.7 32c-.2 0-.3 0-.5-.1-.4-.2-.6-.6-.5-1l1.9-13.8H4c-.4 0-.8-.3-1-.7-.1-.4 0-.8.3-1.1L20.5.3c.3-.4.8-.5 1.3-.3.4.2.6.6.5 1l-1.9 13.9H28c.4 0 .8.3 1 .7.1.4 0 .8-.3 1.1l-17.2 15c-.3.2-.5.3-.8.3z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgEnergy;
