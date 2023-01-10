import * as React from 'react';
import getIconClasses from '../lib';

function SvgPodcast(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M25.7 11.8c-.8 0-1.4.6-1.4 1.4V16c0 4.6-3.7 8.3-8.3 8.3S7.7 20.6 7.7 16v-2.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4V16c0 5.7 4.3 10.4 9.7 11v2.2h-4.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h11.1c.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4h-4.2V27c5.5-.7 9.7-5.4 9.7-11v-2.8c.1-.7-.5-1.4-1.3-1.4" />
        <path d="M13.2 5.6c0-1.5 1.3-2.8 2.8-2.8s2.8 1.3 2.8 2.8V16c0 1.5-1.3 2.8-2.8 2.8s-2.8-1.3-2.8-2.8zm2.8 16c3.1 0 5.6-2.5 5.6-5.6V5.6C21.5 2.5 19 0 16 0s-5.6 2.5-5.6 5.6V16c0 3.1 2.5 5.6 5.6 5.6z" />
      </g>
    </svg>
  );
}

export default SvgPodcast;
