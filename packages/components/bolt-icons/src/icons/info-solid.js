import { h } from '@bolt/core/renderers';

export const InfoSolid = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <title>{title}</title>
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
          d="M12.706 8.706A1.001 1.001 0 0112 9a1.003 1.003 0 01-1-1 1.007 1.007 0 011-1 1.003 1.003 0 011 1c0 .262-.107.518-.294.706zM13 16c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4z"
        />
      </g>
    </svg>
  );
};
