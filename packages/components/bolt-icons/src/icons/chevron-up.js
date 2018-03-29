import { h } from '@bolt/core';

export const ChevronUp = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M7.054 19.062a1.34 1.34 0 0 0 0 1.884 1.339 1.339 0 0 0 1.884 0l7.06-7.059 7.059 7.059a1.34 1.34 0 0 0 1.884 0 1.329 1.329 0 0 0 0-1.883l-8-8a1.323 1.323 0 0 0-1.885 0l-8.002 7.999z"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
};
