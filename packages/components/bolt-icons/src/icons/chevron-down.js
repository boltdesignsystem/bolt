import { h } from '@bolt/core';

export const ChevronDown = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M22.71 13.704a1.005 1.005 0 0 0 0-1.413 1.004 1.004 0 0 0-1.413 0l-5.295 5.294-5.295-5.294a1.005 1.005 0 0 0-1.413 0 .998.998 0 0 0 0 1.412l6 6a.993.993 0 0 0 1.414 0l6.002-6z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
