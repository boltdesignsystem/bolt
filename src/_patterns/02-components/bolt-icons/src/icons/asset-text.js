// import { Preact, h } from '@bolt/core';
const AssetText = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Asset-Text</title>
      <defs>
        <path id="id-36a" d="M0 1V0h20v2H0V1z" />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M3 11h14c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1"
          fill="currentColor"
        />
        <g transform="translate(2 5)">
          <mask id="id-37b" fill="#fff">
            <use xlinkHref="#id-36a" />
          </mask>
          <path
            d="M1 2h18c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1s.45 1 1 1"
            fill="currentColor"
            mask="url(#id-37b)"
          />
        </g>
        <path
          d="M21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M17 17H3c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default AssetText;
