import { h } from '@bolt/core/renderers';

export const WorkforceIntelligence = ({
  bgColor,
  fgColor,
  size,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M30 18h-4.7l2 2H30v3c0 .7-.3 1-1 1H3c-.7 0-1-.3-1-1v-3h7.7a9 9 0 0 1-1.9-2H2V3c0-.7.3-1 1-1h26c.7 0 1 .3 1 1zM12 30h8v-4h-8zM31.4.6A1.68 1.68 0 0 0 30 0H2A1.68 1.68 0 0 0 .6.6 2.25 2.25 0 0 0 0 2v22a1.68 1.68 0 0 0 .6 1.4A2.25 2.25 0 0 0 2 26h8v4H8v2h16v-2h-2v-4h8a1.68 1.68 0 0 0 1.4-.6A2.25 2.25 0 0 0 32 24V2a1.68 1.68 0 0 0-.6-1.4z"
        data-name="Page-1"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M15.5 18a5.5 5.5 0 1 1 5.5-5.5 5.42 5.42 0 0 1-5.5 5.5m6-.9a7.34 7.34 0 0 0 1.6-4.6A7.64 7.64 0 0 0 15.5 5a7.5 7.5 0 1 0 4.6 13.4l4.2 4.2a1.08 1.08 0 0 0 .7.3.91.91 0 0 0 .7-.3 1 1 0 0 0 0-1.4z"
        data-name="Fill-1"
      />
    </svg>
  );
};
