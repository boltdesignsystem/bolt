import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Communications = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 28.6">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 13a3 3 0 103 3 3 3 0 00-3-3m0-7.4a10.34 10.34 0 00-7 18l1-1.8A8.25 8.25 0 017.6 16a8.4 8.4 0 0116.8 0 8.25 8.25 0 01-2.4 5.8l1 1.8a10.34 10.34 0 00-7-18M32 16a16 16 0 01-6.1 12.6l-1-1.8A13.67 13.67 0 0030 16a14 14 0 00-28 0 13.81 13.81 0 005.1 10.8l-1 1.8A16 16 0 1132 16"
        data-name="Fill-1"
      />
    </svg>
  );
};

Icons.set('communications', Communications);
