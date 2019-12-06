import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const AssetText = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      {...otherProps}
      viewBox="0 0 24 24">
      <defs>
        <path id="a" d="M0 1V0h20v2H0V1z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path
          fill={bgColor}
          d="M3 11h14c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1"
        />
        <g transform="translate(2 5)">
          <mask id="b" fill="#fff">
            <use xlink:href="#a" />
          </mask>
          <path
            fill={bgColor}
            d="M1 2h18c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1s.45 1 1 1"
            mask="url(#b)"
          />
        </g>
        <path
          fill={bgColor}
          d="M21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M17 17H3c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1"
        />
      </g>
    </svg>
  );
};

Icons.set('asset-text', AssetText);
