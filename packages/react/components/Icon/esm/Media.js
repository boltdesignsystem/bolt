import * as React from 'react';
import getIconClasses from '../lib';

function SvgMedia(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M6.9 16.3v11.4c0 .9-.7 1.6-1.6 1.6h-1c-.9 0-1.6-.7-1.6-1.6V16.3zM29.4 2.6v25.1c0 .9-.7 1.6-1.6 1.6H9.1c.2-.5.3-1.1.3-1.6V2.6zM6.9 0v13.7H0v14C0 30.1 1.9 32 4.2 32h23.5c2.3 0 4.2-1.9 4.2-4.2V0z" />
        <path d="M10.8 6.5h17.3V3.9H10.8zM10.8 23.2h17.3v-2.6H10.8zM10.8 27.1h17.3v-2.6H10.8zM13.4 16.7h12.1v-6.2H13.4zm-2.6 2.6h17.3V7.8H10.8z" />
      </g>
    </svg>
  );
}

export default SvgMedia;
