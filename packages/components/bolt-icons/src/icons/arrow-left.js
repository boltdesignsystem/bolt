import { h } from '@bolt/core';

export const ArrowLeft = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 18 14">
      <path
        d="M.083 7.378a1.181 1.181 0 0 1-.069-.318v-.105a.951.951 0 0 1 .069-.33c.044-.112.1-.193.162-.274.03-.036.043-.049.055-.06l6-6a1.005 1.005 0 0 1 1.413 0 1.004 1.004 0 0 1 0 1.412L3.419 5.997H17c.55 0 1 .45 1 1s-.45 1-1 1H3.413l4.294 4.294a1.005 1.005 0 0 1 0 1.413.999.999 0 0 1-1.412 0L.301 7.71C.282 7.685.27 7.666.257 7.654a1.128 1.128 0 0 1-.174-.276z"
        fill={bgColor}
        fill-rule="nonzero"
      />
    </svg>
  );
