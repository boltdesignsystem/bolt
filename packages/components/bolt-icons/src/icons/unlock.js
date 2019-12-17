import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Unlock = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M20.001 20.006c0 .55-.45 1-1 1h-14c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7zm-1-10h-11V7c0-2.206 1.794-4 4-4a4.012 4.012 0 013.912 3.175.997.997 0 001.181.775c.537-.113.888-.644.775-1.181-.575-2.763-3.05-4.77-5.875-4.77-3.306 0-6 2.695-6 6.007v3H5c-1.656 0-3 1.344-3 3v7c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-7c0-1.656-1.344-3-3-3h.001z"
      />
    </svg>
  );
};

Icons.set('unlock', Unlock);
