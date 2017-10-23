// import { Preact, h } from 'preact';
const AddSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Add-solid</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle class="c-bolt-icon--circle-background" cx="64" cy="64" r="64" />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill="currentColor"
        />
        <path
          d="M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default AddSolid;
