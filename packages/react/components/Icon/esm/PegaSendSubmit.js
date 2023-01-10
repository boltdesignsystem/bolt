import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaSendSubmit(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M31 4.93a.87.87 0 000-.32.29.29 0 000-.09 1 1 0 00-.12-.23 1.3 1.3 0 00-.34-.29h-.07a1.13 1.13 0 00-.24-.08h-.1a.71.71 0 00-.25 0h-.09L1.66 12.56a.94.94 0 00-.2 1.71l9.28 5.45v7.45a1 1 0 00.62.89 1.13 1.13 0 00.32.05.93.93 0 00.72-.34L16.32 23l4.62 2.72a1 1 0 00.48.13 1 1 0 00.29-.05.94.94 0 00.57-.52l8.65-20.09a1.11 1.11 0 00.07-.26zm-5.51 2.28L11.6 18.05l-7.35-4.32zM12.61 24.56v-3.74L14.69 22zm8.37-1l-7.64-4.49L27.76 7.81z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaSendSubmit;
