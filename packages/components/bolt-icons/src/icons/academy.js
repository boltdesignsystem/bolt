import { h } from '@bolt/core/renderers';

export const Academy = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 28 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M14 32a.37.37 0 01-.3-.1C13.5 31.9 0 26.8 0 11.7V.9A.92.92 0 011 0h26a1 1 0 011 .9v10.8c0 15.1-13.5 20.2-13.7 20.2a.37.37 0 01-.3.1zM1.9 1.9v9.8C1.9 24.2 12 29.2 14 30c2-.9 12.1-5.7 12.1-18.3V1.9zm10.5 16.6a.91.91 0 01-.7-.3L8 14.5a.85.85 0 010-1.3 1 1 0 011.4 0l3 3 6.3-6.1a1 1 0 011.4 0 .85.85 0 010 1.3l-7 6.8a1.08 1.08 0 01-.7.3z"
      />
    </svg>
  );
};
