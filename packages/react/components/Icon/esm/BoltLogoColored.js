import * as React from 'react';
import getIconClasses from '../lib';

function SvgBoltLogoColored(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g clipRule="evenodd" fillRule="evenodd">
        <path
          d="M11.7 9.2h8.5c.2 0 .3.1.3.3v5.1c0 .2-.1.3-.3.3h-8.5c-.2 0-.3-.1-.3-.3V9.5c0-.2.2-.3.3-.3z"
          fill="#ffcc4c"
        />
        <path
          d="M.1 14l2.7-4.7c.1-.1.1-.1.2-.1h5.9c.2 0 .3.1.3.3v5.1c0 .2-.1.3-.3.3H.6c-.3 0-.6-.3-.6-.6 0-.1 0-.2.1-.3z"
          fill="#f63"
        />
        <path
          d="M22.8 14.6V9.5c0-.2.1-.3.3-.3H29c.1 0 .2.1.2.1l2.7 4.7c.2.3.1.6-.2.8-.1 0-.2.1-.3.1h-8.3c-.1 0-.3-.2-.3-.3z"
          fill="#e1e2eb"
        />
        <path
          d="M13.7 1.5v5.1c0 .2-.1.3-.3.3H4.6c-.2 0-.3-.1-.3-.3v-.1l2.4-4.1c.4-.7 1.2-1.1 2-1.1h4.7c.2-.1.3 0 .3.2z"
          fill="#f63"
        />
        <path
          d="M16.3 1.2h6.9c.8 0 1.6.4 2 1.1l2.4 4.1c.1.1 0 .3-.1.4H16.4c-.2 0-.3-.1-.3-.3V1.4c-.1-.1 0-.2.2-.2z"
          fill="#ffcc4c"
        />
        <path
          d="M6.8 29.7l-2.4-4.1c-.1-.1 0-.3.1-.4h11.1c.2 0 .3.1.3.3v5.1c0 .2-.1.3-.3.3H8.7c-.7-.1-1.5-.5-1.9-1.2z"
          fill="#6c79d9"
        />
        <path
          d="M18.6 25.1h8.8c.2 0 .3.1.3.3v.1l-2.4 4.1c-.4.7-1.2 1.1-2 1.1h-4.7c-.2 0-.3-.1-.3-.3v-5.1c0-.1.1-.2.3-.2z"
          fill="#12b3b3"
        />
        <path
          d="M11.4 17.4v5.1c0 .2-.1.3-.3.3H3c-.1 0-.2-.1-.2-.1L.1 18c-.2-.3-.1-.6.2-.8.1 0 .2-.1.3-.1h10.6c.1 0 .2.2.2.3z"
          fill="#6c79d9"
        />
        <path
          d="M14 17.1h17.4c.3 0 .6.3.6.6 0 .1 0 .2-.1.3l-2.7 4.7c-.1.1-.1.1-.2.1H14c-.2 0-.3-.1-.3-.3v-5.1c0-.1.2-.3.3-.3z"
          fill="#12b3b3"
        />
      </g>
    </svg>
  );
}

export default SvgBoltLogoColored;
