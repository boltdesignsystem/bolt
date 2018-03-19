import { h } from '@bolt/core';

export const AppDevelopment = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M29 9H3V4a1 1 0 0 1 1-1h24a1 1 0 0 1 1 1v5zm0 19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11h26v17zm1-27H2a1 1 0 0 0-1 .999V30a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V1.999A1 1 0 0 0 30 1zM9 7h2V5H9v2zm4 0h2V5h-2v2zM5 7h2V5H5v2zm10 18h2v-4h4v-2h-4v-4h-2v4h-4v2h4v4z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
