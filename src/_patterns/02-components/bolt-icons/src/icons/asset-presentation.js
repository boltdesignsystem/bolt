// import { Preact, h } from 'preact';
const AssetPresentation = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Asset-Presentation</title>
      <defs>
        <path id="a" d="M22 12V0H0v24h22z" />
      </defs>
      <g transform="translate(1)" fill="none" fill-rule="evenodd">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          d="M20 13c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10zM19 0H3C1.344 0 0 1.344 0 3v10c0 1.656 1.344 3 3 3h6.332l-3.406 6.418a1.003 1.003 0 1 0 1.638 1.158L11 16.716l3.436 6.86a1.002 1.002 0 1 0 1.638-1.158L12.668 16H19c1.656 0 3-1.344 3-3V3c0-1.656-1.344-3-3-3z"
          fill="#1F2555"
          mask="url(#b)"
        />
      </g>
    </svg>
  );
};
export default AssetPresentation;
