import * as React from 'react';
import getIconClasses from '../lib';

function SvgPegaBuildingComplex(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <g fill="#151619">
        <path d="M31 28.89h-1.38V20a1 1 0 00-.38-.78l-3.06-2.43V5.62a1 1 0 00-1-1H22.6V2.11a1 1 0 00-1-1h-9.32a1 1 0 00-1 1v2.51h-2.7a1 1 0 00-1 1v23.27H4.93v-6.48a3.77 3.77 0 002.32-3.61A3.6 3.6 0 003.93 15a3.6 3.6 0 00-3.32 3.8 3.77 3.77 0 002.32 3.61v6.48H1a1 1 0 000 2h30a1 1 0 000-2zM3.93 17c.71 0 1.32.83 1.32 1.81s-.61 1.81-1.32 1.81-1.32-.83-1.32-1.81S3.22 17 3.93 17zm23.69 11.9h-1.27v-6.17a1 1 0 00-1-1h-6.26a1 1 0 00-1 1v6.16H16.7v-8.43l5.47-4.34 5.45 4.34zm-3.27 0h-4.26v-5.17h4.26zm-.17-22.28v8.55l-1.39-1.1a.72.72 0 00-.19-.07V6.62zm-10.9-3.51h7.32v11.7l-5.52 4.39a1 1 0 00-.38.78v8.91h-1.42zm-3.7 3.51h1.7v22.27h-1.7z" />
        <path d="M15.77 14.82h2.86a1 1 0 100-2h-2.86a1 1 0 000 2zM15.77 11.23h2.86a1 1 0 000-2h-2.86a1 1 0 000 2zM15.77 7.64h2.86a1 1 0 000-2h-2.86a1 1 0 000 2z" />
      </g>
    </svg>
  );
}

export default SvgPegaBuildingComplex;
