import { h } from '@bolt/core/renderers';

export const CloseSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
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
        <path
          fill={fgColor}
          d="M15.536 14.121l-2.122-2.12 2.122-2.122a1.003 1.003 0 000-1.414 1.002 1.002 0 00-1.415 0L12 10.586l-2.121-2.12a1 1 0 00-1.414 1.413L10.585 12l-2.12 2.121a1 1 0 001.414 1.414l2.12-2.12 2.122 2.12c.39.39 1.026.39 1.415 0a1.003 1.003 0 000-1.414"
        />
      </g>
    </svg>
  );
};
