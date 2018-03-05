import { h } from '@bolt/core';

export const InfoSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path />
        <circle
          cx="11"
          cy="11"
          r="11"
          fill={bgColor}
          transform="translate(1 1)"
        />
        <path
          d="M12.706 8.706A1.001 1.001 0 0 1 12 9a1.003 1.003 0 0 1-1-1 1.007 1.007 0 0 1 1-1 1.003 1.003 0 0 1 1 1c0 .262-.107.518-.294.706zM13 16c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4z"
          fill={fgColor}
        />
      </g>
    </svg>
  );
};
