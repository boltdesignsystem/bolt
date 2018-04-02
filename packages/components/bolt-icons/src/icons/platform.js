import { h } from '@bolt/core';

export const Platform = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M16 2L0 10l16 8 16-8-16-8zM3.999 9.777L16 3.999l12 5.778-12 6.222L3.999 9.777zm23.537 6.222L16 22 4.465 15.999H0L16 24l16-8.001h-4.464zm0 6.001L16 28 4.465 22H0l16 8 16-8h-4.464z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
