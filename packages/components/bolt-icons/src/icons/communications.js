import { h } from '@bolt/core/renderers';

export const Communications = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 28.6">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 13a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0-7.4a10.34 10.34 0 0 0-7 18l1-1.8A8.25 8.25 0 0 1 7.6 16a8.4 8.4 0 0 1 16.8 0 8.25 8.25 0 0 1-2.4 5.8l1 1.8a10.34 10.34 0 0 0-7-18M32 16a16 16 0 0 1-6.1 12.6l-1-1.8A13.67 13.67 0 0 0 30 16a14 14 0 0 0-28 0 13.81 13.81 0 0 0 5.1 10.8l-1 1.8A16 16 0 1 1 32 16"
        data-name="Fill-1"
      />
    </svg>
  );
};
