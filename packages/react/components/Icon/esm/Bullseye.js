import * as React from 'react';
import getIconClasses from '../lib';

function SvgBullseye(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M30.3 8.8H28c1.3 2.2 2 4.7 2 7.2 0 7.7-6.3 14-14 14S2 23.7 2 16 8.3 2 16 2c2.6 0 5.2.7 7.4 2.1V1.8C21.1.6 18.6 0 16 0 7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16c0-2.5-.6-5-1.7-7.2" />
        <path d="M16 8c1.1 0 2.1.2 3.1.6l1.5-1.5C19.2 6.4 17.6 6 16 6 10.5 6 6 10.5 6 16s4.5 10 10 10 10-4.5 10-10c0-1.6-.4-3.3-1.2-4.7l-1.5 1.5c.4 1 .7 2.1.7 3.2 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8" />
        <path d="M16 16.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm.9-2.8c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5c0-.3-.1-.6-.2-.9L25.4 8H30V6h-2.6l1.8-1.8-1.4-1.4L26 4.5V2h-2v4.6z" />
      </g>
    </svg>
  );
}

export default SvgBullseye;
