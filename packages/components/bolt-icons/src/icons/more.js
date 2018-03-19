import { h } from '@bolt/core';

export const More = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M14.07 12a2 2 0 1 1-4.002-.001 2 2 0 0 1 4.001.001M6 12A2 2 0 1 1 2 11.999 2 2 0 0 1 6 12M22.139 12a2 2 0 1 1-4.002-.001A2 2 0 0 1 22.14 12" />
        </g>
      </g>
    </svg>
  );
