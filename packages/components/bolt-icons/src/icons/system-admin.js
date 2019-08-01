import { h } from '@bolt/core/renderers';

export const SystemAdmin = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M10.5 4.7a5.57 5.57 0 0111 0H29a3 3 0 013 3V29a3 3 0 01-3 3H3a3 3 0 01-3-3V7.7a3 3 0 013-3zm0 2H3a.94.94 0 00-1 1V29a.94.94 0 001 1h26a.94.94 0 001-1V7.7a.94.94 0 00-1-1h-7.5v2a.94.94 0 01-1 1h-9.1a.94.94 0 01-1-1v-2zm2 1h7.1V5.5A3.48 3.48 0 0016.1 2a3.54 3.54 0 00-3.5 3.5v2.2zm5.1 19.4H5.8a.94.94 0 01-1-1v-1.3a2.79 2.79 0 011.5-2.4l2.1-1.3a3.86 3.86 0 01-1.1-2.7l-.1-2.6a4.23 4.23 0 014.2-4.2h.6a4.14 4.14 0 014.2 4.1l-.1 2.7a3.86 3.86 0 01-1.1 2.7l2.1 1.3a2.79 2.79 0 011.5 2.4v1.3a1.08 1.08 0 01-1 1zm-10.8-2h9.7v-.3a.68.68 0 00-.4-.6.1.1 0 01-.1-.1L12.7 22a1.05 1.05 0 01-.5-.9 1 1 0 01.6-.9 2.3 2.3 0 001.3-2l.1-2.6a2.2 2.2 0 00-2.2-2.1h-.7a2.2 2.2 0 00-2.2 2.1l.1 2.6a2.19 2.19 0 001.3 2 1.06 1.06 0 010 1.8l-3.4 2.1a.1.1 0 00-.1.1.68.68 0 00-.4.6v.3zm17.5-9.2h-2.7a1 1 0 010-2h2.7a.94.94 0 011 1 1.08 1.08 0 01-1 1zm3 4.4h-5.7a1 1 0 010-2h5.7a.94.94 0 011 1 1 1 0 01-1 1zm0 4.4h-5.7a1 1 0 010-2h5.7a.94.94 0 011 1 1 1 0 01-1 1z"
        data-name="path-1"
      />
    </svg>
  );
};
