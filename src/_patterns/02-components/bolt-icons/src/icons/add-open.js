// import { Preact, h } from 'preact';
const AddOpen = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Add-open</title>
      <g transform="translate(1 1)" fill="currentColor" fill-rule="evenodd">
        <circle
          class="c-bolt-icon--circle-background"
          cx="64"
          cy="64"
          r="64"
          fill="currentColor"
        />
        <path d="M11 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C4.937 0 0 4.938 0 11s4.938 11 11 11 11-4.938 11-11S17.062 0 11 0" />
        <path d="M15 10h-3V7c0-.55-.45-1-1-1s-1 .45-1 1v3H7c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1" />
      </g>
    </svg>
  );
};
export default AddOpen;
