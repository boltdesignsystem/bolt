import { h } from '@bolt/core/renderers';

export const Energy = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 26.08 32.1">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M3.84 15h5.9a.91.91 0 01.8.4.78.78 0 01.2.8l-1.7 12.3 13.2-11.4h-5.9a.91.91 0 01-.8-.4.78.78 0 01-.2-.8l1.7-12.3zm3.9 17.1a.9.9 0 01-.5-.1.88.88 0 01-.5-1l1.9-13.8h-7.6a1.2 1.2 0 01-1-.7 1.07 1.07 0 01.3-1.1l17.3-15a1.12 1.12 0 011.3-.3.88.88 0 01.5 1L17.54 15h7.5a1.2 1.2 0 011 .7 1.07 1.07 0 01-.3 1.1l-17.3 15a1.08 1.08 0 01-.7.3z"
        data-name="Fill-1"
      />
    </svg>
  );
};
