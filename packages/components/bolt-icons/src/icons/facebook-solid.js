import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const FacebookSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        d="M26 0a6 6 0 016 6v20a6 6 0 01-6 6h-3.92V19.6h4.15l.62-4.83h-4.77v-3.08c0-1.4.38-2.34 2.4-2.34h2.54V5a33.75 33.75 0 00-3.71-.19c-3.69 0-6.23 2.25-6.23 6.38v3.56h-4.16v4.85h4.16V32H6a6 6 0 01-6-6V6a6 6 0 016-6z"
      />
    </svg>
  );
};

Icons.set('facebook-solid', FacebookSolid);
