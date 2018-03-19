import { h } from '@bolt/core';

export const CustomerOnboarding = ({
  bgColor,
  fgColor,
  size,
  ...otherProps
}) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M6 10a7 7 0 1 1 13.999.001A7 7 0 0 1 6 10m11.403 7.846A8.993 8.993 0 0 0 22 10a9 9 0 0 0-18 0 8.993 8.993 0 0 0 4.598 7.846C4.15 19.602 1 23.93 1 29v2h2v-2c0-5.523 4.478-10 10-10a9.96 9.96 0 0 1 6.903 2.777l.097-.778h1.915a12.018 12.018 0 0 0-4.512-3.153M30 24.999h-3V22a1 1 0 1 0-2 0v2.999h-3A1 1 0 0 0 22 27h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 1 0 0-2.001"
        fill={bgColor}
        fill-rule="evenodd"
      />
    </svg>
  );
