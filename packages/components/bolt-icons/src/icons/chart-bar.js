import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const ChartBar = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 40 40">
      <g fill={bgColor}>
        <path
          d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 37.6c-9.7 0-17.6-7.9-17.6-17.6S10.3 2.4 20 2.4 37.6 10.3 37.6 20 29.7 37.6 20 37.6z"
          class="st0"
        />
        <path
          d="M18.8 15.3h2.4v10.1h-2.4zM26.3 8h2.4v17.4h-2.4zM11.3 20.5h2.4v4.9h-2.4zM8.8 27.6h22.4v2H8.8z"
          class="st0"
        />
      </g>
    </svg>
  );
};

Icons.set('chart-bar', ChartBar);
