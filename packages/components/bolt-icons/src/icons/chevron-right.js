import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const ChevronRight = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M12.938 7.054a1.34 1.34 0 00-1.884 0 1.339 1.339 0 000 1.884l7.059 7.06-7.059 7.059a1.34 1.34 0 000 1.884 1.329 1.329 0 001.883 0l8-8a1.323 1.323 0 000-1.885l-7.999-8.002z"
      />
    </svg>
  );
};

Icons.set('chevron-right', ChevronRight);
