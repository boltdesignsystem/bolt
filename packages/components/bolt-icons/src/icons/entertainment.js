import { h } from '@bolt/core/renderers';

export const Entertainment = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 26">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M24.5 24h-17a1 1 0 000 2h17a1 1 0 000-2"
        data-name="Fill-4"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M2 3a.94.94 0 011-1h26a.94.94 0 011 1v17H2zm28-3H2a2 2 0 00-2 2v19a2 2 0 002 2h28a2 2 0 002-2V2a2 2 0 00-2-2z"
        data-name="Fill-1"
      />
    </svg>
  );
};
