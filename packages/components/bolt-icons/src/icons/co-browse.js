import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CoBrowse = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M30 12H8v-2a2 2 0 012-2h18a2 2 0 012 2zm0 16a2 2 0 01-2 2H10a2 2 0 01-2-2V14h22zM28 6H10a4 4 0 00-4 4v18a4 4 0 004 4h18a4 4 0 004-4V10a4 4 0 00-4-4zM4 2h18a2 2 0 012 2h2a4 4 0 00-4-4H4a4 4 0 00-4 4v18a4 4 0 004 4v-2a2 2 0 01-2-2V8h2V6H2V4a2 2 0 012-2z"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('co-browse', CoBrowse);
