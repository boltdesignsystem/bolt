import { h } from '@bolt/core';

export const Check = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          d="M19.292 6.29L8.998 16.584 4.703 12.29a1.004 1.004 0 0 0-1.412 0 1.002 1.002 0 0 0 0 1.413l5 5a.995.995 0 0 0 1.411 0l11-11a.99.99 0 0 0 0-1.413 1.001 1.001 0 0 0-1.41 0z"
          fill={bgColor}
        />
      </g>
    </svg>
  );
};
