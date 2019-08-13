import { h } from '@bolt/core/renderers';

export const ChevronUp = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 32 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M7.054 19.062a1.34 1.34 0 000 1.884 1.339 1.339 0 001.884 0l7.06-7.059 7.059 7.059a1.34 1.34 0 001.884 0 1.329 1.329 0 000-1.883l-8-8a1.323 1.323 0 00-1.885 0l-8.002 7.999z"
      />
    </svg>
  );
};
