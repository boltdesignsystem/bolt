import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CloseCircled = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor}>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.8C6 22.8 1.2 18 1.2 12 1.2 6 6 1.2 12 1.2S22.8 6 22.8 12c0 6-4.8 10.8-10.8 10.8z" />
        <path d="M17.1 6.9c-.2-.2-.6-.2-.8 0L12 11.2 7.7 6.9c-.2-.2-.6-.2-.8 0-.2.2-.2.6 0 .8l4.3 4.3-4.3 4.3c-.2.2-.2.6 0 .8.1.1.3.2.4.2.2 0 .3-.1.4-.2l4.3-4.3 4.3 4.3c.1.1.3.2.4.2.2 0 .3-.1.4-.2.2-.2.2-.6 0-.8L12.8 12l4.3-4.3c.2-.2.2-.6 0-.8z" />
      </g>
    </svg>
  );
};

Icons.set('close-circled', CloseCircled);
