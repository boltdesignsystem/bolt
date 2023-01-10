import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaBook(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        d="M29.4 6.61h-.22V2.73a.92.92 0 00-.91-.92A18.55 18.55 0 0016 6.09 18.55 18.55 0 003.73 1.81a.92.92 0 00-.91.92v3.88H2.6A2.61 2.61 0 000 9.21v17.07a2.61 2.61 0 002.6 2.6h11.27a1.68 1.68 0 001.69 1.31h.88a1.68 1.68 0 001.69-1.31H29.4a2.61 2.61 0 002.6-2.6V9.21a2.61 2.61 0 00-2.6-2.6zm-2 15.82A18.71 18.71 0 0016.92 26V7.74a16.58 16.58 0 0110.43-4.07zM4.65 3.67a16.58 16.58 0 0110.43 4.07V26a18.71 18.71 0 00-10.43-3.57zM1.84 26.28V9.21a.77.77 0 01.76-.76h.22v14.88a.92.92 0 00.91.92A17.4 17.4 0 0113.39 27H2.6a.76.76 0 01-.76-.72zm28.32 0a.76.76 0 01-.76.76H18.61a17.43 17.43 0 019.66-2.79.92.92 0 00.91-.92V8.45h.22a.76.76 0 01.76.76z"
        fill="#151619"
      />
    </svg>
  );
}

export default SvgPegaBook;
