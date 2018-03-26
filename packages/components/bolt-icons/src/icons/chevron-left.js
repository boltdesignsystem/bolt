import { h } from '@bolt/core';

export const ChevronLeft = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M18.296 22.71a1.005 1.005 0 0 0 1.413 0 1.004 1.004 0 0 0 0-1.413l-5.294-5.295 5.294-5.295a1.005 1.005 0 0 0 0-1.413.998.998 0 0 0-1.412 0l-6 6a.993.993 0 0 0 0 1.414l6 6.002z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
