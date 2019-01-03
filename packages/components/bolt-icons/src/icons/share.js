
  import { h } from '@bolt/core/renderers';

  export const Share = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg data-name="Layer 1" {...otherProps} viewBox="0 0 28.01 30.01"><path fill={bgColor} d="M22 18a6 6 0 0 0-4.77 2.4l-5.38-3.1A6.16 6.16 0 0 0 12 16a5.94 5.94 0 0 0-.29-1.75l6.41-3.71A5.93 5.93 0 0 0 22 12a6 6 0 1 0-6-6 6.38 6.38 0 0 0 .11 1.08L9.32 11A6 6 0 1 0 6 22a5.91 5.91 0 0 0 3.71-1.32L16 24.34A6 6 0 1 0 22 18zm0-14a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM6 18a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm16 8a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/></svg>
      )
};
