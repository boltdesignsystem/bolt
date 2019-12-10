import { h } from '@bolt/core/renderers';

export const AssetData = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path d="M11 20h2V4h-2v16zm2-18h-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM19 20h2V9h-2v11zm2-13h-2c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM3 20h2v-6H3v6zm2-8H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z" />
      </g>
    </svg>
  );
};
