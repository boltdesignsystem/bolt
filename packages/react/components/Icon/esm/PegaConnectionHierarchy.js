import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaConnectionHierarchy(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M30.07 21h-2.34v-5a.94.94 0 00-.93-.94h-9.86V11h2.33a.94.94 0 00.94-.94v-5.2a.94.94 0 00-.94-.94h-6.54a.94.94 0 00-.94.94V10a.94.94 0 00.94.94h2.33v4.08H5.2a.93.93 0 00-.93.94v5H1.93A.94.94 0 001 22v5.18a.94.94 0 00.93.94h6.54a.94.94 0 00.94-.94V22a.94.94 0 00-.94-1H6.14v-4.06h8.92V21h-2.33a.94.94 0 00-.94.94v5.18a.94.94 0 00.94.94h6.54a.94.94 0 00.94-.94V22a.94.94 0 00-.94-.94h-2.33v-4.12h8.92V21h-2.33a.94.94 0 00-.94.94v5.18a.94.94 0 00.94.94h6.54a.94.94 0 00.93-.94V22a.94.94 0 00-.93-1zM13.67 5.8h4.66v3.3h-4.66zM7.54 26.2H2.87v-3.3h4.67zm10.79 0h-4.66v-3.3h4.66zm10.8 0h-4.67v-3.3h4.67z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaConnectionHierarchy;
