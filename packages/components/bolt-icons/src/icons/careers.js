import { h } from '@bolt/core/renderers';

export const Careers = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 30">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M28 28H4a2 2 0 0 1-2-2V14h28v12a2 2 0 0 1-2 2zM4 6h24a2 2 0 0 1 2 2v4H2V8a2 2 0 0 1 2-2zm8-3a.94.94 0 0 1 1-1h6a.94.94 0 0 1 1 1v1h-8zm16 1h-6V1a.94.94 0 0 0-1-1H11a.94.94 0 0 0-1 1v3H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z"
        data-name="Fill-1"
      />
    </svg>
  );
};
