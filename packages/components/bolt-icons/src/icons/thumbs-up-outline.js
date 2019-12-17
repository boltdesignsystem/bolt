import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const ThumbsUpOutline = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 64 64">
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={bgColor}
        stroke-miterlimit="10"
        stroke-width="4"
      />
      <path
        fill={bgColor}
        d="M18 33.45v5.82a3.94 3.94 0 004 3.88h2V29.57h-2a3.94 3.94 0 00-4 3.88zM47.5 31.54a5.23 5.23 0 00.5-1.81 2.36 2.36 0 00-.8-1.73 2.61 2.61 0 00-1.88-.77h-8.63c1.54-4.65 2.3-7.74 2.3-9.28a1.93 1.93 0 00-1.21-1.87C37.61 16 36.33 16 36 16c-1 0-1.5.82-2 1.94q-.49 1.11-3 9.21l-5 4.32v9.74L39.73 44a3.24 3.24 0 002.92-1A3.54 3.54 0 0044 40.6c0-.55-.06-.92-.34-1.11.73 0 1.49-.64 2.3-1.92a5 5 0 00.88-3.66 6.51 6.51 0 00-.17-.76c-.06-.19-.12-.29-.21-.32h-.37c.6-.08 1.07-.5 1.41-1.29z"
      />
    </svg>
  );
};

Icons.set('thumbs-up-outline', ThumbsUpOutline);
