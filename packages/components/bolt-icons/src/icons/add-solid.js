import { h } from '@bolt/core';

export const AddSolid = ({ bgColor, fgColor, size, ...otherProps }) => (
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
          d="M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1"
          fill={fgColor}
        />
      </g>
    </svg>
  );
