import * as React from 'react';
import getIconClasses from '../lib';

function SvgHospitality(props) {
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
        d="M2 22l2-7v1h24v-1l2 7zm28 6H2v-4h28zM6 8h4v1c0 .5.4 1 .9 1H21c.5 0 1-.4 1-.9V8h4l1.7 6H4.3zm6 0h8V6h-8zM6 3c0-.5.4-1 .9-1H25c.5 0 1 .4 1 .9V5c0 .5-.4 1-.9 1H22V5c0-.5-.4-1-.9-1H11c-.5 0-1 .4-1 .9V6H7c-.5 0-1-.4-1-.9V5zm25.6 19L28 6V2c0-1.1-.9-2-2-2H6C4.9 0 4 .9 4 2v4L.4 22H0v8h2v2h2v-2h24v2h2v-2h2v-8z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgHospitality;
