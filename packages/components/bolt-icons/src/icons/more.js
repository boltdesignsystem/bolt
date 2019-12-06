import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const More = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M14.07 12a2 2 0 11-4.002-.001 2 2 0 014.001.001M6 12A2 2 0 112 11.999 2 2 0 016 12M22.139 12a2 2 0 11-4.002-.001A2 2 0 0122.14 12" />
        </g>
      </g>
    </svg>
  );
};

Icons.set('more', More);
