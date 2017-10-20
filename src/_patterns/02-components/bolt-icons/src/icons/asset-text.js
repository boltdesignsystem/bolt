// import { Preact, h } from 'preact';
const AssetText = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Asset-Text</title>
      <defs>
        <path id="a" d="M0 1V0h20v2H0V1z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path
          d="M3 11h14c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1"
          fill="#1F2555"
        />
        <g transform="translate(2 5)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M1 2h18c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1s.45 1 1 1"
            fill="#1F2555"
            mask="url(#b)"
          />
        </g>
        <path
          d="M21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M17 17H3c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1"
          fill="#1F2555"
        />
      </g>
    </svg>
  );
};
export default AssetText;
