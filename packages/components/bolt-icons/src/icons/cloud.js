import { h } from '@bolt/core';

export const Cloud = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M23 25.974V26H9a7 7 0 0 1 0-14c.027 0 .052.004.079.004C9.563 8.61 12.473 5.999 16 5.999a7 7 0 0 1 6.709 5.01C26.753 11.123 30 14.43 30 18.5c0 3.974-3.092 7.217-7 7.475M24.125 9.15c-1.444-3.04-4.534-5.15-8.125-5.15-3.969 0-7.332 2.574-8.528 6.14C3.231 10.866 0 14.55 0 18.999a9 9 0 0 0 9 9h14v-.024c5.013-.262 9-4.398 9-9.476 0-4.691-3.404-8.578-7.875-9.35"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
