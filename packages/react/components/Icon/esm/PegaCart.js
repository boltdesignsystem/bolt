import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaCart(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M30.8 9.21a1 1 0 00-.73-.35h-22l-.68-5.44a.94.94 0 00-.93-.82H1.93a.94.94 0 000 1.88h3.7L7.71 20.9a.92.92 0 00.93.82h19a1 1 0 00.92-.74L31 10a.93.93 0 00-.2-.79zm-3.92 10.63H9.46l-1.15-9.11H28.9zM13.47 24.12a2.64 2.64 0 102.68 2.64 2.67 2.67 0 00-2.68-2.64zM23.62 24.12a2.64 2.64 0 102.69 2.64 2.67 2.67 0 00-2.69-2.64z" />
      </g>
    </svg>
  );
}

export default SvgPegaCart;
