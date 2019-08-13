import { h } from '@bolt/core/renderers';

export const MarketingGray = ({
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
        d="M30.3 8.8H28a13.68 13.68 0 012 7.2A14 14 0 1116 2a14.48 14.48 0 017.4 2.1V1.8A15.29 15.29 0 0016 0a16 16 0 1016 16 15.6 15.6 0 00-1.7-7.2"
        data-name="Fill-1"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 8a8.15 8.15 0 013.1.6l1.5-1.5A10.39 10.39 0 0016 6a10 10 0 1010 10 9.39 9.39 0 00-1.2-4.7l-1.5 1.5A8.76 8.76 0 0124 16a8 8 0 11-8-8"
        data-name="Fill-4"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M16 16.5a.5.5 0 11.5-.5.47.47 0 01-.5.5zm.9-2.8a2.92 2.92 0 00-.9-.2 2.5 2.5 0 102.5 2.5 2.39 2.39 0 00-.2-.9L25.4 8H30V6h-2.6l1.8-1.8-1.4-1.4L26 4.5V2h-2v4.6z"
        data-name="Fill-6"
      />
    </svg>
  );
};
