import * as React from 'react';
import getIconClasses from '../lib';

function SvgCertification(props) {
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
        d="M16 32c-.1 0-.2 0-.3-.1-.2 0-13.7-5.1-13.7-20.2V.9c0-.5.4-.9.9-.9H29c.5 0 .9.4 1 .9v10.8c0 15.1-13.5 20.2-13.7 20.2-.1.1-.2.1-.3.1zM3.9 1.9v9.8C3.9 24.2 14 29.2 16 30c2-.9 12.1-5.7 12.1-18.3V1.9zm10.5 16.6c-.3 0-.5-.1-.7-.3L10 14.5c-.4-.3-.4-.8-.1-1.2l.1-.1c.4-.4 1-.4 1.4 0l3 3 6.3-6.1c.4-.4 1-.4 1.4 0 .4.3.4.8.1 1.2l-.1.1-7 6.8c-.2.2-.4.3-.7.3z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgCertification;
