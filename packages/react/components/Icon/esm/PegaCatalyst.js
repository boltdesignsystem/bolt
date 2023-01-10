import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaCatalyst(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M29.36 26.34l-8.81-11.88V2.87h1.11a.94.94 0 000-1.87H10.34a.94.94 0 000 1.87h1.11v11.59L2.64 26.34A2.92 2.92 0 005 31h22a2.92 2.92 0 002.35-4.66zm-16.24-11a1 1 0 00.21-.59V2.87h5.34v11.9a1.22 1.22 0 00.24.63l3.78 5.09a5 5 0 01-1.52-.38 6.65 6.65 0 00-2.76-.53 6.63 6.63 0 00-2.75.53 4.84 4.84 0 01-2.08.41 4.79 4.79 0 01-2.07-.41 6.72 6.72 0 00-1.58-.45zM28 28.55a1 1 0 01-.94.58H5a1 1 0 01-.94-.58 1 1 0 01.1-1.1l4.47-6h.13a4.84 4.84 0 012.08.41 6.63 6.63 0 002.75.53 6.63 6.63 0 002.75-.53 4.87 4.87 0 012.08-.41 4.8 4.8 0 012.08.41 6.65 6.65 0 002.76.53.91.91 0 00.65-.27l4 5.33a1 1 0 01.09 1.1z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaCatalyst;
