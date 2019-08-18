import { h } from '@bolt/core/renderers';

export const Java = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 24.38">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M23.5 20.88a.91.91 0 01-.7-.3 1 1 0 010-1.4l6.8-6.8-6.8-6.8a1 1 0 111.4-1.4l7.5 7.5a1 1 0 010 1.4l-7.5 7.5a1.08 1.08 0 01-.7.3zm-15 0a.91.91 0 01-.7-.3l-7.5-7.5a1 1 0 010-1.4l7.5-7.5a1 1 0 111.4 1.4l-6.8 6.8 6.8 6.8a1 1 0 010 1.4.91.91 0 01-.7.3zm2.3 3.5a.6.6 0 01-.4-.1 1 1 0 01-.5-1.3L20.2.58a1 1 0 011.8.8l-10.3 22.4a.87.87 0 01-.9.6z"
        data-name="path-1"
      />
    </svg>
  );
};
