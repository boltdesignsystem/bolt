import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaHealthShield(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M27.32 3.51H26A14.77 14.77 0 0117.72 1L16.56.17a1 1 0 00-1.12 0L14.28 1A14.77 14.77 0 016 3.51H4.68a1 1 0 00-1 1v16.66a5.06 5.06 0 002.22 4.2l9.54 6.46a1 1 0 001.12 0l9.54-6.46a5.06 5.06 0 002.22-4.2V4.51a1 1 0 00-1-1zm-1 17.66A3.07 3.07 0 0125 23.72l-9 6.07-9-6.07a3.07 3.07 0 01-1.34-2.55V5.51H6a16.72 16.72 0 009.42-2.9l.6-.4.6.4A16.72 16.72 0 0026 5.51h.3z" />
        <path d="M22 13h-3V9.92a1 1 0 00-1-1h-4a1 1 0 00-1 1V13h-3a1 1 0 00-1 1v4a1 1 0 001 1h3v3a1 1 0 001 1h4a1 1 0 001-1v-3h3a1 1 0 001-1v-4a1 1 0 00-1-1zm-1 4h-3a1 1 0 00-1 1v3h-2v-3a1 1 0 00-1-1h-3v-2h3a1 1 0 001-1v-3.08h2V14a1 1 0 001 1h3z" />
      </g>
    </svg>
  );
}

export default SvgPegaHealthShield;
