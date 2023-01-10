import * as React from 'react';
import getIconClasses from '../lib';

function SvgPicture(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M10.4 9.6c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8m0 4.8c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4" />
        <path d="M27.2 28.8H8.7l13.7-13.7 6.4 6.4v5.7c0 .9-.7 1.6-1.6 1.6zm-24-24c0-.9.7-1.6 1.6-1.6h22.4c.9 0 1.6.7 1.6 1.6v12.1l-5.3-5.3c-.6-.6-1.6-.6-2.3 0l-17 17c-.6-.2-1-.8-1-1.5zm28.8 16v-16C32 2.2 29.8 0 27.2 0H4.8C2.2 0 0 2.2 0 4.8v22.4C0 29.8 2.1 32 4.8 32h22.4c2.6 0 4.8-2.2 4.8-4.8z" />
      </g>
    </svg>
  );
}

export default SvgPicture;
