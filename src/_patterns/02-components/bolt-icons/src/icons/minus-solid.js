// import { Preact, h } from 'preact';
const MinusSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Minus-solid</title>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill="#1F2555"
        />
        <path
          d="M16 11H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1"
          fill="#FFF"
        />
      </g>
    </svg>
  );
};
export default MinusSolid;
