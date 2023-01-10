import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaMap(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M30.58 1.78a.89.89 0 00-.88-.08l-9 3.86-9-3.86a.93.93 0 00-.29-.05h-.06a.87.87 0 00-.32.06l-9.38 4a.92.92 0 00-.65.87v22.86a.9.9 0 00.42.78.86.86 0 00.51.16.91.91 0 00.37-.08l6.35-2.72c.94 1.27 1.72 2.21 1.94 2.47a1 1 0 001.44 0c.22-.26 1-1.2 1.94-2.47l6.35 2.72a.91.91 0 00.37.08 1 1 0 00.37-.08l9.38-4a.93.93 0 00.56-.86V2.56a.9.9 0 00-.42-.78zM11.31 28c-2-2.49-5.42-7.26-5.42-9.53a5.42 5.42 0 0110.84 0c0 2.23-3.43 7-5.42 9.53zm7.3-9.53a7.3 7.3 0 00-14.6 0C4 20.48 5.8 23.54 7.52 26l-4.65 2V7.2l7.5-3.2v4.9a.94.94 0 001.88 0V4l7.5 3.22V28l-4.65-2c1.72-2.45 3.51-5.52 3.51-7.57zm10.52 6.33l-7.5 3.2V7.2l7.5-3.2z" />
        <path d="M11.31 15.65a2.79 2.79 0 102.81 2.78 2.79 2.79 0 00-2.81-2.78z" />
      </g>
    </svg>
  );
}

export default SvgPegaMap;
