import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Government = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 30 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 17v10a1 1 0 002 0V17a1 1 0 00-2 0m-4 0v10a1 1 0 002 0V17a1 1 0 00-2 0M2 17v10a.94.94 0 001 1 .94.94 0 001-1V17a.94.94 0 00-1-1 .94.94 0 00-1 1m27 13H1a1 1 0 000 2h28a1 1 0 000-2M6 17v10a.94.94 0 001 1 .94.94 0 001-1V17a.94.94 0 00-1-1 .94.94 0 00-1 1m-5-3h28a1 1 0 000-2H1a1 1 0 000 2m21 3v10a1 1 0 002 0V17a1 1 0 00-2 0M15 6a5 5 0 014.9 4h2A6.89 6.89 0 0016 4.1V1a1 1 0 00-2 0v3.1A6.79 6.79 0 008.1 10h2A5 5 0 0115 6m11 11v10a1 1 0 002 0V17a1 1 0 00-2 0"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('government', Government);
