import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const MapPinSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill-rule="nonzero">
          <path
            fill={bgColor}
            d="M12 0C6.488 0 2 4.488 2 10c0 1.769.513 3.606 1.531 5.463.787 1.444 1.881 2.906 3.244 4.35 2.3 2.431 4.575 3.956 4.669 4.019a1 1 0 001.112 0c.094-.063 2.369-1.587 4.669-4.019 1.369-1.444 2.456-2.906 3.244-4.35C21.481 13.607 22 11.763 22 10c0-5.512-4.488-10-10-10z"
          />
          <path
            fill={fgColor}
            d="M12 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
          />
        </g>
      </g>
    </svg>
  );
};

Icons.set('map-pin-solid', MapPinSolid);
