import { h } from '@bolt/core/renderers';

export const FieldService = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 30a14 14 0 1114-14 14 14 0 01-14 14zm0-30a16 16 0 1016 16A16 16 0 0016 0zm0 6A10 10 0 006 16h2a8 8 0 0116 0h2A10 10 0 0016 6zm-2 19h2v-2h-2zm6.5-10.9a1 1 0 00-1.4.4L15.5 21H15a3 3 0 103 3 2.79 2.79 0 00-.8-2l3.6-6.5a1 1 0 00-.3-1.4z"
        data-name="Page-1"
      />
    </svg>
  );
};
