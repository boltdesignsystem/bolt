import { h } from '@bolt/core/renderers';

export const Facebook = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 16.62 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        d="M16.62.23v5.08h-3c-2.37 0-2.81 1.13-2.81 2.77v3.63h5.63l-.74 5.69h-4.91V32H4.91V17.4H0v-5.69h4.91V7.52c0-4.87 3-7.52 7.32-7.52a37.12 37.12 0 014.39.23z"
      />
    </svg>
  );
};
