import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const BrandOperations = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16.9 19.8l8.6-11.2-11.2 8.6a1.82 1.82 0 00-.1 2.7 1.91 1.91 0 002.7-.1zM19.4 4a11.8 11.8 0 00-2-.4l-.2 1.9 1.7.3zm-5.5 1.7l-.4-1.9a6 6 0 00-1.9.6l.7 1.8a4.28 4.28 0 011.6-.5zM24.6 7A10.1 10.1 0 0023 5.7l-1 1.6a6.89 6.89 0 011.3 1.1zm-15.3.9L8.1 6.4a9.27 9.27 0 00-1.4 1.4L8.1 9a12 12 0 011.2-1.1zM27.8 12a9.82 9.82 0 00-.8-1.8l-1.7.9a7.74 7.74 0 01.7 1.6zm-21.5-.1l-1.8-.7a7 7 0 00-.6 1.9l1.9.5a6.87 6.87 0 01.5-1.7zM28.5 16h-1.9a9.7 9.7 0 01-.1 1.7l1.9.3c0-.7.1-1.3.1-2zM5.8 18.5c-.1-.5-.2-1.1-.3-1.7l-1.9.2c.1.7.2 1.3.3 2zM27 21.8l-1.7-.9c-.3.5-.6 1-.9 1.4l1.5 1.2a8.16 8.16 0 001.1-1.7zM8.1 23a7.1 7.1 0 01-1-1.4l-1.6 1c.4.6.8 1.1 1.2 1.6zM16 2a14 14 0 1014 14A14 14 0 0016 2zm0 30a16 16 0 1116-16 16 16 0 01-16 16z"
        data-name="path-1"
      />
    </svg>
  );
};

Icons.set('brand-operations', BrandOperations);
