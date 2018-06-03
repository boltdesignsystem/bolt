// import { Preact, h } from '@bolt/core';
const MinusSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Untitled 7</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm4-12H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default MinusSolid;
