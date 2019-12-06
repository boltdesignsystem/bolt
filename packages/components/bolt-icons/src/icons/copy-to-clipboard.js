import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CopyToClipboard = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M19 20c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2h1c.55 0 1 .45 1 1v14zM9 3h6v2H9V2.998 3zm9 0h-1c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2H6C4.344 3 3 4.344 3 6v14c0 1.656 1.344 3 3 3h12c1.656 0 3-1.344 3-3V6c0-1.656-1.344-3-3-3z"
        />
        <path
          fill={bgColor}
          d="M13 13v-2c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z"
        />
      </g>
    </svg>
  );
};

Icons.set('copy-to-clipboard', CopyToClipboard);
