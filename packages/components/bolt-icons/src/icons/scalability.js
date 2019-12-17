import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Scalability = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 27v-1h2v1h6v-3h3V8h-3V5H8v3H5v6h1v2H5v8h3v3zm8-27h8v8h-3v16h3v8h-8v-3H8v3H0v-8h3V8H0V0h8v3h16zm2 5v1h4V2h-4v3zM2 2v4h4V2zm24 27v1h4v-4h-4v3zM2 26v4h4v-4H2zm6-12h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"
        data-name="path-1"
      />
    </svg>
  );
};

Icons.set('scalability', Scalability);
