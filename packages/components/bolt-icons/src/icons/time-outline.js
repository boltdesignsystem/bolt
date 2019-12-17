import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const TimeOutline = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 64 64">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M32 48a16 16 0 1116-16 16 16 0 01-16 16zm2-16V22a2 2 0 00-4 0v12a2 2 0 002 2h6a2 2 0 000-4z"
      />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={bgColor}
        stroke-width="4"
      />
    </svg>
  );
};

Icons.set('time-outline', TimeOutline);
