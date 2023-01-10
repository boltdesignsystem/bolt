import * as React from 'react';
import getIconClasses from '../lib';

function SvgCreditCard(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M27.3 5.1H4.7C2.2 5.1 0 7.2 0 9.7v12.5c0 2.6 2.2 4.6 4.7 4.6h22.5c2.6 0 4.7-2 4.7-4.6V9.7c.1-2.5-2.1-4.6-4.6-4.6zm3.2 17.2c0 1.7-1.4 3.1-3.2 3.1H4.7c-1.8 0-3.2-1.4-3.2-3.1v-4.6h28.9v4.6zm0-6.2h-29V13h28.9v3.1zm0-4.6h-29V9.7c0-1.7 1.4-3.1 3.2-3.1h22.5c1.8 0 3.2 1.4 3.2 3.1v1.8z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgCreditCard;
