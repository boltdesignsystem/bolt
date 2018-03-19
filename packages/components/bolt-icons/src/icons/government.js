import { h } from '@bolt/core';

export const Government = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M17 17v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0m-4 0v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0M3 17v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0m27 13H2a1 1 0 0 0 0 2h28a1 1 0 0 0 0-2M7 17v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0m-5-3h28a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2m21 3v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0M16 6a5.001 5.001 0 0 1 4.9 4h2.02A6.996 6.996 0 0 0 17 4.078V1a1 1 0 0 0-2 0v3.078A6.996 6.996 0 0 0 9.08 10h2.02A5.002 5.002 0 0 1 16 6m11 11v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
