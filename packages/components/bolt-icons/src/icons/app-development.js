import { h } from '@bolt/core/renderers';

export const AppDevelopment = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 30 30">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M28 8H2V3a.94.94 0 011-1h24a.94.94 0 011 1zm0 19a.94.94 0 01-1 1H3a.94.94 0 01-1-1V10h26zm1-27H1a.94.94 0 00-1 1v28a.94.94 0 001 1h28a.94.94 0 001-1V1a.94.94 0 00-1-1zM8 6h2V4H8zm4 0h2V4h-2zM4 6h2V4H4zm10 18h2v-4h4v-2h-4v-4h-2v4h-4v2h4z"
        data-name="Page-1"
      />
    </svg>
  );
};
