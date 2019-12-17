import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Support = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M23.7 18a6.82 6.82 0 000-4h6.1a13.55 13.55 0 01.2 2 13.55 13.55 0 01-.2 2zM20 29.4v-6.5a8.06 8.06 0 002.9-2.9h6.5a13.87 13.87 0 01-9.4 9.4zm-2 .4a13.55 13.55 0 01-2 .2 13.55 13.55 0 01-2-.2v-6.1a6.82 6.82 0 004 0zm-6-.4A13.87 13.87 0 012.6 20h6.5a8.06 8.06 0 002.9 2.9zM2 16a13.55 13.55 0 01.2-2h6.1a6.82 6.82 0 000 4H2.2a13.55 13.55 0 01-.2-2zM12 2.6v6.5A8.06 8.06 0 009.1 12H2.6A13.87 13.87 0 0112 2.6zm2-.4a13.55 13.55 0 012-.2 13.55 13.55 0 012 .2v6.1a6.82 6.82 0 00-4 0zM22 16a6 6 0 11-6-6 6 6 0 016 6zM20 2.6a13.87 13.87 0 019.4 9.4h-6.5A8.06 8.06 0 0020 9.1zM16 0a16 16 0 1016 16A16 16 0 0016 0z"
        data-name="path-1"
      />
    </svg>
  );
};

Icons.set('support', Support);
