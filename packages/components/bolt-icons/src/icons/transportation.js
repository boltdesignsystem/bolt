import { h } from '@bolt/core/renderers';

export const Transportation = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 28 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M10 6h8V4h-8zm16 2H2V3a.94.94 0 0 1 1-1h22a.94.94 0 0 1 1 1zm0 11v1H2V10h24zm-2 7a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm-3.4 0H7.4a4.66 4.66 0 0 0 .6-2 3.61 3.61 0 0 0-.6-2h13.1a4.66 4.66 0 0 0-.6 2 4.79 4.79 0 0 0 .7 2zM4 26a2 2 0 1 1 2-2 2 2 0 0 1-2 2zM26 0H2a2 2 0 0 0-2 2v22a3.76 3.76 0 0 0 2 3.4V31a.94.94 0 0 0 1 1 .94.94 0 0 0 1-1v-3h20v3a1 1 0 0 0 2 0v-3.6a4 4 0 0 0 2-3.4V2a2 2 0 0 0-2-2z"
        data-name="Page-1"
      />
    </svg>
  );
};
