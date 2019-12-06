import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CheckCircle = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"
        />
        <path
          fill={bgColor}
          stroke={bgColor}
          d="M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 00-.784 0 .557.557 0 000 .785l2.777 2.778a.553.553 0 00.784 0l6.11-6.11a.55.55 0 000-.786.556.556 0 00-.783 0z"
        />
      </g>
    </svg>
  );
};

Icons.set('check-circle', CheckCircle);
