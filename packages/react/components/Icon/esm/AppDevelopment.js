import * as React from 'react';
import getIconClasses from '../lib';

function SvgAppDevelopment(props) {
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
        d="M29.9 8.5H2.1V3.2c0-.6.4-1 .9-1.1H28.7c.6 0 1 .4 1.1.9v5.5zm0 20.3c0 .6-.4 1-.9 1.1H3.2c-.6 0-1-.4-1.1-.9V10.7h27.7v18.1zm1-28.8H1.1C.5 0 0 .4 0 .9V31c0 .6.4 1 .9 1.1h30c.6 0 1-.4 1.1-.9V1.1c0-.6-.4-1-.9-1.1h-.2zM8.5 6.4h2.1V4.3H8.5zm4.3 0h2.1V4.3h-2.1zm-8.5 0h2.1V4.3H4.3zm10.6 19.2H17v-4.3h4.3v-2.1H17v-4.3h-2.1v4.3h-4.3v2.1h4.3z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgAppDevelopment;
