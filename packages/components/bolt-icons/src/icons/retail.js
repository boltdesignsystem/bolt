import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Retail = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 30 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M28 29a.94.94 0 01-1 1H16V11.4l6 2.6a2 2 0 002-2V7h3a.94.94 0 011 1zM22 4.4V11a.94.94 0 01-1 1l-4.4-2.2zM8.6 2.3l-.1-.1A.76.76 0 019 2h12a.76.76 0 01.5.2c-.1 0-.1.1-.2.1L15 8.6zM14 30H3a.94.94 0 01-1-1V8a.94.94 0 011-1h3v5a2 2 0 002 2l6-2.6zM8 4.4l5.4 5.4L9 12a.94.94 0 01-1-1zM28 5h-4V2a2 2 0 00-2-2H8a2 2 0 00-2 2v3H2a2 2 0 00-2 2v23a2 2 0 002 2h26a2 2 0 002-2V7a2 2 0 00-2-2zM18 20h8v-2h-8z"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('retail', Retail);
