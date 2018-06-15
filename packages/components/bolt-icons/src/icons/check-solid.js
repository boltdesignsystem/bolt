import { h } from '@bolt/core';

export const CheckSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill={bgColor}
        />
        <path d="M6 6h12v12H6z" />
        <path
          d="M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"
          stroke={fgColor}
          fill={fgColor}
        />
      </g>
    </svg>
  );
};
