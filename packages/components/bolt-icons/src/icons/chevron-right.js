import { h } from '@bolt/core';

export const ChevronRight = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M13.704 9.29a1.005 1.005 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.413l5.294 5.295-5.294 5.295a1.005 1.005 0 0 0 0 1.413.998.998 0 0 0 1.412 0l6-6a.993.993 0 0 0 0-1.414l-6-6.002z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
