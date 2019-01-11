import { h } from '@bolt/core/renderers';

export const Platform = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 28">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 0L0 8l16 8 16-8zM4 7.8L16 2l12 5.8L16 14zM27.5 14L16 20 4.5 14H0l16 8 16-8zm0 6L16 26 4.5 20H0l16 8 16-8z"
        data-name="Page-1"
      />
    </svg>
  );
};
