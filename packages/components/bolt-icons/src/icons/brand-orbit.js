import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const BrandOrbit = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 60.1 64.77">
      <g data-name="Layer 2">
        <g
          fill={bgColor}
          stroke={bgColor}
          stroke-miterlimit="10"
          data-name="Layer 1">
          <path d="M30.05 26.36a8.36 8.36 0 108.36 8.36 8.37 8.37 0 00-8.36-8.36zm0 14.92a6.57 6.57 0 116.57-6.56 6.56 6.56 0 01-6.57 6.56z" />
          <path d="M35.6 5.69a5.56 5.56 0 00-11.09 0 29.55 29.55 0 1011.09 0zm-5.55-3.4a3.77 3.77 0 11-3.77 3.77 3.77 3.77 0 013.77-3.77zm0 60.19a27.76 27.76 0 01-5.37-55 5.55 5.55 0 0010.74 0 27.76 27.76 0 01-5.37 55z" />
          <path d="M30.05 16.48a18.23 18.23 0 00-15.21 28.27 3.7 3.7 0 002.95 6 3.75 3.75 0 002.21-.81 18.24 18.24 0 1010-33.46zM16.43 48.34a1.91 1.91 0 010-2.72 1.91 1.91 0 012.72 0 1.92 1.92 0 11-2.72 2.72zm25.25-2a16.38 16.38 0 01-20.53 2.18 3.7 3.7 0 00-.73-4.18 3.8 3.8 0 00-4.18-.72 16.44 16.44 0 1125.44 2.72z" />
        </g>
      </g>
    </svg>
  );
};

Icons.set('brand-orbit', BrandOrbit);
