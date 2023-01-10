import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaTag(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M17.7 2h10.7c.6 0 1-.4 1-1s-.4-1-1-1H17.3c-.3 0-.5.1-.7.3L1.3 15.8c-.4.4-.4 1 0 1.4s1 .4 1.4 0zM24.2 13.3c.8 0 1.6-.3 2.2-.9 1.2-1.2 1.2-3.2 0-4.4s-3.1-1.2-4.3 0c-1.2 1.2-1.2 3.2 0 4.4.5.6 1.3.9 2.1.9zm-.8-3.9c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.6-.4.4-1.1.4-1.5 0-.4-.5-.4-1.1 0-1.6z" />
        <path d="M30 3.3H18.9c-.3 0-.5.1-.7.3L2.9 19.1c-.4.4-.4 1 0 1.4L14 31.7c.4.4 1 .4 1.4 0l15.3-15.5c.2-.2.3-.4.3-.7V4.3c0-.5-.4-1-1-1zm-1 11.8L14.7 29.6 5 19.8 19.3 5.3H29z" />
      </g>
    </svg>
  );
}

export default SvgPegaTag;
