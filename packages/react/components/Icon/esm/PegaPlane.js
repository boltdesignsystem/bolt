import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaPlane(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M29.79 2.07a3.74 3.74 0 00-5.2 0l-5.3 5.35L6.63 5a.94.94 0 00-.85.26L2.54 8.48A.94.94 0 002.91 10l10.41 3.56L8 19.55l-3.67-.89a.92.92 0 00-.89.25l-2 2a1 1 0 00-.26.81.94.94 0 00.5.69l5.29 2.72 2.7 5.35a.9.9 0 00.69.5h.15a.93.93 0 00.66-.27l2-2a.92.92 0 00.24-.88l-.88-3.72 5.88-5.41 3.52 10.5a1 1 0 00.68.62 1 1 0 00.88-.26l3.23-3.26a.94.94 0 00.26-.84l-2.49-12.81 5.3-5.35a3.73 3.73 0 000-5.23zM28.45 6l-5.64 5.7a.94.94 0 00-.26.84L25 25.33l-1.81 1.83-3.5-10.43a.94.94 0 00-.66-.61.91.91 0 00-.86.22l-7.37 6.77a1 1 0 00-.28.9l.9 3.75-.69.7L8.48 24a1 1 0 00-.41-.41l-4.42-2.28.7-.71 3.7.9a.9.9 0 00.95-.28l6.7-7.43a.93.93 0 00.21-.86.91.91 0 00-.6-.65L4.93 8.74l1.83-1.85 12.66 2.46a.9.9 0 00.85-.26l5.65-5.7a1.8 1.8 0 012.53 0 1.84 1.84 0 010 2.61z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaPlane;
