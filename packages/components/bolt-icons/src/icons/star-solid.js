import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const StarSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 40 40">
      <path d="M27.64 24.49L40 15.51H24.72L20 .98l-4.72 14.53H0l12.36 8.98-4.72 14.53L20 30.04l12.36 8.98-4.72-14.53z" />
    </svg>
  );
};

Icons.set('star-solid', StarSolid);
