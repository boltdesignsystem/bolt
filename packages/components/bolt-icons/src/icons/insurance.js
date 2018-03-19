import { h } from '@bolt/core';

export const Insurance = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M2 16.001c0-7.731 6.269-14 14-14 7.732 0 14 6.269 14 14H2zm14-16c-8.836 0-16 7.164-16 16v2h14v8a6 6 0 0 0 12 0h-2a4 4 0 1 1-8 0v-8H32v-2c0-8.836-7.163-16-16-16z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
