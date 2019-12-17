import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const LifeSciences = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 26 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M4.2 24.8h10.9v-2H5.8a39 39 0 013.8-3.3l-1.2-1.6C4.3 21 0 25.1 0 32h2a8.08 8.08 0 01.1-1.6v.1h16v-2H2.5a14 14 0 011.7-3.7"
        data-name="Fill-1"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M21.7 7.3H11.1v2H20a29.24 29.24 0 01-3.8 3.2l1.2 1.6C21.7 11.1 26 7 26 0h-2a8.08 8.08 0 01-.1 1.6H8.1v2h15.4a11.58 11.58 0 01-1.8 3.7"
        data-name="Fill-3"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M13.6 15.2C7.6 11.2 2 7.5 2 0H0c0 8.5 6.3 12.8 12.4 16.8S24 24.5 24 32h2c0-8.5-6.3-12.8-12.4-16.8"
        data-name="Fill-6"
      />
    </svg>
  );
};

Icons.set('life-sciences', LifeSciences);
