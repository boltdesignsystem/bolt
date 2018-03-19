import { h } from '@bolt/core';

export const AssetText = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg
      width={size}
      height={size}
      {...otherProps}
      viewBox="0 0 24 24"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path id="a" d="M0 1V0h20v2H0V1z" />
      </defs>
      <g fill={bgColor} fill-rule="evenodd">
        <path
          d="M3 11h14c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1"
          fill={bgColor}
        />
        <g transform="translate(2 5)">
          <mask id="b" fill={bgColor}>
            <use xlink:href="#a" />
          </mask>
          <path
            d="M1 2h18c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1s.45 1 1 1"
            fill={bgColor}
            mask="url(#b)"
          />
        </g>
        <path
          d="M21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M17 17H3c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1"
          fill={bgColor}
        />
      </g>
    </svg>
  );
