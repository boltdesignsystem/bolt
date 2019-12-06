import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const TwitterSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        d="M26.67 10a9 9 0 01-2.52.71 4.43 4.43 0 001.93-2.44 8.49 8.49 0 01-2.79 1.06 4.38 4.38 0 00-7.56 3 4.09 4.09 0 00.1 1 12.4 12.4 0 01-9-4.58A4.51 4.51 0 006.19 11a4.32 4.32 0 001.89 3.65A5.27 5.27 0 016 14.1v.05a4.46 4.46 0 003.6 4.29 3.73 3.73 0 01-1.06.16 5.56 5.56 0 01-.81-.08 4.39 4.39 0 004.08 3 8.79 8.79 0 01-5.44 1.88 8.93 8.93 0 01-1-.07A12.46 12.46 0 0024.5 12.87a5.33 5.33 0 000-.56A8.46 8.46 0 0026.67 10zM32 6v20a6 6 0 01-6 6H6a6 6 0 01-6-6V6a6 6 0 016-6h20a6 6 0 016 6z"
      />
    </svg>
  );
};

Icons.set('twitter-solid', TwitterSolid);
