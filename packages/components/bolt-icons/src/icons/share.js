import { h } from '@bolt/core/renderers';

export const Share = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 28.01 30.01">
      <title>{title}</title>
      <path
        fill={bgColor}
        d="M22 18a6 6 0 00-4.77 2.4l-5.38-3.1A6.16 6.16 0 0012 16a5.94 5.94 0 00-.29-1.75l6.41-3.71A5.93 5.93 0 0022 12a6 6 0 10-6-6 6.38 6.38 0 00.11 1.08L9.32 11A6 6 0 106 22a5.91 5.91 0 003.71-1.32L16 24.34A6 6 0 1022 18zm0-14a2 2 0 11-2 2 2 2 0 012-2zM6 18a2 2 0 112-2 2 2 0 01-2 2zm16 8a2 2 0 112-2 2 2 0 01-2 2z"
      />
    </svg>
  );
};
