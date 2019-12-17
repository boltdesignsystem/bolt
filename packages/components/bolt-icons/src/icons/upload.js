import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Upload = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M19.023 19.549H4.975a.978.978 0 00-.975.976c0 .536.439.975.975.975h14.048a.979.979 0 00.976-.975.979.979 0 00-.976-.976M6.75 10.679h2.526v7.32h5.334v-7.32h2.64a.76.76 0 00.674-.393A.637.637 0 0018 9.98a.64.64 0 00-.16-.428L12.59 3.27A.767.767 0 0012 3a.773.773 0 00-.59.27L6.16 9.554a.652.652 0 00-.085.733.76.76 0 00.675.393" />
        </g>
      </g>
    </svg>
  );
};

Icons.set('upload', Upload);
