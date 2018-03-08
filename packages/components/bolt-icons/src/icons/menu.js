import { h } from '@bolt/core';

export const Menu = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M21 11H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M3 6h18c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1M21 18H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1" />
        </g>
      </g>
    </svg>
  );
};
