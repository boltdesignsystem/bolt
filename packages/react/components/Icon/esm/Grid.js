import * as React from 'react';
import getIconClasses from '../lib';

function SvgGrid(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M7.1 8.1H3c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1h4.1c.6 0 1 .4 1 1v4.1c0 .6-.4 1-1 1zM18 8.1h-4c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4.1c.1.6-.3 1-1 1zM29 8.1h-4.1c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1H29c.6 0 1 .4 1 1v4.1c0 .6-.4 1-1 1zM7.1 19.1H3c-.6 0-1-.4-1-1V14c0-.6.4-1 1-1h4.1c.6 0 1 .4 1 1v4c0 .6-.4 1.1-1 1.1zM18 19.1h-4c-.6 0-1-.4-1-1V14c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4c.1.6-.3 1.1-1 1.1zM29 19.1h-4.1c-.6 0-1-.4-1-1V14c0-.6.4-1 1-1H29c.6 0 1 .4 1 1v4c0 .6-.4 1.1-1 1.1zM7.1 30H3c-.6 0-1-.4-1-1v-4.1c0-.6.4-1 1-1h4.1c.6 0 1 .4 1 1V29c0 .6-.4 1-1 1zM18 30h-4c-.6 0-1-.4-1-1v-4.1c0-.6.4-1 1-1h4c.6 0 1 .4 1 1V29c.1.6-.3 1-1 1zM29 30h-4.1c-.6 0-1-.4-1-1v-4.1c0-.6.4-1 1-1H29c.6 0 1 .4 1 1V29c0 .6-.4 1-1 1z" />
      </g>
    </svg>
  );
}

export default SvgGrid;
