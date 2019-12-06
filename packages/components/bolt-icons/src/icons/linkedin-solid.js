import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const LinkedinSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        d="M4.94 26.79h4.81V12.33H4.94zm5.12-18.92a2.5 2.5 0 00-2.69-2.5 2.51 2.51 0 10-.06 5 2.51 2.51 0 002.75-2.5zm12.19 18.92h4.81V18.5c0-4.44-2.37-6.5-5.54-6.5a4.74 4.74 0 00-4.35 2.44v-2.11H12.4s.06 1.36 0 14.46h4.81v-8.08a3.51 3.51 0 01.14-1.17 2.67 2.67 0 012.48-1.75c1.73 0 2.42 1.31 2.42 3.27v7.73zM32 6v20a6 6 0 01-6 6H6a6 6 0 01-6-6V6a6 6 0 016-6h20a6 6 0 016 6z"
      />
    </svg>
  );
};

Icons.set('linkedin-solid', LinkedinSolid);
