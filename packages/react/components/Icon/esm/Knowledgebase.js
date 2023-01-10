import * as React from 'react';
import getIconClasses from '../lib';

function SvgKnowledgebase(props) {
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
        d="M.9 2.1H8c.5 0 1 .4 1 .9v26.1c0 .5-.4.9-.9 1H.9c-.5-.1-.9-.5-.9-1V3c0-.5.3-.9.9-.9zm1.1 26h5v-2H2zm0-22h5v-2H2zM2 24h5V8H2zm8.9-21.9H18c.5 0 1 .4 1 .9v26.1c0 .5-.4.9-.9 1H11c-.5 0-.9-.4-.9-.9V3.1c-.1-.4.2-.9.6-1zm1.1 26h5v-2h-5zm0-22h5v-2h-5zM12 24h5V8h-5zm7.8-21.2l7-1.1c.5-.1 1 .3 1.1.8L32 28.1c.1.5-.3 1-.8 1.1l-7 1.1c-.5.1-1-.3-1.1-.8L19 4c-.1-.6.2-1.1.8-1.2zm5.1 25.5l4.9-.8-.3-2-4.9.8zM21.5 6.6l4.9-.8-.3-2-4.9.8zm2.8 17.7l4.9-.8-2.5-15.7-4.9.8z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgKnowledgebase;
