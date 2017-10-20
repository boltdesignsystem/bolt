// import { Preact, h } from 'preact';
const MinusSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Minus-solid</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
        />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill="currentColor"
        />
        <path
          d="M16 11H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default MinusSolid;
