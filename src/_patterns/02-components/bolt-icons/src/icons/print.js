// import { Preact, h } from 'preact';
const Print = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Print</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <path
          d="M21 16c0 .55-.45 1-1 1h-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v3H4c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5zM7 21h10v-6H7v6zM7 8h10V3H7v5zm13 0h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v6H4c-1.656 0-3 1.344-3 3v5c0 1.656 1.344 3 3 3h1v3c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3h1c1.656 0 3-1.344 3-3v-5c0-1.656-1.344-3-3-3z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Print;
