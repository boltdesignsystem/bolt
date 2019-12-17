import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Documentation = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 28 30">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M23 18H9a1 1 0 000 2h14a1 1 0 000-2zm3 5a.94.94 0 01-1 1H7a.94.94 0 01-1-1V3a.94.94 0 011-1h18a.94.94 0 011 1zm0-23H6a2 2 0 00-2 2v22a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2zm-3 12H9a1 1 0 000 2h14a1 1 0 000-2zM9 8h8a.94.94 0 001-1 .94.94 0 00-1-1H9a.94.94 0 00-1 1 .94.94 0 001 1zM2 4a2 2 0 00-2 2v22a2 2 0 002 2h22a2 2 0 002-2H2z"
        data-name="path-1"
      />
    </svg>
  );
};

Icons.set('documentation', Documentation);
