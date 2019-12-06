import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Manufacturing = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M24 0v4h-4V0h-2v4h-4V0h-2v4H8V0H6v4H4v2H0v2h4v4H0v2h4v4H0v2h4v4H0v2h4v2h2v4h2v-4h4v4h2v-4h4v4h2v-4h4v4h2v-4h2v-2h4v-2h-4v-4h4v-2h-4v-4h4v-2h-4V8h4V6h-4V4h-2V0zM6 24V6h20v20H6z"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('manufacturing', Manufacturing);
