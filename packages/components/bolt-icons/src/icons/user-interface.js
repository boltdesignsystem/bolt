import { h } from '@bolt/core/renderers';

export const UserInterface = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M20 26h6v-8h-6zm-2 2h10V16H18zM6 10h20V6H6zm-2 2h24V4H4zM30 0H2a2 2 0 00-2 2v28a2 2 0 002 2h28a2 2 0 002-2V2a2 2 0 00-2-2zm0 29a.94.94 0 01-1 1H3a.94.94 0 01-1-1V3a.94.94 0 011-1h26a.94.94 0 011 1zM6 26h6v-8H6zm-2 2h10V16H4z"
        data-name="path-1"
      />
    </svg>
  );
};
