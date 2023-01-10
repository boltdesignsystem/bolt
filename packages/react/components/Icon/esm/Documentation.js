import * as React from 'react';
import getIconClasses from '../lib';

function SvgDocumentation(props) {
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
        d="M25.6 19.2H10.7c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h14.9c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zm3.2 5.3c0 .6-.4 1-.9 1.1H8.5c-.6 0-1-.4-1.1-.9V3.2c0-.6.4-1 .9-1.1h19.3c.6 0 1 .4 1.1.9v21.5zm0-24.5H7.5C6.3 0 5.3 1 5.3 2.1v23.5c0 1.2 1 2.1 2.1 2.1h21.3c1.2 0 2.1-1 2.1-2.1V2.1C30.9 1 30 0 28.8 0zm-3.2 12.8H10.7c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h14.9c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zM10.7 8.5h8.5c.6 0 1-.4 1.1-.9v-.1c0-.6-.4-1-.9-1.1h-8.6c-.6 0-1 .4-1.1.9v.1c0 .6.4 1 .9 1.1zM3.2 4.3c-1.2 0-2.1 1-2.1 2.1v23.5C1.1 31 2 32 3.2 32h23.5c1.2 0 2.1-1 2.1-2.1H3.2z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgDocumentation;
