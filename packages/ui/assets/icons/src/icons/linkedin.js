import { h } from '@bolt/core/renderers';

export const Linkedin = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 30.59">
      <path
        fill={bgColor}
        d="M7.27 9.94v20.64H.4V9.94zm.44-6.38a3.56 3.56 0 01-3.88 3.56A3.57 3.57 0 113.87 0a3.55 3.55 0 013.84 3.56zM32 18.75v11.83h-6.85v-11c0-2.77-1-4.67-3.48-4.67a3.75 3.75 0 00-3.52 2.5 5.12 5.12 0 00-.23 1.69v11.48h-6.86c.09-18.71 0-20.64 0-20.64h6.86v3h-.05a6.81 6.81 0 016.23-3.48c4.53 0 7.9 3 7.9 9.29z"
      />
    </svg>
  );
};
