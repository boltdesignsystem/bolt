import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaChatQuestion(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fill="#151619" fillRule="evenodd">
        <path d="M16 0C7.5 0 .5 6.3.5 14.2c0 4.6 2.3 8.6 6 11.2V32l5.7-4c1.2.3 2.5.4 3.8.4 8.6 0 15.5-6.4 15.5-14.2C31.5 6.3 24.6 0 16 0zm0 26.4c-1.5 0-2.9-.2-4.3-.6l-3.1 1.9v-3.2c-3.7-2.2-6.2-6-6.2-10.3C2.4 7.3 8.5 1.8 16 1.8s13.6 5.5 13.6 12.3S23.5 26.4 16 26.4z" />
        <path d="M16 18.6c-.7 0-1.3.5-1.3 1.2s.5 1.2 1.2 1.2 1.3-.5 1.3-1.2c.1-.7-.5-1.2-1.2-1.2zM15.9 9.1c-.9 0-1.9.3-2.4.7l-.3.2.7 1.8.4-.3c.3-.2.8-.4 1.3-.4.7 0 1.1.3 1.1.9 0 .5-.3 1-1 1.8-.8.9-1.2 2-1 2.9l.1.8h2v-.8c0-.7.2-1.2.8-1.9.8-.9 1.4-1.7 1.4-2.9-.2-1.5-1.1-2.8-3.1-2.8z" />
      </g>
    </svg>
  );
}

export default SvgPegaChatQuestion;
