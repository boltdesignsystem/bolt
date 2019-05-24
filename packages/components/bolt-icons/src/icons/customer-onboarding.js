import { h } from '@bolt/core/renderers';

export const CustomerOnboarding = ({
  bgColor,
  fgColor,
  size,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 30 30">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M5 9a7 7 0 1 1 7 7 7 7 0 0 1-7-7m11.4 7.8A9 9 0 1 0 3 9a8.92 8.92 0 0 0 4.6 7.8A12.14 12.14 0 0 0 0 28v2h2v-2a10 10 0 0 1 16.9-7.2l.1-.8h1.9a12 12 0 0 0-4.5-3.2M29 24h-3v-3a1 1 0 0 0-2 0v3h-3a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2"
        data-name="Page-1"
      />
    </svg>
  );
};
