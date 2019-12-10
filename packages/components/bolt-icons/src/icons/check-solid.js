import { h } from '@bolt/core/renderers';

export const CheckSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <circle
          cx="11"
          cy="11"
          r="11"
          fill={bgColor}
          transform="translate(1 1)"
        />
        <path d="M6 6h12v12H6z" />
        <path
          fill={fgColor}
          stroke={fgColor}
          d="M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 00-.784 0 .557.557 0 000 .785l2.777 2.778a.553.553 0 00.784 0l6.11-6.11a.55.55 0 000-.786.556.556 0 00-.783 0z"
        />
      </g>
    </svg>
  );
};
