import { h } from '@bolt/core';

export const ChevronUp = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M9.29 18.296a1.005 1.005 0 0 0 0 1.413 1.004 1.004 0 0 0 1.413 0l5.295-5.294 5.295 5.294a1.005 1.005 0 0 0 1.413 0 .998.998 0 0 0 0-1.412l-6-6a.993.993 0 0 0-1.414 0l-6.002 6z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
