import { h } from '@bolt/core/renderers';

export const Hospitality = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M2 22l2-7v1h24v-1l2 7zm28 6H2v-4h28zM6 8h4v1a.94.94 0 001 1h10a.94.94 0 001-1V8h4l1.7 6H4.3zm6 0h8V6h-8zM6 3a.94.94 0 011-1h18a.94.94 0 011 1v2a.94.94 0 01-1 1h-3V5a.94.94 0 00-1-1H11a.94.94 0 00-1 1v1H7a.94.94 0 01-1-1zm25.6 19L28 6V2a2 2 0 00-2-2H6a2 2 0 00-2 2v4L.4 22H0v8h2v2h2v-2h24v2h2v-2h2v-8z"
        data-name="Page-1"
      />
    </svg>
  );
};
