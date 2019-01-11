import { h } from '@bolt/core/renderers';

export const Insurance = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M2 16a14 14 0 0 1 28 0zM16 0A16 16 0 0 0 0 16v2h14v8a6 6 0 0 0 12 0h-2a4 4 0 0 1-8 0v-8h16v-2A16 16 0 0 0 16 0z"
        data-name="Page-1"
      />
    </svg>
  );
};
