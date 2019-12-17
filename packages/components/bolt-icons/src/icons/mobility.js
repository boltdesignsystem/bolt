import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Mobility = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 20 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M8.6 27.4a1.72 1.72 0 01-.2-2.4 1.7 1.7 0 012.3-.7 1.71 1.71 0 011.2 2.1c-.1 1-.7 1.5-1.8 1.6a1.75 1.75 0 01-1.5-.6zM18 22H2v6a1.68 1.68 0 00.6 1.4A2.25 2.25 0 004 30h12a1.68 1.68 0 001.4-.6A2.25 2.25 0 0018 28zm0-18a1.68 1.68 0 00-.6-1.4A2.25 2.25 0 0016 2H4a1.68 1.68 0 00-1.4.6A2.25 2.25 0 002 4v16h16V4zm2 0v24a4.1 4.1 0 01-4 4H4a3.78 3.78 0 01-2.8-1.2A3.78 3.78 0 010 28V4a3.78 3.78 0 011.2-2.8A3.78 3.78 0 014 0h12a3.78 3.78 0 012.8 1.2A3.78 3.78 0 0120 4z"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('mobility', Mobility);
