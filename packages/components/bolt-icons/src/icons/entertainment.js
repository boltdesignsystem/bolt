import { h } from '@bolt/core';

export const Entertainment = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <g fill={bgColor} fill-rule="evenodd">
        <path d="M24.5 27h-17a1 1 0 1 0 0 2h17a1 1 0 1 0 0-2M2 6a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v17H2V6zm28-3H2a2 2 0 0 0-2 2v19a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      </g>
    </svg>
  );
};
