import { h } from '@bolt/core';

export const ChevronLeft = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <path
        d="M15.062 20.946a1.34 1.34 0 0 0 1.884 0 1.339 1.339 0 0 0 0-1.884l-7.059-7.06 7.059-7.059a1.34 1.34 0 0 0 0-1.884 1.329 1.329 0 0 0-1.883 0l-8 8a1.323 1.323 0 0 0 0 1.885l7.999 8.002z"
        fill={bgColor}
        fill-rule="nonzero"
      />
    </svg>
  );
};
