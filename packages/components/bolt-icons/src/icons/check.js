import { h } from '@bolt/core/renderers';

export const Check = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M19.292 6.29L8.998 16.584 4.703 12.29a1.004 1.004 0 00-1.412 0 1.002 1.002 0 000 1.413l5 5a.995.995 0 001.411 0l11-11a.99.99 0 000-1.413 1.001 1.001 0 00-1.41 0z"
        />
      </g>
    </svg>
  );
};
