import { h } from '@bolt/core/renderers';

export const Close = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M13.414 11.998l5.296-5.294a1.005 1.005 0 000-1.413 1.005 1.005 0 00-1.414 0L12 10.585 6.704 5.291a1.006 1.006 0 00-1.413 0 1.004 1.004 0 000 1.413l5.296 5.294-5.296 5.295a.999.999 0 101.413 1.413l5.295-5.295 5.296 5.295a.999.999 0 001.413 0 1.005 1.005 0 000-1.413l-5.296-5.295h.002z"
      />
    </svg>
  );
};
