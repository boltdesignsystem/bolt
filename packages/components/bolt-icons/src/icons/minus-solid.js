import { h } from '@bolt/core';

export const MinusSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill={bgColor}
        />
        <path
          d="M16 11H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1"
          fill={fgColor}
        />
      </g>
    </svg>
  );
};
