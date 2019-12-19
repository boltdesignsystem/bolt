import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core-v3.x/renderers';

export const Heart = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg baseProfile="full" {...otherProps} viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.317C5.401 15.36 2 12.273 2 8.498c0-3.084 2.415-5.5 5.5-5.5 1.74 0 3.408.808 4.5 2.086 1.09-1.278 2.758-2.086 4.5-2.086 3.083 0 5.5 2.416 5.5 5.5 0 3.776-3.403 6.863-8.552 11.535L12 21.35z" />
    </svg>
  );
};

Icons.set('heart', Heart);
