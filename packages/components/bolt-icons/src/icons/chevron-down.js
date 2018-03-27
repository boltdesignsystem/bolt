import { h } from '@bolt/core';

export const ChevronDown = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <path
        d="M20.946 8.938a1.34 1.34 0 0 0 0-1.884 1.339 1.339 0 0 0-1.884 0l-7.06 7.059-7.059-7.059a1.34 1.34 0 0 0-1.884 0 1.329 1.329 0 0 0 0 1.883l8 8a1.323 1.323 0 0 0 1.885 0l8.002-7.999z"
        fill={bgColor}
        fill-rule="nonzero"
      />
    </svg>
  );
};
