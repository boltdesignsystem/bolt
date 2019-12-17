import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Download = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M15.023.049H.976A.978.978 0 000 1.025C0 1.56.44 2 .976 2h14.046a.978.978 0 00.976-.975.979.979 0 00-.975-.976"
          mask="url(#mask-2)"
          transform="translate(4 19.5)"
        />
        <path
          fill={bgColor}
          d="M11.408 17.73a.77.77 0 00.59.27c.23 0 .451-.101.591-.27l5.25-6.283a.652.652 0 00.084-.733.76.76 0 00-.675-.393h-2.527V3H9.388v7.321H6.75a.76.76 0 00-.675.393.638.638 0 00-.075.306c0 .152.052.305.16.427l5.25 6.283z"
        />
      </g>
    </svg>
  );
};

Icons.set('download', Download);
