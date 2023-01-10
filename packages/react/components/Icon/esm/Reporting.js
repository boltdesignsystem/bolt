import * as React from 'react';
import getIconClasses from '../lib';

function SvgReporting(props) {
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
        d="M20.9.4l3.4 4.2c.3.4.2 1.1-.2 1.4-.2.1-.4.2-.6.2-.3 0-.6-.1-.8-.4l-1.8-2.3C19.7 11.9 12.5 18.2 4 18.2c-.6 0-1-.4-1-1s.4-1 1-1c7.5 0 13.9-5.5 15-12.9l-2.4 1.9c-.4.3-1.1.2-1.4-.2s-.2-1.1.2-1.4L19.6.2c.1 0 .1 0 .1-.1.1 0 .1-.1.2-.1h.5c.1 0 .1 0 .2.1.1 0 .1 0 .1.1.1 0 .2.1.2.2zM4 24.3c.5 0 1 .4 1 .9V31c0 .5-.4 1-.9 1H4c-.5 0-1-.4-1-.9v-5.8c0-.6.4-1 1-1zm8-4.8c.5 0 1 .4 1 .9V31c0 .6-.4 1-1 1s-1-.4-1-1V20.5c0-.5.4-1 .9-1zm8-3.5c.5 0 1 .4 1 .9V31c0 .6-.4 1-1 1s-1-.4-1-1V17c0-.5.4-1 .9-1zm8-5.2c.5 0 1 .4 1 .9V31c0 .6-.4 1-1 1s-1-.4-1-1V11.8c0-.6.4-1 1-1z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgReporting;
