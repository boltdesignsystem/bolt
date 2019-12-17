import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CustomerOnboarding = ({
  bgColor,
  fgColor,
  size,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 30 30">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M5 9a7 7 0 117 7 7 7 0 01-7-7m11.4 7.8A9 9 0 103 9a8.92 8.92 0 004.6 7.8A12.14 12.14 0 000 28v2h2v-2a10 10 0 0116.9-7.2l.1-.8h1.9a12 12 0 00-4.5-3.2M29 24h-3v-3a1 1 0 00-2 0v3h-3a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2"
        data-name="Page-1"
      />
    </svg>
  );
};

Icons.set('customer-onboarding', CustomerOnboarding);
