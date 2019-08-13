import { h } from '@bolt/core/renderers';

export const Marketing = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 31.9 28">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M30 21a.94.94 0 01-1 1l-3-.5v-17l3-.5a.94.94 0 011 1zM3 18a.94.94 0 01-1-1V9a.94.94 0 011-1l21-3.2v16.5zm11 7.8l-6-1.5v-3.4l6 .9zM30 0v2L2 6a2 2 0 00-2 2v10a2 2 0 002 2l4 .6V25a.94.94 0 001 1l7.7 2h.5a1 1 0 00.7-.9v-5l14 2v2h2V0z"
        data-name="Page-1"
      />
    </svg>
  );
};
